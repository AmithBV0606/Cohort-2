import { selector } from "recoil";
import { jobsAtom, messagingAtom, myNetworkAtom, notificationsAtom } from "./atoms";

export const totalNotificationCount = selector({
    key:"totalNotificationCount",
    get: ({get}) => {
        const network = get(myNetworkAtom);
        const jobs = get(jobsAtom);
        const message = get(messagingAtom);
        const notification = get(notificationsAtom);
        return (network + jobs + message + notification);
    }
});