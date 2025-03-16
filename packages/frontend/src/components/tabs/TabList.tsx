import React from 'react';
import { TabItem } from './types';

interface TabListProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabList: React.FC<TabListProps> = ({
  tabs, activeTab, onTabChange,
}) => {
  return (<div className="flex border-b border-gray-200">
    {tabs.map((tab) => (<button
      key={tab.id}
      onClick={() => !tab.disabled && onTabChange(tab.id)}
      className={`
            px-4 py-2 -mb-px text-sm font-medium
            transition-colors duration-200
            ${activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}
            ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
      disabled={tab.disabled}
      role="tab"
      aria-selected={activeTab === tab.id}
      aria-controls={`panel-${tab.id}`}
    >
      {tab.label}
    </button>))}
  </div>);
};

export default TabList;