import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {

  try {

    const body = await req.json()
    const { question, products, selectedProduct } = body;

    let context = "";
    if (selectedProduct) {
      context = `
Product name: ${selectedProduct.name}
Price: $${selectedProduct.price}
Specifications: ${JSON.stringify(selectedProduct.specs)}
Pros: ${selectedProduct.pros?.join(', ')}
Cons: ${selectedProduct.cons?.join(', ')}
      `;
    } else if (products && Array.isArray(products)) {
      context = products.map((p: any) => `${p.name} - $${p.price}`).join("\n")
    } else {
      context = "No products available for context."
    }

    const prompt = `
You are a tech product advisor.

The user is currently asking about this product:
${context}

Answer the user's questions specifically about this product.

User question:
${question}
`

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    return Response.json({
      answer: completion.choices[0]?.message?.content || "No response generated."
    })

  } catch (error) {

    console.error("Chat error:", error)

    return Response.json(
      { error: "AI chat failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )

  }

}
