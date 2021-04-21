import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/App';
import registerServiceWorker from "./registerServiceWorker";
import reportWebVitals from './reportWebVitals';
import { GeneratorProvider } from './state/generator'

ReactDOM.render(
  <React.StrictMode>
    <GeneratorProvider>
      <App />
    </GeneratorProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
registerServiceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
