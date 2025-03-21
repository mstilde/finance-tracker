import React, {useContext} from "react";

import { authContext } from "@/lib/store/auth-context";

import { FcGoogle } from "react-icons/fc";

function SignIn() {
    const { googleLoginHandler } = useContext(authContext);


    return (
        <main className="container max-w-2xl px-6 mx-auto">
            <h1 className="mb-8 text-4xl font-sans font-bold text-center">Seguimiento de Finanzas</h1>

            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-800 shadow-gray-500 rounded-2xl">
                <div className="h-52">
                    <img className="object-cover w-full h-full"
                        src="https://img.freepik.com/free-vector/finance-financial-performance-concept-illustration_53876-40450.jpg"
                    />
                </div>

                <div className="px-4 py-4">
                    <h3 className="text-2xl text-center">Por favor, ingresa para continuar</h3>
                </div>

                <button onClick={googleLoginHandler} className="flex self-start gap-2 p-1 mx-auto mb-6 font-medium text-gray-900 rounded-xl group bg-gradient-to-b from-lime-500 via-lime-400 to-lime-500">
                    <span className="flex self-start gap-2 p-4 mx-auto font-medium text-white align-middle bg-gray-950 rounded-lg">
                        <FcGoogle className="text-2xl"/> Google
                    </span>
                </button>
            </div>
        </main>
    );
}

export default SignIn;