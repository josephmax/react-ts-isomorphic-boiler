import React from "react";
import Main from "../containers/Main";
import Sub from "../containers/Sub";
import { RouteComponentProps } from "react-router-dom";
export interface IRoutes {
  path: string;
  text: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  routes?: IRoutes[];
}

export const routes: IRoutes[] = [
  {
    path: "/main",
    text: "Main",
    component: Main,
  },
  {
    path: "/sub",
    text: "Sub",
    component: Sub,
  },
];
