import { useRouter } from 'next/router';
import ProductCard from '@/components/products/ProductCard';  // Adjust the import based on your project structure
import Navbar from '@/components/layouts/Landing_Page/Navbar';

const SearchResults = () => {
    const router = useRouter();
    const { results } = router.query;
    const parsedResults = results ? JSON.parse(results as string) : [];

    return (
        <div className="search-results border-slate-950 p-8 mt-16" >
            <Navbar />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                <h1>Search Results:</h1>
                {parsedResults.map((product: any) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;