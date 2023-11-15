import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

import classes from './NotFound.module.scss';

import notFoundImg from '../../assets/images/404-image.png';

const NotFound = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/home');
    };

    return (
 
        <section className={classes['not_found-section']}>     
            <div className={classes['image-wrapper']}>
                <div className={classes.image}>
                    <img src={notFoundImg} alt="" />
                </div>
            </div>
            <div className={`${classes.error} col-md-12`} >
                <div className={classes['error-text']}>
                    <h4>{t('common.notPageFoundMsg')}</h4>
                </div>
            </div>
            <div className={classes.text}>
                {t('common.notFoundGoBackMsg')}
            </div>
            <div className={classes.buttons}>
                <button type="button" className={classes.large} disabled={false} onClick={() => goHome()}>
                    Back Home
                </button>
            </div>
        </section>
    );
};

export default NotFound;
