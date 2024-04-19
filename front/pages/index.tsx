import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  getBalance,
  writeContract,
  readContract,
  getAccount,
} from "@wagmi/core";
import Ficha from "../abis/Ficha.json";
import { erc20Abi } from "viem";
import GuessBook from "../abis/GuessBook.json";
const FichaAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const GuessBookAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

import config from "../Imports/configWagmi";

const Home: NextPage = () => {
  const [balance, setBalance] = React.useState<number>(0);
  const [allMessages, setAllMessages] = React.useState<any>([]);

  function getBalance() {
    // llamas al address de la wallet que esta conectada
    const account = getAccount(config);
    console.log(account);
    // llamas al address del contrato con la funcion balanceOf
    readContract(config, {
      abi: Ficha.abi,
      address: FichaAddress as `0x${string}`,
      functionName: "balanceOf",
      args: [account.address as `0x${string}`],
    }).then((result) => {
      console.log(result);
      setBalance(Number(result));
    });
  }

  function makeApproval() {
    writeContract(config, {
      abi: erc20Abi,
      address: FichaAddress as `0x${string}`,
      functionName: "approve",
      args: [GuessBookAddress, BigInt(1)],
    }).then((result) => {
      console.log(result);
    });
  }

  function sendMessage() {
    const message = (document.getElementById("message") as HTMLInputElement)
      .value;
    const account = getAccount(config);
    readContract(config, {
      abi: erc20Abi,
      address: FichaAddress as `0x${string}`,
      functionName: "allowance",
      args: [
        account.address as `0x${string}`,
        GuessBookAddress as `0x${string}`,
      ],
    }).then((result) => {
      console.log(result);
      if (Number(result) === 0) {
        //hacer un aviso pop up y despues return
        window.confirm("Haz el permiso primero");
        return;
      } else {
        writeContract(config, {
          abi: GuessBook.abi,
          address: GuessBookAddress as `0x${string}`,
          functionName: "registerMessage",
          args: [message],
        }).then((result) => {
          console.log(result);
          readContract(config, {
            abi: GuessBook.abi,
            address: GuessBookAddress as `0x${string}`,
            functionName: "getFullMessages",
          }).then((result) => {
            console.log(result);
          });
        });
      }
    });
  }

  function getMessages() {
    readContract(config, {
      abi: GuessBook.abi,
      address: GuessBookAddress as `0x${string}`,
      functionName: "getFullMessages",
    }).then((result) => {
      console.log(result);
      setAllMessages(result);
      console.log(allMessages);
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Aplicación RainbowKit</title>
        <meta
          content="Generado por @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>Bienvenido al ejemplo</h1>

        <p className={styles.description}>
          Comienza editando <code className={styles.code}>pages/index.tsx</code>
        </p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Ver tu cantidad de fichas en tu wallet</h2>
            <button onClick={getBalance}>Obtener Balance</button>
            <p>{balance} FICHA</p>
          </div>
          <div className={styles.card}>
            <h2>
              Recuerda que antes de darle click a hacer registro debes dar
              permiso al erc20 para darle 1 FICHA al contrato
            </h2>
            <button onClick={makeApproval}>Hacer permiso</button>
          </div>
        </div>
        <div className={styles.card}>
          <h2>Escribe tu mensaje en el GuessBook</h2>
          <textarea id="message" rows={4} cols={30}></textarea>
          <button onClick={sendMessage}>Enviar mensaje</button>
        </div>

        <div className={styles.card}>
          <h2>Obten mensajes</h2>
          <button onClick={getMessages}>Obtener mensajes</button>
          
        </div>
        {allMessages.map((message: any) => {
            return (
              <div>
                <p>Usuario: {message.user}</p>
                <p>Mensaje: {message.text}</p>
                <p>Fecha: {message.date}</p>
              </div>
            );
          })}

        <div className={styles.grid}>
          <a className={styles.card} href="https://rainbowkit.com">
            <h2>Documentación de RainbowKit &rarr;</h2>
            <p>
              Aprende cómo personalizar el flujo de conexión de tu billetera.
            </p>
          </a>

          <a className={styles.card} href="https://wagmi.sh">
            <h2>Documentación de wagmi &rarr;</h2>
            <p>Aprende cómo interactuar con Ethereum.</p>
          </a>

          <a
            className={styles.card}
            href="https://github.com/rainbow-me/rainbowkit/tree/main/examples"
          >
            <h2>Ejemplos de RainbowKit &rarr;</h2>
            <p>Descubre proyectos de ejemplo de RainbowKit.</p>
          </a>

          <a className={styles.card} href="https://nextjs.org/docs">
            <h2>Documentación de Next.js &rarr;</h2>
            <p>
              Encuentra información detallada sobre las características y API de
              Next.js.
            </p>
          </a>

          <a
            className={styles.card}
            href="https://github.com/vercel/next.js/tree/canary/examples"
          >
            <h2>Ejemplos de Next.js &rarr;</h2>
            <p>Descubre y despliega proyectos de ejemplo de Next.js.</p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          >
            <h2>Desplegar &rarr;</h2>
            <p>
              Despliega instantáneamente tu sitio Next.js en una URL pública con
              Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Hecho con ❤️ por tus amigos en 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
