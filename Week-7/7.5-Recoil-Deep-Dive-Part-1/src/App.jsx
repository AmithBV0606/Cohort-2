import { useRecoilState, useRecoilValue } from "recoil";
import { jobsAtom, messagingAtom, myNetworkAtom, notificationsAtom } from "./store/atoms";
import { totalNotificationCount } from "./store/selectors";
import { useMemo } from "react";

function App() {
  // Defining states without Recoil 
  // const [myNetwork, setMyNetwork] = useState(0);
  // const [jobs, setJobs] = useState(0);
  // const [messaging, setMessaging] = useState(0);
  // const [notifications, setNotifications] = useState(0);

  // using recoil
  const networkCount = useRecoilValue(myNetworkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const messagingCount = useRecoilValue(messagingAtom);
  const [notificationsCount, setNotificationsCount] = useRecoilState(notificationsAtom);

  // Using selectors
  const notifyCount = useRecoilValue(totalNotificationCount); 

  // Not so optimized way to calculate the totalNotificationCount
  // const totalNotificationCount = useMemo(()=>{
  //   return networkCount + jobsCount + messagingCount + notificationsCount;
  // }, [networkCount, jobsCount, messagingCount, notificationsCount]);

  return(
    <div>
      <button>Home</button>

      <button>My Network ({networkCount >= 100 ? "99+" : networkCount})</button>
      <button>Jobs ({jobsCount})</button>
      <button>Messaging ({messagingCount})</button>
      <button>Notifications ({notificationsCount})</button>

      <button
        onClick={() => {
          setNotificationsCount(notificationsCount + 1);
        }}
      >Me ({notifyCount})</button>
    </div>
  ); 
}

export default App;