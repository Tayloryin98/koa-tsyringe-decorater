export function controller(path: string = ''): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('basePath', path, target);
    }
}
