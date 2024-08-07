import React, { useState, useEffect, useRef } from 'react';
import './calculator.css';
import SplitterLogo from '../assets/images/logo.svg';
import DollarIcon from '../assets/images/icon-dollar.svg';
import PersonIcon from '../assets/images/icon-person.svg';

const TipCalculator = () => {
    const [amount, setAmount] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [selectedTip, setSelectedTip] = useState('');
    const [customTip, setCustomTip] = useState('');
    const [totalTip, setTotalTip] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showCustomTip, setShowCustomTip] = useState(false);
    const inputRef = useRef(null);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleNumberOfPeopleChange = (e) => {
        setNumberOfPeople(e.target.value);
    };

    const handleTipChange = (e) => {
        setSelectedTip(e.target.value);
        if(showCustomTip) {
            setShowCustomTip(false);
            setCustomTip('');
        }
    };

    const handleCustomTipChange = (e) => {
        setCustomTip(e.target.value);
    };

    const hidePlaceholderCustomTip = () => {
        setShowCustomTip(true);
        setSelectedTip('');
        focus();
    }

    const focus = () => {
        inputRef.current.focus();
    };

    const closeCustomTip = () => {
        if(!customTip) {
            setShowCustomTip(false);
            setCustomTip('');
        }
    }

    const resetCalculator = () => {
        setAmount('');
        setNumberOfPeople('');
        setSelectedTip('');
        setCustomTip('');
        setTotalTip(0);
        setTotalAmount(0);
        setShowCustomTip(false);
    }

    useEffect(() => {
        const amountNum = parseFloat(amount);
        const peopleNum = parseInt(numberOfPeople, 10);
        const tipPercentage = customTip ? parseFloat(customTip) : parseFloat(selectedTip);
    
        if (!isNaN(amountNum) && !isNaN(peopleNum) && !isNaN(tipPercentage) && peopleNum > 0) {
          const tipAmount = (amountNum * tipPercentage) / 100;
          const totalAmountWithTip = amountNum + tipAmount;
          setTotalTip(tipAmount.toFixed(2));
          setTotalAmount((totalAmountWithTip / peopleNum).toFixed(2));
        } else {
          setTotalTip(0);
          setTotalAmount(0);
        }
      }, [amount, numberOfPeople, selectedTip, customTip]);
        
    return ( 
        <div className='calculator-main'>
            <form name='TipCalculator'>
                <div className='splitter-logo'>
                    <img src={SplitterLogo} />
                </div>
                <div className='calculator-container'>
                    <div className='calculator-component'>
                        <div className='calculator-functions'>
                            <div className='bill-amount-wrapper'>
                                <p className="section-header">Bill</p>
                                <div className='custom-input-box-wrapper'>
                                    <img src={DollarIcon} className='input-icon' />
                                    <input type="number" className="custom-input-box bill-amount-input" value={amount} onChange={handleAmountChange} placeholder='0'/>
                                </div>
                            </div>
                            <div className="select-tip-wrapper">
                                <p className="section-header">Select tip %</p>
                                <div className='tip-row'>
                                    <label className="tip-box">
                                        <input 
                                            type="radio" 
                                            className="d-none"
                                            name="tip"
                                            value="5"
                                            checked={selectedTip === '5'}
                                            onChange={handleTipChange}
                                        />
                                        <div className="">5%</div>
                                    </label>
                                    <label className="tip-box">
                                        <input 
                                            type="radio" 
                                            className="d-none"
                                            name="tip"
                                            value="10"
                                            checked={selectedTip === '10'}
                                            onChange={handleTipChange}
                                        />
                                        <div className="">10%</div>
                                    </label>
                                    <label className="tip-box">
                                        <input 
                                            type="radio" 
                                            className="d-none"
                                            name="tip"
                                            value="15"
                                            checked={selectedTip === '15'}
                                            onChange={handleTipChange}
                                        />
                                        <div className="">15%</div>
                                    </label>
                                    <label className="tip-box">
                                        <input 
                                            type="radio" 
                                            className="d-none"
                                            name="tip"
                                            value="25"
                                            checked={selectedTip === '25'}
                                            onChange={handleTipChange}
                                        />
                                        <div className="">25%</div>
                                    </label>
                                    <label className="tip-box">
                                        <input 
                                            type="radio" 
                                            className="d-none"
                                            name="tip"
                                            value="50"
                                            checked={selectedTip === '50'}
                                            onChange={handleTipChange}
                                        />
                                        <div className="">50%</div>
                                    </label>
                                    <div className="tip-box custom-tip-box-container" onBlur={closeCustomTip}>
                                        <input type="text" className="custom-tip-box custom-input-box" value={customTip} onChange={handleCustomTipChange} ref={inputRef} />
                                        {!showCustomTip && <span className="custom-placeholder" onClick={hidePlaceholderCustomTip}>
                                            <span className="custom-placeholder-text">Custom</span>
                                        </span>}
                                    </div>
                                </div>
                            </div>
                            <div className="people-amount-wrapper">
                                <div className="people-label-wrapper">
                                    <p className="section-header">Number of people</p>
                                    {numberOfPeople === '0' && <p className="section-header error">Can't be zero</p>}
                                </div>
                                
                                <div className='custom-input-box-wrapper'>
                                    <img src={PersonIcon} className='input-icon' />
                                    <input type="number" className={numberOfPeople === '0' ? 'custom-input-box error-outline' : 'custom-input-box'} value={numberOfPeople} onChange={handleNumberOfPeopleChange}  placeholder='0'/>
                                </div>
                            </div>
                        </div>
                        <div className="calculator-results">
                            <div className="tip-calculations">
                                <div className="tip-calculations-row">
                                    <div className="tip-calculation-text-wrapper">
                                        <div className="tip-calculation-text">Tip Amount</div>
                                        <div className="tip-calculation-per-person">/ person</div>
                                    </div>
                                    <div className="tip-calculation-amount-wrapper">
                                        ${totalTip}
                                    </div>
                                </div>
                                <div className="tip-calculations-row">
                                    <div className="tip-calculation-text-wrapper">
                                        <div className="tip-calculation-text">Total</div>
                                        <div className="tip-calculation-per-person">/ person</div>
                                    </div>
                                    <div className="tip-calculation-amount-wrapper">
                                        ${totalAmount}
                                    </div>
                                </div>
                            </div>
                            <div className="calculation-reset-button-wrapper">
                                <button className="reset-button" onClick={resetCalculator} disabled={!totalAmount}>RESET</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default TipCalculator;