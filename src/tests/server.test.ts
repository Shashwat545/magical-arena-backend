// @ts-nocheck
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import Arena from '../Arena';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));

const arena = new Arena();

app.post('/addPlayer', (req, res) => {
    const { name, health, strength, attack } = req.body;
    const playerId = arena.addPlayer(name, health, strength, attack);
    if (playerId === -1) {
        res.status(400).send({ error: 'Invalid player attributes' });
    } else {
        res.send({ playerId });
    }
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
    if (Object.keys(result).length === 0) {
        res.status(400).send({ error: 'Invalid player ids' });
    } else {
        res.send(result);
    }
});

describe('Server API', () => {
    it('should add a player', async () => {
        const response = await request(app)
            .post('/addPlayer')
            .send({ name: 'Warrior', health: 100, strength: 50, attack: 30 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('playerId');
    });

    it('should not add a player with invalid attributes', async () => {
        const response = await request(app)
            .post('/addPlayer')
            .send({ name: 'Warrior', health: -100, strength: 50, attack: 30 });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid player attributes');
    });

    it('should delete a player', async () => {
        const addResponse = await request(app)
            .post('/addPlayer')
            .send({ name: 'Warrior', health: 100, strength: 50, attack: 30 });
        const playerId = addResponse.body.playerId;

        const deleteResponse = await request(app)
            .delete(`/deletePlayer/${playerId}`);
        expect(deleteResponse.status).toBe(200);
    });

    it('should display players', async () => {
        await request(app)
            .post('/addPlayer')
            .send({ name: 'Warrior', health: 100, strength: 50, attack: 30 });
        const response = await request(app)
            .get('/displayPlayers');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should handle battles correctly', async () => {
        const addResponse1 = await request(app)
            .post('/addPlayer')
            .send({ name: 'Warrior', health: 100, strength: 50, attack: 30 });
        const addResponse2 = await request(app)
            .post('/addPlayer')
            .send({ name: 'Mage', health: 80, strength: 40, attack: 50 });

        const response = await request(app)
            .post('/battle')
            .send({ id_first: addResponse1.body.playerId, id_second: addResponse2.body.playerId });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('winner');
        expect(response.body).toHaveProperty('loser');
        expect(response.body).toHaveProperty('battleLogs');
    });

    it('should not allow a player to battle themselves', async () => {
        const addResponse = await request(app)
            .post('/addPlayer')
            .send({ name: 'Warrior', health: 100, strength: 50, attack: 30 });

        const response = await request(app)
            .post('/battle')
            .send({ id_first: addResponse.body.playerId, id_second: addResponse.body.playerId });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid player ids');
    });

    it('should not allow a battle if a player does not exist', async () => {
        const addResponse = await request(app)
            .post('/addPlayer')
            .send({ name: 'Warrior', health: 100, strength: 50, attack: 30 });

        const response = await request(app)
            .post('/battle')
            .send({ id_first: addResponse.body.playerId, id_second: 999 });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid player ids');
    });
});
