import Link from "next/link";
import Image from "next/image";
import { ViewItem } from "@/shared/types/Item";
import { ItemCardStyled } from "./styles/ItemCard.styled";

type Props = {
  item: ViewItem;
};

const ItemCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="col-12 col-sm-6 col-md-3 col-lg-2">
      <ItemCardStyled>
        <div className="card-body">
          <Link href={`/items/${item._id}/${item.title.replaceAll(" ", "-")}`}>
            <Image
              src={item.imageUrl}
              className="img-fluid rounded"
              width={200}
              height={200}
              objectFit="contain"
              title={item.title}
              role="button"
            />
          </Link>
          <h5 className="one-line-ellipsis" title={item.title}>
            {item.title} - {item._id}
          </h5>
          <p className="line-clamp-3">{item.description}</p>
          <Link href={`/items/${item._id}/${item.title.replaceAll(" ", "-")}`}>
            <a className="btn btn-primary">Check out</a>
          </Link>
        </div>
      </ItemCardStyled>
    </div>
  );
};

export default ItemCard;
