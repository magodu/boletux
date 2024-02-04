import React from 'react';

import classes from './TabNavItem.module.scss';

const TabNavItem: React.FC<{ id: string; title: string; activeTab: string; setActiveTab: (id: string) => void, onClick?: () => void }> = ({ id, title, activeTab, setActiveTab, onClick }) => {
    const handleClick = () => {
        setActiveTab(id);
        if (onClick) {
            onClick();
        }
    };

    return (
        <li role="presentation" className={`${classes['nav-item']} ${activeTab === id ? classes.active : ''}`} onClick={handleClick}>
            {title}
        </li>
    );
};

export default TabNavItem;
