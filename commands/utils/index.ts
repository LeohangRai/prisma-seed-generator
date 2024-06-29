/**
 * returns the current timestamp in the format 'YYYYMMDDHHMMSS', e.g. '20240628123242'
 * @returns string
 */
export const getCurrentTimestamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

/**
 * replaces spaces with underscore and removes special characters
 * @param fileName
 * @returns string
 */
export const sanitizeFileName = (fileName: string): string => {
  if (!fileName) return '';
  return fileName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-.]/g, '');
};
