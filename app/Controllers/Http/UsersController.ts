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
    
    user.username = ctx.request.input("username");
    user.email = ctx.request.input("email");
    user.fname = ctx.request.input("fname");
    user.lname = ctx.request.input("lname");
    user.avatar = ctx.request.input("avatar");
    
    const users = await Database.from("users");
    if (user.username == "") {
      return {
        status: "error",
        message: "username require",
      };
    }
    const u_find = users.find((e) => e.username == user.username);
    console.log(u_find);
    if (u_find == undefined) {
      await user.save();
      return {
        status: "ok",
        message: "created",
      };
    } else {
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
    const users = await Database.from("users");
    const id = ctx.request.input("id");
    const user = await User.findOrFail(id);

    user.email = ctx.request.input("email");
    user.fname = ctx.request.input("fname");
    user.lname = ctx.request.input("lname");
    user.avatar = ctx.request.input("avatar");
    user.username = ctx.request.input("username");
    
    if (user.username == "") {
      return {
        status: "error",
        message: "username require",
      };
    }
    const u_find = users.find((e) => e.username == user.username);
    console.log(u_find);
    if (u_find == undefined) {
      // console.log(users[i].username)
      await user.save();
      return {
        status: "ok",
        message: "Updated",
      };
    } else {
      // console.log("Error");
      return {
        status: "error",
        message: "this username has already exits",
      };
    }
  }
}
