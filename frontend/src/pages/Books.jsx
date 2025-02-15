import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
                console.log(res.data); // ✅ Log actual data instead of the entire response
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8800/books/${id}`);
          window.location.reload()
        } catch (err) {
          console.log(err);
        }
      };
// const handleUpdate= async(id)=>{
//     try{
//         await axios.delete("https://localhost:8800/book"+id)
//         window.location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }
    return (
        <div>
            <h1>Lama Books Shop</h1>
            <div className="books">
                {books.map((book)=> (  // ✅ Corrected map function
                    <div className="book" key={book.id}>  {/* ✅ Added unique key */}
                        {book.cover && <img src={book.cover} alt={book.title} />}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>{book.price}</span>
                        <button className='delete' onClick={()=>handleDelete(book.id)}>Delete</button>
                        <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Add new Book</Link></button>
        </div>
    );
};

export default Books;
