/**
 * API configuration for the application
 * This centralizes all API URLs to make environment switching easier
 */

// Base URL for WordPress API
export const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost/mylocalwp';

// Derived API endpoints
export const WP_REST_API = `${WORDPRESS_API_URL}/wp-json/wp/v2`;
export const WP_CUSTOM_API = `${WORDPRESS_API_URL}/wp-json/my_namespace/v1`;

// Helper function to build WordPress REST API URLs
export function wpApiUrl(endpoint: string): string {
  return `${WP_REST_API}/${endpoint}`;
}

// Helper function to build custom API URLs
export function customApiUrl(endpoint: string): string {
  return `${WP_CUSTOM_API}/${endpoint}`;
}