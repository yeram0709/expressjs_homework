const express = require("express");

const app = express();

app.set("port", 3000);

//export한 router 가져오기
const indexRouter = require("./router");
const testRouter = require("./router/test");

//router 연결
app.use("/", indexRouter);

//test 연결
app.use("/test",testRouter);

  app.listen(app.get("port"), () => {
    console.log(`Server On Port ${app.get("port")}`);
});