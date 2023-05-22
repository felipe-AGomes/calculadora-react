import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

export default function useThemeContext() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error(
			'useThemeContext deve ser utilizado dentro de um ThemeContextProvider',
		);
	}

	return context;
}
