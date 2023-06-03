import Joi from 'joi'
import { genValidateParams } from '../middlewares/validateParams.js'
import { Route } from '../../model/router.js'

/**
 * 单个路由添加数据校验中间件
 * @param scheme 
 * @returns 
 */
export function validate(scheme:Joi.Schema){
    return function(target:any, key:string, descriptor:PropertyDescriptor){
        const routes = Reflect.getMetadata('routes', target, key) as Route[]
        const validateParamsMiddleware = genValidateParams(routes[0].method,scheme)
        const middlewares = Reflect.getMetadata('middlewares', target, key) || []
        middlewares.push(validateParamsMiddleware)
        Reflect.defineMetadata('middlewares', middlewares, target, key)
    }
}