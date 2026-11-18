import config from "@/config";

export const postSlugsEnToEs: Record<string, string> = {
  "mozarts-dice-game": "el-juego-de-dados-de-mozart",
  "six-hours-to-save-three-seconds":
    "como-le-ensene-a-mi-cama-a-cegarme-a-las-3-am",
  "my-home-assistant-setup-part-1": "mi-setup-de-home-assistant-parte-1",
  "building-websites-for-musicians":
    "por-que-los-sitios-web-de-musicos-siguen-pareciendo-de-2004",
  "why-a-harpsichord-is-never-in-tune":
    "por-que-un-clave-nunca-puede-estar-afinado",
  "my-home-assistant-setup-part-2": "mi-setup-de-home-assistant-parte-2",
  "the-good-night-protocol": "el-protocolo-de-buenas-noches",
  "automations-that-babysit-other-automations":
    "automatizaciones-que-cuidan-a-otras-automatizaciones",
  "historical-treatises-musicians-arguing-in-print":
    "tratados-historicos-musicos-discutiendo-por-escrito",
  "basso-continuo-live-coding-in-1680": "basso-continuo-live-coding-en-1680",
  "why-i-built-this-blog-with-astro": "por-que-construi-este-blog-con-astro",
};

export const postSlugsEsToEn: Record<string, string> = Object.fromEntries(
  Object.entries(postSlugsEnToEs).map(([en, es]) => [es, en])
);

export const tagSlugsEnToEs: Record<string, string> = {
  devices: "dispositivos",
  "early-music": "musica-barroca",
  "smart-home": "domotica",
  tuning: "afinacion",
  "web-development": "desarrollo-web",
  harpsichord: "clave",
  automations: "automatizaciones",
  sensors: "sensores",
  history: "historia",
  musicology: "musicologia",
  "home-assistant": "home-assistant",
  esp32: "esp32",
  software: "software",
  javascript: "javascript",
  hardware: "hardware",
  astro: "astro",
};

export const tagSlugsEsToEn: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(tagSlugsEnToEs).map(([en, es]) => [es, en])
  ),
  "musica-antigua": "early-music",
};

export interface AlternateUrls {
  en: string;
  es: string;
  xDefault: string;
  enPath: string;
  esPath: string;
}

export function getAlternateUrls(
  pathname: string,
  baseUrl: string = config.site.url
): AlternateUrls {
  const base = baseUrl.replace(/\/+$/, "");
  const normalized = pathname.replace(/\/+$/, "") || "/";

  let enPath = "/";
  let esPath = "/es/";

  const isEs = normalized === "/es" || normalized.startsWith("/es/");
  const clean = isEs ? normalized.replace(/^\/es/, "") || "/" : normalized;

  if (clean === "/" || clean === "") {
    enPath = "/";
    esPath = "/es/";
  } else if (clean === "/about") {
    enPath = "/about/";
    esPath = "/es/about/";
  } else if (clean === "/privacy") {
    enPath = "/privacy/";
    esPath = "/es/privacy/";
  } else if (clean === "/archives") {
    enPath = "/archives/";
    esPath = "/es/archives/";
  } else if (clean === "/search") {
    enPath = "/search/";
    esPath = "/es/search/";
  } else if (clean === "/posts" || clean.match(/^\/posts\/\d+$/)) {
    enPath = `${clean}/`;
    esPath = `/es${clean}/`;
  } else if (clean.startsWith("/posts/")) {
    const slug = clean.replace(/^\/posts\//, "");
    if (isEs) {
      const enSlug = postSlugsEsToEn[slug] ?? slug;
      enPath = `/posts/${enSlug}/`;
      esPath = `/es/posts/${slug}/`;
    } else {
      const esSlug = postSlugsEnToEs[slug] ?? slug;
      enPath = `/posts/${slug}/`;
      esPath = `/es/posts/${esSlug}/`;
    }
  } else if (clean === "/tags") {
    enPath = "/tags/";
    esPath = "/es/tags/";
  } else if (clean.startsWith("/tags/")) {
    const rawTag = clean.replace(/^\/tags\//, "");
    const parts = rawTag.split("/");
    const tag = parts[0];
    const pageSuffix = parts.length > 1 && parts[1] ? `/${parts[1]}` : "";

    if (isEs) {
      const enTag = tagSlugsEsToEn[tag] ?? tag;
      enPath = `/tags/${enTag}${pageSuffix}/`;
      esPath = `/es/tags/${tag}${pageSuffix}/`;
    } else {
      const esTag = tagSlugsEnToEs[tag] ?? tag;
      enPath = `/tags/${tag}${pageSuffix}/`;
      esPath = `/es/tags/${esTag}${pageSuffix}/`;
    }
  } else {
    enPath = `${clean}/`;
    esPath = `/es${clean}/`;
  }

  return {
    en: `${base}${enPath}`,
    es: `${base}${esPath}`,
    xDefault: `${base}${enPath}`,
    enPath,
    esPath,
  };
}
