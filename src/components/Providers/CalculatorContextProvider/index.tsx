import CalculatorContext, {
	HistoricProps,
} from '../../../contexts/CalculatorContext';
import { useState } from 'react';

type Props = {
	children: JSX.Element;
};

export default function CalculatorContextProvider({ children }: Props) {
	const [displayedValue, setDisplayedValue] = useState<string[] | []>([]);
	const [lastValue, setLastValue] = useState<string | null>(null);
	const [result, setResult] = useState<string | null>(null);
	const [historic, setHistoric] = useState<HistoricProps[] | []>([]);

	return (
		<CalculatorContext.Provider
			value={{
				historic,
				result,
				displayedValue,
				lastValue,
				setLastValue,
				setDisplayedValue,
				setHistoric,
				setResult,
			}}
		>
			{children}
		</CalculatorContext.Provider>
	);
}
