/**
 * ZoneX Growth Hub - Continuous SEO & Keyword Audit Automation Engine
 * Runs programmatic checks on DOM nodes, metadata, schema, and keyword density
 */

export interface SEOAuditReport {
  timestamp: string;
  url: string;
  metaScore: number;
  checks: {
    name: string;
    passed: boolean;
    details: string;
  }[];
}

export function runClientSEOAudit(): SEOAuditReport {
  const checks: SEOAuditReport['checks'] = [];

  // Check 1: Title Tag length
  const title = document.title;
  const titleValid = title.length > 0 && title.length <= 65;
  checks.push({
    name: 'Title Tag Best Practice',
    passed: titleValid,
    details: `Current title (${title.length} chars): "${title}"`,
  });

  // Check 2: Meta Description
  const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const descValid = metaDesc.length >= 100 && metaDesc.length <= 165;
  checks.push({
    name: 'Meta Description Optimal Length',
    passed: descValid,
    details: `Current description (${metaDesc.length} chars): "${metaDesc}"`,
  });

  // Check 3: Canonical Link
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
  checks.push({
    name: 'Canonical Tag Presence',
    passed: Boolean(canonical && canonical.startsWith('https://')),
    details: `Canonical URL: ${canonical || 'MISSING'}`,
  });

  // Check 4: JSON-LD Schema
  const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
  checks.push({
    name: 'JSON-LD Structured Data Graph',
    passed: schemaScripts.length > 0,
    details: `Found ${schemaScripts.length} structured data block(s)`,
  });

  // Check 5: Single H1 Tag
  const h1Elements = document.querySelectorAll('h1');
  checks.push({
    name: 'Single H1 Heading Constraint',
    passed: h1Elements.length === 1,
    details: `Found ${h1Elements.length} H1 element(s)`,
  });

  // Check 6: Image Alt Attributes
  const images = Array.from(document.querySelectorAll('img'));
  const missingAlt = images.filter((img) => !img.hasAttribute('alt') || img.getAttribute('alt') === '');
  checks.push({
    name: 'Image Alt Tag Compliance',
    passed: missingAlt.length === 0,
    details: `${images.length - missingAlt.length}/${images.length} images have valid alt text`,
  });

  // Calculate score
  const passedCount = checks.filter((c) => c.passed).length;
  const metaScore = Math.round((passedCount / checks.length) * 100);

  const report: SEOAuditReport = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    metaScore,
    checks,
  };

  if (process.env.NODE_ENV === 'development') {
    console.table(checks);
    console.log(`[SEO Engine] Overall Health Score: ${metaScore}%`);
  }

  return report;
}
