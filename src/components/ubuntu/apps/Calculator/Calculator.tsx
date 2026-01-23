import { useState } from 'react';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    let result = previousValue;

    switch (operation) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '×':
        result = previousValue * inputValue;
        break;
      case '÷':
        result = previousValue / inputValue;
        break;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const buttonClass = (type: 'number' | 'operation' | 'function') => {
    const base = 'w-full h-16 rounded-lg font-medium text-2xl transition-all hover:scale-105 active:scale-95 shadow-md';
    switch (type) {
      case 'number':
        return `${base} bg-muted/40 hover:bg-muted/60 text-foreground`;
      case 'operation':
        return `${base} bg-primary/80 hover:bg-primary text-primary-foreground`;
      case 'function':
        return `${base} bg-muted/20 hover:bg-muted/40 text-foreground`;
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-ubuntu-window p-4">
      {/* Calculator Container - Max width for better look when maximized */}
      <div className="w-full max-w-md flex flex-col" style={{ maxHeight: '700px' }}>
        {/* Display */}
        <div className="bg-muted/30 rounded-lg p-6 mb-4 shadow-lg">
          <div className="text-right text-5xl font-light text-foreground truncate">
            {display}
          </div>
          {operation && previousValue !== null && (
            <div className="text-right text-base text-muted-foreground mt-2">
              {previousValue} {operation}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3 flex-1">
          <button onClick={clear} className={buttonClass('function')}>AC</button>
          <button onClick={toggleSign} className={buttonClass('function')}>+/-</button>
          <button onClick={percentage} className={buttonClass('function')}>%</button>
          <button onClick={() => performOperation('÷')} className={buttonClass('operation')}>÷</button>

          <button onClick={() => inputDigit('7')} className={buttonClass('number')}>7</button>
          <button onClick={() => inputDigit('8')} className={buttonClass('number')}>8</button>
          <button onClick={() => inputDigit('9')} className={buttonClass('number')}>9</button>
          <button onClick={() => performOperation('×')} className={buttonClass('operation')}>×</button>

          <button onClick={() => inputDigit('4')} className={buttonClass('number')}>4</button>
          <button onClick={() => inputDigit('5')} className={buttonClass('number')}>5</button>
          <button onClick={() => inputDigit('6')} className={buttonClass('number')}>6</button>
          <button onClick={() => performOperation('-')} className={buttonClass('operation')}>−</button>

          <button onClick={() => inputDigit('1')} className={buttonClass('number')}>1</button>
          <button onClick={() => inputDigit('2')} className={buttonClass('number')}>2</button>
          <button onClick={() => inputDigit('3')} className={buttonClass('number')}>3</button>
          <button onClick={() => performOperation('+')} className={buttonClass('operation')}>+</button>

          <button onClick={() => inputDigit('0')} className={`${buttonClass('number')} col-span-2`}>0</button>
          <button onClick={inputDecimal} className={buttonClass('number')}>.</button>
          <button onClick={calculate} className={buttonClass('operation')}>=</button>
        </div>
      </div>
    </div>
  );
}
