import { ICalculatorController } from '../functions/calculatorController';
import useCalculatorContext from './useCalculatorContext';
import useHistoric from './useHistoric';

export default function useButtonReverse() {
	const { result, setResult, setDisplayedValue, setLastValue } =
		useCalculatorContext();
	const { handleSetHistoric } = useHistoric();
	function click(calculatorController: ICalculatorController) {
		if (!result) return;
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
