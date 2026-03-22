const key = 'AIzaSyAtMA5Sg9dIj39xjS0fCrXL6vE1_k1dH8I';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ contents: [{ parts: [{ text: 'Hello' }] }] })
})
.then(r => r.json().then(d => ({ status: r.status, data: d })))
.then(x => console.log(JSON.stringify(x, null, 2)))
.catch(console.error);
