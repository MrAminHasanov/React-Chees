export const enum figuresName { pawn = "Pawn", knight = "Knight", rook = "Rook", bishop = "Bishop", queen = "Queen", king = "King" };
export const enum sides { white = true, black = false };
export const figures = {
    "whitePawn": {
        type: figuresName.pawn,
        side: sides.white
    }, "whiteKnight": {
        type: figuresName.knight,
        side: sides.white
    }, "whiteRook": {
        type: figuresName.rook,
        side: sides.white
    }, "whiteKing": {
        type: figuresName.king,
        side: sides.white
    }, "whiteQueen": {
        type: figuresName.queen,
        side: sides.white
    }, "whiteBishop": {
        type: figuresName.bishop,
        side: sides.white
    }, "blackPawn": {
        type: figuresName.pawn,
        side: sides.black
    }, "blackKnight": {
        type: figuresName.knight,
        side: sides.black
    }, "blackRook": {
        type: figuresName.rook,
        side: sides.black
    }, "blackKing": {
        type: figuresName.king,
        side: sides.black
    }, "blackQueen": {
        type: figuresName.queen,
        side: sides.black
    }, "blackBishop": {
        type: figuresName.bishop,
        side: sides.black
    }, "emptySquare": {}
}