import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/bannerComponent/banner.component";
import Card from "../components/card.component/card.component";

export default function Home() {
  const handleOnClick = () => {
    console.log("clicked the button");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          handleOnClick={handleOnClick}
          buttonText={"View stores nearby"}
        />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400} />
        </div>
        <Card
          name="Dark horse Cofee"
          imgUrl="/static/hero-image.png"
          href="/coffee-stores/darkhorse-coffee"
        />
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}
