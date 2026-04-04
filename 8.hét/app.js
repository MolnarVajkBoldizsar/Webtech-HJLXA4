const GH_ACCESS_TOKEN = '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';

function searchUsers() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if (query.trim() === "") {
        alert("Hiba: Kérlek, írj be egy keresőkifejezést!");
        return;
    }

    resultsDiv.innerHTML = "Betöltés...";

    fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: { 'Authorization': `token ${GH_ACCESS_TOKEN}` }
    })
    .then(res => {
        if (!res.ok) throw new Error("Hiba történt a lekérdezés során.");
        return res.json();
    })
    .then(data => {
        resultsDiv.innerHTML = ""; 
        
        data.items.forEach(user => {
            // MÓDOSÍTÁS: user.html?id= felé irányítjuk a linket
            const userCard = `
                <div class="col">
                    <div class="card" style="text-align: center; padding: 15px; border: 1px solid #ddd; margin: 10px; border-radius: 8px;">
                        <img src="${user.avatar_url}" alt="${user.login}" style="width: 100px; border-radius: 50%;">
                        <h3>${user.login}</h3>
                        <a href="user.html?id=${user.login}" class="btn btn-primary">Adatlap megtekintése</a>
                    </div>
                </div>
            `;
            resultsDiv.insertAdjacentHTML('beforeend', userCard);
        });

        if (data.items.length === 0) {
            resultsDiv.innerHTML = "<p>Nincs találat.</p>";
        }
    })
    .catch(err => {
        console.error(err);
        alert("Hiba történt a keresés közben!");
    });
}

// ÚJ FUNKCIÓ: Ez kezeli a user.html oldal betöltését
function loadUserDetails() {
    // Csak akkor fut le, ha a user.html oldalon vagyunk (van display div)
    const userContainer = document.getElementById('user-profile-display');
    if (!userContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('id');

    if (!username) {
        userContainer.innerHTML = "Nincs kiválasztva felhasználó.";
        return;
    }

    fetch(`https://api.github.com/users/${username}`, {
        headers: { 'Authorization': `token ${GH_ACCESS_TOKEN}` }
    })
    .then(res => res.json())
    .then(user => {
        let html = `
            <div class="profile-card">
                <img src="${user.avatar_url}" class="avatar">
                ${user.name ? `<h2>${user.name}</h2>` : `<h2>${user.login}</h2>`}
                ${user.bio ? `<p class="bio">${user.bio}</p>` : ''}
                ${user.location ? `<p>📍 ${user.location}</p>` : ''}
                ${user.blog ? `<p>🔗 <a href="${user.blog}" target="_blank">${user.blog}</a></p>` : ''}
                <div class="stats">
                    <div class="stat"><b>${user.public_repos}</b> Repos</div>
                    <div class="stat"><b>${user.followers}</b> Followers</div>
                </div>
                <br>
                <a href="user-search.html">Vissza a kereséshez</a>
            </div>
        `;
        userContainer.innerHTML = html;
    })
    .catch(err => {
        userContainer.innerHTML = "Hiba az adatok betöltésekor.";
    });
}

function loadNavigation() {
    fetch('./navbar.html')
        .then(res => res.text())
        .then(navbarHtml => {
            document.body.insertAdjacentHTML('afterbegin', navbarHtml);
        })
        .catch(err => console.log('Navbar nincs megadva, átugorva.'));
}

loadNavigation();
loadUserDetails(); 