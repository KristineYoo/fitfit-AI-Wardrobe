export interface Item {
    id: number;
    name: string;
    note: string;
    category: string;
    color: string[];
    image: string | null;
    imageData: string | null;
    styling: {
      tags: string[];
      season: string[];
      occasion: string[];
      mood: string[];
    };
    visibility: string;
    fabric: {
        material: string[];
        thickness: string;
    };
    embedding:number[];
    deleted:boolean;
  };
  
  export interface Fit {
    items: Item[];
    tags: string[];
  };