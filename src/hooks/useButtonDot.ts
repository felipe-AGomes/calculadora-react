import useCalculatorContext from './useCalculatorContext';
import useDisplayedValue from './useDisplayedValue';
import useLastValue from './useLastValue';

export default function useButtonDot() {
	const {
		displayedValue,
		result,
		historic,
		setHistoric,
		setResult,
		setDisplayedValue,
	} = useCalculatorContext();

	const { handleSetDisplayedValue } = useDisplayedValue();

	const { handleSetLastValue } = useLastValue();

	function click(value: string) {
		if (
			displayedValue.length > 0 &&
			displayedValue[displayedValue.length - 1].includes('.')
		) {
			return;
		}

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
