import { useRouter } from "next/router";

const CoffeeStores = () => {
  const router = useRouter();
  console.log("router", router);
  return <div> Coffee stores: {router.query.id}</div>;
};

export default CoffeeStores;
