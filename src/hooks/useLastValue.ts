import useCalculatorContext from './useCalculatorContext';

export default function useLastValue() {
	const { lastValue, setLastValue } = useCalculatorContext();

	const handleSetLastValue = (value: string) => {
		if (!lastValue) {
			setLastValue(value);
			return;
		}
		setLastValue(lastValue + value);
	};

	const clearLastValue = () => {
		setLastValue(null);
	};

	const deleteOneLastValue = () => {
		if (!lastValue) return;
		setLastValue(lastValue.slice(0, -1));
	};

	return { handleSetLastValue, clearLastValue, deleteOneLastValue };
}
