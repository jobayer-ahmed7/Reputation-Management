// Interface for service features
export interface IFeature {
  feature: string;
}

// Interface for service document
export interface IService {
  _id?: string;
  category: string;
  title: string; 
  description: string;
  platform: string;
  price: string;
  originalPrice: string;
  badge: string | null;
  features: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
