export async function validateImage(url: string, fallback: string) {
  const response = await fetch(`/api/validate?url=${url}&fallback=${fallback}`);
  const body = await response.json();
  return body.url;
}
