import { createContext } from 'react';

type CalculatorContextProps = {
	displayedValue: string | null;
	lastValue: string | null;
	handleSetDisplayedValue: (value: string) => void;
	clearDisplay: () => void;
	clearLastValue: () => void;
	handleSetLastValue: (value: string) => void;
	deleteOneLastValue: () => void;
	deleteOneDisplayValue: () => void;
};

const CalculatorContext = createContext<CalculatorContextProps | undefined>(
	undefined,
);

export default CalculatorContext;
