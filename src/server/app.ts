import Koa from "koa";
import render from "koa-swig";
import path from "path";
import co from "co";
import serve from "koa-static";
import main from "./controllers/main";
import { ICustomAppContext } from "./app.interface";

const app = new Koa<Koa.DefaultState, ICustomAppContext>();

app.context.render = co.wrap(
  render({
    root: path.join(__dirname, "../src/template"),
    autoescape: true,
    encoding: 'utf8',
    cache: "memory", // disable, set to false
    ext: "html",
    locals: {
      title: "同构直出play",
    },
    // filters: filters,
    // tags: tags,
    writeBody: false,
  }) as any
);

app.use(serve("dist/static"));

app.use(main.routes()).use(main.allowedMethods());

app.listen(3000);
