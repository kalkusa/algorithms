const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

chessBoardPositionsAsIndices = {};

function convertChessboardPositionToMatrixIndices(position) {
  // if (chessBoardPositionsAsIndices[position] !== undefined) {
  //   return chessBoardPositionsAsIndices[position];
  // } else {
  //   chessBoardPositionsAsIndices[position] = {
  //     x: position.charCodeAt(0) - 97,
  //     y: Number(position[1]) - 1,
  //   };
  // }
  return { x: position.charCodeAt(0) - 97, y: Number(position[1]) - 1 };
}

matrixIndicesFromChessboardPositions = {};

function convertMatrixIndicesToChessboardPosition(xyPosition) {
  // if (matrixIndicesFromChessboardPositions[xyPosition] !== undefined) {
  //   return matrixIndicesFromChessboardPositions[xyPosition];
  // } else {
  //   matrixIndicesFromChessboardPositions[xyPosition] =
  //     String.fromCharCode(xyPosition.x + 97) + (xyPosition.y + 1);
  // }
  return String.fromCharCode(xyPosition.x + 97) + (xyPosition.y + 1);
}

function isPositionOutsideOfTheChessBoard(xyPosition) {
  return (
    xyPosition.x < 0 || xyPosition.y < 0 || xyPosition.x > 7 || xyPosition.y > 7
  );
}

let possibleKnightMoves = {};

function getPossibleKnightMoves(currentPosition) {
  if (possibleKnightMoves[currentPosition] !== undefined) {
    // console.log('from memo')
    return possibleKnightMoves[currentPosition];
  }

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

  possibleKnightMoves[currentPosition] = movesWhichAreNotOutsideOfTheChessboard;
  return movesWhichAreNotOutsideOfTheChessboard;
}

function getPositionsFromMovesStack(moves) {
  let positions = {};
  for (let i = 0; i < moves.length; i++) {
    positions[moves[i]] = "bN";
  }
  return positions;
}

var wrongPaths = {};
var result = null;

function play(moves, recursionDepth) {
  if (result) {
    return;
  }
  // if (recursionDepth < 45) {
  //   await sleep(1);
  // }
  recursionDepth++;
  // console.log("Recursion depth: %o", recursionDepth);
  //await sleep(50);

  let currentPosition = moves[moves.length - 1];
  let positions = getPositionsFromMovesStack(moves);

  // console.log("Positions %o", positions);

  // console.log("Move number: %o", moves.length);
  // console.log("Current, last position: %o", currentPosition);
  // console.log("Moves: %o", moves);

  // chessboard.destroy;
  //chessboard = Chessboard("chessboard", positions);
  //chessboard.position(positions, false);

  if (moves.length === 64) {
    //Knights are standing on all fields, success
    // console.log("Result: %o", moves);
    result = true;
    // Object.assign(result, moves);
    return;
  }

  let possibleMoves = getPossibleKnightMoves(moves[moves.length - 1]).filter(
    (possibleMove) => !positions.hasOwnProperty(possibleMove)
  );

  // console.log("Possible moves: %o", possibleMoves);

  // if (possibleMoves.length === 0) {
  //   //Oops, dead end, let's rollback
  //   // console.log("Dead end");
  //   return;
  // }

  for (let i = 0; i < possibleMoves.length; i++) {
    // console.log("Making move");
    moves.push(possibleMoves[i]);
    if (wrongPaths[moves.toString()] !== undefined) {
      //console.log("Memoized path, ommiting...");
      moves.pop();
      //console.log('Wrong paths: %o', Object.keys(wrongPaths))
      continue;
    }
    if (recursionDepth < 37) {
      console.log(
        `Verifying move ${i + 1} of ${
          possibleMoves.length
        }, recursion depth ${recursionDepth}`
      );
    }
    play(moves, recursionDepth);
    if (result) {
      return;
    }
    wrongPaths[moves.toString()] = true;
    moves.pop();
  }
}

const main = async () => {
  let moves = [];
  moves.push("h8");
  //let positions = getPositionsFromMovesStack(moves);
  //let chessboard = Chessboard("chessboard", positions);
  play(moves, 0);

  console.log("Final moves: %o", moves);
  let positions = getPositionsFromMovesStack(moves);
  console.log("Positions: %o", positions);
  await sleep(10);
  let intiial = { h8: "bN" };
  let chessboard = Chessboard("chessboard", intiial);

  for (let i = 0; i <= 64; i++) {
    await sleep(300);
    let movesAtTheMoment = moves.slice(0, i);
    positions = getPositionsFromMovesStack(movesAtTheMoment);
    chessboard.position(positions, true);
  }

  // chessboard = Chessboard("chessboard", positions);
};

main();
