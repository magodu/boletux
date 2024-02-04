import React, { useEffect, useRef } from 'react';

import classes from './ContentBox.module.scss';

import boxHeaderYellowImg from '../../../assets/images/box-wrapper-header-yellow.png';
import boxFooterYellowImg from '../../../assets/images/box-wrapper-footer-yellow.png';
import boxHeaderImg from '../../../assets/images/box-wrapper-header.png';
import boxFooterImg from '../../../assets/images/box-wrapper-footer.png';


type ContentBoxProps = {
    children: React.ReactNode;
    type?: 'normal' | 'special';
    title?: string;
    styles?: any;
}

const ContentBox: React.FC<ContentBoxProps> = ({ children, type = 'normal', title = '', styles = {} }) => {
    const boxRef = useRef(null);
    const headerImg = type === 'normal' ? boxHeaderImg : boxHeaderYellowImg;
    const footerImg = type === 'normal' ? boxFooterImg : boxFooterYellowImg;

    const applyStyles = (element: HTMLElement, styles: any) => {
        Object.keys(styles).forEach((key: any) => {
            element.style[key] = styles[key];
        });
    };

    const applyAllStyles = () => {
        Object.keys(styles).forEach((originalClass) => {
            const elements = boxRef.current?.querySelectorAll('*');
            
            Array.from(elements).forEach((element: any) => {
                if (element.className.length > 0) {
                    const parts = element.className.split('_');
                    const transformedClass = parts[1];
                    if (transformedClass === originalClass) {
                        applyStyles(element, styles[originalClass]);
                    }
                }
            });
        });
    };

    useEffect(() => {
        applyAllStyles();
    }, [styles]);

    return (
        <div className={`${classes.box} ${type === 'special' ? classes['box-yellow'] : ''}`} ref={boxRef} >
            <div className={classes.header}>
                <img src={headerImg} alt="" />
                <div className={classes['box-title']}>{title}</div>
            </div>
            <div className={classes.content}>
                {children}
            </div>
            <div className={classes.footer}>
                <img src={footerImg} alt="" />
            </div>
        </div>
    );
};

export default ContentBox;
