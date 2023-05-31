/**
 * 给单个路由添加中间件
 * @param middleware 
 * @param position 
 * @returns 
 */
export function use(middleware: any, position: 'last' | number = 'last') {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata('middlewares', target, key) || []
        if (position === 'last') {
            middlewares.push(middleware)
        } else {
            middlewares.splice(position, 0, middleware)
        }
        Reflect.defineMetadata('middlewares', middlewares, target, key)
    }
}