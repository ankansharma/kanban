// Renders an inline script that executes during HTML parsing on the server
// response (type="text/javascript") but is inert after hydration and on client
// navigations (type="text/plain"). See the Next.js "preventing flash before
// hydration" guide. suppressHydrationWarning covers the type attribute mismatch.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
