
const http = require('http');

http.get('http://localhost:5000/api/products', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('Products sample IDs:');
            json.data.slice(0, 3).forEach(p => console.log(`${p.name}: ${p.id}`));
        } catch (e) {
            console.log('Raw data failed to parse:', data.slice(0, 100));
        }
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
