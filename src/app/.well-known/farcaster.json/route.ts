import { PROJECT_TITLE } from "~/lib/constants";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const config = {
    accountAssociation: {
      header: "eyJmaWQiOjM2MjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgyY2UwYWM2ZmY1MmMyMjkyYjM4OWJmZjFlYjI3NDJhZGVkMTE3ZGY5YjU3Mjc1ZDU1ZGFhNTlmYmJiZDkwY2FkIn0",
      payload: "eyJkb21haW4iOiJkZWdlbnZldGVyYW5ldGgtc29ja3NxdWl6ZnJhbWUudmVyY2VsLmFwcCIsInRpbWVzdGFtcCI6MTczODcwODQ2MSwiZXhwaXJhdGlvblRpbWUiOjE3NDY0ODQ0NjF9",
      signature: "e9e55cfdb6e8891d4d4c9b855a58ce068a975021e84276fffe02ff4d4ead2b5a4f8a76f161bd3e91ebd2d68268ef0dfafa3a916ac591b04263915460790f4fe51c",
    },
    frame: {
      version: "1",
      name: PROJECT_TITLE,
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/frames/hello/opengraph-image`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
