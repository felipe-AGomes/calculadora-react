import './Calculator.css'
import CalculatorDispaly from '../CalculatorDisplay/CalculatorDisplay';
import CalculatorKeyboard from '../CalculatorKeyboard/CalculatorKeyboard';
import useThemeContext from '../../hooks/useThemeContext';

export default function Calculator() {
	const { theme } = useThemeContext();

	return (
		<div className={`calculator ${theme}`}>
			<CalculatorDispaly />
			<CalculatorKeyboard />
		</div>
	);
}
