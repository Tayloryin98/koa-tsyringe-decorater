import { Db } from "mongodb";
import { inject, injectable } from "tsyringe";
import { db } from "../index.js";
import { BaseDao } from "./dao.js";

@injectable()
export class UserDao extends BaseDao {
    constructor(
        @inject(db)
        db: Db
    ) {
        super(db)
    }

    async getUserById(id: string) {
        const collection = this.getCollection<User>('users')
        const ret = await collection.findOne({ _id: id })
        return ret
    }
}