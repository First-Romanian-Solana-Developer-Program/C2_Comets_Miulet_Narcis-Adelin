import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import { PingButton } from "../components/PingButton";
import WalletContextProdiver from "../components/WalletContextProvider";
import { SendSolanaForm } from "../components/SendSolana";

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>

      <WalletContextProdiver>
        <AppBar />

        <div className={styles.AppBody}>
          {/* <PingButton /> */}
          <SendSolanaForm />
        </div>
      </WalletContextProdiver>
    </div>
  );
};

export default Home;
