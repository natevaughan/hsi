import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";
import React from "react";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <CookiesProvider>
      <Toaster position="bottom-right" />
      <Component {...pageProps} />
    </CookiesProvider>);
}

export default MyApp;
