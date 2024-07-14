import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

const Ressource = () => {
    const { id } = useParams();  
    const [ressource, setRessource] = useState({});

    useEffect(() => {
        // Si les data sont déjà stockées dans le localStorage, on les récupère
       
        const storedData = JSON.parse(localStorage.getItem('FetchedData'));
        if (storedData) {
           
            const foundRessource = storedData.find(item => item.ID === parseInt(id));
            if (foundRessource) {
                
                setRessource(foundRessource);
            }
        }
    }, [id]);

    return (
        <div className="container">
            <p>Information concernant le court de tennis : {ressource.NAME}</p> 
            
            <div className="container">
               
                ID: {ressource.ID}
                <br />
                Nom: {ressource.NAME}
                <br />
                Adresse: {ressource.ADDRESS}
                <br />
                Nombre de courts: {ressource.COURTS}
                <br />
                Condition: {ressource.CONDITION}
                <br />
                Lumières: {ressource.LIGHTS}
                <br />
                Surface: {ressource.SURFACE}
                <br />
    
                <Link className="detail-link" to={'/reservation/' + ressource.ID}>
                    <button className="button">Reservation</button>
                </Link>
                
            </div>
        </div>
    );
    
};

export default Ressource;
