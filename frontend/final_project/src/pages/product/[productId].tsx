// product\[productId]\index.tsx
import { product, product as productList } from "@/utils/product";
import ProductDetails from "./ProductDetails";

interface IParams {
    productId?: string;
}

const Product = ({ params }: { params?: IParams }) => {

    console.log("Received params:", params);

    return (
        <div className="p-8">
            <ProductDetails product={product} />
        </div>
    );
}

export default Product;
