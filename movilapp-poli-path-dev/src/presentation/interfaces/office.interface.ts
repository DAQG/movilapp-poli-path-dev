export interface Office {
  id: string;
  name: string;
  codeOrNo: number;
  description: string;
  teacherName: string;
  imageNames?: string[];
  imageUrls?: string[];
  type: string;
  schedule: string;
}
