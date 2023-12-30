//console.log("hello world");
var audio = new Audio('./Img/move.mp3');
var wrong = new Audio('./Img/wrongMove.mp3');
var game = []
var objects = []

import {
    Pawns,
    Bishops,
    Knights,
    Rooks,
    Queen,
    King,
    Player,
} from './js/class.js';
import { strToInt, checkmove, FindObj, restrictPiece, ifCheck } from './js/func.js';


const board = document.getElementById("board");

var boxes = [];
var pieceInHand = false
// var pop  = document.getElementById('popup')

function CreateChessBoard() {
    for (let i = 0; i <= 7; i++) {
        boxes[i] = [];
        game[i] = []
        for (let k = 0; k <= 7; k++) {
            const square = document.createElement("div");
            square.id = i + "" + k;
            square.draggable = false;
            square.classList.add("square");
            square.addEventListener("dragleave", leave);
            square.addEventListener("dragover", over);
            square.addEventListener("dragenter", enter);
            square.addEventListener('drop', dragdrop);
            square.addEventListener("click", onClickPiece);

            // square.innerText ='('+ i +','+ k + ')';
            if (i % 2 == 0) {
                // i is even
                if (k % 2 == 0) {
                    // j is even
                    square.classList.add("light");
                } else {
                    // j is odd
                    square.classList.add("dark");
                }
            } else {
                if (k % 2 == 0) {
                    // j is even
                    square.classList.add("dark");
                } else {
                    // j is odd
                    square.classList.add("light");
                }
            }
            boxes[i][k] = square;
            game[i][k] = '--'
            board.appendChild(square);
        }
    }
}

function addPiece(i, j, str, pie) {

    // let pie = new Pawns(i+''+j,str);
    var piece = document.createElement("img");
    piece.src = "./Img/" + str + ".png";
    piece.classList.add("piece");
    // console.log(piece)
    piece.addEventListener("dragstart", dragstart);
    // piece.addEventListener("click", onClickPiece);
    // console.log(piece)
    if (pie.color == 1) {
        piece.draggable = true;
    } else {
        piece.draggable = false;
    }
    piece.id = i + '-' + j;
    boxes[i][j].appendChild(piece);
    pie.element = piece;
    objects.push(pie);
    game[i][j] = pie.id
}

function SetChessBoard() {
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            if (i == 0) {
                if (j == 0 || j == 7) {
                    // black 
                    var col = 0
                    // rook
                    let pie = new Rooks(i + '' + j, 'B_rook', col);
                    addPiece(i, j, "B_rook", pie);
                } else if (j == 1 || j == 6) {
                    // knight
                    let pie = new Knights(i + '' + j, 'B_knight', col);
                    addPiece(i, j, "B_knight", pie);
                } else if (j == 2 || j == 5) {
                    let pie = new Bishops(i + '' + j, 'B_bishop', col);
                    // bishop
                    addPiece(i, j, "B_bishop", pie);
                } else if (j == 3) {
                    let pie = new Queen(i + '' + j, 'B_queen', col);
                    // queen
                    addPiece(i, j, "B_queen", pie);
                } else {
                    let pie = new King(i + '' + j, 'B_king', col);
                    // king
                    addPiece(i, j, "B_king", pie);
                }
            } else if (i == 7) {
                // white
                var col = 1
                if (j == 0 || j == 7) {
                    let pie = new Rooks(i + '' + j, 'W_rook', col);
                    // rook
                    addPiece(i, j, "W_rook", pie);
                } else if (j == 1 || j == 6) {
                    let pie = new Knights(i + '' + j, 'W_knight', col);
                    // knight
                    addPiece(i, j, "W_knight", pie);
                } else if (j == 2 || j == 5) {
                    let pie = new Bishops(i + '' + j, 'W_bishop', col);
                    // bishop
                    addPiece(i, j, "W_bishop", pie);
                } else if (j == 3) {
                    let pie = new Queen(i + '' + j, 'W_queen', col);
                    // queen
                    addPiece(i, j, "W_queen", pie);
                } else {
                    let pie = new King(i + '' + j, 'W_king', col);
                    // king
                    addPiece(i, j, "W_king", pie);
                }
            }
            else if (i == 1) {
                // black pawn
                let pie = new Pawns(i + '' + j, 'B_pawn', 0);
                addPiece(i, j, "B_pawn", pie);
            } else if (i == 6) {
                // white pawn
                let pie = new Pawns(i + '' + j, 'W_pawn', 1);
                addPiece(i, j, "W_pawn", pie);
            }
        }
    }
}

CreateChessBoard();
SetChessBoard();
//console.log(boxes[0][0])

function movePiece(objId, newPosition, div, current) {
    var obj = FindObj(objId, objects);
    //console.log(obj);
    var X = strToInt(newPosition)[0]
    var Y = strToInt(newPosition)[1];
    // console.log(x,y) //(x,y) is the new position
    if (!checkmove(obj, newPosition, obj.color)) {
        //check for "check"
        // console.log('no check')
        // if(!ifCheck(game, objects, obj , X,Y)){

        //     console.log('King is in check')
        //     return
        // }

        // console.log('error  : ', newPosition)
        // window.alert("Illegal Move")
        // pop.style.display = 'block'
        wrong.play()
        // setTimeout(function(){pop.style.display ='none'},900);
        
        return;
    }

    //console.log(current)
    if (current.length != 0) { //Take method
        // console.log(child.id + ' takes ' + current[0].id)

        // console.log(current[0].id)
        // if (check == 0) {
        var objId = current[0].id.replace('-', '')
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].id == objId) {
                objects.splice(i, 1);
            }
        }
        div.removeChild(current[0]);
        if (!objects.includes(FindObj('04', objects))) {
            alert('White Wins');
            clearBoard();
            return;
        } else if (!objects.includes(FindObj('74', objects))) {
            alert('Black Wins');
            clearBoard();
            return;
        }
        // console.log(objects)
        // } else {
        //     console.log('err2')
        //     return
        // }
        // console.log(current[0])
    }
    div.appendChild(child);
    audio.play();
    game[obj.x][obj.y] = '--';
    game[X][Y] = obj.id;
    obj.UpdatePosition(X, Y);
    restrictPiece(objects)
    obj.moved = 1; // for pawn
    //console.log(obj)
    //console.log('next legal moves ' + obj.legalMove())
    // console.log(game);
    var moves = obj.legalMove()
    // console.log(moves)
    // console.log(objects);
}


// img = document.getElementById('img').parentElement
// console.log(img)
var child, prnt;

function onClickPiece() {
    var piece = this.childNodes[0]
    // console.log('pieceInHand', pieceInHand)
    if (pieceInHand) {
        dragdrop.call(this)
    }
    else if (piece && piece.draggable) {
        dragstart.call(piece)
        pieceInHand = true
        // pieceInHand[1] = this
    }
    // else
}

function dragstart() {
    child = this;
    prnt = this.parentElement;
    // console.log(child, prnt)
    // prnt.removeChild(child)
}
function dragend() {
    // console.log('hi d')
    // console.log(this)
    //   prnt.appendChild(child);
}

function over(e) {
    e.preventDefault();
    // console.log('over')
}
function enter() {
    // console.log(this)
    //   current = this.childNodes;
    //   // console.log(current)
    //   if (current.length != 0) {
    //     this.removeChild(current[0]);
    //     // console.log(current[0])
    //   }
    //   this.appendChild(child);
}
function leave() {
    // console.log('leave')
}
var check = 0
function dragdrop() {
    // console.log('hi')

    // this= this
    // console.log('drop at',this)
    var current = this.childNodes;
    // console.log(current)
    //console.log(this.id) // id of square u put in

    //console.log('hi')
    var objId = child.id.replace('-', '')
    var newPosition = this.id;
    // console.log(objId + ' moves to ' + newPosition)
    movePiece(objId, newPosition, this, current)
    pieceInHand = false
    // if (current.length != 0) {
    //     console.log(child.id + ' takes ' + current[0].id)
    //     // console.log(current[0].id)
    //     if (check == 0) {
    //         this.removeChild(current[0]);
    //     } else {
    //         console.log('err2')
    //         return
    //     }
    //     // console.log(current[0])
    // }

}

// console.log(objects)
// 

// console.log(game, boxes)
// console.log(objects)
function clearBoard() {
    location.reload()
}
document.getElementById('btn').addEventListener('click', clearBoard)
var restricts = document.getElementById('rst')
// restricts.addEventListener('click',restrictPiece,false)
// restricts.myObj = objects
// restricts.myNum = 0



function startGame() {
    var whitePiece = objects.filter(function (x) { return x.color == 1 })
    var white = new Player(1, whitePiece, true);
    var blackPiece = objects.filter(function (x) { return x.color == 0 })
    var black = new Player(0, blackPiece, false);
}

// //test--------------------------------------------------------------------------------------

function test() {
    //position
    var i = 0
    var j = 4
    var col = 0
    let pie = new King(i + '' + j, 'B_king', col);
    addPiece(i, j, "B_king", pie);
    i = 7;
    j = 0;
    col = 1
    let pie2 = new Rooks(i + '' + j, 'W_rook', col);
    addPiece(i, j, "W_rook", pie2);
    // console.log(pie)
    // console.log(pie.legalMove())
    // console.log(pie2)
    // console.log(pie2.legalMove())

}
// test()


// ifCheck(game,objects,0) //black king

// const pwn2 = document.getElementsByClassName("piece");
// console.log(pwn2)

// // for (let i = 0; i < pwn2.length; i++) {
// //     //console.log('hi')
// //     pwn2[i].addEventListener("dragstart", dragstart);
// //     //   pwn[i].addEventListener('dragend', dragend)
// //     // pwn[i].addEventListener('drop', dragdrop)
// // }
// // // //-----------------------------------------------------------------------------------
// console.log('END')