import { useState } from 'react';
import './Calculadora.css';
import Button from './Button'
import Display from './Display';

function Calculadora() {
  const [firstStored, setFirstStored] = useState(0)
  const [value, setValue] = useState(0)
  const [sequence, setSequence] = useState(false)

  function clearValue() {
    setValue(0)
    setFirstStored(0)
    setSequence(false)
  }

  function operation(label) {
    if (firstStored === 0) {
      setFirstStored(parseFloat(value))
      setValue(0)
      return
    }
    setValue(firstStored + value)
    setSequence(true)
  }
  
  function insertNum(label) {
    const valueToStrig = value.toString()
    if (label === ',' && valueToStrig == '0.') {
      console.log('aqui')
      return
    }
    if (label === ',' && !valueToStrig.includes('.')) {
      setValue(value + '.')
      return
    }
    if (value === 0) {
      setValue(parseFloat(label))
      return
    }
    if (sequence === true) {
      console.log('aqui')
      setFirstStored(value)
      setValue(parseFloat(label))
      setSequence(false)
      return
    }
    setValue(parseFloat(value + label))
  }
  
  function equals() {
    if (firstStored === 0) {
      return
    }
    setValue(value + firstStored)
    setFirstStored(0)
    setSequence(true)
  }




  return (
    <h1 className='calculadora'>
      <Display value={value} />
      <Button label="AC" triple click={clearValue} />
      <Button label="/" operator click={operation} />
      <Button label="7" click={insertNum} />
      <Button label="8" click={insertNum} />
      <Button label="9" click={insertNum} />
      <Button label="*" operator click={operation} />
      <Button label="4" click={insertNum} />
      <Button label="5" click={insertNum} />
      <Button label="6" click={insertNum} />
      <Button label="-" operator click={operation} />
      <Button label="1" click={insertNum} />
      <Button label="2" click={insertNum} />
      <Button label="3" click={insertNum} />
      <Button label="+" operator click={operation} />
      <Button label="0" double click={insertNum} />
      <Button label="," click={insertNum} />
      <Button label="=" operator click={equals} />
    </h1>
  );
}

export default Calculadora;
