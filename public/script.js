document.getElementById('generate').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;
  const output = document.getElementById('output');
  output.textContent = 'Generating...';

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    if (response.ok) {
      output.textContent = data.text;
    } else {
      output.textContent = 'Error: ' + data.error;
    }
  } catch (error) {
    output.textContent = 'Error: ' + error.message;
  }
});