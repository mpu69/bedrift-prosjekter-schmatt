import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase-config";
import { useForm } from "react-hook-form";
import Button from "./components/submit-button";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("Logged in succesfully");
    } catch (error) {
      console.log("Login Failed: ", error);
    }
  };

  return (
    // Wrapping div
    <div className="h-3/6 w-3/5 bg-white rounded-3xl flex flex-col overflow-hidden">
      {/*Wrapping div inside to have content not take up the whole div*/}
      <div className="h-96 flex">
        {/*Left side with image*/}
        <div className="h-full">
          <img src={"mobile.png"} alt="mobile image" className="h-full" />
        </div>
        {/*Right side with login information, wrapper*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-2/3 h-full flex flex-col justify-center pr-8 -ml-10"
        >
          <h1 className="text-iris text-7xl font-bold mt-4">Log in</h1>
          {/*Input fields wrapper*/}
          <div className="h-28 flex mt-10">
            {/*Left side */}
            <div className="w-80 h-full text-black text-xl font-light flex flex-col gap-1">
              <input
                type="email"
                {...register("email", { required: "*Please provide an email" })}
                placeholder="Email"
                className="rounded-2xl border-border-color border w-full h-1/2 px-2"
              />
              <input
                type="password"
                {...register("password", {
                  required: "*Please provide a password",
                  minLength: {
                    value: 6,
                    message: "*Password must contain at least 6 characters.",
                  },
                })}
                placeholder="Password"
                className="rounded-2xl border-border-color border w-full h-1/2 px-2"
              />
            </div>
            {/*Middle (two lines and "or") */}
            <div className="h-full w-9 flex flex-col justify-center items-center">
              <svg height="35" width="2">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="200"
                  style={{ stroke: "#707070", strokeWidth: 2 }}
                />
              </svg>
              <span className="font-light text-border-color">Or</span>
              <svg height="35" width="2">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="200"
                  style={{ stroke: "#707070", strokeWidth: 2 }}
                />
              </svg>
            </div>
            {/*Microsoft and google logins wrapper */}
            <div className="h-full w-44 py-2 flex flex-col justify-center items-center gap-2">
              <div className="h-11 w-full border border-border-color cursor-pointer"></div>
              <div className="h-11 w-full border border-border-color cursor-pointer"></div>
            </div>
          </div>
          <i className="m-0 p-0 text-sm text-red-700">
            {errors.email?.message}
          </i>
          <i className="m-0 p-0 text-sm text-red-700">
            {errors.password?.message}
          </i>
          {/* Login button */}
          <Button text="Log In" />
        </form>
      </div>
    </div>
  );
}
