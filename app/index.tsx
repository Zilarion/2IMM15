// External libraries
import * as React        from 'react';
import { render }        from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { HashRouter } from 'react-router-dom';

// Views
import App from './views/App';

// Theme
import { Theme } from './Theme';


const app = (
    <HashRouter>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </HashRouter>
);

render(app, document.getElementById('root'));
