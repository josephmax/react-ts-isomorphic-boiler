import Koa from "koa";
import React from "react";
import Router from "koa-router";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App } from "isomorphic/app";
import { routes } from "isomorphic/routes";
import { matchRoutes } from "react-router-config";
import store from "isomorphic/store";
import { Provider } from "react-redux";
import { ICustomAppContext } from "../app.interface";

const main = new Router<Koa.DefaultState, ICustomAppContext>();

main.get(["/"].concat(routes.map(route => route.path)), async ctx => {
  const branch = matchRoutes(routes, ctx.req.url);
  const { component } = branch[0].route;
  if (component && (component as any).getInitState) {
    await (component as any).getInitState(store)
  }
  ctx.body = await ctx.render("index", {
    app: renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.req.url}>
          <App />
        </StaticRouter>
      </Provider>
    ),
    initState: JSON.stringify(store.getState()),
  });
});

main.post('/fetch', ctx => {
  ctx.body = {
    code: '000',
    message: "成功",
    data: [
      {
        name: 'Rick',
        age: '???'
      },
      {
        name: 'Morty',
        age: '14'
      },
      {
        name: 'Summer',
        age: '16'
      }
    ]
  };
})

export default main;
