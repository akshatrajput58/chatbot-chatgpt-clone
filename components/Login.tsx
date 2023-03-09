"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
  <div className="bg-[#252A37] h-screen flex flex-col items-center justify-center text-center">
    <Image className="rounded-xl mb-4"
    src="https://vicpra.com/images/icon.png"
    width={300}
    height={300}
    alt="logo"
    />
    <button onClick={() => signIn('google')} 
    className="text-black font-semibold text-2xl animate-pulse rounded-lg bg-white px-6 py-2">
      Sign To Use ChatBOT
    </button>
    <p className="text-white font-semibold mt-5">vicpra.com powered by openai</p>
  </div>
  );
}

export default Login;