import React, { useState, useEffect } from 'react';

function ChefsComponent() {
    const [chefs, setChefs] = useState([]);
    const [recettes , setRecettes] = useState([]);
    const [restaurants , setRestaurants] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/chefs');
                const responses = await fetch('http://localhost:3000/recettes/all');
                const responsee = await fetch('http://localhost:3000/restaurants/all');
                const data = await response.json();
                const date = await responses.json();
                const dats = await responsee.json();
                setChefs(data);
                setRecettes(date);
                setRestaurants(dats);
            } catch (error) {
                console.error('Error fetching chefs:', error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div>
            <h1>Chefs List</h1>
            <ul>
                {chefs.map(chef => (
                    <li key={chef.id}>
                        {chef.name} - {chef.specialty}
                    </li>
                ))}
            </ul>
            <h1>les recettes list</h1>
            <ul>
                {recettes.map(recettes => (
                    <li key={recettes.id}>
                        {recettes.name}
                    </li>
                ))}
            </ul>
            <h1>les restaurants list</h1>
            <ul>
                {restaurants.map(restaurants => (
                    <li key={restaurants.id}>
                        {restaurants.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChefsComponent;
