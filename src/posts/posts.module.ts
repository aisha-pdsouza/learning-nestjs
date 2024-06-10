import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostsSchema } from 'src/users/schemas/posts.schema';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { User, UserSchema } from 'src/users/schemas/users.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Post.name, schema: PostsSchema },
        { name: User.name, schema: UserSchema }
    ])],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {
    
}
