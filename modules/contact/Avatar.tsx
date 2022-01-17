import React from "react";

// Letter Avatar
const UserAvatar = ({ name=null, size = "md", url }) => {
  const firstLetter = name?.[0];
  const initials = firstLetter?.toUpperCase();
  const sizeClass = size === "sm" ? "w-10 h-10" : "w-36 h-36";
  return (
    <div
      className={`rounded-full ${sizeClass} justify-center items-center border-0 flex text-center text-white bg-gray-800`}
      style={{
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
          16
        )}`,
      }}
    >
      {url ? (
        <img
          src={url}
          alt={name}
          className={`rounded-full ${sizeClass} text-center text-white bg-gray-800`}
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
          }}
        />
      ) : (
        initials
      )}
    </div>
  );
};

export { UserAvatar };
