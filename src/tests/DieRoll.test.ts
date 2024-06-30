import rollDice from '../utils/DieRoll';

describe('rollDice Function', () => {
  it('should return a number between 1 and 6', () => {
    for (let i = 0; i < 100; i++) {
      const result = rollDice();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    }
  });
});
