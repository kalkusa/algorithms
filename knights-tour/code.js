const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  let position = { a8: "bN" };
  let chessboard = Chessboard("chessboard", position);
  await sleep(1000);

  position = { b6: "bN" };
  chessboard = Chessboard("chessboard", position);
  await sleep(1000);
  
  position = { c4: "bN" };
  chessboard = Chessboard("chessboard", position);
};

main();
