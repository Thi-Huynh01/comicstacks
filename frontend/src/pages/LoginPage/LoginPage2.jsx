import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/logo_dark.png'
import './LoginPage.css';

const providers = [{ id: 'credentials', name: 'Credentials' }];
const BRANDING = { logo: ( <img src={logo} alt="MUI logo" style={{ height: 60 }} /> ), title: 'ComicStacks!', };

const BrandingSignInPage = () => {
  const theme = useTheme();
  const nav = useNavigate();

  const signIn = async (provider, formData) => {
    if (provider.id !== "credentials") {
      throw new Error("Unsupported provider");
    }

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Missing credentials");
    }

    const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    });

    if (!res.ok) {
      throw new Error("Invalid username or password");
    }

    const data = await res.json();

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    nav(-1); 
    return true;
  };

  return (
    <div className="sign-in">
        <title>Login</title>
      <div className="sign-in-box">
        <AppProvider branding={BRANDING} theme={theme}>
          <SignInPage
            signIn={signIn}
            providers={providers}
            slotProps={{
              form: { noValidate: true },
              emailField: { autoFocus: false },
            }}
          />
        </AppProvider>
      </div>
    </div>
  );
}


export default BrandingSignInPage;