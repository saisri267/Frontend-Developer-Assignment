/**
 * Generates a unique logistics order ID with a prefix and timestamp-based suffix.
 * Format: LGX-YYYYMMDD-XXXX (e.g., LGX-20240315-7A3F)
 */
export function generateOrderId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const datePart = `${year}${month}${day}`;
  const randomPart = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `LGX-${datePart}-${randomPart}`;
}
