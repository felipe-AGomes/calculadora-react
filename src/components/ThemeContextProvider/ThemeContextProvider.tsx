import React, { useState } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

type Props = {
	children: React.ReactNode;
};

export default function ThemeContextProvider({ children }: Props) {
	const [theme, setTheme] = useState<'black' | 'white'>('black');

	function toggleTheme() {
		setTheme(theme === 'white' ? 'black' : 'white');
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
