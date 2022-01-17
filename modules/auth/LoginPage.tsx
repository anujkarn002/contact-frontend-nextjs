import { HeaderController } from "modules/display/HeaderController";
import { useRouter } from "next/router";
import Link from "next/link"
import React from "react";
import { useEffect } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { publicAgent } from "../../lib/request";
import { AppLayout } from "../app/AppLayout";
import useAppStore from "../app/useAppStore";
import useTokenStore from "./useTokenStore";

const LoginPage = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const { setAccessToken } = useTokenStore();
  const { setIsLoggedIn, isLoggedIn } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) router.back();
  }, []);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ ...state, loading: true, error: "" });
    publicAgent
      .post("/auth", {
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        setState({ ...state, loading: false, error: "" });
        setAccessToken(res.data.token);
        setIsLoggedIn(true);
        router.push("/");
      })
      .catch(() => {
        setState({
          ...state,
          loading: false,
          error: "Invalid email or password",
        });
      });
  };
  return (
    <div className="h-screen flex flex-col">
      <HeaderController title="Login" />
      <div className="flex flex-col justify-center h-full">
        <div className="flex flex-col items-center">
          <form
            className="flex flex-col items-center px-10 py-6 rounded-xl bg-white border w-96"
            onSubmit={onSubmit}
          >
            <h1 className="text-3xl text-grey-darker mb-4">Login</h1>
            <label className="text-grey-darker mt-4 w-full">
              <span className="text-grey-darker">Email</span>
              <Input
                type="text"
                name="email"
                value={state.email}
                onChange={onChange}
                placeholder="user@example.com"
                className="p-3"
              />
            </label>
            <label className="text-grey-darker mt-4 w-full">
              <span className="text-grey-darker">Password</span>
              <Input
                type="password"
                name="password"
                value={state.password}
                onChange={onChange}
                placeholder="Password"
                className="p-3"
              />
            </label>
            {/* error */}
            {state.error && (
              <div className="text-error text-sm mt-4">{state.error}</div>
            )}
            <Button size="large" className="w-full mt-6" type="submit">
              Login
            </Button>
            <div className="w-full mt-6 text-center">
              Don't have an account?{" "}
              <Link href="/signup">
                <a href="/signup" className="text-blue">Signup</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
