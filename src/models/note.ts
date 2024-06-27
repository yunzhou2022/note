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
      model.add();
      break;
    case "delete":
      model.delete(payload.id);
      break;
    case "edit":
      model.edit(payload);
      break;
    case "switch":
      model.switch(payload.id);
    default:
      break;
  }

  return {
    notes: model.getNotes(),
    current: model.getCurrentNote(),
  };
}

const mock: readonly [string, Note][] = [
  ["0", { id: "0", title: "笔记0", content: "内容0" }],["1", { id: "1", title: "笔记1", content: "内容1" }],["2", { id: "2", title: "笔记2", content: "内容2" }],["3", { id: "3", title: "笔记3", content: "内容3" }],["4", { id: "4", title: "笔记4", content: "内容4" }],["5", { id: "5", title: "笔记5", content: "内容5" }],["6", { id: "6", title: "笔记6", content: "内容6" }],["7", { id: "7", title: "笔记7", content: "内容7" }],["8", { id: "8", title: "笔记8", content: "内容8" }],["9", { id: "9", title: "笔记9", content: "内容9" }],["10", { id: "10", title: "笔记10", content: "内容10" }],["11", { id: "11", title: "笔记11", content: "内容11" }],["12", { id: "12", title: "笔记12", content: "内容12" }],["13", { id: "13", title: "笔记13", content: "内容13" }],["14", { id: "14", title: "笔记14", content: "内容14" }],["15", { id: "15", title: "笔记15", content: "内容15" }],["16", { id: "16", title: "笔记16", content: "内容16" }],["17", { id: "17", title: "笔记17", content: "内容17" }],["18", { id: "18", title: "笔记18", content: "内容18" }],["19", { id: "19", title: "笔记19", content: "内容19" }],["20", { id: "20", title: "笔记20", content: "内容20" }],["21", { id: "21", title: "笔记21", content: "内容21" }],["22", { id: "22", title: "笔记22", content: "内容22" }],["23", { id: "23", title: "笔记23", content: "内容23" }],["24", { id: "24", title: "笔记24", content: "内容24" }],["25", { id: "25", title: "笔记25", content: "内容25" }],["26", { id: "26", title: "笔记26", content: "内容26" }],["27", { id: "27", title: "笔记27", content: "内容27" }],["28", { id: "28", title: "笔记28", content: "内容28" }],["29", { id: "29", title: "笔记29", content: "内容29" }],["30", { id: "30", title: "笔记30", content: "内容30" }],["31", { id: "31", title: "笔记31", content: "内容31" }],["32", { id: "32", title: "笔记32", content: "内容32" }],["33", { id: "33", title: "笔记33", content: "内容33" }],["34", { id: "34", title: "笔记34", content: "内容34" }],["35", { id: "35", title: "笔记35", content: "内容35" }],["36", { id: "36", title: "笔记36", content: "内容36" }],["37", { id: "37", title: "笔记37", content: "内容37" }],["38", { id: "38", title: "笔记38", content: "内容38" }],["39", { id: "39", title: "笔记39", content: "内容39" }],["40", { id: "40", title: "笔记40", content: "内容40" }],["41", { id: "41", title: "笔记41", content: "内容41" }],["42", { id: "42", title: "笔记42", content: "内容42" }],["43", { id: "43", title: "笔记43", content: "内容43" }],["44", { id: "44", title: "笔记44", content: "内容44" }],["45", { id: "45", title: "笔记45", content: "内容45" }],["46", { id: "46", title: "笔记46", content: "内容46" }],["47", { id: "47", title: "笔记47", content: "内容47" }],["48", { id: "48", title: "笔记48", content: "内容48" }],["49", { id: "49", title: "笔记49", content: "内容49" }],["50", { id: "50", title: "笔记50", content: "内容50" }],["51", { id: "51", title: "笔记51", content: "内容51" }],["52", { id: "52", title: "笔记52", content: "内容52" }],["53", { id: "53", title: "笔记53", content: "内容53" }],["54", { id: "54", title: "笔记54", content: "内容54" }],["55", { id: "55", title: "笔记55", content: "内容55" }],["56", { id: "56", title: "笔记56", content: "内容56" }],["57", { id: "57", title: "笔记57", content: "内容57" }],["58", { id: "58", title: "笔记58", content: "内容58" }],["59", { id: "59", title: "笔记59", content: "内容59" }],["60", { id: "60", title: "笔记60", content: "内容60" }],["61", { id: "61", title: "笔记61", content: "内容61" }],["62", { id: "62", title: "笔记62", content: "内容62" }],["63", { id: "63", title: "笔记63", content: "内容63" }],["64", { id: "64", title: "笔记64", content: "内容64" }],["65", { id: "65", title: "笔记65", content: "内容65" }],["66", { id: "66", title: "笔记66", content: "内容66" }],["67", { id: "67", title: "笔记67", content: "内容67" }],["68", { id: "68", title: "笔记68", content: "内容68" }],["69", { id: "69", title: "笔记69", content: "内容69" }],["70", { id: "70", title: "笔记70", content: "内容70" }],["71", { id: "71", title: "笔记71", content: "内容71" }],["72", { id: "72", title: "笔记72", content: "内容72" }],["73", { id: "73", title: "笔记73", content: "内容73" }],["74", { id: "74", title: "笔记74", content: "内容74" }],["75", { id: "75", title: "笔记75", content: "内容75" }],["76", { id: "76", title: "笔记76", content: "内容76" }],["77", { id: "77", title: "笔记77", content: "内容77" }],["78", { id: "78", title: "笔记78", content: "内容78" }],["79", { id: "79", title: "笔记79", content: "内容79" }],["80", { id: "80", title: "笔记80", content: "内容80" }],["81", { id: "81", title: "笔记81", content: "内容81" }],["82", { id: "82", title: "笔记82", content: "内容82" }],["83", { id: "83", title: "笔记83", content: "内容83" }],["84", { id: "84", title: "笔记84", content: "内容84" }],["85", { id: "85", title: "笔记85", content: "内容85" }],["86", { id: "86", title: "笔记86", content: "内容86" }],["87", { id: "87", title: "笔记87", content: "内容87" }],["88", { id: "88", title: "笔记88", content: "内容88" }],["89", { id: "89", title: "笔记89", content: "内容89" }],["90", { id: "90", title: "笔记90", content: "内容90" }],["91", { id: "91", title: "笔记91", content: "内容91" }],["92", { id: "92", title: "笔记92", content: "内容92" }],["93", { id: "93", title: "笔记93", content: "内容93" }],["94", { id: "94", title: "笔记94", content: "内容94" }],["95", { id: "95", title: "笔记95", content: "内容95" }],["96", { id: "96", title: "笔记96", content: "内容96" }],["97", { id: "97", title: "笔记97", content: "内容97" }],["98", { id: "98", title: "笔记98", content: "内容98" }],["99", { id: "99", title: "笔记99", content: "内容99" }]
];

const initState: State = {
  notes: new Map(mock),
  current: mock[0][1],
};

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

  constructor(notes: Notes) {
    this.notes = notes;
  }

  static getInstance() {
    if (!NoteModel.instance) {
      NoteModel.instance = new NoteModel(initState.notes);
    }
    return NoteModel.instance;
  }

  add() {
    const id = generateId();
    this.notes.set(id, {
      id,
      content: "",
      title: "",
    });
  }

  edit(note: Note) {
    const id = note.id;
    this.notes.set(id, note);
  }

  delete(id: string) {
    this.notes.delete(id);
  }

  search(keyword: string) {
    return Array.from(this.notes.values()).filter((d) =>
      d.title.includes(keyword)
    );
  }

  switch(id: string) {
    this.current = id;
  }

  getNotes() {
    return new Map(this.notes.entries());
  }
  getCurrentNote() {
    return this.current ? this.notes.get(this.current) : null;
  }
}
