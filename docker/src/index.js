const express = require('express');

async function bootstrap() {
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello World!')
    });
    app.listen(5000, () => console.log('Hello'));
}

bootstrap().catch(console.error);
