// datas
const calendrierMatchs = [
    {
        id: 'LFL_KC_SLY',
        jeu: 'League of Legends',
        competition: 'LFL',
        equipeA: 'Karmine Corp',
        equipeB: 'Solary',
        probabiliteA: 0.65, // 65% de chance pour KC
        statut: 'À venir'
    },
    {
        id: 'VCT_VIT_M8',
        jeu: 'Valorant',
        competition: 'VCT EMEA',
        equipeA: 'Team Vitality',
        equipeB: 'Mandatory',
        probabiliteA: 0.55, // 55% de chance pour Vitality
        statut: 'À venir'
    },
    {
        id: 'LFL_GO_BDS',
        jeu: 'League of Legends',
        competition: 'LFL',
        equipeA: 'Gentle Mates',
        equipeB: 'BDS Academy',
        probabiliteA: 0.48, // 48% de chance pour M8, donc BDS est favori
        statut: 'À venir'
    },
    {
        id: 'LFL_KC_M8',
        jeu: 'Valorant',
        competition: 'VCT EMEA',
        equipeA: 'Karmine Corp',
        equipeB: 'Mandatory',
        probabiliteA: 0.52,
        statut: 'À venir'
    }
];

// Class Match
// id, jeu, competition, equipeA, equipeB, probabiliteA, et statut
// Ajoutez une méthode getFavori() à cette classe. Cette méthode ne prend aucun paramètre et doit retourner le nom de
// l'équipe ayant la plus haute probabilité de victoire. Si probabiliteA est supérieure à 0.5,
// elle retourne equipeA, sinon elle retourne equipeB.

class Match {
    constructor(id, jeu, competition, equipeA, equipeB, probabiliteA, statut) {
        this.id = id;
        this.jeu = jeu;
        this.competition = competition;
        this.equipeA = equipeA;
        this.equipeB = equipeB;
        this.probabiliteA = probabiliteA;
        this.statut = statut;
        this.resultat = null;
    }

    getFavori() {
        if (this.probabiliteA > 0.5) {
            return this.equipeA;
        } else {
            return this.equipeB;
        }
    }

}
// Créez une classe Plateforme.

// Son constructor doit accepter un nom et initialiser une propriété matchs avec un tableau vide.
// Implémentez la méthode chargerMatchs(matchsACcharger). Cette méthode prend en paramètre un tableau d'objets
// (comme calendrierMatchs), et pour chaque objet, elle doit créer une nouvelle instance de la classe Match et
// l'ajouter au tableau this.matchs.


class Plateforme {
    constructor(nom) {
        this.nom = nom;
        this.matchs = [];
    }

    chargerMatchs(matchsACcharger) {
        matchsACcharger.forEach(matchData => {
            const match = new Match(
                matchData.id,
                matchData.jeu,
                matchData.competition,
                matchData.equipeA,
                matchData.equipeB,
                matchData.probabiliteA,
                matchData.statut,
                matchData.resultat
            );
            this.matchs.push(match);
        })
    }

    // Implémentez la méthode afficherCalendrier(). En utilisant une boucle (forEach), cette méthode doit afficher
    // dans la console le résumé de chaque match sous un format lisible. Par exemple :
    // [LFL] Karmine Corp vs. Solary - Jeu: League of Legends

    afficherCalendrier() {
        this.matchs.forEach(match => {
            console.log(`[${match.competition}] ${match.equipeA} vs. ${match.equipeB} - Jeu: ${match.jeu}`);
        })
    }
    // Maintenant, ajoutez des méthodes à la classe Plateforme pour permettre l'analyse des données.
//
// getMatchsParJeu(jeu) :
//
// Utilisez la méthode .filter() sur le tableau this.matchs.
// Cette méthode doit retourner un nouveau tableau contenant uniquement les matchs correspondant au jeu passé en paramètre (ex: "Valorant").
// getMatchsRisques() :
//
// Utilisez la méthode .filter().
// Cette méthode doit retourner les matchs considérés comme "serrés", c'est-à-dire ceux où la probabilité de victoire du favori est faible. Retournez les matchs où probabiliteA est comprise entre 0.45 et 0.55.
// getMatchById(id) :
//
// Utilisez la méthode .find().
// Cette méthode doit retrouver et retourner l'instance du match correspondant à l'ID fourni.
    getMatchsParJeu(jeu) {
        return this.matchs.filter(match => match.jeu === jeu);
    }

    getMatchsRisques() {
        return this.matchs.filter(match => match.probabiliteA >= 0.45 && match.probabiliteA <= 0.55);
    }

    getMatchById(id) {
        return this.matchs.find(match => match.id === id);
    }

    //Si vous avez terminé et que vous souhaitez aller plus loin, essayez d'implémenter ces fonctionnalités :
//
// Ajoutez une méthode simulerResultat(idMatch) à la Plateforme. Elle trouve le match, utilise Math.random() et
// les probabilités pour désigner un vainqueur, puis change le statut du match en "Terminé"
// en y ajoutant une propriété resultat avec le nom du gagnant.

    simulerResultat(idMatch) {
        const match = this.getMatchById(idMatch);
        if (match && match.statut === 'À venir') {
            const randomValue = Math.random();
            if (randomValue < match.probabiliteA) {
                match.statut = 'Terminé';
                match.resultat = match.equipeA;
            } else {
                match.statut = 'Terminé';
                match.resultat = match.equipeB;
            }
        }
    }

// Ajoutez une méthode getStatsEquipe(nomEquipe). Elle doit retourner un objet contenant le nombre de matchs joués par
// l'équipe et son taux de victoire (basé sur les matchs simulés).
    getStatsEquipe(nomEquipe) {
        const matchsJoues = this.matchs.filter(match =>
            (match.equipeA === nomEquipe || match.equipeB === nomEquipe) && match.statut === 'Terminé'
        );
        const victoires = matchsJoues.filter(match =>
            (match.equipeA === nomEquipe && match.resultat === match.equipeA) ||
            (match.equipeB === nomEquipe && match.resultat === match.equipeB)
        ).length;
        const tauxVictoire = matchsJoues.length > 0 ? (victoires / matchsJoues.length) * 100 : 0;
        return {
            matchsJoues: matchsJoues.length,
            tauxVictoire: tauxVictoire.toFixed(2) + '%'
        };
    }
}

// À la fin de votre fichier, écrivez le script qui utilisera vos classes pour faire fonctionner le système.
//
// Créez une instance de votre Plateforme nommée esportVision.
// Utilisez chargerMatchs() pour y ajouter les données de calendrierMatchs.
// Appelez afficherCalendrier() pour vérifier que tout est bien chargé.
// Testez chacune de vos méthodes d'analyse (getMatchsParJeu, getMatchsRisques, getMatchById) et
// affichez leurs résultats dans la console avec des console.log clairs pour bien voir ce que chaque méthode retourne.

const esportVision = new Plateforme('Esport Vision');
esportVision.chargerMatchs(calendrierMatchs);
esportVision.afficherCalendrier();

console.log("-------------------------------------------------------------------------------------------")
console.log("Matchs de Valorant :", esportVision.getMatchsParJeu('Valorant'));
console.log("Matchs Risqués :", esportVision.getMatchsRisques());
console.log("Match par ID (LFL_KC_SLY) :", esportVision.getMatchById('LFL_KC_SLY'));
console.log("Match par ID (VCT_VIT_M8) :", esportVision.getMatchById('VCT_VIT_M8'));
console.log("Match par ID (LFL_GO_BDS) :", esportVision.getMatchById('LFL_GO_BDS'));
console.log("Match par ID (LFL_KC_M8) :", esportVision.getMatchById('LFL_KC_M8'));
console.log("Match par ID (INEXISTANT) :", esportVision.getMatchById('INEXISTANT')); // Devrait retourner undefined
// Test de la méthode getFavori() pour chaque match
console.log("-------------------------------------------------------------------------------------------")
esportVision.matchs.forEach(match => {
    console.log(`Le favori du match ${match.equipeA} vs ${match.equipeB} est : ${match.getFavori()}`);
})

console.log("-------------------------------------------------------------------------------------------")
// test de la méthode simulerResultat pour chaque match
esportVision.matchs.forEach(match => {
    esportVision.simulerResultat(match.id);
});
// Affichage des résultats après simulation
esportVision.matchs.forEach(match => {
    console.log(`Match: ${match.equipeA} vs ${match.equipeB}, Statut: ${match.statut}, Résultat: ${match.resultat}`);
});

// Test de la méthode getStatsEquipe pour une équipe
console.log("-------------------------------------------------------------------------------------------")
console.log("Statistiques de l'équipe 'Karmine Corp' :", esportVision.getStatsEquipe('Karmine Corp'));
console.log("Statistiques de l'équipe 'Solary' :", esportVision.getStatsEquipe('Solary'));
console.log("Statistiques de l'équipe 'Team Vitality' :", esportVision.getStatsEquipe('Team Vitality'));
console.log("Statistiques de l'équipe 'Mandatory' :", esportVision.getStatsEquipe('Mandatory'));
console.log("Statistiques de l'équipe 'Gentle Mates' :", esportVision.getStatsEquipe('Gentle Mates'));
console.log("Statistiques de l'équipe 'BDS Academy' :", esportVision.getStatsEquipe('BDS Academy'));
console.log("Statistiques de l'équipe 'Inexistante' :", esportVision.getStatsEquipe('Inexistante'));