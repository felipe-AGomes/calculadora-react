import useCalculatorContext from './useCalculatorContext';
import useDisplayedValue from './useDisplayedValue';
import useLastValue from './useLastValue';

export default function useButtonNumber() {
	const { result, historic, setHistoric, setResult, setDisplayedValue } =
		useCalculatorContext();

	const { handleSetDisplayedValue } = useDisplayedValue();

	const { handleSetLastValue } = useLastValue();

	function click(value: string) {
		if (result) {
			const newHistoric = [...historic];
			newHistoric[newHistoric.length - 1].result = `= ${result}`;
			setHistoric(newHistoric);
			setResult(null);
			setDisplayedValue([value]);
			handleSetLastValue(value);
		} else {
			handleSetDisplayedValue({ value, isNum: true });
			handleSetLastValue(value);
		}
	}

	return { click };
}
