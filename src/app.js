import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users =    [{
	                username: 'bobesponja', 
	                avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png" 
                }];

const tweets =  [{
	                username: "bobesponja",
                    tweet: "Eu amo hambúrguer de siri!"
                }];




const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));