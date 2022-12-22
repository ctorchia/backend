import { Context, helpers } from '../deps.ts'
import type { User } from '../types/user.ts'
import * as db from '../db/index.ts'

export const findUser = async (ctx: Context) => {
    const { userid } = helpers.getQuery(ctx, { mergeParams: true })
    try {
        const user: User = await db.findUser(userid)
        ctx.response.body = user
    } catch (err) {
        ctx.response.status = 500
        ctx.response.body = { msg: err.message }
    }
}

export const createUser = async (ctx: Context) => {
    try {
        const { name, birthDate } = await ctx.request.body().value
        const createdUser: User = await db.createUser(name, birthDate)
        ctx.response.body = createdUser
    } catch (err) {
        ctx.response.status = 500
        ctx.response.body = { msg: err.message }
    }
}

export const updateUser = async (ctx: Context) => {
    ctx.response.body = { msg: 'user Updated' }
}

export const deleteUser = async (ctx: Context) => {
    ctx.response.body = { msg: 'User Deleted!!' }
}