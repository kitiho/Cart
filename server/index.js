const express = require('express');
const app = express();
app.use(express.json());
app.use(require('cors')());
app.use('/', express.static(__dirname + '/static'));
app.listen(8181, () => {
  console.log('开始监听8181');
});
