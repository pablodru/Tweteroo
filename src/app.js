import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users =    [];

const tweets =  [{
	                username: "bobesponja",
                    tweet: "Eu amo hambúrguer de siri!"
                }];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    const body = { username, avatar };
    users.push(body);
    res.status(200).send({message: 'OK'});
});

app.post('/tweets', (req, res) => {
    const { username, tweets } = req.body;

    if( !users.find(u => u.username === username) ){
        return res.status(401).send({message: "Usuário não cadastrado!"});
    }

    const body = { username, tweets };
    tweets.push(body);
    res.status(201).send({message: "OK"});
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));