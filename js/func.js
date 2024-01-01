export function pieceOnSqr(objects, i, j, col) {//i - verrtical , j - horizontal
    if (i > 7 || j > 7 || i < 0 || j < 0) {
        return [true, 1];
    }
    for (const obj of objects) {
        // console.log(objects)
        if (obj.x == i && obj.y == j) {
            // console.log(obj,i,j)
            if (obj.color == col) {
                return [true, 1] // do not move - friendly piece on square
            }
            else {
                // console.log('enmy',i,j)
                return [false, 0] // move - enemy piece on square
            }
        }
    }
    return [false, 1] // move - no piece on square


    // console.log(document.getElementById(i + '' + j))
    // var current = document.getElementById(i + '' + j).childNodes;
    // if (current.length == 0) {
    //     // console.log(i,j,current,current.length,'funv')
    //     return [false, 1] // move - no piece on square
    // } else {
    //     var x = strToInt(col)[0]
    //     // if (x == 1 || x == 6) {
    //     //     console.log('pieceOnSquare')
    //     //     return true // do not move
    //     // }
    //     //console.log(col,current[0].id)
    //     var objId = current[0].id.replace('-', '')
    //     //console.log('hi111')
    //     var y = strToInt(objId)[0]
    //     var int = Math.abs(x - y)
    //     // console.log(i,j,'---',x,objId,y,int,'sxh')
    //     if (int > 1) {
    //         // console.log('no pi')
    //         return [false, 0] // move - enemy piece on square
    //     } else {
    //         return [true, 1] // do not move - friendly piece on square
    //     }
    // }
}

export function strToInt(id) {
    var x = parseInt(id[0]);
    var y = parseInt(id[1]);
    return [x, y];
}

export function checkmove(obj, move, objects) {
    //console.log(obj)
    var moves = obj.legalMove(objects);
    // console.log(moves)
    //console.log(moves)
    return moves.includes(move);
}

export function FindObj(id, objects) { // helps to find which piece u moved
    for (let i = 0; i < objects.length; i++) {
        if (id == objects[i].id) {
            //var obj = objects[i]
            // console.log(obj)
            // console.log(newPosition)
            return objects[i]
        }
    }
}

// export function friendlyPiece(ele) {

// }

export function restrictPiece(objects) {
    // console.log(objects)
    objects.map(function (x) {
        if (x.element.draggable) {
            x.element.draggable = false;
        } else {
            x.element.draggable = true;
        }
    })

}


export function ifCheckmate(objects, obj) {
    var friend = objects.filter(function (x) { return x.color != obj.color; })
    var myKing
    if (obj.color == 0) {//black is moved
        var emy_King = FindObj('74', objects) // enemy king
    } else {
        var emy_King = FindObj('04', objects)
    }
    
    for (const Piece of friend) {
        for (const move of Piece.legalMove(objects)) {
            // console.log(move)
            let XY = move.split('');
            
            // Extract characters into different variables
            let X = parseInt(XY[0]);
            let Y = parseInt(XY[1]);
            console.log(X,Y,document.getElementById(move).childNodes,emy_King)
            // console.log('in checkmate',ifCheck(objects, Piece, X, Y, document.getElementById(move).childNodes))
            console.log('MATE ', Piece, X, Y, document.getElementById(move).childNodes)
            if (!ifCheck(objects, Piece, X, Y, document.getElementById(move).childNodes)) {
                return false
            }
        }
    }
    return true
}


export function ifCheck(objects, obj, X, Y, current) {
    var tmpX = obj.x
    var tmpY = obj.y
    var tmpObj = objects
    var len = objects.length

    if (current.length != 0) { //Take method
        console.log(current)
        var objId = current[0].id.replace('-', '')
        for (var i = 0; i < tmpObj.length; i++) {
            if (tmpObj[i].id == objId) {
                // console.log(tmpObj[i].id , objId)
                var poo = tmpObj.splice(i, 1);
                // console.log(poo[0],poo,'llll')
            }
        }
    }
    // console.log(tmpObj)
    obj.UpdatePosition(X, Y);

    // console.log(obj)
    var enemy = tmpObj.filter(function (x) { return x.color != obj.color; })
    var myKing
    if (obj.color == 0) {//black is moved
        myKing = FindObj('04', tmpObj)
    } else {
        myKing = FindObj('74', tmpObj)
    }

    for (const enemyPiece of enemy) {
        for (const move of enemyPiece.legalMove(tmpObj)) {
            // console.log(move)
            if (move == ((myKing.x + '' + myKing.y))) {
                // objects = tmpObj
                if(len != objects.length){
                    console.log('problem',len,objects.length)
                    objects.push(poo[0])
                    // console.log(objects)
                }
                obj.UpdatePosition(tmpX, tmpY)
                return true;
            }
        }
    }
    // console.log(tmpObj)
    // objects.splice(object)
    // objects = tmpObj
    if(len != objects.length){
        console.log('problem',len,objects.length)
        objects.push(poo[0])
        // console.log(objects)
    }
    obj.UpdatePosition(tmpX, tmpY)
    return false
}


export function highlight(div, list) {
    list.forEach(id => {
        // console.log(id)
        document.getElementById(id).classList.add('highlight')
    });
    div.classList.toggle('bg-color')
}
export function unhighlight() {
    var divsWithClass = document.querySelectorAll('.highlight, .bg-color');
    // console.log(divsWithClass)
    // var divsWithClass = document.querySelectorAll('.bg-color');
    // Loop through the selected elements and remove the class
    divsWithClass.forEach(function (div) {
        div.classList.remove('highlight', 'bg-color');
    })
}