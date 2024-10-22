import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";

const AMOUNT = 9;
const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`User account loaded: ${user.publicKey.toBase58()}`);

const tokenMint = new PublicKey("9RGyko9Tc3niYWv5J5e2nTHizzmd1UBvvWkya7qqnmKW");

// const destTokenAccount = new PublicKey(
//   "2CyjwF2XQ3YgwUhgVbn6oszVzgrNppzspyzfNLSzopin"
// );

const destTokenAccount = new PublicKey(
  "9kzUScpcVVDzWTnqtXqmKKKAuhVmYGB8eygLe9SSRvyC"
);

const signature = await mintTo(
  connection,
  user,
  tokenMint,
  destTokenAccount,
  user,
  AMOUNT * 10 ** DECIMALS
);

const link = getExplorerLink("tx", signature, "devnet");

console.log(`Minted ${AMOUNT} tokens: ${link}`);
