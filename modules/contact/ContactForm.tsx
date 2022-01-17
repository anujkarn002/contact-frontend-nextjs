import Button from "components/Button";
import Input from "components/Input";
import React, { useEffect } from "react";
import { FiPhone, FiUser } from "react-icons/fi";
import { HiUser } from "react-icons/hi";
import { MdOutlineCorporateFare, MdOutlineMail } from "react-icons/md";
import { ActionMeta } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Contact, phoneLabelOptions } from ".";

interface ContactFormProps {
  contact?: Contact;
  onChange: (contact: Contact) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onChange,
  contact,
}) => {
  const [state, setState] = React.useState<Contact>(null);

  useEffect(() => {
    setState(contact);
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes("phone")) {
      //   update phone number at index
      const phoneIndex = parseInt(name.split("-")[1]);
      if (state?.phones?.length) {
        var newPhones = [...state?.phones];
        newPhones[phoneIndex].number = value;
      } else {
        newPhones = [];
        newPhones[phoneIndex] = { number: value };
      }
      setState({ ...state, phones: newPhones });
      onChange({ ...state, phones: newPhones });
    } else {
      setState({ ...state, [name]: value });
      onChange({ ...state, [name]: value });
    }
  };

  const handlePhoneLabelChange = (
    newValue: any,
    actionMeta: ActionMeta<{ label: string; value: string }>
  ) => {
    const label = newValue.label;
    const phoneIndex = parseInt(actionMeta.name.split("-")[1]);
    const newPhones = [...state.phones];
    newPhones[phoneIndex].label = label;
    setState({ ...state, phones: newPhones });
    onChange({ ...state, phones: newPhones });
  };

  const handleAddPhone = () => {
    const newPhones = [...state.phones];
    newPhones.push({ label: "", number: "" });
    setState({ ...state, phones: newPhones });
  };

  const handleRemovePhone = (index: number) => {
    const newPhones = [...state.phones];
    newPhones.splice(index, 1);
    setState({ ...state, phones: newPhones });
  };

  return (
    <>
      <form className="w-4/12">
        <div className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:text-gray-500">
          <FiUser className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={state?.firstName}
            onChange={handleChange}
            className="p-2 mx-4 border-0 border-b rounded-none"
          />
        </div>
        <div className="flex items-center px-4 py-2  rounded-md text-gray-600 hover:text-gray-500">
          <FiUser className="w-5 h-5 text-gray-400 opacity-0" />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={state?.lastName}
            onChange={handleChange}
            className="p-2 mx-4 border-0 border-b rounded-none"
          />
        </div>
        <div className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:text-gray-500">
          <MdOutlineCorporateFare className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            name="company"
            placeholder="Company"
            value={state?.company}
            onChange={handleChange}
            className="p-2 mx-4 border-0 border-b rounded-none"
          />
        </div>
        <div className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:text-gray-500">
          <MdOutlineCorporateFare className="w-5 h-5 text-gray-400 opacity-0" />
          <Input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={state?.jobTitle}
            onChange={handleChange}
            className="p-2 mx-4 border-0 border-b rounded-none"
          />
        </div>
        <div className="flex items-center px-4 py-2 rounded-md text-gray-600 hover:text-gray-500">
          <MdOutlineMail className="w-5 h-5 text-gray-400" />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={state?.email}
            onChange={handleChange}
            className="p-2 mx-4 border-0 border-b rounded-none"
          />
        </div>
        <div>
          {state?.phones?.length > 0 ? (
            <>
              <ul>
                {state.phones.map((phone, index) => (
                  <li key={index}>
                    <div className="flex relative items-center px-4 py-2 rounded-md text-gray-600 hover:text-gray-500">
                      <FiPhone className="w-5 h-5 text-gray-400" />

                      <Input
                        type="text"
                        name={`phone-${index}`}
                        placeholder="Phone Number"
                        value={state?.phones[index]?.number}
                        onChange={handleChange}
                        className="p-2 mx-4 border-0 border-b rounded-none"
                      />
                      <CreatableSelect
                        options={phoneLabelOptions}
                        className="capitalize w-48"
                        name={`label-${index}`}
                        value={
                          phoneLabelOptions.find(
                            (option) => option.value === phone.label
                          ) || { label: phone.label, value: phone.label }
                        }
                        onChange={handlePhoneLabelChange}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex relative items-center px-4 py-2 rounded-md text-gray-600 hover:text-gray-500">
              <FiPhone className="w-5 h-5 text-gray-400" />

              <Input
                type="text"
                name={`phone-${0}`}
                placeholder="Phone Number"
                onChange={handleChange}
                value={state?.phones?.[0]?.number}
                className="p-2 mx-4 border-0 border-b rounded-none"
              />
              <CreatableSelect
                options={phoneLabelOptions}
                className="capitalize w-48"
                name={`label-${0}`}
                onChange={handlePhoneLabelChange}
              />
            </div>
          )}
        </div>
        {/* <div>
          <Button onClick={handleAddPhone}>Add Phone</Button>
        </div> */}
      </form>
    </>
  );
};
