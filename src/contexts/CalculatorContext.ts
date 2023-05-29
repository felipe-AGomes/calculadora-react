import { createContext } from 'react';

type CalculatorContextProps = {
	displayedValue: string[] | [];
	lastValue: string | null;
	setDisplayedValue: (newDisplayedValue: string[] | []) => void;
	setLastValue: (newLastValue: string | null) => void;
};

const CalculatorContext = createContext<CalculatorContextProps | undefined>(
	undefined,
);

export default CalculatorContext;
