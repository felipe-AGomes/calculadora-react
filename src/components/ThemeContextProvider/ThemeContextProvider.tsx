import './ThemeContextProvider.css';
import React, { useState } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

type Props = {
	children: React.ReactNode;
};

export default function ThemeContextProvider({ children }: Props) {
	const [theme, setTheme] = useState<'black' | 'white'>('black');

	function themeBlack() {
		if (theme === 'black') return;

		setTheme('black');
	}

	function themeWhite() {
		if (theme === 'white') return;

		setTheme('white');
	}

	return (
		<ThemeContext.Provider value={{ theme, themeBlack, themeWhite }}>
			{children}
		</ThemeContext.Provider>
	);
}
