import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [skip, setSkip] = useState(0);
  const limit = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const respuesta = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
      const datos = await respuesta.json();
    setUsers((prevUsers) => [...prevUsers, ...datos.users]);
    setSkip((prevSkip) => prevSkip + limit);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <header>
        <h1>User Profiles</h1>
      </header>
      <main>
        <div className="user-list-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.image} alt={user.firstName} />
              <p>{user.firstName} {user.lastName}</p>
            </div>
          ))}
        </div>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      </main>
    </div>
  );
}

export default App;
