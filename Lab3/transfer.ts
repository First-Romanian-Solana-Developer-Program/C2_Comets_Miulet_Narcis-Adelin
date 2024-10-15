import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  clusterApiUrl,
  Connection,
  sendAndConfirmTransaction,
  SystemProgram,
} from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

console.log("Sender public key: ", sender.publicKey.toString());

const receiver = new PublicKey("9hh4HNTUtsmG6SXA8nudj1chWdnNTLtv1SydkQbvujLK");

const transaction = new Transaction();

const amount = 0.1;

const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: amount * LAMPORTS_PER_SOL,
});

const transferInstruction2 = createMemoInstruction("Hello, Solana!");

// const transferInstruction2 = createMemoInstruction("Hello, Solana!", [
//   sender.publicKey,
// ]);

transaction.add(transferInstruction);
transaction.add(transferInstruction2);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log("Transaction confirmed: ", signature);

const getTransactionHistory = async (publicKey: PublicKey) => {
  const confirmedSignatures = await connection.getSignaturesForAddress(
    publicKey
  );
  console.log("Confirmed signatures: ", confirmedSignatures);
};

await getTransactionHistory(sender.publicKey);
