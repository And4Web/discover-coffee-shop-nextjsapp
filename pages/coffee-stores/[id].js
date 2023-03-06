import {useState, useEffect, useContext} from 'react';
import { useRouter } from "next/router";
import useSwr from 'swr';
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-stores.module.css";
import cls from "classnames";

import {fetchCoffeeStores} from '../../lib/coffee-stores'
import {StoreContext} from '../../store/store-context';
import {isEmpty} from '../../utils/isEmpty';


export async function getStaticProps(staticProps) {
  const { params } = staticProps;

  const coffeeStoresData = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStoresData.find(
    (coffeeStore) => coffeeStore.id.toString() === params.id)

  return {
    props: {
      // listFull: coffeeStoresData,
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
  const router = useRouter();
  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);

  const fetcher = (url) => {
    return fetch(url).then(res=>res.json());
  }
  
  const [votingCount, setVotingCount] = useState(1);

  const {data, error} = useSwr(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  const {state} = useContext(StoreContext);  
  const {coffeeStoresNearby} = state;  

  const handleCreateCoffeeStore = async (data) => {
    try {
      const {id, name, address, neighborhood, imgUrl, voting} = data;

      const response = await fetch('/api/createCoffeeStore', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
        id: `${id}`,
        name, 
        address: address || "", 
        neighborhood: neighborhood || "", 
        voting,
        imgUrl
      })      
      })

      const dbCoffeeStore = await response.json();

    } catch (error) {
      console.error("Error creating store: ", error);
    }
  }
  
  useEffect(()=>{
    const effect = () => {     
      
      if(isEmpty(props.coffeeStore)){
        if(coffeeStoresNearby.length > 0){
          const findCoffeeStoreById = coffeeStoresNearby.find(
            (coffeeStore) => coffeeStore.id.toString() === id)
            
          if(findCoffeeStoreById){
            setCoffeeStore(findCoffeeStoreById);
            handleCreateCoffeeStore(findCoffeeStoreById);
          }
        }
      } else{
        handleCreateCoffeeStore(props.coffeeStore)
      }
    }
    effect();
  }, [id, props, props.CoffeeStore])

  useEffect(()=>{
    const effect = () => {
      if(data){
        setCoffeeStore(data[0]);
        // setVotingCount(data[0].voting);
      }
    }
    effect();
  }, [data])


  if (router.isFallback) {
    return <h1>Loading...</h1>;
  } 

  const { name, address, neighborhood, imgUrl, voting } = coffeeStore;  
  
  const handleUpvoteButton = async () => {
    try {     
      const response = await fetch('/api/favouriteCoffeeStoreById', {
        method: "PUT",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
        id
      })      
      })

      const dbCoffeeStore = await response.json();

      if(dbCoffeeStore.record && dbCoffeeStore.record.length > 0){
        let count = votingCount + 1;
        setVotingCount(count);
      }

    } catch (error) {
      console.error("Error creating store: ", error);
    }    
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
            <p className={styles.text}>{voting}</p>
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
