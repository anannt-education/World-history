import { jsonLdGraph } from "@/lib/site";

export function JsonLd() {
  const graph = jsonLdGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
