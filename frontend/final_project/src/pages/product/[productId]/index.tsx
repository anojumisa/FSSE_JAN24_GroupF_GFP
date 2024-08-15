// product\[productId]\index.tsx
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";

interface IParams {
    productId?: string;
}

const Product = ({ params }: { params?: IParams }) => {

    console.log("Received params:", params);

    // const product = products.find((item) => item.id === params?.productId);

    return (
        <div className="p-8">
            <ProductDetails product={product} />
        </div>
    );
}

export default Product;
