/* eslint-disable no-case-declarations */
import { Calculator } from '../../functions/calculator';
import { CalculatorController } from '../../functions/calculatorController';
import useButtonBack from '../../hooks/useButtonBack';
import useButtonDot from '../../hooks/useButtonDot';
import useButtonEqual from '../../hooks/useButtonEqual';
import useButtonNumber from '../../hooks/useButtonNumber';
import useButtonOperator from '../../hooks/useButtonOperator';
import useButtonReset from '../../hooks/useButtonReset';
import useButtonReverse from '../../hooks/useButtonReverse';
import useThemeContext from '../../hooks/useThemeContext';
import './CalculatorButton.css';

type Props = {
	type:
		| 'equal'
		| 'dot'
		| 'back'
		| 'num'
		| 'operator'
		| 'percent'
		| 'reverse'
		| 'func'
		| 'reset';
	value?: string;
	button: string | JSX.Element;
	color?: 'green' | 'red' | 'white';
};

const calculator = new Calculator();
const calculatorController = new CalculatorController(calculator);

export default function CalculatorButton({
	button,
	color = 'white',
	value,
	type,
}: Props) {
	const { theme } = useThemeContext();
	const buttonDot = useButtonDot();
	const buttonNumber = useButtonNumber();
	const buttonOperator = useButtonOperator();
	const buttonReset = useButtonReset();
	const buttonBack = useButtonBack();
	const buttonEqual = useButtonEqual();
	const buttonReverse = useButtonReverse();

	const handleClick = () => {
		switch (type) {
			case 'dot':
				if (!value) return;
				buttonDot.click(value);
				break;

			case 'num':
				if (!value) return;
				buttonNumber.click(value);
				break;

			case 'operator':
				if (!value) return;
				buttonOperator.click(value, calculatorController);
				break;

			case 'reverse':
				buttonReverse.click(calculatorController);
				break;

			case 'reset':
				buttonReset.click(calculatorController);
				break;

			case 'back':
				buttonBack.click(calculatorController);
				break;

			case 'equal':
				buttonEqual.click(calculatorController);
				break;

			default:
				break;
		}
	};

	return (
		<button
			onClick={handleClick}
			type='button'
			className={`button ${theme} ${color === 'white' ? '' : color}`}
		>
			{button}
		</button>
	);
}
