import blackBishoop from "./blackBishoop.svg";
import blackKing from "./blackKing.svg";
import blackKnight from "./blackKnight.svg";
import blackPawn from "./blackPawn.svg";
import blackQueen from "./blackQueen.svg";
import blackRook from "./blackRook.svg";
import whitePawn from "./whitePawn.svg";
import whiteKing from "./whiteKing.svg";
import whiteRook from "./whiteRook.svg";
import whiteBishoop from "./whiteBishoop.svg";
import whiteQueen from "./whiteQueen.svg";
import whiteKnight from "./whiteKnight.svg";

const rpgFiguresSvg = {
    "Knight": {
        "true": whiteKnight,
        "false": blackKnight
    },
    "Pawn": {
        "true": whitePawn,
        "false": blackPawn
    },
    "Rook": {
        "true": whiteRook,
        "false": blackRook
    },
    "Bishop": {
        "true": whiteBishoop,
        "false": blackBishoop
    },
    "Queen": {
        "true": whiteQueen,
        "false": blackQueen
    },
    "King": {
        "true": whiteKing,
        "false": blackKing
    },
    "undefined": {
    }
}

export default rpgFiguresSvg;