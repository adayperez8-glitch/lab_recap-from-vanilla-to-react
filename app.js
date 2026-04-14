const contenedor = document.getElementById("user-list-container");
const boton = document.getElementById("load-more-btn");

async function fetchUsers() {
  boton.disabled = true;

  try {
    const respuesta = await fetch("https://dummyjson.com/users");
    const datos = await respuesta.json();

    datos.users.forEach((usuario) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "user-card";

      tarjeta.innerHTML = `
        <img src="${usuario.image}" alt="${usuario.firstName}" />
        <p>${usuario.firstName} ${usuario.lastName}</p>
      `;

      contenedor.appendChild(tarjeta);
    });

  } catch (error) {
    console.error("Error cargando usuarios:", error);
  } finally {
    boton.disabled = false;
  }
}

boton.addEventListener("click", fetchUsers);
fetchUsers();