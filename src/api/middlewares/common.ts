import Koa from 'koa'

/**
 * 添加公共中间件
 * @param ctx 
 * @param next 
 */
export async function commonMiddleware(ctx: Koa.Context, next: any) {
    //todo something
    await next()
}