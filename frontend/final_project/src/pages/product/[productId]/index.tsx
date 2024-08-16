import ProductDetails from "./ProductDetails";

interface IParams {
    productId?: string;
}

export async function getServerSideProps(context: any) {
    const { productId } = context.params;

    try {
        console.log("Fetching product with ID:", productId);

        const response = await fetch(`http://localhost:5000/product/${productId}`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return {
                props: {
                    product: null,
                },
            };
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error("Expected JSON response but received:", contentType);
            return {
                props: {
                    product: null,
                },
            };
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        return {
            props: {
                product: data.product, // Access the `product` key
            },
        };
    } catch (error) {
        console.error("Error fetching product:", error);
        return {
            props: {
                product: null,
            },
        };
    }
}

const Product = ({ product }: { product: any }) => {
    if (!product) {
        return <div>Product not found.</div>;
    }

    console.log("Product:", product);

    return (
        <div className="p-8">
            <ProductDetails product={product} />
        </div>
    );
}

export default Product;
