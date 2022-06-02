import Image from "next/image";
import Link from "next/link";

const Card = (props) => {
  const { name, href, imgUrl } = props;
  return (
    <Link href={href}>
      <a>
        <h2>{name}</h2>
        <Image src={imgUrl} alt={name} width={260} height={160} />
      </a>
    </Link>
  );
};

export default Card;
