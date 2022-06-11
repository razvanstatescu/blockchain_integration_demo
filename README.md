# Getting started

Run `npm start` to start the server

JSON-RPC endpoint `/json-rpc`

## Send Transaction

POST `/json-rpc`

```
{
    "jsonrpc": "2.0",
    "method": "send_transaction",
    "params": {
        "chain": "elrond",
        "receiver": "erd1pdv0h3ddqyzlraek02y5rhmjnwwapjyhqm983kfcdfzmr6axqhdsfg4akx",
        "value": 0.1
    },
    "id": 23
}
```

## Get Transaction

POST `/json-rpc`

```
{
    "jsonrpc": "2.0",
    "method": "get_transaction",
    "params": {
        "chain": "elrond",
        "txHash": "2c2f85fdf6735a8b86bbe6b00aa3db1960be1280efcf6af9bc4445245ddab99a"
    },
    "id": 23
}
```

# Test

Run `npm test` to run tests for the API endpoint.

# Code structure

The application was structured in 4 main components:

- Networks Providers - for interacting with the blockchain (send transaction, get transaction)
- Wallet Providers - for handling the wallet and wallet operations like signing
- Network API Providers - handle the api used to broadcast the transaction
- Network Provider Factories - used to centralize the creating of Network Providers to make it easier to create the objects

# Add new provider

To add a new provider, the steps are pretty simple:

- Create a new wallet provider for that specific network that should handle the singing of the transaction
- Implement a new network api provider that should handle the broadcasting of the transaction to the network
- Implement a new network provider that will use a wallet provider and a network api provider to send / get transactions
- Implement a new factory that will create a network provider
