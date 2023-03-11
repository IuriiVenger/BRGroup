import AppContent from '@/components/AppContent/AppContent';
import customMUITheme from '@/helpers/themeProviders';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ThemeProvider theme={customMUITheme}>
          <AppContent />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
