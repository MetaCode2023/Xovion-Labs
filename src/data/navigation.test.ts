import { describe, it, expect } from 'vitest';
import { navLinks, siteConfig } from './navigation';

describe('navLinks', () => {
  it('has entries', () => {
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('every link has a non-empty label and href starting with /', () => {
    for (const link of navLinks) {
      expect(typeof link.label).toBe('string');
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.href.startsWith('/')).toBe(true);
    }
  });

  it('hrefs are unique', () => {
    const hrefs = navLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('includes Home and Contact', () => {
    const labels = navLinks.map((l) => l.label);
    expect(labels).toContain('Home');
    expect(labels).toContain('Contact');
  });
});

describe('siteConfig', () => {
  it('has a valid URL', () => {
    expect(() => new URL(siteConfig.url)).not.toThrow();
  });

  it('name and tagline are non-empty strings', () => {
    expect(siteConfig.name.length).toBeGreaterThan(0);
    expect(siteConfig.tagline.length).toBeGreaterThan(0);
  });

  it('description is at least 20 characters', () => {
    expect(siteConfig.description.length).toBeGreaterThanOrEqual(20);
  });
});
