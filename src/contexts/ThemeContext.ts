import { createContext } from 'react';

type ThemeContextProps = {
	theme: string;
	themeWhite: () => void;
	themeBlack: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default ThemeContext;
