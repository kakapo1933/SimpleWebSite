import React from "react";
import { CardContent, CardProps } from "../../types";

export const Card: React.FC<CardProps<CardContent>> = ({
  item = {
    id: -1,
    name: 'Foo',
    type: 'Bar',
    link: 'https://example.com'
  },
  onDonate
}) => {
  return (
    <div className="flex flex-col flex-1 bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-full overflow-hidden">
      <h2 className="text-xl font-bold mb-2 break-words">{item.name}</h2>
      {item.type && (<p className="text-slate-950 mb-2 break-words">{item.type}</p>)}

      <div className="flex justify-between items-center mt-2">
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-500 truncate inline-block max-w-[45%]"
          >
            Visit Website
          </a>
        )}

        {onDonate && (
          <button
            onClick={() => onDonate(item)}
            className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-1 px-4 rounded-md transition-colors"
          >
            Donate
          </button>
        )}
      </div>
    </div>
  );
};