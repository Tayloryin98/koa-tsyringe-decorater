import { Context } from 'koa'
import Joi from 'joi'

/**
 * 
 * 参数校验中间件
 * @param method 
 * @param scheme 
 * @returns 
 */
export function genValidateParams(method: string, scheme: Joi.Schema) {
    return async (ctx: Context, next: () => Promise<any>) => {
        let data: any
        if (method === 'get' || method ==='delete') {
            data = ctx.request.query
        } else {
            data = ctx.request.body
        }
        const { error } = scheme.validate(data)
        if (error) {
            ctx.throw(400, error)
        }
        await next()
    }
}