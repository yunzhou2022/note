import React, { useContext, useState } from "react";

interface MobileModel {
  isMobile: boolean;
  currentPage: "list" | "detail";
  setCurrentPage: React.Dispatch<React.SetStateAction<"list" | "detail">>;
}

export const MobileContext = React.createContext<MobileModel>({
  isMobile: false,
  currentPage: "list",
  setCurrentPage: () => {},
});
export const useMobile = () => useContext<MobileModel>(MobileContext);
