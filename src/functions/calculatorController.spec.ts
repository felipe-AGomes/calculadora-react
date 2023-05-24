interface ICalculatorController {
	equal: (operator: string, n1: number, n2: number) => void;
	reset: () => void;
	deleteOne: () => void;
	reverseSign: () => void;
}

class CalculatorController implements ICalculatorController {
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
