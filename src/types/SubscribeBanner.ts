export interface BannerImage {
  url: string;
  public_id: string;
  _id?: string;
}

export interface SubscribeBanner {
  _id: string;
  images: BannerImage[];
  quote_text: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
