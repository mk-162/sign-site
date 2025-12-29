/**
 * Unit tests for canonical URL utility
 * Run with: npx tsx lib/seo/__tests__/canonical.test.ts
 */

import assert from 'node:assert';
import { describe, it } from 'node:test';
import { buildCanonical } from '../canonical';

describe('buildCanonical', () => {
  it('should return site URL for root path', () => {
    assert.strictEqual(buildCanonical('/'), 'https://safetysignhub.co.uk');
  });

  it('should strip query parameters', () => {
    assert.strictEqual(
      buildCanonical('/category/fire-safety?page=2'),
      'https://safetysignhub.co.uk/category/fire-safety'
    );
  });

  it('should strip multiple query parameters', () => {
    assert.strictEqual(
      buildCanonical('/products/sign?ref=abc&utm_source=google'),
      'https://safetysignhub.co.uk/products/sign'
    );
  });

  it('should remove trailing slash', () => {
    assert.strictEqual(
      buildCanonical('/products/slug/'),
      'https://safetysignhub.co.uk/products/slug'
    );
  });

  it('should handle combined query params and trailing slash', () => {
    assert.strictEqual(
      buildCanonical('/products/slug/?ref=abc'),
      'https://safetysignhub.co.uk/products/slug'
    );
  });

  it('should strip hash fragments', () => {
    assert.strictEqual(
      buildCanonical('/products/slug#reviews'),
      'https://safetysignhub.co.uk/products/slug'
    );
  });

  it('should handle hash and query params together', () => {
    assert.strictEqual(
      buildCanonical('/products/slug?ref=abc#reviews'),
      'https://safetysignhub.co.uk/products/slug'
    );
  });

  it('should add leading slash if missing', () => {
    assert.strictEqual(
      buildCanonical('products/slug'),
      'https://safetysignhub.co.uk/products/slug'
    );
  });

  it('should return site URL for empty pathname', () => {
    assert.strictEqual(buildCanonical(''), 'https://safetysignhub.co.uk');
  });

  it('should preserve nested paths', () => {
    assert.strictEqual(
      buildCanonical('/fire-safety/exit-signs/illuminated'),
      'https://safetysignhub.co.uk/fire-safety/exit-signs/illuminated'
    );
  });

  it('should handle category with sort and filter params', () => {
    assert.strictEqual(
      buildCanonical('/category/safety-signs?sort=price-asc&brand=seton'),
      'https://safetysignhub.co.uk/category/safety-signs'
    );
  });
});
