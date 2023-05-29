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
		setDisplayedValue,
		setResult,
		result,
		historic,
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
		if (type === 'num') {
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
			return;
		}
		if (type === 'operator' && displayedValue.length > 0) {
			const operators = ['+', '-', 'x', '/'];

			if (result) {
				calculatorController.add(+result);
				calculatorController.add(value);
				const newHistoric = [...historic];
				newHistoric[newHistoric.length - 1].result = `= ${result}`;
				setHistoric(newHistoric);
				setResult(null);
				handleSetDisplayedValue({ value, isNum: false });
				return;
			}

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
			clearDisplayedValue();
			clearLastValue();
			setHistoric([]);
			setResult(null);
			calculatorController.reset();
			return;
		}
		if (type === 'back') {
			if (displayedValue.length === 0) {
				return;
			}

			if (lastValue) {
				deleteOneDisplayedValue();
				deleteOneLastValue();
				return;
			}
			calculatorController.deleteOne();
			deleteOneDisplayedValue();
			return;
		}
		if (type === 'equal') {
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
