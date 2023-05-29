import { ICalculator } from './calculator';

export interface ICalculatorController {
	equal: (operator: string, n1: number, n2: number) => void;
	reset: () => void;
	deleteOne: () => void;
	reverseSign: () => void;
	add: (value: string | number) => void;
	pushToLastValue: (value: number) => void;
}

export class CalculatorController implements ICalculatorController {
	values: (string | number)[];
	result: number;

	constructor(private readonly calculator: ICalculator) {
		this.values = [];
		this.result = 0;
	}

	pushToLastValue(value: number): void {
		const lastElement = this.values[this.values.length - 1];
		if (typeof lastElement === 'string') {
			throw new Error('Esse metodo deve ser utilizado apenas com números');
		}
		const newLastElement = lastElement.toString() + value.toString();
		this.values[this.values.length - 1] = +newLastElement;
	}

	add(value: string | number): void {
		if (typeof value === 'number') {
			if (typeof this.values[this.values.length - 1] === 'number') {
				throw new Error('Deve ser inserido um operador após o número');
			}
			this.values = [...this.values, value];
		} else if (typeof value === 'string') {
			if (typeof this.values[this.values.length - 1] === 'string') {
				throw new Error('Deve ser inserido um número após um operador');
			}
			if (this.values.length === 0) {
				throw new Error('O primeiro elemento deve ser um número');
			}
			this.values = [...this.values, value];
		}
	}
	reset(): void {
		this.values = [];
		this.result = 0;
	}
	reverseSign(): void {
		this.result = -this.result;
	}
	equal(): void {
		if (this.values.length === 0) {
			throw new Error('Deve ser inserido ao menos um valor');
		}

		if (typeof this.values[this.values.length - 1] === 'string') {
			throw new Error('O último valor inserido não pode ser um operador');
		}

		this.calculateMultiplicationAndDivision();
		this.calculateAdditionAndSubtraction();
	}

	private calculateMultiplicationAndDivision(): void {
		let index = 0;

		while (index < this.values.length) {
			const value = this.values[index];

			if (value === 'x') {
				const result = this.calculator.multiply(
					this.values[index - 1] as number,
					this.values[index + 1] as number,
				);
				this.updateValues(index - 1, 3, result);
				index = 0;
			} else if (value === '/') {
				const result = this.calculator.divide(
					this.values[index - 1] as number,
					this.values[index + 1] as number,
				);
				this.updateValues(index - 1, 3, result);
				index = 0;
			} else {
				index++;
			}
		}
	}

	private calculateAdditionAndSubtraction(): void {
		let index = 0;
		this.result = this.values[index] as number;

		while (index < this.values.length) {
			const value = this.values[index];

			if (value === '+') {
				this.result = this.calculator.add(
					this.result,
					this.values[index + 1] as number,
				);
			} else if (value === '-') {
				this.result = this.calculator.substract(
					this.result,
					this.values[index + 1] as number,
				);
			}

			index++;
		}
	}

	private updateValues(startIndex: number, count: number, value: number): void {
		this.values.splice(startIndex, count, value);
	}
	deleteOne(): void {
		const newDisplayedValue = [...this.values];
		if (newDisplayedValue.length === 0) {
			return;
		}

		if (newDisplayedValue[newDisplayedValue.length - 1].toString().length === 1) {
			this.values = newDisplayedValue.slice(0, -1);
			return;
		}

		const lastElement =
			newDisplayedValue[newDisplayedValue.length - 1].toString();

		const modifiedLastElement = lastElement.slice(0, -1);

		newDisplayedValue[newDisplayedValue.length - 1] = +modifiedLastElement;

		this.values = newDisplayedValue;
	}
}
