import { Options, OptionsOrGroups } from "react-select";

export type Phone = {
  label?: string;
  number: string;
  countryCode?: string;
};

export type Label = {
  name: string;
  color: string;
};

export type Contact = {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  avatar: string;
  company: string;
  jobTitle: string;
  email: string;
  isFavorite: boolean;
  phones: Phone[];
  labels: Label[];
};


export type ContactFilter = {
    label?: Label
    search?: string
}


export var phoneLabelOptions: {label: string, value: string}[] = [
  { value: "work", label: "Work" },
  { value: "home", label: "Home" },
  { value: "mobile", label: "Mobile" },
  { value: "other", label: "Other" },
  { value: "fax", label: "Fax" },
  { value: "pager", label: "Pager" },
  { value: "main", label: "Main" },
  { value: "homefax", label: "Home Fax" },
  { value: "workfax", label: "Work Fax" },
  { value: "otherfax", label: "Other Fax" },
  { value: "car", label: "Car" },
  { value: "isdn", label: "ISDN" },
  { value: "preferred", label: "Preferred" },
  { value: "radio", label: "Radio" },
  { value: "telex", label: "Telex" },
  { value: "ttytdd", label: "TTY/TDD" },
  { value: "workpager", label: "Work Pager" },
  { value: "assistant", label: "Assistant" },
  { value: "mms", label: "MMS" },
  { value: "bbs", label: "BBS" },
  { value: "modem", label: "Modem" },
  { value: "carphone", label: "Car Phone" },
];
