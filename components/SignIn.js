import React, {useContext} from "react";

import { authContext } from "@/lib/store/auth-context";

import { FcGoogle } from "react-icons/fc";

function SignIn() {
    const { googleLoginHandler } = useContext(authContext);


    return (
        <main className="container max-w-2xl px-6 mx-auto">
            <h1 className="mb-6 text-5xl font-bold text-center">Bienvenido a Balances!</h1>

            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
                <div className="h-52">
                    <img className="object-cover w-full h-full"
                        src="https://img.freepik.com/free-vector/finance-financial-performance-concept-illustration_53876-40450.jpg"
                    />
                </div>

                <div className="px-4 py-4">
                    <h3 className="text-2xl text-center">Por favor, ingresa para continuar</h3>
                </div>

/*                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        <FcGoogle className="text-2xl"/> Google
                    </span>
*/                </button>

                <button onClick={googleLoginHandler} className="flex self-start gap-2 p-4 mx-auto mb-6 font-medium text-white align-middle bg-gray-700 rounded-lg">
                    <FcGoogle className="text-2xl"/> Google
                </button>
            </div>
        </main>
    );
}

export default SignIn;