import { Calculator } from "./calculator";

function makeSut() {
	const sut = new Calculator ();

	return { sut };
}

describe('calculator', () => {
	describe('add', () => {
		it('should add two numbers', () => {
			const { sut } = makeSut();

			const result = sut.add(1, 1);
			const result1 = sut.add(-10, 5);
			const result2 = sut.add(9.99, 9.99);

			expect(result).toBe(2);
			expect(result1).toBe(-5);
			expect(result2).toBeCloseTo(19.98);
		});
	});

	describe('substract', () => {
		it('should substract two numbers', () => {
			const { sut } = makeSut();

			const result = sut.substract(1, 1);
			const result1 = sut.substract(-10, 5);
			const result2 = sut.substract(9.99, 5);

			expect(result).toBe(0);
			expect(result1).toBe(-15);
			expect(result2).toBeCloseTo(4.99);
		});
	});

	describe('multiply', () => {
		it('should multiply two numbers', () => {
			const { sut } = makeSut();

			const result = sut.multiply(2, 2);
			const result1 = sut.multiply(-10, 5);
			const result2 = sut.multiply(9.99, 5);

			expect(result).toBe(4);
			expect(result1).toBe(-50);
			expect(result2).toBeCloseTo(49.95);
		});
	});

	describe('divide', () => {
		it('should divide two numbers', () => {
			const { sut } = makeSut();

			const result = sut.divide(2, 2);
			const result1 = sut.divide(-10, 5);
			const result2 = sut.divide(9.99, 5);

			expect(result).toBe(1);
			expect(result1).toBe(-2);
			expect(result2).toBeCloseTo(1.998);
		});
	});

	describe('percentage', () => {
		it('should add the percent', () => {
			const { sut } = makeSut();

			const result = sut.percentage(10, 10, '+');
			const result1 = sut.percentage(-10, 10, '+');
			const result2 = sut.percentage(9.99, 5, '+');

			expect(result).toBe(11);
			expect(result1).toBe(-11);
			expect(result2).toBeCloseTo(10.4895);
		});

		it('should substract the percent', () => {
			const { sut } = makeSut();

			const result = sut.percentage(10, 10, '-');
			const result1 = sut.percentage(-10, 10, '-');
			const result2 = sut.percentage(9.99, 5, '-');
			
			expect(result).toBe(9);
			expect(result1).toBe(-9);
			expect(result2).toBeCloseTo(9.4905);
		});
		
		it('should multiply the percent', () => {
			const { sut } = makeSut();
			
			const result = sut.percentage(12, 15, 'x');
			const result1 = sut.percentage(-10, 10, 'x');
			const result2 = sut.percentage(9.99, 5, 'x');
			
			expect(result).toBeCloseTo(1.8);
			expect(result1).toBe(-1);
			expect(result2).toBeCloseTo(0.4995);
		});
		
		it('should divide the percent', () => {
			const { sut } = makeSut();
			
			const result = sut.percentage(12, 15, '/');
			const result1 = sut.percentage(-10, 10, '/');
			const result2 = sut.percentage(9.99, 5, '/');
			
			expect(result).toBe(80);
			expect(result1).toBe(-100);
			expect(result2).toBeCloseTo(199.80);
		});
	});
});
