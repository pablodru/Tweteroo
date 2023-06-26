import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users =   [];

const allTweets =  [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    console.log(Object.keys(req.body))

    console.log('Esse é o user: ', typeof username);
    console.log('Esse é o username: ', avatar);
    if(Object.keys(req.body).length!==2){
        return res.status(400).send({message:"Todos os campos são obrigatórios!"})
    }

    if((username.length===0 || typeof username !== 'string') || (avatar.length===0 || typeof avatar !== 'string')){
        return res.status(400).send({message:"Todos os campos são obrigatórios!"})
    }

    const body = { username, avatar };
    users.push(body);
    res.status(201).send({message: 'OK'});
});

app.post('/tweets', (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;

    if(Object.keys(req.body).length!==1){
        return res.status(400).send({message:"Todos os campos são obrigatórios!"})
    }

    if((user.length===0 || typeof user !== 'string') || (tweet.length===0 || typeof tweet !== 'string')){
        return res.status(400).send({message:"Todos os campos são obrigatórios!"})
    }

    if( !users.find(u => u.username === user) ){
        return res.status(401).send({message: "Usuário não cadastrado!"});
    }

    const body = { username: user, tweet };
    allTweets.push(body);
    res.status(201).send({message: "OK"});
});

app.get('/tweets', (req, res) => {

    const { page } = req.query;

    const arrayTweets = []

    allTweets.forEach(tweet => {
        let avatar = '';
        users.find(user => {
            if(user.username === tweet.username){
                avatar = user.avatar;
            }
        });
        const body = {username: tweet.username, avatar, tweet: tweet.tweet};
        console.log('body: ', body)
        arrayTweets.push(body);
    });

    if( page ){
        if( page < 1) return res.status(400).send({message: "Informe uma página válida!"});
        else {
            const start = arrayTweets.length - ( page * 10);
            const end = arrayTweets.length - ((page - 1) * 10);
            return res.status(201).send(arrayTweets.slice(start, end));
        }
    }

    res.status(201).send(arrayTweets.slice(-10));
})

app.get('/tweets/:username', (req,res) => {
    const { username } = req.params;
    //console.log(username);
    let avatar = '';

    const personTweets = allTweets.filter(tweet => {
        if(tweet.username === username) return true;
    });
    console.log(personTweets)

    if(personTweets.length===0) {
        return res.status(200).send([])
    }

    users.forEach(user => {
        if(user.username === username) avatar = user.avatar;
    })

    const response = personTweets.map(element => {
        return {username, avatar, tweet:element.tweet};
    })

    res.status(200).send(response);
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));