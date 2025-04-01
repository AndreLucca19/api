require("dotenv").config();

const express = require("express");
const cors = require("cors");
const usersRoutes = require("./src/routes/usersRoute");
const postsRoutes = require("./src/routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", usersRoutes)
app.use("/post", postsRoutes)



const PORT = process.env.PORT || 3000;



app.get("/", (req, res) => {
    res.send("SERVIDOR ON 😎");
});


app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
})