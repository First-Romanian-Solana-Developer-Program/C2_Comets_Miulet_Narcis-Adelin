import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { transfer } from "@solana/spl-token";

const AMOUNT = 9;
const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");
const destTokenAccount = new PublicKey(
  "2CyjwF2XQ3YgwUhgVbn6oszVzgrNppzspyzfNLSzopin"
); // destination token account
const source = new PublicKey("9kzUScpcVVDzWTnqtXqmKKKAuhVmYGB8eygLe9SSRvyC"); // my token account

const signature = await transfer(
  connection,
  user,
  source,
  destTokenAccount,
  user,
  AMOUNT * 10 ** DECIMALS
);

console.log("Signature: ", signature);
