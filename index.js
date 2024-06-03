import express from "express";

const app=express();

app.listen(8000, ()=>{
    console.log("8000번 서버 접속")
})

// 기본 주소 요청
// localhost:8000
app.get("/", ()=>{
    console.log("기본주소 요청");
})

