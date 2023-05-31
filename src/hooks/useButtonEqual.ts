import { HistoricProps } from '../contexts/CalculatorContext';
import { ICalculatorController } from '../functions/calculatorController';
import useCalculatorContext from './useCalculatorContext';
import useDisplayedValue from './useDisplayedValue';
import useLastValue from './useLastValue';

export default function useButtonEqual() {
	const {
		lastValue,
		displayedValue,
		historic,
		setHistoric,
		setResult,
		setDisplayedValue,
	} = useCalculatorContext();

	const { clearLastValue } = useLastValue();

	const { clearDisplayedValue } = useDisplayedValue();

	function click(calculatorController: ICalculatorController) {
		if (
			displayedValue.length === 0 ||
			displayedValue[displayedValue.length - 1] === '.'
		) {
			return;
		}

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

	return { click };
}
