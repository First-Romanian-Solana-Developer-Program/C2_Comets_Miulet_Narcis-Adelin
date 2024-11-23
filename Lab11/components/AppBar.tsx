import { FC } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import dynamic from "next/dynamic";

// Dynamically load WalletMultiButton with no SSR
const DynamicWalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export const AppBar: FC = () => {
  return (
    <div className={styles.AppHeader}>
      <Image src="/solanaLogo.png" height={30} width={200} alt="solana-logo" />
      <span>Wallet-Adapter Example</span>
      <DynamicWalletMultiButton />
    </div>
  );
};
