export interface Laboratory {
  id: string;
  name: string;
  description: string;
  buildingId: string;
  imageNames?: string[];
  imageUrls?: string[];
  type: string;
}
