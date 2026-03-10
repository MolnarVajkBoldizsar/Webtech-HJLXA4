const celSzam = Math.floor(Math.random() * 1000001);
const maxProba = 20;
let tippekSzama = 0;
let eltalalta = false;

while (tippekSzama < maxProba && !eltalalta) {
    tippekSzama++;
    
    let bemenet = prompt(`${tippekSzama}. tipp: Adj meg egy számot 0 és 1 000 000 között!`);
    let tipp = parseInt(bemenet);

    if (isNaN(tipp)) {
        alert("Kérlek, érvényes számot adj meg!");
        tippekSzama--; 
        continue;
    }

    if (tipp === celSzam) {
        alert(`Gratulálok, ${tippekSzama} lépésből eltaláltad!`);
        eltalalta = true;
    } else if (tipp > celSzam) {
        alert(`${tippekSzama}. tipp nem talált: A megoldás kisebb.`);
    } else {
        alert(`${tippekSzama}. tipp nem talált: A megoldás nagyobb.`);
    }
}

if (!eltalalta) {
    alert(`Sajnos ez most nem sikerült! A megoldás: ${celSzam}`);
}