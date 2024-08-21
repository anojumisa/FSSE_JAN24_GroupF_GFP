import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
    selectedLocations: string[];
    setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
    selectedPrice: number;
    setSelectedPrice: React.Dispatch<React.SetStateAction<number>>;
}

const PriceFilter: React.FC<{ selectedPrice: number, handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ selectedPrice, handlePriceChange }) => (
    <div className="mb-4">
        <h3 className="font-semibold">Price Range</h3>
        <input 
            type="range" 
            min="5000" 
            max="200000" 
            step="5000" 
            className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer" 
            value={selectedPrice}
            onChange={handlePriceChange}
        />
        <p>Max. Price: Rp{selectedPrice}</p>
    </div>
);

const Sidebar: React.FC<SidebarProps> = ({ selectedLocations, setSelectedLocations, selectedPrice, setSelectedPrice }) => {
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setSelectedLocations(prev =>
            checked ? [...prev, value] : prev.filter(location => location !== value)
        );
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPrice(Number(e.target.value));
    };

    return (
        <div className="flex">
            <div className={`fixed top-16 pt-10 left-0 h-full p-4 border-r border-gray-200 bg-yellow-400 transition-all duration-300 ease-in-out ${isMinimized ? 'w-16' : 'w-64'}`}>
                <button onClick={toggleSidebar} className={`absolute top-2 ${isMinimized ? 'right-2' : 'right-4'} transition-all duration-300 ease-in-out`}>
                    <FontAwesomeIcon icon={isMinimized ? faChevronRight : faChevronLeft} />
                </button>
                <div className={`transition-opacity duration-300 ease-in-out ${isMinimized ? 'opacity-0' : 'opacity-100'}`}>
                    {!isMinimized && (
                        <>
                            <h2 className="text-xl font-bold mb-4">Filters</h2>
                            {/* Add your filter options here */}
                            
                            <PriceFilter selectedPrice={selectedPrice} handlePriceChange={handlePriceChange} />

                            <div className="mb-4">
                                <h3 className="font-semibold">Location</h3>
                                <ul>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="jakarta"
                                            value="Jakarta"
                                            onChange={handleLocationChange}
                                            checked={selectedLocations.includes('Jakarta')}
                                        />
                                        <label htmlFor="jakarta" className="ml-2">Jakarta</label>
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="bandung"
                                            value="Bandung"
                                            onChange={handleLocationChange}
                                            checked={selectedLocations.includes('Bandung')}
                                        />
                                        <label htmlFor="bandung" className="ml-2">Bandung</label>
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="yogyakarta"
                                            value="Yogyakarta"
                                            onChange={handleLocationChange}
                                            checked={selectedLocations.includes('Yogyakarta')}
                                        />
                                        <label htmlFor="yogyakarta" className="ml-2">Yogyakarta</label>
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="palembang"
                                            value="Palembang"
                                            onChange={handleLocationChange}
                                            checked={selectedLocations.includes('Palembang')}
                                        />
                                        <label htmlFor="palembang" className="ml-2">Palembang</label>
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="makassar"
                                            value="Makassar"
                                            onChange={handleLocationChange}
                                            checked={selectedLocations.includes('Makassar')}
                                        />
                                        <label htmlFor="makassar" className="ml-2">Makassar</label>
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            id="manado"
                                            value="Manado"
                                            onChange={handleLocationChange}
                                            checked={selectedLocations.includes('Manado')}
                                        />
                                        <label htmlFor="manado" className="ml-2">Manado</label>
                                    </li>
                                </ul>
                            </div>
                            {/* Add more filter options as needed */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;