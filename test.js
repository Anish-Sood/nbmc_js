let user="ANihs"
if(true){
    user ="test"
    // console.log(user)
}
// console.log(user);

function myFunction(v, w, x, y, z) {
    // console.log(`v: ${v}`)
    // console.log(`w: ${w}`)
    // console.log(`x: ${x}`)
    // console.log(`y: ${y}`)
    // console.log(`z: ${z}`)

    const arr=[v,w,x,y,z];
    // console.log(arr);
}
const args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);


myarr=[[2,4,2,1],5,7,[[2,3,5,2],6,7,[[[6]]]]]

// console.log(myarr.flat(Infinity));

arr1=["w","e","d"];
arr2=["a","s","q"];


const combined=[...arr1,...arr2]
// console.log(combined);

const user1 = {
    name:"a",

    welcome(){
        // console.log(`${this.name}`);
        // console.log(this)
    }
}
user1.welcome();


// const anish = function(){
//     console.log("this is in anish");
//     console.log(this)
// }
// anish()

// const anish2 = () =>{
//     console.log("this is in anish2");
//     console.log(this)
// }
// anish2()


const arrowfun = (num1,num2) => ([num1,num2])
// console.log(arrowfun(2,2));


// IIFE - immediately invoked function expression
((name) => {
    // console.log(name); 
})("anish");

let a;
if (true){
    a= 1;
}
// abc();
// console.log(a);


(function () {
  var count = 0;

  function increment() {
    count++;
    // console.log(count);
  }

  increment();
})();

// Nullish Coalescing operator

let val;
// val=5??10
val=null??undefined??90
// console.log(val)


const array1 = [1, 2, 3, 9];
for (const key of array1) {
    // console.log(`${key}`);
}

const mymap = new Map();
mymap.set(1,"anish")
mymap.set(2,"kumar")
mymap.set(1,"singh")

// console.log(mymap);

for(const key of mymap){
    // console.log(key)
}

for(const [key,val] of mymap){
    // console.log(`${key}: ${val}`)
}

const obj = {
    one:"three",
    two:"four"
}
// console.log(obj.one)

// for (const [key,value] of obj){
//     console.log(`${key}: ${val}`)
// }

// OBJECTS are not iterable with for-of loop but arrays and maps are iterable
// Objects can be iterated with for-in loop

for (const key in obj){
    // console.log(`${key}: ${obj[key]}`)
}

// ********for of iterates over values but for in iterates over keys***************


// for each loop

const foreachloop=["1","2","3","4"]
// foreachloop.forEach(function (item){
//     // console.log(item);
// })
foreachloop.forEach((val,i,arr)=> {
    // console.log(val,i,arr)
})

//for each loop in array of objects

const foreachinarrayofobj=[
    {
        test1:"HI",
        test2:"BYE"
    },
    {
        test2:"goodbye",
        test3: "sweet dreams"
    }
]

foreachinarrayofobj.forEach((item)=>{
    // console.log(item.test1)
    // console.log(item,i,arr)
}) 

const values = foreachinarrayofobj.forEach((item)=>{
    // console.log(item.test1)
    return item;
    // console.log(item,i,arr)
}) 

// console.log(values); //this will not do anything

// with for each loop we cant get the loop to return any values.
//function written inside for-each and filter are called callback funcitons

const dotfilter = [1,2,3,4,5,6,6,7]
const after_arr = dotfilter.filter((num)=>{
    return num>4
})
// console.log(after_arr);

const newafterarr=[]
dotfilter.forEach((num)=>{
    if(num>5){
        newafterarr.push(num)
    }
})
// console.log(newafterarr)

// const newdiv = document.createElement('div');
// newdiv.id = "test";
// document.body.appendChild(newdiv);

// const Promisefour=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         let error=false
//         if (!error){
//             resolve({username: "hitesh", password: "123"})
//         } else{
//             reject('error something wrong')
//         }
//     },1500)
// })

// const res=Promisefour.then((user)=>{
//     console.log(user)
//     return user.username;
// }) .catch((error)=>{
//     console.log(error)
// }) .finally(()=>{
//     console.log(`promise ends`)
// })

// console.log(`res: ${res}`)


// const Promisefive= new Promise(function (resolve,reject){
//     setTimeout(()=>{
//         let error=false
//         if (!error){
//             resolve({username: "hitesh", password: "123"})
//         } else{
//             reject('error something wrong')
//         }
//     },1500)
// })

// async function consumePromisefive(){
//     try{
//         const res=await Promisefive
//         console.log(res)
//     } catch (error){
//         console.log(error)
//     }
// }

// consumePromisefive()



// fetch('https://api.github.com/users/hadley/org')
// .then(async (response)=>{console.log(`In response`,await response.json())})
// .catch((error)=>{console.log(`in reject`,error)});

function setusername1(username){
    this.username=username
    console.log("in setusername")
}
function createuser(username,email,password){
    setusername1.call(this, username)
    this.email=email
    this.password=password
}

const chai=new createuser("chai", 'chai', "111")
console.log (chai);



