type ValueProps = { n: number; operator: string };

interface ICalculator {
	values?: ValueProps[];
	partialResult: number;
	result: number;
	add: (n1: number, n2: number) => number;
	substract: (n1: number, n2: number) => number;
	multiply: (n1: number, n2: number) => number;
	divide: (n1: number, n2: number) => number;
	percentage: (n1: number, n2: number, operator: string) => number | null;
	equal: (operator: string, n1: number, n2: number) => void;
	reset: () => void;
	deleteOne: () => void;
	reverseSign: () => void;
}

export class Calculator implements ICalculator {
	values: ValueProps[] = [];
	partialResult = 0;
	result = 0;
	add(n1: number, n2: number): number {
		return n1 + n2;
	}
	substract(n1: number, n2: number): number {
		return n1 - n2;
	}
	multiply(n1: number, n2: number): number {
		return n1 * n2;
	}
	divide(n1: number, n2: number): number {
		return n1 / n2;
	}
	percentage(n1: number, n2: number, operator: string): number | null {
		let result: number | null = null;
		const percent = (n2 / 100) * n2;
		console.log(percent < 0);
		switch (operator) {
			case '+':
				result = n1 + percent;
				break;

			case '-':
				result = n1 - percent;
		}
		return result;
	}

	equal(operator: string, n1: number, n2: number): void {
		console.log(n1, n2, operator);
	}
	reset(): void {
		console.log();
	}
	deleteOne(): void {
		console.log();
	}
	reverseSign(): void {
		console.log();
	}
}

function makeSut() {
	const sut = new Calculator();

	return { sut };
}

describe('calculator', () => {
	describe('add', () => {
		it('should add two numbers', () => {
			const { sut } = makeSut();

			const result = sut.add(1, 1);

			expect(result).toBe(2);
		});

		it('should add if number are negative', () => {
			const { sut } = makeSut();

			const result = sut.add(-10, 5);

			expect(result).toBe(-5);
		});

		it('should add if number are float', () => {
			const { sut } = makeSut();

			const result = sut.add(9.99, 9.99);

			expect(result).toBeCloseTo(19.98);
		});
	});

	describe('substract', () => {
		it('should substract two numbers', () => {
			const { sut } = makeSut();

			const result = sut.substract(1, 1);

			expect(result).toBe(0);
		});

		it('should substract if number are negative', () => {
			const { sut } = makeSut();

			const result = sut.substract(-10, 5);

			expect(result).toBe(-15);
		});

		it('should substract if number are float', () => {
			const { sut } = makeSut();

			const result = sut.substract(9.99, 5);

			expect(result).toBeCloseTo(4.99);
		});
	});

	describe('multiply', () => {
		it('should multiply two numbers', () => {
			const { sut } = makeSut();

			const result = sut.multiply(2, 2);

			expect(result).toBe(4);
		});

		it('should multiply if number are negative', () => {
			const { sut } = makeSut();

			const result = sut.multiply(-10, 5);

			expect(result).toBe(-50);
		});

		it('should multiply if number are float', () => {
			const { sut } = makeSut();

			const result = sut.multiply(9.99, 5);

			expect(result).toBeCloseTo(49.95);
		});
	});

	describe('divide', () => {
		it('should divide two numbers', () => {
			const { sut } = makeSut();

			const result = sut.divide(2, 2);

			expect(result).toBe(1);
		});

		it('should divide if number are negative', () => {
			const { sut } = makeSut();

			const result = sut.divide(-10, 5);

			expect(result).toBe(-2);
		});

		it('should divide if number are float', () => {
			const { sut } = makeSut();

			const result = sut.divide(9.99, 5);

			expect(result).toBeCloseTo(1.998);
		});
	});

	describe('percentage', () => {
		it('should add the percent', () => {
			const { sut } = makeSut();

			const result = sut.percentage(10, 10, '+');

			expect(result).toBe(11);
		});

		it('should add the percent if negative values', () => {
			const { sut } = makeSut();

			const result = sut.percentage(-10, 10, '+');

			expect(result).toBe(-9);
		});

		it('should substract the percent', () => {
			const { sut } = makeSut();

			const result = sut.percentage(10, 10, '-');

			expect(result).toBe(9);
		});

		it('should spercentage if number are negative', () => {
			const { sut } = makeSut();

			const result = sut.percentage(-10, 10, '-');

			expect(result).toBe(-11);
		});
	});
});
