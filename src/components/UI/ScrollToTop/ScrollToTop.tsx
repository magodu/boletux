import React, { useState, useEffect } from 'react';

import classes from './ScrollToTop.module.scss';

const ScrollToTop = () => {
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 400) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		});
	}, []);

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className={classes['top-to-btm']}>
			{showTopBtn && (
                <button type="button" className={`btn btn-danger btn-floating btn-lg ${classes['icon-position']} ${classes['icon-style']}`} id="btn-back-to-top" onClick={goToTop}>
                   <i className="bi bi-chevron-up"></i>
               </button>
			)}
		</div>
	);
};

export default ScrollToTop;
