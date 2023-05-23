import { FiMoon, FiSun } from 'react-icons/fi';
import './ThemeSwitcher.css';
import useThemeContext from '../../hooks/useThemeContext';

export default function ThemeSwitcher() {
	const { theme, themeBlack, themeWhite } = useThemeContext();

	return (
		<div className={`theme-switcher__container ${theme}`}>
			<div
				className={`icon__container ${theme === 'white' ? 'active-white' : ''}`}
			>
				<FiSun
					clasName='theme-sun__icon'
					size={20}
					cursor='pointer'
					onClick={themeWhite}
				/>
			</div>
			<div
				className={`icon__container ${theme === 'black' ? 'active-black' : ''}`}
			>
				<FiMoon
					className='theme-moon__icon'
					size={20}
					cursor='pointer'
					onClick={themeBlack}
				/>
			</div>
		</div>
	);
}
