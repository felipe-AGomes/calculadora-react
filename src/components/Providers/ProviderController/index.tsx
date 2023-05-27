import CalculatorContextProvider from '../CalculatorContextProvider';
import ThemeContextProvider from '../ThemeContextProvider';

type Props = {
	children: JSX.Element;
};

export default function ProviderController({ children }: Props) {
	return (
		<ThemeContextProvider>
			<CalculatorContextProvider>{children}</CalculatorContextProvider>
		</ThemeContextProvider>
	);
}
