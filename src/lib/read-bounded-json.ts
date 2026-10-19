type BoundedJsonResult =
  | { ok: true; value: unknown }
  | { ok: false; reason: "invalid" | "too-large" };

export async function readBoundedJson(request: Request, maxBytes: number): Promise<BoundedJsonResult> {
  const reader = request.body?.getReader();
  if (!reader) return { ok: false, reason: "invalid" };

  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        return { ok: false, reason: "too-large" };
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { ok: true, value: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) };
  } catch {
    return { ok: false, reason: "invalid" };
  } finally {
    reader.releaseLock();
  }
}
