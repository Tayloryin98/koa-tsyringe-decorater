import { Context } from "koa";
import { inject, injectable } from "tsyringe";
import { Controller } from "../../model/config.js";
import { controller } from "../decorator/controller.js";
import { Post } from "../decorator/method.js";
import { UserService } from "../service/userService.js";


@controller('/user')
@injectable()
export default class UserController implements Controller {
    private userService: UserService;
    constructor(
        @inject(UserService)
        userService: UserService
    ) {
        this.userService = userService
    }



    @Post('/id')
    async getUserById(ctx: Context) {
        const { id } = ctx.request.body
        const ret = await this.userService.getUserById(id)
        ctx.body = {
            ret
        }

    }

}