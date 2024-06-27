import { Note } from "@/types/type";
import { useNotes } from "@/models/note";
import { FormEvent, useEffect, useRef, useState } from "react";

export default () => {
  const [{ current }, dispatch] = useNotes();
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!current || !titleRef.current || !contentRef.current) {
      return;
    }

    titleRef.current.innerText = current.title;
    contentRef.current.innerText = current.content;

    // 将光标移动到内容的最后
    const range = document.createRange();
    range.selectNodeContents(contentRef.current);
    range.collapse(false);

    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);

    contentRef.current.focus();
  }, [current?.id]);

  if (!current) {
    return <div className="empty">empty</div>;
  }

  let prevent = false;
  const handleEdit = (
    e: FormEvent<HTMLDivElement>,
    signal: "title" | "content"
  ) => {
    if (prevent) {
      return;
    }
    const text = (e.target as HTMLDivElement).textContent;
    dispatch({ type: "edit", payload: { ...current, [signal]: text } });
  };
  return (
    <div className="note-content">
      <div
        className="title"
        contentEditable
        ref={titleRef}
        onCompositionStart={() => {
          prevent = true;
        }}
        onCompositionEnd={(e) => {
          prevent = false;
          handleEdit(e, "title");
        }}
        onInput={(e) => handleEdit(e, "title")}
      />
      <div
        className="content"
        ref={contentRef}
        contentEditable
        onCompositionStart={() => {
          prevent = true;
        }}
        onCompositionEnd={(e) => {
          prevent = false;
          handleEdit(e, "content");
        }}
        onInput={(e) => handleEdit(e, "content")}
      />
    </div>
  );
};
