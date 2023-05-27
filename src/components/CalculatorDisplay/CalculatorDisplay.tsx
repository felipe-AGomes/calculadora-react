import useThemeContext from '../../hooks/useThemeContext';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './CalculatorDisplay.css';
import useCalculatorContext from '../../hooks/useCalculatorContext';

export default function CalculatorDispaly() {
	const { theme } = useThemeContext();
	const { displayedValue} = useCalculatorContext();

	return (
		<div className={`display__container ${theme}`}>
			<ThemeSwitcher />
			<div className='calc__container'>
				<div className='calc'>
					<span>2,999</span>
					<span className='x__result'>X</span>
					<span>500</span>
				</div>
				<div className='result'>
					<span>{displayedValue}</span>
				</div>
			</div>
		</div>
	);
}
