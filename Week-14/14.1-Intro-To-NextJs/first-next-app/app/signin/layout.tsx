import React from "react";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-900 text-white text-center p-2 m-2 rounded-xl">
      <h1 className="text-2xl">Login now to get 20% off</h1>
      {children}
    </div>
  );
}