"use client";
import { useState } from "react";
import LabelledInput from "./LabelledInput";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user", {
        username,
        password,
      });
      // alert(response.data.message);
      router.push("/home");
    } catch (error) {
      console.log("Error is : ", error);
      alert("Error while posting the data!!");
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <a
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
        >
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Sign up</div>
            </div>
            <div className="pt-2">
              <LabelledInput
                label="Username"
                placeholder="amithrao0606@gmail.com"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <LabelledInput
                label="Password"
                placeholder="123456"
                type={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={fetchData}
              >
                Sign in
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
