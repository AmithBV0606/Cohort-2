import { selector } from "recoil";
import { notificationsAtom } from "./atoms";

// Synchronous example : 
export const totalNotificationCount = selector({
  key: "totalNotificationCount",
  get: ({ get }) => {
    const allNotifications = get(notificationsAtom);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.messaging +
      allNotifications.notifications
    );
  },
});

// Selectors can be used as one way to incorporate asynchronous data into the Recoil data-flow graph. 