import { Route } from "../../model/router.js";

export type RouterDecoratorFactory = (path?: string) => MethodDecorator;

export function createRouterDecorator(method: string): RouterDecoratorFactory {
    return (path?: string) => (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const route: Route = {
            functionName:propertyKey as string,
            method,
            path: path || ''
        };
        if (!Reflect.hasMetadata('routes', target, propertyKey)) {
            Reflect.defineMetadata('routes', [], target, propertyKey);
        }
        const routes = Reflect.getMetadata('routes', target, propertyKey);
        routes.push(route);
        Reflect.defineMetadata('routes', routes, target, propertyKey);
    }
}

export const Get: RouterDecoratorFactory = createRouterDecorator('get');
export const Post: RouterDecoratorFactory = createRouterDecorator('post');
export const Put: RouterDecoratorFactory = createRouterDecorator('put');
export const Delete: RouterDecoratorFactory = createRouterDecorator('delete');
export const Patch: RouterDecoratorFactory = createRouterDecorator('patch');