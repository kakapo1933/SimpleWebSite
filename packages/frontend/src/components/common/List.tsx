import React from 'react';

export interface IListProps<T> {
  items: T[];
  loading?: boolean;
  ItemComponent: React.ComponentType<{
    item: T;
    [key: string]: unknown;
  }>;
  children?: React.ReactNode;
}

export type ListContent = {
  id: string;
  [key: string]: unknown;
};

export const List: React.FC<IListProps<ListContent>> = ({
  items,
  loading = false,
  ItemComponent,
  children,
}): JSX.Element => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="w-full flex-1 overflow-y-auto px-4 pb-4 pt-4">
        {items.map(item => (
          <div key={item.id} className="w-full">
            <ItemComponent item={item} />
          </div>
        ))}
        {children && <div className="w-full">{children}</div>}
        {loading && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-b-full rounded-t-full h-12 w-12 border-b-2 border-l-2 border-r-2 border-teal-400" />
          </div>
        )}
      </div>
    </div>
  );
};
