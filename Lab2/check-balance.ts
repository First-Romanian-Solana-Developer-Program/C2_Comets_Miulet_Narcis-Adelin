import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); // process, confirmed, finalized

console.log("Connected to devnet", connection.rpcEndpoint);

const andreeaPubkey = new PublicKey(
  "Hg7QXrvrmsrEZ4vZDPSvghtTY9wRDsM6obRfpJTHFLAo"
);

const balanceInLamports = await connection.getBalance(andreeaPubkey);

console.log("Done! Andreea's balance in lamports:", balanceInLamports);

console.log("Airdropping 1 SOL to Andreea...");

await airdropIfRequired(
  connection,
  andreeaPubkey,
  1 * LAMPORTS_PER_SOL,
  2 * LAMPORTS_PER_SOL
);

// await connection.requestAirdrop(andreeaPubkey, 1 * LAMPORTS_PER_SOL);

console.log("Done! Airdropped 1 SOL to Andreea.");

const balanceInLamports2 = await connection.getBalance(andreeaPubkey);

console.log("Done! Andreea's balance in lamports:", balanceInLamports2);

// CLI: solana config set --url https://api.devnet.solana.com
