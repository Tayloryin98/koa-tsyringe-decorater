import { inject, injectable, singleton } from "tsyringe";
import { UserDao } from "../dao/userDao.js";


@injectable()
export class UserService {
    private userDao: UserDao

    constructor(
        @inject(UserDao)
        userDao: UserDao
    ) {
        this.userDao = userDao
    }

    async getUserById(id: string) {
        const ret = await this.userDao.getUserById(id)
        return ret
    }
}