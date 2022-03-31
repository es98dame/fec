const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, '../fec-client/dist')));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});