import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactModal from 'react-modal';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactModal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
