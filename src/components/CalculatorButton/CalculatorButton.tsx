import useThemeContext from '../../hooks/useThemeContext';
import './CalculatorButton.css';

type Props = {
	button: string | JSX.Element;
	color?: 'green' | 'red' | 'white';
};

export default function CalculatorButton({ button, color = 'white' }: Props) {
	const { theme } = useThemeContext();

	return (
		<button
			type='button'
			className={`button ${theme} ${color === 'white' ? '' : color}`}
		>
			{button}
		</button>
	);
}
