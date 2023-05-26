/* eslint-disable no-mixed-spaces-and-tabs */

import { Calculator, ICalculator } from './calculator';

interface ICalculatorController {
	equal: (operator: string, n1: number, n2: number) => void;
	reset: () => void;
	deleteOne: () => void;
	reverseSign: () => void;
	add: (value: string | number) => void;
}

class CalculatorController implements ICalculatorController {
	values: string[] & number[];
	result: number;

	constructor(private readonly calculator: ICalculator) {
		this.values = [];
		this.result = 0;
	}

	add(value: string | number): void {
		if (typeof value === 'number') {
			if (typeof this.values[this.values.length - 1] === 'number')
				throw new Error('Deve ser inserido um operador após o número');
			this.values.push(value);
		} else if (typeof value === 'string') {
			if (typeof this.values[this.values.length - 1] === 'string')
				throw new Error('Deve ser inserido um número após um operador');
			if (this.values.length === 0)
				throw new Error('O primeiro elemento deve ser um número');
			this.values.push(value);
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
					this.values[index - 1],
					this.values[index + 1],
				);
				this.updateValues(index - 1, 3, result);
				index = 0;
			} else if (value === '/') {
				const result = this.calculator.divide(
					this.values[index - 1],
					this.values[index + 1],
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
		this.result = this.values[index];

		while (index < this.values.length) {
			const value = this.values[index];

			if (value === '+') {
				this.result = this.calculator.add(
					this.result,
					this.values[index + 1],
				);
			} else if (value === '-') {
				this.result = this.calculator.substract(
					this.result,
					this.values[index + 1],
				);
			}

			index++;
		}
	}

	private updateValues(startIndex: number, count: number, value: number): void {
		this.values.splice(startIndex, count, value);
	}
	deleteOne(): void {
		console.log();
	}
}

const makeSut = () => {
	const sut = new CalculatorController(new Calculator());
	return { sut };
};

describe('CalculatorController', () => {
	it('Should add the numbers to the array "values"', () => {
		const { sut } = makeSut();

		sut.add(1);

		expect(sut.values).toEqual([1]);
	});

	it('Should add the operator to the array "values"', () => {
		const { sut } = makeSut();

		sut.add(1);
		sut.add('x');

		expect(sut.values).toEqual([1, 'x']);
	});

	it('should throw an error if the last element of array "values" is a number', () => {
		const { sut } = makeSut();

		sut.add(1);

		expect(() => {
			sut.add(2);
		}).toThrow();
		expect(sut.values).toEqual([1]);
	});

	it('Should not add the operator to the array "values" if values is empty', () => {
		const { sut } = makeSut();

		expect(() => {
			sut.add('x');
		}).toThrow();
		expect(sut.values).toEqual([]);
	});

	it('should throw a error if the last item of the array "values" is a operator', () => {
		const { sut } = makeSut();

		sut.add(1);
		sut.add('x');

		expect(() => {
			sut.add('-');
		}).toThrow();
		expect(sut.values).toEqual([1, 'x']);
	});

	it('should reset all entries on the variable "values"', () => {
		const { sut } = makeSut();

		sut.add(1);
		sut.add('x');
		sut.add(3);
		sut.equal();
		sut.reset();

		expect(sut.values.length).toBe(0);
		expect(sut.result).toBe(0);
	});

	it('should invert the sign', () => {
		const { sut } = makeSut();

		sut.result = -30;

		sut.reverseSign();

		expect(sut.result).toBe(30);
	});

	describe('equal', () => {
		it('should throw an error if the method is called with array "values" empty', () => {
			const { sut } = makeSut();
			expect(() => {
				sut.equal();
			}).toThrow();
		});

		it('should throw an error if the last element of "values" is a string', () => {
			const { sut } = makeSut();

			sut.add(4);
			sut.add('-');

			expect(() => {
				sut.equal();
			}).toThrow();
		});

		it('should return the only past', () => {
			const { sut } = makeSut();

			sut.add(4);

			sut.equal();

			expect(sut.result).toBe(4);
		});

		it('should calculate all entries of the variable "values" if all is "+"', () => {
			const { sut } = makeSut();

			sut.add(4);
			sut.add('+');
			sut.add(5);
			sut.add('+');
			sut.add(4);
			sut.add('+');
			sut.add(5);

			sut.equal();

			expect(sut.result).toBe(18);
		});

		it('should calculate all entries of the variable "values" if all is "-"', () => {
			const { sut } = makeSut();

			sut.add(5);
			sut.add('-');
			sut.add(3);
			sut.add('-');
			sut.add(2);
			sut.add('-');
			sut.add(5);

			sut.equal();

			expect(sut.result).toBe(-5);
		});

		it('should calculate all entries of the variable "values" if all is "x"', () => {
			const { sut } = makeSut();

			sut.add(3);
			sut.add('x');
			sut.add(3);
			sut.add('x');
			sut.add(2);

			sut.equal();

			expect(sut.result).toBe(18);
		});

		it('should calculate all entries of the variable "values" if all is "/"', () => {
			const { sut } = makeSut();

			sut.add(10);
			sut.add('/');
			sut.add(5);
			sut.add('/');
			sut.add(2);

			sut.equal();

			expect(sut.result).toBeCloseTo(1);
		});
		it('should calculate all entries of the variable "values" if it is a mix of all operators', () => {
			const { sut } = makeSut();

			sut.add(55);
			sut.add('+');
			sut.add(55);
			sut.add('-');
			sut.add(55);
			sut.add('x');
			sut.add(55);
			sut.add('+');
			sut.add(55);
			sut.add('x');
			sut.add(55);
			sut.add('-');
			sut.add(55);
			sut.add('x');
			sut.add(55);

			sut.equal();

			expect(sut.result).toBeCloseTo(-2_915);

			sut.reset();
			sut.add(55);
			sut.add('+');
			sut.add(55);
			sut.add('x');
			sut.add(55);
			sut.add('x');
			sut.add(55);
			sut.add('x');
			sut.add(55);
			sut.add('/');
			sut.add(2);
			sut.equal();

			expect(sut.result).toBe(4_575_367.5);

			sut.reset();
			sut.add(55);
			sut.add('x');
			sut.add(55);
			sut.add('/');
			sut.add(55);
			sut.add('/');
			sut.add(55);
			sut.equal();

			expect(sut.result).toBe(1);
		});
	});
});
