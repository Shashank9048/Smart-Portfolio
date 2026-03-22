import fs from 'fs';
const key = 'AIzaSyAtMA5Sg9dIj39xjS0fCrXL6vE1_k1dH8I';
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
fetch(url).then(r => r.json()).then(d => {
  const models = d.models.map(m => m.name);
  fs.writeFileSync('models_list.txt', models.join('\n'));
});
