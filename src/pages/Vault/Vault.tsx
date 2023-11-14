import React, { useState } from 'react';

import classes from './Vault.module.scss';

import TabNavItem from '../../components/UI/Tabs/TabNavItem';
import TabContent from '../../components/UI/Tabs/TabContent';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import boxHeaderYellowImg from '../../assets/images/box-wrapper-header-yellow.png';
import boxFooterYellowImg from '../../assets/images/box-wrapper-footer-yellow.png';
import boxHeaderImg from '../../assets/images/box-wrapper-header.png';
import boxFooterImg from '../../assets/images/box-wrapper-footer.png';

import { BsArrowLeft, BsArrowRight, BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';

const MIN_INPUT_VALUE = 0;
const MAX_INPUT_VALUE = 200;

const Vault: React.FC = () => {
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
            <div className={`${classes.title} container`}>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Invest against gamblers</h2>
                    </div>
                </div>
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
                                    <button onClick={() => collectAwards()}>Collect</button>
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
                        <div className={`${classes.box} ${classes['box-yellow']}`}>
                            <div className={classes.header}>
                                <img src={boxHeaderYellowImg} alt="" />
                                <div className={classes['box-title']}>Vault</div>
                            </div>
                            <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                <div className={classes['progressbar-wrapper']}>
                                    <div className={classes.progressbar} data-perc="70%">
                                        <div className={classes.bar} style={{ width: '70%' }}></div>
                                    </div>
                                    <p className="mb-2">Max capacity: 30 BLTX</p>
                                </div>
                                <div className={classes['vault-data-wrapper']}>
                                    <div className={classes['vault-data-box']}>
                                        <div className={classes.value}>21.3%</div>
                                        <div className={classes.label}>APR</div>
                                    </div>
                                    <div className={`${classes['vault-data-box']}`}>
                                        <div className={classes.value}>0.95</div>
                                        <div className={classes.label}>Price</div>
                                    </div>
                                </div>
                                <div className={classes['box-vault']}>
                                    <div className={classes['user-liquidity-wrapper']}>
                                        <div className={classes.value}>0.0 BLTX</div>
                                        <div className={classes.label}>Your Liquidity</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.footer}>
                                <img src={boxFooterYellowImg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.liquidity}>
                        <div className={classes.box}>
                            <div className={classes.header}>
                                <img src={boxHeaderImg} alt="" />
                                <div className={classes['box-title']}>Liquidity</div>
                            </div>
                            <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                <form className={classes.form}>
                                    <div className={classes['tabs-wrapper']}>
                                        <ul className={`nav nav-tabs ${classes.tabs}`} role="tablist">
                                            <TabNavItem title="Add" id="add" activeTab={activeTab} setActiveTab={setActiveTab} />
                                            <TabNavItem title="Remove" id="remove" activeTab={activeTab} setActiveTab={setActiveTab} />
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
                                            Confirm
                                        </button> 
                                    </div>
                                </form>
                            </div>
                            <div className={classes.footer}>
                                <img src={boxFooterImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Vault;
