import { isServer } from "../../lib/constants";
import create from "zustand";
import { combine, devtools } from "zustand/middleware";
import { Contact, ContactFilter, Label } from ".";
import { privateAgent } from "lib/request";

const useContactStore = create(
  devtools(
    combine(
      { contacts: [], labels: [], filter: undefined },
      (
        set: (arg0: {
          contacts?: Contact[];
          labels?: Label[];
          filter?: ContactFilter;
        }) => void
      ) => ({
        fetchContacts: async () => {
          privateAgent.get("/contact").then((res) => {
            set({ contacts: [...res.data] });
          });
        },
        fetchLabels: () => {
          privateAgent.get("/contact/label").then((res) => {
            set({ labels: [...res.data] });
          });
        },
        setFilter: (filter: ContactFilter) => {
          set({ filter });
        },
      })
    ),
    { name: "contactStore" }
  )
);

export default useContactStore;
