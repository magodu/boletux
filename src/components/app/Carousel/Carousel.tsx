import React, { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import classes from './Carousel.module.scss';

import { nftList } from '../../../models/appTypes';

const Carousel: React.FC<{ list: nftList[], emptyText: string, onSelect: (elem: any) => void }> = ({ list, emptyText, onSelect }) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        const elem = slide === list.length - 1 ? 0 : slide + 1;
        setSlide(elem);
        onSelect(elem);
    };

    const prevSlide = () => {
        const elem = slide === 0 ? list.length - 1 : slide - 1;
        setSlide(elem);
        onSelect(elem);
    };

    return (
        <>
            {list && list.length > 0 && (
                <div className={classes.carousel} >
                    <BsArrowLeftCircleFill onClick={prevSlide} className={`${classes.arrow} ${classes['arrow-left']}`} />
                    {list.map((item, idx) => {
                        return <img src={item.src} alt={item.alt} key={item.id} className={slide === idx ? classes.slide : `${classes.slide} ${classes['slide-hidden']}`} />;
                    })}
                    <BsArrowRightCircleFill onClick={nextSlide} className={`${classes.arrow} ${classes['arrow-right']}`} />
                </div>
            )}

            {list && list.length === 0 && (
                <div className={classes.empty}>{emptyText}</div>
            )}
        </>
    );
};

export default Carousel;
