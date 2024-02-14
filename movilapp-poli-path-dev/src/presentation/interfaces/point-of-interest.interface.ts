export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  imageNames?: string[];
  imageUrls?: string[];
  type: string;
}
