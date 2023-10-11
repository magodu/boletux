import classes from './Spinner.module.scss';

const Spinner = () => {
    return (
        <div className={classes.spinner} >
            <div className={`spinner-border ${classes['loading-color']}`} style={{width: '3rem', height: '3rem'}} role="status"></div>
        </div>
    );
};

export default Spinner;
