import { Metaplex } from "@metaplex-foundation/js";

export async function createNft(metaplex: Metaplex, uri: string, nftData: any) {
  const { nft } = await metaplex.nfts().create(
    {
      uri: uri,
      name: nftData.name,
      sellerFeeBasisPoints: 500, // 5%
      symbol: nftData.symbol,
    },
    { commitment: "finalized" }
  );

  console.log(
    `Created NFT httpss//explorer.solana.com/address/${nft.address.toBase58()}?cluster=devnet`
  );
}
