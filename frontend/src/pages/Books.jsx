import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("https://bookshop-36qd.onrender.com/books");
                console.log("API Response:", res.data); // Log response
                setBooks(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.log("Fetch error:", err);
            }
        };

        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://bookshop-36qd.onrender.com/books/${id}`);
            setBooks(books.filter(book => book.id !== id)); // Update state instead of reload
        } catch (err) {
            console.log("Delete error:", err);
        }
    };

    return (
        <div>
            <h1>Lama Books Shop</h1>
            <div className="books">
                {books.length > 0 ? books.map((book) => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt={book.title} />}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>{book.price}</span>
                        <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                )) : <p>No books available.</p>}
            </div>
            <button><Link to="/add">Add new Book</Link></button>
        </div>
    );
};

export default Books;
