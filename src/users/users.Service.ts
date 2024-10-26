import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIUsers, TSUsers, users} from "../drizzle/schema"


export const UsersService = async (limit?:number):Promise<TSUsers []| null> =>{
    if(limit){
        return await db.query.users.findMany({
            limit:limit
        })
    }
    return await db.query.users.findMany();
}

export const getUsersService = async (id:number):Promise<TIUsers| undefined> =>{
    return await db.query.users.findFirst({
        where:
            eq(users.id, id)
       })
}

export const cretaeUsersService = async(Users:TIUsers)=>{
    await db.insert(users).values(Users)
    return "User created successfully"
}
export const updateUsersService =async (id:number, Users:TIUsers) =>{
    await db.update(users).set(Users).where(eq(users.id, id))
    return "User updated successfully" 
}

export const deleteUsersService = async (id:number) =>{
    await db.delete(users).where(eq(users.id, id))
    return "User deleted successfully"
}