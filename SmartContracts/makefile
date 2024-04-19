-include .env

.PHONY: all help install format anvil compile

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

help:
	@echo "Makefile para Smart Contracts"
	@echo "Comandos:"
	@echo "compile: Compila los contratos"
	@echo "deployTest: Despliega los contratos de prueba en la red de Anvil"
	@echo "deployFicha: Despliega el contrato Ficha en la red de Arbitrum sepolia"
	@echo "deployGuessBook: Despliega el contrato GuessBook en la red de Arbitrum sepolia"

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

TESTNET_ARGS := --rpc-url $(RPC_URL) --private-key $(PRIVATE) --broadcast --verify --etherscan-api-key $(API_KEY) -vvvvvvv
ARB_ARGS := --rpc-url $(RPC_URL_ARB) --private-key $(PRIVATE) --broadcast --verify --etherscan-api-key $(API_KEY_ARB) -vvvvvvv

compile:
	forge compile
deployTest:
	@echo "--==Deploying test contracts in anvil local testnet==--"
	@forge script script/DeployFichaTest.s.sol:DeployFichaTest $(NETWORK_ARGS)
	@forge script script/DeployGuessBookTest.s.sol:DeployGuessBookTest $(NETWORK_ARGS)

deployFicha:
	@echo "--==Deploying Ficha contract in Arbitrum sepolia==--"
	@forge script script/DeployFicha.s.sol:DeployFicha $(ARB_ARGS)

deployGuessBook:
	@echo "--==Deploying GuessBook contract in Arbitrum sepolia==--"
	@forge script script/DeployGuessBook.s.sol:DeployGuessBook $(ARB_ARGS)