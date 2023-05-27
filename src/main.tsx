import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ProviderController from './components/Providers/ProviderController/index.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ProviderController>
			<App />
		</ProviderController>
	</React.StrictMode>,
);
