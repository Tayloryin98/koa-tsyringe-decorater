import { describe } from "mocha"
import { apiServer } from "../api"

describe('单元测试', () => {
    it('example', async () => {
        await apiServer({
            port: 23519,
            mongouri: 'mongodb://localhost:17017',
            dbName: 'test'
        })
    })
})