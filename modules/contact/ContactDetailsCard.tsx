import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { Contact } from ".";

interface ContactDetailsCardProps {
  contact: Contact;
}

export const ContactDetailsCard: React.FC<ContactDetailsCardProps> = ({
  contact,
}) => {
  if (!contact) return <></>;
  return (
    <>
      <div className="flex flex-col rounded-xl border w-8/12 p-4">
        <text className="text-gray-800 font-semibold text-base">
          Contact Details
        </text>
        {contact?.phones?.length > 0 ? (
          <>
            {contact?.phones?.map((phone) => (
              <div className="flex flex-row items-center mt-3">
                <FiPhone className="w-4 h-4 font-light mr-3" />
                <a
                  href={`tel:${phone?.countryCode || ""}${phone?.number}`}
                  className="text-blue text-sm"
                >
                  {phone.number}
                </a>
                <text className="text-xs text-gray-700 capitalize pl-2">{`• ${phone.label}`}</text>
              </div>
            ))}
          </>
        ) : null}
        {contact?.email ? (
          <div className="flex flex-row items-center mt-3">
            <MdOutlineMail className="w-4 h-4 font-light mr-3" />
            <a
              href={`mailto:${contact?.email || ""}`}
              className="text-blue text-sm"
            >
              {contact.email}
            </a>
          </div>
        ) : null}
      </div>
    </>
  );
};
