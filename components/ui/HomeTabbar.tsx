import React from "react";
import { productType } from "../Header";
import { FaRepeat } from "react-icons/fa6";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold mb-4">
      <div className="flex items-center gap-1.5">
        {productType?.map((item) => (
          <button
            key={item?.title}
            onClick={() => onTabSelect(item?.title)}
            className={`border border-black px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-black hover:text-white hoverEffect ${selectedTab === item?.title && "bg-black text-white"}`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <button
        className={
          "border border-black p-2 rounded-full hover:bg-black hover:text-white hoverEffect"
        }
      >
        <FaRepeat size={20} className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HomeTabbar;
