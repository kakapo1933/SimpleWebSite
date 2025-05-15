export interface ICardProps<T> {
  item: T;
  onDonate?: (item: T) => void;
}

export type ICardContent = {
  id: string | number;
  name?: string;
  type?: string;
  link?: string;
};
