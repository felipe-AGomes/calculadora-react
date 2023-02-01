import { useState } from 'react';
import './Calculadora.css';
import Button from './Button'
import Display from './Display';

function Calculadora() {
  const [firstStored, setFirstStored] = useState(0)
  const [value, setValue] = useState(0)

  function clearValue() {
    setValue(0)
    setFirstStored(0)
  }

  function operation(label) {
    if (firstStored === 0) {
      setFirstStored(parseFloat(value))
      setValue(0)
      return
    }
    setValue(firstStored + value)
  }

  function insertNum(label) {
    if (value === 0) {
      setValue(parseFloat(label))
      return
    }
    setValue(parseFloat(value + label))
  }

  function equals() {
    if (firstStored !== 0)
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
      <Button label="0" double />
      <Button label="," click={insertNum} />
      <Button label="=" operator click={operation} />
    </h1>
  );
}

export default Calculadora;
