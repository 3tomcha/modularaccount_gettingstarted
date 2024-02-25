import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy';
import { Address, Hex, LocalAccountSigner, sepolia } from '@alchemy/aa-core';
import dotenv from "dotenv"
dotenv.config()

const chain = sepolia;
const PRIVATE_KEY = `0x${process.env.PRIVATE_KEY}` as Hex;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const signer = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);
const provider = await createModularAccountAlchemyClient({
  apiKey: ALCHEMY_API_KEY,
  chain,
  signer
});

(async () => {
  console.log("Smart Account Address: ", provider.getAddress())
  const vitalikAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" as Address;
  const { hash: uoHash } = await provider.sendUserOperation({
    uo: {
      target: vitalikAddress,
      data: "0x",
      value: 0n
    }
  })
  console.log("UserOperation Hash: ", uoHash)

  const txHash = await provider.waitForUserOperationTransaction({
    hash: uoHash
  })

  console.log("Transaction Hash: ", txHash)
})();