import { RiDivideFill } from 'react-icons/ri';
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
				type='reset'
				button='AC'
				color='green'
			/>
			<CalculatorButton
				type='reverse'
				button={<TbPlusMinus size={20} />}
				color='green'
			/>
			<CalculatorButton
				type='operator'
				value='/'
				button={<RiDivideFill size={21} />}
				color='green'
			/>
			<CalculatorButton
				type='operator'
				value='x'
				button='X'
				color='red'
			/>
			<CalculatorButton
				type='num'
				value='7'
				button='7'
			/>
			<CalculatorButton
				type='num'
				value='8'
				button='8'
			/>
			<CalculatorButton
				type='num'
				value='9'
				button='9'
			/>
			<CalculatorButton
				type='operator'
				value='-'
				button='-'
				color='red'
			/>
			<CalculatorButton
				type='num'
				value='4'
				button='4'
			/>
			<CalculatorButton
				type='num'
				value='5'
				button='5'
			/>
			<CalculatorButton
				type='num'
				value='6'
				button='6'
			/>
			<CalculatorButton
				type='operator'
				value='+'
				button='+'
				color='red'
			/>
			<CalculatorButton
				type='num'
				value='1'
				button='1'
			/>
			<CalculatorButton
				type='num'
				value='2'
				button='2'
			/>
			<CalculatorButton
				type='num'
				value='3'
				button='3'
			/>
			<CalculatorButton
				type='equal'
				button='='
				color='red'
			/>
			<CalculatorButton
				type='back'
				button={<SlReload size={20} />}
			/>
			<CalculatorButton
				type='num'
				value='0'
				button='0'
			/>
			<CalculatorButton
				type='dot'
				value='.'
				button=','
			/>
		</div>
	);
}
