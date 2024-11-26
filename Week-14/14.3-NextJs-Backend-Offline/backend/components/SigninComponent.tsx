"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninComponent() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleClick = async () => {
    const response = await axios.post("http://localhost:3000/api/user", data);
    router.push("/welcome");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="flex flex-col gap-4 border-2 border-white rounded-xl p-10">
        <input
          type="text"
          placeholder="Name"
          id="name"
          className="outline-none border-2 p-2 rounded-xl bg-slate-300 text-black"
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        {/* Note : When using the spread operator inside an object, the syntax should include parentheses around the object if it's used in an implicit return arrow function.*/}

        <input
          type="text"
          placeholder="Email"
          className="outline-none border-2 p-2 rounded-xl bg-slate-300 text-black"
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="outline-none border-2 p-2 rounded-xl bg-slate-300 text-black"
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button
          className="bg-blue-600 text-white p-2 rounded-xl"
          onClick={handleClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
