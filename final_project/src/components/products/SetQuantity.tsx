import { CartProductType } from "@/pages/product/[productId]/ProductDetails";
import React from "react";

interface SetQtqProps{
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnStyles = 'border-[1.2px] border-slate-300 px-2 rounded';

const SetQuantity: React.FC<SetQtqProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease
}) => {
    return (
        <div className="flex gap-8 items-center text-slate-950">
            {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
            <div className="flex gap-4 items-center text-base">
                <button onClick={handleQtyDecrease} className="{btnStyles}">-</button>
                <div>{cartProduct.quantity}</div>
                <button onClick={handleQtyIncrease} className="{btnStyles}">+</button>
            </div>
        </div>
    )
}

export default SetQuantity;