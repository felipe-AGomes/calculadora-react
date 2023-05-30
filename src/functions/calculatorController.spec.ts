/* eslint-disable no-mixed-spaces-and-tabs */

import { Calculator } from './calculator';
import { CalculatorController } from './calculatorController';

const makeSut = () => {
	const sut = new CalculatorController(new Calculator());
	return { sut };
};

describe('CalculatorController', () => {
	describe('pushToLastValue', () => {
		it('should add the number passed in the last value of the "values" array', () => {
			const { sut } = makeSut();

			sut.add(11);
			sut.add('+');
			sut.add(1);
			sut.pushToLastValue(2);

			expect(sut.values).toEqual([11, '+', 12]);
		});

		it('should throw an error if the last value of the "values" array is a string', () => {
			const { sut } = makeSut();

			sut.add(11);
			sut.add('+');

			expect(() => {
				sut.pushToLastValue(2);
			}).toThrow();
		});
	});

	describe('add', () => {
		it('Should add the numbers to the array "values"', () => {
			const { sut } = makeSut();

			sut.add(1);

			expect(sut.values).toEqual([1]);
		});

		it('Should add the operator to the array "values"', () => {
			const { sut } = makeSut();

			sut.add(11);
			sut.add('+');

			expect(sut.values).toEqual([11, '+']);
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
	});

	describe('reset', () => {
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
	});

	describe('reverseSign', () => {
		it('should invert the sign', () => {
			const { sut } = makeSut();

			sut.result = -30;

			sut.reverseSign();

			expect(sut.result).toBe(30);
		});
	});

	describe('equal', () => {
		it('should throw an error if the method is called with array "values" empty', () => {
			const { sut } = makeSut();
			expect(() => {
				sut.equal();
			}).toThrow();
		});

		it('should keep the "values" property whitout any changes after calculation is done', () => {
			const { sut } = makeSut();

			sut.add(11);
			sut.add('+');
			sut.add(1);
			sut.equal();
			expect(sut.values).toEqual([11, '+', 1]);

			sut.reset();

			sut.add(11);
			sut.add('-');
			sut.add(1);
			sut.equal();
			expect(sut.values).toEqual([11, '-', 1]);

			sut.reset();

			sut.add(11);
			sut.add('x');
			sut.add(1);
			sut.equal();
			expect(sut.values).toEqual([11, 'x', 1]);

			sut.reset();

			sut.add(11);
			sut.add('/');
			sut.add(1);
			sut.equal();
			expect(sut.values).toEqual([11, '/', 1]);
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
	describe('deleteOne', () => {
		it('should delete the last element of array "values"', () => {
			const { sut } = makeSut();

			sut.add(1123);
			sut.add('x');
			sut.add(123);
			sut.add('-');
			sut.deleteOne();
			expect(sut.values).toEqual([1123, 'x', 123]);
			sut.deleteOne();
			expect(sut.values).toEqual([1123, 'x', 12]);
			sut.deleteOne();
			sut.deleteOne();
			expect(sut.values).toEqual([1123, 'x']);
			sut.deleteOne();
			expect(sut.values).toEqual([1123]);
		});
	});
});
