const main=document.querySelector("main");
const searchInput=document.querySelector(".searchBox-form input[type=text]");
const form=document.querySelector(".searchBox-form");
let books=[];



function fetchAPI(queryString){
    const options={
        method:'GET',
        q:queryString
    }

    const url=`https://www.googleapis.com/books/v1/volumes?q=${queryString}`
    const req=new Request(url,options);
    
    fetch(req)
    .then((response)=>response.json())
    .then((result)=>console.log(result));

}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    fetchAPI(searchInput.value);
});



// searchInput.addEventListener("keyup", (e)=>{
//     if(e.key==="Enter" && e.target.value){
//         // fetchAPI(e.target.value);
//         console.log(e.target.value)
//     }
// })


