import { ICalculatorController } from '../functions/calculatorController';
import useCalculatorContext from './useCalculatorContext';
import useHistoric from './useHistoric';

export default function useButtonReverse() {
	const { result, displayedValue, setResult, setDisplayedValue, setLastValue } =
		useCalculatorContext();
	const { handleSetHistoric } = useHistoric();
	function click(calculatorController: ICalculatorController) {
		const operators = ['-', '+', 'x', '/'];

		if (operators.includes(displayedValue[displayedValue.length - 1])) {
			return;
		}

		if (!result && displayedValue.length > 0) {
			const resultToNumber = Number(displayedValue[displayedValue.length - 1]);
			const reverseResult = -resultToNumber;

			setLastValue(reverseResult.toString());
			setDisplayedValue([reverseResult.toString()]);
			return;
		}

		if (!result) {
			return;
		}

		const resultToNumber = Number(result);
		const reverseResult = -resultToNumber;

		handleSetHistoric(result, calculatorController);
		setResult(null);
		calculatorController.reset();
		setLastValue(reverseResult.toString());
		setDisplayedValue([reverseResult.toString()]);
	}

	return { click };
}
