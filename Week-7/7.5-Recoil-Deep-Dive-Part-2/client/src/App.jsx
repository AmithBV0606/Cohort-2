import { useRecoilState, useRecoilValue } from "recoil";
import { notificationsAtom } from "./store/atoms";
import { totalNotificationCount } from "./store/selectors";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [networkCount, setNetworkCount] = useRecoilState(notificationsAtom); 
  const notifyCount = useRecoilValue(totalNotificationCount); 

  // This is not the correct method to make backend calls when we're already using Recoil because there will be a slight delay between the rendering of default values and the values coming from the backend.

  // Solution : is to make backend calls inside the selectors
  // async function fetchData() {
  //   const response = await axios.get("http://localhost:8080/notifications");
  //   const data = await response.data;
  //   setNetworkCount(data);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  return(
    <div>
      <button>Home</button>

      <button>My Network ({networkCount.network >= 100 ? "99+" : networkCount.network})</button>
      <button>Jobs ({networkCount.jobs})</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>

      <button>Me ({notifyCount})</button>
    </div>
  ); 
}

export default App;