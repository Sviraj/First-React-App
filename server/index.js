const express=require("express");
const app=express();
const bodyParser =require("body-parser");
const mysql=require("mysql");
const cors= require("cors");

const db=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: "crud_contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get("/api/get",(req,res) => {
//     const sqlGet ="SELECT * FROM contact_db";
//     db.query(sqlGet, (error, result) =>{
//         res.send(result);
//     });
// });

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.error("Error fetching data:", error);
            return res.status(500).send({ message: "Internal Server Error", error });
        }
        res.status(200).send(result);
    });
});

app.post("/api/post", (req, res) =>{
    const {name, email, contact }=req.body;
    const sqlInsert=
    `INSERT INTO contact_db (name,email,contact) VALUES (?, ?, ?)`;
    db.query(sqlInsert,[name,email,contact],(error,result) => {
        if (error){
            console.log(error);
        }
        res.send.apply(result);
    });

}); 

app.delete("/api/remove/:id", (req, res) =>{
    const { id }=req.params;
    const sqlRemove=
    `DELETE FROM contact_db WHERE id = ?`;
    db.query(sqlRemove,[id],(error,result) => {
        if (error){
            console.log(error);
        }
    });

});

app.get("/api/get/:id", (req, res) => {
    const { id } =req.params;
    const sqlGet= "SELECT * FROM contact_db WHERE id= ?";
    db.query(sqlGet, [id] , (error, result) =>{
        if (error){
            console.log(error);
        }
        res.send(result);
       

    });

});

// router.get('/:id',(req,res)=>{
//     const sqlInsert=`SELECT * FROM contactdb WHERE id='${req.params.id}'`;
//     db.query(sqlInsert,(error,result)=>{
//         if(result!=null){
//             res.json({state:true,data:result});
//             return;
//         }
//         res.json({state:false,err:error});
//     })
// });


app.put("/api/update/:id",(req,res) => {
    const {id} =req.params;
    const {name, email, contact}=req.body;
    const sqlUpdate ="UPDATE contact_db SET name = ? ,email = ? ,contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error){
            console.log(error);
        }
        res.send(result);
         
    });
});




app.get("/", (req,res) =>{
    // const sqlInsert= 
    // "INSERT INTO contact_db (name,email,contact) VALUES ('Johrt','johrt@gmail.com',9999456)";
    // db.query(sqlInsert, (err, result) =>{
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
    
});

app.listen(5000 , () =>{
    console.log("Server is running on port 5000");

})

// const router = require('express').Router();
// const db = require('../server');

// router.post('/add',(req,res)=>{
//     const {name, email, contact} = req.body;
//     const sqlInsert=`INSERT INTO contactdb (name, email, contact) VALUES ('${name}','${email}','${contact}')`;
//     db.query(sqlInsert,(error,result)=>{
//         if(result!=null){
//             res.json({state:true,data:result});
//             return;
//         }
//         res.json({state:false,err:error});
//     })
// });

// router.get('/',(req,res)=>{
//     const sqlInsert="SELECT * FROM contactdb";
//     db.query(sqlInsert,(error,result)=>{
//         if(result!=null){
//             res.json({state:true,data:result});
//             return;
//         }
//         res.json({state:false,err:error});
//     })
// });


// router.get('/:id',(req,res)=>{
//     const sqlInsert=`SELECT * FROM contactdb WHERE id='${req.params.id}'`;
//     db.query(sqlInsert,(error,result)=>{
//         if(result!=null){
//             res.json({state:true,data:result});
//             return;
//         }
//         res.json({state:false,err:error});
//     })
// });

// router.put('/update/:id',(req,res)=>{
//     const {name, email, contact} = req.body;
//     const sqlInsert=`UPDATE contactdb SET name='${name}',email='${email}',contact='${contact}' WHERE id='${req.params.id}'`;
//     db.query(sqlInsert,(error,result)=>{
//         if(result!=null){
//             res.json({state:true,data:result});
//             return;
//         }
//         res.json({state:false,err:error});
//     })
// });

// router.delete('/delete/:id',(req,res)=>{
//     const sqlInsert=`DELETE FROM contactdb WHERE id='${req.params.id}'`;
//     db.query(sqlInsert,(error,result)=>{
//         if(result!=null){
//             res.json({state:true,data:result});
//             return;
//         }
//         res.json({state:false,err:error});
//     })
// });

// module.exports = router;
