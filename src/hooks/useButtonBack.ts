import { ICalculatorController } from '../functions/calculatorController';
import useCalculatorContext from './useCalculatorContext';
import useDisplayedValue from './useDisplayedValue';
import useLastValue from './useLastValue';

export default function useButtonBack() {
	const { deleteOneDisplayedValue } = useDisplayedValue();
	const { deleteOneLastValue } = useLastValue();
	const { displayedValue, lastValue } = useCalculatorContext();

	function click(calculatorController: ICalculatorController) {
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
	}

	return { click };
}
