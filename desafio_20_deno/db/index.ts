import type { User, Uuid } from '../types/user.ts'
import { v4 } from '../deps.ts'

const users = [
    {uuid: '1', name: 'Fede',birthDate: Date()}
]



export const findUser = async (uuid: Uuid) => {
    console.log(users)
    return new Promise( (res, rej ) => {
        const user = users.find(user => user.uuid === uuid)
        if (!user) {
            throw new Error('User not found')
        }
        setTimeout(()=>{
            res({
                uuid,
                name: 'Fede',
                birthDate: new Date()
            })
        },1000)
    })
}


export const createUser = async (
    name: string, 
    birthDate: Date
): Promise<User> => {
    return new Promise((res, rej) => {
        const userNew: User = {
            uuid: v4.generate(),
            name,
            birthDate
        } 
        users.push(userNew)
        console.log(users)
        setTimeout(() => {
            res(userNew)
        }, 1000)
    })
}