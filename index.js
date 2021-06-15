require("./global.js");
require("./db/mongoose");
var app = express();

app.use(express.json());

const userRouter = require("./src/routes/userRouter");
const taskRouter = require("./src/routes/taskRouter");
app.use(userRouter);
app.use(taskRouter);

app.listen(3000, function (req, res) {
  console.log("Server starte on port 3000");
});
