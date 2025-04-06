class PostList {
    constructor() {
        this.posts = [];
    }

    createPost(post) {
        this.posts.push(post);
    }

    getPostById(id) {
        const post = this.posts.find(post => post.id === id);
        if (!post) {
            throw new Error('Post não encontrado');
        }
        return post;
    }

    updatePost(id, updateData) {
        const post = this.getPostById(id);
        Object.assign(post, updateData);
        return post;
    }

    deletePost(id) {
        this.posts = this.posts.filter(post => post.id !== id);
    }

    getAllPosts() {
        return [...this.posts];
    }
}

module.exports = PostList;
