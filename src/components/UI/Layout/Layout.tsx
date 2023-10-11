import React from 'react';

import Header from '../../app/Header/Header';
import Footer from '../../app/Footer/Footer';

interface LayoutProps {
    children: React.ReactNode;
    onChangeLanguage: (language: string) => void;
}

const Layout: React.FC<LayoutProps> = (props) => {

    const changeLanguageHandler = (language: string) => {
        props.onChangeLanguage(language);
    };

    return (
        <>
            <Header data={null} onChangeLanguage={changeLanguageHandler} />
            <div>{props.children}</div>
            <Footer />
        </>
    );
};

export default Layout;
