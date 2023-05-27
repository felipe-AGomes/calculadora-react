import CalculatorContext from '../../../contexts/CalculatorContext';
import { useState } from 'react';

type Props = {
	children: JSX.Element;
};

export default function CalculatorContextProvider({ children }: Props) {
	const [displayedValue, setDisplayedValue] = useState<string | null>(null);
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

	const handleSetDisplayedValue = (value: string) => {
		if (!displayedValue) {
			setDisplayedValue(value);
			return;
		}
		setDisplayedValue(displayedValue + value);
	};

	const clearDisplay = () => {
		setDisplayedValue(null);
		setLastValue(null);
	};

	const deleteOneDisplayValue = () => {
		if (!lastValue) return;
		setLastValue(lastValue?.slice(0, -1));
	};

	const deleteOneLastValue = () => {
		if (!displayedValue) return;
		setDisplayedValue(displayedValue?.slice(0, -1));
	};

	return (
		<CalculatorContext.Provider
			value={{
				displayedValue,
				lastValue,
				clearLastValue,
				handleSetLastValue,
				handleSetDisplayedValue,
				clearDisplay,
				deleteOneDisplayValue,
				deleteOneLastValue,
			}}
		>
			{children}
		</CalculatorContext.Provider>
	);
}
