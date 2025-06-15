import LoginForm from "@/components/Layout/auth/LoginForm"
import Link from "next/link"

export default function LoginPage(){
    return (<div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h1>
            <p className="text-small text-gray-500">Welcome Back</p>
            <LoginForm />
            <p className="text-center text-sm text-gray-500">
              Don't have an account?
              <Link
                href={"/register"}
                className="font-semibold text-black hover:text-black ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 p-12 items-center justify-center relative">
        <div className="max-w-lg space-y-6 text-white z-10">
          <h2 className="text-4xl text-amber-300 font-semibold">
            Keep blogging, bloggers!
          </h2>
          <p className="text-right text-lg text-{#2C6E49} font-extrabold">
            -Psyduck inc
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src="/images/psy.png"
          alt="psyduck img"
          className="absolute inset-0 object-cover w-full h-full"
        ></img>
      </div>
    </div>)
}