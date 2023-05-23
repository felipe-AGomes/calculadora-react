import './app.css';
import Calculator from './components/Calculator/Calculator';
import useThemeContext from './hooks/useThemeContext';

function App() {
	const { theme } = useThemeContext();

	return (
		<div className={`container__calculator ${theme}`}>
			<Calculator />
		</div>
	);
}

export default App;
