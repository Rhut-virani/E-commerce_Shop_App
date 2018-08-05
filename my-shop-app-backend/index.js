const express = require('express'),
      app = express(),
      request = require("request"),
      bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

  // Database of product 
let shopData = [   
    {
    title : 'Snow Shoes',
    description: "Made from real snow",
    price : 4.99,
    type: "Shoe",
    id: '4',
    url: 'https://images.unsplash.com/photo-1515555230216-82228b88ea98?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fad308b47b3b8531a025271129b6fbd7&auto=format&fit=crop&w=626&q=80'

    },    
    {
    title : "Zebra",
    description: "for Crossing Roads",
    price : 5.99,
    type: "Shoe",
    id: '5',
    url:'https://images.unsplash.com/photo-1506027687661-dd42ec99175d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a4834b870d3041bdfdc797ff5d5ced2&auto=format&fit=crop&w=500&q=80'

    },    
    {
    title : "Planet Shoes",
    description: "Go Green",
    price : 6.99,
    type: "Shoe",
    id: '6',
    url: 'https://images.unsplash.com/photo-1512327536842-5aa37d1ba3e3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4fecee3cfa7eef619f8d850b42d73fd4&auto=format&fit=crop&w=750&q=80'
    },    
    {
    title : "Comfy",
    description: "Can Verse with all star ?",
    price : 7.99,
    type: "Shoe",
    id: '7',
    url:'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-0.3.5&s=2c35f81b84a5521d533fd6a312912482&auto=format&fit=crop&w=750&q=80'
    },    
    {
    title : "You can Do it",
    description: "Keep Running",
    price : 8.99,
    type: "Shoe",
    id: '8',
    url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c15305e72c1ead61b6b23d4b0041de66&auto=format&fit=crop&w=751&q=80'
    },    
    {
    title : "Up side down",
    description: "its reverse",
    price : 99.66,
    type: "Shoe",
    id: '9',
    url: 'https://images.unsplash.com/photo-1517508890737-ea19f6494013?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3b00c180da0d7690eb0a36e6c31c6140&auto=format&fit=crop&w=334&q=80'

    },    
    {
    title : "Rocky Road",
    description: "Non sleepery if the angle is 5-10",
    price : 10.99,
    type: "Shoe",
    id: '10',
    url:'https://images.unsplash.com/photo-1478827227954-745b0daf2534?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=15c636347bb2d92ecf540fb59838fccd&auto=format&fit=crop&w=750&q=80'
    },    
    {
    title : "Fraternal Twins",
    description: "Same but still different",
    price : 34.99,
    type: "Shoe",
    id: '11',
    url: 'https://images.unsplash.com/photo-1523314399-837f3e0c291b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=849e08590bcfafbb6771b7a5c1f95c91&auto=format&fit=crop&w=334&q=80'
    },    
    {
    title : "Foot Dynamics",
    description: "Black",
    price : 88.99,
    type: "Shoe",
    id: '12',
    url: 'https://images.unsplash.com/photo-1494955464529-790512c65305?ixlib=rb-0.3.5&s=e99dcb049af6498172bce25365c0bc2c&auto=format&fit=crop&w=751&q=80'
    },
    {
    title : 'The Green ones',
    description: "Get it and its greenery all around",
    price : 66.66,
    type: "sun",
    id: '121',
    url: 'https://images.unsplash.com/photo-1502767089025-6572583495f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c395251a00dc113cdcb63d59e0505e62&auto=format&fit=crop&w=750&q=80'
    },
    {
    title : '\'Red\'ing glasses ',
    description: "For reading under the Sun",
    price : 80.08,
    type: "sun",
    id: '122',
    url: 'https://images.unsplash.com/photo-1440778303588-435521a205bc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f69c53990c8beebe8351f97d3c27da61&auto=format&fit=crop&w=1500&q=80'

    },          
    {
    title : 'The Pineapple Man',
    description: "find pineapple easily at grocery store",
    price : 9.99,
    type: "sun",
    id: '124',
    url: 'https://burst.shopifycdn.com/photos/cool-pool-pineapple_925x.progressive.jpg'
    },    
    {
    title : "Cheetah",
    description: "Not made by Puma ;)",
    price : 6.99,
    type: "sun",
    id: '125',
    url: 'https://images.unsplash.com/photo-1523754865311-b886113bb8de?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7c448146c9fb77e46fd29468dc225739&auto=format&fit=crop&w=701&q=80'
    },    
    {
    title : "Stealthy",
    description: "Disappear in the crowd",
    price : 88.99,
    type: "sun",
    id: '126',
    url: 'https://images.unsplash.com/photo-1491947153227-33d59da6c448?ixlib=rb-0.3.5&s=8f1a1f1e312071b48e89de4e5e117f79&auto=format&fit=crop&w=500&q=80'
    },    
    {
    title : "Yellow emoji",
    description: "Dont Snap or you'll have to Chat",
    price : 7.99,
    type: "sun",
    id: '127',
    url: 'https://images.unsplash.com/photo-1507467945033-e405ead66bfe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ce159bca8a6dd91e027ad8e4d2b406c&auto=format&fit=crop&w=750&q=80'
    },    
    {
    title : "Levitating Glasses",
    description: "They float up not right or left",
    price : 8.99,
    type: "sun",
    id: '128',
    url: 'https://images.unsplash.com/photo-1501619838605-f3e4c602db04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4f1854362d83f8aaef7fb7b25483fd92&auto=format&fit=crop&w=751&q=80'
    },    
    {
    title : "Focus",
    description: "only focuses at a fix point ",
    price : 12.99,
    type: "sun",
    id: '129',
    url: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb6734d9824a7380ecb9fc632e9ff2f3&auto=format&fit=crop&w=752&q=80'
    },    
    {
    title : "Dare to Wear",
    description: "Be a Child again",
    price : 10.99,
    type: "sun",
    id: '130',
    url:'https://images.unsplash.com/photo-1518548183878-5e1fcea68bb9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4526b3a40a22782a640d067e0eef495e&auto=format&fit=crop&w=750&q=80'
    },    
];
    // url data for background images
let urlData = [
    {
    homeBgUrl: 'https://burst.shopifycdn.com/photos/led-shoes-for-women_925x.progressive.jpg',
    shopBgUrl: 'https://burst.shopifycdn.com/photos/grey-slippers-on-carpet_925x.progressive.jpg',
}
]


let cartJSONbody = [];

    //get request to send products data
app.get('/shop/shopdata', (req,res)=>{

    res.json(shopData);
});

    // get request for urldata
app.get('/shop/urldata', (req,res)=>{

    res.json(urlData[0]);
});

    // post request to add product to  cart
app.post('/cart', (req, res)=> {
    newItem = req.body;
    cartJSONbody.push(newItem);
    res.send(cartJSONbody);

});

    // get req for sending cart data back
app.get('/cart', (req, res)=> {
    res.send(cartJSONbody);
});

    //post request performing a cart clear effect
app.post('/logout', (req,res)=>{
    cartJSONbody.splice(0, cartJSONbody.length);
    res.send('got it to work');
})

app.listen(8080, ()=>{
    console.log('server listening on port 8080');
})
