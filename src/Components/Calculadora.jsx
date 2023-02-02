import { useState } from 'react';
import './Calculadora.css';
import Button from './Button'
import Display from './Display';

function Calculadora() {
  const [firstStored, setFirstStored] = useState(0)
  const [value, setValue] = useState(0)
  const [sequence, setSequence] = useState(false)
  const [operation, setOperation] = useState(null)

  function clearValue() {
    setValue(0)
    setFirstStored(0)
    setSequence(false)
  }

  function mathOperation(label) {
    setOperation(label)

    if (sequence === true) {
      return
    }
    if (firstStored === 0) {
      setFirstStored(value)
      setValue(0)
      return
    }
    setValue(eval(firstStored + operation + value))
    setOperation(label)
    setSequence(true)
  }

  function insertNum(label) {
    const valueToString = value.toString()
    if (sequence === true && label === '.' && value !== '0.') {
      setFirstStored(value)
      setValue('0.')
      return
    }
    if (label === '.' && valueToString.includes('.')) {
      return
    }
    if (label === '.') {
      setValue(value + '.')
      return
    }
    if (value === 0) {
      setValue(label)
      return
    }
    if (sequence === true) {
      if (value === '0.') {
        setValue(value + label)
        setSequence(false)
        return
      }
      setFirstStored(value)
      setValue(label)
      setSequence(false)
      return
    }
    setValue(value + label)
  }

  function equals() {
    if (sequence === true) {
      return
    }
    if (firstStored === 0) {
      return
    }
    setValue(eval(firstStored + operation + value))
    setFirstStored(0)
    setOperation(null)
  }


  return (
    <h1 className='calculadora'>
      <Display value={value < 1 ? value : value % 1 === 0 ? value : value.toFixed(2)} />
      <Button label="AC" triple click={clearValue} />
      <Button label="/" operator click={mathOperation} />
      <Button label="7" click={insertNum} />
      <Button label="8" click={insertNum} />
      <Button label="9" click={insertNum} />
      <Button label="*" operator click={mathOperation} />
      <Button label="4" click={insertNum} />
      <Button label="5" click={insertNum} />
      <Button label="6" click={insertNum} />
      <Button label="-" operator click={mathOperation} />
      <Button label="1" click={insertNum} />
      <Button label="2" click={insertNum} />
      <Button label="3" click={insertNum} />
      <Button label="+" operator click={mathOperation} />
      <Button label="0" double click={insertNum} />
      <Button label="." click={insertNum} />
      <Button label="=" operator click={equals} />
    </h1>
  );
}

export default Calculadora;
