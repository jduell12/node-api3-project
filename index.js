const server = require("./server");

const port = process.env.PORT;

server.listen(PORT, () => {
  console.log("Server started on port ", port);
});
