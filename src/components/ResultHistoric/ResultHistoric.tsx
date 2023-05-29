import useCalculatorContext from '../../hooks/useCalculatorContext';
import './ResultHistoric.css';

type Props = {
	index: number;
};

export default function ResultHistoric({ index }: Props) {
	const { historic } = useCalculatorContext();

	return (
		<div>
			{<span className='result__historic'>{historic[index].result}</span>}
		</div>
	);
}
