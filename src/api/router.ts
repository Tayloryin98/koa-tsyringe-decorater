import KoaRouter from 'koa-router'
import { container } from 'tsyringe';
import fs from 'fs'
import { errorLog } from '../log4js.js';
import path from 'path'
import { Route } from '../model/router.js';
import { Context } from 'koa';
import { fileURLToPath } from 'url';
import UserController from './controller/userController.js';
import { Controller } from "../model/config.js";

class ScanRouter extends KoaRouter {
    constructor(opts?: KoaRouter.IRouterOptions) {
        super(opts);
    }

    async scan(scanDir: string | string[]) {
        if (typeof scanDir === 'string') {
            await scanController(scanDir, this)
        } else if (scanDir instanceof Array) {
            scanDir.forEach(async (dir: string) => {
                await scanController(dir, this)
            })
        }
    }
}

async function scanController(dirPath: string, router: KoaRouter): Promise<void> {
    if (!fs.existsSync(dirPath)) {
        errorLog.error(`Controller目录不存在!${dirPath}`)
        return;
    }
    const fileNames: string[] = fs.readdirSync(dirPath);
    for (const name of fileNames) {
        const curPath: string = path.join(dirPath, name);
        if (fs.statSync(curPath).isDirectory()) {
            await scanController(curPath, router);
            continue
        }
        if (!(/(.js)$/.test(name))) {
            continue;
        }
        try {
            const scannedModule = await import(curPath); 
            const controller = (scannedModule.default || scannedModule)
            //获取实例
            const inst = container.resolve(controller) as any;
            const propKeys = Object.getOwnPropertyNames(controller.prototype).
                filter(key => key !== 'constructor')
            const isController: boolean = Reflect.hasMetadata('basePath', controller)
            if (isController) {
                const basePath: string = Reflect.getMetadata('basePath', controller)
                propKeys.forEach(key => {
                    const routes: Route[] = Reflect.getMetadata('routes', controller.prototype, key)
                    const middlewares = Reflect.getMetadata('middlewares', controller.prototype, key) || []
                    let curPath: string
                    (routes || []).forEach((route: Route) => {
                        curPath = path.posix.join('/', basePath, route.path)
                        //绑定实例
                        const handler = (inst[route.functionName]).bind(inst);
                        (router as any)[route.method](curPath, ...middlewares, handler)
                    })
                })
            }

        } catch (error) {
            errorLog.error(`初始化Controller失败!${curPath}`, error)
        }
    }
}

const router = new ScanRouter()
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
router.scan([path.resolve(__dirname, './controller')])
export default router