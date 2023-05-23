import useThemeContext from '../../hooks/useThemeContext';
import CalculatorButton from '../CalculatorButton/CalculatorButton';
import './CalculatorKeyboard.css';

export default function CalculatorKeyboard() {
	const { theme } = useThemeContext();

	return (
		<div className={`keyboard__container ${theme}`}>
			<CalculatorButton button='AC' />
			<CalculatorButton button='?' />
			<CalculatorButton button='%' />
			<CalculatorButton button='/' />
			<CalculatorButton button='7' />
			<CalculatorButton button='8' />
			<CalculatorButton button='9' />
			<CalculatorButton button='X' />
			<CalculatorButton button='4' />
			<CalculatorButton button='5' />
			<CalculatorButton button='6' />
			<CalculatorButton button='-' />
			<CalculatorButton button='1' />
			<CalculatorButton button='2' />
			<CalculatorButton button='3' />
			<CalculatorButton button='+' />
			<CalculatorButton button='@' />
			<CalculatorButton button='0' />
			<CalculatorButton button=',' />
			<CalculatorButton button='=' />
		</div>
	);
}
