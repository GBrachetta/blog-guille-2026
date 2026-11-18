import config from "../../astro-paper.config";

/**
 * Rehype plugin to automatically add `target="_blank"` and `rel="noopener noreferrer"`
 * to external links in Markdown content while keeping internal site links in the same tab.
 */
export const rehypeExternalLinks = () => tree => {
  const siteUrl = (config.site?.url || "https://blog.gbrachetta.com").replace(
    /\/+$/,
    ""
  );

  const walk = node => {
    if (!node || typeof node !== "object" || !Array.isArray(node.children))
      return;

    for (const child of node.children) {
      if (
        child &&
        typeof child === "object" &&
        child.type === "element" &&
        child.tagName === "a" &&
        child.properties &&
        child.properties.href
      ) {
        const href = String(child.properties.href);
        const isExternal =
          (href.startsWith("http://") || href.startsWith("https://")) &&
          !href.startsWith(siteUrl);

        if (isExternal) {
          child.properties.target = "_blank";
          const existingRel = child.properties.rel;
          const rels = new Set(
            Array.isArray(existingRel)
              ? existingRel
              : typeof existingRel === "string"
                ? existingRel.split(/\s+/)
                : []
          );
          rels.add("noopener");
          rels.add("noreferrer");
          child.properties.rel = Array.from(rels).join(" ");
        }
      }
      walk(child);
    }
  };

  walk(tree);
};
