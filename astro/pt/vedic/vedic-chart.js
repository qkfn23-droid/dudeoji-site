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
        catGuide: e ? 'Glossário' : 'Guia para Iniciantes em Astrologia Védica',
        catBasic: e ? 'Minhas Posições Planetárias' : 'Carta Básica — Posições Planetárias & Mapa Natal',
        catDasha: e ? 'Meus Períodos de Vida' : 'Dasha — Análise de Períodos de Vida',
        catInterp: e ? 'Minha Leitura — Personalidade·Riqueza·Carreira·Saúde' : 'Interpretação — Personalidade·Riqueza·Carreira·Saúde·Yoga',
        catMarriage: e ? 'Detalhes do Meu Parceiro' : 'Casamento & Parceiro — D9 Navamsha',
        catCareer: e ? 'Minha Carreira·Riqueza' : 'Carreira & Riqueza — D10·D2·D4',
        catFamily: e ? 'Minha Família' : 'Família — D7·D3·D12·D40·D45',
        catSpirit: e ? 'Espiritualidade·Educação·Saúde' : 'Espiritualidade·Educação·Saúde — D20·D24·D27·D16',
        catWarn: e ? 'Precauções de Saúde' : 'Precauções — D30 Doença·Exterior',
        catKarma: e ? 'Karma de Vidas Passadas' : 'Karma — D60 Vidas Passadas·Karma'
    };
    for (var id in ids) { var el = document.getElementById(id); if (el) el.textContent = ids[id]; }

    var secs = {
        secPlanetHouse: e ? 'Como Cada Planeta Te Afeta' : 'Análise Planeta-em-Casa',
        secDignity: e ? 'Suas Forças e Fraquezas' : 'Dignidade Planetária (Exaltação·Debilitação·Domicílio)',
        secLucky: e ? 'Info de Sorte' : 'Informações de Sorte',
        secRemedy: e ? 'Formas de Aumentar Sua Sorte' : 'Remédios & Fortalecimento',
        secD10: e ? 'Detalhes de Carreira' : 'D10 Dashamsha (Carreira)',
        secD2: e ? 'Detalhes de Riqueza' : 'D2 Hora (Riqueza)',
        secD4: e ? 'Propriedades & Imóveis' : 'D4 Chaturthamsha (Propriedade)',
        secD7: e ? 'Filhos' : 'D7 Saptamsha (Filhos)',
        secD3: e ? 'Irmãos & Coragem' : 'D3 Drekkana (Irmãos)',
        secD12: e ? 'Pais' : 'D12 Dwadashamsha (Pais)',
        secD40: e ? 'Herança Materna' : 'D40 Khavedamsha (Materna)',
        secD45: e ? 'Herança Paterna' : 'D45 Akshavedamsha (Paterna)',
        secD24: e ? 'Educação' : 'D24 Chaturvimshamsha (Educação)',
        secD20: e ? 'Espiritualidade' : 'D20 Vimshamsha (Espiritualidade)',
        secD27: e ? 'Força Física' : 'D27 Saptavimshamsha (Força)',
        secD16: e ? 'Veículos & Conforto' : 'D16 Shodashamsha (Veículos)',
        secD30: e ? 'Detalhes de Precaução de Saúde' : 'D30 Trimshamsha (Doença)',
        secForeign: e ? 'Exterior & Imigração' : 'Exterior & Imigração (Casa 9·12)'
    };
    for (var sid in secs) { var sel = document.getElementById(sid); if (sel) sel.textContent = secs[sid]; }
}
function renderEasyMode(positions, lagnaSign, moonPos) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    var html = '';
    // Personality
    var personality = ['Orientado à ação! Decisões rápidas com qualidades de liderança. Ama novos desafios.','Ama estabilidade. Aprecia conforto e beleza. Uma vez decidido, vai até o fim.','Infinitamente curioso! Grande comunicador e multitalentoso.','Caloroso e emocional. Valoriza a família e lê bem as pessoas.','Líder nato! Grande presença com talento criativo.','Detalhista e analítico. Busca perfeição e cuida da saúde.','Busca harmonia. Refinado, charmoso, com excelente senso artístico.','Tem profundidade. Forte intuição que vê a verdade.','Espírito livre! Ama viajar e aprender, muito positivo.','Ambicioso. Paciente e mais atraente com a idade.','Único. Pensa diferente de todos, inovador.','Profundamente sensível. Forte intuição atraída por arte e espiritualidade.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">👤 Minha Personalidade</div><div class="interp-text">' + personality + '</div></div>';

    // Emotions
    if (moonPos) {
        var emotion = ['Uma paixão ardente queima dentro de você. Emoções sobem rápido e descem rápido. Quando estressado, precisa mover o corpo. Exercício e atividades ao ar livre funcionam melhor.','Emocionalmente muito estável. Não gosta de mudanças súbitas, encontra segurança no familiar. Boa comida, música e natureza curam sua alma.','Processa emoções racionalmente. Falar ajuda a organizar sentimentos. Curioso por muitas coisas ao mesmo tempo e não suporta tédio.','Extremamente sensível. Absorve as emoções dos outros como esponja. Lar é seu espaço seguro com forte vínculo com a mãe.','Expressão emocional dramática e apaixonada. Precisa profundamente de amor e reconhecimento. Atividades criativas são seu remédio emocional.','Tende a analisar e organizar emoções. Preocupa-se muito mas excelente em soluções práticas. Rotinas diárias trazem estabilidade emocional.','Encontra equilíbrio emocional nos relacionamentos. Se sente solitário sozinho, se estabiliza com parceiro ou amigos próximos. Arte e beleza trazem paz.','Emoções são tão profundas e intensas quanto o oceano. Ama profundamente e nunca esquece traição. Intuição incrivelmente forte.','Emocionalmente brilhante e otimista. Ama liberdade e odeia restrições. Viajar é o melhor remédio emocional.','Não mostra emoções facilmente. Forte senso de responsabilidade. Fica mais aberto emocionalmente com a idade.','Padrões emocionais únicos e imprevisíveis. Ama de maneiras não convencionais. Encontra realização emocional em causas sociais.','Extremamente intuitivo e espiritual. Sonhos são vívidos e às vezes proféticos. Arte, meditação e água trazem paz.'][moonPos.sign];
        html += '<div class="interp-card"><div class="interp-title">🌙 Meu Estilo Emocional</div><div class="interp-text">' + emotion + '</div></div>';
    }

    // Wealth
    var wealth = ['Tipo autodidata. Estilo de investimento agressivo, melhor para autônomo ou freelance. Pode ganhar rápido mas cuidado com investimentos apressados.','Acumula riqueza constantemente. Renda provável de imóveis, arte, alimentação. Equilíbrio nos gastos é chave.','Ganha através de habilidades intelectuais. Renda de escrita, educação, TI, marketing. Múltiplas fontes de renda combinam bem.','Riqueza vem pelo lar e família. Pode herdar da mãe ou ganhar por imóveis. Cuidado com gastos emocionais.','Ganha por liderança e autoridade. Riqueza segue posições altas. Conectado a governo e ouro.','Ganha por análise e habilidades profissionais. Renda estável de medicina, contabilidade, serviço.','Ganha por parcerias. Melhor fortuna com outros. Renda de direito, diplomacia, moda, arte.','Acumula por recursos de outros — herança, seguros, investimentos. Pode proteger riqueza em crises.','Fortuna segue sua riqueza. Renda de educação, exterior, filosofia. Sorte inesperada traz riqueza.','Acumula devagar mas seguro. Dificuldades financeiras no início mas riqueza estável após meia-idade.','Ganha por tecnologia, inovação, redes sociais. Métodos de renda não convencionais.','Ganha por arte ou atividades espirituais. Conexões de riqueza estrangeira. Riqueza espiritual paradoxalmente atrai riqueza.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">💰 Minha Riqueza</div><div class="interp-text">' + wealth + '</div></div>';

    // Spouse
    var spouse = ['Seu parceiro é energético e independente. Ativo e direto, apaixonado pelo trabalho. Não é do tipo que segue em silêncio — um parceiro que desafia junto.','Seu parceiro é bonito e sensual. Aprecia as coisas finas, estável e leal. Pode ter talento em culinária ou arte.','Seu parceiro é eloquente e espirituoso. Grande conversa é o maior charme. Um parceiro intelectual e versátil.','Seu parceiro é caloroso e orientado à família. Excelentes habilidades de cuidado. Estar juntos dá sensação de lar.','Seu parceiro é carismático e digno. Pode ter posição socialmente proeminente. Alta autoestima mas igualmente generoso.','Seu parceiro é meticuloso e prático. Interessado em saúde e bem-estar. Um tipo cuidadoso atento aos detalhes.','Seu parceiro é encantador e refinado. Diplomático com bom senso de equilíbrio, excelente gosto artístico.','Seu parceiro é intenso e misterioso. Emoções profundas — uma vez comprometido, vai até o fim. Atração intensa e predestinada.','Seu parceiro é livre e otimista. Pode ser de outra cultura ou conectado ao exterior. Filosófico e aventureiro.','Seu parceiro é sério e ambicioso. Forte senso de responsabilidade, provavelmente bem-sucedido socialmente. Casamento pode vir tarde mas dura muito.','Seu parceiro é único e independente. Pode conhecer de formas não convencionais. Intelectual com pensamento inovador.','Seu parceiro é espiritual e intuitivo. Conectado a artista ou praticante espiritual. Dá sensação sonhadora e romântica.'][(lagnaSign+6)%12];
    // 7 house 행성 추가 정보
    var h7p = positions.filter(function(p){return houseOf(p.sign)===7;});
    var spouseExtra = '';
    h7p.forEach(function(p) {
        var desc = {Sun:'Um parceiro com alto status social.',Moon:'Um parceiro emocional e carinhoso.',Mars:'Apaixonado mas discussoes possiveis. Parceiro forte.',Mercury:'Um parceiro intelectual com otima conversa.',Jupiter:'Um parceiro sabio e moral! Melhor fortuna matrimonial.',Venus:'Um parceiro muito atraente e amoroso.',Saturn:'Casamento tardio mas relacionamento duradouro. Diferenca de idade possivel.',Rahu:'Casamento nao convencional. Parceiro estrangeiro possivel.',Ketu:'Conexao de vidas passadas. Parceiro com forte vinculo espiritual.'};
        if (desc[p.id]) spouseExtra += '<br>✦ ' + desc[p.id];
    });
    html += '<div class="interp-card"><div class="interp-title">💍 Meu Parceiro</div><div class="interp-text">' + spouse + spouseExtra + '</div></div>';

    // Career
    var career = ['Carreiras de liderança. Militar, polícia, esporte, cirurgia, gestão empresarial. Autônomo combina bem.','Finanças, alimentação, imóveis, moda, arte. Excelente em ambientes sensuais e estáveis.','Carreiras de comunicação e intelectuais. Mídia, escrita, educação, TI, marketing.','Profissões de cuidado. Medicina, enfermagem, hotelaria, culinária, aconselhamento.','Carreiras de palco. Política, entretenimento, gestão, governo. Posições criativas e autoritárias.','Carreiras de análise e precisão. Medicina, contabilidade, consultoria, gestão de saúde.','Carreiras de harmonia e beleza. Direito, diplomacia, moda, design de interiores, aconselhamento.','Carreiras de investigação profunda. Pesquisa, seguros, medicina, psicologia, impostos.','Carreiras de aprendizado e exploração. Educação, direito, religião, editorial, viagens.','Carreiras de sistema e organização. Gestão, serviço público, arquitetura. Sucesso lento mas certo.','Carreiras de inovação e tecnologia. TI, ciência, aviação, trabalho social.','Carreiras de arte e espiritualidade. Arte, cinema, música, medicina, exterior, ONG.'][(lagnaSign+9)%12];
    html += '<div class="interp-card"><div class="interp-title">💼 Minha Carreira</div><div class="interp-text">' + career + '</div></div>';

    // Health
    var health = ['Cabeça e rosto são pontos fracos. Dores de cabeça e febres comuns. Exercício regular e manter-se hidratado. Cuidado com acidentes.','Pescoço e tireoide são fracos. Tendência a comer demais — cuidado com peso e diabetes. Boa comida com moderação.','Pulmões, braços, ombros, sistema nervoso. Ansiedade e problemas de sono possíveis. Meditação respiratória ajuda.','Zona do estômago e peito. Estresse emocional afeta diretamente a digestão. Comida quente e chá ajudam.','Coração, costas, coluna. Cuidado com excesso de trabalho. Exercício cardiovascular regular. Descansar o suficiente.','Sistema digestivo, intestinos, pele. Indigestão e alergias possíveis. Dieta é crucial.','Rins, lombar, pele. Manter-se hidratado e equilibrado. Reduzir açúcar.','Sistemas reprodutivo e excretor. Condições crônicas possíveis. Exames regulares importantes.','Fígado, coxas, quadris. Cuidado com peso. Atividades ao ar livre são melhores.','Ossos, articulações, joelhos, pele. Cuidado com reumatismo. Cálcio e vitamina D importantes.','Tornozelos, panturrilhas, sistema circulatório. Controle de pressão arterial importante.','Pés, linfático, sistema imunológico. Sono adequado é seu segredo de saúde mais poderoso.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">🏥 Minha Saúde</div><div class="interp-text">' + health + '</div></div>';

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
                    var dashaDesc = {Ketu:'Um período de crescimento espiritual. Foque no seu interior em vez do material.',Venus:'Um tempo de amor e abundância! Romance, casamento e arte florescem.',Sun:'Um tempo de autodescoberta e liderança. A confiança cresce forte.',Moon:'Um tempo de emoções e lar. Relacionamentos familiares se tornam importantes.',Mars:'Um tempo de ação e energia. Ótimo para começar coisas novas.',Rahu:'Um tempo de mudança e inovação. Oportunidades inesperadas surgem.',Jupiter:'Um tempo de sorte e crescimento! Muitas coisas boas em educação, casamento, promoção.',Saturn:'Um tempo de paciência e provações. Crescimento lento mas certo.',Mercury:'Um tempo de atividade intelectual. Favorável para estudo, negócios, comunicação.'};
                    html += '<div class="interp-card"><div class="interp-title">⏳ Meu Período Atual</div><div class="interp-text">Período atual: <strong style="color:#c9a84c;">' + DASHA_KO[planet] + '</strong>.<br><br>' + (dashaDesc[planet]||'') + '</div></div>';
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
const SIGNS = ['Áries','Touro','Gêmeos','Câncer','Leão','Virgem',
               'Libra','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'];
const SIGNS_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

// Planets
const PLANETS = [
    { id: 'Sun', name: 'Sol', symbol: '☉', natural: 'malefic' },
    { id: 'Moon', name: 'Lua', symbol: '☽', natural: 'benefic' },
    { id: 'Mars', name: 'Marte', symbol: '♂', natural: 'malefic' },
    { id: 'Mercury', name: 'Mercúrio', symbol: '☿', natural: 'neutral' },
    { id: 'Jupiter', name: 'Júpiter', symbol: '♃', natural: 'benefic' },
    { id: 'Venus', name: 'Venus', symbol: '♀', natural: 'benefic' },
    { id: 'Saturn', name: 'Saturno', symbol: '♄', natural: 'malefic' },
];

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', ko: 'Ashwini', ruler: 'Ketu', meaning: 'Gemeos Cavalo', deity: 'Ashwini Kumaras', desc: 'Energia de cura e novos comecos. Uma pessoa com acao rapida e habilidades curativas.' },
    { name: 'Bharani', ko: 'Bharani', ruler: 'Venus', meaning: 'A Portadora', deity: 'Yama', desc: 'O ciclo de vida e morte. Forte paciencia e poder de liderar mudanca.' },
    { name: 'Krittika', ko: 'Krittika', ruler: 'Sun', meaning: 'O Cortador', deity: 'Agni', desc: 'O poder do fogo e da purificacao. Intelecto afiado e determinacao.' },
    { name: 'Rohini', ko: 'Rohini', ruler: 'Moon', meaning: 'A Estrela Vermelha', deity: 'Brahma', desc: 'A estrela da abundancia e beleza. Uma personalidade criativa e encantadora.' },
    { name: 'Mrigashira', ko: 'Mrigashira', ruler: 'Mars', meaning: 'Cabeca de Cervo', deity: 'Soma', desc: 'A estrela da exploracao e curiosidade. Um viajante incansavel buscando a verdade.' },
    { name: 'Ardra', ko: 'Ardra', ruler: 'Rahu', meaning: 'Lagrima', deity: 'Rudra', desc: 'Renascimento pela tempestade e destruicao. Emocoes intensas e poder transformador.' },
    { name: 'Punarvasu', ko: 'Punarvasu', ruler: 'Jupiter', meaning: 'Retorno da Luz', deity: 'Aditi', desc: 'A estrela da recuperacao e retorno. Uma personalidade otimista e sabia.' },
    { name: 'Pushya', ko: 'Pushya', ruler: 'Saturn', meaning: 'O Nutridor', deity: 'Brihaspati', desc: 'O nakshatra mais auspicioso. Energia de nutricao, protecao e prosperidade.' },
    { name: 'Ashlesha', ko: 'Ashlesha', ruler: 'Mercury', meaning: 'O Entrelacador', deity: 'Nagas', desc: 'Sabedoria da serpente e misterio. Perspicacia e intuicao profunda.' },
    { name: 'Magha', ko: 'Magha', ruler: 'Ketu', meaning: 'O Grande', deity: 'Pitris', desc: 'A estrela da realeza. Autoridade, respeito e bencaos ancestrais.' },
    { name: 'Purva Phalguni', ko: 'Purva Phalguni', ruler: 'Venus', meaning: 'Fruto Anterior', deity: 'Bhaga', desc: 'A estrela da alegria e do amor. Senso artistico e romance.' },
    { name: 'Uttara Phalguni', ko: 'Uttara Phalguni', ruler: 'Sun', meaning: 'Fruto Posterior', deity: 'Aryaman', desc: 'A estrela da amizade e dos contratos. Confianca e devocao.' },
    { name: 'Hasta', ko: 'Hasta', ruler: 'Moon', meaning: 'A Mao', deity: 'Savitar', desc: 'A estrela do artesanato e habilidade. Maos curadoras, o artista.' },
    { name: 'Chitra', ko: 'Chitra', ruler: 'Mars', meaning: 'Joia Brilhante', deity: 'Vishwakarma', desc: 'A estrela da beleza e criacao. Senso estetico excepcional.' },
    { name: 'Swati', ko: 'Swati', ruler: 'Rahu', meaning: 'O Independente', deity: 'Vayu', desc: 'A liberdade do vento. Uma personalidade independente e flexivel.' },
    { name: 'Vishakha', ko: 'Vishakha', ruler: 'Jupiter', meaning: 'O Bifurcado', deity: 'Indra-Agni', desc: 'A estrela das metas e determinacao. Forte foco e forca de vontade.' },
    { name: 'Anuradha', ko: 'Anuradha', ruler: 'Saturn', meaning: 'Seguindo Radha', deity: 'Mitra', desc: 'A estrela da amizade e devocao. Habilidades organizacionais e lideranca.' },
    { name: 'Jyeshtha', ko: 'Jyeshtha', ruler: 'Mercury', meaning: 'O Mais Velho', deity: 'Indra', desc: 'A estrela da protecao e autoridade. Forte senso de responsabilidade.' },
    { name: 'Mula', ko: 'Mula', ruler: 'Ketu', meaning: 'A Raiz', deity: 'Nirriti', desc: 'A estrela da destruicao e reconstrucao. Quem busca a raiz da verdade.' },
    { name: 'Purva Ashadha', ko: 'Purva Ashadha', ruler: 'Venus', meaning: 'Anterior Invencivel', deity: 'Apas', desc: 'O poder da agua e da purificacao. Energia vitoriosa oculta.' },
    { name: 'Uttara Ashadha', ko: 'Uttara Ashadha', ruler: 'Sun', meaning: 'Posterior Invencivel', deity: 'Vishvedevas', desc: 'A estrela da vitoria definitiva. Paciencia e lideranca.' },
    { name: 'Shravana', ko: 'Shravana', ruler: 'Moon', meaning: 'O Ouvinte', deity: 'Vishnu', desc: 'A estrela do conhecimento e da escuta. Um mestre do aprendizado e comunicacao.' },
    { name: 'Dhanishta', ko: 'Dhanishta', ruler: 'Mars', meaning: 'O Mais Rico', deity: 'Vasus', desc: 'A estrela da abundancia e musica. Talento e prosperidade.' },
    { name: 'Shatabhisha', ko: 'Shatabhisha', ruler: 'Rahu', meaning: 'Cem Curadores', deity: 'Varuna', desc: 'A estrela dos segredos e da cura. Habilidades de cura misteriosas.' },
    { name: 'Purva Bhadrapada', ko: 'Purva Bhadrapada', ruler: 'Jupiter', meaning: 'Pes Sortudos Anteriores', deity: 'Aja Ekapada', desc: 'A estrela do fogo e da transformacao. Despertar espiritual.' },
    { name: 'Uttara Bhadrapada', ko: 'Uttara Bhadrapada', ruler: 'Saturn', meaning: 'Pes Sortudos Posteriores', deity: 'Ahir Budhnya', desc: 'Sabedoria do oceano profundo. Meditacao e profundidade espiritual.' },
    { name: 'Revati', ko: 'Revati', ruler: 'Mercury', meaning: 'O Prospero', deity: 'Pushan', desc: 'A estrela da viagem e protecao. A conclusao de todas as coisas.' },
];

// Dasha periods (years)
const DASHA_YEARS = {
    'Ketu': 7, 'Venus': 20, 'Sun': 6, 'Moon': 10, 'Mars': 7,
    'Rahu': 18, 'Jupiter': 16, 'Saturn': 19, 'Mercury': 17
};
const DASHA_ORDER = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const DASHA_KO = {
    'Ketu': 'Ketu', 'Venus': 'Vênus', 'Sun': 'Sol', 'Moon': 'Lua', 'Mars': 'Marte',
    'Rahu': 'Rahu', 'Jupiter': 'Júpiter', 'Saturn': 'Saturno', 'Mercury': 'Mercúrio'
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
    html += '<th>Planeta</th><th>Signo</th><th>Grau</th><th>Nakshatra</th><th>Casa</th>';
    html += '</tr></thead><tbody>';

    // Add Lagna first with exact degree
    const lagnaDeg = lagnaSidereal % 30;
    const lagnaNakIdx = Math.floor(lagnaSidereal / (360/27));
    const lagnaNak = NAKSHATRAS[lagnaNakIdx] || {ko:'-'};
    html += `<tr><td>⬆ Lagna (Ascendente)</td><td>${SIGN_SYMBOLS[lagnaSign]} ${SIGNS[lagnaSign]}</td><td>${lagnaDeg.toFixed(1)}°</td><td>${lagnaNak.ko}</td><td>1</td></tr>`;

    positions.forEach(p => {
        const house = ((p.sign - lagnaSign + 12) % 12) + 1;
        const nak = NAKSHATRAS[p.nakshatra] || { ko: '-', name: '-' };
        const roleMap = { Sun:'Eu/Autoridade', Moon:'Emoções/Mente', Mars:'Energia/Coragem', Mercury:'Inteligência/Comunicação', Jupiter:'Sorte/Sabedoria', Venus:'Amor/Charme', Saturn:'Paciência/Responsabilidade', Rahu:'Desejo/Inovação', Ketu:'Espiritualidade/Libertação' };
        const houseArea = ['','Eu','Dinheiro·Família','Comunicação','Lar','Filhos·Romance','Saúde','Parceiro','Transformação','Fortuna·Exterior','Carreira','Renda','Espiritualidade'];
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
    const SIGN_RULERS = ['Marte','Venus','Mercurio','Lua','Sol','Mercurio','Venus','Marte','Jupiter','Saturno','Saturno','Jupiter'];
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
        'Lideranca, militar, esporte, empreendedorismo (pioneiro de fogo)',
        'Financas, agricultura, artes, imoveis, alimentacao (estabilidade e material)',
        'Comunicacao, midia, escrita, ensino, marketing (intelectual)',
        'Enfermagem, cuidado, culinaria, hotelaria, aconselhamento (cuidado emocional)',
        'Politica, entretenimento, lideranca, criatividade (palco brilhante)',
        'Medicina, contabilidade, analise, edicao, saude (servico preciso)',
        'Direito, diplomacia, design, moda, mediacao (equilibrio e beleza)',
        'Pesquisa, investigacao, medicina, ocultismo, psicologia (profundidade)',
        'Educacao, viagem, filosofia, religiao, editorial (expansao)',
        'Governo, construcao, gestao, CEO, lider organizacional (sistema e autoridade)',
        'Tecnologia, TI, invencao, ativismo social, ciencia (inovacao)',
        'Artes, espiritualidade, cura, musica, caridade (transcendencia e servico)'
    ];

    // 행성별 spouse career 경향
    const planetCareer = {
        Sun: 'Funcionario do governo, politico, medico, CEO — posicoes autoritarias',
        Moon: 'Enfermeiro, conselheiro, chef, hotelaria — papeis de cuidado',
        Mars: 'Militar, policia, cirurgiao, engenheiro, atleta',
        Mercury: 'Escritor, professor, programador, contador, comerciante',
        Jupiter: 'Professor, juiz, lider religioso, consultor, profissional senior',
        Venus: 'Designer, ator, musico, moda, industria de beleza',
        Saturn: 'Construcao, mineracao, agricultura, gestao, artesao',
        Rahu: 'TI, relacionado ao exterior, carreiras nao convencionais, pesquisa',
        Ketu: 'Espiritualidade, medicina alternativa, pesquisa, asceta'
    };

    let html = '';

    // 1. D9 Lagna 분석 (결혼 후 본인)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🕉️ Você Após o Casamento' : '🕉️ D9 Lagna — Você Após o Casamento: ' + SIGNS[d9LagnaSign] + ' ' + SIGN_SYMBOLS[d9LagnaSign]}</div>
        <div class="interp-text">
            ${isEasy ? 'Isso revela seu verdadeiro eu apos o casamento e na segunda metade da vida (apos os 30).' : 'O Lagna Navamsa esta em <strong>' + SIGNS[d9LagnaSign] + '</strong>. Isso revela seu verdadeiro eu apos o casamento e na segunda metade da vida (apos os 30).'}
            ${d9LagnaSign === d1LagnaSign ? (isEasy ? '<br><br><strong>Signo especial!</strong> Sua essencia permanece inalterada apos o casamento — eu interior e exterior estao alinhados.' : '<br><br><strong>D1 e D9 Lagna no mesmo signo!</strong> Chamado <strong>Vargottama</strong> — muito poderoso. Sua essencia permanece inalterada apos o casamento.') : ''}
            ${d9H1Planets.length > 0 ? '<br><br>' + (isEasy ? 'Ha energias que influenciam fortemente sua personalidade apos o casamento.' : '<strong>Planetas na D9 1ª:</strong> ' + d9H1Planets.map(p => p.symbol + ' ' + p.name).join(', ') + ' — influenciam fortemente sua personalidade apos o casamento.') : ''}
        </div>
    </div>`;

    // 2. D9 7 house (spouse)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Caráter do Parceiro' : '💍 D9 Casa 7 — Caráter do Parceiro: ' + SIGNS[d9H7Sign] + ' ' + SIGN_SYMBOLS[d9H7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'charme unico') + ' qualidade no parceiro.' : 'A casa 7 Navamsa esta em <strong>' + SIGNS[d9H7Sign] + '</strong>, regido por <strong>' + RULER_NAMES[d9H7Ruler] + '</strong>.<br><br>Isso revela a personalidade central do seu parceiro. ' + SIGNS[d9H7Sign] + ' parceiro com energia de ' + ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'charme unico') + ' qualidades.'}
            ${d9H7Planets.length > 0 ? '<br><br>' + (isEasy ? d9H7Planets.map(p => p.natural === 'benefic' ? 'Energia positiva! Voce recebe bencaos do seu parceiro.' : 'Energia desafiadora — tambem oportunidades de crescimento no casamento.').join('<br>') : '<strong>Planetas na D9 7ª:</strong><br>' + d9H7Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${p.natural === 'benefic' ? 'Benefico! Bencaos do seu parceiro.' : 'Energia desafiadora — tambem oportunidades de crescimento no casamento.'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 3. D9 10 house (본인의 Dharma/사명)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 Propósito de Vida' : '💼 D9 Casa 10 — Proposito de Vida (Dharma): ' + SIGNS[d9H10Sign] + ' ' + SIGN_SYMBOLS[d9H10Sign]}</div>
        <div class="interp-text">
            ${isEasy ? 'A verdadeira vocacao que voce persegue apos a maturidade.' : 'A casa 10 Navamsa esta em <strong>' + SIGNS[d9H10Sign] + '</strong>, regido por <strong>' + RULER_NAMES[d9H10Ruler] + '</strong>.<br><br>Enquanto a 10a de D1 mostra sua carreira, a 10a de D9 revela seu <strong>proposito de vida maior (Dharma)</strong>.'}<br><br>
            <strong>Direction of purpose:</strong> ${careerBySgn[d9H10Sign]}
            ${d9H10Planets.length > 0 ? '<br><br>' + (isEasy ? d9H10Planets.map(p => planetCareer[p.id] || 'energia de carreira unica').join('<br>') : '<strong>Planetas na D9 10ª:</strong><br>' + d9H10Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${planetCareer[p.id] || 'energia de carreira unica'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 4. spouse의 career (파생하우스: D9 4 house = 7 house서 10번째)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👔 Carreira do Parceiro' : '👔 Carreira do Parceiro — 10a Derivada (D9 4a): ' + SIGNS[d9H4Sign] + ' ' + SIGN_SYMBOLS[d9H4Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '<strong>Casa derivada:</strong> 10ª a partir da 7ª (parceiro) = Casa 4 D9 mostra carreira do parceiro.<br><br>A 4ª D9 esta em <strong>' + SIGNS[d9H4Sign] + '</strong>, regido por <strong>' + RULER_NAMES[d9H4Ruler] + '</strong>.<br><br>'}
            <strong>Spouse career tendency:</strong> ${careerBySgn[d9H4Sign]}
            ${d9H4Planets.length > 0 ? '<br><br>' + (isEasy ? d9H4Planets.map(p => `Parceiro provavelmente trabalha em ${planetCareer[p.id] || 'campo especializado'}`).join('<br>') : '<strong>Planetas na D9 4a (10a do parceiro):</strong><br>' + d9H4Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: Parceiro provavelmente trabalha em ${planetCareer[p.id] || 'campo especializado'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 5. 바르고타마 행성 체크
    const vargottamaPlanets = d9Positions.filter(p => p.sign === p.d9Sign);
    if (vargottamaPlanets.length > 0) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '⭐ Planetas Excepcionalmente Fortes' : '⭐ Planetas Vargottama — Excepcionalmente Fortes'}</div>
            <div class="interp-text">
                ${isEasy ? 'Estes planetas sao excepcionalmente poderosos e atuam consistentemente por toda a vida.' : 'Planetas no mesmo signo em D1 e D9 sao chamados <strong>Vargottama</strong>. Muito poderosos, atuando consistentemente por toda a vida.'}<br><br>
                ${isEasy ? 'Energia excepcionalmente forte atua consistentemente por toda sua vida!' : vargottamaPlanets.map(p => `<strong>${p.symbol} ${p.name}</strong>: Em D1 e D9 ${SIGNS[p.sign]} — a energia deste planeta e excepcionalmente forte!`).join('<br>')}
            </div>
        </div>`;
    }

    // 6. spouse 방향 분석 (UL + A7 + D1 7 house + D9 7 house 종합)
    const DIRECTIONS = {
        0:'Leste', 1:'Sul', 2:'Oeste', 3:'Norte',
        4:'Leste', 5:'Sul', 6:'Oeste', 7:'Norte',
        8:'Leste', 9:'Sul', 10:'Oeste', 11:'Norte'
    };
    const DIR_DETAIL = {
        0:'Leste (Aries — fogo)',1:'Sul (Touro — terra)',2:'Oeste (Gemeos — ar)',3:'Norte (Cancer — agua)',
        4:'Leste (Leao — fogo)',5:'Sul (Virgem — terra)',6:'Oeste (Libra — ar)',7:'Norte (Escorpiao — agua)',
        8:'Leste (Sagitario — fogo)',9:'Sul (Capricornio — terra)',10:'Oeste (Aquario — ar)',11:'Norte (Peixes — agua)'
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
        {name:'D1 7th', sign: d1H7Sign, desc:'Casa do parceiro na carta natal'},
        {name:'D9 7th', sign: d9H7Sign, desc:'Casa do parceiro no Navamsa'},
        {name:'D9 7th Lord', sign: d9H7RulerSign, desc:'Onde vai o senhor da 7a D9'},
        {name:'D9 Venus', sign: venusD9Sign, desc:'Karaka do parceiro no Navamsa'},
        {name:'Upapada (UL)', sign: ulSign, desc:'12a Arudha — contexto do parceiro'},
        {name:'Darapada (A7)', sign: a7Sign, desc:'7a Arudha — imagem social do parceiro'}
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
        <div class="interp-title">${isEasy ? '🧭 De Onde Vem Seu Parceiro' : '🧭 Direção do Parceiro — Análise de 6 Indicadores'}</div>
        <div class="interp-text">
            ${isEasy ? 'Analise de qual direcao seu parceiro pode vir.' : 'A astrologia vedica determina a direcao do parceiro combinando multiplos indicadores.'}<br><br>
            ${isEasy ? '' : '<strong>6 Indicadores:</strong><br>' + dirSources.map(s => `• <strong>${s.name}</strong>: ${SIGNS[s.sign]} ${SIGN_SYMBOLS[s.sign]} → <strong>${DIRECTIONS[s.sign]}</strong> <span style="color:#666;font-size:12px;">(${s.desc})</span>`).join('<br>') + '<br><br><strong>🧿 Upapada Lagna (UL):</strong> 12a Casa Arudha Pada. Indica a familia/contexto do parceiro e o ambiente do casamento. → <strong>' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign] + '</strong><br><strong>🎯 Darapada (A7):</strong> 7a Casa Arudha Pada. Indica a imagem social e a impressao externa do parceiro. → <strong>' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign] + '</strong><br><strong>💍 D9 7th lord (' + RULER_NAMES[d9H7Ruler] + '):</strong> O signo onde vai o regente da casa 7 Navamsa indica a direcao real do parceiro. → <strong>' + SIGNS[d9H7RulerSign] + ' ' + SIGN_SYMBOLS[d9H7RulerSign] + '</strong><br><strong>♀ D9 Venus:</strong> Significador natural do parceiro. A posicao de Venus no Navamsa mostra a fonte de energia do parceiro. → <strong>' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign] + '</strong><br><br>'}
            <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;margin-top:10px;">
                <strong style="font-size:16px;">🧭 Conclusion: ${agreement >= 4 ? 'Esmagadoramente forte' : agreement >= 3 ? 'Muito forte' : agreement >= 2 ? 'Strong' : ''} ${primaryDir} direction</strong><br><br>
                Out of 6 indicators <strong>${agreement}</strong> point to <strong>${primaryDir}</strong> point to this direction.
                ${agreement >= 4 ? '<br>4+ indicators agree! <strong>Very high probability</strong>of ' + primaryDir + '. Preste atencao a cidades, locais de trabalho ou viagens nesta direcao.' : ''}
                ${agreement === 3 ? '<br>3 indicadores — <strong>Alta probabilidade</strong> de direcao ' + primaryDir + ' direction.' : ''}
                ${agreement === 2 ? '<br>2 indicators — ' + primaryDir + ' favorecido mas outras possibilidades existem.' : ''}
                ${agreement <= 1 ? '<br>Indicadores dispersos — parceiro pode vir de varias direcoes. Mantenha a mente aberta.' : ''}
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
        "Lugares ativos, esporte, ambientes competitivos. Primeiro encontro intenso e repentino.",
        "Local de trabalho, instituicoes financeiras, restaurantes, natureza. Construindo confianca lentamente.",
        "Redes sociais, escola, seminarios, viajando, encontros as cegas. Relacao comeca com conversa.",
        "Apresentacoes familiares, reunioes de vizinhanca, amigos de infancia. Ambientes confortaveis.",
        "Festas, shows, encontros criativos, lugares glamorosos. Primeiro encontro dramatico.",
        "Local de trabalho, hospital, relacionado a saude, voluntariado. Encontro por necessidades praticas.",
        "Encontros as cegas, eventos juridicos/diplomaticos, exposicoes de arte. Encontro elegante.",
        "Situacoes de crise, conversas profundas, lugares secretos. Atracao intensa e predestinada.",
        "Exterior, universidade, encontros religiosos/filosoficos. Conexao de longe.",
        "Local de trabalho, eventos empresariais, funcoes oficiais. Encontro relacionado a status social.",
        "Online, clubes de hobby, movimentos sociais, amigo de amigo. Encontro unico.",
        "Encontros espirituais, exterior, artes/musica, hospital. Encontro mistico e predestinado."
    ];

    const backgroundBySgn = [
        "Familia independente e autodidata. Forte heranca de lideranca.",
        "Familia financeiramente estavel. Valores tradicionais.",
        "Familia intelectual e comunicativa. Enfase em educacao.",
        "Lar caloroso e orientado a familia. Forte figura materna.",
        "Familia prestigiosa e orgulhosa. Status social e reputacao.",
        "Familia pratica e trabalhadora. Contexto saude/medico/educacao.",
        "Familia equilibrada e digna. Contexto artes/direito/diplomacia.",
        "Familia com segredos ou transformacoes. Historia familiar profunda.",
        "Familia academica, religiosa/filosofica. Possivel contexto estrangeiro.",
        "Familia estrita e tradicional. Socialmente respeitada.",
        "Estrutura familiar livre e unica. Pensamento progressista.",
        "Familia espiritual ou artistica. Possivel contexto estrangeiro."
    ];

    const imageBySgn = [
        "Primeira impressao energetica e confiante. Imagem esportiva ou forte.",
        "Primeira impressao calma e confiavel. Imagem refinada e digna.",
        "Primeira impressao brilhante e falante. Imagem intelectual.",
        "Primeira impressao calorosa e cuidadora. Imagem suave.",
        "Primeira impressao glamorosa e carismatica. Imagem confiante.",
        "Primeira impressao arrumada e ordenada. Imagem profissional.",
        "Primeira impressao elegante e encantadora. Imagem sofisticada.",
        "Primeira impressao misteriosa e intensa. Imagem profunda.",
        "Primeira impressao livre e vibrante. Imagem aventureira.",
        "Primeira impressao seria e madura. Imagem responsavel.",
        "Primeira impressao unica e individualista. Imagem original.",
        "Primeira impressao sonhadora e mistica. Imagem artistica."
    ];

    const attractBySgn = [
        "Energia forte e confianca. Natureza proativa e protetora e atraente.",
        "Estabilidade e charme sensual. Apreciar boa comida e texturas.",
        "Sagacidade e habilidades de conversa. Estimulo intelectual e a atracao.",
        "Cuidado devoto e emocao. Sentir-se em casa juntos.",
        "Presenca brilhante e generosidade. Sentir-se especial juntos.",
        "Consideracao delicada e perfeccionismo. Atencao aos detalhes encanta.",
        "Elegancia e personalidade harmoniosa. O mundo fica belo juntos.",
        "Olhar intenso e profundidade. Foco que penetra a alma e a atracao.",
        "Espirito livre e humor. Aventuras comecam quando estao juntos.",
        "Confiabilidade solida e maturidade. Estabilidade firme e atraente.",
        "Individualidade unica e pensamento progressista. Frescor nunca visto.",
        "Sensibilidade mistica e profundidade espiritual. Romance de sonho."
    ];

    // D1 7 house 사인으로 만남 환경
    const d1H7ForMeeting = (d1LagnaSign + 6) % 12;

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🤝 Ambiente de Encontro' : '🤝 Ambiente de Encontro — D1 7ª: ' + SIGNS[d1H7ForMeeting] + ' ' + SIGN_SYMBOLS[d1H7ForMeeting]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'O signo da casa 7 revela o ambiente de encontro.<br><br>'}
            <strong>${meetingBySgn[d1H7ForMeeting]}</strong>
            ${d1H7ForMeeting === 8 || d1H7ForMeeting === 11 ? '<br><br>💡 <strong>Possibilidade de conexao estrangeira!</strong> Parceiro pode ser estrangeiro ou voces podem se conhecer no exterior.' : ''}
        </div>
    </div>`;

    // UL 사인으로 spouse 가문/배경
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏛️ Contexto Familiar do Parceiro' : '🏛️ Contexto do Parceiro — UL: ' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Upapada Lagna (UL) revela o contexto familiar do parceiro.<br><br>'}
            <strong>${backgroundBySgn[ulSign]}</strong>
        </div>
    </div>`;

    // A7 사인으로 spouse 외적 이미지
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👤 Primeira Impressão do Parceiro' : '👤 Primeira Impressão — A7: ' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Darapada (A7) mostra a primeira impressao do parceiro.<br><br>'}
            <strong>${imageBySgn[a7Sign]}</strong>
        </div>
    </div>`;

    // D9 Venus 사인으로 spouse 매력 포인트
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💎 Ponto de Atração do Parceiro' : '💎 Atração do Parceiro — D9 Vênus: ' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Venus no Navamsa revela o charme e estilo de amor do parceiro.<br><br>'}
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
            <div class="nakshatra-name">Sua Estrela: ${nak.ko}</div>
            <div class="nakshatra-meaning">"${nak.meaning}"</div>
            <div class="nakshatra-detail">${nak.desc}</div>
        </div>
    ` : `
        <div class="nakshatra-card">
            <div class="nakshatra-name">${nak.ko} (${nak.name})</div>
            <div class="nakshatra-meaning">"${nak.meaning}" — Planeta Regente: ${DASHA_KO[nak.ruler] || nak.ruler}</div>
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
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 A vida flui com diferentes energias. Verifique seu periodo atual.<br><br>' :
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 <strong>Vimshottari Dasha</strong> — A vida e dividida em periodos governados por 9 planetas. <strong>Mahadasha</strong> e o periodo principal, <strong>Antardasha (Bhukti)</strong> e o subperiodo. Calculado a partir da posicao lunar nakshatra.<br><br>';
    html += isEasy ?
        '</div></div>' :
        '🌙 Lua de nascimento: <strong>' + nak.ko + ' (' + nak.name + ')</strong> — Primeira Dasha: <strong>' + DASHA_KO[startRuler] + '</strong> (restante: ' + remainingYears.toFixed(2) + ' anos)</div></div>';

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
        const dashaEasyDesc = {Ketu:'Reflexão interior & crescimento espiritual',Venus:'Amor, beleza & abundância',Sun:'Confiança & liderança brilham',Moon:'Emoções & lar no centro do palco',Mars:'Desafios & energia de ação',Rahu:'Grandes mudanças & novas oportunidades',Jupiter:'Sorte & crescimento chegam',Saturn:'Paciência traz grandes recompensas',Mercury:'Estudo, comunicação & negócios prosperam'};
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
        'Orientado à ação! Rápido em decidir com qualidades de liderança natural. Você ama novos desafios. As pessoas pedem que você assuma a liderança. Um pouco impaciente, mas incrivelmente determinado.',
        'Você ama estabilidade. Aprecia conforto, beleza e boa comida. Uma vez decidido, vai até o fim. Teimoso, mas isso te torna incrivelmente confiável.',
        'Curioso por tudo! Grande comunicador e multitalentoso. Absorve informações rápido e atrai pessoas com sua sagacidade. Às vezes disperso, mas isso faz parte do seu charme.',
        'Caloroso e emocional. Valoriza a família e lê bem os sentimentos das pessoas. Um cuidador natural que faz todos se sentirem confortáveis. Mudanças de humor acontecem, mas sua empatia é seu superpoder.',
        'Líder nato! Você tem grande presença e naturalmente atrai atenção. Confiante e magnético. Deseja reconhecimento, mas é igualmente generoso com amor e elogios.',
        'Detalhista e analítico. Busca perfeição e cuida da saúde. Observador afiado que percebe o que outros perdem. Se preocupa demais, mas isso significa que está sempre preparado.',
        'Busca harmonia. Refinado, charmoso, com excelente gosto artístico. Um pacificador natural que odeia conflitos. Mais feliz quando cercado de coisas belas.',
        'Tem profundidade. Forte intuição que corta até a verdade. Calmo na superfície mas emoções intensas por baixo. A vida te joga grandes mudanças, e cada uma te torna mais forte.',
        'Espírito livre! Ama viajar e aprender. Positivo e filosófico. Interessado em diferentes culturas, com visão ampla do mundo. Seu humor ilumina qualquer ambiente.',
        'Ambicioso. Paciente e cada vez mais atraente com a idade. Trabalha sistematicamente rumo aos objetivos. Mesmo que lute no início, é do tipo que floresce tarde e eventualmente consegue tudo.',
        'Único. Pensa diferente de todos e é inovador. Odeia ser enquadrado e quer mudar o mundo à sua maneira. Talento em tecnologia ou ciência.',
        'Profundamente sensível. Forte intuição atraída por arte e espiritualidade. Sonhos vívidos e imaginação rica. Empatiza profundamente com a dor dos outros. Seu mundo interior é mais rico que o exterior.'
    ];
    const lagnaInterp = [
        'Lagna Áries regido por Marte. Forte vontade e liderança, personalidade independente. Rápido em agir com espírito pioneiro. Traços marcados com impressão ativa. Impulsivo mas corajoso.',
        'Lagna Touro regido por Vênus. Busca estabilidade e abundância, ama beleza sensorial. Aparência suave com voz atraente. Senso artístico excepcional. Teimoso mas confiável.',
        'Lagna Gêmeos regido por Mercúrio. Intelectualmente curioso com habilidades de comunicação excepcionais. Aparência jovem com compleição ágil. Versátil mas pode ser disperso.',
        'Lagna Câncer regido pela Lua. Rico em sensibilidade e altamente intuitivo. Rosto redondo com impressão suave. Devoto ao lar e família. Altos e baixos emocionais mas profundamente empático.',
        'Lagna Leão regido pelo Sol. Transbordando carisma e energia criativa. Compleição digna com presença imponente. Líder nato que aprecia os holofotes. Alta autoestima mas coração generoso.',
        'Lagna Virgem regido por Mercúrio. Analítico e perfeccionista. Aparência arrumada com impressão intelectual. Excelente atenção aos detalhes, interesse em saúde e higiene.',
        'Lagna Libra regido por Vênus. Busca equilíbrio e harmonia, diplomaticamente habilidoso. Aparência proporcionada com impressão refinada. Excelente em relacionamentos com superb senso estético.',
        'Lagna Escorpião regido por Marte. Intuição intensa e poder transformador. Olhos penetrantes com impressão misteriosa. Penetra a essência, guarda bem os segredos. Vive mudanças dramáticas múltiplas.',
        'Lagna Sagitário regido por Júpiter. Filósofo buscando liberdade e verdade. Compleição grande com impressão brilhante. Otimista e valoriza princípios morais. Conexões profundas com viagens e educação.',
        'Lagna Capricórnio regido por Saturno. Forte ambição e paciência. Compleição magra com impressão séria. Trabalha sistematicamente rumo a objetivos, rejuvenesce com a idade.',
        'Lagna Aquário regido por Saturno. Inovador e original. Aparência única com impressão intelectual. Valoriza ideais humanitários com pensamento não convencional.',
        'Lagna Peixes regido por Júpiter. Espiritual e intuitivo. Aparência suave com impressão sonhadora. Sensibilidade artística extremamente dotada. Tendência ao autossacrifício.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">👤 ${isEasy ? 'Sua Personalidade' : 'Personalidade & Aparência — Lagna: ' + SIGNS[lagnaSign] + ' ' + SIGN_SYMBOLS[lagnaSign]}</div>
        <div class="interp-text">${isEasy ? lagnaEasy[lagnaSign] : lagnaInterp[lagnaSign]}</div>
    </div>`;

    // ═══════════════════════════════════
    // 2. 내면 & 감정 (Moon 별자리)
    // ═══════════════════════════════════
    if (moonPos) {
        const moonEasy = [
            'Uma paixão ardente queima dentro de você. Emoções sobem rápido e descem rápido. Quando estressado, precisa mover o corpo — exercício ou atividades ao ar livre funcionam melhor.',
            'Você é emocionalmente muito estável. Não gosta de mudanças súbitas e encontra conforto no familiar. Boa comida, música e natureza bonita curam sua alma.',
            'Você processa emoções através da conversa. Falar te faz sentir melhor. Curioso por tudo e não suporta tédio. Seu humor pode aliviar qualquer clima.',
            'Você é extremamente sensível e empático. Absorve as emoções dos outros como esponja. Seu lar é seu espaço seguro, e seu vínculo com sua mãe é forte.',
            'Sua expressão emocional é dramática e apaixonada. Precisa profundamente ser amado e reconhecido. Mas dá amor com igual generosidade. Atividades criativas são seu remédio emocional.',
            'Tende a analisar suas emoções. Se preocupa muito mas é excelente em resolver problemas praticamente. Rotinas diárias trazem estabilidade emocional.',
            'Encontra equilíbrio emocional nos relacionamentos. Se sente solitário quando sozinho e se estabiliza com amigos próximos ou parceiro. Odeia conflitos e encontra paz na beleza e arte.',
            'Suas emoções são tão profundas e intensas quanto o oceano. Ama profundamente e nunca esquece traição. Sua intuição é incrivelmente forte — lê a verdade através de olhos e ações.',
            'Emocionalmente brilhante e otimista. Ama liberdade e odeia restrições. Viajar é seu melhor remédio emocional. Processa sentimentos através de pensamento filosófico.',
            'Não mostra emoções facilmente. Forte senso de responsabilidade, dever vem sempre primeiro. Pode ter sido maduro além da idade quando criança, mas fica mais aberto emocionalmente com a idade.',
            'Tem padrões emocionais únicos e imprevisíveis. Ama de maneiras não convencionais e vê o panorama geral. Encontra realização emocional em causas sociais.',
            'Extremamente intuitivo e espiritual. Sonhos são vívidos e às vezes proféticos. Empatiza profundamente com a dor dos outros. Arte, meditação e água trazem paz.'
        ];
        const moonInterp = [
            'Uma paixão ardente queima interiormente. Emoções são espontâneas e mudam rapidamente. A raiva se acende rápido mas apaga igual; desejo de independência emocional.',
            'Emocionalmente muito estável, buscando conforto. Não gosta de mudanças e encontra segurança no familiar. Curado por boa comida, música e natureza.',
            'Processa emoções racionalmente e organiza sentimentos pela conversa. Curioso com muitos interesses simultâneos. Busca variedade sobre profundidade emocional.',
            'Lua em seu próprio signo (domicílio). Extremamente rico em sensibilidade, absorvendo emoções alheias. Fortes instintos maternais, encontrando estabilidade em casa.',
            'Expressão emocional dramática e apaixonada. Forte necessidade de ser reconhecido e amado. Atividades criativas servem como cura emocional. Coração romântico e generoso.',
            'Tendência a analisar e organizar emoções. Preocupa-se muito e é perfeccionista mas resolve as coisas praticamente. Encontra estabilidade em rotinas diárias.',
            'Encontra equilíbrio emocional nos relacionamentos. Se sente ansioso sozinho e se estabiliza com parceiro. Extremamente avesso a conflitos, encontrando paz na arte e beleza.',
            'Emoções são tão profundas e intensas quanto o oceano. Ama profundamente e odeia profundamente; nunca perdoa traição. Intuição muito forte.',
            'Emocionalmente otimista e amante da liberdade. Não gosta de ser restringido e busca novas experiências. Sublima emoções pelo pensamento filosófico.',
            'Controla bem as emoções e não as mostra externamente. Forte senso de responsabilidade. Pode ter tido dificuldades emocionais na infância, mas amadurece com a idade.',
            'Padrões emocionais únicos e imprevisíveis. Independente, amando de maneiras não convencionais. Persegue amor universal pela humanidade e causas sociais.',
            'Extremamente intuitivo e espiritual. Sonhos são vívidos e podem ser proféticos. Empatiza profundamente com o sofrimento alheio. Encontra estabilidade na arte e meditação.'
        ];
        html += `<div class="interp-card">
            <div class="interp-title">🌙 ${isEasy ? 'Seu Estilo Emocional' : 'Interior & Emoções — Lua: ' + SIGNS[moonPos.sign] + ' ' + SIGN_SYMBOLS[moonPos.sign]}</div>
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
        wealthText += isEasy ? 'A acumulação de riqueza é constante e estável. Constrói-se sem grandes flutuações. ' : 'Sem planetas na 2ª — acumulação de riqueza constante. ';
    } else {
        h2planets.forEach(p => {
            const pWealth = {
                'Sun': 'Renda por autoridade e status. Ganhos potenciais do governo ou setor publico.',
                'Moon': 'Situacao financeira flutuante. Renda possivel em negocios voltados ao publico ou gastronomia.',
                'Mars': 'Tendencias de investimento agressivas. Renda de imoveis, tecnologia ou campos militares.',
                'Mercury': 'Ganhar dinheiro por habilidades intelectuais. Riqueza de escrita, educacao, comunicacoes e TI.',
                'Jupiter': 'A posicao mais auspiciosa! Fortuna abundante. Grandes rendas de educacao, direito ou religiao.',
                'Venus': 'Acumula riqueza por artigos de luxo, arte, entretenimento e moda.',
                'Saturn': 'Acumula lenta e constantemente. Dificuldades no inicio mas estabiliza apos meia-idade.',
                'Rahu': 'Ganha dinheiro por metodos nao convencionais. Riqueza repentina do exterior ou inovacao.',
                'Ketu': 'Indiferenca a riqueza. Valoriza o espiritual sobre o material; cuidado com perdas repentinas.'
            };
            wealthText += isEasy ? `${pWealth[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pWealth[p.id] || ''} `;
        });
    }

    wealthText += isEasy ? '<br><br>' : `<br><br><strong>Casa 11 (Renda & Ganhos):</strong> ${SIGNS[h11sign]}. `;
    if (h11planets.length === 0) {
        wealthText += isEasy ? 'A renda é estável mas sem grandes flutuações.' : 'Sem planetas na 11ª — renda estável sem grandes mudanças.';
    } else {
        h11planets.forEach(p => {
            const pIncome = {
                'Jupiter': 'Grandes rendas e lucros abundantes! Redes sociais trazem riqueza.',
                'Venus': 'Renda por arte, socializacao e moda. Amigas sao uteis.',
                'Saturn': 'Renda constante e estavel mas crescimento lento. Boa seguranca para aposentadoria.',
                'Mars': 'Renda por competicao. Lucros de tecnologia, imoveis e esportes.',
                'Mercury': 'Renda por redes intelectuais. Aptidao empresarial.',
                'Sun': 'Renda por autoridade. Conexoes politicas trazem riqueza.',
                'Moon': 'Renda por popularidade publica. Flutuante mas fluxo constante.'
            };
            wealthText += isEasy ? `${pIncome[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pIncome[p.id] || ''} `;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">💰 ${isEasy ? 'Minha Fortuna de Riqueza' : 'Fortuna de Riqueza'}</div>
        <div class="interp-text">${wealthText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 4. 💕 spouse & Marriage Fortune (7 house 분석)
    // ═══════════════════════════════════
    const h7sign = (lagnaSign + 6) % 12;
    const h7planets = planetsInHouse(7);
    const venus = positions.find(p => p.id === 'Venus');

    const spouseSign = [
        'Um parceiro independente e energético. Destinado a alguém com forte vontade e liderança. Um parceiro ativo e direto.',
        'Um parceiro bonito e artístico. Destinado a alguém materialmente estável. Um parceiro sensual e leal.',
        'Um parceiro inteligente com boas habilidades de comunicação. Destinado a alguém com quem conversar bem.',
        'Um parceiro emocional e caseiro. Destinado a alguém cuidador. Um parceiro com calor maternal.',
        'Um parceiro carismático e digno. Destinado a alguém socialmente proeminente. Um parceiro com alta autoestima mas generoso.',
        'Um parceiro meticuloso e prático. Destinado a alguém interessado em saúde. Um parceiro analítico e orientado a serviço.',
        'Um parceiro atraente e refinado. Destinado a alguém diplomático. Um parceiro com excelente gosto artístico.',
        'Um parceiro intenso e misterioso. Destinado a alguém com emoções profundas. Um parceiro transformador e apaixonado.',
        'Um parceiro livre e otimista. Possível conexão com estrangeiro ou outra cultura. Um parceiro filosófico e aventureiro.',
        'Um parceiro sério e ambicioso. Pode haver diferença de idade. Um parceiro responsável e socialmente bem-sucedido. Casamento pode vir tarde.',
        'Um parceiro único e independente. Encontro ou relação não convencional. Um parceiro intelectual e inovador.',
        'Um parceiro espiritual e intuitivo. Conectado a artista ou praticante espiritual. Um parceiro sonhador e romântico.'
    ];

    const spouseAppearance = [
        'Traços marcados, impressão forte. Compleição atlética. Olhos intensos cheios de energia. Tons vermelhos combinam.',
        'Aparência suave e atraente. Figura cheia com lábios sensuais. Boa pele com beleza natural.',
        'Aparência jovem, impressão brilhante. Magro e alto. Rosto expressivo com olhos brilhantes. Na moda e estiloso.',
        'Rosto redondo, impressão suave. Figura levemente curvilínea. Pele clara com olhos grandes. Vibração maternal.',
        'Compleição digna com aparência carismática. Cabelo abundante é um traço. Presença imponente, bem vestido.',
        'Aparência arrumada e limpa. Magro com boas proporções. Impressão intelectual. Moda minimalista.',
        'Aparência equilibrada, impressão refinada. Rosto simétrico. Sorriso encantador, vibração social. Pode ter covinhas.',
        'Aparência afiada e misteriosa. Olhos profundos deixam forte impressão. Magro com traços marcados. Prefere tons escuros.',
        'Alto com boa compleição. Impressão brilhante e aberta. Charme exótico. Roupas casuais e livres.',
        'Aparência séria e madura. Magro com estrutura óssea definida. Parece mais velho mas mais atraente com o tempo.',
        'Aparência única e extraordinária. Moda distintiva. Alto ou com traços notáveis. Charme não convencional.',
        'Aparência suave e sonhadora. Olhos grandes com expressão sonhadora. Levemente cheinho com pele translúcida. Charme místico.'
    ];

    let spouseText = (isEasy ? '' : '<strong>📐 Aparência do Parceiro:</strong><br>') + spouseAppearance[h7sign] + (isEasy ? '<br><br>' : isEasy ? '<br><br>' : '<br><br><strong>📋 Personalidade do Parceiro:</strong><br>') + spouseSign[h7sign];

    if (h7planets.length > 0) {
        spouseText += isEasy ? '<br><br>' : '<br><br><strong>Planetas na 7ª:</strong> ';
        h7planets.forEach(p => {
            const pH7 = {
                'Sun': 'Parceiro e socialmente reconhecido. Pode ser dominante mas respeitavel.',
                'Moon': 'Um parceiro emocional e carinhoso. Vida conjugal com conexao profunda.',
                'Mars': 'Apaixonado mas discussoes possiveis. Um parceiro de forte vontade.',
                'Mercury': 'Um parceiro intelectual com grande conversa. Boa parceria de negocios.',
                'Jupiter': 'A posicao mais abençoada! Um parceiro sabio e moral. Vida conjugal feliz.',
                'Venus': 'Um parceiro muito atraente e amoroso. Vida conjugal romantica.',
                'Saturn': 'Casamento tardio ou parceiro com diferenca de idade significativa. Dificil mas estavel.',
                'Rahu': 'Casamento nao convencional. Parceiro do exterior ou contexto diferente.',
                'Ketu': 'Conexao de vidas passadas. Forte vinculo espiritual mas alguma distancia.'
            };
            spouseText += isEasy ? `<br>${pH7[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pH7[p.id] || ''}`;
        });
    }

    if (venus) {
        const venusHouse = houseOf(venus.sign);
        spouseText += isEasy ? '<br><br>' : `<br><br><strong>Venus Position (${venusHouse}th):</strong> `;
        const venusHouseInterp = {
            1: 'Aparencia atraente. Aprecia romance e se apaixona facilmente.',
            2: 'Riqueza vem pelo parceiro. Voz bonita e gostos gourmet.',
            3: 'Habilidades de comunicacao artistica. Relacoes agradaveis com irmaos.',
            4: 'Felicidade em casa com bela residencia. Forte influencia da mae.',
            5: 'Uma vida rica em romance. Boa relacao com filhos. Alegria no trabalho criativo.',
            6: 'Atitude de servico no romance. Possibilidade de romance no trabalho.',
            7: 'Parceiro muito atraente. Forte indicador de vida conjugal feliz.',
            8: 'Amor profundo e transformador. Romance secreto. Riqueza do parceiro.',
            9: 'Romance no exterior. Conexao com professor ou mentor. Amor filosofico.',
            10: 'Casamento socialmente reconhecido. Encontro pela carreira.',
            11: 'De amigos a amantes. Conexoes por atividades sociais.',
            12: 'Romance secreto. Conexoes estrangeiras. Amor espiritual.'
        };
        spouseText += venusHouseInterp[venusHouse] || '';
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Meu Parceiro' : '💕 Parceiro & Casamento — Casa 7: ' + SIGNS[h7sign] + ' ' + SIGN_SYMBOLS[h7sign]}</div>
        <div class="interp-text">${spouseText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 5. 💼 career & 사회적 성취 (10 house 분석)
    // ═══════════════════════════════════
    const h10sign = (lagnaSign + 9) % 12;
    const h10planets = planetsInHouse(10);

    const careerSign = [
        'Apto para militar, policia, esporte, cirurgia, gestao empresarial, lideranca.',
        'Financas, industria alimentar, agricultura, moda, imoveis, arte, banco.',
        'Midia, escrita, educacao, comunicacoes, TI, marketing, traducao.',
        'Medicina, enfermagem, hotelaria, maritimo, imoveis, alimentacao.',
        'Politica, entretenimento, gestao, agencias governamentais, posicoes de lideranca.',
        'Medicina, contabilidade, analise, consultoria, saude, controle de qualidade.',
        'Direito, diplomacia, moda, design de interiores, aconselhamento, planejamento de eventos.',
        'Pesquisa, investigacao, seguros, medicina, psicologia, impostos, mineracao.',
        'Educacao, direito, religiao, editorial, viagens, comercio internacional.',
        'Gestao, servico publico, arquitetura, engenharia civil, politica, grandes corporacoes.',
        'Tecnologia, ciencia, TI, aviacao, aeroespacial, trabalho social, inovacao.',
        'Arte, cinema, musica, medicina, exterior, campos espirituais, ONG.'
    ];

    let careerText = isEasy ? careerSign[h10sign] : `A casa 10 está em ${SIGNS[h10sign]}. ${careerSign[h10sign]}`;

    if (h10planets.length > 0) {
        careerText += isEasy ? '<br><br>' : '<br><br><strong>Planetas na 10ª:</strong>';
        h10planets.forEach(p => {
            const pCareer = {
                'Sun': ' Governo, lideranca, posicoes autoritarias. Carreira com atencao social.',
                'Moon': ' Carreira publica. Cuidado, hotelaria, alimentacao, campos emocionais.',
                'Mars': ' Tecnologia, engenharia, militar, cirurgia, esporte. Sucesso em competicao.',
                'Mercury': ' Negocios, comunicacao, TI, educacao. Sucesso por habilidades intelectuais.',
                'Jupiter': ' Educacao, direito, religiao, consultoria. Carreira respeitada. Melhor posicao.',
                'Venus': ' Arte, entretenimento, moda, beleza, diplomacia. Sucesso em campos criativos.',
                'Saturn': ' Sucesso lento mas certo. Organizacoes sistematicas, arquitetura, servico publico.'
            };
            careerText += isEasy ? `<br>${pCareer[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pCareer[p.id] || ''}`;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 Minha Carreira' : '💼 Carreira & Conquistas Sociais — Casa 10: ' + SIGNS[h10sign] + ' ' + SIGN_SYMBOLS[h10sign]}</div>
        <div class="interp-text">${careerText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 6. 🏥 health (6 house + Lagna 분석)
    // ═══════════════════════════════════
    const h6sign = (lagnaSign + 5) % 12;
    const h6planets = planetsInHouse(6);

    const healthByLagna = [
        'Cuidado com condicoes de cabeca, cerebro e rosto. Propenso a dores de cabeca e febres.',
        'Cuidado com problemas de pescoco, tireoide e mandibula. Tendencia a comer demais e diabetes.',
        'Cuidado com pulmoes, bracos, ombros e sistema nervoso. Ansiedade e problemas de sono.',
        'Cuidado com problemas de estomago, peito e mamas. Disturbios digestivos.',
        'Cuidado com problemas de coracao, costas e coluna. Gestao cardiovascular essencial.',
        'Cuidado com sistema digestivo, intestinos e pele. Indigestao e alergias.',
        'Cuidado com rins, lombar e pele. Hidratacao e equilibrio essenciais.',
        'Cuidado com sistemas reprodutivo e excretor. Condicoes cronicas possiveis.',
        'Cuidado com figado, coxas e quadris. Tendencia ao sobrepeso.',
        'Cuidado com ossos, articulacoes, joelhos e pele. Reumatismo e artrite.',
        'Cuidado com tornozelos, panturrilhas e sistema circulatorio. Controle de pressao arterial.',
        'Cuidado com pes, sistema linfatico e imunidade. Condicoes inexplicaveis possiveis.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏥 Minha Saúde' : '🏥 Saúde — Áreas Vulneráveis'}</div>
        <div class="interp-text">${healthByLagna[lagnaSign]}${h6planets.length > 0 ? isEasy ? '<br><br>Atenção especial à saúde necessária.' : '<br><br>Casa 6: ' + h6planets.map(p => p.name).join(', ') + ' requer atenção especial à saúde.' : ''}</div>
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
                    'Sun': 'Um periodo de autodescoberta e autoridade. Um tempo para exercer lideranca e receber reconhecimento social. Cuide da saude do coracao e olhos.',
                    'Moon': 'Um periodo de emocoes e vida interior. Lar e relacao com a mae se tornam importantes. Flutuacoes emocionais sao grandes mas a intuicao se fortalece.',
                    'Mars': 'Um periodo de acao e energia. Um otimo momento para comecar novos projetos com coragem. Cuidado com disputas e acidentes.',
                    'Rahu': 'Um periodo de mudanca rapida e inovacao. Oportunidades e desafios inesperados chegam. Atividades relacionadas ao exterior se ativam. Um ciclo de 18 anos.',
                    'Jupiter': 'Um periodo de sorte e crescimento! Educacao, casamento, nascimento, promocoes se tornam mais provaveis. Crescimento espiritual se aprofunda.',
                    'Saturn': 'Um periodo de paciencia e provacoes. Crescimento e lento mas certo. Cuide da saude, especialmente ossos e articulacoes. Um ciclo de 19 anos.',
                    'Mercury': 'Um periodo de atividade intelectual e negocios. Favoravel para aprendizado, comunicacao e empreendimentos.',
                    'Ketu': 'Um periodo de despertar espiritual e desapego. Mudancas repentinas possiveis mas levando a crescimento espiritual. A intuicao se torna muito forte.',
                    'Venus': 'Um periodo de amor e abundancia! Romance, casamento e atividades artisticas se ativam. O senso estetico se desenvolve. O ciclo mais longo com 20 anos.'
                };
                html += `<div class="interp-card">
                    <div class="interp-title">${isEasy ? '⏳ Período Atual: ' + DASHA_KO[currentDasha] : '⏳ Dasha Atual: ' + DASHA_KO[currentDasha] + ' Dasha'}</div>
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
            yogaText += isEasy ? '<strong>🐘 Bênção de Sabedoria & Fama</strong>' : '<strong>🐘 Gajakesari Yoga</strong> — Relacao Kendra Lua-Jupiter! Combinacao sabedoria, fama, abundancia. Respeitado na sociedade. Boa fortuna em educacao e filhos.<br><br>';
        }
    }

    // Budha-Aditya Yoga
    const sun = positions.find(p => p.id === 'Sun');
    const mercury = positions.find(p => p.id === 'Mercury');
    if (sun && mercury && sun.sign === mercury.sign) {
        yogaText += isEasy ? '<strong>📚 Bênção de Inteligência Excepcional</strong>' : '<strong>📚 Budha-Aditya Yoga</strong> — Sol-Mercurio mesmo signo! Intelecto e comunicacao excepcionais. Sucesso em educacao, escrita, negocios.<br><br>';
    }

    // Chandra-Mangala Yoga
    if (moonPos && mars && moonPos.sign === mars.sign) {
        yogaText += isEasy ? '<strong>🔥 Bênção de Vontade Forte & Riqueza</strong>' : '<strong>🔥 Chandra-Mangala Yoga</strong> — Lua-Marte mesmo signo! Forte vontade e acumulacao de riqueza. Sucesso nos negocios com decisoes ousadas.<br><br>';
    }

    // Kuja Dosha (Manglik)
    if (mars) {
        const marsH = houseOf(mars.sign);
        if ([1,2,4,7,8,12].includes(marsH)) {
            yogaText += isEasy ? `<strong>⚠️ Precaução Matrimonial</strong>` : `<strong>⚠️ Kuja Dosha (Manglik)</strong> — Marte na casa ${marsH} — desafios na vida conjugal possiveis. Comparacao do mapa do parceiro recomendada. Casamento apos 28 anos pode ser favoravel.<br><br>`;
        }
    }

    if (yogaText) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '🔮 Seus Talentos Especiais' : '🔮 Yogas Especiais (Combinacoes Planetarias)'}</div>
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
        'Casa 1: Forte personalidade e liderança. Saudável e vital. Alta autoestima e independente.',
        'Casa 2: Valoriza honra familiar. Renda por autoridade. Herança do pai. Cuidar saúde ocular.',
        'Casa 3: Corajoso e decisivo. Líder entre irmãos. Autoridade em escrita/comunicação.',
        'Casa 4: Tensão nas relações parentais. Propriedade de imóveis/veículos. Inquietação interior.',
        'Casa 5: Talento criativo excepcional. Boa relação com filhos. Habilidades de investimento.',
        'Casa 6: Poder de derrotar inimigos. Habilidades de gestão de saúde. Vitória em disputas legais.',
        'Casa 7: Parceiro com alto status social. Papel de liderança em parcerias.',
        'Casa 8: Cuidado com longevidade. Benefícios de herança/seguro. Poder secreto.',
        'Casa 9: O pai é figura respeitada. Sucesso em direito/religião/educação superior.',
        'Casa 10: A melhor posição! Sucesso social e fama. Líder no setor governo/público.',
        'Casa 11: Grande renda e rede social. Amigos de alto status. Excelente conquista de metas.',
        'Casa 12: Sucesso no exterior. Buscas espirituais. Distância do pai. Aprecia solidão.'
    ],
    Moon: [
        'Casa 1: Aparência atraente. Personalidade emocional e mutável. Popular com o público.',
        'Casa 2: Ambiente familiar confortável. Boa alimentação. Fala doce. Laços familiares fortes.',
        'Casa 3: Habilidades de comunicação criativa. Ama viajar. Vínculo emocional com irmãos.',
        'Casa 4: A melhor posição! Lar feliz. Forte vínculo com a mãe. Boa fortuna imobiliária.',
        'Casa 5: Amor profundo pelos filhos. Personalidade romântica. Habilidade intuitiva de investimento.',
        'Casa 6: Problemas de saúde por estresse emocional. Vitória sobre inimigos. Espírito de serviço.',
        'Casa 7: Parceiro atraente. Casamento emocionalmente profundo. Tendência à dependência do parceiro.',
        'Casa 8: Turbulência emocional e transformação. Intuição muito forte. Possível herança.',
        'Casa 9: Espiritual e filosófico. Mãe é religiosa. Viagem/residência no exterior.',
        'Casa 10: Popularidade pública e sucesso social. Hotelaria/cuidado/alimentação.',
        'Casa 11: Muitos amigos e sociável. Renda constante. Capacidade de realizar desejos.',
        'Casa 12: Possível residência no exterior. Problemas de sono. Inclinações espirituais.'
    ],
    Mars: [
        'Casa 1: Físico forte e vontade. Possíveis cicatrizes/feridas. Impulsivo mas corajoso.',
        'Casa 2: Fala dura. Problemas alimentares. Disputas familiares. Mas capacidade de acumular riqueza.',
        'Casa 3: A melhor posição! Coragem e espírito aventureiro. Forte vínculo fraternal. Talento esportivo.',
        'Casa 4: Conflitos domésticos. Disputas imobiliárias. Tensão com a mãe.',
        'Casa 5: Romance apaixonado. Filhos ativos. Investimentos especulativos. Talento esportivo.',
        'Casa 6: Poder de esmagar inimigos! Força física contra doença. Militar/polícia/medicina.',
        'Casa 7: Kuja Dosha — Paixão e conflito coexistem no casamento. Parceiro forte. Casamento após 28 recomendado.',
        'Casa 8: Cuidado com acidentes/cirurgias. Mas poder de sobreviver a crises.',
        'Casa 9: Conflito com o pai. Opiniões fortes sobre religião. Disputas legais.',
        'Casa 10: Desempenho profissional excepcional! Militar/engenharia/cirurgia/polícia.',
        'Casa 11: Grande renda! Forte conquista de metas. Ajuda de irmãos.',
        'Casa 12: Alto gasto no exterior. Problemas de sono. Forte energia sexual.'
    ],
    Jupiter: [
        'Casa 1: Posição abençoada! Personalidade sábia e generosa. Grande estatura e saudável.',
        'Casa 2: Riqueza abundante! Grande família. Renda por educação. Orador eloquente.',
        'Casa 3: Irmãos bem-sucedidos. Escrita relacionada a religião/educação.',
        'Casa 4: Uma das melhores posições! Lar espaçoso. Conquista acadêmica. Mãe sábia.',
        'Casa 5: Intelecto e criatividade excepcionais! Boa fortuna com filhos. Investimentos sábios.',
        'Casa 6: Derrota facilmente inimigos. Vitórias legais. Espírito de serviço. Cuidado com peso.',
        'Casa 7: Um parceiro sábio e moral! Casamento feliz. Parcerias de negócios bem-sucedidas.',
        'Casa 8: Longevidade! Herança. Profundidade de conhecimento espiritual. Interesse em astrologia.',
        'Casa 9: A posição mais poderosa! Grande fortuna. Bênçãos do mestre. Viagens ao exterior.',
        'Casa 10: Fama e respeito social! Líder em educação/direito/religião. Melhor fortuna profissional.',
        'Casa 11: Grandes rendas e lucros! Realização de desejos. Conexões influentes.',
        'Casa 12: Fortuna no exterior. Libertação espiritual. Prazeres celestiais. Doações e caridade.'
    ],
    Venus: [
        'Casa 1: Aparência muito atraente! Talento artístico. Aprecia luxo. Sociável e popular.',
        'Casa 2: Riqueza abundante! Comida fina e artigos de luxo. Voz doce. Harmonia familiar.',
        'Casa 3: Comunicação artística. Escrita bela. Boa relação com irmãs.',
        'Casa 4: Lar e veículos bonitos! Estilo de vida luxuoso. Mãe bonita e artística.',
        'Casa 5: Amor romântico! Talento em arte/entretenimento. Filhos bonitos.',
        'Casa 6: Dificuldades no romance. Beleza relacionada à saúde. Vitória sobre inimigos com charme.',
        'Casa 7: A melhor posição! Parceiro muito atraente. Casamento feliz.',
        'Casa 8: Amor profundo e transformador. Riqueza do parceiro. Romance secreto.',
        'Casa 9: Romance no exterior. Viagens artísticas. Bela relação com professores.',
        'Casa 10: Sucesso em arte/moda/entretenimento! Socialmente atraente. Ajuda de mulheres.',
        'Casa 11: Renda por redes sociais! Ajuda de amigas. Realização de desejos.',
        'Casa 12: Amor no exterior. Romance secreto. Prazeres do quarto. Inspiração artística.'
    ],
    Saturn: [
        'Casa 1: Compleição magra. Sério e responsável. Dificuldades na infância. Brilha com a idade.',
        'Casa 2: Acumulação lenta de riqueza. Estilo de vida frugal. Fala pesada. Distância da família.',
        'Casa 3: Excelente posição! Forte vontade e paciência. Responsabilidade com irmãos.',
        'Casa 4: Dificuldades com a mãe. Ambiente doméstico estrito. Casas/edifícios antigos.',
        'Casa 5: Filhos tardios ou poucos. Investimentos cautelosos. Lutas acadêmicas.',
        'Casa 6: Derrota inimigos com paciência! Condições crônicas mas manejáveis. Sucesso em serviço.',
        'Casa 7: Casamento tardio. Parceiro mais velho. Difícil no início mas casamento estável.',
        'Casa 8: Longevidade! Cuidado com condições crônicas. Atrasos em assuntos de herança.',
        'Casa 9: Relação difícil com o pai. Abordagem séria da religião.',
        'Casa 10: Grande posição! Sucesso social lento mas seguro. Líder em grandes corporações/governo.',
        'Casa 11: Crescimento constante de renda! Amigos mais velhos. Alcançar metas com paciência.',
        'Casa 12: Dificuldades e crescimento no exterior. Problemas de sono. Prática espiritual.'
    ]
};

function renderPlanetHouse(positions, lagnaSign) {
    function houseOf(signIdx) { return ((signIdx - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = ['','Eu','Dinheiro·Família','Comunicação','Lar','Filhos·Romance','Saúde','Parceiro','Transformação','Fortuna·Exterior','Carreira','Renda','Espiritualidade'];
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
    let text = isEasy ? '<strong>Educação Básica:</strong> ' : `<strong>Casa 4 (Educação Básica):</strong> ${SIGNS[h4sign]}. `;
    const eduSign4 = ['Aprendizado ativo, educacao fisica/militar', 'Belas-artes/musica/educacao culinaria', 'Linguas/literatura/comunicacao', 'Enfase em educacao domestica, historia', 'Teatro/lideranca/ciencias politicas', 'Ciencia/medicina/analitica', 'Direito/diplomacia/design', 'Psicologia/pesquisa/investigacao', 'Filosofia/teologia/estudos internacionais', 'Negocios/administracao/arquitetura', 'TI/tecnologia cientifica/aviacao', 'Arte/cinema/musica/espiritualidade'];
    text += eduSign4[h4sign] + ' adequado. ';
    if (h4.length > 0 && !isEasy) text += 'Na casa 4, ' + h4.map(p => p.name).join(', ') + ' influencia a educacao. ';

    const jupiter = positions.find(p => p.id === 'Jupiter');
    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if ([1,4,5,9].includes(jH)) text += isEasy ? '<br><br>🎓 <strong>Alto desempenho academico esperado!</strong> Pos-graduacao/doutorado/estudo no exterior possivel.' : '<br><br>🎓 <strong>Jupiter na ' + jH + 'a casa — alto desempenho academico esperado!</strong> Pos-graduacao/doutorado/estudo no exterior possivel.';
    }

    text += isEasy ? '<br><br><strong>Educação Superior:</strong> ' : `<br><br><strong>Casa 5 (Educação Superior):</strong> ${SIGNS[h5sign]}. `;
    if (h5.length > 0) {
        h5.forEach(p => {
            const h5p = { Sun: 'Destaca em lideranca/ciencias politicas', Moon: 'talento em arte/psicologia', Mars: 'Talento em engenharia/tecnologia/esportes', Mercury: 'Genio em matematica/linguas/negocios', Jupiter: 'Melhor posicao! Academico/professor/pesquisador', Venus: 'talento em arte/design/musica', Saturn: 'Academico tardio mas pesquisa profunda' };
            text += isEasy ? `${h5p[p.id] || 'influencia os estudos'}. ` : `${p.name}: ${h5p[p.id] || 'influencia os estudos'}. `;
        });
    } else {
        text += isEasy ? 'Sem energia acadêmica particularmente forte, mas esforço constante trará bons resultados.' : 'Sem planetas na 5ª — posição do senhor da 5ª é a chave.';
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

    let text = isEasy ? '' : `<strong>Casa 5 (Filhos):</strong> ${SIGNS[h5sign]}.<br><br>`;

    const childSign = [
        'Filhos ativos e independentes. Talento em esporte/lideranca. Ganham independencia cedo.',
        'Filhos calmos e artisticos. Talento em musica/arte. Materialmente confortaveis.',
        'Filhos inteligentes e eloquentes. Excelentes em academico. Possibilidade de gemeos.',
        'Filhos sensiveis e gentis. Vinculo especial com a mae. Filhos caseiros.',
        'Filhos carismaticos e criativos. Qualidades de lider. Talento em entretenimento.',
        'Filhos meticulosos e analiticos. Talento em medicina/ciencia.',
        'Filhos encantadores e sociaveis. Talento em arte/diplomacia. Bom equilibrio.',
        'Filhos intensos e intuitivos. Espirito pesquisador/explorador.',
        'Filhos livres e aventureiros. Possivel estudo/viagem ao exterior.',
        'Filhos serios e ambiciosos. Amadurecem cedo. Orientados a conquistas.',
        'Filhos unicos e inovadores. Talento em tecnologia/ciencia.',
        'Filhos artisticos e espirituais. Rica imaginacao. Talento em musica/pintura.'
    ];
    text += childSign[h5sign];

    if (h5.length > 0) {
        text += isEasy ? '<br><br>' : '<br><br><strong>Planetas na 5ª:</strong><br>';
        h5.forEach(p => {
            const ch = { Sun: 'Conexao com filhos homens. Filhos tem lideranca.', Moon: 'Conexao com filhas. Forte vinculo emocional.', Mars: 'Filhos ativos. Podem ser dificeis de lidar.', Mercury: 'Filhos muito inteligentes! Excelentes em academico.', Jupiter: 'Filhos abençoados! Fortuna pelos filhos.', Venus: 'Filhos artisticos bonitos. Conexao com filhas.', Saturn: 'Filhos podem vir tarde. Mas filhos responsaveis.' };
            text += `${ch[p.id] || ''}<br>`;
        });
    }

    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if (jH === 5) text += isEasy ? '<br>🌟 <strong>Melhor fortuna com filhos! Filhos trazem grande sorte.</strong>' : '<br>🌟 <strong>Júpiter na 5ª! Melhor fortuna com filhos.</strong>';
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
    let text = isEasy ? '<strong>Viagens ao exterior·fortuna:</strong><br>' : '<strong>Casa 9 (Viagens·fortuna·Educação superior):</strong><br>';
    if (h9.length === 0) {
        text += 'Viagens ao exterior existem mas não há conexão forte.';
    } else {
        h9.forEach(p => {
            const f9 = { Sun: 'O pai tem conexoes no exterior. Viagens governamentais ao exterior.', Moon: 'Aprecia viagens emocionalmente. Popularidade no exterior.', Mars: 'Aventura/desafio no exterior. Atividades militares/tecnologicas.', Mercury: 'Estudo/negocios no exterior com sucesso! Habilidade multilingue.', Jupiter: 'Grande fortuna no exterior! Estudo/imigracao com sucesso. Encontro com mestres estrangeiros.', Venus: 'Romance no exterior. Atividades artisticas/moda no exterior.', Saturn: 'Sucesso apos dificuldades no exterior. Residencia de longo prazo.', Rahu: 'Forte indicador de migracao! Profundamente imerso na cultura estrangeira.', Ketu: 'Conexao estrangeira de vidas passadas. Peregrinacao espiritual.' };
            text += isEasy ? `${f9[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f9[p.id] || ''}<br>`;
        });
    }

    text += isEasy ? '<br><strong>Estabelecimento no Exterior:</strong><br>' : '<br><strong>Casa 12 (Estabelecimento·Imigração):</strong><br>';
    if (h12.length === 0) {
        text += 'Residência doméstica é mais natural.';
    } else {
        h12.forEach(p => {
            const f12 = { Sun: 'Encontrando identidade no exterior. Posto governamental no exterior.', Moon: 'Alta possibilidade de viver no exterior! Estabilidade emocional no ultramar.', Mars: 'Gasto de energia no exterior. Investimento/imoveis no exterior.', Mercury: 'Negocios/TI no exterior. Educacao no ultramar.', Jupiter: 'Crescimento espiritual no exterior. Caridade. Universidade estrangeira.', Venus: 'Luxo e prazer no exterior. Atividades artisticas estrangeiras.', Saturn: 'Trabalho duro no exterior. Mas estabelecimento de longo prazo.', Rahu: 'Forte indicador de imigracao! Adaptacao a cultura ocidental.', Ketu: 'Pratica espiritual no exterior. Vida solitaria no ultramar.' };
            text += isEasy ? `${f12[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f12[p.id] || ''}<br>`;
        });
    }

    if (rahu) {
        const rH = houseOf(rahu.sign);
        if ([9, 12, 7].includes(rH)) text += isEasy ? '<br>✈️ <strong>Altíssima possibilidade de migração!</strong>' : '<br>✈️ <strong>Rahu na casa ' + rH + ' — altíssima chance de residência no exterior!</strong>';
    }

    document.getElementById('foreignWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 행성 품위
// ═══════════════════════════════════════════════════
function renderDignity(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = {1:'Eu',2:'Dinheiro/Família',3:'Comunicação/Irmãos',4:'Lar/Mãe',5:'Filhos/Romance',6:'Saúde/Inimigos',7:'Parceiro',8:'Transformação/Herança',9:'Sorte/Exterior',10:'Carreira/Fama',11:'Renda/Desejos',12:'Exterior/Espiritualidade'};
    const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };
    const OWN = { Sun: [4], Moon: [3], Mars: [0,7], Mercury: [2,5], Jupiter: [8,11], Venus: [1,6], Saturn: [9,10] };

    // 쉬운 설명
    const planetRole = {
        Sun: 'Eu/Confiança/Pai/Autoridade',
        Moon: 'Emoções/Mente/Mãe/Cotidiano',
        Mars: 'Energia/Coragem/Ação/Competição',
        Mercury: 'Inteligência/Comunicação/Aprendizado/Negócios',
        Jupiter: 'Sorte/Sabedoria/Riqueza/Casamento',
        Venus: 'Amor/Charme/Arte/Prazer',
        Saturn: 'Paciência/Provações/Responsabilidade/Esforço'
    };

    let html = `<div class="interp-card" style="margin-bottom:16px;">
        <div class="interp-text">
            ${isEasy ?
            '<strong>💡 Guia simples:</strong> Mostra quao fortemente cada energia atua na sua vida.<br><br>🟢 <strong>Muito Forte</strong> = Condicao maxima! Grande fortuna e resultados.<br>🟡 <strong>Forte</strong> = Estavel, bons resultados.<br>⚪ <strong>Medio</strong> = Nem forte nem fraco.<br>🔴 <strong>Fraco</strong> = Desafios mas superaveis com esforco.' :
            '<strong>💡 Guia:</strong> Dignidade planetaria mostra quao bem um planeta exerce seu poder.<br><br>🟢 <strong>Exaltado</strong> = Condicao maxima! Grande fortuna nesta area de vida.<br>🟡 <strong>Domicilio</strong> = Como em casa. Resultados estaveis e bons.<br>⚪ <strong>Neutro</strong> = Medio. Nem forte nem fraco.<br>🔴 <strong>Debilitado</strong> = Enfraquecido. Desafios mas superaveis com esforco.'}
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
                ? `<strong>${area}</strong> — maior bencao! Talentos inatos brilham e bons resultados vem naturalmente.`
                : `<strong>${p.name} no poder maximo!</strong> A energia de "${role}" maximizada em <strong>${house}(${area})</strong>. Talentos brilham.`;
        } else if (p.sign === DEBI[p.id]) {
            dignity = 'Debilitado';
            emoji = '🔴';
            color = '#d9534f';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — pode enfrentar desafios. Mas esforco consciente leva a grande crescimento. Veja remedios abaixo.`
                : `<strong>${p.name} enfraquecido.</strong> A energia de "${role}" enfraquecida em <strong>${house}(${area})</strong>. Desafios mas crescimento pelo esforco.`;
        } else if (OWN[p.id] && OWN[p.id].includes(p.sign)) {
            dignity = 'Signo Proprio';
            emoji = '🟡';
            color = '#c9a84c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — trabalha estavelmente a seu favor. Bons resultados vem naturalmente.`
                : `<strong>${p.name} em casa!</strong> A energia de "${role}" trabalha estavelmente em <strong>${house}(${area})</strong>.`;
        } else {
            dignity = 'Neutral';
            emoji = '⚪';
            color = '#999';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — influencia media. Nem particularmente forte nem fraco.`
                : `A energia de "${role}" de ${p.name} exerce influencia media em <strong>${house}(${area})</strong>.`;
        }

        html += `<div class="interp-card">
            <div class="interp-title">${emoji} ${isEasy ? area + ' — ' : p.symbol + ' ' + p.name + ' — ' + SIGNS[p.sign] + ' ' + SIGN_SYMBOLS[p.sign] + ' → ' + house + ' (' + area + ') — '}<span style="color:${color}">${isEasy ? (dignity.includes('Exaltado') ? 'Muito Forte!' : dignity.includes('Debilitado') ? 'Fraco' : dignity.includes('Signo Proprio') ? 'Forte' : 'Medio') : dignity}</span></div>
            <div class="interp-text">
                ${isEasy ? '' : '<span style="color:#666;font-size:12px;">Papel: ' + role + ' │ Posicao: ' + house + ' = ' + area + '</span><br><br>'}
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
        { color: 'Vermelho, Laranja', number: '1, 9', day: 'Terça', gem: 'Coral Vermelho', dir: 'Leste' },
        { color: 'Branco, Rosa', number: '2, 6', day: 'Sexta', gem: 'Diamante', dir: 'Sudeste' },
        { color: 'Verde', number: '3, 5', day: 'Quarta', gem: 'Esmeralda', dir: 'Norte' },
        { color: 'Branco, Prata', number: '2, 7', day: 'Segunda', gem: 'Perola', dir: 'Noroeste' },
        { color: 'Dourado, Laranja', number: '1, 4', day: 'Domingo', gem: 'Rubi', dir: 'Leste' },
        { color: 'Verde, Verde claro', number: '5, 3', day: 'Quarta', gem: 'Esmeralda', dir: 'Sul' },
        { color: 'Branco, Pastel', number: '6, 2', day: 'Sexta', gem: 'Diamante', dir: 'Oeste' },
        { color: 'Vermelho, Carmesim', number: '9, 1', day: 'Terça', gem: 'Coral Vermelho', dir: 'Sul' },
        { color: 'Amarelo, Dourado', number: '3, 9', day: 'Quinta', gem: 'Safira Amarela', dir: 'Nordeste' },
        { color: 'Azul marinho, Preto', number: '8, 4', day: 'Sábado', gem: 'Safira Azul', dir: 'Oeste' },
        { color: 'Azul marinho, Roxo', number: '4, 8', day: 'Sábado', gem: 'Safira Azul', dir: 'Oeste' },
        { color: 'Amarelo, Dourado', number: '3, 7', day: 'Quinta', gem: 'Safira Amarela', dir: 'Nordeste' }
    ];

    const d = luckyData[lagnaSign];
    const html = `<div class="interp-card">
        <div class="interp-text">
            <strong>🎨 Cor da Sorte:</strong> ${d.color}<br>
            <strong>🔢 Número da Sorte:</strong> ${d.number}<br>
            <strong>📅 Dia da Sorte:</strong> ${d.day}<br>
            <strong>💎 Pedra da Sorte:</strong> ${d.gem}<br>
            <strong>🧭 Direção da Sorte:</strong> ${d.dir}<br>
            <strong>🪐 Planeta Regente do Lagna:</strong> ${['Marte','Venus','Mercurio','Lua','Sol','Mercurio','Venus','Marte','Jupiter','Saturno','Saturno','Jupiter'][lagnaSign]}
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
        Sun: { gem: 'Rubi', mantra: 'Om Suryaya Namaha', color: 'Laranja/vermelho no domingo', food: 'Trigo, acafrao, sementes de girassol', charity: 'Domingo: doar trigo/cobre' },
        Moon: { gem: 'Perola', mantra: 'Om Chandraya Namaha', color: 'Branco/prata na segunda', food: 'Leite, arroz, coco', charity: 'Segunda: doar arroz/leite' },
        Mars: { gem: 'Coral Vermelho', mantra: 'Om Mangalaya Namaha', color: 'Vermelho na terca', food: 'Lentilhas, frutas vermelhas', charity: 'Terca: doar lentilhas vermelhas' },
        Mercury: { gem: 'Esmeralda', mantra: 'Om Budhaya Namaha', color: 'Verde na quarta', food: 'Feijao verde, vegetais verdes', charity: 'Quarta: doar vegetais verdes' },
        Jupiter: { gem: 'Safira Amarela', mantra: 'Om Gurave Namaha', color: 'Amarelo na quinta', food: 'Grao-de-bico, bananas, curcuma', charity: 'Quinta: doar alimentos amarelos/livros' },
        Venus: { gem: 'Diamante', mantra: 'Om Shukraya Namaha', color: 'Branco/pastel na sexta', food: 'Leite, creme, frutas', charity: 'Sexta: doar roupas brancas/arroz' },
        Saturn: { gem: 'Safira Azul', mantra: 'Om Shanaishcharaya Namaha', color: 'Azul marinho/preto no sabado', food: 'Feijao preto, gergelim', charity: 'Sabado: doar feijao preto/oleo' }
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
                <div class="interp-title">${p.symbol} ${p.name} Fortalecimento ${isDebi ? '(Debilitado — Especialmente Importante!)' : '(Posicao Fraca)'}</div>
                <div class="interp-text">
                    <strong>💎 Pedra:</strong> ${r.gem} (dedo anelar recomendado)<br>
                    <strong>🙏 Mantra:</strong> "${r.mantra}" (108 vezes por dia)<br>
                    <strong>🎨 Cor:</strong> ${r.color}<br>
                    <strong>🍽️ Alimento:</strong> ${r.food}<br>
                    <strong>🤝 Caridade:</strong> ${r.charity}
                </div>
            </div>`;
        }
    });

    if (!html) {
        html = '<div class="interp-card"><div class="interp-text">Todos os planetas em boas posicoes! Nenhum remedio especial necessario. Use a pedra preciosa do seu regente do Lagna para sorte.</div></div>';
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
    const SIGN_RULERS = ['Marte','Venus','Mercurio','Lua','Sol','Mercurio','Venus','Marte','Jupiter','Saturno','Saturno','Jupiter'];
    const RULER_NAMES = {Sun:'Sun',Moon:'Moon',Mars:'Mars',Mercury:'Mercury',Jupiter:'Jupiter',Venus:'Venus',Saturn:'Saturn',Rahu:'Rahu',Ketu:'Ketu'};

    const isEasy = window.vedicMode === 'easy';
    let html = '';

    if (division === 10) {
        // D10 해석: career/커리어
        const d10_1lord = SIGN_RULERS[dLagnaSign];
        const d10_10sign = (dLagnaSign + 9) % 12;
        const d10_10lord = SIGN_RULERS[d10_10sign];
        const d10_10planets = dPositions.filter(p => p.dSign === d10_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💼 Análise Detalhada de Carreira' : '💼 D10 Análise de Carreira') + '</div><div class="interp-text">';
        if (isEasy) {
            html += '<strong>Sua tendencia de carreira:</strong><br>';
        } else {
            html += '<strong>D10 Lagna:</strong> ' + SIGNS[dLagnaSign] + ' (regente: ' + (RULER_NAMES[d10_1lord]||d10_1lord) + ')<br>';
            html += '<strong>D10 Casa 10 (carreira):</strong> ' + SIGNS[d10_10sign] + ' (regente: ' + (RULER_NAMES[d10_10lord]||d10_10lord) + ')<br>';
        }
        if (d10_10planets.length > 0) {
            if (!isEasy) html += '<strong>Planetas na 10a:</strong> ' + d10_10planets.map(p => p.name).join(', ') + '<br>';
        }

        // Career 성향 by D10 Lagna
        const careerBySign = [
            'Lideranca, Militar, Esporte, Empreendedor',  // Aries
            'Financas, Artes, Imoveis, Alimentacao',     // Taurus
            'Comunicacao, Midia, Educacao, TI',  // Gemini
            'Enfermagem, Imoveis, Hoteis, Aconselhamento',    // Cancer
            'Politica, Entretenimento, Gestao, Administracao',        // Leo
            'Medicina, Contabilidade, Analise, Pesquisa',          // Virgo
            'Direito, Diplomacia, Design, Consultoria',      // Libra
            'Investigacao, Pesquisa, Medicina, Seguros',          // Scorpio
            'Educacao, Religiao, Comercio Exterior, Editorial',      // Sagittarius
            'Administracao, Construcao, Mineracao, Servico Publico',        // Capricorn
            'TI, Inovacao, ONG, Aviacao',           // Aquarius
            'Artes, Hospital, Exterior, Espiritualidade'           // Pisces
        ];
        html += '<strong>Campo adequado:</strong> ' + careerBySign[dLagnaSign];
        html += '</div></div>';

    } else if (division === 7) {
        // D7 해석: children
        const d7_5sign = (dLagnaSign + 4) % 12;
        const d7_5lord = SIGN_RULERS[d7_5sign];
        const d7_5planets = dPositions.filter(p => p.dSign === d7_5sign);
        const benefics = d7_5planets.filter(p => p.natural === 'benefic');
        const malefics = d7_5planets.filter(p => p.natural === 'malefic');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👶 Análise de Filhos' : '👶 D7 Análise de Filhos') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D7 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
            html += '<strong>D7 Casa 5 (filhos):</strong> ' + SIGNS[d7_5sign] + ' (regente: ' + (RULER_NAMES[d7_5lord]||d7_5lord) + ')<br>';
        }
        if (d7_5planets.length > 0) {
            if (!isEasy) html += '<strong>Planetas na Casa 5:</strong> ' + d7_5planets.map(p => p.name).join(', ') + '<br>';
        }
        if (benefics.length > 0) html += (isEasy ? 'Planetas beneficos — abençoado com filhos.' : 'Planetas beneficos na casa 5 — abençoado com filhos.') + '<br>';
        if (malefics.length > 0) html += (isEasy ? 'Planetas desafiadores — dificuldades com filhos possiveis.' : 'Planetas maleficos na casa 5 — dificuldades com filhos possiveis.') + '<br>';
        if (d7_5planets.length === 0) html += isEasy ? 'Sem planetas na posicao de filhos — outros fatores precisam de analise.' : 'Casa 5 vazia — verificar posicao do senhor da 5a.';
        html += '</div></div>';

    } else if (division === 12) {
        // D12 해석: 부모
        const d12_4sign = (dLagnaSign + 3) % 12; // 4 house = Mother
        const d12_9sign = (dLagnaSign + 8) % 12; // 9 house = Father
        const d12_4planets = dPositions.filter(p => p.dSign === d12_4sign);
        const d12_9planets = dPositions.filter(p => p.dSign === d12_9sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨‍👩‍👧 Análise dos Pais' : '👨‍👩‍👧 D12 Análise dos Pais') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D12 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
        }
        html += '<strong>' + (isEasy ? 'Mother' : 'D12 Casa 4 (Mae): ' + SIGNS[d12_4sign]) + '</strong>';
        if (d12_4planets.length > 0 && !isEasy) html += ' — ' + d12_4planets.map(p => p.name).join(', ');
        html += '<br>';
        html += '<strong>' + (isEasy ? 'Father' : 'D12 Casa 9 (Pai): ' + SIGNS[d12_9sign]) + '</strong>';
        if (d12_9planets.length > 0 && !isEasy) html += ' — ' + d12_9planets.map(p => p.name).join(', ');
        html += '<br>';

        const moon4 = d12_4planets.find(p => p.id === 'Moon');
        const sun9 = d12_9planets.find(p => p.id === 'Sun');
        if (moon4) html += (isEasy ? 'Lua em posicao de mae — conexao profunda com a mae.' : 'Lua na casa 4 — conexao profunda com a mae.') + '<br>';
        if (sun9) html += (isEasy ? 'Sol em posicao de pai — conexao profunda com o pai.' : 'Sol na casa 9 — conexao profunda com o pai.') + '<br>';
        html += '</div></div>';

    } else if (division === 60) {
        // D60 해석: 전생 karma (소챕터 구조)
        const d60_1lord = SIGN_RULERS[dLagnaSign];
        const d60_planets_1 = dPositions.filter(p => p.dSign === dLagnaSign);

        const D60_DEITIES = [
            {name:'Ghora',ko:'Ghora',nature:'malefic',desc:'Destruicao e medo. Karma sombrio de vidas passadas'},
            {name:'Rakshasa',ko:'Rakshasa',nature:'malefic',desc:'Energia demoniaca. Forte desejo e apego'},
            {name:'Deva',ko:'Deva',nature:'benefic',desc:'Ser divino. Merito e bencaos de vidas passadas'},
            {name:'Kubera',ko:'Kubera',nature:'benefic',desc:'Deus da riqueza. Karma de construcao de riqueza'},
            {name:'Yaksha',ko:'Yaksha',nature:'benefic',desc:'Guardiao da natureza. Harmonia com a natureza'},
            {name:'Kinnara',ko:'Kinnara',nature:'benefic',desc:'Musico celestial. Talento artistico'},
            {name:'Bhrashta',ko:'Bhrashta',nature:'malefic',desc:'O caido. Karma de queda do alto'},
            {name:'Kulaghna',ko:'Kulaghna',nature:'malefic',desc:'Destruidor de familias. Karma relacionado a familia'},
            {name:'Garala',ko:'Garala',nature:'malefic',desc:'Veneno. Karma de acoes toxicas'},
            {name:'Vahni',ko:'Vahni',nature:'malefic',desc:'Deus do fogo. Karma de raiva e destruicao'},
            {name:'Maya',ko:'Maya',nature:'malefic',desc:'Ilusao. Karma de engano'},
            {name:'Purishaka',ko:'Purishaka',nature:'malefic',desc:'Escravidao. Karma de restringir outros'},
            {name:'Apampathi',ko:'Apampathi',nature:'benefic',desc:'Senhor das aguas. Purificacao e cura'},
            {name:'Marut',ko:'Marut',nature:'benefic',desc:'Deus do vento. Liberdade e mudanca'},
            {name:'Kala',ko:'Kala',nature:'malefic',desc:'Deus do tempo. Karma do tempo e da morte'},
            {name:'Sarpa',ko:'Sarpa',nature:'malefic',desc:'Serpente. Escravidao e apego — incapaz de soltar'},
            {name:'Amrita',ko:'Amrita',nature:'benefic',desc:'Nectar da imortalidade. Busca da vida eterna'},
            {name:'Indu',ko:'Indu',nature:'benefic',desc:'Lua. Sensibilidade e intuicao'},
            {name:'Mridu',ko:'Mridu',nature:'benefic',desc:'O gentil. Gentileza e compaixao'},
            {name:'Komala',ko:'Komala',nature:'benefic',desc:'O delicado. Arte e beleza'},
            {name:'Heramba',ko:'Heramba',nature:'benefic',desc:'Avatar de Ganesha. Superar obstaculos'},
            {name:'Brahma',ko:'Brahma',nature:'benefic',desc:'Deus criador. Criacao e conhecimento'},
            {name:'Vishnu',ko:'Vishnu',nature:'benefic',desc:'Deus preservador. Protecao e ordem'},
            {name:'Maheshwara',ko:'Maheshwara',nature:'benefic',desc:'Grande Senhor Shiva. Transformacao e libertacao'},
            {name:'Deva2',ko:'Deva2',nature:'benefic',desc:'Santo. Pratica espiritual'},
            {name:'Bala',ko:'Bala',nature:'benefic',desc:'Forca. Fortaleza e coragem'},
            {name:'Vishwakarma',ko:'Vishwakarma',nature:'benefic',desc:'Arquiteto cosmico. Construcao e criacao'},
            {name:'Tamasa',ko:'Tamasa',nature:'malefic',desc:'Escuridao. Karma de ignorancia'},
            {name:'Kanchana',ko:'Kanchana',nature:'benefic',desc:'Ouro. Pureza e valor'},
            {name:'Varaha',ko:'Varaha',nature:'benefic',desc:'Avatar javali de Vishnu. Salvacao'},
            {name:'Ramasala',ko:'Ramasala',nature:'benefic',desc:'Morada de Rama. Moralidade e dever'},
            {name:'Ghrisha',ko:'Ghrisha',nature:'benefic',desc:'O radiante. Sabedoria e iluminacao'},
            {name:'Indra',ko:'Indra',nature:'benefic',desc:'Rei dos deuses. Lideranca'},
            {name:'Jala',ko:'Jala',nature:'benefic',desc:'Agua. Fluxo e adaptacao'},
            {name:'Vishwa',ko:'Vishwa',nature:'benefic',desc:'Universo. Amor universal'},
            {name:'Amara',ko:'Amara',nature:'benefic',desc:'Imortal. Busca da eternidade'},
            {name:'Bala2',ko:'Bala2',nature:'malefic',desc:'Forca jovem. Uso imaturo do poder'},
            {name:'Pitri',ko:'Pitri',nature:'malefic',desc:'Ancestrais. Karma ancestral'},
            {name:'Rudra',ko:'Rudra',nature:'malefic',desc:'Deus da tempestade. Transformacao destrutiva'},
            {name:'Varuna',ko:'Varuna',nature:'benefic',desc:'Deus do oceano. Ordem cosmica'},
            {name:'Aryama',ko:'Aryama',nature:'benefic',desc:'Divindade solar. Amizade e contratos'},
            {name:'Mitra',ko:'Mitra',nature:'benefic',desc:'Deus da amizade. Confianca e companheirismo'},
            {name:'Agni',ko:'Agni',nature:'malefic',desc:'Deus do fogo. Fogo purificador'},
            {name:'Varuna2',ko:'Varuna2',nature:'benefic',desc:'Deus do oceano. Sabedoria profunda'},
            {name:'Gauri',ko:'Gauri',nature:'benefic',desc:'Parvati. Devocao e amor'},
            {name:'Mahakala',ko:'Mahakala',nature:'malefic',desc:'Grande Tempo. Tentando dominar o tempo'},
            {name:'Pitamaha',ko:'Pitamaha',nature:'benefic',desc:'Grande Pai Brahma. Criador'},
            {name:'Kartikeya',ko:'Kartikeya',nature:'benefic',desc:'Deus da guerra. Batalha justa'},
            {name:'Yama',ko:'Yama',nature:'malefic',desc:'Deus da morte. Julgamento e justica'},
            {name:'Kala2',ko:'Kala2',nature:'malefic',desc:'Tempo. Perseguido pelo tempo'},
            {name:'Varuna3',ko:'Varuna3',nature:'benefic',desc:'Deus do oceano. Lei e verdade'},
            {name:'Kubera2',ko:'Kubera2',nature:'benefic',desc:'Deus da riqueza. Generosidade'},
            {name:'Aditya',ko:'Aditya',nature:'benefic',desc:'Deus do sol. Luz e verdade'},
            {name:'Rishi',ko:'Rishi',nature:'benefic',desc:'Sabio. Sabedoria e pratica'},
            {name:'Vasu',ko:'Vasu',nature:'benefic',desc:'Ser celestial. Governando a natureza'},
            {name:'Ashwini',ko:'Ashwini',nature:'benefic',desc:'Curadores gemeos. Cura'},
            {name:'Naga',ko:'Naga',nature:'malefic',desc:'Divindade serpente. Misterio e segredos'},
            {name:'Gandharva',ko:'Gandharva',nature:'benefic',desc:'Musico celestial. Arte e musica'},
            {name:'Prajapati',ko:'Prajapati',nature:'benefic',desc:'Criador. Criando vida'},
            {name:'Charachara',ko:'Charachara',nature:'benefic',desc:'Todas as coisas. Unidade com tudo'}
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
            'Guerreiro, Lider — Exerceu poder, lideranca natural e decisao impressas na alma.',
            'Artista, Fazendeiro — Trabalhou com a natureza, instinto profundo de estabilidade e beleza material.',
            'Erudito, Comerciante — Viveu pelo conhecimento, versatilidade e curiosidade permanecem. Talento natural para linguas.',
            'Protetor, Cuidador — Cuidou de outros, sensibilidade profunda e instinto maternal. Forte karma do lar.',
            'Realeza, Sacerdote — Teve alto status, autoridade natural e dignidade. Estar no palco e instinto da alma.',
            'Curador, Servidor — Praticou medicina ou servico, excelentes habilidades analiticas. Ajudar outros e dever da alma.',
            'Diplomata, Artista — Perseguiu harmonia e beleza, habil em relacionamentos. Parceria e tema central.',
            'Praticante, Alquimista — Passou por transformacao profunda, forte atracao por segredos e misterios.',
            'Sabio, Explorador — Buscou a verdade, sabedoria espiritual e aventura permanecem. Karma de educacao superior.',
            'Oficial, Arquiteto — Construiu ordem, forte paciencia e responsabilidade. Disciplina impressa na alma.',
            'Oficial, Guardiao — Construiu ordem social, espirito organizacional. Regido por Saturno, dever impresso na alma.',
            'Medium, Artista — Comunicou com o mundo espiritual, intuicao extremamente forte. Mais proximo da libertacao.'
        ];

        // 행성별 D60 사인 해석 (전통)
        const d60PlanetInSign = {
            Sun: ['Viveu como guerreiro ou rei em vidas passadas. Forte ego e lideranca permanecem. Proposito da alma de estabelecer autoridade.','Viveu como artista ou pessoa rica. A alma busca abundancia material. Atraido por beleza sensorial.','Viveu como erudito ou comerciante. Conhecimento e comunicacao sao temas centrais da alma.','Viveu como protetor ou cuidador. Cuidar dos outros e um instinto profundo da alma.','Teve alto status como realeza ou clero. Autoridade natural se transfere para esta vida.','Viveu como curador ou servidor. Analise e servico sao o proposito da alma.','Viveu como diplomata ou artista buscando harmonia. Relacoes e equilibrio sao a tarefa da alma.','Viveu como praticante ou alquimista em transformacao profunda. Segredos e transformacao impressos na alma.','Viveu como sabio ou explorador buscando a verdade. Sabedoria e aventura sao a direcao da alma.','Viveu como oficial ou arquiteto construindo ordem. Sistema e responsabilidade gravados na alma.','Viveu como revolucionario ou inventor a frente do tempo. Originalidade e o traco da alma.','Viveu como medium ou artista comungando com o mundo espiritual. Intuicao profunda permanece na alma.'],
            Moon: ['Memorias emocionais de vidas passadas sao fieramente intensas. Raiva e paixao impressas no inconsciente. Dominar emocoes e a tarefa.','Memorias emocionais de vidas passadas sao quentes e estaveis. Memorias de abundancia permanecem no inconsciente, buscando beleza.','Memorias emocionais de vidas passadas sao intelectuais e variadas. Curiosidade e forte por muitas experiencias passadas.','Memorias emocionais de vidas passadas sao muito profundas. Fortes memorias de lar e cuidado criam emocoes ricas.','Memorias emocionais de vidas passadas sao cheias de orgulho e dignidade. Memorias de ser reconhecido e respeitado permanecem.','Memorias emocionais de vidas passadas se relacionam com servico e analise. Memorias de ajudar outros criam um coracao carinhoso.','Memorias emocionais de vidas passadas se relacionam com harmonia e relacionamentos. Memorias de belas conexoes impulsionam buscar parceiro.','Memorias emocionais de vidas passadas sao profundas e intensas. Memorias de mudancas extremas criam emocoes profundas como o oceano.','Memorias emocionais de vidas passadas se relacionam com liberdade e exploracao. Memorias de viagem e aprendizado impulsionam expansao.','Memorias emocionais de vidas passadas se relacionam com responsabilidade e paciencia. Memorias de cargas pesadas criam emocoes maduras.','Memorias emocionais de vidas passadas sao unicas e extraordinarias. Memorias de ser diferente criam sensibilidade independente.','Memorias emocionais de vidas passadas sao espirituais e transcendentes. Sonhos e visoes sao vividos com conexao espiritual profunda.']
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
            return ' — divindade: <strong>' + d.deity.name + '</strong>(' + d.deity.ko + ') <span style="color:' + c + ';font-weight:700;">' + (d.deity.nature === 'benefic' ? 'Benefico' : 'Malefico') + '</span>';
        }

        const houseThemes = ['','Eu/Existencia','Riqueza/Valor','Comunicacao/Aprendizado','Lar/Descanso','Criacao/Amor','Servico/Provacao','Relacao/Parceiro','Transformacao/Segredo','Sabedoria/Religiao','Sociedade/Carreira','Desejo/Ganho','Libertacao/Transcendencia'];

        // Parasara 인용
        if (!isEasy) {
            html += '<div class="interp-card" style="border-left:3px solid #8b7ec8;"><div class="interp-text" style="font-size:13px;color:#888;">';
            html += '📜 <strong>Parasara diz:</strong> "Shashtiamsha (D60) e a mais importante de todas as cartas divisionais. Planetas beneficos em divisoes beneficas dao bons resultados, maleficos em maleficas dao maus resultados."<br>';
            html += '<span style="color:#666;">— Brihat Parasara Hora Shastra (BPHS)</span></div></div>';
        }

        // ─── 소챕터 1: soul의 정체성 ───
        const lagnaD = getDeity(lagnaSidereal);
        let ch1 = isEasy
            ? '<strong>Identidade de vidas passadas</strong>' + deityTag(lagnaD) + '<br><br>'
            : '<strong>D60 Lagna: ' + SIGNS[dLagnaSign] + ' ' + SIGN_SYMBOLS[dLagnaSign] + '</strong> (regente: ' + (RULER_NAMES[d60_1lord]||d60_1lord) + ')' + deityTag(lagnaD) + '<br><br>';
        ch1 += pastLifeThemes[dLagnaSign] + '<br>';
        if (lagnaD.deity) {
            ch1 += '<br>' + (isEasy ?
                (lagnaD.deity.nature === 'benefic' ?
                    'Voce fez muitas coisas boas em vidas passadas, entao boas oportunidades vem naturalmente. Sua existencia esta protegida.' :
                    'Licoes nao resolvidas de vidas passadas afetam sua personalidade, mas supera-las leva a maior crescimento.') :
                (lagnaD.deity.nature === 'benefic' ?
                    '<strong>' + lagnaD.deity.ko + '</strong> guarda o Lagna. ' + lagnaD.deity.desc + ' — O merito de vidas passadas protege — boas oportunidades vem naturalmente.' :
                    '<strong>' + lagnaD.deity.ko + '</strong> influencia o Lagna. ' + lagnaD.deity.desc + ' — Desafio carmico impresso, mas supera-lo leva ao crescimento.'));
        }
        if (d60_planets_1.length > 0) ch1 += '<br><br>' + d60_planets_1.map(p => p.name).join(', ') + (isEasy ? ' — karma central de vidas passadas concentrado nesses planetas.' : ' posicionado no D60 Lagna — Karma central de vidas passadas concentrado nesses planetas.');
        html += subChapter('🪐', 'Identidade da Alma — Quem Você Foi em Vidas Passadas', ch1);

        // ─── 소챕터 2: soul의 목적 ───
        const sunD60 = dPositions.find(p => p.id === 'Sun');
        if (sunD60) {
            const sunD = getDeity(sunD60.sidereal);
            let ch2 = (isEasy ? '<strong>Memoria do Sol de vidas passadas</strong>' : '<strong>D60 Sol: ' + SIGNS[sunD60.dSign] + ' ' + SIGN_SYMBOLS[sunD60.dSign] + '</strong>') + deityTag(sunD) + '<br><br>';
            ch2 += (d60PlanetInSign.Sun[sunD60.dSign] || '') + '<br>';
            if (sunD.deity) {
                ch2 += '<br>' + (isEasy ?
                    (sunD.deity.nature === 'benefic' ?
                        'Voce perseguiu bem seu verdadeiro proposito em vidas passadas, entao a autorrealizacao vem naturalmente. Tenha confianca!' :
                        'Havia confusao sobre quem voce e em vidas passadas. Encontrar seu verdadeiro eu e uma jornada importante que te faz crescer.') :
                    (sunD.deity.nature === 'benefic' ?
                        'Divindade solar <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. Proposito da alma corretamente perseguido — a autorrealizacao vem naturalmente.' :
                        'Divindade solar <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. Desafio de vidas passadas com o eu/autoridade — encontrar o verdadeiro eu e a tarefa da alma.'));
            }
            html += subChapter('☉', 'Propósito da Alma — Por Que Você Nasceu', ch2);
        }

        // ─── 소챕터 3: 감정의 기억 ───
        const moonD60 = dPositions.find(p => p.id === 'Moon');
        if (moonD60) {
            const moonD = getDeity(moonD60.sidereal);
            let ch3 = (isEasy ? '<strong>Memoria da Lua de vidas passadas</strong>' : '<strong>D60 Lua: ' + SIGNS[moonD60.dSign] + ' ' + SIGN_SYMBOLS[moonD60.dSign] + '</strong>') + deityTag(moonD) + '<br><br>';
            ch3 += (d60PlanetInSign.Moon[moonD60.dSign] || '') + '<br>';
            if (moonD.deity) {
                ch3 += '<br>' + (isEasy ?
                    (moonD.deity.nature === 'benefic' ?
                        'Sua mente era pacifica em vidas passadas, entao voce e emocionalmente estavel com forte intuicao. Confie no seu instinto.' :
                        'Tracos de dificuldades emocionais de vidas passadas permanecem profundos no seu coracao. Meditacao e estar perto da agua ajuda muito na cura.') :
                    (moonD.deity.nature === 'benefic' ?
                        'Divindade lunar <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. A mente era pacifica — emocionalmente estavel com forte intuicao.' :
                        'Divindade lunar <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. Feridas emocionais permanecem inconscientes. Reconhecer e curar e a tarefa emocional desta vida. Meditacao e descanso perto da agua ajudam.'));
            }
            html += subChapter('☽', 'Memória Emocional — Padrões Inconscientes', ch3);
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
            'Conexao de guerreiro/lider de vidas passadas. Karma matrimonial intenso e independente. Almas que lutaram juntas.',
            'Conexao de artista/rico. Karma matrimonial materialmente abundante. Almas que perseguiram a beleza juntas.',
            'Conexao de erudito/comerciante. Karma matrimonial intelectual. Almas que estudaram ou comerciaram juntas.',
            'Conexao de familia/protetor. Karma matrimonial de vinculo emocional profundo. Almas que cuidaram uma da outra.',
            'Conexao de realeza/nobreza. Karma matrimonial esplendido e respeitado. Almas que governaram juntas.',
            'Conexao de curador/servidor. Karma matrimonial de servico e devocao. Almas que ajudaram outros juntas.',
            'Conexao de diplomata/artista. Karma matrimonial harmonioso e belo. Almas que buscaram equilibrio juntas.',
            'Conexao de praticante/mistico. Karma matrimonial intenso e transformador. Almas que compartilharam vida e morte.',
            'Conexao de sabio/explorador. Karma matrimonial livre e expansivo. Parceiro estrangeiro possivel.',
            'Conexao de oficial/arquiteto. Karma matrimonial responsavel e estavel. Casamento tardio possivel.',
            'Conexao de oficial/soldado. Signo regido por Saturno com karma matrimonial responsavel. Almas que praticaram o dever social juntas. Casamento pode ser tardio ou com diferenca de idade.',
            'Conexao de medium/artista. Karma matrimonial mistico e espiritual. Podem se conhecer primeiro em sonhos.'
        ];

        let ch4 = (isEasy
            ? '<strong>Conexao do parceiro de vidas passadas</strong><br><br>'
            : '<strong>D60 Casa 7 (parceiro): ' + SIGNS[d60H7sign] + ' ' + SIGN_SYMBOLS[d60H7sign] + '</strong> (7 lord: ' + (RULER_NAMES[d60H7lord]||d60H7lord) + ')<br><br>');
        ch4 += spouseKarmaBySign[d60H7sign] + '<br>';

        if (d60H7planets.length > 0) {
            ch4 += '<br><strong>' + (isEasy ? 'Planetas na posicao do parceiro:' : 'Planetas D60 na 7ª:') + '</strong><br>';
            d60H7planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (isEasy) {
                    ch4 += (p.natural === 'benefic'
                        ? 'Boa conexao com o parceiro de vidas passadas — bencaos nesta vida.'
                        : 'Questoes nao resolvidas com o parceiro de vidas passadas. Desafios mas oportunidades de crescimento.') + '<br>';
                } else {
                    ch4 += p.symbol + ' <strong>' + p.name + '</strong>' + deityTag(pD) + '<br>';
                    ch4 += (p.natural === 'benefic'
                        ? 'Benefico na casa 7 — Bom karma com o parceiro em vidas passadas. Bencaos do parceiro nesta vida tambem.'
                        : 'Malefico na casa 7 — Karma nao resolvido com o parceiro de vidas passadas. Resolvendo nesta vida. Desafiador mas oportunidade de crescimento.') + '<br>';
                }
            });
        }

        // Venus (사랑의 karma)
        if (venusD60) {
            const venD = getDeity(venusD60.sidereal);
            const venH = ((venusD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (isEasy) {
                ch4 += '<br>' + (venD.deity && venD.deity.nature === 'benefic' ?
                    'Voce amou sinceramente em vidas passadas, entao um belo amor te espera.' :
                    'Licoes de amor nao resolvidas de vidas passadas. Aprender o amor verdadeiro e importante e te torna mais profundo.');
            } else {
                ch4 += '<br><strong>♀ Vênus (Planeta do Amor)</strong> → D60 ' + venH + ' casa (' + houseThemes[venH] + ')' + deityTag(venD) + '<br>';
                ch4 += venD.deity && venD.deity.nature === 'benefic' ?
                    'Venus sob benefico <strong>' + venD.deity.ko + '</strong> protecao. Amor bem praticado — um belo amor te espera. ' + venD.deity.desc :
                    'Venus sob malefico <strong>' + (venD.deity?venD.deity.ko:'') + '</strong> influencia. Desafios amorosos passados — aprender o amor verdadeiro e a tarefa. ' + (venD.deity?venD.deity.desc:'');
            }
        }

        // Rahu-Ketu 축 (1-7궁이면 전생 인연)
        if (rahuD60 && ketuD60) {
            const rahuH = ((rahuD60.dSign - dLagnaSign + 12) % 12) + 1;
            const ketuH = ((ketuD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (rahuH === 7 || ketuH === 7 || rahuH === 1 || ketuH === 1) {
                ch4 += isEasy
                    ? '<br><br>🔥 <strong>Conexao muito forte de vidas passadas!</strong> Conexao profunda com o parceiro — destinados a se encontrar nesta vida.'
                    : '<br><br>🔥 <strong>Eixo Rahu-Ketu na linha D60 1-7!</strong> Isso indica uma <strong>conexao muito forte de vidas passadas</strong> com seu parceiro. Destinados a se encontrar nesta vida.';
            }
        }

        // 7 lord의 D60 position
        const h7lordPlanet = dPositions.find(p => p.id === d60H7lord);
        if (h7lordPlanet) {
            const h7lH = ((h7lordPlanet.dSign - dLagnaSign + 12) % 12) + 1;
            const h7lD = getDeity(h7lordPlanet.sidereal);
            if (isEasy) {
                const h7lDesc = h7lH === 1 ? 'Parceiro diretamente conectado ao seu crescimento.' : h7lH === 4 ? 'Conhecer parceiro pelo lar e santuario.' : h7lH === 9 ? 'Conexao com parceiro por exterior/educacao.' : h7lH === 10 ? 'Conexao com parceiro por carreira/social.' : h7lH === 12 ? 'Conhecer parceiro em ambiente estrangeiro/espiritual.' : '';
                if (h7lDesc) ch4 += '<br><br>' + h7lDesc;
            } else {
                ch4 += '<br><br><strong>7 lord ' + (RULER_NAMES[d60H7lord]||d60H7lord) + '</strong> → D60 ' + h7lH + ' casa (' + houseThemes[h7lH] + ')' + deityTag(h7lD) + '<br>';
                ch4 += 'Conexao carmica com o parceiro <strong>' + houseThemes[h7lH] + '</strong> se manifesta atraves desta area. ';
                ch4 += h7lH === 1 ? 'Parceiro diretamente conectado ao seu crescimento.' : h7lH === 4 ? 'Conhecer parceiro pelo lar e santuario.' : h7lH === 9 ? 'Conexao com parceiro por exterior/educacao.' : h7lH === 10 ? 'Conexao com parceiro por carreira/social.' : h7lH === 12 ? 'Karma para conhecer parceiro em ambiente estrangeiro/espiritual.' : '';
            }
        }
        html += subChapter('💍', 'Karma do Parceiro — Conexão de Vidas Passadas', ch4);

        // ─── 소챕터 5: career karma ───
        const d60H10sign = (dLagnaSign + 9) % 12;
        const d60H10lord = SIGN_RULERS[d60H10sign];
        const d60H10planets = dPositions.filter(p => p.dSign === d60H10sign);
        const satD60 = dPositions.find(p => p.id === 'Saturn');
        const careerKarma = ['militar/lideranca/esportes','financas/arte/agricultura','educacao/midia/comercio','enfermagem/imoveis/hotelaria','politica/entretenimento/gestao','medicina/analise/servico','direito/diplomacia/design','pesquisa/investigacao/medicina','educacao/religiao/exterior','administracao/construcao/funcionario','tecnologia/ciencia/inovacao','arte/espiritualidade/hospital'][d60H10sign];

        let ch5 = (isEasy
            ? '<strong>Karma de carreira de vidas passadas</strong><br><br>'
            : '<strong>D60 Casa 10 (carreira): ' + SIGNS[d60H10sign] + ' ' + SIGN_SYMBOLS[d60H10sign] + '</strong> (10 lord: ' + (RULER_NAMES[d60H10lord]||d60H10lord) + ')<br><br>');
        ch5 += 'Karma de carreira de vidas passadas em <strong>' + careerKarma + '</strong> direcao. Atracao natural por este campo.<br>';
        if (satD60) {
            const satD = getDeity(satD60.sidereal);
            const satH = ((satD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) ch5 += '<br><strong>♄ Saturno (Senhor do Karma)</strong> → D60 ' + satH + ' casa (' + houseThemes[satH] + ')' + deityTag(satD) + '<br>';
            ch5 += isEasy ?
                ('<br>' + (satD.deity && satD.deity.nature === 'benefic' ?
                    'Esta e uma <strong>bencao muito rara</strong>! A paciencia de vidas passadas reduz desafios de carreira nesta vida.' :
                    'Licao pesada de carreira de vidas passadas. Esforco constante e ajudar outros e a chave.')) :
                (satD.deity && satD.deity.nature === 'benefic' ?
                    'Saturno sob divindade benefica e uma <strong>bencao muito rara</strong>! A paciencia de vidas passadas reduz as provacoes de carreira.' :
                    'Saturno sob divindade malefica — <strong>karma pesado de vidas passadas</strong> na area de carreira. ' + (satD.deity?satD.deity.desc:'') + '. Paciencia, servico, mantra(Om Shanaishcharaya Namaha) para dissolver este karma.');
        }
        if (d60H10planets.length > 0) {
            ch5 += '<br><br><strong>' + (isEasy ? 'Planetas de carreira:' : 'Planetas D60 na 10ª:') + '</strong> ' + d60H10planets.map(p => p.name).join(', ') + ' — Karma de carreira concentrado nesses planetas.';
        }
        html += subChapter('💼', 'Karma de Carreira — Vocação de Vidas Passadas', ch5);

        // ─── 소챕터 6: wealth karma ───
        const d60H2sign = (dLagnaSign + 1) % 12;
        const d60H2planets = dPositions.filter(p => p.dSign === d60H2sign);
        let ch6 = (isEasy
            ? '<strong>Karma de riqueza de vidas passadas</strong><br><br>'
            : '<strong>D60 Casa 2 (riqueza): ' + SIGNS[d60H2sign] + ' ' + SIGN_SYMBOLS[d60H2sign] + '</strong><br><br>');
        const wealthKarma = ['Instinto de riqueza autodidata.','Ambiente abundante de vidas passadas.','Construcao intelectual de riqueza.','Riqueza familiar/imobiliaria.','Riqueza por autoridade.','Riqueza por servico. Frugal.','Riqueza por parceria.','Riqueza de outros (heranca).','Fortuna traz riqueza. Exterior.','Lento mas seguro. Rico apos meia-idade.','Riqueza de inovacao. Nao convencional.','Atividade espiritual e riqueza. Dar.'][d60H2sign];
        ch6 += wealthKarma + '<br>';
        if (d60H2planets.length > 0) {
            ch6 += isEasy ? '<br>' : '<br><strong>Planetas D60 na 2a:</strong><br>';
            d60H2planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                ch6 += (isEasy ? '' : p.symbol + ' ' + p.name + deityTag(pD) + ' — ') + (p.natural === 'benefic' ? 'Boas conexoes de riqueza de vidas passadas — abundancia nesta vida tambem.' : 'Licoes de riqueza de vidas passadas. Esforco constante pode supera-las.') + '<br>';
            });
        }
        html += subChapter('💰', 'Karma de Riqueza — Fortuna de Vidas Passadas', ch6);

        // ─── 소챕터 7: 행성별 신 목록 (전문가 모드만) ───
        if (!isEasy) {
            let ch7 = '';
            const lagnaD2 = getDeity(lagnaSidereal);
            if (lagnaD2.deity) {
                const lc = lagnaD2.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                ch7 += '<div style="padding:4px 0;">⬆ Lagna → <strong>' + lagnaD2.deity.name + '</strong>(' + lagnaD2.deity.ko + ') <span style="color:' + lc + ';">' + (lagnaD2.deity.nature === 'benefic' ? 'Benefico' : 'Malefico') + '</span></div>';
            }
            positions.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (pD.deity) {
                    const c = pD.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                    ch7 += '<div style="padding:4px 0;">' + p.symbol + ' ' + p.name + ' → <strong>' + pD.deity.name + '</strong>(' + pD.deity.ko + ') <span style="color:' + c + ';">' + (pD.deity.nature === 'benefic' ? 'Benefico' : 'Malefico') + '</span></div>';
                }
            });
            html += subChapter('🕉️', 'Lista de Divindades Planetárias', ch7);
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
            '<strong style="color:#5cb85c">' + beneficCount + ' boa energia</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' energia de cautela</strong> de 9 planetas<br><br>' :
            '<strong style="color:#5cb85c">' + beneficCount + ' benefico</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' malefico</strong> posicionamento<br><br>';
        if (beneficCount >= 7) {
            ch8 += isEasy ?
                '🌟 <strong>Voce fez tantas coisas boas em vidas passadas!</strong> Quase todos os planetas sob boa energia — bons resultados naturalmente. Forte fortuna inata.' :
                '🌟 <strong>Merito muito forte de vidas passadas.</strong> Parasara chamou tais mapas de "uma alma abençoada pelos deuses". A maioria dos planetas sob beneficos — bons resultados naturalmente.';
        } else if (beneficCount >= 5) {
            ch8 += isEasy ?
                '✨ <strong>Abundante boa energia de vidas passadas.</strong> Protegido em muitas areas da vida.' :
                '✨ <strong>Merito abundante de vidas passadas.</strong> Beneficos dominam — protegido em muitas areas.';
            if (maleficPlanets.length > 0) ch8 += isEasy ?
                ' No entanto, algumas areas precisam de mais esforco.' :
                ' No entanto, existem desafios carmicos em <strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>. Pratique mantras e caridade para esses planetas.';
        } else if (beneficCount >= 3) {
            ch8 += isEasy ?
                '⚖️ <strong>Boa energia e energia desafiadora estao meio a meio.</strong> Coisas boas e dificeis se alternam na vida.' :
                '⚖️ <strong>Karma em equilibrio.</strong> Fortuna mista — o bom e os desafios se alternam.';
            if (maleficPlanets.length > 0) ch8 += '<br>' + (isEasy ? 'Planetas a observar: ' : 'Planetas a observar: ') + '<strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>';
        } else {
            ch8 += isEasy ?
                '🔥 <strong>Esta vida trata de resolver licoes de vidas passadas.</strong> Muitos desafios, mas aqueles com as licoes mais pesadas crescem mais. Esforco constante e ajudar outros e especialmente importante.' :
                '🔥 <strong>Uma vida de acerto de karma.</strong> Muitos desafios de vidas passadas, mas Parasara disse "a alma com o karma mais pesado cresce mais". A pratica de mantras e a caridade sao especialmente importantes.';
        }
        html += subChapter('📊', 'Avaliação Geral do Karma', ch8);

        // (이전 코드 제거됨 - 신 목록과 해석은 위 소챕터에 통합)

    } else if (division === 2) {
        // D2 Hora — wealth·부의 축적
        const d2LagnaInterp = ['Riqueza autodidata. Investimento independente e agressivo.','Investimento sensorial e riqueza estavel. Imoveis, alimentacao, arte.','Ganhar por atividade intelectual. Escrita, educacao, tino empresarial.','Renda imobiliaria e familiar. Propriedade da mae. Cuidado com gastos emocionais.','Riqueza por lideranca e autoridade. Governo, ouro. Gastos ostensivos.','Renda por analise e habilidades. Medicina, contabilidade, servico. Gerente frugal.','Riqueza por parceria. Direito, diplomacia, moda, arte.','Construir riqueza com dinheiro alheio (heranca, seguros, investimentos).','Renda por educacao, exterior, religiao. A fortuna traz riqueza.','Esforco sistematico constroi riqueza. Lento mas seguro. Rico apos meia-idade.','Renda por tecnologia, inovacao, redes. Fontes nao convencionais.','Renda por atividades espirituais/artisticas. Riqueza estrangeira. Natureza generosa.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💰 Análise Detalhada de Riqueza' : '💰 D2 Hora — Análise de Riqueza') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D2 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d2LagnaInterp + '<br><br>';

        const sunD2 = dPositions.find(p => p.id === 'Sun');
        const moonD2 = dPositions.find(p => p.id === 'Moon');
        const jupD2 = dPositions.find(p => p.id === 'Jupiter');
        const venD2 = dPositions.find(p => p.id === 'Venus');

        if (sunD2) {
            const sunInOwn = sunD2.dSign === 4; // Leo
            html += (isEasy ? '' : '<strong>☉ Sol → ' + SIGNS[sunD2.dSign] + ':</strong> ') + (sunInOwn ? (isEasy ? '🌟 <strong>Autodidata!</strong> Constroi riqueza por autoridade e lideranca.' : '🌟 <strong>Sol no proprio Hora (Leao)!</strong> Tipo autodidata. Constroi riqueza por autoridade e lideranca.') : (isEasy ? 'Renda por outros ou setor governo/publico.' : 'Sol no Hora da Lua. Renda pela ajuda de outros ou setor governo/publico.')) + '<br>';
        }
        if (moonD2) {
            const moonInOwn = moonD2.dSign === 3; // Cancer
            html += (isEasy ? '' : '<strong>☽ Lua → ' + SIGNS[moonD2.dSign] + ':</strong> ') + (moonInOwn ? (isEasy ? '🌟 <strong>Vida abundante por relacoes publicas!</strong>' : '🌟 <strong>Lua no proprio Hora (Cancer)!</strong> Vida abundante pelo publico e relacionamentos.') : (isEasy ? 'Renda por esforco proprio e atividade independente.' : 'Lua no Hora do Sol. Renda por esforco proprio e atividade independente.')) + '<br>';
        }
        if (jupD2) html += (isEasy ? '' : '<strong>♃ Jupiter → ' + SIGNS[jupD2.dSign] + ':</strong> ') + (isEasy ? (jupD2.dSign === 4 ? 'Pode construir grande riqueza por habilidade propria.' : 'Abundancia por relacionamentos com outros.') : 'Jupiter em ' + (jupD2.dSign === 4 ? 'Hora Solar — grande riqueza por habilidade propria.' : 'Hora Lunar — abundancia pelos relacionamentos.')) + '<br>';
        if (venD2) html += (isEasy ? '' : '<strong>♀ Venus → ' + SIGNS[venD2.dSign] + ':</strong> ') + (isEasy ? (venD2.dSign === 4 ? 'Autodidata por arte/artigos de luxo.' : 'Riqueza pelo conjuge ou parceiro.') : 'Venus em ' + (venD2.dSign === 4 ? 'Hora Solar — autodidata por arte/luxo.' : 'Hora Lunar — riqueza pelo parceiro.')) + '<br>';

        // D2 2궁(축적된 부) 분석
        const d2H2sign = (dLagnaSign + 1) % 12;
        const d2H2planets = dPositions.filter(p => p.dSign === d2H2sign);
        html += '<br><strong>' + (isEasy ? 'Riqueza acumulada:' : 'D2 Casa 2 (riqueza acumulada) — ' + SIGNS[d2H2sign] + ':') + '</strong><br>';
        if (d2H2planets.length > 0) {
            d2H2planets.forEach(p => {
                const wealth = {Sun:'Riqueza por autoridade e status',Moon:'Riqueza fluida por atividades publicas',Mars:'Riqueza em imoveis, tecnologia, campos competitivos',Mercury:'Riqueza em negocios, intelectual, comunicacao',Jupiter:'Riqueza abundante em educacao, religiao, direito',Venus:'Riqueza relacionada a arte, moda, artigos de luxo',Saturn:'Riqueza lenta mas constante. Estavel apos meia-idade',Rahu:'Riqueza por metodos nao convencionais ou fontes estrangeiras',Ketu:'Desapegado do material. Persegue valores espirituais'};
                html += isEasy ? (wealth[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (wealth[p.id]||'') + '<br>';
            });
        } else {
            html += isEasy ? 'Acumula riqueza constantemente.<br>' : 'Casa 2 vazia — a posicao do senhor da casa 2 e chave para acumulacao de riqueza.<br>';
        }
        html += '</div></div>';

    } else if (division === 3) {
        // D3 Drekkana — sibling·용기·소통
        const d3LagnaInterp = ['Independente, lideranca entre irmaos. Estilo de comunicacao corajoso.','Relacoes fraternas estaveis e materialmente confortaveis. Irmaos artisticos possiveis.','Irmaos intelectuais e comunicativos. Muitos irmaos ou muita conversa.','Vinculo fraterno emocionalmente profundo. Irmao maternal. Irmaos protetores.','Irmaos carismaticos e orgulhosos. Irmao famoso ou bem-sucedido.','Irmaos analiticos e praticos. Campo medico/educativo. Podem ser criticos.','Irmaos diplomaticos e encantadores. Conexoes sociais pelos irmaos.','Relacoes fraternas intensas e secretas. Vinculos profundos apos conflitos.','Irmaos livres e filosoficos. Irmaos no exterior. Relacionado a religiao/educacao.','Irmaos responsaveis e ambiciosos. Senso de dever. Poucos irmaos ou relacao seria.','Irmaos unicos e independentes. Relacoes fraternas nao convencionais.','Irmaos espirituais e artisticos. Irmaos no exterior. Conexao emocional.'][dLagnaSign];

        const d3_3sign = (dLagnaSign + 2) % 12;
        const d3_11sign = (dLagnaSign + 10) % 12;
        const d3_3planets = dPositions.filter(p => p.dSign === d3_3sign);
        const d3_11planets = dPositions.filter(p => p.dSign === d3_11sign);
        const marsD3 = dPositions.find(p => p.id === 'Mars');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👫 Análise de Irmãos & Coragem' : '👫 D3 Drekkana — Irmãos & Coragem') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D3 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d3LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Younger siblings:' : 'D3 Casa 3 (mais novos) — ' + SIGNS[d3_3sign] + ':') + '</strong><br>';
        if (d3_3planets.length > 0) {
            const bro = {Sun:'Irmao mais novo tem lideranca e autoridade',Moon:'Emocionalmente proximo do irmao mais novo',Mars:'Irmao mais novo ativo e corajoso. Discussoes possiveis',Mercury:'Irmao mais novo intelectual com boa comunicacao',Jupiter:'Irmao mais novo sabio que traz fortuna',Venus:'Irmao mais novo encantador e artistico',Saturn:'Dificuldade com irmao mais novo. Diferenca de idade possivel',Rahu:'Irmao mais novo unico ou relacionado ao exterior',Ketu:'Distancia com irmao mais novo. Conexao espiritual'};
            d3_3planets.forEach(p => { html += isEasy ? (bro[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (bro[p.id]||'') + '<br>'; });
        } else html += isEasy ? '' : 'Casa 3 vazia — verificar posicao do senhor da 3a.<br>';

        html += '<br><strong>' + (isEasy ? 'Older siblings:' : 'D3 Casa 11 (irmaos mais velhos) — ' + SIGNS[d3_11sign] + ':') + '</strong><br>';
        if (d3_11planets.length > 0) {
            d3_11planets.forEach(p => { html += isEasy ? 'Influencia relacao com irmaos mais velhos.<br>' : '• ' + p.name + ' na casa 11 — influencia relacao com irmaos mais velhos.<br>'; });
        } else html += isEasy ? '' : 'Casa 11 sem planetas.<br>';

        if (marsD3) {
            const marsH = ((marsD3.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♂ Marte (karaka de irmaos):</strong> ';
            html += marsH <= 4 ? 'Relacao fraternal proxima. Irmaos corajosos.' : marsH <= 8 ? 'Conflitos fraternais ou transformacao atraves de irmaos.' : 'Irmaos no exterior ou tendencia espiritual.';
        }
        html += '</div></div>';

    } else if (division === 4) {
        // D4 Chaturthamsha — 재산·부동산·행운
        const d4LagnaInterp = ['Adquire propriedades ativamente. Gosta de construir ou comprar casas novas.','Imoveis estaveis e abundantes. Terras e fazendas. Moradia luxuosa.','Multiplos lares ou mudancas frequentes. Prefere ambiente intelectual.','Lar e propriedade sao emocionalmente importantes. Perto da agua. Propriedade da mae.','Lar grande e espacoso. Interior luxuoso. Area prestigiosa.','Moradia limpa e pratica. Ambiente focado em saude. Multiplas pequenas propriedades.','Lar bonito e harmonioso. Interesse em design de interiores. Propriedade com parceiro.','Propriedade passa por transformacao. Propriedade herdada. Lugares secretos.','Grande terreno e propriedade estrangeira. Perto de instalacoes religiosas/educativas.','Investimento imobiliario sistematico. Edificios antigos. Crescimento lento mas seguro.','Estilo de moradia unico. Apartamento moderno. Instalacoes tecnologicas.','Lar bonito perto da agua. Propriedade estrangeira. Espaco espiritual.'][dLagnaSign];

        const d4_4sign = (dLagnaSign + 3) % 12;
        const d4_4planets = dPositions.filter(p => p.dSign === d4_4sign);
        const d4_10sign = (dLagnaSign + 9) % 12;
        const d4_10planets = dPositions.filter(p => p.dSign === d4_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🏠 Análise de Propriedade & Fortuna' : '🏠 D4 Chaturthamsha — Análise de Propriedade & Fortuna') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D4 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d4LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Propriedade/Lar:' : 'D4 Casa 4 (imoveis/lar) — ' + SIGNS[d4_4sign] + ':') + '</strong><br>';
        if (d4_4planets.length > 0) {
            const prop = {Sun:'Edificio governamental ou residencia prestigiosa',Moon:'Lar bonito. Perto da agua. Influencia da mae',Mars:'Construcao de nova casa. Disputas imobiliarias possiveis',Mercury:'Imoveis comerciais. Multiplas propriedades',Jupiter:'Lar espacoso e abundante! Melhor fortuna imobiliaria',Venus:'Lar luxuoso. Interior bonito',Saturn:'Propriedade antiga. Reparos necessarios. Estavel apos meia-idade',Rahu:'Imoveis no exterior. Moradia nao convencional',Ketu:'Indiferente a imoveis. Prefere espacos espirituais'};
            d4_4planets.forEach(p => { html += isEasy ? (prop[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (prop[p.id]||'') + '<br>'; });
        } else html += isEasy ? 'Fortuna imobiliaria estavel.<br>' : 'Casa 4 vazia — a posicao do senhor da 4a e chave para fortuna imobiliaria.<br>';

        html += '<br><strong>' + (isEasy ? 'Overall fortune:' : 'D4 Casa 10 (fortuna geral) — ' + SIGNS[d4_10sign] + ':') + '</strong><br>';
        if (d4_10planets.length > 0) {
            d4_10planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Fortuna geral e boa!<br>' : 'Esforco necessario mas oportunidade de crescimento.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Benefico na casa 10 — fortuna geral e boa!' : 'Malefico na casa 10 — esforco necessario mas oportunidade de crescimento.') + '<br>';
            });
        } else html += isEasy ? '' : 'Casa 10 sem planetas.<br>';
        html += '</div></div>';

    } else if (division === 16) {
        // D16 Shodashamsha — 차량·comfort·행복
        const d16LagnaInterp = ['Carros esportivos, motos — veiculos dinamicos. Gosta de dirigir.','Veiculos premium e transporte confortavel. Conforto material luxuoso.','Multiplos veiculos ou transportes variados. Gosta de gadgets tecnologicos.','Veiculo familiar confortavel. Viajar em familia. Estabilidade material e felicidade.','Veiculos de luxo top. Gastos chamativos. Prefere marcas premium.','Veiculos praticos e eficientes. Dispositivos de saude.','Veiculo refinado e bem projetado. Itens esteticamente agradaveis.','Veiculo usado ou herdado. Seguro importante. Experiencia material transformadora.','SUV ou marcas estrangeiras. Veiculo de viagem. Transporte aventureiro.','Veiculo simples mas resistente. Praticidade primeiro. Melhor carro apos meia-idade.','Veiculo eletrico ou ultima tecnologia. Transporte unico.','Transporte aquatico (barco). Itens emocionalmente favoritos.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🚗 Veículos & Conforto' : '🚗 D16 Shodashamsha — Veículos & Conforto') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D16 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d16LagnaInterp + '<br><br>';

        const d16_4sign = (dLagnaSign + 3) % 12;
        const d16_4planets = dPositions.filter(p => p.dSign === d16_4sign);
        html += '<strong>' + (isEasy ? 'Comfort/Happiness:' : 'D16 Casa 4 (conforto/felicidade) — ' + SIGNS[d16_4sign] + ':') + '</strong><br>';
        if (d16_4planets.length > 0) {
            d16_4planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Conforto material e felicidade abundantes!<br>' : 'Esforco necessario para conforto material.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Conforto material e felicidade abundantes!' : 'Esforco necessario para conforto material.') + '<br>';
            });
        } else html += isEasy ? 'Conforto material medio.<br>' : 'Casa 4 vazia — a posicao do senhor da 4a e chave para a felicidade.<br>';

        const venD16 = dPositions.find(p => p.id === 'Venus');
        if (venD16) {
            const vH = ((venD16.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♀ Vênus (karaka de conforto):</strong> ';
            html += [,'Cria seu proprio conforto','Conforto pela riqueza','Felicidade pela comunicação','Grande felicidade em casa!','Felicidade por filhos/romance','Conforto pela gestão de saúde','Felicidade pelo parceiro!','Felicidade pela transformação','Felicidade por viagens/aprendizado','Conforto pelo status social','Felicidade por amigos/rede','Felicidade pela paz espiritual'][vH] || '';
        }
        html += '</div></div>';

    } else if (division === 20) {
        // D20 Vimshamsha — 영적 practice·종교
        const d20LagnaInterp = ['Espiritualidade ativa. Karma yoga. Pratica pelo servico ativo.','Espiritualidade pela natureza e sentidos. Pratica de mantras. Meditacao no templo.','Espiritualidade intelectual. Pesquisa de escrituras. Despertar pelo conhecimento.','Espiritualidade emocional. Bhakti yoga (devocao). Atraido pela divindade maternal.','Espiritualidade real. Pratica espiritual como lider. Adoracao ao sol.','Espiritualidade de servico. Pratica pelo seva (servico). Espiritualidade de cura.','Espiritualidade de harmonia. Experiencia divina pela arte e beleza. Tantra.','Espiritualidade transformadora profunda. Tantra, Kundalini. Morte e renascimento.','Espiritualidade buscadora. Peregrinacao. Buscando um mestre. Pratica filosofica.','Espiritualidade tradicional. Pratica sistematica. Karma yoga. Pratica de paciencia.','Espiritualidade inovadora. Metodos nao convencionais. Servico a humanidade.','Espiritualidade transcendente. Meditacao, sonhos, intuicao. Experiencias misticas. Libertacao.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🙏 Espiritualidade' : '🙏 D20 Vimshamsha — Espiritualidade') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D20 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d20LagnaInterp + '<br><br>';

        const jupD20 = dPositions.find(p => p.id === 'Jupiter');
        const sunD20 = dPositions.find(p => p.id === 'Sun');
        const ketuD20 = dPositions.find(p => p.id === 'Ketu');
        const d20_9sign = (dLagnaSign + 8) % 12;
        const d20_12sign = (dLagnaSign + 11) % 12;
        const d20_9planets = dPositions.filter(p => p.dSign === d20_9sign);

        if (jupD20) {
            const jH = ((jupD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♃ Júpiter (Mestre Espiritual) → ' + jH + 'th:</strong> ') + ([,'Forte eu espiritual','Conhecimento espiritual se torna riqueza','Habilidade de comunicação espiritual','Paz interior profunda','Mérito espiritual de vidas passadas','Espiritualidade pelo serviço','Encontro com um mestre','Conhecimento espiritual secreto','Melhor posição! Grande fortuna espiritual','Autoridade espiritual','Communauté espiritual','Libertação e despertar'][jH] || '') + '<br>';
        }
        if (ketuD20) {
            const kH = ((ketuD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☋ Ketu (Libertação) → ' + kH + 'th:</strong> ') + ([,'Habilidade espiritual inata','Valores espirituais','Comunicação espiritual','Libertação interior profunda','Resultado de prática de vidas passadas','Alma de serviço','Crescimento espiritual pelo parceiro','Espiritualidade transformadora profunda','Peregrino espiritual','Carreira espiritual','Líder de comunidade espiritual','Alma perto da libertação'][kH] || '') + '<br>';
        }
        html += '<br><strong>' + (isEasy ? 'Guru/Teacher:' : 'D20 Casa 9 (guru/mestre) — ' + SIGNS[d20_9sign] + ':') + '</strong><br>';
        if (d20_9planets.length > 0) {
            d20_9planets.forEach(p => { html += isEasy ? 'Forte conexao com mestre espiritual.<br>' : '• ' + p.name + ': Forte conexao com mestre espiritual.<br>'; });
        } else html += isEasy ? 'Bom buscar ativamente um mestre espiritual.<br>' : 'Casa 9 vazia — busque ativamente um mestre espiritual.<br>';
        html += '</div></div>';

    } else if (division === 24) {
        // D24 차투르Vimshamsha — 교육·학문
        const d24LagnaInterp = ['Educacao fisica, militar, treinamento de lideranca.','Musica, arte, culinaria, educacao financeira.','Linguas, literatura, comunicacao, educacao midiatica.','Historia, psicologia, ciencias domesticas.','Ciencias politicas, teatro, educacao empresarial.','Medicina, ciencia, estatistica. Aprendizado preciso.','Direito, diplomacia, educacao em design. Aprendizado equilibrado.','Psicologia, pesquisa, investigacao, educacao oculta.','Filosofia, teologia, estudos internacionais. Estudo no exterior provavel.','Negocios, administracao, arquitetura. Aprendizado sistematico.','TI, engenharia, aviacao, ciencias sociais. Aprendizado inovador.','Arte, musica, espiritualidade, estudos cinematograficos. Aprendizado intuitivo.'][dLagnaSign];

        const d24_4sign = (dLagnaSign + 3) % 12;
        const d24_5sign = (dLagnaSign + 4) % 12;
        const d24_4planets = dPositions.filter(p => p.dSign === d24_4sign);
        const d24_5planets = dPositions.filter(p => p.dSign === d24_5sign);
        const jupD24 = dPositions.find(p => p.id === 'Jupiter');
        const merD24 = dPositions.find(p => p.id === 'Mercury');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '📚 Análise de Educação' : '📚 D24 Chaturvimshamsha — Análise de Educação') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D24 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d24LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Basic Education:' : 'D24 Casa 4 (educacao basica) — ' + SIGNS[d24_4sign] + ':') + '</strong><br>';
        if (d24_4planets.length > 0) {
            d24_4planets.forEach(p => {
                const edu4 = {Sun:'Escola prestigiosa. Educacao autoritaria',Moon:'Ambiente de aprendizado confortavel. Forte influencia da educacao domestica',Mars:'Aprendizado competitivo. Educacao fisica/tecnica forte',Mercury:'Melhor posicao! Habilidade academica excepcional',Jupiter:'Ambiente educacional rico. Bons professores',Venus:'Educacao artistica. Escola bonita',Saturn:'Ambiente educacional dificil mas conhecimento profundo se superado',Rahu:'Educacao nao convencional. Escola estrangeira',Ketu:'Menos interesse em educacao. Aprendizado intuitivo'};
                html += isEasy ? (edu4[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (edu4[p.id]||'') + '<br>';
            });
        } else html += isEasy ? 'Cresce constantemente em ambiente educacional estavel.<br>' : 'Casa 4 sem planetas.<br>';

        html += '<br><strong>' + (isEasy ? 'Higher Education:' : 'D24 Casa 5 (educacao superior) — ' + SIGNS[d24_5sign] + ':') + '</strong><br>';
        if (d24_5planets.length > 0) {
            d24_5planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Conquista excepcional em educacao superior!<br>' : 'Desafios academicos levam ao crescimento.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Conquista excepcional em educacao superior!' : 'Desafios academicos levam ao crescimento.') + '<br>';
            });
        } else html += isEasy ? 'Esforco constante traz bons resultados.<br>' : 'Casa 5 sem planetas.<br>';

        if (jupD24) {
            const jH = ((jupD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '<br>' : '<br><strong>♃ Júpiter (Sabedoria) → ' + jH + 'th:</strong> ') + ([1,4,5,9].includes(jH) ? '🎓 <strong>Alto desempenho academico esperado!</strong> Pos-graduacao/doutorado/estudo no exterior possivel.' : (isEasy ? 'Crescimento por estudos esperado.' : 'Crescimento por estudos. A bencao de Jupiter se manifesta na ' + jH + 'a area.')) + '<br>';
        }
        if (merD24) {
            const mH = ((merD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☿ Mercúrio (Aprendizado) → ' + mH + 'th:</strong> ') + ([1,4,5,9].includes(mH) ? '📖 <strong>Intelecto excepcional!</strong> Talento em matematica, linguas, analise.' : (isEasy ? 'Habilidade intelectual bem expressa.' : 'Habilidade intelectual na ' + mH + 'a area.')) + '<br>';
        }
        html += '</div></div>';

    } else if (division === 27) {
        // D27 삽타Vimshamsha — 체력·강점·약점
        const d27LagnaInterp = ['Forte resistencia e energia. Excelente habilidade atletica. Cabeca/rosto e forca.','Resistencia e paciencia sao forcas. Pescoco/cordas vocais fortes.','Agilidade e reflexos fortes. Cuidado do sistema nervoso necessario.','Resiliencia emocional e forca. Cuidar peito/estomago. Talento para natacao.','Coracao e coluna fortes. Fisico carismatico. Cuidado com excesso de trabalho.','Poder digestivo e analitico sao forcas. Cuidar intestinos/pele. Yoga adequado.','Fisico equilibrado e harmonioso. Cuidar rins/costas. Danca combina.','Recuperacao e resistencia sao forcas. Cuidar saude reprodutiva. Esportes extremos possiveis.','Coxas e figado fortes. Exercicio ao ar livre adequado. Cuidado com sobrepeso.','Ossos e articulacoes fortes. Melhor paciencia. Mais saudavel com a idade.','Cuidar sistema circulatorio e tornozelos. Prefere exercicio unico. Metodos de saude inovadores.','Imunidade e intuicao sao forcas. Cuidar pes/linfa. Exercicio aquatico adequado.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💪 Análise de Força Física' : '💪 D27 Saptavimshamsha — Análise de Força Física') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D27 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d27LagnaInterp + '<br><br>';

        const marsD27 = dPositions.find(p => p.id === 'Mars');
        const sunD27 = dPositions.find(p => p.id === 'Sun');
        const satD27 = dPositions.find(p => p.id === 'Saturn');
        if (marsD27) {
            const mH = ((marsD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♂ Marte (Energia) → ' + mH + 'th:</strong> ') + ([,'Físico e vontade fortes!','Pode ganhar por força física','Coragem e espírito aventureiro fortes','Tipo exercício em casa','Talento esportivo!','Imunidade para superar doenças','Exercício com o parceiro','Força de sobrevivência em crise','Forte em aventura/exploração','Força física para a carreira','Energia de conquista de metas','Atividade física no exterior'][mH] || '') + '<br>';
        }
        if (sunD27) {
            const sH = ((sunD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☉ Sol (Vitalidade) → ' + sH + 'th:</strong> ') + (isEasy ? 'Fonte de vitalidade: ' : 'Fonte de vitalidade na ' + sH + 'a area. ') + ([,'Energia do eu','Vitalidade de atividades de riqueza','Energia da comunicação','Estabilidade do lar','Vitalidade da criação','Energia do serviço','Vitalidade dos relacionamentos','Energia da transformação','Vitalidade das viagens','Energia da carreira','Vitalidade da sociedade','Energia da prática espiritual'][sH] || '') + '<br>';
        }

        // D27 6 house (약점/질병) 분석
        const d27_6sign = (dLagnaSign + 5) % 12;
        const d27_6planets = dPositions.filter(p => p.dSign === d27_6sign);
        html += '<br><strong>' + (isEasy ? 'Weakness:' : 'D27 Casa 6 (fraqueza) — ' + SIGNS[d27_6sign] + ':') + '</strong><br>';
        const bodyParts = ['Cabeca/Cerebro','Pescoco/Tireoide','Pulmoes/Bracos','Estomago/Peito','Coracao/Costas','Digestivo/Intestinos','Rins/Lombar','Reprodutivo','Figado/Coxas','Ossos/Articulacoes','Tornozelos/Circulatorio','Pes/Imunologico'];
        html += 'Área vulnerável: <strong>' + bodyParts[d27_6sign] + '</strong> — cuide desta área com atenção.<br>';
        if (d27_6planets.length > 0) {
            d27_6planets.forEach(p => { html += isEasy ? 'Atencao especial necessaria para esta area.<br>' : '• ' + p.name + ' na casa 6 — atencao especial necessaria.<br>'; });
        }
        html += '</div></div>';

    } else if (division === 30) {
        // D30 Trimshamsha — 불행·질병·장애
        const d30LagnaInterp = ['Acidentes, queimaduras, dores de cabeca. Problemas por decisoes apressadas. Gerenciar raiva.','Perda financeira, problemas dieteticos, tireoide. Cuidado com comer demais.','Ansiedade nervosa, insonia, problemas respiratorios. Evitar preocupacao excessiva.','Instabilidade emocional, problemas estomacais, problemas com agua. Controlar emocoes.','Problemas cardiacos, dano ao orgulho, excesso de trabalho. Precisa de humildade e descanso.','Disturbios digestivos, alergias, estresse perfeccionista. Precisa de relaxamento.','Problemas renais, conflitos de relacionamento, indecisao. Precisa de decisao.','Segredos, acidentes, cirurgia, problemas sexuais. Exames regulares importantes.','Problemas hepaticos, sobrepeso, jogo/gasto excessivo. Precisa de moderacao.','Articulacoes, ossos, depressao, solidao. Precisa de calcio e interacao social.','Pressao arterial, circulacao, acidentes inesperados. Exames de saude regulares.','Deficiencia imune, adicao, saude mental. Precisa de meditacao e sono.'][dLagnaSign];

        const d30_6sign = (dLagnaSign + 5) % 12;
        const d30_8sign = (dLagnaSign + 7) % 12;
        const d30_12sign = (dLagnaSign + 11) % 12;
        const d30_6planets = dPositions.filter(p => p.dSign === d30_6sign);
        const d30_8planets = dPositions.filter(p => p.dSign === d30_8sign);
        const d30_12planets = dPositions.filter(p => p.dSign === d30_12sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '⚠️ Detalhes de Precaução de Saúde' : '⚠️ D30 Trimshamsha — Doença') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D30 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d30LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Cuidado com doencas:' : 'D30 Casa 6 (doenca/inimigo) — ' + SIGNS[d30_6sign] + ':') + '</strong><br>';
        const diseaseBySign = ['Dor de cabeca, febre, inflamacao','Pescoco, tireoide, diabetes','Pulmoes, nervos, ansiedade','Estomago, retencao de agua','Coracao, costas, pressao arterial','Digestivo, intestinos, pele','Rins, lombar, urinario','Reprodutivo, condicoes cronicas','Figado, coxas, sobrepeso','Ossos, articulacoes, reumatismo','Circulatorio, pressao arterial, tornozelos','Imunidade, pes, saude mental'];
        html += 'Cuidado com: <strong>' + diseaseBySign[d30_6sign] + '</strong><br>';
        if (d30_6planets.length > 0) {
            const dis = {Sun:'Cuidado com doencas dos olhos e coracao',Moon:'Saude mental e problemas de retencao de agua',Mars:'Cuidado com acidentes, cirurgia, queimaduras',Mercury:'Sistema nervoso e problemas de pele',Jupiter:'Cuidado com figado e sobrepeso',Venus:'Cuidado com rim, diabetes, DST',Saturn:'Doenca cronica, problemas articulares',Rahu:'Doenca de causa desconhecida, adicao',Ketu:'Imunidade reduzida, alergia'};
            d30_6planets.forEach(p => { html += isEasy ? (dis[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (dis[p.id]||'') + '<br>'; });
        }

        html += '<br><strong>' + (isEasy ? 'Perigo/Cirurgia:' : 'D30 Casa 8 (perigo/cirurgia) — ' + SIGNS[d30_8sign] + ':') + '</strong><br>';
        if (d30_8planets.length > 0) {
            d30_8planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Precaucao de perigo/acidente. Seguro importante.' : 'Protegido em crise.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Precaucao de perigo/acidente. Seguro importante.' : 'Protegido em crise.') + '<br>'; });
        } else html += isEasy ? 'Poucos grandes perigos.<br>' : 'Casa 8 vazia — poucos grandes perigos.<br>';

        html += '<br><strong>' + (isEasy ? 'Hospitalizacao:' : 'D30 Casa 12 (hospitalizacao/perda) — ' + SIGNS[d30_12sign] + ':') + '</strong><br>';
        if (d30_12planets.length > 0) {
            d30_12planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Hospitalizacao possivel.' : 'Cura espiritual e recuperacao.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Hospitalizacao possivel. Medicina estrangeira.' : 'Cura espiritual e recuperacao.') + '<br>'; });
        } else html += isEasy ? 'Baixo risco de hospitalizacao.<br>' : 'Casa 12 vazia — risco de hospitalizacao e baixo.<br>';
        html += '</div></div>';

    } else if (division === 40) {
        // D40 Khavedamsha — 모계 유산
        const d40LagnaInterp = ['Mae independente e de vontade forte. Lideranca herdada da linhagem materna.','Mae gerencia bem a riqueza. Abundancia material da linhagem materna.','Mae intelectual com boa comunicacao. Talento linguistico/educativo herdado.','Vinculo muito profundo com a mae. Sensibilidade e intuicao herdadas.','Mae com autoridade e dignidade. Lideranca e honra herdadas.','Mae excelente em gestao de saude. Espirito analitico/de servico herdado.','Mae atraente e diplomatica. Senso artistico herdado.','Mae forte que passou por transformacao. Resiliencia herdada.','Mae educativa e religiosa. Sabedoria/filosofia herdada.','Mae responsavel e estrita. Paciencia e disciplina herdadas.','Mae unica e progressista. Pensamento inovador herdado.','Mae espiritual e intuitiva. Arte/espiritualidade herdada.'][dLagnaSign];

        const d40_4sign = (dLagnaSign + 3) % 12;
        const d40_4planets = dPositions.filter(p => p.dSign === d40_4sign);
        const moonD40 = dPositions.find(p => p.id === 'Moon');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👩 Herança Materna' : '👩 D40 Khavedamsha — Herança Materna') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D40 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d40LagnaInterp + '<br><br>';

        if (moonD40) {
            const mH = ((moonD40.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☽ Lua (karaka da mae):</strong> ';
            html += [,'Mae tem forte influencia','Riqueza da mae','Boa comunicacao com a mae','Vinculo profundo com a mae! Melhor posicao','Mae e criativa','Mae e orientada ao servico','Mae influencia relacionamentos','Heranca da mae','Mae e religiosa/educativa','Mae tem status social','Mae e independente','Mae e espiritual'][mH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Maternal family:' : 'D40 Casa 4 (lar materno) — ' + SIGNS[d40_4sign] + ':') + '</strong><br>';
        if (d40_4planets.length > 0) {
            d40_4planets.forEach(p => { html += isEasy ? 'Energia fortemente herdada do lado materno.<br>' : '• ' + p.name + ': A energia deste planeta e fortemente herdada do lado materno.<br>'; });
        } else html += isEasy ? 'Heranca estavel do lado materno.<br>' : 'Casa 4 vazia — a posicao do senhor da 4a e chave para a heranca materna.<br>';
        html += '</div></div>';

    } else if (division === 45) {
        // D45 Akshavedamsha — 부계 유산
        const d45LagnaInterp = ['Pai ativo e orientado a acao. Coragem e lideranca herdados.','Pai financeiramente estavel. Valores materiais herdados.','Pai intelectual e versatil. Habilidade de comunicacao/negocios herdada.','Pai emocional e orientado a familia. Instinto de cuidado herdado.','Pai autoritario e respeitado. Lideranca herdada.','Pai pratico e diligente. Habilidades analiticas/tecnicas herdadas.','Pai diplomatico e refinado. Habilidade social herdada.','Pai forte e misterioso. Resiliencia/perspicacia herdada.','Pai academico e religioso. Filosofia/moral herdada.','Pai estrito e ambicioso. Paciencia/disciplina herdada.','Pai criativo e inovador. Pensamento tecnologico/cientifico herdado.','Pai espiritual e artistico. Intuicao/criatividade herdada.'][dLagnaSign];

        const d45_9sign = (dLagnaSign + 8) % 12;
        const d45_9planets = dPositions.filter(p => p.dSign === d45_9sign);
        const sunD45 = dPositions.find(p => p.id === 'Sun');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨 Herança Paterna' : '👨 D45 Akshavedamsha — Herança Paterna') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D45 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d45LagnaInterp + '<br><br>';

        if (sunD45) {
            const sH = ((sunD45.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☉ Sol (karaka do pai):</strong> ';
            html += [,'Pai tem forte influencia','Riqueza do pai','Boa comunicacao com o pai','Pai e orientado a familia','Pai e criativo','Pai e orientado ao servico','Pai influencia relacionamentos','Heranca do pai','Pai e religioso/educativo','Pai tem sucesso na sociedade! Melhor posicao','Pai e independente','Pai e espiritual'][sH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Paternal family:' : 'D45 Casa 9 (lar paterno/pai) — ' + SIGNS[d45_9sign] + ':') + '</strong><br>';
        if (d45_9planets.length > 0) {
            d45_9planets.forEach(p => { html += isEasy ? 'Energia fortemente herdada do lado paterno.<br>' : '• ' + p.name + ': A energia deste planeta e fortemente herdada do lado paterno.<br>'; });
        } else html += isEasy ? 'Heranca estavel do lado paterno.<br>' : 'Casa 9 vazia — a posicao do senhor da 9a e chave para a heranca paterna.<br>';
        html += '</div></div>';
    }

    interpEl.innerHTML = html;
}

