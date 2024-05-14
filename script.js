var oyunAlani = document.getElementById("oyunAlani");
var oyuncu = document.getElementById("oyuncu");
var skorElement = document.getElementById("skor");
var skor = 0;

var engelRenkleri = ["kirmizi", "yesil", "mavi"];
var engelAraligi = [1000, 1500, 2000];
var hareketHizi = 5;
var engeller = [];

var ziplama = false;

function randomEngelOlustur() {
    var randomRenk = engelRenkleri[Math.floor(Math.random() * engelRenkleri.length)];
    var engel = document.createElement("div");
    engel.classList.add("engel", randomRenk);
    engel.style.left = oyunAlani.clientWidth + "px";
    oyunAlani.appendChild(engel);
    engeller.push(engel);

    var randomAralik = engelAraligi[Math.floor(Math.random() * engelAraligi.length)];
    setTimeout(randomEngelOlustur, randomAralik);
}

function hareketEt() {
    requestAnimationFrame(hareketEt);

    var hareketYonu = 0;

    // Dokunmatik olayları dinle
    oyunAlani.addEventListener("touchstart", function(event) {
        if (!ziplama) {
            ziplama = true;
            oyuncu.style.animation = "ziplamaAnimasyon 0.5s ease-out";
            setTimeout(function() {
                oyuncu.style.animation = "none";
                ziplama = false;
            }, 300);
        }
    });

    // Boşluk tuşunu dinle
    window.addEventListener("keydown", function(event) {
        if (event.code === "Space" && !ziplama) {
            ziplama = true;
            oyuncu.style.animation = "ziplamaAnimasyon 0.5s ease-out";
            setTimeout(function() {
                oyuncu.style.animation = "none";
                ziplama = false;
            }, 300);
        }
    });

    if (hareketYonu === 1) {
        oyuncu.style.left = parseInt(oyuncu.style.left) + hareketHizi + "px";
    } else if (hareketYonu === -1) {
        oyuncu.style.left = parseInt(oyuncu.style.left) - hareketHizi + "px";
    }

    var oyuncuRect = oyuncu.getBoundingClientRect();
    for (var i = 0; i < engeller.length; i++) {
        var engel = engeller[i];
        var engelRect = engel.getBoundingClientRect();
        if (oyuncuRect.left < engelRect.right &&
            oyuncuRect.right > engelRect.left &&
            oyuncuRect.top < engelRect.bottom &&
            oyuncuRect.bottom > engelRect.top) {
            gameOver();
        }
    }
}

function gameOver() {
    alert("Oyun bitti! Skor: " + skor);
    window.location.reload();
}

requestAnimationFrame(hareketEt);

randomEngelOlustur();

setInterval(function() {
    skor++;
    skorElement.textContent = "Skor: " + skor;
}, 1000);
