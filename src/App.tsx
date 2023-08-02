import { generateDigitalSignature } from 'assinatura-digital';
import './app.css';
import Calculator from './components/Calculator/Calculator';
import useThemeContext from './hooks/useThemeContext';

function App() {
	const { theme } = useThemeContext();
	console.clear();
	const transformedSignature = generateDigitalSignature(
		'felipe-dev',
		'falmeidagomes13@gmail.com',
		'Bem-vindo ao meu site! Sinta-se à vontade para explorar e desenvolver com paixão!',
	);

	console.log(...transformedSignature);
	return (
		<div className={`container__calculator ${theme}`}>
			<Calculator />
		</div>
	);
}

export default App;
