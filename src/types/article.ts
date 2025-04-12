export interface Article {
  title: string;
  description?: string; // made optional
  tags: string[];
  image?: string; // also optional if needed
  date: string; // or Date if you convert it
  locale?: string;
}
