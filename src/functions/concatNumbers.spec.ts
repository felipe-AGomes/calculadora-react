import concatNumbers from './concatNumbers';

describe('concatNumbers', () => {
	it('should return two numbers concatenated', () => {
		const result = concatNumbers(12, 22);

		expect(result).toBe(1222);
	});
});
