import ProductCard from "@/components/fragments/ProductCard"
import CardCategory from "@/components/fragments/CategoryCard"

export default function ProductCardCategory() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <CardCategory/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    )
}