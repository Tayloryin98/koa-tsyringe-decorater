import Joi from 'joi'
import { genValidateParams } from '../middlewares/validateParams.js'

/**
 * 单个路由添加数据校验中间件
 * @param scheme 
 * @returns 
 */
export function validate(scheme:Joi.Schema){
    return function(target:any, key:string, descriptor:PropertyDescriptor){
        const method = Reflect.getMetadata('method', target, key)
        const validateParamsMiddleware = genValidateParams(method,scheme)
        const middlewares = Reflect.getMetadata('middlewares', target, key) || []
        middlewares.push(validateParamsMiddleware)
        Reflect.defineMetadata('middlewares', middlewares, target, key)
    }
}