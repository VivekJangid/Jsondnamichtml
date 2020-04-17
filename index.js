const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html` ,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html` ,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html` ,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json` ,'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName , {lower:true}));

console.log(slugs);

const server = http.createServer((req,res) => {
    const { query , pathname } = url.parse(req.url,true);
    if(pathname === '/overview')
    {
        res.writeHead(200 , { 'Content-type' : ' text/html' });
        const cardsHtml = dataObj.map(el => (replaceTemplate(tempCard , el))).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
    }
    else if(pathname === '/product')
    {
        res.writeHead(200 , { 'Content-type' : ' text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);        
        res.end(output);
    }
    else if(pathname === '/home' || pathname === '/' )
    {
        res.end("This is Home Page");
    }
    else if(pathname === '/api123')
    {
        res.writeHead(200 , { 'Content-type' : 'application/json' });
        res.end(data);
    }
    else
    {
        res.writeHead(404 , {
            'Content-type' : 'text/html',
            'my-own-header': 'hello'
            
        });
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(3000 , '127.0.0.1' , () => {
    console.log('Listening on localhost');    
});

















// fs.readFile('./txt/start.txt','utf-8' , (err,data1) => {
//     fs.readFile(`./txt/${data1}.txt`,'utf-8' , (err,data2) => {
//         // console.log(data2);
//         fs.readFile(`./txt/append.txt`,'utf-8' , (err,data3) => {
//             // console.log(data3);
            
//             fs.writeFile('./txt/final.txt',`${data2}\n\n\n\n${data3}` , 'utf-8' , err =>{
//                 console.log("Written  ;) ")
//             });
            
//         });
//     });
// });


// const txtIn = fs.readFileSync('./txt/input.txt', 'utf-8');


// console.log(txtIn);


// const txtOut = 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero'; 

// fs.writeFileSync('./txt/output.txt',txtOut);

// console.log("Written");
