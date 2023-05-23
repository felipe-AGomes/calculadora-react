import { RiDivideFill } from 'react-icons/ri';
import { FiPercent } from 'react-icons/fi';
import { TbPlusMinus } from 'react-icons/tb';
import { SlReload } from 'react-icons/sl';
import useThemeContext from '../../hooks/useThemeContext';
import CalculatorButton from '../CalculatorButton/CalculatorButton';
import './CalculatorKeyboard.css';

export default function CalculatorKeyboard() {
	const { theme } = useThemeContext();

	return (
		<div className={`keyboard__container ${theme}`}>
			<CalculatorButton
				button='AC'
				color='green'
			/>
			<CalculatorButton
				button={<TbPlusMinus size={20} />}
				color='green'
			/>
			<CalculatorButton
				button={<FiPercent size={20} />}
				color='green'
			/>
			<CalculatorButton
				button={<RiDivideFill size={21} />}
				color='red'
			/>
			<CalculatorButton button='7' />
			<CalculatorButton button='8' />
			<CalculatorButton button='9' />
			<CalculatorButton
				button='X'
				color='red'
			/>
			<CalculatorButton button='4' />
			<CalculatorButton button='5' />
			<CalculatorButton button='6' />
			<CalculatorButton
				button='-'
				color='red'
			/>
			<CalculatorButton button='1' />
			<CalculatorButton button='2' />
			<CalculatorButton button='3' />
			<CalculatorButton
				button='+'
				color='red'
			/>
			<CalculatorButton button={<SlReload size={20} />} />
			<CalculatorButton button='0' />
			<CalculatorButton button=',' />
			<CalculatorButton
				button='='
				color='red'
			/>
		</div>
	);
}
