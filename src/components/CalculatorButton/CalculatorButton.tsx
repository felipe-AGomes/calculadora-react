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
		if (type === 'num') {
			handleSetDisplayedValue({ value, isNum: true });
			handleSetLastValue(value);
			return;
		}
		if (type === 'operator' && displayedValue.length > 0) {
			const operators = ['+', '-', 'x', '/'];

			if (operators.includes(displayedValue[displayedValue.length - 1])) {
				return;
			}
			if (!lastValue) {
				calculatorController.add(value);
				handleSetDisplayedValue({ value, isNum: false });
				return;
			}

			if (
				typeof calculatorController.values[
					calculatorController.values.length - 1
				] === 'number'
			) {
				calculatorController.pushToLastValue(+lastValue);
				calculatorController.add(value);
				handleSetDisplayedValue({ value, isNum: true });
				clearLastValue();
				return;
			}

			calculatorController.add(+lastValue);
			calculatorController.add(value);
			handleSetDisplayedValue({ value, isNum: false });
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
			if (displayedValue.length === 0) {
				return;
			}

			if (lastValue) {
				deleteOneDisplayValue();
				deleteOneLastValue();
				return;
			}

			calculatorController.deleteOne();
			deleteOneDisplayValue();
			return;
		}
		if (type === 'equal') {
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
