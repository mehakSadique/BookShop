import express from "express";
import mysql from "mysql2";
import cors from "cors"


const app= express()

const db=mysql.createConnection({
    host:"sql5.freesqldatabase.com",
    user:"sql5762743",
    password:"c8JVPLmTkI",
    database:"sql5762743"
})
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("hello this is the beackend!")
});
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES (?)";
    const values=[
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
];
    db.query(q,[values], (err, data) => {
        if (err) return res.json({ error: err.message }); // Provide proper error message
        return res.json("book has been created successfully");
    });
})
app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json({ error: err.message }); // Provide proper error message
        return res.json(data);
    });
})
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.listen(8800, ()=>{
    console.log("Connected to backend!1")
})