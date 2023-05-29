import useCalculatorContext from './useCalculatorContext';

export default function useDisplayedValue() {
	const { displayedValue, setDisplayedValue, setLastValue } =
		useCalculatorContext();

	const clearDisplayValue = () => {
		setDisplayedValue([]);
		setLastValue(null);
	};

	const deleteOneDisplayValue = () => {
		const newDisplayedValue = [...displayedValue];

		if (newDisplayedValue.length === 0) {
			setDisplayedValue([]);
			return;
		}

		if (newDisplayedValue[newDisplayedValue.length - 1].length === 1) {
			const result = newDisplayedValue.slice(0, -1);
			setDisplayedValue(result);
			return;
		}
		const lastElement =
			newDisplayedValue[newDisplayedValue.length - 1].toString();

		const modifiedLastElement = lastElement.slice(0, -1);

		const newLastElement = modifiedLastElement;

		newDisplayedValue[newDisplayedValue.length - 1] = newLastElement;

		setDisplayedValue(newDisplayedValue);
	};

	const handleSetDisplayedValue = ({
		value,
		isNum = false,
	}: {
		value: string;
		isNum: boolean;
	}) => {
		if (displayedValue.length === 0) {
			setDisplayedValue([value]);
			return;
		}
		if (isNum) {
			const newDisplayedValue = [...displayedValue];
			const lastPosition = newDisplayedValue.length - 1;
			if (isNaN(+newDisplayedValue[lastPosition])) {
				setDisplayedValue([...displayedValue, value]);
				return;
			}
			newDisplayedValue[lastPosition] = newDisplayedValue[lastPosition] + value;

			setDisplayedValue(newDisplayedValue);
			return;
		}
		setDisplayedValue([...displayedValue, value]);
	};

	return { clearDisplayValue, deleteOneDisplayValue, handleSetDisplayedValue };
}
