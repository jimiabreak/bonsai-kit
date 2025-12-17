/**
 * Shopify Integration Test Script
 *
 * Run this script to verify Shopify API connection and subscription products
 * Usage: npx tsx scripts/test-shopify.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import {
  verifyCredentials,
  checkProductsExist,
  getHealthStatus,
  runAllTests,
} from '../lib/shopify-test';

async function main() {
  console.log('🔍 Testing Shopify Integration...\n');

  // Show env vars (masked)
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  console.log('Environment Variables:');
  console.log(`  NEXT_PUBLIC_SHOPIFY_DOMAIN: ${domain ? '✅ Set' : '❌ Missing'}`);
  console.log(`  NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN: ${token ? `✅ Set (${token.substring(0, 8)}...)` : '❌ Missing'}`);
  console.log('');

  // Run all tests
  const results = await runAllTests();

  console.log('═══════════════════════════════════════════════════');
  console.log('📊 CREDENTIALS TEST');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Status: ${results.credentialsTest.success ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Message: ${results.credentialsTest.message}`);
  if (results.credentialsTest.details) {
    console.log('Details:', JSON.stringify(results.credentialsTest.details, null, 2));
  }
  if (results.credentialsTest.error) {
    console.log(`Error: ${results.credentialsTest.error}`);
  }
  console.log('');

  console.log('═══════════════════════════════════════════════════');
  console.log('📦 PRODUCTS TEST');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Status: ${results.productsTest.success ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Message: ${results.productsTest.message}`);
  if (results.productsTest.details) {
    console.log('Details:', JSON.stringify(results.productsTest.details, null, 2));
  }
  if (results.productsTest.error) {
    console.log(`Error: ${results.productsTest.error}`);
  }
  console.log('');

  console.log('═══════════════════════════════════════════════════');
  console.log('🏥 OVERALL HEALTH STATUS');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Status: ${results.overall.success ? '✅ HEALTHY' : '⚠️  NEEDS ATTENTION'}`);
  console.log(`Message: ${results.overall.message}`);
  console.log('');

  // Get detailed health status
  const health = await getHealthStatus();
  console.log('═══════════════════════════════════════════════════');
  console.log('📈 DETAILED HEALTH CHECK');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Overall Status: ${health.status.toUpperCase()}`);
  console.log(`Timestamp: ${health.timestamp}`);
  console.log(`Credentials Check: ${health.checks.credentials ? '✅' : '❌'}`);
  console.log(`Products Check: ${health.checks.products ? '✅' : '❌'}`);
  console.log('');

  // Exit with appropriate code
  process.exit(results.overall.success ? 0 : 1);
}

main().catch((error) => {
  console.error('❌ Test script failed:', error);
  process.exit(1);
});
