import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;

  const fetchPokemons = async () => {
    const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
    const pokeJson = await pokeData.json();
    setPokemons(pokeJson.results);
  };

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  return (
    <>
      {pokemons.length > 0 && (
        <div className="poke__grid">
          {pokemons
            .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
            .map((val, index) => {
              return (
                <div key={val.name}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      index + 1 + page * itemsPerPage
                    }.png`}
                    alt={val.name}
                  />
                  <p>{val.name}</p>
                </div>
              );
            })}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => goToPage(page - 1)} disabled={page === 0}>
          -
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={index === page  ? 'active' : ''}
          >
            
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages - 1}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App;
