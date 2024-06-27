import { Outlet } from "umi";
import "./index.less";
import { NoteContext } from "@/models/note";
import useValue from "@/models/note";

export default function Layout() {
  const value = useValue();
  return (
    <NoteContext.Provider value={value}>
      <Outlet />
    </NoteContext.Provider>
  );
}
