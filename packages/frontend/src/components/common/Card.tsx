import React from "react";
import { CardContent, CardProps } from "../../types";

export const Card: React.FC<CardProps<CardContent>> = ({
  item = {
    id: -1,
    name: 'Foo',
    type: 'Bar',
    link: 'https://example.com'
  }
}) => {
  return (<div className="flex flex-col flex-1 bg-white rounded-lg shadow-md p-4 mb-4">
    <h2 className="text-xl font-bold mb-2">{item.name}</h2>
    {item.type && (<p className="text-gray-600 mb-2">{item.type}</p>)}
    {item.link && (<a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-700"
    >
      Visit Website
    </a>)}
  </div>);
};