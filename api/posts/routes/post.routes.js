import { getPosts } from '../controllers/post.controller';

export default function (app) {
    app.get("/posts",getPosts)
}