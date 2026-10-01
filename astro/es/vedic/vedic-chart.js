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
        catGuide: e ? 'Glosario' : 'Guía para principiantes de Astrología Védica',
        catBasic: e ? 'Mis Posiciones Planetarias' : 'Carta Básica — Posiciones Planetarias & Carta Natal',
        catDasha: e ? 'Mis Períodos de Vida' : 'Dasha — Análisis de Períodos de Vida',
        catInterp: e ? 'Mi Lectura — Personalidad·Riqueza·Carrera·Salud' : 'Interpretación — Personalidad·Riqueza·Carrera·Salud·Yoga',
        catMarriage: e ? 'Detalles de Mi Pareja' : 'Matrimonio y Pareja — D9 Navamsha',
        catCareer: e ? 'Mi Carrera·Riqueza' : 'Carrera y Riqueza — D10·D2·D4',
        catFamily: e ? 'Mi Familia' : 'Familia — D7·D3·D12·D40·D45',
        catSpirit: e ? 'Espiritualidad·Educación·Salud' : 'Espiritualidad·Educación·Salud — D20·D24·D27·D16',
        catWarn: e ? 'Precauciones de Salud' : 'Precauciones — D30 Enfermedad·Extranjero',
        catKarma: e ? 'Karma de Vidas Pasadas' : 'Karma — D60 Vidas Pasadas·Karma'
    };
    for (var id in ids) { var el = document.getElementById(id); if (el) el.textContent = ids[id]; }

    var secs = {
        secPlanetHouse: e ? 'Cómo Te Afecta Cada Planeta' : 'Análisis Planeta-en-Casa',
        secDignity: e ? 'Tus Fortalezas y Debilidades' : 'Dignidad Planetaria (Exaltación·Debilitación·Domicilio)',
        secLucky: e ? 'Info de Suerte' : 'Información de Suerte',
        secRemedy: e ? 'Formas de Mejorar Tu Suerte' : 'Remedios y Fortalecimiento',
        secD10: e ? 'Detalles de Carrera' : 'D10 Dashamsha (Carrera)',
        secD2: e ? 'Detalles de Riqueza' : 'D2 Hora (Riqueza)',
        secD4: e ? 'Propiedades e Inmuebles' : 'D4 Chaturthamsha (Propiedades)',
        secD7: e ? 'Hijos' : 'D7 Saptamsha (Hijos)',
        secD3: e ? 'Hermanos y Coraje' : 'D3 Drekkana (Hermanos)',
        secD12: e ? 'Padres' : 'D12 Dwadashamsha (Padres)',
        secD40: e ? 'Herencia Materna' : 'D40 Khavedamsha (Materna)',
        secD45: e ? 'Herencia Paterna' : 'D45 Akshavedamsha (Paterna)',
        secD24: e ? 'Educación' : 'D24 Chaturvimshamsha (Educación)',
        secD20: e ? 'Espiritualidad' : 'D20 Vimshamsha (Espiritualidad)',
        secD27: e ? 'Fuerza Física' : 'D27 Saptavimshamsha (Fuerza)',
        secD16: e ? 'Vehículos y Confort' : 'D16 Shodashamsha (Vehículos)',
        secD30: e ? 'Detalles Precaución de Salud' : 'D30 Trimshamsha (Enfermedad)',
        secForeign: e ? 'Extranjero e Inmigración' : 'Extranjero e Inmigración (Casa 9·12)'
    };
    for (var sid in secs) { var sel = document.getElementById(sid); if (sel) sel.textContent = secs[sid]; }
}
function renderEasyMode(positions, lagnaSign, moonPos) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    var html = '';
    // Personality
    var personality = ['¡Orientado a la acción! Decisiones rápidas con cualidades de liderazgo. Ama los nuevos desafíos.','Ama la estabilidad. Disfruta la comodidad y la belleza. Una vez decidido, lo cumple.','¡Curiosidad infinita! Gran comunicador y multitalentoso.','Cálido y emocional. Valora la familia y lee bien a las personas.','¡Líder nato! Gran presencia con talento creativo.','Detallista y analítico. Busca la perfección y cuida la salud.','Busca la armonía. Refinado, encantador, con excelente sentido artístico.','Tiene profundidad. Fuerte intuición que ve la verdad.','¡Espíritu libre! Ama viajar y aprender, muy positivo.','Ambicioso. Paciente y más atractivo con la edad.','Único. Piensa diferente a todos, innovador.','Profundamente sensible. Fuerte intuición atraída por el arte y la espiritualidad.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">👤 Mi Personalidad</div><div class="interp-text">' + personality + '</div></div>';

    // Emotions
    if (moonPos) {
        var emotion = ['Una pasión ardiente arde dentro de ti. Las emociones suben rápido y bajan rápido. Cuando estás estresado, necesitas mover el cuerpo. Ejercicio y actividades al aire libre funcionan mejor.','Emocionalmente muy estable. No le gustan los cambios repentinos, encuentra seguridad en lo familiar. Buena comida, música y naturaleza sanan tu alma.','Procesa las emociones racionalmente. Hablar ayuda a organizar los sentimientos. Curioso por muchas cosas a la vez, no soporta el aburrimiento.','Extremadamente sensible. Absorbe las emociones de otros como esponja. Tu hogar es tu espacio seguro con fuerte vínculo con la madre.','Expresión emocional dramática y apasionada. Necesita profundamente amor y reconocimiento. Las actividades creativas son tu medicina emocional.','Tiende a analizar y organizar emociones. Se preocupa mucho pero excelente en soluciones prácticas. Las rutinas diarias traen estabilidad emocional.','Encuentra equilibrio emocional en las relaciones. Se siente solo/a estando solo/a, se estabiliza con pareja o amigos cercanos. El arte y la belleza traen paz.','Las emociones son tan profundas e intensas como el océano. Ama profundamente y nunca olvida la traición. Intuición increíblemente fuerte.','Emocionalmente brillante y optimista. Ama la libertad y odia las restricciones. Viajar es el mejor remedio emocional.','No muestra emociones fácilmente. Fuerte sentido de responsabilidad. Se vuelve más abierto emocionalmente con la edad.','Patrones emocionales únicos e impredecibles. Ama de maneras no convencionales. Encuentra satisfacción emocional en causas sociales.','Extremadamente intuitivo y espiritual. Los sueños son vívidos y a veces proféticos. Arte, meditación y agua traen paz.'][moonPos.sign];
        html += '<div class="interp-card"><div class="interp-title">🌙 Mi Estilo Emocional</div><div class="interp-text">' + emotion + '</div></div>';
    }

    // Wealth
    var wealth = ['Tipo autodidacta. Estilo de inversión agresivo, mejor para autoempleo o freelance. Puede ganar rápido pero cuidado con inversiones impulsivas.','Acumula riqueza de forma constante. Ingresos probables de bienes raíces, arte, alimentación. El equilibrio en gastos es clave. El hábito del ahorro es tu mejor arma.','Gana a través de habilidades intelectuales. Ingresos de escritura, educación, TI, marketing. Múltiples fuentes de ingreso te van bien.','La riqueza tiende a llegar a través del hogar y la familia. Puede heredar de la madre o ganar por bienes raíces/alimentación. Cuidado con gastos emocionales.','Gana a través del liderazgo y la autoridad. La riqueza sigue a posiciones altas. Conectado al gobierno y el oro. Tu dignidad atrae riqueza.','Gana a través del análisis y habilidades profesionales. Ingresos estables de campos médicos, contables, de servicio. Estilo de gerente frugal.','Gana a través de asociaciones. Mejor fortuna con otros. Ingresos de derecho, diplomacia, moda, arte. La pareja puede traer riqueza.','Acumula a través de recursos de otros — herencia, seguros, inversiones. Inversiones conjuntas conectadas. Puede proteger riqueza en crisis.','La fortuna sigue a tu riqueza. Ingresos de educación, extranjero, filosofía. La suerte inesperada trae riqueza. La mentalidad positiva atrae fortuna.','Acumula lenta pero seguramente. Dificultades financieras al inicio pero riqueza estable después de la mediana edad. La paciencia es la mejor estrategia de inversión.','Gana a través de tecnología, innovación, redes sociales. Métodos de ingreso no convencionales. TI, ciencia, movimientos sociales conectados.','Gana a través de arte o actividades espirituales. Conexiones de riqueza extranjera. Interesado en caridad. La riqueza espiritual paradójicamente atrae riqueza.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">💰 Mi Riqueza</div><div class="interp-text">' + wealth + '</div></div>';

    // Spouse
    var spouse = ['Tu pareja es enérgica e independiente. Activa y directa, apasionada por su trabajo. No es del tipo que sigue en silencio — una pareja que desafía junto a ti. Puede ser algo impaciente, pero la relación será igualmente apasionada.','Tu pareja es hermosa y sensual. Disfruta las cosas finas, estable y leal. Puede tener talento en cocina o arte. Cómoda compañía. Probablemente estable materialmente.','Tu pareja es elocuente e ingeniosa. La gran conversación es su mayor encanto, con excelente humor. Una pareja intelectual y versátil con quien compartir muchos intereses.','Tu pareja es cálida y orientada a la familia. Excelentes habilidades de cuidado. Estar juntos se siente como estar en casa. Desea vínculos emocionales profundos y valora la familia sobre todo.','Tu pareja es carismática y digna. Puede ocupar una posición socialmente prominente. Alta autoestima pero igualmente generosa. Estar juntos te hace sentir especial.','Tu pareja es meticulosa y práctica. Interesada en salud y bienestar. Un tipo cuidadoso que presta atención a los detalles. Puede ser perfeccionista pero confiable.','Tu pareja es encantadora y refinada. Diplomática con buen sentido del equilibrio, excelente gusto artístico. Estar juntos hace el mundo más bello.','Tu pareja es intensa y misteriosa. Emociones profundas — una vez comprometida, va hasta el final. Puede tener muchos secretos pero desea conexión profunda. Una atracción intensa y predestinada.','Tu pareja es libre y optimista. Puede ser de otra cultura o conectada con tierras extranjeras. Filosófica y aventurera. Quiere libertad incluso después del matrimonio.','Tu pareja es seria y ambiciosa. Fuerte sentido de responsabilidad, probablemente exitosa socialmente. Puede haber diferencia de edad. El matrimonio puede llegar tarde pero dura mucho.','Tu pareja es única e independiente. Puede conocerse de formas no convencionales. Intelectual con pensamiento innovador. Prefiere una relación libre, tipo amistad.','Tu pareja es espiritual e intuitiva. Conectada con un artista o practicante espiritual. Da un sentimiento soñador y romántico. Puede necesitar ajustar expectativas realistas.'][(lagnaSign+6)%12];
    // 7 house 행성 추가 정보
    var h7p = positions.filter(function(p){return houseOf(p.sign)===7;});
    var spouseExtra = '';
    h7p.forEach(function(p) {
        var desc = {Sun:'Una pareja con alto estatus social.',Moon:'Una pareja emocional y cariñosa.',Mars:'Apasionada pero posibles discusiones. Pareja fuerte.',Mercury:'Una pareja intelectual con gran conversación.',Jupiter:'¡Una pareja sabia y moral! La mejor fortuna matrimonial.',Venus:'Una pareja muy atractiva y amorosa.',Saturn:'Matrimonio tardío pero relación duradera. Posible diferencia de edad.',Rahu:'Matrimonio no convencional. Posible pareja extranjera.',Ketu:'Conexión de vidas pasadas. Una pareja con fuerte vínculo espiritual.'};
        if (desc[p.id]) spouseExtra += '<br>✦ ' + desc[p.id];
    });
    html += '<div class="interp-card"><div class="interp-title">💍 Mi Pareja</div><div class="interp-text">' + spouse + spouseExtra + '</div></div>';

    // Career
    var career = ['Carreras de liderazgo. Militar, policía, deportes, cirugía, gestión empresarial. El autoempleo va bien.','Finanzas, alimentación, bienes raíces, moda, arte. Destaca en entornos sensuales y estables. Talento natural con el dinero.','Carreras de comunicación e intelectuales. Medios, escritura, educación, TI, marketing. Cambia el mundo con palabras.','Profesiones de cuidado. Médica, enfermería, hostelería, cocina, consejería. Destaca en trabajo emocionalmente conectado.','Carreras de escenario. Política, entretenimiento, gestión, gobierno. Posiciones creativas y autoritarias son tu vocación.','Carreras de análisis y precisión. Médica, contabilidad, consultoría, gestión de salud. La observación detallada es tu fortaleza.','Carreras de armonía y belleza. Derecho, diplomacia, moda, interiorismo, consejería. Talento para conectar personas.','Carreras de investigación profunda. Investigación, seguros, medicina, psicología, impuestos. Talento para manejar secretos.','Carreras de aprendizaje y exploración. Educación, derecho, religión, editorial, viajes. Profundas conexiones extranjeras.','Carreras de sistema y organización. Gestión, función pública, arquitectura. Éxito lento pero seguro. Alta posición social.','Carreras de innovación y tecnología. TI, ciencia, aviación, trabajo social. Cambia el mundo de formas que nadie pensó.','Carreras de arte y espiritualidad. Arte, cine, música, médica, extranjero, ONG. Encuentra significado en sanar el mundo.'][(lagnaSign+9)%12];
    html += '<div class="interp-card"><div class="interp-title">💼 Mi Carrera</div><div class="interp-text">' + career + '</div></div>';

    // Health
    var health = ['Cabeza y cara son puntos débiles. Dolores de cabeza y fiebres comunes. Ejercicio regular y mantente hidratado. Cuidado con accidentes.','Cuello y tiroides son débiles. Tendencia a comer en exceso — cuidado con peso y diabetes. Buena comida con moderación. Caminatas en la naturaleza son lo mejor.','Pulmones, brazos, hombros, sistema nervioso. Ansiedad y problemas de sueño posibles. La meditación respiratoria ayuda. Mantén rutina de sueño.','Zona de estómago y pecho. El estrés emocional afecta directamente la digestión. Comida caliente y té ayudan. Tiempo cerca del agua sana.','Corazón, espalda, columna vertebral. Cuidado con el exceso de trabajo. Ejercicio cardiovascular regular. Descansa suficiente. Manejar el orgullo reduce el estrés.','Sistema digestivo, intestinos, piel. Indigestión y alergias posibles. La dieta es crucial. Yoga y meditación ayudan.','Riñones, espalda baja, piel. Mantente hidratado y equilibrado. Reduce el azúcar. La piel refleja el estrés — paz interior igual a salud de la piel.','Sistemas reproductivo y excretor. Condiciones crónicas posibles. Chequeos regulares importantes. Respiración profunda y meditación ayudan.','Hígado, muslos, caderas. Cuidado con el peso. Actividades al aire libre son lo mejor. Reduce tiempo sentado. Viajar al extranjero sana cuerpo y mente.','Huesos, articulaciones, rodillas, piel. Cuidado con el reumatismo. Calcio y vitamina D importantes. Estiramiento se vuelve más atractivo con la edad.','Tobillos, pantorrillas, sistema circulatorio. Control de presión arterial importante. Camina regularmente. Revisa síntomas inusuales.','Pies, linfático, sistema inmune. El sueño adecuado es tu secreto de salud más poderoso. Agua, meditación, yoga fortalecen la inmunidad. Sensible al alcohol.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">🏥 Mi Salud</div><div class="interp-text">' + health + '</div></div>';

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
                    var dashaDesc = {Ketu:'Un período de crecimiento espiritual. Enfócate en tu interior sobre lo material.',Venus:'¡Un tiempo de amor y abundancia! Romance, matrimonio y arte florecen.',Sun:'Un tiempo de autodescubrimiento y liderazgo. La confianza crece fuerte.',Moon:'Un tiempo de emociones y hogar. Las relaciones familiares se vuelven importantes.',Mars:'Un tiempo de acción y energía. Excelente para comenzar cosas nuevas.',Rahu:'Un tiempo de cambio e innovación. Surgen oportunidades inesperadas.',Jupiter:'¡Un tiempo de suerte y crecimiento! Muchas cosas buenas en educación, matrimonio, ascenso.',Saturn:'Un tiempo de paciencia y pruebas. Crecimiento lento pero seguro.',Mercury:'Un tiempo de actividad intelectual. Favorable para estudio, negocios, comunicación.'};
                    html += '<div class="interp-card"><div class="interp-title">⏳ Mi Período Actual</div><div class="interp-text">Período actual: <strong style="color:#c9a84c;">' + DASHA_KO[planet] + '</strong>.<br><br>' + (dashaDesc[planet]||'') + '</div></div>';
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
const SIGNS = ['Aries','Tauro','Géminis','Cáncer','Leo','Virgo',
               'Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'];
const SIGNS_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

// Planets
const PLANETS = [
    { id: 'Sun', name: 'Sol', symbol: '☉', natural: 'malefic' },
    { id: 'Moon', name: 'Luna', symbol: '☽', natural: 'benefic' },
    { id: 'Mars', name: 'Marte', symbol: '♂', natural: 'malefic' },
    { id: 'Mercury', name: 'Mercurio', symbol: '☿', natural: 'neutral' },
    { id: 'Jupiter', name: 'Júpiter', symbol: '♃', natural: 'benefic' },
    { id: 'Venus', name: 'Venus', symbol: '♀', natural: 'benefic' },
    { id: 'Saturn', name: 'Saturno', symbol: '♄', natural: 'malefic' },
];

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', ko: 'Ashwini', ruler: 'Ketu', meaning: 'Gemelos Caballo', deity: 'Ashwini Kumaras', desc: 'Energía de sanación y nuevos comienzos. Una persona con acción rápida y habilidades curativas.' },
    { name: 'Bharani', ko: 'Bharani', ruler: 'Venus', meaning: 'La Portadora', deity: 'Yama', desc: 'El ciclo de vida y muerte. Fuerte paciencia y el poder de liderar el cambio.' },
    { name: 'Krittika', ko: 'Krittika', ruler: 'Sun', meaning: 'El Cortador', deity: 'Agni', desc: 'El poder del fuego y la purificación. Intelecto agudo y decisión.' },
    { name: 'Rohini', ko: 'Rohini', ruler: 'Moon', meaning: 'La Estrella Roja', deity: 'Brahma', desc: 'La estrella de la abundancia y la belleza. Una personalidad creativa y encantadora.' },
    { name: 'Mrigashira', ko: 'Mrigashira', ruler: 'Mars', meaning: 'Cabeza de Ciervo', deity: 'Soma', desc: 'La estrella de la exploración y la curiosidad. Un viajero incansable buscando la verdad.' },
    { name: 'Ardra', ko: 'Ardra', ruler: 'Rahu', meaning: 'Lágrima', deity: 'Rudra', desc: 'Renacimiento a través de la tormenta y destrucción. Emociones intensas y poder transformador.' },
    { name: 'Punarvasu', ko: 'Punarvasu', ruler: 'Jupiter', meaning: 'Retorno de la Luz', deity: 'Aditi', desc: 'La estrella de la recuperación y el retorno. Una personalidad optimista y sabia.' },
    { name: 'Pushya', ko: 'Pushya', ruler: 'Saturn', meaning: 'El Nutridor', deity: 'Brihaspati', desc: 'El nakshatra más auspicioso. Energía de nutrición, protección y prosperidad.' },
    { name: 'Ashlesha', ko: 'Ashlesha', ruler: 'Mercury', meaning: 'El Entrelazador', deity: 'Nagas', desc: 'Sabiduría de la serpiente y misterio. Perspicacia e intuición profunda.' },
    { name: 'Magha', ko: 'Magha', ruler: 'Ketu', meaning: 'El Grande', deity: 'Pitris', desc: 'La estrella de la realeza. Autoridad, respeto y bendiciones ancestrales.' },
    { name: 'Purva Phalguni', ko: 'Purva Phalguni', ruler: 'Venus', meaning: 'Fruto Anterior', deity: 'Bhaga', desc: 'La estrella de la alegría y el amor. Sentido artístico y romance.' },
    { name: 'Uttara Phalguni', ko: 'Uttara Phalguni', ruler: 'Sun', meaning: 'Fruto Posterior', deity: 'Aryaman', desc: 'La estrella de la amistad y los contratos. Confianza y devoción.' },
    { name: 'Hasta', ko: 'Hasta', ruler: 'Moon', meaning: 'La Mano', deity: 'Savitar', desc: 'La estrella de la artesanía y la habilidad. Manos sanadoras, el artista.' },
    { name: 'Chitra', ko: 'Chitra', ruler: 'Mars', meaning: 'Joya Brillante', deity: 'Vishwakarma', desc: 'La estrella de la belleza y la creación. Sentido estético excepcional.' },
    { name: 'Swati', ko: 'Swati', ruler: 'Rahu', meaning: 'El Independiente', deity: 'Vayu', desc: 'La libertad del viento. Una personalidad independiente y flexible.' },
    { name: 'Vishakha', ko: 'Vishakha', ruler: 'Jupiter', meaning: 'El Bifurcado', deity: 'Indra-Agni', desc: 'La estrella de las metas y la determinación. Fuerte enfoque y voluntad.' },
    { name: 'Anuradha', ko: 'Anuradha', ruler: 'Saturn', meaning: 'Siguiendo a Radha', deity: 'Mitra', desc: 'La estrella de la amistad y la devoción. Habilidades organizativas y liderazgo.' },
    { name: 'Jyeshtha', ko: 'Jyeshtha', ruler: 'Mercury', meaning: 'El Mayor', deity: 'Indra', desc: 'La estrella de la protección y la autoridad. Fuerte sentido de responsabilidad.' },
    { name: 'Mula', ko: 'Mula', ruler: 'Ketu', meaning: 'La Raíz', deity: 'Nirriti', desc: 'La estrella de la destrucción y reconstrucción. Quien busca la raíz de la verdad.' },
    { name: 'Purva Ashadha', ko: 'Purva Ashadha', ruler: 'Venus', meaning: 'Anterior Invencible', deity: 'Apas', desc: 'El poder del agua y la purificación. Energía victoriosa oculta.' },
    { name: 'Uttara Ashadha', ko: 'Uttara Ashadha', ruler: 'Sun', meaning: 'Posterior Invencible', deity: 'Vishvedevas', desc: 'La estrella de la victoria definitiva. Paciencia y liderazgo.' },
    { name: 'Shravana', ko: 'Shravana', ruler: 'Moon', meaning: 'El Oyente', deity: 'Vishnu', desc: 'La estrella del conocimiento y la escucha. Un maestro del aprendizaje y la comunicación.' },
    { name: 'Dhanishta', ko: 'Dhanishta', ruler: 'Mars', meaning: 'El Más Rico', deity: 'Vasus', desc: 'La estrella de la abundancia y la música. Talento y prosperidad.' },
    { name: 'Shatabhisha', ko: 'Shatabhisha', ruler: 'Rahu', meaning: 'Cien Sanadores', deity: 'Varuna', desc: 'La estrella de los secretos y la sanación. Habilidades sanadoras misteriosas.' },
    { name: 'Purva Bhadrapada', ko: 'Purva Bhadrapada', ruler: 'Jupiter', meaning: 'Pies Afortunados Anteriores', deity: 'Aja Ekapada', desc: 'La estrella del fuego y la transformación. Despertar espiritual.' },
    { name: 'Uttara Bhadrapada', ko: 'Uttara Bhadrapada', ruler: 'Saturn', meaning: 'Pies Afortunados Posteriores', deity: 'Ahir Budhnya', desc: 'Sabiduría del océano profundo. Meditación y profundidad espiritual.' },
    { name: 'Revati', ko: 'Revati', ruler: 'Mercury', meaning: 'El Próspero', deity: 'Pushan', desc: 'La estrella del viaje y la protección. La culminación de todas las cosas.' },
];

// Dasha periods (years)
const DASHA_YEARS = {
    'Ketu': 7, 'Venus': 20, 'Sun': 6, 'Moon': 10, 'Mars': 7,
    'Rahu': 18, 'Jupiter': 16, 'Saturn': 19, 'Mercury': 17
};
const DASHA_ORDER = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const DASHA_KO = {
    'Ketu': 'Ketu', 'Venus': 'Venus', 'Sun': 'Sol', 'Moon': 'Luna', 'Mars': 'Marte',
    'Rahu': 'Rahu', 'Jupiter': 'Júpiter', 'Saturn': 'Saturno', 'Mercury': 'Mercurio'
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
    html += '<th>Planeta</th><th>Signo</th><th>Grado</th><th>Nakshatra</th><th>Casa</th>';
    html += '</tr></thead><tbody>';

    // Add Lagna first with exact degree
    const lagnaDeg = lagnaSidereal % 30;
    const lagnaNakIdx = Math.floor(lagnaSidereal / (360/27));
    const lagnaNak = NAKSHATRAS[lagnaNakIdx] || {ko:'-'};
    html += `<tr><td>⬆ Lagna (Ascendente)</td><td>${SIGN_SYMBOLS[lagnaSign]} ${SIGNS[lagnaSign]}</td><td>${lagnaDeg.toFixed(1)}°</td><td>${lagnaNak.ko}</td><td>1</td></tr>`;

    positions.forEach(p => {
        const house = ((p.sign - lagnaSign + 12) % 12) + 1;
        const nak = NAKSHATRAS[p.nakshatra] || { ko: '-', name: '-' };
        const roleMap = { Sun:'Yo/Autoridad', Moon:'Emociones/Mente', Mars:'Energía/Coraje', Mercury:'Inteligencia/Comunicación', Jupiter:'Suerte/Sabiduría', Venus:'Amor/Encanto', Saturn:'Paciencia/Responsabilidad', Rahu:'Deseo/Innovación', Ketu:'Espiritualidad/Liberación' };
        const houseArea = ['','Yo','Dinero·Familia','Comunicación','Hogar','Hijos·Romance','Salud','Pareja','Transformación','Fortuna·Extranjero','Carrera','Ingresos','Espiritualidad'];
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
    const SIGN_RULERS = ['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
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
        'Liderazgo, militar, deportes, emprendimiento (pionero de fuego)',
        'Finanzas, agricultura, artes, bienes raíces, alimentación (estabilidad y material)',
        'Comunicación, medios, escritura, enseñanza, marketing (intelectual)',
        'Enfermería, cuidado, cocina, hostelería, consejería (cuidado emocional)',
        'Política, entretenimiento, liderazgo, creatividad (escenario brillante)',
        'Medicina, contabilidad, análisis, edición, salud/bienestar (servicio preciso)',
        'Derecho, diplomacia, diseño, moda, mediación (equilibrio y belleza)',
        'Investigación, medicina, ocultismo, psicología (profundidad y transformación)',
        'Educación, viajes, filosofía, religión, editorial (expansión y exploración)',
        'Gobierno, construcción, gestión, CEO, líder organizacional (sistema y autoridad)',
        'Tecnología, TI, invención, activismo social, ciencia (innovación)',
        'Artes, espiritualidad, sanación, música, caridad (trascendencia y servicio)'
    ];

    // 행성별 spouse career 경향
    const planetCareer = {
        Sun: 'Funcionario del gobierno, político, doctor, CEO — posiciones autoritarias',
        Moon: 'Enfermero/a, consejero/a, chef, hostelería — roles de cuidado/emocionales',
        Mars: 'Militar, policía, cirujano, ingeniero, atleta',
        Mercury: 'Escritor, profesor, programador, contador, comerciante',
        Jupiter: 'Profesor, juez, líder religioso, consultor, profesional senior',
        Venus: 'Diseñador, actor, músico, moda, industria de belleza',
        Saturn: 'Construcción, minería, agricultura, gestión, artesano',
        Rahu: 'TI, relacionado con el extranjero, carreras no convencionales, investigación',
        Ketu: 'Espiritualidad, medicina alternativa, investigación, asceta'
    };

    let html = '';

    // 1. D9 Lagna 분석 (결혼 후 본인)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🕉️ Tú Después del Matrimonio' : '🕉️ D9 Lagna — Tú Después del Matrimonio: ' + SIGNS[d9LagnaSign] + ' ' + SIGN_SYMBOLS[d9LagnaSign]}</div>
        <div class="interp-text">
            ${isEasy ? 'Esto revela tu verdadero yo después del matrimonio y en la segunda mitad de la vida (después de los 30).' : 'El Lagna Navamsa está en <strong>' + SIGNS[d9LagnaSign] + '</strong>. Esto revela tu verdadero yo después del matrimonio y en la segunda mitad de la vida (después de los 30).'}
            ${d9LagnaSign === d1LagnaSign ? (isEasy ? '<br><br><strong>¡Signo especial!</strong> Tu esencia permanece sin cambios después del matrimonio — el yo interior y exterior están alineados.' : '<br><br><strong>¡D1 y D9 Lagna en el mismo signo!</strong> Llamado <strong>Vargottama</strong> — muy poderoso. Tu esencia permanece sin cambios después del matrimonio.') : ''}
            ${d9H1Planets.length > 0 ? '<br><br>' + (isEasy ? 'Hay energías que influyen fuertemente en tu personalidad después del matrimonio.' : '<strong>Planetas en D9 1ª:</strong> ' + d9H1Planets.map(p => p.symbol + ' ' + p.name).join(', ') + ' — influyen fuertemente en tu personalidad después del matrimonio.') : ''}
        </div>
    </div>`;

    // 2. D9 7 house (spouse)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Carácter de la Pareja' : '💍 Casa 7 D9 — Carácter de la Pareja: ' + SIGNS[d9H7Sign] + ' ' + SIGN_SYMBOLS[d9H7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'encanto único') + ' cualidad en la pareja.' : 'La casa 7 Navamsa está en <strong>' + SIGNS[d9H7Sign] + '</strong>, regida por <strong>' + RULER_NAMES[d9H7Ruler] + '</strong>.<br><br>Esto revela la personalidad central de tu pareja. Pareja con energía ' + SIGNS[d9H7Sign] + ' — cualidades de ' + ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'encanto único') + '.'}
            ${d9H7Planets.length > 0 ? '<br><br>' + (isEasy ? d9H7Planets.map(p => p.natural === 'benefic' ? '¡Energía positiva! Recibes bendiciones de tu pareja.' : 'Energía desafiante — también oportunidades de crecimiento en el matrimonio.').join('<br>') : '<strong>Planetas en D9 7ª:</strong><br>' + d9H7Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${p.natural === 'benefic' ? '¡Benéfico! Bendiciones de tu pareja.' : 'Energía desafiante — también oportunidades de crecimiento en el matrimonio.'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 3. D9 10 house (본인의 Dharma/사명)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 Propósito de Vida' : '💼 Casa 10 D9 — Propósito de Vida (Dharma): ' + SIGNS[d9H10Sign] + ' ' + SIGN_SYMBOLS[d9H10Sign]}</div>
        <div class="interp-text">
            ${isEasy ? 'La verdadera vocación que persigues después de la madurez.' : 'La casa 10 Navamsa está en <strong>' + SIGNS[d9H10Sign] + '</strong>, regida por <strong>' + RULER_NAMES[d9H10Ruler] + '</strong>.<br><br>Mientras la casa 10 de D1 muestra tu carrera, la casa 10 de D9 revela tu <strong>propósito de vida mayor (Dharma)</strong>.'}<br><br>
            <strong>Dirección del propósito:</strong> ${careerBySgn[d9H10Sign]}
            ${d9H10Planets.length > 0 ? '<br><br>' + (isEasy ? d9H10Planets.map(p => planetCareer[p.id] || 'energía profesional única').join('<br>') : '<strong>Planetas en D9 10ª:</strong><br>' + d9H10Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${planetCareer[p.id] || 'energía profesional única'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 4. spouse의 career (파생하우스: D9 4 house = 7 house서 10번째)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👔 Carrera de la Pareja' : '👔 Carrera de la Pareja — Casa Derivada 10ª (D9 4ª): ' + SIGNS[d9H4Sign] + ' ' + SIGN_SYMBOLS[d9H4Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '<strong>Casa derivada:</strong> La 10ª desde la 7ª (pareja) = La casa 4 D9 muestra la carrera de la pareja.<br><br>La 4ª D9 está en <strong>' + SIGNS[d9H4Sign] + '</strong>, regida por <strong>' + RULER_NAMES[d9H4Ruler] + '</strong>.<br><br>'}
            <strong>Tendencia profesional de la pareja:</strong> ${careerBySgn[d9H4Sign]}
            ${d9H4Planets.length > 0 ? '<br><br>' + (isEasy ? d9H4Planets.map(p => `La pareja probablemente trabaja en ${planetCareer[p.id] || 'campo especializado'}`).join('<br>') : '<strong>Planetas en D9 4ª (10ª de la pareja):</strong><br>' + d9H4Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: La pareja probablemente trabaja en ${planetCareer[p.id] || 'campo especializado'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 5. 바르고타마 행성 체크
    const vargottamaPlanets = d9Positions.filter(p => p.sign === p.d9Sign);
    if (vargottamaPlanets.length > 0) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '⭐ Planetas Excepcionalmente Fuertes' : '⭐ Planetas Vargottama — Excepcionalmente Fuertes'}</div>
            <div class="interp-text">
                ${isEasy ? 'Estos planetas son excepcionalmente poderosos y actúan consistentemente durante toda la vida.' : 'Los planetas en el mismo signo en D1 y D9 se llaman <strong>Vargottama</strong>. Muy poderosos, actuando consistentemente durante toda la vida.'}<br><br>
                ${isEasy ? '¡Energía excepcionalmente fuerte que actúa consistentemente en tu vida!' : vargottamaPlanets.map(p => `<strong>${p.symbol} ${p.name}</strong>: En D1 y D9 en ${SIGNS[p.sign]} — ¡la energía de este planeta es excepcionalmente fuerte!`).join('<br>')}
            </div>
        </div>`;
    }

    // 6. spouse 방향 분석 (UL + A7 + D1 7 house + D9 7 house 종합)
    const DIRECTIONS = {
        0:'Este', 1:'Sur', 2:'Oeste', 3:'Norte',
        4:'Este', 5:'Sur', 6:'Oeste', 7:'Norte',
        8:'Este', 9:'Sur', 10:'Oeste', 11:'Norte'
    };
    const DIR_DETAIL = {
        0:'Este (Aries — fuego)',1:'Sur (Tauro — tierra)',2:'Oeste (Géminis — aire)',3:'Norte (Cáncer — agua)',
        4:'Este (Leo — fuego)',5:'Sur (Virgo — tierra)',6:'Oeste (Libra — aire)',7:'Norte (Escorpio — agua)',
        8:'Este (Sagitario — fuego)',9:'Sur (Capricornio — tierra)',10:'Oeste (Acuario — aire)',11:'Norte (Piscis — agua)'
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
        {name:'D1 7ª', sign: d1H7Sign, desc:'Casa de la pareja en carta natal'},
        {name:'D9 7ª', sign: d9H7Sign, desc:'Casa de la pareja en Navamsa'},
        {name:'Señor D9 7ª', sign: d9H7RulerSign, desc:'Donde va el señor de la 7ª D9'},
        {name:'D9 Venus', sign: venusD9Sign, desc:'Karaka de pareja en Navamsa'},
        {name:'Upapada (UL)', sign: ulSign, desc:'Arudha 12ª — trasfondo de la pareja'},
        {name:'Darapada (A7)', sign: a7Sign, desc:'Arudha 7ª — imagen social de la pareja'}
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
        <div class="interp-title">${isEasy ? '🧭 De Dónde Viene Tu Pareja' : '🧭 Dirección de la Pareja — Análisis de 6 Indicadores'}</div>
        <div class="interp-text">
            ${isEasy ? 'Análisis de qué dirección puede venir tu pareja.' : 'La astrología védica determina la dirección de la pareja combinando múltiples indicadores.'}<br><br>
            ${isEasy ? '' : '<strong>6 Indicadores:</strong><br>' + dirSources.map(s => `• <strong>${s.name}</strong>: ${SIGNS[s.sign]} ${SIGN_SYMBOLS[s.sign]} → <strong>${DIRECTIONS[s.sign]}</strong> <span style="color:#666;font-size:12px;">(${s.desc})</span>`).join('<br>') + '<br><br><strong>🧿 Upapada Lagna (UL):</strong> Arudha Pada de casa 12. Indica la familia/trasfondo de la pareja y ambiente matrimonial. → <strong>' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign] + '</strong><br><strong>🎯 Darapada (A7):</strong> Arudha Pada de casa 7. Indica la imagen social e impresión externa de la pareja. → <strong>' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign] + '</strong><br><strong>💍 Señor D9 7ª (' + RULER_NAMES[d9H7Ruler] + '):</strong> El signo donde va el regente de la casa 7 Navamsa indica la dirección real de la pareja. → <strong>' + SIGNS[d9H7RulerSign] + ' ' + SIGN_SYMBOLS[d9H7RulerSign] + '</strong><br><strong>♀ D9 Venus:</strong> Significador natural de la pareja. La posición de Venus en Navamsa muestra la fuente de energía de la pareja. → <strong>' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign] + '</strong><br><br>'}
            <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;margin-top:10px;">
                <strong style="font-size:16px;">🧭 Conclusión: ${agreement >= 4 ? 'Abrumadoramente fuerte' : agreement >= 3 ? 'Muy fuerte' : agreement >= 2 ? 'Fuerte' : ''} dirección ${primaryDir}</strong><br><br>
                De 6 indicadores, <strong>${agreement}</strong> apuntan a la dirección <strong>${primaryDir}</strong>.
                ${agreement >= 4 ? '<br>¡4+ indicadores coinciden! <strong>Muy alta probabilidad</strong> de dirección ' + primaryDir + '. Presta atención a ciudades, lugares de trabajo o viajes en esta dirección.' : ''}
                ${agreement === 3 ? '<br>3 indicadores — <strong>Alta probabilidad</strong> de dirección ' + primaryDir + '.' : ''}
                ${agreement === 2 ? '<br>2 indicadores — ' + primaryDir + ' favorecido pero existen otras posibilidades.' : ''}
                ${agreement <= 1 ? '<br>Indicadores dispersos — la pareja puede venir de varias direcciones. Mantén la mente abierta.' : ''}
                ${sortedDirs.length > 1 && sortedDirs[1][1] === sortedDirs[0][1] ? '<br><br>💡 Dos direcciones iguales: <strong>' + sortedDirs[0][0] + '</strong> y <strong>' + sortedDirs[1][0] + '</strong> ambas posibles.' : ''}
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
        "Lugares activos, deportes, ambientes competitivos, reuniones de liderazgo. Primer encuentro intenso y repentino.",
        "Lugar de trabajo, instituciones financieras, restaurantes, naturaleza. Construyendo confianza lentamente.",
        "Redes sociales, escuela, seminarios, viajando, citas a ciegas. La relación comienza con conversación.",
        "Presentaciones familiares, reuniones del vecindario, amigos de infancia. Comienza en ambientes cómodos.",
        "Fiestas, conciertos, reuniones creativas, lugares glamorosos. Primer encuentro dramático.",
        "Lugar de trabajo, hospital, relacionado con salud, actividades voluntarias. El encuentro comienza por necesidades prácticas.",
        "Citas a ciegas, eventos legales/diplomáticos, exposiciones de arte. Encuentro elegante y refinado.",
        "Situaciones de crisis, conversaciones profundas, lugares secretos, laboratorios. Atracción predestinada e intensa.",
        "Extranjero, universidad, reuniones religiosas/filosóficas, viajando. Conexión de lejos. Puede ser cultura diferente.",
        "Lugar de trabajo, eventos empresariales, funciones oficiales. Encuentro relacionado con estatus social.",
        "Online, clubs de hobby, movimientos sociales, amigo de un amigo. Encuentro único y no convencional.",
        "Reuniones espirituales, extranjero, artes/música, hospital, pistas en sueños. Encuentro místico y predestinado."
    ];

    const backgroundBySgn = [
        "Familia independiente y autodidacta. Herencia de fuerte liderazgo.",
        "Familia financieramente estable. Valores tradicionales. Posible trasfondo adinerado.",
        "Familia intelectual y comunicativa. Énfasis en la educación.",
        "Hogar cálido y orientado a la familia. Fuerte figura materna.",
        "Familia prestigiosa y orgullosa. Estatus social y reputación.",
        "Familia práctica y trabajadora. Trasfondo de salud/médico/educación.",
        "Familia equilibrada y digna. Trasfondo de artes/derecho/diplomacia.",
        "Familia con secretos o transformaciones. Historia familiar profunda.",
        "Familia académica, religiosa/filosófica. Posible trasfondo extranjero.",
        "Familia estricta y tradicional. Socialmente respetada. Énfasis en responsabilidad.",
        "Estructura familiar libre y única. Pensamiento progresista.",
        "Familia espiritual o artística. Posible trasfondo extranjero. Rica sensibilidad."
    ];

    const imageBySgn = [
        "Primera impresión enérgica y segura. Imagen deportiva o fuerte.",
        "Primera impresión tranquila y confiable. Imagen refinada y digna.",
        "Primera impresión brillante y habladora. Imagen intelectual e ingeniosa.",
        "Primera impresión cálida y cuidadora. Imagen suave y cariñosa.",
        "Primera impresión glamorosa y carismática. Imagen segura.",
        "Primera impresión pulcra y ordenada. Imagen meticulosa y profesional.",
        "Primera impresión elegante y encantadora. Imagen equilibrada y sofisticada.",
        "Primera impresión misteriosa e intensa. Imagen profunda y carismática.",
        "Primera impresión libre y vibrante. Imagen positiva y aventurera.",
        "Primera impresión seria y madura. Imagen responsable y confiable.",
        "Primera impresión única e individualista. Imagen trendy y original.",
        "Primera impresión soñadora y mística. Imagen artística y emocional."
    ];

    const attractBySgn = [
        "Energía fuerte y confianza. La naturaleza proactiva y protectora es atractiva.",
        "Estabilidad y encanto sensual. Disfrutar buena comida, aromas y texturas.",
        "Ingenio y habilidades de conversación. La estimulación intelectual es la atracción.",
        "Cuidado devoto y emoción. Sentirse en casa juntos es el encanto.",
        "Presencia brillante y generosidad. Sentirse especial juntos es atractivo.",
        "Consideración delicada y perfeccionismo. La atención al detalle es encantadora.",
        "Elegancia y personalidad armoniosa. El mundo se vuelve bello juntos.",
        "Mirada intensa y profundidad. El enfoque que penetra el alma es la atracción.",
        "Espíritu libre y humor. Las aventuras comienzan cuando están juntos.",
        "Fiabilidad sólida y madurez. La estabilidad firme como roca es atractiva.",
        "Individualidad única y pensamiento progresista. Frescura nunca antes vista.",
        "Sensibilidad mística y profundidad espiritual. El romance de ensueño es el encanto."
    ];

    // D1 7 house 사인으로 만남 환경
    const d1H7ForMeeting = (d1LagnaSign + 6) % 12;

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🤝 Ambiente de Encuentro' : '🤝 Ambiente de Encuentro — D1 7ª: ' + SIGNS[d1H7ForMeeting] + ' ' + SIGN_SYMBOLS[d1H7ForMeeting]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'El signo de la casa 7 revela el ambiente de encuentro.<br><br>'}
            <strong>${meetingBySgn[d1H7ForMeeting]}</strong>
            ${d1H7ForMeeting === 8 || d1H7ForMeeting === 11 ? '<br><br>💡 <strong>¡Posibilidad de conexión extranjera!</strong> La pareja puede ser extranjera o puedes conocerla en el extranjero.' : ''}
        </div>
    </div>`;

    // UL 사인으로 spouse 가문/배경
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏛️ Trasfondo Familiar de la Pareja' : '🏛️ Trasfondo de la Pareja — UL: ' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Upapada Lagna (UL) revela el trasfondo familiar de la pareja.<br><br>'}
            <strong>${backgroundBySgn[ulSign]}</strong>
        </div>
    </div>`;

    // A7 사인으로 spouse 외적 이미지
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👤 Primera Impresión de la Pareja' : '👤 Primera Impresión — A7: ' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Darapada (A7) muestra la primera impresión de la pareja.<br><br>'}
            <strong>${imageBySgn[a7Sign]}</strong>
        </div>
    </div>`;

    // D9 Venus 사인으로 spouse 매력 포인트
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💎 Punto de Atracción de la Pareja' : '💎 Atracción de la Pareja — D9 Venus: ' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Venus en Navamsa revela el encanto y estilo de amor de la pareja.<br><br>'}
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
            <div class="nakshatra-name">Tu Estrella: ${nak.ko}</div>
            <div class="nakshatra-meaning">"${nak.meaning}"</div>
            <div class="nakshatra-detail">${nak.desc}</div>
        </div>
    ` : `
        <div class="nakshatra-card">
            <div class="nakshatra-name">${nak.ko} (${nak.name})</div>
            <div class="nakshatra-meaning">"${nak.meaning}" — Planeta Regente: ${DASHA_KO[nak.ruler] || nak.ruler}</div>
            <div class="nakshatra-detail">
                Deidad: ${nak.deity}<br><br>
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
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 La vida fluye con diferentes energías. Verifica tu período actual.<br><br>' :
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 <strong>Vimshottari Dasha</strong> — La vida se divide en períodos regidos por 9 planetas. <strong>Mahadasha</strong> es el período mayor, <strong>Antardasha (Bhukti)</strong> es el sub-período. Calculado desde la posición del nakshatra lunar.<br><br>';
    html += isEasy ?
        '</div></div>' :
        '🌙 Luna natal: <strong>' + nak.ko + ' (' + nak.name + ')</strong> — Primer Dasha: <strong>' + DASHA_KO[startRuler] + '</strong> (restante: ' + remainingYears.toFixed(2) + ' años)</div></div>';

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
        const dashaEasyDesc = {Ketu:'Reflexión interior y crecimiento espiritual',Venus:'Amor, belleza y abundancia',Sun:'Confianza y liderazgo brillan',Moon:'Emociones y hogar toman protagonismo',Mars:'Desafíos y energía de acción',Rahu:'Grandes cambios y nuevas oportunidades',Jupiter:'Suerte y crecimiento llegan',Saturn:'La paciencia trae grandes recompensas',Mercury:'Estudio, comunicación y negocios prosperan'};
        html += '<span class="dasha-planet">' + (isEasy ? dashaEasyDesc[p.planet] : DASHA_KO[p.planet]) + '</span>';
        html += '<span class="dasha-period">' + fmtDate(p.startD) + ' ~ ' + fmtDate(p.endD) + '</span>';
        html += '<span class="dasha-years">' + (p.actualDays / 365.25).toFixed(1) + ' años</span>';
        if (isCurrent) html += '<span class="dasha-badge">Actual</span>';
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
        '¡Orientado a la acción! Rápido en decidir con cualidades de liderazgo natural. Amas los nuevos desafíos. La gente te pide que tomes el mando. Un poco impaciente, pero increíblemente determinado.',
        'Amas la estabilidad. Disfrutas la comodidad, la belleza y la buena comida. Una vez que te decides, lo cumples. Terco, pero eso te hace increíblemente confiable.',
        '¡Curioso por todo! Gran comunicador y multitalentoso. Captas información rápido y atraes a la gente con tu ingenio. A veces disperso, pero eso es parte de tu encanto.',
        'Cálido y emocional. Valoras la familia y lees bien los sentimientos de la gente. Un cuidador natural que hace sentir cómodo a todos. Los cambios de humor pasan, pero tu empatía es tu superpoder.',
        '¡Líder nato! Tienes gran presencia y naturalmente atraes la atención. Seguro y magnético. Anhelas reconocimiento, pero eres igualmente generoso con amor y elogios.',
        'Detallista y analítico. Te esfuerzas por la perfección y cuidas la salud. Observador agudo que capta lo que otros pasan por alto. Te preocupas un poco de más, pero eso significa que siempre estás preparado.',
        'Buscas la armonía. Refinado, encantador, con excelente gusto artístico. Un pacificador natural que odia el conflicto. Más feliz rodeado de cosas bellas.',
        'Tienes profundidad. Fuerte intuición que ve la verdad. Calma en la superficie pero emociones intensas debajo. La vida te lanza grandes cambios, y cada uno te hace más fuerte.',
        '¡Espíritu libre! Amas viajar y aprender. Positivo y filosófico. Interesado en diferentes culturas, con una visión amplia del mundo. Tu humor ilumina cualquier habitación.',
        'Ambicioso. Paciente y cada vez más atractivo con la edad. Trabaja sistemáticamente hacia sus metas. Aunque luches al principio, eres del tipo que florece tarde y eventualmente consigue todo lo que quiere.',
        'Único. Piensas diferente a todos y eres innovador. Odias estar encasillado y quieres cambiar el mundo a tu manera. Talento en tecnología o ciencia.',
        'Profundamente sensible. Fuerte intuición atraída por el arte y la espiritualidad. Sueños vívidos e imaginación rica. Empatizas profundamente con el dolor de otros. Tu mundo interior es más rico que el exterior.'
    ];
    const lagnaInterp = [
        'Lagna Aries regido por Marte. Fuerte voluntad y liderazgo, personalidad independiente. Rápido en actuar con espíritu pionero. Rasgos marcados con impresión activa. Impulsivo pero valiente, destaca en competencia.',
        'Lagna Tauro regido por Venus. Busca estabilidad y abundancia, ama la belleza sensorial. Apariencia suave con voz atractiva. Valora la seguridad material con excepcional sentido artístico. Terco pero confiable.',
        'Lagna Géminis regido por Mercurio. Intelectualmente curioso con habilidades de comunicación sobresalientes. Apariencia juvenil con complexión ágil. Versátil pero puede dispersarse, talento en escritura e idiomas.',
        'Lagna Cáncer regido por la Luna. Rico en sensibilidad y altamente intuitivo. Cara redonda con impresión suave. Devoto del hogar y la familia con fuertes instintos protectores. Altibajos emocionales pero profundamente empático.',
        'Lagna Leo regido por el Sol. Rebosante de carisma y energía creativa. Complexión digna con presencia imponente. Líder nato que disfruta el centro de atención. Alta autoestima pero corazón generoso.',
        'Lagna Virgo regido por Mercurio. Analítico y perfeccionista. Apariencia pulcra con impresión intelectual. Excelente atención al detalle y habilidades prácticas, con interés en salud e higiene.',
        'Lagna Libra regido por Venus. Busca equilibrio y armonía, diplomáticamente hábil. Apariencia bien proporcionada con impresión refinada. Destaca en relaciones y asociaciones con superb sentido estético.',
        'Lagna Escorpio regido por Marte. Intuición intensa y poder transformador. Ojos penetrantes con impresión misteriosa. Penetra la esencia con profunda perspicacia, guarda bien los secretos. Experimenta cambios dramáticos múltiples veces.',
        'Lagna Sagitario regido por Júpiter. Filósofo que busca libertad y verdad. Complexión grande con impresión brillante. Optimista y valora los principios morales. Profundas conexiones con viajes y educación superior.',
        'Lagna Capricornio regido por Saturno. Fuerte ambición y paciencia. Complexión delgada con impresión seria. Trabaja sistemáticamente hacia metas, del tipo que rejuvenece con la edad. Valora estatus social y logros.',
        'Lagna Acuario regido por Saturno. Innovador y original. Apariencia única con impresión intelectual. Valora ideales humanitarios con pensamiento no convencional. Talento en tecnología y ciencia.',
        'Lagna Piscis regido por Júpiter. Espiritual e intuitivo. Apariencia suave con impresión soñadora. Sensibilidad artística extremadamente dotada con interés en mundos trascendentes. Tendencia al autosacrificio.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">👤 ${isEasy ? 'Tu Personalidad' : 'Personalidad y Apariencia — Lagna: ' + SIGNS[lagnaSign] + ' ' + SIGN_SYMBOLS[lagnaSign]}</div>
        <div class="interp-text">${isEasy ? lagnaEasy[lagnaSign] : lagnaInterp[lagnaSign]}</div>
    </div>`;

    // ═══════════════════════════════════
    // 2. 내면 & 감정 (Moon 별자리)
    // ═══════════════════════════════════
    if (moonPos) {
        const moonEasy = [
            'Hay una pasión ardiente dentro de ti. Las emociones suben rápido y bajan rápido. Cuando estás estresado, necesitas mover el cuerpo — ejercicio o actividades al aire libre funcionan mejor.',
            'Eres emocionalmente muy estable. No te gustan los cambios repentinos y encuentras comodidad en lo familiar. Buena comida, música y naturaleza hermosa sanan tu alma. Una vez que das tu corazón, rara vez cambia.',
            'Procesas las emociones a través de la conversación. Hablar las cosas te hace sentir mejor. Eres curioso por todo y no soportas el aburrimiento. Tu humor puede aliviar cualquier estado de ánimo.',
            'Eres extremadamente sensible y empático. Absorbes las emociones de otros como esponja. Tu hogar es tu espacio seguro, y tu vínculo con tu madre es fuerte. Cocinar o decorar trae paz emocional.',
            'Tu expresión emocional es dramática y apasionada. Necesitas profundamente ser amado y reconocido. Pero das amor con igual generosidad. Actividades creativas — arte, escritura, música — son tu medicina emocional.',
            'Tiendes a analizar tus emociones. Te preocupas mucho pero eres excelente resolviendo problemas prácticamente. Rutinas diarias — ejercicio matutino, comidas saludables, organizar — traen estabilidad emocional.',
            'Encuentras equilibrio emocional en las relaciones. Te sientes solo cuando estás solo y te estabilizas con amigos cercanos o pareja. Odias profundamente el conflicto y encuentras paz en la belleza y el arte.',
            'Tus emociones son tan profundas e intensas como el océano. Amas profundamente y nunca olvidas la traición. Tu intuición es increíblemente fuerte — lees la verdad a través de ojos y acciones, no palabras.',
            'Eres emocionalmente brillante y optimista. Amas la libertad y odias estar restringido. Viajar es tu mejor remedio emocional. Procesas los sentimientos a través del pensamiento filosófico.',
            'No muestras emociones fácilmente. Fuerte sentido de responsabilidad, siempre poniendo el deber primero. Puede que hayas sido maduro más allá de tus años de niño, pero te vuelves más abierto emocionalmente con la edad.',
            'Tienes patrones emocionales únicos e impredecibles. Amas de maneras no convencionales y ves el panorama general. Encuentras satisfacción emocional en causas sociales y actividades comunitarias.',
            'Eres extremadamente intuitivo y espiritual. Tus sueños son vívidos y a veces se sienten proféticos. Empatizas profundamente con el dolor de otros. Arte, meditación y estar cerca del agua te traen paz.'
        ];
        const moonInterp = [
            'Una pasión ardiente arde dentro. Las emociones son espontáneas y cambian rápidamente. La ira se enciende rápido pero se apaga igual de rápido; deseas independencia emocional. Aliviar el estrés con ejercicio funciona mejor.',
            'Emocionalmente muy estable, buscando comodidad. No le gustan los cambios y encuentra seguridad en lo familiar. Sanado por buena comida, música y naturaleza. Una vez que das tu corazón, rara vez cambia.',
            'Procesa emociones racionalmente y organiza sentimientos a través de la conversación. Curioso con muchos intereses simultáneos. Busca variedad sobre profundidad emocional y no tolera el aburrimiento.',
            'Luna en su propio signo (domicilio). Extremadamente rico en sensibilidad, absorbiendo emociones ajenas como esponja. Fuertes instintos maternales, encontrando estabilidad en casa. Las emociones pueden fluctuar con el ciclo lunar.',
            'Expresión emocional dramática y apasionada. Fuerte necesidad de ser reconocido y amado; profundamente herido cuando es ignorado. Las actividades creativas sirven como sanación emocional. Corazón romántico y generoso.',
            'Tendencia a analizar y organizar emociones. Se preocupa mucho y es perfeccionista pero resuelve las cosas prácticamente. Puede tener preocupaciones de salud, encontrando estabilidad en rutinas diarias.',
            'Encuentra equilibrio emocional dentro de las relaciones. Se siente ansioso solo y se estabiliza con pareja. Extremadamente adverso al conflicto y la discordia, encontrando paz interior en el arte y la belleza.',
            'Las emociones son tan profundas e intensas como el océano. Ama profundamente y odia profundamente; nunca perdona la traición. Intuición muy fuerte, leyendo instintivamente las verdaderas intenciones de otros. Energía emocional de transformación y renacimiento.',
            'Emocionalmente optimista y amante de la libertad. No le gusta estar restringido y busca nuevas experiencias. Sublima emociones a través del pensamiento filosófico, con el viaje como mejor remedio.',
            'Controla bien las emociones y no las muestra exteriormente. Fuerte sentido de responsabilidad, priorizando el deber sobre los sentimientos. Puede haber tenido dificultades emocionales en la infancia, pero madura emocionalmente con la edad.',
            'Patrones emocionales únicos e impredecibles. Independiente, amando de maneras no convencionales. Persigue amor universal por la humanidad y causas sociales, viendo el panorama general sobre emociones personales.',
            'Extremadamente intuitivo y espiritual. Los sueños son vívidos y pueden ser proféticos. Empatiza profundamente con el sufrimiento ajeno, con límites difusos entre uno mismo y otros. Encuentra estabilidad en arte, meditación y práctica espiritual.'
        ];
        html += `<div class="interp-card">
            <div class="interp-title">🌙 ${isEasy ? 'Tu Estilo Emocional' : 'Interior y Emociones — Luna: ' + SIGNS[moonPos.sign] + ' ' + SIGN_SYMBOLS[moonPos.sign]}</div>
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

    let wealthText = isEasy ? '' : `<strong>Casa 2 (Riqueza Acumulada):</strong> ${SIGNS[h2sign]}. `;
    if (h2planets.length === 0) {
        wealthText += isEasy ? 'La acumulación de riqueza es constante y estable. Se acumula sin grandes fluctuaciones. ' : 'Sin planetas en la 2ª — acumulación de riqueza constante. ';
    } else {
        h2planets.forEach(p => {
            const pWealth = {
                'Sun': 'Ingresos a través de autoridad y estatus. Ganancias potenciales del gobierno o sectores públicos.',
                'Moon': 'Situación financiera fluctuante. Ingresos posibles en negocios de cara al público o industria alimentaria.',
                'Mars': 'Tendencias de inversión agresivas. Ingresos de bienes raíces, tecnología o campos militares.',
                'Mercury': 'Ganar dinero a través de habilidades intelectuales. Riqueza de escritura, educación, comunicaciones y TI.',
                'Jupiter': '¡La ubicación más auspiciosa! Abundante fortuna de riqueza. Grandes ingresos de educación, derecho o campos religiosos.',
                'Venus': 'Acumula riqueza a través de artículos de lujo, arte, entretenimiento y moda. Vida gastronómica abundante.',
                'Saturn': 'Acumula riqueza lenta y constantemente. Dificultades al inicio pero se estabiliza después de la mediana edad.',
                'Rahu': 'Gana dinero por métodos no convencionales. Riqueza repentina de sectores extranjeros, tecnología o innovación.',
                'Ketu': 'Indiferencia a la riqueza. Valora lo espiritual sobre lo material; cuidado con pérdidas repentinas.'
            };
            wealthText += isEasy ? `${pWealth[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pWealth[p.id] || ''} `;
        });
    }

    wealthText += isEasy ? '<br><br>' : `<br><br><strong>Casa 11 (Ingresos y Ganancias):</strong> ${SIGNS[h11sign]}. `;
    if (h11planets.length === 0) {
        wealthText += isEasy ? 'Los ingresos son estables pero sin grandes fluctuaciones.' : 'Sin planetas en la 11ª — ingresos estables sin grandes cambios.';
    } else {
        h11planets.forEach(p => {
            const pIncome = {
                'Jupiter': '¡Grandes ingresos y abundantes ganancias! Las redes sociales traen riqueza.',
                'Venus': 'Ingresos a través del arte, socialización y moda. Las amigas son de ayuda.',
                'Saturn': 'Ingresos constantes y estables pero crecimiento lento. Buena seguridad para la jubilación.',
                'Mars': 'Ingresos a través de la competencia. Ganancias de tecnología, bienes raíces y deportes.',
                'Mercury': 'Ingresos a través de redes intelectuales. Aptitud empresarial.',
                'Sun': 'Ingresos a través de la autoridad. Conexiones políticas traen riqueza.',
                'Moon': 'Ingresos a través de popularidad pública. Fluctuante pero flujo constante.'
            };
            wealthText += isEasy ? `${pIncome[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pIncome[p.id] || ''} `;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">💰 ${isEasy ? 'Mi Fortuna de Riqueza' : 'Fortuna de Riqueza'}</div>
        <div class="interp-text">${wealthText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 4. 💕 spouse & Marriage Fortune (7 house 분석)
    // ═══════════════════════════════════
    const h7sign = (lagnaSign + 6) % 12;
    const h7planets = planetsInHouse(7);
    const venus = positions.find(p => p.id === 'Venus');

    const spouseSign = [
        'Una pareja independiente y enérgica. Destinado a alguien con fuerte voluntad y liderazgo. Un compañero activo y directo.',
        'Una pareja hermosa y artística. Destinado a alguien materialmente estable. Un compañero sensual y leal.',
        'Una pareja inteligente con buenas habilidades de comunicación. Destinado a alguien con quien conversar bien. Un compañero humorístico y versátil.',
        'Una pareja emocional y hogareña. Destinado a alguien cuidador. Un compañero con calidez maternal.',
        'Una pareja carismática y digna. Destinado a alguien socialmente prominente. Un compañero con alta autoestima pero naturaleza generosa.',
        'Una pareja meticulosa y práctica. Destinado a alguien interesado en salud y bienestar. Un compañero analítico y orientado al servicio.',
        'Una pareja atractiva y refinada. Destinado a alguien diplomático con buen sentido del equilibrio. Un compañero con excelente gusto artístico.',
        'Una pareja intensa y misteriosa. Destinado a alguien con emociones profundas. Un compañero transformador y apasionado. Puede tener muchos secretos.',
        'Una pareja libre y optimista. Posible conexión con extranjero o alguien de otra cultura. Un compañero filosófico y aventurero.',
        'Una pareja seria y ambiciosa. Puede haber diferencia de edad. Un compañero responsable y exitoso socialmente. El matrimonio puede llegar tarde.',
        'Una pareja única e independiente. Encuentro o relación no convencional. Un compañero intelectual e innovador. Un matrimonio de forma libre.',
        'Una pareja espiritual e intuitiva. Conexión con artista o practicante espiritual. Un compañero soñador y romántico. Cuidado con la idealización.'
    ];

    const spouseAppearance = [
        'Rasgos marcados, impresión fuerte. Complexión atlética. Ojos intensos llenos de energía. Los tonos rojos le van bien. Vibra activa y dinámica.',
        'Apariencia suave y atractiva. Figura llena con labios sensuales. Buena piel con belleza natural. Impresión cálida y cómoda.',
        'Apariencia juvenil, impresión brillante. Delgado y alto. Cara expresiva con ojos brillantes. A la moda y con estilo.',
        'Cara redonda, impresión suave. Figura ligeramente curvilínea. Piel clara con ojos grandes. Vibra maternal. Más atractivo/a en casa.',
        'Complexión digna con apariencia carismática. Cabello abundante es un rasgo. Presencia imponente, bien vestido/a. Atrae atención en todas partes.',
        'Apariencia pulcra y limpia. Delgado con buenas proporciones. Impresión intelectual. Moda minimalista, la limpieza es el encanto.',
        'Apariencia equilibrada, impresión refinada. Cara simétrica. Sonrisa encantadora, vibra social. Siempre bien vestido/a. Puede tener hoyuelos.',
        'Apariencia afilada y misteriosa. Ojos profundos dejan fuerte impresión. Delgado con rasgos marcados. Prefiere tonos oscuros. Sensualidad oculta.',
        'Alto con buena complexión. Impresión brillante y abierta. Encanto exótico. Ropa casual y libre. Sonrisa atractiva, estilo deportivo.',
        'Apariencia seria y madura. Delgado con estructura ósea definida. Se ve mayor de su edad pero más atractivo con el tiempo. Estilo clásico de traje.',
        'Apariencia única y extraordinaria. Moda distintiva. Alto o con rasgos notables. Encanto no convencional. Estilo futurista.',
        'Apariencia suave y soñadora. Ojos grandes con expresión soñadora. Ligeramente rellenito con piel translúcida. Los tonos pastel le van. Encanto místico.'
    ];

    let spouseText = (isEasy ? '' : '<strong>📐 Apariencia de la Pareja:</strong><br>') + spouseAppearance[h7sign] + (isEasy ? '<br><br>' : isEasy ? '<br><br>' : '<br><br><strong>📋 Personalidad de la Pareja:</strong><br>') + spouseSign[h7sign];

    if (h7planets.length > 0) {
        spouseText += isEasy ? '<br><br>' : '<br><br><strong>Planetas en la 7ª:</strong> ';
        h7planets.forEach(p => {
            const pH7 = {
                'Sun': 'La pareja es socialmente reconocida. Puede ser algo dominante pero un compañero respetable.',
                'Moon': 'Una pareja emocional y cariñosa. Vida matrimonial con conexión emocional profunda.',
                'Mars': 'Apasionado pero pueden haber discusiones frecuentes. Pareja de voluntad fuerte. Relación energética.',
                'Mercury': 'Una pareja intelectual con gran conversación. Buena relación también como socios de negocios.',
                'Jupiter': '¡La ubicación más bendecida! Pareja sabia y moral. Vida matrimonial feliz. Suerte a través de la pareja.',
                'Venus': 'Una pareja muy atractiva y amorosa. Vida matrimonial romántica. Puede disfrutar del lujo.',
                'Saturn': 'Matrimonio tardío o pareja con diferencia de edad significativa. Difícil al inicio pero matrimonio estable y duradero.',
                'Rahu': 'Matrimonio no convencional. Pareja de país extranjero o diferente trasfondo. Encuentro repentino.',
                'Ketu': 'Conexión de vidas pasadas. Fuerte vínculo espiritual pero algo de distancia en relaciones mundanas.'
            };
            spouseText += isEasy ? `<br>${pH7[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pH7[p.id] || ''}`;
        });
    }

    if (venus) {
        const venusHouse = houseOf(venus.sign);
        spouseText += isEasy ? '<br><br>' : `<br><br><strong>Posición de Venus (${venusHouse}ª):</strong> `;
        const venusHouseInterp = {
            1: 'Apariencia atractiva. Disfruta el romance y se enamora fácilmente.',
            2: 'La riqueza viene a través de la pareja. Voz hermosa y gustos gourmet.',
            3: 'Habilidades de comunicación artística. Relaciones agradables con hermanos.',
            4: 'Felicidad en casa con una hermosa residencia. Fuerte influencia de la madre.',
            5: 'Una vida rica en romance. Buena relación con los hijos. Alegría en el trabajo creativo.',
            6: 'Actitud de servicio en el romance. Posibilidad de romance en el trabajo.',
            7: 'Pareja muy atractiva. Un fuerte indicador de vida matrimonial feliz.',
            8: 'Amor profundo y transformador. Romance secreto. Riqueza de la pareja.',
            9: 'Romance en el extranjero. Conexión con maestro o mentor. Amor filosófico.',
            10: 'Matrimonio socialmente reconocido. Encuentro a través de la carrera.',
            11: 'De amigos a amantes. Encontrar conexiones a través de actividades sociales.',
            12: 'Romance secreto. Conexiones extranjeras. Amor espiritual.'
        };
        spouseText += venusHouseInterp[venusHouse] || '';
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Mi Pareja' : '💕 Pareja y Matrimonio — Casa 7: ' + SIGNS[h7sign] + ' ' + SIGN_SYMBOLS[h7sign]}</div>
        <div class="interp-text">${spouseText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 5. 💼 career & 사회적 성취 (10 house 분석)
    // ═══════════════════════════════════
    const h10sign = (lagnaSign + 9) % 12;
    const h10planets = planetsInHouse(10);

    const careerSign = [
        'Apto para militar, policía, deportes, cirugía, gestión empresarial, roles de liderazgo.',
        'Finanzas, industria alimentaria, agricultura, moda, bienes raíces, arte, banca.',
        'Medios, escritura, educación, comunicaciones, TI, marketing, traducción.',
        'Médica, enfermería, hostelería, marítimo, bienes raíces, alimentación.',
        'Política, entretenimiento, gestión, agencias gubernamentales, posiciones de liderazgo, campos relacionados con el oro.',
        'Médica, contabilidad, análisis, consultoría, salud, control de calidad.',
        'Derecho, diplomacia, moda, diseño de interiores, consejería, planificación de eventos.',
        'Investigación, seguros, medicina, psicología, impuestos, minería.',
        'Educación, derecho, religión, editorial, viajes, comercio internacional.',
        'Gestión, función pública, arquitectura, ingeniería civil, política, grandes corporaciones.',
        'Tecnología, ciencia, TI, aviación, aeroespacial, trabajo social, innovación.',
        'Arte, cine, música, médica, extranjero, campos espirituales, ONG.'
    ];

    let careerText = isEasy ? careerSign[h10sign] : `La casa 10 está en ${SIGNS[h10sign]}. ${careerSign[h10sign]}`;

    if (h10planets.length > 0) {
        careerText += isEasy ? '<br><br>' : '<br><br><strong>Planetas en la 10ª:</strong>';
        h10planets.forEach(p => {
            const pCareer = {
                'Sun': ' Gobierno, liderazgo, posiciones autoritarias. Una carrera que atrae atención social.',
                'Moon': ' Carrera de cara al público. Cuidado, hostelería, alimentación, campos emocionales.',
                'Mars': ' Tecnología, ingeniería, militar, cirugía, deportes. Éxito en campos competitivos.',
                'Mercury': ' Negocios, comunicación, TI, educación. Éxito a través de habilidades intelectuales.',
                'Jupiter': ' Educación, derecho, religión, consultoría. Carrera respetada. Una de las mejores ubicaciones.',
                'Venus': ' Arte, entretenimiento, moda, belleza, diplomacia. Éxito en campos creativos.',
                'Saturn': ' Éxito lento pero seguro. Organizaciones sistemáticas, arquitectura, función pública. Brilla después de la mediana edad.'
            };
            careerText += isEasy ? `<br>${pCareer[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pCareer[p.id] || ''}`;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 Mi Carrera' : '💼 Carrera y Logros Sociales — Casa 10: ' + SIGNS[h10sign] + ' ' + SIGN_SYMBOLS[h10sign]}</div>
        <div class="interp-text">${careerText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 6. 🏥 health (6 house + Lagna 분석)
    // ═══════════════════════════════════
    const h6sign = (lagnaSign + 5) % 12;
    const h6planets = planetsInHouse(6);

    const healthByLagna = [
        'Cuidado con condiciones de cabeza, cerebro y cara. Propenso a dolores de cabeza, fiebres e inflamación. El ejercicio regular es esencial.',
        'Cuidado con problemas de cuello, tiroides y mandíbula. Propenso a comer en exceso y diabetes. Cuida las cuerdas vocales y la salud de la garganta.',
        'Cuidado con pulmones, brazos, hombros y sistema nervioso. Ansiedad y problemas de sueño posibles. La meditación respiratoria ayuda.',
        'Cuidado con problemas de estómago, pecho y mamas. Trastornos digestivos y retención de agua. El estrés emocional afecta directamente la salud.',
        'Cuidado con problemas de corazón, espalda y columna. La gestión cardiovascular es esencial. Cuidado con el exceso de trabajo.',
        'Cuidado con sistema digestivo, intestinos y piel. Indigestión y alergias. La dieta es importante.',
        'Cuidado con riñones, espalda baja y piel. Hidratación adecuada y estilo de vida equilibrado esencial.',
        'Cuidado con sistemas reproductivo y excretor. Posibilidad de condiciones crónicas. Los chequeos regulares son importantes.',
        'Cuidado con hígado, muslos y caderas. Tendencia al sobrepeso. Las actividades al aire libre son buenas para la salud.',
        'Cuidado con huesos, articulaciones, rodillas y piel. Reumatismo y artritis. La ingesta de calcio es importante.',
        'Cuidado con tobillos, pantorrillas y sistema circulatorio. Control de presión arterial. Problemas de salud inusuales posibles.',
        'Cuidado con pies, sistema linfático e inmunidad. Condiciones inexplicables posibles. El sueño adecuado es clave.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏥 Mi Salud' : '🏥 Salud — Áreas Vulnerables'}</div>
        <div class="interp-text">${healthByLagna[lagnaSign]}${h6planets.length > 0 ? isEasy ? '<br><br>Se necesita atención especial a la salud.' : '<br><br>Casa 6: ' + h6planets.map(p => p.name).join(', ') + ' requiere atención especial a la salud.' : ''}</div>
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
                    'Sun': 'Un período de autodescubrimiento y autoridad. Un tiempo para ejercer liderazgo y recibir reconocimiento social. Las relaciones con el gobierno o figuras de autoridad se vuelven importantes. Pueden ocurrir cambios en tu relación con tu padre. Cuida la salud del corazón y los ojos. Este período fortalece tu autoestima e identidad.',
                    'Moon': 'Un período de emociones y vida interior. El hogar y la relación con la madre se vuelven importantes. Pueden surgir asuntos inmobiliarios, y las relaciones públicas se activan. Las fluctuaciones emocionales son grandes pero la intuición se fortalece. Posibilidad de viaje y reubicación.',
                    'Mars': 'Un período de acción y energía. Un gran momento para comenzar nuevos proyectos con coraje. Las transacciones inmobiliarias, cirugías y actividades tecnológicas se activan. Cambios en relaciones con hermanos. Cuidado con disputas, accidentes y quemaduras. Buenos resultados en ejercicio y competencia.',
                    'Rahu': 'Un período de cambio rápido e innovación. Oportunidades y desafíos inesperados llegan. Las actividades relacionadas con el extranjero se activan, con potencial avance en tecnología e innovación. Los deseos materiales se intensifican — cuidado de no perderte en ilusiones. Tendrás experiencias únicas. Un ciclo largo de 18 años.',
                    'Jupiter': '¡Un período de suerte y crecimiento! Un tiempo donde las cosas buenas — educación, matrimonio, nacimiento, ascensos — son más probables. El crecimiento espiritual y la sabiduría se profundizan. Conocerás un maestro o mentor. Las actividades de derecho, educación y religión son favorables.',
                    'Saturn': 'Un período de paciencia y pruebas. El crecimiento es lento pero seguro. Las responsabilidades crecen con experiencias de limitación y estructura. Cuida tu salud, especialmente huesos y articulaciones. Un ciclo largo de 19 años donde las verdaderas habilidades se ponen a prueba. Al final, descubres un yo más fuerte.',
                    'Mercury': 'Un período de actividad intelectual y negocios. Favorable para aprendizaje, comunicación, escritura y emprendimientos. Un gran momento para aprender nuevas habilidades. Las relaciones con hermanos y amigos se activan. Cuida la salud del sistema nervioso. Te encontrarás haciendo múltiples cosas simultáneamente.',
                    'Ketu': 'Un período de despertar espiritual y desapego. Te vuelves más desapegado del mundo material con intereses espirituales profundizándose. Puedes experimentar cambios repentinos y pérdidas, pero estos llevan a crecimiento espiritual. La intuición se vuelve muy fuerte — excelente tiempo para meditación y práctica espiritual.',
                    'Venus': '¡Un período de amor y abundancia! Romance, matrimonio y actividades artísticas se activan. Disfrutas prosperidad material y te das lujos. Puedes adquirir un auto nuevo, casa nueva o joyas. El sentido estético se desarrolla y las actividades sociales florecen. El ciclo más largo con 20 años.'
                };
                html += `<div class="interp-card">
                    <div class="interp-title">${isEasy ? '⏳ Período Actual: ' + DASHA_KO[currentDasha] : '⏳ Dasha Actual: ' + DASHA_KO[currentDasha] + ' Dasha'}</div>
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
            yogaText += isEasy ? '<strong>🐘 Bendición de Sabiduría y Fama</strong>' : '<strong>🐘 Gajakesari Yoga</strong> — ¡Relación Kendra Luna-Júpiter! Combinación de sabiduría, fama y abundancia. Respetado en sociedad con intelecto sobresaliente. Buena fortuna en educación e hijos.<br><br>';
        }
    }

    // Budha-Aditya Yoga
    const sun = positions.find(p => p.id === 'Sun');
    const mercury = positions.find(p => p.id === 'Mercury');
    if (sun && mercury && sun.sign === mercury.sign) {
        yogaText += isEasy ? '<strong>📚 Bendición de Inteligencia Sobresaliente</strong>' : '<strong>📚 Budha-Aditya Yoga</strong> — ¡Sol-Mercurio en mismo signo! Intelecto y comunicación sobresalientes. Éxito en educación, escritura, negocios. Líder intelectual autoritario.<br><br>';
    }

    // Chandra-Mangala Yoga
    if (moonPos && mars && moonPos.sign === mars.sign) {
        yogaText += isEasy ? '<strong>🔥 Bendición de Voluntad Fuerte y Riqueza</strong>' : '<strong>🔥 Chandra-Mangala Yoga</strong> — ¡Luna-Marte en mismo signo! Fuerte voluntad y acumulación de riqueza. Éxito en negocios con toma de decisiones audaz.<br><br>';
    }

    // Kuja Dosha (Manglik)
    if (mars) {
        const marsH = houseOf(mars.sign);
        if ([1,2,4,7,8,12].includes(marsH)) {
            yogaText += isEasy ? `<strong>⚠️ Precaución Matrimonial</strong>` : `<strong>⚠️ Kuja Dosha (Manglik)</strong> — Marte en casa ${marsH} — posibles desafíos en la vida matrimonial. Se recomienda verificar la carta de la pareja. El matrimonio después de los 28 años puede ser favorable.<br><br>`;
        }
    }

    if (yogaText) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '🔮 Tus Talentos Especiales' : '🔮 Yogas Especiales (Combinaciones Planetarias)'}</div>
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
        'Casa 1: Fuerte personalidad y liderazgo. Saludable y vital. Alta autoestima e independiente. Conexión con gobierno/autoridad.',
        'Casa 2: Valora el honor familiar. Ingresos a través de autoridad. Herencia del padre. Cuida la salud ocular.',
        'Casa 3: Valiente y decisivo. Líder entre hermanos. Autoridad en escritura/comunicación. Muchos viajes cortos.',
        'Casa 4: Tensión en relaciones parentales. Propiedades inmobiliarias/vehículos. Inquietud interior. Puede dejar su ciudad natal.',
        'Casa 5: Talento creativo sobresaliente. Buena relación con hijos. Habilidades de inversión/especulación. Amor romántico.',
        'Casa 6: Poder para derrotar enemigos. Habilidades de gestión de salud. Victoria en disputas legales. Apto para campos de servicio/médicos.',
        'Casa 7: Pareja con alto estatus social. Rol de liderazgo en asociaciones. Crecimiento social después del matrimonio.',
        'Casa 8: Cuidado con la longevidad. Beneficios de herencia/seguros. Poder secreto. Experiencia de transformación espiritual.',
        'Casa 9: El padre es una figura respetada. Éxito en derecho/religión/educación superior. Muchos viajes al extranjero. Buena fortuna.',
        'Casa 10: ¡La mejor ubicación! Éxito social y fama. Líder en gobierno/sector público. Éxito como el padre.',
        'Casa 11: Grandes ingresos y red social. Amigos de alto estatus. Excelentes habilidades de logro de metas.',
        'Casa 12: Éxito en el extranjero. Búsquedas espirituales. Distancia del padre. Tendencia a disfrutar la soledad. Cuida la salud ocular.'
    ],
    Moon: [
        'Casa 1: Apariencia atractiva. Personalidad emocional y cambiante. Popular con el público. Salud influenciada por ciclos lunares.',
        'Casa 2: Ambiente familiar cómodo. Buena alimentación. Habla dulce. Fuertes lazos familiares.',
        'Casa 3: Habilidades de comunicación creativa. Ama viajar. Vínculo emocional con hermanos. Pasatiempos artísticos.',
        'Casa 4: ¡La mejor ubicación! Hogar feliz. Fuerte vínculo con la madre. Buena fortuna inmobiliaria. Estabilidad emocional.',
        'Casa 5: Amor profundo por los hijos. Personalidad romántica. Habilidad intuitiva de inversión. Alegría en actividades creativas.',
        'Casa 6: Problemas de salud por estrés emocional. Victoria sobre enemigos. Espíritu de servicio. Cuidado con trastornos digestivos.',
        'Casa 7: Pareja atractiva. Matrimonio emocionalmente profundo. Tendencia a depender de la pareja. Relaciones públicas.',
        'Casa 8: Turbulencia emocional y transformación. Intuición muy fuerte. Posible herencia. Vida larga pero crisis emocionales.',
        'Casa 9: Espiritual y filosófico. La madre es religiosa. Viaje/residencia en el extranjero. Viajes con suerte.',
        'Casa 10: Popularidad pública y éxito social. Hostelería/alimentación/campos de cuidado. Éxito por influencia de la madre.',
        'Casa 11: Muchos amigos y sociable. Ingresos constantes. Habilidad para cumplir deseos. Ayuda de amigas.',
        'Casa 12: Posible residencia en el extranjero. Problemas de sueño. Inclinaciones espirituales. Distancia de la madre. Disfruta la soledad.'
    ],
    Mars: [
        'Casa 1: Físico fuerte y voluntad. Posibles cicatrices/heridas. Impulsivo pero valiente. Liderazgo y competitividad.',
        'Casa 2: Habla dura. Problemas alimentarios. Disputas familiares. Pero habilidad para acumular riqueza.',
        'Casa 3: ¡La mejor ubicación! Coraje y espíritu aventurero. Fuerte vínculo con hermanos. Talento atlético/deportivo.',
        'Casa 4: Conflictos domésticos. Disputas inmobiliarias. Tensión con la madre. Pero ganancias de inversiones inmobiliarias.',
        'Casa 5: Romance apasionado. Hijos activos. Inversiones especulativas. Talento en deportes/competencia.',
        'Casa 6: ¡Poder para aplastar enemigos! Fuerza física para superar enfermedades. Apto para militar/policía/médico. Fuerte inmunidad.',
        'Casa 7: Kuja Dosha — Pasión y conflicto coexisten en el matrimonio. Pareja fuerte. Matrimonio después de los 28 recomendado.',
        'Casa 8: Cuidado con accidentes/cirugías. Pero poder de sobrevivir crisis. Beneficios de seguros/herencia. Interés en tantra.',
        'Casa 9: Conflicto con el padre. Opiniones fuertes sobre religión. Disputas legales. Actividades en el extranjero.',
        'Casa 10: ¡Desempeño profesional sobresaliente! Militar/ingeniería/cirugía/policía. Un líder valiente en la sociedad.',
        'Casa 11: ¡Grandes ingresos! Fuerte logro de metas. Ayuda de hermanos. Ganancias inmobiliarias.',
        'Casa 12: Alto gasto en el extranjero. Problemas de sueño. Fuerte energía sexual. Actividades secretas.'
    ],
    Jupiter: [
        'Casa 1: ¡Ubicación bendecida! Personalidad sabia y generosa. Complexión grande y saludable. Figura respetada.',
        'Casa 2: ¡Riqueza abundante! Familia grande. Ingresos por educación. Orador elocuente. Buena alimentación.',
        'Casa 3: Hermanos exitosos. Escritura relacionada con religión/educación. Peregrinaciones cortas.',
        'Casa 4: ¡Una de las mejores ubicaciones! Hogar espacioso. Logro académico. Madre sabia. Paz interior.',
        'Casa 5: ¡Intelecto y creatividad sobresalientes! Buena fortuna con hijos. Inversiones sabias. Práctica espiritual. Mérito de vidas pasadas.',
        'Casa 6: Derrota fácilmente a los enemigos. Victorias legales. Espíritu de servicio. Saludable pero cuidado con el peso.',
        'Casa 7: ¡Pareja sabia y moral! Matrimonio feliz. Asociaciones de negocios exitosas.',
        'Casa 8: ¡Longevidad! Herencia. Profundidad de conocimiento espiritual. Interés en astrología/misticismo. Riqueza de la pareja.',
        'Casa 9: ¡La ubicación más poderosa! Gran fortuna. Bendiciones del maestro. Viajes al extranjero. Éxito en derecho/religión/filosofía.',
        'Casa 10: ¡Fama y respeto social! Líder en educación/derecho/campos religiosos. Autoridad moral. La mejor fortuna profesional.',
        'Casa 11: ¡Grandes ingresos y ganancias! Cumplimiento de deseos. Conexiones influyentes. Éxito social.',
        'Casa 12: Fortuna en el extranjero. Liberación espiritual. Placeres celestiales. Donaciones y caridad. Práctica de meditación.'
    ],
    Venus: [
        'Casa 1: ¡Apariencia muy atractiva! Talento artístico. Disfruta el lujo. Sociable y popular.',
        'Casa 2: ¡Riqueza abundante! Comida fina y artículos de lujo. Voz dulce. Armonía familiar.',
        'Casa 3: Comunicación artística. Escritura bella. Buena relación con hermanas.',
        'Casa 4: ¡Hogar y vehículos hermosos! Estilo de vida lujoso. Madre hermosa y artística.',
        'Casa 5: ¡Amor romántico! Talento en arte/entretenimiento. Hijos hermosos. Alegría en la creación.',
        'Casa 6: Dificultades en el romance. Belleza relacionada con la salud. Victoria sobre enemigos con encanto.',
        'Casa 7: ¡La mejor ubicación! Pareja muy atractiva. Matrimonio feliz. Asociaciones exitosas.',
        'Casa 8: Amor profundo y transformador. Riqueza de la pareja. Romance secreto. Longevidad.',
        'Casa 9: Romance en el extranjero. Viajes artísticos. Hermosa relación con maestros.',
        'Casa 10: ¡Éxito en arte/moda/entretenimiento! Socialmente atractivo. Ayuda de mujeres.',
        'Casa 11: ¡Ingresos a través de redes sociales! Ayuda de amigas. Cumplimiento de deseos.',
        'Casa 12: Amor en el extranjero. Romance secreto. Placeres del dormitorio. Inspiración artística.'
    ],
    Saturn: [
        'Casa 1: Complexión delgada. Serio y responsable. Dificultades en la infancia. Brilla con la edad. Longevidad.',
        'Casa 2: Acumulación lenta de riqueza. Estilo de vida frugal. Habla pesada. Distancia de la familia. Estabilidad después de la mediana edad.',
        'Casa 3: ¡Excelente ubicación! Fuerte voluntad y paciencia. Responsabilidad con hermanos. Comunicación sistemática.',
        'Casa 4: Dificultades con la madre. Ambiente hogareño estricto. Casas/edificios antiguos. Soledad interior.',
        'Casa 5: Hijos tardíos o pocos. Inversiones cautelosas. Luchas académicas y superación. Práctica espiritual.',
        'Casa 6: ¡Derrota enemigos con paciencia! Condiciones crónicas pero manejables. Éxito en campos de servicio. Buena ubicación.',
        'Casa 7: Matrimonio tardío. Pareja mayor. Difícil al inicio pero matrimonio estable. Precaución con socios de negocios.',
        'Casa 8: ¡Longevidad! Cuidado con condiciones crónicas. Retrasos en asuntos de herencia. Investigación secreta. Interés en tantra/yoga.',
        'Casa 9: Relación difícil con el padre. Enfoque serio de la religión. Viajes tardíos al extranjero.',
        'Casa 10: ¡Gran ubicación! Éxito social lento pero seguro. Líder en grandes corporaciones/gobierno. La mejor fortuna profesional.',
        'Casa 11: ¡Crecimiento constante de ingresos! Amigos mayores. Lograr metas con paciencia. Ganancias organizacionales.',
        'Casa 12: Dificultades y crecimiento en el extranjero. Problemas de sueño. Práctica espiritual. Preferencia por trabajo solitario.'
    ]
};

function renderPlanetHouse(positions, lagnaSign) {
    function houseOf(signIdx) { return ((signIdx - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = ['','Yo','Dinero·Familia','Comunicación','Hogar','Hijos·Romance','Salud','Pareja','Transformación','Fortuna·Extranjero','Carrera','Ingresos','Espiritualidad'];
    let html = '';

    positions.forEach(p => {
        if (!PLANET_IN_HOUSE[p.id]) return;
        const house = houseOf(p.sign);
        const desc = PLANET_IN_HOUSE[p.id][house - 1];
        if (!desc) return;

        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? (houseArea[house]||'') : p.symbol + ' ' + p.name + ' → Casa ' + house + ' (' + SIGNS[p.sign] + ')'}</div>
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
    let text = isEasy ? '<strong>Educación Básica:</strong> ' : `<strong>Casa 4 (Educación Básica):</strong> ${SIGNS[h4sign]}. `;
    const eduSign4 = ['Aprendizaje activo, educación física/militar', 'Bellas artes/música/educación culinaria', 'Idiomas/literatura/comunicación', 'Énfasis en educación doméstica, historia', 'Drama/liderazgo/ciencias políticas', 'Ciencia/medicina/análisis', 'Derecho/diplomacia/diseño', 'Psicología/investigación', 'Filosofía/teología/estudios internacionales', 'Negocios/administración/arquitectura', 'TI/tecnología científica/aviación', 'Arte/cine/música/espiritualidad'];
    text += eduSign4[h4sign] + ' apropiado. ';
    if (h4.length > 0 && !isEasy) text += 'En la casa 4, ' + h4.map(p => p.name).join(', ') + ' influye en la educación. ';

    const jupiter = positions.find(p => p.id === 'Jupiter');
    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if ([1,4,5,9].includes(jH)) text += isEasy ? '<br><br>🎓 <strong>¡Alto logro académico esperado!</strong> Posgrado/doctorado/estudio en el extranjero posible.' : '<br><br>🎓 <strong>Júpiter en casa ' + jH + ' — ¡alto logro académico esperado!</strong> Posgrado/doctorado/estudio en el extranjero posible.';
    }

    text += isEasy ? '<br><br><strong>Educación superior:</strong> ' : `<br><br><strong>Casa 5 (Educación Superior):</strong> ${SIGNS[h5sign]}. `;
    if (h5.length > 0) {
        h5.forEach(p => {
            const h5p = { Sun: 'Destaca en liderazgo/ciencias políticas', Moon: 'Talento en arte/psicología', Mars: 'Talento en ingeniería/tecnología/deportes', Mercury: 'Genio en matemáticas/idiomas/negocios', Jupiter: '¡Mejor ubicación! Académico/profesor/investigador', Venus: 'Talento en arte/diseño/música', Saturn: 'Académico tardío pero investigación profunda' };
            text += isEasy ? `${h5p[p.id] || 'influye en lo académico'}. ` : `${p.name}: ${h5p[p.id] || 'influye en lo académico'}. `;
        });
    } else {
        text += isEasy ? 'Sin energía académica particularmente fuerte, pero el esfuerzo constante traerá buenos resultados.' : 'Sin planetas en la 5ª — la posición del señor de la 5ª es clave.';
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

    let text = isEasy ? '' : `<strong>Casa 5 (Hijos):</strong> ${SIGNS[h5sign]}.<br><br>`;

    const childSign = [
        'Hijos activos e independientes. Talento en deportes/liderazgo. Ganan independencia temprano.',
        'Hijos tranquilos y artísticos. Talento en música/arte. Hijos materialmente acomodados.',
        'Hijos inteligentes y elocuentes. Excelentes en académico. Posibilidad de gemelos.',
        'Hijos sensibles y gentiles. Vínculo especial con la madre. Hijos hogareños.',
        'Hijos carismáticos y creativos. Cualidades de líder. Talento en entretenimiento/arte.',
        'Hijos meticulosos y analíticos. Talento en medicina/ciencia. El cuidado de la salud es importante.',
        'Hijos encantadores y sociables. Talento en arte/diplomacia. Excelente sentido del equilibrio.',
        'Hijos intensos e intuitivos. Espíritu investigador/explorador. Pueden tener muchos secretos.',
        'Hijos libres y aventureros. Posible estudio/viaje al extranjero. Tendencias filosóficas.',
        'Hijos serios y ambiciosos. Maduran temprano. Orientados al logro.',
        'Hijos únicos e innovadores. Talento en tecnología/ciencia. Personalidad independiente.',
        'Hijos artísticos y espirituales. Rica imaginación. Talento en música/pintura.'
    ];
    text += childSign[h5sign];

    if (h5.length > 0) {
        text += isEasy ? '<br><br>' : '<br><br><strong>Planetas en la 5ª:</strong><br>';
        h5.forEach(p => {
            const ch = { Sun: 'Conexión con hijos varones. Los hijos tienen liderazgo.', Moon: 'Conexión con hijas. Fuerte vínculo emocional.', Mars: 'Hijos activos. Pueden ser difíciles de manejar.', Mercury: '¡Hijos muy inteligentes! Excelentes en académico.', Jupiter: '¡Hijos bendecidos! Fortuna a través de los hijos.', Venus: 'Hijos artísticos hermosos. Conexión con hijas.', Saturn: 'Los hijos pueden llegar tarde. Pero hijos responsables.' };
            text += `${ch[p.id] || ''}<br>`;
        });
    }

    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if (jH === 5) text += isEasy ? '<br>🌟 <strong>¡La mejor fortuna con hijos! Los hijos traen gran suerte.</strong>' : '<br>🌟 <strong>¡Júpiter en la 5ª! La mejor fortuna con hijos.</strong>';
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
    let text = isEasy ? '<strong>Viajes al extranjero·fortuna:</strong><br>' : '<strong>Casa 9 (Viajes al extranjero·fortuna·Educación superior):</strong><br>';
    if (h9.length === 0) {
        text += 'Viajes al extranjero existen pero no una conexión fuerte.';
    } else {
        h9.forEach(p => {
            const f9 = { Sun: 'El padre tiene conexiones en el extranjero. Viajes gubernamentales al exterior.', Moon: 'Disfruta emocionalmente los viajes. Popularidad en el extranjero.', Mars: 'Aventura/desafío en el extranjero. Actividades militares/tecnológicas en el exterior.', Mercury: '¡Éxito en estudio/negocios en el extranjero! Habilidad multilingüe.', Jupiter: '¡Gran fortuna en el extranjero! Éxito en estudio/inmigración. Encuentro con maestros extranjeros.', Venus: 'Romance en el extranjero. Actividades artísticas/moda en el exterior.', Saturn: 'Éxito después de dificultades en el extranjero. Residencia a largo plazo.', Rahu: '¡Fuerte indicador de migración! Profundamente inmerso en cultura extranjera.', Ketu: 'Conexión de vidas pasadas con el extranjero. Peregrinación espiritual.' };
            text += isEasy ? `${f9[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f9[p.id] || ''}<br>`;
        });
    }

    text += isEasy ? '<br><strong>Asentamiento en el Extranjero:</strong><br>' : '<br><strong>Casa 12 (Asentamiento·Inmigración):</strong><br>';
    if (h12.length === 0) {
        text += 'La residencia doméstica es más natural.';
    } else {
        h12.forEach(p => {
            const f12 = { Sun: 'Encontrando identidad en el extranjero. Puesto gubernamental en el exterior.', Moon: '¡Alta posibilidad de vivir en el extranjero! Estabilidad emocional en ultramar.', Mars: 'Gasto de energía en el extranjero. Inversión/bienes raíces en el exterior.', Mercury: 'Negocios/TI en el extranjero. Educación en ultramar.', Jupiter: 'Crecimiento espiritual en el extranjero. Caridad. Universidad extranjera.', Venus: 'Lujo y placer en el extranjero. Actividades artísticas en el exterior.', Saturn: 'Trabajo duro en el extranjero. Pero asentamiento a largo plazo.', Rahu: '¡Indicador definitivo de inmigración! Adaptación a cultura occidental.', Ketu: 'Práctica espiritual en el extranjero. Vida solitaria en ultramar.' };
            text += isEasy ? `${f12[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f12[p.id] || ''}<br>`;
        });
    }

    if (rahu) {
        const rH = houseOf(rahu.sign);
        if ([9, 12, 7].includes(rH)) text += isEasy ? '<br>✈️ <strong>¡Muy alta posibilidad de migración al extranjero!</strong>' : '<br>✈️ <strong>Rahu en casa ' + rH + ' — ¡muy alta posibilidad de residencia en el extranjero!</strong>';
    }

    document.getElementById('foreignWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 행성 품위
// ═══════════════════════════════════════════════════
function renderDignity(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = {1:'Yo',2:'Dinero/Familia',3:'Comunicación/Hermanos',4:'Hogar/Madre',5:'Hijos/Romance',6:'Salud/Enemigos',7:'Pareja',8:'Transformación/Herencia',9:'Suerte/Extranjero',10:'Carrera/Fama',11:'Ingresos/Deseos',12:'Extranjero/Espiritualidad'};
    const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };
    const OWN = { Sun: [4], Moon: [3], Mars: [0,7], Mercury: [2,5], Jupiter: [8,11], Venus: [1,6], Saturn: [9,10] };

    // 쉬운 설명
    const planetRole = {
        Sun: 'Yo/Confianza/Padre/Autoridad',
        Moon: 'Emociones/Mente/Madre/Vida diaria',
        Mars: 'Energía/Coraje/Acción/Competencia',
        Mercury: 'Inteligencia/Comunicación/Aprendizaje/Negocios',
        Jupiter: 'Suerte/Sabiduría/Riqueza/Matrimonio',
        Venus: 'Amor/Encanto/Arte/Placer',
        Saturn: 'Paciencia/Pruebas/Responsabilidad/Esfuerzo'
    };

    let html = `<div class="interp-card" style="margin-bottom:16px;">
        <div class="interp-text">
            ${isEasy ?
            '<strong>💡 Guía fácil:</strong> Muestra cuán fuertemente actúa cada energía en tu vida.<br><br>🟢 <strong>Muy Fuerte</strong> = ¡Condición máxima! Gran fortuna y resultados.<br>🟡 <strong>Fuerte</strong> = Estable, buenos resultados.<br>⚪ <strong>Promedio</strong> = Ni fuerte ni débil.<br>🔴 <strong>Débil</strong> = Desafíos pero puedes superar con esfuerzo.' :
            '<strong>💡 Guía:</strong> La dignidad planetaria significa cuán bien ejerce su poder un planeta.<br><br>🟢 <strong>Exaltado</strong> = ¡Condición máxima! Gran fortuna y resultados en el área de vida de este planeta.<br>🟡 <strong>Domicilio</strong> = Cómodo como en casa. Resultados estables y buenos.<br>⚪ <strong>Neutral</strong> = Promedio. Ni fuerte ni débil.<br>🔴 <strong>Debilitado</strong> = Debilitado. Desafíos en esta área pero puedes superar con esfuerzo.'}
        </div>
    </div>`;

    positions.forEach(p => {
        if (!EXALT.hasOwnProperty(p.id)) return;
        let dignity, emoji, meaning, color, simpleDesc;
        const role = planetRole[p.id];

        const house = houseOf(p.sign);
        const area = houseArea[house] || '';

        if (p.sign === EXALT[p.id]) {
            dignity = 'Exaltado';
            emoji = '🟢';
            color = '#5cb85c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — ¡la mayor bendición! Los talentos innatos brillan y los buenos resultados llegan naturalmente.`
                : `<strong>${p.name} al máximo poder!</strong> La energía de "${role}" maximizada en <strong>${house}(${area})</strong>. Los talentos innatos brillan.`;
        } else if (p.sign === DEBI[p.id]) {
            dignity = 'Debilitado';
            emoji = '🔴';
            color = '#d9534f';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — puedes enfrentar desafíos. Pero el esfuerzo consciente lleva a gran crecimiento. Ve los remedios abajo.`
                : `<strong>${p.name} debilitado.</strong> La energía de "${role}" debilitada en <strong>${house}(${area})</strong>. Desafíos pero el esfuerzo consciente lleva al crecimiento. Ve remedios.`;
        } else if (OWN[p.id] && OWN[p.id].includes(p.sign)) {
            dignity = 'Signo Propio';
            emoji = '🟡';
            color = '#c9a84c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — trabaja establemente a tu favor. Los buenos resultados llegan naturalmente.`
                : `<strong>${p.name} en casa!</strong> La energía de "${role}" trabaja establemente en <strong>${house}(${area})</strong>. Buenos resultados naturalmente.`;
        } else {
            dignity = 'Neutral';
            emoji = '⚪';
            color = '#999';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — influencia promedio. Ni particularmente fuerte ni débil.`
                : `La energía de "${role}" de ${p.name} ejerce influencia promedio en <strong>${house}(${area})</strong>. Los resultados varían con otros planetas.`;
        }

        html += `<div class="interp-card">
            <div class="interp-title">${emoji} ${isEasy ? area + ' — ' : p.symbol + ' ' + p.name + ' — ' + SIGNS[p.sign] + ' ' + SIGN_SYMBOLS[p.sign] + ' → Casa ' + house + ' (' + area + ') — '}<span style="color:${color}">${isEasy ? (dignity.includes('Exaltado') ? '¡Muy Fuerte!' : dignity.includes('Debilitado') ? 'Débil' : dignity.includes('Signo Propio') ? 'Fuerte' : 'Promedio') : dignity}</span></div>
            <div class="interp-text">
                ${isEasy ? '' : '<span style="color:#666;font-size:12px;">Rol: ' + role + ' │ Posición: ' + house + ' = ' + area + '</span><br><br>'}
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
        { color: 'Rojo, Naranja', number: '1, 9', day: 'Martes', gem: 'Coral Rojo', dir: 'Este' },
        { color: 'Blanco, Rosa', number: '2, 6', day: 'Viernes', gem: 'Diamante', dir: 'Sureste' },
        { color: 'Verde', number: '3, 5', day: 'Miércoles', gem: 'Esmeralda', dir: 'Norte' },
        { color: 'Blanco, Plata', number: '2, 7', day: 'Lunes', gem: 'Perla', dir: 'Noroeste' },
        { color: 'Oro, Naranja', number: '1, 4', day: 'Domingo', gem: 'Rubí', dir: 'Este' },
        { color: 'Verde, Verde claro', number: '5, 3', day: 'Miércoles', gem: 'Esmeralda', dir: 'Sur' },
        { color: 'Blanco, Pastel', number: '6, 2', day: 'Viernes', gem: 'Diamante', dir: 'Oeste' },
        { color: 'Rojo, Carmesí', number: '9, 1', day: 'Martes', gem: 'Coral Rojo', dir: 'Sur' },
        { color: 'Amarillo, Oro', number: '3, 9', day: 'Jueves', gem: 'Zafiro Amarillo', dir: 'Noreste' },
        { color: 'Azul marino, Negro', number: '8, 4', day: 'Sábado', gem: 'Zafiro Azul', dir: 'Oeste' },
        { color: 'Azul marino, Púrpura', number: '4, 8', day: 'Sábado', gem: 'Zafiro Azul', dir: 'Oeste' },
        { color: 'Amarillo, Oro', number: '3, 7', day: 'Jueves', gem: 'Zafiro Amarillo', dir: 'Noreste' }
    ];

    const d = luckyData[lagnaSign];
    const html = `<div class="interp-card">
        <div class="interp-text">
            <strong>🎨 Color de Suerte:</strong> ${d.color}<br>
            <strong>🔢 Número de Suerte:</strong> ${d.number}<br>
            <strong>📅 Día de Suerte:</strong> ${d.day}<br>
            <strong>💎 Gema de Suerte:</strong> ${d.gem}<br>
            <strong>🧭 Dirección de Suerte:</strong> ${d.dir}<br>
            <strong>🪐 Planeta Regente del Lagna:</strong> ${['Marte','Venus','Mercurio','Luna','Sol','Mercurio','Venus','Marte','Júpiter','Saturno','Saturno','Júpiter'][lagnaSign]}
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
        Sun: { gem: 'Rubí', mantra: 'Om Suryaya Namaha', color: 'Naranja/rojo el domingo', food: 'Trigo, azafrán, semillas de girasol', charity: 'Domingo: donar trigo/cobre' },
        Moon: { gem: 'Perla', mantra: 'Om Chandraya Namaha', color: 'Blanco/plata el lunes', food: 'Leche, arroz, coco', charity: 'Lunes: donar arroz/leche' },
        Mars: { gem: 'Coral Rojo', mantra: 'Om Mangalaya Namaha', color: 'Rojo el martes', food: 'Lentejas, frutas rojas', charity: 'Martes: donar lentejas rojas' },
        Mercury: { gem: 'Esmeralda', mantra: 'Om Budhaya Namaha', color: 'Verde el miércoles', food: 'Judías verdes, verduras', charity: 'Miércoles: donar verduras verdes' },
        Jupiter: { gem: 'Zafiro Amarillo', mantra: 'Om Gurave Namaha', color: 'Amarillo el jueves', food: 'Garbanzos, plátanos, cúrcuma', charity: 'Jueves: donar alimentos amarillos/libros' },
        Venus: { gem: 'Diamante', mantra: 'Om Shukraya Namaha', color: 'Blanco/pastel el viernes', food: 'Leche, crema, frutas', charity: 'Viernes: donar ropa blanca/arroz' },
        Saturn: { gem: 'Zafiro Azul', mantra: 'Om Shanaishcharaya Namaha', color: 'Azul marino/negro el sábado', food: 'Frijoles negros, sésamo', charity: 'Sábado: donar frijoles negros/aceite' }
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
                <div class="interp-title">${p.symbol} ${p.name} Fortalecimiento ${isDebi ? '(Debilitado — ¡Especialmente Importante!)' : '(Posición Débil)'}</div>
                <div class="interp-text">
                    <strong>💎 Gema:</strong> ${r.gem} (Se recomienda anillo en dedo anular)<br>
                    <strong>🙏 Mantra:</strong> "${r.mantra}" (108 veces al día)<br>
                    <strong>🎨 Color:</strong> ${r.color}<br>
                    <strong>🍽️ Alimento:</strong> ${r.food}<br>
                    <strong>🤝 Caridad:</strong> ${r.charity}
                </div>
            </div>`;
        }
    });

    if (!html) {
        html = '<div class="interp-card"><div class="interp-text">¡Todos los planetas en buenas posiciones! No se necesitan remedios especiales. Usa la gema del regente de tu Lagna para suerte.</div></div>';
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
    const SIGN_RULERS = ['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
    const RULER_NAMES = {Sun:'Sun',Moon:'Moon',Mars:'Mars',Mercury:'Mercury',Jupiter:'Jupiter',Venus:'Venus',Saturn:'Saturn',Rahu:'Rahu',Ketu:'Ketu'};

    const isEasy = window.vedicMode === 'easy';
    let html = '';

    if (division === 10) {
        // D10 해석: career/커리어
        const d10_1lord = SIGN_RULERS[dLagnaSign];
        const d10_10sign = (dLagnaSign + 9) % 12;
        const d10_10lord = SIGN_RULERS[d10_10sign];
        const d10_10planets = dPositions.filter(p => p.dSign === d10_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💼 Análisis Detallado de Carrera' : '💼 D10 Análisis de Carrera') + '</div><div class="interp-text">';
        if (isEasy) {
            html += '<strong>Tu tendencia profesional:</strong><br>';
        } else {
            html += '<strong>D10 Lagna:</strong> ' + SIGNS[dLagnaSign] + ' (regente: ' + (RULER_NAMES[d10_1lord]||d10_1lord) + ')<br>';
            html += '<strong>D10 Casa 10 (carrera):</strong> ' + SIGNS[d10_10sign] + ' (regente: ' + (RULER_NAMES[d10_10lord]||d10_10lord) + ')<br>';
        }
        if (d10_10planets.length > 0) {
            if (!isEasy) html += '<strong>Planetas en la 10ª:</strong> ' + d10_10planets.map(p => p.name).join(', ') + '<br>';
        }

        // Career 성향 by D10 Lagna
        const careerBySign = [
            'Liderazgo, Militar, Deportes, Emprendedor',  // Aries
            'Finanzas, Artes, Bienes Raíces, Industria Alimentaria',     // Taurus
            'Comunicación, Medios, Educación, TI',  // Gemini
            'Enfermería, Bienes Raíces, Hoteles, Consejería',    // Cancer
            'Política, Entretenimiento, Gestión, Administración',        // Leo
            'Médica, Contabilidad, Análisis, Investigación',          // Virgo
            'Derecho, Diplomacia, Diseño, Consultoría',      // Libra
            'Investigación, Medicina, Seguros',          // Scorpio
            'Educación, Religión, Comercio Exterior, Editorial',      // Sagittarius
            'Administración, Construcción, Minería, Función Pública',        // Capricorn
            'TI, Innovación, ONG, Aviación',           // Aquarius
            'Artes, Hospital, Extranjero, Espiritualidad'           // Pisces
        ];
        html += '<strong>Campo adecuado:</strong> ' + careerBySign[dLagnaSign];
        html += '</div></div>';

    } else if (division === 7) {
        // D7 해석: children
        const d7_5sign = (dLagnaSign + 4) % 12;
        const d7_5lord = SIGN_RULERS[d7_5sign];
        const d7_5planets = dPositions.filter(p => p.dSign === d7_5sign);
        const benefics = d7_5planets.filter(p => p.natural === 'benefic');
        const malefics = d7_5planets.filter(p => p.natural === 'malefic');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👶 Análisis de Hijos' : '👶 D7 Análisis de Hijos') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D7 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
            html += '<strong>D7 Casa 5 (hijos):</strong> ' + SIGNS[d7_5sign] + ' (regente: ' + (RULER_NAMES[d7_5lord]||d7_5lord) + ')<br>';
        }
        if (d7_5planets.length > 0) {
            if (!isEasy) html += '<strong>Planetas en casa 5:</strong> ' + d7_5planets.map(p => p.name).join(', ') + '<br>';
        }
        if (benefics.length > 0) html += (isEasy ? 'Planetas benéficos — bendecido con hijos.' : 'Planetas benéficos en casa 5 — bendecido con hijos.') + '<br>';
        if (malefics.length > 0) html += (isEasy ? 'Planetas desafiantes — dificultades con hijos posibles.' : 'Planetas maléficos en casa 5 — dificultades relacionadas con hijos posibles.') + '<br>';
        if (d7_5planets.length === 0) html += isEasy ? 'Sin planetas en posición de hijos — otros factores necesitan análisis.' : 'Casa 5 vacía — verificar posición del señor de la 5ª.';
        html += '</div></div>';

    } else if (division === 12) {
        // D12 해석: 부모
        const d12_4sign = (dLagnaSign + 3) % 12; // 4 house = Mother
        const d12_9sign = (dLagnaSign + 8) % 12; // 9 house = Father
        const d12_4planets = dPositions.filter(p => p.dSign === d12_4sign);
        const d12_9planets = dPositions.filter(p => p.dSign === d12_9sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨‍👩‍👧 Análisis de Padres' : '👨‍👩‍👧 D12 Análisis de Padres') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D12 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
        }
        html += '<strong>' + (isEasy ? 'Mother' : 'D12 Casa 4 (Madre): ' + SIGNS[d12_4sign]) + '</strong>';
        if (d12_4planets.length > 0 && !isEasy) html += ' — ' + d12_4planets.map(p => p.name).join(', ');
        html += '<br>';
        html += '<strong>' + (isEasy ? 'Father' : 'D12 Casa 9 (Padre): ' + SIGNS[d12_9sign]) + '</strong>';
        if (d12_9planets.length > 0 && !isEasy) html += ' — ' + d12_9planets.map(p => p.name).join(', ');
        html += '<br>';

        const moon4 = d12_4planets.find(p => p.id === 'Moon');
        const sun9 = d12_9planets.find(p => p.id === 'Sun');
        if (moon4) html += (isEasy ? 'Luna en posición de madre — conexión profunda con la madre.' : 'Luna en casa 4 — conexión profunda con la madre.') + '<br>';
        if (sun9) html += (isEasy ? 'Sol en posición de padre — conexión profunda con el padre.' : 'Sol en casa 9 — conexión profunda con el padre.') + '<br>';
        html += '</div></div>';

    } else if (division === 60) {
        // D60 해석: 전생 karma (소챕터 구조)
        const d60_1lord = SIGN_RULERS[dLagnaSign];
        const d60_planets_1 = dPositions.filter(p => p.dSign === dLagnaSign);

        const D60_DEITIES = [
            {name:'Ghora',ko:'Ghora',nature:'malefic',desc:'Destrucción y miedo. Karma oscuro de vidas pasadas'},
            {name:'Rakshasa',ko:'Rakshasa',nature:'malefic',desc:'Energía demoníaca. Fuerte deseo y apego'},
            {name:'Deva',ko:'Deva',nature:'benefic',desc:'Ser divino. Mérito y bendiciones de vidas pasadas'},
            {name:'Kubera',ko:'Kubera',nature:'benefic',desc:'Dios de la riqueza. Karma de construcción de riqueza'},
            {name:'Yaksha',ko:'Yaksha',nature:'benefic',desc:'Guardián de la naturaleza. Armonía con la naturaleza'},
            {name:'Kinnara',ko:'Kinnara',nature:'benefic',desc:'Músico celestial. Talento artístico'},
            {name:'Bhrashta',ko:'Bhrashta',nature:'malefic',desc:'El caído. Karma de caer desde lo alto'},
            {name:'Kulaghna',ko:'Kulaghna',nature:'malefic',desc:'Destructor de familias. Karma relacionado con la familia'},
            {name:'Garala',ko:'Garala',nature:'malefic',desc:'Veneno. Karma de acciones tóxicas'},
            {name:'Vahni',ko:'Vahni',nature:'malefic',desc:'Dios del fuego. Karma de ira y destrucción'},
            {name:'Maya',ko:'Maya',nature:'malefic',desc:'Ilusión. Karma de engaño'},
            {name:'Purishaka',ko:'Purishaka',nature:'malefic',desc:'Esclavitud. Karma de restringir a otros'},
            {name:'Apampathi',ko:'Apampathi',nature:'benefic',desc:'Señor de las aguas. Purificación y sanación'},
            {name:'Marut',ko:'Marut',nature:'benefic',desc:'Dios del viento. Libertad y cambio'},
            {name:'Kala',ko:'Kala',nature:'malefic',desc:'Dios del tiempo. Karma del tiempo y la muerte'},
            {name:'Sarpa',ko:'Sarpa',nature:'malefic',desc:'Serpiente. Esclavitud y apego — incapaz de soltar'},
            {name:'Amrita',ko:'Amrita',nature:'benefic',desc:'Néctar de inmortalidad. Búsqueda de vida eterna'},
            {name:'Indu',ko:'Indu',nature:'benefic',desc:'Luna. Sensibilidad e intuición'},
            {name:'Mridu',ko:'Mridu',nature:'benefic',desc:'Lo gentil. Gentileza y compasión'},
            {name:'Komala',ko:'Komala',nature:'benefic',desc:'Lo delicado. Arte y belleza'},
            {name:'Heramba',ko:'Heramba',nature:'benefic',desc:'Avatar de Ganesha. Superar obstáculos'},
            {name:'Brahma',ko:'Brahma',nature:'benefic',desc:'Dios creador. Creación y conocimiento'},
            {name:'Vishnu',ko:'Vishnu',nature:'benefic',desc:'Dios preservador. Protección y orden'},
            {name:'Maheshwara',ko:'Maheshwara',nature:'benefic',desc:'Gran Señor Shiva. Transformación y liberación'},
            {name:'Deva2',ko:'Deva2',nature:'benefic',desc:'Santo. Práctica espiritual'},
            {name:'Bala',ko:'Bala',nature:'benefic',desc:'Fuerza. Fortaleza y coraje'},
            {name:'Vishwakarma',ko:'Vishwakarma',nature:'benefic',desc:'Arquitecto cósmico. Construcción y creación'},
            {name:'Tamasa',ko:'Tamasa',nature:'malefic',desc:'Oscuridad. Karma de ignorancia'},
            {name:'Kanchana',ko:'Kanchana',nature:'benefic',desc:'Oro. Pureza y valor'},
            {name:'Varaha',ko:'Varaha',nature:'benefic',desc:'Avatar jabalí de Vishnu. Salvación'},
            {name:'Ramasala',ko:'Ramasala',nature:'benefic',desc:'Morada de Rama. Moralidad y deber'},
            {name:'Ghrisha',ko:'Ghrisha',nature:'benefic',desc:'Lo radiante. Sabiduría e iluminación'},
            {name:'Indra',ko:'Indra',nature:'benefic',desc:'Rey de los dioses. Liderazgo'},
            {name:'Jala',ko:'Jala',nature:'benefic',desc:'Agua. Fluir y adaptación'},
            {name:'Vishwa',ko:'Vishwa',nature:'benefic',desc:'Universo. Amor universal'},
            {name:'Amara',ko:'Amara',nature:'benefic',desc:'Inmortal. Búsqueda de eternidad'},
            {name:'Bala2',ko:'Bala2',nature:'malefic',desc:'Fuerza joven. Uso inmaduro del poder'},
            {name:'Pitri',ko:'Pitri',nature:'malefic',desc:'Ancestros. Karma ancestral'},
            {name:'Rudra',ko:'Rudra',nature:'malefic',desc:'Dios de la tormenta. Transformación destructiva'},
            {name:'Varuna',ko:'Varuna',nature:'benefic',desc:'Dios del océano. Orden cósmico'},
            {name:'Aryama',ko:'Aryama',nature:'benefic',desc:'Deidad solar. Amistad y contratos'},
            {name:'Mitra',ko:'Mitra',nature:'benefic',desc:'Dios de la amistad. Confianza y compañerismo'},
            {name:'Agni',ko:'Agni',nature:'malefic',desc:'Dios del fuego. Fuego purificador'},
            {name:'Varuna2',ko:'Varuna2',nature:'benefic',desc:'Dios del océano. Sabiduría profunda'},
            {name:'Gauri',ko:'Gauri',nature:'benefic',desc:'Parvati. Devoción y amor'},
            {name:'Mahakala',ko:'Mahakala',nature:'malefic',desc:'Gran Tiempo. Intentando dominar el tiempo'},
            {name:'Pitamaha',ko:'Pitamaha',nature:'benefic',desc:'Gran Padre Brahma. Creador'},
            {name:'Kartikeya',ko:'Kartikeya',nature:'benefic',desc:'Dios de la guerra. Batalla justa'},
            {name:'Yama',ko:'Yama',nature:'malefic',desc:'Dios de la muerte. Juicio y justicia'},
            {name:'Kala2',ko:'Kala2',nature:'malefic',desc:'Tiempo. Perseguido por el tiempo'},
            {name:'Varuna3',ko:'Varuna3',nature:'benefic',desc:'Dios del océano. Ley y verdad'},
            {name:'Kubera2',ko:'Kubera2',nature:'benefic',desc:'Dios de la riqueza. Generosidad'},
            {name:'Aditya',ko:'Aditya',nature:'benefic',desc:'Dios del sol. Luz y verdad'},
            {name:'Rishi',ko:'Rishi',nature:'benefic',desc:'Sabio. Sabiduría y práctica'},
            {name:'Vasu',ko:'Vasu',nature:'benefic',desc:'Ser celestial. Gobernando la naturaleza'},
            {name:'Ashwini',ko:'Ashwini',nature:'benefic',desc:'Sanadores gemelos. Sanación'},
            {name:'Naga',ko:'Naga',nature:'malefic',desc:'Deidad serpiente. Misterio y secretos'},
            {name:'Gandharva',ko:'Gandharva',nature:'benefic',desc:'Músico celestial. Arte y música'},
            {name:'Prajapati',ko:'Prajapati',nature:'benefic',desc:'Creador. Creando vida'},
            {name:'Charachara',ko:'Charachara',nature:'benefic',desc:'Todas las cosas. Unidad con todo'}
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
            'Guerrero, Líder — Ejerció poder, liderazgo natural y determinación impresos en el alma.',
            'Artista, Agricultor — Trabajó con la naturaleza, instinto profundo de estabilidad y belleza material.',
            'Erudito, Comerciante — Vivió del conocimiento, versatilidad y curiosidad permanecen. Talento natural para idiomas.',
            'Protector, Cuidador — Cuidó de otros, sensibilidad profunda e instinto maternal. Fuerte karma del hogar.',
            'Realeza, Sacerdote — Tuvo alto estatus, autoridad natural y dignidad. Estar en el escenario es instinto del alma.',
            'Sanador, Servidor — Practicó medicina o servicio, excelentes habilidades analíticas. Ayudar a otros es deber del alma.',
            'Diplomático, Artista — Persiguió armonía y belleza, hábil en relaciones. La asociación es tema central.',
            'Practicante, Alquimista — Pasó por transformación profunda, fuerte atracción por secretos y misterios.',
            'Sabio, Explorador — Buscó la verdad, sabiduría espiritual y aventura permanecen. Karma de educación superior.',
            'Oficial, Arquitecto — Construyó orden, fuerte paciencia y responsabilidad. Disciplina impresa en el alma.',
            'Oficial, Guardián — Construyó orden social, espíritu organizacional. Regido por Saturno, deber impreso en el alma.',
            'Médium, Artista — Comulgó con el mundo espiritual, intuición extremadamente fuerte. Más cercano a la liberación.'
        ];

        // 행성별 D60 사인 해석 (전통)
        const d60PlanetInSign = {
            Sun: ['Vivió como guerrero o rey en vidas pasadas. Fuerte ego y liderazgo permanecen. Propósito del alma de establecer autoridad.','Vivió como artista o persona rica. El alma busca abundancia material. Atraído por la belleza sensorial.','Vivió como erudito o comerciante. Conocimiento y comunicación son temas centrales del alma.','Vivió como protector o cuidador. Cuidar de otros es un instinto profundo del alma.','Tuvo alto estatus como realeza o clero. La autoridad natural se traslada a esta vida.','Vivió como sanador o servidor. Análisis y servicio son el propósito del alma.','Vivió como diplomático o artista buscando armonía. Relaciones y equilibrio son la tarea del alma.','Vivió como practicante o alquimista en transformación profunda. Secretos y transformación impresos en el alma.','Vivió como sabio o explorador buscando la verdad. Sabiduría y aventura son la dirección del alma.','Vivió como oficial o arquitecto construyendo orden. Sistema y responsabilidad grabados en el alma.','Vivió como revolucionario o inventor adelantado a su tiempo. La originalidad es el rasgo del alma.','Vivió como médium o artista comulgando con el mundo espiritual. Intuición profunda permanece en el alma.'],
            Moon: ['Memorias emocionales de vidas pasadas son fieramente intensas. Ira y pasión impresas en el inconsciente. Dominar las emociones es la tarea.','Memorias emocionales de vidas pasadas son cálidas y estables. Memorias de abundancia permanecen en el inconsciente, buscando belleza.','Memorias emocionales de vidas pasadas son intelectuales y variadas. La curiosidad es fuerte por muchas experiencias pasadas.','Memorias emocionales de vidas pasadas son muy profundas. Fuertes memorias de hogar y cuidado crean emociones ricas.','Memorias emocionales de vidas pasadas están llenas de orgullo y dignidad. Memorias de ser reconocido y respetado permanecen.','Memorias emocionales de vidas pasadas se relacionan con servicio y análisis. Memorias de ayudar a otros crean un corazón cariñoso.','Memorias emocionales de vidas pasadas se relacionan con armonía y relaciones. Memorias de bellas conexiones impulsan buscar pareja.','Memorias emocionales de vidas pasadas son profundas e intensas. Memorias de cambios extremos crean emociones profundas como el océano.','Memorias emocionales de vidas pasadas se relacionan con libertad y exploración. Memorias de viaje y aprendizaje impulsan la expansión.','Memorias emocionales de vidas pasadas se relacionan con responsabilidad y paciencia. Memorias de cargas pesadas crean emociones maduras.','Memorias emocionales de vidas pasadas son únicas y extraordinarias. Memorias de ser diferente crean sensibilidad independiente.','Memorias emocionales de vidas pasadas son espirituales y trascendentes. Sueños y visiones son vívidos con conexión espiritual profunda.']
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
            return ' — deidad: <strong>' + d.deity.name + '</strong>(' + d.deity.ko + ') <span style="color:' + c + ';font-weight:700;">' + (d.deity.nature === 'benefic' ? 'Benéfico' : 'Maléfico') + '</span>';
        }

        const houseThemes = ['','Yo/Existencia','Riqueza/Valor','Comunicación/Aprendizaje','Hogar/Descanso','Creación/Amor','Servicio/Prueba','Relación/Pareja','Transformación/Secreto','Sabiduría/Religión','Sociedad/Carrera','Deseo/Ganancia','Liberación/Trascendencia'];

        // Parasara 인용
        if (!isEasy) {
            html += '<div class="interp-card" style="border-left:3px solid #8b7ec8;"><div class="interp-text" style="font-size:13px;color:#888;">';
            html += '📜 <strong>Parasara dice:</strong> "Shashtiamsha (D60) is the most important of all divisional charts. Benefic planets in benefic divisions give good results, malefic planets in malefic divisions give bad results."<br>';
            html += '<span style="color:#666;">— Brihat Parasara Hora Shastra (BPHS)</span></div></div>';
        }

        // ─── 소챕터 1: soul의 정체성 ───
        const lagnaD = getDeity(lagnaSidereal);
        let ch1 = isEasy
            ? '<strong>Identidad de vidas pasadas</strong>' + deityTag(lagnaD) + '<br><br>'
            : '<strong>D60 Lagna: ' + SIGNS[dLagnaSign] + ' ' + SIGN_SYMBOLS[dLagnaSign] + '</strong> (regente: ' + (RULER_NAMES[d60_1lord]||d60_1lord) + ')' + deityTag(lagnaD) + '<br><br>';
        ch1 += pastLifeThemes[dLagnaSign] + '<br>';
        if (lagnaD.deity) {
            ch1 += '<br>' + (isEasy ?
                (lagnaD.deity.nature === 'benefic' ?
                    'Hiciste muchas cosas buenas en vidas pasadas, así que las buenas oportunidades llegan naturalmente. Tu existencia está protegida.' :
                    'Lecciones no resueltas de vidas pasadas afectan tu personalidad, pero superarlas lleva a mayor crecimiento.') :
                (lagnaD.deity.nature === 'benefic' ?
                    '<strong>' + lagnaD.deity.ko + '</strong> guarda el Lagna. ' + lagnaD.deity.desc + ' — El mérito de vidas pasadas protege — las buenas oportunidades llegan naturalmente.' :
                    '<strong>' + lagnaD.deity.ko + '</strong> influencia el Lagna. ' + lagnaD.deity.desc + ' — Desafío kármico impreso, pero superarlo lleva al crecimiento.'));
        }
        if (d60_planets_1.length > 0) ch1 += '<br><br>' + d60_planets_1.map(p => p.name).join(', ') + (isEasy ? ' — karma central de vidas pasadas concentrado en estos planetas.' : ' posicionado en D60 Lagna — Karma central de vidas pasadas concentrado en estos planetas.');
        html += subChapter('🪐', 'Identidad del Alma — Quién Fuiste en Vidas Pasadas', ch1);

        // ─── 소챕터 2: soul의 목적 ───
        const sunD60 = dPositions.find(p => p.id === 'Sun');
        if (sunD60) {
            const sunD = getDeity(sunD60.sidereal);
            let ch2 = (isEasy ? '<strong>Memoria del Sol de Vidas Pasadas</strong>' : '<strong>D60 Sun: ' + SIGNS[sunD60.dSign] + ' ' + SIGN_SYMBOLS[sunD60.dSign] + '</strong>') + deityTag(sunD) + '<br><br>';
            ch2 += (d60PlanetInSign.Sun[sunD60.dSign] || '') + '<br>';
            if (sunD.deity) {
                ch2 += '<br>' + (isEasy ?
                    (sunD.deity.nature === 'benefic' ?
                        'Perseguiste bien tu verdadero propósito en vidas pasadas, así que la autorrealización llega naturalmente. ¡Ten confianza!' :
                        'Hubo confusión sobre quién eres en vidas pasadas. Encontrar tu verdadero yo es un viaje importante que te hace crecer.') :
                    (sunD.deity.nature === 'benefic' ?
                        'Deidad solar <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. El propósito del alma fue correctamente perseguido — la autorrealización llega naturalmente.' :
                        'Deidad solar <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. Desafío de vidas pasadas con el yo/autoridad — encontrar el verdadero yo es la tarea del alma.'));
            }
            html += subChapter('☉', 'Propósito del Alma — Por Qué Naciste', ch2);
        }

        // ─── 소챕터 3: 감정의 기억 ───
        const moonD60 = dPositions.find(p => p.id === 'Moon');
        if (moonD60) {
            const moonD = getDeity(moonD60.sidereal);
            let ch3 = (isEasy ? '<strong>Memoria de la Luna de Vidas Pasadas</strong>' : '<strong>D60 Moon: ' + SIGNS[moonD60.dSign] + ' ' + SIGN_SYMBOLS[moonD60.dSign] + '</strong>') + deityTag(moonD) + '<br><br>';
            ch3 += (d60PlanetInSign.Moon[moonD60.dSign] || '') + '<br>';
            if (moonD.deity) {
                ch3 += '<br>' + (isEasy ?
                    (moonD.deity.nature === 'benefic' ?
                        'Tu mente estaba en paz en vidas pasadas, así que eres emocionalmente estable con fuerte intuición. Confía en tu instinto.' :
                        'Rastros de dificultades emocionales de vidas pasadas permanecen profundos en tu corazón. La meditación y estar cerca del agua ayuda enormemente a sanar.') :
                    (moonD.deity.nature === 'benefic' ?
                        'Deidad lunar <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. La mente era pacífica — emocionalmente estable con fuerte intuición.' :
                        'Deidad lunar <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. Las heridas emocionales permanecen en el inconsciente. Reconocer y sanar es la tarea emocional de esta vida. La meditación y el descanso cerca del agua ayudan.'));
            }
            html += subChapter('☽', 'Memoria Emocional — Patrones Inconscientes', ch3);
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
            'Conexión de guerrero/líder de vidas pasadas. Karma matrimonial intenso e independiente. Almas que lucharon juntas.',
            'Conexión de artista/rico de vidas pasadas. Karma matrimonial materialmente abundante. Almas que persiguieron la belleza juntas.',
            'Conexión de erudito/comerciante de vidas pasadas. Karma matrimonial intelectual. Almas que estudiaron juntas.',
            'Conexión de familia/protector de vidas pasadas. Karma matrimonial de vínculo emocional profundo. Almas que se cuidaron mutuamente.',
            'Conexión de realeza/nobleza de vidas pasadas. Karma matrimonial espléndido y respetado. Almas que gobernaron juntas.',
            'Conexión de sanador/servidor de vidas pasadas. Karma matrimonial de servicio y devoción. Almas que ayudaron a otros juntas.',
            'Conexión de diplomático/artista de vidas pasadas. Karma matrimonial armonioso y bello. Almas que buscaron equilibrio juntas.',
            'Conexión de practicante/místico de vidas pasadas. Karma matrimonial intenso y transformador. Almas que compartieron vida y muerte.',
            'Conexión de sabio/explorador de vidas pasadas. Karma matrimonial libre y expansivo. Pareja extranjera posible.',
            'Conexión de oficial/arquitecto de vidas pasadas. Karma matrimonial responsable y estable. Matrimonio tardío posible.',
            'Conexión de oficial/soldado de vidas pasadas. Signo regido por Saturno con karma matrimonial responsable y disciplinado. Almas que practicaron el deber social juntas. Matrimonio puede ser tardío o con diferencia de edad.',
            'Conexión de médium/artista de vidas pasadas. Karma matrimonial místico y espiritual. Pueden conocerse primero en sueños.'
        ];

        let ch4 = (isEasy
            ? '<strong>Conexión de Pareja de Vidas Pasadas</strong><br><br>'
            : '<strong>D60 Casa 7 (pareja): ' + SIGNS[d60H7sign] + ' ' + SIGN_SYMBOLS[d60H7sign] + '</strong> (7 lord: ' + (RULER_NAMES[d60H7lord]||d60H7lord) + ')<br><br>');
        ch4 += spouseKarmaBySign[d60H7sign] + '<br>';

        if (d60H7planets.length > 0) {
            ch4 += '<br><strong>' + (isEasy ? 'Planetas en posición de pareja:' : 'Planetas D60 en la 7ª:') + '</strong><br>';
            d60H7planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (isEasy) {
                    ch4 += (p.natural === 'benefic'
                        ? 'Buena conexión de vidas pasadas con la pareja — bendiciones en esta vida.'
                        : 'Asuntos no resueltos de vidas pasadas con la pareja. Desafíos pero oportunidades de crecimiento.') + '<br>';
                } else {
                    ch4 += p.symbol + ' <strong>' + p.name + '</strong>' + deityTag(pD) + '<br>';
                    ch4 += (p.natural === 'benefic'
                        ? 'Benéfico en casa 7 — Buen karma con la pareja en vidas pasadas. Bendiciones de la pareja en esta vida también.'
                        : 'Maléfico en casa 7 — Karma no resuelto con la pareja de vidas pasadas. Resolviéndolo en esta vida. Desafiante pero oportunidad de crecimiento.') + '<br>';
                }
            });
        }

        // Venus (사랑의 karma)
        if (venusD60) {
            const venD = getDeity(venusD60.sidereal);
            const venH = ((venusD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (isEasy) {
                ch4 += '<br>' + (venD.deity && venD.deity.nature === 'benefic' ?
                    'Amaste sinceramente en vidas pasadas, así que un amor hermoso te espera.' :
                    'Lecciones de amor no resueltas de vidas pasadas. Aprender el amor verdadero es importante y te hace más profundo.');
            } else {
                ch4 += '<br><strong>♀ Venus (Planeta del Amor)</strong> → D60 ' + venH + ' casa (' + houseThemes[venH] + ')' + deityTag(venD) + '<br>';
                ch4 += venD.deity && venD.deity.nature === 'benefic' ?
                    'Venus bajo benéfica <strong>' + venD.deity.ko + '</strong> protección. El amor bien practicado — un amor hermoso te espera. ' + venD.deity.desc :
                    'Venus bajo maléfica <strong>' + (venD.deity?venD.deity.ko:'') + '</strong> influencia. Desafíos amorosos pasados — aprender el amor verdadero es la tarea. ' + (venD.deity?venD.deity.desc:'');
            }
        }

        // Rahu-Ketu 축 (1-7궁이면 전생 인연)
        if (rahuD60 && ketuD60) {
            const rahuH = ((rahuD60.dSign - dLagnaSign + 12) % 12) + 1;
            const ketuH = ((ketuD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (rahuH === 7 || ketuH === 7 || rahuH === 1 || ketuH === 1) {
                ch4 += isEasy
                    ? '<br><br>🔥 <strong>¡Conexión muy fuerte de vidas pasadas!</strong> Conexión profunda con la pareja en vidas pasadas — destinados a encontrarse en esta vida.'
                    : '<br><br>🔥 <strong>¡Eje Rahu-Ketu en línea D60 1-7!</strong> Esto indica una <strong>conexión muy fuerte de vidas pasadas</strong> con tu pareja. Destinados a encontrarse en esta vida.';
            }
        }

        // 7 lord의 D60 position
        const h7lordPlanet = dPositions.find(p => p.id === d60H7lord);
        if (h7lordPlanet) {
            const h7lH = ((h7lordPlanet.dSign - dLagnaSign + 12) % 12) + 1;
            const h7lD = getDeity(h7lordPlanet.sidereal);
            if (isEasy) {
                const h7lDesc = h7lH === 1 ? 'Pareja directamente conectada con tu crecimiento.' : h7lH === 4 ? 'Conocer a la pareja a través del hogar y el santuario.' : h7lH === 9 ? 'Conexión con la pareja a través del extranjero/educación.' : h7lH === 10 ? 'Conexión con la pareja a través de carrera/social.' : h7lH === 12 ? 'Conocer a la pareja en entornos extranjeros/espirituales.' : '';
                if (h7lDesc) ch4 += '<br><br>' + h7lDesc;
            } else {
                ch4 += '<br><br><strong>7 lord ' + (RULER_NAMES[d60H7lord]||d60H7lord) + '</strong> → D60 ' + h7lH + ' casa (' + houseThemes[h7lH] + ')' + deityTag(h7lD) + '<br>';
                ch4 += 'Conexión kármica con la pareja <strong>' + houseThemes[h7lH] + '</strong> se manifiesta a través de esta área. ';
                ch4 += h7lH === 1 ? 'Pareja directamente conectada con tu crecimiento.' : h7lH === 4 ? 'Conocer a la pareja a través del hogar y el santuario.' : h7lH === 9 ? 'Conexión con la pareja a través del extranjero/educación.' : h7lH === 10 ? 'Conexión con la pareja a través de carrera/social.' : h7lH === 12 ? 'Karma para conocer a la pareja en entornos extranjeros/espirituales.' : '';
            }
        }
        html += subChapter('💍', 'Karma de Pareja — Conexión de Vidas Pasadas', ch4);

        // ─── 소챕터 5: career karma ───
        const d60H10sign = (dLagnaSign + 9) % 12;
        const d60H10lord = SIGN_RULERS[d60H10sign];
        const d60H10planets = dPositions.filter(p => p.dSign === d60H10sign);
        const satD60 = dPositions.find(p => p.id === 'Saturn');
        const careerKarma = ['militar/liderazgo/deportes','finanzas/arte/agricultura','educación/medios/comercio','enfermería/inmuebles/hostelería','política/entretenimiento/gestión','médica/análisis/servicio','derecho/diplomacia/diseño','investigación/medicina','educación/religión/extranjero','administración/construcción/funcionario','tecnología/ciencia/innovación','arte/espiritualidad/hospital'][d60H10sign];

        let ch5 = (isEasy
            ? '<strong>Karma profesional de vidas pasadas</strong><br><br>'
            : '<strong>D60 Casa 10 (carrera): ' + SIGNS[d60H10sign] + ' ' + SIGN_SYMBOLS[d60H10sign] + '</strong> (10 lord: ' + (RULER_NAMES[d60H10lord]||d60H10lord) + ')<br><br>');
        ch5 += 'Karma profesional de vidas pasadas en <strong>' + careerKarma + '</strong> dirección. Atracción natural hacia este campo.<br>';
        if (satD60) {
            const satD = getDeity(satD60.sidereal);
            const satH = ((satD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) ch5 += '<br><strong>♄ Saturno (Señor del Karma)</strong> → D60 ' + satH + ' casa (' + houseThemes[satH] + ')' + deityTag(satD) + '<br>';
            ch5 += isEasy ?
                ('<br>' + (satD.deity && satD.deity.nature === 'benefic' ?
                    '¡Esta es una <strong>bendición muy rara</strong>! La paciencia de vidas pasadas reduce los desafíos profesionales en esta vida.' :
                    'Lección profesional pesada de vidas pasadas. El esfuerzo constante y ayudar a otros es la clave.')) :
                (satD.deity && satD.deity.nature === 'benefic' ?
                    'Saturno bajo deidad benéfica es una <strong>bendición muy rara</strong>! La paciencia de vidas pasadas reduce las pruebas profesionales.' :
                    'Saturno bajo deidad maléfica — <strong>karma pesado de vidas pasadas</strong> en el área profesional. ' + (satD.deity?satD.deity.desc:'') + '. Paciencia, servicio, mantra(Om Shanaishcharaya Namaha) para disolver este karma.');
        }
        if (d60H10planets.length > 0) {
            ch5 += '<br><br><strong>' + (isEasy ? 'Planetas de carrera:' : 'Planetas D60 en la 10ª:') + '</strong> ' + d60H10planets.map(p => p.name).join(', ') + ' — Karma profesional concentrado en estos planetas.';
        }
        html += subChapter('💼', 'Karma de Carrera — Vocación de Vidas Pasadas', ch5);

        // ─── 소챕터 6: wealth karma ───
        const d60H2sign = (dLagnaSign + 1) % 12;
        const d60H2planets = dPositions.filter(p => p.dSign === d60H2sign);
        let ch6 = (isEasy
            ? '<strong>Past life wealth karma</strong><br><br>'
            : '<strong>D60 Casa 2 (riqueza): ' + SIGNS[d60H2sign] + ' ' + SIGN_SYMBOLS[d60H2sign] + '</strong><br><br>');
        const wealthKarma = ['Instinto de riqueza autodidacta.','Ambiente abundante de vidas pasadas.','Construcción intelectual de riqueza.','Riqueza familiar/inmobiliaria.','Riqueza por autoridad.','Riqueza por servicio. Frugal.','Riqueza por asociación.','Riqueza de otros (herencia).','La fortuna trae riqueza. Extranjero.','Lento pero seguro. Rico después de la mediana edad.','Riqueza de innovación. No convencional.','Actividad espiritual y riqueza. Dar.'][d60H2sign];
        ch6 += wealthKarma + '<br>';
        if (d60H2planets.length > 0) {
            ch6 += isEasy ? '<br>' : '<br><strong>Planetas D60 en casa 2:</strong><br>';
            d60H2planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                ch6 += (isEasy ? '' : p.symbol + ' ' + p.name + deityTag(pD) + ' — ') + (p.natural === 'benefic' ? 'Buenas conexiones de riqueza de vidas pasadas — abundancia en esta vida también.' : 'Lecciones de riqueza de vidas pasadas. El esfuerzo constante puede superarlas.') + '<br>';
            });
        }
        html += subChapter('💰', 'Karma de Riqueza — Fortuna de Vidas Pasadas', ch6);

        // ─── 소챕터 7: 행성별 신 목록 (전문가 모드만) ───
        if (!isEasy) {
            let ch7 = '';
            const lagnaD2 = getDeity(lagnaSidereal);
            if (lagnaD2.deity) {
                const lc = lagnaD2.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                ch7 += '<div style="padding:4px 0;">⬆ Lagna → <strong>' + lagnaD2.deity.name + '</strong>(' + lagnaD2.deity.ko + ') <span style="color:' + lc + ';">' + (lagnaD2.deity.nature === 'benefic' ? 'Benéfico' : 'Maléfico') + '</span></div>';
            }
            positions.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (pD.deity) {
                    const c = pD.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                    ch7 += '<div style="padding:4px 0;">' + p.symbol + ' ' + p.name + ' → <strong>' + pD.deity.name + '</strong>(' + pD.deity.ko + ') <span style="color:' + c + ';">' + (pD.deity.nature === 'benefic' ? 'Benéfico' : 'Maléfico') + '</span></div>';
                }
            });
            html += subChapter('🕉️', 'Lista de Deidades Planetarias', ch7);
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
            '<strong style="color:#5cb85c">' + beneficCount + ' buena energía</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' energía de precaución</strong> de 9 planetas<br><br>' :
            '<strong style="color:#5cb85c">' + beneficCount + ' benéfico</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' maléfico</strong> ubicación<br><br>';
        if (beneficCount >= 7) {
            ch8 += isEasy ?
                '🌟 <strong>¡Hiciste tantas cosas buenas en vidas pasadas!</strong> Casi todos los planetas bajo buena energía — obteniendo buenos resultados naturalmente. Fuerte fortuna innata.' :
                '🌟 <strong>Mérito muy fuerte de vidas pasadas.</strong> Parasara llamó a tales cartas "un alma bendecida por los dioses". La mayoría de planetas bajo benéficos — buenos resultados naturalmente.';
        } else if (beneficCount >= 5) {
            ch8 += isEasy ?
                '✨ <strong>Abundante buena energía de vidas pasadas.</strong> Protegido en muchas áreas de la vida.' :
                '✨ <strong>Mérito abundante de vidas pasadas.</strong> Los benéficos dominan — protegido en muchas áreas.';
            if (maleficPlanets.length > 0) ch8 += isEasy ?
                ' Sin embargo, algunas áreas necesitan más esfuerzo.' :
                ' Sin embargo, existen desafíos kármicos en <strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>. Practica mantras y caridad para estos planetas.';
        } else if (beneficCount >= 3) {
            ch8 += isEasy ?
                '⚖️ <strong>Buena energía y energía desafiante están mitad y mitad.</strong> Cosas buenas y difíciles se alternan en la vida.' :
                '⚖️ <strong>Karma en equilibrio.</strong> Fortuna mixta — lo bueno y los desafíos se alternan.';
            if (maleficPlanets.length > 0) ch8 += '<br>' + (isEasy ? 'Planetas a observar:' : 'Planetas a observar:') + '<strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>';
        } else {
            ch8 += isEasy ?
                '🔥 <strong>Esta vida trata de resolver lecciones de vidas pasadas.</strong> Muchos desafíos, pero los que tienen las lecciones más pesadas crecen más. El esfuerzo constante y ayudar a otros es especialmente importante.' :
                '🔥 <strong>Una vida de ajuste de karma.</strong> Muchos desafíos de vidas pasadas, pero Parasara dijo "el alma con el karma más pesado crece más". La práctica de mantras y la caridad son especialmente importantes.';
        }
        html += subChapter('📊', 'Evaluación General del Karma', ch8);

        // (이전 코드 제거됨 - 신 목록과 해석은 위 소챕터에 통합)

    } else if (division === 2) {
        // D2 Hora — wealth·부의 축적
        const d2LagnaInterp = ['Riqueza autodidacta. Inversión independiente y agresiva.','Inversión sensorial y riqueza estable. Ingresos de inmuebles, comida, arte.','Ganar por actividad intelectual. Escritura, educación, agudeza empresarial.','Ingresos de inmuebles y familia. Propiedad de la madre. Cuidado con gastos emocionales.','Riqueza por liderazgo y autoridad. Gobierno, oro. Gastos ostentosos.','Ingresos por análisis y habilidades. Médica, contabilidad, servicio. Gerente frugal.','Riqueza por asociación. Derecho, diplomacia, moda, arte.','Construir riqueza con dinero ajeno (herencia, seguros, inversiones). Fuentes ocultas.','Ingresos por educación, extranjero, religión. La fortuna trae riqueza.','Esfuerzo sistemático construye riqueza. Lento pero seguro. Rico después de la mediana edad.','Ingresos por tecnología, innovación, redes. Fuentes no convencionales.','Ingresos por actividades espirituales/artísticas. Riqueza extranjera. Naturaleza generosa.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💰 Análisis Detallado de Riqueza' : '💰 D2 Hora — Análisis de Riqueza') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D2 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d2LagnaInterp + '<br><br>';

        const sunD2 = dPositions.find(p => p.id === 'Sun');
        const moonD2 = dPositions.find(p => p.id === 'Moon');
        const jupD2 = dPositions.find(p => p.id === 'Jupiter');
        const venD2 = dPositions.find(p => p.id === 'Venus');

        if (sunD2) {
            const sunInOwn = sunD2.dSign === 4; // Leo
            html += (isEasy ? '' : '<strong>☉ Sol → ' + SIGNS[sunD2.dSign] + ':</strong> ') + (sunInOwn ? (isEasy ? '🌟 <strong>¡Autodidacta!</strong> Construye riqueza a través de autoridad y liderazgo.' : '🌟 <strong>¡Sol en su propio Hora (Leo)!</strong> Tipo autodidacta. Construye riqueza a través de autoridad y liderazgo.') : (isEasy ? 'Ingresos a través de otros o sector gobierno/público.' : 'Sol en Hora de Luna. Ingresos a través de la ayuda de otros o sector gobierno/público.')) + '<br>';
        }
        if (moonD2) {
            const moonInOwn = moonD2.dSign === 3; // Cancer
            html += (isEasy ? '' : '<strong>☽ Luna → ' + SIGNS[moonD2.dSign] + ':</strong> ') + (moonInOwn ? (isEasy ? '🌟 <strong>¡Vida abundante a través de relaciones públicas!</strong>' : '🌟 <strong>¡Luna en su propio Hora (Cáncer)!</strong> Vida abundante a través del público y relaciones.') : (isEasy ? 'Ingresos por esfuerzo propio y actividad independiente.' : 'Luna en Hora de Sol. Ingresos por esfuerzo propio y actividad independiente.')) + '<br>';
        }
        if (jupD2) html += (isEasy ? '' : '<strong>♃ Jupiter → ' + SIGNS[jupD2.dSign] + ':</strong> ') + (isEasy ? (jupD2.dSign === 4 ? 'Puede construir gran riqueza con su propia habilidad.' : 'Abundancia a través de relaciones con otros.') : 'Júpiter en ' + (jupD2.dSign === 4 ? 'Hora Solar — gran riqueza por habilidad propia.' : 'Hora Lunar — abundancia a través de relaciones.')) + '<br>';
        if (venD2) html += (isEasy ? '' : '<strong>♀ Venus → ' + SIGNS[venD2.dSign] + ':</strong> ') + (isEasy ? (venD2.dSign === 4 ? 'Autodidacta a través de arte/artículos de lujo.' : 'Riqueza a través de la pareja.') : 'Venus en ' + (venD2.dSign === 4 ? 'Hora Solar — autodidacta por arte/lujo.' : 'Hora Lunar — riqueza por la pareja.')) + '<br>';

        // D2 2궁(축적된 부) 분석
        const d2H2sign = (dLagnaSign + 1) % 12;
        const d2H2planets = dPositions.filter(p => p.dSign === d2H2sign);
        html += '<br><strong>' + (isEasy ? 'Riqueza acumulada:' : 'D2 Casa 2 (riqueza acumulada) — ' + SIGNS[d2H2sign] + ':') + '</strong><br>';
        if (d2H2planets.length > 0) {
            d2H2planets.forEach(p => {
                const wealth = {Sun:'Riqueza a través de autoridad y estatus',Moon:'Riqueza fluida a través de actividades públicas',Mars:'Riqueza en bienes raíces, tecnología, campos competitivos',Mercury:'Riqueza en negocios, intelectual, campos de comunicación',Jupiter:'Riqueza abundante en educación, religión, derecho',Venus:'Riqueza relacionada con arte, moda, artículos de lujo',Saturn:'Riqueza lenta pero constante. Estable después de la mediana edad',Rahu:'Riqueza por métodos no convencionales o fuentes extranjeras',Ketu:'Desapegado de lo material. Persigue valores espirituales'};
                html += isEasy ? (wealth[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (wealth[p.id]||'') + '<br>';
            });
        } else {
            html += isEasy ? 'Acumula riqueza de forma constante.<br>' : 'Casa 2 vacía — la posición del señor de la casa 2 es clave para acumular riqueza.<br>';
        }
        html += '</div></div>';

    } else if (division === 3) {
        // D3 Drekkana — sibling·용기·소통
        const d3LagnaInterp = ['Independiente, liderazgo entre hermanos. Estilo de comunicación valiente.','Relaciones fraternas estables y materialmente cómodas. Hermanos artísticos posibles.','Hermanos intelectuales y comunicativos. Muchos hermanos o mucha conversación.','Vínculo fraterno emocionalmente profundo. Hermano maternal. Hermanos protectores.','Hermanos carismáticos y orgullosos. Hermano famoso o exitoso.','Hermanos analíticos y prácticos. Campo médico/educativo. Pueden ser críticos.','Hermanos diplomáticos y encantadores. Conexiones sociales por hermanos.','Relaciones fraternas intensas y secretas. Vínculos profundos tras conflictos.','Hermanos libres y filosóficos. Hermanos en el extranjero. Relacionado con religión/educación.','Hermanos responsables y ambiciosos. Sentido del deber. Pocos hermanos o relación seria.','Hermanos únicos e independientes. Relaciones fraternas no convencionales.','Hermanos espirituales y artísticos. Hermanos en el extranjero. Conexión emocional.'][dLagnaSign];

        const d3_3sign = (dLagnaSign + 2) % 12;
        const d3_11sign = (dLagnaSign + 10) % 12;
        const d3_3planets = dPositions.filter(p => p.dSign === d3_3sign);
        const d3_11planets = dPositions.filter(p => p.dSign === d3_11sign);
        const marsD3 = dPositions.find(p => p.id === 'Mars');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👫 Análisis de Hermanos y Coraje' : '👫 D3 Drekkana — Hermanos y Coraje') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D3 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d3LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Hermanos menores:' : 'D3 Casa 3 (menores) — ' + SIGNS[d3_3sign] + ':') + '</strong><br>';
        if (d3_3planets.length > 0) {
            const bro = {Sun:'Hermano menor tiene liderazgo y autoridad',Moon:'Emocionalmente cercano al hermano menor',Mars:'Hermano menor activo y valiente. Posibles discusiones',Mercury:'Hermano menor es intelectual con buena comunicación',Jupiter:'Hermano menor es sabio y trae fortuna',Venus:'Hermano menor es encantador y artístico',Saturn:'Dificultad con hermano menor. Posible diferencia de edad',Rahu:'Hermano menor es único o relacionado con el extranjero',Ketu:'Distancia con hermano menor. Conexión espiritual'};
            d3_3planets.forEach(p => { html += isEasy ? (bro[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (bro[p.id]||'') + '<br>'; });
        } else html += isEasy ? '' : 'Casa 3 vacía — verificar posición del señor de la 3ª.<br>';

        html += '<br><strong>' + (isEasy ? 'Hermanos mayores:' : 'D3 Casa 11 (hermanos mayores) — ' + SIGNS[d3_11sign] + ':') + '</strong><br>';
        if (d3_11planets.length > 0) {
            d3_11planets.forEach(p => { html += isEasy ? 'Influye en la relación con hermanos mayores.<br>' : '• ' + p.name + ' en casa 11 — influye en la relación con hermanos mayores.<br>'; });
        } else html += isEasy ? '' : 'Casa 11 sin planetas.<br>';

        if (marsD3) {
            const marsH = ((marsD3.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♂ Marte (karaka de hermanos):</strong> ';
            html += marsH <= 4 ? 'Relacion fraternal cercana. Hermanos valientes.' : marsH <= 8 ? 'Conflictos fraternales o transformacion a traves de hermanos.' : 'Hermanos en el extranjero o tendencia espiritual.';
        }
        html += '</div></div>';

    } else if (division === 4) {
        // D4 Chaturthamsha — 재산·부동산·행운
        const d4LagnaInterp = ['Adquiere propiedades activamente. Le gusta construir o comprar casas nuevas.','Bienes raíces estables y abundantes. Tierras y granjas. Vivienda lujosa.','Múltiples hogares o mudanzas frecuentes. Prefiere ambiente intelectual.','Hogar y propiedad son emocionalmente importantes. Cerca del agua. Propiedad de la madre.','Hogar grande y espacioso. Interior lujoso. Zona prestigiosa.','Vivienda limpia y práctica. Ambiente enfocado en salud. Múltiples propiedades pequeñas.','Hogar hermoso y armonioso. Interés en diseño interior. Propiedad con pareja.','Propiedad pasa por transformación. Propiedad heredada. Lugares secretos.','Terreno grande y propiedad extranjera. Cerca de instalaciones religiosas/educativas.','Inversión inmobiliaria sistemática. Edificios antiguos. Crecimiento lento pero seguro.','Estilo de vivienda único. Apartamento moderno. Instalaciones tecnológicas.','Hogar hermoso cerca del agua. Propiedad extranjera. Espacio espiritual.'][dLagnaSign];

        const d4_4sign = (dLagnaSign + 3) % 12;
        const d4_4planets = dPositions.filter(p => p.dSign === d4_4sign);
        const d4_10sign = (dLagnaSign + 9) % 12;
        const d4_10planets = dPositions.filter(p => p.dSign === d4_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🏠 Análisis de Propiedades y Fortuna' : '🏠 D4 Chaturthamsha — Análisis de Propiedades y Fortuna') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D4 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d4LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Propiedad/Hogar:' : 'D4 Casa 4 (inmuebles/hogar) — ' + SIGNS[d4_4sign] + ':') + '</strong><br>';
        if (d4_4planets.length > 0) {
            const prop = {Sun:'Edificio gubernamental o residencia prestigiosa',Moon:'Hogar hermoso. Cerca del agua. Influencia de la madre',Mars:'Construcción de nuevo hogar. Posibles disputas inmobiliarias',Mercury:'Bienes raíces comerciales. Múltiples propiedades',Jupiter:'¡Hogar espacioso y abundante! La mejor fortuna inmobiliaria',Venus:'Hogar lujoso. Interior hermoso',Saturn:'Propiedad antigua. Reparaciones necesarias. Estable después de la mediana edad',Rahu:'Bienes raíces en el extranjero. Vivienda no convencional',Ketu:'Indiferente a bienes raíces. Prefiere espacios espirituales'};
            d4_4planets.forEach(p => { html += isEasy ? (prop[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (prop[p.id]||'') + '<br>'; });
        } else html += isEasy ? 'Fortuna inmobiliaria estable.<br>' : 'Casa 4 vacía — la posición del señor de la 4ª es clave para la fortuna inmobiliaria.<br>';

        html += '<br><strong>' + (isEasy ? 'Fortuna general:' : 'D4 10th house (overall fortune) — ' + SIGNS[d4_10sign] + ':') + '</strong><br>';
        if (d4_10planets.length > 0) {
            d4_10planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '¡La fortuna general es buena!<br>' : 'Esfuerzo necesario pero oportunidad de crecimiento.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Benéfico en casa 10 — ¡la fortuna general es buena!' : 'Maléfico en casa 10 — esfuerzo necesario pero oportunidad de crecimiento.') + '<br>';
            });
        } else html += isEasy ? '' : 'Casa 10 sin planetas.<br>';
        html += '</div></div>';

    } else if (division === 16) {
        // D16 Shodashamsha — 차량·comfort·행복
        const d16LagnaInterp = ['Coches deportivos, motos — vehículos dinámicos. Disfruta conducir.','Vehículos premium y transporte cómodo. Confort material lujoso.','Múltiples vehículos o varios transportes. Le gustan los gadgets tecnológicos.','Vehículo familiar cómodo. Viajar en familia. La estabilidad material es felicidad.','Vehículos de máximo lujo. Gastos llamativos. Prefiere marcas premium.','Vehículos prácticos y eficientes. Dispositivos de salud.','Vehículo refinado y bien diseñado. Artículos estéticamente agradables.','Vehículo usado o heredado. Seguro importante. Experiencia material transformadora.','SUV o marcas extranjeras. Vehículo de viaje. Transporte aventurero.','Vehículo simple pero resistente. Practicidad primero. Mejor coche después de la mediana edad.','Vehículo eléctrico o de última tecnología. Transporte único.','Transporte acuático (barco). Artículos emocionalmente favoritos.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🚗 Vehículos y Confort' : '🚗 D16 Shodashamsha — Vehículos y Confort') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D16 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d16LagnaInterp + '<br><br>';

        const d16_4sign = (dLagnaSign + 3) % 12;
        const d16_4planets = dPositions.filter(p => p.dSign === d16_4sign);
        html += '<strong>' + (isEasy ? 'Confort/Felicidad:' : 'D16 Casa 4 (confort/felicidad) — ' + SIGNS[d16_4sign] + ':') + '</strong><br>';
        if (d16_4planets.length > 0) {
            d16_4planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '¡Abundante confort material y felicidad!<br>' : 'Esfuerzo necesario para confort material.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? '¡Confort material y felicidad abundantes!' : 'Esfuerzo necesario para el confort material.') + '<br>';
            });
        } else html += isEasy ? 'Confort material promedio.<br>' : 'Casa 4 vacía — la posición del señor de la 4ª es clave para la felicidad.<br>';

        const venD16 = dPositions.find(p => p.id === 'Venus');
        if (venD16) {
            const vH = ((venD16.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♀ Venus (karaka de confort):</strong> ';
            html += [,'Crea su propio confort','Confort a través de la riqueza','Felicidad a través de la comunicación','¡Gran felicidad en casa!','Felicidad a través de hijos/romance','Confort por gestión de salud','¡Felicidad a través de la pareja!','Felicidad a través de la transformación','Felicidad a través de viajes/aprendizaje','Confort por estatus social','Felicidad a través de amigos/red','Felicidad a través de la paz espiritual'][vH] || '';
        }
        html += '</div></div>';

    } else if (division === 20) {
        // D20 Vimshamsha — 영적 practice·종교
        const d20LagnaInterp = ['Espiritualidad activa. Karma yoga. Práctica a través del servicio activo.','Espiritualidad a través de la naturaleza y los sentidos. Práctica de mantras. Meditación en templos.','Espiritualidad intelectual. Investigación de escrituras. Despertar a través del conocimiento.','Espiritualidad emocional. Bhakti yoga (devoción). Atraído por la divinidad maternal.','Espiritualidad real. Práctica espiritual como líder. Adoración al sol.','Espiritualidad de servicio. Práctica a través de seva (servicio). Espiritualidad de sanación.','Espiritualidad de armonía. Experiencia divina a través del arte y la belleza. Tantra.','Espiritualidad transformadora profunda. Tantra, Kundalini. Práctica de muerte y renacimiento.','Espiritualidad buscadora. Peregrinación. Buscando un maestro. Práctica filosófica.','Espiritualidad tradicional. Práctica sistemática. Karma yoga. Práctica de paciencia.','Espiritualidad innovadora. Métodos no convencionales. Servicio a la humanidad.','Espiritualidad trascendente. Meditación, sueños, intuición. Experiencias místicas. Liberación.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🙏 Espiritualidad' : '🙏 D20 Vimshamsha — Espiritualidad') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D20 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d20LagnaInterp + '<br><br>';

        const jupD20 = dPositions.find(p => p.id === 'Jupiter');
        const sunD20 = dPositions.find(p => p.id === 'Sun');
        const ketuD20 = dPositions.find(p => p.id === 'Ketu');
        const d20_9sign = (dLagnaSign + 8) % 12;
        const d20_12sign = (dLagnaSign + 11) % 12;
        const d20_9planets = dPositions.filter(p => p.dSign === d20_9sign);

        if (jupD20) {
            const jH = ((jupD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♃ Júpiter (Maestro Espiritual) → ' + jH + 'th:</strong> ') + ([,'Fuerte yo espiritual','El conocimiento espiritual se convierte en riqueza','Habilidad de comunicación espiritual','Paz interior profunda','Mérito espiritual de vidas pasadas','Espiritualidad a través del servicio','Encuentro con un maestro','Conocimiento espiritual secreto','¡Mejor posición! Gran fortuna espiritual','Autoridad espiritual','Comunidad espiritual','Liberación y despertar'][jH] || '') + '<br>';
        }
        if (ketuD20) {
            const kH = ((ketuD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☋ Ketu (Liberación) → ' + kH + 'th:</strong> ') + ([,'Habilidad espiritual innata','Valores espirituales','Comunicación espiritual','Liberación interior profunda','Resultado de práctica de vidas pasadas','Alma de servicio','Crecimiento espiritual a través de la pareja','Espiritualidad transformadora profunda','Peregrino espiritual','Carrera espiritual','Líder de comunidad espiritual','Alma cerca de la liberación'][kH] || '') + '<br>';
        }
        html += '<br><strong>' + (isEasy ? 'Gurú/Maestro:' : 'D20 Casa 9 (gurú/maestro) — ' + SIGNS[d20_9sign] + ':') + '</strong><br>';
        if (d20_9planets.length > 0) {
            d20_9planets.forEach(p => { html += isEasy ? 'Fuerte conexión con maestro espiritual.<br>' : '• ' + p.name + ': Fuerte conexión con maestro espiritual.<br>'; });
        } else html += isEasy ? 'Bueno buscar activamente un maestro espiritual.<br>' : 'Casa 9 vacía — busca activamente un maestro espiritual.<br>';
        html += '</div></div>';

    } else if (division === 24) {
        // D24 차투르Vimshamsha — 교육·학문
        const d24LagnaInterp = ['Educación física, militar, entrenamiento de liderazgo.','Música, arte, culinaria, educación financiera.','Idiomas, literatura, comunicación, educación mediática.','Historia, psicología, ciencias del hogar.','Ciencias políticas, teatro, educación empresarial.','Medicina, ciencia, estadística. Aprendizaje preciso.','Derecho, diplomacia, diseño. Aprendizaje equilibrado.','Psicología, investigación, ocultismo.','Filosofía, teología, estudios internacionales. Estudio en el extranjero probable.','Negocios, administración, arquitectura. Aprendizaje sistemático.','TI, ingeniería, aviación, ciencias sociales. Aprendizaje innovador.','Arte, música, espiritualidad, estudios de cine. Aprendizaje intuitivo.'][dLagnaSign];

        const d24_4sign = (dLagnaSign + 3) % 12;
        const d24_5sign = (dLagnaSign + 4) % 12;
        const d24_4planets = dPositions.filter(p => p.dSign === d24_4sign);
        const d24_5planets = dPositions.filter(p => p.dSign === d24_5sign);
        const jupD24 = dPositions.find(p => p.id === 'Jupiter');
        const merD24 = dPositions.find(p => p.id === 'Mercury');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '📚 Análisis de Educación' : '📚 D24 Chaturvimshamsha — Análisis de Educación') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D24 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d24LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Educación Básica:' : 'D24 Casa 4 (educación básica) — ' + SIGNS[d24_4sign] + ':') + '</strong><br>';
        if (d24_4planets.length > 0) {
            d24_4planets.forEach(p => {
                const edu4 = {Sun:'Prestigious school. Authoritative education',Moon:'Comfortable learning environment. Strong home education influence',Mars:'Competitive learning. Physical/technical education strong',Mercury:'Best placement! Outstanding academic ability',Jupiter:'Rich educational environment. Good teachers',Venus:'Art education. Beautiful school',Saturn:'Difficult education environment but deep knowledge if overcome',Rahu:'Unconventional education. Foreign school',Ketu:'Less interest in education. Intuitive learning'};
                html += isEasy ? (edu4[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (edu4[p.id]||'') + '<br>';
            });
        } else html += isEasy ? 'Grows steadily in stable educational environment.<br>' : 'Casa 4 sin planetas.<br>';

        html += '<br><strong>' + (isEasy ? 'Educación Superior:' : 'D24 Casa 5 (educación superior/intelecto) — ' + SIGNS[d24_5sign] + ':') + '</strong><br>';
        if (d24_5planets.length > 0) {
            d24_5planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '¡Logro sobresaliente en educación superior!<br>' : 'Los desafíos académicos llevan al crecimiento.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? '¡Logro excepcional en educación superior!' : 'Los desafíos académicos llevan al crecimiento.') + '<br>';
            });
        } else html += isEasy ? 'Steady effort brings good results.<br>' : 'Casa 5 sin planetas.<br>';

        if (jupD24) {
            const jH = ((jupD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '<br>' : '<br><strong>♃ Júpiter (Sabiduría) → ' + jH + 'th:</strong> ') + ([1,4,5,9].includes(jH) ? '🎓 <strong>¡Alto logro académico esperado!</strong> Posgrado/doctorado/estudios en el extranjero posible.' : (isEasy ? 'Crecimiento a través de los estudios esperado.' : 'Crecimiento a través de los estudios. La bendición de Júpiter se manifiesta en la casa ' + jH + '.')) + '<br>';
        }
        if (merD24) {
            const mH = ((merD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☿ Mercurio (Aprendizaje) → ' + mH + 'th:</strong> ') + ([1,4,5,9].includes(mH) ? '📖 <strong>¡Intelecto excepcional!</strong> Talento en matemáticas, idiomas, análisis.' : (isEasy ? 'Habilidad intelectual bien expresada.' : 'Habilidad intelectual en el área de casa ' + mH + '.')) + '<br>';
        }
        html += '</div></div>';

    } else if (division === 27) {
        // D27 삽타Vimshamsha — 체력·강점·약점
        const d27LagnaInterp = ['Resistencia y energía fuertes. Excelente habilidad atlética. Cabeza/cara es fortaleza.','Resistencia y paciencia son fortalezas. Cuello/cuerdas vocales fuertes. Buena fuerza muscular.','Agilidad y reflejos fuertes. Cuidado del sistema nervioso necesario.','Resiliencia emocional es fortaleza. Cuidar pecho/estómago. Talento para nadar.','Corazón y columna fuertes. Físico carismático. Cuidado con exceso de trabajo.','Poder digestivo y analítico son fortalezas. Cuidar intestinos/piel. Yoga adecuado.','Físico equilibrado y armonioso. Cuidar riñones/espalda. Bailar te va bien.','Recuperación y resistencia son fortalezas. Cuidar salud reproductiva. Deportes extremos posibles.','Muslos e hígado fuertes. Ejercicio al aire libre adecuado. Cuidado con sobrepeso.','Huesos y articulaciones fuertes. Mejor paciencia. Más saludable con la edad.','Cuidar sistema circulatorio y tobillos. Prefiere ejercicio único. Métodos de salud innovadores.','Inmunidad e intuición son fortalezas. Cuidar pies/linfa. Ejercicio acuático adecuado.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💪 Análisis de Fuerza Física' : '💪 D27 Saptavimshamsha — Análisis de Fuerza Física') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D27 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d27LagnaInterp + '<br><br>';

        const marsD27 = dPositions.find(p => p.id === 'Mars');
        const sunD27 = dPositions.find(p => p.id === 'Sun');
        const satD27 = dPositions.find(p => p.id === 'Saturn');
        if (marsD27) {
            const mH = ((marsD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♂ Marte (Energía) → ' + mH + 'th:</strong> ') + ([,'¡Físico y voluntad fuertes!','Puede ganar por fuerza física','Coraje y espíritu aventurero fuertes','Tipo de ejercicio en casa','¡Talento deportivo!','Inmunidad para superar enfermedades','Ejercicio con la pareja','Fuerza de supervivencia en crisis','Fuerte en aventura/exploración','Fuerza física para la carrera','Energía de logro de metas','Actividad física en el extranjero'][mH] || '') + '<br>';
        }
        if (sunD27) {
            const sH = ((sunD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☉ Sol (Vitalidad) → ' + sH + 'th:</strong> ') + (isEasy ? 'Fuente de vitalidad: ' : 'Fuente de vitalidad en el área de casa ' + sH + '. ') + ([,'Energía del yo','Vitalidad de actividades de riqueza','Energía de la comunicación','Estabilidad del hogar','Vitalidad de la creación','Energía del servicio','Vitalidad de las relaciones','Energía de la transformación','Vitalidad de los viajes','Energía de la carrera','Vitalidad de la sociedad','Energía de la práctica espiritual'][sH] || '') + '<br>';
        }

        // D27 6 house (약점/질병) 분석
        const d27_6sign = (dLagnaSign + 5) % 12;
        const d27_6planets = dPositions.filter(p => p.dSign === d27_6sign);
        html += '<br><strong>' + (isEasy ? 'Debilidad:' : 'D27 Casa 6 (debilidad/vulnerabilidad) — ' + SIGNS[d27_6sign] + ':') + '</strong><br>';
        const bodyParts = ['Head/Brain','Neck/Thyroid','Lungs/Arms','Stomach/Chest','Heart/Back','Digestive/Intestines','Kidneys/Lower back','Reproductive','Liver/Thighs','Bones/Joints','Ankles/Circulatory','Feet/Immune'];
        html += 'Área vulnerable: <strong>' + bodyParts[d27_6sign] + '</strong> — cuida esta área con atención.<br>';
        if (d27_6planets.length > 0) {
            d27_6planets.forEach(p => { html += isEasy ? 'Se necesita atención especial para esta área.<br>' : '• ' + p.name + ' en casa 6 — se necesita atención especial para esta área.<br>'; });
        }
        html += '</div></div>';

    } else if (division === 30) {
        // D30 Trimshamsha — 불행·질병·장애
        const d30LagnaInterp = ['Accidentes, quemaduras, dolores de cabeza. Problemas por decisiones apresuradas. Manejar la ira.','Pérdida financiera, problemas dietéticos, tiroides. Cuidado con comer en exceso.','Ansiedad nerviosa, insomnio, problemas respiratorios. Evitar preocupación excesiva.','Inestabilidad emocional, problemas estomacales, problemas con agua. Controlar emociones.','Problemas cardíacos, daño al orgullo, exceso de trabajo. Necesita humildad y descanso.','Trastornos digestivos, alergias, estrés perfeccionista. Necesita relajación.','Problemas renales, conflictos de relación, indecisión. Necesita decisión.','Secretos, accidentes, cirugía, problemas sexuales. Chequeos regulares importantes.','Problemas hepáticos, sobrepeso, juego/gasto excesivo. Necesita moderación.','Articulaciones, huesos, depresión, soledad. Necesita calcio e interacción social.','Presión arterial, circulación, accidentes inesperados. Chequeos regulares.','Deficiencia inmune, adicción, salud mental. Necesita meditación y sueño.'][dLagnaSign];

        const d30_6sign = (dLagnaSign + 5) % 12;
        const d30_8sign = (dLagnaSign + 7) % 12;
        const d30_12sign = (dLagnaSign + 11) % 12;
        const d30_6planets = dPositions.filter(p => p.dSign === d30_6sign);
        const d30_8planets = dPositions.filter(p => p.dSign === d30_8sign);
        const d30_12planets = dPositions.filter(p => p.dSign === d30_12sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '⚠️ Detalles de Precaución de Salud' : '⚠️ D30 Trimshamsha — Enfermedad') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D30 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d30LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Precaución de enfermedades:' : 'D30 Casa 6 (enfermedad/enemigo) — ' + SIGNS[d30_6sign] + ':') + '</strong><br>';
        const diseaseBySign = ['Dolor de cabeza, fiebre, inflamación','Cuello, tiroides, diabetes','Pulmones, nervios, ansiedad','Estómago, retención de agua','Corazón, espalda, presión arterial','Digestivo, intestinos, piel','Riñones, espalda baja, urinario','Reproductivo, condiciones crónicas','Hígado, muslos, sobrepeso','Huesos, articulaciones, reumatismo','Circulatorio, presión arterial, tobillos','Inmunidad, pies, salud mental'];
        html += 'Cuidado con: <strong>' + diseaseBySign[d30_6sign] + '</strong><br>';
        if (d30_6planets.length > 0) {
            const dis = {Sun:'Cuidado con enfermedades de ojos y corazón',Moon:'Salud mental y problemas de retención de agua',Mars:'Cuidado con accidentes, cirugía, quemaduras',Mercury:'Sistema nervioso y problemas de piel',Jupiter:'Cuidado con hígado y sobrepeso',Venus:'Cuidado con riñón, diabetes, ETS',Saturn:'Enfermedad crónica, problemas articulares',Rahu:'Enfermedad de causa desconocida, adicción',Ketu:'Inmunidad reducida, alergia'};
            d30_6planets.forEach(p => { html += isEasy ? (dis[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (dis[p.id]||'') + '<br>'; });
        }

        html += '<br><strong>' + (isEasy ? 'Peligro/Cirugía:' : 'D30 Casa 8 (peligro/cirugía) — ' + SIGNS[d30_8sign] + ':') + '</strong><br>';
        if (d30_8planets.length > 0) {
            d30_8planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Precaucion de peligro/accidente. Seguro importante.' : 'Protegido en crisis.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Precaucion de peligro/accidente. Seguro importante.' : 'Protegido en crisis.') + '<br>'; });
        } else html += isEasy ? 'Pocos peligros grandes.<br>' : 'Casa 8 vacía — pocos peligros grandes.<br>';

        html += '<br><strong>' + (isEasy ? 'Hospitalización:' : 'D30 Casa 12 (hospitalización/pérdida) — ' + SIGNS[d30_12sign] + ':') + '</strong><br>';
        if (d30_12planets.length > 0) {
            d30_12planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Hospitalizacion posible.' : 'Sanacion espiritual y recuperacion.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Hospitalizacion posible. Medicina extranjera.' : 'Sanacion espiritual y recuperacion.') + '<br>'; });
        } else html += isEasy ? 'Bajo riesgo de hospitalización.<br>' : 'Casa 12 vacía — el riesgo de hospitalización es bajo.<br>';
        html += '</div></div>';

    } else if (division === 40) {
        // D40 Khavedamsha — 모계 유산
        const d40LagnaInterp = ['Madre independiente y de voluntad fuerte. Liderazgo heredado de la línea materna.','Madre gestiona bien la riqueza. Abundancia material de la línea materna.','Madre intelectual con buena comunicación. Talento de idiomas/educación heredado.','Vínculo muy profundo con la madre. Sensibilidad e intuición heredadas.','Madre con autoridad y dignidad. Liderazgo y honor heredados.','Madre excelente en gestión de salud. Espíritu analítico/de servicio heredado.','Madre atractiva y diplomática. Sentido artístico heredado.','Madre fuerte que pasó por transformación. Resiliencia heredada.','Madre educativa y religiosa. Sabiduría/filosofía heredada.','Madre responsable y estricta. Paciencia y disciplina heredadas.','Madre única y progresista. Pensamiento innovador heredado.','Madre espiritual e intuitiva. Arte/espiritualidad heredada.'][dLagnaSign];

        const d40_4sign = (dLagnaSign + 3) % 12;
        const d40_4planets = dPositions.filter(p => p.dSign === d40_4sign);
        const moonD40 = dPositions.find(p => p.id === 'Moon');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👩 Herencia Materna' : '👩 D40 Khavedamsha — Herencia Materna') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D40 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d40LagnaInterp + '<br><br>';

        if (moonD40) {
            const mH = ((moonD40.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☽ Luna (karaka de la madre):</strong> ';
            html += [,'La madre tiene fuerte influencia','Riqueza de la madre','Buena comunicacion con la madre','Vinculo profundo con la madre! Mejor posicion','La madre es creativa','La madre esta orientada al servicio','La madre influye en las relaciones','Herencia de la madre','La madre es religiosa/educativa','La madre tiene estatus social','La madre es independiente','La madre es espiritual'][mH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Familia materna:' : 'D40 Casa 4 (hogar materno) — ' + SIGNS[d40_4sign] + ':') + '</strong><br>';
        if (d40_4planets.length > 0) {
            d40_4planets.forEach(p => { html += isEasy ? 'Energía fuertemente heredada del lado materno.<br>' : '• ' + p.name + ': La energía de este planeta se hereda fuertemente del lado materno.<br>'; });
        } else html += isEasy ? 'Herencia estable del lado materno.<br>' : 'Casa 4 vacía — la posición del señor de la 4ª es clave para la herencia materna.<br>';
        html += '</div></div>';

    } else if (division === 45) {
        // D45 Akshavedamsha — 부계 유산
        const d45LagnaInterp = ['Padre activo y orientado a la acción. Coraje y liderazgo heredados.','Padre financieramente estable. Valores materiales heredados.','Padre intelectual y versátil. Habilidad de comunicación/negocios heredada.','Padre emocional y orientado a la familia. Instinto de cuidado heredado.','Padre autoritario y respetado. Liderazgo heredado.','Padre práctico y diligente. Habilidades analíticas/técnicas heredadas.','Padre diplomático y refinado. Habilidad social heredada.','Padre fuerte y misterioso. Resiliencia/perspicacia heredada.','Padre académico y religioso. Filosofía/moral heredada.','Padre estricto y ambicioso. Paciencia/disciplina heredada.','Padre creativo e innovador. Pensamiento tecnológico/científico heredado.','Padre espiritual y artístico. Intuición/creatividad heredada.'][dLagnaSign];

        const d45_9sign = (dLagnaSign + 8) % 12;
        const d45_9planets = dPositions.filter(p => p.dSign === d45_9sign);
        const sunD45 = dPositions.find(p => p.id === 'Sun');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨 Herencia Paterna' : '👨 D45 Akshavedamsha — Herencia Paterna') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D45 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d45LagnaInterp + '<br><br>';

        if (sunD45) {
            const sH = ((sunD45.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☉ Sol (karaka del padre):</strong> ';
            html += [,'El padre tiene fuerte influencia','Riqueza del padre','Buena comunicacion con el padre','El padre esta orientado a la familia','El padre es creativo','El padre esta orientado al servicio','El padre influye en las relaciones','Herencia del padre','El padre es religioso/educativo','El padre tiene exito en la sociedad! Mejor posicion','El padre es independiente','El padre es espiritual'][sH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Familia paterna:' : 'D45 Casa 9 (hogar paterno/padre) — ' + SIGNS[d45_9sign] + ':') + '</strong><br>';
        if (d45_9planets.length > 0) {
            d45_9planets.forEach(p => { html += isEasy ? 'Energía fuertemente heredada del lado paterno.<br>' : '• ' + p.name + ': La energía de este planeta se hereda fuertemente del lado paterno.<br>'; });
        } else html += isEasy ? 'Herencia estable del lado paterno.<br>' : 'Casa 9 vacía — la posición del señor de la 9ª es clave para la herencia paterna.<br>';
        html += '</div></div>';
    }

    interpEl.innerHTML = html;
}

