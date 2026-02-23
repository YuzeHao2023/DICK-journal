const rawBase = import.meta.env.BASE_URL || "/";
const normalizedBase = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
const normalizedBaseNoSlash = normalizedBase === "/" ? "" : normalizedBase.slice(0, -1);

export function withBase(path = ""): string {
  const cleaned = path.replace(/^\/+/, "");
  return cleaned ? `${normalizedBase}${cleaned}` : normalizedBase;
}

export function stripBase(pathname: string): string {
  if (!normalizedBaseNoSlash) {
    return pathname || "/";
  }

  if (pathname === normalizedBaseNoSlash) {
    return "/";
  }

  if (pathname.startsWith(`${normalizedBaseNoSlash}/`)) {
    return pathname.slice(normalizedBaseNoSlash.length) || "/";
  }

  return pathname || "/";
}
