import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import AuthPage from './pages/auth';
import ProfilePage from './pages/profile';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import UserList from 'pages/list';


function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:id" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/users" element={isAuth ? <UserList /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
