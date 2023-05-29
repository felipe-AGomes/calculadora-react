import useThemeContext from '../../hooks/useThemeContext';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './CalculatorDisplay.css';
import useCalculatorContext from '../../hooks/useCalculatorContext';
import Historic from '../Historic/Historic';

export default function CalculatorDisplay() {
	const { theme } = useThemeContext();
	const { displayedValue, result } = useCalculatorContext();

	const renderResult =
		result || (displayedValue.length === 0 ? '0' : displayedValue);

	return (
		<div className={`display__container ${theme}`}>
			<ThemeSwitcher />
			<div className='calc__container'>
				<Historic />
				<div
					className='result'
					data-testid='test'
				>
					<span>{renderResult}</span>
				</div>
			</div>
		</div>
	);
}
