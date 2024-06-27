import { Action, Note, Notes } from "@/types/type";
import { generateId } from "@/utils";
import React, { type Dispatch, useContext, useReducer } from "react";

type State = {
  notes: Notes;
  current: Note | null | undefined;
};

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  const model = NoteModel.getInstance();

  switch (type) {
    case "add":
      const note = model.add();
      model.switch(note.id);
      break;
    case "delete":
      model.delete(payload.id);
      model.switch(model.getNotes().keys().next().value);
      break;
    case "edit":
      model.edit(payload);
      break;
    case "switch":
      model.switch(payload.id);
      break;
    case "search":
      if (!payload) {
        break;
      }
      return {
        notes: model.search(payload),
        current: model.getCurrentNote(),
      };
    default:
      break;
  }

  model.persistence();
  return {
    notes: model.getNotes(),
    current: model.getCurrentNote(),
  };
}

// const mock: readonly [string, Note][] = [
//   ["0", { id: "0", title: "笔记0", content: "内容0", editTime: 1 }],
//   ["1", { id: "1", title: "笔记1", content: "内容1", editTime: 5 }],
//   ["2", { id: "2", title: "笔记2", content: "内容2", editTime: 3 }],
//   ["3", { id: "3", title: "笔记3", content: "内容3", editTime: 4 }],
// ];

const initState: State = getInitState();

export default function (): [State, Dispatch<Action>] {
  const [notes, dispatch] = useReducer(reducer, initState);

  return [notes, dispatch];
}

export const NoteContext = React.createContext<[State, Dispatch<Action>]>([
  initState,
  (v: Action) => {},
]);
export const useNotes = () => useContext(NoteContext);

class NoteModel {
  notes: Notes;
  current?: string;
  static instance: NoteModel;

  constructor({ notes, current }: State) {
    this.notes = notes;
    this.current = current?.id;
  }

  static getInstance() {
    if (!NoteModel.instance) {
      NoteModel.instance = new NoteModel(initState);
    }
    return NoteModel.instance;
  }

  add() {
    const id = generateId();
    const numb = this.notes.size + 1;
    const note = {
      id,
      content: "内容" + numb,
      title: "笔记" + numb,
      editTime: Date.now(),
    };
    this.notes.set(id, note);
    return note;
  }

  edit(note: Note) {
    const id = note.id;
    this.notes.set(id, note);
  }

  delete(id: string) {
    this.notes.delete(id);
  }

  search(keyword: string) {
    return new Map(
      Array.from(this.notes).filter((d) => d[1].title.includes(keyword))
    );
  }

  switch(id: string) {
    this.current = id;
  }

  getNotes() {
    return new Map(
      Array.from(this.notes).sort((a, b) => b[1].editTime - a[1].editTime)
    );
  }
  getCurrentNote() {
    return this.current ? this.notes.get(this.current) : null;
  }

  persistence() {
    const state = {
      notes: Array.from(this.getNotes()),
      current: this.getCurrentNote(),
    };
    localStorage.setItem("notes", JSON.stringify(state));
  }
}

function getInitState() {
  let state: State = {
    notes: new Map(),
    current: null,
  };

  try {
    const _state = JSON.parse(localStorage.getItem("notes") || "") as State;
    state.notes = new Map(_state.notes);
    state.current = _state.current;
  } catch (e) {
    console.error(e);
  }

  return state;
}
