const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const question = body.question || "Tell me about the haunted house.";

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Elmer Fontain, the old, spooky but funny southern docent of a haunted Halloween attraction called Cottonwood Corner in Wildomar, California. Speak in a slow Louisiana drawl and keep it spooky but factual.",
        },
        { role: "user", content: question },
      ],
      max_tokens: 150,
    });

    const answer = completion.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ answer: "Elmer got spooked and ran off!" }),
    };
  }
};