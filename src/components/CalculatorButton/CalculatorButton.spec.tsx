import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CalculatorButton from './CalculatorButton';
import ProviderController from '../Providers/ProviderController';
import useThemeContext from '../../hooks/useThemeContext';
import useCalculatorContext from '../../hooks/useCalculatorContext';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

function CalculatorDispaly() {
	const { theme } = useThemeContext();
	const { displayedValue } = useCalculatorContext();

	return (
		<div className={`display__container ${theme}`}>
			<ThemeSwitcher />
			<div className='calc__container'>
				<div className='calc'>
					<span>2,999</span>
					<span className='x__result'>X</span>
					<span>500</span>
				</div>
				<div className='result'>
					<span data-testid='teste'>{displayedValue}</span>
				</div>
			</div>
		</div>
	);
}

describe('CalculatorButton', () => {
	it('should add a number', async () => {
		render(
			<ProviderController>
				<>
					<CalculatorDispaly />
					<CalculatorButton
						type='num'
						value='1'
						button='1'
						color='white'
					/>
				</>
			</ProviderController>,
		);

		await userEvent.click(screen.getByRole('button'));
		await userEvent.click(screen.getByRole('button'));
		await userEvent.click(screen.getByRole('button'));
		expect(screen.getByText('111')).toBeVisible();
	});

	it('should add a number and the correct operators after a number', async () => {
		render(
			<ProviderController>
				<>
					<CalculatorDispaly />
					<CalculatorButton
						type='num'
						value='1'
						button='1'
						color='white'
					/>
					<CalculatorButton
						type='operator'
						value='+'
						button='+'
						color='white'
					/>
					<CalculatorButton
						type='operator'
						value='-'
						button='-'
						color='white'
					/>
					<CalculatorButton
						type='operator'
						value='x'
						button='x'
						color='white'
					/>
					<CalculatorButton
						type='operator'
						value='/'
						button='/'
						color='white'
					/>
				</>
			</ProviderController>,
		);

		await userEvent.click(screen.getByRole('button', { name: '+' }));
		expect(screen.queryByTestId('teste')).not.toHaveTextContent('+');

		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '/' }));
		expect(screen.getByText('1/')).toBeVisible();
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: 'x' }));
		expect(screen.getByText('1/1x')).toBeVisible();
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		expect(screen.getByText('1/1x1+')).toBeVisible();
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '-' }));
		expect(screen.getByText('1/1x1+1-')).toBeVisible();

		await userEvent.click(screen.getByRole('button', { name: '-' }));
		expect(screen.queryByTestId('teste')).not.toHaveTextContent('1/1x1+1--');
	});

	it('should clear all data when triggered the "reset" button', async () => {
		render(
			<ProviderController>
				<>
					<CalculatorDispaly />
					<CalculatorButton
						type='num'
						value='1'
						button='1'
						color='white'
					/>
					<CalculatorButton
						type='operator'
						value='+'
						button='+'
						color='white'
					/>
					<CalculatorButton
						type='reset'
						value='AC'
						button='AC'
						color='white'
					/>
				</>
			</ProviderController>,
		);

		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		expect(screen.getByText('1+1')).toBeVisible();

		await userEvent.click(screen.getByRole('button', { name: 'AC' }));
		expect(screen.getByTestId('teste')).toHaveTextContent('');
	});

	it('should delete a character when tiggered the "back" button', async () => {
		render(
			<ProviderController>
				<>
					<CalculatorDispaly />
					<CalculatorButton
						type='num'
						value='1'
						button='1'
						color='white'
					/>
					<CalculatorButton
						type='num'
						value='2'
						button='2'
						color='white'
					/>
					<CalculatorButton
						type='operator'
						value='+'
						button='+'
						color='white'
					/>
					<CalculatorButton
						type='back'
						value='back'
						button='back'
						color='white'
					/>
					<CalculatorButton
						type='reset'
						value='AC'
						button='AC'
						color='white'
					/>
				</>
			</ProviderController>,
		);

		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		await userEvent.click(screen.getByRole('button', { name: '2' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		expect(screen.getByText('11+12+')).toBeVisible();

		await userEvent.click(screen.getByRole('button', { name: 'AC' }));

		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		expect(screen.getByText('11+11')).toBeVisible();

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('teste')).toHaveTextContent('11+1');

		await userEvent.click(screen.getByRole('button', { name: '+' }));
		expect(screen.getByTestId('teste')).toHaveTextContent('11+1+');

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('teste')).toHaveTextContent('11+1');

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('teste')).toHaveTextContent('11');

		await userEvent.click(screen.getByRole('button', { name: '+' }));
		expect(screen.getByTestId('teste')).toHaveTextContent('11+');

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('teste')).toHaveTextContent('11');

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('teste')).toBeEmptyDOMElement();
	});
});
