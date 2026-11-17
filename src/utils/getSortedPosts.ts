import type { CollectionEntry } from "astro:content";
import { postFilter, isPostInLocale } from "./postFilter";

/**
 * Returns posts that are eligible to be shown to users, sorted by “last updated”
 * descending (uses `modDatetime` when present, otherwise `pubDatetime`).
 *
 * Note: filtering respects drafts and scheduled posts via `postFilter()`,
 * and restricts results to the given locale (defaults to "en").
 */
export function getSortedPosts(
  posts: CollectionEntry<"posts">[],
  locale: string = "en"
) {
  return posts
    .filter(postFilter)
    .filter(post => isPostInLocale(post, locale))
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
}
