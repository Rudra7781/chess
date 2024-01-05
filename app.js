//console.log("hello world");
var audio = new Audio('./Img/move.mp3');
var wrong = new Audio('./Img/wrongMove.mp3');
var end = new Audio('./Img/game-end.mp3');
var game = []
var objects = []
var notification = document.getElementById('notification')
var msg = document.getElementById('msg')
var CheckMsg = document.getElementById('check')


const btns = document.getElementsByClassName('btn')
Array.from(btns).forEach(btn => {
    btn.addEventListener('click', () => {
        // console.log('Restart')
        notification.style.display = 'none';
         location.reload()

    })
})


import {
    Pawns,
    Bishops,
    Knights,
    Rooks,
    Queen,
    King,
    Player,
} from './js/class.js';
import { strToInt, checkmove, FindObj, restrictPiece, ifCheck, highlight, unhighlight, ifCheckmate } from './js/func.js';


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
// console.log(objects)

function movePiece(objId, newPosition, div, current, objects) {
    // console.log(objects.length)


    var obj = FindObj(objId, objects);
    //console.log(obj);
    var X = strToInt(newPosition)[0]
    var Y = strToInt(newPosition)[1];
    //obj piece that is moving
    // console.log(x,y) //(x,y) is the new position
    var chk = ifCheck(objects, obj, X, Y, current)
    if (!checkmove(obj, newPosition, objects)) {
        wrong.play()
        return;
    }
    // console.log(chk)
    if (chk) {
        CheckMsg.style.display = 'grid'
        setTimeout(() => {
            CheckMsg.style.display = 'none';
        }, 2000)
        wrong.play()
        return;
    }

    //console.log(current)
    if (current.length != 0) { //Take method
        var objId = current[0].id.replace('-', '')
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].id == objId) {
                objects.splice(i, 1);
                // console.log('ddcdf')
            }
        }
        div.removeChild(current[0]);
    }
    div.appendChild(child);
    game[obj.x][obj.y] = '--';
    obj.UpdatePosition(X, Y);
    game[X][Y] = obj.id;
    restrictPiece(objects)
    obj.moved = 1;
    // console.log('before checkmate',obj)

    if (ifCheckmate(objects, obj)) {
        if(obj.color){
            msg.innerHTML = "White Wins"
        }else{
            msg.innerHTML = "Black Wins"
        }
        notification.style.display = 'grid';
        end.play()
        setTimeout(() => {
            clearBoard();
            
        }, 4000);
        return;
    }
    audio.play();
    // console.log(objects.length)
    // var moves = obj.legalMove(objects)
}


// img = document.getElementById('img').parentElement
// console.log(img)
var child, prnt;

function onClickPiece() {
    var piece = this.childNodes[0]
    // console.log('pieceInHand', pieceInHand)
    var sameCol = false
    try {
        sameCol = piece.draggable
    } catch (error) {

    }
    if (pieceInHand && !sameCol) {
        dragdrop.call(this)
    }
    else if (piece && piece.draggable) {
        dragstart.call(piece)
        pieceInHand = true
    }
}

function dragstart() {
    unhighlight()
    child = this;
    prnt = this.parentElement;
    var objId = child.id.replace('-', '')
    var obj = FindObj(objId, objects)
    // console.log(prnt)
    highlight(prnt, obj.legalMove(objects))
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

    var current = this.childNodes;
    var objId = child.id.replace('-', '')
    var newPosition = this.id;
    // console.log(objId + ' moves to ' + newPosition)
    movePiece(objId, newPosition, this, current, objects)
    pieceInHand = false
    unhighlight()
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
    // console.log('Restart')
    notification.style.display = 'none';
    location.reload()
}
// restricts.addEventListener('click',restrictPiece,false)
// restricts.myObj = objects
var restricts = document.getElementById('rst')
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
    // console.log(pie.legalMove(objects))
    // console.log(pie2)
    // console.log(pie2.legalMove(objects))

}
// test()



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