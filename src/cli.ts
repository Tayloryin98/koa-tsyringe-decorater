import { Command } from "commander";
import 'reflect-metadata'
import { errorLog } from "./log4js.js";
import { apiServer } from "./api/index.js";
import { loadConfig } from "./utils/config.js";



function run() {
    const program = new Command().option('-f, --file <file>');

    program.command('api').action(async () => {
        try {
            let { file } = program.opts()
            file = file || './etc/config.js'
            const { options } = await loadConfig(file)
            await apiServer(options)
        } catch (error) {
            errorLog.error(error)
            process.exit(1)
        } finally { }
    })

    program.parse(process.argv)

}

run()