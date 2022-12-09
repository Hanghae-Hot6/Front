import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import {store} from './Redux/store/store';
import {ThemeProvider} from 'styled-components';
import {QueryClient, QueryClientProvider} from 'react-query';
import './index.css';
import App from './App';
import Theme from './theme/Theme';
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
