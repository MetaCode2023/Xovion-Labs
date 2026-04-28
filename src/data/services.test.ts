import { describe, it, expect } from 'vitest';
import { services } from './services';

const VALID_COLORS = ['blue', 'cyan', 'green', 'purple'] as const;

describe('services data', () => {
  it('has at least one service', () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it('every service has required string fields', () => {
    for (const s of services) {
      expect(typeof s.id).toBe('string');
      expect(s.id.length).toBeGreaterThan(0);
      expect(typeof s.title).toBe('string');
      expect(s.title.length).toBeGreaterThan(0);
      expect(typeof s.shortTitle).toBe('string');
      expect(typeof s.tagline).toBe('string');
      expect(typeof s.description).toBe('string');
      expect(typeof s.icon).toBe('string');
    }
  });

  it('every service has a valid color', () => {
    for (const s of services) {
      expect(VALID_COLORS).toContain(s.color);
    }
  });

  it('every service has non-empty feature, proofPoint, and idealFor arrays', () => {
    for (const s of services) {
      expect(Array.isArray(s.features)).toBe(true);
      expect(s.features.length).toBeGreaterThan(0);
      expect(Array.isArray(s.proofPoints)).toBe(true);
      expect(s.proofPoints.length).toBeGreaterThan(0);
      expect(Array.isArray(s.idealFor)).toBe(true);
      expect(s.idealFor.length).toBeGreaterThan(0);
    }
  });

  it('service IDs are unique', () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes the expected service IDs', () => {
    const ids = services.map((s) => s.id);
    expect(ids).toContain('website-builds');
    expect(ids).toContain('crm-automation');
    expect(ids).toContain('ai-integration');
    expect(ids).toContain('ai-strategy');
    expect(ids).toContain('ai-receptionist');
  });
});
