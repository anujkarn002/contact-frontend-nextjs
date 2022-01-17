import React, { useEffect } from "react";
import "../styles/globals.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import useAppStore from "modules/app/useAppStore";
import useContactStore from "modules/contact/useContactStore";

function MyApp({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAppStore();
  const { fetchContacts, fetchLabels } = useContactStore();
  useEffect(() => {
    if (isLoggedIn) {
      // fetch contacts and labels
      fetchContacts();
      fetchLabels();
    }
  }, [isLoggedIn]);
  return <Component {...pageProps} />;
}

export default MyApp;
