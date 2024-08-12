import { formatPrice } from "@/utils/formatPrice";
import { truncate } from "fs";
import Image from "next/image";

interface ProductCardProps{
    data: any
}

const ProductCard:React.FC<ProductCardProps> = ({data}:any) => {
    return (
        <div className="col-span-1 curson-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2
        transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden rounded-lg relative w-full">
                    <Image fill
                    src={data.images[0].image}
                    alt={data.name}
                    className="w-full h-full object-contain"/>
                </div>

                <div className="mt-4 truncate"
                style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', display: 'inline-block'}}>
                    <span>{data.name}</span>
                </div>

                <div>{data.reviews.length} reviews</div>

                <div className="font-semibold">{formatPrice(data.price)}</div>
            </div>

        </div>
    )
}

export default ProductCard;