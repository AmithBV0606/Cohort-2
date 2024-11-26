import axios from "axios";

interface DataType {
  id: number;
  name: string;
  email: string;
  password: string;
}

const fetchData = async () => {
  const response = await axios.get("http://localhost:3000/api/user");
  const data = response.data.users;
  return data;
};

export default async function () {
  const userData = await fetchData();
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      {userData.map((data: DataType) => (
        <div className="border-2 rounded-xl p-4 m-2" key={data.id}>
          <p>{data.id}</p>
          <p>{data.name}</p>
          <p>{data.email}</p>
          <p>{data.password}</p>
        </div>
      ))}
    </div>
  );
}
