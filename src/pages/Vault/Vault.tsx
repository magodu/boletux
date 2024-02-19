import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import classes from './Vault.module.scss';

import TabNavItem from '../../components/UI/Tabs/TabNavItem';
import TabContent from '../../components/UI/Tabs/TabContent';
import ContentBox from '../../components/UI/ContentBox/ContentBox';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';

import { BsArrowLeft, BsArrowRight, BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';
import { RxExternalLink } from "react-icons/rx";

const MIN_INPUT_VALUE = 0;
const MAX_INPUT_VALUE = 200;
const VAULT_CAPACITY_VALUE = '50 BLTX';

const boxStyles = {
    box: { width: '270px' },
};

const Vault: React.FC = () => {
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState<string>('add');
    const [addInputValue, setAddInputValue] = useState<number>(0);
    const [removeInputValue, setRemoveInputValue] = useState<number>(0);

    const navigateTo = (where: string) => {
        console.log('navigate method to', where);
    }

    const changeLiquidityValue = (event: any) => {
        const value = event.target.value;
        console.log('Collect awards method', value);

        if (activeTab === 'add') {
            setAddInputValue(value);
        } else {
            setRemoveInputValue(value);
        }

        // Calculate pair value
    }

    const collectAwards = () => {
        console.log('Collect awards method');
    }

    const confirm = () => {
        console.log('Confirm', activeTab);
    }

    return (
        <div className={classes['vault-wrapper']}>
            <div className={classes['bg-shape']}>
                <img src={roundShapeBgImg} alt="" />
            </div>

            <section className={classes['actions-section']}>
                <div className="container">
                    <div className={`${classes.actions} row mb-none-30`}>
                        <div className={classes['collect-wrapper']}>
                            <div className={classes.collect}>
                                <div className={classes.image}>
                                    <img src={ethereumLogoImg} alt="" />
                                </div>
                                <div className={classes.amount}>
                                    <span className={classes.value}>56</span>
                                    <button onClick={() => collectAwards()}>{t('common.collect')}</button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <button className={classes.info} onClick={() => navigateTo('info')}><BsQuestionCircle /></button> 
                            <button className={classes.stats} onClick={() => navigateTo('stats')}><BsGraphUpArrow /></button> 
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes['vault-section']}>
                <div className={classes['vault-content']}>
                    <div className={classes.vault}>
                        <ContentBox type="special" title={t('vault.vault')} styles={boxStyles} >
                            <div className={classes['box-wrapper']}>
                            <div className={classes['progressbar-wrapper']}>
                                    <div className={classes.progressbar} data-perc="70%">
                                        <div className={classes.bar} style={{ width: '70%' }}></div>
                                    </div>
                                    <p className="mb-2">{t('vault.capacity')} {VAULT_CAPACITY_VALUE}</p>
                                </div>
                                <div className={classes['vault-data-wrapper']}>
                                    <div className={classes['vault-data-box']}>
                                        <div className={classes.value}>21.3%</div>
                                        <div className={classes.label}>{t('vault.totalETH')}</div>
                                    </div>
                                    <div className={`${classes['vault-data-box']}`}>
                                        <div className={classes.value}>0.95</div>
                                        <div className={classes.label}>{t('vault.price')}</div>
                                    </div>
                                </div>
                                <div className={classes['box-vault']}>
                                    <div className={classes['user-liquidity-wrapper']}>
                                        <div className={classes.value}>0.0 BLTX</div>
                                        <div className={classes.label}>{t('vault.your_liquidity')}</div>
                                    </div>
                                </div>

                            </div>
                        </ContentBox>
                    </div>
                    <div className={classes.liquidity}>
                        <ContentBox title={t('vault.liquidity')} styles={boxStyles} >
                            <div className={classes['box-wrapper']}>
                            <form className={classes.form}>
                                    <div className={classes['tabs-wrapper']}>
                                        <ul className={`nav nav-tabs ${classes.tabs}`} role="tablist">
                                            <TabNavItem title={t('vault.add_tab')} id="add" activeTab={activeTab} setActiveTab={setActiveTab} />
                                            <TabNavItem title={t('vault.remove_tab')} id="remove" activeTab={activeTab} setActiveTab={setActiveTab} />
                                        </ul>
                                    </div>
                                    <div className={classes['tabs-content']}>
                                        <TabContent id="add" activeTab={activeTab}>
                                            <div className={classes['add-liquidity-wrapper']}>
                                                <div className={classes['vault-data-input-box']}>
                                                    <div className={classes.value}>
                                                        <input type="number" step="0.1" min={MIN_INPUT_VALUE} max={MAX_INPUT_VALUE} value={addInputValue} onChange={(event) => changeLiquidityValue(event)}/>
                                                    </div> 
                                                    <div className={classes.label}>ETH</div>
                                                </div>
                                                <div className={classes['arrow']}><BsArrowRight /></div>
                                                <div className={`${classes['vault-data-input-box']} ${classes['read-only']}`}>
                                                    <div className={classes.value}>0.95</div>
                                                    <div className={classes.label}>BLTX</div>
                                                </div>
                                            </div> 
                                        </TabContent>
                                        <TabContent id="remove" activeTab={activeTab}>
                                            <div className={classes['remove-liquidity-wrapper']}>
                                                <div className={`${classes['vault-data-input-box']} ${classes['read-only']}`}>
                                                    <div className={classes.value}>0.0</div>
                                                    <div className={classes.label}>ETH</div>
                                                </div>
                                                <div className={classes['arrow']}><BsArrowLeft /></div>
                                                <div className={classes['vault-data-input-box']}>
                                                    <div className={classes.value}>
                                                        <input type="number" step="0.1" min={MIN_INPUT_VALUE} max={MAX_INPUT_VALUE} value={removeInputValue} onChange={(event) => changeLiquidityValue(event)}/>
                                                    </div> 
                                                    <div className={classes.label}>BLTX</div>
                                                </div>
                                            </div> 
                                        </TabContent>
                                    </div>
                                    <div className={classes.buttons}>
                                        <button type="button" className={classes.large} disabled={true} onClick={() => confirm()}>
                                            {t('vault.confirm_btn')}
                                        </button> 
                                    </div>
                                </form>

                            </div>
                        </ContentBox>
                    </div>
                </div>
            </section>

            <section className={classes['instructions-section']}>
                    <div className={classes.content}>
                        <h3 className={classes.title}>{t('vault.instructions_title')}</h3>
                        <div className={classes['instructions-wrapper']}>                             
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('vault.instructions_step')} 1</div>
                                <div className={classes.title}>{t('vault.instructions_step1_title')}</div>
                                <div className={classes.text}>{t('vault.instructions_step1_text')}</div>
                            </div>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('vault.instructions_step')} 2</div>
                                <div className={classes.title}>{t('vault.instructions_step2_title')}</div>
                                <div className={classes.text}>{t('vault.instructions_step2_text')}</div>
                            </div>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('vault.instructions_step')} 3</div>
                                <div className={classes.title}>{t('vault.instructions_step3_title')}</div>
                                <div className={classes.text}>{t('vault.instructions_step3_text')}</div>
                            </div>
                        </div>
                        <div className={classes['detail-link']}>
                            <a href="https://boletux.gitbook.io/docs/v/espa/real-yield-investments/vault" target="_blank">{t('bets.instructions_details_link')} <RxExternalLink /></a>
                        </div>
                    </div>
                </section>
        </div>
    );
};

export default Vault;
