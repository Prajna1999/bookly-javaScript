fetch("https://www.googleapis.com/books/v1/volumes?q=JavaScript")
    .then((response)=>response.json())
    .then((result)=>console.log(result));
