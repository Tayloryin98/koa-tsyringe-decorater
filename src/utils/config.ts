import path from "path";

export async function loadConfig(filepath: string) {
    const fullpath = path.isAbsolute(filepath)
        ? filepath
        : path.join(process.cwd(), filepath);
    const ret = (await import(fullpath));
    return ret;
}