export interface CardProps<T> {
  item: T;
}

export type CardContent = {
  id: string | number;
  name?: string;
  type?: string;
  link?: string;
}