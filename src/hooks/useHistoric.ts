import { ICalculatorController } from '../functions/calculatorController';
import useCalculatorContext from './useCalculatorContext';
import useDisplayedValue from './useDisplayedValue';

export default function useHistoric() {
	const { result, historic, setHistoric, setResult } = useCalculatorContext();
	const { handleSetDisplayedValue } = useDisplayedValue();
	function handleSetHistoric(
		value: string,
		calculatorController: ICalculatorController,
	) {
		if (!result) {
			return;
		}

		calculatorController.add(+result);
		calculatorController.add(value);
		const newHistoric = [...historic];
		newHistoric[newHistoric.length - 1].result = `= ${result}`;
		setHistoric(newHistoric);
		setResult(null);
		handleSetDisplayedValue({ value, isNum: false });
	}

	return { handleSetHistoric };
}
