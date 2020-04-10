const fs = require('fs');

let rawdata = fs.readFileSync('urls.json');
let urls = JSON.parse(rawdata);
let urlAll = []
console.log(urls.pageNo.length)
console.log(urls.pageNo[274])

urls.pageNo.forEach(elementArray =>{
    elementArray.forEach(element => {
            url = element.slice(2, -1).trim()
            console.log(url)
            urlAll.push(url)
        });
    });

let data = JSON.stringify({'link': urlAll});
fs.writeFileSync('urls_all1.json', data);

console.log('Number of links:', urlAll.length);