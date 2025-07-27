export function sanitizeInput(input, type = "string") {
  switch (type) {
    case "string":
      return typeof input === "string" ? input : "";
    case "number":
      return typeof input === "number" ? input : 0;
    case "boolean":
      return typeof input === "boolean" ? input : false;
    case "array":
      return Array.isArray(input) ? input : [];
    case "object":
      return input && typeof input === "object" ? input : {};
    default:
      return input;
  }
}
