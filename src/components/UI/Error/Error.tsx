import classes from './Error.module.scss';

const Error: React.FC<{ errorMessage: string }> = ({ errorMessage }) => {
    const message = errorMessage || 'An error has ocurred';

    return (
        <div className={classes['error-container']}>
            <div className="alert alert-danger text-center" role="alert">
                <i className="bi bi-exclamation-triangle mr-1"></i>
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Error;
