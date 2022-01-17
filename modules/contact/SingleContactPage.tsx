import Button from "components/Button";
import { privateAgent } from "lib/request";
import { AppLayout } from "modules/app/AppLayout";
import withAuth from "modules/auth/withAuth";
import { HeaderController } from "modules/display/HeaderController";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FiArrowLeft, FiHeart, FiTag, FiTrash2, FiX } from "react-icons/fi";
import { Contact } from ".";
import { UserAvatar } from "./Avatar";
import { ContactDetailsCard } from "./ContactDetailsCard";
import { ContactForm } from "./ContactForm";
import useContactStore from "./useContactStore";

const SingleContactPage = (props) => {
  const { query, push } = useRouter();
  const [contact, setContact] = React.useState<Contact>(null);
  const [editedContact, setEditedContact] = React.useState<Contact>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const { fetchContacts } = useContactStore();
  useEffect(() => {
    if (query?._id) {
      privateAgent.get(`/contact/${query._id}`).then((res) => {
        console.log(res.data);
        setContact({ ...res.data });
      });
    }
    if (query?.edit) {
      setIsEditing(true);
    }
  }, [query]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateContact = () => {
    privateAgent.put(`/contact/${contact._id}`, editedContact).then((res) => {
      setContact({ ...res.data });
      fetchContacts();
      setEditedContact(null);
      setIsEditing(false);
    });
  };

  const setFavorite = () => {
    privateAgent
      .put(`/contact/${contact._id}`, { isFavorite: !contact?.isFavorite })
      .then((res) => {
        setContact({ ...res.data });
        fetchContacts();
      });
  };

  const deleteContact = () => {
    privateAgent.delete(`/contact/${contact._id}`).then((res) => {
      fetchContacts();
      push("/");
    });
  };

  const onFormChange = (contact: Contact) => {
    if (isEditing) {
      setEditedContact({ ...contact });
    }
  };

  const getWorkText = () => {
    if (contact?.company && contact?.jobTitle) {
      return `${contact.jobTitle} • ${contact.company}`;
    }
    if (contact?.company) {
      return contact.company;
    }
    if (contact?.jobTitle) {
      return contact.jobTitle;
    }
  };

  return (
    <>
      <HeaderController title={`${contact?.firstName} ${contact?.lastName}`} />
      <AppLayout>
        <div className="flex flex-col w-full mt-6">
          <div className="w-full  border-b pb-6 mb-4">
            <div className="w-6/12 flex flex-row justify-between">
              <div className="flex flex-row">
                {/* Nav/Cancel Button */}
                <div className="mr-4">
                  {isEditing ? (
                    <button
                      onClick={toggleEdit}
                      className="w-10 h-10 text-gray-600 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none  hover:bg-gray-200 hover:text-gray-800"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  ) : (
                    <button
                      onClick={() => push("/")}
                      className="w-10 h-10 text-gray-600 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none  hover:bg-gray-200 hover:text-gray-800"
                    >
                      <FiArrowLeft className="w-6 h-6" />
                    </button>
                  )}
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
                  <div className="self-start mb-2">
                    <h4 className="font-medium text-gray-700">
                      {contact?.firstName} {contact?.lastName}
                    </h4>
                  </div>
                  <div className="self-start mb-4">
                    <h5 className="font-normal  text-gray-700">
                      {getWorkText()}
                    </h5>
                  </div>
                  <div className="self-start flex">
                    {contact?.labels?.map((label, i) => (
                      <span
                        key={i}
                        className="inline-block border rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2"
                      >
                        {label.name}
                      </span>
                    ))}
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
                <button className="" onClick={setFavorite}>
                  {contact?.isFavorite ? (
                    <FaHeart className="text-gray-500 w-5 h-5" />
                  ) : (
                    <FiHeart className="text-gray-500 w-5 h-5" />
                  )}
                </button>
                <button className="ml-6" onClick={deleteContact}>
                  <FiTrash2 className="text-gray-500 w-5 h-5" />
                </button>
                {isEditing ? (
                  <Button onClick={updateContact} className="ml-6">
                    Save
                  </Button>
                ) : (
                  <Button onClick={toggleEdit} className="ml-6">
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
          {isEditing ? (
            <ContactForm contact={contact} onChange={onFormChange} />
          ) : (
            <div className="w-6/12">
              <ContactDetailsCard contact={contact} />
            </div>
          )}
        </div>
      </AppLayout>
    </>
  );
};

export default withAuth(SingleContactPage);
