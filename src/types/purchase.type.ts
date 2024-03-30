export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5;

export type PurchaseListStatus = PurchaseStatus | 0;

export interface Purchase {
  createdAt: string;
  updatedAt: string;
  depotId: number;
  id: number;
  image: string;
  name: string;
  price: number;
  product_id: number;
  quantity: number;
  quantityInDB: number;
  salePrice: number;
  selectedRom: string;
  selectedRam: string;
  selectedColor: string;
  mass: number;
  dimension: string;
  slug: string;
  typeId: number;
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean;
  checked: boolean;
}

