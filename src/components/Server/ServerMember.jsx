import React from "react";

export const ServerMember = ({ member }) => {
  return (
    <div className=" mb-1 py-1.5 hover:bg-[#34373c] group cursor-pointer flex items-center rounded">
      <img
        src={member?.icon}
        className="w-[32px] h-[32px] rounded-full mr-3"
        alt="Member profile picture"
      />
      <p className="text-[#889098] group-hover:text-white">
        {member?.username}
      </p>
    </div>
  );
};
