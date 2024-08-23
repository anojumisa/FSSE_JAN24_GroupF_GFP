export interface User {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    image_url?: string; 
    created_at: string;
    username: string;
    
  }
  
  export interface Transaction {
    id: number;
    total_price: number;
    created_at: string; 
    status: string;
  }