import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useAppStore from "../app/useAppStore";

const withAuth = (WrappedComponent) => {
  const RequiresAuthentication = (props) => {
    const { isLoggedIn } = useAppStore();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) router.push(`/login`);
    }, [isLoggedIn]);

    return isLoggedIn ? <WrappedComponent {...props} /> : <></>;
  };
  return RequiresAuthentication;
};

export default withAuth;
