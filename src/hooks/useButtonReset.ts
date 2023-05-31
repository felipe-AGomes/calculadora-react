import { ICalculatorController } from '../functions/calculatorController';
import useCalculatorContext from './useCalculatorContext';
import useDisplayedValue from './useDisplayedValue';
import useLastValue from './useLastValue';

export default function useButtonReset() {
	const { setHistoric, setResult } = useCalculatorContext();

	const { clearLastValue } = useLastValue();

	const { clearDisplayedValue } = useDisplayedValue();

	function click(calculatorController: ICalculatorController) {
		clearDisplayedValue();
		clearLastValue();
		setHistoric([]);
		setResult(null);
		calculatorController.reset();
	}

	return { click };
}
