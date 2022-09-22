// Affichage règles et jeu

document.querySelector('#bouton-regle').addEventListener('click', (event) => {
    bouton_regle = document.querySelector('#carte-regle');
    bouton_regle.style.display = 'none';
    jeu = document.querySelector('#jeu');
    jeu.style.display = 'block';
    pseudo = document.querySelector('#pseudo').value ; 
    console.log(pseudo);
    fetch("/api/create/?pseudo=" + pseudo )
        .then(response => response.json())
        .then(data => { 
            fetch("/cookie/?id=" + data.id);
        })
});


function update_score(score) {
    // fait appel au back pui affiche
    score_affichage = document.querySelector('#score-set1');
    texte = 'Score : '+ score.toString()
    score_affichage.innerHTML = texte ;
}

function update_score2(score) {
    // fait appel au back pui affiche
    score_affichage = document.querySelector('#score-set2');
    texte = 'Score : '+ score.toString()
    score_affichage.innerHTML = texte ;
}

compteur = 0;
score1 = 0 ;
score2= 0;

function update_compteur(_compteur){
    compteur_display = document.querySelector('#compteur');
    _compteur = 7 - _compteur 
    compteur_display.innerHTML = 'Nombre de lancer restant(s) : ' + _compteur
}


// Bonton Lancer 
document.querySelector('#lancer1').addEventListener('click', jet)

function jet () {
    fetch ('/set/lancer?compteur=' + compteur)
        .then(response => response.json())
        .then(data => { 
            compteur = data.compteur;
            update_compteur(compteur);
            console.log(data);
            affichage_des(data.set);
            update_score(data.score);
            
            score1 = data.score;
            score_total(score1,score2);
            fetch('/cookie/score/?score=' + (score1+score2))
            check_valide(data.valide);
        })
};


document.querySelector('#lancer2').addEventListener('click',jet2)

function jet2 () {
    fetch ('/set/lancer?compteur=' + compteur)
        .then(response => response.json())
        .then(data => { 
            compteur = data.compteur;
            update_compteur(compteur);
            console.log(data);
            affichage_des2(data.set);
            update_score2(data.score);
            score2= data.score;
            score_total(score1,score2);
            const score_final = score1+score2;
            (async () => {
                await fetch('/cookie/score/?score=' + score_final);
                check_valide(data.valide);
            })()
            

            ;
        })

}

function score_total(score1,score2) {
    res = score1 + score2
    document.querySelector('#score-total').innerHTML = res
}

function affichage_des (set) {
    display_set = document.querySelector('#set-display1');
    texte = '<p id="set-displad">'+ set[0].toString()+set[1].toString()+set[2].toString()+set[3].toString()+ '</p>'
    display_set.innerHTML = texte;
}

function affichage_des2 (set) {
    display_set = document.querySelector('#set-display2');
    texte = '<p id="set-displad">'+ set[0].toString()+set[1].toString()+set[2].toString()+set[3].toString()+ '</p>'
    display_set.innerHTML = texte;
}
// Compteur atteint le maximum

function check_valide(valide) {
     if (!valide) { freeze2(); console.log('check valide')
    }
}


function freeze1() {
    console.log("Freeze");
    bouton = document.querySelector('#lancer1');
    freezer = document.querySelector('#corleone1');
    bouton2 = document.querySelector('#lancer2');
    freezer2 = document.querySelector('#corleone2');
    bouton.style.display = 'none';
    freezer.style.display = 'none';
    bouton2.style.display = '';
    freezer2.style.display = '';
    
}

function freeze2() {
    // Lecture du cookies
    const id  = getCookie(' id');
    const score = getCookie(' score');
    console.log(id);
    console.log(score);
    fetch('/api/update/?id=' + id + '&score=' + score);
    //fetch('/redirect/score');
    window.location.replace("http://127.0.0.1:3000/redirect/score")

    // REDIRECT DE BATARD !!

}

document.querySelector('#corleone1').addEventListener('click',freeze1);
document.querySelector('#corleone2').addEventListener('click',freeze2);



function getCookie(name) {
    var cookie, c;
    cookies = document.cookie.split(';');
    
    for (var i = 0; i < cookies.length; i++) {
        c = cookies[i].split('=');
        if (c[0] == name) {console.log(c[1]);
            return c[1];
        }
    }
    return "";
}