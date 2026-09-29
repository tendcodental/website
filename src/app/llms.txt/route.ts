import { getEmergencyPhones } from "@/lib/emergency";
import { buildLlmsTxt } from "@/lib/llms";

// Static, refreshed in the background like the pages, so the emergency number stays current.
export const revalidate = 60;

export async function GET() {
  const { phones } = await getEmergencyPhones();
  return new Response(buildLlmsTxt(phones), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
