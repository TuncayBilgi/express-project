function generation_des() {
    let set = [];
    for (let i=0; i<4; i++) {
        De = Math.floor(Math.random() * 6 ) + 1 ;
        set.push( De );
    }
    return set

}

function calc_score(set) {
    res = 0
    for (var i = 0; i < set.length; i++){
        if (set[i] < 6) {
            res = res + set[i];
        }
    }
    return res
}

function compteur_plus (nmbr) {
    nmbr = parseInt(nmbr, 10);
    if (nmbr > 5) {
        return {valide : false , compteur : 7 }
    }
    else {
        nmbr = nmbr + 1 
        return {valide : true , compteur : nmbr }
    }
}

function info_lancer (nmbr) {
    _set = generation_des();
    _score = calc_score(_set);
    _compteur = compteur_plus(nmbr);
    return { set : _set, score: _score , compteur : _compteur['compteur'], valide : _compteur['valide'] }
}

module.exports = {
   infos : info_lancer ,
  }