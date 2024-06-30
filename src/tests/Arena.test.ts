import Arena from '../Arena';

describe('Arena Class', () => {
  let arena: Arena;

  beforeEach(() => {
    arena = new Arena();
  });

  it('should add a player correctly', () => {
    const playerId = arena.addPlayer('Warrior', 100, 50, 30);
    expect(playerId).toBe(0);
    expect(arena.getPlayerCount()).toBe(1);
  });

  it('should not add a player with invalid attributes', () => {
    expect(arena.addPlayer('Warrior', -100, 50, 30)).toBe(-1);
    expect(arena.addPlayer('Warrior', 100, -50, 30)).toBe(-1);
    expect(arena.addPlayer('Warrior', 100, 50, -30)).toBe(-1);
  });

  it('should delete a player correctly', () => {
    const playerId = arena.addPlayer('Warrior', 100, 50, 30);
    arena.deletePlayer(playerId);
    expect(arena.getPlayerCount()).toBe(0);
  });

  it('should display players correctly', () => {
    arena.addPlayer('Warrior', 100, 50, 30);
    arena.addPlayer('Mage', 80, 40, 50);
    const consoleSpy = jest.spyOn(console, 'log');
    arena.displayPlayers();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should handle battles correctly', () => {
    const player1Id = arena.addPlayer('Warrior', 100, 50, 30);
    const player2Id = arena.addPlayer('Mage', 80, 40, 50);
    const result = arena.battle(player1Id, player2Id);
    expect(result).toHaveProperty('winner');
    expect(result).toHaveProperty('loser');
    expect(result).toHaveProperty('battleLogs');
  });

  it('should not allow a player to battle themselves', () => {
    const playerId = arena.addPlayer('Warrior', 100, 50, 30);
    const result = arena.battle(playerId, playerId);
    expect(result).toEqual({});
  });

  it('should not allow a battle if a player does not exist', () => {
    const playerId = arena.addPlayer('Warrior', 100, 50, 30);
    const result = arena.battle(playerId, 999);
    expect(result).toEqual({});
  });
});
