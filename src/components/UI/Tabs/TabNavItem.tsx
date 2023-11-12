import React from 'react';

import classes from './TabNavItem.module.scss';

const TabNavItem: React.FC<{ id: string; title: string; activeTab: string; setActiveTab: (id: string) => void }> = ({ id, title, activeTab, setActiveTab }) => {
    const handleClick = () => {
        setActiveTab(id);
    };

    return (
        <li role="presentation" className={`${classes['nav-item']} ${activeTab === id ? classes.active : ''}`} onClick={handleClick}>
            {title}
        </li>
    );
};

export default TabNavItem;
