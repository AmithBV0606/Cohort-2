import axios from "axios";
// Data fetching in NextJs
async function getUserDetails() {
  const response = await axios.get(
    "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
  );
  return response.data;
}

export default async function Home() {
  await new Promise((r) => setTimeout(r, 5000));
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen bg-slate-600">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {userData?.name}</div>

          {userData?.email}
        </div>
      </div>
    </div>
  );
}
