/**
 * 
 * 给单个类添加公共中间件
 * @param middleware 
 * @param excludes 
 * @param inLast 
 * @returns 
 */
export function unifyUse<T extends string>(middleware: any, excludes: Array<T> = [], inLast = false) {
    return function (target: any) {
        const handlerKeys = Object.getOwnPropertyNames(target.prototype).filter(key => key !== 'constructor')
        handlerKeys.forEach(key => {
            if(!excludes.includes(key as T)){
                const middlewares = Reflect.getMetadata('middlewares', target.prototype, key) || []
                if (inLast) {
                    middlewares.push(middleware)
                } else {
                    middlewares.unshift(middleware)
                }
                Reflect.defineMetadata('middlewares', middlewares, target.prototype, key)
            }
        })
    }
}