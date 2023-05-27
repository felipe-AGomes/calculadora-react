import { useContext } from 'react';
import CalculatorContext from '../contexts/CalculatorContext';

export default function useCalculatorContext() {
	const context = useContext(CalculatorContext);

	if (!context) {
		throw new Error(
			'useCalculatorContext deve ser utilizado dentro de um CalculatorContextProvider',
		);
	}

	return context;
}
