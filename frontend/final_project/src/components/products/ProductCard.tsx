import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    data: {
        id: string;
        image_url: string;
        name: string;
        price: number;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter();

    // Ensure the image URL is correctly formatted
    const imageUrl = data.image_url.startsWith('http') ? data.image_url : `/${data.image_url}`;

    const handleBuyClick = () => {
        // Redirect to the purchase page or add to cart logic
        router.push(`/product/${data.id}`);
    };

    return (
        <div
            onClick={() => router.push(`/product/${data.id}`)}
            className="col-span-1 cursor-pointer border-[1.2px] border-black bg-amber-400 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
        >
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden rounded-lg relative w-full">
                    <Image
                        src={imageUrl || '/default-image.png'} // Provide a default image URL
                        alt={data.name || 'Product Image'} // Provide a default alt text
                        layout="fill" // Use layout prop if needed
                        objectFit="cover" // Use objectFit prop if needed
                        objectPosition="center" // Use objectPosition prop if needed
                    />
                </div>

                <div
                    className="mt-4 truncate"
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                        display: "inline-block",
                    }}
                >
                    <span>{data.name}</span>
                </div>

                <div className="font-semibold">{formatPrice(data.price)}</div>

                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click event
                        handleBuyClick();
                    }}
                    className="mt-2 px-4 py-2 bg-black w-full text-white rounded hover:bg-green-900 transition"
                >
                    Buy
                </button>
            </div>
        </div>
    );
};

export default ProductCard;