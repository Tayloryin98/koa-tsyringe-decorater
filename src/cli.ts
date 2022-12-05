import { Command } from "commander";
import path from "path";
import { serve } from ".";
import { Options } from "./model/cli-model";



async function loadConfig<T>(filepath: string) {
    const fullpath = path.isAbsolute(filepath)
        ? filepath
        : path.join(process.cwd(), filepath);
    const ret = (await import(fullpath)) as T;
    return ret;
}

function run() {
    const program = new Command().option('-f, --file <file>');

    program.action(async () => {
        try {
            let { file } = program.opts()
            file = file || './etc/config.js'
            const config = await loadConfig<Options>(file)
            await serve(config)
        } catch(error){
            console.log(error)
            process.exit(1)
        } finally{}
    })

    program.parse(process.argv)

}

run()