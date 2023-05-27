import CalculatorContext from '../../../contexts/CalculatorContext';
import { useState } from 'react';

type Props = {
	children: JSX.Element;
};

export default function CalculatorContextProvider({ children }: Props) {
	const [displayedValue, setDisplayedValue] = useState<string[] | []>([]);
	const [lastValue, setLastValue] = useState<string | null>(null);

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

	const clearDisplayValue = () => {
		setDisplayedValue([]);
		setLastValue(null);
	};

	const deleteOneLastValue = () => {
		if (!lastValue) return;
		setLastValue(lastValue?.slice(0, -1));
	};

	const deleteOneDisplayValue = () => {
		const newDisplayedValue = [...displayedValue];

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

	return (
		<CalculatorContext.Provider
			value={{
				displayedValue,
				lastValue,
				clearLastValue,
				handleSetLastValue,
				handleSetDisplayedValue,
				clearDisplayValue,
				deleteOneDisplayValue,
				deleteOneLastValue,
			}}
		>
			{children}
		</CalculatorContext.Provider>
	);
}
