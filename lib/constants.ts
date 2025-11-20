// Limites de arquivo
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

// Limites de texto
export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;
export const MAX_SEARCH_LENGTH = 100;

// Paginação
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Tipos de diário
export const DIARY_TYPES = [
  "Família",
  "Trabalho",
  "Religioso",
  "Outros",
] as const;

// Regex patterns
export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// URLs
export const CLOUDINARY_URL_PREFIX = "https://res.cloudinary.com/";
