import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layouts/Landing_Page/Navbar';
import Sidebar from '@/components/layouts/Search_Result/sidebar';  // Adjust the import based on your project structure
import ProductCard from '@/components/products/ProductCard';  // Adjust the import based on your project structure

const SearchResults = () => {
    const router = useRouter();
    const { results, keyword } = router.query;
    const parsedResults = results ? JSON.parse(results as string) : [];

    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [filteredProductItems, setFilteredProductItems] = useState<any[]>(parsedResults);

    useEffect(() => {
        // Filter product items based on selected locations
        if (selectedLocations.length === 0) {
            setFilteredProductItems(parsedResults); // Show all products if no location is selected
        } else {
            setFilteredProductItems(
                parsedResults.filter(item => selectedLocations.includes(item.location))
            );
        }
    }, [selectedLocations, parsedResults]);

    return (
        <div className="search-results border-slate-950 p-8 mt-16">
            <Navbar />
            <Sidebar selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} />
            <div className="ml-64 p-4">
                <h1 className="text-2xl font-bold mb-4">
                    <span className='italic'>Ta-da!</span> Here's what we found for <span className='text-lime-800 underline italic'>{keyword ? keyword : 'No keyword provided'}:</span>
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {filteredProductItems.map((product: any) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;