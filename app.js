const app = require('./config/express')();
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Server Running at port ${port}`);
});

app.get('/', function(req, res) {
  res.status(302).redirect('https://github.com/ThiagoDallacqua/node-api-integration-study/blob/master/README.md');
});
