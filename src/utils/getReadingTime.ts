/**
 * Calculate estimated reading time in minutes based on words per minute (WPM).
 * Standard reading speed is ~200 WPM.
 */
export function getReadingTime(content?: string, wpm: number = 200): number {
  if (!content || typeof content !== "string") return 1;

  // Remove markdown code blocks
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  // Remove HTML tags
  const withoutHtml = withoutCode.replace(/<[^>]+>/g, "");
  // Remove markdown images
  const withoutImages = withoutHtml.replace(/!\[.*?\]\(.*?\)/g, "");
  // Strip frontmatter if passed the entire file content
  const cleanBody = withoutImages.replace(/^---[\s\S]*?---\s*/, "");

  // Extract words
  const words = cleanBody
    .trim()
    .split(/\s+/)
    .filter(w => Boolean(w && !/^[-*_~`#>]+$/.test(w)));

  const minutes = Math.ceil(words.length / wpm);
  return Math.max(1, minutes);
}
