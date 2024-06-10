import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Post } from "src/users/schemas/posts.schema";
import { CreatePostDto } from "./dto/posts.dto";
import { User } from "src/users/schemas/users.schema";

@Injectable()
export class PostsService
{
    constructor( @InjectModel(Post.name) private postModel: mongoose.Model<Post>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>) {}

    getPosts()
    {

    }

    async createPost({userId, ...createPostDto}: CreatePostDto)
    {
        const findUser = await this.userModel.findById(userId);
        if (!findUser) throw new HttpException('User Not Found', 404);
        const newPost = new this.postModel({ ...createPostDto, user: userId });
        const savedPost = await newPost.save();
        await findUser.updateOne({
        $push: {
            posts: savedPost._id,
        },
        });
        return savedPost;
    }
}