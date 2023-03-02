import {useState, useEffect, useContext} from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/bannerComponent/banner.component";
import Card from "../components/card.component/card.component";

import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { ACTION_TYPES, StoreContext } from './_app';

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
  const { handleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation();

  // const [coffeeStoresNearby, setCoffeeStoresNearby] = useState("");
  const {dispatch, state} = useContext(StoreContext);  
  const {coffeeStoresNearby, latLong} = state;

  const [fetchingError, setFetchingError] = useState(null);

  const handleOnClick = async () => {
    console.log("clicked the button");
    handleTrackLocation();
    
  };

  useEffect(() => {  
    const effect = async () => {
      if(latLong){
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong);
          // console.log({fetchedCoffeeStores})
          // setCoffeeStoresNearby(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {coffeeStoresNearby: fetchedCoffeeStores}
          })
          console.log("store state: ", state);

        } catch (error) {
          console.log({error})
          setFetchingError(error.message);
        }
      }
    }
    effect();
    
   }, [latLong]);
 

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
          buttonText={isFindingLocation? "Locating..." : "View stores nearby"}
        />
        {locationErrorMsg && <p style={{marginTop: "8rem"}}>Something went wrong: {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero-image"
          />
        </div>

        {/* <=== Nearby Stores ===>*/}
        {coffeeStoresNearby.length > 0 && (
          <>
            <h2 className={styles.heading2}>Nearby Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStoresNearby.map((coffeeStore) => {
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


        {/* <=== New Delhi Stores ===>*/}
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>New Delhi Stores</h2>
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
