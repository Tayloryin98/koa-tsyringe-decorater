import { Db, Document } from "mongodb";

export class BaseDao {
    constructor(protected db: Db) { }

    getCollection<T extends Document>(collectionName: string) {
        return this.db.collection<T>(collectionName)
    }

}