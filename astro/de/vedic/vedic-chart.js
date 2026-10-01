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
        catGuide: e ? 'Glossar' : 'Vedische Astrologie Anfängerhandbuch',
        catBasic: e ? 'Meine Planetenpositionen' : 'Grundkarte — Planetenpositionen & Geburtskarte',
        catDasha: e ? 'Meine Lebensperioden' : 'Dasha — Lebensperioden-Analyse',
        catInterp: e ? 'Meine Deutung — Persönlichkeit·Wohlstand·Karriere·Gesundheit' : 'Deutung — Persönlichkeit·Wohlstand·Karriere·Gesundheit·Yoga',
        catMarriage: e ? 'Meine Partnerdetails' : 'Ehe & Partner — D9 Navamsha',
        catCareer: e ? 'Meine Karriere·Wohlstand' : 'Karriere & Wohlstand — D10·D2·D4',
        catFamily: e ? 'Meine Familie' : 'Familie — D7·D3·D12·D40·D45',
        catSpirit: e ? 'Spiritualität·Bildung·Gesundheit' : 'Spiritualität·Bildung·Gesundheit — D20·D24·D27·D16',
        catWarn: e ? 'Gesundheitswarnungen' : 'Warnungen — D30 Krankheit·Ausland',
        catKarma: e ? 'Karma früherer Leben' : 'Karma — D60 Frühere Leben·Karma'
    };
    for (var id in ids) { var el = document.getElementById(id); if (el) el.textContent = ids[id]; }

    var secs = {
        secPlanetHouse: e ? 'Wie jeder Planet dich beeinflusst' : 'Planet-im-Haus-Analyse',
        secDignity: e ? 'Deine Stärken & Schwächen' : 'Planetenwürde (Erhöhung·Erniedrigung·Eigenes Zeichen)',
        secLucky: e ? 'Glücksinfo' : 'Glücksinformationen',
        secRemedy: e ? 'Wege dein Glück zu stärken' : 'Heilmittel & Stärkung',
        secD10: e ? 'Karrieredetails' : 'D10 Dashamsha (Karriere)',
        secD2: e ? 'Wohlstandsdetails' : 'D2 Hora (Wohlstand)',
        secD4: e ? 'Immobilien & Eigentum' : 'D4 Chaturthamsha (Eigentum)',
        secD7: e ? 'Kinder' : 'D7 Saptamsha (Kinder)',
        secD3: e ? 'Geschwister & Mut' : 'D3 Drekkana (Geschwister)',
        secD12: e ? 'Eltern' : 'D12 Dwadashamsha (Eltern)',
        secD40: e ? 'Mütterliches Erbe' : 'D40 Khavedamsha (Mütterlich)',
        secD45: e ? 'Väterliches Erbe' : 'D45 Akshavedamsha (Väterlich)',
        secD24: e ? 'Bildung' : 'D24 Chaturvimshamsha (Bildung)',
        secD20: e ? 'Spiritualität' : 'D20 Vimshamsha (Spiritualität)',
        secD27: e ? 'Körperliche Stärke' : 'D27 Saptavimshamsha (Stärke)',
        secD16: e ? 'Fahrzeuge & Komfort' : 'D16 Shodashamsha (Fahrzeuge)',
        secD30: e ? 'Gesundheitswarnungsdetails' : 'D30 Trimshamsha (Krankheit)',
        secForeign: e ? 'Ausland & Immigration' : 'Ausland & Immigration (9.·12. Haus)'
    };
    for (var sid in secs) { var sel = document.getElementById(sid); if (sel) sel.textContent = secs[sid]; }
}
function renderEasyMode(positions, lagnaSign, moonPos) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    var html = '';
    // Personality
    var personality = ['Handlungsorientiert! Schnelle Entscheidungen mit Führungsqualitäten. Liebt neue Herausforderungen.','Liebt Stabilität. Genießt Komfort und Schönheit. Einmal entschieden, zieht es durch.','Endlos neugierig! Großartiger Kommunikator und vielseitig begabt.','Warm und emotional. Schätzt die Familie und liest Menschen gut.','Geborener Anführer! Große Präsenz mit kreativem Talent.','Detailorientiert und analytisch. Strebt nach Perfektion und achtet auf Gesundheit.','Sucht Harmonie. Raffiniert, charmant, mit ausgezeichnetem Kunstsinn.','Hat Tiefe. Starke Intuition, die die Wahrheit sieht.','Freier Geist! Liebt Reisen und Lernen, sehr positiv.','Ehrgeizig. Geduldig und mit dem Alter attraktiver.','Einzigartig. Denkt anders als alle anderen, innovativ.','Tiefgründig sensibel. Starke Intuition, angezogen von Kunst und Spiritualität.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">👤 Meine Persönlichkeit</div><div class="interp-text">' + personality + '</div></div>';

    // Emotions
    if (moonPos) {
        var emotion = ['Ein feuriges Feuer brennt in dir. Emotionen steigen schnell und kühlen schnell ab. Bei Stress musst du dich bewegen. Sport und Outdoor-Aktivitäten wirken am besten.','Emotional sehr stabil. Mag keine plötzlichen Veränderungen, findet Sicherheit im Vertrauten. Gutes Essen, Musik und Natur heilen deine Seele.','Verarbeitet Emotionen rational. Reden hilft, Gefühle zu ordnen. Neugierig auf vieles gleichzeitig und kann Langeweile nicht ertragen.','Extrem sensibel. Absorbiert die Emotionen anderer wie ein Schwamm. Zuhause ist dein sicherer Ort mit starker Bindung zur Mutter.','Dramatischer und leidenschaftlicher Ausdruck. Braucht zutiefst Liebe und Anerkennung. Kreative Aktivitäten sind deine emotionale Medizin.','Neigt dazu, Emotionen zu analysieren und zu ordnen. Sorgt sich viel, aber ausgezeichnet in praktischen Lösungen. Tägliche Routinen bringen emotionale Stabilität.','Findet emotionales Gleichgewicht in Beziehungen. Fühlt sich allein einsam, stabilisiert sich mit Partner oder engen Freunden. Kunst und Schönheit bringen Frieden.','Emotionen sind so tief und intensiv wie der Ozean. Liebt tief und vergisst Verrat nie. Unglaublich starke Intuition.','Emotional hell und optimistisch. Liebt Freiheit und hasst Einschränkungen. Reisen ist das beste emotionale Heilmittel.','Zeigt Emotionen nicht leicht. Starkes Verantwortungsbewusstsein. Wird mit dem Alter emotional offener.','Einzigartige, unvorhersehbare emotionale Muster. Liebt auf unkonventionelle Weise. Findet emotionale Erfüllung in sozialen Anliegen.','Extrem intuitiv und spirituell. Träume sind lebendig und manchmal prophetisch. Kunst, Meditation und Wasser bringen Frieden.'][moonPos.sign];
        html += '<div class="interp-card"><div class="interp-title">🌙 Mein emotionaler Stil</div><div class="interp-text">' + emotion + '</div></div>';
    }

    // Wealth
    var wealth = ['Selbstgemacht. Aggressiver Investitionsstil, besser für Selbstständigkeit oder Freelance. Kann früh schnell verdienen, aber Vorsicht vor hastigen Investitionen.','Baut stetig Wohlstand auf. Einkommen wahrscheinlich aus Immobilien, Kunst, Essen. Balance bei Ausgaben ist der Schlüssel. Spargewohnheiten sind deine größte Waffe.','Verdient durch intellektuelle Fähigkeiten. Einkommen aus Schreiben, Bildung, IT, Marketing. Mehrere Einkommensquellen passen gut.','Wohlstand kommt durch Zuhause und Familie. Kann von der Mutter erben oder durch Immobilien/Essen verdienen. Vorsicht vor emotionalen Ausgaben.','Verdient durch Führung und Autorität. Wohlstand folgt höheren Positionen. Verbunden mit Regierung und Gold. Deine Würde zieht Wohlstand an.','Verdient durch Analyse und Fachkenntnisse. Stabiles Einkommen aus Medizin, Buchhaltung, Dienstleistung. Sparsamer Manager-Stil.','Verdient durch Partnerschaften. Besseres Glück mit anderen. Einkommen aus Recht, Diplomatie, Mode, Kunst. Partner kann Wohlstand bringen.','Akkumuliert durch anderer Ressourcen — Erbschaft, Versicherung, Investitionen. Gemeinsame Investitionen verbunden. Kann Wohlstand in Krisen schützen.','Glück folgt deinem Wohlstand. Einkommen aus Bildung, Ausland, Philosophie. Unerwartetes Glück bringt Wohlstand. Positive Einstellung zieht Glück an.','Akkumuliert langsam aber sicher. Finanzielle Schwierigkeiten anfangs aber stetiger Wohlstand nach der Lebensmitte. Geduld ist die beste Investitionsstrategie.','Verdient durch Technologie, Innovation, soziale Netzwerke. Unkonventionelle Einkommensmethoden. IT, Wissenschaft, soziale Bewegungen verbunden.','Verdient durch Kunst oder spirituelle Aktivitäten. Ausländische Wohlstandsverbindungen. Interessiert an Wohltätigkeit. Spiritueller Reichtum zieht paradoxerweise Wohlstand an.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">💰 Mein Wohlstand</div><div class="interp-text">' + wealth + '</div></div>';

    // Spouse
    var spouse = ['Dein Partner ist energisch und unabhängig. Aktiv und direkt, leidenschaftlich bei der Arbeit. Nicht der Typ, der still folgt — ein Partner, der gemeinsam herausfordert. Kann etwas ungeduldig sein, aber die Beziehung wird ebenso leidenschaftlich sein.','Dein Partner ist schön und sinnlich. Genießt die feinen Dinge, stabil und treu. Kann Talent im Kochen oder Kunst haben. Angenehm in der Nähe. Wahrscheinlich materiell stabil.','Dein Partner ist eloquent und witzig. Großartige Konversation ist der größte Charme, mit ausgezeichnetem Humor. Ein intellektueller, vielseitiger Partner, mit dem man viele Interessen teilen kann.','Dein Partner ist warm und familienorientiert. Ausgezeichnete Fürsorge. Zusammensein fühlt sich wie Zuhause an. Wünscht tiefe emotionale Bindungen und schätzt Familie über alles.','Dein Partner ist charismatisch und würdevoll. Kann eine sozial prominente Position haben. Hohes Selbstwertgefühl aber ebenso großzügig. Zusammensein lässt dich besonders fühlen.','Dein Partner ist akribisch und praktisch. Interessiert an Gesundheit und Wellness. Ein fürsorglicher Typ, der auf Details achtet. Kann perfektionistisch sein aber zuverlässig.','Dein Partner ist charmant und raffiniert. Diplomatisch mit gutem Gleichgewichtssinn, ausgezeichnetem Kunstgeschmack. Zusammensein macht die Welt schöner.','Dein Partner ist intensiv und mysteriös. Tiefe Emotionen — einmal engagiert, geht er/sie bis zum Ende. Kann viele Geheimnisse haben aber wünscht tiefe Verbindung. Eine schicksalhafte, intensive Anziehung.','Dein Partner ist freigeistig und optimistisch. Kann aus einer anderen Kultur sein oder mit dem Ausland verbunden. Philosophisch und abenteuerlustig. Will Freiheit auch nach der Ehe.','Dein Partner ist ernst und ehrgeizig. Starkes Verantwortungsbewusstsein, wahrscheinlich sozial erfolgreich. Kann Altersunterschied haben. Ehe kann spät kommen aber hält lange.','Dein Partner ist einzigartig und unabhängig. Kann sich auf unkonventionelle Weise treffen. Intellektuell mit innovativem Denken. Bevorzugt eine freie, freundschaftliche Beziehung.','Dein Partner ist spirituell und intuitiv. Verbunden mit einem Künstler oder spirituellen Praktizierenden. Gibt ein verträumtes, romantisches Gefühl. Kann realistische Erwartungen anpassen müssen.'][(lagnaSign+6)%12];
    // 7 house 행성 추가 정보
    var h7p = positions.filter(function(p){return houseOf(p.sign)===7;});
    var spouseExtra = '';
    h7p.forEach(function(p) {
        var desc = {Sun:'Ein Partner mit hohem sozialen Status.',Moon:'Ein emotionaler und fürsorglicher Partner.',Mars:'Leidenschaftlich aber Streit möglich. Starker Partner.',Mercury:'Ein intellektueller Partner mit großartiger Konversation.',Jupiter:'Ein weiser und moralischer Partner! Bestes Eheglück.',Venus:'Ein sehr attraktiver und liebevoller Partner.',Saturn:'Späte Ehe aber dauerhafte Beziehung. Altersunterschied möglich.',Rahu:'Unkonventionelle Ehe. Ausländischer Partner möglich.',Ketu:'Verbindung aus früheren Leben. Ein Partner mit starker spiritueller Bindung.'};
        if (desc[p.id]) spouseExtra += '<br>✦ ' + desc[p.id];
    });
    html += '<div class="interp-card"><div class="interp-title">💍 Mein Partner</div><div class="interp-text">' + spouse + spouseExtra + '</div></div>';

    // Career
    var career = ['Führungskarrieren. Militär, Polizei, Sport, Chirurgie, Unternehmensführung. Selbstständigkeit passt gut.','Finanzen, Essen, Immobilien, Mode, Kunst. Exzellent in sinnlichen, stabilen Umgebungen. Natürliches Talent mit Geld.','Kommunikation und intellektuelle Karrieren. Medien, Schreiben, Bildung, IT, Marketing. Verändert die Welt mit Worten.','Pflegeberufe. Medizin, Pflege, Gastgewerbe, Kochen, Beratung. Exzellent in emotional verbundener Arbeit.','Bühnenkarrieren. Politik, Unterhaltung, Management, Regierung. Kreative, autoritative Positionen sind deine Berufung.','Analyse- und Präzisionskarrieren. Medizin, Buchhaltung, Beratung, Gesundheitsmanagement. Detailbeobachtung ist deine Stärke.','Harmonie- und Schönheitskarrieren. Recht, Diplomatie, Mode, Innenarchitektur, Beratung. Talent, Menschen zu verbinden.','Tiefe Forschungskarrieren. Forschung, Versicherung, Medizin, Psychologie, Steuern. Talent im Umgang mit Geheimnissen.','Lern- und Erkundungskarrieren. Bildung, Recht, Religion, Verlagswesen, Reisen. Tiefe Auslandsverbindungen.','System- und Organisationskarrieren. Management, öffentlicher Dienst, Architektur. Langsamer aber sicherer Erfolg. Hohe soziale Position.','Innovations- und Technologiekarrieren. IT, Wissenschaft, Luftfahrt, Sozialarbeit. Verändert die Welt auf ungedachte Weise.','Kunst- und Spiritualitätskarrieren. Kunst, Film, Musik, Medizin, Ausland, NGO. Findet Sinn darin, die Welt zu heilen.'][(lagnaSign+9)%12];
    html += '<div class="interp-card"><div class="interp-title">💼 Meine Karriere</div><div class="interp-text">' + career + '</div></div>';

    // Health
    var health = ['Kopf und Gesicht sind Schwachstellen. Kopfschmerzen und Fieber häufig. Regelmäßig Sport treiben und hydriert bleiben. Vorsicht vor Unfällen.','Nacken und Schilddrüse sind schwach. Neigung zum Überessen — Vorsicht vor Gewicht und Diabetes. Gutes Essen in Maßen. Spaziergänge in der Natur sind am besten.','Lungen, Arme, Schultern, Nervensystem. Angstzustände und Schlafprobleme möglich. Atemmeditation hilft. Schlafroutine einhalten.','Magen und Brustbereich. Emotionaler Stress beeinflusst die Verdauung direkt. Warmes Essen und Tee helfen. Zeit am Wasser heilt.','Herz, Rücken, Wirbelsäule. Vorsicht vor Überarbeitung. Regelmäßiges Cardio-Training. Genug ruhen. Stolz zu managen reduziert Stress.','Verdauungssystem, Darm, Haut. Verdauungsstörungen und Allergien möglich. Ernährung ist entscheidend. Yoga und Meditation helfen.','Nieren, unterer Rücken, Haut. Hydriert und ausgeglichen bleiben. Zucker reduzieren. Haut spiegelt Stress wider — innerer Frieden gleich Hautgesundheit.','Reproduktions- und Ausscheidungssysteme. Chronische Erkrankungen möglich. Regelmäßige Untersuchungen wichtig. Tiefes Atmen und Meditation helfen.','Leber, Oberschenkel, Hüften. Vorsicht vor Gewicht. Outdoor-Aktivitäten am besten. Sitzzeit reduzieren. Auslandsreisen heilen Körper und Geist.','Knochen, Gelenke, Knie, Haut. Vorsicht vor Rheuma. Kalzium und Vitamin D wichtig. Dehnen wird mit dem Alter attraktiver.','Knöchel, Waden, Kreislaufsystem. Blutdruckmanagement wichtig. Regelmäßig gehen. Bei ungewöhnlichen Symptomen untersuchen lassen.','Füße, Lymphsystem, Immunsystem. Ausreichend Schlaf ist dein stärkstes Gesundheitsgeheimnis. Wasser, Meditation, Yoga stärken die Immunität. Empfindlich gegenüber Alkohol.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">🏥 Meine Gesundheit</div><div class="interp-text">' + health + '</div></div>';

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
                    var dashaDesc = {Ketu:'Eine Phase spirituellen Wachstums. Konzentriere dich auf dein Inneres statt auf Materielles.',Venus:'Eine Zeit der Liebe und des Überflusses! Romantik, Ehe und Kunst blühen auf.',Sun:'Eine Zeit der Selbstfindung und Führung. Das Vertrauen wächst stark.',Moon:'Eine Zeit der Emotionen und des Zuhauses. Familienbeziehungen werden wichtig.',Mars:'Eine Zeit der Aktion und Energie. Großartig für neue Anfänge.',Rahu:'Eine Zeit des Wandels und der Innovation. Unerwartete Möglichkeiten entstehen.',Jupiter:'Eine Zeit des Glücks und Wachstums! Viele gute Dinge in Bildung, Ehe, Beförderung.',Saturn:'Eine Zeit der Geduld und Prüfungen. Langsames aber sicheres Wachstum.',Mercury:'Eine Zeit intellektueller Aktivität. Günstig für Studium, Geschäft, Kommunikation.'};
                    html += '<div class="interp-card"><div class="interp-title">⏳ Meine aktuelle Periode</div><div class="interp-text">Aktuelle Periode: <strong style="color:#c9a84c;">' + DASHA_KO[planet] + '</strong>.<br><br>' + (dashaDesc[planet]||'') + '</div></div>';
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
const SIGNS = ['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau',
               'Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
const SIGNS_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

// Planets
const PLANETS = [
    { id: 'Sun', name: 'Sonne', symbol: '☉', natural: 'malefic' },
    { id: 'Moon', name: 'Mond', symbol: '☽', natural: 'benefic' },
    { id: 'Mars', name: 'Mars', symbol: '♂', natural: 'malefic' },
    { id: 'Mercury', name: 'Merkur', symbol: '☿', natural: 'neutral' },
    { id: 'Jupiter', name: 'Jupiter', symbol: '♃', natural: 'benefic' },
    { id: 'Venus', name: 'Venus', symbol: '♀', natural: 'benefic' },
    { id: 'Saturn', name: 'Saturn', symbol: '♄', natural: 'malefic' },
];

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', ko: 'Ashwini', ruler: 'Ketu', meaning: 'Pferdezwillinge', deity: 'Ashwini Kumaras', desc: 'Energie der Heilung und Neuanfänge. Eine Person mit schnellem Handeln und Heilfähigkeiten.' },
    { name: 'Bharani', ko: 'Bharani', ruler: 'Venus', meaning: 'Die Trägerin', deity: 'Yama', desc: 'Der Kreislauf von Leben und Tod. Starke Geduld und die Kraft, Wandel anzuführen.' },
    { name: 'Krittika', ko: 'Krittika', ruler: 'Sun', meaning: 'Der Schneider', deity: 'Agni', desc: 'Die Kraft des Feuers und der Reinigung. Scharfer Intellekt und Entschlossenheit.' },
    { name: 'Rohini', ko: 'Rohini', ruler: 'Moon', meaning: 'Der Rote Stern', deity: 'Brahma', desc: 'Der Stern der Fülle und Schönheit. Eine kreative und charmante Persönlichkeit.' },
    { name: 'Mrigashira', ko: 'Mrigashira', ruler: 'Mars', meaning: 'Hirschkopf', deity: 'Soma', desc: 'Der Stern der Erkundung und Neugier. Ein unermüdlicher Reisender auf der Suche nach Wahrheit.' },
    { name: 'Ardra', ko: 'Ardra', ruler: 'Rahu', meaning: 'Träne', deity: 'Rudra', desc: 'Wiedergeburt durch Sturm und Zerstörung. Intensive Emotionen und transformative Kraft.' },
    { name: 'Punarvasu', ko: 'Punarvasu', ruler: 'Jupiter', meaning: 'Rückkehr des Lichts', deity: 'Aditi', desc: 'Der Stern der Erholung und Rückkehr. Eine optimistische und weise Persönlichkeit.' },
    { name: 'Pushya', ko: 'Pushya', ruler: 'Saturn', meaning: 'Der Nährender', deity: 'Brihaspati', desc: 'Das günstigste Nakshatra. Energie der Fürsorge, des Schutzes und des Wohlstands.' },
    { name: 'Ashlesha', ko: 'Ashlesha', ruler: 'Mercury', meaning: 'Der Verschlinger', deity: 'Nagas', desc: 'Schlangenweisheit und Mysterium. Einsicht und tiefe Intuition.' },
    { name: 'Magha', ko: 'Magha', ruler: 'Ketu', meaning: 'Der Große', deity: 'Pitris', desc: 'Der Stern des Königtums. Autorität, Respekt und Ahnensegen.' },
    { name: 'Purva Phalguni', ko: 'Purva Phalguni', ruler: 'Venus', meaning: 'Frühere Frucht', deity: 'Bhaga', desc: 'Der Stern der Freude und Liebe. Kunstsinn und Romantik.' },
    { name: 'Uttara Phalguni', ko: 'Uttara Phalguni', ruler: 'Sun', meaning: 'Spätere Frucht', deity: 'Aryaman', desc: 'Der Stern der Freundschaft und Verträge. Vertrauen und Hingabe.' },
    { name: 'Hasta', ko: 'Hasta', ruler: 'Moon', meaning: 'Die Hand', deity: 'Savitar', desc: 'Der Stern der Handwerkskunst und des Könnens. Heilende Hände, der Künstler.' },
    { name: 'Chitra', ko: 'Chitra', ruler: 'Mars', meaning: 'Leuchtender Juwel', deity: 'Vishwakarma', desc: 'Der Stern der Schönheit und Schöpfung. Außergewöhnlicher ästhetischer Sinn.' },
    { name: 'Swati', ko: 'Swati', ruler: 'Rahu', meaning: 'Der Unabhängige', deity: 'Vayu', desc: 'Die Freiheit des Windes. Eine unabhängige und flexible Persönlichkeit.' },
    { name: 'Vishakha', ko: 'Vishakha', ruler: 'Jupiter', meaning: 'Der Gegabelte', deity: 'Indra-Agni', desc: 'Der Stern der Ziele und Entschlossenheit. Starker Fokus und Willenskraft.' },
    { name: 'Anuradha', ko: 'Anuradha', ruler: 'Saturn', meaning: 'Radha folgend', deity: 'Mitra', desc: 'Der Stern der Freundschaft und Hingabe. Organisatorische Fähigkeiten und Führung.' },
    { name: 'Jyeshtha', ko: 'Jyeshtha', ruler: 'Mercury', meaning: 'Der Älteste', deity: 'Indra', desc: 'Der Stern des Schutzes und der Autorität. Starkes Verantwortungsbewusstsein.' },
    { name: 'Mula', ko: 'Mula', ruler: 'Ketu', meaning: 'Die Wurzel', deity: 'Nirriti', desc: 'Der Stern der Zerstörung und des Wiederaufbaus. Einer, der die Wurzel der Wahrheit sucht.' },
    { name: 'Purva Ashadha', ko: 'Purva Ashadha', ruler: 'Venus', meaning: 'Früher Unbesiegbar', deity: 'Apas', desc: 'Die Kraft des Wassers und der Reinigung. Verborgene siegreiche Energie.' },
    { name: 'Uttara Ashadha', ko: 'Uttara Ashadha', ruler: 'Sun', meaning: 'Später Unbesiegbar', deity: 'Vishvedevas', desc: 'Der Stern des ultimativen Sieges. Geduld und Führung.' },
    { name: 'Shravana', ko: 'Shravana', ruler: 'Moon', meaning: 'Der Zuhörer', deity: 'Vishnu', desc: 'Der Stern des Wissens und Zuhörens. Ein Meister des Lernens und der Kommunikation.' },
    { name: 'Dhanishta', ko: 'Dhanishta', ruler: 'Mars', meaning: 'Der Wohlhabendste', deity: 'Vasus', desc: 'Der Stern der Fülle und Musik. Talent und Wohlstand.' },
    { name: 'Shatabhisha', ko: 'Shatabhisha', ruler: 'Rahu', meaning: 'Hundert Heiler', deity: 'Varuna', desc: 'Der Stern der Geheimnisse und Heilung. Mysteriöse Heilfähigkeiten.' },
    { name: 'Purva Bhadrapada', ko: 'Purva Bhadrapada', ruler: 'Jupiter', meaning: 'Frühere Glücksfüße', deity: 'Aja Ekapada', desc: 'Der Stern des Feuers und der Transformation. Spirituelles Erwachen.' },
    { name: 'Uttara Bhadrapada', ko: 'Uttara Bhadrapada', ruler: 'Saturn', meaning: 'Spätere Glücksfüße', deity: 'Ahir Budhnya', desc: 'Weisheit des tiefen Ozeans. Meditation und spirituelle Tiefe.' },
    { name: 'Revati', ko: 'Revati', ruler: 'Mercury', meaning: 'Der Wohlhabende', deity: 'Pushan', desc: 'Der Stern des Reisens und Schutzes. Die Vollendung aller Dinge.' },
];

// Dasha periods (years)
const DASHA_YEARS = {
    'Ketu': 7, 'Venus': 20, 'Sun': 6, 'Moon': 10, 'Mars': 7,
    'Rahu': 18, 'Jupiter': 16, 'Saturn': 19, 'Mercury': 17
};
const DASHA_ORDER = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const DASHA_KO = {
    'Ketu': 'Ketu', 'Venus': 'Venus', 'Sun': 'Sonne', 'Moon': 'Mond', 'Mars': 'Mars',
    'Rahu': 'Rahu', 'Jupiter': 'Jupiter', 'Saturn': 'Saturn', 'Mercury': 'Merkur'
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
    html += '<th>Planet</th><th>Zeichen</th><th>Grad</th><th>Nakshatra</th><th>Haus</th>';
    html += '</tr></thead><tbody>';

    // Add Lagna first with exact degree
    const lagnaDeg = lagnaSidereal % 30;
    const lagnaNakIdx = Math.floor(lagnaSidereal / (360/27));
    const lagnaNak = NAKSHATRAS[lagnaNakIdx] || {ko:'-'};
    html += `<tr><td>⬆ Lagna (Aszendent)</td><td>${SIGN_SYMBOLS[lagnaSign]} ${SIGNS[lagnaSign]}</td><td>${lagnaDeg.toFixed(1)}°</td><td>${lagnaNak.ko}</td><td>1</td></tr>`;

    positions.forEach(p => {
        const house = ((p.sign - lagnaSign + 12) % 12) + 1;
        const nak = NAKSHATRAS[p.nakshatra] || { ko: '-', name: '-' };
        const roleMap = { Sun:'Selbst/Autorität', Moon:'Emotionen/Geist', Mars:'Energie/Mut', Mercury:'Intelligenz/Kommunikation', Jupiter:'Glück/Weisheit', Venus:'Liebe/Charme', Saturn:'Geduld/Verantwortung', Rahu:'Verlangen/Innovation', Ketu:'Spiritualität/Befreiung' };
        const houseArea = ['','Selbst','Geld·Familie','Kommunikation','Zuhause','Kinder·Romantik','Gesundheit','Partner','Transformation','Glück·Ausland','Karriere','Einkommen','Spiritualität'];
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
    const SIGN_RULERS = ['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
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
        'Führung, Militär, Sport, Unternehmertum (Feuerpionier)',
        'Finanzen, Landwirtschaft, Kunst, Immobilien, Essen (Stabilität & Material)',
        'Kommunikation, Medien, Schreiben, Lehre, Marketing (Intellektuell)',
        'Pflege, Betreuung, Kochen, Gastgewerbe, Beratung (Emotionale Fürsorge)',
        'Politik, Unterhaltung, Führung, Kreativität (Strahlende Bühne)',
        'Medizin, Buchhaltung, Analyse, Redaktion, Gesundheit (Präziser Service)',
        'Recht, Diplomatie, Design, Mode, Mediation (Balance & Schönheit)',
        'Forschung, Ermittlung, Medizin, Okkultismus, Psychologie (Tiefe & Transformation)',
        'Bildung, Reisen, Philosophie, Religion, Verlagswesen (Expansion & Erkundung)',
        'Regierung, Bau, Management, CEO, Organisationsführer (System & Autorität)',
        'Technologie, IT, Erfindung, Sozialaktivismus, Wissenschaft (Innovation)',
        'Kunst, Spiritualität, Heilung, Musik, Wohltätigkeit (Transzendenz & Service)'
    ];

    // 행성별 spouse career 경향
    const planetCareer = {
        Sun: 'Regierungsbeamter, Politiker, Arzt, CEO — autoritative Positionen',
        Moon: 'Krankenschwester, Berater, Koch, Gastgewerbe — Fürsorge/emotionale Rollen',
        Mars: 'Militär, Polizei, Chirurg, Ingenieur, Athlet',
        Mercury: 'Schriftsteller, Lehrer, Programmierer, Buchhalter, Händler',
        Jupiter: 'Professor, Richter, religiöser Führer, Berater, Senior Professional',
        Venus: 'Designer, Schauspieler, Musiker, Mode, Schönheitsindustrie',
        Saturn: 'Bau, Bergbau, Landwirtschaft, Management, Handwerker',
        Rahu: 'IT, auslandsbezogen, unkonventionelle Karrieren, Forschung',
        Ketu: 'Spiritualität, Alternativmedizin, Forschung, Asket'
    };

    let html = '';

    // 1. D9 Lagna 분석 (결혼 후 본인)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🕉️ Du nach der Hochzeit' : '🕉️ D9 Lagna — Du nach der Hochzeit: ' + SIGNS[d9LagnaSign] + ' ' + SIGN_SYMBOLS[d9LagnaSign]}</div>
        <div class="interp-text">
            ${isEasy ? 'Dies offenbart dein wahres Selbst nach der Hochzeit und in der zweiten Lebenshälfte (nach den 30ern).' : 'Navamsa Lagna ist in <strong>' + SIGNS[d9LagnaSign] + '</strong>. Dies offenbart dein wahres Selbst nach der Hochzeit und in der zweiten Lebenshälfte (nach 30).'}
            ${d9LagnaSign === d1LagnaSign ? (isEasy ? '<br><br><strong>Besonderes Zeichen!</strong> Dein Wesen bleibt nach der Hochzeit unverändert — inneres und äußeres Selbst sind im Einklang.' : '<br><br><strong>D1 und D9 Lagna im selben Zeichen!</strong> Genannt <strong>Vargottama</strong> — sehr kraftvoll. Dein Wesen bleibt nach der Hochzeit unverändert.') : ''}
            ${d9H1Planets.length > 0 ? '<br><br>' + (isEasy ? 'Es gibt Energien, die deine Persönlichkeit nach der Hochzeit stark beeinflussen.' : '<strong>Planeten in D9 1.:</strong> ' + d9H1Planets.map(p => p.symbol + ' ' + p.name).join(', ') + ' — beeinflussen stark deine Persönlichkeit nach der Hochzeit.') : ''}
        </div>
    </div>`;

    // 2. D9 7 house (spouse)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Partnercharakter' : '💍 D9 7. Haus — Partnercharakter: ' + SIGNS[d9H7Sign] + ' ' + SIGN_SYMBOLS[d9H7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'einzigartiger Charme') + ' Qualitäten.' : 'Das 7. Navamsa-Haus ist in <strong>' + SIGNS[d9H7Sign] + '</strong>, regiert von <strong>' + RULER_NAMES[d9H7Ruler] + '</strong>.<br><br>Dies offenbart die Kernpersönlichkeit deines Partners. ' + SIGNS[d9H7Sign] + ' Energie-Partner — ' + ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'einzigartiger Charme') + ' Qualitäten.'}
            ${d9H7Planets.length > 0 ? '<br><br>' + (isEasy ? d9H7Planets.map(p => p.natural === 'benefic' ? 'Positive Energie! Du erhältst Segen von deinem Partner.' : 'Herausfordernde Energie — auch Wachstumschancen in der Ehe.').join('<br>') : '<strong>Planeten in D9 7.:</strong><br>' + d9H7Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${p.natural === 'benefic' ? 'Wohltätig! Segen von deinem Partner.' : 'Herausfordernde Energie — auch Wachstumschancen in der Ehe.'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 3. D9 10 house (본인의 Dharma/사명)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 Lebenszweck' : '💼 D9 10. Haus — Lebenszweck (Dharma): ' + SIGNS[d9H10Sign] + ' ' + SIGN_SYMBOLS[d9H10Sign]}</div>
        <div class="interp-text">
            ${isEasy ? 'Die wahre Berufung, die du nach der Reife verfolgst.' : 'Das 10. Navamsa-Haus ist in <strong>' + SIGNS[d9H10Sign] + '</strong>, regiert von <strong>' + RULER_NAMES[d9H10Ruler] + '</strong>.<br><br>Während D1\'s 10. deine Karriere zeigt, offenbart D9\'s 10. deinen <strong>größeren Lebenszweck (Dharma)</strong>.'}<br><br>
            <strong>Direction of purpose:</strong> ${careerBySgn[d9H10Sign]}
            ${d9H10Planets.length > 0 ? '<br><br>' + (isEasy ? d9H10Planets.map(p => planetCareer[p.id] || 'einzigartige Karriereenergie').join('<br>') : '<strong>Planeten in D9 10.:</strong><br>' + d9H10Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${planetCareer[p.id] || 'einzigartige Karriereenergie'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 4. spouse의 career (파생하우스: D9 4 house = 7 house서 10번째)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👔 Partnerkarriere' : '👔 Partnerkarriere — Abgeleitetes 10. (D9 4.): ' + SIGNS[d9H4Sign] + ' ' + SIGN_SYMBOLS[d9H4Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '<strong>Abgeleitetes Haus:</strong> 10. vom 7. (Partner) = D9 4. Haus zeigt Partnerkarriere.<br><br>D9 4. ist in <strong>' + SIGNS[d9H4Sign] + '</strong>, regiert von <strong>' + RULER_NAMES[d9H4Ruler] + '</strong>.<br><br>'}
            <strong>Spouse career tendency:</strong> ${careerBySgn[d9H4Sign]}
            ${d9H4Planets.length > 0 ? '<br><br>' + (isEasy ? d9H4Planets.map(p => `Partner arbeitet wahrscheinlich in ${planetCareer[p.id] || 'Fachgebiet'}`).join('<br>') : '<strong>Planeten im D9 4. (Partner 10.):</strong><br>' + d9H4Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: Partner arbeitet wahrscheinlich in ${planetCareer[p.id] || 'Fachgebiet'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 5. 바르고타마 행성 체크
    const vargottamaPlanets = d9Positions.filter(p => p.sign === p.d9Sign);
    if (vargottamaPlanets.length > 0) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '⭐ Außergewöhnlich starke Planeten' : '⭐ Vargottama Planeten — Außergewöhnlich Stark'}</div>
            <div class="interp-text">
                ${isEasy ? 'Diese Planeten sind außergewöhnlich kraftvoll und wirken beständig durchs ganze Leben.' : 'Planeten im selben Zeichen in D1 und D9 heißen <strong>Vargottama</strong>. Sehr kraftvoll, wirken beständig durchs ganze Leben.'}<br><br>
                ${isEasy ? 'Außergewöhnlich starke Energie wirkt beständig in deinem ganzen Leben!' : vargottamaPlanets.map(p => `<strong>${p.symbol} ${p.name}</strong>: In D1 und D9 ${SIGNS[p.sign]} — die Energie dieses Planeten ist außergewöhnlich stark!`).join('<br>')}
            </div>
        </div>`;
    }

    // 6. spouse 방향 분석 (UL + A7 + D1 7 house + D9 7 house 종합)
    const DIRECTIONS = {
        0:'Osten', 1:'Süden', 2:'Westen', 3:'Norden',
        4:'Osten', 5:'Süden', 6:'Westen', 7:'Norden',
        8:'Osten', 9:'Süden', 10:'Westen', 11:'Norden'
    };
    const DIR_DETAIL = {
        0:'Osten (Widder — Feuer)',1:'Süden (Stier — Erde)',2:'Westen (Zwillinge — Luft)',3:'Norden (Krebs — Wasser)',
        4:'Osten (Löwe — Feuer)',5:'Süden (Jungfrau — Erde)',6:'Westen (Waage — Luft)',7:'Norden (Skorpion — Wasser)',
        8:'Osten (Schütze — Feuer)',9:'Süden (Steinbock — Erde)',10:'Westen (Wassermann — Luft)',11:'Norden (Fische — Wasser)'
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
        {name:'D1 7th', sign: d1H7Sign, desc:'Partnerhaus in der Geburtskarte'},
        {name:'D9 7th', sign: d9H7Sign, desc:'Partnerhaus im Navamsa'},
        {name:'D9 7th Lord', sign: d9H7RulerSign, desc:'Wohin der D9 7. Herrscher geht'},
        {name:'D9 Venus', sign: venusD9Sign, desc:'Partner-Karaka im Navamsa'},
        {name:'Upapada (UL)', sign: ulSign, desc:'12. Arudha — Partnerhintergrund'},
        {name:'Darapada (A7)', sign: a7Sign, desc:'7. Arudha — Soziales Image des Partners'}
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
        <div class="interp-title">${isEasy ? '🧭 Woher dein Partner kommt' : '🧭 Partnerrichtung — 6-Indikatoren-Analyse'}</div>
        <div class="interp-text">
            ${isEasy ? 'Analyse, aus welcher Richtung dein Partner kommen könnte.' : 'Die vedische Astrologie bestimmt die Partnerrichtung durch Kombination mehrerer Indikatoren.'}<br><br>
            ${isEasy ? '' : '<strong>6 Indikatoren:</strong><br>' + dirSources.map(s => `• <strong>${s.name}</strong>: ${SIGNS[s.sign]} ${SIGN_SYMBOLS[s.sign]} → <strong>${DIRECTIONS[s.sign]}</strong> <span style="color:#666;font-size:12px;">(${s.desc})</span>`).join('<br>') + '<br><br><strong>🧿 Upapada Lagna (UL):</strong> 12. Haus Arudha Pada. Zeigt die Familie/den Hintergrund des Partners und das Eheumfeld. → <strong>' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign] + '</strong><br><strong>🎯 Darapada (A7):</strong> 7. Haus Arudha Pada. Zeigt das soziale Image und den äußeren Eindruck des Partners. → <strong>' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign] + '</strong><br><strong>💍 D9 7th lord (' + RULER_NAMES[d9H7Ruler] + '):</strong> Das Zeichen, in das der Navamsa 7. Haus-Herrscher geht, zeigt die tatsächliche Richtung des Partners. → <strong>' + SIGNS[d9H7RulerSign] + ' ' + SIGN_SYMBOLS[d9H7RulerSign] + '</strong><br><strong>♀ D9 Venus:</strong> Natürlicher Signifikator des Partners. Venus\' Navamsa-Position zeigt die Quelle der Partnerenergie. → <strong>' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign] + '</strong><br><br>'}
            <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;margin-top:10px;">
                <strong style="font-size:16px;">🧭 Conclusion: ${agreement >= 4 ? 'Überwältigend stark' : agreement >= 3 ? 'Sehr stark' : agreement >= 2 ? 'Strong' : ''} ${primaryDir} direction</strong><br><br>
                Out of 6 indicators <strong>${agreement}</strong> point to <strong>${primaryDir}</strong> point to this direction.
                ${agreement >= 4 ? '<br>4+ indicators agree! <strong>Very high probability</strong>of ' + primaryDir + '. Achte auf Städte, Arbeitsplätze oder Reisen in dieser Richtung.' : ''}
                ${agreement === 3 ? '<br>3 Indikatoren — <strong>Hohe Wahrscheinlichkeit</strong> für ' + primaryDir + ' direction.' : ''}
                ${agreement === 2 ? '<br>2 indicators — ' + primaryDir + ' bevorzugt aber andere Möglichkeiten bestehen.' : ''}
                ${agreement <= 1 ? '<br>Indikatoren verteilt — Partner kann aus verschiedenen Richtungen kommen. Bleib offen.' : ''}
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
        "Aktive Orte, Sport, Wettbewerbsumgebungen. Intensives und plötzliches erstes Treffen.",
        "Arbeitsplatz, Finanzinstitute, Restaurants, Natur. Langsam Vertrauen aufbauen.",
        "SNS, Schule, Seminare, beim Reisen, Blind Dates. Beziehung beginnt mit Gespräch.",
        "Familienvorstellungen, Nachbarschaftstreffen, Kindheitsfreunde. Bequeme Umgebungen.",
        "Partys, Konzerte, kreative Treffen, glamouröse Orte. Dramatische erste Begegnung.",
        "Arbeitsplatz, Krankenhaus, gesundheitsbezogen, Ehrenamt. Treffen aus praktischen Bedürfnissen.",
        "Blind Dates, juristische/diplomatische Events, Kunstausstellungen. Elegantes Treffen.",
        "Krisensituationen, tiefe Gespräche, geheime Orte. Schicksalhafte intensive Anziehung.",
        "Ausland, Universität, religiöse/philosophische Treffen. Verbindung aus der Ferne.",
        "Arbeitsplatz, Geschäftsveranstaltungen, offizielle Funktionen. Statusbezogenes Treffen.",
        "Online, Hobby-Clubs, soziale Bewegungen. Einzigartiges unkonventionelles Treffen.",
        "Spirituelle Treffen, Ausland, Kunst/Musik. Mystisches schicksalhaftes Treffen."
    ];

    const backgroundBySgn = [
        "Unabhängige, selbstgemachte Familie. Starkes Führungserbe.",
        "Finanziell stabile Familie. Traditionelle Werte. Möglicherweise wohlhabend.",
        "Intellektuelle, kommunikative Familie. Betonung auf Bildung.",
        "Warmer, familienorientierter Haushalt. Starke Mutterfigur.",
        "Angesehene, stolze Familie. Sozialer Status und Reputation.",
        "Praktische, fleißige Familie. Gesundheits-/Bildungshintergrund.",
        "Ausgewogene, würdevolle Familie. Kunst-/Rechts-/Diplomatiehintergrund.",
        "Familie mit Geheimnissen oder Transformationen. Tiefe Geschichte.",
        "Gelehrte, religiöse/philosophische Familie. Möglicher ausländischer Hintergrund.",
        "Strenge, traditionelle Familie. Sozial respektiert.",
        "Freigeistige, einzigartige Familienstruktur. Progressives Denken.",
        "Spirituelle oder künstlerische Familie. Möglicher ausländischer Hintergrund."
    ];

    const imageBySgn = [
        "Energischer, selbstbewusster erster Eindruck. Sportliches Image.",
        "Ruhiger, zuverlässiger erster Eindruck. Raffiniertes Image.",
        "Heller, gesprächiger erster Eindruck. Intellektuelles Image.",
        "Warmer, fürsorglicher erster Eindruck. Weiches Image.",
        "Glamouröser, charismatischer erster Eindruck. Selbstbewusstes Image.",
        "Gepflegter, ordentlicher erster Eindruck. Professionelles Image.",
        "Eleganter, charmanter erster Eindruck. Anspruchsvolles Image.",
        "Mysteriöser, intensiver erster Eindruck. Charismatisches Image.",
        "Freigeistiger, lebhafter erster Eindruck. Abenteuerlustiges Image.",
        "Ernster, reifer erster Eindruck. Zuverlässiges Image.",
        "Einzigartiger, individualistischer erster Eindruck. Originelles Image.",
        "Verträumter, mystischer erster Eindruck. Künstlerisches Image."
    ];

    const attractBySgn = [
        "Starke Energie und Selbstvertrauen. Beschützende Natur ist attraktiv.",
        "Stabilität und sinnlicher Charme. Gutes Essen und Texturen genießen.",
        "Witz und Konversation. Intellektuelle Stimulation ist die Anziehung.",
        "Hingebungsvolle Fürsorge. Sich gemeinsam zu Hause fühlen.",
        "Strahlende Präsenz und Großzügigkeit. Sich gemeinsam besonders fühlen.",
        "Zarte Rücksichtnahme und Perfektionismus. Aufmerksamkeit für Details.",
        "Eleganz und Harmonie. Die Welt wird gemeinsam schöner.",
        "Intensiver Blick und Tiefe. Seelendurchdringende Anziehung.",
        "Freier Geist und Humor. Abenteuer beginnen zusammen.",
        "Solide Vertrauenswürdigkeit und Reife. Felsenfeste Stabilität.",
        "Einzigartige Individualität. Nie gesehene Frische.",
        "Mystische Sensibilität und spirituelle Tiefe. Traumhafte Romantik."
    ];

    // D1 7 house 사인으로 만남 환경
    const d1H7ForMeeting = (d1LagnaSign + 6) % 12;

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🤝 Begegnungsumgebung' : '🤝 Begegnungsumgebung — D1 7.: ' + SIGNS[d1H7ForMeeting] + ' ' + SIGN_SYMBOLS[d1H7ForMeeting]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Das Zeichen des 7. Hauses enthüllt die Begegnungsumgebung.<br><br>'}
            <strong>${meetingBySgn[d1H7ForMeeting]}</strong>
            ${d1H7ForMeeting === 8 || d1H7ForMeeting === 11 ? '<br><br>💡 <strong>Möglichkeit einer Auslandsverbindung!</strong> Partner kann Ausländer sein oder ihr trefft euch im Ausland.' : ''}
        </div>
    </div>`;

    // UL 사인으로 spouse 가문/배경
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏛️ Familienhintergrund des Partners' : '🏛️ Partnerhintergrund — UL: ' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Upapada Lagna (UL) enthüllt den Familienhintergrund des Partners.<br><br>'}
            <strong>${backgroundBySgn[ulSign]}</strong>
        </div>
    </div>`;

    // A7 사인으로 spouse 외적 이미지
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👤 Erster Eindruck des Partners' : '👤 Erster Eindruck — A7: ' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Darapada (A7) zeigt den ersten Eindruck des Partners.<br><br>'}
            <strong>${imageBySgn[a7Sign]}</strong>
        </div>
    </div>`;

    // D9 Venus 사인으로 spouse 매력 포인트
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💎 Anziehungspunkt des Partners' : '💎 Partneranziehung — D9 Venus: ' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Venus im Navamsa offenbart den Charme und Liebesstil des Partners.<br><br>'}
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
            <div class="nakshatra-name">Dein Stern: ${nak.ko}</div>
            <div class="nakshatra-meaning">"${nak.meaning}"</div>
            <div class="nakshatra-detail">${nak.desc}</div>
        </div>
    ` : `
        <div class="nakshatra-card">
            <div class="nakshatra-name">${nak.ko} (${nak.name})</div>
            <div class="nakshatra-meaning">"${nak.meaning}" — Herrscherplanet: ${DASHA_KO[nak.ruler] || nak.ruler}</div>
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
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 Das Leben fließt mit verschiedenen Energien. Überprüfe deine aktuelle Periode.<br><br>' :
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 <strong>Vimshottari Dasha</strong> — Das Leben wird in Perioden unterteilt, die von 9 Planeten regiert werden. <strong>Mahadasha</strong> ist die Hauptperiode, <strong>Antardasha (Bhukti)</strong> ist die Unterperiode. Berechnet aus der Mond-Nakshatra-Position.<br><br>';
    html += isEasy ?
        '</div></div>' :
        '🌙 Geburtsmond: <strong>' + nak.ko + ' (' + nak.name + ')</strong> — Erste Dasha: <strong>' + DASHA_KO[startRuler] + '</strong> (verbleibend: ' + remainingYears.toFixed(2) + ' Jahre)</div></div>';

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
        const dashaEasyDesc = {Ketu:'Innere Reflexion & spirituelles Wachstum',Venus:'Liebe, Schönheit & Überfluss',Sun:'Vertrauen & Führung strahlen',Moon:'Emotionen & Zuhause stehen im Mittelpunkt',Mars:'Herausforderungen & Aktionsenergie',Rahu:'Große Veränderungen & neue Möglichkeiten',Jupiter:'Glück & Wachstum kommen',Saturn:'Geduld bringt große Belohnungen',Mercury:'Studium, Kommunikation & Geschäft gedeihen'};
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
        'Handlungsorientiert! Schnelle Entscheidungen mit natürlichen Führungsqualitäten. Du liebst neue Herausforderungen. Leute bitten dich oft, die Führung zu übernehmen. Etwas ungeduldig, aber unglaublich getrieben.',
        'Du liebst Stabilität. Du genießt Komfort, Schönheit und gutes Essen. Einmal entschieden, ziehst du es durch. Stur, aber das macht dich unglaublich zuverlässig.',
        'Neugierig auf alles! Großartiger Kommunikator und vielseitig begabt. Du nimmst neue Informationen schnell auf und ziehst Menschen mit deinem Witz an. Manchmal zerstreut, aber das ist Teil deines Charmes.',
        'Warm und emotional. Du schätzt Familie und liest die Gefühle der Menschen gut. Ein natürlicher Betreuer, der alle sich wohl fühlen lässt. Stimmungsschwankungen passieren, aber deine Empathie ist deine Superkraft.',
        'Geborener Anführer! Du hast große Präsenz und ziehst natürlich Aufmerksamkeit an. Selbstbewusst und magnetisch. Du sehnst dich nach Anerkennung, bist aber ebenso großzügig mit Liebe und Lob.',
        'Detailorientiert und analytisch. Du strebst nach Perfektion und achtest auf Gesundheit. Scharfer Beobachter, der auffängt, was andere übersehen. Du sorgst dich etwas zu viel, aber das bedeutet, dass du immer vorbereitet bist.',
        'Du suchst Harmonie. Raffiniert, charmant, mit ausgezeichnetem Kunstgeschmack. Ein natürlicher Friedensstifter, der Konflikte hasst. Am glücklichsten, wenn von schönen Dingen umgeben.',
        'Du hast Tiefe. Starke Intuition, die die Wahrheit durchschneidet. Ruhig an der Oberfläche, aber intensive Emotionen darunter. Das Leben wirft dir große Veränderungen zu, und jede macht dich stärker.',
        'Freier Geist! Du liebst Reisen und Lernen. Positiv und philosophisch. Interessiert an verschiedenen Kulturen, mit einem weiten Weltbild. Dein Humor erhellt jeden Raum.',
        'Ehrgeizig. Geduldig und mit dem Alter zunehmend attraktiver. Arbeitet systematisch auf Ziele hin. Auch wenn du anfangs kämpfst, bist du der Spätblüher-Typ, der am Ende alles bekommt.',
        'Einzigartig. Du denkst anders als alle anderen und bist innovativ. Du hasst es, eingeengt zu sein und willst die Welt auf deine Weise verändern. Talent in Technik oder Wissenschaft.',
        'Tiefgründig sensibel. Starke Intuition, angezogen von Kunst und Spiritualität. Lebhafte Träume und reiche Vorstellungskraft. Du empfindest tief mit dem Schmerz anderer. Deine innere Welt ist reicher als die äußere.'
    ];
    const lagnaInterp = [
        'Widder-Lagna, regiert von Mars. Starke Willenskraft und Führung, unabhängige Persönlichkeit. Schnell im Handeln mit Pioniergeist. Markante Züge mit aktivem Eindruck. Impulsiv aber mutig, hervorragend im Wettbewerb.',
        'Stier-Lagna, regiert von Venus. Sucht Stabilität und Überfluss, liebt sinnliche Schönheit. Weiches Aussehen mit attraktiver Stimme. Schätzt materielle Sicherheit mit außergewöhnlichem Kunstsinn. Stur aber zuverlässig.',
        'Zwillinge-Lagna, regiert von Merkur. Intellektuell neugierig mit herausragenden Kommunikationsfähigkeiten. Jugendliches Aussehen mit agiler Statur. Vielseitig aber kann zerstreut sein, Talent im Schreiben und Sprachen.',
        'Krebs-Lagna, regiert vom Mond. Reich an Sensibilität und hoch intuitiv. Rundes Gesicht mit sanftem Eindruck. Dem Zuhause und der Familie ergeben mit starken Schutzinstinkten. Emotionale Höhen und Tiefen aber tief empathisch.',
        'Löwe-Lagna, regiert von der Sonne. Überflutend mit Charisma und kreativer Energie. Würdevolle Statur mit befehlender Präsenz. Geborener Anführer, der das Rampenlicht genießt. Hohes Selbstwertgefühl aber großzügiges Herz.',
        'Jungfrau-Lagna, regiert von Merkur. Analytisch und perfektionistisch. Gepflegtes Aussehen mit intellektuellem Eindruck. Ausgezeichnete Detailgenauigkeit und praktische Fähigkeiten, mit Interesse an Gesundheit und Hygiene.',
        'Waage-Lagna, regiert von Venus. Sucht Balance und Harmonie, diplomatisch geschickt. Proportioniertes Aussehen mit raffiniertem Eindruck. Hervorragend in Beziehungen und Partnerschaften mit superb ästhetischem Sinn.',
        'Skorpion-Lagna, regiert von Mars. Intensive Intuition und transformative Kraft. Scharfe Augen mit mysteriösem Eindruck. Durchdringt das Wesentliche mit tiefem Einblick, bewahrt Geheimnisse gut. Erlebt mehrfach dramatische Lebensveränderungen.',
        'Schütze-Lagna, regiert von Jupiter. Ein Philosoph, der Freiheit und Wahrheit sucht. Große Statur mit hellem Eindruck. Optimistisch und schätzt moralische Prinzipien. Tiefe Verbindungen mit Reisen und höherer Bildung.',
        'Steinbock-Lagna, regiert von Saturn. Starker Ehrgeiz und Geduld. Schlanke Statur mit ernstem Eindruck. Arbeitet systematisch auf Ziele hin, der Typ, der mit dem Alter jünger wird. Schätzt sozialen Status und Leistung.',
        'Wassermann-Lagna, regiert von Saturn. Innovativ und originell. Einzigartiges Aussehen mit intellektuellem Eindruck. Schätzt humanitäre Ideale mit unkonventionellem Denken. Talent in Technologie und Wissenschaft.',
        'Fische-Lagna, regiert von Jupiter. Spirituell und intuitiv. Weiches Aussehen mit verträumtem Eindruck. Extrem begabte künstlerische Sensibilität mit Interesse an transzendenten Welten. Selbstaufopfernde Tendenz.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">👤 ${isEasy ? 'Deine Persönlichkeit' : 'Persönlichkeit & Erscheinung — Lagna: ' + SIGNS[lagnaSign] + ' ' + SIGN_SYMBOLS[lagnaSign]}</div>
        <div class="interp-text">${isEasy ? lagnaEasy[lagnaSign] : lagnaInterp[lagnaSign]}</div>
    </div>`;

    // ═══════════════════════════════════
    // 2. 내면 & 감정 (Moon 별자리)
    // ═══════════════════════════════════
    if (moonPos) {
        const moonEasy = [
            'Eine feurige Leidenschaft brennt in dir. Emotionen steigen schnell und kühlen schnell ab. Bei Stress musst du dich bewegen — Sport oder Outdoor-Aktivitäten wirken am besten.',
            'Du bist emotional sehr stabil. Du magst keine plötzlichen Veränderungen und findest Trost im Vertrauten. Gutes Essen, Musik und schöne Natur heilen deine Seele. Einmal gegeben, ändert sich dein Herz selten.',
            'Du verarbeitest Emotionen durch Gespräche. Reden macht dich besser. Du bist neugierig auf alles und kannst Langeweile nicht ertragen. Dein Humor kann jede Stimmung aufhellen.',
            'Du bist extrem sensibel und empathisch. Du absorbierst die Emotionen anderer wie ein Schwamm. Dein Zuhause ist dein sicherer Ort, und deine Bindung zu deiner Mutter ist stark. Kochen oder Dekorieren bringt emotionalen Frieden.',
            'Dein emotionaler Ausdruck ist dramatisch und leidenschaftlich. Du brauchst zutiefst Liebe und Anerkennung. Aber du gibst Liebe ebenso großzügig. Kreative Aktivitäten — Kunst, Schreiben, Musik — sind deine emotionale Medizin.',
            'Du neigst dazu, deine Emotionen zu analysieren. Du sorgst dich viel, aber bist großartig darin, Probleme praktisch zu lösen. Tägliche Routinen — Morgensport, gesunde Mahlzeiten, Ordnen — bringen emotionale Stabilität.',
            'Du findest emotionales Gleichgewicht in Beziehungen. Du fühlst dich allein einsam und stabilisierst dich mit engen Freunden oder einem Partner. Du hasst Konflikte zutiefst und findest Frieden in Schönheit und Kunst.',
            'Deine Emotionen sind so tief und intensiv wie der Ozean. Du liebst tief und vergisst Verrat nie. Deine Intuition ist unglaublich stark — du liest Wahrheit durch Augen und Taten, nicht Worte.',
            'Du bist emotional hell und optimistisch. Du liebst Freiheit und hasst Einschränkungen. Reisen ist dein bestes emotionales Heilmittel. Du verarbeitest Gefühle durch philosophisches Denken.',
            'Du zeigst Emotionen nicht leicht. Starkes Verantwortungsbewusstsein, Pflicht kommt immer zuerst. Du warst als Kind vielleicht reifer als dein Alter, aber du wirst mit den Jahren emotional offener.',
            'Du hast einzigartige, unvorhersehbare emotionale Muster. Du liebst auf unkonventionelle Weise und siehst das große Bild. Du findest emotionale Erfüllung in sozialen Anliegen und Gemeinschaftsaktivitäten.',
            'Du bist extrem intuitiv und spirituell. Deine Träume sind lebhaft und fühlen sich manchmal prophetisch an. Du empfindest tief mit dem Schmerz anderer. Kunst, Meditation und Wassernähe bringen dir Frieden.'
        ];
        const moonInterp = [
            'Eine feurige Leidenschaft brennt innerlich. Emotionen sind spontan und ändern sich schnell. Wut flammt schnell auf, erlischt aber genauso schnell; emotionale Unabhängigkeit wird gewünscht.',
            'Emotional sehr stabil, sucht Komfort. Mag keine Veränderungen und findet Sicherheit im Vertrauten. Gutes Essen, Musik und Natur heilen. Einmal gegeben, ändert sich das Herz selten.',
            'Verarbeitet Emotionen rational und ordnet Gefühle durch Gespräche. Neugierig mit vielen gleichzeitigen Interessen. Sucht Vielfalt über emotionale Tiefe.',
            'Mond im eigenen Zeichen (Domizil). Extrem sensibel, absorbiert Emotionen anderer wie ein Schwamm. Starke mütterliche Instinkte, findet Stabilität zu Hause.',
            'Dramatischer und leidenschaftlicher emotionaler Ausdruck. Starkes Bedürfnis, anerkannt und geliebt zu werden. Kreative Aktivitäten dienen als emotionale Heilung. Romantisches und großzügiges Herz.',
            'Tendenz, Emotionen zu analysieren und zu ordnen. Sorgt sich viel und ist perfektionistisch, löst aber Dinge praktisch. Findet Stabilität in täglichen Routinen.',
            'Findet emotionales Gleichgewicht in Beziehungen. Fühlt sich allein ängstlich und stabilisiert sich mit Partner. Extrem abgeneigt gegenüber Konflikten, findet inneren Frieden in Kunst und Schönheit.',
            'Emotionen sind so tief und intensiv wie der Ozean. Liebt tief und hasst tief; vergisst Verrat nie. Sehr starke Intuition, liest instinktiv wahre Absichten anderer.',
            'Emotional optimistisch und freiheitsliebend. Mag keine Einschränkungen und sucht neue Erfahrungen. Sublimiert Emotionen durch philosophisches Denken, Reisen als bestes Heilmittel.',
            'Kontrolliert Emotionen gut und zeigt sie nicht äußerlich. Starkes Verantwortungsbewusstsein, Pflicht über Gefühle. Kann emotionale Schwierigkeiten in der Kindheit gehabt haben, reift aber emotional mit dem Alter.',
            'Einzigartige und unvorhersehbare emotionale Muster. Unabhängig, liebt auf unkonventionelle Weise. Verfolgt universelle Liebe für die Menschheit und soziale Anliegen.',
            'Extrem intuitiv und spirituell. Träume sind lebhaft und können prophetisch sein. Empfindet tief mit dem Leiden anderer. Findet Stabilität in Kunst, Meditation und spiritueller Praxis.'
        ];
        html += `<div class="interp-card">
            <div class="interp-title">🌙 ${isEasy ? 'Dein emotionaler Stil' : 'Inneres Selbst & Emotionen — Mond: ' + SIGNS[moonPos.sign] + ' ' + SIGN_SYMBOLS[moonPos.sign]}</div>
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

    let wealthText = isEasy ? '' : `<strong>2. Haus (Angesammelter Wohlstand):</strong> ${SIGNS[h2sign]}. `;
    if (h2planets.length === 0) {
        wealthText += isEasy ? 'Die Wohlstandsanhäufung ist stetig und stabil. Baut sich ohne große Schwankungen auf. ' : 'Keine Planeten im 2. — stetige Wohlstandsanhäufung. ';
    } else {
        h2planets.forEach(p => {
            const pWealth = {
                'Sun': 'Einkommen durch Autorität und Status. Potenzielle Verdienste aus Regierung oder öffentlichem Sektor.',
                'Moon': 'Schwankende finanzielle Situation. Einkommen möglich in öffentlichkeitsnahen Geschäften oder Gastronomie.',
                'Mars': 'Aggressive Investitionstendenzen. Einkommen aus Immobilien, Technologie oder militärischen Bereichen.',
                'Mercury': 'Geld verdienen durch intellektuelle Fähigkeiten. Wohlstand aus Schreiben, Bildung, Kommunikation und IT.',
                'Jupiter': 'Die günstigste Platzierung! Reichliches Wohlstandsglück. Großes Einkommen aus Bildung, Recht oder Religion.',
                'Venus': 'Sammelt Wohlstand durch Luxusgüter, Kunst, Unterhaltung und Mode an. Reiches kulinarisches Leben.',
                'Saturn': 'Sammelt langsam und stetig Wohlstand an. Anfangs Schwierigkeiten aber Stabilisierung nach der Lebensmitte.',
                'Rahu': 'Verdient Geld durch unkonventionelle Methoden. Plötzlicher Wohlstand aus Ausland, Technologie oder Innovation.',
                'Ketu': 'Gleichgültigkeit gegenüber Wohlstand. Schätzt Spirituelles über Materielles; Vorsicht vor plötzlichen Verlusten.'
            };
            wealthText += isEasy ? `${pWealth[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pWealth[p.id] || ''} `;
        });
    }

    wealthText += isEasy ? '<br><br>' : `<br><br><strong>11. Haus (Einkommen & Gewinne):</strong> ${SIGNS[h11sign]}. `;
    if (h11planets.length === 0) {
        wealthText += isEasy ? 'Einkommen ist stabil aber ohne große Schwankungen.' : 'Keine Planeten im 11. — stabiles Einkommen ohne große Veränderungen.';
    } else {
        h11planets.forEach(p => {
            const pIncome = {
                'Jupiter': 'Großes Einkommen und reichliche Gewinne! Soziale Netzwerke bringen Wohlstand.',
                'Venus': 'Einkommen durch Kunst, Geselligkeit und Mode. Freundinnen sind hilfreich.',
                'Saturn': 'Stetiges und stabiles Einkommen aber langsames Wachstum. Gute Altersvorsorge.',
                'Mars': 'Einkommen durch Wettbewerb. Gewinne aus Technologie, Immobilien und Sport.',
                'Mercury': 'Einkommen durch intellektuelle Netzwerke. Unternehmerische Begabung.',
                'Sun': 'Einkommen durch Autorität. Politische Verbindungen bringen Wohlstand.',
                'Moon': 'Einkommen durch öffentliche Beliebtheit. Schwankend aber stetiger Fluss.'
            };
            wealthText += isEasy ? `${pIncome[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pIncome[p.id] || ''} `;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">💰 ${isEasy ? 'Mein Wohlstandsglück' : 'Wohlstandsglück'}</div>
        <div class="interp-text">${wealthText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 4. 💕 spouse & Marriage Fortune (7 house 분석)
    // ═══════════════════════════════════
    const h7sign = (lagnaSign + 6) % 12;
    const h7planets = planetsInHouse(7);
    const venus = positions.find(p => p.id === 'Venus');

    const spouseSign = [
        'Ein unabhängiger und energischer Partner. Bestimmt für jemanden mit starker Willenskraft und Führung. Ein aktiver und direkter Partner.',
        'Ein schöner und künstlerischer Partner. Bestimmt für jemanden materiell Stabilen. Ein sinnlicher und treuer Partner.',
        'Ein intelligenter Partner mit guten Kommunikationsfähigkeiten. Bestimmt für jemanden mit guter Konversation. Ein humorvoller und vielseitiger Partner.',
        'Ein emotionaler und häuslicher Partner. Bestimmt für jemanden Fürsorglichen. Ein Partner mit mütterlicher Wärme.',
        'Ein charismatischer und würdevoller Partner. Bestimmt für jemanden sozial Prominenten. Ein Partner mit hohem Selbstwertgefühl aber großzügiger Natur.',
        'Ein akribischer und praktischer Partner. Bestimmt für jemanden an Gesundheit und Wellness Interessierten. Ein analytischer und serviceorientierter Partner.',
        'Ein attraktiver und raffinierter Partner. Bestimmt für jemanden Diplomatischen mit gutem Gleichgewichtssinn. Ein Partner mit ausgezeichnetem Kunstgeschmack.',
        'Ein intensiver und mysteriöser Partner. Bestimmt für jemanden mit tiefen Emotionen. Ein transformativer und leidenschaftlicher Partner.',
        'Ein freigeistiger und optimistischer Partner. Mögliche Verbindung mit Ausländer oder anderer Kultur. Ein philosophischer und abenteuerlustiger Partner.',
        'Ein ernster und ehrgeiziger Partner. Kann Altersunterschied haben. Ein verantwortungsvoller und sozial erfolgreicher Partner. Ehe kann spät kommen.',
        'Ein einzigartiger und unabhängiger Partner. Unkonventionelles Treffen oder Beziehung. Ein intellektueller und innovativer Partner.',
        'Ein spiritueller und intuitiver Partner. Verbindung mit Künstler oder spirituellem Praktizierenden. Ein verträumter und romantischer Partner.'
    ];

    const spouseAppearance = [
        'Markante Züge, starker Eindruck. Athletische Statur. Intensive Augen voller Energie. Rote Töne passen gut.',
        'Weiches, attraktives Aussehen. Volle Figur mit sinnlichen Lippen. Gute Haut mit natürlicher Schönheit. Warmer, gemütlicher Eindruck.',
        'Jugendliches Aussehen, heller Eindruck. Schlank und groß. Ausdrucksstarkes Gesicht mit funkelnden Augen. Trendy und stilvoll.',
        'Rundes Gesicht, sanfter Eindruck. Leicht kurvige Figur. Helle Haut mit großen Augen. Mütterliche Ausstrahlung.',
        'Würdevolle Statur mit charismatischem Aussehen. Reiches Haar ist ein Merkmal. Befehlende Präsenz, gut gekleidet.',
        'Gepflegtes, sauberes Aussehen. Schlank mit guten Proportionen. Intellektueller Eindruck. Minimalistische Mode.',
        'Ausgewogenes Aussehen, raffinierter Eindruck. Symmetrisches Gesicht. Charmantes Lächeln, gesellige Ausstrahlung. Kann Grübchen haben.',
        'Scharfes, mysteriöses Aussehen. Tiefe Augen hinterlassen starken Eindruck. Schlank mit scharfen Zügen. Bevorzugt dunkle Töne.',
        'Groß mit guter Statur. Heller, offener Eindruck. Exotischer Charme. Lässige, freie Kleidung. Attraktives Lächeln.',
        'Ernstes, reifes Aussehen. Schlank mit definierter Knochenstruktur. Sieht älter aus aber wird mit der Zeit attraktiver. Klassischer Anzugstil.',
        'Einzigartiges, außergewöhnliches Aussehen. Markante Mode. Groß oder mit bemerkenswerten Merkmalen. Futuristischer Stil.',
        'Weiches, verträumtes Aussehen. Große Augen mit verträumtem Ausdruck. Leicht rundlich mit durchscheinender Haut. Pastelltöne passen. Mystischer Charme.'
    ];

    let spouseText = (isEasy ? '' : '<strong>📐 Aussehen des Partners:</strong><br>') + spouseAppearance[h7sign] + (isEasy ? '<br><br>' : isEasy ? '<br><br>' : '<br><br><strong>📋 Persönlichkeit des Partners:</strong><br>') + spouseSign[h7sign];

    if (h7planets.length > 0) {
        spouseText += isEasy ? '<br><br>' : '<br><br><strong>Planeten im 7.:</strong> ';
        h7planets.forEach(p => {
            const pH7 = {
                'Sun': 'Partner wird sozial anerkannt. Kann etwas dominant sein aber ein respektabler Partner.',
                'Moon': 'Ein emotionaler und fürsorglicher Partner. Eheleben mit tiefer emotionaler Verbindung.',
                'Mars': 'Leidenschaftlich aber häufige Streitigkeiten möglich. Ein willensstarker Partner.',
                'Mercury': 'Ein intellektueller Partner mit großartiger Konversation. Gute Geschäftspartnerschaft.',
                'Jupiter': 'Die gesegnetste Platzierung! Ein weiser und moralischer Partner. Glückliches Eheleben.',
                'Venus': 'Ein sehr attraktiver und liebevoller Partner. Romantisches Eheleben.',
                'Saturn': 'Späte Ehe oder Partner mit bedeutendem Altersunterschied. Anfangs schwierig aber stabil.',
                'Rahu': 'Unkonventionelle Ehe. Partner aus dem Ausland oder anderem Hintergrund.',
                'Ketu': 'Verbindung aus früheren Leben. Starke spirituelle Bindung aber etwas Distanz.'
            };
            spouseText += isEasy ? `<br>${pH7[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pH7[p.id] || ''}`;
        });
    }

    if (venus) {
        const venusHouse = houseOf(venus.sign);
        spouseText += isEasy ? '<br><br>' : `<br><br><strong>Venus Position (${venusHouse}th):</strong> `;
        const venusHouseInterp = {
            1: 'Attraktives Aussehen. Genießt Romantik und verliebt sich leicht.',
            2: 'Wohlstand kommt durch den Partner. Schöne Stimme und Gourmet-Geschmack.',
            3: 'Künstlerische Kommunikationsfähigkeiten. Angenehme Beziehungen zu Geschwistern.',
            4: 'Glück zu Hause mit schönem Wohnsitz. Starker Einfluss der Mutter.',
            5: 'Ein Leben reich an Romantik. Gute Beziehung zu Kindern. Freude an kreativer Arbeit.',
            6: 'Serviceorientierte Haltung in der Romantik. Möglichkeit einer Arbeitsplatzromanze.',
            7: 'Sehr attraktiver Partner. Ein starker Indikator für glückliches Eheleben.',
            8: 'Tiefe und transformative Liebe. Geheime Romantik. Wohlstand des Partners.',
            9: 'Romantik im Ausland. Verbindung zu einem Lehrer oder Mentor. Philosophische Liebe.',
            10: 'Sozial anerkannte Ehe. Treffen durch die Karriere.',
            11: 'Von Freunden zu Liebenden. Verbindungen durch soziale Aktivitäten.',
            12: 'Geheime Romantik. Auslandsverbindungen. Spirituelle Liebe.'
        };
        spouseText += venusHouseInterp[venusHouse] || '';
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Mein Partner' : '💕 Partner & Ehe — 7. Haus: ' + SIGNS[h7sign] + ' ' + SIGN_SYMBOLS[h7sign]}</div>
        <div class="interp-text">${spouseText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 5. 💼 career & 사회적 성취 (10 house 분석)
    // ═══════════════════════════════════
    const h10sign = (lagnaSign + 9) % 12;
    const h10planets = planetsInHouse(10);

    const careerSign = [
        'Geeignet für Militär, Polizei, Sport, Chirurgie, Unternehmensführung, Führungsrollen.',
        'Finanzen, Lebensmittelindustrie, Landwirtschaft, Mode, Immobilien, Kunst, Bankwesen.',
        'Medien, Schreiben, Bildung, Kommunikation, IT, Marketing, Übersetzung.',
        'Medizin, Pflege, Gastgewerbe, Maritime, Immobilien, Gastronomie.',
        'Politik, Unterhaltung, Management, Regierungsbehörden, Führungspositionen, Gold.',
        'Medizin, Buchhaltung, Analyse, Beratung, Gesundheitswesen, Qualitätskontrolle.',
        'Recht, Diplomatie, Mode, Innenarchitektur, Beratung, Eventplanung.',
        'Forschung, Ermittlung, Versicherung, Medizin, Psychologie, Steuern, Bergbau.',
        'Bildung, Recht, Religion, Verlagswesen, Reisen, internationaler Handel.',
        'Management, öffentlicher Dienst, Architektur, Bauingenieurwesen, Politik, Großkonzerne.',
        'Technologie, Wissenschaft, IT, Luftfahrt, Raumfahrt, Sozialarbeit, Innovation.',
        'Kunst, Film, Musik, Medizin, Ausland, spirituelle Bereiche, NGO.'
    ];

    let careerText = isEasy ? careerSign[h10sign] : `10. Haus ist in ${SIGNS[h10sign]}. ${careerSign[h10sign]}`;

    if (h10planets.length > 0) {
        careerText += isEasy ? '<br><br>' : '<br><br><strong>Planeten im 10.:</strong>';
        h10planets.forEach(p => {
            const pCareer = {
                'Sun': ' Regierung, Führung, autoritative Positionen. Eine Karriere mit sozialer Aufmerksamkeit.',
                'Moon': ' Öffentlichkeitsnahe Karriere. Pflege, Gastgewerbe, Gastronomie, emotionale Bereiche.',
                'Mars': ' Technologie, Ingenieurwesen, Militär, Chirurgie, Sport. Erfolg in Wettbewerbsbereichen.',
                'Mercury': ' Geschäft, Kommunikation, IT, Bildung. Erfolg durch intellektuelle Fähigkeiten.',
                'Jupiter': ' Bildung, Recht, Religion, Beratung. Eine respektierte Karriere. Beste Platzierung.',
                'Venus': ' Kunst, Unterhaltung, Mode, Schönheit, Diplomatie. Erfolg in kreativen Bereichen.',
                'Saturn': ' Langsamer aber sicherer Erfolg. Systematische Organisationen, Architektur, öffentlicher Dienst.'
            };
            careerText += isEasy ? `<br>${pCareer[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pCareer[p.id] || ''}`;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 Meine Karriere' : '💼 Karriere & Gesellschaftliche Erfolge — 10. Haus: ' + SIGNS[h10sign] + ' ' + SIGN_SYMBOLS[h10sign]}</div>
        <div class="interp-text">${careerText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 6. 🏥 health (6 house + Lagna 분석)
    // ═══════════════════════════════════
    const h6sign = (lagnaSign + 5) % 12;
    const h6planets = planetsInHouse(6);

    const healthByLagna = [
        'Achte auf Kopf, Gehirn und Gesichtsbeschwerden. Anfällig für Kopfschmerzen, Fieber und Entzündungen.',
        'Achte auf Nacken, Schilddrüse und Kieferprobleme. Neigung zum Überessen und Diabetes.',
        'Achte auf Lungen, Arme, Schultern und Nervensystem. Angstzustände und Schlafprobleme möglich.',
        'Achte auf Magen, Brust und Brustbereich. Verdauungsstörungen und Wassereinlagerungen.',
        'Achte auf Herz, Rücken und Wirbelsäule. Kardiovaskuläres Management ist wichtig.',
        'Achte auf Verdauungssystem, Darm und Haut. Verdauungsstörungen und Allergien.',
        'Achte auf Nieren, unteren Rücken und Haut. Ausreichende Flüssigkeitszufuhr wichtig.',
        'Achte auf Reproduktions- und Ausscheidungssysteme. Chronische Erkrankungen möglich.',
        'Achte auf Leber, Oberschenkel und Hüften. Neigung zu Übergewicht.',
        'Achte auf Knochen, Gelenke, Knie und Haut. Rheuma und Arthritis.',
        'Achte auf Knöchel, Waden und Kreislaufsystem. Blutdruckmanagement.',
        'Achte auf Füße, Lymphsystem und Immunität. Unerklärliche Beschwerden möglich.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏥 Meine Gesundheit' : '🏥 Gesundheit — Verwundbare Bereiche'}</div>
        <div class="interp-text">${healthByLagna[lagnaSign]}${h6planets.length > 0 ? isEasy ? '<br><br>Besondere Aufmerksamkeit auf die Gesundheit nötig.' : '<br><br>6. Haus: ' + h6planets.map(p => p.name).join(', ') + ' erfordert besondere Gesundheitsaufmerksamkeit.' : ''}</div>
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
                    'Sun': 'Eine Periode der Selbstfindung und Autorität. Eine Zeit, um Führung auszuüben und soziale Anerkennung zu erhalten. Achte auf Herz- und Augengesundheit.',
                    'Moon': 'Eine Periode der Emotionen und des inneren Lebens. Zuhause und Beziehung zur Mutter werden wichtig. Emotionale Schwankungen sind groß aber die Intuition stärkt sich.',
                    'Mars': 'Eine Periode der Aktion und Energie. Eine großartige Zeit, um mutig neue Unternehmungen zu starten. Vorsicht vor Streitigkeiten und Unfällen.',
                    'Rahu': 'Eine Periode des schnellen Wandels und der Innovation. Unerwartete Möglichkeiten und Herausforderungen kommen. Auslandsbezogene Aktivitäten werden aktiv. Ein 18 Jahre langer Zyklus.',
                    'Jupiter': 'Eine Periode des Glücks und Wachstums! Bildung, Ehe, Geburt, Beförderungen werden wahrscheinlicher. Spirituelles Wachstum und Weisheit vertiefen sich.',
                    'Saturn': 'Eine Periode der Geduld und Prüfungen. Wachstum ist langsam aber sicher. Achte auf Gesundheit, besonders Knochen und Gelenke. Ein 19 Jahre langer Zyklus.',
                    'Mercury': 'Eine Periode intellektueller Aktivität und Geschäft. Günstig für Lernen, Kommunikation und Geschäftsvorhaben. Beziehungen zu Geschwistern und Freunden werden aktiv.',
                    'Ketu': 'Eine Periode des spirituellen Erwachens und der Ablösung. Plötzliche Veränderungen möglich, aber diese führen zu spirituellem Wachstum. Intuition wird sehr stark.',
                    'Venus': 'Eine Periode der Liebe und des Überflusses! Romantik, Ehe und künstlerische Aktivitäten werden aktiv. Ästhetischer Sinn entwickelt sich. Der längste Zyklus mit 20 Jahren.'
                };
                html += `<div class="interp-card">
                    <div class="interp-title">${isEasy ? '⏳ Aktuelle Periode: ' + DASHA_KO[currentDasha] : '⏳ Aktuelles Dasha: ' + DASHA_KO[currentDasha] + ' Dasha'}</div>
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
            yogaText += isEasy ? '<strong>🐘 Segen von Weisheit & Ruhm</strong>' : '<strong>🐘 Gajakesari Yoga</strong> — Mond-Jupiter Kendra-Beziehung! Kombination von Weisheit, Ruhm und Überfluss. In der Gesellschaft respektiert mit herausragendem Intellekt. Gutes Bildungs- und Kinderglück.<br><br>';
        }
    }

    // Budha-Aditya Yoga
    const sun = positions.find(p => p.id === 'Sun');
    const mercury = positions.find(p => p.id === 'Mercury');
    if (sun && mercury && sun.sign === mercury.sign) {
        yogaText += isEasy ? '<strong>📚 Segen herausragender Intelligenz</strong>' : '<strong>📚 Budha-Aditya Yoga</strong> — Sonne-Merkur im selben Zeichen! Herausragender Intellekt und Kommunikation. Erfolg in Bildung, Schreiben, Geschäft. Autoritärer intellektueller Führer.<br><br>';
    }

    // Chandra-Mangala Yoga
    if (moonPos && mars && moonPos.sign === mars.sign) {
        yogaText += isEasy ? '<strong>🔥 Segen von starkem Willen & Wohlstand</strong>' : '<strong>🔥 Chandra-Mangala Yoga</strong> — Mond-Mars im selben Zeichen! Starker Wille und Wohlstandsanhäufung. Erfolg im Geschäft mit mutiger Entscheidungsfindung.<br><br>';
    }

    // Kuja Dosha (Manglik)
    if (mars) {
        const marsH = houseOf(mars.sign);
        if ([1,2,4,7,8,12].includes(marsH)) {
            yogaText += isEasy ? `<strong>⚠️ Ehe-Warnung</strong>` : `<strong>⚠️ Kuja Dosha (Manglik)</strong> — Mars im ${marsH}. Haus — Herausforderungen im Eheleben möglich. Partnerhoroskop-Vergleich empfohlen. Heirat nach dem 28. Lebensjahr kann günstig sein.<br><br>`;
        }
    }

    if (yogaText) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '🔮 Deine besonderen Talente' : '🔮 Spezielle Yogas (Planetenkombinationen)'}</div>
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
        '1. Haus: Starkes Selbst und Führung. Gesund und vital. Hohes Selbstwertgefühl und unabhängig. Verbindung zu Regierung/Autorität.',
        '2. Haus: Schätzt Familienehre. Einkommen durch Autorität. Erbe vom Vater. Augengesundheit beachten.',
        '3. Haus: Mutig und entschlossen. Anführer unter Geschwistern. Autorität im Schreiben/Kommunikation.',
        '4. Haus: Spannung in Elternbeziehungen. Besitz von Immobilien/Fahrzeugen. Innere Unruhe.',
        '5. Haus: Herausragendes kreatives Talent. Gute Beziehung zu Kindern. Investment-Fähigkeiten.',
        '6. Haus: Kraft, Feinde zu besiegen. Gesundheitsmanagement-Fähigkeiten. Sieg in Rechtsstreitigkeiten.',
        '7. Haus: Partner mit hohem sozialen Status. Führungsrolle in Partnerschaften.',
        '8. Haus: Langlebigkeit beachten. Vorteile aus Erbschaft/Versicherung. Geheime Macht.',
        '9. Haus: Vater ist eine respektierte Figur. Erfolg in Recht/Religion/Hochschulbildung. Viele Auslandsreisen.',
        '10. Haus: Die beste Platzierung! Sozialer Erfolg und Ruhm. Führer im Regierungs-/öffentlichen Sektor.',
        '11. Haus: Großes Einkommen und soziales Netzwerk. Hochrangige Freunde. Hervorragende Zielerreichung.',
        '12. Haus: Erfolg im Ausland. Spirituelle Bestrebungen. Distanz zum Vater. Genießt Einsamkeit.'
    ],
    Moon: [
        '1. Haus: Attraktives Aussehen. Emotionale und wandelbare Persönlichkeit. Beliebt beim Publikum.',
        '2. Haus: Komfortables Familienumfeld. Gute Ernährung. Sanfte Sprache. Starke Familienbande.',
        '3. Haus: Kreative Kommunikationsfähigkeiten. Liebt Reisen. Emotionale Bindung zu Geschwistern.',
        '4. Haus: Die beste Platzierung! Glückliches Zuhause. Starke Bindung zur Mutter. Gutes Immobilienglück.',
        '5. Haus: Tiefe Liebe zu Kindern. Romantische Persönlichkeit. Intuitive Investitionsfähigkeit.',
        '6. Haus: Gesundheitsprobleme durch emotionalen Stress. Sieg über Feinde. Servicegeist.',
        '7. Haus: Attraktiver Partner. Emotional tiefe Ehe. Tendenz zur Partnerabhängigkeit.',
        '8. Haus: Emotionale Turbulenzen und Transformation. Sehr starke Intuition. Mögliche Erbschaft.',
        '9. Haus: Spirituell und philosophisch. Mutter ist religiös. Reise/Wohnsitz im Ausland.',
        '10. Haus: Öffentliche Beliebtheit und sozialer Erfolg. Gastgewerbe/Pflege-Bereiche.',
        '11. Haus: Viele Freunde und gesellig. Stetiges Einkommen. Wunscherfüllung.',
        '12. Haus: Möglicher Wohnsitz im Ausland. Schlafprobleme. Spirituelle Neigungen.'
    ],
    Mars: [
        '1. Haus: Starker Körperbau und Willenskraft. Mögliche Narben/Verletzungen. Impulsiv aber mutig.',
        '2. Haus: Harte Sprache. Ernährungsprobleme. Familienstreitigkeiten. Aber Fähigkeit, Wohlstand anzuhäufen.',
        '3. Haus: Die beste Platzierung! Mut und Abenteuerlust. Starke Geschwisterbindung. Sporttalent.',
        '4. Haus: Häusliche Konflikte. Immobilienstreitigkeiten. Spannung mit der Mutter.',
        '5. Haus: Leidenschaftliche Romantik. Aktive Kinder. Spekulative Investments. Sporttalent.',
        '6. Haus: Kraft, Feinde zu zermalmen! Körperliche Stärke gegen Krankheit. Geeignet für Militär/Polizei/Medizin.',
        '7. Haus: Kuja Dosha — Leidenschaft und Konflikt in der Ehe. Starker Partner. Ehe nach 28 empfohlen.',
        '8. Haus: Vorsicht vor Unfällen/Operationen. Aber Kraft, Krisen zu überleben. Versicherungs-/Erbschaftsvorteile.',
        '9. Haus: Konflikt mit dem Vater. Starke Meinungen über Religion. Rechtsstreitigkeiten.',
        '10. Haus: Herausragende Karriereleistung! Militär/Ingenieurwesen/Chirurgie/Polizei.',
        '11. Haus: Großes Einkommen! Starke Zielerreichung. Hilfe von Geschwistern.',
        '12. Haus: Hohe Ausgaben im Ausland. Schlafprobleme. Starke sexuelle Energie.'
    ],
    Jupiter: [
        '1. Haus: Gesegnete Platzierung! Weise und großzügige Persönlichkeit. Große Statur und gesund.',
        '2. Haus: Reichlicher Wohlstand! Große Familie. Einkommen durch Bildung. Beredte Sprache.',
        '3. Haus: Erfolgreiche Geschwister. Schreiben zu Religion/Bildung. Kurze Pilgerfahrten.',
        '4. Haus: Eine der besten Platzierungen! Geräumiges Zuhause. Akademische Leistung. Weise Mutter.',
        '5. Haus: Herausragender Intellekt und Kreativität! Gutes Kinderglück. Weise Investments.',
        '6. Haus: Besiegt leicht Feinde. Juristische Siege. Servicegeist. Aber Gewicht beachten.',
        '7. Haus: Ein weiser und moralischer Partner! Glückliche Ehe. Erfolgreiche Geschäftspartnerschaften.',
        '8. Haus: Langlebigkeit! Erbschaft. Tiefe spirituelle Kenntnisse. Interesse an Astrologie/Mystik.',
        '9. Haus: Die mächtigste Platzierung! Großes Glück. Segen des Lehrers. Auslandsreisen.',
        '10. Haus: Sozialer Ruhm und Respekt! Führer in Bildung/Recht/Religion. Beste Karrierefortune.',
        '11. Haus: Großes Einkommen und Gewinne! Wunscherfüllung. Einflussreiche Verbindungen.',
        '12. Haus: Glück im Ausland. Spirituelle Befreiung. Himmlische Freuden. Spenden und Wohltätigkeit.'
    ],
    Venus: [
        '1. Haus: Sehr attraktives Aussehen! Künstlerisches Talent. Genießt Luxus. Gesellig und beliebt.',
        '2. Haus: Reichlicher Wohlstand! Feines Essen und Luxusgüter. Süße Stimme. Familienharmonie.',
        '3. Haus: Künstlerische Kommunikation. Schönes Schreiben. Gute Beziehung zu Schwestern.',
        '4. Haus: Schönes Zuhause und Fahrzeuge! Luxuriöser Lebensstil. Mutter ist schön und künstlerisch.',
        '5. Haus: Romantische Liebe! Kunst-/Unterhaltungstalent. Schöne Kinder. Freude an der Schöpfung.',
        '6. Haus: Schwierigkeiten in der Romantik. Gesundheitsbezogene Schönheit. Sieg über Feinde durch Charme.',
        '7. Haus: Die beste Platzierung! Sehr attraktiver Partner. Glückliche Ehe.',
        '8. Haus: Tiefe und transformative Liebe. Wohlstand des Partners. Geheime Romantik.',
        '9. Haus: Romantik im Ausland. Künstlerische Reisen. Schöne Beziehung zu Lehrern.',
        '10. Haus: Erfolg in Kunst/Mode/Unterhaltung! Sozial attraktiv. Hilfe von Frauen.',
        '11. Haus: Einkommen durch soziale Netzwerke! Hilfe von Freundinnen. Wunscherfüllung.',
        '12. Haus: Liebe im Ausland. Geheime Romantik. Schlafzimmerfreuden. Künstlerische Inspiration.'
    ],
    Saturn: [
        '1. Haus: Schlanke Statur. Ernst und verantwortungsvoll. Kindheitsschwierigkeiten. Glänzt mit dem Alter.',
        '2. Haus: Langsame Wohlstandsanhäufung. Sparsamer Lebensstil. Schwere Sprache. Distanz zur Familie.',
        '3. Haus: Ausgezeichnete Platzierung! Starker Wille und Geduld. Verantwortung für Geschwister.',
        '4. Haus: Schwierigkeiten mit der Mutter. Strenges häusliches Umfeld. Alte Häuser/Gebäude.',
        '5. Haus: Kinder kommen spät oder wenige. Vorsichtige Investments. Akademische Kämpfe und Überwindung.',
        '6. Haus: Besiegt Feinde durch Geduld! Chronische aber handhabbare Zustände. Erfolg in Servicebereichen.',
        '7. Haus: Späte Ehe. Älterer Partner. Anfangs schwierig aber stabile Ehe.',
        '8. Haus: Langlebigkeit! Vorsicht bei chronischen Zuständen. Verzögerungen bei Erbschaftsangelegenheiten.',
        '9. Haus: Schwierige Beziehung zum Vater. Ernster Zugang zur Religion. Späte Auslandsreisen.',
        '10. Haus: Große Platzierung! Langsamer aber sicherer sozialer Erfolg. Führer in Großunternehmen/Regierung.',
        '11. Haus: Stetiges Einkommenswachstum! Ältere Freunde. Ziele durch Geduld erreichen.',
        '12. Haus: Schwierigkeiten und Wachstum im Ausland. Schlafprobleme. Spirituelle Praxis.'
    ]
};

function renderPlanetHouse(positions, lagnaSign) {
    function houseOf(signIdx) { return ((signIdx - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = ['','Selbst','Geld·Familie','Kommunikation','Zuhause','Kinder·Romantik','Gesundheit','Partner','Transformation','Glück·Ausland','Karriere','Einkommen','Spiritualität'];
    let html = '';

    positions.forEach(p => {
        if (!PLANET_IN_HOUSE[p.id]) return;
        const house = houseOf(p.sign);
        const desc = PLANET_IN_HOUSE[p.id][house - 1];
        if (!desc) return;

        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? (houseArea[house]||'') : p.symbol + ' ' + p.name + ' → ' + house + '. Haus (' + SIGNS[p.sign] + ')'}</div>
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
    let text = isEasy ? '<strong>Grundbildung:</strong> ' : `<strong>4. Haus (Grundbildung):</strong> ${SIGNS[h4sign]}. `;
    const eduSign4 = ['Aktives Lernen, Sport-/Militärbildung', 'Kunst/Musik/Kulinarische Bildung', 'Sprachen/Literatur/Kommunikation', 'Schwerpunkt Heimbildung, Geschichte', 'Drama/Führung/Politikwissenschaft', 'Wissenschaft/Medizin/Analytik', 'Recht/Diplomatie/Design', 'Psychologie/Forschung/Ermittlung', 'Philosophie/Theologie/Internationale Studien', 'Wirtschaft/Verwaltung/Architektur', 'IT/Wissenschaft/Luftfahrt', 'Kunst/Film/Musik/Spiritualität'];
    text += eduSign4[h4sign] + ' geeignet. ';
    if (h4.length > 0 && !isEasy) text += 'Im 4. Haus, ' + h4.map(p => p.name).join(', ') + ' beeinflusst die Bildung. ';

    const jupiter = positions.find(p => p.id === 'Jupiter');
    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if ([1,4,5,9].includes(jH)) text += isEasy ? '<br><br>🎓 <strong>Hohe akademische Leistung erwartet!</strong> Postgraduale/Promotion/Auslandsstudium möglich.' : '<br><br>🎓 <strong>Jupiter im ' + jH + '. Haus — hohe akademische Leistung erwartet!</strong> Postgraduale/Promotion/Auslandsstudium möglich.';
    }

    text += isEasy ? '<br><br><strong>Höhere Bildung:</strong> ' : `<br><br><strong>5. Haus (Höhere Bildung):</strong> ${SIGNS[h5sign]}. `;
    if (h5.length > 0) {
        h5.forEach(p => {
            const h5p = { Sun: 'Hervorragend in Führung/Politikwissenschaft', Moon: 'Kunst/Psychologie-Talent', Mars: 'Ingenieur-/Technik-/Sporttalent', Mercury: 'Mathe/Sprachen/Geschäftsgenie', Jupiter: 'Beste Platzierung! Gelehrter/Professor/Forscher', Venus: 'Kunst/Design/Musiktalent', Saturn: 'Späte Akademik aber tiefe Forschung' };
            text += isEasy ? `${h5p[p.id] || 'beeinflusst Akademik'}. ` : `${p.name}: ${h5p[p.id] || 'beeinflusst Akademik'}. `;
        });
    } else {
        text += isEasy ? 'Keine besonders starke akademische Energie, aber stetiger Einsatz bringt gute Ergebnisse.' : 'Keine Planeten im 5. — Position des 5. Herrschers ist der Schlüssel.';
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

    let text = isEasy ? '' : `<strong>5. Haus (Kinder):</strong> ${SIGNS[h5sign]}.<br><br>`;

    const childSign = [
        'Aktive und unabhängige Kinder. Talent in Sport/Führung. Früh selbstständig.',
        'Ruhige und künstlerische Kinder. Talent in Musik/Kunst. Materiell gut gestellt.',
        'Schlaue und redegewandte Kinder. Ausgezeichnete Akademiker. Möglichkeit von Zwillingen.',
        'Sensible und sanfte Kinder. Besondere Bindung zur Mutter. Häusliche Kinder.',
        'Charismatische und kreative Kinder. Führungsqualitäten. Talent in Unterhaltung/Kunst.',
        'Akribische und analytische Kinder. Talent in Medizin/Wissenschaft.',
        'Charmante und gesellige Kinder. Talent in Kunst/Diplomatie. Guter Gleichgewichtssinn.',
        'Intensive und intuitive Kinder. Forschungs-/Entdeckergeist. Können Geheimnisse haben.',
        'Freigeistige und abenteuerlustige Kinder. Mögliches Studium/Reise ins Ausland.',
        'Ernste und ehrgeizige Kinder. Reifen früh. Leistungsorientiert.',
        'Einzigartige und innovative Kinder. Talent in Technologie/Wissenschaft.',
        'Künstlerische und spirituelle Kinder. Reiche Vorstellungskraft. Talent in Musik/Malerei.'
    ];
    text += childSign[h5sign];

    if (h5.length > 0) {
        text += isEasy ? '<br><br>' : '<br><br><strong>Planeten im 5.:</strong><br>';
        h5.forEach(p => {
            const ch = { Sun: 'Verbindung zu Söhnen. Kinder haben Führung.', Moon: 'Verbindung zu Töchtern. Starke emotionale Bindung.', Mars: 'Aktive Kinder. Können schwer zu handhaben sein.', Mercury: 'Sehr schlaue Kinder! Ausgezeichnete Akademik.', Jupiter: 'Gesegnete Kinder! Glück durch Kinder.', Venus: 'Schöne künstlerische Kinder. Verbindung zu Töchtern.', Saturn: 'Kinder können spät kommen. Aber verantwortungsvolle Kinder.' };
            text += `${ch[p.id] || ''}<br>`;
        });
    }

    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if (jH === 5) text += isEasy ? '<br>🌟 <strong>Bestes Kinderglück! Kinder bringen großes Glück.</strong>' : '<br>🌟 <strong>Jupiter im 5.! Bestes Kinderglück.</strong>';
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
    let text = isEasy ? '<strong>Auslandsreisen·Glück:</strong><br>' : '<strong>9. Haus (Auslandsreisen·Glück·Höhere Bildung):</strong><br>';
    if (h9.length === 0) {
        text += 'Auslandsreisen existieren, aber keine starke Verbindung.';
    } else {
        h9.forEach(p => {
            const f9 = { Sun: 'Vater hat Auslandsverbindungen. Regierungs-Auslandsreisen.', Moon: 'Genießt Auslandsreisen emotional. Beliebtheit im Ausland.', Mars: 'Abenteuer/Herausforderung im Ausland. Militär-/Technik-bezogene Auslandsaktivitäten.', Mercury: 'Auslandsstudium/Geschäftserfolg! Mehrsprachige Fähigkeit.', Jupiter: 'Großes Glück im Ausland! Studium/Immigrationserfolg. Treffen ausländischer Lehrer.', Venus: 'Romantik im Ausland. Kunst-/Modebezogene Auslandsaktivitäten.', Saturn: 'Erfolg nach Schwierigkeiten im Ausland. Langfristiger Auslandsaufenthalt.', Rahu: 'Starker Auswanderungsindikator! Tief in fremde Kultur eingetaucht.', Ketu: 'Auslandsverbindung aus früheren Leben. Spirituelle Pilgerfahrt.' };
            text += isEasy ? `${f9[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f9[p.id] || ''}<br>`;
        });
    }

    text += isEasy ? '<br><strong>Auslandsniederlassung:</strong><br>' : '<br><strong>12. Haus (Auslandsniederlassung·Immigration):</strong><br>';
    if (h12.length === 0) {
        text += 'Inländischer Wohnsitz ist natürlicher.';
    } else {
        h12.forEach(p => {
            const f12 = { Sun: 'Identitätsfindung im Ausland. Regierungs-Auslandsposten.', Moon: 'Hohe Möglichkeit im Ausland zu leben! Emotionale Stabilität in Übersee.', Mars: 'Energieverbrauch im Ausland. Auslandsinvestition/Immobilien.', Mercury: 'Auslandsgeschäft/IT. Auslandsbildung.', Jupiter: 'Spirituelles Wachstum im Ausland. Wohltätigkeit. Auslandsuniversität.', Venus: 'Luxus und Vergnügen im Ausland. Ausländische Kunstaktivitäten.', Saturn: 'Harte Arbeit im Ausland. Aber langfristige Niederlassung.', Rahu: 'Starker Immigrationsindikator! Anpassung an westliche Kultur.', Ketu: 'Spirituelle Praxis im Ausland. Einsames Überseeleben.' };
            text += isEasy ? `${f12[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f12[p.id] || ''}<br>`;
        });
    }

    if (rahu) {
        const rH = houseOf(rahu.sign);
        if ([9, 12, 7].includes(rH)) text += isEasy ? '<br>✈️ <strong>Sehr hohe Möglichkeit einer Auswanderung!</strong>' : '<br>✈️ <strong>Rahu im ' + rH + '. — sehr hohe Chance auf Auslandswohnsitz!</strong>';
    }

    document.getElementById('foreignWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 행성 품위
// ═══════════════════════════════════════════════════
function renderDignity(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = {1:'Selbst',2:'Geld/Familie',3:'Kommunikation/Geschwister',4:'Zuhause/Mutter',5:'Kinder/Romantik',6:'Gesundheit/Feinde',7:'Partner',8:'Transformation/Erbschaft',9:'Glück/Ausland',10:'Karriere/Ruhm',11:'Einkommen/Wünsche',12:'Ausland/Spiritualität'};
    const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };
    const OWN = { Sun: [4], Moon: [3], Mars: [0,7], Mercury: [2,5], Jupiter: [8,11], Venus: [1,6], Saturn: [9,10] };

    // 쉬운 설명
    const planetRole = {
        Sun: 'Selbst/Vertrauen/Vater/Autorität',
        Moon: 'Emotionen/Geist/Mutter/Alltag',
        Mars: 'Energie/Mut/Aktion/Wettbewerb',
        Mercury: 'Intelligenz/Kommunikation/Lernen/Geschäft',
        Jupiter: 'Glück/Weisheit/Wohlstand/Ehe',
        Venus: 'Liebe/Charme/Kunst/Vergnügen',
        Saturn: 'Geduld/Prüfungen/Verantwortung/Einsatz'
    };

    let html = `<div class="interp-card" style="margin-bottom:16px;">
        <div class="interp-text">
            ${isEasy ?
            '<strong>💡 Einfache Anleitung:</strong> Zeigt, wie stark jede Energie in deinem Leben wirkt.<br><br>🟢 <strong>Sehr Stark</strong> = Höchste Kondition! Großes Glück und Ergebnisse.<br>🟡 <strong>Stark</strong> = Stabil, gute Ergebnisse.<br>⚪ <strong>Durchschnitt</strong> = Weder stark noch schwach.<br>🔴 <strong>Schwach</strong> = Herausforderungen aber überwindbar mit Einsatz.' :
            '<strong>💡 Anleitung:</strong> Planetenwürde zeigt, wie gut ein Planet seine Kraft ausübt.<br><br>🟢 <strong>Erhöht</strong> = Höchste Kondition! Großes Glück in diesem Lebensbereich.<br>🟡 <strong>Eigenes Zeichen</strong> = Wie zu Hause. Stabile, gute Ergebnisse.<br>⚪ <strong>Neutral</strong> = Durchschnitt. Weder stark noch schwach.<br>🔴 <strong>Erniedrigt</strong> = Geschwächt. Herausforderungen aber überwindbar mit Einsatz.'}
        </div>
    </div>`;

    positions.forEach(p => {
        if (!EXALT.hasOwnProperty(p.id)) return;
        let dignity, emoji, meaning, color, simpleDesc;
        const role = planetRole[p.id];

        const house = houseOf(p.sign);
        const area = houseArea[house] || '';

        if (p.sign === EXALT[p.id]) {
            dignity = 'Erhöht';
            emoji = '🟢';
            color = '#5cb85c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — größter Segen! Angeborene Talente strahlen und gute Ergebnisse kommen natürlich.`
                : `<strong>${p.name} auf maximaler Kraft!</strong> Die Energie von "${role}" maximiert in <strong>${house}(${area})</strong>. Talente strahlen.`;
        } else if (p.sign === DEBI[p.id]) {
            dignity = 'Geschwächt';
            emoji = '🔴';
            color = '#d9534f';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — kann Herausforderungen haben. Aber bewusste Anstrengung führt zu großem Wachstum. Siehe Heilmittel unten.`
                : `<strong>${p.name} geschwächt.</strong> Die Energie von "${role}" geschwächt in <strong>${house}(${area})</strong>. Herausforderungen aber Wachstum durch Anstrengung.`;
        } else if (OWN[p.id] && OWN[p.id].includes(p.sign)) {
            dignity = 'Eigenes Zeichen';
            emoji = '🟡';
            color = '#c9a84c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — arbeitet stabil zu deinen Gunsten. Gute Ergebnisse kommen natürlich.`
                : `<strong>${p.name} zu Hause!</strong> Die Energie von "${role}" arbeitet stabil in <strong>${house}(${area})</strong>. Gute Ergebnisse natürlich.`;
        } else {
            dignity = 'Neutral';
            emoji = '⚪';
            color = '#999';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — durchschnittlicher Einfluss. Weder besonders stark noch schwach.`
                : `Die Energie von "${role}" von ${p.name} übt durchschnittlichen Einfluss in <strong>${house}(${area})</strong> aus.`;
        }

        html += `<div class="interp-card">
            <div class="interp-title">${emoji} ${isEasy ? area + ' — ' : p.symbol + ' ' + p.name + ' — ' + SIGNS[p.sign] + ' ' + SIGN_SYMBOLS[p.sign] + ' → ' + house + ' (' + area + ') — '}<span style="color:${color}">${isEasy ? (dignity.includes('Erhöht') ? 'Sehr Stark!' : dignity.includes('Geschwächt') ? 'Schwach' : dignity.includes('Eigenes Zeichen') ? 'Stark' : 'Durchschnitt') : dignity}</span></div>
            <div class="interp-text">
                ${isEasy ? '' : '<span style="color:#666;font-size:12px;">Rolle: ' + role + ' │ Position: ' + house + ' = ' + area + '</span><br><br>'}
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
        { color: 'Rot, Orange', number: '1, 9', day: 'Dienstag', gem: 'Rote Koralle', dir: 'Osten' },
        { color: 'Weiß, Rosa', number: '2, 6', day: 'Freitag', gem: 'Diamant', dir: 'Südosten' },
        { color: 'Grün', number: '3, 5', day: 'Mittwoch', gem: 'Smaragd', dir: 'Norden' },
        { color: 'Weiß, Silber', number: '2, 7', day: 'Montag', gem: 'Perle', dir: 'Nordwesten' },
        { color: 'Gold, Orange', number: '1, 4', day: 'Sonntag', gem: 'Rubin', dir: 'Osten' },
        { color: 'Grün, Hellgrün', number: '5, 3', day: 'Mittwoch', gem: 'Smaragd', dir: 'Süden' },
        { color: 'Weiß, Pastell', number: '6, 2', day: 'Freitag', gem: 'Diamant', dir: 'Westen' },
        { color: 'Rot, Karmesin', number: '9, 1', day: 'Dienstag', gem: 'Rote Koralle', dir: 'Süden' },
        { color: 'Gelb, Gold', number: '3, 9', day: 'Donnerstag', gem: 'Gelber Saphir', dir: 'Nordosten' },
        { color: 'Dunkelblau, Schwarz', number: '8, 4', day: 'Samstag', gem: 'Blauer Saphir', dir: 'Westen' },
        { color: 'Dunkelblau, Lila', number: '4, 8', day: 'Samstag', gem: 'Blauer Saphir', dir: 'Westen' },
        { color: 'Gelb, Gold', number: '3, 7', day: 'Donnerstag', gem: 'Gelber Saphir', dir: 'Nordosten' }
    ];

    const d = luckyData[lagnaSign];
    const html = `<div class="interp-card">
        <div class="interp-text">
            <strong>🎨 Glücksfarbe:</strong> ${d.color}<br>
            <strong>🔢 Glückszahl:</strong> ${d.number}<br>
            <strong>📅 Glückstag:</strong> ${d.day}<br>
            <strong>💎 Glücksstein:</strong> ${d.gem}<br>
            <strong>🧭 Glücksrichtung:</strong> ${d.dir}<br>
            <strong>🪐 Lagna-Herrscherplanet:</strong> ${['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'][lagnaSign]}
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
        Sun: { gem: 'Rubin', mantra: 'Om Suryaya Namaha', color: 'Orange/Rot am Sonntag', food: 'Weizen, Safran, Sonnenblumenkerne', charity: 'Sonntag: Weizen/Kupfer spenden' },
        Moon: { gem: 'Perle', mantra: 'Om Chandraya Namaha', color: 'Weiß/Silber am Montag', food: 'Milch, Reis, Kokosnuss', charity: 'Montag: Reis/Milch spenden' },
        Mars: { gem: 'Rote Koralle', mantra: 'Om Mangalaya Namaha', color: 'Rot am Dienstag', food: 'Linsen, rote Früchte', charity: 'Dienstag: rote Linsen spenden' },
        Mercury: { gem: 'Smaragd', mantra: 'Om Budhaya Namaha', color: 'Grün am Mittwoch', food: 'Grüne Bohnen, grünes Gemüse', charity: 'Mittwoch: grünes Gemüse spenden' },
        Jupiter: { gem: 'Gelber Saphir', mantra: 'Om Gurave Namaha', color: 'Gelb am Donnerstag', food: 'Kichererbsen, Bananen, Kurkuma', charity: 'Donnerstag: gelbe Lebensmittel/Bücher spenden' },
        Venus: { gem: 'Diamant', mantra: 'Om Shukraya Namaha', color: 'Weiß/Pastell am Freitag', food: 'Milch, Sahne, Früchte', charity: 'Freitag: weiße Kleidung/Reis spenden' },
        Saturn: { gem: 'Blauer Saphir', mantra: 'Om Shanaishcharaya Namaha', color: 'Dunkelblau/Schwarz am Samstag', food: 'Schwarze Bohnen, Sesam', charity: 'Samstag: schwarze Bohnen/Öl spenden' }
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
                <div class="interp-title">${p.symbol} ${p.name} Stärkung ${isDebi ? '(Erniedrigt — Besonders wichtig!)' : '(Schwache Position)'}</div>
                <div class="interp-text">
                    <strong>💎 Edelstein:</strong> ${r.gem} (Ringfinger empfohlen)<br>
                    <strong>🙏 Mantra:</strong> "${r.mantra}" (108 Mal täglich)<br>
                    <strong>🎨 Farbe:</strong> ${r.color}<br>
                    <strong>🍽️ Nahrung:</strong> ${r.food}<br>
                    <strong>🤝 Wohltätigkeit:</strong> ${r.charity}
                </div>
            </div>`;
        }
    });

    if (!html) {
        html = '<div class="interp-card"><div class="interp-text">Alle Planeten in guten Positionen! Keine besonderen Heilmittel nötig. Trage den Edelstein deines Lagna-Herrschers für Glück.</div></div>';
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
    const SIGN_RULERS = ['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
    const RULER_NAMES = {Sun:'Sun',Moon:'Moon',Mars:'Mars',Mercury:'Mercury',Jupiter:'Jupiter',Venus:'Venus',Saturn:'Saturn',Rahu:'Rahu',Ketu:'Ketu'};

    const isEasy = window.vedicMode === 'easy';
    let html = '';

    if (division === 10) {
        // D10 해석: career/커리어
        const d10_1lord = SIGN_RULERS[dLagnaSign];
        const d10_10sign = (dLagnaSign + 9) % 12;
        const d10_10lord = SIGN_RULERS[d10_10sign];
        const d10_10planets = dPositions.filter(p => p.dSign === d10_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💼 Detaillierte Karriereanalyse' : '💼 D10 Karriereanalyse') + '</div><div class="interp-text">';
        if (isEasy) {
            html += '<strong>Deine Karrieretendenz:</strong><br>';
        } else {
            html += '<strong>D10 Lagna:</strong> ' + SIGNS[dLagnaSign] + ' (Herrscher: ' + (RULER_NAMES[d10_1lord]||d10_1lord) + ')<br>';
            html += '<strong>D10 10. Haus (Karriere):</strong> ' + SIGNS[d10_10sign] + ' (Herrscher: ' + (RULER_NAMES[d10_10lord]||d10_10lord) + ')<br>';
        }
        if (d10_10planets.length > 0) {
            if (!isEasy) html += '<strong>Planeten im 10.:</strong> ' + d10_10planets.map(p => p.name).join(', ') + '<br>';
        }

        // Career 성향 by D10 Lagna
        const careerBySign = [
            'Führung, Militär, Sport, Unternehmer',  // Aries
            'Finanzen, Kunst, Immobilien, Lebensmittel',     // Taurus
            'Kommunikation, Medien, Bildung, IT',  // Gemini
            'Pflege, Immobilien, Hotels, Beratung',    // Cancer
            'Politik, Unterhaltung, Management, Verwaltung',        // Leo
            'Medizin, Buchhaltung, Analyse, Forschung',          // Virgo
            'Recht, Diplomatie, Design, Beratung',      // Libra
            'Ermittlung, Forschung, Medizin, Versicherung',          // Scorpio
            'Bildung, Religion, Außenhandel, Verlagswesen',      // Sagittarius
            'Verwaltung, Bau, Bergbau, Öffentlicher Dienst',        // Capricorn
            'IT, Innovation, NGO, Luftfahrt',           // Aquarius
            'Kunst, Krankenhaus, Ausland, Spiritualität'           // Pisces
        ];
        html += '<strong>Geeignetes Feld:</strong> ' + careerBySign[dLagnaSign];
        html += '</div></div>';

    } else if (division === 7) {
        // D7 해석: children
        const d7_5sign = (dLagnaSign + 4) % 12;
        const d7_5lord = SIGN_RULERS[d7_5sign];
        const d7_5planets = dPositions.filter(p => p.dSign === d7_5sign);
        const benefics = d7_5planets.filter(p => p.natural === 'benefic');
        const malefics = d7_5planets.filter(p => p.natural === 'malefic');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👶 Kinderanalyse' : '👶 D7 Kinderanalyse') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D7 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
            html += '<strong>D7 5. Haus (Kinder):</strong> ' + SIGNS[d7_5sign] + ' (Herrscher: ' + (RULER_NAMES[d7_5lord]||d7_5lord) + ')<br>';
        }
        if (d7_5planets.length > 0) {
            if (!isEasy) html += '<strong>5. Haus Planeten:</strong> ' + d7_5planets.map(p => p.name).join(', ') + '<br>';
        }
        if (benefics.length > 0) html += (isEasy ? 'Wohltätige Planeten — mit Kindern gesegnet.' : 'Wohltätige Planeten im 5. Haus — mit Kindern gesegnet.') + '<br>';
        if (malefics.length > 0) html += (isEasy ? 'Herausfordernde Planeten — Schwierigkeiten mit Kindern möglich.' : 'Übeltätige Planeten im 5. Haus — Schwierigkeiten mit Kindern möglich.') + '<br>';
        if (d7_5planets.length === 0) html += isEasy ? 'Keine Planeten in Kinderposition — andere Faktoren müssen analysiert werden.' : '5. Haus leer — Position des 5. Herrschers prüfen.';
        html += '</div></div>';

    } else if (division === 12) {
        // D12 해석: 부모
        const d12_4sign = (dLagnaSign + 3) % 12; // 4 house = Mother
        const d12_9sign = (dLagnaSign + 8) % 12; // 9 house = Father
        const d12_4planets = dPositions.filter(p => p.dSign === d12_4sign);
        const d12_9planets = dPositions.filter(p => p.dSign === d12_9sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨‍👩‍👧 Elternanalyse' : '👨‍👩‍👧 D12 Elternanalyse') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D12 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
        }
        html += '<strong>' + (isEasy ? 'Mother' : 'D12 4. Haus (Mutter): ' + SIGNS[d12_4sign]) + '</strong>';
        if (d12_4planets.length > 0 && !isEasy) html += ' — ' + d12_4planets.map(p => p.name).join(', ');
        html += '<br>';
        html += '<strong>' + (isEasy ? 'Father' : 'D12 9. Haus (Vater): ' + SIGNS[d12_9sign]) + '</strong>';
        if (d12_9planets.length > 0 && !isEasy) html += ' — ' + d12_9planets.map(p => p.name).join(', ');
        html += '<br>';

        const moon4 = d12_4planets.find(p => p.id === 'Moon');
        const sun9 = d12_9planets.find(p => p.id === 'Sun');
        if (moon4) html += (isEasy ? 'Mond in Mutterposition — tiefe Verbindung zur Mutter.' : 'Mond im 4. Haus — tiefe Verbindung zur Mutter.') + '<br>';
        if (sun9) html += (isEasy ? 'Sonne in Vaterposition — tiefe Verbindung zum Vater.' : 'Sonne im 9. Haus — tiefe Verbindung zum Vater.') + '<br>';
        html += '</div></div>';

    } else if (division === 60) {
        // D60 해석: 전생 karma (소챕터 구조)
        const d60_1lord = SIGN_RULERS[dLagnaSign];
        const d60_planets_1 = dPositions.filter(p => p.dSign === dLagnaSign);

        const D60_DEITIES = [
            {name:'Ghora',ko:'Ghora',nature:'malefic',desc:'Zerstörung und Furcht. Dunkles Karma aus früheren Leben'},
            {name:'Rakshasa',ko:'Rakshasa',nature:'malefic',desc:'Dämonische Energie. Starkes Verlangen und Anhaftung'},
            {name:'Deva',ko:'Deva',nature:'benefic',desc:'Göttliches Wesen. Verdienst und Segen aus früheren Leben'},
            {name:'Kubera',ko:'Kubera',nature:'benefic',desc:'Gott des Reichtums. Wohlstandsaufbau-Karma'},
            {name:'Yaksha',ko:'Yaksha',nature:'benefic',desc:'Naturwächter. Harmonie mit der Natur'},
            {name:'Kinnara',ko:'Kinnara',nature:'benefic',desc:'Himmlischer Musiker. Künstlerisches Talent'},
            {name:'Bhrashta',ko:'Bhrashta',nature:'malefic',desc:'Der Gefallene. Karma des Fallens aus der Höhe'},
            {name:'Kulaghna',ko:'Kulaghna',nature:'malefic',desc:'Familienzerstörer. Familienbezogenes Karma'},
            {name:'Garala',ko:'Garala',nature:'malefic',desc:'Gift. Karma toxischer Handlungen'},
            {name:'Vahni',ko:'Vahni',nature:'malefic',desc:'Feuergott. Karma von Zorn und Zerstörung'},
            {name:'Maya',ko:'Maya',nature:'malefic',desc:'Illusion. Karma der Täuschung'},
            {name:'Purishaka',ko:'Purishaka',nature:'malefic',desc:'Knechtschaft. Karma der Einschränkung anderer'},
            {name:'Apampathi',ko:'Apampathi',nature:'benefic',desc:'Herr der Gewässer. Reinigung und Heilung'},
            {name:'Marut',ko:'Marut',nature:'benefic',desc:'Windgott. Freiheit und Veränderung'},
            {name:'Kala',ko:'Kala',nature:'malefic',desc:'Gott der Zeit. Zeit- und Todeskarma'},
            {name:'Sarpa',ko:'Sarpa',nature:'malefic',desc:'Schlange. Bindung und Anhaftung — unfähig loszulassen'},
            {name:'Amrita',ko:'Amrita',nature:'benefic',desc:'Nektar der Unsterblichkeit. Streben nach ewigem Leben'},
            {name:'Indu',ko:'Indu',nature:'benefic',desc:'Mond. Sensibilität und Intuition'},
            {name:'Mridu',ko:'Mridu',nature:'benefic',desc:'Der Sanfte. Sanftmut und Mitgefühl'},
            {name:'Komala',ko:'Komala',nature:'benefic',desc:'Der Zarte. Kunst und Schönheit'},
            {name:'Heramba',ko:'Heramba',nature:'benefic',desc:'Ganesha-Avatar. Hindernisse überwinden'},
            {name:'Brahma',ko:'Brahma',nature:'benefic',desc:'Schöpfergott. Schöpfung und Wissen'},
            {name:'Vishnu',ko:'Vishnu',nature:'benefic',desc:'Bewahrergott. Schutz und Ordnung'},
            {name:'Maheshwara',ko:'Maheshwara',nature:'benefic',desc:'Großer Herr Shiva. Transformation und Befreiung'},
            {name:'Deva2',ko:'Deva2',nature:'benefic',desc:'Heiliger. Spirituelle Praxis'},
            {name:'Bala',ko:'Bala',nature:'benefic',desc:'Stärke. Tapferkeit und Mut'},
            {name:'Vishwakarma',ko:'Vishwakarma',nature:'benefic',desc:'Kosmischer Architekt. Bauen und Erschaffen'},
            {name:'Tamasa',ko:'Tamasa',nature:'malefic',desc:'Dunkelheit. Karma der Unwissenheit'},
            {name:'Kanchana',ko:'Kanchana',nature:'benefic',desc:'Gold. Reinheit und Wert'},
            {name:'Varaha',ko:'Varaha',nature:'benefic',desc:'Vishnu-Eber-Avatar. Erlösung'},
            {name:'Ramasala',ko:'Ramasala',nature:'benefic',desc:'Wohnstätte Ramas. Moral und Pflicht'},
            {name:'Ghrisha',ko:'Ghrisha',nature:'benefic',desc:'Der Strahlende. Weisheit und Erleuchtung'},
            {name:'Indra',ko:'Indra',nature:'benefic',desc:'König der Götter. Führung'},
            {name:'Jala',ko:'Jala',nature:'benefic',desc:'Wasser. Fließen und Anpassung'},
            {name:'Vishwa',ko:'Vishwa',nature:'benefic',desc:'Universum. Universelle Liebe'},
            {name:'Amara',ko:'Amara',nature:'benefic',desc:'Unsterblich. Streben nach Ewigkeit'},
            {name:'Bala2',ko:'Bala2',nature:'malefic',desc:'Junge Kraft. Unreifer Machtgebrauch'},
            {name:'Pitri',ko:'Pitri',nature:'malefic',desc:'Ahnen. Ahnenkarma'},
            {name:'Rudra',ko:'Rudra',nature:'malefic',desc:'Sturmgott. Zerstörerische Transformation'},
            {name:'Varuna',ko:'Varuna',nature:'benefic',desc:'Ozeangott. Kosmische Ordnung'},
            {name:'Aryama',ko:'Aryama',nature:'benefic',desc:'Sonnengottheit. Freundschaft und Verträge'},
            {name:'Mitra',ko:'Mitra',nature:'benefic',desc:'Gott der Freundschaft. Vertrauen und Kameradschaft'},
            {name:'Agni',ko:'Agni',nature:'malefic',desc:'Feuergott. Reinigendes Feuer'},
            {name:'Varuna2',ko:'Varuna2',nature:'benefic',desc:'Ozeangott. Tiefe Weisheit'},
            {name:'Gauri',ko:'Gauri',nature:'benefic',desc:'Parvati. Hingabe und Liebe'},
            {name:'Mahakala',ko:'Mahakala',nature:'malefic',desc:'Große Zeit. Versuch die Zeit zu meistern'},
            {name:'Pitamaha',ko:'Pitamaha',nature:'benefic',desc:'Großer Vater Brahma. Schöpfer'},
            {name:'Kartikeya',ko:'Kartikeya',nature:'benefic',desc:'Kriegsgott. Gerechter Kampf'},
            {name:'Yama',ko:'Yama',nature:'malefic',desc:'Totengott. Urteil und Gerechtigkeit'},
            {name:'Kala2',ko:'Kala2',nature:'malefic',desc:'Zeit. Von der Zeit verfolgt'},
            {name:'Varuna3',ko:'Varuna3',nature:'benefic',desc:'Ozeangott. Gesetz und Wahrheit'},
            {name:'Kubera2',ko:'Kubera2',nature:'benefic',desc:'Gott des Reichtums. Großzügigkeit'},
            {name:'Aditya',ko:'Aditya',nature:'benefic',desc:'Sonnengott. Licht und Wahrheit'},
            {name:'Rishi',ko:'Rishi',nature:'benefic',desc:'Weiser. Weisheit und Praxis'},
            {name:'Vasu',ko:'Vasu',nature:'benefic',desc:'Himmlisches Wesen. Naturbeherrschung'},
            {name:'Ashwini',ko:'Ashwini',nature:'benefic',desc:'Zwillingsheiler. Heilung'},
            {name:'Naga',ko:'Naga',nature:'malefic',desc:'Schlangengottheit. Geheimnis und Geheimnisse'},
            {name:'Gandharva',ko:'Gandharva',nature:'benefic',desc:'Himmlischer Musiker. Kunst und Musik'},
            {name:'Prajapati',ko:'Prajapati',nature:'benefic',desc:'Schöpfer. Leben erschaffen'},
            {name:'Charachara',ko:'Charachara',nature:'benefic',desc:'Alle Dinge. Eins mit allem'}
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
            'Krieger, Anführer — Übte Macht aus, natürliche Führung und Entschlossenheit in der Seele eingeprägt.',
            'Künstler, Bauer — Arbeitete mit der Natur, tiefer Instinkt für Stabilität und materielle Schönheit.',
            'Gelehrter, Händler — Lebte vom Wissen, Vielseitigkeit und Neugier bleiben. Natürliches Sprachtalent.',
            'Beschützer, Betreuer — Sorgte für andere, tiefe Sensibilität und mütterlicher Instinkt. Starkes Zuhause-Karma.',
            'Königtum, Priester — Hatte hohen Status, natürliche Autorität und Würde. Auf der Bühne stehen ist Seeleninstinkt.',
            'Heiler, Diener — Praktizierte Medizin oder Dienst, ausgezeichnete analytische Fähigkeiten. Anderen helfen ist Seelenpflicht.',
            'Diplomat, Künstler — Verfolgte Harmonie und Schönheit, geschickt in Beziehungen. Partnerschaft ist Kernthema.',
            'Praktiker, Alchemist — Durchlief tiefe Transformation, starke Anziehung zu Geheimnissen und Mysterien.',
            'Weiser, Entdecker — Suchte Wahrheit, spirituelle Weisheit und Abenteuerlust bleiben. Höheres Bildungs-Karma.',
            'Beamter, Architekt — Baute Ordnung, starke Geduld und Verantwortung. Disziplin in der Seele eingeprägt.',
            'Beamter, Wächter — Baute soziale Ordnung, Organisationsgeist. Saturn-regiert, Pflicht in der Seele eingeprägt.',
            'Medium, Künstler — Kommunizierte mit der spirituellen Welt, extrem starke Intuition. Am nächsten zur Befreiung.'
        ];

        // 행성별 D60 사인 해석 (전통)
        const d60PlanetInSign = {
            Sun: ['Lebte als Krieger oder König in früheren Leben. Starkes Ego und Führung bleiben. Seelenzweck Autorität aufzubauen.','Lebte als Künstler oder wohlhabende Person. Die Seele sucht materiellen Überfluss. Angezogen von sinnlicher Schönheit.','Lebte als Gelehrter oder Händler. Wissen und Kommunikation sind zentrale Seelenthemen.','Lebte als Beschützer oder Betreuer. Für andere sorgen ist ein tiefer Seeleninstinkt.','Hatte hohen Status als Royalität oder Klerus. Natürliche Autorität überträgt sich in dieses Leben.','Lebte als Heiler oder Diener. Analyse und Service sind der Seelenzweck.','Lebte als Diplomat oder Künstler auf der Suche nach Harmonie. Beziehungen und Balance sind die Seelenaufgabe.','Lebte als Praktiker oder Alchemist durch tiefe Transformation. Geheimnisse und Transformation in der Seele eingeprägt.','Lebte als Weiser oder Entdecker auf der Suche nach Wahrheit. Weisheit und Abenteuer sind die Seelenrichtung.','Lebte als Beamter oder Architekt, der Ordnung baute. System und Verantwortung in der Seele eingraviert.','Lebte als Revolutionär oder Erfinder der Zeit voraus. Originalität ist das Seelenmerkmal.','Lebte als Medium oder Künstler in Kommunion mit der spirituellen Welt. Tiefe Intuition bleibt in der Seele.'],
            Moon: ['Emotionale Erinnerungen aus früheren Leben sind wild intensiv. Wut und Leidenschaft im Unbewussten eingeprägt. Emotionen meistern ist die Aufgabe.','Emotionale Erinnerungen aus früheren Leben sind warm und stabil. Erinnerungen an Überfluss bleiben im Unbewussten, suchen Schönheit.','Emotionale Erinnerungen aus früheren Leben sind intellektuell und vielfältig. Neugier ist stark aus vielen vergangenen Erfahrungen.','Emotionale Erinnerungen aus früheren Leben sind sehr tief. Starke Erinnerungen an Zuhause und Fürsorge schaffen reiche Emotionen.','Emotionale Erinnerungen aus früheren Leben sind voll von Stolz und Würde. Erinnerungen an Anerkennung und Respekt bleiben.','Emotionale Erinnerungen aus früheren Leben beziehen sich auf Service und Analyse. Erinnerungen an Hilfe schaffen ein fürsorgliches Herz.','Emotionale Erinnerungen aus früheren Leben beziehen sich auf Harmonie und Beziehungen. Erinnerungen an schöne Verbindungen treiben Partnersuche.','Emotionale Erinnerungen aus früheren Leben sind tief und intensiv. Erinnerungen an extreme Veränderungen schaffen ozeantiefe Emotionen.','Emotionale Erinnerungen aus früheren Leben beziehen sich auf Freiheit und Erkundung. Erinnerungen an Reisen und Lernen treiben Expansion.','Emotionale Erinnerungen aus früheren Leben beziehen sich auf Verantwortung und Geduld. Erinnerungen an schwere Lasten schaffen reife Emotionen.','Emotionale Erinnerungen aus früheren Leben sind einzigartig und außergewöhnlich. Erinnerungen ans Anderssein schaffen unabhängige Sensibilität.','Emotionale Erinnerungen aus früheren Leben sind spirituell und transzendent. Träume und Visionen sind lebendig mit tiefer spiritueller Verbindung.']
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
            return ' — Gottheit: <strong>' + d.deity.name + '</strong>(' + d.deity.ko + ') <span style="color:' + c + ';font-weight:700;">' + (d.deity.nature === 'benefic' ? 'Günstig' : 'Ungünstig') + '</span>';
        }

        const houseThemes = ['','Selbst/Existenz','Wohlstand/Wert','Kommunikation/Lernen','Heim/Ruhe','Schöpfung/Liebe','Dienst/Prüfung','Beziehung/Partner','Transformation/Geheimnis','Weisheit/Religion','Gesellschaft/Karriere','Wunsch/Gewinn','Befreiung/Transzendenz'];

        // Parasara 인용
        if (!isEasy) {
            html += '<div class="interp-card" style="border-left:3px solid #8b7ec8;"><div class="interp-text" style="font-size:13px;color:#888;">';
            html += '📜 <strong>Parasara sagt:</strong> "Shashtiamsha (D60) ist die wichtigste aller Teilkarten. Wohltätige Planeten in wohltätigen Abteilungen geben gute Ergebnisse, übeltätige in übeltätigen geben schlechte."<br>';
            html += '<span style="color:#666;">— Brihat Parasara Hora Shastra (BPHS)</span></div></div>';
        }

        // ─── 소챕터 1: soul의 정체성 ───
        const lagnaD = getDeity(lagnaSidereal);
        let ch1 = isEasy
            ? '<strong>Identität früherer Leben</strong>' + deityTag(lagnaD) + '<br><br>'
            : '<strong>D60 Lagna: ' + SIGNS[dLagnaSign] + ' ' + SIGN_SYMBOLS[dLagnaSign] + '</strong> (Herrscher: ' + (RULER_NAMES[d60_1lord]||d60_1lord) + ')' + deityTag(lagnaD) + '<br><br>';
        ch1 += pastLifeThemes[dLagnaSign] + '<br>';
        if (lagnaD.deity) {
            ch1 += '<br>' + (isEasy ?
                (lagnaD.deity.nature === 'benefic' ?
                    'Du hast in früheren Leben viel Gutes getan, daher kommen gute Gelegenheiten natürlich. Deine Existenz ist geschützt.' :
                    'Ungelöste Lektionen aus früheren Leben beeinflussen deine Persönlichkeit, aber sie zu überwinden führt zu größerem Wachstum.') :
                (lagnaD.deity.nature === 'benefic' ?
                    '<strong>' + lagnaD.deity.ko + '</strong> bewacht den Lagna. ' + lagnaD.deity.desc + ' — Verdienst aus früheren Leben schützt — gute Gelegenheiten kommen natürlich.' :
                    '<strong>' + lagnaD.deity.ko + '</strong> beeinflusst den Lagna. ' + lagnaD.deity.desc + ' — Karmische Herausforderung eingeprägt, aber Überwindung führt zu Wachstum.'));
        }
        if (d60_planets_1.length > 0) ch1 += '<br><br>' + d60_planets_1.map(p => p.name).join(', ') + (isEasy ? ' — Kern-Karma aus früheren Leben in diesen Planeten konzentriert.' : ' im D60 Lagna positioniert — Kern-Karma aus früheren Leben in diesen Planeten konzentriert.');
        html += subChapter('🪐', 'Seelenidentität — Wer warst du in früheren Leben', ch1);

        // ─── 소챕터 2: soul의 목적 ───
        const sunD60 = dPositions.find(p => p.id === 'Sun');
        if (sunD60) {
            const sunD = getDeity(sunD60.sidereal);
            let ch2 = (isEasy ? '<strong>Erinnerung der Sonne an frühere Leben</strong>' : '<strong>D60 Sonne: ' + SIGNS[sunD60.dSign] + ' ' + SIGN_SYMBOLS[sunD60.dSign] + '</strong>') + deityTag(sunD) + '<br><br>';
            ch2 += (d60PlanetInSign.Sun[sunD60.dSign] || '') + '<br>';
            if (sunD.deity) {
                ch2 += '<br>' + (isEasy ?
                    (sunD.deity.nature === 'benefic' ?
                        'Du hast deinen wahren Zweck in früheren Leben gut verfolgt, daher kommt Selbstverwirklichung natürlich. Sei selbstbewusst!' :
                        'Es gab Verwirrung darüber, wer du in früheren Leben warst. Dein wahres Selbst zu finden ist eine wichtige Reise, die dich wachsen lässt.') :
                    (sunD.deity.nature === 'benefic' ?
                        'Sonnengottheit <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. Seelenzweck richtig verfolgt — Selbstverwirklichung kommt natürlich.' :
                        'Sonnengottheit <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. Herausforderung aus früheren Leben mit Selbst/Autorität — das wahre Selbst zu finden ist die Seelenaufgabe.'));
            }
            html += subChapter('☉', 'Seelenzweck — Warum wurdest du geboren', ch2);
        }

        // ─── 소챕터 3: 감정의 기억 ───
        const moonD60 = dPositions.find(p => p.id === 'Moon');
        if (moonD60) {
            const moonD = getDeity(moonD60.sidereal);
            let ch3 = (isEasy ? '<strong>Erinnerung des Mondes an frühere Leben</strong>' : '<strong>D60 Mond: ' + SIGNS[moonD60.dSign] + ' ' + SIGN_SYMBOLS[moonD60.dSign] + '</strong>') + deityTag(moonD) + '<br><br>';
            ch3 += (d60PlanetInSign.Moon[moonD60.dSign] || '') + '<br>';
            if (moonD.deity) {
                ch3 += '<br>' + (isEasy ?
                    (moonD.deity.nature === 'benefic' ?
                        'Dein Geist war in früheren Leben friedlich, daher bist du emotional stabil mit starker Intuition. Vertraue deinem Bauchgefühl.' :
                        'Spuren emotionaler Schwierigkeiten aus früheren Leben bleiben tief in deinem Herzen. Meditation und Wassernähe helfen bei der Heilung.') :
                    (moonD.deity.nature === 'benefic' ?
                        'Mondgottheit <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. Geist war friedlich — emotional stabil mit starker Intuition.' :
                        'Mondgottheit <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. Emotionale Wunden bleiben unbewusst. Erkennen und Heilen ist die emotionale Aufgabe dieses Lebens. Meditation und Ruhe am Wasser helfen.'));
            }
            html += subChapter('☽', 'Emotionale Erinnerung — Unbewusste Muster', ch3);
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
            'Verbindung zu Krieger/Anführer aus früheren Leben. Intensives, unabhängiges Ehe-Karma. Seelen, die zusammen kämpften.',
            'Verbindung zu Künstler/Wohlhabendem. Materiell reiches Ehe-Karma. Seelen, die gemeinsam Schönheit verfolgten.',
            'Verbindung zu Gelehrtem/Händler. Intellektuelles Ehe-Karma. Seelen, die zusammen studierten oder handelten.',
            'Verbindung zu Familie/Beschützer. Tiefes emotionales Ehe-Karma. Seelen, die füreinander sorgten.',
            'Verbindung zu Königtum/Adel. Prächtiges, respektiertes Ehe-Karma. Seelen, die zusammen regierten.',
            'Verbindung zu Heiler/Diener. Service und Hingabe Ehe-Karma. Seelen, die gemeinsam anderen halfen.',
            'Verbindung zu Diplomat/Künstler. Harmonisches, schönes Ehe-Karma. Seelen, die gemeinsam Balance suchten.',
            'Verbindung zu Praktiker/Mystiker. Intensives, transformatives Ehe-Karma. Seelen, die Leben und Tod teilten.',
            'Verbindung zu Weisem/Entdecker. Freies, expansives Ehe-Karma. Ausländischer Partner möglich.',
            'Verbindung zu Beamtem/Architekten. Verantwortungsvolles, stabiles Ehe-Karma. Späte Ehe möglich.',
            'Verbindung zu Beamtem/Soldaten. Saturn-regiertes Zeichen mit verantwortungsvollem Ehe-Karma. Seelen, die gemeinsam soziale Pflicht übten. Ehe kann spät oder mit Altersunterschied sein.',
            'Verbindung zu Medium/Künstler. Mystisches, spirituelles Ehe-Karma. Können sich zuerst in Träumen treffen.'
        ];

        let ch4 = (isEasy
            ? '<strong>Partnerverbindung früherer Leben</strong><br><br>'
            : '<strong>D60 7. Haus (Partner): ' + SIGNS[d60H7sign] + ' ' + SIGN_SYMBOLS[d60H7sign] + '</strong> (7 lord: ' + (RULER_NAMES[d60H7lord]||d60H7lord) + ')<br><br>');
        ch4 += spouseKarmaBySign[d60H7sign] + '<br>';

        if (d60H7planets.length > 0) {
            ch4 += '<br><strong>' + (isEasy ? 'Planeten in Partnerposition:' : 'D60 Planeten im 7.:') + '</strong><br>';
            d60H7planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (isEasy) {
                    ch4 += (p.natural === 'benefic'
                        ? 'Gute Verbindung zum Partner aus früheren Leben — Segen in diesem Leben.'
                        : 'Ungelöste Probleme mit dem Partner aus früheren Leben. Herausforderungen aber Wachstumschancen.') + '<br>';
                } else {
                    ch4 += p.symbol + ' <strong>' + p.name + '</strong>' + deityTag(pD) + '<br>';
                    ch4 += (p.natural === 'benefic'
                        ? 'Wohltätig im 7. Haus — Gutes Karma mit Partner in früheren Leben aufgebaut. Segen vom Partner auch in diesem Leben.'
                        : 'Übeltätig im 7. Haus — Ungelöstes Karma mit Partner aus früheren Leben. Wird in diesem Leben ausgeglichen. Herausfordernd aber Wachstumschance.') + '<br>';
                }
            });
        }

        // Venus (사랑의 karma)
        if (venusD60) {
            const venD = getDeity(venusD60.sidereal);
            const venH = ((venusD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (isEasy) {
                ch4 += '<br>' + (venD.deity && venD.deity.nature === 'benefic' ?
                    'Du hast in früheren Leben aufrichtig geliebt, daher erwartet dich schöne Liebe.' :
                    'Ungelöste Liebeslektionen aus früheren Leben. Wahre Liebe zu lernen ist wichtig und macht dich tiefer.');
            } else {
                ch4 += '<br><strong>♀ Venus (Planet der Liebe)</strong> → D60 ' + venH + ' Haus (' + houseThemes[venH] + ')' + deityTag(venD) + '<br>';
                ch4 += venD.deity && venD.deity.nature === 'benefic' ?
                    'Venus unter günstiger <strong>' + venD.deity.ko + '</strong> Schutz. Gut praktizierte Liebe — eine schöne Liebe erwartet dich. ' + venD.deity.desc :
                    'Venus unter ungünstiger <strong>' + (venD.deity?venD.deity.ko:'') + '</strong> Einfluss. Vergangene Liebesherausforderungen — wahre Liebe lernen ist die Aufgabe. ' + (venD.deity?venD.deity.desc:'');
            }
        }

        // Rahu-Ketu 축 (1-7궁이면 전생 인연)
        if (rahuD60 && ketuD60) {
            const rahuH = ((rahuD60.dSign - dLagnaSign + 12) % 12) + 1;
            const ketuH = ((ketuD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (rahuH === 7 || ketuH === 7 || rahuH === 1 || ketuH === 1) {
                ch4 += isEasy
                    ? '<br><br>🔥 <strong>Sehr starke Verbindung aus früheren Leben!</strong> Tiefe Verbindung mit dem Partner — bestimmt, sich in diesem Leben zu treffen.'
                    : '<br><br>🔥 <strong>Rahu-Ketu-Achse auf D60 1-7 Linie!</strong> Dies zeigt eine <strong>sehr starke Verbindung aus früheren Leben</strong> mit deinem Partner. Bestimmt, sich in diesem Leben zu treffen.';
            }
        }

        // 7 lord의 D60 position
        const h7lordPlanet = dPositions.find(p => p.id === d60H7lord);
        if (h7lordPlanet) {
            const h7lH = ((h7lordPlanet.dSign - dLagnaSign + 12) % 12) + 1;
            const h7lD = getDeity(h7lordPlanet.sidereal);
            if (isEasy) {
                const h7lDesc = h7lH === 1 ? 'Partner direkt mit deinem Wachstum verbunden.' : h7lH === 4 ? 'Treffe Partner durch Zuhause und Zufluchtsort.' : h7lH === 9 ? 'Partnerverbindung durch Ausland/Bildung.' : h7lH === 10 ? 'Partnerverbindung durch Karriere/Soziales.' : h7lH === 12 ? 'Treffe Partner in ausländischem/spirituellem Umfeld.' : '';
                if (h7lDesc) ch4 += '<br><br>' + h7lDesc;
            } else {
                ch4 += '<br><br><strong>7 lord ' + (RULER_NAMES[d60H7lord]||d60H7lord) + '</strong> → D60 ' + h7lH + ' Haus (' + houseThemes[h7lH] + ')' + deityTag(h7lD) + '<br>';
                ch4 += 'Karmische Verbindung mit dem Partner <strong>' + houseThemes[h7lH] + '</strong> manifestiert sich durch diesen Bereich. ';
                ch4 += h7lH === 1 ? 'Partner direkt mit deinem Wachstum verbunden.' : h7lH === 4 ? 'Treffe Partner durch Zuhause und Zufluchtsort.' : h7lH === 9 ? 'Partnerverbindung durch Ausland/Bildung.' : h7lH === 10 ? 'Partnerverbindung durch Karriere/Soziales.' : h7lH === 12 ? 'Karma, den Partner in ausländischem/spirituellem Umfeld zu treffen.' : '';
            }
        }
        html += subChapter('💍', 'Partner-Karma — Verbindung aus früheren Leben', ch4);

        // ─── 소챕터 5: career karma ───
        const d60H10sign = (dLagnaSign + 9) % 12;
        const d60H10lord = SIGN_RULERS[d60H10sign];
        const d60H10planets = dPositions.filter(p => p.dSign === d60H10sign);
        const satD60 = dPositions.find(p => p.id === 'Saturn');
        const careerKarma = ['Militär/Führung/Sport','Finanzen/Kunst/Landwirtschaft','Bildung/Medien/Handel','Pflege/Immobilien/Gastgewerbe','Politik/Unterhaltung/Management','Medizin/Analyse/Dienst','Recht/Diplomatie/Design','Forschung/Ermittlung/Medizin','Bildung/Religion/Ausland','Verwaltung/Bau/Beamter','Technologie/Wissenschaft/Innovation','Kunst/Spiritualität/Krankenhaus'][d60H10sign];

        let ch5 = (isEasy
            ? '<strong>Karriere-Karma früherer Leben</strong><br><br>'
            : '<strong>D60 10. Haus (Karriere): ' + SIGNS[d60H10sign] + ' ' + SIGN_SYMBOLS[d60H10sign] + '</strong> (10 lord: ' + (RULER_NAMES[d60H10lord]||d60H10lord) + ')<br><br>');
        ch5 += 'Karriere-Karma früherer Leben in <strong>' + careerKarma + '</strong> Richtung. Natürliche Anziehung zu diesem Bereich.<br>';
        if (satD60) {
            const satD = getDeity(satD60.sidereal);
            const satH = ((satD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) ch5 += '<br><strong>♄ Saturn (Herr des Karma)</strong> → D60 ' + satH + ' Haus (' + houseThemes[satH] + ')' + deityTag(satD) + '<br>';
            ch5 += isEasy ?
                ('<br>' + (satD.deity && satD.deity.nature === 'benefic' ?
                    'Das ist ein <strong>sehr seltener Segen</strong>! Geduld aus früheren Leben reduziert Karriereherausforderungen in diesem Leben.' :
                    'Schwere Karrierelektion aus früheren Leben. Stetiger Einsatz und anderen helfen ist der Schlüssel.')) :
                (satD.deity && satD.deity.nature === 'benefic' ?
                    'Saturn unter wohltätiger Gottheit ist ein <strong>sehr seltener Segen</strong>! Geduld aus früheren Leben reduziert Karriereprüfungen.' :
                    'Saturn unter übeltätiger Gottheit — <strong>schweres Karma aus früheren Leben</strong> im Karrierebereich. ' + (satD.deity?satD.deity.desc:'') + '. Geduld, Dienst, Mantra(Om Shanaishcharaya Namaha) um dieses Karma aufzulösen.');
        }
        if (d60H10planets.length > 0) {
            ch5 += '<br><br><strong>' + (isEasy ? 'Karriereplaneten:' : 'D60 Planeten im 10.:') + '</strong> ' + d60H10planets.map(p => p.name).join(', ') + ' — Karriere-Karma in diesen Planeten konzentriert.';
        }
        html += subChapter('💼', 'Karriere-Karma — Berufung aus früheren Leben', ch5);

        // ─── 소챕터 6: wealth karma ───
        const d60H2sign = (dLagnaSign + 1) % 12;
        const d60H2planets = dPositions.filter(p => p.dSign === d60H2sign);
        let ch6 = (isEasy
            ? '<strong>Wohlstands-Karma früherer Leben</strong><br><br>'
            : '<strong>D60 2. Haus (Wohlstand): ' + SIGNS[d60H2sign] + ' ' + SIGN_SYMBOLS[d60H2sign] + '</strong><br><br>');
        const wealthKarma = ['Selbstgemachter Wohlstandsinstinkt.','Reiches Umfeld in früheren Leben.','Intellektueller Wohlstandsaufbau.','Familien-/Immobilienwohlstand.','Wohlstand durch Autorität.','Wohlstand durch Dienst. Sparsam.','Partnerschaftswohlstand.','Wohlstand anderer (Erbschaft).','Glück bringt Wohlstand. Ausland.','Langsam aber sicher. Reich nach der Lebensmitte.','Innovationswohlstand. Unkonventionell.','Spirituelle Aktivität und Wohlstand. Geben.'][d60H2sign];
        ch6 += wealthKarma + '<br>';
        if (d60H2planets.length > 0) {
            ch6 += isEasy ? '<br>' : '<br><strong>D60 2. Haus Planeten:</strong><br>';
            d60H2planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                ch6 += (isEasy ? '' : p.symbol + ' ' + p.name + deityTag(pD) + ' — ') + (p.natural === 'benefic' ? 'Gute Wohlstandsverbindungen aus früheren Leben — Überfluss auch in diesem Leben.' : 'Wohlstandslektionen aus früheren Leben. Stetiger Einsatz kann sie überwinden.') + '<br>';
            });
        }
        html += subChapter('💰', 'Wohlstands-Karma — Glück aus früheren Leben', ch6);

        // ─── 소챕터 7: 행성별 신 목록 (전문가 모드만) ───
        if (!isEasy) {
            let ch7 = '';
            const lagnaD2 = getDeity(lagnaSidereal);
            if (lagnaD2.deity) {
                const lc = lagnaD2.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                ch7 += '<div style="padding:4px 0;">⬆ Lagna → <strong>' + lagnaD2.deity.name + '</strong>(' + lagnaD2.deity.ko + ') <span style="color:' + lc + ';">' + (lagnaD2.deity.nature === 'benefic' ? 'Günstig' : 'Ungünstig') + '</span></div>';
            }
            positions.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (pD.deity) {
                    const c = pD.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                    ch7 += '<div style="padding:4px 0;">' + p.symbol + ' ' + p.name + ' → <strong>' + pD.deity.name + '</strong>(' + pD.deity.ko + ') <span style="color:' + c + ';">' + (pD.deity.nature === 'benefic' ? 'Günstig' : 'Ungünstig') + '</span></div>';
                }
            });
            html += subChapter('🕉️', 'Planetare Gottheitenliste', ch7);
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
            '<strong style="color:#5cb85c">' + beneficCount + ' gute Energie</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' Vorsichtsenergie</strong> von 9 Planeten<br><br>' :
            '<strong style="color:#5cb85c">' + beneficCount + ' wohltätig</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' übeltätig</strong> Platzierung<br><br>';
        if (beneficCount >= 7) {
            ch8 += isEasy ?
                '🌟 <strong>Du hast in früheren Leben so viel Gutes getan!</strong> Fast alle Planeten unter guter Energie — natürlich gute Ergebnisse. Starkes angeborenes Glück.' :
                '🌟 <strong>Sehr starkes Verdienst aus früheren Leben.</strong> Parasara nannte solche Horoskope "eine von den Göttern gesegnete Seele". Die meisten Planeten unter Wohltätern — natürlich gute Ergebnisse.';
        } else if (beneficCount >= 5) {
            ch8 += isEasy ?
                '✨ <strong>Reichliche gute Energie aus früheren Leben.</strong> In vielen Lebensbereichen geschützt.' :
                '✨ <strong>Reichliches Verdienst aus früheren Leben.</strong> Wohltäter dominieren — in vielen Bereichen geschützt.';
            if (maleficPlanets.length > 0) ch8 += isEasy ?
                ' Einige Bereiche erfordern jedoch mehr Einsatz.' :
                ' Jedoch bestehen karmische Herausforderungen in <strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>. Praktiziere Mantras und Wohltätigkeit für diese Planeten.';
        } else if (beneficCount >= 3) {
            ch8 += isEasy ?
                '⚖️ <strong>Gute Energie und herausfordernde Energie sind halb und halb.</strong> Gutes und Schwieriges wechseln sich im Leben ab.' :
                '⚖️ <strong>Karma im Gleichgewicht.</strong> Gemischtes Glück — Gutes und Herausforderungen wechseln sich ab.';
            if (maleficPlanets.length > 0) ch8 += '<br>' + (isEasy ? 'Planeten zu beachten: ' : 'Planeten zu beachten: ') + '<strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>';
        } else {
            ch8 += isEasy ?
                '🔥 <strong>Dieses Leben dient der Auflösung vergangener Lebenslektionen.</strong> Viele Herausforderungen, aber wer die schwersten Lektionen hat, wächst am meisten. Stetiger Einsatz und anderen helfen ist besonders wichtig.' :
                '🔥 <strong>Ein Leben der Karma-Abrechnung.</strong> Viele Herausforderungen aus früheren Leben, aber Parasara sagte "die Seele mit dem schwersten Karma wächst am meisten". Mantra-Praxis und Wohltätigkeit sind besonders wichtig.';
        }
        html += subChapter('📊', 'Gesamte Karma-Bewertung', ch8);

        // (이전 코드 제거됨 - 신 목록과 해석은 위 소챕터에 통합)

    } else if (division === 2) {
        // D2 Hora — wealth·부의 축적
        const d2LagnaInterp = ['Selbstgemachter Wohlstand. Unabhängiges und aggressives Investieren.','Sensorisches Investment und stabiler Wohlstand. Immobilien, Essen, Kunst.','Verdienen durch intellektuelle Aktivität. Schreiben, Bildung, Geschäftssinn.','Immobilien- und Familieneinkommen. Eigentum von der Mutter. Vorsicht emotionale Ausgaben.','Wohlstand durch Führung und Autorität. Regierung, Gold. Auffällige Ausgaben.','Einkommen durch Analyse und Fähigkeiten. Medizin, Buchhaltung, Service. Sparsam.','Wohlstand durch Partnerschaft. Recht, Diplomatie, Mode, Kunst.','Wohlstand aufbauen mit fremdem Geld (Erbschaft, Versicherung, Investitionen).','Einkommen durch Bildung, Ausland, Religion. Glück bringt Wohlstand.','Systematischer Einsatz baut Wohlstand auf. Langsam aber sicher. Reich nach der Lebensmitte.','Einkommen durch Technologie, Innovation, Netzwerke. Unkonventionelle Quellen.','Einkommen durch spirituelle/künstlerische Aktivitäten. Auslandsbezogener Wohlstand.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💰 Detaillierte Wohlstandsanalyse' : '💰 D2 Hora — Wohlstandsanalyse') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D2 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d2LagnaInterp + '<br><br>';

        const sunD2 = dPositions.find(p => p.id === 'Sun');
        const moonD2 = dPositions.find(p => p.id === 'Moon');
        const jupD2 = dPositions.find(p => p.id === 'Jupiter');
        const venD2 = dPositions.find(p => p.id === 'Venus');

        if (sunD2) {
            const sunInOwn = sunD2.dSign === 4; // Leo
            html += (isEasy ? '' : '<strong>☉ Sonne → ' + SIGNS[sunD2.dSign] + ':</strong> ') + (sunInOwn ? (isEasy ? '🌟 <strong>Selbstgemacht!</strong> Baut Wohlstand durch Autorität und Führung auf.' : '🌟 <strong>Sonne im eigenen Hora (Löwe)!</strong> Selbstgemachter Typ. Baut Wohlstand durch Autorität und Führung auf.') : (isEasy ? 'Einkommen durch andere oder Regierung/öffentlichen Sektor.' : 'Sonne im Mond-Hora. Einkommen durch Hilfe anderer oder Regierung/öffentlichen Sektor.')) + '<br>';
        }
        if (moonD2) {
            const moonInOwn = moonD2.dSign === 3; // Cancer
            html += (isEasy ? '' : '<strong>☽ Mond → ' + SIGNS[moonD2.dSign] + ':</strong> ') + (moonInOwn ? (isEasy ? '🌟 <strong>Reiches Leben durch öffentliche Beziehungen!</strong>' : '🌟 <strong>Mond im eigenen Hora (Krebs)!</strong> Reiches Leben durch Öffentlichkeit und Beziehungen.') : (isEasy ? 'Einkommen durch eigene Anstrengung und unabhängige Aktivität.' : 'Mond im Sonnen-Hora. Einkommen durch eigene Anstrengung und unabhängige Aktivität.')) + '<br>';
        }
        if (jupD2) html += (isEasy ? '' : '<strong>♃ Jupiter → ' + SIGNS[jupD2.dSign] + ':</strong> ') + (isEasy ? (jupD2.dSign === 4 ? 'Kann großen Wohlstand durch eigene Fähigkeit aufbauen.' : 'Überfluss durch Beziehungen mit anderen.') : 'Jupiter in ' + (jupD2.dSign === 4 ? 'Sonnen-Hora — großer Wohlstand durch eigene Fähigkeit.' : 'Mond-Hora — Überfluss durch Beziehungen.')) + '<br>';
        if (venD2) html += (isEasy ? '' : '<strong>♀ Venus → ' + SIGNS[venD2.dSign] + ':</strong> ') + (isEasy ? (venD2.dSign === 4 ? 'Selbstgemacht durch Kunst/Luxusgüter.' : 'Wohlstand durch Ehepartner oder Partner.') : 'Venus in ' + (venD2.dSign === 4 ? 'Sonnen-Hora — selbstgemacht durch Kunst/Luxus.' : 'Mond-Hora — Wohlstand durch Partner.')) + '<br>';

        // D2 2궁(축적된 부) 분석
        const d2H2sign = (dLagnaSign + 1) % 12;
        const d2H2planets = dPositions.filter(p => p.dSign === d2H2sign);
        html += '<br><strong>' + (isEasy ? 'Angesammelter Wohlstand:' : 'D2 2. Haus (angesammelter Wohlstand) — ' + SIGNS[d2H2sign] + ':') + '</strong><br>';
        if (d2H2planets.length > 0) {
            d2H2planets.forEach(p => {
                const wealth = {Sun:'Wohlstand durch Autorität und Status',Moon:'Fließender Wohlstand durch öffentliche Aktivitäten',Mars:'Wohlstand in Immobilien, Technologie, Wettbewerbsbereichen',Mercury:'Wohlstand in Geschäft, intellektuellen, Kommunikationsbereichen',Jupiter:'Reichlicher Wohlstand in Bildung, Religion, Recht',Venus:'Wohlstand in Kunst, Mode, Luxusgütern',Saturn:'Langsamer aber stetiger Wohlstand. Stabil nach der Lebensmitte',Rahu:'Wohlstand durch unkonventionelle Methoden oder ausländische Quellen',Ketu:'Vom Materiellen gelöst. Verfolgt spirituelle Werte'};
                html += isEasy ? (wealth[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (wealth[p.id]||'') + '<br>';
            });
        } else {
            html += isEasy ? 'Sammelt stetig Wohlstand an.<br>' : '2. Haus leer — Position des 2. Haus-Herrschers ist der Schlüssel zur Wohlstandsanhäufung.<br>';
        }
        html += '</div></div>';

    } else if (division === 3) {
        // D3 Drekkana — sibling·용기·소통
        const d3LagnaInterp = ['Unabhängig, Führung unter Geschwistern. Mutiger Kommunikationsstil.','Stabile, materiell komfortable Geschwisterbeziehungen. Künstlerische Geschwister möglich.','Intellektuelle, kommunikative Geschwister. Viele Geschwister oder viel Gespräch.','Emotional tiefe Geschwisterbindung. Mütterliches Geschwister. Beschützende Geschwister.','Charismatische, stolze Geschwister. Berühmtes oder erfolgreiches Geschwister.','Analytische, praktische Geschwister. Medizin-/Bildungsbereich. Können kritisch sein.','Diplomatische, charmante Geschwister. Soziale Verbindungen durch Geschwister.','Intensive, geheimnisvolle Geschwisterbeziehungen. Tiefe Bindungen nach Konflikten.','Freie, philosophische Geschwister. Geschwister im Ausland. Religion/Bildung bezogen.','Verantwortungsvolle, ehrgeizige Geschwister. Pflichtbewusstsein. Wenige oder ernste Beziehung.','Einzigartige, unabhängige Geschwister. Unkonventionelle Geschwisterbeziehungen.','Spirituelle, künstlerische Geschwister. Geschwister im Ausland. Emotionale Verbindung.'][dLagnaSign];

        const d3_3sign = (dLagnaSign + 2) % 12;
        const d3_11sign = (dLagnaSign + 10) % 12;
        const d3_3planets = dPositions.filter(p => p.dSign === d3_3sign);
        const d3_11planets = dPositions.filter(p => p.dSign === d3_11sign);
        const marsD3 = dPositions.find(p => p.id === 'Mars');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👫 Geschwister & Mut Analyse' : '👫 D3 Drekkana — Geschwister & Mut') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D3 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d3LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Jüngere Geschwister:' : 'D3 3. Haus (Jüngere) — ' + SIGNS[d3_3sign] + ':') + '</strong><br>';
        if (d3_3planets.length > 0) {
            const bro = {Sun:'Jüngeres Geschwister hat Führung und Autorität',Moon:'Emotional nah mit jüngerem Geschwister',Mars:'Aktives und mutiges jüngeres Geschwister. Streit möglich',Mercury:'Jüngeres Geschwister ist intellektuell mit guter Kommunikation',Jupiter:'Jüngeres Geschwister ist weise und bringt Glück',Venus:'Jüngeres Geschwister ist charmant und künstlerisch',Saturn:'Schwierigkeiten mit jüngerem Geschwister. Altersunterschied möglich',Rahu:'Jüngeres Geschwister ist einzigartig oder auslandsbezogen',Ketu:'Distanz zu jüngerem Geschwister. Spirituelle Verbindung'};
            d3_3planets.forEach(p => { html += isEasy ? (bro[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (bro[p.id]||'') + '<br>'; });
        } else html += isEasy ? '' : '3. Haus leer — Position des 3. Herrschers prüfen.<br>';

        html += '<br><strong>' + (isEasy ? 'Ältere Geschwister:' : 'D3 11. Haus (Ältere Geschwister) — ' + SIGNS[d3_11sign] + ':') + '</strong><br>';
        if (d3_11planets.length > 0) {
            d3_11planets.forEach(p => { html += isEasy ? 'Beeinflusst Beziehung zu älteren Geschwistern.<br>' : '• ' + p.name + ' im 11. Haus — beeinflusst Beziehung zu älteren Geschwistern.<br>'; });
        } else html += isEasy ? '' : '11. Haus ohne Planeten.<br>';

        if (marsD3) {
            const marsH = ((marsD3.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♂ Mars (Geschwister-Karaka):</strong> ';
            html += marsH <= 4 ? 'Enge Geschwisterbeziehung. Mutige Geschwister.' : marsH <= 8 ? 'Geschwisterkonflikte oder Transformation durch Geschwister.' : 'Geschwister im Ausland oder spirituelle Tendenz.';
        }
        html += '</div></div>';

    } else if (division === 4) {
        // D4 Chaturthamsha — 재산·부동산·행운
        const d4LagnaInterp = ['Erwirbt aktiv Eigentum. Mag es, neue Häuser zu bauen oder zu kaufen.','Stabile, reichliche Immobilien. Land und Bauernhöfe. Luxuriöse Wohnung.','Mehrere Häuser oder häufige Umzüge. Bevorzugt intellektuelles Umfeld.','Zuhause und Eigentum sind emotional wichtig. Nahe am Wasser. Eigentum von der Mutter.','Großes, geräumiges Zuhause. Luxuriöses Interieur. Prestigegebiet.','Saubere, praktische Wohnung. Gesundheitsorientiertes Umfeld. Mehrere kleine Immobilien.','Schönes, harmonisches Zuhause. Interesse an Innenarchitektur. Eigentum mit Partner.','Eigentum durchläuft Transformation. Geerbtes Eigentum. Geheime Orte.','Großes Land und ausländisches Eigentum. Nahe religiösen/Bildungseinrichtungen.','Systematische Immobilieninvestition. Alte Gebäude. Langsames aber sicheres Wachstum.','Einzigartiger Wohnstil. Moderne Wohnung. Technikbezogene Einrichtungen.','Schönes Zuhause nahe am Wasser. Ausländisches Eigentum. Spiritueller Raum.'][dLagnaSign];

        const d4_4sign = (dLagnaSign + 3) % 12;
        const d4_4planets = dPositions.filter(p => p.dSign === d4_4sign);
        const d4_10sign = (dLagnaSign + 9) % 12;
        const d4_10planets = dPositions.filter(p => p.dSign === d4_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🏠 Eigentum & Glücksanalyse' : '🏠 D4 Chaturthamsha — Eigentum & Glücksanalyse') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D4 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d4LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Eigentum/Zuhause:' : 'D4 4. Haus (Immobilien/Zuhause) — ' + SIGNS[d4_4sign] + ':') + '</strong><br>';
        if (d4_4planets.length > 0) {
            const prop = {Sun:'Regierungsgebäude oder prestigeträchtige Residenz',Moon:'Schönes Zuhause. Nahe am Wasser. Einfluss der Mutter',Mars:'Neubau. Immobilienstreitigkeiten möglich',Mercury:'Gewerbeimmobilien. Mehrere Immobilien',Jupiter:'Geräumiges, reiches Zuhause! Bestes Immobilienglück',Venus:'Luxuriöses Zuhause. Schönes Interieur',Saturn:'Altes Eigentum. Reparaturen nötig. Stabil nach der Lebensmitte',Rahu:'Auslandsimmobilien. Unkonventionelle Wohnung',Ketu:'Gleichgültig gegenüber Immobilien. Bevorzugt spirituelle Räume'};
            d4_4planets.forEach(p => { html += isEasy ? (prop[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (prop[p.id]||'') + '<br>'; });
        } else html += isEasy ? 'Stabiles Immobilienglück.<br>' : '4. Haus leer — Position des 4. Herrschers ist der Schlüssel zum Immobilienglück.<br>';

        html += '<br><strong>' + (isEasy ? 'Allgemeines Glück:' : 'D4 10. Haus (allgemeines Glück) — ' + SIGNS[d4_10sign] + ':') + '</strong><br>';
        if (d4_10planets.length > 0) {
            d4_10planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Allgemeines Glück ist gut!<br>' : 'Einsatz nötig aber Wachstumschance.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Wohltätig im 10. Haus — allgemeines Glück ist gut!' : 'Übeltätig im 10. Haus — Einsatz nötig aber Wachstumschance.') + '<br>';
            });
        } else html += isEasy ? '' : '10. Haus ohne Planeten.<br>';
        html += '</div></div>';

    } else if (division === 16) {
        // D16 Shodashamsha — 차량·comfort·행복
        const d16LagnaInterp = ['Sportwagen, Motorräder — dynamische Fahrzeuge. Genießt das Fahren.','Premium-Fahrzeuge und komfortabler Transport. Luxuriöser materieller Komfort.','Mehrere Fahrzeuge oder verschiedene Transporte. Mag Tech-Gadgets.','Komfortables Familienfahrzeug. Reisen mit der Familie. Materielle Stabilität ist Glück.','Top-Luxusfahrzeuge. Auffällige Ausgaben. Bevorzugt Premium-Marken.','Praktische und sparsame Fahrzeuge. Gesundheitsbezogene Geräte.','Raffiniertes, gut designtes Fahrzeug. Ästhetisch ansprechende Gegenstände.','Gebrauchtes oder geerbtes Fahrzeug. Versicherung wichtig. Transformative materielle Erfahrung.','SUV oder ausländische Marken. Reisefahrzeug. Abenteuerlicher Transport.','Einfaches aber robustes Fahrzeug. Praktikabilität zuerst. Besseres Auto nach der Lebensmitte.','Elektro- oder neuestes Tech-Fahrzeug. Einzigartiger Transport.','Wasserbezogener Transport (Boot). Emotional Lieblingsgegenstände.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🚗 Fahrzeuge & Komfort' : '🚗 D16 Shodashamsha — Fahrzeuge & Komfort') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D16 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d16LagnaInterp + '<br><br>';

        const d16_4sign = (dLagnaSign + 3) % 12;
        const d16_4planets = dPositions.filter(p => p.dSign === d16_4sign);
        html += '<strong>' + (isEasy ? 'Komfort/Glück:' : 'D16 4. Haus (Komfort/Glück) — ' + SIGNS[d16_4sign] + ':') + '</strong><br>';
        if (d16_4planets.length > 0) {
            d16_4planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Reichlicher materieller Komfort und Glück!<br>' : 'Einsatz nötig für materiellen Komfort.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Materieller Komfort und Glück reichlich!' : 'Einsatz nötig für materiellen Komfort.') + '<br>';
            });
        } else html += isEasy ? 'Durchschnittlicher materieller Komfort.<br>' : '4. Haus leer — Position des 4. Herrschers ist der Schlüssel zum Glück.<br>';

        const venD16 = dPositions.find(p => p.id === 'Venus');
        if (venD16) {
            const vH = ((venD16.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♀ Venus (Komfort-Karaka):</strong> ';
            html += [,'Schafft eigenen Komfort','Komfort durch Wohlstand','Glück durch Kommunikation','Großes Glück zu Hause!','Glück durch Kinder/Romantik','Komfort durch Gesundheitsmanagement','Glück durch den Partner!','Glück durch Transformation','Glück durch Reisen/Lernen','Komfort durch sozialen Status','Glück durch Freunde/Netzwerk','Glück durch spirituellen Frieden'][vH] || '';
        }
        html += '</div></div>';

    } else if (division === 20) {
        // D20 Vimshamsha — 영적 practice·종교
        const d20LagnaInterp = ['Aktive Spiritualität. Karma Yoga. Praxis durch aktiven Dienst.','Spiritualität durch Natur und Sinne. Mantra-Praxis. Tempelmeditation.','Intellektuelle Spiritualität. Schriftforschung. Erwachen durch Wissen.','Emotionale Spiritualität. Bhakti Yoga (Hingabe). Angezogen von mütterlicher Göttlichkeit.','Königliche Spiritualität. Spirituelle Praxis als Anführer. Sonnenanbetung.','Spiritualität des Dienstes. Praxis durch Seva (Dienst). Heilungsbezogene Spiritualität.','Harmonie-Spiritualität. Göttliche Erfahrung durch Kunst und Schönheit. Tantra.','Tiefe transformative Spiritualität. Tantra, Kundalini. Tod und Wiedergeburt.','Sucher-Spiritualität. Pilgerfahrt. Suche nach einem Lehrer. Philosophische Praxis.','Traditionelle Spiritualität. Systematische Praxis. Karma Yoga. Geduldsübung.','Innovative Spiritualität. Unkonventionelle Methoden. Dienst an der Menschheit.','Transzendente Spiritualität. Meditation, Träume, Intuition. Mystische Erfahrungen. Befreiung.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🙏 Spiritualität' : '🙏 D20 Vimshamsha — Spiritualität') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D20 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d20LagnaInterp + '<br><br>';

        const jupD20 = dPositions.find(p => p.id === 'Jupiter');
        const sunD20 = dPositions.find(p => p.id === 'Sun');
        const ketuD20 = dPositions.find(p => p.id === 'Ketu');
        const d20_9sign = (dLagnaSign + 8) % 12;
        const d20_12sign = (dLagnaSign + 11) % 12;
        const d20_9planets = dPositions.filter(p => p.dSign === d20_9sign);

        if (jupD20) {
            const jH = ((jupD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♃ Jupiter (Spiritueller Lehrer) → ' + jH + 'th:</strong> ') + ([,'Starkes spirituelles Selbst','Spirituelles Wissen wird zu Wohlstand','Spirituelle Kommunikationsfähigkeit','Tiefer innerer Frieden','Spirituelles Verdienst aus früheren Leben','Spiritualität durch Dienst','Treffen mit einem Lehrer','Geheimes spirituelles Wissen','Beste Platzierung! Großes spirituelles Glück','Spirituelle Autorität','Spirituelle Gemeinschaft','Befreiung und Erwachen'][jH] || '') + '<br>';
        }
        if (ketuD20) {
            const kH = ((ketuD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☋ Ketu (Befreiung) → ' + kH + 'th:</strong> ') + ([,'Angeborene spirituelle Fähigkeit','Spirituelle Werte','Spirituelle Kommunikation','Tiefe innere Befreiung','Ergebnis vergangener spiritueller Praxis','Dienende Seele','Spirituelles Wachstum durch Partner','Tiefe transformative Spiritualität','Spiritueller Pilger','Spirituelle Karriere','Anführer spiritueller Gemeinschaft','Seele nahe der Befreiung'][kH] || '') + '<br>';
        }
        html += '<br><strong>' + (isEasy ? 'Guru/Lehrer:' : 'D20 9. Haus (Guru/Lehrer) — ' + SIGNS[d20_9sign] + ':') + '</strong><br>';
        if (d20_9planets.length > 0) {
            d20_9planets.forEach(p => { html += isEasy ? 'Starke Verbindung zu spirituellem Lehrer.<br>' : '• ' + p.name + ': Starke Verbindung zu spirituellem Lehrer.<br>'; });
        } else html += isEasy ? 'Gut, aktiv einen spirituellen Lehrer zu suchen.<br>' : '9. Haus leer — suche aktiv einen spirituellen Lehrer.<br>';
        html += '</div></div>';

    } else if (division === 24) {
        // D24 차투르Vimshamsha — 교육·학문
        const d24LagnaInterp = ['Sportunterricht, Militär, Führungstraining.','Musik, Kunst, Kulinarik, Finanzbildung.','Sprachen, Literatur, Kommunikation, Medienbildung.','Geschichte, Psychologie, Hauswirtschaft.','Politikwissenschaft, Theater, Wirtschaftsbildung.','Medizin, Wissenschaft, Statistik. Präzises Lernen.','Recht, Diplomatie, Designbildung. Ausgewogenes Lernen.','Psychologie, Forschung, Ermittlung, okkulte Bildung.','Philosophie, Theologie, internationale Studien. Auslandsstudium wahrscheinlich.','Wirtschaft, Verwaltung, Architektur. Systematisches Lernen.','IT, Ingenieurwesen, Luftfahrt, Sozialwissenschaft. Innovatives Lernen.','Kunst, Musik, Spiritualität, Filmstudien. Intuitives Lernen.'][dLagnaSign];

        const d24_4sign = (dLagnaSign + 3) % 12;
        const d24_5sign = (dLagnaSign + 4) % 12;
        const d24_4planets = dPositions.filter(p => p.dSign === d24_4sign);
        const d24_5planets = dPositions.filter(p => p.dSign === d24_5sign);
        const jupD24 = dPositions.find(p => p.id === 'Jupiter');
        const merD24 = dPositions.find(p => p.id === 'Mercury');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '📚 Bildungsanalyse' : '📚 D24 Chaturvimshamsha — Bildungsanalyse') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D24 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d24LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Grundbildung:' : 'D24 4. Haus (Grundbildung) — ' + SIGNS[d24_4sign] + ':') + '</strong><br>';
        if (d24_4planets.length > 0) {
            d24_4planets.forEach(p => {
                const edu4 = {Sun:'Prestigeschule. Autoritative Bildung',Moon:'Komfortables Lernumfeld. Starker Einfluss häuslicher Bildung',Mars:'Wettbewerbsorientiertes Lernen. Sport-/Technikbildung stark',Mercury:'Beste Platzierung! Herausragende akademische Fähigkeit',Jupiter:'Reiches Bildungsumfeld. Gute Lehrer',Venus:'Kunstbildung. Schöne Schule',Saturn:'Schwieriges Bildungsumfeld aber tiefes Wissen wenn überwunden',Rahu:'Unkonventionelle Bildung. Auslandsschule',Ketu:'Weniger Interesse an Bildung. Intuitives Lernen'};
                html += isEasy ? (edu4[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (edu4[p.id]||'') + '<br>';
            });
        } else html += isEasy ? 'Wächst stetig in stabilem Bildungsumfeld.<br>' : '4. Haus ohne Planeten.<br>';

        html += '<br><strong>' + (isEasy ? 'Höhere Bildung:' : 'D24 5. Haus (Höhere Bildung/Intellekt) — ' + SIGNS[d24_5sign] + ':') + '</strong><br>';
        if (d24_5planets.length > 0) {
            d24_5planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Herausragende Leistung in höherer Bildung!<br>' : 'Akademische Herausforderungen führen zu Wachstum.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Herausragende Leistung in höherer Bildung!' : 'Akademische Herausforderungen führen zu Wachstum.') + '<br>';
            });
        } else html += isEasy ? 'Stetiger Einsatz bringt gute Ergebnisse.<br>' : '5. Haus ohne Planeten.<br>';

        if (jupD24) {
            const jH = ((jupD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '<br>' : '<br><strong>♃ Jupiter (Weisheit) → ' + jH + 'th:</strong> ') + ([1,4,5,9].includes(jH) ? '🎓 <strong>Hohe akademische Leistung erwartet!</strong> Postgraduale/Promotion/Auslandsstudium möglich.' : (isEasy ? 'Wachstum durch Akademik erwartet.' : 'Wachstum durch Akademik. Jupiters Segen manifestiert sich im ' + jH + '. Haus-Bereich.')) + '<br>';
        }
        if (merD24) {
            const mH = ((merD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☿ Merkur (Lernen) → ' + mH + 'th:</strong> ') + ([1,4,5,9].includes(mH) ? '📖 <strong>Herausragender Intellekt!</strong> Talent in Mathe, Sprachen, Analyse.' : (isEasy ? 'Intellektuelle Fähigkeit gut ausgedrückt.' : 'Intellektuelle Fähigkeit im ' + mH + '. Haus-Bereich.')) + '<br>';
        }
        html += '</div></div>';

    } else if (division === 27) {
        // D27 삽타Vimshamsha — 체력·강점·약점
        const d27LagnaInterp = ['Starke Ausdauer und Energie. Ausgezeichnete athletische Fähigkeit. Kopf/Gesicht ist Stärke.','Ausdauer und Geduld sind Stärken. Nacken/Stimmbänder stark. Gute Muskelkraft.','Agilität und Reflexe stark. Pflege des Nervensystems nötig.','Emotionale Resilienz ist Stärke. Brust/Magen beachten. Schwimmtalent.','Herz und Wirbelsäule sind stark. Charismatischer Körperbau. Vorsicht Überarbeitung.','Verdauungs- und Analysekraft sind Stärken. Darm/Haut beachten. Yoga geeignet.','Ausgewogener, harmonischer Körperbau. Nieren/Rücken beachten. Tanzen passt.','Erholung und Widerstand sind Stärken. Reproduktive Gesundheit beachten. Extremsport möglich.','Oberschenkel und Leber sind stark. Outdoor-Sport geeignet. Vorsicht Übergewicht.','Knochen und Gelenke sind stark. Beste Geduld. Gesünder mit dem Alter.','Kreislaufsystem und Knöchel beachten. Bevorzugt einzigartigen Sport. Innovative Gesundheitsmethoden.','Immunität und Intuition sind Stärken. Füße/Lymphe beachten. Wassersport geeignet.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💪 Körperkraftanalyse' : '💪 D27 Saptavimshamsha — Körperkraftanalyse') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D27 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d27LagnaInterp + '<br><br>';

        const marsD27 = dPositions.find(p => p.id === 'Mars');
        const sunD27 = dPositions.find(p => p.id === 'Sun');
        const satD27 = dPositions.find(p => p.id === 'Saturn');
        if (marsD27) {
            const mH = ((marsD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♂ Mars (Energie) → ' + mH + 'th:</strong> ') + ([,'Starker Körperbau und Wille!','Kann durch körperliche Stärke verdienen','Mut und Abenteuerlust stark','Heimtraining-Typ','Sporttalent!','Immunität zur Krankheitsüberwindung','Sport mit dem Partner','Überlebenskraft in der Krise','Stark in Abenteuer/Erkundung','Körperliche Stärke für die Karriere','Zielerreichungsenergie','Körperliche Aktivität im Ausland'][mH] || '') + '<br>';
        }
        if (sunD27) {
            const sH = ((sunD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☉ Sonne (Vitalität) → ' + sH + 'th:</strong> ') + (isEasy ? 'Quelle der Vitalität: ' : 'Vitalitätsquelle im ' + sH + '. Haus-Bereich. ') + ([,'Energie aus dem Selbst','Vitalität aus Wohlstandsaktivitäten','Energie aus Kommunikation','Stabilität vom Zuhause','Vitalität aus Schöpfung','Energie aus Dienst','Vitalität aus Beziehungen','Energie aus Transformation','Vitalität aus Reisen','Energie aus der Karriere','Vitalität aus der Gesellschaft','Energie aus spiritueller Praxis'][sH] || '') + '<br>';
        }

        // D27 6 house (약점/질병) 분석
        const d27_6sign = (dLagnaSign + 5) % 12;
        const d27_6planets = dPositions.filter(p => p.dSign === d27_6sign);
        html += '<br><strong>' + (isEasy ? 'Schwäche:' : 'D27 6. Haus (Schwäche/Verwundbarkeit) — ' + SIGNS[d27_6sign] + ':') + '</strong><br>';
        const bodyParts = ['Kopf/Gehirn','Nacken/Schilddrüse','Lungen/Arme','Magen/Brust','Herz/Rücken','Verdauung/Darm','Nieren/Unterer Rücken','Fortpflanzung','Leber/Oberschenkel','Knochen/Gelenke','Knöchel/Kreislauf','Füße/Immunsystem'];
        html += 'Verwundbarer Bereich: <strong>' + bodyParts[d27_6sign] + '</strong> — achte auf diesen Bereich.<br>';
        if (d27_6planets.length > 0) {
            d27_6planets.forEach(p => { html += isEasy ? 'Besondere Aufmerksamkeit für diesen Bereich nötig.<br>' : '• ' + p.name + ' im 6. Haus — besondere Aufmerksamkeit für diesen Bereich nötig.<br>'; });
        }
        html += '</div></div>';

    } else if (division === 30) {
        // D30 Trimshamsha — 불행·질병·장애
        const d30LagnaInterp = ['Unfälle, Verbrennungen, Kopfschmerzen. Probleme durch hastige Entscheidungen. Wut managen.','Finanzieller Verlust, Ernährungsprobleme, Schilddrüse. Vorsicht vor Überessen.','Nervöse Angst, Schlaflosigkeit, Atemprobleme. Übermäßige Sorge vermeiden.','Emotionale Instabilität, Magenprobleme, Wasserprobleme. Emotionen kontrollieren.','Herzprobleme, Stolzverletzung, Überarbeitung. Braucht Demut und Ruhe.','Verdauungsstörungen, Allergien, Perfektionismus-Stress. Braucht Entspannung.','Nierenprobleme, Beziehungskonflikte, Unentschlossenheit. Braucht Entschlossenheit.','Geheimnisse, Unfälle, Operationen, sexuelle Probleme. Regelmäßige Untersuchungen wichtig.','Leberprobleme, Übergewicht, Glücksspiel/Überausgaben. Braucht Mäßigung.','Gelenk-, Knochen-, Depressions-, Einsamkeitsprobleme. Braucht Kalzium und soziale Interaktion.','Blutdruck, Kreislauf, unerwartete Unfälle. Regelmäßige Gesundheitschecks.','Immunschwäche, Sucht, psychische Gesundheit. Braucht Meditation und Schlaf.'][dLagnaSign];

        const d30_6sign = (dLagnaSign + 5) % 12;
        const d30_8sign = (dLagnaSign + 7) % 12;
        const d30_12sign = (dLagnaSign + 11) % 12;
        const d30_6planets = dPositions.filter(p => p.dSign === d30_6sign);
        const d30_8planets = dPositions.filter(p => p.dSign === d30_8sign);
        const d30_12planets = dPositions.filter(p => p.dSign === d30_12sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '⚠️ Gesundheitswarnungsdetails' : '⚠️ D30 Trimshamsha — Krankheit') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D30 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d30LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Krankheitswarnung:' : 'D30 6. Haus (Krankheit/Feind) — ' + SIGNS[d30_6sign] + ':') + '</strong><br>';
        const diseaseBySign = ['Kopfschmerz, Fieber, Entzündung','Nacken, Schilddrüse, Diabetes','Lungen, Nerven, Angst','Magen, Wassereinlagerung','Herz, Rücken, Blutdruck','Verdauung, Darm, Haut','Nieren, unterer Rücken, Harnwege','Reproduktiv, chronische Beschwerden','Leber, Oberschenkel, Übergewicht','Knochen, Gelenke, Rheuma','Kreislauf, Blutdruck, Knöchel','Immunsystem, Füße, psychische Gesundheit'];
        html += 'Achte auf: <strong>' + diseaseBySign[d30_6sign] + '</strong><br>';
        if (d30_6planets.length > 0) {
            const dis = {Sun:'Achte auf Augen- und Herzerkrankungen',Moon:'Psychische Gesundheit und Wassereinlagerungen',Mars:'Vorsicht vor Unfällen, Operationen, Verbrennungen',Mercury:'Nervensystem und Hautprobleme',Jupiter:'Achte auf Leber und Übergewicht',Venus:'Achte auf Niere, Diabetes, STD',Saturn:'Chronische Krankheit, Gelenkprobleme',Rahu:'Krankheit unbekannter Ursache, Sucht',Ketu:'Geschwächte Immunität, Allergie'};
            d30_6planets.forEach(p => { html += isEasy ? (dis[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (dis[p.id]||'') + '<br>'; });
        }

        html += '<br><strong>' + (isEasy ? 'Gefahr/Operation:' : 'D30 8. Haus (Gefahr/Operation) — ' + SIGNS[d30_8sign] + ':') + '</strong><br>';
        if (d30_8planets.length > 0) {
            d30_8planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Gefahr/Unfall-Warnung. Versicherung wichtig.' : 'Geschützt in der Krise.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Gefahr/Unfall-Warnung. Versicherung wichtig.' : 'Geschützt in der Krise.') + '<br>'; });
        } else html += isEasy ? 'Wenige große Gefahren.<br>' : '8. Haus leer — wenige große Gefahren.<br>';

        html += '<br><strong>' + (isEasy ? 'Krankenhausaufenthalt:' : 'D30 12. Haus (Krankenhausaufenthalt/Verlust) — ' + SIGNS[d30_12sign] + ':') + '</strong><br>';
        if (d30_12planets.length > 0) {
            d30_12planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Krankenhausaufenthalt möglich.' : 'Spirituelle Heilung und Genesung.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Krankenhausaufenthalt möglich. Ausländische Medizin.' : 'Spirituelle Heilung und Genesung.') + '<br>'; });
        } else html += isEasy ? 'Geringes Krankenhausrisiko.<br>' : '12. Haus leer — Krankenhausrisiko ist gering.<br>';
        html += '</div></div>';

    } else if (division === 40) {
        // D40 Khavedamsha — 모계 유산
        const d40LagnaInterp = ['Unabhängige, willensstarke Mutter. Führung von der mütterlichen Linie geerbt.','Mutter verwaltet Wohlstand gut. Materielle Fülle von der mütterlichen Linie.','Intellektuelle Mutter mit guter Kommunikation. Sprach-/Bildungstalent geerbt.','Sehr tiefe Bindung zur Mutter. Sensibilität und Intuition geerbt.','Mutter hat Autorität und Würde. Führung und Ehre geerbt.','Mutter exzellent in Gesundheitsmanagement. Analytischer/Servicegeist geerbt.','Attraktive, diplomatische Mutter. Kunstsinn geerbt.','Starke Mutter, die Transformation durchlief. Resilienz geerbt.','Bildungsorientierte, religiöse Mutter. Weisheit/Philosophie geerbt.','Verantwortungsvolle, strenge Mutter. Geduld und Disziplin geerbt.','Einzigartige, progressive Mutter. Innovatives Denken geerbt.','Spirituelle, intuitive Mutter. Kunst/Spiritualität geerbt.'][dLagnaSign];

        const d40_4sign = (dLagnaSign + 3) % 12;
        const d40_4planets = dPositions.filter(p => p.dSign === d40_4sign);
        const moonD40 = dPositions.find(p => p.id === 'Moon');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👩 Mütterliches Erbe' : '👩 D40 Khavedamsha — Mütterliches Erbe') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D40 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d40LagnaInterp + '<br><br>';

        if (moonD40) {
            const mH = ((moonD40.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☽ Mond (Mutter-Karaka):</strong> ';
            html += [,'Mutter hat starken Einfluss','Wohlstand von der Mutter','Gute Kommunikation mit der Mutter','Tiefe Bindung zur Mutter! Beste Platzierung','Mutter ist kreativ','Mutter ist serviceorientiert','Mutter beeinflusst Beziehungen','Erbschaft von der Mutter','Mutter ist religiös/bildungsorientiert','Mutter hat sozialen Status','Mutter ist unabhängig','Mutter ist spirituell'][mH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Mütterliche Familie:' : 'D40 4. Haus (mütterliches Zuhause) — ' + SIGNS[d40_4sign] + ':') + '</strong><br>';
        if (d40_4planets.length > 0) {
            d40_4planets.forEach(p => { html += isEasy ? 'Stark geerbte Energie von mütterlicher Seite.<br>' : '• ' + p.name + ': Die Energie dieses Planeten wird stark von mütterlicher Seite vererbt.<br>'; });
        } else html += isEasy ? 'Stabiles Erbe von mütterlicher Seite.<br>' : '4. Haus leer — Position des 4. Herrschers ist der Schlüssel zum mütterlichen Erbe.<br>';
        html += '</div></div>';

    } else if (division === 45) {
        // D45 Akshavedamsha — 부계 유산
        const d45LagnaInterp = ['Aktiver, handlungsorientierter Vater. Mut und Führung geerbt.','Finanziell stabiler Vater. Materielle Werte geerbt.','Intellektueller, vielseitiger Vater. Kommunikations-/Geschäftsfähigkeit geerbt.','Emotionaler, familienorientierter Vater. Fürsorgeinstinkt geerbt.','Autoritärer, respektierter Vater. Führung geerbt.','Praktischer, fleißiger Vater. Analytische/technische Fähigkeiten geerbt.','Diplomatischer, raffinierter Vater. Soziale Fähigkeit geerbt.','Starker, mysteriöser Vater. Resilienz/Einsicht geerbt.','Gelehrter, religiöser Vater. Philosophie/Moral geerbt.','Strenger, ehrgeiziger Vater. Geduld/Disziplin geerbt.','Kreativer, innovativer Vater. Technisches/wissenschaftliches Denken geerbt.','Spiritueller, künstlerischer Vater. Intuition/Kreativität geerbt.'][dLagnaSign];

        const d45_9sign = (dLagnaSign + 8) % 12;
        const d45_9planets = dPositions.filter(p => p.dSign === d45_9sign);
        const sunD45 = dPositions.find(p => p.id === 'Sun');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨 Väterliches Erbe' : '👨 D45 Akshavedamsha — Väterliches Erbe') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D45 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d45LagnaInterp + '<br><br>';

        if (sunD45) {
            const sH = ((sunD45.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☉ Sonne (Vater-Karaka):</strong> ';
            html += [,'Vater hat starken Einfluss','Wohlstand vom Vater','Gute Kommunikation mit dem Vater','Vater ist familienorientiert','Vater ist kreativ','Vater ist serviceorientiert','Vater beeinflusst Beziehungen','Erbschaft vom Vater','Vater ist religiös/bildungsorientiert','Vater hat Erfolg in der Gesellschaft! Beste Platzierung','Vater ist unabhängig','Vater ist spirituell'][sH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Väterliche Familie:' : 'D45 9. Haus (väterliches Zuhause/Vater) — ' + SIGNS[d45_9sign] + ':') + '</strong><br>';
        if (d45_9planets.length > 0) {
            d45_9planets.forEach(p => { html += isEasy ? 'Stark geerbte Energie von väterlicher Seite.<br>' : '• ' + p.name + ': Die Energie dieses Planeten wird stark von väterlicher Seite vererbt.<br>'; });
        } else html += isEasy ? 'Stabiles Erbe von väterlicher Seite.<br>' : '9. Haus leer — Position des 9. Herrschers ist der Schlüssel zum väterlichen Erbe.<br>';
        html += '</div></div>';
    }

    interpEl.innerHTML = html;
}

