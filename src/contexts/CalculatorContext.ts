import { createContext } from 'react';

type CalculatorContextProps = {
	displayedValue: string[] | [];
	lastValue: string | null;
	handleSetDisplayedValue: ({
		value,
		isNum,
	}: {
		value: string;
		isNum: boolean;
	}) => void;
	clearDisplayValue: () => void;
	clearLastValue: () => void;
	handleSetLastValue: (value: string) => void;
	deleteOneLastValue: () => void;
	deleteOneDisplayValue: () => void;
};

const CalculatorContext = createContext<CalculatorContextProps | undefined>(
	undefined,
);

export default CalculatorContext;
