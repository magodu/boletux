import { useTranslation } from 'react-i18next';

import classes from './NotFound.module.scss';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            <div className={`${classes.text} row`} >
                <div className="col-md-12 text-center">
                    <div className="mb-4 lead">{t('common.notFoundMsg')}</div>
                </div>
            </div>
            <div className={`${classes.error} col-md-12`} >
                <div className={classes['error-text']}>
                    <h4>error</h4>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
