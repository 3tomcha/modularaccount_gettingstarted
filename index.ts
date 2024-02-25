import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { Hex, LocalAccountSigner, sepolia } from '@alchemy/aa-core';
import dotenv from "dotenv"
dotenv.config()

const chain = sepolia;
const PRIVATE_KEY = `0x${process.env.PRIVATE_KEY}` as Hex;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const signer = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);
const client = await createModularAccountAlchemyClient({
  apiKey: ALCHEMY_API_KEY,
  chain,
  signer
});

(async () => {
  console.log("Smart Account Address: ", client.getAddress())
})();