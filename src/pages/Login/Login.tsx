import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Loading from '../../components/UI/Loading/Loading';
import AlertModal from '../../components/UI/AlertModal/AlertModal';

import useInput from '../../hooks/useInput';

import { alertModalDataType } from '../../models/appTypes';

import classes from './Login.module.scss';


const Login: React.FC = () => {
    const [formError, setFormError] = useState<boolean>(false);
    const [formIsValid, setFormIsValid] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [alertIsShown, setAlertIsShown] = useState<boolean>(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const alertText = useRef<alertModalDataType>({
        message: '',
    });

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput((value: string) => {
        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return emailRegex.test(value);
    });

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput,
    } = useInput((value: string) => value.trim() !== '');


    useEffect(() => {
        if (enteredEmailIsValid && enteredPasswordIsValid) {
            setFormIsValid(true);
            setFormError(false);
        } else {
            setFormIsValid(false);
        }
    }, [enteredEmailIsValid, enteredPasswordIsValid]);

    const hideAlertHandler = () => {
        setAlertIsShown(false);
    };

    const resetFields = () => {
        resetEmailInput();
        resetPasswordInput();
    };

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();

    };

    return (
        <div className={classes['login-wrapper']}>
            <div className={classes.login}>
{/*                 { (isLoading || isSubmitting) && <Loading />}
 */}                <React.Fragment>
                    {alertIsShown && <AlertModal data={alertText.current} type="warning" onClose={hideAlertHandler} />}

                    <div className={classes.header}>{t('login.title')}</div>
                    <div className={classes.content}>

                        <div className={classes['login-form']}>
                            <div className={classes.wrapper}>
                                {formError && (
                                    <div className={`${classes.message} ${classes.error}`}>
                                        <i className="bi bi-emoji-frown" aria-hidden="true"></i> {t('errorMessages.requiredFields')}
                                    </div>
                                )}

                                <form onSubmit={loginHandler} noValidate>
                                    <div className={classes['form-group']}>
                                        <div className={classes.label}>
                                            <div className={classes['label-text']}>
                                                <div className={classes.text}>{t('login.email')}</div>
                                            </div>
                                        </div>
                                        <div className={classes.input}>
                                            <input type="text" id="email" autoComplete="off" value={enteredEmail} className={classes['input-field']} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
                                            {formError && emailInputHasError && <p className={`${classes['error-text']} no-select`}>{t('errorMessages.requiredField')}</p>}
                                        </div>
                                    </div>
                                    <div className={classes['form-group']}>
                                        <div className={classes.label}>
                                            <div className={classes['label-text']}>
                                                <div className={classes.text}>{t('login.password')}</div>
                                            </div>
                                        </div>
                                        <div className={classes.input}>
                                            <input type="password" id="password" autoComplete="new-password" value={enteredPassword} className={classes['input-field']} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                                            {formError && passwordInputHasError && <p className={`${classes['error-text']} no-select`}>{t('errorMessages.requiredField')}</p>}
                                        </div>
                                    </div>
                                    <div className={classes['form-button']}>
                                        <button type="submit">
                                            {t('login.loginBtn')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={classes.password}><Link to="/recover-password">{t('login.forgotPassword')}</Link> </div>
                        <div className={classes.signup}>{t('login.noAccount')}  <Link to="/sign-up">{t('login.signup')}</Link></div>
                    </div>
                </React.Fragment>
            </div>
        </div>
    );
};

export default Login;
