// i ---------->
// j vertical
import { pieceOnSqr } from './func.js'

export class Player {
    constructor(color, pieces, turn) {
        this.color = color;
        this.pieces = pieces;
        this.turn = turn;
    }
}
class ChessPieces {
    constructor(id, name, color, div) {
        this.id = id;
        this.x = parseInt(id[0])
        this.y = parseInt(id[1]);
        this.name = name;
        this.color = color; // white = 1, black = 0
        this.moveable = true;
        this.element = div;
    }
    UpdatePosition(x, y) {
        this.x = x;
        this.y = y;
    }

}

export class Pawns extends ChessPieces {
    constructor(id, name, color) {
        super(id, name, color)
    }
    moved = 0; //pawn is unmoved
    legal_moves = []
    legalMove() {
        this.legal_moves = []
        var i, j;
        j = this.y;
        // console.log(this.x,this.y,'=----------')
        if (this.color == 0) {//black
            if (this.moved == 0) {
                i = this.x + 2;
                if (!pieceOnSqr(i, j, this.id)[0] && !pieceOnSqr(i-1, j, this.id)[0] && pieceOnSqr(i-1, j, this.id)[1] == 1 && pieceOnSqr(i, j, this.id)[1] == 1) {
                    this.legal_moves.push(i + '' + j);
                    // console.log(i,j)
                }
                //this.moved = 1;
            }
            i = this.x + 1;
            if (!pieceOnSqr(i, j, this.id)[0] && pieceOnSqr(i, j, this.id)[1] == 1) {
                // console.log(i,j,'no pi sqr',pieceOnSqr(i, j, this.id))
                this.legal_moves.push(i + '' + j);
            }
            j = this.y + 1
            // console.log(pieceOnSqr(i,j, this.id),'after j+1 = ',i,j,this.x,this.y)
            if (!pieceOnSqr(i,j, this.id)[0] && pieceOnSqr(i, j, this.id)[1] == 0){
                // console.log('yes take dsdsdd',i,j)
                this.legal_moves.push(i + '' + j);
            }
            if (!pieceOnSqr(i,j-2, this.id)[0] && j-2 >= 0 && pieceOnSqr(i, j-2, this.id)[1] == 0){
                // console.log('yes take')
                this.legal_moves.push(i + '' + (j-2));
            }
            
            //console.log(this.legal_moves)
            return this.legal_moves;
            //x + 1
        } else {//white
            if (this.moved == 0) {
                i = this.x - 2;
                if (!pieceOnSqr(i, j, this.id)[0]) {
                    this.legal_moves.push(i + '' + j);
                }
                //this.moved = 1;
            }
            i = this.x - 1;
            if (!pieceOnSqr(i, j, this.id)[0] && pieceOnSqr(i, j, this.id)[1] == 1) {
                this.legal_moves.push(i + '' + j);
            }
            j = this.y + 1
            if (!pieceOnSqr(i,j, this.id)[0] && pieceOnSqr(i, j, this.id)[1] == 0){
                // console.log('yes')
                this.legal_moves.push(i + '' + j);
            }
            if (!pieceOnSqr(i,j-2, this.id)[0] && j-2 > 0 && pieceOnSqr(i, j-2, this.id)[1] == 0){
                console.log('yes rud')
                this.legal_moves.push(i + '' + (j-2));
            }
            
        }
        //console.log(this.legal_moves)
        return this.legal_moves;
        //x-1
    }


    //return this.legal_moves;
}

export class Rooks extends ChessPieces {
    constructor(id, name, color) {
        super(id, name, color)
    }

    // UpdatePosition(x,y){
    //     super.UpdatePosition(x,y);
    // }

    legal_moves = []
    legalMove() {
        this.legal_moves = []
        //x,y+k
        var i, j;
        for (let k = 1; k <= 7; k++) { // --->
            i = this.x;
            j = this.y + k;
            
            if (j > 7 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            else if(pieceOnSqr(i, j, this.id)[1]==0){
                this.legal_moves.push(i + '' + j)
                break;
            }
            this.legal_moves.push(i + '' + j)
            // console.log(i + '' + j);
        }
        //x,y-k
        for (let k = 1; k <= 7; k++) { // <----
            i = this.x;
            j = this.y - k;
            if (j < 0 || pieceOnSqr(i, j, this.id)[0]) {
                // console.log('Hiiii')
                break;
            }
            else if(pieceOnSqr(i, j, this.id)[1]==0){
                this.legal_moves.push(i + '' + j)
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x+k,y
        for (let k = 1; k <= 7; k++) { // down
            i = this.x + k;
            j = this.y;
            if (i > 7 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            else if(pieceOnSqr(i, j, this.id)[1]==0){
                this.legal_moves.push(i + '' + j)
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x-k,y
        for (let k = 1; k <= 7; k++) { // up
            i = this.x - k;
            j = this.y;
            if (i < 0 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            else if(pieceOnSqr(i, j, this.id)[1]==0){
                this.legal_moves.push(i + '' + j)
                // console.log(i,j)
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        return this.legal_moves;
    }
}

export class Knights extends ChessPieces {
    constructor(id, name, color) {
        super(id, name, color), color
    }
    legal_moves = []
    legalMove() {
        this.legal_moves = []
        //x,y+k
        var i, j;
        //1
        i = this.x + 1;
        j = this.y + 2;
        if (!(j > 7 || i > 7 )) {
            if (pieceOnSqr(i, j, this.id)[0]) {
                //
            }else{
                this.legal_moves.push(i + '' + j)
            }
        }
        //2
        i = this.x + 2;
        j = this.y + 1;
        if (!(j > 7 || i > 7  )) {
            if (pieceOnSqr(i, j, this.id)[0]) {
                //
            }else{
                this.legal_moves.push(i + '' + j)
            }
            //this.legal_moves.push(i + '' + j)
        }
        //3
        i = this.x + 2;
        j = this.y - 1;
        if (!(i > 7 || j < 0  )) {
            if (pieceOnSqr(i, j, this.id)[0]) {
                //
            }else{
                this.legal_moves.push(i + '' + j)
            }
            //this.legal_moves.push(i + '' + j)
        }
        //4
        i = this.x + 1;
        j = this.y - 2;
        if (!(i > 7 || j < 0  )) {
            if (pieceOnSqr(i, j, this.id)[0]) {
                //
            }else{
                this.legal_moves.push(i + '' + j)
            }
            //this.legal_moves.push(i + '' + j)
        }
        //5
        i = this.x - 1;
        j = this.y - 2;
        if (!(j < 0 || i < 0  )) {
            if (pieceOnSqr(i, j, this.id)[0]) {
                //
            }else{
                this.legal_moves.push(i + '' + j)
            }
            //this.legal_moves.push(i + '' + j)
        }
        //6
        i = this.x - 2;
        j = this.y - 1;
        if (!(j < 0 || i < 0  )) {
            if (pieceOnSqr(i, j, this.id)[0]) {
                //
            }else{
                this.legal_moves.push(i + '' + j)
            }
            //this.legal_moves.push(i + '' + j)
        }
        //7
        i = this.x - 2;
        j = this.y + 1;
        if (!(i < 0 || j > 7  )) {
            if (pieceOnSqr(i, j, this.id)[0]) {
                //
            }else{
                this.legal_moves.push(i + '' + j)
            }
            //this.legal_moves.push(i + '' + j)
        }

        i = this.x - 1;
        j = this.y + 2;
        if (!(i < 0 || j > 7  )) {
            if (pieceOnSqr(i, j, this.id)[0]) {
                //
            }else{
                this.legal_moves.push(i + '' + j)
            }
            //this.legal_moves.push(i + '' + j)
        }
        return this.legal_moves;

    }
}

export class Bishops extends ChessPieces {
    constructor(id, name, color) {
        super(id, name, color)
    }
    legal_moves = []
    legalMove() {
        this.legal_moves = []
        //x,y+k
        var i, j;
        //var col = this.id;
        for (let k = 1; k <= 7; k++) { //  cross down \
            i = this.x + k;
            j = this.y + k;


            if (j > 7 || i > 7 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            else if(pieceOnSqr(i, j, this.id)[1]==0){
                this.legal_moves.push(i + '' + j)
                break;
            }
            this.legal_moves.push(i + '' + j)
            // console.log(i + '' + j);
        }
        //x,y-k
        for (let k = 1; k <= 7; k++) { // cross up  \
            i = this.x - k;
            j = this.y - k;
            if (j < 0 || i < 0 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            else if(pieceOnSqr(i, j, this.id)[1]==0){
                this.legal_moves.push(i + '' + j)
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x+k,y
        for (let k = 1; k <= 7; k++) { // cross down /
            i = this.x + k;
            j = this.y - k;
            if (i > 7 || j < 0 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            else if(pieceOnSqr(i, j, this.id)[1]==0){
                this.legal_moves.push(i + '' + j)
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x-k,y
        for (let k = 1; k <= 7; k++) { // cross up /
            i = this.x - k;
            j = this.y + k;
            if (i < 0 || j > 7 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            else if(pieceOnSqr(i, j, this.id)[1]==0){
                this.legal_moves.push(i + '' + j)
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        return this.legal_moves;
    }

}

export class King extends ChessPieces {
    constructor(id, name, color) {
        super(id, name, color)
    }

    legal_moves = []
    legalMove() {
        this.legal_moves = []
        //x,y+k
        var i, j;
        //straight movemen like Rook
        for (let k = 1; k <= 1; k++) { // --->
            i = this.x;
            j = this.y + k;
            if (j > 7 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            this.legal_moves.push(i + '' + j)
            // console.log(i + '' + j);
        }
        //x,y-k
        for (let k = 1; k <= 1; k++) { // <----
            i = this.x;
            j = this.y - k;
            if (j < 0 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x+k,y
        for (let k = 1; k <= 1; k++) { // down
            i = this.x + k;
            j = this.y;
            if (i > 7 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x-k,y
        for (let k = 1; k <= 1; k++) { // up
            i = this.x - k;
            j = this.y;
            if (i < 0 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            this.legal_moves.push(i + '' + j)
        }
        //Cross movement like bishop    
        for (let k = 1; k <= 1; k++) { //  cross down \
            i = this.x + k;
            j = this.y + k;
            if (j > 7 || i > 7 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            this.legal_moves.push(i + '' + j)
            // console.log(i + '' + j);
        }
        //x,y-k
        for (let k = 1; k <= 1; k++) { // cross up  \
            i = this.x - k;
            j = this.y - k;
            if (j < 0 || i < 0 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x+k,y
        for (let k = 1; k <= 1; k++) { // cross down /
            i = this.x + k;
            j = this.y - k;
            if (i > 7 || j < 0 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x-k,y
        for (let k = 1; k <= 1; k++) { // cross up /
            i = this.x - k;
            j = this.y + k;
            if (i < 0 || j > 7 || pieceOnSqr(i, j, this.id)[0]) {
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        // console.log(this.legal_moves)
        return this.legal_moves;
    }
}

export class Queen extends ChessPieces {
    constructor(id, name, color) {
        super(id, name, color)
    }
    legal_moves = []
    legalMove() {
        this.legal_moves = []
        //x,y+k
        var i, j ;
        var result = [];
        //straight movemen like Rook
        for (let k = 1; k <= 7; k++) { // --->
            i = this.x;
            j = this.y + k;
            result = pieceOnSqr(i,j,this.id)
            if (!result[0] && result[1]==0) {
                this.legal_moves.push(i + '' + j)
                break;
            }
            
            if (j > 7 || result[0]) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
                break;
            }
            // console.log(i,j,this.x,this.y)
            this.legal_moves.push(i + '' + j)
            // console.log(i + '' + j);
        }
        //x,y-k
        for (let k = 1; k <= 7; k++) { // <----
            i = this.x;
            j = this.y - k;
            result = pieceOnSqr(i,j,this.id)
            if (!result[0] && result[1]==0) {
                this.legal_moves.push(i + '' + j)
                break;
            }
        
            if (j < 0 || result[0] ) {
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x+k,y
        for (let k = 1; k <= 7; k++) { // down
            i = this.x + k;
            j = this.y;
            result = pieceOnSqr(i,j,this.id)
            if (!result[0] && result[1]==0) {
                this.legal_moves.push(i + '' + j)
                break;
            }
            // console.log(i,j,!result)
            if (!result) {
                // if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                // }
            }
            if (i > 7 || result[0]) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x-k,y
        for (let k = 1; k <= 7; k++) { // up
            i = this.x - k;
            j = this.y;
            result = pieceOnSqr(i,j,this.id)
            if (!result[0] && result[1]==0) {
                this.legal_moves.push(i + '' + j)
                break;
            }
            if (!result) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
            }
            // console.log('result', result)
            if (i < 0 || result[0]) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
                break;
            }
            this.legal_moves.push(i + '' + j)
        }
        //Cross movement like bishop    
        for (let k = 1; k <= 7; k++) { //  cross down \
            i = this.x + k;
            j = this.y + k;
            result = pieceOnSqr(i,j,this.id)
            if (!result[0] && result[1]==0) {
                this.legal_moves.push(i + '' + j)
                break;
            }
            if (!result) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
            }
            if (j > 7 || i > 7 || result[0]) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
                break;
            }
            this.legal_moves.push(i + '' + j)
            // console.log(i + '' + j);
        }
        //x,y-k
        for (let k = 1; k <= 7; k++) { // cross up  \
            i = this.x - k;
            j = this.y - k;
            result = pieceOnSqr(i,j,this.id)
            if (!result[0] && result[1]==0) {
                this.legal_moves.push(i + '' + j)
                break;
            }
            if (!result) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
            }
            if (j < 0 || i < 0 || result[0]) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x+k,y
        for (let k = 1; k <= 7; k++) { // cross down /
            i = this.x + k;
            j = this.y - k;
            result = pieceOnSqr(i,j,this.id)
            if (!result[0] && result[1]==0) {
                this.legal_moves.push(i + '' + j)
                break;
            }
            if (!result) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
            }
            if (i > 7 || j < 0 || result[0]) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        //x-k,y
        for (let k = 1; k <= 7; k++) { // cross up /
            i = this.x - k;
            j = this.y + k;
            result = pieceOnSqr(i,j,this.id)
            if (!result[0] && result[1]==0) {
                this.legal_moves.push(i + '' + j)
                break;
            }
            if (!result) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
            }
            if (i < 0 || j > 7 || result[0]) {
                if (result[1]==0) {
                    this.legal_moves.push(i + '' + j)
                }
                break;
            }
            this.legal_moves.push(i + '' + j);
            // console.log(i + '' + j);
        }
        // console.log(this.legal_moves)
        return this.legal_moves;
    }
}

// export class{
//     Pawns,
//     Bishops,
//     Knights,
//     Rooks,
//     Queen,
//     King,
// }