export interface ICalculator {
	add: (n1: number, n2: number) => number;
	substract: (n1: number, n2: number) => number;
	multiply: (n1: number, n2: number) => number;
	divide: (n1: number, n2: number) => number;
	percentage: (n1: number, n2: number, operator: string) => number | string;
	
}

export class Calculator implements ICalculator {
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
	percentage(n1: number, n2: number, operator: string): number | string {
		const percentAddAndSubstract = (n2 / 100) * n1;
		const percentMultiplyAndDivide = n2 / 100;
		switch (operator) {
			case '+':
				return n1 + percentAddAndSubstract;
			case '-':
				return n1 - percentAddAndSubstract;
			case 'x':
				return n1 * percentMultiplyAndDivide;
			case '/':
				return n1 / percentMultiplyAndDivide;
			default:
				return 'Invalid operation. Choose one of the following options: addition, subtraction, multiplication, division.';
		}
	}
}