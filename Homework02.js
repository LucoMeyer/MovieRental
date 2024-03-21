/*
    Initialize the movies array with all my movie data.
*/


let movies = [
  {
    id: 1,
    title: "Corpse Bride",
    director: "Tim Burton",
    runtime: "77 min",
    release_year: 2005,
    description:
      "When a shy groom practices his wedding vows in the inadvertent presence of a deceased young woman, she rises from the grave assuming he has married her.",
    poster_url: "images/Corpse-Bride-Poster.jpg",
    cinema_number: 1,
    ticket_price: 50,
    tickets_in_cart: 0,
  },

  {
    id: 2,
    title: "The Nightmare Before Christmas",
    director: "Henri Selick",
    runtime: "76 minutes",
    release_year: 1993,
    description:
      "Jack Skellington, the Pumpkin King of Halloween Town, decides to spread Christmas joy to the world. But his well-meaning mission unwittingly puts Santa Clause in jeopardy and creates a nightmare for all good little boys and girls everywhere!",
    poster_url: "images/Nightmare.jpg",
    cinema_number: 2,
    ticket_price: 100,
    tickets_in_cart: 0,
  },

  {
    id: 3,
    title: "Beetlejuice",
    director: "Tim Burton",
    runtime: "92 minutes",
    release_year: 1998,
    description:
      "The spirits of a deceased couple are harassed by an unbearable family that has moved into their home, and hire a malicious spirit to drive them out.",
    poster_url: "images/Beetlejuice.jpg",
    cinema_number: 3,
    ticket_price: 150,
    tickets_in_cart: 0,
  },

  {
    id: 4,
    title: "Sweeney Todd: The Demon Barber of Fleet Street",
    director: "Tim Burton",
    runtime: "116 minutes",
    release_year: 2008,
    description:
      "One of the darkest musicals ever written, Sweeney Todd: The Demon Barber of Fleet Street is the unsettling tale of a Victorian-era barber who returns home to London after fifteen years of exile to take revenge on the corrupt judge who ruined his life.",
    poster_url: "images/Sweeney.jpg",
    cinema_number: 4,
    ticket_price: 200,
    tickets_in_cart: 0,
  },
];

// My cart variable
// This will be a hash (key, value pair array). Movie ID : Movie Object (JSON)
var moviesInCart = new Object();

// Total Cost
var totalCost = 0;

// Initialise function that will be called upon loading of main page
function Initialise() {
    loadCart();
    for (i = 0; i < movies.length; i++) {        
        createMovieCard(i);
    }
    updateCounter();
}

// Display each movie card
function createMovieCard(i) {
    cineNum = i + 1;
    content = '';
    var cinerows = document.getElementById("cinerows");

    const col = document.createElement("div");
    col.className = "col-sm";

    content += '<div class="card">';
    content += '<div class="card-header" id="cin1">Cinema #' + cineNum + '</div>';
    content += '<div class="card-body">';
    content += '<img class="card-img-top" src="' + movies[i].poster_url + '" alt="Card image cap" />';
    content += '<h5 class="card-title">' + movies[i].title + '</h5>';
    content += '<p class="card-text" id="card-details1">';
    content += movies[i].description;
    content += '</p>';
    content += '<p class="card-text" id="price1">';
    content += 'R ' + movies[i].ticket_price;
    content += '</p>';
    content += '</div>';
    content += '</div>';
    content += '</div>';

    content += '<div class="card-footer">';

    content += '<button type="button" class="btn btn-outline-primary" id=details data-toggle="modal" data-target="#exampleModal" onclick="detailsFunc(' + i + ')">';    
    content += 'Show Details';
    content += '</button>';
    content += '<br />';
    content += '<br />';
    content += '<button type="button" class="btn btn-success" onclick="bookMovieTicket(' + movies[i].id + ')">Book Ticket</button>';
    content += '</div>';

    col.innerHTML = content;
    cinerows.appendChild(col);
}

// Populate the detail information on the modal dialog, with the movie object as referenced
// by the movieId passed as the first parameter.
function detailsFunc(movieId) {
    var modID = document.getElementById("modID");
    modID.innerHTML = movies[movieId].title;

    var titleID = document.getElementById("titleID");
    titleID.innerHTML = movies[movieId].title;

    var directID = document.getElementById("directID");
    directID.innerHTML = movies[movieId].director;

    var releaseID = document.getElementById("releaseID");
    releaseID.innerHTML = movies[movieId].release_year;

    var runID = document.getElementById("runID");
    runID.innerHTML = movies[movieId].runtime;

}

// Load the movies in the cart from Local Storage.
function loadCart() {
    let cartStr = window.localStorage.getItem('moviesInCart');
    moviesInCart = JSON.parse(cartStr);

    // If no movies in local storage, create an empty moviesInCart object.
    if (moviesInCart == null) {
        moviesInCart = new Object();
    }
    console.dir(moviesInCart);
}

// Store the movies in the cart to Local Storage.
function storeCart() {
    window.localStorage.setItem('moviesInCart', JSON.stringify(moviesInCart));    
    console.dir(moviesInCart);
    updateCost();  
}


// Called when the book movie button is clicked. It will increment the 
// ticket count, if the movie is already in the cart.
function bookMovieTicket(movieId) {
    for (i = 0; i < movies.length; i++) {
        if (movies[i].id == movieId) {
            console.log("Adding movie to cart : " + movies[i].title);
            var tickets = 0;
            if (moviesInCart[movieId] != null) {                
                tickets = moviesInCart[movieId].tickets_in_cart;
            }
            moviesInCart[movieId] = movies[i];
            moviesInCart[movieId].tickets_in_cart = tickets + 1;
        }
    }
    storeCart();
    updateCounter();
    updateCost();
}

// This will update the counter, displayed in the top right 
function updateCounter() {
    var cnt = 0;
    for (var key in moviesInCart) {
        cnt += moviesInCart[key].tickets_in_cart;
    }
    var numberInCart = document.getElementById("numberInCart");    
    numberInCart.innerHTML = '(' + cnt + ')';
}

// This function updates the totalCost variable with the Total
function updateCost() {
    totalCost = 0;
    for (var key in moviesInCart) {
        totalCost += moviesInCart[key].tickets_in_cart * moviesInCart[key].ticket_price;
    }
    console.log('Total Price : ' + totalCost);
}

// This clears the cart table, before we start to populate it.
function clearCartTable() {
    var table = document.getElementById("movieCart");
    table.innerHTML = "";
}

// This function is called upon loading the cart page
function InitialiseCart() {       
    loadCart();
    clearCartTable();
    for (var key in moviesInCart) {
        addCartItem(key);
    }
    
    cartTotal();
}


// Called for each movie in the cart. Will populate the relevant information, as well 
// as the totals for each line.
// It also creates controls (onclick events), to delete, increment and decrement tickets
// for the movies in the list.
function addCartItem(i) {    
    content = '';
    var table = document.getElementById("movieCart");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var str = "";
    str += '<td>';
    
    str += '<a class="delete" title="Delete" onclick="removeMovie(' + moviesInCart[i].id + ')"><i class="fa fa-times-circle"></i></a>';
    str += moviesInCart[i].title;
    str += '</td>';
    
    cell1.innerHTML = str;

    var cell2 = row.insertCell(1);
    cell2.innerHTML = 'R ' + moviesInCart[i].ticket_price;    

    var cell3 = row.insertCell(2);
    str =  '<a class="table-subtract" href="#" onclick="decTicket(' + i + ')">';
    str += '<i class="fa fa-chevron-circle-left" style="color: green"></i>';
    str += '</a>';
    str += moviesInCart[i].tickets_in_cart;
    
    str += '<a class="table-inc" href="#" onclick="incTicket(' + i + ')">';
    str += '<i class="fa fa-chevron-circle-right" style="color: green"></i></a>';
    cell3.innerHTML = str;

    var cell4 = row.insertCell(3);
    cell4.innerHTML = 'R ' + moviesInCart[i].ticket_price * moviesInCart[i].tickets_in_cart;
}

// Displays the total row at the bottom of the shopping cart.
function cartTotal() {    
    updateCost();
    updateCounter();

    content = '';
    var table = document.getElementById("movieCart");
   
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    var len = 0;
    for (var key in moviesInCart) {
        len++;
    }
    if (len == 0) {
        row.innerHTML = "<td>No movies in cart</td>";
    } else {
        row.className = "table-dark";
        var str = '<th scope="row"></th>';
        str += '<td></td>';
        str += '<td><b>Total:</b></td>';
        str += '<td>R ' + totalCost + '</td>';
        str += '</tr>';
        row.innerHTML = str;
    }
}

// Called when the delete button is pressed.
function removeMovie(movieId) {
    delete moviesInCart[movieId];
    storeCart();
    InitialiseCart();    
}

// Increment the number of tickets for the movie
function incTicket(movieId) {
    console.log("Dec Tickets for movie: " + moviesInCart[movieId].title);    
    moviesInCart[movieId].tickets_in_cart++;    
    storeCart();
    InitialiseCart();
}

// Decrement the number of tickets for the movie
function decTicket(movieId) {
    console.log("Dec Tickets for movie: " + moviesInCart[movieId].title);
    if (moviesInCart[movieId].tickets_in_cart > 0) {
        moviesInCart[movieId].tickets_in_cart--;
    } else {
        delete moviesInCart[movieId];
    }
    storeCart();
    InitialiseCart();
}
