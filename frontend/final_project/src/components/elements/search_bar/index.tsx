import { useState } from 'react';
import { useRouter } from 'next/router';

interface SearchBarProps {
    search: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ search }) => {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:5000/search?keyword=${searchInput}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const results = await response.json();
            router.push({
                pathname: '/search',
                query: { results: JSON.stringify(results), keyword: searchInput },
            });
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex">
                <div className="relative w-full">
                    <input
                        type="search"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-amber-400 dark:text-white dark:focus:border-green-500 rounded-lg"
                        placeholder="Search for products"
                        value={searchInput}
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type="submit"
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-amber-400 rounded-e-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-amber-400 dark:hover:bg-amber-500 dark:focus:ring-green-800"
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchBar;