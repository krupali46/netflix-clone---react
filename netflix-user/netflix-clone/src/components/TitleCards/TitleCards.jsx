import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const TitleCards = ({ title }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
        const db = getFirestore();
        const contactsCollection = collection(db, 'contacts');
        const contactSnapshot = await getDocs(contactsCollection);
        const contactsList = contactSnapshot.docs.map(doc => doc.data());

        setApiData(contactsList);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        setApiData([]);
      }
    };

    fetchMovies();

    const currentCardsRef = cardsRef.current;
    if (currentCardsRef) {
      currentCardsRef.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (currentCardsRef) {
        currentCardsRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='title-cards my-2'>
      <h2>{title || 'Featured Contacts'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <div className="card-image img-fluid" style={{ backgroundImage: `url(${card.imgUrl || 'default_image_url'})` }} />
            <div className="card-details">
              <h3>Title : {card.title}</h3>
              <p>Author : {card.author}</p>
              <p>Description : {card.description}</p>
              <p>Year : {card.year}</p>
              
            </div>
          </Link>
        )) : <p>No data available</p>}
      </div>
    </div>
  );
};

export default TitleCards;
