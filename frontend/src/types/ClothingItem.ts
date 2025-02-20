export interface Styling {
  tags: string[];
  season: string;
  occasion: string;
  mood: string;
}

export interface PurchaseInfo {
  price: number;
  currency: string;
  date: string;
  shopLink: string;
  location: string;
  resaleValue: number;
}

export interface Status {
  damage: string;
  location: string;
  visibility: string;
  comment: string;
}

export interface Fabric {
  material: string;
  care: string;
  stretch: string;
  thickness: string;
}

export interface ClothingItem {
  id: number;
  name: string;
  note: string;
  category: string;
  brand: string;
  size: string;
  color: string;
  image: string;
  styling: Styling;
  purchaseInfo: PurchaseInfo;
  status: Status;
  fabric: Fabric;
}
