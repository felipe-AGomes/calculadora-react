import useThemeContext from '../../hooks/useThemeContext';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './CalculatorDisplay.css';
import useCalculatorContext from '../../hooks/useCalculatorContext';
import Historic from '../Historic/Historic';

export default function CalculatorDispaly() {
	const { theme } = useThemeContext();
	const { displayedValue, result } = useCalculatorContext();

	return (
		<div className={`display__container ${theme}`}>
			<ThemeSwitcher />
			<div className='calc__container'>
				<Historic />
				<div
					className='result'
					data-testid='test'
				>
					<span>
						{result ? result : displayedValue.length === 0 ? '0' : displayedValue}
					</span>
				</div>
			</div>
		</div>
	);
}
