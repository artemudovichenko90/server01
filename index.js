const http = require('http');
const fs = require('fs').promises;
const PORT = 3000;
const users = [];
const requestListener = async (req, res) => {
  const { method, url } = req;
  if (method === 'GET') {
    if (url === '/') {
      const data = await fs.readFile('./views/index.html', 'utf-8')
      return res.end(data);
    }
    if (url === '/about.html') {
      const data = await fs.readFile('./views/about.html', 'utf-8')
      return res.end(data);
    }
    if (url === '/contact.html') {
      const data = await fs.readFile('./views/contact.html', 'utf-8')
      return res.end(data);
    }
  }
  if (method === 'POST') {
    if (url === '/create-user') {
      let jsonString = '';
      req.on('data', (chunk) => { jsonString += chunk });
      req.on('end', () => {
        const user = JSON.parse(jsonString);
        user.id = Date.now();
        users.push(user);
        console.log(users);
        res.end(JSON.stringify(user));
      });
      return;
    }
  }
  const data = await fs.readFile('./views/404.html', 'utf-8')
  return res.end(data);

}
const server = http.createServer(requestListener);
server.listen(PORT);




















//resolving->loading->wrapping->evalution->caching 
/*
resolving:
1)
  core modules
  node_modules

2)
  filename.js|json
  dirrname
    package.json main: example.js
    index.js|json
3)
Error


*/