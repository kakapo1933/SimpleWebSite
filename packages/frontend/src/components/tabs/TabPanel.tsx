import React from 'react';

interface TabPanelProps {
  children: React.ReactNode;
  id: string;
  activeTab: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, id, activeTab }) => {
  if (id !== activeTab) {
    return null;
  }

  return (<div
    role="tabpanel"
    id={`panel-${id}`}
    aria-labelledby={id}
    className="focus:outline-none"
  >
    {children}
  </div>);
};

export default TabPanel;