export interface CardProps<T> {
  item: T;
  onDonate?: (item: T) => void;
}

export type CardContent = {
  id: string | number;
  name?: string;
  type?: string;
  link?: string;
}