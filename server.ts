import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const SOURCES_FILE = "sources.md";

async function handler(req: Request): Promise<Response> {
  if (req.method === "POST" && req.url.endsWith("/add-source")) {
    try {
      const { url, description } = await req.json();

      if (!url || !description) {
        return new Response("Missing 'url' or 'description' in request body.", {
          status: 400,
        });
      }

      const markdownContent = `## Source\n\n- **URL:** ${url}\n- **Description:** ${description}\n\n---\n\n`;

      await Deno.writeTextFile(SOURCES_FILE, markdownContent, { append: true });

      return new Response("Source added successfully!", { status: 200 });
    } catch (error: unknown) {
      console.error("Error processing request:", error);
      return new Response(`Error: ${(error as Error).message}`, {
        status: 500,
      });
    }
  }

  return new Response("Not Found", { status: 404 });
}

console.log("Deno server running on http://localhost:8000/");
serve(handler, { port: 8000 });
