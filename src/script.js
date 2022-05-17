import {Book} from "./book.js";
import { Store } from "./book.js";
const searchInput=document.querySelector(".searchBox-form input[type=text]");
const form=document.querySelector(".searchBox-form");
const modal=document.querySelector(".modal");
const wrapper=document.querySelector(".wrapper");
let books=[];

function showPopup(message){
    // document.querySelector(".grid").remove();
    modal.innerText=message;
    modal.classList.add("show");
    // wrapper.classList.add("error");
    
    setTimeout(()=>{
        modal.classList.remove("show");
    },2000);
   
}

function buildBooks(){
    const grid=document.querySelector(".grid");
    grid.insertAdjacentHTML("beforebegin", `${Book.getBookCount()} books are found.`)
    grid.innerHTML=books.map((b)=>{
        return `<div class="books" data-ref="${b.id}">
        
        <a href="${b.previewLink}">
        <img src="${b.thumbnail}">
        </a>
        <h2>${b.title} (${b.getYear()})</h2>
        <p>Author(s): ${b.authors}</p>
        <p>Descirption: ${b.description}</p>

        </div>
        `
    }).join("")

}

function fetchAPI(queryString){
    const options={
        method:'GET',
        // q:queryString
    }

    const url=`https://www.googleapis.com/books/v1/volumes?q=${queryString}`
    const req=new Request(url,options);
    
    fetch(req)
        .then((response)=>{
            if(!response.ok){
                throw new Error(response.statusText);
            }

            return response.json()
        }).then(result=>{
            // do something
            if(result.items===undefined){
                // throw new Error('No such book exist');
                // document.querySelector(".grid").remove();
                showPopup("No results found!");
                
            }
            books=result.items.map((volume)=>{
                
                const book= new Book(volume);
                Store.addBook(book);
                return book;
                
            });
            console.log(books);
            // localStorage.setItem("books",JSON.stringify(books));
           
            buildBooks();
            

        }).catch((e)=>{
            console.log(e.message);
        })

}


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    fetchAPI(searchInput.value);
});

// the below is a hack. To be added to local storage later
document.addEventListener("DOMContentLoaded", fetchAPI(searchInput.value));



