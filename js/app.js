const url = "https://pokeapi.co";
const app = document.getElementById("app");

let nextURL = `${url}/api/v2/pokemon`;
let crrURl = `${url}/api/v2/pokemon`;
let prvURL = `${url}/api/v2/pokemon`;
let lastPokeURL = `${url}/api/v2/pokemon`;


async function init(nextUrl = `${url}/api/v2/pokemon`) {
  const data = await (
    await fetch(nextUrl, {
      method: "GET",
    })
  ).json();
  nextURL = data.next;
  crrURl = nextUrl;
  prvURL = data.previous;

  let html = `
    
    <h1>INFO</h1>
    <br/>
    <button onclick="init('${data.previous}')"> previous </button>
    <button onclick="init('${data.next}')"> next </button>
    <br/>
    <br/>
    <br/>
    <table>
      <tr>
        <th>id</th>
        <th>name</th>
      </tr>
      ${data.results
      .map(
        (v, i) =>
          `  <tr class="point" onclick = "getPoke('${v.url}')">
        <td>${v.url.split("/").at(-2)}</td>
        <td>${v.name}</td>
      </tr>`
      )
      .join(" ")}
      
    </table>
    `;

  app.innerHTML = html;
  resetStyles()
}

init();

/**
 *
 * @param {string} url
 */
async function getPoke(url) {
  lastPokeURL = url;
  const data = await (
    await fetch(url, {
      method: "GET",
    })
  ).json();
  let html = `
<h1>INFO</h1>
<button onclick="init('${crrURl}')">back</button>

<br/>
<br/>
<br/>
<br/>

<h1>Image</h1>
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id
    }.svg" />
<br/>
<br/>

    <table>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>height</th>
        <th>weight</th>
        <th>order</th>
      </tr>
      <tr>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.height}</td>
        <td>${data.weight}</td>
        <td>${data.order}</td>
      </tr>
    </table>
    <br/>
    <h1>abilities</h1>
    <br/>

    <table>
      <tr>
        <th>Index</th>
        <th>name</th>
        <th>url</th>
      </tr>
      ${data.abilities
      .map(
        (value, index) => `<tr>
        <td>${index + 1}</td>
      <td>${value.ability.name}</td>
      <td>${value.ability.url}</td>
    </tr>`
      )
      .join(" ")}
    </table>

    <h1>moves</h1>
    <br/>

    <table>
      <tr>
        <th>Index</th>
        <th>name</th>
        <th>url</th>
      </tr>
      ${data.moves
      .map(
        (value, index) => `<tr onclick= "PokeInfo('${url}')" class="point">
        <td>${index + 1}</td>
      <td>${value.move.name}</td>
      <td>${value.move.url}</td>
    </tr>`
      )
      .join(" ")}
    </table>


    <h1>Types</h1>
    <br/>

    <table>
      <tr>
        <th>Index</th>
        <th>name</th>
        <th>url</th>
      </tr>
      ${data.types
      .map(
        (value, index) => `<tr>
        <td>${index + 1}</td>
      <td>${value.type.name}</td>
      <td>${value.type.url}</td>
    </tr>`
      )
      .join(" ")}
    </table>
`;
  app.innerHTML = html;
  console.log(data);
  resetStyles()
}

async function PokeInfo(url) {
  const data = await (
    await fetch(url, {
      method: "GET",
    })
  ).json();
  let html = `
    <img  class="pokeImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id
    }.svg" />

      ${data.stats.map((value) => `
        <p class="pokePara">${value.stat.name}: ${value.base_stat}</p>
    `).join("")}
        <button onclick="getPoke('${lastPokeURL}')" class="btn">Back to Pokémon</button>
    `
  app.innerHTML = html;
  app.style = `
    width: 100%;
  min-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  `
  }

  function resetStyles(){
    app.style = '';
  }


