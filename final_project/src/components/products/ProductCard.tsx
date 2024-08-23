import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Oswald } from '@next/font/google';

interface ProductCardProps {
    data: {
        id: string;
        image_url: string;
        name: string;
        price: number;
    };
}
const oswald = Oswald({ subsets: ['latin'] });
const oswaldBold = Oswald({ weight: '700', subsets: ['latin'] });

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter();
    // if (!data || !data.image_url) {
    //     return null; // or handle the error appropriately
    // }
    // Ensure the image URL is correctly formatted
    const imageUrl = data.image_url.startsWith("http")
        ? data.image_url
        : `/${data.image_url}`;

    const handleBuyClick = () => {
        // Redirect to the purchase page or add to cart logic
        router.push(`/product/${data.id}`);
    };

    return (
        <div
            onClick={() => router.push(`/product/${data.id}`)}
            className="col-span-1 cursor-pointer border-[1.2px] border-lime-400 bg-gradient-to-t from-amber-400 via-yellow-500 to-black rounded-tr-3xl rounded-bl-3xl p-2 transition hover:scale-105 text-center text-sm"
        >
            <div className="flex flex-col items-center min-full gap-1 py-7">
                <div
                    className={`mt-4 mb-3 truncate font-black text-xl text-gray-300 uppercase ${oswald.className}`}
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
                <div className="aspect-square overflow-hidden rounded-full border-stone-950 relative w-5/6 mb-2">
                    <Image
                        src={imageUrl || "/default-image.png"} // Provide a default image URL
                        alt={data.name || "Product Image"} // Provide a default alt text
                        layout="fill" // Use layout prop if needed
                        objectFit="cover" // Use objectFit prop if needed
                        objectPosition="center" // Use objectPosition prop if needed
                    />
                </div>

                <div className={`font-bold text-2xl text-emerald-700 mb-1 ${oswaldBold.className}`}>{formatPrice(data.price)}</div>

                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the card click event
                        handleBuyClick();
                    }}
                    className="mt-2 px-4 py-2 bg-slate-700 w-8/12 text-white rounded-3xl hover:bg-green-900 transition"
                >
                    Buy
                </button>
            </div>
        </div>
    );
};

export default ProductCard;