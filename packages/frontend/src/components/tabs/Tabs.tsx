import React, {useCallback, useState} from 'react';
import {TabsProps} from './types.ts';
import TabList from './TabList';
import TabPanel from './TabPanel.tsx';

export const Tabs: React.FC<TabsProps> = ({
  tabs, defaultActiveTab, onChange, className = '',
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || tabs[0]?.id || '');

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  }, [onChange]);

  if (!tabs.length) {
    return null;
  }

  return (<div className={`w-full ${className}`}>
    <TabList
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />

    <div className="mt-4">
      {tabs.map((tab) => (<TabPanel
        key={tab.id}
        id={tab.id}
        activeTab={activeTab}
      >
        {tab.content}
      </TabPanel>))}
    </div>
  </div>);
};