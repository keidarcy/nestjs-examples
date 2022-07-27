import fetch from 'node-fetch';

const URL ='https://jsonplaceholder.typicode.com/todos/1'

const main = async () => {
    const rawRes = await fetch(URL);
    const res = await rawRes.json();
    console.log(res);
}

const main1 = () => {
    const midRes =fetch(URL).then(res => res.json()).then(res => {
        console.log(res)
        console.log(1)
        return res;
    })

    console.log('midRes', midRes)
    return midRes;
}

const mainOneRes = main1();
console.log(mainOneRes)
