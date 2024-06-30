// @ts-nocheck
import rollDice from "./utils/DieRoll";
import Player from "./Player";

class Arena {
    currentId: number;
    Players: Map<number, Player>;
    
    constructor() {
        this.currentId = 0;
        this.Players = new Map();
        console.log('Welcome to the Magical Arena!\n');
    }

    isPresent(id: number): boolean {
        return this.Players.has(id);
    }

    getPlayerCount(): number {
        return this.Players.size;
    }

    addPlayer(name: string, health: number, strength: number, attack: number): number {
        if (health <= 0) {
            console.log("Health should be a positive integer.");
            return -1;
        }
        if (strength <= 0) {
            console.log("Strength should be a positive integer.");
            return -1;
        }
        if (attack <= 0) {
            console.log("Attack should be a positive integer.");
            return -1;
        }

        const id = this.currentId;
        const newPlayer = new Player(id, name, health, strength, attack);
        this.Players.set(id, newPlayer);
        this.currentId += 1;

        return id;
    }

    deletePlayer(id: number): void {
        if (this.Players.has(id)) {
            const player = this.Players.get(id);
            console.log(`${player?.name} has been defeated and removed...\n`);
            this.Players.delete(id);
        } else {
            console.log(`No player with id = ${id} exists.\n`);
        }
    }

    displayPlayers(): void {
        console.log('|\tId\t|\tName\t|\tHealth\t|\tStrength\t|\tAttack\t|');
        for (const [id, player] of this.Players) {
            const { name, health, strength, attack } = player;
            console.log(`|\t${id}\t|\t${name}\t|\t${health}\t|\t${strength}\t|\t${attack}\t|`);
        }
        console.log('\n');
    }

    battle(id_first: number, id_second: number): any {
        if (id_first === id_second) {
            console.log('Ids cannot be the same for both players.\n');
            return {};
        } else if (!this.Players.has(id_first)) {
            console.log(`No player with id = ${id_first} exists.\n`);
            return {};
        } else if (!this.Players.has(id_second)) {
            console.log(`No player with id = ${id_second} exists.\n`);
            return {};
        } else {
            let battleLogs= [];
            let attacker = this.Players.get(id_first);
            let defender = this.Players.get(id_second);
            console.log(`\n____________${attacker?.name} vs ${defender?.name}____________\n`);

            if (defender.health < attacker.health) {
                [attacker, defender] = [defender, attacker];
            }
            
            while (defender.health > 0) {
                const attacking_power = attacker.attack * rollDice();
                const defending_power = defender.strength * rollDice();

                console.log(`${attacker?.name} hits ${defender?.name} with power = ${attacking_power}\n`);
                console.log(`${defender?.name} defends with power = ${defending_power}\n`);
                battleLogs.push(`${attacker?.name} hits ${defender?.name} with power = ${attacking_power}`);
                battleLogs.push(`${defender?.name} defends with power = ${defending_power}`);

                if (attacking_power > defending_power) {
                    defender.health -= (attacking_power - defending_power);
                    defender.health = Math.max(0, defender.health);
                }

                console.log(`${defender?.name}'s health: ${defender.health}\n`);
                battleLogs.push(`${defender?.name}'s health: ${defender.health}`);
                
                if (defender.health > 0) {
                    [attacker, defender] = [defender, attacker];
                }
            }
            
            console.log(`${attacker?.name} has won!\n`);
            battleLogs.push(`${attacker?.name} has won!`);
            
            const res = { winner: attacker.id, loser: defender.id, battleLogs };
            this.deletePlayer(defender.id);

            return res;
        }
    }
}

export default Arena;