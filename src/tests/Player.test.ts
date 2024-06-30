import Player from '../Player';

describe('Player Class', () => {
  it('should create a player with correct attributes', () => {
    const player = new Player(1, 'Hero', 100, 50, 30);
    expect(player.id).toBe(1);
    expect(player.name).toBe('Hero');
    expect(player.health).toBe(100);
    expect(player.strength).toBe(50);
    expect(player.attack).toBe(30);
  });
});
