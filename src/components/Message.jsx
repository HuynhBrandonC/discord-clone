import React from "react";

export const Message = ({ sender, timeSent, icon, children, image }) => {
  return (
    <>
      <div className="flex items-start mb-4 mx-6 break-all">
        <img src={icon} alt="" className="w-[40px] h-[40px] rounded-full" />
        <div className="ml-4">
          <p className="text-white">
            {sender}
            <span className="text-xs ml-3 text-[#808890]">{timeSent}</span>
          </p>
          <p className="text-[#DBDEE1]">{children}</p>
          <img className=" max-w-[160px]" src={image} alt="" />
        </div>
      </div>
    </>
  );
};
