import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';





const App = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch les data depuis l'API

    useEffect(() => {
        const fetchData = async () => {


            // Si les data sont déjà stockées dans le localStorage, on les récupère
            const storedData = localStorage.getItem('FetchedData');
            if (storedData) {
                setData(JSON.parse(storedData));
                return;
            }
            
            
            try {
                // Sinon, on les fetch depuis l'API
                const response = await fetch(
                    'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Recreation_WebMercator/MapServer/0/query?where=1%3D1&outFields=ID,WARD,NAME,ADDRESS,COURTS,CONDITION,LIGHTS,SURFACE&outSR=4326&f=json'
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonData = await response.json();
            
                // On ne garde que les attributs
                const attributesOnly = jsonData.features.map(feature => feature.attributes);
                setData(attributesOnly);
                
                // On stocke les data dans le localStorage
                localStorage.setItem('FetchedData', JSON.stringify(attributesOnly));
                

                // On stocke les data dans le localStorage
                localStorage.setItem('fetchedData', JSON.stringify(jsonData.features));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Gestion de la recherche
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // On filtre les data en fonction de la recherche
    const filteredData = data.filter(item => {
        return item.NAME.toLowerCase().includes(searchTerm.toLowerCase());
    }
    );

    

    return (
        <>
            <div className="container">
                <h1 className="title">Liste des courts de tennis</h1>
    
                <input className="search-input"
                    type="text"
                    placeholder="Rechercher un court de tennis"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
    
                <ul>
                    {filteredData.map(item => (
                        <li key={item.ID}>
                            <strong>Court de tennis n° {item.ID}:</strong>
                            <Link className="detail-link" to={'/detail/'+ item.ID}>
                                <button className="button">Information</button>
                            </Link>
                            <br/>
                            Name : { item.NAME}
                            <br/>
                            Address : { item.ADDRESS}
                            <br/>
                            Nombre de court de tennis : { item.COURTS}
                            <br/>
                            Etat du court : { item.CONDITION}
                            <br/>
                            Lumière : { item.LIGHTS}
                            <br/>
                            Type de surface : { item.SURFACE}
                            <br/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default App;
