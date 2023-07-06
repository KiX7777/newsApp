export interface Article {
  url: string;
  title: string;
  date: string;
  section: string;
  author: string;
  abstract: string;
  images: string[];
  id: string;
}

export type GenericObj = Record<string, any>;
