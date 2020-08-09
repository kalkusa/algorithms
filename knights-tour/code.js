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

const makeAMove = (currentPosition) => {};

const play = async (
  currentPosition,
  previousPosition,
  positions,
  chessboard,
  moveNumber
) => {
  moveNumber++;
  console.log("Move number: %o", moveNumber);
  await sleep(1000);
  // console.log("Current position: %o", currentPosition);
  // console.log("Position: %o", position);
  console.log(
    "Object.keys(position).length: %o",
    Object.keys(positions).length
  );
  if (Object.keys(positions).length === 64) {
    //Knights are standing on all fields, success
    return;
  }

  let possibleMoves = getPossibleKnightMoves(
    Object.keys(currentPosition)[0]
  ).filter((possibleMove) => !positions.hasOwnProperty(possibleMove));
  console.log("Possible moves: %o", possibleMoves);

  if (possibleMoves.length === 0) {
    console.log("Dead end, rollback last move");
    // delete positions[Object.keys(currentPosition)[0]];
    return;
  }

  for (let i = 0; i < possibleMoves.length; i++) {
    //make a move
    console.log("Making move");
    previousPosition = currentPosition;
    currentPosition = {};
    currentPosition[possibleMoves[i]] = "bN";
    positions[possibleMoves[i]] = "bN";
    chessboard = Chessboard("chessboard", positions);
    await play(
      currentPosition,
      previousPosition,
      positions,
      chessboard,
      moveNumber
    );
  }
};

const main = async () => {
  let currentPosition = { a8: "bN" };
  let previousPosition = undefined;
  let positions = { a8: "bN" };
  let chessboard = Chessboard("chessboard", currentPosition);
  await play(currentPosition, previousPosition, positions, chessboard, 0);
};

main();
