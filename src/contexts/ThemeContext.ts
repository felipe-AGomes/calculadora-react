import { createContext } from 'react';

type ThemeContextProps = {
	theme: string;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default ThemeContext;
