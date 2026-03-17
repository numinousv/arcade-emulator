import { useState, useEffect } from 'react';

interface Player {
  id: number;
  name: string;
  username: string;
}

export const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setPlayers(data.slice(0, 5));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-white">Laddar topplista...</p>;
  }

  return (
    <div className="p-4 border border-purple-500 rounded-md bg-black/50">
      <h3 className="text-xl text-purple-400 mb-2">Top Spelare</h3>
      <ul className="text-white">
        {players.map(player => (
          <li key={player.id} className="py-1">
            <span className="font-bold">{player.username}</span> - {player.name}
          </li>
        ))}
      </ul>
    </div>
  );
};