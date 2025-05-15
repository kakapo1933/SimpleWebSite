import React from 'react';
import { ICardContent, ICardProps } from '../../types';

export const Card: React.FC<ICardProps<ICardContent>> = ({
  item = {
    id: -1,
    name: 'Foo',
    type: 'Bar',
    link: 'https://example.com',
  },
  onDonate,
}): JSX.Element => {
  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      <div className="p-5 flex-grow">
        <h2 className="text-xl font-bold mb-2 break-words text-slate-950">{item.name}</h2>
        {item.type && <p className="text-slate-800 mb-3 break-words">{item.type}</p>}
      </div>

      <div className="px-5 py-4 border-t border-slate-100 mt-auto flex justify-between items-center">
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-slate-900 truncate inline-block max-w-[45%]"
          >
            Visit Website
          </a>
        )}

        {onDonate && (
          <button
            onClick={() => onDonate(item)}
            className="bg-slate-600 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-md transition-colors ml-auto"
          >
            Donate
          </button>
        )}
      </div>
    </div>
  );
};
