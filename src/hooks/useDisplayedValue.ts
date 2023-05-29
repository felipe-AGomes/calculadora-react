import useCalculatorContext from './useCalculatorContext';

export default function useDisplayedValue() {
	const { displayedValue, setDisplayedValue, setLastValue } =
		useCalculatorContext();

	const deleteOneDisplayedValue = () => {
		if (displayedValue.length === 0) {
			return;
		}

		const newDisplayedValue = [...displayedValue];
		const lastElement =
			newDisplayedValue[newDisplayedValue.length - 1].toString();

		if (lastElement.length === 1) {
			newDisplayedValue.pop();
		} else {
			newDisplayedValue[newDisplayedValue.length - 1] = lastElement.slice(0, -1);
		}

		setDisplayedValue(newDisplayedValue);
	};

	const clearDisplayedValue = () => {
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
			newDisplayedValue[lastPosition] += value;
			setDisplayedValue(newDisplayedValue);
		} else {
			setDisplayedValue([...displayedValue, value]);
		}
	};

	return {
		clearDisplayedValue,
		deleteOneDisplayedValue,
		handleSetDisplayedValue,
	};
}
