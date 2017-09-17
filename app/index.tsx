// External libraries
import * as React        from 'react';
import { render }        from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

// Views
import App from './views/App';

// Theme
import { Theme } from './Theme';


const app = (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
);

render(app, document.getElementById('root'));
