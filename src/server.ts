import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import Arena from './Arena';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const arena = new Arena();

app.post('/addPlayer', (req, res) => {
    const { name, health, strength, attack } = req.body;
    const playerId = arena.addPlayer(name, health, strength, attack);
    res.send({ playerId });
});

app.delete('/deletePlayer/:id', (req, res) => {
    const id = parseInt(req.params.id);
    arena.deletePlayer(id);
    res.sendStatus(200);
});

app.get('/displayPlayers', (req, res) => {
    const players = [];
    for (const [id, player] of arena.Players) {
        players.push({ id, name: player.name, health: player.health, strength: player.strength, attack: player.attack });
    }
    res.send(players);
});

app.post('/battle', (req, res) => {
    const { id_first, id_second } = req.body;
    const result = arena.battle(id_first, id_second);
    res.send(result);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
