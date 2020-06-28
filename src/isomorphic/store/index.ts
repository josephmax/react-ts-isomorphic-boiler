import { createStore } from "redux";
import { IChara } from "./index.interface";
interface IAction {
  type: string;
  payload: any;
}

const initState: { data: IChara[] } = {
  data: [],
};

function reducer(state = initState, action: IAction) {
  switch (action.type) {
    case "CHANGE_DATA":
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}

function safeParse(content: string) {
  let ret = null;
  try {
    ret = JSON.parse(content);
  } catch (err) {
    console.log(err);
  }
  return ret;
}

export default typeof window !== "undefined"
  ? createStore(reducer, safeParse((window as any).INIT_STATE) || {})
  : createStore(reducer);
