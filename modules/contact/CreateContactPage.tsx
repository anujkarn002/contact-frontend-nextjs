import Button from "components/Button";
import { privateAgent } from "lib/request";
import { AppLayout } from "modules/app/AppLayout";
import withAuth from "modules/auth/withAuth";
import { HeaderController } from "modules/display/HeaderController";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FiArrowLeft, FiTag, FiX } from "react-icons/fi";
import { Contact } from ".";
import { UserAvatar } from "./Avatar";
import { ContactDetailsCard } from "./ContactDetailsCard";
import { ContactForm } from "./ContactForm";
import useContactStore from "./useContactStore";

const CreateContactPage = (props) => {
  const { query, push } = useRouter();
  const [contact, setContact] = React.useState<Contact>(null);
  const { fetchContacts } = useContactStore();

  const createContact = () => {
    privateAgent
      .post(`/contact`, contact)
      .then((res) => {
        setContact({ ...res.data });
        fetchContacts();
        push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error creating contact");
      });
  };

  const onFormChange = (contact: Contact) => {
    setContact({ ...contact });
  };

  return (
    <>
      <HeaderController
        title={
          query?._id
            ? `${contact?.firstName} ${contact?.lastName}`
            : "New Contact"
        }
      />
      <AppLayout>
        <div className="flex flex-col w-full mt-6">
          <div className="w-full border-b pb-6 mb-4">
            <div className="w-6/12 flex flex-row justify-between">
              <div className="flex flex-row">
                {/* Cancel Button */}
                <div className="mr-4">
                  <button
                    onClick={() => push("/")}
                    className="w-10 h-10 text-gray-600 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none  hover:bg-gray-200 hover:text-gray-800"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <UserAvatar
                  url={
                    contact?.avatar
                      ? contact.avatar
                      : "https://ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                  }
                />
                {/* contact labels */}
                <div className="self-center ml-8 flex flex-col">
                  <div className="self-start flex">
                    <span
                      onClick={() => alert("coming soon")}
                      className="self-center inline-block border rounded-full px-2 py-2 text-sm  text-secondary mr-2"
                    >
                      <FiTag className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="self-end">
                <Button onClick={createContact}>Save</Button>
              </div>
            </div>
          </div>
          <ContactForm contact={contact} onChange={onFormChange} />
        </div>
      </AppLayout>
    </>
  );
};

export default withAuth(CreateContactPage);
