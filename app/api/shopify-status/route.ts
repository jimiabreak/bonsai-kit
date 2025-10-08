import { NextResponse } from 'next/server';
import { getHealthStatus } from '@/lib/shopify-test';

// Store last successful API call
let lastSuccessfulCall: string | null = null;
let lastCheckResult: Record<string, unknown> | null = null;
let lastCheckTime: number = 0;

const CACHE_DURATION = 60000; // 1 minute cache

export async function GET() {
  try {
    const now = Date.now();

    // Return cached result if less than 1 minute old
    if (lastCheckResult && now - lastCheckTime < CACHE_DURATION) {
      return NextResponse.json({
        ...lastCheckResult,
        cached: true,
        cacheAge: Math.round((now - lastCheckTime) / 1000),
      });
    }

    // Run health checks
    const healthStatus = await getHealthStatus();

    // Update last successful call timestamp
    if (healthStatus.status === 'healthy') {
      lastSuccessfulCall = healthStatus.timestamp;
    }

    const response = {
      status: healthStatus.status,
      timestamp: healthStatus.timestamp,
      checks: healthStatus.checks,
      lastSuccessfulCall,
      environment: {
        domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'not_configured',
        hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
      },
      cached: false,
    };

    // Cache the result
    lastCheckResult = response;
    lastCheckTime = now;

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        status: 'down',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
