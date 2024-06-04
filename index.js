import express from "express";
import mysql from "mysql";

const app=express();

app.use(express.json());

// db접속 정보
const db=mysql.createConnection({
    host:"127.0.0.1",
    user:"admin",
    password:"1234",
    port:"3306",
    database:"db_sample"
})

db.connect(err=>{
    console.log("db 연결 성공");
    console.log("err",err)
})
app.listen(8000, ()=>{
    console.log("8000번 서버 접속")
})

// 기본 주소 요청
// localhost:8000
app.get("/", ()=>{
    console.log("기본주소 요청");
})

app.get("/hello", ()=>{
    console.log("hello 주소 요청");
})

app.get("/qs",(req)=>{
    // console.log(req.query);
    console.log(req.query.p1);
    console.log(req.query.p2)
})

app.post("/post-req",(req)=>{
    console.log(req.body.name);
    const {name,age}=req.body;
    console.log(`name:${name}, age:${age}`)
})