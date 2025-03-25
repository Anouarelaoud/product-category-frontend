export interface Category {
    id: number;
    name: string;
    parentCategory?: Category;
    subcategories?: Category[];
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: Category;
  }
  