import './Calculator.css'
import useThemeContext from '../../hooks/useThemeContext';
import CalculatorDispaly from '../CalculatorDisplay/CalculatorDisplay';
import CalculatorKeyboard from '../CalculatorKeyboard/CalculatorKeyboard';

export default function Calculator() {
	const { theme } = useThemeContext();

	return (
		<div className={`calculator ${theme}`}>
			<CalculatorDispaly />
			<CalculatorKeyboard />
		</div>
	);
}
