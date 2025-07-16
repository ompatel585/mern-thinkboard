import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';


const HomePage = () => {
  
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchNotes = async() =>{
      try {
        const res = await api.get('/notes');
        
        console.log(res.data);
        setNotes(res.data);
        
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error)
        if(error.response?.status === 429) {
         
        }else{
          toast.error("Failed to fetch notes")
        }
      } finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[])
  return (
    
    <div className=' min-h-screen'>
      <Navbar />

      

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

        {notes.length===0  && <NotesNotFound />}

        {notes.length >0 &&  &&(
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map(note =>(
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
