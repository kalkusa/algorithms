const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const convertChessboardPositionToMatrixIndices = (position) => {
  return { x: position.charCodeAt(0) - 97, y: Number(position[1]) - 1 };
};

const convertMatrixIndicesToChessboardPosition = (xyPosition) => {
  return String.fromCharCode(xyPosition.x + 97) + (xyPosition.y + 1);
};

const isPositionOutsideOfTheChessBoard = (xyPosition) => {
  return (
    xyPosition.x < 0 || xyPosition.y < 0 || xyPosition.x > 7 || xyPosition.y > 7
  );
};

const getPossibleKnightMoves = (currentPosition) => {
  let currentXYPosition = convertChessboardPositionToMatrixIndices(
    currentPosition
  );
  let possibleMoves = [];

  //Up two fields, left one field
  possibleMoves.push({
    x: currentXYPosition.x - 1,
    y: currentXYPosition.y + 2,
  });
  //Up two fields, right one field
  possibleMoves.push({
    x: currentXYPosition.x + 1,
    y: currentXYPosition.y + 2,
  });
  //Up one field, left two fields
  possibleMoves.push({
    x: currentXYPosition.x - 2,
    y: currentXYPosition.y + 1,
  });
  //Up one field, right two fields
  possibleMoves.push({
    x: currentXYPosition.x + 2,
    y: currentXYPosition.y + 1,
  });
  //Down one field, left two fields
  possibleMoves.push({
    x: currentXYPosition.x - 2,
    y: currentXYPosition.y - 1,
  });
  //Down one field, right two fields
  possibleMoves.push({
    x: currentXYPosition.x + 2,
    y: currentXYPosition.y - 1,
  });
  //Down two fields, left one field
  possibleMoves.push({
    x: currentXYPosition.x - 1,
    y: currentXYPosition.y - 2,
  });
  //Down two fields, right one field
  possibleMoves.push({
    x: currentXYPosition.x + 1,
    y: currentXYPosition.y - 2,
  });

  let movesWhichAreNotOutsideOfTheChessboard = possibleMoves
    .filter((move) => !isPositionOutsideOfTheChessBoard(move))
    .map((move) => convertMatrixIndicesToChessboardPosition(move));

  delete possibleMoves;
  delete currentXYPosition;
  return movesWhichAreNotOutsideOfTheChessboard;
};

const getPositionsFromMovesStack = (moves) => {
  let positions = {};
  for (let i = 0; i < moves.length; i++) {
    positions[moves[i]] = "bN";
  }
  return positions;
};

const play = async (chessboard, moves, recursionDepth) => {
  recursionDepth++;
  // console.log("Recursion depth: %o", recursionDepth);
  await sleep(50);

  // let currentPosition = moves[moves.length - 1];
  let positions = getPositionsFromMovesStack(moves);

  // console.log("Move number: %o", moves.length);
  // console.log("Current, last position: %o", currentPosition);
  // console.log("Moves: %o", moves);

  chessboard.destroy;
  chessboard = Chessboard("chessboard", positions);
  //chessboard.position(positions, false);

  if (moves.length === 64) {
    //Knights are standing on all fields, success
    return;
  }

  let possibleMoves = getPossibleKnightMoves(moves[moves.length - 1]).filter(
    (possibleMove) => !positions.hasOwnProperty(possibleMove)
  );

  delete positions;
  // console.log("Possible moves: %o", possibleMoves);

  // if (possibleMoves.length === 0) {
  //   //Oops, dead end, let's rollback
  //   // console.log("Dead end");
  //   return;
  // }

  for (let i = 0; i < possibleMoves.length; i++) {
    // console.log("Making move");
    moves.push(possibleMoves[i]);
    if (recursionDepth < 45) {
      console.log(
        `Verifying move ${i + 1} of ${
          possibleMoves.length
        }, recursion depth ${recursionDepth}`
      );
    }
    await play(chessboard, moves, recursionDepth);
    moves.pop();
  }

  delete possibleMoves;

  return;
};

const main = async () => {
  let moves = [];
  moves.push("h8");
  let positions = getPositionsFromMovesStack(moves);
  let chessboard = Chessboard("chessboard", positions);
  await play(chessboard, moves, 0);
  console.log("Final moves: %o", moves);
};

main();
