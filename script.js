const chatbox = document.getElementById("chatbox");

function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value;
    if (!userText) return;

    chatbox.innerHTML += `<p><b>You:</b> ${userText}</p>`;
    input.value = "";

    fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-3B", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: userText })
    })
    .then(res => res.json())
    .then(data => {
        const reply = data.generated_text || "Sorry, I didn’t get that.";
        chatbox.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    });
}
