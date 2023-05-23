import useThemeContext from '../../hooks/useThemeContext';
import './CalculatorDisplay.css';

export default function CalculatorDispaly() {
	const { theme } = useThemeContext();

	return (
		<div className={`display__container ${theme}`}>
			<div className='switcher'>botão de themeswitch</div>
			<div className='calc__container'>
				<div className='calc'>
					<span>2,999</span>
					<span className='x__result'>X</span>
					<span>500</span>
				</div>
				<div className='result'>
					<span>5,000</span>
				</div>
			</div>
		</div>
	);
}
