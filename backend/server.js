const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/run', (req, res) => {
    const { language, code, input } = req.body;

    let command = '';
    switch (language) {
        case 'C':
            command = `echo "${code}" > temp.c && gcc temp.c -o temp && echo "${input}" | ./temp`;
            break;
        case 'C++':
            command = `echo "${code}" > temp.cpp && g++ temp.cpp -o temp && echo "${input}" | ./temp`;
            break;
        case 'Python':
            command = `echo "${code}" > temp.py && echo "${input}" | python3 temp.py`;
            break;
        case 'JavaScript':
            command = `node -e "${code}"`;
            break;
        default:
            return res.status(400).json({ error: 'Unsupported language' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.json({ error: stderr });
        }
        res.json({ output: stdout });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
