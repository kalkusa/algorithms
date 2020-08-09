const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const convertChessboardPositionToMatrixIndices = (position) => {
  let x = position.charCodeAt(0) - 97; //a, b, c starts at char 97
  let y = Number(position[1]) - 1;

  return { x: x, y: y };
};

const convertMatrixIndicesToChessboardPosition = (xyPosition) => {
  let x = String.fromCharCode(xyPosition.x + 97);
  let y = xyPosition.y + 1;
  return x + y;
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

  return movesWhichAreNotOutsideOfTheChessboard;
};

const main = async () => {
  let currentPosition = { a8: "bN" };
  let position = currentPosition;
  let chessboard = Chessboard("chessboard", currentPosition);

  for (let i = 0; i < 50; i++) {
    await sleep(300);
    console.log("Current position: %o", currentPosition);
    let possibleMoves = getPossibleKnightMoves(
      Object.keys(currentPosition)[0]
    ).filter((possibleMove) => !position.hasOwnProperty(possibleMove));
    console.log("Possible moves: %o", possibleMoves);
    if (possibleMoves.length > 0) {
      position[possibleMoves[0]] = "bN";
      console.log("Position: %o", position);
      // chessboard.position(position, true);
      chessboard = Chessboard("chessboard", position);
      currentPosition = {};
      currentPosition[possibleMoves[0]] = "bN";
    }
  }
};

main();
