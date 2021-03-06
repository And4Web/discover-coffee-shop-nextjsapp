import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/bannerComponent/banner.component";
import Card from "../components/card.component/card.component";

import { fetchCoffeeStores } from "../lib/coffe-stores";

import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  console.log("props", props);

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
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero-image"
          />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                // const { name, id, imgUrl } = coffeeStore;
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    className={styles.card}
                    href={`/coffee-stores/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}
