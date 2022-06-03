import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-stores.module.css";
import cls from "classnames";

import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
  const { params } = staticProps;

  return {
    props: {
      coffeStores: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id.toString() === params.id
      ),
    },
  };
}

export function getStaticPaths() {
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
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const { name, address, neighbourhood, imgUrl } = props.coffeStores;

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
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrappper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image src={imgUrl} alt={name} height={360} width={600}></Image>
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <div className={styles.storeImgWrapper}>
              <Image
                src="/static/icons/places.svg"
                alt=""
                className={styles.storeImg}
                height={24}
                width={24}
              ></Image>
            </div>
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <div className={styles.storeImgWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                alt=""
                className={styles.storeImg}
                height={24}
                width={24}
              ></Image>
            </div>
            <p className={styles.text}>{neighbourhood}</p>
          </div>
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
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStores;
