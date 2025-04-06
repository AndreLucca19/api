const Post = require('../models/Post');
const PostList = require('../models/PostList');

const list = new PostList();


const postExemplo = new Post(1, "Madara", "Uchiha Madara", "https://th.bing.com/th/id/OIP.sS1_yyiRR0dvO4ry2fwNNAHaFj?w=298&h=222&c=10&rs=1&qlt=99&bgcl=fffffe&r=0&o=6&pid=23.1");
list.createPost(postExemplo);

const postExemplo2 = new Post(2, "Obito", "Uchiha Obito", "https://th.bing.com/th/id/OIP.MX_qrmifAzzsW5pvCMkAIAHaEW?w=303&h=180&c=7&r=0&o=5&pid=1.7");
list.createPost(postExemplo2);

const router = {
    createPost: (req, res) => {
        try {
            const { userId, title, description, image } = req.body;

            if (!userId || !title || !description || !image) {
                throw new Error("Preencha todos os campos para criar um Post");
            }

            const post = new Post(userId, title, description, image);
            list.createPost(post);

            return res.status(201).json({ message: "Post criado com sucesso", post });
        } catch (error) {
            res.status(400).json({ message: "Erro ao publicar o Post", error: error.message });
        }
    },

    getPostById: (req, res) => {
        const { id } = req.params;
        try {
            const post = list.getPostById(id);
            res.json(post);
        } catch (error) {
            res.status(404).json({ message: "Post não encontrado", error: error.message });
        }
    },

    updatePost: (req, res) => {
        const { id } = req.params;
        try {
            const updatedPost = list.updatePost(id, req.body);
            res.status(200).json({ message: "Post atualizado com sucesso", updatedPost });
        } catch (error) {
            res.status(404).json({ message: "Erro ao editar o post", error: error.message });
        }
    },

    deletePost: (req, res) => {
        const { id } = req.params;
        try {
            list.deletePost(id);
            res.status(200).json({ message: "Post deletado com sucesso" });
        } catch (error) {
            res.status(404).json({ message: "Erro ao deletar o post", error: error.message });
        }
    },

    getAllPosts: (req, res) => {
        res.status(200).json(list.getAllPosts());
    }
};

module.exports = router;
