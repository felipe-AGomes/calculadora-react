import useThemeContext from '../../hooks/useThemeContext';
import './CalculatorButton.css';

type Props = {
	button: string;
};

export default function CalculatorButton({ button }: Props) {
	const { theme } = useThemeContext();

	return (
		<button
			type='button'
			className={`button ${theme}`}
		>
			{button}
		</button>
	);
}
