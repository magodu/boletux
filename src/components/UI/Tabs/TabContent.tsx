import React from 'react';

import classes from './TabContent.module.scss';


const TabContent: React.FC<{ id: string; activeTab: string; children: React.ReactElement }> = ({ id, activeTab, children }) => {
    return activeTab === id ? <div className="TabContent">{children}</div> : null;
};

export default TabContent;
