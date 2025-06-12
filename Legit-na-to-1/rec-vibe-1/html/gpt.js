const groqApiKey = "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"; // Replace with your Groq API key

document.getElementById('generateButton').addEventListener('click', async () => {
  const eventCategory = document.getElementById('eventCategory').value;
  const eventAttribute = document.getElementById('eventAttribute').value;
  const eventLocation = document.getElementById('eventLocation').value;

  if (!eventCategory || !eventAttribute || !eventLocation) {
    alert('Please select category, attribute, and location for generation.');
    return;
  }

  // AI prompt for Groq
  const prompt = `Suggest a catchy event title and a short, engaging description for a student event.
Category: ${eventCategory}
Attribute: ${eventAttribute}
Location: ${eventLocation}
Format your response as:
Title: <your recommended event title>
Description: <your recommended event description>`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqApiKey}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    // Await and parse response
    let data;
    try {
      data = await response.json();
    } catch (err) {
      throw new Error("Invalid JSON response from Groq API");
    }

    if (!response.ok) {
      console.error("Groq API Error Response:", data);
      throw new Error(`Groq API Error: ${response.status} - ${data.error?.message || "Unknown error"}`);
    }

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error("No choices returned from Groq API");
    }

    const output = data.choices[0].message.content.trim();
    console.log("Groq API Response:", output);

    // Parse output
    let title = "";
    let description = "";
    const titleMatch = output.match(/Title:\s*(.*)/i);
    const descMatch = output.match(/Description:\s*([\s\S]*)/i);
    if (titleMatch) title = titleMatch[1].trim();
    if (descMatch) description = descMatch[1].trim();

    document.getElementById('generatedTitle').textContent = title;
    document.getElementById('generatedDescription').textContent = description;
    document.getElementById('eventName').value = title;
    document.getElementById('eventDescription').value = description;

  } catch (error) {
    alert("Error calling Groq API: " + error.message);
  }
});