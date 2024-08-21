// types.ts
export interface ProductOverviewData {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  image_url: string;
}

export interface Order {
  order_id: number;
  total_amount: number;
  delivery_date: string;
}

export interface StoreInfo {
  store_name: string;
  description: string;
  bank_account: string;
  contact_number: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  image_url: string;
}
