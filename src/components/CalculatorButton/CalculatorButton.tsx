import { HistoricProps } from '../../contexts/CalculatorContext';
import { Calculator } from '../../functions/calculator';
import { CalculatorController } from '../../functions/calculatorController';
import useCalculatorContext from '../../hooks/useCalculatorContext';
import useDisplayedValue from '../../hooks/useDisplayedValue';
import useLastValue from '../../hooks/useLastValue';
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

const calculator = new Calculator();
const calculatorController = new CalculatorController(calculator);

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
		result,
		historic,
		setResult,
		setDisplayedValue,
		setHistoric,
	} = useCalculatorContext();
	const { clearLastValue, deleteOneLastValue, handleSetLastValue } =
		useLastValue();
	const {
		clearDisplayedValue,
		deleteOneDisplayedValue,
		handleSetDisplayedValue,
	} = useDisplayedValue();

	const handleClick = () => {
		const operators = ['+', '-', 'x', '/'];
		switch (type) {
			case 'num':
				if (result) {
					const newHistoric = [...historic];
					newHistoric[newHistoric.length - 1].result = `= ${result}`;
					setHistoric(newHistoric);
					setResult(null);
					setDisplayedValue([value]);
					handleSetLastValue(value);
					return;
				}
				handleSetDisplayedValue({ value, isNum: true });
				handleSetLastValue(value);
				break;

			case 'operator':
				if (displayedValue.length === 0) {
					return;
				}

				if (result) {
					calculatorController.add(+result);
					calculatorController.add(value);
					const newHistoric = [...historic];
					newHistoric[newHistoric.length - 1].result = `= ${result}`;
					setHistoric(newHistoric);
					setResult(null);
					handleSetDisplayedValue({ value, isNum: false });
					break;
				}

				if (operators.includes(displayedValue[displayedValue.length - 1])) return;

				if (!lastValue) {
					calculatorController.add(value);
					handleSetDisplayedValue({ value, isNum: false });
					break;
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
				} else {
					calculatorController.add(+lastValue);
					calculatorController.add(value);
					handleSetDisplayedValue({ value, isNum: false });
					clearLastValue();
				}
				break;

			case 'reset':
				clearDisplayedValue();
				clearLastValue();
				setHistoric([]);
				setResult(null);
				calculatorController.reset();
				break;

			case 'back':
				if (displayedValue.length === 0) {
					return;
				}

				if (lastValue) {
					deleteOneDisplayedValue();
					deleteOneLastValue();
				} else {
					calculatorController.deleteOne();
					deleteOneDisplayedValue();
				}
				break;

			case 'equal':
				if (lastValue) {
					calculatorController.add(+lastValue);
				}

				calculatorController.equal();
				setHistoric([
					...historic,
					{
						result: null,
						values: [...calculatorController.values],
					} as HistoricProps,
				]);
				clearDisplayedValue();
				clearLastValue();
				setDisplayedValue([...calculatorController.result.toString()]);
				setResult(calculatorController.result.toString());

				calculatorController.reset();
				break;

			default:
				break;
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
