import useThemeContext from './hooks/useThemeContext';

function App() {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<>
			<button onClick={toggleTheme}>switch</button>
			<div>
				<h1>{theme}</h1>
			</div>
		</>
	);
}

export default App;
