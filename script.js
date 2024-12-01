 // Exibe o texto do título com animação quando a página é carregada
 document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("animated-title");
    const text = "Pesquisa de Países"; // Texto do título
    title.textContent = text; // Insere o texto no elemento H1
});



function clicar() {
    // Busca os dados da API
    fetch("https://restcountries.com/v3.1/all")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`); // Garante tratamento de erros HTTP
            }
            return response.json(); // Converte para JSON
        })
        .then(data => {
            const buscar = document.getElementById("pes").value.trim().toLowerCase(); // Obtém o valor do input e normaliza para lowercase
            const pais = data.find(country => country.name.common.toLowerCase() === buscar); // Busca o país no array

            if (pais) {
                const mostrar = document.querySelector(".mostrarpaises");
                const idiomas = pais.languages ? Object.values(pais.languages).join(", ") : "Não disponível";
                const moedas = pais.currencies
                    ? Object.values(pais.currencies)
                          .map(currency => `${currency.name} (${currency.symbol})`)
                          .join(", ")
                    : "Não disponível";
            
                mostrar.innerHTML = `
                    <div class="card">
                        <img class="flag" src="${pais.flags.png || pais.flags.svg}" alt="Bandeira de ${pais.name.common}">
                        <div class="card-content">
                            <h2>${pais.name.common}</h2>
                            <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "Sem capital"}</p>
                            <p><strong>População:</strong> ${pais.population.toLocaleString()}</p>
                            <p><strong>Área:</strong> ${pais.area.toLocaleString()} km²</p>
                            <p><strong>Continente:</strong> ${pais.continents ? pais.continents[0] : "Desconhecido"}</p>
                            <p><strong>Subregião:</strong> ${pais.subregion || "Não disponível"}</p>
                            <p><strong>Idiomas:</strong> ${idiomas}</p>
                            <p><strong>Moedas:</strong> ${moedas}</p>
                            <p><strong>Fusos horários:</strong> ${pais.timezones.join(", ")}</p>
                            <p><strong>Código de Chamada:</strong> +${pais.idd.root}${pais.idd.suffixes ? pais.idd.suffixes[0] : ""}</p>
                        </div>
                    </div>
                `;
            } else {
                document.querySelector(".mostrarpaises").innerHTML = "<p>País não encontrado</p>";
            }
            
        })
        .catch(error => console.error("Erro ao buscar país:", error)); // Trata erros da API
}
