import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";
export default class UsersController {
  
  
  
  public async get(ctx: HttpContextContract) {
    const users = await Database.from("users").orderBy("id", "asc");
    return users;
  }
  
  
  public async create(ctx: HttpContextContract) {
    const user = new User();
    const u_name = ctx.request.input("username");
    const users = await Database.from("users")
    console.log(users)
    if (u_name == '') {
      return {
        status: "error",
        message: "username require",
      };
    }
    const u_find = users.find(e => e.username == u_name)
    console.log(u_find)
      if (u_find == undefined ){
        // console.log(users[i].username)
        user.username = ctx.request.input("username");
        user.email = ctx.request.input("email");
          user.fname = ctx.request.input("fname");
          user.lname = ctx.request.input("lname");
          user.avatar = ctx.request.input("avatar");
          await user.save();
          // console.log(user.$isPersisted);
          return {
            status: "ok",
            message: "created",
          };
        } 
        else{
          // console.log("Error");
          return {
            status: "error",
            message: "this username has already exits",
          };
        }
    
  }






  public async delete(ctx: HttpContextContract) {
    const id = ctx.request.input("id");
    const user = await User.findOrFail(id);
    await user.delete();
    return {
      status: "ok",
      message: "Deleted",
    };
  }
  public async update(ctx: HttpContextContract) {
    const id = ctx.request.input("id");
    const user = await User.findOrFail(id);
    user.email = ctx.request.input("email");
    user.username = ctx.request.input("username");
    user.fname = ctx.request.input("fname");
    user.lname = ctx.request.input("lname");
    user.avatar = ctx.request.input("avatar");

    await user.save();
    return {
      status: "ok",
      message: "Updated",
    };
  }
}
