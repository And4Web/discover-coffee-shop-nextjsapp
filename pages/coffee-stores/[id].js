import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStores = () => {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      {" "}
      Coffee stores: {router.query.id}
      <Link href="/">|||Back to home|||</Link>
    </div>
  );
};

export default CoffeeStores;
