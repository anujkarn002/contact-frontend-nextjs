import { privateAgent } from "lib/request";
import { AppLayout } from "modules/app/AppLayout";
import withAuth from "modules/auth/withAuth";
import { HeaderController } from "modules/display/HeaderController";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { Contact } from ".";
import { ContactList } from "./ContactList";
import useContactStore from "./useContactStore";

const ContactPage = (props) => {
  const { contacts, filter, setFilter, labels } = useContactStore();
  const { query } = useRouter();
  useEffect(() => {
    if (query?.label && labels.length) {
      let newFilter = filter ? { ...filter } : {};
      newFilter.label = labels.find(
        (l) => l.name.toLowerCase() == (query.label as string)?.toLowerCase()
      );
      setFilter(newFilter);
    } else {
      const newFilter = filter ? { ...filter } : {};
      delete newFilter.label;
      setFilter(newFilter);
    }
  }, [query, labels]);
  return (
    <>
      <HeaderController
        title={query?.label ? (query.label as string) : "Contacts"}
      />
      <AppLayout>
        {contacts.length > 0 ? (
          <ContactList contacts={contacts} />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            No Contacts
          </div>
        )}
      </AppLayout>
    </>
  );
};

export default withAuth(ContactPage);
