class Book{

    #ref="";
    #publishedDate;
    static count=0;
    static getBookCount(){
        return Book.count;
    }


    constructor(volume){
        // define properties
     

        this.title=volume.volumeInfo.title,
        this.authors=volume.volumeInfo.authors[0],
        this.#publishedDate=new Date( volume.volumeInfo.publishedDate),
        this.thumbnail=volume.volumeInfo.imageLinks.thumbnail,
        this.previewLink=volume.volumeInfo.previewLink,
        this.description=volume.volumeInfo.description
        Book.count++;
        this.#ref="praj"+(Math.random()*10).toString(16).substring(2,12);
    }
    getYear(){
        return this.#publishedDate.getFullYear();
    }
    
    get id(){
        return this.#ref.toLowerCase();
    }
    set id(val){
        console.log('This cannot be changed', val);
        return false;
    }
}

class Store{
    static getBooks(){
        let books;
        if(!localStorage.getItem("books")){
            books=[]
        }else{
            books=JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book){
        const books=this.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

}

export  {Book, Store};
