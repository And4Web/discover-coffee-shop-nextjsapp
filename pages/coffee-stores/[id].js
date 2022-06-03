import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
  const { params } = staticProps;
  // console.log("params: ", params);
  return {
    props: {
      coffeStores: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id.toString() === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}

const CoffeeStores = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  const { name, address } = props.coffeStores;
  // console.log("router", router);
  // console.log("props", props);
  return (
    <div>
      {" "}
      Coffee stores: {router.query.id}
      <Link href="/coffee-stores/dynamic">|||to dynamic|||</Link>
      <p>{address}</p>
      <p>{name}</p>
    </div>
  );
};

export default CoffeeStores;
