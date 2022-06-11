import bodyParser from 'body-parser';
import express from 'express';
import { JSONRPCServer } from 'json-rpc-2.0';

import { ElrondProviderFactory } from './Factories/ElrondProviderFactory';
import { EthereumProviderFactory } from './Factories/EthereumProviderFactory';
import { ProviderChain } from './types';

const server = new JSONRPCServer();

server.addMethod("send_transaction", async ({ chain, receiver, value }: any) => {
  if (!(chain && receiver && value)) {
    throw new Error("Missing params");
  }
  switch (chain) {
    case ProviderChain.ELROND: {
      const elrondProvider = await new ElrondProviderFactory().createProvider();
      const txHash = await elrondProvider.sendTransaction({
        chain,
        receiver,
        value,
      });
      return { txHash };
    }
    case ProviderChain.ETHEREUM: {
      const ethereumProvider = await new EthereumProviderFactory().createProvider();
      const txHash = await ethereumProvider.sendTransaction({
        chain,
        receiver,
        value,
      });
      return { txHash };
    }
    default: {
      throw new Error("Provider not implemented.");
    }
  }
});
server.addMethod("get_transaction", async ({ chain, txHash }: any, { id }: any) => {
  if (!(chain && txHash)) {
    throw new Error("Missing params");
  }
  switch (chain) {
    case ProviderChain.ELROND: {
      const elrondProvider = await new ElrondProviderFactory().createProvider();
      const tx = await elrondProvider.getTransaction(txHash);
      return tx;
    }
    case ProviderChain.ETHEREUM: {
      const ethereumProvider = await new EthereumProviderFactory().createProvider();
      const tx = await ethereumProvider.getTransaction(txHash);
      return tx;
    }
    default: {
      throw new Error("Provider not implemented.");
    }
  }
});

export const app: express.Application = express();
app.use(bodyParser.json());

app.post("/json-rpc", (req, res) => {
  const jsonRPCRequest = req.body;
  // @ts-ignore
  server.receive(jsonRPCRequest, { id: req?.id }).then((jsonRPCResponse) => {
    if (jsonRPCResponse) {
      res.json(jsonRPCResponse);
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(3001);
