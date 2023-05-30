import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CalculatorButton from '../components/CalculatorButton/CalculatorButton';
import ProviderController from '../components/Providers/ProviderController';
import CalculatorDispaly from '../components/CalculatorDisplay/CalculatorDisplay';

const renderCalculator = () => {
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
					type='num'
					value='5'
					button='5'
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
				<CalculatorButton
					type='back'
					value='back'
					button='back'
					color='white'
				/>
				<CalculatorButton
					type='equal'
					value='='
					button='='
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
};

describe('CalculatorButton', () => {
	it('should add a number', async () => {
		renderCalculator();

		await userEvent.click(screen.getByRole('button'));
		await userEvent.click(screen.getByRole('button'));
		await userEvent.click(screen.getByRole('button'));
		expect(screen.getByText('111')).toBeVisible();
	});

	it('should add a number and the correct operators after a number', async () => {
		renderCalculator();

		expect(screen.getByTestId('test')).toHaveTextContent('0');

		await userEvent.click(screen.getByRole('button', { name: '+' }));
		expect(screen.queryByTestId('test')).not.toHaveTextContent('+');

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
		expect(screen.queryByTestId('test')).not.toHaveTextContent('1/1x1+1--');
	});

	it('should clear all data when triggered the "reset" button', async () => {
		renderCalculator();

		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		expect(screen.getByText('1+1')).toBeVisible();

		await userEvent.click(screen.getByRole('button', { name: 'AC' }));
		expect(screen.getByTestId('test')).toHaveTextContent('0');
	});

	it('should delete a character when tiggered the "back" button', async () => {
		renderCalculator();

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
		expect(screen.getByTestId('test')).toHaveTextContent('11+1');

		await userEvent.click(screen.getByRole('button', { name: '+' }));
		expect(screen.getByTestId('test')).toHaveTextContent('11+1+');

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('test')).toHaveTextContent('11+1');

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('test')).toHaveTextContent('11');

		await userEvent.click(screen.getByRole('button', { name: '+' }));
		expect(screen.getByTestId('test')).toHaveTextContent('11+');

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('test')).toHaveTextContent('11');

		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		expect(screen.getByTestId('test')).toHaveTextContent('0');
	});

	it('shoul perform all calculations correctly', async () => {
		renderCalculator();

		await userEvent.click(screen.getByRole('button', { name: '2' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: '2' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: 'back' }));
		await userEvent.click(screen.getByRole('button', { name: '=' }));
		expect(screen.getByTestId('test')).toHaveTextContent('4');

		await userEvent.click(screen.getByRole('button', { name: 'AC' }));

		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '=' }));
		expect(screen.getByTestId('test')).toHaveTextContent('12');

		await userEvent.click(screen.getByRole('button', { name: '-' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '=' }));
		expect(screen.getByTestId('test')).toHaveTextContent('11');

		await userEvent.click(screen.getByRole('button', { name: 'x' }));
		await userEvent.click(screen.getByRole('button', { name: '2' }));
		await userEvent.click(screen.getByRole('button', { name: '=' }));
		expect(screen.getByTestId('test')).toHaveTextContent('22');

		await userEvent.click(screen.getByRole('button', { name: '/' }));
		await userEvent.click(screen.getByRole('button', { name: '2' }));
		await userEvent.click(screen.getByRole('button', { name: '=' }));
		expect(screen.getByTestId('test')).toHaveTextContent('11');
	});

	it('should continue if an operator is added after the result', async () => {
		renderCalculator();

		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		await userEvent.click(screen.getByRole('button', { name: '=' }));
		expect(screen.getByTestId('test')).toHaveTextContent('12');

		await userEvent.click(screen.getByRole('button', { name: '+' }));
		await userEvent.click(screen.getByRole('button', { name: '1' }));
		expect(screen.getByTestId('test')).toHaveTextContent('12+1');
	});
});
