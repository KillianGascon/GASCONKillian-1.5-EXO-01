// data
const calendrierMatchs = [
    {
        id: 'LFL_KC_SLY',
        jeu: 'League of Legends',
        competition: 'LFL',
        equipeA: 'Karmine Corp',
        equipeB: 'Solary',
        probabiliteA: 0.65, // 65% chance for KC
        statut: 'À venir'
    },
    {
        id: 'VCT_VIT_M8',
        jeu: 'Valorant',
        competition: 'VCT EMEA',
        equipeA: 'Team Vitality',
        equipeB: 'Mandatory',
        probabiliteA: 0.55, // 55% chance for Vitality
        statut: 'À venir'
    },
    {
        id: 'LFL_GO_BDS',
        jeu: 'League of Legends',
        competition: 'LFL',
        equipeA: 'Gentle Mates',
        equipeB: 'BDS Academy',
        probabiliteA: 0.48, // 48% chance for M8, so BDS is favorite
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

// Match class
// id, jeu, competition, equipeA, equipeB, probabiliteA, and statut
// Add a getFavori() method to this class. This method takes no parameters and must return the name of
// the team with the highest probability of winning. If probabiliteA is greater than 0.5,
// it returns equipeA, otherwise it returns equipeB.

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

// Create a Plateforme class.
// Its constructor must accept a name and initialize a matchs property with an empty array.
// Implement the chargerMatchs(matchsACcharger) method. This method takes as parameter an array of objects
// (like calendrierMatchs), and for each object, it must create a new instance of the Match class and
// add it to the this.matchs array.

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

    // Implement the afficherCalendrier() method. Using a forEach loop, this method must display
    // in the console the summary of each match in a readable format. For example:
    // [LFL] Karmine Corp vs. Solary - Game: League of Legends

    afficherCalendrier() {
        this.matchs.forEach(match => {
            console.log(`[${match.competition}] ${match.equipeA} vs. ${match.equipeB} - Game: ${match.jeu}`);
        })
    }

    // Now, add methods to the Plateforme class to allow data analysis.
    //
    // getMatchsParJeu(jeu):
    //
    // Use the .filter() method on the this.matchs array.
    // This method must return a new array containing only the matches corresponding to the game passed as a parameter (e.g. "Valorant").
    // getMatchsRisques():
    //
    // Use the .filter() method.
    // This method must return matches considered "close", i.e. those where the probability of victory for the favorite is low. Return matches where probabiliteA is between 0.45 and 0.55.
    // getMatchById(id):
    //
    // Use the .find() method.
    // This method must find and return the instance of the match corresponding to the provided ID.

    getMatchsParJeu(jeu) {
        return this.matchs.filter(match => match.jeu === jeu);
    }

    getMatchsRisques() {
        return this.matchs.filter(match => match.probabiliteA >= 0.45 && match.probabiliteA <= 0.55);
    }

    getMatchById(id) {
        return this.matchs.find(match => match.id === id);
    }

    // If you have finished and want to go further, try to implement these features:
    //
    // Add a simulerResultat(idMatch) method to Plateforme. It finds the match, uses Math.random() and
    // the probabilities to designate a winner, then changes the match status to "Terminé"
    // by adding a resultat property with the winner's name.

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

    // Add a getStatsEquipe(nomEquipe) method. It must return an object containing the number of matches played by
    // the team and its win rate (based on simulated matches).
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

// At the end of your file, write the script that will use your classes to make the system work.
//
// Create an instance of your Plateforme named esportVision.
// Use chargerMatchs() to add the calendrierMatchs data.
// Call afficherCalendrier() to check that everything is loaded.
// Test each of your analysis methods (getMatchsParJeu, getMatchsRisques, getMatchById) and
// display their results in the console with clear console.log to see what each method returns.

const esportVision = new Plateforme('Esport Vision');
esportVision.chargerMatchs(calendrierMatchs);
esportVision.afficherCalendrier();

console.log("-------------------------------------------------------------------------------------------")
console.log("Valorant matches:", esportVision.getMatchsParJeu('Valorant'));
console.log("Close matches:", esportVision.getMatchsRisques());
console.log("Match by ID (LFL_KC_SLY):", esportVision.getMatchById('LFL_KC_SLY'));
console.log("Match by ID (VCT_VIT_M8):", esportVision.getMatchById('VCT_VIT_M8'));
console.log("Match by ID (LFL_GO_BDS):", esportVision.getMatchById('LFL_GO_BDS'));
console.log("Match by ID (LFL_KC_M8):", esportVision.getMatchById('LFL_KC_M8'));
console.log("Match by ID (INEXISTANT):", esportVision.getMatchById('INEXISTANT')); // Should return undefined
// Test the getFavori() method for each match
console.log("-------------------------------------------------------------------------------------------")
esportVision.matchs.forEach(match => {
    console.log(`The favorite for the match ${match.equipeA} vs ${match.equipeB} is: ${match.getFavori()}`);
})

console.log("-------------------------------------------------------------------------------------------")
// Test the simulerResultat method for each match
esportVision.matchs.forEach(match => {
    esportVision.simulerResultat(match.id);
});
// Display results after simulation
esportVision.matchs.forEach(match => {
    console.log(`Match: ${match.equipeA} vs ${match.equipeB}, Status: ${match.statut}, Result: ${match.resultat}`);
});

// Test the getStatsEquipe method for a team
console.log("-------------------------------------------------------------------------------------------")
console.log("Stats for team 'Karmine Corp':", esportVision.getStatsEquipe('Karmine Corp'));
console.log("Stats for team 'Solary':", esportVision.getStatsEquipe('Solary'));
console.log("Stats for team 'Team Vitality':", esportVision.getStatsEquipe('Team Vitality'));
console.log("Stats for team 'Mandatory':", esportVision.getStatsEquipe('Mandatory'));
console.log("Stats for team 'Gentle Mates':", esportVision.getStatsEquipe('Gentle Mates'));
console.log("Stats for team 'BDS Academy':", esportVision.getStatsEquipe('BDS Academy'));
console.log("Stats for team 'Inexistante':", esportVision.getStatsEquipe('Inexistante'));