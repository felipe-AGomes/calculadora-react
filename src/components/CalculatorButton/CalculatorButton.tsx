import { useState } from 'react';
import { Calculator } from '../../functions/calculator';
import { CalculatorController } from '../../functions/calculatorController';
import useCalculatorContext from '../../hooks/useCalculatorContext';
import useThemeContext from '../../hooks/useThemeContext';
import './CalculatorButton.css';

type Props = {
	type:
		| 'equal'
		| 'dot'
		| 'back'
		| 'num'
		| 'operator'
		| 'percent'
		| 'reverse'
		| 'func'
		| 'reset';
	value: string;
	button: string | JSX.Element;
	color?: 'green' | 'red' | 'white';
};

const calculatorController = new CalculatorController(new Calculator());
export default function CalculatorButton({
	button,
	color = 'white',
	value,
	type,
}: Props) {
	const { theme } = useThemeContext();
	const {
		displayedValue,
		lastValue,
		clearLastValue,
		handleSetLastValue,
		handleSetDisplayedValue,
		deleteOneDisplayValue,
		deleteOneLastValue,
		clearDisplayValue,
	} = useCalculatorContext();

	const handleClick = () => {
		if (!displayedValue && type === 'operator') {
			return;
		}
		if (type === 'num') {
			handleSetDisplayedValue({ value, isNum: true });
			handleSetLastValue(value);
			return;
		}
		if (type === 'operator' && displayedValue && lastValue) {
			handleSetDisplayedValue({ value, isNum: false });
			calculatorController.add(+lastValue);
			calculatorController.add(value);
			clearLastValue();
			return;
		}
		if (type === 'reset') {
			clearDisplayValue();
			clearLastValue();
			calculatorController.reset();
			return;
		}
		if (type === 'back') {
			if (lastValue) {
				deleteOneDisplayValue();
				deleteOneLastValue();
				console.log(calculatorController.values);
				return;
			}
			calculatorController.deleteOne();
			deleteOneDisplayValue();
			console.log(displayedValue)
			console.log(calculatorController.values);
		}
	};

	return (
		<button
			onClick={handleClick}
			type='button'
			className={`button ${theme} ${color === 'white' ? '' : color}`}
		>
			{button}
		</button>
	);
}
