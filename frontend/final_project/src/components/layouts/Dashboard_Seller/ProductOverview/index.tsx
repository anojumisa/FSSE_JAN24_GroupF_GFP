import React from 'react';
import { ProductOverviewData } from '../../../../types/seller';
interface ProductOverviewProps {
  overview: ProductOverviewData[];
}

const ProductOverview: React.FC<ProductOverviewProps> = ({ overview }) => {
  if (!overview || !Array.isArray(overview) || overview.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-orange-200 p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
      {overview.map((product) => (
        <div key={product.id} className="mb-4">
          <p>Nama Produk: {product.name}</p>
          <p>Jumlah Produk: {product.stock_quantity}</p>
          <p>Harga: {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductOverview;
