import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users =   [{
                    username: "bobesponja",
                    avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"
                }];

const allTweets =  [{
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
    const { username, tweet } = req.body;

    if( !users.find(u => u.username === username) ){
        return res.status(401).send({message: "Usuário não cadastrado!"});
    }

    const body = { username, tweet };
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

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));