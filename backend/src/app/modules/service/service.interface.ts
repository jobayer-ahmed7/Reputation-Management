export const serviceTypes = ['Standard', 'Monthly'] as const;

// Interface for service document
export interface IService {
  _id?: string;
  platform: string;
  name: string;
  count: string;
  price: number;
  deliveryTimeRange: string;
  type: (typeof serviceTypes)[number];
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
