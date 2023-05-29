import useCalculatorContext from './useCalculatorContext';

export default function useDisplayedValue() {
	const { displayedValue, setDisplayedValue, setLastValue } =
		useCalculatorContext();
	const deleteOneDisplayValue = () => {
		const newDisplayedValue = [...displayedValue];

		if (newDisplayedValue.length === 0) {
			return;
		}

		if (newDisplayedValue[newDisplayedValue.length - 1].length === 1) {
			newDisplayedValue.pop();
			setDisplayedValue(newDisplayedValue);
			return;
		}

		const lastElement =
			newDisplayedValue[newDisplayedValue.length - 1].toString();
		newDisplayedValue[newDisplayedValue.length - 1] = lastElement.slice(0, -1);

		setDisplayedValue(newDisplayedValue);
	};

	const clearDisplayValue = () => {
		setDisplayedValue([]);
		setLastValue(null);
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
			newDisplayedValue[lastPosition] = newDisplayedValue[lastPosition] + value;

			setDisplayedValue(newDisplayedValue);
			return;
		}
		setDisplayedValue([...displayedValue, value]);
	};

	return { clearDisplayValue, deleteOneDisplayValue, handleSetDisplayedValue };
}
