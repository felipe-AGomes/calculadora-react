import CalculatorContext from '../../../contexts/CalculatorContext';
import { useState } from 'react';

type Props = {
	children: JSX.Element;
};

export default function CalculatorContextProvider({ children }: Props) {
	const [displayedValue, setDisplayedValue] = useState<string[] | []>([]);
	const [lastValue, setLastValue] = useState<string | null>(null);

	return (
		<CalculatorContext.Provider
			value={{ displayedValue, lastValue, setLastValue, setDisplayedValue }}
		>
			{children}
		</CalculatorContext.Provider>
	);
}
