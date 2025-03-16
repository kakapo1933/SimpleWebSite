import React from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}