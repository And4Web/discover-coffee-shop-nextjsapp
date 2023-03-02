import {useState, useEffect, useContext} from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-stores.module.css";
import cls from "classnames";

import {fetchCoffeeStores} from '../../lib/coffee-stores'
import {StoreContext} from '../_app';
import {isEmpty} from '../../utils/isEmpty';


export async function getStaticProps(staticProps) {
  const { params } = staticProps;

  const coffeeStoresData = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStoresData.find(
    (coffeeStore) => coffeeStore.id.toString() === params.id)

  return {
    props: {
      listFull: coffeeStoresData,
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
    },
  };
}

export async function getStaticPaths() {
  const coffeeStoresData = await fetchCoffeeStores();
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

const CoffeeStores = (props) => {
  const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);
  const {state} = useContext(StoreContext);  
  const {coffeeStoresNearby} = state;

  const router = useRouter();
  const id = router.query.id;
  
  useEffect(()=>{
    const effect = () => {
      if(isEmpty(props.coffeeStore)){
        const findCoffeeStoreById = coffeeStoresNearby.find(
          (coffeeStore) => coffeeStore.id.toString() === id)
        // console.log("new store found: ", findCoffeeStoreById);
        setCoffeeStore(findCoffeeStoreById);
      } 
    }
    effect();
  }, [id])

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  } 
  
  // console.log("context state from single store page: ", state);  

  const { name, address, neighborhood, imgUrl } = coffeeStore;  

  // console.log("CoffeeStores full list: ", props.listFull)
  // console.log("CoffeeStore by ID in props: ", props.coffeeStore)
  // console.log("CoffeeStore by ID in store: ", coffeeStore)

  const handleUpvoteButton = () => {
    console.log("handle upvote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">⬅ Back to home</Link>
          </div>
          <div className={styles.nameWrappper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image src={imgUrl || "https://purepng.com/public/uploads/large/purepng.com-cup-mug-coffeecupmufcoffeebean-1411527406018xgn16.png"} alt={name} height={360} width={600}></Image>
        </div>

        <div className={cls("glass", styles.col2)}>
          {address && <div className={styles.iconWrapper}>
            <div className={styles.storeImgWrapper}>
              <Image
                src="/static/icons/places.svg"
                alt=""
                className={styles.storeImg}
                height={24}
                width={24}
              ></Image>
            </div>
            <p className={styles.text}>{address? address: `No address found`}</p>
          </div>}

          {neighborhood && <div className={styles.iconWrapper}>
            <div className={styles.storeImgWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                alt=""
                className={styles.storeImg}
                height={24}
                width={24}
              ></Image>
            </div>
            <p className={styles.text}>{neighborhood? neighborhood: `Nothing relevant found`}</p>
          </div>}
          <div className={styles.iconWrapper}>
            <div className={styles.storeImgWrapper}>
              <Image
                src="/static/icons/stars.svg"
                alt=""
                className={styles.storeImg}
                height={24}
                width={24}
              ></Image>
            </div>
            <p className={styles.text}>3.5</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStores;
