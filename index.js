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

// 핵심 삽입
app.post("/save",(req)=>{
    const {name, capital, population }=req.body
    console.log(`name:${name}, capital:${capital}, population:${population}`);
    const sql="insert into db_sample.nations_table(name,capital,population) value(?,?,?)"
    db.query(sql,[name,capital,population],(err,results,fields)=>{
        console.log("err",err);
        console.log("results",results);
        console.log("fields",fields);
    })
})

//조회
app.get("/list",(req,res)=>{
    const sql="select * from db_sample.nations_table"
    db.query(sql,(err,results,fields)=>{
        console.log("err",err);
        console.log("results",results);
        // console.log("fields",fields)
        res.json(results)
    })
})

app.get("/:id",(req,res)=>{
    console.log(req.params.id);
    const id=req.params.id;
    const sql="select * from db_sample.nations_table where id=?"
    db.query(sql,[id],(err,results,fields)=>{
        console.log("err",err)
        console.log("results",results);
        if(results.length==0){
            // 조회없음
            res.status(404).send("조회된 결과 없음")
        } else{
            // 조회됨
            res.status(200).json(results)
        }
    })
})

app.put("/:id",(req,res)=>{
    const {id,name,capital,population}=req.body;  
    console.log(`id:${id}, name:${name}, capital:${capital}, population:${population}`);
    const sql="update db_sample.nations_table set population=? where id=?"
    db.query(sql,[population,id],(err,results,fields)=>{
        console.log("err",err)
        console.log("results",results);
    })
})

app.delete("/:id",(req,res)=>{
    const id=req.params.id;
    const sql="delete from db_sample.nations_table where id=?"
    db.query(sql,[id],(err,results)=>{
        console.log("err",err)
        console.log("results",results);
    })
})


