import ClassicKnight from './ClassicKnight/ClassicKnight';
import ClassicRook from './ClassicRook/ClassicRook';
import ClassicBishop from './ClassicBishop/ClassicBishop';
import ClassicQueen from "./ClassicQueen/ClassicQueen";
import ClassicKing from './ClassicKing/ClassicKing';
import ClassicPawn from "./ClassicPawn/ClassicPawn";

const figures = {
  "Knight": <ClassicKnight />,
  "Pawn": <ClassicPawn />,
  "Rook": <ClassicRook />,
  "Bishop": <ClassicBishop />,
  "Queen": <ClassicQueen />,
  "King": <ClassicKing />,
}

function ClassicFigures({ figureType }) {
  return (
    figures[figureType]
  )
}

export default ClassicFigures