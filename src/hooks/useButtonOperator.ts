import { ICalculatorController } from '../functions/calculatorController';
import useCalculatorContext from './useCalculatorContext';
import useDisplayedValue from './useDisplayedValue';
import useLastValue from './useLastValue';

export default function useButtonOperator() {
	const { lastValue, displayedValue, result, historic, setHistoric, setResult } =
		useCalculatorContext();

	const { clearLastValue } = useLastValue();

	const { handleSetDisplayedValue } = useDisplayedValue();

	function click(value: string, calculatorController: ICalculatorController) {
		const operators = ['+', '-', 'x', '/'];

		if (
			displayedValue.length === 0 ||
			displayedValue[displayedValue.length - 1] === '.' ||
			operators.includes(displayedValue[displayedValue.length - 1])
		) {
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
		} else {
			calculatorController.add(+lastValue);
			calculatorController.add(value);
			handleSetDisplayedValue({ value, isNum: false });
			clearLastValue();
		}
	}

	return { click };
}
