const GH_ACCESS_TOKEN = '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';

function searchUsers() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    // 3. pont: Üres keresőmező ellenőrzése
    if (query.trim() === "") {
        alert("Hiba: Kérlek, írj be egy keresőkifejezést!");
        return;
    }

    // Tisztítjuk az előző találatokat
    resultsDiv.innerHTML = "Betöltés...";

    // 4. pont: Lekérdezés a GitHub API-ról
    fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
            'Authorization': `token ${GH_ACCESS_TOKEN}`
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Hiba történt a lekérdezés során.");
        return res.json();
    })
    .then(data => {
        resultsDiv.innerHTML = ""; // Betöltés felirat törlése
        
        // 5. pont: Találatok megjelenítése
        data.items.forEach(user => {
            const userCard = `
                <div class="col">
                    <div class="card" style="text-align: center;">
                        <img src="${user.avatar_url}" alt="${user.login}" style="width: 100px; border-radius: 50%;">
                        <h3>${user.login}</h3>
                        <a href="${user.html_url}" target="_blank" class="btn btn-secondary">Profil megtekintése</a>
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

function loadNavigation() {
    fetch('./navbar.html')
        .then(res => res.text())
        .then(navbarHtml => {
            document.body.insertAdjacentHTML('afterbegin', navbarHtml);
        })
        .catch(err => {
            console.error(err);
            alert('Hiba a menürendszer betöltésekor.');
        });
}

loadNavigation();