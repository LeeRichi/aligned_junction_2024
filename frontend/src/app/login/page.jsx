"use client";

import React, { useState } from "react";
import Image from "next/image";
import photo from "@/assets/photo.png";
import photo_company from "@/assets/photo_company.png";

export default function LoginPage() {
  const [isCompanyLogin, setIsCompanyLogin] = useState(false);

  const handleCompanyLoginToggle = () => {
    setIsCompanyLogin(!isCompanyLogin);
  };

  return (
    <div className="flex min-h-screen">
      {/* Client Login Image Section */}
      <div
        className={`${
          isCompanyLogin ? "-translate-x-full" : "translate-x-0"
        } transition-transform duration-700 ease-in-out w-1/2 relative`}
      >
        <Image
          src={photo}
          alt="Client Login Photo"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
				/>
			</div>

      {/* Login Form Section */}
      <div
        className={`flex flex-col justify-center w-1/2 px-6 py-12 lg:px-8 bg-white shadow-lg transition-transform duration-700 ease-in-out ${
          isCompanyLogin ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            {isCompanyLogin ? "Company log in" : "Client log in"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <button
              onClick={handleCompanyLoginToggle}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {isCompanyLogin
                ? "Back to client login"
                : "Login as company"}
            </button>
          </p>
        </div>
			</div>

      {/* <div
        className={`${
          isCompanyLogin ? "-translate-x-full" : "hidden"
        } transition-transform duration-700 ease-in-out w-1/2	`}
      >
        <Image
          src={photo}
          alt="Client Login Photo"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
				/>
			</div> */}
    </div>
  );
}
