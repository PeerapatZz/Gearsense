import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_API_KEY!
)

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
})

export async function POST(req: Request) {

  try {

    const body = await req.json()
    const { question, products, selectedProduct } = body;

    let context = "";
    if (products && Array.isArray(products)) {
      context = products.map((p: any) => `${p.name} - $${p.price}`).join("\n")
    } else if (selectedProduct) {
      context = `${selectedProduct.name} - $${selectedProduct.price}`
    } else {
      context = "No products available for context."
    }

    const prompt = `
User question:
${question}

Products:
${context}

Help the user compare these products and explain the differences.
`

    const result = await model.generateContent(prompt)

    return Response.json({
      answer: result.response.text()
    })

  } catch (error) {

    console.error("Chat error:", error)

    return Response.json(
      { error: "AI chat failed" },
      { status: 500 }
    )

  }

}
