import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import {
  keypairIdentity,
  Metaplex,
  irysStorage,
} from "@metaplex-foundation/js";
import { uploadMetadata } from "./uploadMetadata";
import { createNft } from "./createNft";

const nftData = {
  name: "SDP Cool NFT",
  symbol: "SDP",
  description: "This is a cool NFT from Solana Developers Program - Romania",
  imgPath: "solana.jpg",
};

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

  await connection.getLatestBlockhash();

  const keypair = getKeypairFromEnvironment("SECRET_KEY");

  console.log(`Keypair loaded: ${keypair.publicKey.toBase58()}`);

  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(
      irysStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );

  console.log("Metaplex loaded");

  const uri = await uploadMetadata(metaplex, nftData);

  console.log("Off-chain image + metadata-json uploaded");

  const nft = await createNft(metaplex, uri, nftData);
}

main().then(() => console.log("Hooray!"));
