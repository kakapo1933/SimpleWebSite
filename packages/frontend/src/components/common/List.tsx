import React from 'react';

export interface ListProps<T> {
  items: T[];
  loading?: boolean;
  ItemComponent: React.ComponentType<{
    item: T;
    [key: string]: unknown;
  }>
  children?: React.ReactNode;
}

export type ListContent = {
  id: string;
  [key: string]: unknown;
}

export const List: React.FC<ListProps<ListContent>> = ({
  items,
  loading = false,
  ItemComponent,
  children,
}) => {
  return (<div className="flex flex-col px-4 pb-4 pt-4 w-full h-full justify-start items-center overflow-y-scroll">
    {items.map((item) => (<div
      key={item.id}
    >
      <ItemComponent item={item}/>
    </div>))}
    {children && children}
    {loading && (<div className="flex justify-center items-center p-4">
      <div
        className="animate-spin rounded-b-full rounded-t-full h-1/12 w-12 border-b-2 border-l-2 border-r-2 border-teal-300"/>
    </div>)}
  </div>);
};