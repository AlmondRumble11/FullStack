const http = require("http");
const fs = require("fs");
const path = require("path");


//port number. 5000 or environmenbt variable(first)


//creating new server object
const serverObject = http.createServer((request, response) => {

    /* if (request.url === "/") {
         fs.readFile(path.join(__dirname, 'public', 'index.html'), (error, data) => {
             if (error) throw error;
             //adding a content type and status. 200 = everything is ok
             response.writeHead(200, { 'Content-Type': 'text/html' });
             //addind header
             response.end(data);
         });
     }
     if (request.url === "/api/users") {
         const users = [
             { name: 'Hessu Hopo', age: 55 },
             { name: 'Aku Ankka', age: 45 },
             { name: 'Iines Ankka', age: 40 },
         ];
         response.writeHead(200, { 'Content-Type': 'application/json' });
         //addind header
         response.end(JSON.stringify(users));
     }
     if (request.url === "/about") {
         fs.readFile(path.join(__dirname, 'public', 'about.html'), (error, data) => {
             if (error) throw error;
             //adding a content type and status. 200 = everything is ok
             response.writeHead(200, { 'Content-Type': 'text/html' });
             //addind header
             response.end(data);
         });
     }*/

    //making file path dynamic. if url '/' other wise index.html
    let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);

    //getting the extension of the file
    let extensionName = path.extname(filePath);

    //setting the content type for the file
    let contentType = 'text/html';

    //cheching the extension and then setting the content type
    switch (extensionName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //loading a file
    fs.readFile(filePath, (error, data) => {
        if (error) {
            //page not found
            if (error.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (error, data) => {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data, 'utf-8');
                })
            } else { //some server error
                response.writeHead(500);
                response.end(`Server Error: ${error.code}`);
            }
        } else { //no error
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data, 'utf-8');
        }
    });

    /* console.log(filePath);
     response.end();*/
});
const PORT = process.env.PORT || 5000;
//listens to given port
serverObject.listen(PORT, () => console.log(`Server operational on port number ${PORT}`));