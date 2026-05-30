// Supabase Storage Image Transformation helper.
//
// Rewrites a public-bucket `/storage/v1/object/public/...` URL into a
// `/storage/v1/render/image/public/...` URL with width/quality params so the
// CDN serves a resized variant instead of the original. Format negotiation
// (WebP/AVIF) happens automatically based on the browser's Accept header —
// no explicit `format=auto` param is required (and it isn't a valid param).
//
// Non-Supabase URLs (local /images/*, db-provided hero_image_url, placeholder
// paths) are returned unchanged so existing onError fallback chains keep
// working when transformations aren't available for a given source.

const OBJECT_SEGMENT = "/storage/v1/object/public/";
const RENDER_SEGMENT = "/storage/v1/render/image/public/";

export interface SupabaseImageOpts {
  width?: number;
  height?: number;
  quality?: number; // 1–100, defaults to 80
  resize?: "cover" | "contain" | "fill";
}

function isTransformable(url: string): boolean {
  return url.includes(OBJECT_SEGMENT);
}

export function supabaseImage(url: string | undefined | null, opts: SupabaseImageOpts = {}): string {
  if (!url) return "";
  if (!isTransformable(url)) return url;

  const rendered = url.replace(OBJECT_SEGMENT, RENDER_SEGMENT);
  const params = new URLSearchParams();
  if (opts.width) params.set("width", String(opts.width));
  if (opts.height) params.set("height", String(opts.height));
  params.set("quality", String(opts.quality ?? 80));
  if (opts.resize) params.set("resize", opts.resize);

  return `${rendered}?${params.toString()}`;
}

export function supabaseImageSrcSet(
  url: string | undefined | null,
  widths: number[],
  opts: Omit<SupabaseImageOpts, "width"> = {},
): string {
  if (!url || !isTransformable(url)) return "";
  return widths
    .map((w) => `${supabaseImage(url, { ...opts, width: w })} ${w}w`)
    .join(", ");
}
