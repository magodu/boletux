import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import BoletuxContextProvider from './store/boletux-context';

import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <BoletuxContextProvider>
            <App />
        </BoletuxContextProvider> 
    </React.StrictMode>
);
