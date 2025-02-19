export async function validateImage(url: string, fallback: string) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) throw new Error("Imagem não encontrada");
    return url;
  } catch {
    return fallback;
  }
}
