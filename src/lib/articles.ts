import type { CollectionEntry } from "astro:content";

export type ArticleEntry = CollectionEntry<"articles">;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function sortArticlesDesc(a: ArticleEntry, b: ArticleEntry): number {
  return b.data.published.getTime() - a.data.published.getTime();
}

export function formatArticleDate(date: Date): string {
  return dateFormatter.format(date);
}

export function formatArticleYear(date: Date): string {
  return String(date.getFullYear());
}

export function formatAuthors(authors: string[]): string {
  if (authors.length === 0) {
    return "Unknown Author";
  }

  if (authors.length === 1) {
    return authors[0];
  }

  if (authors.length === 2) {
    return `${authors[0]} and ${authors[1]}`;
  }

  return `${authors.slice(0, -1).join(", ")}, and ${authors[authors.length - 1]}`;
}

function sanitizeBibtexValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ");
}

function bibtexKey(article: ArticleEntry): string {
  const leadAuthor = article.data.authors[0] || "author";
  const authorToken =
    leadAuthor
      .split(" ")
      .filter(Boolean)
      .at(-1)
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "") || "author";

  const titleToken =
    article.data.title
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "article";

  return `${authorToken}${formatArticleYear(article.data.published)}${titleToken}`;
}

export function buildCitation(article: ArticleEntry): string {
  const authors = formatAuthors(article.data.authors);
  const year = formatArticleYear(article.data.published);
  return `${authors} (${year}). ${article.data.title}. Disciplinary Inquiries into Casual Knowledge.`;
}

export function buildBibtex(article: ArticleEntry): string {
  const year = formatArticleYear(article.data.published);
  const month = String(article.data.published.getMonth() + 1).padStart(2, "0");
  const fields: Array<[string, string]> = [
    ["title", article.data.title],
    ["author", article.data.authors.join(" and ")],
    ["journal", "Disciplinary Inquiries into Casual Knowledge"],
    ["year", year],
    ["month", month],
    ["keywords", article.data.keywords.join(", ")],
    ["abstract", article.data.abstract],
  ];

  if (article.data.license) {
    fields.push(["note", `License: ${article.data.license}`]);
  }

  if (article.data.pdfUrl) {
    fields.push(["url", article.data.pdfUrl]);
  }

  const formatted = fields
    .map(([key, value]) => `  ${key} = {"${sanitizeBibtexValue(value)}"}`)
    .join(",\n");

  return `@article{${bibtexKey(article)},\n${formatted}\n}`;
}
