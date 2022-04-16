import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { reducer } from './redux/Reducers';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const root: any = document.getElementById('root')
const ReactRoot = ReactDOM.createRoot(root)
const store = createStore(reducer, composeWithDevTools())
ReactRoot.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);

reportWebVitals();
