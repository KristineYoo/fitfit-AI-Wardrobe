export interface Item {
    id: number;
    name: string;
    note: string;
    category: string;
    brand: string;
    size: string;
    color: string;
    image: string;
    styling: {
      tags: string[];
      season: string;
      occasion: string;
      mood: string;
    };
    purchaseInfo: {
        price: number;
        currency: string;
        date: string;
        shopLink: string;
        location: string;
        resaleValue: number;
    };
    status: {
        damage: string;
        location: string;
        visibility: string;
        comment: string;
    };
    fabric: {
        material: string;
        care: string;
        stretch: string;
        thickness: string;
    };
  };
  
  export interface Fit {
    items: Item[];
    name: string;
    tags: string[];
  };