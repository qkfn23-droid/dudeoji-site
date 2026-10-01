// ============================================================
// VEDIC ASTROLOGY ENGINE
// ============================================================
var isEasy = false;
if (!window.vedicMode) window.vedicMode = 'easy';
var _lastCalcData = null;
function recalcMode() {
    if (!_lastCalcData) return;
    var d = _lastCalcData;
    renderInterpretation(d.positions, d.lagnaSign, d.moonPos);
    renderPlanetHouse(d.positions, d.lagnaSign);
    renderDignity(d.positions, d.lagnaSign);
    renderEducation(d.positions, d.lagnaSign);
    renderChildren(d.positions, d.lagnaSign);
    renderForeign(d.positions, d.lagnaSign);
    renderLucky(d.lagnaSign, d.moonPos);
    renderRemedy(d.positions, d.lagnaSign);
    renderNakshatra(d.moonPos);
    renderDasha(d.moonNakshatra, d.utcDate, d.moonPos ? d.moonPos.sidereal : 0);
    renderD9Chart(d.positions, d.lagnaSign, d.lagnaSidereal);
    renderDivisionalChart(d.positions, d.lagnaSidereal, 10, 'd10Chart', 'd10InterpWrap', 'D10', 'Dashamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 7, 'd7Chart', 'd7InterpWrap', 'D7', 'Saptamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 12, 'd12Chart', 'd12InterpWrap', 'D12', 'Dwadashamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 60, 'd60Chart', 'd60InterpWrap', 'D60', 'Shashtiamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 2, 'd2Chart', 'd2InterpWrap', 'D2', 'Hora');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 3, 'd3Chart', 'd3InterpWrap', 'D3', 'Drekkana');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 4, 'd4Chart', 'd4InterpWrap', 'D4', 'Chaturthamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 16, 'd16Chart', 'd16InterpWrap', 'D16', 'Shodashamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 20, 'd20Chart', 'd20InterpWrap', 'D20', 'Vimshamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 24, 'd24Chart', 'd24InterpWrap', 'D24', 'Chaturvimshamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 27, 'd27Chart', 'd27InterpWrap', 'D27', 'Saptavimshamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 30, 'd30Chart', 'd30InterpWrap', 'D30', 'Trimshamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 40, 'd40Chart', 'd40InterpWrap', 'D40', 'Khavedamsha');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 45, 'd45Chart', 'd45InterpWrap', 'D45', 'Akshavedamsha');
}
function updateCatHeaders() {
    var e = window.vedicMode === 'easy';
    var ids = {
        catGuide: e ? 'Glossaire' : 'Guide du débutant en astrologie védique',
        catBasic: e ? 'Mes positions planétaires' : 'Carte de base — Positions planétaires & Thème natal',
        catDasha: e ? 'Mes périodes de vie' : 'Dasha — Analyse des périodes de vie',
        catInterp: e ? 'Ma lecture — Personnalité·Richesse·Carrière·Santé' : 'Interprétation — Personnalité·Richesse·Carrière·Santé·Yoga',
        catMarriage: e ? 'Détails de mon partenaire' : 'Mariage & Partenaire — D9 Navamsha',
        catCareer: e ? 'Ma carrière·Richesse' : 'Carrière & Richesse — D10·D2·D4',
        catFamily: e ? 'Ma famille' : 'Famille — D7·D3·D12·D40·D45',
        catSpirit: e ? 'Spiritualité·Éducation·Santé' : 'Spiritualité·Éducation·Santé — D20·D24·D27·D16',
        catWarn: e ? 'Précautions de santé' : 'Précautions — D30 Maladie·Étranger',
        catKarma: e ? 'Karma des vies passées' : 'Karma — D60 Vies passées·Karma'
    };
    for (var id in ids) { var el = document.getElementById(id); if (el) el.textContent = ids[id]; }

    var secs = {
        secPlanetHouse: e ? 'Comment chaque planète vous affecte' : 'Analyse planète-en-maison',
        secDignity: e ? 'Vos forces et faiblesses' : 'Dignité planétaire (Exaltation·Débilité·Domicile)',
        secLucky: e ? 'Info chance' : 'Informations de chance',
        secRemedy: e ? 'Façons de renforcer votre chance' : 'Remèdes & Renforcement',
        secD10: e ? 'Détails de carrière' : 'D10 Dashamsha (Carrière)',
        secD2: e ? 'Détails de richesse' : 'D2 Hora (Richesse)',
        secD4: e ? 'Propriétés & Immobilier' : 'D4 Chaturthamsha (Propriété)',
        secD7: e ? 'Enfants' : 'D7 Saptamsha (Enfants)',
        secD3: e ? 'Frères/Sœurs & Courage' : 'D3 Drekkana (Frères/Sœurs)',
        secD12: e ? 'Parents' : 'D12 Dwadashamsha (Parents)',
        secD40: e ? 'Héritage maternel' : 'D40 Khavedamsha (Maternel)',
        secD45: e ? 'Héritage paternel' : 'D45 Akshavedamsha (Paternel)',
        secD24: e ? 'Éducation' : 'D24 Chaturvimshamsha (Éducation)',
        secD20: e ? 'Spiritualité' : 'D20 Vimshamsha (Spiritualité)',
        secD27: e ? 'Force physique' : 'D27 Saptavimshamsha (Force)',
        secD16: e ? 'Véhicules & Confort' : 'D16 Shodashamsha (Véhicules)',
        secD30: e ? 'Détails précautions santé' : 'D30 Trimshamsha (Maladie)',
        secForeign: e ? 'Étranger & Immigration' : 'Étranger & Immigration (9e·12e Maison)'
    };
    for (var sid in secs) { var sel = document.getElementById(sid); if (sel) sel.textContent = secs[sid]; }
}
function renderEasyMode(positions, lagnaSign, moonPos) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    var html = '';
    // Personality
    var personality = ['Orienté action ! Décisions rapides avec des qualités de leadership. Aime les nouveaux défis.','Aime la stabilité. Apprécie le confort et la beauté. Une fois décidé, va jusqu\'au bout.','Infiniment curieux ! Grand communicateur et multi-talentueux.','Chaleureux et émotionnel. Chérit la famille et lit bien les gens.','Leader né ! Grande présence avec un talent créatif.','Orienté détails et analytique. Cherche la perfection et prend soin de sa santé.','Cherche l\'harmonie. Raffiné, charmant, avec un excellent sens artistique.','A de la profondeur. Forte intuition qui voit la vérité.','Esprit libre ! Aime voyager et apprendre, très positif.','Ambitieux. Patient et plus attrayant avec l\'âge.','Unique. Pense différemment de tout le monde, innovant.','Profondément sensible. Forte intuition attirée par l\'art et la spiritualité.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">👤 Ma personnalité</div><div class="interp-text">' + personality + '</div></div>';

    // Emotions
    if (moonPos) {
        var emotion = ['Une passion ardente brûle en vous. Les émotions montent vite et redescendent vite. En cas de stress, bougez votre corps. L\'exercice et les activités en plein air marchent le mieux.','Émotionnellement très stable. N\'aime pas les changements soudains, trouve la sécurité dans le familier. Bonne nourriture, musique et nature guérissent votre âme.','Traite les émotions rationnellement. Parler aide à organiser les sentiments. Curieux de beaucoup de choses à la fois et ne supporte pas l\'ennui.','Extrêmement sensible. Absorbe les émotions des autres comme une éponge. La maison est votre espace sûr avec un lien fort avec la mère.','Expression émotionnelle dramatique et passionnée. A profondément besoin d\'amour et de reconnaissance. Les activités créatives sont votre médecine émotionnelle.','Tend à analyser et organiser les émotions. S\'inquiète beaucoup mais excellent en solutions pratiques. Les routines quotidiennes apportent la stabilité émotionnelle.','Trouve l\'équilibre émotionnel dans les relations. Se sent seul(e) seul(e), se stabilise avec un partenaire ou des amis proches. L\'art et la beauté apportent la paix.','Les émotions sont aussi profondes et intenses que l\'océan. Aime profondément et n\'oublie jamais la trahison. Intuition incroyablement forte.','Émotionnellement lumineux et optimiste. Aime la liberté et déteste les contraintes. Voyager est le meilleur remède émotionnel.','Ne montre pas facilement ses émotions. Fort sens des responsabilités. Devient plus ouvert émotionnellement avec l\'âge.','Schémas émotionnels uniques et imprévisibles. Aime de manières non conventionnelles. Trouve l\'épanouissement émotionnel dans les causes sociales.','Extrêmement intuitif et spirituel. Les rêves sont vivides et parfois prophétiques. Art, méditation et eau apportent la paix.'][moonPos.sign];
        html += '<div class="interp-card"><div class="interp-title">🌙 Mon style émotionnel</div><div class="interp-text">' + emotion + '</div></div>';
    }

    // Wealth
    var wealth = ['Type autodidacte. Style d\'investissement agressif, mieux adapté au travail indépendant. Peut gagner vite mais attention aux investissements hâtifs.','Accumule la richesse régulièrement. Revenus probables de l\'immobilier, art, alimentation. L\'équilibre des dépenses est la clé.','Gagne par les capacités intellectuelles. Revenus de l\'écriture, éducation, informatique, marketing. Plusieurs sources de revenus conviennent bien.','La richesse vient par la maison et la famille. Peut hériter de la mère ou gagner par l\'immobilier. Attention aux dépenses émotionnelles.','Gagne par le leadership et l\'autorité. La richesse suit les positions élevées. Lié au gouvernement et à l\'or.','Gagne par l\'analyse et les compétences professionnelles. Revenus stables de la médecine, comptabilité, service.','Gagne par les partenariats. Meilleure fortune avec les autres. Revenus du droit, diplomatie, mode, art.','Accumule par les ressources des autres — héritage, assurance, investissements. Peut protéger la richesse en crise.','La fortune suit votre richesse. Revenus de l\'éducation, étranger, philosophie. La chance inattendue apporte la richesse.','Accumule lentement mais sûrement. Difficultés financières au début mais richesse stable après la cinquantaine.','Gagne par la technologie, innovation, réseaux sociaux. Méthodes de revenus non conventionnelles.','Gagne par l\'art ou les activités spirituelles. Connexions de richesse étrangère. La richesse spirituelle attire paradoxalement la richesse.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">💰 Ma richesse</div><div class="interp-text">' + wealth + '</div></div>';

    // Spouse
    var spouse = ['Votre partenaire est énergique et indépendant. Actif et direct, passionné par son travail. Pas du type à suivre en silence — un partenaire qui défie ensemble.','Votre partenaire est beau et sensuel. Apprécie les belles choses, stable et loyal. Peut avoir du talent en cuisine ou art.','Votre partenaire est éloquent et spirituel. La grande conversation est le plus grand charme. Un partenaire intellectuel et polyvalent.','Votre partenaire est chaleureux et orienté famille. Excellentes capacités de soins. Être ensemble donne le sentiment d\'être chez soi.','Votre partenaire est charismatique et digne. Peut occuper une position socialement importante. Haute estime de soi mais également généreux.','Votre partenaire est méticuleux et pratique. Intéressé par la santé et le bien-être. Un type attentionné aux détails.','Votre partenaire est charmant et raffiné. Diplomatique avec un bon sens de l\'équilibre, excellent goût artistique.','Votre partenaire est intense et mystérieux. Émotions profondes — une fois engagé, va jusqu\'au bout. Attraction intense et prédestinée.','Votre partenaire est libre d\'esprit et optimiste. Peut être d\'une autre culture ou lié à l\'étranger. Philosophique et aventurier.','Votre partenaire est sérieux et ambitieux. Fort sens des responsabilités, probablement socialement réussi. Le mariage peut venir tard mais dure longtemps.','Votre partenaire est unique et indépendant. Peut se rencontrer de manières non conventionnelles. Intellectuel avec une pensée innovante.','Votre partenaire est spirituel et intuitif. Lié à un artiste ou praticien spirituel. Donne un sentiment rêveur et romantique.'][(lagnaSign+6)%12];
    // 7 house 행성 추가 정보
    var h7p = positions.filter(function(p){return houseOf(p.sign)===7;});
    var spouseExtra = '';
    h7p.forEach(function(p) {
        var desc = {Sun:'Un partenaire de haut statut social.',Moon:'Un partenaire emotionnel et attentionne.',Mars:'Passionne mais disputes possibles. Partenaire fort.',Mercury:'Un partenaire intellectuel avec grande conversation.',Jupiter:'Un partenaire sage et moral ! Meilleure fortune matrimoniale.',Venus:'Un partenaire tres attrayant et aimant.',Saturn:'Mariage tardif mais relation durable. Difference d\'age possible.',Rahu:'Mariage non conventionnel. Partenaire etranger possible.',Ketu:'Connexion de vies passees. Partenaire avec fort lien spirituel.'};
        if (desc[p.id]) spouseExtra += '<br>✦ ' + desc[p.id];
    });
    html += '<div class="interp-card"><div class="interp-title">💍 Mon partenaire</div><div class="interp-text">' + spouse + spouseExtra + '</div></div>';

    // Career
    var career = ['Carrières de leadership. Militaire, police, sport, chirurgie, gestion d\'entreprise. Le travail indépendant convient bien.','Finance, alimentation, immobilier, mode, art. Excelle dans les environnements sensuels et stables.','Carrières de communication et intellectuelles. Médias, écriture, éducation, informatique, marketing.','Professions de soins. Médecine, soins infirmiers, hôtellerie, cuisine, conseil.','Carrières de scène. Politique, divertissement, gestion, gouvernement. Positions créatives et autoritaires.','Carrières d\'analyse et de précision. Médecine, comptabilité, conseil, gestion de santé.','Carrières d\'harmonie et de beauté. Droit, diplomatie, mode, design intérieur, conseil.','Carrières d\'investigation profonde. Recherche, assurance, médecine, psychologie, impôts.','Carrières d\'apprentissage et d\'exploration. Éducation, droit, religion, édition, voyage.','Carrières de système et d\'organisation. Gestion, fonction publique, architecture. Succès lent mais certain.','Carrières d\'innovation et de technologie. Informatique, science, aviation, travail social.','Carrières d\'art et de spiritualité. Art, cinéma, musique, médecine, étranger, ONG.'][(lagnaSign+9)%12];
    html += '<div class="interp-card"><div class="interp-title">💼 Ma carrière</div><div class="interp-text">' + career + '</div></div>';

    // Health
    var health = ['Tête et visage sont des points faibles. Maux de tête et fièvres fréquents. Exercice régulier et rester hydraté. Attention aux accidents.','Cou et thyroïde sont faibles. Tendance à trop manger — attention au poids et diabète. Bonne nourriture avec modération.','Poumons, bras, épaules, système nerveux. Anxiété et problèmes de sommeil possibles. La méditation respiratoire aide.','Zone de l\'estomac et de la poitrine. Le stress émotionnel affecte directement la digestion. Nourriture chaude et thé aident.','Cœur, dos, colonne vertébrale. Attention au surmenage. Exercice cardiovasculaire régulier. Se reposer suffisamment.','Système digestif, intestins, peau. Indigestion et allergies possibles. Le régime est crucial.','Reins, bas du dos, peau. Rester hydraté et équilibré. Réduire le sucre.','Systèmes reproducteur et excréteur. Conditions chroniques possibles. Examens réguliers importants.','Foie, cuisses, hanches. Attention au poids. Activités en plein air les meilleures.','Os, articulations, genoux, peau. Attention au rhumatisme. Calcium et vitamine D importants.','Chevilles, mollets, système circulatoire. Gestion de la pression artérielle importante.','Pieds, lymphatique, système immunitaire. Un sommeil adéquat est votre secret de santé le plus puissant.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">🏥 Ma santé</div><div class="interp-text">' + health + '</div></div>';

    // Current dasha summary
    if (moonPos) {
        var nak = NAKSHATRAS[moonPos.nakshatra];
        if (nak) {
            var startRuler = nak.ruler;
            var startIdx = DASHA_ORDER.indexOf(startRuler);
            if (startIdx === -1) startIdx = 0;
            var now = new Date();
            var bd = new Date(Date.UTC(parseInt(document.getElementById('birthYear').value),parseInt(document.getElementById('birthMonth').value)-1,parseInt(document.getElementById('birthDay').value)));
            var cd = new Date(bd);
            var nakSpan = 360/27;
            var moonInNak = moonPos.sidereal - (moonPos.nakshatra * nakSpan);
            var elapsed = moonInNak / nakSpan;
            var remDays = DASHA_YEARS[startRuler] * (1-elapsed) * 365.25;
            for (var i=0;i<9;i++) {
                var idx = (startIdx+i)%9;
                var planet = DASHA_ORDER[idx];
                var days = (i===0) ? remDays : DASHA_YEARS[planet]*365.25;
                var endD = new Date(cd.getTime()+days*86400000);
                if (now>=cd && now<endD) {
                    var dashaDesc = {Ketu:'Une phase de croissance spirituelle. Concentrez-vous sur votre intérieur plutôt que le matériel.',Venus:'Un temps d\'amour et d\'abondance ! Romance, mariage et art fleurissent.',Sun:'Un temps de découverte de soi et de leadership. La confiance grandit fortement.',Moon:'Un temps d\'émotions et de foyer. Les relations familiales deviennent importantes.',Mars:'Un temps d\'action et d\'énergie. Excellent pour commencer de nouvelles choses.',Rahu:'Un temps de changement et d\'innovation. Des opportunités inattendues surgissent.',Jupiter:'Un temps de chance et de croissance ! Beaucoup de bonnes choses en éducation, mariage, promotion.',Saturn:'Un temps de patience et d\'épreuves. Croissance lente mais certaine.',Mercury:'Un temps d\'activité intellectuelle. Favorable pour les études, affaires, communication.'};
                    html += '<div class="interp-card"><div class="interp-title">⏳ Ma période actuelle</div><div class="interp-text">Période actuelle : <strong style="color:#c9a84c;">' + DASHA_KO[planet] + '</strong>.<br><br>' + (dashaDesc[planet]||'') + '</div></div>';
                    break;
                }
                cd = endD;
            }
        }
    }

    document.getElementById('easyInterpWrap').innerHTML = html;
}

// Ayanamsa (Lahiri) - Indian Astronomical Ephemeris official formula
function getAyanamsa(jd) {
    // Lahiri (Chitrapaksha): Spica = 0° Libra sidereal
    // Based on Newcomb precession with IAE reference point
    const T = (jd - 2451545.0) / 36525.0;
    // Precession in arcseconds (Newcomb)
    const prec = 5029.0966 * T + 1.11113 * T * T - 0.000006 * T * T * T;
    // Lahiri reference calibrated to Indian Astronomical Ephemeris
    return 23.86325 + prec / 3600.0;
}

// Zodiac signs
const SIGNS = ['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge',
               'Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons'];
const SIGNS_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

// Planets
const PLANETS = [
    { id: 'Sun', name: 'Soleil', symbol: '☉', natural: 'malefic' },
    { id: 'Moon', name: 'Lune', symbol: '☽', natural: 'benefic' },
    { id: 'Mars', name: 'Mars', symbol: '♂', natural: 'malefic' },
    { id: 'Mercury', name: 'Mercure', symbol: '☿', natural: 'neutral' },
    { id: 'Jupiter', name: 'Jupiter', symbol: '♃', natural: 'benefic' },
    { id: 'Venus', name: 'Venus', symbol: '♀', natural: 'benefic' },
    { id: 'Saturn', name: 'Saturne', symbol: '♄', natural: 'malefic' },
];

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', ko: 'Ashwini', ruler: 'Ketu', meaning: 'Jumeaux Cheval', deity: 'Ashwini Kumaras', desc: 'Energie de guerison et nouveaux departs. Une personne avec action rapide et capacites curatives.' },
    { name: 'Bharani', ko: 'Bharani', ruler: 'Venus', meaning: 'La Porteuse', deity: 'Yama', desc: 'Le cycle de vie et de mort. Forte patience et pouvoir de mener le changement.' },
    { name: 'Krittika', ko: 'Krittika', ruler: 'Sun', meaning: 'Le Coupeur', deity: 'Agni', desc: 'Le pouvoir du feu et de la purification. Intellect aiguise et determination.' },
    { name: 'Rohini', ko: 'Rohini', ruler: 'Moon', meaning: 'L\'Etoile Rouge', deity: 'Brahma', desc: 'L\'etoile de l\'abondance et de la beaute. Une personnalite creative et charmante.' },
    { name: 'Mrigashira', ko: 'Mrigashira', ruler: 'Mars', meaning: 'Tete de Cerf', deity: 'Soma', desc: 'L\'etoile de l\'exploration et de la curiosite. Un voyageur infatigable cherchant la verite.' },
    { name: 'Ardra', ko: 'Ardra', ruler: 'Rahu', meaning: 'Larme', deity: 'Rudra', desc: 'Renaissance par la tempete et la destruction. Emotions intenses et pouvoir transformateur.' },
    { name: 'Punarvasu', ko: 'Punarvasu', ruler: 'Jupiter', meaning: 'Retour de la Lumiere', deity: 'Aditi', desc: 'L\'etoile de la recuperation et du retour. Une personnalite optimiste et sage.' },
    { name: 'Pushya', ko: 'Pushya', ruler: 'Saturn', meaning: 'Le Nourricier', deity: 'Brihaspati', desc: 'Le nakshatra le plus auspicieux. Energie de nutrition, protection et prosperite.' },
    { name: 'Ashlesha', ko: 'Ashlesha', ruler: 'Mercury', meaning: 'L\'Enlaceur', deity: 'Nagas', desc: 'Sagesse du serpent et mystere. Perspicacite et intuition profonde.' },
    { name: 'Magha', ko: 'Magha', ruler: 'Ketu', meaning: 'Le Grand', deity: 'Pitris', desc: 'L\'etoile de la royaute. Autorite, respect et benedictions ancestrales.' },
    { name: 'Purva Phalguni', ko: 'Purva Phalguni', ruler: 'Venus', meaning: 'Fruit Anterieur', deity: 'Bhaga', desc: 'L\'etoile de la joie et de l\'amour. Sens artistique et romance.' },
    { name: 'Uttara Phalguni', ko: 'Uttara Phalguni', ruler: 'Sun', meaning: 'Fruit Posterieur', deity: 'Aryaman', desc: 'L\'etoile de l\'amitie et des contrats. Confiance et devotion.' },
    { name: 'Hasta', ko: 'Hasta', ruler: 'Moon', meaning: 'La Main', deity: 'Savitar', desc: 'L\'etoile de l\'artisanat et du savoir-faire. Mains guerisseuses, l\'artiste.' },
    { name: 'Chitra', ko: 'Chitra', ruler: 'Mars', meaning: 'Joyau Brillant', deity: 'Vishwakarma', desc: 'L\'etoile de la beaute et de la creation. Sens esthetique exceptionnel.' },
    { name: 'Swati', ko: 'Swati', ruler: 'Rahu', meaning: 'L\'Independant', deity: 'Vayu', desc: 'La liberte du vent. Une personnalite independante et flexible.' },
    { name: 'Vishakha', ko: 'Vishakha', ruler: 'Jupiter', meaning: 'Le Fourchu', deity: 'Indra-Agni', desc: 'L\'etoile des objectifs et de la determination. Fort focus et volonte.' },
    { name: 'Anuradha', ko: 'Anuradha', ruler: 'Saturn', meaning: 'Suivant Radha', deity: 'Mitra', desc: 'L\'etoile de l\'amitie et de la devotion. Competences organisationnelles et leadership.' },
    { name: 'Jyeshtha', ko: 'Jyeshtha', ruler: 'Mercury', meaning: 'L\'Aine', deity: 'Indra', desc: 'L\'etoile de la protection et de l\'autorite. Fort sens des responsabilites.' },
    { name: 'Mula', ko: 'Mula', ruler: 'Ketu', meaning: 'La Racine', deity: 'Nirriti', desc: 'L\'etoile de la destruction et reconstruction. Celui qui cherche la racine de la verite.' },
    { name: 'Purva Ashadha', ko: 'Purva Ashadha', ruler: 'Venus', meaning: 'Anterieur Invincible', deity: 'Apas', desc: 'Le pouvoir de l\'eau et de la purification. Energie victorieuse cachee.' },
    { name: 'Uttara Ashadha', ko: 'Uttara Ashadha', ruler: 'Sun', meaning: 'Posterieur Invincible', deity: 'Vishvedevas', desc: 'L\'etoile de la victoire ultime. Patience et leadership.' },
    { name: 'Shravana', ko: 'Shravana', ruler: 'Moon', meaning: 'L\'Ecouteur', deity: 'Vishnu', desc: 'L\'etoile du savoir et de l\'ecoute. Un maitre de l\'apprentissage et de la communication.' },
    { name: 'Dhanishta', ko: 'Dhanishta', ruler: 'Mars', meaning: 'Le Plus Riche', deity: 'Vasus', desc: 'L\'etoile de l\'abondance et de la musique. Talent et prosperite.' },
    { name: 'Shatabhisha', ko: 'Shatabhisha', ruler: 'Rahu', meaning: 'Cent Guerisseurs', deity: 'Varuna', desc: 'L\'etoile des secrets et de la guerison. Capacites de guerison mysterieuses.' },
    { name: 'Purva Bhadrapada', ko: 'Purva Bhadrapada', ruler: 'Jupiter', meaning: 'Pieds Chanceux Anterieurs', deity: 'Aja Ekapada', desc: 'L\'etoile du feu et de la transformation. Eveil spirituel.' },
    { name: 'Uttara Bhadrapada', ko: 'Uttara Bhadrapada', ruler: 'Saturn', meaning: 'Pieds Chanceux Posterieurs', deity: 'Ahir Budhnya', desc: 'Sagesse de l\'ocean profond. Meditation et profondeur spirituelle.' },
    { name: 'Revati', ko: 'Revati', ruler: 'Mercury', meaning: 'Le Prospere', deity: 'Pushan', desc: 'L\'etoile du voyage et de la protection. L\'accomplissement de toutes choses.' },
];

// Dasha periods (years)
const DASHA_YEARS = {
    'Ketu': 7, 'Venus': 20, 'Sun': 6, 'Moon': 10, 'Mars': 7,
    'Rahu': 18, 'Jupiter': 16, 'Saturn': 19, 'Mercury': 17
};
const DASHA_ORDER = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const DASHA_KO = {
    'Ketu': 'Ketu', 'Venus': 'Vénus', 'Sun': 'Soleil', 'Moon': 'Lune', 'Mars': 'Mars',
    'Rahu': 'Rahu', 'Jupiter': 'Jupiter', 'Saturn': 'Saturne', 'Mercury': 'Mercure'
};

// South Indian chart house layout (fixed signs)
// Grid positions: [row][col] → sign index
const SI_LAYOUT = [
    [11, 0, 1, 2],
    [10, -1, -1, 3],
    [9, -1, -1, 4],
    [8, 7, 6, 5]
];

// ── Form init ──
function initForm() {
    const yearSel = document.getElementById('birthYear');
    const monthSel = document.getElementById('birthMonth');
    const daySel = document.getElementById('birthDay');
    const hourSel = document.getElementById('birthHour');
    const minSel = document.getElementById('birthMinute');

    // Year: 1940~2025
    for (let y = 2025; y >= 1940; y--) {
        const opt = document.createElement('option');
        opt.value = y; opt.textContent = y;
        if (y === 1995) opt.selected = true;
        yearSel.appendChild(opt);
    }
    // Month: 1~12
    for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        opt.value = m; opt.textContent = 'Month ' + m;
        if (m === 3) opt.selected = true;
        monthSel.appendChild(opt);
    }
    // Day: 1~31
    for (let d = 1; d <= 31; d++) {
        const opt = document.createElement('option');
        opt.value = d; opt.textContent = d;
        if (d === 15) opt.selected = true;
        daySel.appendChild(opt);
    }
    // Hour: 12, 1~11
    [12,1,2,3,4,5,6,7,8,9,10,11].forEach(h => {
        const opt = document.createElement('option');
        opt.value = h; opt.textContent = h + ':00';
        if (h === 10) opt.selected = true;
        hourSel.appendChild(opt);
    });
    // Minute: 00, 01, 02, ... 59 (1분 단위 — D60 정밀도)
    for (let m = 0; m < 60; m += 1) {
        const opt = document.createElement('option');
        opt.value = m; opt.textContent = String(m).padStart(2,'0');
        if (m === 30) opt.selected = true;
        minSel.appendChild(opt);
    }
}

function toggleTimeUnknown() {
    const sel = document.getElementById('birthTimeUnknown');
    const disabled = sel.value === 'unknown';
    document.getElementById('birthAmpm').disabled = disabled;
    document.getElementById('birthHour').disabled = disabled;
    document.getElementById('birthMinute').disabled = disabled;
    if (disabled) {
        document.getElementById('birthAmpm').style.opacity = '0.4';
        document.getElementById('birthHour').style.opacity = '0.4';
        document.getElementById('birthMinute').style.opacity = '0.4';
    } else {
        document.getElementById('birthAmpm').style.opacity = '1';
        document.getElementById('birthHour').style.opacity = '1';
        document.getElementById('birthMinute').style.opacity = '1';
    }
}

function getBirthDateTime() {
    const year = parseInt(document.getElementById('birthYear').value);
    const month = parseInt(document.getElementById('birthMonth').value);
    const day = parseInt(document.getElementById('birthDay').value);

    let hour, minute;
    if (document.getElementById('birthTimeUnknown').value === 'unknown') {
        hour = 12; minute = 0; // Noon default
    } else {
        hour = parseInt(document.getElementById('birthHour').value);
        const ampm = document.getElementById('birthAmpm').value;
        if (ampm === 'pm' && hour !== 12) hour += 12;
        if (ampm === 'am' && hour === 12) hour = 0;
        minute = parseInt(document.getElementById('birthMinute').value);
    }
    return { year, month, day, hour, minute };
}

function onCityChange() {
    const sel = document.getElementById('birthCity');
    const customDiv = document.getElementById('customLatLng');
    if (sel.value === 'custom') {
        customDiv.style.display = 'block';
    } else {
        customDiv.style.display = 'none';
    }
}

function getLatLng() {
    const sel = document.getElementById('birthCity');
    if (sel.value === 'custom') {
        return {
            lat: parseFloat(document.getElementById('birthLat').value) || 37.57,
            lng: parseFloat(document.getElementById('birthLng').value) || 126.98,
            tz: parseFloat(document.getElementById('birthTz') ? document.getElementById('birthTz').value : 9) || 9
        };
    }
    const parts = sel.value.split(',').map(Number);
    return { lat: parts[0], lng: parts[1], tz: parts[2] || 0 };
}

// Init form on page load
initForm();

function toJulianDate(date) {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes()/60) / 24;

    let Y = y, M = m;
    if (M <= 2) { Y -= 1; M += 12; }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + B - 1524.5;
}

function getPlanetPosition(planetId, date) {
    try {
        if (planetId === 'Moon') {
            return Astronomy.EclipticGeoMoon(date).lon;
        } else if (planetId === 'Sun') {
            const vec = Astronomy.GeoVector('Sun', date, true);
            return Astronomy.Ecliptic(vec).elon;
        } else {
            const vec = Astronomy.GeoVector(planetId, date, true);
            return Astronomy.Ecliptic(vec).elon;
        }
    } catch (e) {
        console.error('Planet calc error:', planetId, e);
        return 0;
    }
}

function calculateChart() {
    const { lat, lng, tz } = getLatLng();
    const birth = getBirthDateTime();
    const { year, month, day, hour, minute } = birth;

    // Convert local birth time to UTC using city timezone offset
    // Korean DST correction: 1987 (May 10~Oct 11), 1988 (May 8~Oct 9) used UTC+10
    let effectiveTz = tz;
    if (tz === 9) {
        const md = month * 100 + day; // MMDD format for easy comparison
        if (year === 1987 && md >= 510 && md <= 1011) effectiveTz = 10;
        if (year === 1988 && md >= 508 && md <= 1009) effectiveTz = 10;
    }
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour - effectiveTz, minute, 0));
    const astroDate = Astronomy.MakeTime(utcDate);
    const jd = toJulianDate(utcDate);
    const ayanamsa = getAyanamsa(jd);

    // Calculate planet positions (sidereal)
    const positions = [];
    PLANETS.forEach(planet => {
        let tropicalLon = getPlanetPosition(planet.id, astroDate);
        let siderealLon = (tropicalLon - ayanamsa + 360) % 360;
        let signIdx = Math.floor(siderealLon / 30);
        let degree = siderealLon % 30;
        let nakshatraIdx = Math.floor(siderealLon / (360/27));

        positions.push({
            ...planet,
            tropical: tropicalLon,
            sidereal: siderealLon,
            sign: signIdx,
            degree: degree,
            nakshatra: nakshatraIdx,
            nakshatraPada: Math.floor((siderealLon % (360/27)) / (360/108)) + 1
        });
    });

    // Calculate Rahu/Ketu (Mean Lunar Nodes)
    // Mean ascending node formula from Meeus "Astronomical Algorithms"
    {
        const T = (jd - 2451545.0) / 36525;
        // Mean longitude of ascending node (tropical)
        let rahuTropical = 125.0446 - 1934.1363 * T + 0.0021 * T * T + T * T * T / 467441;
        rahuTropical = ((rahuTropical % 360) + 360) % 360;
        const rahuSidereal = ((rahuTropical - ayanamsa) % 360 + 360) % 360;
        const ketuSidereal = (rahuSidereal + 180) % 360;
        positions.push({
            id: 'Rahu', name: 'Rahu', symbol: '☊', natural: 'malefic',
            sidereal: rahuSidereal, sign: Math.floor(rahuSidereal / 30),
            degree: rahuSidereal % 30, nakshatra: Math.floor(rahuSidereal / (360/27)),
            nakshatraPada: Math.floor((rahuSidereal % (360/27)) / (360/108)) + 1
        });
        positions.push({
            id: 'Ketu', name: 'Ketu', symbol: '☋', natural: 'malefic',
            sidereal: ketuSidereal, sign: Math.floor(ketuSidereal / 30),
            degree: ketuSidereal % 30, nakshatra: Math.floor(ketuSidereal / (360/27)),
            nakshatraPada: Math.floor((ketuSidereal % (360/27)) / (360/108)) + 1
        });
    }

    // Ascendant (Lagna) - proper calculation with latitude
    const T = (jd - 2451545.0) / 36525;
    const obliquity = (23.4392911 - 0.0130042 * T - 0.00000164 * T*T) * Math.PI / 180;
    const gmst = (280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T*T) % 360;
    const lst = (gmst + lng + 360) % 360;
    const ramcRad = lst * Math.PI / 180;
    const latRad = lat * Math.PI / 180;
    const ascRad = Math.atan2(Math.cos(ramcRad), -(Math.sin(ramcRad) * Math.cos(obliquity) + Math.tan(latRad) * Math.sin(obliquity)));
    let lagnaTopical = (ascRad * 180 / Math.PI + 360) % 360;
    const lagnaSidereal = (lagnaTopical - ayanamsa + 360) % 360;
    const lagnaSign = Math.floor(lagnaSidereal / 30);

    // Moon's nakshatra for dasha
    const moonPos = positions.find(p => p.id === 'Moon');
    const moonNakshatra = moonPos ? moonPos.nakshatra : 0;

    // Render everything
    renderPlanetTable(positions, lagnaSign, lagnaSidereal);
    renderD1Chart(positions, lagnaSign);
    renderD9Chart(positions, lagnaSign, lagnaSidereal);
    renderDivisionalChart(positions, lagnaSidereal, 10, 'd10Chart', 'd10InterpWrap', 'D10', 'Dashamsha');
    renderDivisionalChart(positions, lagnaSidereal, 7, 'd7Chart', 'd7InterpWrap', 'D7', 'Saptamsha');
    renderDivisionalChart(positions, lagnaSidereal, 12, 'd12Chart', 'd12InterpWrap', 'D12', 'Dwadashamsha');
    renderDivisionalChart(positions, lagnaSidereal, 60, 'd60Chart', 'd60InterpWrap', 'D60', 'Shashtiamsha');
    renderDivisionalChart(positions, lagnaSidereal, 2, 'd2Chart', 'd2InterpWrap', 'D2', 'Hora');
    renderDivisionalChart(positions, lagnaSidereal, 3, 'd3Chart', 'd3InterpWrap', 'D3', 'Drekkana');
    renderDivisionalChart(positions, lagnaSidereal, 4, 'd4Chart', 'd4InterpWrap', 'D4', 'Chaturthamsha');
    renderDivisionalChart(positions, lagnaSidereal, 16, 'd16Chart', 'd16InterpWrap', 'D16', 'Shodashamsha');
    renderDivisionalChart(positions, lagnaSidereal, 20, 'd20Chart', 'd20InterpWrap', 'D20', 'Vimshamsha');
    renderDivisionalChart(positions, lagnaSidereal, 24, 'd24Chart', 'd24InterpWrap', 'D24', 'Chaturvimshamsha');
    renderDivisionalChart(positions, lagnaSidereal, 27, 'd27Chart', 'd27InterpWrap', 'D27', 'Saptavimshamsha');
    renderDivisionalChart(positions, lagnaSidereal, 30, 'd30Chart', 'd30InterpWrap', 'D30', 'Trimshamsha');
    renderDivisionalChart(positions, lagnaSidereal, 40, 'd40Chart', 'd40InterpWrap', 'D40', 'Khavedamsha');
    renderDivisionalChart(positions, lagnaSidereal, 45, 'd45Chart', 'd45InterpWrap', 'D45', 'Akshavedamsha');
    renderNakshatra(moonPos);
    renderDasha(moonNakshatra, utcDate, moonPos ? moonPos.sidereal : 0);
    _lastCalcData = {positions, lagnaSign, moonPos, lagnaSidereal, moonNakshatra, utcDate};
    renderInterpretation(positions, lagnaSign, moonPos);
    renderPlanetHouse(positions, lagnaSign);
    renderEducation(positions, lagnaSign);
    renderChildren(positions, lagnaSign);
    renderForeign(positions, lagnaSign);
    renderDignity(positions, lagnaSign);
    renderLucky(lagnaSign, moonPos);
    renderRemedy(positions, lagnaSign);

    document.getElementById('resultSection').style.display = 'block';
    updateCatHeaders();
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
}

function renderPlanetTable(positions, lagnaSign, lagnaSidereal) {
    let html = '<table class="planet-table"><thead><tr>';
    html += '<th>Planète</th><th>Signe</th><th>Degré</th><th>Nakshatra</th><th>Maison</th>';
    html += '</tr></thead><tbody>';

    // Add Lagna first with exact degree
    const lagnaDeg = lagnaSidereal % 30;
    const lagnaNakIdx = Math.floor(lagnaSidereal / (360/27));
    const lagnaNak = NAKSHATRAS[lagnaNakIdx] || {ko:'-'};
    html += `<tr><td>⬆ Lagna (Ascendant)</td><td>${SIGN_SYMBOLS[lagnaSign]} ${SIGNS[lagnaSign]}</td><td>${lagnaDeg.toFixed(1)}°</td><td>${lagnaNak.ko}</td><td>1</td></tr>`;

    positions.forEach(p => {
        const house = ((p.sign - lagnaSign + 12) % 12) + 1;
        const nak = NAKSHATRAS[p.nakshatra] || { ko: '-', name: '-' };
        const roleMap = { Sun:'Soi/Autorité', Moon:'Émotions/Esprit', Mars:'Énergie/Courage', Mercury:'Intelligence/Communication', Jupiter:'Chance/Sagesse', Venus:'Amour/Charme', Saturn:'Patience/Responsabilité', Rahu:'Désir/Innovation', Ketu:'Spiritualité/Libération' };
        const houseArea = ['','Soi','Argent·Famille','Communication','Foyer','Enfants·Romance','Santé','Partenaire','Transformation','Fortune·Étranger','Carrière','Revenus','Spiritualité'];
        html += `<tr>
            <td>${p.symbol} ${p.name}<br><span style="color:#666;font-size:10px;">${roleMap[p.id]||''}</span></td>
            <td>${SIGN_SYMBOLS[p.sign]} ${SIGNS[p.sign]}</td>
            <td>${p.degree.toFixed(1)}°</td>
            <td>${nak.ko}</td>
            <td>${house}<br><span style="color:#666;font-size:10px;">${houseArea[house]||''}</span></td>
        </tr>`;
    });

    html += '</tbody></table>';
    document.getElementById('planetTableWrap').innerHTML = html;
}

function renderD1Chart(positions, lagnaSign) {
    const grid = document.getElementById('d1Chart');
    grid.innerHTML = '';

    // Place planets in signs
    const signPlanets = {};
    for (let i = 0; i < 12; i++) signPlanets[i] = [];
    positions.forEach(p => {
        signPlanets[p.sign].push(p);
    });

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            const signIdx = SI_LAYOUT[row][col];

            if (signIdx === -1) {
                cell.className = 'chart-cell empty';
                cell.innerHTML = row === 1 && col === 1 ? '<div style="color:#c9a84c;font-size:10px;">D1<br>Rasi</div>' : '';
            } else {
                cell.className = 'chart-cell';
                const house = ((signIdx - lagnaSign + 12) % 12) + 1;
                cell.innerHTML = `<span class="house-num">${house}/${SIGN_SYMBOLS[signIdx]}</span>`;

                if (signIdx === lagnaSign) {
                    cell.innerHTML += '<span style="color:#c9a84c;font-size:10px;">Asc</span>';
                }

                signPlanets[signIdx].forEach(p => {
                    const cls = p.natural === 'benefic' ? 'benefic' : (p.natural === 'malefic' ? 'malefic' : '');
                    cell.innerHTML += `<span class="planet ${cls}">${p.symbol}</span>`;
                });
            }

            grid.appendChild(cell);
        }
    }
}

function getNavamsaSign(siderealLon) {
    // Navamsa: 각 사인(30도)을 9등분(3.333...도), 파다에 따라 사인 배정
    // Fire signs(0,4,8=Aries,Leo,Sagittarius): Aries부터 시작
    // Earth signs(1,5,9=Taurus,Virgo,Capricorn): Capricorn자리부터 시작
    // Air signs(2,6,10=Gemini,Libra,Aquarius): Libra자리부터 시작
    // Water signs(3,7,11=게,Scorpio,Pisces): 게자리부터 시작
    const sign = Math.floor(siderealLon / 30);
    const degInSign = siderealLon % 30;
    const pada = Math.floor(degInSign / (30/9)); // 0~8
    const element = sign % 4; // 0=fire, 1=earth, 2=air, 3=water
    const startSign = [0, 9, 6, 3][element]; // Aries,Capricorn,Libra,Cancer
    return (startSign + pada) % 12;
}

function renderD9Chart(positions, lagnaSign, lagnaSidereal) {
    // D9 Lagna 계산
    const d9LagnaSign = getNavamsaSign(lagnaSidereal);

    // D9 행성 position
    const d9Positions = positions.map(p => ({
        ...p,
        d9Sign: getNavamsaSign(p.sidereal)
    }));

    // 차트 그리기 (D1과 같은 남인도식)
    const grid = document.getElementById('d9Chart');
    grid.innerHTML = '';

    const signPlanets = {};
    for (let i = 0; i < 12; i++) signPlanets[i] = [];
    d9Positions.forEach(p => { signPlanets[p.d9Sign].push(p); });

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            const signIdx = SI_LAYOUT[row][col];

            if (signIdx === -1) {
                cell.className = 'chart-cell empty';
                cell.innerHTML = '<div style="font-size:11px;color:#444;text-align:center;">D9<br>Navamsa</div>';
            } else {
                cell.className = 'chart-cell';
                let content = `<div class="sign-label">${SIGN_SYMBOLS[signIdx]} ${SIGNS[signIdx]}</div>`;
                if (signIdx === d9LagnaSign) content += '<div class="lagna-marker">ASC</div>';
                signPlanets[signIdx].forEach(p => {
                    const cls = (p.natural === 'malefic') ? 'planet malefic' : 'planet benefic';
                    content += `<div class="${cls}">${p.symbol}</div>`;
                });
                cell.innerHTML = content;
            }
            grid.appendChild(cell);
        }
    }

    // D9 해석
    renderD9Interpretation(d9Positions, d9LagnaSign, lagnaSign);
}

function renderD9Interpretation(d9Positions, d9LagnaSign, d1LagnaSign) {
    const SIGN_RULERS = ['Mars','Venus','Mercure','Lune','Soleil','Mercure','Venus','Mars','Jupiter','Saturne','Saturne','Jupiter'];
    const RULER_NAMES = {Sun:'Sun',Moon:'Moon',Mars:'Mars',Mercury:'Mercury',Jupiter:'Jupiter',Venus:'Venus',Saturn:'Saturn',Rahu:'Rahu',Ketu:'Ketu'};
    const isEasy = window.vedicMode === 'easy';

    function d9HouseOf(signIdx) { return ((signIdx - d9LagnaSign + 12) % 12) + 1; }
    function d9PlanetsInHouse(h) { return d9Positions.filter(p => d9HouseOf(p.d9Sign) === h); }

    // D9 7 house (spouse)
    const d9H7Sign = (d9LagnaSign + 6) % 12;
    const d9H7Ruler = SIGN_RULERS[d9H7Sign];
    const d9H7Planets = d9PlanetsInHouse(7);

    // D9 10 house (사명/dharma career)
    const d9H10Sign = (d9LagnaSign + 9) % 12;
    const d9H10Ruler = SIGN_RULERS[d9H10Sign];
    const d9H10Planets = d9PlanetsInHouse(10);

    // Spouse의 10 house (파생하우스: 7 house서 10번째 = D9 4궁)
    const spouseH10 = 4; // 10th from 7th
    const d9H4Sign = (d9LagnaSign + 3) % 12;
    const d9H4Ruler = SIGN_RULERS[d9H4Sign];
    const d9H4Planets = d9PlanetsInHouse(4);

    // D9 1 house (결혼 후 본인)
    const d9H1Planets = d9PlanetsInHouse(1);

    // 사인별 career 경향
    const careerBySgn = [
        'Leadership, militaire, sport, entrepreneuriat (pionnier de feu)',
        'Finance, agriculture, arts, immobilier, alimentation (stabilite et materiel)',
        'Communication, medias, ecriture, enseignement, marketing (intellectuel)',
        'Soins infirmiers, cuisine, hotellerie, conseil (soin emotionnel)',
        'Politique, divertissement, leadership, creativite (scene brillante)',
        'Medecine, comptabilite, analyse, edition, sante (service precis)',
        'Droit, diplomatie, design, mode, mediation (equilibre et beaute)',
        'Recherche, investigation, medecine, occultisme, psychologie (profondeur)',
        'Education, voyage, philosophie, religion, edition (expansion)',
        'Gouvernement, construction, gestion, CEO, leader (systeme et autorite)',
        'Technologie, IT, invention, activisme social, science (innovation)',
        'Arts, spiritualite, guerison, musique, charite (transcendance et service)'
    ];

    // 행성별 spouse career 경향
    const planetCareer = {
        Sun: 'Fonctionnaire, politicien, medecin, CEO — positions autoritaires',
        Moon: 'Infirmier, conseiller, chef, hotellerie — roles de soins',
        Mars: 'Militaire, police, chirurgien, ingenieur, athlete',
        Mercury: 'Ecrivain, professeur, programmeur, comptable, commercant',
        Jupiter: 'Professeur, juge, leader religieux, consultant, professionnel senior',
        Venus: 'Designer, acteur, musicien, mode, industrie de la beaute',
        Saturn: 'Construction, mines, agriculture, gestion, artisan',
        Rahu: 'IT, lie a l\'etranger, carrieres non conventionnelles, recherche',
        Ketu: 'Spiritualite, medecine alternative, recherche, ascete'
    };

    let html = '';

    // 1. D9 Lagna 분석 (결혼 후 본인)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🕉️ Vous après le mariage' : '🕉️ D9 Lagna — Vous Après le Mariage : ' + SIGNS[d9LagnaSign] + ' ' + SIGN_SYMBOLS[d9LagnaSign]}</div>
        <div class="interp-text">
            ${isEasy ? 'Cela revele votre vrai vous apres le mariage et dans la seconde moitie de la vie (apres 30 ans).' : 'Le Lagna Navamsa est en <strong>' + SIGNS[d9LagnaSign] + '</strong>. Cela revele votre vrai vous apres le mariage et dans la seconde moitie de la vie (apres 30 ans).'}
            ${d9LagnaSign === d1LagnaSign ? (isEasy ? '<br><br><strong>Signe special !</strong> Votre essence reste inchangee apres le mariage — le soi interieur et exterieur sont alignes.' : '<br><br><strong>D1 et D9 Lagna dans le meme signe !</strong> Appele <strong>Vargottama</strong> — tres puissant. Votre essence reste inchangee apres le mariage.') : ''}
            ${d9H1Planets.length > 0 ? '<br><br>' + (isEasy ? 'Il y a des energies qui influencent fortement votre personnalite apres le mariage.' : '<strong>Planetes en D9 1re :</strong> ' + d9H1Planets.map(p => p.symbol + ' ' + p.name).join(', ') + ' — influencent fortement votre personnalite apres le mariage.') : ''}
        </div>
    </div>`;

    // 2. D9 7 house (spouse)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Caractère du partenaire' : '💍 D9 7e Maison — Caractère du Partenaire : ' + SIGNS[d9H7Sign] + ' ' + SIGN_SYMBOLS[d9H7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'charme unique') + ' qualite du partenaire.' : 'La 7e maison Navamsa est en <strong>' + SIGNS[d9H7Sign] + '</strong>, regi par <strong>' + RULER_NAMES[d9H7Ruler] + '</strong>.<br><br>Cela revele la personnalite centrale de votre partenaire. ' + SIGNS[d9H7Sign] + ' partenaire a energie ' + ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'charme unique') + ' qualites.'}
            ${d9H7Planets.length > 0 ? '<br><br>' + (isEasy ? d9H7Planets.map(p => p.natural === 'benefic' ? 'Energie positive ! Vous recevez des benedictions de votre partenaire.' : 'Energie de defi — aussi des opportunites de croissance dans le mariage.').join('<br>') : '<strong>Planetes en D9 7e :</strong><br>' + d9H7Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${p.natural === 'benefic' ? 'Benefique ! Benedictions de votre partenaire.' : 'Energie de defi — aussi des opportunites de croissance dans le mariage.'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 3. D9 10 house (본인의 Dharma/사명)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 But de vie' : '💼 D9 10e Maison — But de Vie (Dharma) : ' + SIGNS[d9H10Sign] + ' ' + SIGN_SYMBOLS[d9H10Sign]}</div>
        <div class="interp-text">
            ${isEasy ? 'La vraie vocation que vous poursuivez apres la maturite.' : 'La 10e maison Navamsa est en <strong>' + SIGNS[d9H10Sign] + '</strong>, regi par <strong>' + RULER_NAMES[d9H10Ruler] + '</strong>.<br><br>Alors que la 10e de D1 montre votre carriere, la 10e de D9 revele votre <strong>but de vie superieur (Dharma)</strong>.'}<br><br>
            <strong>Direction of purpose:</strong> ${careerBySgn[d9H10Sign]}
            ${d9H10Planets.length > 0 ? '<br><br>' + (isEasy ? d9H10Planets.map(p => planetCareer[p.id] || 'energie de carriere unique').join('<br>') : '<strong>Planetes en D9 10e :</strong><br>' + d9H10Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${planetCareer[p.id] || 'energie de carriere unique'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 4. spouse의 career (파생하우스: D9 4 house = 7 house서 10번째)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👔 Carrière du partenaire' : '👔 Carriere du Partenaire — 10e Derivee (D9 4e) : ' + SIGNS[d9H4Sign] + ' ' + SIGN_SYMBOLS[d9H4Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '<strong>Maison derivee :</strong> 10e depuis la 7e (partenaire) = La 4e D9 montre la carriere du partenaire.<br><br>La 4e D9 est en <strong>' + SIGNS[d9H4Sign] + '</strong>, regi par <strong>' + RULER_NAMES[d9H4Ruler] + '</strong>.<br><br>'}
            <strong>Spouse career tendency:</strong> ${careerBySgn[d9H4Sign]}
            ${d9H4Planets.length > 0 ? '<br><br>' + (isEasy ? d9H4Planets.map(p => `Le partenaire travaille probablement dans ${planetCareer[p.id] || 'domaine specialise'}`).join('<br>') : '<strong>Planetes en D9 4e (10e du partenaire) :</strong><br>' + d9H4Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: Le partenaire travaille probablement dans ${planetCareer[p.id] || 'domaine specialise'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 5. 바르고타마 행성 체크
    const vargottamaPlanets = d9Positions.filter(p => p.sign === p.d9Sign);
    if (vargottamaPlanets.length > 0) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '⭐ Planètes exceptionnellement fortes' : '⭐ Planetes Vargottama — Exceptionnellement Fortes'}</div>
            <div class="interp-text">
                ${isEasy ? 'Ces planetes sont exceptionnellement puissantes et agissent de maniere constante toute la vie.' : 'Les planetes dans le meme signe en D1 et D9 sont appeles <strong>Vargottama</strong>. Tres puissants, agissant de maniere constante toute la vie.'}<br><br>
                ${isEasy ? 'Energie exceptionnellement forte agissant de maniere constante toute votre vie !' : vargottamaPlanets.map(p => `<strong>${p.symbol} ${p.name}</strong>: En D1 et D9 ${SIGNS[p.sign]} — l'energie de cette planete est exceptionnellement forte !`).join('<br>')}
            </div>
        </div>`;
    }

    // 6. spouse 방향 분석 (UL + A7 + D1 7 house + D9 7 house 종합)
    const DIRECTIONS = {
        0:'Est', 1:'Sud', 2:'Ouest', 3:'Nord',
        4:'Est', 5:'Sud', 6:'Ouest', 7:'Nord',
        8:'Est', 9:'Sud', 10:'Ouest', 11:'Nord'
    };
    const DIR_DETAIL = {
        0:'Est (Belier — feu)',1:'Sud (Taureau — terre)',2:'Ouest (Gemeaux — air)',3:'Nord (Cancer — eau)',
        4:'Est (Lion — feu)',5:'Sud (Vierge — terre)',6:'Ouest (Balance — air)',7:'Nord (Scorpion — eau)',
        8:'Est (Sagittaire — feu)',9:'Sud (Capricorne — terre)',10:'Ouest (Verseau — air)',11:'Nord (Poissons — eau)'
    };

    // Arudha Pada 계산 함수
    function calcArudha(houseNum, lagnaS, pos) {
        const houseSign = (lagnaS + houseNum - 1) % 12;
        const ruler = SIGN_RULERS[houseSign];
        const rulerPlanet = pos.find(p => p.id === ruler);
        if (!rulerPlanet) return houseSign;
        const rulerSign = rulerPlanet.sign;
        const dist = ((rulerSign - houseSign) + 12) % 12;
        let arudhaSign = (rulerSign + dist) % 12;
        // 예외: 아루다가 같은 사인이거나 7번째이면 10번째로
        if (arudhaSign === houseSign || arudhaSign === (houseSign + 6) % 12) {
            arudhaSign = (houseSign + 9) % 12;
        }
        return arudhaSign;
    }

    // D1에서의 원래 positions 사용 (d9Positions에는 d1 sign도 있음)
    const d1Positions = d9Positions; 

    // UL (Upapada Lagna) = 12 house 아루다
    const ulSign = calcArudha(12, d1LagnaSign, d1Positions);

    // A7 (Darapada) = 7 house 아루다
    const a7Sign = calcArudha(7, d1LagnaSign, d1Positions);

    // D1 7 house 사인
    const d1H7Sign = (d1LagnaSign + 6) % 12;

    // D9 7 house 주인의 D9 position
    const d9H7RulerPlanet = d9Positions.find(p => p.id === d9H7Ruler);
    const d9H7RulerSign = d9H7RulerPlanet ? d9H7RulerPlanet.d9Sign : d9H7Sign;

    // D9 Venus(Venus) position — spouse의 karaka(상징 행성)
    const venusD9 = d9Positions.find(p => p.id === 'Venus');
    const venusD9Sign = venusD9 ? venusD9.d9Sign : 0;

    // 방향 집계 — 6가지 지표
    const dirSources = [
        {name:'D1 7th', sign: d1H7Sign, desc:'Maison du partenaire dans la carte natale'},
        {name:'D9 7th', sign: d9H7Sign, desc:'Maison du partenaire en Navamsa'},
        {name:'D9 7th Lord', sign: d9H7RulerSign, desc:'Ou va le seigneur de la 7e D9'},
        {name:'D9 Venus', sign: venusD9Sign, desc:'Karaka du partenaire en Navamsa'},
        {name:'Upapada (UL)', sign: ulSign, desc:'12e Arudha — contexte du partenaire'},
        {name:'Darapada (A7)', sign: a7Sign, desc:'7e Arudha — image sociale du partenaire'}
    ];

    const dirCount = {};
    dirSources.forEach(s => {
        const dir = DIRECTIONS[s.sign];
        dirCount[dir] = (dirCount[dir] || 0) + 1;
    });
    const sortedDirs = Object.entries(dirCount).sort((a,b) => b[1] - a[1]);
    const primaryDir = sortedDirs[0][0];
    const agreement = sortedDirs[0][1];

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🧭 D\'où vient votre partenaire' : '🧭 Direction du Partenaire — Analyse de 6 Indicateurs'}</div>
        <div class="interp-text">
            ${isEasy ? 'Analyse de quelle direction votre partenaire peut venir.' : 'L\'astrologie vedique determine la direction du partenaire en combinant plusieurs indicateurs.'}<br><br>
            ${isEasy ? '' : '<strong>6 Indicateurs :</strong><br>' + dirSources.map(s => `• <strong>${s.name}</strong>: ${SIGNS[s.sign]} ${SIGN_SYMBOLS[s.sign]} → <strong>${DIRECTIONS[s.sign]}</strong> <span style="color:#666;font-size:12px;">(${s.desc})</span>`).join('<br>') + '<br><br><strong>🧿 Upapada Lagna (UL):</strong> 12e Maison Arudha Pada. Indique la famille/le contexte du partenaire et l\'environnement du mariage. → <strong>' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign] + '</strong><br><strong>🎯 Darapada (A7):</strong> 7e Maison Arudha Pada. Indique l\'image sociale et l\'impression exterieure du partenaire. → <strong>' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign] + '</strong><br><strong>💍 D9 7th lord (' + RULER_NAMES[d9H7Ruler] + '):</strong> Le signe ou va le maitre de la 7e maison Navamsa indique la direction reelle du partenaire. → <strong>' + SIGNS[d9H7RulerSign] + ' ' + SIGN_SYMBOLS[d9H7RulerSign] + '</strong><br><strong>♀ D9 Venus:</strong> Significateur naturel du partenaire. La position de Venus en Navamsa montre la source de l\'energie du partenaire. → <strong>' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign] + '</strong><br><br>'}
            <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;margin-top:10px;">
                <strong style="font-size:16px;">🧭 Conclusion: ${agreement >= 4 ? 'Extremement fort' : agreement >= 3 ? 'Tres fort' : agreement >= 2 ? 'Strong' : ''} ${primaryDir} direction</strong><br><br>
                Out of 6 indicators <strong>${agreement}</strong> point to <strong>${primaryDir}</strong> point to this direction.
                ${agreement >= 4 ? '<br>4+ indicators agree! <strong>Very high probability</strong>of ' + primaryDir + '. Faites attention aux villes, lieux de travail ou voyages dans cette direction.' : ''}
                ${agreement === 3 ? '<br>3 indicateurs — <strong>Haute probabilite</strong> de direction ' + primaryDir + ' direction.' : ''}
                ${agreement === 2 ? '<br>2 indicators — ' + primaryDir + ' favorise mais d\'autres possibilites existent.' : ''}
                ${agreement <= 1 ? '<br>Indicateurs disperses — le partenaire peut venir de differentes directions. Gardez l\'esprit ouvert.' : ''}
                ${sortedDirs.length > 1 && sortedDirs[1][1] === sortedDirs[0][1] ? '<br><br>💡 Two directions equally: <strong>' + sortedDirs[0][0] + '</strong> and <strong>' + sortedDirs[1][0] + '</strong> both possible.' : ''}
            </div>
        </div>
    </div>`;

    document.getElementById('d9InterpWrap').innerHTML = html;

    // Spouse 프로필은 별도 함수로
    renderSpouseProfile(d1LagnaSign, ulSign, a7Sign, venusD9Sign);
}

function renderSpouseProfile(d1LagnaSign, ulSign, a7Sign, venusD9Sign) {
    const isEasy = window.vedicMode === 'easy';
    let html = '';
    const meetingBySgn = [
        "Lieux actifs, sport, environnements competitifs. Premiere rencontre intense et soudaine.",
        "Lieu de travail, institutions financieres, restaurants, nature. Construire la confiance lentement.",
        "Reseaux sociaux, ecole, seminaires, en voyageant. La relation commence par la conversation.",
        "Presentations familiales, reunions de quartier, amis d'enfance. Cadres confortables.",
        "Fetes, concerts, rassemblements creatifs, lieux glamour. Premiere rencontre dramatique.",
        "Lieu de travail, hopital, lie a la sante, benevolat. Rencontre par besoins pratiques.",
        "Rendez-vous arranges, evenements juridiques/diplomatiques, expositions d'art. Rencontre elegante.",
        "Situations de crise, conversations profondes, lieux secrets. Attraction intense et predestinee.",
        "Etranger, universite, rassemblements religieux/philosophiques. Connexion de loin.",
        "Lieu de travail, evenements d'affaires, fonctions officielles. Rencontre liee au statut social.",
        "En ligne, clubs de loisirs, mouvements sociaux, ami d'un ami. Rencontre unique.",
        "Rassemblements spirituels, etranger, arts/musique, hopital. Rencontre mystique et predestinee."
    ];

    const backgroundBySgn = [
        "Famille independante et autodidacte. Fort heritage de leadership.",
        "Famille financierement stable. Valeurs traditionnelles.",
        "Famille intellectuelle et communicative. Accent sur l\'education.",
        "Foyer chaleureux et oriente famille. Forte figure maternelle.",
        "Famille prestigieuse et fiere. Statut social et reputation.",
        "Famille pratique et travailleuse. Contexte sante/medical/education.",
        "Famille equilibree et digne. Contexte arts/droit/diplomatie.",
        "Famille avec secrets ou transformations. Histoire familiale profonde.",
        "Famille savante, religieuse/philosophique. Possible contexte etranger.",
        "Famille stricte et traditionnelle. Socialement respectee.",
        "Structure familiale libre et unique. Pensee progressiste.",
        "Famille spirituelle ou artistique. Possible contexte etranger."
    ];

    const imageBySgn = [
        "Premiere impression energique et confiante. Image sportive ou forte.",
        "Premiere impression calme et fiable. Image raffinee et digne.",
        "Premiere impression brillante et bavarde. Image intellectuelle.",
        "Premiere impression chaleureuse et bienveillante. Image douce.",
        "Premiere impression glamour et charismatique. Image confiante.",
        "Premiere impression soignee et ordonnee. Image professionnelle.",
        "Premiere impression elegante et charmante. Image sophistiquee.",
        "Premiere impression mysterieuse et intense. Image profonde.",
        "Premiere impression libre et vibrante. Image aventuriere.",
        "Premiere impression serieuse et mature. Image responsable.",
        "Premiere impression unique et individualiste. Image originale.",
        "Premiere impression reveuse et mystique. Image artistique."
    ];

    const attractBySgn = [
        "Energie forte et confiance. Nature proactive et protectrice attrayante.",
        "Stabilite et charme sensuel. Apprecier bonne nourriture et textures.",
        "Esprit et conversation. La stimulation intellectuelle est l'attraction.",
        "Soins devoues et emotion. Se sentir chez soi ensemble.",
        "Presence brillante et generosite. Se sentir special ensemble.",
        "Consideration delicate et perfectionnisme. L'attention aux details charme.",
        "Elegance et personnalite harmonieuse. Le monde devient beau ensemble.",
        "Regard intense et profondeur. Focus penetrant l'ame est l'attraction.",
        "Esprit libre et humour. Les aventures commencent ensemble.",
        "Fiabilite solide et maturite. Stabilite de roc attrayante.",
        "Individualite unique et pensee progressiste. Fraicheur jamais vue.",
        "Sensibilite mystique et profondeur spirituelle. Romance de reve."
    ];

    // D1 7 house 사인으로 만남 환경
    const d1H7ForMeeting = (d1LagnaSign + 6) % 12;

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🤝 Environnement de rencontre' : '🤝 Environnement de rencontre — D1 7e : ' + SIGNS[d1H7ForMeeting] + ' ' + SIGN_SYMBOLS[d1H7ForMeeting]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Le signe de la 7e maison revele l\'environnement de rencontre.<br><br>'}
            <strong>${meetingBySgn[d1H7ForMeeting]}</strong>
            ${d1H7ForMeeting === 8 || d1H7ForMeeting === 11 ? '<br><br>💡 <strong>Possibilite de connexion etrangere !</strong> Le partenaire peut etre etranger ou vous pouvez vous rencontrer a l\'etranger.' : ''}
        </div>
    </div>`;

    // UL 사인으로 spouse 가문/배경
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏛️ Contexte familial du partenaire' : '🏛️ Contexte du partenaire — UL : ' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Upapada Lagna (UL) revele le contexte familial du partenaire.<br><br>'}
            <strong>${backgroundBySgn[ulSign]}</strong>
        </div>
    </div>`;

    // A7 사인으로 spouse 외적 이미지
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👤 Première impression du partenaire' : '👤 Première impression — A7 : ' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Darapada (A7) montre la premiere impression du partenaire.<br><br>'}
            <strong>${imageBySgn[a7Sign]}</strong>
        </div>
    </div>`;

    // D9 Venus 사인으로 spouse 매력 포인트
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💎 Point d\'attraction du partenaire' : '💎 Attraction du partenaire — D9 Vénus : ' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Venus en Navamsa revele le charme et le style d\'amour du partenaire.<br><br>'}
            <strong>${attractBySgn[venusD9Sign]}</strong>
        </div>
    </div>`;

    document.getElementById('spouseProfileWrap').innerHTML = html;
}

function renderNakshatra(moonPos) {
    if (!moonPos) return;
    const nak = NAKSHATRAS[moonPos.nakshatra];
    if (!nak) return;
    const isEasy = window.vedicMode === 'easy';

    const html = isEasy ? `
        <div class="nakshatra-card">
            <div class="nakshatra-name">Votre Etoile : ${nak.ko}</div>
            <div class="nakshatra-meaning">"${nak.meaning}"</div>
            <div class="nakshatra-detail">${nak.desc}</div>
        </div>
    ` : `
        <div class="nakshatra-card">
            <div class="nakshatra-name">${nak.ko} (${nak.name})</div>
            <div class="nakshatra-meaning">"${nak.meaning}" — Planete dominante : ${DASHA_KO[nak.ruler] || nak.ruler}</div>
            <div class="nakshatra-detail">
                Deity: ${nak.deity}<br><br>
                ${nak.desc}
            </div>
        </div>
    `;
    document.getElementById('nakshatraWrap').innerHTML = html;
}

function renderDasha(moonNakshatra, birthDate, moonSidereal) {
    const nak = NAKSHATRAS[moonNakshatra];
    if (!nak) return;

    // Find starting dasha from nakshatra ruler
    const startRuler = nak.ruler;
    let startIdx = DASHA_ORDER.indexOf(startRuler);
    if (startIdx === -1) startIdx = 0;

    // Calculate remaining portion of first dasha
    // Each nakshatra spans 13°20' (13.3333°). Moon's position within nakshatra determines elapsed portion.
    const nakSpan = 360 / 27; // 13.3333°
    const moonInNak = moonSidereal - (moonNakshatra * nakSpan); // degree within current nakshatra
    const elapsedFraction = moonInNak / nakSpan; // 0~1, how much of nakshatra has passed
    const firstDashaYears = DASHA_YEARS[startRuler];
    const remainingYears = firstDashaYears * (1 - elapsedFraction); // remaining portion of first dasha
    const remainingDays = remainingYears * 365.25;

    // Helper: add days to date
    function addDays(date, days) {
        const d = new Date(date);
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        return d;
    }

    // Helper: format date
    function fmtDate(d) {
        return d.getFullYear() + '.' + String(d.getMonth()+1).padStart(2,'0') + '.' + String(d.getDate()).padStart(2,'0');
    }

    // Helper: calculate age
    function getAge(d) {
        const diff = d.getTime() - birthDate.getTime();
        return (diff / (365.25 * 24 * 60 * 60 * 1000)).toFixed(1);
    }

    const now = new Date();
    let currentDate = new Date(birthDate);

    const isEasy = window.vedicMode === 'easy';
    let html = isEasy ?
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 La vie coule avec differentes energies. Verifiez votre periode actuelle.<br><br>' :
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 <strong>Vimshottari Dasha</strong> — La vie est divisee en periodes gouvernees par 9 planetes. <strong>Mahadasha</strong> est la periode principale, <strong>Antardasha (Bhukti)</strong> est la sous-periode. Calcule a partir de la position lunaire nakshatra.<br><br>';
    html += isEasy ?
        '</div></div>' :
        '🌙 Lune de naissance : <strong>' + nak.ko + ' (' + nak.name + ')</strong> — Premiere Dasha : <strong>' + DASHA_KO[startRuler] + '</strong> (restant : ' + remainingYears.toFixed(2) + ' ans)</div></div>';

    // Build all mahadasha periods with correct first period
    const periods = [];
    for (let i = 0; i < 9; i++) {
        const idx = (startIdx + i) % 9;
        const planet = DASHA_ORDER[idx];
        const fullYears = DASHA_YEARS[planet];
        const actualDays = (i === 0) ? remainingDays : fullYears * 365.25;
        const startD = new Date(currentDate);
        const endD = addDays(currentDate, actualDays);
        periods.push({ planet, fullYears, startD, endD, actualDays });
        currentDate = endD;
    }

    html += '<div class="dasha-timeline">';

    periods.forEach((p, pi) => {
        const isCurrent = now >= p.startD && now < p.endD;
        const age = getAge(p.startD);

        html += '<div class="dasha-item ' + (isCurrent ? 'current' : '') + '" style="cursor:pointer;" onclick="this.querySelector(\'.bhukti-list\') && (this.querySelector(\'.bhukti-list\').style.display = this.querySelector(\'.bhukti-list\').style.display===\'none\'?\'\':\'none\')">';
        const dashaEasyDesc = {Ketu:'Réflexion intérieure & croissance spirituelle',Venus:'Amour, beauté & abondance',Sun:'Confiance & leadership brillent',Moon:'Émotions & foyer au premier plan',Mars:'Défis & énergie d\'action',Rahu:'Grands changements & nouvelles opportunités',Jupiter:'Chance & croissance arrivent',Saturn:'La patience apporte de grandes récompenses',Mercury:'Études, communication & affaires prospèrent'};
        html += '<span class="dasha-planet">' + (isEasy ? dashaEasyDesc[p.planet] : DASHA_KO[p.planet]) + '</span>';
        html += '<span class="dasha-period">' + fmtDate(p.startD) + ' ~ ' + fmtDate(p.endD) + '</span>';
        html += '<span class="dasha-years">' + (p.actualDays / 365.25).toFixed(1) + ' yrs</span>';
        if (isCurrent) html += '<span class="dasha-badge">Current</span>';
        html += '<span style="font-size:10px;color:#666;margin-left:4px;">(' + age + ') ▼</span>';

        // Antardasha (Bhukti) - sub-periods within this mahadasha
        html += '<div class="bhukti-list" style="display:' + (isCurrent ? '' : 'none') + ';margin-top:8px;padding-top:8px;border-top:1px solid #2a2a5a;">';

        const mahaDays = p.actualDays;
        const mahaYears = p.fullYears;
        let bhuktiDate = new Date(p.startD);
        const bhuktiStartIdx = DASHA_ORDER.indexOf(p.planet);

        for (let j = 0; j < 9; j++) {
            const bIdx = (bhuktiStartIdx + j) % 9;
            const bPlanet = DASHA_ORDER[bIdx];
            const bFullDays = (DASHA_YEARS[p.planet] * DASHA_YEARS[bPlanet] / 120) * 365.25;
            // Scale to actual mahadasha length (for first partial mahadasha)
            const bDays = bFullDays * (mahaDays / (mahaYears * 365.25));
            const bStart = new Date(bhuktiDate);
            const bEnd = addDays(bhuktiDate, bDays);
            const bCurrent = now >= bStart && now < bEnd;
            const bAge = getAge(bStart);

            html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;font-size:12px;' + (bCurrent ? 'color:#c9a84c;font-weight:700;' : 'color:#888;') + '">';
            html += '<span>' + (bCurrent ? '▶ ' : '  ') + (isEasy ? dashaEasyDesc[bPlanet] : DASHA_KO[p.planet] + '-' + DASHA_KO[bPlanet]) + '</span>';
            html += '<span>' + fmtDate(bStart) + '</span>';
            html += '<span>(' + bAge + ')</span>';
            html += '</div>';

            bhuktiDate = bEnd;
        }

        html += '</div></div>';
    });

    html += '</div>';
    document.getElementById('dashaWrap').innerHTML = html;
}

function renderInterpretation(positions, lagnaSign, moonPos) {
    // Helper: get house number from sign
    function houseOf(signIdx) { return ((signIdx - lagnaSign + 12) % 12) + 1; }
    function planetsInHouse(h) { return positions.filter(p => houseOf(p.sign) === h); }
    const isEasy = window.vedicMode === 'easy';

    let html = '';

    // ═══════════════════════════════════
    // 1. 성격 & appearance (1 house Lagna)
    // ═══════════════════════════════════
    const lagnaEasy = [
        'Orienté action ! Rapide à décider avec des qualités de leadership naturel. Vous aimez les nouveaux défis. On vous demande souvent de prendre les devants. Un peu impatient, mais incroyablement déterminé.',
        'Vous aimez la stabilité. Vous appréciez le confort, la beauté et la bonne nourriture. Une fois décidé, vous allez jusqu\'au bout. Têtu, mais cela vous rend incroyablement fiable.',
        'Curieux de tout ! Grand communicateur et multi-talentueux. Vous assimilez vite les nouvelles informations et attirez les gens par votre esprit. Parfois dispersé, mais c\'est votre charme.',
        'Chaleureux et émotionnel. Vous chérissez la famille et lisez bien les sentiments des gens. Un soignant naturel qui met tout le monde à l\'aise. Les sautes d\'humeur arrivent, mais votre empathie est votre superpouvoir.',
        'Leader né ! Vous avez une grande présence et attirez naturellement l\'attention. Confiant et magnétique. Vous désirez la reconnaissance, mais vous êtes également généreux en amour et en louanges.',
        'Orienté détails et analytique. Vous visez la perfection et prenez soin de votre santé. Observateur aiguisé qui capte ce que les autres manquent. Vous vous inquiétez un peu trop, mais cela signifie que vous êtes toujours préparé.',
        'Vous cherchez l\'harmonie. Raffiné, charmant, avec un excellent goût artistique. Un pacificateur naturel qui déteste les conflits. Plus heureux entouré de belles choses.',
        'Vous avez de la profondeur. Forte intuition qui voit la vérité. Calme en surface mais émotions intenses en dessous. La vie vous lance de grands changements, et chacun vous rend plus fort.',
        'Esprit libre ! Vous aimez voyager et apprendre. Positif et philosophique. Intéressé par différentes cultures, avec une vision large du monde. Votre humour illumine toute pièce.',
        'Ambitieux. Patient et de plus en plus attrayant avec l\'âge. Travaille systématiquement vers ses objectifs. Même si vous luttez au début, vous êtes du type à éclore tardivement.',
        'Unique. Vous pensez différemment de tout le monde et vous êtes innovant. Vous détestez être dans une case et voulez changer le monde à votre façon. Talent en technologie ou science.',
        'Profondément sensible. Forte intuition attirée par l\'art et la spiritualité. Rêves vivides et imagination riche. Vous ressentez profondément la douleur des autres. Votre monde intérieur est plus riche que l\'extérieur.'
    ];
    const lagnaInterp = [
        'Lagna Bélier gouverné par Mars. Forte volonté et leadership, personnalité indépendante. Rapide à agir avec un esprit pionnier. Traits marqués avec impression active. Impulsif mais courageux.',
        'Lagna Taureau gouverné par Vénus. Cherche stabilité et abondance, aime la beauté sensorielle. Apparence douce avec voix attrayante. Sens artistique exceptionnel. Têtu mais fiable.',
        'Lagna Gémeaux gouverné par Mercure. Intellectuellement curieux avec d\'excellentes compétences en communication. Apparence jeune avec carrure agile. Polyvalent mais peut être dispersé.',
        'Lagna Cancer gouverné par la Lune. Riche en sensibilité et hautement intuitif. Visage rond avec impression douce. Dévoué au foyer et à la famille. Hauts et bas émotionnels mais profondément empathique.',
        'Lagna Lion gouverné par le Soleil. Débordant de charisme et d\'énergie créative. Carrure digne avec présence imposante. Leader né qui apprécie les projecteurs. Haute estime de soi mais cœur généreux.',
        'Lagna Vierge gouverné par Mercure. Analytique et perfectionniste. Apparence soignée avec impression intellectuelle. Excellente attention aux détails, intérêt pour la santé et l\'hygiène.',
        'Lagna Balance gouverné par Vénus. Cherche équilibre et harmonie, diplomatiquement habile. Apparence proportionnée avec impression raffinée. Excelle dans les relations avec un superbe sens esthétique.',
        'Lagna Scorpion gouverné par Mars. Intuition intense et pouvoir transformateur. Yeux perçants avec impression mystérieuse. Pénètre l\'essentiel, garde bien les secrets. Vit des changements dramatiques multiples.',
        'Lagna Sagittaire gouverné par Jupiter. Philosophe cherchant liberté et vérité. Grande carrure avec impression lumineuse. Optimiste et valorise les principes moraux. Connexions profondes avec voyages et éducation.',
        'Lagna Capricorne gouverné par Saturne. Forte ambition et patience. Carrure mince avec impression sérieuse. Travaille systématiquement vers ses objectifs, rajeunit avec l\'âge.',
        'Lagna Verseau gouverné par Saturne. Innovant et original. Apparence unique avec impression intellectuelle. Valorise les idéaux humanitaires avec pensée non conventionnelle.',
        'Lagna Poissons gouverné par Jupiter. Spirituel et intuitif. Apparence douce avec impression rêveuse. Sensibilité artistique extrêmement douée. Tendance au sacrifice de soi.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">👤 ${isEasy ? 'Votre personnalité' : 'Personnalité & Apparence — Lagna : ' + SIGNS[lagnaSign] + ' ' + SIGN_SYMBOLS[lagnaSign]}</div>
        <div class="interp-text">${isEasy ? lagnaEasy[lagnaSign] : lagnaInterp[lagnaSign]}</div>
    </div>`;

    // ═══════════════════════════════════
    // 2. 내면 & 감정 (Moon 별자리)
    // ═══════════════════════════════════
    if (moonPos) {
        const moonEasy = [
            'Une passion ardente brûle en vous. Les émotions montent vite et redescendent vite. En cas de stress, vous devez bouger — exercice ou activités en plein air marchent le mieux.',
            'Vous êtes émotionnellement très stable. Vous n\'aimez pas les changements soudains et trouvez le réconfort dans le familier. Bonne nourriture, musique et belle nature guérissent votre âme.',
            'Vous traitez les émotions par la conversation. Parler vous fait du bien. Vous êtes curieux de tout et ne supportez pas l\'ennui. Votre humour peut alléger toute humeur.',
            'Vous êtes extrêmement sensible et empathique. Vous absorbez les émotions des autres comme une éponge. Votre maison est votre espace sûr, et votre lien avec votre mère est fort.',
            'Votre expression émotionnelle est dramatique et passionnée. Vous avez profondément besoin d\'être aimé et reconnu. Mais vous donnez l\'amour avec autant de générosité. Les activités créatives sont votre médecine émotionnelle.',
            'Vous tendez à analyser vos émotions. Vous vous inquiétez beaucoup mais êtes excellent pour résoudre les problèmes pratiquement. Les routines quotidiennes apportent la stabilité émotionnelle.',
            'Vous trouvez l\'équilibre émotionnel dans les relations. Vous vous sentez seul(e) quand vous êtes seul(e) et vous stabilisez avec des amis proches ou un partenaire. Vous détestez les conflits et trouvez la paix dans la beauté et l\'art.',
            'Vos émotions sont aussi profondes et intenses que l\'océan. Vous aimez profondément et n\'oubliez jamais la trahison. Votre intuition est incroyablement forte — vous lisez la vérité à travers les yeux et les actes.',
            'Vous êtes émotionnellement lumineux et optimiste. Vous aimez la liberté et détestez être contraint. Voyager est votre meilleur remède émotionnel.',
            'Vous ne montrez pas facilement vos émotions. Fort sens des responsabilités, le devoir passe toujours en premier. Vous étiez peut-être mature au-delà de votre âge enfant, mais vous devenez plus ouvert émotionnellement avec l\'âge.',
            'Vous avez des schémas émotionnels uniques et imprévisibles. Vous aimez de manières non conventionnelles et voyez la vue d\'ensemble. Vous trouvez l\'épanouissement émotionnel dans les causes sociales.',
            'Vous êtes extrêmement intuitif et spirituel. Vos rêves sont vivides et parfois prophétiques. Vous ressentez profondément la douleur des autres. Art, méditation et eau vous apportent la paix.'
        ];
        const moonInterp = [
            'Une passion ardente brûle intérieurement. Les émotions sont spontanées et changent vite. La colère s\'enflamme vite mais s\'éteint aussi vite ; désir d\'indépendance émotionnelle.',
            'Émotionnellement très stable, cherchant le confort. N\'aime pas le changement et trouve la sécurité dans le familier. Guéri par la bonne nourriture, la musique et la nature.',
            'Traite les émotions rationnellement et organise les sentiments par la conversation. Curieux avec de nombreux intérêts simultanés. Cherche la variété plutôt que la profondeur émotionnelle.',
            'Lune dans son propre signe (domicile). Extrêmement riche en sensibilité, absorbant les émotions des autres. Forts instincts maternels, trouvant la stabilité à la maison.',
            'Expression émotionnelle dramatique et passionnée. Fort besoin d\'être reconnu et aimé. Les activités créatives servent de guérison émotionnelle. Cœur romantique et généreux.',
            'Tendance à analyser et organiser les émotions. S\'inquiète beaucoup et est perfectionniste mais résout les choses pratiquement. Trouve la stabilité dans les routines quotidiennes.',
            'Trouve l\'équilibre émotionnel dans les relations. Se sent anxieux seul et se stabilise avec un partenaire. Extrêmement averse aux conflits, trouvant la paix dans l\'art et la beauté.',
            'Les émotions sont aussi profondes et intenses que l\'océan. Aime profondément et déteste profondément ; ne pardonne jamais la trahison. Intuition très forte.',
            'Émotionnellement optimiste et amoureux de la liberté. N\'aime pas être contraint et cherche de nouvelles expériences. Sublime les émotions par la pensée philosophique.',
            'Contrôle bien les émotions et ne les montre pas extérieurement. Fort sens des responsabilités. Peut avoir eu des difficultés émotionnelles dans l\'enfance, mais mûrit avec l\'âge.',
            'Schémas émotionnels uniques et imprévisibles. Indépendant, aimant de manières non conventionnelles. Poursuit l\'amour universel pour l\'humanité et les causes sociales.',
            'Extrêmement intuitif et spirituel. Les rêves sont vivides et peuvent être prophétiques. Empathise profondément avec la souffrance des autres. Trouve la stabilité dans l\'art et la méditation.'
        ];
        html += `<div class="interp-card">
            <div class="interp-title">🌙 ${isEasy ? 'Votre style émotionnel' : 'Intérieur & Émotions — Lune : ' + SIGNS[moonPos.sign] + ' ' + SIGN_SYMBOLS[moonPos.sign]}</div>
            <div class="interp-text">${isEasy ? moonEasy[moonPos.sign] : moonInterp[moonPos.sign]}</div>
        </div>`;
    }

    // ═══════════════════════════════════
    // 3. 💰 wealth운 (2궁, 11 house 분석)
    // ═══════════════════════════════════
    const h2planets = planetsInHouse(2);
    const h11planets = planetsInHouse(11);
    const h2sign = (lagnaSign + 1) % 12;
    const h11sign = (lagnaSign + 10) % 12;

    let wealthText = isEasy ? '' : `<strong>2e Maison (Richesse accumulée) :</strong> ${SIGNS[h2sign]}. `;
    if (h2planets.length === 0) {
        wealthText += isEasy ? 'L\'accumulation de richesse est stable et régulière. Se construit sans grandes fluctuations. ' : 'Pas de planètes en 2e — accumulation de richesse régulière. ';
    } else {
        h2planets.forEach(p => {
            const pWealth = {
                'Sun': 'Revenus par autorite et statut. Gains potentiels du gouvernement ou secteur public.',
                'Moon': 'Situation financiere fluctuante. Revenus possibles dans les affaires publiques ou la restauration.',
                'Mars': 'Tendances d\'investissement agressives. Revenus de l\'immobilier, technologie ou domaines militaires.',
                'Mercury': 'Gagner de l\'argent par les capacites intellectuelles. Richesse de l\'ecriture, education et IT.',
                'Jupiter': 'La position la plus auspicieuse ! Fortune abondante. Grands revenus de l\'education, droit ou religion.',
                'Venus': 'Accumule la richesse par articles de luxe, art, divertissement et mode.',
                'Saturn': 'Accumule lentement et regulierement. Difficultes au debut mais stabilisation apres la cinquantaine.',
                'Rahu': 'Gagne de l\'argent par des methodes non conventionnelles. Richesse soudaine de l\'etranger.',
                'Ketu': 'Indifference a la richesse. Valorise le spirituel sur le materiel ; attention aux pertes soudaines.'
            };
            wealthText += isEasy ? `${pWealth[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pWealth[p.id] || ''} `;
        });
    }

    wealthText += isEasy ? '<br><br>' : `<br><br><strong>11e Maison (Revenus & Gains) :</strong> ${SIGNS[h11sign]}. `;
    if (h11planets.length === 0) {
        wealthText += isEasy ? 'Les revenus sont stables mais sans grandes fluctuations.' : 'Pas de planètes en 11e — revenus stables sans grands changements.';
    } else {
        h11planets.forEach(p => {
            const pIncome = {
                'Jupiter': 'Grands revenus et profits abondants ! Les reseaux sociaux apportent la richesse.',
                'Venus': 'Revenus par l\'art, la sociabilite et la mode. Les amies sont utiles.',
                'Saturn': 'Revenus stables mais croissance lente. Bonne securite retraite.',
                'Mars': 'Revenus par la competition. Profits de la technologie, immobilier et sport.',
                'Mercury': 'Revenus par les reseaux intellectuels. Aptitude entrepreneuriale.',
                'Sun': 'Revenus par l\'autorite. Les connexions politiques apportent la richesse.',
                'Moon': 'Revenus par la popularite publique. Fluctuant mais flux regulier.'
            };
            wealthText += isEasy ? `${pIncome[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pIncome[p.id] || ''} `;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">💰 ${isEasy ? 'Ma fortune de richesse' : 'Fortune de richesse'}</div>
        <div class="interp-text">${wealthText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 4. 💕 spouse & Marriage Fortune (7 house 분석)
    // ═══════════════════════════════════
    const h7sign = (lagnaSign + 6) % 12;
    const h7planets = planetsInHouse(7);
    const venus = positions.find(p => p.id === 'Venus');

    const spouseSign = [
        'Un partenaire indépendant et énergique. Destiné à quelqu\'un avec une forte volonté et du leadership. Un partenaire actif et direct.',
        'Un partenaire beau et artistique. Destiné à quelqu\'un matériellement stable. Un partenaire sensuel et loyal.',
        'Un partenaire intelligent avec de bonnes compétences en communication. Destiné à quelqu\'un avec qui bien converser.',
        'Un partenaire émotionnel et domestique. Destiné à quelqu\'un de bienveillant. Un partenaire avec une chaleur maternelle.',
        'Un partenaire charismatique et digne. Destiné à quelqu\'un de socialement proéminent. Un partenaire avec haute estime de soi mais généreux.',
        'Un partenaire méticuleux et pratique. Destiné à quelqu\'un intéressé par la santé. Un partenaire analytique et orienté service.',
        'Un partenaire attrayant et raffiné. Destiné à quelqu\'un de diplomatique. Un partenaire avec un excellent goût artistique.',
        'Un partenaire intense et mystérieux. Destiné à quelqu\'un avec des émotions profondes. Un partenaire transformateur et passionné.',
        'Un partenaire libre et optimiste. Possible connexion avec l\'étranger ou une autre culture. Un partenaire philosophique et aventurier.',
        'Un partenaire sérieux et ambitieux. Possible différence d\'âge. Un partenaire responsable et socialement réussi. Le mariage peut venir tard.',
        'Un partenaire unique et indépendant. Rencontre ou relation non conventionnelle. Un partenaire intellectuel et innovant.',
        'Un partenaire spirituel et intuitif. Lié à un artiste ou praticien spirituel. Un partenaire rêveur et romantique.'
    ];

    const spouseAppearance = [
        'Traits marqués, impression forte. Carrure athlétique. Yeux intenses pleins d\'énergie. Les tons rouges conviennent bien.',
        'Apparence douce et attrayante. Silhouette pleine avec lèvres sensuelles. Belle peau avec beauté naturelle.',
        'Apparence jeune, impression brillante. Mince et grand(e). Visage expressif avec yeux pétillants. Tendance et stylé(e).',
        'Visage rond, impression douce. Silhouette légèrement courbe. Peau claire avec grands yeux. Aura maternelle.',
        'Carrure digne avec apparence charismatique. Cheveux abondants sont un trait. Présence imposante, bien habillé(e).',
        'Apparence soignée et propre. Mince avec bonnes proportions. Impression intellectuelle. Mode minimaliste.',
        'Apparence équilibrée, impression raffinée. Visage symétrique. Sourire charmant, aura sociale. Peut avoir des fossettes.',
        'Apparence aiguisée et mystérieuse. Yeux profonds laissant forte impression. Mince avec traits aiguisés. Préfère les tons sombres.',
        'Grand(e) avec bonne carrure. Impression brillante et ouverte. Charme exotique. Vêtements décontractés.',
        'Apparence sérieuse et mature. Mince avec structure osseuse définie. Paraît plus âgé(e) mais plus attrayant(e) avec le temps.',
        'Apparence unique et extraordinaire. Mode distinctive. Grand(e) ou avec traits notables. Charme non conventionnel.',
        'Apparence douce et rêveuse. Grands yeux avec expression rêveuse. Légèrement potelé(e) avec peau translucide. Charme mystique.'
    ];

    let spouseText = (isEasy ? '' : '<strong>📐 Apparence du partenaire :</strong><br>') + spouseAppearance[h7sign] + (isEasy ? '<br><br>' : isEasy ? '<br><br>' : '<br><br><strong>📋 Personnalité du partenaire :</strong><br>') + spouseSign[h7sign];

    if (h7planets.length > 0) {
        spouseText += isEasy ? '<br><br>' : '<br><br><strong>Planètes en 7e :</strong> ';
        h7planets.forEach(p => {
            const pH7 = {
                'Sun': 'Le partenaire est socialement reconnu. Peut etre dominant mais respectable.',
                'Moon': 'Un partenaire emotionnel et attentionne. Vie conjugale avec connexion profonde.',
                'Mars': 'Passionne mais disputes possibles. Un partenaire a forte volonte.',
                'Mercury': 'Un partenaire intellectuel avec grande conversation. Bon partenariat d\'affaires.',
                'Jupiter': 'La position la plus benie ! Un partenaire sage et moral. Vie conjugale heureuse.',
                'Venus': 'Un partenaire tres attrayant et aimant. Vie conjugale romantique.',
                'Saturn': 'Mariage tardif ou partenaire avec grande difference d\'age. Difficile mais stable.',
                'Rahu': 'Mariage non conventionnel. Partenaire de l\'etranger ou autre contexte.',
                'Ketu': 'Connexion de vies passees. Fort lien spirituel mais distance dans les relations.'
            };
            spouseText += isEasy ? `<br>${pH7[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pH7[p.id] || ''}`;
        });
    }

    if (venus) {
        const venusHouse = houseOf(venus.sign);
        spouseText += isEasy ? '<br><br>' : `<br><br><strong>Venus Position (${venusHouse}th):</strong> `;
        const venusHouseInterp = {
            1: 'Apparence attrayante. Apprecie la romance et tombe amoureux facilement.',
            2: 'La richesse vient par le partenaire. Belle voix et gouts gourmets.',
            3: 'Competences de communication artistiques. Relations agreables avec les freres/soeurs.',
            4: 'Bonheur a la maison avec belle residence. Forte influence de la mere.',
            5: 'Une vie riche en romance. Bonne relation avec les enfants.',
            6: 'Attitude de service dans la romance. Possibilite de romance au travail.',
            7: 'Partenaire tres attrayant. Fort indicateur de vie conjugale heureuse.',
            8: 'Amour profond et transformateur. Romance secrete. Richesse du partenaire.',
            9: 'Romance a l\'etranger. Connexion avec un professeur ou mentor.',
            10: 'Mariage socialement reconnu. Rencontre par la carriere.',
            11: 'D\'amis a amoureux. Connexions par activites sociales.',
            12: 'Romance secrete. Connexions etrangeres. Amour spirituel.'
        };
        spouseText += venusHouseInterp[venusHouse] || '';
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Mon partenaire' : '💕 Partenaire & Mariage — 7e Maison : ' + SIGNS[h7sign] + ' ' + SIGN_SYMBOLS[h7sign]}</div>
        <div class="interp-text">${spouseText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 5. 💼 career & 사회적 성취 (10 house 분석)
    // ═══════════════════════════════════
    const h10sign = (lagnaSign + 9) % 12;
    const h10planets = planetsInHouse(10);

    const careerSign = [
        'Adapte au militaire, police, sport, chirurgie, gestion d\'entreprise, leadership.',
        'Finance, industrie alimentaire, agriculture, mode, immobilier, art, banque.',
        'Medias, ecriture, education, communications, informatique, marketing, traduction.',
        'Medical, soins infirmiers, hotellerie, maritime, immobilier, restauration.',
        'Politique, divertissement, gestion, agences gouvernementales, positions de leadership.',
        'Medical, comptabilite, analyse, conseil, sante, controle qualite.',
        'Droit, diplomatie, mode, design interieur, conseil, planification d\'evenements.',
        'Recherche, investigation, assurance, medecine, psychologie, fiscalite, mines.',
        'Education, droit, religion, edition, voyage, commerce international.',
        'Gestion, fonction publique, architecture, genie civil, politique, grandes entreprises.',
        'Technologie, science, informatique, aviation, aerospatiale, travail social, innovation.',
        'Art, cinema, musique, medical, etranger, domaines spirituels, ONG.'
    ];

    let careerText = isEasy ? careerSign[h10sign] : `La 10e maison est en ${SIGNS[h10sign]}. ${careerSign[h10sign]}`;

    if (h10planets.length > 0) {
        careerText += isEasy ? '<br><br>' : '<br><br><strong>Planètes en 10e :</strong>';
        h10planets.forEach(p => {
            const pCareer = {
                'Sun': ' Gouvernement, leadership, positions autoritaires. Carriere avec attention sociale.',
                'Moon': ' Carriere publique. Soins, hotellerie, restauration, domaines emotionnels.',
                'Mars': ' Technologie, ingenierie, militaire, chirurgie, sport. Succes en competition.',
                'Mercury': ' Affaires, communication, IT, education. Succes par capacites intellectuelles.',
                'Jupiter': ' Education, droit, religion, conseil. Carriere respectee. Meilleure position.',
                'Venus': ' Art, divertissement, mode, beaute, diplomatie. Succes en domaines creatifs.',
                'Saturn': ' Succes lent mais certain. Organisations systematiques, architecture, fonction publique.'
            };
            careerText += isEasy ? `<br>${pCareer[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pCareer[p.id] || ''}`;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 Ma carrière' : '💼 Carrière & Réussite sociale — 10e Maison : ' + SIGNS[h10sign] + ' ' + SIGN_SYMBOLS[h10sign]}</div>
        <div class="interp-text">${careerText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 6. 🏥 health (6 house + Lagna 분석)
    // ═══════════════════════════════════
    const h6sign = (lagnaSign + 5) % 12;
    const h6planets = planetsInHouse(6);

    const healthByLagna = [
        'Attention aux conditions de tete, cerveau et visage. Maux de tete, fievres et inflammations.',
        'Attention aux problemes de cou, thyroide et machoire. Tendance a trop manger et diabete.',
        'Attention aux poumons, bras, epaules et systeme nerveux. Anxiete et problemes de sommeil.',
        'Attention aux problemes d\'estomac, poitrine et seins. Troubles digestifs.',
        'Attention aux problemes de coeur, dos et colonne. Gestion cardiovasculaire essentielle.',
        'Attention au systeme digestif, intestins et peau. Indigestion et allergies.',
        'Attention aux reins, bas du dos et peau. Hydratation et equilibre essentiels.',
        'Attention aux systemes reproducteur et excreteur. Conditions chroniques possibles.',
        'Attention au foie, cuisses et hanches. Tendance au surpoids.',
        'Attention aux os, articulations, genoux et peau. Rhumatisme et arthrite.',
        'Attention aux chevilles, mollets et systeme circulatoire. Gestion pression arterielle.',
        'Attention aux pieds, systeme lymphatique et immunite. Conditions inexpliquees possibles.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏥 Ma santé' : '🏥 Santé — Zones vulnérables'}</div>
        <div class="interp-text">${healthByLagna[lagnaSign]}${h6planets.length > 0 ? isEasy ? '<br><br>Attention particulière à la santé nécessaire.' : '<br><br>6e maison : ' + h6planets.map(p => p.name).join(', ') + ' requiert une attention particulière à la santé.' : ''}</div>
    </div>`;

    // ═══════════════════════════════════
    // 7. ⏳ 현재 대운 해석
    // ═══════════════════════════════════
    if (moonPos) {
        const nak = NAKSHATRAS[moonPos.nakshatra];
        if (nak) {
            const startRuler = nak.ruler;
            let startIdx = DASHA_ORDER.indexOf(startRuler);
            if (startIdx === -1) startIdx = 0;
            const now = new Date();
            const birthDate = new Date(Date.UTC(
                parseInt(document.getElementById('birthYear').value),
                parseInt(document.getElementById('birthMonth').value) - 1,
                parseInt(document.getElementById('birthDay').value)
            ));
            let currentDate = new Date(birthDate);
            let currentDasha = null;

            for (let i = 0; i < 9; i++) {
                const idx = (startIdx + i) % 9;
                const planet = DASHA_ORDER[idx];
                const years = DASHA_YEARS[planet];
                const endD = new Date(currentDate);
                endD.setFullYear(endD.getFullYear() + years);
                if (now >= currentDate && now < endD) {
                    currentDasha = planet;
                    break;
                }
                currentDate = endD;
            }

            if (currentDasha) {
                const dashaInterp = {
                    'Sun': 'Une periode de decouverte de soi et d\'autorite. Un temps pour exercer le leadership et recevoir la reconnaissance sociale.',
                    'Moon': 'Une periode d\'emotions et de vie interieure. Le foyer et la relation avec la mere deviennent importants. Les fluctuations emotionnelles sont grandes mais l\'intuition se renforce.',
                    'Mars': 'Une periode d\'action et d\'energie. Un excellent moment pour commencer courageusement de nouveaux projets. Attention aux disputes et accidents.',
                    'Rahu': 'Une periode de changement rapide et d\'innovation. Des opportunites et defis inattendus arrivent. Activites liees a l\'etranger deviennent actives. Un cycle de 18 ans.',
                    'Jupiter': 'Une periode de chance et de croissance ! Education, mariage, naissance, promotions deviennent plus probables. La croissance spirituelle s\'approfondit.',
                    'Saturn': 'Une periode de patience et d\'epreuves. La croissance est lente mais certaine. Attention a la sante, surtout os et articulations. Un cycle de 19 ans.',
                    'Mercury': 'Une periode d\'activite intellectuelle et d\'affaires. Favorable pour l\'apprentissage, la communication et les entreprises.',
                    'Ketu': 'Une periode d\'eveil spirituel et de detachement. Des changements soudains possibles mais menant a la croissance spirituelle. L\'intuition devient tres forte.',
                    'Venus': 'Une periode d\'amour et d\'abondance ! Romance, mariage et activites artistiques deviennent actifs. Le sens esthetique se developpe. Le cycle le plus long avec 20 ans.'
                };
                html += `<div class="interp-card">
                    <div class="interp-title">${isEasy ? '⏳ Période actuelle : ' + DASHA_KO[currentDasha] : '⏳ Dasha actuel : ' + DASHA_KO[currentDasha] + ' Dasha'}</div>
                    <div class="interp-text">${dashaInterp[currentDasha]}</div>
                </div>`;
            }
        }
    }

    // ═══════════════════════════════════
    // 8. 🔮 특별 요가 (행성 조합)
    // ═══════════════════════════════════
    let yogaText = '';
    const jupiter = positions.find(p => p.id === 'Jupiter');
    const mars = positions.find(p => p.id === 'Mars');
    const saturn = positions.find(p => p.id === 'Saturn');

    // Gajakesari Yoga
    if (moonPos && jupiter) {
        const moonH = houseOf(moonPos.sign);
        const jupH = houseOf(jupiter.sign);
        const diff = Math.abs(moonH - jupH);
        if (diff === 0 || diff === 3 || diff === 6 || diff === 9) {
            yogaText += isEasy ? '<strong>🐘 Bénédiction de sagesse et renommée</strong>' : '<strong>🐘 Gajakesari Yoga</strong> — Relation Kendra Lune-Jupiter ! Combinaison sagesse, renommee, abondance. Respecte en societe. Bonne fortune en education et enfants.<br><br>';
        }
    }

    // Budha-Aditya Yoga
    const sun = positions.find(p => p.id === 'Sun');
    const mercury = positions.find(p => p.id === 'Mercury');
    if (sun && mercury && sun.sign === mercury.sign) {
        yogaText += isEasy ? '<strong>📚 Bénédiction d\'intelligence exceptionnelle</strong>' : '<strong>📚 Budha-Aditya Yoga</strong> — Soleil-Mercure meme signe ! Intellect et communication exceptionnels. Succes en education, ecriture, affaires.<br><br>';
    }

    // Chandra-Mangala Yoga
    if (moonPos && mars && moonPos.sign === mars.sign) {
        yogaText += isEasy ? '<strong>🔥 Bénédiction de volonté forte et richesse</strong>' : '<strong>🔥 Chandra-Mangala Yoga</strong> — Lune-Mars meme signe ! Forte volonte et accumulation de richesse. Succes en affaires avec decisions audacieuses.<br><br>';
    }

    // Kuja Dosha (Manglik)
    if (mars) {
        const marsH = houseOf(mars.sign);
        if ([1,2,4,7,8,12].includes(marsH)) {
            yogaText += isEasy ? `<strong>⚠️ Précaution matrimoniale</strong>` : `<strong>⚠️ Kuja Dosha (Manglik)</strong> — Mars en maison ${marsH} — defis dans la vie conjugale possibles. Comparaison du theme du partenaire recommandee. Mariage apres 28 ans peut etre favorable.<br><br>`;
        }
    }

    if (yogaText) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '🔮 Vos Talents Speciaux' : '🔮 Yogas speciaux (Combinaisons planetaires)'}</div>
            <div class="interp-text">${yogaText}</div>
        </div>`;
    }

    document.getElementById('interpWrap').innerHTML = html;
}

// ═══════════════════════════════════════════════════
// 행성별 하우스 상세 해석
// ═══════════════════════════════════════════════════
const PLANET_IN_HOUSE = {
    Sun: [
        '1re Maison : Soi fort et leadership. Sain et vital. Haute estime de soi et indépendant.',
        '2e Maison : Valorise l\'honneur familial. Revenus par l\'autorité. Héritage du père. Santé oculaire à surveiller.',
        '3e Maison : Courageux et décisif. Leader parmi les frères/sœurs. Autorité en écriture/communication.',
        '4e Maison : Tension dans les relations parentales. Propriété immobilière/véhicules. Agitation intérieure.',
        '5e Maison : Talent créatif exceptionnel. Bonne relation avec les enfants. Capacités d\'investissement.',
        '6e Maison : Pouvoir de vaincre les ennemis. Capacités de gestion de santé. Victoire dans les litiges.',
        '7e Maison : Partenaire de haut statut social. Rôle de leader dans les partenariats.',
        '8e Maison : Longévité à surveiller. Avantages d\'héritage/assurance. Pouvoir secret.',
        '9e Maison : Le père est une figure respectée. Succès en droit/religion/éducation supérieure.',
        '10e Maison : La meilleure position ! Succès social et renommée. Leader dans le secteur gouvernemental/public.',
        '11e Maison : Grands revenus et réseau social. Amis de haut statut. Excellente réalisation d\'objectifs.',
        '12e Maison : Succès à l\'étranger. Quêtes spirituelles. Distance du père. Apprécie la solitude.'
    ],
    Moon: [
        '1re Maison : Apparence attrayante. Personnalité émotionnelle et changeante. Populaire auprès du public.',
        '2e Maison : Environnement familial confortable. Bonne alimentation. Parole douce. Liens familiaux forts.',
        '3e Maison : Compétences de communication créatives. Aime voyager. Lien émotionnel avec les frères/sœurs.',
        '4e Maison : La meilleure position ! Foyer heureux. Lien fort avec la mère. Bonne fortune immobilière.',
        '5e Maison : Amour profond pour les enfants. Personnalité romantique. Capacité d\'investissement intuitive.',
        '6e Maison : Problèmes de santé par stress émotionnel. Victoire sur les ennemis. Esprit de service.',
        '7e Maison : Partenaire attrayant. Mariage émotionnellement profond. Tendance à dépendre du partenaire.',
        '8e Maison : Turbulences émotionnelles et transformation. Intuition très forte. Héritage possible.',
        '9e Maison : Spirituel et philosophique. La mère est religieuse. Voyage/résidence à l\'étranger.',
        '10e Maison : Popularité publique et succès social. Hôtellerie/soins/alimentation.',
        '11e Maison : Beaucoup d\'amis et sociable. Revenus stables. Capacité à réaliser ses souhaits.',
        '12e Maison : Résidence possible à l\'étranger. Problèmes de sommeil. Inclinations spirituelles.'
    ],
    Mars: [
        '1re Maison : Physique fort et volonté. Cicatrices/blessures possibles. Impulsif mais courageux.',
        '2e Maison : Parole dure. Problèmes alimentaires. Disputes familiales. Mais capacité à accumuler la richesse.',
        '3e Maison : La meilleure position ! Courage et esprit aventurier. Fort lien fraternel. Talent sportif.',
        '4e Maison : Conflits domestiques. Litiges immobiliers. Tension avec la mère.',
        '5e Maison : Romance passionnée. Enfants actifs. Investissements spéculatifs. Talent sportif.',
        '6e Maison : Pouvoir d\'écraser les ennemis ! Force physique contre la maladie. Militaire/police/médecine.',
        '7e Maison : Kuja Dosha — Passion et conflit coexistent dans le mariage. Partenaire fort. Mariage après 28 recommandé.',
        '8e Maison : Attention aux accidents/chirurgies. Mais pouvoir de survivre aux crises.',
        '9e Maison : Conflit avec le père. Opinions fortes sur la religion. Litiges juridiques.',
        '10e Maison : Performance professionnelle exceptionnelle ! Militaire/ingénierie/chirurgie/police.',
        '11e Maison : Grands revenus ! Forte réalisation d\'objectifs. Aide des frères/sœurs.',
        '12e Maison : Dépenses élevées à l\'étranger. Problèmes de sommeil. Forte énergie sexuelle.'
    ],
    Jupiter: [
        '1re Maison : Position bénie ! Personnalité sage et généreuse. Grande stature et en bonne santé.',
        '2e Maison : Richesse abondante ! Grande famille. Revenus par l\'éducation. Orateur éloquent.',
        '3e Maison : Frères/sœurs qui réussissent. Écriture liée à la religion/éducation.',
        '4e Maison : Une des meilleures positions ! Maison spacieuse. Réussite académique. Mère sage.',
        '5e Maison : Intellect et créativité exceptionnels ! Bonne fortune avec les enfants. Investissements sages.',
        '6e Maison : Vainc facilement les ennemis. Victoires juridiques. Esprit de service. Attention au poids.',
        '7e Maison : Un partenaire sage et moral ! Mariage heureux. Partenariats d\'affaires réussis.',
        '8e Maison : Longévité ! Héritage. Profondeur de connaissance spirituelle. Intérêt pour l\'astrologie.',
        '9e Maison : La position la plus puissante ! Grande fortune. Bénédictions du maître. Voyages à l\'étranger.',
        '10e Maison : Renommée et respect social ! Leader en éducation/droit/religion. Meilleure fortune de carrière.',
        '11e Maison : Grands revenus et profits ! Réalisation de souhaits. Connexions influentes.',
        '12e Maison : Fortune à l\'étranger. Libération spirituelle. Plaisirs célestes. Dons et charité.'
    ],
    Venus: [
        '1re Maison : Apparence très attrayante ! Talent artistique. Apprécie le luxe. Sociable et populaire.',
        '2e Maison : Richesse abondante ! Nourriture fine et articles de luxe. Voix douce. Harmonie familiale.',
        '3e Maison : Communication artistique. Belle écriture. Bonne relation avec les sœurs.',
        '4e Maison : Belle maison et véhicules ! Style de vie luxueux. Mère belle et artistique.',
        '5e Maison : Amour romantique ! Talent en art/divertissement. Beaux enfants.',
        '6e Maison : Difficultés en romance. Beauté liée à la santé. Victoire sur les ennemis par le charme.',
        '7e Maison : La meilleure position ! Partenaire très attrayant. Mariage heureux.',
        '8e Maison : Amour profond et transformateur. Richesse du partenaire. Romance secrète.',
        '9e Maison : Romance à l\'étranger. Voyages artistiques. Belle relation avec les professeurs.',
        '10e Maison : Succès en art/mode/divertissement ! Socialement attrayant. Aide des femmes.',
        '11e Maison : Revenus par les réseaux sociaux ! Aide d\'amies. Réalisation de souhaits.',
        '12e Maison : Amour à l\'étranger. Romance secrète. Plaisirs intimes. Inspiration artistique.'
    ],
    Saturn: [
        '1re Maison : Stature mince. Sérieux et responsable. Difficultés d\'enfance. Brille avec l\'âge.',
        '2e Maison : Accumulation lente de richesse. Style de vie frugal. Parole lourde. Distance de la famille.',
        '3e Maison : Excellente position ! Forte volonté et patience. Responsabilité envers les frères/sœurs.',
        '4e Maison : Difficultés avec la mère. Environnement domestique strict. Vieilles maisons.',
        '5e Maison : Enfants tardifs ou peu nombreux. Investissements prudents. Luttes académiques.',
        '6e Maison : Vainc les ennemis par la patience ! Conditions chroniques mais gérables. Succès dans le service.',
        '7e Maison : Mariage tardif. Partenaire plus âgé. Difficile au début mais mariage stable.',
        '8e Maison : Longévité ! Attention aux conditions chroniques. Retards dans les héritages.',
        '9e Maison : Relation difficile avec le père. Approche sérieuse de la religion.',
        '10e Maison : Grande position ! Succès social lent mais certain. Leader dans les grandes entreprises/gouvernement.',
        '11e Maison : Croissance régulière des revenus ! Amis plus âgés. Atteindre les objectifs par la patience.',
        '12e Maison : Difficultés et croissance à l\'étranger. Problèmes de sommeil. Pratique spirituelle.'
    ]
};

function renderPlanetHouse(positions, lagnaSign) {
    function houseOf(signIdx) { return ((signIdx - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = ['','Soi','Argent·Famille','Communication','Foyer','Enfants·Romance','Santé','Partenaire','Transformation','Fortune·Étranger','Carrière','Revenus','Spiritualité'];
    let html = '';

    positions.forEach(p => {
        if (!PLANET_IN_HOUSE[p.id]) return;
        const house = houseOf(p.sign);
        const desc = PLANET_IN_HOUSE[p.id][house - 1];
        if (!desc) return;

        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? (houseArea[house]||'') : p.symbol + ' ' + p.name + ' → ' + house + 'e Maison (' + SIGNS[p.sign] + ')'}</div>
            <div class="interp-text">${isEasy ? desc.replace(/^\d+\w{0,2}\s*[Hh]ouse:?\s*/, '') : desc}</div>
        </div>`;
    });

    document.getElementById('planetHouseWrap').innerHTML = html;
}

// ═══════════════════════════════════════════════════
// 교육 & 지식
// ═══════════════════════════════════════════════════
function renderEducation(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    function planetsInHouse(h) { return positions.filter(p => houseOf(p.sign) === h); }

    const h4 = planetsInHouse(4);
    const h5 = planetsInHouse(5);
    const h4sign = (lagnaSign + 3) % 12;
    const h5sign = (lagnaSign + 4) % 12;

    const isEasy = window.vedicMode === 'easy';
    let text = isEasy ? '<strong>Éducation de base :</strong> ' : `<strong>4e Maison (Éducation de base) :</strong> ${SIGNS[h4sign]}. `;
    const eduSign4 = ['Apprentissage actif, education physique/militaire', 'Beaux-arts/musique/education culinaire', 'Langues/litterature/communication', 'Accent sur education a domicile, histoire', 'Theatre/leadership/sciences politiques', 'Science/medecine/analytique', 'Droit/diplomatie/design', 'Psychologie/recherche/investigation', 'Philosophie/theologie/etudes internationales', 'Commerce/administration/architecture', 'IT/science technologique/aviation', 'Art/cinema/musique/spiritualite'];
    text += eduSign4[h4sign] + ' adapte. ';
    if (h4.length > 0 && !isEasy) text += 'En 4e maison, ' + h4.map(p => p.name).join(', ') + ' influence l\'education. ';

    const jupiter = positions.find(p => p.id === 'Jupiter');
    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if ([1,4,5,9].includes(jH)) text += isEasy ? '<br><br>🎓 <strong>Haute reussite academique attendue !</strong> Ecole superieure/doctorat/etudes a l\'etranger possible.' : '<br><br>🎓 <strong>Jupiter en ' + jH + 'e maison — haute reussite academique attendue !</strong> Superieur/doctorat/etudes a l\'etranger possible.';
    }

    text += isEasy ? '<br><br><strong>Éducation supérieure :</strong> ' : `<br><br><strong>5e Maison (Éducation supérieure) :</strong> ${SIGNS[h5sign]}. `;
    if (h5.length > 0) {
        h5.forEach(p => {
            const h5p = { Sun: 'Excelle en leadership/sciences politiques', Moon: 'talent en art/psychologie', Mars: 'Talent en ingenierie/technologie/sport', Mercury: 'Genie en maths/langues/affaires', Jupiter: 'Meilleure position ! Erudit/professeur/chercheur', Venus: 'talent en art/design/musique', Saturn: 'Academique tardif mais recherche profonde' };
            text += isEasy ? `${h5p[p.id] || 'influence les etudes'}. ` : `${p.name}: ${h5p[p.id] || 'influence les etudes'}. `;
        });
    } else {
        text += isEasy ? 'Pas d\'énergie académique particulièrement forte, mais un effort régulier donnera de bons résultats.' : 'Pas de planètes en 5e — la position du 5e seigneur est la clé.';
    }

    document.getElementById('educationWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// children운
// ═══════════════════════════════════════════════════
function renderChildren(positions, lagnaSign) {
    const isEasy = window.vedicMode === 'easy';
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    function planetsInHouse(h) { return positions.filter(p => houseOf(p.sign) === h); }

    const h5 = planetsInHouse(5);
    const h5sign = (lagnaSign + 4) % 12;
    const jupiter = positions.find(p => p.id === 'Jupiter');

    let text = isEasy ? '' : `<strong>5e Maison (Enfants) :</strong> ${SIGNS[h5sign]}.<br><br>`;

    const childSign = [
        'Enfants actifs et independants. Talent en sport/leadership. Independants tot.',
        'Enfants calmes et artistiques. Talent en musique/art. Materiellement confortables.',
        'Enfants intelligents et eloquents. Excellents en academique. Possibilite de jumeaux.',
        'Enfants sensibles et gentils. Lien special avec la mere. Enfants domestiques.',
        'Enfants charismatiques et creatifs. Qualites de leader. Talent en divertissement.',
        'Enfants meticuleux et analytiques. Talent en medecine/science.',
        'Enfants charmants et sociables. Talent en art/diplomatie. Bon equilibre.',
        'Enfants intenses et intuitifs. Esprit de recherche/exploration.',
        'Enfants libres et aventuriers. Possible etude/voyage a l\'etranger.',
        'Enfants serieux et ambitieux. Murissent tot. Orientes vers la reussite.',
        'Enfants uniques et innovants. Talent en technologie/science.',
        'Enfants artistiques et spirituels. Riche imagination. Talent en musique/peinture.'
    ];
    text += childSign[h5sign];

    if (h5.length > 0) {
        text += isEasy ? '<br><br>' : '<br><br><strong>Planètes en 5e :</strong><br>';
        h5.forEach(p => {
            const ch = { Sun: 'Connexion avec les fils. Les enfants ont du leadership.', Moon: 'Connexion avec les filles. Fort lien emotionnel.', Mars: 'Enfants actifs. Peuvent etre difficiles a gerer.', Mercury: 'Enfants tres intelligents ! Excellents en academique.', Jupiter: 'Enfants benis ! Fortune par les enfants.', Venus: 'Beaux enfants artistiques. Connexion avec les filles.', Saturn: 'Les enfants peuvent venir tard. Mais enfants responsables.' };
            text += `${ch[p.id] || ''}<br>`;
        });
    }

    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if (jH === 5) text += isEasy ? '<br>🌟 <strong>Meilleure fortune d\'enfants ! Les enfants apportent grande chance.</strong>' : '<br>🌟 <strong>Jupiter en 5e ! Meilleure fortune d\'enfants.</strong>';
    }

    document.getElementById('childrenWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 해외운 & 이주
// ═══════════════════════════════════════════════════
function renderForeign(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    function planetsInHouse(h) { return positions.filter(p => houseOf(p.sign) === h); }

    const h9 = planetsInHouse(9);
    const h12 = planetsInHouse(12);
    const rahu = positions.find(p => p.id === 'Rahu');

    const isEasy = window.vedicMode === 'easy';
    let text = isEasy ? '<strong>Voyages à l\'étranger·fortune :</strong><br>' : '<strong>9e Maison (Voyages·fortune·Éducation supérieure) :</strong><br>';
    if (h9.length === 0) {
        text += 'Les voyages à l\'étranger existent mais pas de connexion forte.';
    } else {
        h9.forEach(p => {
            const f9 = { Sun: 'Le pere a des connexions etrangeres. Voyages gouvernementaux.', Moon: 'Apprecie les voyages emotionnellement. Popularite a l\'etranger.', Mars: 'Aventure/defi a l\'etranger. Activites militaires/technologiques.', Mercury: 'Etudes/affaires a l\'etranger reussies ! Capacite multilingue.', Jupiter: 'Grande fortune a l\'etranger ! Etudes/immigration reussies. Rencontre de maitres etrangers.', Venus: 'Romance a l\'etranger. Activites artistiques/mode a l\'etranger.', Saturn: 'Succes apres difficultes a l\'etranger. Residence longue duree.', Rahu: 'Fort indicateur de migration ! Profondement immerge dans la culture etrangere.', Ketu: 'Connexion etrangere de vies passees. Pelerinage spirituel.' };
            text += isEasy ? `${f9[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f9[p.id] || ''}<br>`;
        });
    }

    text += isEasy ? '<br><strong>Installation à l\'étranger :</strong><br>' : '<br><strong>12e Maison (Installation·Immigration) :</strong><br>';
    if (h12.length === 0) {
        text += 'La résidence domestique est plus naturelle.';
    } else {
        h12.forEach(p => {
            const f12 = { Sun: 'Trouver son identite a l\'etranger. Poste gouvernemental a l\'etranger.', Moon: 'Haute possibilite de vivre a l\'etranger ! Stabilite emotionnelle outre-mer.', Mars: 'Depense d\'energie a l\'etranger. Investissement/immobilier etranger.', Mercury: 'Affaires/IT a l\'etranger. Education outre-mer.', Jupiter: 'Croissance spirituelle a l\'etranger. Charite. Universite etrangere.', Venus: 'Luxe et plaisir a l\'etranger. Activites artistiques etrangeres.', Saturn: 'Travail dur a l\'etranger. Mais installation a long terme.', Rahu: 'Fort indicateur d\'immigration ! Adaptation a la culture occidentale.', Ketu: 'Pratique spirituelle a l\'etranger. Vie solitaire outre-mer.' };
            text += isEasy ? `${f12[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f12[p.id] || ''}<br>`;
        });
    }

    if (rahu) {
        const rH = houseOf(rahu.sign);
        if ([9, 12, 7].includes(rH)) text += isEasy ? '<br>✈️ <strong>Très haute possibilité de migration !</strong>' : '<br>✈️ <strong>Rahu en ' + rH + 'e — très haute chance de résidence à l\'étranger !</strong>';
    }

    document.getElementById('foreignWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 행성 품위
// ═══════════════════════════════════════════════════
function renderDignity(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = {1:'Soi',2:'Argent/Famille',3:'Communication/Frères',4:'Foyer/Mère',5:'Enfants/Romance',6:'Santé/Ennemis',7:'Partenaire',8:'Transformation/Héritage',9:'Chance/Étranger',10:'Carrière/Renommée',11:'Revenus/Souhaits',12:'Étranger/Spiritualité'};
    const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };
    const OWN = { Sun: [4], Moon: [3], Mars: [0,7], Mercury: [2,5], Jupiter: [8,11], Venus: [1,6], Saturn: [9,10] };

    // 쉬운 설명
    const planetRole = {
        Sun: 'Soi/Confiance/Père/Autorité',
        Moon: 'Émotions/Esprit/Mère/Quotidien',
        Mars: 'Énergie/Courage/Action/Compétition',
        Mercury: 'Intelligence/Communication/Apprentissage/Affaires',
        Jupiter: 'Chance/Sagesse/Richesse/Mariage',
        Venus: 'Amour/Charme/Art/Plaisir',
        Saturn: 'Patience/Épreuves/Responsabilité/Effort'
    };

    let html = `<div class="interp-card" style="margin-bottom:16px;">
        <div class="interp-text">
            ${isEasy ?
            '<strong>💡 Guide simple :</strong> Montre la force de chaque energie dans votre vie.<br><br>🟢 <strong>Tres Fort</strong> = Condition maximale ! Grande fortune et resultats.<br>🟡 <strong>Fort</strong> = Stable, bons resultats.<br>⚪ <strong>Moyen</strong> = Ni fort ni faible.<br>🔴 <strong>Faible</strong> = Defis mais surmontables avec effort.' :
            '<strong>💡 Guide :</strong> La dignite planetaire montre la force d\'un planete.<br><br>🟢 <strong>Exalte</strong> = Condition maximale ! Grande fortune dans ce domaine.<br>🟡 <strong>Domicile</strong> = Comme chez soi. Resultats stables et bons.<br>⚪ <strong>Neutre</strong> = Moyen. Ni fort ni faible.<br>🔴 <strong>Debilite</strong> = Affaibli. Defis mais surmontables avec effort.'}
        </div>
    </div>`;

    positions.forEach(p => {
        if (!EXALT.hasOwnProperty(p.id)) return;
        let dignity, emoji, meaning, color, simpleDesc;
        const role = planetRole[p.id];

        const house = houseOf(p.sign);
        const area = houseArea[house] || '';

        if (p.sign === EXALT[p.id]) {
            dignity = 'Exalte';
            emoji = '🟢';
            color = '#5cb85c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — plus grande benediction ! Les talents innes brillent et les bons resultats arrivent naturellement.`
                : `<strong>${p.name} a puissance maximale !</strong> L'energie de "${role}" maximisee dans <strong>${house}(${area})</strong>. Les talents brillent.`;
        } else if (p.sign === DEBI[p.id]) {
            dignity = 'Debilite';
            emoji = '🔴';
            color = '#d9534f';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — peut faire face a des defis. Mais l'effort conscient mene a une grande croissance. Voir les remedes ci-dessous.`
                : `<strong>${p.name} affaibli.</strong> L'energie de "${role}" affaiblie dans <strong>${house}(${area})</strong>. Defis mais croissance par l'effort.`;
        } else if (OWN[p.id] && OWN[p.id].includes(p.sign)) {
            dignity = 'Signe Propre';
            emoji = '🟡';
            color = '#c9a84c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — travaille stablement en votre faveur. Les bons resultats arrivent naturellement.`
                : `<strong>${p.name} chez soi !</strong> L'energie de "${role}" travaille stablement dans <strong>${house}(${area})</strong>.`;
        } else {
            dignity = 'Neutral';
            emoji = '⚪';
            color = '#999';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — influence moyenne. Ni particulierement fort ni faible.`
                : `L'energie de "${role}" de ${p.name} exerce une influence moyenne dans <strong>${house}(${area})</strong>.`;
        }

        html += `<div class="interp-card">
            <div class="interp-title">${emoji} ${isEasy ? area + ' — ' : p.symbol + ' ' + p.name + ' — ' + SIGNS[p.sign] + ' ' + SIGN_SYMBOLS[p.sign] + ' → ' + house + ' (' + area + ') — '}<span style="color:${color}">${isEasy ? (dignity.includes('Exalte') ? 'Tres Fort !' : dignity.includes('Debilite') ? 'Faible' : dignity.includes('Signe Propre') ? 'Fort' : 'Moyen') : dignity}</span></div>
            <div class="interp-text">
                ${isEasy ? '' : '<span style="color:#666;font-size:12px;">Role: ' + role + ' │ Position: ' + house + ' = ' + area + '</span><br><br>'}
                ${simpleDesc}
            </div>
        </div>`;
    });

    document.getElementById('dignityWrap').innerHTML = html;
}

// ═══════════════════════════════════════════════════
// 행운의 정보
// ═══════════════════════════════════════════════════
function renderLucky(lagnaSign, moonPos) {
    const luckyData = [
        { color: 'Rouge, Orange', number: '1, 9', day: 'Mardi', gem: 'Corail rouge', dir: 'Est' },
        { color: 'Blanc, Rose', number: '2, 6', day: 'Vendredi', gem: 'Diamant', dir: 'Sud-Est' },
        { color: 'Vert', number: '3, 5', day: 'Mercredi', gem: 'Emeraude', dir: 'Nord' },
        { color: 'Blanc, Argent', number: '2, 7', day: 'Lundi', gem: 'Perle', dir: 'Nord-Ouest' },
        { color: 'Or, Orange', number: '1, 4', day: 'Dimanche', gem: 'Rubis', dir: 'Est' },
        { color: 'Vert, Vert clair', number: '5, 3', day: 'Mercredi', gem: 'Emeraude', dir: 'Sud' },
        { color: 'Blanc, Pastel', number: '6, 2', day: 'Vendredi', gem: 'Diamant', dir: 'Ouest' },
        { color: 'Rouge, Cramoisi', number: '9, 1', day: 'Mardi', gem: 'Corail rouge', dir: 'Sud' },
        { color: 'Jaune, Or', number: '3, 9', day: 'Jeudi', gem: 'Saphir jaune', dir: 'Nord-Est' },
        { color: 'Bleu marine, Noir', number: '8, 4', day: 'Samedi', gem: 'Saphir bleu', dir: 'Ouest' },
        { color: 'Bleu marine, Violet', number: '4, 8', day: 'Samedi', gem: 'Saphir bleu', dir: 'Ouest' },
        { color: 'Jaune, Or', number: '3, 7', day: 'Jeudi', gem: 'Saphir jaune', dir: 'Nord-Est' }
    ];

    const d = luckyData[lagnaSign];
    const html = `<div class="interp-card">
        <div class="interp-text">
            <strong>🎨 Couleur porte-bonheur :</strong> ${d.color}<br>
            <strong>🔢 Numéro porte-bonheur :</strong> ${d.number}<br>
            <strong>📅 Jour porte-bonheur :</strong> ${d.day}<br>
            <strong>💎 Pierre porte-bonheur :</strong> ${d.gem}<br>
            <strong>🧭 Direction porte-bonheur :</strong> ${d.dir}<br>
            <strong>🪐 Planète maîtresse du Lagna :</strong> ${['Mars','Venus','Mercure','Lune','Soleil','Mercure','Venus','Mars','Jupiter','Saturne','Saturne','Jupiter'][lagnaSign]}
        </div>
    </div>`;
    document.getElementById('luckyWrap').innerHTML = html;
}

// ═══════════════════════════════════════════════════
// 치유 & Strengthening
// ═══════════════════════════════════════════════════
function renderRemedy(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };

    const remedies = {
        Sun: { gem: 'Rubis', mantra: 'Om Suryaya Namaha', color: 'Orange/rouge le dimanche', food: 'Ble, safran, graines de tournesol', charity: 'Dimanche : donner du ble/cuivre' },
        Moon: { gem: 'Perle', mantra: 'Om Chandraya Namaha', color: 'Blanc/argent le lundi', food: 'Lait, riz, noix de coco', charity: 'Lundi : donner du riz/lait' },
        Mars: { gem: 'Corail rouge', mantra: 'Om Mangalaya Namaha', color: 'Rouge le mardi', food: 'Lentilles, fruits rouges', charity: 'Mardi : donner des lentilles rouges' },
        Mercury: { gem: 'Emeraude', mantra: 'Om Budhaya Namaha', color: 'Vert le mercredi', food: 'Haricots verts, legumes verts', charity: 'Mercredi : donner des legumes verts' },
        Jupiter: { gem: 'Saphir jaune', mantra: 'Om Gurave Namaha', color: 'Jaune le jeudi', food: 'Pois chiches, bananes, curcuma', charity: 'Jeudi : donner aliments jaunes/livres' },
        Venus: { gem: 'Diamant', mantra: 'Om Shukraya Namaha', color: 'Blanc/pastel le vendredi', food: 'Lait, creme, fruits', charity: 'Vendredi : donner vetements blancs/riz' },
        Saturn: { gem: 'Saphir bleu', mantra: 'Om Shanaishcharaya Namaha', color: 'Bleu marine/noir le samedi', food: 'Haricots noirs, sesame', charity: 'Samedi : donner haricots noirs/huile' }
    };

    let html = '';
    positions.forEach(p => {
        if (!remedies[p.id]) return;
        const r = remedies[p.id];
        const isDebi = DEBI[p.id] === p.sign;
        const house = houseOf(p.sign);
        const isWeak = isDebi || [6, 8, 12].includes(house);

        if (isWeak) {
            html += `<div class="interp-card">
                <div class="interp-title">${p.symbol} ${p.name} Renforcement ${isDebi ? '(Debilite — Particulierement Important !)' : '(Position Faible)'}</div>
                <div class="interp-text">
                    <strong>💎 Pierre :</strong> ${r.gem} (annulaire recommande)<br>
                    <strong>🙏 Mantra :</strong> "${r.mantra}" (108 fois par jour)<br>
                    <strong>🎨 Couleur :</strong> ${r.color}<br>
                    <strong>🍽️ Aliment :</strong> ${r.food}<br>
                    <strong>🤝 Charite :</strong> ${r.charity}
                </div>
            </div>`;
        }
    });

    if (!html) {
        html = '<div class="interp-card"><div class="interp-text">Toutes les planetes en bonnes positions ! Aucun remede special necessaire. Portez la pierre precieuse de votre maitre du Lagna pour la chance.</div></div>';
    }

    document.getElementById('remedyWrap').innerHTML = html;
}

// Enter key support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') _loadAstro(calculateChart);
});


// 분할 차트 (Divisional Charts) 계산
// ═══════════════════════════════════════

function getDivisionalSign(siderealLon, division) {
    const sign = Math.floor(siderealLon / 30);
    const degInSign = siderealLon % 30;
    const partSize = 30 / division;
    const part = Math.floor(degInSign / partSize);

    if (division === 7) {
        // D7 (삽탐샤): 홀수 사인은 같은 사인부터, 짝수 사인은 7번째 사인부터
        const startSign = (sign % 2 === 0) ? sign : (sign + 6) % 12;
        return (startSign + part) % 12;
    } else if (division === 10) {
        // D10 (다샴샤): 홀수 사인은 같은 사인부터, 짝수 사인은 9번째 사인부터
        const startSign = (sign % 2 === 0) ? sign : (sign + 8) % 12;
        return (startSign + part) % 12;
    } else if (division === 12) {
        // D12 (드와다샴샤): 같은 사인부터 시작
        return (sign + part) % 12;
    } else if (division === 60) {
        // D60 (샤슈티암샤): 같은 사인부터 시작, 60등분
        return (sign + part) % 12;
    }
    if (division === 2) {
        // D2 (Hora): 홀수 사인=Sun(Leo=4), 짝수 사인=Moon(게=3)
        return (part === 0) ? ((sign % 2 === 0) ? 3 : 4) : ((sign % 2 === 0) ? 4 : 3);
    } else if (division === 3) {
        // D3 (Drekkana): 같은 사인, 5번째, 9번째
        const d3starts = [0, 4, 8];
        return (sign + d3starts[part]) % 12;
    } else if (division === 4) {
        // D4 (Chaturthamsha): 같은 사인부터 시작
        return (sign + part * 3) % 12;
    } else if (division === 16) {
        // D16 (Shodashamsha): Aries부터 순서대로
        return (sign + part) % 12;
    } else if (division === 20) {
        // D20 (Vimshamsha): Aries부터 (불), Sagittarius부터 (흙), Leo부터 (바람), 게부터 (물)
        const d20start = [0, 8, 4, 3][sign % 4];
        return (d20start + part) % 12;
    } else if (division === 24) {
        // D24 (차투르Vimshamsha): 홀수 사인=Leo, 짝수 사인=게
        const d24start = (sign % 2 === 0) ? 4 : 3;
        return (d24start + part) % 12;
    } else if (division === 27) {
        // D27 (삽타Vimshamsha/나크샤트람샤): 불→양, 흙→게, 바람→Libra, 물→Capricorn
        const d27start = [0, 3, 6, 9][sign % 4];
        return (d27start + part) % 12;
    } else if (division === 30) {
        // D30 (Trimshamsha): 특수 규칙 (홀수/짝수 사인에 따라 다른 ruler)
        const d30odd = [0, 10, 8, 2, 6]; // Mars, Saturn, Jupiter, Mercury, Venus
        const d30even = [1, 5, 11, 3, 7]; // Venus, Mercury, Jupiter, Saturn, Mars
        const d30parts = [5, 5, 8, 7, 5]; // Degree of each part
        let cumDeg = 0;
        let d30part = 0;
        for (let i = 0; i < 5; i++) {
            cumDeg += d30parts[i];
            if (degInSign < cumDeg) { d30part = i; break; }
        }
        return (sign % 2 === 0) ? d30odd[d30part] : d30even[d30part];
    } else if (division === 40) {
        // D40 (Khavedamsha): 홀수 사인=Aries, 짝수 사인=Libra
        const d40start = (sign % 2 === 0) ? 0 : 6;
        return (d40start + part) % 12;
    } else if (division === 45) {
        // D45 (Akshavedamsha): 불→양, 흙→Leo, 바람→Sagittarius, 물→같은 패턴 반복
        const d45start = [0, 4, 8, 0][sign % 4];
        return (d45start + part) % 12;
    }
    return (sign + part) % 12; // fallback
}

function renderDivisionalChart(positions, lagnaSidereal, division, chartId, interpId, label, koName) {
    const chartEl = document.getElementById(chartId);
    const interpEl = document.getElementById(interpId);
    if (!chartEl) return;

    // 분할 Lagna
    const dLagnaSign = getDivisionalSign(lagnaSidereal, division);

    // 분할 행성 position
    const dPositions = positions.map(p => ({
        ...p,
        dSign: getDivisionalSign(p.sidereal, division)
    }));

    // 차트 렌더링
    chartEl.innerHTML = '';
    const signPlanets = {};
    for (let i = 0; i < 12; i++) signPlanets[i] = [];
    dPositions.forEach(p => { signPlanets[p.dSign].push(p); });

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            const signIdx = SI_LAYOUT[row][col];
            if (signIdx === -1) {
                cell.className = 'chart-cell empty';
                cell.innerHTML = '<div style="font-size:11px;color:#444;text-align:center;">' + label + '<br>' + koName + '</div>';
            } else {
                cell.className = 'chart-cell';
                let content = '<div class="sign-label">' + SIGN_SYMBOLS[signIdx] + ' ' + SIGNS[signIdx] + '</div>';
                if (signIdx === dLagnaSign) content += '<div class="lagna-marker">ASC</div>';
                signPlanets[signIdx].forEach(p => {
                    const cls = (p.natural === 'malefic') ? 'planet malefic' : 'planet benefic';
                    content += '<div class="' + cls + '">' + p.symbol + '</div>';
                });
                cell.innerHTML = content;
            }
            chartEl.appendChild(cell);
        }
    }

    // 해석
    if (!interpEl) return;
    const SIGN_RULERS = ['Mars','Venus','Mercure','Lune','Soleil','Mercure','Venus','Mars','Jupiter','Saturne','Saturne','Jupiter'];
    const RULER_NAMES = {Sun:'Sun',Moon:'Moon',Mars:'Mars',Mercury:'Mercury',Jupiter:'Jupiter',Venus:'Venus',Saturn:'Saturn',Rahu:'Rahu',Ketu:'Ketu'};

    const isEasy = window.vedicMode === 'easy';
    let html = '';

    if (division === 10) {
        // D10 해석: career/커리어
        const d10_1lord = SIGN_RULERS[dLagnaSign];
        const d10_10sign = (dLagnaSign + 9) % 12;
        const d10_10lord = SIGN_RULERS[d10_10sign];
        const d10_10planets = dPositions.filter(p => p.dSign === d10_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💼 Analyse détaillée de carrière' : '💼 D10 Analyse de carrière') + '</div><div class="interp-text">';
        if (isEasy) {
            html += '<strong>Votre tendance de carriere :</strong><br>';
        } else {
            html += '<strong>D10 Lagna:</strong> ' + SIGNS[dLagnaSign] + ' (maitre : ' + (RULER_NAMES[d10_1lord]||d10_1lord) + ')<br>';
            html += '<strong>D10 10e Maison (carriere) :</strong> ' + SIGNS[d10_10sign] + ' (maitre : ' + (RULER_NAMES[d10_10lord]||d10_10lord) + ')<br>';
        }
        if (d10_10planets.length > 0) {
            if (!isEasy) html += '<strong>Planetes en 10e :</strong> ' + d10_10planets.map(p => p.name).join(', ') + '<br>';
        }

        // Career 성향 by D10 Lagna
        const careerBySign = [
            'Leadership, Militaire, Sport, Entrepreneur',  // Aries
            'Finance, Arts, Immobilier, Alimentation',     // Taurus
            'Communication, Medias, Education, IT',  // Gemini
            'Soins, Immobilier, Hotellerie, Conseil',    // Cancer
            'Politique, Divertissement, Gestion, Administration',        // Leo
            'Medical, Comptabilite, Analyse, Recherche',          // Virgo
            'Droit, Diplomatie, Design, Conseil',      // Libra
            'Investigation, Recherche, Medecine, Assurance',          // Scorpio
            'Education, Religion, Commerce exterieur, Edition',      // Sagittarius
            'Administration, Construction, Mines, Fonction publique',        // Capricorn
            'IT, Innovation, ONG, Aviation',           // Aquarius
            'Arts, Hopital, Etranger, Spiritualite'           // Pisces
        ];
        html += '<strong>Domaine adapte :</strong> ' + careerBySign[dLagnaSign];
        html += '</div></div>';

    } else if (division === 7) {
        // D7 해석: children
        const d7_5sign = (dLagnaSign + 4) % 12;
        const d7_5lord = SIGN_RULERS[d7_5sign];
        const d7_5planets = dPositions.filter(p => p.dSign === d7_5sign);
        const benefics = d7_5planets.filter(p => p.natural === 'benefic');
        const malefics = d7_5planets.filter(p => p.natural === 'malefic');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👶 Analyse des enfants' : '👶 D7 Analyse des enfants') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D7 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
            html += '<strong>D7 5e Maison (enfants) :</strong> ' + SIGNS[d7_5sign] + ' (maitre : ' + (RULER_NAMES[d7_5lord]||d7_5lord) + ')<br>';
        }
        if (d7_5planets.length > 0) {
            if (!isEasy) html += '<strong>Planetes en 5e Maison :</strong> ' + d7_5planets.map(p => p.name).join(', ') + '<br>';
        }
        if (benefics.length > 0) html += (isEasy ? 'Planetes benefiques — beni avec des enfants.' : 'Planetes benefiques en 5e maison — beni avec des enfants.') + '<br>';
        if (malefics.length > 0) html += (isEasy ? 'Planetes de defi — difficultes avec les enfants possibles.' : 'Planetes malefiques en 5e maison — difficultes avec les enfants possibles.') + '<br>';
        if (d7_5planets.length === 0) html += isEasy ? 'Pas de planetes en position enfants — d\'autres facteurs doivent etre analyses.' : '5e maison vide — verifier la position du seigneur de la 5e.';
        html += '</div></div>';

    } else if (division === 12) {
        // D12 해석: 부모
        const d12_4sign = (dLagnaSign + 3) % 12; // 4 house = Mother
        const d12_9sign = (dLagnaSign + 8) % 12; // 9 house = Father
        const d12_4planets = dPositions.filter(p => p.dSign === d12_4sign);
        const d12_9planets = dPositions.filter(p => p.dSign === d12_9sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨‍👩‍👧 Analyse des parents' : '👨‍👩‍👧 D12 Analyse des parents') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D12 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
        }
        html += '<strong>' + (isEasy ? 'Mother' : 'D12 4e Maison (Mere): ' + SIGNS[d12_4sign]) + '</strong>';
        if (d12_4planets.length > 0 && !isEasy) html += ' — ' + d12_4planets.map(p => p.name).join(', ');
        html += '<br>';
        html += '<strong>' + (isEasy ? 'Father' : 'D12 9e Maison (Pere): ' + SIGNS[d12_9sign]) + '</strong>';
        if (d12_9planets.length > 0 && !isEasy) html += ' — ' + d12_9planets.map(p => p.name).join(', ');
        html += '<br>';

        const moon4 = d12_4planets.find(p => p.id === 'Moon');
        const sun9 = d12_9planets.find(p => p.id === 'Sun');
        if (moon4) html += (isEasy ? 'Lune en position de mere — connexion profonde avec la mere.' : 'Lune en 4e maison — connexion profonde avec la mere.') + '<br>';
        if (sun9) html += (isEasy ? 'Soleil en position de pere — connexion profonde avec le pere.' : 'Soleil en 9e maison — connexion profonde avec le pere.') + '<br>';
        html += '</div></div>';

    } else if (division === 60) {
        // D60 해석: 전생 karma (소챕터 구조)
        const d60_1lord = SIGN_RULERS[dLagnaSign];
        const d60_planets_1 = dPositions.filter(p => p.dSign === dLagnaSign);

        const D60_DEITIES = [
            {name:'Ghora',ko:'Ghora',nature:'malefic',desc:'Destruction et peur. Karma sombre des vies passees'},
            {name:'Rakshasa',ko:'Rakshasa',nature:'malefic',desc:'Energie demoniaque. Fort desir et attachement'},
            {name:'Deva',ko:'Deva',nature:'benefic',desc:'Etre divin. Merite et benedictions des vies passees'},
            {name:'Kubera',ko:'Kubera',nature:'benefic',desc:'Dieu de la richesse. Karma de construction de richesse'},
            {name:'Yaksha',ko:'Yaksha',nature:'benefic',desc:'Gardien de la nature. Harmonie avec la nature'},
            {name:'Kinnara',ko:'Kinnara',nature:'benefic',desc:'Musicien celeste. Talent artistique'},
            {name:'Bhrashta',ko:'Bhrashta',nature:'malefic',desc:'Le dechu. Karma de chute de haut'},
            {name:'Kulaghna',ko:'Kulaghna',nature:'malefic',desc:'Destructeur de famille. Karma lie a la famille'},
            {name:'Garala',ko:'Garala',nature:'malefic',desc:'Poison. Karma d\'actions toxiques'},
            {name:'Vahni',ko:'Vahni',nature:'malefic',desc:'Dieu du feu. Karma de colere et destruction'},
            {name:'Maya',ko:'Maya',nature:'malefic',desc:'Illusion. Karma de tromperie'},
            {name:'Purishaka',ko:'Purishaka',nature:'malefic',desc:'Servitude. Karma de restriction des autres'},
            {name:'Apampathi',ko:'Apampathi',nature:'benefic',desc:'Seigneur des eaux. Purification et guerison'},
            {name:'Marut',ko:'Marut',nature:'benefic',desc:'Dieu du vent. Liberte et changement'},
            {name:'Kala',ko:'Kala',nature:'malefic',desc:'Dieu du temps. Karma du temps et de la mort'},
            {name:'Sarpa',ko:'Sarpa',nature:'malefic',desc:'Serpent. Servitude et attachement — incapable de lacher'},
            {name:'Amrita',ko:'Amrita',nature:'benefic',desc:'Nectar d\'immortalite. Poursuite de la vie eternelle'},
            {name:'Indu',ko:'Indu',nature:'benefic',desc:'Lune. Sensibilite et intuition'},
            {name:'Mridu',ko:'Mridu',nature:'benefic',desc:'Le doux. Douceur et compassion'},
            {name:'Komala',ko:'Komala',nature:'benefic',desc:'Le delicat. Art et beaute'},
            {name:'Heramba',ko:'Heramba',nature:'benefic',desc:'Avatar de Ganesha. Surmonter les obstacles'},
            {name:'Brahma',ko:'Brahma',nature:'benefic',desc:'Dieu createur. Creation et connaissance'},
            {name:'Vishnu',ko:'Vishnu',nature:'benefic',desc:'Dieu preservateur. Protection et ordre'},
            {name:'Maheshwara',ko:'Maheshwara',nature:'benefic',desc:'Grand Seigneur Shiva. Transformation et liberation'},
            {name:'Deva2',ko:'Deva2',nature:'benefic',desc:'Saint. Pratique spirituelle'},
            {name:'Bala',ko:'Bala',nature:'benefic',desc:'Force. Fortitude et courage'},
            {name:'Vishwakarma',ko:'Vishwakarma',nature:'benefic',desc:'Architecte cosmique. Construction et creation'},
            {name:'Tamasa',ko:'Tamasa',nature:'malefic',desc:'Obscurite. Karma d\'ignorance'},
            {name:'Kanchana',ko:'Kanchana',nature:'benefic',desc:'Or. Purete et valeur'},
            {name:'Varaha',ko:'Varaha',nature:'benefic',desc:'Avatar sanglier de Vishnu. Salut'},
            {name:'Ramasala',ko:'Ramasala',nature:'benefic',desc:'Demeure de Rama. Moralite et devoir'},
            {name:'Ghrisha',ko:'Ghrisha',nature:'benefic',desc:'Le radieux. Sagesse et illumination'},
            {name:'Indra',ko:'Indra',nature:'benefic',desc:'Roi des dieux. Leadership'},
            {name:'Jala',ko:'Jala',nature:'benefic',desc:'Eau. Flux et adaptation'},
            {name:'Vishwa',ko:'Vishwa',nature:'benefic',desc:'Univers. Amour universel'},
            {name:'Amara',ko:'Amara',nature:'benefic',desc:'Immortel. Poursuite de l\'eternite'},
            {name:'Bala2',ko:'Bala2',nature:'malefic',desc:'Jeune force. Utilisation immature du pouvoir'},
            {name:'Pitri',ko:'Pitri',nature:'malefic',desc:'Ancetres. Karma ancestral'},
            {name:'Rudra',ko:'Rudra',nature:'malefic',desc:'Dieu de la tempete. Transformation destructrice'},
            {name:'Varuna',ko:'Varuna',nature:'benefic',desc:'Dieu de l\'ocean. Ordre cosmique'},
            {name:'Aryama',ko:'Aryama',nature:'benefic',desc:'Divinite solaire. Amitie et contrats'},
            {name:'Mitra',ko:'Mitra',nature:'benefic',desc:'Dieu de l\'amitie. Confiance et camaraderie'},
            {name:'Agni',ko:'Agni',nature:'malefic',desc:'Dieu du feu. Feu purificateur'},
            {name:'Varuna2',ko:'Varuna2',nature:'benefic',desc:'Dieu de l\'ocean. Sagesse profonde'},
            {name:'Gauri',ko:'Gauri',nature:'benefic',desc:'Parvati. Devotion et amour'},
            {name:'Mahakala',ko:'Mahakala',nature:'malefic',desc:'Grand Temps. Essayer de maitriser le temps'},
            {name:'Pitamaha',ko:'Pitamaha',nature:'benefic',desc:'Grand Pere Brahma. Createur'},
            {name:'Kartikeya',ko:'Kartikeya',nature:'benefic',desc:'Dieu de la guerre. Bataille juste'},
            {name:'Yama',ko:'Yama',nature:'malefic',desc:'Dieu de la mort. Jugement et justice'},
            {name:'Kala2',ko:'Kala2',nature:'malefic',desc:'Temps. Poursuivi par le temps'},
            {name:'Varuna3',ko:'Varuna3',nature:'benefic',desc:'Dieu de l\'ocean. Loi et verite'},
            {name:'Kubera2',ko:'Kubera2',nature:'benefic',desc:'Dieu de la richesse. Generosite'},
            {name:'Aditya',ko:'Aditya',nature:'benefic',desc:'Dieu du soleil. Lumiere et verite'},
            {name:'Rishi',ko:'Rishi',nature:'benefic',desc:'Sage. Sagesse et pratique'},
            {name:'Vasu',ko:'Vasu',nature:'benefic',desc:'Etre celeste. Gouverner la nature'},
            {name:'Ashwini',ko:'Ashwini',nature:'benefic',desc:'Guerisseurs jumeaux. Guerison'},
            {name:'Naga',ko:'Naga',nature:'malefic',desc:'Divinite serpent. Mystere et secrets'},
            {name:'Gandharva',ko:'Gandharva',nature:'benefic',desc:'Musicien celeste. Art et musique'},
            {name:'Prajapati',ko:'Prajapati',nature:'benefic',desc:'Createur. Creer la vie'},
            {name:'Charachara',ko:'Charachara',nature:'benefic',desc:'Toutes choses. Unite avec tout'}
        ];

        // 소챕터 아코디언 헬퍼
        function subChapter(icon, title, content) {
            if (window.vedicMode === 'easy') {
                return '<div style="margin:8px 0;"><h4 style="color:#c9a84c;margin:12px 0 6px;">' + icon + ' ' + title + '</h4><div style="padding:0 0 10px;color:#999;font-size:13px;line-height:1.7;">' + content + '</div></div>';
            }
            return '<div style="margin:8px 0;border:1px solid #2a2a5a;border-radius:8px;overflow:hidden;">' +
                '<div onclick="var c=this.nextElementSibling;c.style.display=c.style.display===\'none\'?\'\':\'none\';this.querySelector(\'.sc-arrow\').textContent=c.style.display===\'none\'?\'▶\':\'▼\'" style="cursor:pointer;padding:12px 14px;background:linear-gradient(135deg,#12122a,#1a1a3e);">' +
                '<span style="font-size:15px;font-weight:700;color:#c9a84c;">' + icon + ' ' + title + '</span>' +
                '<span class="sc-arrow" style="float:right;color:#666;">▶</span></div>' +
                '<div style="display:none;padding:14px;">' + content + '</div></div>';
        }

        const pastLifeThemes = [
            'Guerrier, Leader — A exerce le pouvoir, leadership naturel et determination imprimes dans l\'ame.',
            'Artiste, Fermier — A travaille avec la nature, instinct profond de stabilite et beaute materielle.',
            'Erudit, Commercant — A vecu par le savoir, polyvalence et curiosite persistent. Talent naturel pour les langues.',
            'Protecteur, Nourricier — A pris soin des autres, sensibilite profonde et instinct maternel. Fort karma du foyer.',
            'Royaute, Pretre — Avait un haut statut, autorite naturelle et dignite. Etre sur scene est instinct de l\'ame.',
            'Guerisseur, Serviteur — A pratique la medecine ou le service, excellentes competences analytiques. Aider les autres est devoir de l\'ame.',
            'Diplomate, Artiste — A poursuivi harmonie et beaute, habile dans les relations. Le partenariat est le theme central.',
            'Praticien, Alchimiste — A subi une transformation profonde, forte attraction pour les secrets et mysteres.',
            'Sage, Explorateur — A cherche la verite, sagesse spirituelle et aventure persistent. Karma d\'education superieure.',
            'Officier, Architecte — A construit l\'ordre, forte patience et responsabilite. Discipline imprimee dans l\'ame.',
            'Officier, Gardien — A construit l\'ordre social, esprit organisationnel. Regi par Saturne, devoir imprime dans l\'ame.',
            'Medium, Artiste — A communie avec le monde spirituel, intuition extremement forte. Le plus proche de la liberation.'
        ];

        // 행성별 D60 사인 해석 (전통)
        const d60PlanetInSign = {
            Sun: ['A vecu comme guerrier ou roi dans des vies passees. Fort ego et leadership persistent. But de l\'ame d\'etablir l\'autorite.','A vecu comme artiste ou personne riche. L\'ame poursuit l\'abondance materielle. Attire par la beaute sensorielle.','A vecu comme erudit ou commercant. Connaissance et communication sont des themes centraux de l\'ame.','A vecu comme protecteur ou nourricier. Prendre soin des autres est un instinct profond de l\'ame.','Avait un haut statut comme royaute ou clerge. L\'autorite naturelle se transmet a cette vie.','A vecu comme guerisseur ou serviteur. Analyse et service sont le but de l\'ame.','A vecu comme diplomate ou artiste cherchant l\'harmonie. Relations et equilibre sont la tache de l\'ame.','A vecu comme praticien ou alchimiste a travers une transformation profonde. Secrets et transformation imprimes dans l\'ame.','A vecu comme sage ou explorateur cherchant la verite. Sagesse et aventure sont la direction de l\'ame.','A vecu comme officier ou architecte construisant l\'ordre. Systeme et responsabilite graves dans l\'ame.','A vecu comme revolutionnaire ou inventeur en avance sur son temps. L\'originalite est le trait de l\'ame.','A vecu comme medium ou artiste communiant avec le monde spirituel. Intuition profonde reste dans l\'ame.'],
            Moon: ['Souvenirs emotionnels de vies passees sont fierement intenses. Colere et passion imprimes dans l\'inconscient. Maitriser les emotions est la tache.','Souvenirs emotionnels de vies passees sont chauds et stables. Souvenirs d\'abondance restent dans l\'inconscient, cherchant la beaute.','Souvenirs emotionnels de vies passees sont intellectuels et varies. La curiosite est forte de nombreuses experiences passees.','Souvenirs emotionnels de vies passees sont tres profonds. Forts souvenirs de foyer et de soin creent des emotions riches.','Souvenirs emotionnels de vies passees sont pleins de fierte et dignite. Souvenirs d\'etre reconnu et respecte persistent.','Souvenirs emotionnels de vies passees sont lies au service et a l\'analyse. Souvenirs d\'aider les autres creent un coeur bienveillant.','Souvenirs emotionnels de vies passees sont lies a l\'harmonie et aux relations. Souvenirs de belles connexions poussent a chercher un partenaire.','Souvenirs emotionnels de vies passees sont profonds et intenses. Souvenirs de changements extremes creent des emotions profondes comme l\'ocean.','Souvenirs emotionnels de vies passees sont lies a la liberte et l\'exploration. Souvenirs de voyages et d\'apprentissage poussent l\'expansion.','Souvenirs emotionnels de vies passees sont lies a la responsabilite et la patience. Souvenirs de lourds fardeaux creent des emotions matures.','Souvenirs emotionnels de vies passees sont uniques et extraordinaires. Souvenirs d\'etre different creent une sensibilite independante.','Souvenirs emotionnels de vies passees sont spirituels et transcendants. Reves et visions sont vivides avec connexion spirituelle profonde.']
        };

        // 신 계산 헬퍼
        function getDeity(siderealLon) {
            const deg = siderealLon % 30;
            const part = Math.floor(deg / 0.5);
            const sn = Math.floor(siderealLon / 30);
            const idx = (sn % 2 === 0) ? part : (59 - part);
            return {idx: idx, deity: D60_DEITIES[idx] || null};
        }
        function deityTag(d) {
            if (!d.deity || isEasy) return '';
            const c = d.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
            return ' — divinite : <strong>' + d.deity.name + '</strong>(' + d.deity.ko + ') <span style="color:' + c + ';font-weight:700;">' + (d.deity.nature === 'benefic' ? 'Benefique' : 'Malefique') + '</span>';
        }

        const houseThemes = ['','Soi/Existence','Richesse/Valeur','Communication/Apprentissage','Foyer/Repos','Creation/Amour','Service/Epreuve','Relation/Partenaire','Transformation/Secret','Sagesse/Religion','Societe/Carriere','Souhait/Gain','Liberation/Transcendance'];

        // Parasara 인용
        if (!isEasy) {
            html += '<div class="interp-card" style="border-left:3px solid #8b7ec8;"><div class="interp-text" style="font-size:13px;color:#888;">';
            html += '📜 <strong>Parasara dit :</strong> "Shashtiamsha (D60) est la plus importante de toutes les cartes divisionnaires. Les planetes benefiques dans les divisions benefiques donnent de bons resultats, les malefiques dans les malefiques donnent de mauvais resultats."<br>';
            html += '<span style="color:#666;">— Brihat Parasara Hora Shastra (BPHS)</span></div></div>';
        }

        // ─── 소챕터 1: soul의 정체성 ───
        const lagnaD = getDeity(lagnaSidereal);
        let ch1 = isEasy
            ? '<strong>Identite des vies passees</strong>' + deityTag(lagnaD) + '<br><br>'
            : '<strong>D60 Lagna: ' + SIGNS[dLagnaSign] + ' ' + SIGN_SYMBOLS[dLagnaSign] + '</strong> (maitre : ' + (RULER_NAMES[d60_1lord]||d60_1lord) + ')' + deityTag(lagnaD) + '<br><br>';
        ch1 += pastLifeThemes[dLagnaSign] + '<br>';
        if (lagnaD.deity) {
            ch1 += '<br>' + (isEasy ?
                (lagnaD.deity.nature === 'benefic' ?
                    'Vous avez fait beaucoup de bonnes choses dans vos vies passees, alors les bonnes opportunites arrivent naturellement. Votre existence est protegee.' :
                    'Des lecons non resolues des vies passees affectent votre personnalite, mais les surmonter mene a une plus grande croissance.') :
                (lagnaD.deity.nature === 'benefic' ?
                    '<strong>' + lagnaD.deity.ko + '</strong> garde le Lagna. ' + lagnaD.deity.desc + ' — Le merite des vies passees protege — les bonnes opportunites arrivent naturellement.' :
                    '<strong>' + lagnaD.deity.ko + '</strong> influence le Lagna. ' + lagnaD.deity.desc + ' — Defi karmique imprime, mais le surmonter mene a la croissance.'));
        }
        if (d60_planets_1.length > 0) ch1 += '<br><br>' + d60_planets_1.map(p => p.name).join(', ') + (isEasy ? ' — karma central des vies passees concentre dans ces planetes.' : ' positionne dans le D60 Lagna — Karma central des vies passees concentre dans ces planetes.');
        html += subChapter('🪐', 'Identité de l\'âme — Qui étiez-vous dans vos vies passées', ch1);

        // ─── 소챕터 2: soul의 목적 ───
        const sunD60 = dPositions.find(p => p.id === 'Sun');
        if (sunD60) {
            const sunD = getDeity(sunD60.sidereal);
            let ch2 = (isEasy ? '<strong>Memoire du Soleil des vies passees</strong>' : '<strong>D60 Soleil: ' + SIGNS[sunD60.dSign] + ' ' + SIGN_SYMBOLS[sunD60.dSign] + '</strong>') + deityTag(sunD) + '<br><br>';
            ch2 += (d60PlanetInSign.Sun[sunD60.dSign] || '') + '<br>';
            if (sunD.deity) {
                ch2 += '<br>' + (isEasy ?
                    (sunD.deity.nature === 'benefic' ?
                        'Vous avez bien poursuivi votre vrai but dans vos vies passees, alors la realisation de soi vient naturellement. Soyez confiant !' :
                        'Il y avait de la confusion sur qui vous etes dans vos vies passees. Trouver votre vrai vous est un voyage important qui vous fait grandir.') :
                    (sunD.deity.nature === 'benefic' ?
                        'Divinite solaire <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. But de l\'ame correctement poursuivi — la realisation de soi vient naturellement.' :
                        'Divinite solaire <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. Defi des vies passees avec soi/autorite — trouver le vrai soi est la tache de l\'ame.'));
            }
            html += subChapter('☉', 'But de l\'âme — Pourquoi êtes-vous né', ch2);
        }

        // ─── 소챕터 3: 감정의 기억 ───
        const moonD60 = dPositions.find(p => p.id === 'Moon');
        if (moonD60) {
            const moonD = getDeity(moonD60.sidereal);
            let ch3 = (isEasy ? '<strong>Memoire de la Lune des vies passees</strong>' : '<strong>D60 Lune: ' + SIGNS[moonD60.dSign] + ' ' + SIGN_SYMBOLS[moonD60.dSign] + '</strong>') + deityTag(moonD) + '<br><br>';
            ch3 += (d60PlanetInSign.Moon[moonD60.dSign] || '') + '<br>';
            if (moonD.deity) {
                ch3 += '<br>' + (isEasy ?
                    (moonD.deity.nature === 'benefic' ?
                        'Votre esprit etait paisible dans vos vies passees, alors vous etes emotionnellement stable avec une forte intuition. Faites confiance a votre instinct.' :
                        'Des traces de difficultes emotionnelles des vies passees restent profondes dans votre coeur. La meditation et la proximite de l\'eau aident grandement a guerir.') :
                    (moonD.deity.nature === 'benefic' ?
                        'Divinite lunaire <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. L\'esprit etait paisible — emotionnellement stable avec forte intuition.' :
                        'Divinite lunaire <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. Les blessures emotionnelles restent inconscientes. Reconnaitre et guerir est la tache emotionnelle de cette vie. La meditation et le repos pres de l\'eau aident.'));
            }
            html += subChapter('☽', 'Mémoire émotionnelle — Schémas inconscients', ch3);
        }

        // ─── 소챕터 4: spouse karma ───
        const d60H7sign = (dLagnaSign + 6) % 12;
        const d60H7lord = SIGN_RULERS[d60H7sign];
        const d60H7planets = dPositions.filter(p => p.dSign === d60H7sign);
        const venusD60 = dPositions.find(p => p.id === 'Venus');
        const jupD60 = dPositions.find(p => p.id === 'Jupiter');
        const rahuD60 = dPositions.find(p => p.id === 'Rahu');
        const ketuD60 = dPositions.find(p => p.id === 'Ketu');

        const spouseKarmaBySign = [
            'Connexion guerrier/leader des vies passees. Karma matrimonial intense et independant. Ames qui ont combattu ensemble.',
            'Connexion artiste/riche. Karma matrimonial materiellement abondant. Ames qui ont poursuivi la beaute ensemble.',
            'Connexion erudit/commercant. Karma matrimonial intellectuel. Ames qui ont etudie ou commerce ensemble.',
            'Connexion famille/protecteur. Karma matrimonial de lien emotionnel profond. Ames qui ont pris soin l\'une de l\'autre.',
            'Connexion royaute/noblesse. Karma matrimonial splendide et respecte. Ames qui ont gouverne ensemble.',
            'Connexion guerisseur/serviteur. Karma matrimonial de service et devotion. Ames qui ont aide les autres ensemble.',
            'Connexion diplomate/artiste. Karma matrimonial harmonieux et beau. Ames qui ont cherche l\'equilibre ensemble.',
            'Connexion praticien/mystique. Karma matrimonial intense et transformateur. Ames qui ont partage vie et mort.',
            'Connexion sage/explorateur. Karma matrimonial libre et expansif. Partenaire etranger possible.',
            'Connexion officier/architecte. Karma matrimonial responsable et stable. Mariage tardif possible.',
            'Connexion officier/soldat. Signe regi par Saturne avec karma matrimonial responsable. Ames qui ont pratique le devoir social ensemble. Mariage peut etre tardif ou avec ecart d\'age.',
            'Connexion medium/artiste. Karma matrimonial mystique et spirituel. Peuvent se rencontrer d\'abord en reves.'
        ];

        let ch4 = (isEasy
            ? '<strong>Connexion du partenaire des vies passees</strong><br><br>'
            : '<strong>D60 7e Maison (partenaire) : ' + SIGNS[d60H7sign] + ' ' + SIGN_SYMBOLS[d60H7sign] + '</strong> (7 lord: ' + (RULER_NAMES[d60H7lord]||d60H7lord) + ')<br><br>');
        ch4 += spouseKarmaBySign[d60H7sign] + '<br>';

        if (d60H7planets.length > 0) {
            ch4 += '<br><strong>' + (isEasy ? 'Planetes en position partenaire :' : 'Planetes D60 en 7e :') + '</strong><br>';
            d60H7planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (isEasy) {
                    ch4 += (p.natural === 'benefic'
                        ? 'Bonne connexion avec le partenaire des vies passees — benedictions dans cette vie.'
                        : 'Problemes non resolus avec le partenaire des vies passees. Defis mais opportunites de croissance.') + '<br>';
                } else {
                    ch4 += p.symbol + ' <strong>' + p.name + '</strong>' + deityTag(pD) + '<br>';
                    ch4 += (p.natural === 'benefic'
                        ? 'Benefique en 7e maison — Bon karma avec le partenaire dans les vies passees. Benedictions du partenaire dans cette vie aussi.'
                        : 'Malefique en 7e maison — Karma non resolu avec le partenaire des vies passees. Le regler dans cette vie. Difficile mais opportunite de croissance.') + '<br>';
                }
            });
        }

        // Venus (사랑의 karma)
        if (venusD60) {
            const venD = getDeity(venusD60.sidereal);
            const venH = ((venusD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (isEasy) {
                ch4 += '<br>' + (venD.deity && venD.deity.nature === 'benefic' ?
                    'Vous avez aime sincerement dans vos vies passees, alors un bel amour vous attend.' :
                    'Lecons d\'amour non resolues des vies passees. Apprendre le vrai amour est important et vous rend plus profond.');
            } else {
                ch4 += '<br><strong>♀ Venus (Planete de l\'Amour)</strong> → D60 ' + venH + ' maison (' + houseThemes[venH] + ')' + deityTag(venD) + '<br>';
                ch4 += venD.deity && venD.deity.nature === 'benefic' ?
                    'Venus sous benefique <strong>' + venD.deity.ko + '</strong> protection. L\'amour bien pratique — un bel amour vous attend. ' + venD.deity.desc :
                    'Venus sous malefique <strong>' + (venD.deity?venD.deity.ko:'') + '</strong> influence. Defis amoureux passes — apprendre le vrai amour est la tache. ' + (venD.deity?venD.deity.desc:'');
            }
        }

        // Rahu-Ketu 축 (1-7궁이면 전생 인연)
        if (rahuD60 && ketuD60) {
            const rahuH = ((rahuD60.dSign - dLagnaSign + 12) % 12) + 1;
            const ketuH = ((ketuD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (rahuH === 7 || ketuH === 7 || rahuH === 1 || ketuH === 1) {
                ch4 += isEasy
                    ? '<br><br>🔥 <strong>Connexion tres forte des vies passees !</strong> Connexion profonde avec le partenaire — destines a se rencontrer dans cette vie.'
                    : '<br><br>🔥 <strong>Axe Rahu-Ketu sur la ligne D60 1-7 !</strong> Cela indique une <strong>connexion tres forte des vies passees</strong> avec votre partenaire. Destines a se rencontrer dans cette vie.';
            }
        }

        // 7 lord의 D60 position
        const h7lordPlanet = dPositions.find(p => p.id === d60H7lord);
        if (h7lordPlanet) {
            const h7lH = ((h7lordPlanet.dSign - dLagnaSign + 12) % 12) + 1;
            const h7lD = getDeity(h7lordPlanet.sidereal);
            if (isEasy) {
                const h7lDesc = h7lH === 1 ? 'Partenaire directement lie a votre croissance.' : h7lH === 4 ? 'Rencontrer le partenaire par le foyer et le sanctuaire.' : h7lH === 9 ? 'Connexion du partenaire par l\'etranger/education.' : h7lH === 10 ? 'Connexion du partenaire par la carriere/social.' : h7lH === 12 ? 'Rencontrer le partenaire dans un cadre etranger/spirituel.' : '';
                if (h7lDesc) ch4 += '<br><br>' + h7lDesc;
            } else {
                ch4 += '<br><br><strong>7 lord ' + (RULER_NAMES[d60H7lord]||d60H7lord) + '</strong> → D60 ' + h7lH + ' maison (' + houseThemes[h7lH] + ')' + deityTag(h7lD) + '<br>';
                ch4 += 'Connexion karmique avec le partenaire <strong>' + houseThemes[h7lH] + '</strong> se manifeste a travers ce domaine. ';
                ch4 += h7lH === 1 ? 'Partenaire directement lie a votre croissance.' : h7lH === 4 ? 'Rencontrer le partenaire par le foyer et le sanctuaire.' : h7lH === 9 ? 'Connexion du partenaire par l\'etranger/education.' : h7lH === 10 ? 'Connexion du partenaire par la carriere/social.' : h7lH === 12 ? 'Karma de rencontrer le partenaire dans un cadre etranger/spirituel.' : '';
            }
        }
        html += subChapter('💍', 'Karma du partenaire — Connexion des vies passées', ch4);

        // ─── 소챕터 5: career karma ───
        const d60H10sign = (dLagnaSign + 9) % 12;
        const d60H10lord = SIGN_RULERS[d60H10sign];
        const d60H10planets = dPositions.filter(p => p.dSign === d60H10sign);
        const satD60 = dPositions.find(p => p.id === 'Saturn');
        const careerKarma = ['militaire/leadership/sport','finance/art/agriculture','education/medias/commerce','soins/immobilier/hotellerie','politique/divertissement/gestion','medical/analyse/service','droit/diplomatie/design','recherche/investigation/medecine','education/religion/etranger','administration/construction/fonctionnaire','technologie/science/innovation','art/spiritualite/hopital'][d60H10sign];

        let ch5 = (isEasy
            ? '<strong>Karma de carriere des vies passees</strong><br><br>'
            : '<strong>D60 10e Maison (carriere) : ' + SIGNS[d60H10sign] + ' ' + SIGN_SYMBOLS[d60H10sign] + '</strong> (10 lord: ' + (RULER_NAMES[d60H10lord]||d60H10lord) + ')<br><br>');
        ch5 += 'Karma de carriere des vies passees dans <strong>' + careerKarma + '</strong> direction. Attraction naturelle vers ce domaine.<br>';
        if (satD60) {
            const satD = getDeity(satD60.sidereal);
            const satH = ((satD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) ch5 += '<br><strong>♄ Saturne (Seigneur du Karma)</strong> → D60 ' + satH + ' maison (' + houseThemes[satH] + ')' + deityTag(satD) + '<br>';
            ch5 += isEasy ?
                ('<br>' + (satD.deity && satD.deity.nature === 'benefic' ?
                    'C\'est une <strong>benediction tres rare</strong> ! La patience des vies passees reduit les defis de carriere dans cette vie.' :
                    'Lourde lecon de carriere des vies passees. L\'effort regulier et aider les autres est la cle.')) :
                (satD.deity && satD.deity.nature === 'benefic' ?
                    'Saturne sous divinite benefique est une <strong>benediction tres rare</strong> ! La patience des vies passees reduit les epreuves de carriere.' :
                    'Saturne sous divinite malefique — <strong>lourd karma des vies passees</strong> dans le domaine de la carriere. ' + (satD.deity?satD.deity.desc:'') + '. Patience, service, mantra(Om Shanaishcharaya Namaha) pour dissoudre ce karma.');
        }
        if (d60H10planets.length > 0) {
            ch5 += '<br><br><strong>' + (isEasy ? 'Planetes de carriere :' : 'Planetes D60 en 10e :') + '</strong> ' + d60H10planets.map(p => p.name).join(', ') + ' — Karma de carriere concentre dans ces planetes.';
        }
        html += subChapter('💼', 'Karma de carrière — Vocation des vies passées', ch5);

        // ─── 소챕터 6: wealth karma ───
        const d60H2sign = (dLagnaSign + 1) % 12;
        const d60H2planets = dPositions.filter(p => p.dSign === d60H2sign);
        let ch6 = (isEasy
            ? '<strong>Karma de richesse des vies passees</strong><br><br>'
            : '<strong>D60 2e Maison (richesse) : ' + SIGNS[d60H2sign] + ' ' + SIGN_SYMBOLS[d60H2sign] + '</strong><br><br>');
        const wealthKarma = ['Instinct de richesse autodidacte.','Environnement abondant des vies passees.','Construction intellectuelle de richesse.','Richesse familiale/immobiliere.','Richesse par l\'autorite.','Richesse par le service. Frugal.','Richesse par partenariat.','Richesse des autres (heritage).','La fortune apporte la richesse. Etranger.','Lent mais sur. Riche apres la cinquantaine.','Richesse par l\'innovation. Non conventionnel.','Activite spirituelle et richesse. Donner.'][d60H2sign];
        ch6 += wealthKarma + '<br>';
        if (d60H2planets.length > 0) {
            ch6 += isEasy ? '<br>' : '<br><strong>Planetes D60 en 2e :</strong><br>';
            d60H2planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                ch6 += (isEasy ? '' : p.symbol + ' ' + p.name + deityTag(pD) + ' — ') + (p.natural === 'benefic' ? 'Bonnes connexions de richesse des vies passees — abondance dans cette vie aussi.' : 'Lecons de richesse des vies passees. Un effort regulier peut les surmonter.') + '<br>';
            });
        }
        html += subChapter('💰', 'Karma de richesse — Fortune des vies passées', ch6);

        // ─── 소챕터 7: 행성별 신 목록 (전문가 모드만) ───
        if (!isEasy) {
            let ch7 = '';
            const lagnaD2 = getDeity(lagnaSidereal);
            if (lagnaD2.deity) {
                const lc = lagnaD2.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                ch7 += '<div style="padding:4px 0;">⬆ Lagna → <strong>' + lagnaD2.deity.name + '</strong>(' + lagnaD2.deity.ko + ') <span style="color:' + lc + ';">' + (lagnaD2.deity.nature === 'benefic' ? 'Benefique' : 'Malefique') + '</span></div>';
            }
            positions.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (pD.deity) {
                    const c = pD.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                    ch7 += '<div style="padding:4px 0;">' + p.symbol + ' ' + p.name + ' → <strong>' + pD.deity.name + '</strong>(' + pD.deity.ko + ') <span style="color:' + c + ';">' + (pD.deity.nature === 'benefic' ? 'Benefique' : 'Malefique') + '</span></div>';
                }
            });
            html += subChapter('🕉️', 'Liste des divinités planétaires', ch7);
        }

        // ─── 소챕터 8: 종합 karma 판단 ───
        const beneficCount = positions.filter(p => {
            const pD = getDeity(p.sidereal);
            return pD.deity && pD.deity.nature === 'benefic';
        }).length;
        const maleficPlanets = positions.filter(p => {
            const pD = getDeity(p.sidereal);
            return pD.deity && pD.deity.nature === 'malefic';
        });

        let ch8 = isEasy ?
            '<strong style="color:#5cb85c">' + beneficCount + ' bonne energie</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' energie de precaution</strong> sur 9 planetes<br><br>' :
            '<strong style="color:#5cb85c">' + beneficCount + ' benefique</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' malefique</strong> placement<br><br>';
        if (beneficCount >= 7) {
            ch8 += isEasy ?
                '🌟 <strong>Vous avez fait tellement de bonnes choses dans vos vies passees !</strong> Presque toutes les planetes sous bonne energie — bons resultats naturellement. Forte fortune innee.' :
                '🌟 <strong>Tres fort merite des vies passees.</strong> Parasara a appele de tels themes "une ame benie par les dieux". La plupart des planetes sous benefiques — bons resultats naturellement.';
        } else if (beneficCount >= 5) {
            ch8 += isEasy ?
                '✨ <strong>Abondante bonne energie des vies passees.</strong> Protege dans de nombreux domaines de la vie.' :
                '✨ <strong>Merite abondant des vies passees.</strong> Les benefiques dominent — protege dans de nombreux domaines.';
            if (maleficPlanets.length > 0) ch8 += isEasy ?
                ' Cependant, certains domaines necessitent plus d\'effort.' :
                ' Cependant, des defis karmiques existent dans <strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>. Pratiquez mantras et charite pour ces planetes.';
        } else if (beneficCount >= 3) {
            ch8 += isEasy ?
                '⚖️ <strong>Bonne energie et energie difficile sont moitie-moitie.</strong> Les bonnes choses et les difficiles alternent dans la vie.' :
                '⚖️ <strong>Karma en equilibre.</strong> Fortune mixte — le bon et les defis alternent.';
            if (maleficPlanets.length > 0) ch8 += '<br>' + (isEasy ? 'Planetes a surveiller : ' : 'Planetes a surveiller : ') + '<strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>';
        } else {
            ch8 += isEasy ?
                '🔥 <strong>Cette vie consiste a resoudre les lecons des vies passees.</strong> Beaucoup de defis, mais ceux avec les lecons les plus lourdes grandissent le plus. L\'effort regulier et aider les autres est particulierement important.' :
                '🔥 <strong>Une vie de reglement du karma.</strong> Beaucoup de defis des vies passees, mais Parasara a dit "l\'ame avec le karma le plus lourd grandit le plus". La pratique des mantras et la charite sont particulierement importantes.';
        }
        html += subChapter('📊', 'Évaluation globale du karma', ch8);

        // (이전 코드 제거됨 - 신 목록과 해석은 위 소챕터에 통합)

    } else if (division === 2) {
        // D2 Hora — wealth·부의 축적
        const d2LagnaInterp = ['Richesse autodidacte. Investissement independant et agressif.','Investissement sensoriel et richesse stable. Immobilier, alimentation, art.','Gagner par activite intellectuelle. Ecriture, education, sens des affaires.','Revenus immobiliers et familiaux. Propriete de la mere. Attention aux depenses emotionnelles.','Richesse par leadership et autorite. Gouvernement, or. Depenses ostentatoires.','Revenus par analyse et competences. Medical, comptabilite, service. Gestionnaire frugal.','Richesse par partenariat. Droit, diplomatie, mode, art.','Construire la richesse avec l\'argent des autres (heritage, assurance, investissements).','Revenus par education, etranger, religion. La fortune apporte la richesse.','Effort systematique construit la richesse. Lent mais sur. Riche apres la cinquantaine.','Revenus par technologie, innovation, reseaux. Sources non conventionnelles.','Revenus par activites spirituelles/artistiques. Richesse etrangere. Nature genereuse.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💰 Analyse détaillée de richesse' : '💰 D2 Hora — Analyse de richesse') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D2 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d2LagnaInterp + '<br><br>';

        const sunD2 = dPositions.find(p => p.id === 'Sun');
        const moonD2 = dPositions.find(p => p.id === 'Moon');
        const jupD2 = dPositions.find(p => p.id === 'Jupiter');
        const venD2 = dPositions.find(p => p.id === 'Venus');

        if (sunD2) {
            const sunInOwn = sunD2.dSign === 4; // Leo
            html += (isEasy ? '' : '<strong>☉ Soleil → ' + SIGNS[sunD2.dSign] + ':</strong> ') + (sunInOwn ? (isEasy ? '🌟 <strong>Autodidacte !</strong> Construit la richesse par autorite et leadership.' : '🌟 <strong>Soleil dans son propre Hora (Lion) !</strong> Type autodidacte. Construit la richesse par autorite et leadership.') : (isEasy ? 'Revenus par les autres ou le secteur gouvernemental/public.' : 'Soleil dans le Hora de la Lune. Revenus par l\'aide des autres ou le secteur gouvernemental/public.')) + '<br>';
        }
        if (moonD2) {
            const moonInOwn = moonD2.dSign === 3; // Cancer
            html += (isEasy ? '' : '<strong>☽ Lune → ' + SIGNS[moonD2.dSign] + ':</strong> ') + (moonInOwn ? (isEasy ? '🌟 <strong>Vie abondante par les relations publiques !</strong>' : '🌟 <strong>Lune dans son propre Hora (Cancer) !</strong> Vie abondante par le public et les relations.') : (isEasy ? 'Revenus par effort personnel et activite independante.' : 'Lune dans le Hora du Soleil. Revenus par effort personnel et activite independante.')) + '<br>';
        }
        if (jupD2) html += (isEasy ? '' : '<strong>♃ Jupiter → ' + SIGNS[jupD2.dSign] + ':</strong> ') + (isEasy ? (jupD2.dSign === 4 ? 'Peut construire une grande richesse par ses propres capacites.' : 'Abondance par les relations avec les autres.') : 'Jupiter en ' + (jupD2.dSign === 4 ? 'Hora Solaire — grande richesse par capacite propre.' : 'Hora Lunaire — abondance par les relations.')) + '<br>';
        if (venD2) html += (isEasy ? '' : '<strong>♀ Venus → ' + SIGNS[venD2.dSign] + ':</strong> ') + (isEasy ? (venD2.dSign === 4 ? 'Autodidacte par l\'art/articles de luxe.' : 'Richesse par le conjoint ou partenaire.') : 'Venus en ' + (venD2.dSign === 4 ? 'Hora Solaire — autodidacte par art/luxe.' : 'Hora Lunaire — richesse par le partenaire.')) + '<br>';

        // D2 2궁(축적된 부) 분석
        const d2H2sign = (dLagnaSign + 1) % 12;
        const d2H2planets = dPositions.filter(p => p.dSign === d2H2sign);
        html += '<br><strong>' + (isEasy ? 'Richesse accumulée :' : 'D2 2e Maison (richesse accumulee) — ' + SIGNS[d2H2sign] + ':') + '</strong><br>';
        if (d2H2planets.length > 0) {
            d2H2planets.forEach(p => {
                const wealth = {Sun:'Richesse par autorite et statut',Moon:'Richesse fluide par activites publiques',Mars:'Richesse dans l\'immobilier, technologie, domaines competitifs',Mercury:'Richesse dans les affaires, intellectuel, communication',Jupiter:'Richesse abondante en education, religion, droit',Venus:'Richesse liee a l\'art, mode, articles de luxe',Saturn:'Richesse lente mais reguliere. Stable apres la cinquantaine',Rahu:'Richesse par methodes non conventionnelles ou sources etrangeres',Ketu:'Detache du materiel. Poursuit les valeurs spirituelles'};
                html += isEasy ? (wealth[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (wealth[p.id]||'') + '<br>';
            });
        } else {
            html += isEasy ? 'Accumule la richesse regulierement.<br>' : '2e maison vide — la position du seigneur de la 2e est la cle de l\'accumulation de richesse.<br>';
        }
        html += '</div></div>';

    } else if (division === 3) {
        // D3 Drekkana — sibling·용기·소통
        const d3LagnaInterp = ['Independant, leadership parmi les freres/soeurs. Style de communication courageux.','Relations fraternelles stables et materiellement confortables. Freres artistiques possibles.','Freres/soeurs intellectuels et communicatifs. Beaucoup de freres ou conversations.','Lien fraternel emotionnellement profond. Frere/soeur maternel. Freres protecteurs.','Freres/soeurs charismatiques et fiers. Frere celebre ou a succes.','Freres/soeurs analytiques et pratiques. Domaine medical/educatif. Peuvent etre critiques.','Freres/soeurs diplomatiques et charmants. Connexions sociales par les freres.','Relations fraternelles intenses et secretes. Liens profonds apres conflits.','Freres/soeurs libres et philosophiques. Freres a l\'etranger. Lie a la religion/education.','Freres/soeurs responsables et ambitieux. Sens du devoir. Peu de freres ou relation serieuse.','Freres/soeurs uniques et independants. Relations fraternelles non conventionnelles.','Freres/soeurs spirituels et artistiques. Freres a l\'etranger. Connexion emotionnelle.'][dLagnaSign];

        const d3_3sign = (dLagnaSign + 2) % 12;
        const d3_11sign = (dLagnaSign + 10) % 12;
        const d3_3planets = dPositions.filter(p => p.dSign === d3_3sign);
        const d3_11planets = dPositions.filter(p => p.dSign === d3_11sign);
        const marsD3 = dPositions.find(p => p.id === 'Mars');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👫 Analyse frères/sœurs & courage' : '👫 D3 Drekkana — Frères/Sœurs & Courage') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D3 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d3LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Younger siblings:' : 'D3 3e Maison (cadets) — ' + SIGNS[d3_3sign] + ':') + '</strong><br>';
        if (d3_3planets.length > 0) {
            const bro = {Sun:'Le frere/soeur cadet a du leadership et de l\'autorite',Moon:'Emotionnellement proche du frere/soeur cadet',Mars:'Frere/soeur cadet actif et courageux. Disputes possibles',Mercury:'Frere/soeur cadet intellectuel avec bonne communication',Jupiter:'Frere/soeur cadet sage qui apporte la fortune',Venus:'Frere/soeur cadet charmant et artistique',Saturn:'Difficulte avec le frere/soeur cadet. Ecart d\'age possible',Rahu:'Frere/soeur cadet unique ou lie a l\'etranger',Ketu:'Distance avec le frere/soeur cadet. Connexion spirituelle'};
            d3_3planets.forEach(p => { html += isEasy ? (bro[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (bro[p.id]||'') + '<br>'; });
        } else html += isEasy ? '' : '3e maison vide — verifier la position du seigneur de la 3e.<br>';

        html += '<br><strong>' + (isEasy ? 'Older siblings:' : 'D3 11e Maison (aines) — ' + SIGNS[d3_11sign] + ':') + '</strong><br>';
        if (d3_11planets.length > 0) {
            d3_11planets.forEach(p => { html += isEasy ? 'Influence la relation avec les freres/soeurs aines.<br>' : '• ' + p.name + ' en 11e maison — influence la relation avec les aines.<br>'; });
        } else html += isEasy ? '' : '11e maison sans planetes.<br>';

        if (marsD3) {
            const marsH = ((marsD3.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♂ Mars (karaka des freres):</strong> ';
            html += marsH <= 4 ? 'Relation fraternelle proche. Freres/soeurs courageux.' : marsH <= 8 ? 'Conflits fraternels ou transformation par les freres/soeurs.' : 'Freres/soeurs a l\'etranger ou tendance spirituelle.';
        }
        html += '</div></div>';

    } else if (division === 4) {
        // D4 Chaturthamsha — 재산·부동산·행운
        const d4LagnaInterp = ['Acquiert activement des proprietes. Aime construire ou acheter de nouvelles maisons.','Immobilier stable et abondant. Terres et fermes. Habitation luxueuse.','Plusieurs maisons ou demenagements frequents. Prefere environnement intellectuel.','Maison et propriete sont emotionnellement importants. Pres de l\'eau. Propriete de la mere.','Grande maison spacieuse. Interieur luxueux. Zone prestigieuse.','Habitation propre et pratique. Environnement axe sur la sante. Plusieurs petites proprietes.','Belle maison harmonieuse. Interet pour le design interieur. Propriete avec partenaire.','Propriete subit une transformation. Propriete heritee. Lieux secrets.','Grand terrain et propriete etrangere. Pres d\'installations religieuses/educatives.','Investissement immobilier systematique. Vieux batiments. Croissance lente mais sure.','Style d\'habitation unique. Appartement moderne. Installations technologiques.','Belle maison pres de l\'eau. Propriete etrangere. Espace spirituel.'][dLagnaSign];

        const d4_4sign = (dLagnaSign + 3) % 12;
        const d4_4planets = dPositions.filter(p => p.dSign === d4_4sign);
        const d4_10sign = (dLagnaSign + 9) % 12;
        const d4_10planets = dPositions.filter(p => p.dSign === d4_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🏠 Analyse propriété & fortune' : '🏠 D4 Chaturthamsha — Analyse propriété & fortune') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D4 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d4LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Propriete/Foyer:' : 'D4 4e Maison (immobilier/foyer) — ' + SIGNS[d4_4sign] + ':') + '</strong><br>';
        if (d4_4planets.length > 0) {
            const prop = {Sun:'Batiment gouvernemental ou residence prestigieuse',Moon:'Belle maison. Pres de l\'eau. Influence de la mere',Mars:'Construction de nouvelle maison. Litiges immobiliers possibles',Mercury:'Immobilier commercial. Plusieurs proprietes',Jupiter:'Maison spacieuse et abondante ! Meilleure fortune immobiliere',Venus:'Maison luxueuse. Bel interieur',Saturn:'Propriete ancienne. Reparations necessaires. Stable apres la cinquantaine',Rahu:'Immobilier etranger. Habitation non conventionnelle',Ketu:'Indifferent a l\'immobilier. Prefere les espaces spirituels'};
            d4_4planets.forEach(p => { html += isEasy ? (prop[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (prop[p.id]||'') + '<br>'; });
        } else html += isEasy ? 'Fortune immobiliere stable.<br>' : '4e maison vide — la position du seigneur de la 4e est la cle de la fortune immobiliere.<br>';

        html += '<br><strong>' + (isEasy ? 'Overall fortune:' : 'D4 10e Maison (fortune generale) — ' + SIGNS[d4_10sign] + ':') + '</strong><br>';
        if (d4_10planets.length > 0) {
            d4_10planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'La fortune generale est bonne !<br>' : 'Effort necessaire mais opportunite de croissance.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Benefique en 10e maison — la fortune generale est bonne !' : 'Malefique en 10e maison — effort necessaire mais opportunite de croissance.') + '<br>';
            });
        } else html += isEasy ? '' : '10e maison sans planetes.<br>';
        html += '</div></div>';

    } else if (division === 16) {
        // D16 Shodashamsha — 차량·comfort·행복
        const d16LagnaInterp = ['Voitures de sport, motos — vehicules dynamiques. Aime conduire.','Vehicules premium et transport confortable. Confort materiel luxueux.','Plusieurs vehicules ou transports varies. Aime les gadgets tech.','Vehicule familial confortable. Voyager en famille. La stabilite materielle est le bonheur.','Vehicules de luxe haut de gamme. Depenses voyantes. Prefere les marques premium.','Vehicules pratiques et economes. Appareils de sante.','Vehicule raffine et bien concu. Articles esthetiquement agreables.','Vehicule d\'occasion ou herite. Assurance importante. Experience materielle transformatrice.','SUV ou marques etrangeres. Vehicule de voyage. Transport aventureux.','Vehicule simple mais solide. Praticite d\'abord. Meilleure voiture apres la cinquantaine.','Vehicule electrique ou derniere technologie. Transport unique.','Transport lie a l\'eau (bateau). Articles emotionnellement favoris.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🚗 Véhicules & Confort' : '🚗 D16 Shodashamsha — Véhicules & Confort') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D16 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d16LagnaInterp + '<br><br>';

        const d16_4sign = (dLagnaSign + 3) % 12;
        const d16_4planets = dPositions.filter(p => p.dSign === d16_4sign);
        html += '<strong>' + (isEasy ? 'Comfort/Happiness:' : 'D16 4e Maison (confort/bonheur) — ' + SIGNS[d16_4sign] + ':') + '</strong><br>';
        if (d16_4planets.length > 0) {
            d16_4planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Confort materiel et bonheur abondants !<br>' : 'Effort necessaire pour le confort materiel.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Confort materiel et bonheur abondants !' : 'Effort necessaire pour le confort materiel.') + '<br>';
            });
        } else html += isEasy ? 'Confort materiel moyen.<br>' : '4e maison vide — la position du seigneur de la 4e est la cle du bonheur.<br>';

        const venD16 = dPositions.find(p => p.id === 'Venus');
        if (venD16) {
            const vH = ((venD16.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♀ Venus (karaka du confort):</strong> ';
            html += [,'Cree son propre confort','Confort par la richesse','Bonheur par la communication','Grand bonheur a la maison !','Bonheur par les enfants/romance','Confort par la gestion de sante','Bonheur par le partenaire !','Bonheur par la transformation','Bonheur par les voyages/apprentissage','Confort par le statut social','Bonheur par les amis/reseau','Bonheur par la paix spirituelle'][vH] || '';
        }
        html += '</div></div>';

    } else if (division === 20) {
        // D20 Vimshamsha — 영적 practice·종교
        const d20LagnaInterp = ['Spiritualite active. Karma yoga. Pratique par le service actif.','Spiritualite par la nature et les sens. Pratique de mantras. Meditation au temple.','Spiritualite intellectuelle. Recherche scripturaire. Eveil par la connaissance.','Spiritualite emotionnelle. Bhakti yoga (devotion). Attire par la divinite maternelle.','Spiritualite royale. Pratique spirituelle en tant que leader. Adoration du soleil.','Spiritualite de service. Pratique par le seva (service). Spiritualite de guerison.','Spiritualite d\'harmonie. Experience divine par l\'art et la beaute. Tantra.','Spiritualite transformatrice profonde. Tantra, Kundalini. Mort et renaissance.','Spiritualite de chercheur. Pelerinage. Recherche d\'un maitre. Pratique philosophique.','Spiritualite traditionnelle. Pratique systematique. Karma yoga. Pratique de patience.','Spiritualite innovante. Methodes non conventionnelles. Service a l\'humanite.','Spiritualite transcendante. Meditation, reves, intuition. Experiences mystiques. Liberation.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🙏 Spiritualité' : '🙏 D20 Vimshamsha — Spiritualité') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D20 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d20LagnaInterp + '<br><br>';

        const jupD20 = dPositions.find(p => p.id === 'Jupiter');
        const sunD20 = dPositions.find(p => p.id === 'Sun');
        const ketuD20 = dPositions.find(p => p.id === 'Ketu');
        const d20_9sign = (dLagnaSign + 8) % 12;
        const d20_12sign = (dLagnaSign + 11) % 12;
        const d20_9planets = dPositions.filter(p => p.dSign === d20_9sign);

        if (jupD20) {
            const jH = ((jupD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♃ Jupiter (Maitre Spirituel) → ' + jH + 'th:</strong> ') + ([,'Fort soi spirituel','La connaissance spirituelle devient richesse','Capacite de communication spirituelle','Paix interieure profonde','Merite spirituel des vies passees','Spiritualite par le service','Rencontre avec un maitre','Connaissance spirituelle secrete','Meilleure position ! Grande fortune spirituelle','Autorite spirituelle','Communaute spirituelle','Liberation et eveil'][jH] || '') + '<br>';
        }
        if (ketuD20) {
            const kH = ((ketuD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☋ Ketu (Liberation) → ' + kH + 'th:</strong> ') + ([,'Capacite spirituelle innee','Valeurs spirituelles','Communication spirituelle','Liberation interieure profonde','Resultat de la pratique des vies passees','Ame de service','Croissance spirituelle par le partenaire','Spiritualite transformatrice profonde','Pelerin spirituel','Carriere spirituelle','Leader de communaute spirituelle','Ame proche de la liberation'][kH] || '') + '<br>';
        }
        html += '<br><strong>' + (isEasy ? 'Guru/Teacher:' : 'D20 9e Maison (guru/maitre) — ' + SIGNS[d20_9sign] + ':') + '</strong><br>';
        if (d20_9planets.length > 0) {
            d20_9planets.forEach(p => { html += isEasy ? 'Forte connexion avec un maitre spirituel.<br>' : '• ' + p.name + ': Forte connexion avec un maitre spirituel.<br>'; });
        } else html += isEasy ? 'Bon de chercher activement un maitre spirituel.<br>' : '9e maison vide — cherchez activement un maitre spirituel.<br>';
        html += '</div></div>';

    } else if (division === 24) {
        // D24 차투르Vimshamsha — 교육·학문
        const d24LagnaInterp = ['Education physique, militaire, formation au leadership.','Musique, art, culinaire, education financiere.','Langues, litterature, communication, education mediatique.','Histoire, psychologie, sciences domestiques.','Sciences politiques, theatre, education commerciale.','Medecine, science, statistiques. Apprentissage precis.','Droit, diplomatie, education en design. Apprentissage equilibre.','Psychologie, recherche, investigation, education occulte.','Philosophie, theologie, etudes internationales. Etudes a l\'etranger probable.','Commerce, administration, architecture. Apprentissage systematique.','IT, ingenierie, aviation, sciences sociales. Apprentissage innovant.','Art, musique, spiritualite, etudes cinematographiques. Apprentissage intuitif.'][dLagnaSign];

        const d24_4sign = (dLagnaSign + 3) % 12;
        const d24_5sign = (dLagnaSign + 4) % 12;
        const d24_4planets = dPositions.filter(p => p.dSign === d24_4sign);
        const d24_5planets = dPositions.filter(p => p.dSign === d24_5sign);
        const jupD24 = dPositions.find(p => p.id === 'Jupiter');
        const merD24 = dPositions.find(p => p.id === 'Mercury');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '📚 Analyse éducation' : '📚 D24 Chaturvimshamsha — Analyse éducation') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D24 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d24LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Basic Education:' : 'D24 4e Maison (education de base) — ' + SIGNS[d24_4sign] + ':') + '</strong><br>';
        if (d24_4planets.length > 0) {
            d24_4planets.forEach(p => {
                const edu4 = {Sun:'Ecole prestigieuse. Education autoritaire',Moon:'Environnement d\'apprentissage confortable. Forte influence de l\'education a domicile',Mars:'Apprentissage competitif. Education physique/technique forte',Mercury:'Meilleure position ! Capacite academique exceptionnelle',Jupiter:'Environnement educatif riche. Bons professeurs',Venus:'Education artistique. Belle ecole',Saturn:'Environnement educatif difficile mais connaissance profonde si surmonte',Rahu:'Education non conventionnelle. Ecole etrangere',Ketu:'Moins d\'interet pour l\'education. Apprentissage intuitif'};
                html += isEasy ? (edu4[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (edu4[p.id]||'') + '<br>';
            });
        } else html += isEasy ? 'Grandit regulierement dans un environnement educatif stable.<br>' : '4e maison sans planetes.<br>';

        html += '<br><strong>' + (isEasy ? 'Higher Education:' : 'D24 5e Maison (education superieure) — ' + SIGNS[d24_5sign] + ':') + '</strong><br>';
        if (d24_5planets.length > 0) {
            d24_5planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Reussite exceptionnelle en education superieure !<br>' : 'Les defis academiques menent a la croissance.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Reussite exceptionnelle en education superieure !' : 'Les defis academiques menent a la croissance.') + '<br>';
            });
        } else html += isEasy ? 'Un effort regulier apporte de bons resultats.<br>' : '5e maison sans planetes.<br>';

        if (jupD24) {
            const jH = ((jupD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '<br>' : '<br><strong>♃ Jupiter (Sagesse) → ' + jH + 'th:</strong> ') + ([1,4,5,9].includes(jH) ? '🎓 <strong>Haute reussite academique attendue !</strong> Superieur/doctorat/etudes a l\'etranger possible.' : (isEasy ? 'Croissance par les etudes attendue.' : 'Croissance par les etudes. La benediction de Jupiter se manifeste dans le ' + jH + 'e domaine.')) + '<br>';
        }
        if (merD24) {
            const mH = ((merD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☿ Mercure (Apprentissage) → ' + mH + 'th:</strong> ') + ([1,4,5,9].includes(mH) ? '📖 <strong>Intellect exceptionnel !</strong> Talent en maths, langues, analyse.' : (isEasy ? 'Capacite intellectuelle bien exprimee.' : 'Capacite intellectuelle dans le ' + mH + 'e domaine.')) + '<br>';
        }
        html += '</div></div>';

    } else if (division === 27) {
        // D27 삽타Vimshamsha — 체력·강점·약점
        const d27LagnaInterp = ['Forte endurance et energie. Excellente capacite athletique. Tete/visage est la force.','Endurance et patience sont les forces. Cou/cordes vocales forts.','Agilite et reflexes forts. Soin du systeme nerveux necessaire.','Resilience emotionnelle est la force. Surveiller poitrine/estomac. Talent pour la natation.','Coeur et colonne vertebrale forts. Physique charismatique. Attention au surmenage.','Pouvoir digestif et analytique sont les forces. Surveiller intestins/peau. Yoga adapte.','Physique equilibre et harmonieux. Surveiller reins/dos. La danse convient.','Recuperation et resistance sont les forces. Surveiller sante reproductive. Sports extremes possibles.','Cuisses et foie sont forts. Exercice en plein air adapte. Attention au surpoids.','Os et articulations sont forts. Meilleure patience. Plus sain avec l\'age.','Surveiller systeme circulatoire et chevilles. Prefere exercice unique. Methodes de sante innovantes.','Immunite et intuition sont les forces. Surveiller pieds/lymphe. Exercice aquatique adapte.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💪 Analyse de force physique' : '💪 D27 Saptavimshamsha — Analyse de force physique') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D27 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d27LagnaInterp + '<br><br>';

        const marsD27 = dPositions.find(p => p.id === 'Mars');
        const sunD27 = dPositions.find(p => p.id === 'Sun');
        const satD27 = dPositions.find(p => p.id === 'Saturn');
        if (marsD27) {
            const mH = ((marsD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♂ Mars (Energie) → ' + mH + 'th:</strong> ') + ([,'Physique et volonte forts !','Peut gagner par la force physique','Courage et esprit aventurier forts','Type exercice a domicile','Talent sportif !','Immunite pour vaincre la maladie','Exercice avec le partenaire','Force de survie en crise','Fort en aventure/exploration','Force physique pour la carriere','Energie de realisation d\'objectifs','Activite physique a l\'etranger'][mH] || '') + '<br>';
        }
        if (sunD27) {
            const sH = ((sunD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☉ Soleil (Vitalite) → ' + sH + 'th:</strong> ') + (isEasy ? 'Source de vitalite : ' : 'Source de vitalite dans le ' + sH + 'e domaine. ') + ([,'Energie du soi','Vitalite des activites de richesse','Energie de la communication','Stabilite du foyer','Vitalite de la creation','Energie du service','Vitalite des relations','Energie de la transformation','Vitalite des voyages','Energie de la carriere','Vitalite de la societe','Energie de la pratique spirituelle'][sH] || '') + '<br>';
        }

        // D27 6 house (약점/질병) 분석
        const d27_6sign = (dLagnaSign + 5) % 12;
        const d27_6planets = dPositions.filter(p => p.dSign === d27_6sign);
        html += '<br><strong>' + (isEasy ? 'Weakness:' : 'D27 6e Maison (faiblesse) — ' + SIGNS[d27_6sign] + ':') + '</strong><br>';
        const bodyParts = ['Tete/Cerveau','Cou/Thyroide','Poumons/Bras','Estomac/Poitrine','Coeur/Dos','Digestif/Intestins','Reins/Bas du dos','Reproductif','Foie/Cuisses','Os/Articulations','Chevilles/Circulatoire','Pieds/Immunitaire'];
        html += 'Zone vulnerable : <strong>' + bodyParts[d27_6sign] + '</strong> — surveillez cette zone attentivement.<br>';
        if (d27_6planets.length > 0) {
            d27_6planets.forEach(p => { html += isEasy ? 'Attention particuliere necessaire pour cette zone.<br>' : '• ' + p.name + ' en 6e maison — attention particuliere necessaire.<br>'; });
        }
        html += '</div></div>';

    } else if (division === 30) {
        // D30 Trimshamsha — 불행·질병·장애
        const d30LagnaInterp = ['Accidents, brulures, maux de tete. Problemes de decisions hatives. Gerer la colere.','Perte financiere, problemes alimentaires, thyroide. Attention a trop manger.','Anxiete nerveuse, insomnie, problemes respiratoires. Eviter l\'inquietude excessive.','Instabilite emotionnelle, problemes d\'estomac, problemes lies a l\'eau. Controler les emotions.','Problemes cardiaques, dommage a l\'orgueil, surmenage. Besoin d\'humilite et de repos.','Troubles digestifs, allergies, stress perfectionniste. Besoin de relaxation.','Problemes renaux, conflits relationnels, indecision. Besoin de determination.','Secrets, accidents, chirurgie, problemes sexuels. Examens reguliers importants.','Problemes hepatiques, surpoids, jeu/depenses excessives. Besoin de moderation.','Articulations, os, depression, solitude. Besoin de calcium et interaction sociale.','Pression arterielle, circulation, accidents inattendus. Bilans de sante reguliers.','Deficience immunitaire, addiction, sante mentale. Besoin de meditation et sommeil.'][dLagnaSign];

        const d30_6sign = (dLagnaSign + 5) % 12;
        const d30_8sign = (dLagnaSign + 7) % 12;
        const d30_12sign = (dLagnaSign + 11) % 12;
        const d30_6planets = dPositions.filter(p => p.dSign === d30_6sign);
        const d30_8planets = dPositions.filter(p => p.dSign === d30_8sign);
        const d30_12planets = dPositions.filter(p => p.dSign === d30_12sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '⚠️ Détails précautions santé' : '⚠️ D30 Trimshamsha — Maladie') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D30 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d30LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Attention maladie:' : 'D30 6e Maison (maladie/ennemi) — ' + SIGNS[d30_6sign] + ':') + '</strong><br>';
        const diseaseBySign = ['Maux de tete, fievre, inflammation','Cou, thyroide, diabete','Poumons, nerfs, anxiete','Estomac, retention d eau','Coeur, dos, tension arterielle','Digestif, intestins, peau','Reins, bas du dos, urinaire','Reproductif, conditions chroniques','Foie, cuisses, surpoids','Os, articulations, rhumatisme','Circulatoire, tension arterielle, chevilles','Immunite, pieds, sante mentale'];
        html += 'Attention a : <strong>' + diseaseBySign[d30_6sign] + '</strong><br>';
        if (d30_6planets.length > 0) {
            const dis = {Sun:'Attention aux maladies des yeux et du coeur',Moon:'Sante mentale et problemes de retention d\'eau',Mars:'Attention aux accidents, chirurgie, brulures',Mercury:'Systeme nerveux et problemes de peau',Jupiter:'Attention au foie et au surpoids',Venus:'Attention aux reins, diabete, MST',Saturn:'Maladie chronique, problemes articulaires',Rahu:'Maladie de cause inconnue, addiction',Ketu:'Immunite reduite, allergie'};
            d30_6planets.forEach(p => { html += isEasy ? (dis[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (dis[p.id]||'') + '<br>'; });
        }

        html += '<br><strong>' + (isEasy ? 'Danger/Chirurgie:' : 'D30 8e Maison (danger/chirurgie) — ' + SIGNS[d30_8sign] + ':') + '</strong><br>';
        if (d30_8planets.length > 0) {
            d30_8planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Precaution danger/accident. Assurance importante.' : 'Protege en crise.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Precaution danger/accident. Assurance importante.' : 'Protege en crise.') + '<br>'; });
        } else html += isEasy ? 'Peu de grands dangers.<br>' : '8e maison vide — peu de grands dangers.<br>';

        html += '<br><strong>' + (isEasy ? 'Hospitalisation:' : 'D30 12e Maison (hospitalisation/perte) — ' + SIGNS[d30_12sign] + ':') + '</strong><br>';
        if (d30_12planets.length > 0) {
            d30_12planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Hospitalisation possible.' : 'Guerison spirituelle et recuperation.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Hospitalisation possible. Medecine etrangere.' : 'Guerison spirituelle et recuperation.') + '<br>'; });
        } else html += isEasy ? 'Faible risque d hospitalisation.<br>' : '12e maison vide — risque d\'hospitalisation est faible.<br>';
        html += '</div></div>';

    } else if (division === 40) {
        // D40 Khavedamsha — 모계 유산
        const d40LagnaInterp = ['Mere independante et volontaire. Leadership herite de la lignee maternelle.','Mere gere bien la richesse. Abondance materielle de la lignee maternelle.','Mere intellectuelle avec bonne communication. Talent linguistique/educatif herite.','Lien tres profond avec la mere. Sensibilite et intuition heritees.','Mere avec autorite et dignite. Leadership et honneur herites.','Mere excellente en gestion de sante. Esprit analytique/service herite.','Mere attrayante et diplomatique. Sens artistique herite.','Mere forte qui a traverse une transformation. Resilience heritee.','Mere educative et religieuse. Sagesse/philosophie heritee.','Mere responsable et stricte. Patience et discipline heritees.','Mere unique et progressiste. Pensee innovante heritee.','Mere spirituelle et intuitive. Art/spiritualite herite.'][dLagnaSign];

        const d40_4sign = (dLagnaSign + 3) % 12;
        const d40_4planets = dPositions.filter(p => p.dSign === d40_4sign);
        const moonD40 = dPositions.find(p => p.id === 'Moon');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👩 Héritage maternel' : '👩 D40 Khavedamsha — Héritage maternel') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D40 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d40LagnaInterp + '<br><br>';

        if (moonD40) {
            const mH = ((moonD40.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☽ Lune (karaka de la mere):</strong> ';
            html += [,'La mere a une forte influence','Richesse de la mere','Bonne communication avec la mere','Lien profond avec la mere ! Meilleure position','La mere est creative','La mere est orientee service','La mere influence les relations','Heritage de la mere','La mere est religieuse/educative','La mere a un statut social','La mere est independante','La mere est spirituelle'][mH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Maternal family:' : 'D40 4e Maison (foyer maternel) — ' + SIGNS[d40_4sign] + ':') + '</strong><br>';
        if (d40_4planets.length > 0) {
            d40_4planets.forEach(p => { html += isEasy ? 'Energie fortement heritee du cote maternel.<br>' : '• ' + p.name + ': L\'energie de cette planete est fortement heritee du cote maternel.<br>'; });
        } else html += isEasy ? 'Heritage stable du cote maternel.<br>' : '4e maison vide — la position du seigneur de la 4e est la cle de l\'heritage maternel.<br>';
        html += '</div></div>';

    } else if (division === 45) {
        // D45 Akshavedamsha — 부계 유산
        const d45LagnaInterp = ['Pere actif et oriente action. Courage et leadership herites.','Pere financierement stable. Valeurs materielles heritees.','Pere intellectuel et polyvalent. Capacite communication/affaires heritee.','Pere emotionnel et oriente famille. Instinct de soin herite.','Pere autoritaire et respecte. Leadership herite.','Pere pratique et diligent. Competences analytiques/techniques heritees.','Pere diplomatique et raffine. Capacite sociale heritee.','Pere fort et mysterieux. Resilience/perspicacite heritee.','Pere savant et religieux. Philosophie/morale heritee.','Pere strict et ambitieux. Patience/discipline heritee.','Pere creatif et innovant. Pensee technologique/scientifique heritee.','Pere spirituel et artistique. Intuition/creativite heritee.'][dLagnaSign];

        const d45_9sign = (dLagnaSign + 8) % 12;
        const d45_9planets = dPositions.filter(p => p.dSign === d45_9sign);
        const sunD45 = dPositions.find(p => p.id === 'Sun');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨 Héritage paternel' : '👨 D45 Akshavedamsha — Héritage paternel') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D45 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d45LagnaInterp + '<br><br>';

        if (sunD45) {
            const sH = ((sunD45.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☉ Soleil (karaka du pere):</strong> ';
            html += [,'Le pere a une forte influence','Richesse du pere','Bonne communication avec le pere','Le pere est oriente famille','Le pere est creatif','Le pere est oriente service','Le pere influence les relations','Heritage du pere','Le pere est religieux/educatif','Le pere reussit en societe ! Meilleure position','Le pere est independant','Le pere est spirituel'][sH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Paternal family:' : 'D45 9e Maison (foyer paternel/pere) — ' + SIGNS[d45_9sign] + ':') + '</strong><br>';
        if (d45_9planets.length > 0) {
            d45_9planets.forEach(p => { html += isEasy ? 'Energie fortement heritee du cote paternel.<br>' : '• ' + p.name + ': L\'energie de cette planete est fortement heritee du cote paternel.<br>'; });
        } else html += isEasy ? 'Heritage stable du cote paternel.<br>' : '9e maison vide — la position du seigneur de la 9e est la cle de l\'heritage paternel.<br>';
        html += '</div></div>';
    }

    interpEl.innerHTML = html;
}

