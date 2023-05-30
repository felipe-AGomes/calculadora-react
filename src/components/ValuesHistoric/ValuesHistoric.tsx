import React from 'react';
import './ValuesHistoric.css';
import useCalculatorContext from '../../hooks/useCalculatorContext';
import ResultHistoric from '../ResultHistoric/ResultHistoric';

export default function ValuesHistoric() {
	const { historic } = useCalculatorContext();

	return (
		<div>
			{historic.map((element, index) => {
				return (
					<React.Fragment key={index}>
						<div className='operator__historic__content' data-testid='historic-test'>
							{element.values.map((value, valueIndex) => {
								return (
									<span
										key={valueIndex}
										className={isNaN(value as number) ? 'operator__historic' : ''}
									>
										{value}
									</span>
								);
							})}
						</div>
						<ResultHistoric index={index} />
					</React.Fragment>
				);
			})}
		</div>
	);
}
