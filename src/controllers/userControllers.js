const User = require("../models/User");
const UserList = require("../models/UserList");

const Lista = new UserList();

Lista.addUser(new User("João", "joao@email.com", 30));
Lista.addUser(new User("Maria", "maria@email.com", 25));
Lista.addUser(new User("Carlos", "carlos@email.com", 28));

const userController = {
    getAllUsers: (req, res) => {
        const users = Lista.getAllUsers();
        res.status(200).json(users);
    },

    getUserById: (req, res) => {
        const { id } = req.params;
        try {
            const user = Lista.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: "Usuário não encontrado", error: error.message });
        }
    },

    createUser: (req, res) => {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({ message: "Preencha todos os campos: name, email e age." });
        }

        try {
            const user = new User(name, email, age);
            Lista.addUser(user);
            res.status(201).json({ message: "Usuário criado com sucesso", user });
        } catch (error) {
            res.status(500).json({ message: "Erro interno ao criar usuário", error: error.message });
        }
    },

    updateUser: (req, res) => {
        const { id } = req.params;
        const updateData = req.body;

        try {
            const updatedUser = Lista.updateUser(id, updateData);
            res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser });
        } catch (error) {
            res.status(404).json({ message: "Erro ao atualizar usuário", error: error.message });
        }
    },

    deleteUser: (req, res) => {
        const { id } = req.params;

        try {
            Lista.deleteUser(id);
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch (error) {
            res.status(404).json({ message: "Erro ao deletar usuário", error: error.message });
        }
    }
};

module.exports = userController;
