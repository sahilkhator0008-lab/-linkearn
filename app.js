const form = document.getElementById("form");
const input = document.getElementById("url");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  result.classList.remove("hidden");
  result.textContent = "Creating...";

  try {
    const response = await fetch("/api/links", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({url: input.value.trim()})
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not create link.");

    result.innerHTML = `
      <b>Your short link:</b>
      <div class="short">${data.shortUrl}</div>
      <button id="copy">Copy link</button>
    `;

    document.getElementById("copy").onclick = async () => {
      await navigator.clipboard.writeText(data.shortUrl);
      document.getElementById("copy").textContent = "Copied!";
    };
  } catch (err) {
    result.textContent = err.message;
  }
});