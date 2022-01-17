import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Contact, ContactFilter } from ".";
import useContactStore from "./useContactStore";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { UserAvatar } from "./Avatar";
import { FiEdit2, FiHeart, FiTrash2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { privateAgent } from "lib/request";
import { useRouter } from "next/router";

interface ContactListProps {
  contacts: Contact[];
}

const ContactRow: React.FC<{ contact: Contact; key: any }> = ({
  contact,
  key,
}) => {
  const { fetchContacts } = useContactStore();
  const { push } = useRouter();
  const toggleFavourite = (e) => {
    e.stopPropagation();
    privateAgent
      .put(`/contact/${contact._id}`, { isFavorite: !contact.isFavorite })
      .then(() => {
        console.log("Contact updated");
        fetchContacts();
      });
  };

  const deleteContact = (e) => {
    e.stopPropagation();

    privateAgent.delete(`/contact/${contact._id}`).then((res) => {
      fetchContacts();
    });
  };

  const getWorkText = () => {
    if (contact?.company && contact?.jobTitle) {
      return `${contact.jobTitle}, ${contact.company}`;
    }
    if (contact?.company) {
      return contact.company;
    }
    if (contact?.jobTitle) {
      return contact.jobTitle;
    }
  };
  return (
    <tr
      key={contact._id}
      className="cursor-pointer border-primary-300 hover:shadow-lg group text-gray-800 font-normal text-sm"
      onClick={() => push(`/contact/${contact._id}`)}
    >
      <td className="py-3 px-6  text-left whitespace-nowrap">
        <div className="flex items-center">
          <UserAvatar name={contact.firstName} url={contact.avatar} size="sm" />
          <text className="pl-4">
            {contact.firstName} {contact.lastName}
          </text>
        </div>
      </td>
      <td className="py-3 px-6  text-left whitespace-nowrap">
        {contact.email}
      </td>
      <td className="py-3 px-6  text-left whitespace-nowrap">{`${
        contact.phones?.[0]?.countryCode || ""
      }${contact.phones?.[0]?.number || ""}`}</td>
      <td className="py-3 px-6  text-left whitespace-nowrap">
        {getWorkText()}
      </td>
      <td className="py-3 px-6  text-left whitespace-nowrap">
        {contact.labels?.slice(0, 3).map((label, i) => (
          <span
            key={i}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            {label.name}
          </span>
        ))}
      </td>
      <td className="py-3 text-right whitespace-nowrap opacity-0 group-hover:opacity-100">
        <div className="flex flex-row items-end justify-end">
          <button className="pr-3" onClick={toggleFavourite}>
            {contact.isFavorite ? (
              <FaHeart className="text-gray-500 w-5 h-5" />
            ) : (
              <FiHeart className="text-gray-500 w-5 h-5" />
            )}
          </button>
          <Link href={`/contact/${contact._id}?edit=1`}>
            <a className="pl-3" href={`/contact/${contact._id}?edit=1`}>
              <FiEdit2 className="w-5 h-5 text-gray-400 hover:text-gray-500" />
            </a>
          </Link>
          <button className="pl-3" onClick={deleteContact}>
            <FiTrash2 className="w-5 h-5 text-gray-400 hover:text-gray-500" />
          </button>
          {/* <button className="pl-3">
            <HiOutlineDotsVertical className="w-5 h-5 text-gray-400 hover:text-gray-500" />
          </button> */}
        </div>
      </td>
    </tr>
  );
};

export const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [favouredContacts, setFavouredContacts] = useState<Contact[]>([]);
  const { filter } = useContactStore();

  useEffect(() => {
    // update the state with the favourites
    const newFavouredContacts = contacts.filter(
      (contact) => contact.isFavorite
    );
    setFavouredContacts(newFavouredContacts);
  }, [contacts]);

  useEffect(() => {
    // update the state with the filtered contacts
    if (filter?.label) {
      const newFilteredContacts = contacts.filter((contact) =>
        // check if labels item name in lowercase is equal to the filter label
        contact.labels.some(
          (label) =>
            label.name.toLowerCase() === filter.label.name.toLowerCase()
        )
      );
      setFilteredContacts(newFilteredContacts);
    } else {
      setFilteredContacts(contacts);
    }
  }, [filter, contacts]);
  return (
    <div className="w-full mr-14">
      <table className="min-w-max w-full">
        <thead className="border-b">
          <tr className="text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone Number</th>
            <th className="py-3 px-6 text-left">Job Title &amp; Company</th>
            <th className="py-3 px-6 text-left">Labels</th>
            <th className="py-3 text-right ">
              <button>
                <HiOutlineDotsVertical className="w-5 h-5" />
              </button>
            </th>
          </tr>
        </thead>

        <tbody className="text-gray-600 text-md ">
          {/* only show favourites when no filter */}
          {favouredContacts.length > 0 ? (
            <tr>
              <td className="py-3 px-6 text-left text-xs font-medium">
                FAVOURITES ({favouredContacts.length})
              </td>
            </tr>
          ) : null}

          {favouredContacts.length > 0
            ? favouredContacts.map((contact, index) => (
                <ContactRow contact={contact} key={index} />
              ))
            : null}
          {/* only show filtered contacts when filter is applied */}
          {/* Main Listing */}
          {filter?.label && (
            <tr>
              <td className="py-3 px-6 text-left text-xs font-medium">{`${filter.label.name.toUpperCase()} (${
                filteredContacts.length
              })`}</td>
            </tr>
          )}
          {!filter?.label && (
            <tr>
              <td className="py-3 px-6 text-left text-xs font-medium">
                CONTACTS ({filteredContacts.length})
              </td>
            </tr>
          )}
          {filteredContacts.map((contact, index) => (
            <ContactRow contact={contact} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
