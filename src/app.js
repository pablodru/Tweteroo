import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users =   [];

const allTweets =  [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if((username.length===0 && typeof username !== 'string') && (avatar.length===0 && typeof avatar !== 'string')){
        return res.status(400).send({message:"Todos os campos são obrigatórios!"})
    }

    const body = { username, avatar };
    users.push(body);
    res.status(201).send({message: 'OK'});
});

app.post('/tweets', (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;

    if((user.length===0 && typeof user !== 'string') && (tweet.length===0 && typeof tweet !== 'string')){
        return res.status(400).send({message:"Todos os campos são obrigatórios!"})
    }

    if( !users.find(u => u.username === user) ){
        return res.status(401).send({message: "Usuário não cadastrado!"});
    }

    const body = { user, tweet };
    allTweets.push(body);
    res.status(201).send({message: "OK"});
});

app.get('/tweets', (req, res) => {
    
    const arrayTweets = []

    allTweets.forEach(tweet => {
        let avatar = '';
        users.find(user => {
            if(user.username === tweet.username){
                avatar = user.avatar;
            }
        });
        console.log(tweet);
        const body = {username: tweet.username, avatar, tweet: tweet.tweet};
        arrayTweets.push(body);
    })

    res.status(201).send(arrayTweets.slice(-10));
})

app.get('tweets/:username', (req,res) => {
    const { username } = req.params;
    const avatar = '';

    const personTweets = allTweets.filter(tweet => {
        if(tweet.username === username) return true;
    });

    if(personTweets.length===0) {
        return res.status(200).send([])
    }

    users.forEach(user => {
        if(user.username === username) avatar = user.avatar;
    })

    const response = personTweets.map(element => {
        return {username, avatar, tweets:personTweets.tweet};
    })

    res.status(200).send(response);
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));