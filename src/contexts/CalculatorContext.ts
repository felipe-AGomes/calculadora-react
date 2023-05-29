import { createContext } from 'react';

export type HistoricProps = {
	values: (string | number)[];
	result: string | null;
};

type CalculatorContextProps = {
	displayedValue: string[] | [];
	lastValue: string | null;
	result: string | null;
	historic: HistoricProps[] | [];
	setResult: (newValue: string | null) => void;
	setHistoric: (newValue: HistoricProps[] | []) => void;
	setDisplayedValue: (newDisplayedValue: string[] | []) => void;
	setLastValue: (newLastValue: string | null) => void;
};

const CalculatorContext = createContext<CalculatorContextProps | undefined>(
	undefined,
);

export default CalculatorContext;
