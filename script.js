var oldElement = null;
var dots = []
var intLoc = ""


// Set up the game board and place the pieces on it
function setUpBoard(){
    var table = document.createElement("table");
    for (var i = 1; i < 9; i++) {
        var tr = document.createElement('tr');
        tr.id = i.toString()
        for (var j = 1; j < 9; j++) {
            var td = document.createElement('td');
            if (i%2 == j%2) {
                td.className = "white";        
            } else {
                td.className = "black";
            }
            td.style = "text-align: center;" 
            td.id = i.toString() + j.toString();
            tr.appendChild(td);
        }
        table.appendChild(tr);    
    }
    $('#board').append(table)
}

function placePiece(piece, pos) {
    if (piece == piece.toUpperCase()) {
        piece = "w" + piece
    }
    document.getElementById(pos).innerHTML = "<img src='./pieces/"+ piece +".svg'>"
}
// Checks if c is a letter
function isalpha(c) {
    return (((c >= 'a') && (c <= 'z')) || ((c >= 'A') && (c <= 'Z')));
}
// Checks if c is a number
function isdigit(c) {
    return ((c >= '0') && (c <= '9'));
}   

function placeDot(id) {
    document.getElementById(id).innerHTML = "<img src='./pieces/dotGrey.svg' width='10' height='10'>"
    return id
}

function removeDot(id) {
    document.getElementById(id).innerHTML = ""
}

$(document).click(function(event) {
    var element = $(event.target);
    if (element != oldElement) {
        id = element[0].parentElement.id.split("");
        if (element.is('img') && !element[0].src.includes("dot")) {
            id[0] = parseInt(id[0]);
            id[1] = parseInt(id[1]);

            for (var i = 0; i < dots.length; i++) {
                removeDot(dots[i])
            }
            dots = []
            b.state[id[0]-1][id[1]-1].show()
            intLoc = element[0].parentElement.id
        } else if ((element.is('td') && element[0].innerHTML.includes("dot")) || (element.is('img') && element[0].src.includes('dot')) ) {
            if (id.length == 1) {
                id = element[0].id
            } else if (id.length == 2) {
                id = id[0] + id[1]
            }
            
            intLoc = intLoc.split("")
            for (var i = 0; i < dots.length; i++) {
                removeDot(dots[i])
            }
            dots = []
            b.state[parseInt(intLoc[0])-1][parseInt(intLoc[1])-1].move(id)
           


        }
        
    } else {
        for (var i = 0; i < dots.length; i++) {
            removeDot(dots[i])
        } 
    }
    oldElement = element
    
    
    
});
/* 
$(document).mouseover(function(event) {
    var piece = $(event.target);
    if (piece.is('img')) {
        pieceCode = piece[0].outerHTML.substring(19,21)
        piecePos = piece[0].parentElement.id
        if (pieceCode == "bp") {
            document.getElementById(piecePos.substring(0,1) + (parseInt(piecePos.substring(1,2)) - 1).toString()).innerHTML = "<img src='./pieces/dotGrey.svg' width='10' height='10'>"
            if (piecePos.includes("7")) {
                document.getElementById(piecePos.substring(0,1) + (parseInt(piecePos.substring(1,2)) - 2).toString()).innerHTML = "<img src='./pieces/dotGrey.svg' width='10' height='10'>"
            }
        }
        
    }
});
$(document).mouseout(function(event) {
    var piece = $(event.target);
    if (piece.is('img')) {
        pieceCode = piece[0].outerHTML.substring(19,21)
        piecePos = piece[0].parentElement.id
        if (pieceCode == "bp") {
            if ((piecePos.substring(0,1).charCodeAt(0) - 96) % 2 == (parseInt(piecePos.substring(1,2)) - 1) % 2){
                document.getElementById(piecePos.substring(0,1) + (parseInt(piecePos.substring(1,2)) - 1).toString()).innerHTML = ""
            } else {
                document.getElementById(piecePos.substring(0,1) + (parseInt(piecePos.substring(1,2)) - 1).toString()).innerHTML = ""
            }
            if ((piecePos.substring(0,1).charCodeAt(0) - 96) % 2 == (parseInt(piecePos.substring(1,2)) - 2) % 2){
                document.getElementById(piecePos.substring(0,1) + (parseInt(piecePos.substring(1,2)) - 2).toString()).innerHTML = ""
            } else {
                document.getElementById(piecePos.substring(0,1) + (parseInt(piecePos.substring(1,2)) - 2).toString()).innerHTML = ""
            }
            
        }
        
    }
});
/*
$(document).mousedown(function(event) {
    var img = $(event.target);
    console.log(document.images)
    if (img.is('img')) {
        p = new Pawn(img[0].outerHTML.substring(19,21), img[0].parentElement.id)
        p = pieceTypeCheck(img[0].outerHTML.substring(19,21), img[0].parentElement.id)
        for (var i = 0; i < document.images.length; i++){
            img = document.images[i]
            if (img.parentElement.id == p.position){
                img.id = "test"
            }
        }
        clickedE = document.getElementById("test")
        //console.log($('#moves').children().children())
        rows = $('#moves').children().children()
        for (var i = 0; i < (rows.length - 1); i++){
            row = rows[i].children
            for (var j = 0; j < (row.length - 1); j++){
                cell = row[j]
                if (cell.id == clickedE.parentElement.id) {
                    
                }
            }
        }
        document.getElementById("test").id = ""

        
           
    }
});
*/

class Board {
    constructor(){
        this.numWhite = 16;
        this.numBlack = 16;
        this.state = [["","",new Bishop("13","","b1")],
        [new Pawn("21","b","p1",false),new Pawn("22","b","p2",false),new Pawn("23","b","p3",false),new Pawn("24","b","p4",false),new Pawn("25","b","p5",false),new Pawn("26","b","p6",false),new Pawn("27","b","p7",false),new Pawn("28","b","p8",false)],
        [],[],[],[],
        [new Pawn("71","w","P1",false),new Pawn("72","w","P2",false),new Pawn("73","w","P3",false),new Pawn("74","w","P4",false),new Pawn("75","w","P5",false),new Pawn("76","w","P6",false),new Pawn("77","w","P7",false),new Pawn("78","w","P8",false)],
        []];
    }
    initialise() {
        var startupFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
        startupFEN = startupFEN.split('/');
        for (var i = 0; i < startupFEN.length; i++) {
            var row = startupFEN[i].split('');
            for (var j = 0; j < row.length; j++) {
                var piece = row[j];
                if (isdigit(parseInt(row[j-1])) && isalpha(piece) && row[j-1] != undefined ) {
                    placePiece(piece, (i+1).toString() + (j + parseInt(row[j-1])).toString());
                } else if(isalpha(piece)) {
                    placePiece(piece, (i+1).toString() + (j+1).toString());
                }
            }
        }
    }
} 



// Piece class
class Piece {
    constructor(position, colour, id, hasMoved) {
        this.position = position;
        this.colour = colour;
        this.hasMoved = hasMoved;
        this.id = id;
    }
}
// Pawn class
class Pawn extends Piece {
    constructor(position, colour, id, hasMoved) {
        super(position, colour, id, hasMoved);
        this.moveableSqrs = 1;
    }
    // Shows possible moves (can remove pieces)
    show() {
        if (!this.hasMoved) {
            this.moveableSqrs += 1;

        }
        var col = this.position.split("")[1];
        
        if (this.colour == "w") {
            this.moveableSqrs *= -1;
            var row = parseInt(this.position.split("")[0]) - 1;
            var max  = row + this.moveableSqrs;
            for (var i = row; (i) > max; i--) {
                dots.push(placeDot(i.toString() + col));
            }

        } else {
            var row = parseInt(this.position.split("")[0]) + 1;
            var max  = row + this.moveableSqrs;
            for (var i = row; i < max; i++) {
                dots.push(placeDot(i.toString() + col))
            }
        }
        this.moveableSqrs = 1
    }
    move(pos) {
        $('#'+this.position).html('');
        placePiece(this.id.split('')[0], pos);
        this.hasMoved = true;
        b.state[parseInt(this.position.split("")[0]) - 1][parseInt(this.position.split("")[1]) - 1] = "";
        b.state[parseInt(pos.split("")[0] - 1)][parseInt(pos.split("")[1] - 1)] = new Pawn(pos, this.colour, this.id, this.hasMoved)
    }
}
class Rook extends Piece {
    
}
class Queen extends Rook {

}
class King extends Queen {
    constructor(){
        super()
    }
}
class Bishop extends Piece {
    constructor(postion, colour, id) {
        super(postion, colour, id)
    }
    show() {
        var x = parseInt(this.position.split("")[0]);
        var y = parseInt(this.position.split("")[1]);
        var dotLoc = -1;
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                for (var k = 1; k <= 7; k++) {
                    var l = k
                    if (j == y+l && i == x+k) {
                        dotLoc = (x+k).toString() + (y+l).toString()
                    } else if (j == y+l && i == x-k) {
                        dotLoc = (x-k).toString() + (y+l).toString()
                    } else if (j == y-l && i == x-k) {
                        dotLoc = (x-k).toString() + (y-l).toString()
                    } else if (j == y-l && i == x+k) {
                        dotLoc = (x+k).toString() + (y-l).toString()
                    }
                    if (parseInt(dotLoc) > 9 && parseInt(dotLoc) < 100) {
                        if (!dotLoc.includes("9")) {
                            dots.push(dotLoc)
                        }  
                    }
                    dotLoc = -1
                }    
            }
        }
        for (var i = 0; i < dots.length; i++) {
            placeDot(dots[i])
        }
    }
    move(pos){
        console.log(this.id)
        $('#'+this.position).html('');
        placePiece(this.id.split('')[0], pos);
        b.state[parseInt(this.position.split("")[0]) - 1][parseInt(this.position.split("")[1]) - 1] = "";
        b.state[parseInt(pos.split("")[0] - 1)][parseInt(pos.split("")[1] - 1)] = new Bishop(pos, this.colour, this.id)
    }
}
class Knight extends Piece {

}

const b = new Board();



// Fixed
/* // Needs simplification
function placePieces() {
    for (var i = 1; i < 9; i++) {
        for (var j = 1; j < 9; j++) {
            if (String.fromCharCode(96+ j) + (9 - i).toString() == "h8" || String.fromCharCode(96+ j) + (9 - i).toString() == "a8"){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/br.svg' name='br'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "g8" || String.fromCharCode(96+ j) + (9 - i).toString() == "b8"){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/bh.svg' name='bk'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "f8" || String.fromCharCode(96+ j) + (9 - i).toString() == "c8"){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/bb.svg' name='bb'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "d8"){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/bq.svg' name='bq'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "e8" ){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/bk.svg' name='bk'>"
            }
            else if (i == 2){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/bp.svg' name='bp'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "h1" || String.fromCharCode(96+ j) + (9 - i).toString() == "a1"){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/wr.svg' name='wr'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "g1" || String.fromCharCode(96+ j) + (9 - i).toString() == "b1"){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/wh.svg' name='wk'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "f1" || String.fromCharCode(96+ j) + (9 - i).toString() == "c1"){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/wb.svg' name='wb'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "d1"){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/wq.svg' name='wq'>"
            }
            else if (String.fromCharCode(96+ j) + (9 - i).toString() == "e1" ){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/wk.svg' name='wk'>"
            }
            else if (i == 7){
                document.getElementById(String.fromCharCode(96+ j) + (9 - i).toString()).innerHTML = "<img src='./pieces/wp.svg' name='wp'>"
            }
            
        }
    }
}*/