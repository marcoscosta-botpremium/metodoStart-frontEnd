import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider as MuiProvider } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './contexts/auth';
import BinaryProvider from './contexts/BinaryContext';
import BotProvider from './contexts/BotContext';
import useSettings from './hooks/useSettings';
import { AuthRouter, InternalRouter } from './routes';
import Global from './styles/global';
import { theme } from './styles/theme';
import { createCustomTheme } from './theme';
import TabsComponent from './components/TabsComponents';

const getRoutes = () => {
  const authenticated = Boolean(localStorage.getItem('accessToken'));
  return authenticated ? InternalRouter : AuthRouter;
};

const App = () => {
  let routes = useRoutes(getRoutes());
  return routes;
};

const AppWrapper = () => {
  const { toasts } = useToasterStore();
  const { settings } = useSettings();
  const muUI = createCustomTheme({
    theme: settings.theme,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
  });

  const TOAST_LIMIT = 5;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <BinaryProvider>
          <BotProvider>
            <ThemeProvider theme={theme}>
              <MuiProvider theme={muUI}>
                <Global />
                <Router>
                  <Toaster />
                  <App />
                  <TabsComponent />
                </Router>
              </MuiProvider>
            </ThemeProvider>
          </BotProvider>
        </BinaryProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
};
export default AppWrapper;
