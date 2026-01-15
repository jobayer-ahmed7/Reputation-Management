export type TServiceFormData = {
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
};

export type TService = {
  _id?: string;
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
};

export type TUpdateService = { 
  _id?: string;
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: "Standard" | "Monthly";
  isFeatured: boolean;
};

export interface UpdateServiceProps {
  service: TUpdateService;
}