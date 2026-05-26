import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: body.image
              },
              features: [
                {
                  type: "DOCUMENT_TEXT_DETECTION"
                }
              ]
            }
          ]
        })
      }
    );

    const visionData = await visionResponse.json();

    const rawText =
      visionData.responses[0].fullTextAnnotation?.text || "";

    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourdomain.com",
          "X-Title": "Prescription AI"
        },
        body: JSON.stringify({
          model: "google/gemma-4-31b-it:free",
          response_format: {
            type: "json_object"
          },
          messages: [
            {
              role: "system",
              content: `
You are an expert medical prescription parser.

Extract:
- diagnosis
- medicines
- dosage
- frequency
- duration
- confidence

Correct spelling mistakes.
Expand abbreviations.
Return valid JSON only.
`
            },
            {
              role: "user",
              content: rawText
            }
          ]
        })
      }
    );

    const aiData = await aiResponse.json();

    return NextResponse.json({
      rawText,
      ai: aiData
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to analyze prescription"
      },
      {
        status: 500
      }
    );
  }
}
