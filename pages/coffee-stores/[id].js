import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
  const { params } = staticProps;
  return {
    props: {
      coffeStores: coffeeStoresData.find((coffeeStore) => coffeeStore.id === 0),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [
      {
        paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
      },
    ],
    fallback: true,
  };
}

const CoffeeStores = () => {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      {" "}
      Coffee stores: {router.query.id}
      {/* <Link href="/coffee-stores/dynamic">|||to dynamic|||</Link> */}
    </div>
  );
};

export default CoffeeStores;
