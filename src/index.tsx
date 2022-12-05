import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './Redux/store/store';
import {ThemeProvider} from 'styled-components';
import Theme from './theme/Theme';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </Provider>,
  // </React.StrictMode>,
);
