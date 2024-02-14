export interface OkResponse {
  ok: boolean;
  message: string;
  status: number;
}

export interface OKResponseProfileImage extends OkResponse {
  nameProfileImage: string;
  imageUrl: string;
}
