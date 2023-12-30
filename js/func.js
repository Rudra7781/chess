export function pieceOnSqr(i, j, col) {//i - verrtical , j - horizontal
    if (i > 7 || j > 7 || i < 0 || j < 0) {
        return [true,1];
    }
    //console.log(document.getElementById(i + '' + j))
    var current = document.getElementById(i + '' + j).childNodes;
    if (current.length == 0) {
        // console.log(i,j,current,current.length,'funv')
        return [false,1] // move - no piece on square
    } else {
        var x = strToInt(col)[0]
        // if (x == 1 || x == 6) {
        //     console.log('pieceOnSquare')
        //     return true // do not move
        // }
        //console.log(col,current[0].id)
        var objId = current[0].id.replace('-', '')
        //console.log('hi111')
        var y = strToInt(objId)[0]
        var int = Math.abs(x - y)
        console.log(i,j,'---',x,objId,y,int,'sxh')
        if (int > 1) {
            // console.log('no pi')
            return [false,0] // move - enemy piece on square
        } else {
            return [true,1] // do not move - friendly piece on square
        }
    }
}

export function strToInt(id) {
    var x = parseInt(id[0]);
    var y = parseInt(id[1]);
    return [x, y];
}

export function checkmove(obj, move) {
    //console.log(obj)
    var moves = obj.legalMove();
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

export function ifCheck(game, objects,obj,X,Y) {
    // console.log(col)
    var setOfMoves  = []
    // var friend = objects.filter(function(x) { return x.color == obj.color; });
    var enemy = objects.filter(function(x) { return x.color != obj.color; });
    var temp_x = obj.x
    var temp_y = obj.y
    // console.log(friend , enemy)

    game[obj.x][obj.y] = '--';
    game[X][Y] = obj.id;
    obj.UpdatePosition(X, Y);
    console.log('VIR')
    console.log(obj)
    var move = true

    var e_id,f_id;
    if(obj.color == 0){
        f_id = '04'
        e_id = '74'
    }else{
        e_id = '04'
        f_id = '74'
    }

    for(var i = 0 ; i < enemy.length  ; i++ ){ //if any moves make our king in check
        // console.log('hi')
        // console.log(friend)
        if(enemy[i].id[0] == 1 || enemy[i].id[0] == 6){
            continue;
        }
        // console.log(objects[i]);
        var legal_moves  = enemy[i].legalMove()
        if(legal_moves.length == 0){
            continue;
        }
        setOfMoves.push(legal_moves)
    }  
    var flat = [].concat.apply([], setOfMoves);
    var attack = [...new Set(flat)];
    console.log('Attack block :')
    console.log(attack)
    var own_king = FindObj(f_id, objects)
    var ok_post = own_king.x + "" + own_king.y; // ok - own king || ek - enemy king //
    console.log(ok_post)
    console.log(attack.includes(ok_post))

    game[X][Y] = '--';
    game[temp_x][temp_y] = obj.id;
    obj.UpdatePosition(temp_x, temp_y);
    console.log(game)


    if(attack.includes(ok_post)){
        console.log('own king is in check')
        move = false
        return move;
    }
    return move;
    // if(attack.includes(ek_post)){
    //     console.log('enemy king is in check')
    //     return move;
    // }

}