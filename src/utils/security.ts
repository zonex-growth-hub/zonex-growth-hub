/**
 * Strips script tags, HTML markup, and encodes potential XSS entities.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // 1. Strip script tags and their content
  let cleaned = input.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');
  
  // 2. Strip all remaining HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // 3. Entity encoding
  const matchMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  cleaned = cleaned.replace(/[&<>"'/]/g, (char) => matchMap[char] || char);
  
  return cleaned.trim();
}
