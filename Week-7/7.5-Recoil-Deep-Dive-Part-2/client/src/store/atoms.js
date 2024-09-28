import axios from "axios";
import { atom, selector } from "recoil";

// default value for an Atom needs to be synchronous

// default value should hit the backend and get back the data and then that will be the default value of the notificationsAtom.

// export const notificationsAtom = atom({
//     key:"notificationsAtom",
//     default : {
//         network: 4,
//         jobs: 3,
//         messaging:3,
//         notifications: 10
//     }
// });

// This is how an Atom should look like if you know that the default value will come asynchronously.

// Asynchronous Data Queries
export const notificationsAtom = atom({
  key: "notificationsAtom",
  default: selector({
    key: "notificationsAtom/Default",
    get: async () => {
        // await new Promise((r) => setTimeout(r, 5000));
      const response = await axios.get("http://localhost:8080/notifications");
      const data = await response.data;
      return data;
    },
  }),
});
