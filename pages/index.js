import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/bannerComponent/banner.component";
import Card from "../components/card.component/card.component";

import { fetchCoffeeStores } from "../lib/coffee-stores";

export async function getStaticProps(context) {
  const coffeeStoresData = await fetchCoffeeStores();
  
  return {    
    props: {
      coffeeStores: coffeeStoresData,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const coffeeStores = props.coffeeStores;

  console.log("CoffeeStores: ", coffeeStores);

  const handleOnClick = () => {
    console.log("clicked the button");
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur App</title>
        <meta name="description" content="Discover best place for your next coffee, tea or snacks with friends." />
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
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                const { name, id, imgUrl } = coffeeStore;
                return (
                  <Card                    
                    key={id}
                    name={name}                    
                    imgUrl={imgUrl || "https://purepng.com/public/uploads/large/purepng.com-cup-mug-coffeecupmufcoffeebean-1411527406018xgn16.png"}                    
                    className={styles.card}
                    href={`/coffee-stores/${id}`}
                    
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
