import { Button, Input } from "antd";
import List from "./List";
import Content from "./Content";
import "./index.less";
import { useNotes } from "@/models/note";
import { ChangeEvent, CompositionEvent } from "react";
import { useMobile } from "@/models/mobile";
import Delete from "./Delete";
import cx from "classnames";

export default function HomePage() {
  const [{ current }, dispatch] = useNotes();
  const { isMobile, currentPage, setCurrentPage } = useMobile();

  let prevent = false;

  const add = () => {
    dispatch({
      type: "add",
      payload: null,
    });
  };

  const search = (
    e: ChangeEvent<HTMLInputElement> | CompositionEvent<HTMLInputElement>
  ) => {
    if (prevent) {
      return;
    }
    const text = (e.target as HTMLInputElement).value;
    dispatch({
      type: "search",
      payload: text,
    });
  };

  const back = () => {
    setCurrentPage("list");
  };

  const classNames = cx("note", {
    mobile: isMobile,
  });

  return (
    <div className={classNames}>
      <header>
        {!(isMobile && currentPage === "detail") && (
          <Button className="add" type="primary" onClick={add}>
            新建
          </Button>
        )}
        {!isMobile && <Delete />}
        {isMobile && currentPage === "detail" && (
          <Button className="add" type="primary" onClick={back}>
            返回
          </Button>
        )}
        <Input
          onCompositionStart={() => (prevent = true)}
          onCompositionEnd={(e) => {
            prevent = false;
            search(e);
          }}
          placeholder="搜索"
          onChange={search}
        />
      </header>
      <main>
        {!isMobile ? (
          <>
            <List />
            <Content />
          </>
        ) : currentPage === "list" ? (
          <List />
        ) : (
          <Content />
        )}
      </main>
    </div>
  );
}
