import { Outlet } from "umi";
import "./index.less";
import { NoteContext } from "@/models/note";
import useValue from "@/models/note";
import { MobileContext } from "@/models/mobile";
import { useEffect, useState } from "react";

export default function Layout() {
  const value = useValue();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 501);
  const [currentPage, setCurrentPage] = useState<"list" | "detail">("list");

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth < 501) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile, currentPage, setCurrentPage }}>
      <NoteContext.Provider value={value}>
        <Outlet />
      </NoteContext.Provider>
    </MobileContext.Provider>
  );
}
