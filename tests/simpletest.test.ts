import { describe, expect, it } from 'vitest';

describe('Simple Test', () => {
    it('should add numbers correctly', () => {
        expect(1 + 1).toBe(2);
    });

    it('should check string equality', () => {
        expect('hello').toBe('hello');
    });
});