import axios from "axios";

async function getUserDetails() {
  try {
    const response = await axios.get("http://localhost:3000/api/user");
    return response.data;
  } catch (error) {
    console.log("Hello Error : ", error);
  }
}

export default async function Home() {
  await new Promise((r) => setTimeout(r, 5000));
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen bg-black text-white">
      <div className="flex justify-center">
        <div className="border-2 border-blue-600 p-8 rounded">
          <div>Name: {userData?.name}</div>

          {userData?.email}
        </div>
      </div>
    </div>
  );
}
