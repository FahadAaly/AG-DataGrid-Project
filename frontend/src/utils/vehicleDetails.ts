export const hiddenKeys = new Set([
  "_id",
  "id",
  "__v",
  "createdAt",
  "updatedAt",
]);

export function toLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export function getDisplayFields(
  obj: Record<string, any>
): { label: string; value: any }[] {
  return Object.entries(obj)
    .filter(
      ([key, value]) => !hiddenKeys.has(key) && value != null && value !== ""
    )
    .map(([key, value]) => ({
      label: toLabel(key),
      value,
    }));
}
