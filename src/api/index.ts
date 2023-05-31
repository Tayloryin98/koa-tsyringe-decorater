import { Options } from "../model/config.js";
import Koa from 'koa'
import { koaBody } from 'koa-body'
import { infoLog } from "../log4js.js";
import router from "./router.js";
import { MongoClient } from "mongodb";
import { container } from "tsyringe";
import { commonMiddleware } from "./middlewares/common.js";

export const db = Symbol('db')

export async function apiServer(options: Options) {
    const { port, mongouri, dbName } = options
    const client = new MongoClient(mongouri, { maxPoolSize: 5 });
    const database = (await client.connect()).db(dbName)
    container.register(db, { useValue: database })
    const app = new Koa()
    app.use(koaBody({ jsonLimit: '20mb' }))
    app.use(commonMiddleware)
    app.use(router.routes())

    app.listen(port, () => {
        infoLog.info(`api服务已经启动,端口号:${port}`)
    })
}