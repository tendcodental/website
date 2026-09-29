import { getEmergencyPhones } from "@/lib/emergency";
import { buildLlmsFullTxt } from "@/lib/llms";

export const revalidate = 60;

export async function GET() {
  const { phones } = await getEmergencyPhones();
  return new Response(buildLlmsFullTxt(phones), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
