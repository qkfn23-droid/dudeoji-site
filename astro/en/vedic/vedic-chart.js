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
        catGuide: e ? 'Glossary' : 'Vedic Astrology Beginner\'s Guide',
        catBasic: e ? 'My Planet Positions' : 'Basic Chart — Planet Positions & Birth Chart',
        catDasha: e ? 'My Life Periods' : 'Dasha — Life Period Analysis',
        catInterp: e ? 'My Reading — Personality·Wealth·Career·Health' : 'Interpretation — Personality·Wealth·Career·Health·Yoga',
        catMarriage: e ? 'My Spouse Details' : 'Marriage & Spouse — D9 Navamsha',
        catCareer: e ? 'My Career·Wealth Details' : 'Career & Wealth — D10·D2·D4',
        catFamily: e ? 'My Family' : 'Family — D7·D3·D12·D40·D45',
        catSpirit: e ? 'Spirituality·Education·Health' : 'Spirituality·Education·Health — D20·D24·D27·D16',
        catWarn: e ? 'Health Cautions' : 'Cautions — D30 Disease·Foreign',
        catKarma: e ? 'Past Life Karma' : 'Karma — D60 Past Life·Karma'
    };
    for (var id in ids) { var el = document.getElementById(id); if (el) el.textContent = ids[id]; }

    var secs = {
        secPlanetHouse: e ? 'How Each Planet Affects You' : 'Planet-in-House Analysis',
        secDignity: e ? 'Your Strengths & Weaknesses' : 'Planetary Dignity (Exaltation·Debilitation·Own Sign)',
        secLucky: e ? 'Lucky Info' : 'Lucky Information',
        secRemedy: e ? 'Ways to Boost Your Luck' : 'Remedies & Strengthening',
        secD10: e ? 'Career Details' : 'D10 Dashamsha (Career)',
        secD2: e ? 'Wealth Details' : 'D2 Hora (Wealth)',
        secD4: e ? 'Property & Real Estate' : 'D4 Chaturthamsha (Property)',
        secD7: e ? 'Children' : 'D7 Saptamsha (Children)',
        secD3: e ? 'Siblings & Courage' : 'D3 Drekkana (Siblings)',
        secD12: e ? 'Parents' : 'D12 Dwadashamsha (Parents)',
        secD40: e ? 'Maternal Heritage' : 'D40 Khavedamsha (Maternal)',
        secD45: e ? 'Paternal Heritage' : 'D45 Akshavedamsha (Paternal)',
        secD24: e ? 'Education' : 'D24 Chaturvimshamsha (Education)',
        secD20: e ? 'Spirituality' : 'D20 Vimshamsha (Spirituality)',
        secD27: e ? 'Physical Strength' : 'D27 Saptavimshamsha (Strength)',
        secD16: e ? 'Vehicles & Comfort' : 'D16 Shodashamsha (Vehicles)',
        secD30: e ? 'Health Caution Details' : 'D30 Trimshamsha (Disease)',
        secForeign: e ? 'Foreign & Immigration' : 'Foreign & Immigration (9th·12th House)'
    };
    for (var sid in secs) { var sel = document.getElementById(sid); if (sel) sel.textContent = secs[sid]; }
}
function renderEasyMode(positions, lagnaSign, moonPos) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    var html = '';
    // Personality
    var personality = ['Action-oriented! Quick decisions with leadership qualities. Loves new challenges.','Loves stability. Enjoys comfort and beauty. Once decided, sees it through.','Endlessly curious! Great communicator and multi-talented.','Warm and emotional. Treasures family and reads people well.','Born leader! Great presence with creative talent.','Detail-oriented and analytical. Seeks perfection and cares about health.','Seeks harmony. Refined, charming, with excellent artistic sense.','Has depth. Strong intuition that sees through to the truth.','Free spirit! Loves travel and learning, very positive.','Ambitious. Patient and more attractive with age.','Unique. Thinks differently from everyone else, innovative.','Deeply sensitive. Strong intuition drawn to art and spirituality.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">👤 My Personality</div><div class="interp-text">' + personality + '</div></div>';

    // Emotions
    if (moonPos) {
        var emotion = ['A fiery passion burns inside you. Emotions rise fast and cool fast. When stressed, you need to move your body. Exercise and outdoor activities work best.','Emotionally very stable. Dislikes sudden changes, finds security in the familiar. Good food, music, and nature heal your soul.','Processes emotions rationally. Talking helps organize feelings. Curious about many things at once and cannot stand boredom.','Extremely sensitive. Absorbs others emotions like a sponge. Home is your safe space with strong bond with mother.','Dramatic and passionate emotional expression. Deeply needs love and recognition. Creative activities are your emotional medicine.','Tends to analyze and organize emotions. Worries a lot but excellent at practical solutions. Daily routines bring emotional stability.','Finds emotional balance in relationships. Feels lonely alone, stabilizes with partner or close friends. Art and beauty bring peace.','Emotions are as deep and intense as the ocean. Loves deeply and never forgets betrayal. Incredibly strong intuition.','Emotionally bright and optimistic. Loves freedom and hates constraints. Travel is the best emotional remedy.','Does not show emotions easily. Strong sense of responsibility. Grows more emotionally open with age.','Unique, unpredictable emotional patterns. Loves in unconventional ways. Finds emotional fulfillment in social causes.','Extremely intuitive and spiritual. Dreams are vivid and sometimes prophetic. Art, meditation, and water bring peace.'][moonPos.sign];
        html += '<div class="interp-card"><div class="interp-title">🌙 My Emotional Style</div><div class="interp-text">' + emotion + '</div></div>';
    }

    // Wealth
    var wealth = ['Self-made type. Aggressive investment style, better suited for self-employment or freelance. Can earn fast early but watch hasty investments.','Steadily accumulates wealth. Income likely from real estate, art, food. Balance spending is key. Saving habits are your greatest weapon.','Earns through intellectual abilities. Income from writing, education, IT, marketing. Multiple income streams suit you well.','Wealth tends to come through home and family. May inherit from mother or earn through real estate/food. Watch emotional spending.','Earns through leadership and authority. Wealth follows higher positions. Connected to government and gold. Your dignity attracts wealth.','Earns through analysis and professional skills. Stable income from medical, accounting, service fields. Frugal manager style.','Earns through partnerships. Better fortune with others. Income from law, diplomacy, fashion, art. Spouse may bring wealth.','Accumulates through others\' resources — inheritance, insurance, investments. Joint investments connected. Can protect wealth in crisis.','Fortune follows your wealth. Income from education, foreign, philosophy. Unexpected luck brings wealth. Positive mindset attracts fortune.','Accumulates slowly but surely. Financial difficulties early but steady wealth after middle age. Patience is the best investment strategy.','Earns through technology, innovation, social networks. Unconventional income methods. IT, science, social movements connected.','Earns through art or spiritual activities. Foreign wealth connections. Interested in charity. Spiritual richness paradoxically attracts wealth.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">💰 My Wealth</div><div class="interp-text">' + wealth + '</div></div>';

    // Spouse
    var spouse = ['Your spouse is energetic and independent. Active and direct, passionate about their work. Not the type to quietly follow — a partner who challenges together. May be somewhat impatient, but the relationship will be equally passionate.','Your spouse is beautiful and sensual. Enjoys the finer things, stable and loyal. May have talent in cooking or art. Comfortable to be around. Likely materially stable.','Your spouse is eloquent and witty. Great conversation is the biggest charm, with excellent humor. An intellectual, versatile partner you can share many interests with.','Your spouse is warm and family-oriented. Excellent caregiving abilities. Being together feels like home. Desires deep emotional bonds and treasures family above all.','Your spouse is charismatic and dignified. May hold a socially prominent position. High self-esteem but equally generous. Being together makes you feel special.','Your spouse is meticulous and practical. Interested in health and wellness. A caring type who pays attention to details. May be perfectionist but reliable.','Your spouse is charming and refined. Diplomatic with good sense of balance, excellent artistic taste. Being together makes the world more beautiful.','Your spouse is intense and mysterious. Deep emotions — once committed, goes all the way. May have many secrets but desires deep connection. A fated, intense attraction.','Your spouse is free-spirited and optimistic. May be from a different culture or connected to foreign lands. Philosophical and adventurous. Wants freedom even after marriage.','Your spouse is serious and ambitious. Strong sense of responsibility, likely socially successful. May have age difference. Marriage may come late but lasts long.','Your spouse is unique and independent. May meet through unconventional ways. Intellectual with innovative thinking. Prefers a free-form, friend-like relationship.','Your spouse is spiritual and intuitive. Connected to an artist or spiritual practitioner. Gives a dreamy, romantic feeling. May need to adjust realistic expectations.'][(lagnaSign+6)%12];
    // 7 house 행성 추가 정보
    var h7p = positions.filter(function(p){return houseOf(p.sign)===7;});
    var spouseExtra = '';
    h7p.forEach(function(p) {
        var desc = {Sun:'A spouse with high social status.',Moon:'An emotional and caring spouse.',Mars:'Passionate but arguments possible. Strong spouse.',Mercury:'An intellectual spouse with great conversation.',Jupiter:'A wise and moral spouse! Best marriage fortune.',Venus:'A very attractive and loving spouse.',Saturn:'Late marriage but lasting relationship. Age difference possible.',Rahu:'Unconventional marriage. Foreign spouse possible.',Ketu:'Past-life connection. A spouse with strong spiritual bond.'};
        if (desc[p.id]) spouseExtra += '<br>✦ ' + desc[p.id];
    });
    html += '<div class="interp-card"><div class="interp-title">💍 My Spouse</div><div class="interp-text">' + spouse + spouseExtra + '</div></div>';

    // Career
    var career = ['Leadership careers. Military, police, sports, surgery, business management. Self-employment suits well.','Finance, food, real estate, fashion, art. Excels in sensual, stable environments. Natural talent with money.','Communication and intellectual careers. Media, writing, education, IT, marketing. Changes the world with words.','Caring professions. Medical, nursing, hospitality, cooking, counseling. Excels in emotionally connected work.','Stage careers. Politics, entertainment, management, government. Creative, authoritative positions are your calling.','Analysis and precision careers. Medical, accounting, consulting, health management. Detail observation is your strength.','Harmony and beauty careers. Law, diplomacy, fashion, interior, counseling. Talent in connecting people.','Deep investigation careers. Research, insurance, medicine, psychology, tax. Talent in handling secrets.','Learning and exploration careers. Education, law, religion, publishing, travel. Deep foreign connections.','System and organization careers. Management, civil service, architecture. Slow but certain success. High social position.','Innovation and technology careers. IT, science, aviation, social work. Changes the world in ways nobody thought of.','Art and spirituality careers. Art, film, music, medical, foreign, NGO. Finds meaning in healing the world.'][(lagnaSign+9)%12];
    html += '<div class="interp-card"><div class="interp-title">💼 My Career</div><div class="interp-text">' + career + '</div></div>';

    // Health
    var health = ['Head and face are weak points. Headaches and fevers common. Exercise regularly and stay hydrated. Watch for accidents.','Neck and thyroid are weak. Tendency to overeat — watch weight and diabetes. Good food in moderation. Nature walks are best.','Lungs, arms, shoulders, nervous system. Anxiety and sleep issues possible. Breathing meditation helps. Maintain sleep routine.','Stomach and chest areas. Emotional stress directly affects digestion. Warm food and tea help. Time near water heals.','Heart, back, spine. Watch for overwork. Cardio exercise regularly. Rest enough. Managing pride reduces stress.','Digestive system, intestines, skin. Indigestion and allergies possible. Diet is crucial. Yoga and meditation help.','Kidneys, lower back, skin. Stay hydrated and balanced. Reduce sugar. Skin reflects stress — inner peace equals skin health.','Reproductive and excretory systems. Chronic conditions possible. Regular checkups important. Deep breathing and meditation help.','Liver, thighs, hips. Watch weight. Outdoor activities best. Reduce sitting time. Foreign travel heals body and mind.','Bones, joints, knees, skin. Watch rheumatism. Calcium and vitamin D important. Stretching becomes more attractive with age.','Ankles, calves, circulatory system. Blood pressure management important. Walk regularly. Get checked for unusual symptoms.','Feet, lymphatic, immune system. Adequate sleep is your most powerful health secret. Water, meditation, yoga boost immunity. Sensitive to alcohol.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">🏥 My Health</div><div class="interp-text">' + health + '</div></div>';

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
                    var dashaDesc = {Ketu:'A period of spiritual growth. Focus on inner self over material things.',Venus:'A time of love and abundance! Romance, marriage, and art flourish.',Sun:'A time of self-discovery and leadership. Confidence grows strong.',Moon:'A time of emotions and home. Family relationships become important.',Mars:'A time of action and energy. Great for starting new things.',Rahu:'A time of change and innovation. Unexpected opportunities arise.',Jupiter:'A time of luck and growth! Many good things in education, marriage, promotion.',Saturn:'A time of patience and trials. Slow but certain growth.',Mercury:'A time of intellectual activity. Favorable for study, business, communication.'};
                    html += '<div class="interp-card"><div class="interp-title">⏳ My Current Period</div><div class="interp-text">Current period: <strong style="color:#c9a84c;">' + DASHA_KO[planet] + '</strong> period.<br><br>' + (dashaDesc[planet]||'') + '</div></div>';
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
const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
               'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGNS_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

// Planets
const PLANETS = [
    { id: 'Sun', name: 'Sun', symbol: '☉', natural: 'malefic' },
    { id: 'Moon', name: 'Moon', symbol: '☽', natural: 'benefic' },
    { id: 'Mars', name: 'Mars', symbol: '♂', natural: 'malefic' },
    { id: 'Mercury', name: 'Mercury', symbol: '☿', natural: 'neutral' },
    { id: 'Jupiter', name: 'Jupiter', symbol: '♃', natural: 'benefic' },
    { id: 'Venus', name: 'Venus', symbol: '♀', natural: 'benefic' },
    { id: 'Saturn', name: 'Saturn', symbol: '♄', natural: 'malefic' },
];

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', ko: 'Ashwini', ruler: 'Ketu', meaning: 'Horse Twins', deity: 'Ashwini Kumaras', desc: 'Energy of healing and new beginnings. A person with quick action and healing abilities.' },
    { name: 'Bharani', ko: 'Bharani', ruler: 'Venus', meaning: 'The Bearer', deity: 'Yama', desc: 'The cycle of life and death. Strong patience and the power to lead change.' },
    { name: 'Krittika', ko: 'Krittika', ruler: 'Sun', meaning: 'The Cutter', deity: 'Agni', desc: 'The power of fire and purification. Sharp intellect and decisiveness.' },
    { name: 'Rohini', ko: 'Rohini', ruler: 'Moon', meaning: 'The Red Star', deity: 'Brahma', desc: 'The star of abundance and beauty. A creative and charming personality.' },
    { name: 'Mrigashira', ko: 'Mrigashira', ruler: 'Mars', meaning: 'Deer\'s Head', deity: 'Soma', desc: 'The star of exploration and curiosity. A tireless traveler seeking truth.' },
    { name: 'Ardra', ko: 'Ardra', ruler: 'Rahu', meaning: 'Teardrop', deity: 'Rudra', desc: 'Rebirth through storm and destruction. Intense emotions and transformative power.' },
    { name: 'Punarvasu', ko: 'Punarvasu', ruler: 'Jupiter', meaning: 'Return of Light', deity: 'Aditi', desc: 'The star of recovery and return. An optimistic and wise personality.' },
    { name: 'Pushya', ko: 'Pushya', ruler: 'Saturn', meaning: 'The Nourisher', deity: 'Brihaspati', desc: 'The most auspicious nakshatra. Energy of nurturing, protection, and prosperity.' },
    { name: 'Ashlesha', ko: 'Ashlesha', ruler: 'Mercury', meaning: 'The Entwiner', deity: 'Nagas', desc: 'Serpent wisdom and mystery. Insight and deep intuition.' },
    { name: 'Magha', ko: 'Magha', ruler: 'Ketu', meaning: 'The Great', deity: 'Pitris', desc: 'The star of royalty. Authority, respect, and ancestral blessings.' },
    { name: 'Purva Phalguni', ko: 'Purva Phalguni', ruler: 'Venus', meaning: 'Former Fruit', deity: 'Bhaga', desc: 'The star of joy and love. Artistic sense and romance.' },
    { name: 'Uttara Phalguni', ko: 'Uttara Phalguni', ruler: 'Sun', meaning: 'Latter Fruit', deity: 'Aryaman', desc: 'The star of friendship and contracts. Trust and devotion.' },
    { name: 'Hasta', ko: 'Hasta', ruler: 'Moon', meaning: 'The Hand', deity: 'Savitar', desc: 'The star of craftsmanship and skill. Healing hands, the artist.' },
    { name: 'Chitra', ko: 'Chitra', ruler: 'Mars', meaning: 'Shining Jewel', deity: 'Vishwakarma', desc: 'The star of beauty and creation. Exceptional aesthetic sense.' },
    { name: 'Swati', ko: 'Swati', ruler: 'Rahu', meaning: 'The Independent', deity: 'Vayu', desc: 'The freedom of wind. An independent and flexible personality.' },
    { name: 'Vishakha', ko: 'Vishakha', ruler: 'Jupiter', meaning: 'The Forked', deity: 'Indra-Agni', desc: 'The star of goals and determination. Strong focus and willpower.' },
    { name: 'Anuradha', ko: 'Anuradha', ruler: 'Saturn', meaning: 'Following Radha', deity: 'Mitra', desc: 'The star of friendship and devotion. Organizational skills and leadership.' },
    { name: 'Jyeshtha', ko: 'Jyeshtha', ruler: 'Mercury', meaning: 'The Eldest', deity: 'Indra', desc: 'The star of protection and authority. Strong sense of responsibility.' },
    { name: 'Mula', ko: 'Mula', ruler: 'Ketu', meaning: 'The Root', deity: 'Nirriti', desc: 'The star of destruction and rebuilding. One who seeks the root of truth.' },
    { name: 'Purva Ashadha', ko: 'Purva Ashadha', ruler: 'Venus', meaning: 'Former Invincible', deity: 'Apas', desc: 'The power of water and purification. Hidden victorious energy.' },
    { name: 'Uttara Ashadha', ko: 'Uttara Ashadha', ruler: 'Sun', meaning: 'Latter Invincible', deity: 'Vishvedevas', desc: 'The star of ultimate victory. Patience and leadership.' },
    { name: 'Shravana', ko: 'Shravana', ruler: 'Moon', meaning: 'The Listener', deity: 'Vishnu', desc: 'The star of knowledge and listening. A master of learning and communication.' },
    { name: 'Dhanishta', ko: 'Dhanishta', ruler: 'Mars', meaning: 'The Wealthiest', deity: 'Vasus', desc: 'The star of abundance and music. Talent and prosperity.' },
    { name: 'Shatabhisha', ko: 'Shatabhisha', ruler: 'Rahu', meaning: 'Hundred Healers', deity: 'Varuna', desc: 'The star of secrets and healing. Mysterious healing abilities.' },
    { name: 'Purva Bhadrapada', ko: 'Purva Bhadrapada', ruler: 'Jupiter', meaning: 'Former Lucky Feet', deity: 'Aja Ekapada', desc: 'The star of fire and transformation. Spiritual awakening.' },
    { name: 'Uttara Bhadrapada', ko: 'Uttara Bhadrapada', ruler: 'Saturn', meaning: 'Latter Lucky Feet', deity: 'Ahir Budhnya', desc: 'Wisdom of the deep ocean. Meditation and spiritual depth.' },
    { name: 'Revati', ko: 'Revati', ruler: 'Mercury', meaning: 'The Wealthy', deity: 'Pushan', desc: 'The star of travel and protection. The completion of all things.' },
];

// Dasha periods (years)
const DASHA_YEARS = {
    'Ketu': 7, 'Venus': 20, 'Sun': 6, 'Moon': 10, 'Mars': 7,
    'Rahu': 18, 'Jupiter': 16, 'Saturn': 19, 'Mercury': 17
};
const DASHA_ORDER = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const DASHA_KO = {
    'Ketu': 'Ketu', 'Venus': 'Venus', 'Sun': 'Sun', 'Moon': 'Moon', 'Mars': 'Mars',
    'Rahu': 'Rahu', 'Jupiter': 'Jupiter', 'Saturn': 'Saturn', 'Mercury': 'Mercury'
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
    html += '<th>Planet</th><th>Sign</th><th>Degree</th><th>Nakshatra</th><th>House</th>';
    html += '</tr></thead><tbody>';

    // Add Lagna first with exact degree
    const lagnaDeg = lagnaSidereal % 30;
    const lagnaNakIdx = Math.floor(lagnaSidereal / (360/27));
    const lagnaNak = NAKSHATRAS[lagnaNakIdx] || {ko:'-'};
    html += `<tr><td>⬆ Lagna (Ascendant)</td><td>${SIGN_SYMBOLS[lagnaSign]} ${SIGNS[lagnaSign]}</td><td>${lagnaDeg.toFixed(1)}°</td><td>${lagnaNak.ko}</td><td>1</td></tr>`;

    positions.forEach(p => {
        const house = ((p.sign - lagnaSign + 12) % 12) + 1;
        const nak = NAKSHATRAS[p.nakshatra] || { ko: '-', name: '-' };
        const roleMap = { Sun:'Self/Authority', Moon:'Emotions/Mind', Mars:'Energy/Courage', Mercury:'Intelligence/Communication', Jupiter:'Luck/Wisdom', Venus:'Love/Charm', Saturn:'Patience/Responsibility', Rahu:'Desire/Innovation', Ketu:'Spirituality/Liberation' };
        const houseArea = ['','Self','Money·Family','Communication','Home','Children·Romance','Health','Spouse','Transformation','Fortune·Foreign','Career','Income','Spirituality'];
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
        'Leadership, military, sports, entrepreneurship (fire pioneer)',
        'Finance, agriculture, arts, real estate, food (stability & material)',
        'Communication, media, writing, teaching, marketing (intellectual)',
        'Nursing, caregiving, cooking, hospitality, counseling (emotional care)',
        'Politics, entertainment, leadership, creativity (shining stage)',
        'Medicine, accounting, analysis, editing, health/wellness (precise service)',
        'Law, diplomacy, design, fashion, mediation (balance & beauty)',
        'Research, investigation, medicine, occult, psychology (depth & transformation)',
        'Education, travel, philosophy, religion, publishing (expansion & exploration)',
        'Government, construction, management, CEO, organizational leader (system & authority)',
        'Technology, IT, invention, social activism, science (innovation)',
        'Arts, spirituality, healing, music, charity (transcendence & service)'
    ];

    // 행성별 spouse career 경향
    const planetCareer = {
        Sun: 'Government official, politician, doctor, CEO — authoritative positions',
        Moon: 'Nurse, counselor, chef, hospitality — caregiving/emotional roles',
        Mars: 'Military, police, surgeon, engineer, athlete',
        Mercury: 'Writer, teacher, programmer, accountant, merchant',
        Jupiter: 'Professor, judge, religious leader, consultant, senior professional',
        Venus: 'Designer, actor, musician, fashion, beauty industry',
        Saturn: 'Construction, mining, agriculture, management, craftsman',
        Rahu: 'IT, foreign-related, unconventional careers, research',
        Ketu: 'Spirituality, alternative medicine, research, ascetic'
    };

    let html = '';

    // 1. D9 Lagna 분석 (결혼 후 본인)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🕉️ You After Marriage' : '🕉️ D9 Lagna — You After Marriage: ' + SIGNS[d9LagnaSign] + ' ' + SIGN_SYMBOLS[d9LagnaSign]}</div>
        <div class="interp-text">
            ${isEasy ? 'This reveals your true self after marriage and in the second half of life (after 30s).' : 'Navamsa Lagna is in <strong>' + SIGNS[d9LagnaSign] + '</strong>. This reveals your true self after marriage and in the second half of life (after 30s).'}
            ${d9LagnaSign === d1LagnaSign ? (isEasy ? '<br><br><strong>Special sign!</strong> Your essence remains unchanged after marriage — inner and outer self are aligned.' : '<br><br><strong>D1 and D9 Lagna in same sign!</strong> Called <strong>Vargottama</strong> — very powerful. Your essence remains unchanged after marriage.') : ''}
            ${d9H1Planets.length > 0 ? '<br><br>' + (isEasy ? 'There are energies that strongly influence your personality after marriage.' : '<strong>Planets in D9 1st:</strong> ' + d9H1Planets.map(p => p.symbol + ' ' + p.name).join(', ') + ' — strongly influence your personality after marriage.') : ''}
        </div>
    </div>`;

    // 2. D9 7 house (spouse)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 Spouse Character' : '💍 D9 7th House — Spouse Character: ' + SIGNS[d9H7Sign] + ' ' + SIGN_SYMBOLS[d9H7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'unique charm') + ' quality partner.' : 'Navamsa 7th house is in <strong>' + SIGNS[d9H7Sign] + '</strong>, ruled by <strong>' + RULER_NAMES[d9H7Ruler] + '</strong>.<br><br>This reveals your spouse\'s core personality. ' + SIGNS[d9H7Sign] + ' energy partner — ' + ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || 'unique charm') + ' qualities.'}
            ${d9H7Planets.length > 0 ? '<br><br>' + (isEasy ? d9H7Planets.map(p => p.natural === 'benefic' ? 'Positive energy! You receive blessings from your spouse.' : 'Challenge energy — also opportunities for growth in marriage.').join('<br>') : '<strong>Planets in D9 7th:</strong><br>' + d9H7Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${p.natural === 'benefic' ? 'Benefic! Blessings from your spouse.' : 'Challenge energy — also opportunities for growth in marriage.'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 3. D9 10 house (본인의 Dharma/사명)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 Life Purpose' : '💼 D9 10th House — Life Purpose (Dharma): ' + SIGNS[d9H10Sign] + ' ' + SIGN_SYMBOLS[d9H10Sign]}</div>
        <div class="interp-text">
            ${isEasy ? 'The true calling you pursue after maturity.' : 'Navamsa 10th house is in <strong>' + SIGNS[d9H10Sign] + '</strong>, ruled by <strong>' + RULER_NAMES[d9H10Ruler] + '</strong>.<br><br>While D1\'s 10th shows your career, D9\'s 10th reveals your <strong>greater life purpose (Dharma)</strong>.'}<br><br>
            <strong>Direction of purpose:</strong> ${careerBySgn[d9H10Sign]}
            ${d9H10Planets.length > 0 ? '<br><br>' + (isEasy ? d9H10Planets.map(p => planetCareer[p.id] || 'unique career energy').join('<br>') : '<strong>Planets in D9 10th:</strong><br>' + d9H10Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${planetCareer[p.id] || 'unique career energy'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 4. spouse의 career (파생하우스: D9 4 house = 7 house서 10번째)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👔 Spouse Career' : '👔 Spouse Career — Derived 10th (D9 4th): ' + SIGNS[d9H4Sign] + ' ' + SIGN_SYMBOLS[d9H4Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '<strong>Derived house:</strong> 10th from 7th (spouse) = D9 4th house shows spouse career.<br><br>D9 4th is in <strong>' + SIGNS[d9H4Sign] + '</strong>, ruled by <strong>' + RULER_NAMES[d9H4Ruler] + '</strong>.<br><br>'}
            <strong>Spouse career tendency:</strong> ${careerBySgn[d9H4Sign]}
            ${d9H4Planets.length > 0 ? '<br><br>' + (isEasy ? d9H4Planets.map(p => `Spouse likely works in ${planetCareer[p.id] || 'specialized field'}`).join('<br>') : '<strong>Planets in D9 4th (spouse 10th):</strong><br>' + d9H4Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: Spouse likely works in ${planetCareer[p.id] || 'specialized field'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 5. 바르고타마 행성 체크
    const vargottamaPlanets = d9Positions.filter(p => p.sign === p.d9Sign);
    if (vargottamaPlanets.length > 0) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '⭐ Exceptionally Strong Planets' : '⭐ Vargottama Planets — Exceptionally Strong'}</div>
            <div class="interp-text">
                ${isEasy ? 'These planets are exceptionally powerful and act consistently throughout life.' : 'Planets in the same sign in both D1 and D9 are called <strong>Vargottama</strong>. Very powerful, acting consistently throughout life.'}<br><br>
                ${isEasy ? 'Exceptionally strong energy acts consistently throughout your life!' : vargottamaPlanets.map(p => `<strong>${p.symbol} ${p.name}</strong>: In both D1 and D9 ${SIGNS[p.sign]} — this planet's energy is exceptionally strong!`).join('<br>')}
            </div>
        </div>`;
    }

    // 6. spouse 방향 분석 (UL + A7 + D1 7 house + D9 7 house 종합)
    const DIRECTIONS = {
        0:'East', 1:'South', 2:'West', 3:'North',
        4:'East', 5:'South', 6:'West', 7:'North',
        8:'East', 9:'South', 10:'West', 11:'North'
    };
    const DIR_DETAIL = {
        0:'East (Aries — fire)',1:'South (Taurus — earth)',2:'West (Gemini — air)',3:'North (Cancer — water)',
        4:'East (Leo — fire)',5:'South (Virgo — earth)',6:'West (Libra — air)',7:'North (Scorpio — water)',
        8:'East (Sagittarius — fire)',9:'South (Capricorn — earth)',10:'West (Aquarius — air)',11:'North (Pisces — water)'
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
        {name:'D1 7th', sign: d1H7Sign, desc:'Spouse house in birth chart'},
        {name:'D9 7th', sign: d9H7Sign, desc:'Spouse house in Navamsa'},
        {name:'D9 7th Lord', sign: d9H7RulerSign, desc:'Where D9 7th lord goes'},
        {name:'D9 Venus', sign: venusD9Sign, desc:'Spouse karaka in Navamsa'},
        {name:'Upapada (UL)', sign: ulSign, desc:'12th Arudha — spouse background'},
        {name:'Darapada (A7)', sign: a7Sign, desc:'7th Arudha — spouse social image'}
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
        <div class="interp-title">${isEasy ? '🧭 Where Your Spouse Comes From' : '🧭 Spouse Direction — 6-Indicator Analysis'}</div>
        <div class="interp-text">
            ${isEasy ? 'Analysis of which direction your spouse may come from.' : 'Vedic astrology determines spouse direction by combining multiple indicators.'}<br><br>
            ${isEasy ? '' : '<strong>6 Indicators:</strong><br>' + dirSources.map(s => `• <strong>${s.name}</strong>: ${SIGNS[s.sign]} ${SIGN_SYMBOLS[s.sign]} → <strong>${DIRECTIONS[s.sign]}</strong> <span style="color:#666;font-size:12px;">(${s.desc})</span>`).join('<br>') + '<br><br><strong>🧿 Upapada Lagna (UL):</strong> 12th house Arudha Pada. Indicates spouse\'s family/background and marriage environment. → <strong>' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign] + '</strong><br><strong>🎯 Darapada (A7):</strong> 7th house Arudha Pada. Indicates spouse\'s social image and outer impression. → <strong>' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign] + '</strong><br><strong>💍 D9 7th lord (' + RULER_NAMES[d9H7Ruler] + '):</strong> The sign where Navamsa 7th house ruler goes indicates spouse\'s actual direction. → <strong>' + SIGNS[d9H7RulerSign] + ' ' + SIGN_SYMBOLS[d9H7RulerSign] + '</strong><br><strong>♀ D9 Venus:</strong> Natural significator of spouse. Venus\'s Navamsa position shows the source of spouse energy. → <strong>' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign] + '</strong><br><br>'}
            <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;margin-top:10px;">
                <strong style="font-size:16px;">🧭 Conclusion: ${agreement >= 4 ? 'Overwhelmingly strong' : agreement >= 3 ? 'Very strong' : agreement >= 2 ? 'Strong' : ''} ${primaryDir} direction</strong><br><br>
                Out of 6 indicators <strong>${agreement}</strong> point to <strong>${primaryDir}</strong> point to this direction.
                ${agreement >= 4 ? '<br>4+ indicators agree! <strong>Very high probability</strong>of ' + primaryDir + ' direction. Pay attention to cities, workplaces, or travels in this direction.' : ''}
                ${agreement === 3 ? '<br>3 indicators — <strong>High probability</strong>of ' + primaryDir + ' direction.' : ''}
                ${agreement === 2 ? '<br>2 indicators — ' + primaryDir + ' favored but other possibilities exist.' : ''}
                ${agreement <= 1 ? '<br>Indicators spread — spouse may come from various directions. Keep an open mind.' : ''}
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
        "Active places, sports, competitive environments, leadership gatherings. Intense and sudden first meeting.",
        "Workplace, financial institutions, restaurants, nature. Slowly building trust.",
        "SNS, school, seminars, while traveling, blind dates. Relationship starts with conversation.",
        "Family introductions, neighborhood gatherings, childhood friends. Starts in comfortable settings.",
        "Parties, concerts, creative gatherings, glamorous venues. Dramatic first encounter.",
        "Workplace, hospital, health-related, volunteer activities. Meeting starts from practical needs.",
        "Blind dates, matchmaking, legal/diplomatic events, art exhibitions. Elegant and refined meeting.",
        "Crisis situations, deep conversations, secret places, research labs. Fated and intense attraction.",
        "Abroad, university, religious/philosophical gatherings, while traveling. Connection from far away. May be different culture.",
        "Workplace, business events, official functions. Meeting related to social status.",
        "Online, hobby clubs, social movements, friend of a friend. Unique and unconventional meeting.",
        "Spiritual gatherings, abroad, arts/music, hospital, hints in dreams. Mystical and fated meeting."
    ];

    const backgroundBySgn = [
        "Independent, self-made family. Strong leadership heritage.",
        "Financially stable family. Traditional values. Possibly wealthy background.",
        "Intellectual, communicative family. Emphasis on education.",
        "Warm, family-oriented household. Strong mother figure.",
        "Prestigious, proud family. Social status and reputation.",
        "Practical, hardworking family. Health/medical/education background.",
        "Balanced, dignified family. Arts/law/diplomacy background.",
        "Family with secrets or transformations. Deep family history.",
        "Scholarly, religious/philosophical family. Possible foreign background.",
        "Strict, traditional family. Socially respected. Emphasis on responsibility.",
        "Free-spirited, unique family structure. Progressive thinking.",
        "Spiritual or artistic family. Possible foreign background. Rich sensitivity."
    ];

    const imageBySgn = [
        "Energetic, confident first impression. Sporty or strong image.",
        "Calm, reliable first impression. Refined and dignified image.",
        "Bright, talkative first impression. Intellectual and witty image.",
        "Warm, nurturing first impression. Soft and caring image.",
        "Glamorous, charismatic first impression. Confident image.",
        "Neat, tidy first impression. Meticulous and professional image.",
        "Elegant, charming first impression. Balanced and sophisticated image.",
        "Mysterious, intense first impression. Deep and charismatic image.",
        "Free-spirited, vibrant first impression. Positive and adventurous image.",
        "Serious, mature first impression. Responsible and reliable image.",
        "Unique, individualistic first impression. Trendy and original image.",
        "Dreamy, mystical first impression. Artistic and emotional image."
    ];

    const attractBySgn = [
        "Strong energy and confidence. Proactive and protective nature is attractive.",
        "Stability and sensual charm. Enjoying good food, scents, and textures.",
        "Wit and conversation skills. Intellectual stimulation is the attraction.",
        "Devoted care and emotion. Feeling at home together is the charm.",
        "Shining presence and generosity. Feeling special together is attractive.",
        "Delicate consideration and perfectionism. Attention to detail is charming.",
        "Elegance and harmonious personality. The world becomes beautiful together.",
        "Intense gaze and depth. Soul-piercing focus is the attraction.",
        "Free spirit and humor. Adventures begin when you are together.",
        "Solid trustworthiness and maturity. Rock-solid stability is attractive.",
        "Unique individuality and progressive thinking. Freshness never seen before.",
        "Mystical sensitivity and spiritual depth. Dream-like romance is the charm."
    ];

    // D1 7 house 사인으로 만남 환경
    const d1H7ForMeeting = (d1LagnaSign + 6) % 12;

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🤝 Meeting Environment' : '🤝 Meeting Environment — D1 7th: ' + SIGNS[d1H7ForMeeting] + ' ' + SIGN_SYMBOLS[d1H7ForMeeting]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '7th house sign reveals meeting environment.<br><br>'}
            <strong>${meetingBySgn[d1H7ForMeeting]}</strong>
            ${d1H7ForMeeting === 8 || d1H7ForMeeting === 11 ? '<br><br>💡 <strong>Foreign connection possibility!</strong> Spouse may be a foreigner or you may meet abroad.' : ''}
        </div>
    </div>`;

    // UL 사인으로 spouse 가문/배경
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏛️ Spouse Family Background' : '🏛️ Spouse Background — UL: ' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Upapada Lagna (UL) reveals spouse family background.<br><br>'}
            <strong>${backgroundBySgn[ulSign]}</strong>
        </div>
    </div>`;

    // A7 사인으로 spouse 외적 이미지
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👤 Spouse First Impression' : '👤 Spouse First Impression — A7: ' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Darapada (A7) shows spouse first impression.<br><br>'}
            <strong>${imageBySgn[a7Sign]}</strong>
        </div>
    </div>`;

    // D9 Venus 사인으로 spouse 매력 포인트
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💎 Spouse Attraction Point' : '💎 Spouse Attraction — D9 Venus: ' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'Venus in Navamsa reveals spouse charm and love style.<br><br>'}
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
            <div class="nakshatra-name">Your Star: ${nak.ko}</div>
            <div class="nakshatra-meaning">"${nak.meaning}"</div>
            <div class="nakshatra-detail">${nak.desc}</div>
        </div>
    ` : `
        <div class="nakshatra-card">
            <div class="nakshatra-name">${nak.ko} (${nak.name})</div>
            <div class="nakshatra-meaning">"${nak.meaning}" — Ruling Planet: ${DASHA_KO[nak.ruler] || nak.ruler}</div>
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
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 Life flows with different energies. Check your current period.<br><br>' :
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 <strong>Vimshottari Dasha</strong> — Life is divided into periods ruled by 9 planets. <strong>Mahadasha</strong> is the major period, <strong>Antardasha (Bhukti)</strong> is the sub-period. Calculated from Moon nakshatra position.<br><br>';
    html += isEasy ?
        '</div></div>' :
        '🌙 Birth Moon: <strong>' + nak.ko + ' (' + nak.name + ')</strong> — First Dasha: <strong>' + DASHA_KO[startRuler] + '</strong> (remaining: ' + remainingYears.toFixed(2) + ' yrs)</div></div>';

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
        const dashaEasyDesc = {Ketu:'Inner reflection & spiritual growth',Venus:'Love, beauty & abundance',Sun:'Confidence & leadership shines',Moon:'Emotions & home take center stage',Mars:'Challenges & action energy',Rahu:'Big changes & new opportunities',Jupiter:'Luck & growth arrive',Saturn:'Patience brings great rewards',Mercury:'Study, communication & business thrive'};
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
        'Action-oriented! Quick to decide with natural leadership qualities. You love new challenges. People often ask you to take the lead. A bit impatient, but incredibly driven.',
        'You love stability. You enjoy comfort, beauty, and good food. Once you make up your mind, you see it through. Stubborn, but that makes you incredibly reliable.',
        'Curious about everything! Great communicator and multi-talented. You pick up new information fast and draw people in with your wit. Sometimes scattered, but that\'s part of your charm.',
        'Warm and emotional. You treasure family and read people\'s feelings well. A natural caregiver who makes everyone feel comfortable. Mood swings happen, but your empathy is your superpower.',
        'Born leader! You have a big presence and naturally draw attention. Confident and magnetic. You crave recognition, but you\'re equally generous with love and praise.',
        'Detail-oriented and analytical. You strive for perfection and care about health. Sharp observer who catches what others miss. You worry a bit much, but that means you\'re always prepared.',
        'You seek harmony. Refined, charming, with excellent artistic taste. A natural peacemaker who hates conflict. Happiest when surrounded by beautiful things.',
        'You have depth. Strong intuition that cuts through to the truth. Calm on the surface but intense emotions underneath. Life throws big changes at you, and each one makes you stronger.',
        'Free spirit! You love travel and learning. Positive and philosophical. Interested in different cultures, with a broad worldview. Your humor lights up any room.',
        'Ambitious. Patient and increasingly attractive with age. Systematically works toward goals. Even if you struggle early on, you\'re the late-bloomer type who eventually gets everything they want.',
        'Unique. You think differently from everyone else and you\'re innovative. You hate being boxed in and want to change the world in your own way. Talented in tech or science.',
        'Deeply sensitive. Strong intuition drawn to art and spirituality. Vivid dreams and rich imagination. You empathize deeply with others\' pain. Your inner world is richer than the outer one.'
    ];
    const lagnaInterp = [
        'Aries Lagna ruled by Mars. Strong willpower and leadership, independent personality. Quick to act with a pioneering spirit. Sharp features with an active impression. Impulsive but courageous, excelling in competition.',
        'Taurus Lagna ruled by Venus. Seeks stability and abundance, loves sensory beauty. Soft appearance with an attractive voice. Values material security with exceptional artistic sense. Stubborn but reliable.',
        'Gemini Lagna ruled by Mercury. Intellectually curious with outstanding communication skills. Youthful appearance with an agile build. Versatile but can be scattered, talented in writing and languages.',
        'Cancer Lagna ruled by the Moon. Rich in sensitivity and highly intuitive. Round face with a soft impression. Devoted to home and family with strong protective instincts. Emotional ups and downs but deeply empathetic.',
        'Leo Lagna ruled by the Sun. Overflowing with charisma and creative energy. Dignified build with a commanding presence. Natural-born leader who enjoys the spotlight. High self-esteem but generous heart.',
        'Virgo Lagna ruled by Mercury. Analytical and perfectionist. Neat appearance with an intellectual impression. Excellent attention to detail and practical abilities, with interest in health and hygiene.',
        'Libra Lagna ruled by Venus. Seeks balance and harmony, diplomatically skilled. Well-proportioned appearance with a refined impression. Excels in relationships and partnerships with superb aesthetic sense.',
        'Scorpio Lagna ruled by Mars. Intense intuition and transformative power. Sharp eyes with a mysterious impression. Penetrates to the essence with deep insight, keeps secrets well. Experiences dramatic life changes multiple times.',
        'Sagittarius Lagna ruled by Jupiter. A philosopher seeking freedom and truth. Large build with a bright impression. Optimistic and values moral principles. Deep connections with travel and higher education.',
        'Capricorn Lagna ruled by Saturn. Strong ambition and patience. Lean build with a serious impression. Systematically works toward goals, the type who grows younger with age. Values social status and achievement.',
        'Aquarius Lagna ruled by Saturn. Innovative and original. Unique appearance with an intellectual impression. Values humanitarian ideals with unconventional thinking. Talented in technology and science.',
        'Pisces Lagna ruled by Jupiter. Spiritual and intuitive. Soft appearance with a dreamy impression. Extremely gifted artistic sensitivity with interest in transcendent worlds. Self-sacrificing tendency.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">👤 ${isEasy ? 'Your Personality' : 'Personality & Appearance — Lagna: ' + SIGNS[lagnaSign] + ' ' + SIGN_SYMBOLS[lagnaSign]}</div>
        <div class="interp-text">${isEasy ? lagnaEasy[lagnaSign] : lagnaInterp[lagnaSign]}</div>
    </div>`;

    // ═══════════════════════════════════
    // 2. 내면 & 감정 (Moon 별자리)
    // ═══════════════════════════════════
    if (moonPos) {
        const moonEasy = [
            'There\'s a fiery passion inside you. Emotions rise fast and cool down fast. When you\'re stressed, you need to move your body — exercise or outdoor activities work best.',
            'You\'re emotionally very stable. You dislike sudden changes and find comfort in the familiar. Good food, music, and beautiful nature heal your soul. Once you give your heart, it rarely changes.',
            'You process emotions through conversation. Talking things out makes you feel better. You\'re curious about everything and can\'t stand boredom. Your humor can lighten any mood.',
            'You\'re extremely sensitive and empathetic. You absorb others\' emotions like a sponge. Home is your safe space, and your bond with your mother is strong. Cooking or decorating brings emotional peace.',
            'Your emotional expression is dramatic and passionate. You deeply need to be loved and recognized. But you give love just as generously. Creative activities — art, writing, music — are your emotional medicine.',
            'You tend to analyze your emotions. You worry a lot but are great at solving problems practically. Daily routines — morning exercise, healthy meals, organizing — bring emotional stability.',
            'You find emotional balance in relationships. You feel lonely when alone and stabilize when with close friends or a partner. You deeply hate conflict and find peace in beauty and art.',
            'Your emotions are as deep and intense as the ocean. You love deeply and never forget betrayal. Your intuition is incredibly strong — you read truth through eyes and actions, not words.',
            'You\'re emotionally bright and optimistic. You love freedom and hate being constrained. Travel is your best emotional remedy. You process feelings through philosophical thinking.',
            'You don\'t show emotions easily. Strong sense of responsibility, always putting duty first. You may have been mature beyond your years as a child, but you grow more emotionally open with age.',
            'You have unique, unpredictable emotional patterns. You love in unconventional ways and see the bigger picture. You find emotional fulfillment in social causes and community activities.',
            'You\'re extremely intuitive and spiritual. Your dreams are vivid and sometimes feel prophetic. You deeply empathize with others\' pain. Art, meditation, and being near water bring you peace.'
        ];
        const moonInterp = [
            'A fiery passion burns within. Emotions are spontaneous and change quickly. Anger flares fast but fades just as quickly; you desire emotional independence. Relieving stress through exercise works best.',
            'Emotionally very stable, seeking comfort. Dislikes change and finds security in the familiar. Healed by good food, music, and nature. Once you give your heart, it rarely changes.',
            'Processes emotions rationally and organizes feelings through conversation. Curious with many simultaneous interests. Seeks variety over emotional depth and cannot tolerate boredom.',
            'Moon in its own sign (domicile). Extremely rich in sensitivity, absorbing others\' emotions like a sponge. Strong maternal instincts, finding stability at home. Emotions may fluctuate with the Moon\'s cycle.',
            'Dramatic and passionate emotional expression. Strong need to be recognized and loved; deeply hurt when ignored. Creative activities serve as emotional healing. Romantic and generous heart.',
            'Tendency to analyze and organize emotions. Worries a lot and is perfectionist but resolves things practically. May have health concerns, finding stability in daily routines.',
            'Finds emotional balance within relationships. Feels anxious alone and stabilizes when with a partner. Extremely averse to conflict and discord, finding inner peace in art and beauty.',
            'Emotions are as deep and intense as the ocean. Loves deeply and hates deeply; never forgives betrayal. Very strong intuition, instinctively reading others\' true intentions. Emotional energy of transformation and rebirth.',
            'Emotionally optimistic and freedom-loving. Dislikes being constrained and seeks new experiences. Sublimating emotions through philosophical thought, with travel as the best remedy.',
            'Controls emotions well and doesn\'t show them outwardly. Strong sense of responsibility, prioritizing duty over feelings. May have had emotional difficulties in childhood, but grows emotionally mature with age.',
            'Unique and unpredictable emotional patterns. Independent, loving in unconventional ways. Pursues universal love for humanity and social causes, seeing the bigger picture over personal emotions.',
            'Extremely intuitive and spiritual. Dreams are vivid and may be prophetic. Deeply empathizes with others\' suffering, with blurred boundaries between self and others. Finds stability in art, meditation, and spiritual practice.'
        ];
        html += `<div class="interp-card">
            <div class="interp-title">🌙 ${isEasy ? 'Your Emotional Style' : 'Inner Self & Emotions — Moon: ' + SIGNS[moonPos.sign] + ' ' + SIGN_SYMBOLS[moonPos.sign]}</div>
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

    let wealthText = isEasy ? '' : `<strong>2nd House (Accumulated Wealth):</strong> ${SIGNS[h2sign]}. `;
    if (h2planets.length === 0) {
        wealthText += isEasy ? 'Wealth accumulation is steady and stable. Builds up steadily without major fluctuations. ' : 'No planets in 2nd — steady wealth accumulation. ';
    } else {
        h2planets.forEach(p => {
            const pWealth = {
                'Sun': 'Income through authority and status. Potential earnings from government or public sectors.',
                'Moon': 'Fluctuating financial situation. Income possible in public-facing businesses or food & beverage industries.',
                'Mars': 'Aggressive investment tendencies. Income from real estate, technology, or military-related fields.',
                'Mercury': 'Earning money through intellectual abilities. Wealth from writing, education, communications, and IT.',
                'Jupiter': 'Most auspicious placement! Abundant wealth fortune. Great income from education, law, or religious fields.',
                'Venus': 'Accumulates wealth through luxury goods, art, entertainment, and fashion. Abundant dining life.',
                'Saturn': 'Slowly and steadily accumulates wealth. Difficulties early on but stabilizes after middle age.',
                'Rahu': 'Earns money through unconventional methods. Sudden wealth from foreign, technology, or innovation sectors.',
                'Ketu': 'Indifference to wealth. Values spiritual matters over material ones; watch for sudden losses.'
            };
            wealthText += isEasy ? `${pWealth[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pWealth[p.id] || ''} `;
        });
    }

    wealthText += isEasy ? '<br><br>' : `<br><br><strong>11th House (Income & Gains):</strong> ${SIGNS[h11sign]}. `;
    if (h11planets.length === 0) {
        wealthText += isEasy ? 'Income is stable but without major fluctuations.' : 'No planets in 11th — stable income without major changes.';
    } else {
        h11planets.forEach(p => {
            const pIncome = {
                'Jupiter': 'Large income and abundant profits! Social networks bring wealth.',
                'Venus': 'Income through art, socializing, and fashion. Female friends are helpful.',
                'Saturn': 'Steady and stable income but slow growth. Good retirement security.',
                'Mars': 'Income through competition. Profits from technology, real estate, and sports.',
                'Mercury': 'Income through intellectual networks. Entrepreneurial aptitude.',
                'Sun': 'Income through authority. Political connections bring wealth.',
                'Moon': 'Income through public popularity. Fluctuating but steady flow.'
            };
            wealthText += isEasy ? `${pIncome[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pIncome[p.id] || ''} `;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">💰 ${isEasy ? 'My Wealth Fortune' : 'Wealth Fortune'}</div>
        <div class="interp-text">${wealthText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 4. 💕 spouse & Marriage Fortune (7 house 분석)
    // ═══════════════════════════════════
    const h7sign = (lagnaSign + 6) % 12;
    const h7planets = planetsInHouse(7);
    const venus = positions.find(p => p.id === 'Venus');

    const spouseSign = [
        'An independent and energetic spouse. Destined for someone with strong willpower and leadership. An active and direct partner.',
        'A beautiful and artistic spouse. Destined for someone materially stable. A sensual and loyal partner.',
        'An intelligent spouse with good communication skills. Destined for someone you can converse with well. A humorous and versatile partner.',
        'An emotional and domestic spouse. Destined for someone nurturing. A partner with motherly warmth.',
        'A charismatic and dignified spouse. Destined for someone socially prominent. A partner with high self-esteem but generous nature.',
        'A meticulous and practical spouse. Destined for someone interested in health and wellness. An analytical and service-oriented partner.',
        'An attractive and refined spouse. Destined for someone diplomatic with good sense of balance. A partner with excellent artistic taste.',
        'An intense and mysterious spouse. Destined for someone with deep emotions. A transformative and passionate partner. May have many secrets.',
        'A free-spirited and optimistic spouse. Possible connection with a foreigner or someone from another culture. A philosophical and adventurous partner.',
        'A serious and ambitious spouse. May have an age difference. A responsible and socially successful partner. Marriage may come late.',
        'A unique and independent spouse. Unconventional meeting or relationship. An intellectual and innovative partner. A free-form marriage.',
        'A spiritual and intuitive spouse. Connection with an artist or spiritual practitioner. A dreamy and romantic partner. Watch for idealization.'
    ];

    const spouseAppearance = [
        'Sharp features, strong impression. Athletic build. Intense eyes full of energy. Red tones suit well. Active, dynamic vibe.',
        'Soft, attractive appearance. Full figure with sensual lips. Good skin with natural beauty. Warm, comfortable impression.',
        'Youthful appearance, bright impression. Slim and tall. Expressive face with sparkling eyes. Trendy and stylish.',
        'Round face, soft impression. Slightly curvy figure. Fair skin with large eyes. Motherly vibe. More attractive at home.',
        'Dignified build with charismatic appearance. Rich hair is a feature. Commanding presence, well-dressed. Draws attention everywhere.',
        'Neat, clean appearance. Lean with good proportions. Intellectual impression. Minimal fashion, cleanliness is charm.',
        'Balanced appearance, refined impression. Symmetrical face. Charming smile, social vibe. Always well-dressed. May have dimples.',
        'Sharp, mysterious appearance. Deep eyes leave strong impression. Lean with sharp features. Prefers dark tones. Hidden sexiness.',
        'Tall with good build. Bright, open impression. Exotic charm. Casual, free clothing. Attractive smile, sporty style.',
        'Serious, mature appearance. Lean with defined bone structure. Looks older than age but grows more attractive over time. Classic suit style.',
        'Unique, extraordinary appearance. Distinctive fashion. Tall or with notable features. Unconventional charm. Futuristic style.',
        'Soft, dreamy appearance. Large eyes with dreamy expression. Slightly plump with translucent skin. Pastel tones suit. Mystical charm.'
    ];

    let spouseText = (isEasy ? '' : '<strong>📐 Spouse Appearance:</strong><br>') + spouseAppearance[h7sign] + (isEasy ? '<br><br>' : isEasy ? '<br><br>' : '<br><br><strong>📋 spouse Personality:</strong><br>') + spouseSign[h7sign];

    if (h7planets.length > 0) {
        spouseText += isEasy ? '<br><br>' : '<br><br><strong>Planets in 7th:</strong> ';
        h7planets.forEach(p => {
            const pH7 = {
                'Sun': 'Spouse is socially recognized. May be somewhat dominant but a respectable partner.',
                'Moon': 'An emotional and caring spouse. Marriage life with deep emotional connection.',
                'Mars': 'Passionate but may have frequent arguments. A strong-willed spouse. Energetic relationship.',
                'Mercury': 'An intellectual spouse with great conversation. A good relationship as business partners too.',
                'Jupiter': 'Most blessed placement! A wise and moral spouse. Happy married life. Luck through spouse.',
                'Venus': 'A very attractive and loving spouse. Romantic married life. May enjoy luxury.',
                'Saturn': 'Late marriage or spouse with significant age difference. Difficult early on but stable, long-lasting marriage.',
                'Rahu': 'Unconventional marriage. Spouse from foreign country or different background. Sudden meeting.',
                'Ketu': 'Past-life connection. Strong spiritual bond but some distance in worldly relationships.'
            };
            spouseText += isEasy ? `<br>${pH7[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pH7[p.id] || ''}`;
        });
    }

    if (venus) {
        const venusHouse = houseOf(venus.sign);
        spouseText += isEasy ? '<br><br>' : `<br><br><strong>Venus Position (${venusHouse}th):</strong> `;
        const venusHouseInterp = {
            1: 'Attractive appearance. Enjoys romance and falls in love easily.',
            2: 'Wealth comes through spouse. Beautiful voice and gourmet tastes.',
            3: 'Artistic communication skills. Pleasant relationships with siblings.',
            4: 'Happiness at home with a beautiful residence. Strong influence from mother.',
            5: 'A life rich in romance. Good relationship with children. Joy in creative work.',
            6: 'Service-oriented attitude in romance. Possibility of workplace romance.',
            7: 'Very attractive spouse. A strong indicator of happy married life.',
            8: 'Deep and transformative love. Secret romance. Spouse\'s wealth.',
            9: 'Romance abroad. Connection with a teacher or mentor. Philosophical love.',
            10: 'Socially recognized marriage. Meeting through career.',
            11: 'From friends to lovers. Finding connections through social activities.',
            12: 'Secret romance. Foreign connections. Spiritual love.'
        };
        spouseText += venusHouseInterp[venusHouse] || '';
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 My Spouse' : '💕 Spouse & Marriage — 7th House: ' + SIGNS[h7sign] + ' ' + SIGN_SYMBOLS[h7sign]}</div>
        <div class="interp-text">${spouseText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 5. 💼 career & 사회적 성취 (10 house 분석)
    // ═══════════════════════════════════
    const h10sign = (lagnaSign + 9) % 12;
    const h10planets = planetsInHouse(10);

    const careerSign = [
        'Suited for military, police, sports, surgery, corporate management, leadership roles.',
        'Finance, food industry, agriculture, fashion, real estate, art, banking fields.',
        'Media, writing, education, communications, IT, marketing, translation fields.',
        'Medical, nursing, hospitality, maritime, real estate, food & beverage fields.',
        'Politics, entertainment, management, government agencies, leadership positions, gold-related fields.',
        'Medical, accounting, analysis, consulting, healthcare, quality control fields.',
        'Law, diplomacy, fashion, interior design, counseling, event planning fields.',
        'Research, investigation, insurance, medicine, psychology, taxation, mining fields.',
        'Education, law, religion, publishing, travel, international trade fields.',
        'Management, civil service, architecture, civil engineering, politics, large corporations.',
        'Technology, science, IT, aviation, aerospace, social work, innovation fields.',
        'Art, film, music, medical, overseas, spiritual fields, NGO-related fields.'
    ];

    let careerText = isEasy ? careerSign[h10sign] : `10th house is in ${SIGNS[h10sign]}. ${careerSign[h10sign]}`;

    if (h10planets.length > 0) {
        careerText += isEasy ? '<br><br>' : '<br><br><strong>Planets in 10th:</strong>';
        h10planets.forEach(p => {
            const pCareer = {
                'Sun': ' Government, leadership, authoritative positions. A career that garners social attention.',
                'Moon': ' Public-facing career. Caring, hospitality, food & beverage, emotion-related fields.',
                'Mars': ' Technology, engineering, military, surgery, sports. Success in competitive fields.',
                'Mercury': ' Business, communication, IT, education. Success through intellectual abilities.',
                'Jupiter': ' Education, law, religion, consulting. A respected career. One of the best placements.',
                'Venus': ' Art, entertainment, fashion, beauty, diplomacy. Success in creative fields.',
                'Saturn': ' Slow but certain success. Systematic organizations, architecture, civil service. Shines after middle age.'
            };
            careerText += isEasy ? `<br>${pCareer[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pCareer[p.id] || ''}`;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 My Career' : '💼 career & societyAchievement — 10th: ' + SIGNS[h10sign] + ' ' + SIGN_SYMBOLS[h10sign]}</div>
        <div class="interp-text">${careerText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 6. 🏥 health (6 house + Lagna 분석)
    // ═══════════════════════════════════
    const h6sign = (lagnaSign + 5) % 12;
    const h6planets = planetsInHouse(6);

    const healthByLagna = [
        'Watch for head, brain, and face-related conditions. Prone to headaches, fevers, and inflammation. Regular exercise is essential.',
        'Watch for neck, thyroid, and jaw issues. Prone to overeating and diabetes. Take care of vocal cords and throat health.',
        'Watch for lungs, arms, shoulders, and nervous system. Anxiety and sleep issues possible. Breathing meditation helps.',
        'Watch for stomach, chest, and breast-related issues. Digestive disorders and water retention. Emotional stress directly affects health.',
        'Watch for heart, back, and spine issues. Cardiovascular health management is essential. Beware of overwork.',
        'Watch for digestive system, intestines, and skin. Indigestion and allergies. Diet is important.',
        'Watch for kidneys, lower back, and skin. Adequate hydration and balanced lifestyle essential.',
        'Watch for reproductive and excretory systems. Possibility of chronic conditions. Regular checkups are important.',
        'Watch for liver, thighs, and hips. Tendency toward being overweight. Outdoor activities are good for health.',
        'Watch for bones, joints, knees, and skin. Rheumatism and arthritis. Calcium intake is important.',
        'Watch for ankles, calves, and circulatory system. Blood pressure management. Unusual health issues possible.',
        'Watch for feet, lymphatic system, and immunity. Unexplained conditions possible. Adequate sleep is key.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏥 My Health' : '🏥 health — Vulnerable Areas'}</div>
        <div class="interp-text">${healthByLagna[lagnaSign]}${h6planets.length > 0 ? isEasy ? '<br><br>Special health attention needed.' : '<br><br>6 house ' + h6planets.map(p => p.name).join(', ') + ' requires special attention to health.' : ''}</div>
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
                    'Sun': 'A period of self-discovery and authority. A time to exercise leadership and receive social recognition. Relationships with government or authority figures become important. Changes may occur in your relationship with your father. Watch your heart and eye health. This period strengthens your self-esteem and identity.',
                    'Moon': 'A period of emotions and inner life. Home and relationship with mother become important. Real estate matters may arise, and public relations become active. Emotional fluctuations are large but intuition strengthens. Possibility of travel and relocation.',
                    'Mars': 'A period of action and energy. A great time to courageously start new ventures. Real estate transactions, surgeries, and technology-related activities become active. Changes in sibling relationships. Watch for disputes, accidents, and burns. Good results in exercise and competition.',
                    'Rahu': 'A period of rapid change and innovation. Unexpected opportunities and challenges come. Foreign-related activities become active, with potential advancement in technology and innovation fields. Material desires intensify — be careful not to get lost in illusions. You will have unique experiences. An 18-year long cycle.',
                    'Jupiter': 'A period of luck and growth! A time when good things in life — education, marriage, childbirth, promotions — are more likely to happen. Spiritual growth and wisdom deepen. You will meet a teacher or mentor. Activities related to law, education, and religion are favorable.',
                    'Saturn': 'A period of patience and trials. Growth is slow but certain. Responsibilities grow heavier with experiences of limitation and structure. Watch your health, especially bones and joints. A 19-year long cycle where true abilities are tested. When it ends, you discover a stronger self.',
                    'Mercury': 'A period of intellectual activity and business. Favorable for learning, communication, writing, and business ventures. A great time to learn new skills. Relationships with siblings and friends become active. Watch nervous system health. You will find yourself juggling multiple things simultaneously.',
                    'Ketu': 'A period of spiritual awakening and detachment. You become more detached from the material world with deepening spiritual interests. You may experience sudden changes and losses, but these lead to spiritual growth. Intuition becomes very strong — an excellent time for meditation and spiritual practice.',
                    'Venus': 'A period of love and abundance! Romance, marriage, and artistic activities become active. You enjoy material prosperity and indulge in luxury. You may acquire a new car, new home, or jewelry. Aesthetic sense develops and social activities flourish. The longest cycle at 20 years.'
                };
                html += `<div class="interp-card">
                    <div class="interp-title">${isEasy ? '⏳ Current Period: ' + DASHA_KO[currentDasha] : '⏳ Current Dasha: ' + DASHA_KO[currentDasha] + ' Dasha'}</div>
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
            yogaText += isEasy ? '<strong>🐘 Blessing of Wisdom & Fame</strong>' : '<strong>🐘 Gajakesari Yoga (Gajakesari)</strong> — Moon-Jupiter Kendra relationship! Wisdom, fame, abundance combination. Respected in society with outstanding intellect. Good education and children fortune.<br><br>';
        }
    }

    // Budha-Aditya Yoga
    const sun = positions.find(p => p.id === 'Sun');
    const mercury = positions.find(p => p.id === 'Mercury');
    if (sun && mercury && sun.sign === mercury.sign) {
        yogaText += isEasy ? '<strong>📚 Blessing of Outstanding Intelligence</strong>' : '<strong>📚 Budha-Aditya Yoga</strong> — Sun-Mercury same sign! Outstanding intellect and communication. Success in education, writing, business. Authoritative intellectual leader.<br><br>';
    }

    // Chandra-Mangala Yoga
    if (moonPos && mars && moonPos.sign === mars.sign) {
        yogaText += isEasy ? '<strong>🔥 Blessing of Strong Will & Wealth</strong>' : '<strong>🔥 Chandra-Mangala Yoga</strong> — Moon-Mars same sign! Strong will and wealth accumulation. Success in business with bold decision-making.<br><br>';
    }

    // Kuja Dosha (Manglik)
    if (mars) {
        const marsH = houseOf(mars.sign);
        if ([1,2,4,7,8,12].includes(marsH)) {
            yogaText += isEasy ? `<strong>⚠️ Marriage Caution</strong>` : `<strong>⚠️ Kuja Dosha (Manglik)</strong> — Mars in ${marsH}th house — challenges in married life possible. Check partner chart recommended. Marriage after age 28 may be favorable.<br><br>`;
        }
    }

    if (yogaText) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '🔮 Your Special Talents' : '🔮 Special Yogas (Planetary Combinations)'}</div>
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
        '1st House: Strong self and leadership. Healthy and vital. High self-esteem and independent. Connection with government/authority.',
        '2nd House: Values family honor. Income through authority. Inheritance from father. Watch eye health.',
        '3rd House: Courageous and decisive. Leader among siblings. Authority in writing/communication. Many short trips.',
        '4th House: Tension in parental relationships. Ownership of real estate/vehicles. Inner restlessness. May leave hometown.',
        '5th House: Outstanding creative talent. Good relationship with children. Investment/speculation abilities. Romantic love.',
        '6th House: Power to defeat enemies. Health management abilities. Victory in legal disputes. Suited for service/medical fields.',
        '7th House: Spouse with high social status. Leading role in partnerships. Social growth after marriage.',
        '8th House: Watch longevity. Benefits from inheritance/insurance. Secret power. Experience of spiritual transformation.',
        '9th House: Father is a respected figure. Success in law/religion/higher education. Many overseas trips. Good fortune.',
        '10th House: The best placement! Social success and fame. Leader in government/public sector. Success like father.',
        '11th House: Large income and social network. High-status friends. Excellent goal achievement abilities.',
        '12th House: Success overseas. Spiritual pursuits. Distance from father. Tendency to enjoy solitude. Watch eye health.'
    ],
    Moon: [
        '1st House: Attractive appearance. Emotional and changeable personality. Popular with the public. Health influenced by Moon cycles.',
        '2nd House: Comfortable family environment. Good diet. Sweet-spoken. Strong family bonds.',
        '3rd House: Creative communication skills. Loves to travel. Emotional bond with siblings. Artistic hobbies.',
        '4th House: The best placement! Happy home. Strong bond with mother. Good real estate fortune. Emotional stability.',
        '5th House: Deep love for children. Romantic personality. Intuitive investment ability. Joy in creative activities.',
        '6th House: Health issues from emotional stress. Victory over enemies. Service spirit. Watch for digestive disorders.',
        '7th House: Attractive spouse. Emotionally deep marriage. Tendency to depend on partner. Public relations.',
        '8th House: Emotional turmoil and transformation. Very strong intuition. Possible inheritance. Long life but emotional crises.',
        '9th House: Spiritual and philosophical. Mother is religious. Travel/residence abroad. Lucky journeys.',
        '10th House: Public popularity and social success. Hospitality/food & beverage/caring fields. Success through mother\'s influence.',
        '11th House: Many friends and sociable. Steady income. Ability to fulfill wishes. Help from female friends.',
        '12th House: Possible residence abroad. Sleep problems. Spiritual inclinations. Distance from mother. Enjoys solitude.'
    ],
    Mars: [
        '1st House: Strong physique and willpower. Possible scars/wounds. Impulsive but brave. Leadership and competitiveness.',
        '2nd House: Harsh speech. Dietary issues. Family disputes. But ability to accumulate wealth.',
        '3rd House: The best placement! Courage and adventurous spirit. Strong bond with siblings. Athletic/sports talent.',
        '4th House: Domestic conflicts. Real estate disputes. Tension with mother. But profits from real estate investments.',
        '5th House: Passionate romance. Active children. Speculative investments. Talent in sports/competition.',
        '6th House: Power to crush enemies! Physical strength to overcome illness. Suited for military/police/medical. Strong immunity.',
        '7th House: Kuja Dosha — Passion and conflict coexist in marriage. Strong spouse. Marriage after 28 recommended.',
        '8th House: Watch for accidents/surgery. But the power to survive crises. Insurance/inheritance benefits. Interest in tantra.',
        '9th House: Conflict with father. Strong opinions about religion. Legal disputes. Foreign activities.',
        '10th House: Outstanding career performance! Military/engineering/surgery/police. A brave leader in society.',
        '11th House: Large income! Strong goal achievement. Help from siblings. Real estate profits.',
        '12th House: High spending overseas. Sleep issues. Strong sexual energy. Secret activities.'
    ],
    Jupiter: [
        '1st House: Blessed placement! Wise and generous personality. Large build and healthy. A respected figure.',
        '2nd House: Abundant wealth! Large family. Income through education. Eloquent speaker. Good diet.',
        '3rd House: Successful siblings. Writing related to religion/education. Short pilgrimages.',
        '4th House: One of the best placements! Spacious home. Academic achievement. Wise mother. Inner peace.',
        '5th House: Outstanding intellect and creativity! Good children fortune. Wise investments. Spiritual practice. Merit from past lives.',
        '6th House: Easily defeats enemies. Legal victories. Service spirit. Healthy but watch weight management.',
        '7th House: A wise and moral spouse! Happy marriage. Successful business partnerships.',
        '8th House: Longevity! Inheritance. Depth of spiritual knowledge. Interest in astrology/mysticism. Spouse\'s wealth.',
        '9th House: The most powerful placement! Great fortune. Teacher\'s blessings. Overseas travel. Success in law/religion/philosophy.',
        '10th House: Social fame and respect! Leader in education/law/religious fields. Moral authority. Best career fortune.',
        '11th House: Great income and profits! Wish fulfillment. Influential connections. Social success.',
        '12th House: Fortune overseas. Spiritual liberation. Heavenly pleasures. Donations and charity. Meditation practice.'
    ],
    Venus: [
        '1st House: Very attractive appearance! Artistic talent. Enjoys luxury. Sociable and popular.',
        '2nd House: Abundant wealth! Fine food and luxury goods. Sweet voice. Family harmony.',
        '3rd House: Artistic communication. Beautiful writing. Good relationship with sisters/female siblings.',
        '4th House: Beautiful home and vehicles! Luxurious lifestyle. Mother is beautiful and artistic.',
        '5th House: Romantic love! Art/entertainment talent. Beautiful children. Joy in creation.',
        '6th House: Difficulties in romance. Health-related beauty. Victory over enemies through charm.',
        '7th House: The best placement! Very attractive spouse. Happy marriage. Successful business partnerships.',
        '8th House: Deep and transformative love. Spouse\'s wealth. Secret romance. Longevity.',
        '9th House: Romance abroad. Artistic travels. Beautiful relationship with teachers.',
        '10th House: Success in art/fashion/entertainment! Socially attractive. Help from women.',
        '11th House: Income through social networks! Help from female friends. Wish fulfillment.',
        '12th House: Love abroad. Secret romance. Bedroom pleasures. Artistic inspiration.'
    ],
    Saturn: [
        '1st House: Lean build. Serious and responsible. Childhood difficulties. Shines with age. Longevity.',
        '2nd House: Slow wealth accumulation. Frugal lifestyle. Heavy speech. Distance from family. Stability after middle age.',
        '3rd House: Excellent placement! Strong will and patience. Responsibility for siblings. Systematic communication.',
        '4th House: Difficulties with mother. Strict home environment. Old houses/buildings. Inner solitude.',
        '5th House: Children come late or few. Cautious investments. Academic struggles and overcoming. Spiritual practice.',
        '6th House: Defeats enemies through patience! Chronic but manageable conditions. Success in service fields. Good placement.',
        '7th House: Late marriage. Older spouse. Difficult early on but stable marriage. Caution with business partners.',
        '8th House: Longevity! Watch for chronic conditions. Delays in inheritance matters. Secret research. Interest in tantra/yoga.',
        '9th House: Difficult relationship with father. Serious approach to religion. Late overseas travel.',
        '10th House: Great placement! Slow but certain social success. Leader in large corporations/government. Best career fortune.',
        '11th House: Steady income growth! Older friends. Achieving goals through patience. Organizational profits.',
        '12th House: Difficulties and growth overseas. Sleep issues. Spiritual practice. Preference for solitary work.'
    ]
};

function renderPlanetHouse(positions, lagnaSign) {
    function houseOf(signIdx) { return ((signIdx - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = ['','Self','Money·Family','Communication','Home','Children·Romance','Health','Spouse','Transformation','Fortune·Foreign','Career','Income','Spirituality'];
    let html = '';

    positions.forEach(p => {
        if (!PLANET_IN_HOUSE[p.id]) return;
        const house = houseOf(p.sign);
        const desc = PLANET_IN_HOUSE[p.id][house - 1];
        if (!desc) return;

        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? (houseArea[house]||'') : p.symbol + ' ' + p.name + ' → ' + house + ' house (' + SIGNS[p.sign] + ')'}</div>
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
    let text = isEasy ? '<strong>Basic Education:</strong> ' : `<strong>4th House (Basic Education):</strong> ${SIGNS[h4sign]}. `;
    const eduSign4 = ['Active learning, physical/military education', 'Fine arts/music/culinary education', 'Languages/literature/communication', 'Home education emphasis, history', 'Drama/leadership/political science', 'Science/medicine/analytics', 'Law/diplomacy/design', 'Psychology/research/investigation', 'Philosophy/theology/international studies', 'Business/administration/architecture', 'IT/science technology/aviation', 'Art/film/music/spirituality'];
    text += eduSign4[h4sign] + ' suited. ';
    if (h4.length > 0 && !isEasy) text += 'In 4th house, ' + h4.map(p => p.name).join(', ') + ' influences education. ';

    const jupiter = positions.find(p => p.id === 'Jupiter');
    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if ([1,4,5,9].includes(jH)) text += isEasy ? '<br><br>🎓 <strong>High academic achievement expected!</strong> Graduate school/PhD/study abroad possible.' : '<br><br>🎓 <strong>Jupiter in ' + jH + 'th house — high academic achievement expected!</strong> Graduate school/PhD/study abroad possible.';
    }

    text += isEasy ? '<br><br><strong>Higher education:</strong> ' : `<br><br><strong>5 house (Higher Education)::</strong> ${SIGNS[h5sign]}. `;
    if (h5.length > 0) {
        h5.forEach(p => {
            const h5p = { Sun: 'Excels in leadership/political science', Moon: 'art/psychology talent', Mars: 'Engineering/technology/sports talent', Mercury: 'Math/language/business genius', Jupiter: 'Best placement! Scholar/professor/researcher', Venus: 'art/design/music talent', Saturn: 'Late academics but deep research' };
            text += isEasy ? `${h5p[p.id] || 'influences academics'}. ` : `${p.name}: ${h5p[p.id] || 'influences academics'}. `;
        });
    } else {
        text += isEasy ? 'No particularly strong academic energy, but steady effort will bring good results.' : 'No planets in 5th — 5th lord position is key.';
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

    let text = isEasy ? "" : `<strong>5th House (Children):</strong> ${SIGNS[h5sign]}.<br><br>`;

    const childSign = [
        'Active and independent children. Talented in sports/leadership. Gains independence early.',
        'Calm and artistic children. Talented in music/art. Materially well-off children.',
        'Smart and quick-speaking children. Excellent academics. Possibility of twins.',
        'Sensitive and gentle children. Special bond with mother. Domestic children.',
        'Charismatic and creative children. Leader qualities. Talent in entertainment/art.',
        'Meticulous and analytical children. Talent in medicine/science. Health care is important.',
        'Charming and sociable children. Talent in art/diplomacy. Excellent sense of balance.',
        'Intense and intuitive children. Research/exploration spirit. May have many secrets.',
        'Free-spirited and adventurous children. Possible study/travel abroad. Philosophical tendencies.',
        'Serious and ambitious children. Matures early. Achievement-oriented.',
        'Unique and innovative children. Talented in technology/science. Independent personality.',
        'Artistic and spiritual children. Rich imagination. Talented in music/painting.'
    ];
    text += childSign[h5sign];

    if (h5.length > 0) {
        text += isEasy ? '<br><br>' : '<br><br><strong>Planets in 5th:</strong><br>';
        h5.forEach(p => {
            const ch = { Sun: 'Connection with sons. Children have leadership.', Moon: 'Connection with daughters. Strong emotional bond.', Mars: 'Active children. May be difficult to manage.', Mercury: 'Very smart children! Excellent academics.', Jupiter: 'Blessed children! Fortune through children.', Venus: 'Beautiful artistic children. Connection with daughters.', Saturn: 'Children may come late. But responsible children.' };
            text += `${ch[p.id] || ''}<br>`;
        });
    }

    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if (jH === 5) text += isEasy ? '<br>🌟 <strong>Best children fortune! Children bring great luck.</strong>' : '<br>🌟 <strong>Jupiter in 5th! Best children fortune.</strong>';
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
    let text = isEasy ? '<strong>foreign travel·fortune:</strong><br>' : '<strong>9 house (foreign travel·fortune·Higher education):</strong><br>';
    if (h9.length === 0) {
        text += 'Foreign travel exists but not a strong connection.';
    } else {
        h9.forEach(p => {
            const f9 = { Sun: 'Father has foreign connections. Government overseas trips.', Moon: 'Enjoys foreign travel emotionally. Popularity abroad.', Mars: 'Adventure/challenge abroad. Military/technology related foreign activities.', Mercury: 'Study abroad/business success! Multilingual ability.', Jupiter: 'Great fortune abroad! Study abroad/immigration success. Meeting foreign teachers.', Venus: 'Romance abroad. Art/fashion-related foreign activities.', Saturn: 'Success after hardship abroad. Long-term foreign residence.', Rahu: 'Strong foreign migration indicator! Deeply immersed in foreign culture.', Ketu: 'Past-life foreign connection. Spiritual pilgrimage.' };
            text += isEasy ? `${f9[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f9[p.id] || ''}<br>`;
        });
    }

    text += isEasy ? '<br><strong>Foreign Settlement:</strong><br>' : '<br><strong>12 house (foreign settlement·Immigration):</strong><br>';
    if (h12.length === 0) {
        text += 'Domestic residence is more natural.';
    } else {
        h12.forEach(p => {
            const f12 = { Sun: 'Finding identity abroad. Government foreign posting.', Moon: 'High possibility of living abroad! Emotional stability overseas.', Mars: 'Energy expenditure abroad. Foreign investment/real estate.', Mercury: 'Foreign business/IT. Overseas education.', Jupiter: 'foreignSpiritual growth abroad. Charity. Foreign university.', Venus: 'Luxury and pleasure abroad. Foreign art activities.', Saturn: 'Hard labor abroad. But long-term settlement.', Rahu: 'Strong immigration indicator! Adapting to Western culture.', Ketu: 'Spiritual practice abroad. Solitary overseas life.' };
            text += isEasy ? `${f12[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f12[p.id] || ''}<br>`;
        });
    }

    if (rahu) {
        const rH = houseOf(rahu.sign);
        if ([9, 12, 7].includes(rH)) text += isEasy ? '<br>✈️ <strong>Very high possibility of foreign migration!</strong>' : '<br>✈️ <strong>Rahu in ' + rH + 'th — very high chance of foreign residence!</strong>';
    }

    document.getElementById('foreignWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 행성 품위
// ═══════════════════════════════════════════════════
function renderDignity(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = {1:'Self',2:'Money/Family',3:'Communication/Siblings',4:'Home/Mother',5:'Children/Romance',6:'Health/Enemies',7:'Spouse',8:'Transformation/Inheritance',9:'Luck/Foreign',10:'Career/Fame',11:'Income/Wishes',12:'Foreign/Spirituality'};
    const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };
    const OWN = { Sun: [4], Moon: [3], Mars: [0,7], Mercury: [2,5], Jupiter: [8,11], Venus: [1,6], Saturn: [9,10] };

    // 쉬운 설명
    const planetRole = {
        Sun: 'Self/Confidence/Father/Authority',
        Moon: 'Emotions/Mind/Mother/Daily life',
        Mars: 'Energy/Courage/Action/Competition',
        Mercury: 'Intelligence/Communication/Learning/Business',
        Jupiter: 'Luck/Wisdom/Wealth/Marriage',
        Venus: 'Love/Charm/Art/Pleasure',
        Saturn: 'Patience/Trials/Responsibility/Effort'
    };

    let html = `<div class="interp-card" style="margin-bottom:16px;">
        <div class="interp-text">
            ${isEasy ?
            '<strong>💡 Easy guide:</strong> Shows how strongly each energy works in your life.<br><br>🟢 <strong>Very Strong</strong> = Peak condition! Great fortune and results.<br>🟡 <strong>Strong</strong> = Stable, good results.<br>⚪ <strong>Average</strong> = Neither strong nor weak.<br>🔴 <strong>Weak</strong> = Challenges but can overcome with effort.' :
            '<strong>💡 Guide:</strong> Planetary dignity means how well a planet exerts its power.<br><br>🟢 <strong>Exalted</strong> = Peak condition! Great fortune and results in this planet\'s life area.<br>🟡 <strong>Own Sign</strong> = Comfortable as at home. Stable, good results.<br>⚪ <strong>Neutral</strong> = Average. Neither strong nor weak.<br>🔴 <strong>Debilitated</strong> = Weakened. Challenges in this area but can overcome with effort.'}
        </div>
    </div>`;

    positions.forEach(p => {
        if (!EXALT.hasOwnProperty(p.id)) return;
        let dignity, emoji, meaning, color, simpleDesc;
        const role = planetRole[p.id];

        const house = houseOf(p.sign);
        const area = houseArea[house] || '';

        if (p.sign === EXALT[p.id]) {
            dignity = 'Exalted';
            emoji = '🟢';
            color = '#5cb85c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — greatest blessing! Innate talents shine and good results come naturally.`
                : `<strong>${p.name} at maximum power!</strong> "${role}" energy maximized in <strong>${house}(${area})</strong>. Innate talents shine.`;
        } else if (p.sign === DEBI[p.id]) {
            dignity = 'Debilitated';
            emoji = '🔴';
            color = '#d9534f';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — may face challenges. But conscious effort leads to great growth. See remedies below.`
                : `<strong>${p.name} weakened.</strong> "${role}" energy weakened in <strong>${house}(${area})</strong>. Challenges but conscious effort leads to growth. See remedies.`;
        } else if (OWN[p.id] && OWN[p.id].includes(p.sign)) {
            dignity = 'Own Sign';
            emoji = '🟡';
            color = '#c9a84c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — stably works in your favor. Good results come naturally.`
                : `<strong>${p.name} at home!</strong> "${role}" energy stably works in <strong>${house}(${area})</strong>. Good results naturally.`;
        } else {
            dignity = 'Neutral';
            emoji = '⚪';
            color = '#999';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> — average influence. Neither particularly strong nor weak.`
                : `${p.name}'s "${role}" energy exerts average influence in <strong>${house}(${area})</strong>. Results vary with other planets.`;
        }

        html += `<div class="interp-card">
            <div class="interp-title">${emoji} ${isEasy ? area + ' — ' : p.symbol + ' ' + p.name + ' — ' + SIGNS[p.sign] + ' ' + SIGN_SYMBOLS[p.sign] + ' → ' + house + 'th (' + area + ') — '}<span style="color:${color}">${isEasy ? (dignity.includes('Exalted') ? 'Very Strong!' : dignity.includes('Debilitated') ? 'Weak' : dignity.includes('Own Sign') ? 'Strong' : 'Average') : dignity}</span></div>
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
        { color: 'Red, Orange', number: '1, 9', day: 'Tuesday', gem: 'Red Coral', dir: 'East' },
        { color: 'White, Pink', number: '2, 6', day: 'Friday', gem: 'Diamond', dir: 'Southeast' },
        { color: 'Green', number: '3, 5', day: 'Wednesday', gem: 'Emerald', dir: 'North' },
        { color: 'White, Silver', number: '2, 7', day: 'Monday', gem: 'Pearl', dir: 'Northwest' },
        { color: 'Gold, Orange', number: '1, 4', day: 'Sunday', gem: 'Ruby', dir: 'East' },
        { color: 'Green, Light Green', number: '5, 3', day: 'Wednesday', gem: 'Emerald', dir: 'South' },
        { color: 'White, Pastel', number: '6, 2', day: 'Friday', gem: 'Diamond', dir: 'West' },
        { color: 'Red, Crimson', number: '9, 1', day: 'Tuesday', gem: 'Red Coral', dir: 'South' },
        { color: 'Yellow, Gold', number: '3, 9', day: 'Thursday', gem: 'Yellow Sapphire', dir: 'Northeast' },
        { color: 'Navy, Black', number: '8, 4', day: 'Saturday', gem: 'Blue Sapphire', dir: 'West' },
        { color: 'Navy, Purple', number: '4, 8', day: 'Saturday', gem: 'Blue Sapphire', dir: 'West' },
        { color: 'Yellow, Gold', number: '3, 7', day: 'Thursday', gem: 'Yellow Sapphire', dir: 'Northeast' }
    ];

    const d = luckyData[lagnaSign];
    const html = `<div class="interp-card">
        <div class="interp-text">
            <strong>🎨 Lucky Color:</strong> ${d.color}<br>
            <strong>🔢 Lucky Number:</strong> ${d.number}<br>
            <strong>📅 Lucky Day:</strong> ${d.day}<br>
            <strong>💎 Lucky Gem:</strong> ${d.gem}<br>
            <strong>🧭 Lucky Direction:</strong> ${d.dir}<br>
            <strong>🪐 Lagna Ruling Planet:</strong> ${['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'][lagnaSign]}
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
        Sun: { gem: 'Ruby', mantra: 'Om Suryaya Namaha', color: 'Orange/red on Sunday', food: 'Wheat, saffron, sunflower seeds', charity: 'Sunday: donate wheat/copper' },
        Moon: { gem: 'Pearl', mantra: 'Om Chandraya Namaha', color: 'White/silver on Monday', food: 'Milk, rice, coconut', charity: 'Monday: donate rice/milk' },
        Mars: { gem: 'Red Coral', mantra: 'Om Mangalaya Namaha', color: 'Red on Tuesday', food: 'Lentils, red fruits', charity: 'Tuesday: donate red lentils' },
        Mercury: { gem: 'Emerald', mantra: 'Om Budhaya Namaha', color: 'Green on Wednesday', food: 'Green beans, green vegetables', charity: 'Wednesday: donate green vegetables' },
        Jupiter: { gem: 'Yellow Sapphire', mantra: 'Om Gurave Namaha', color: 'Yellow on Thursday', food: 'Chickpeas, bananas, turmeric', charity: 'Thursday: donate yellow food/books' },
        Venus: { gem: 'Diamond', mantra: 'Om Shukraya Namaha', color: 'White/pastel on Friday', food: 'Milk, cream, fruits', charity: 'Friday: donate white clothes/rice' },
        Saturn: { gem: 'Blue Sapphire', mantra: 'Om Shanaishcharaya Namaha', color: 'Navy/black on Saturday', food: 'Black beans, sesame', charity: 'Saturday: donate black beans/oil' }
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
                <div class="interp-title">${p.symbol} ${p.name} Strengthening ${isDebi ? '(Debilitated — Especially Important!)' : '(Weak Position)'}</div>
                <div class="interp-text">
                    <strong>💎 Gem:</strong> ${r.gem} (Ring finger recommended)<br>
                    <strong>🙏 mantra:</strong> "${r.mantra}" (108 times daily)<br>
                    <strong>🎨 Color:</strong> ${r.color}<br>
                    <strong>🍽️ Food:</strong> ${r.food}<br>
                    <strong>🤝 Charity:</strong> ${r.charity}
                </div>
            </div>`;
        }
    });

    if (!html) {
        html = '<div class="interp-card"><div class="interp-text">All planets in good positions! No special remedies needed. Wear the gem of your Lagna ruler for luck.</div></div>';
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

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💼 Career Detailed Analysis' : '💼 D10 Career Analysis') + '</div><div class="interp-text">';
        if (isEasy) {
            html += '<strong>Your career tendency:</strong><br>';
        } else {
            html += '<strong>D10 Lagna:</strong> ' + SIGNS[dLagnaSign] + ' (ruler: ' + (RULER_NAMES[d10_1lord]||d10_1lord) + ')<br>';
            html += '<strong>D10 10 house (career):</strong> ' + SIGNS[d10_10sign] + ' (ruler: ' + (RULER_NAMES[d10_10lord]||d10_10lord) + ')<br>';
        }
        if (d10_10planets.length > 0) {
            if (!isEasy) html += '<strong>Planets in 10th:</strong> ' + d10_10planets.map(p => p.name).join(', ') + '<br>';
        }

        // Career 성향 by D10 Lagna
        const careerBySign = [
            'Leadership, Military, Sports, Entrepreneur',  // Aries
            'Finance, Arts, Real Estate, Food Industry',     // Taurus
            'Communication, Media, Education, IT',  // Gemini
            'Nursing, Real Estate, Hotels, Counseling',    // Cancer
            'Politics, Entertainment, Management, Administration',        // Leo
            'Medical, Accounting, Analysis, Research',          // Virgo
            'Law, Diplomacy, Design, Consulting',      // Libra
            'Investigation, Research, Medicine, Insurance',          // Scorpio
            'Education, Religion, Foreign Trade, Publishing',      // Sagittarius
            'Administration, Construction, Mining, Civil Service',        // Capricorn
            'IT, Innovation, NGO, Aviation',           // Aquarius
            'Arts, Hospital, Foreign, Spirituality'           // Pisces
        ];
        html += '<strong>suitable field:</strong> ' + careerBySign[dLagnaSign];
        html += '</div></div>';

    } else if (division === 7) {
        // D7 해석: children
        const d7_5sign = (dLagnaSign + 4) % 12;
        const d7_5lord = SIGN_RULERS[d7_5sign];
        const d7_5planets = dPositions.filter(p => p.dSign === d7_5sign);
        const benefics = d7_5planets.filter(p => p.natural === 'benefic');
        const malefics = d7_5planets.filter(p => p.natural === 'malefic');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👶 children analysis' : '👶 D7 children analysis') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D7 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
            html += '<strong>D7 5 house (children):</strong> ' + SIGNS[d7_5sign] + ' (ruler: ' + (RULER_NAMES[d7_5lord]||d7_5lord) + ')<br>';
        }
        if (d7_5planets.length > 0) {
            if (!isEasy) html += '<strong>5 house planet:</strong> ' + d7_5planets.map(p => p.name).join(', ') + '<br>';
        }
        if (benefics.length > 0) html += (isEasy ? 'Benefic planets — blessed with children.' : 'Benefic planets in 5th house — blessed with children.') + '<br>';
        if (malefics.length > 0) html += (isEasy ? 'Challenge planets — children difficulties possible.' : 'Malefic planets in 5th house — children related difficulties possible.') + '<br>';
        if (d7_5planets.length === 0) html += isEasy ? 'No planets in children position — other factors need analysis.' : '5th house empty — check 5th lord position.';
        html += '</div></div>';

    } else if (division === 12) {
        // D12 해석: 부모
        const d12_4sign = (dLagnaSign + 3) % 12; // 4 house = Mother
        const d12_9sign = (dLagnaSign + 8) % 12; // 9 house = Father
        const d12_4planets = dPositions.filter(p => p.dSign === d12_4sign);
        const d12_9planets = dPositions.filter(p => p.dSign === d12_9sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨‍👩‍👧 Parents Analysis' : '👨‍👩‍👧 D12 Parents Analysis') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D12 Lagna:</strong> ' + SIGNS[dLagnaSign] + '<br>';
        }
        html += '<strong>' + (isEasy ? 'Mother' : 'D12 4 house (Mother): ' + SIGNS[d12_4sign]) + '</strong>';
        if (d12_4planets.length > 0 && !isEasy) html += ' — ' + d12_4planets.map(p => p.name).join(', ');
        html += '<br>';
        html += '<strong>' + (isEasy ? 'Father' : 'D12 9 house (Father): ' + SIGNS[d12_9sign]) + '</strong>';
        if (d12_9planets.length > 0 && !isEasy) html += ' — ' + d12_9planets.map(p => p.name).join(', ');
        html += '<br>';

        const moon4 = d12_4planets.find(p => p.id === 'Moon');
        const sun9 = d12_9planets.find(p => p.id === 'Sun');
        if (moon4) html += (isEasy ? 'Moon in mother position — deep connection with mother.' : 'Moon in 4th house — deep connection with mother.') + '<br>';
        if (sun9) html += (isEasy ? 'Sun in father position — deep connection with father.' : 'Sun in 9th house — deep connection with father.') + '<br>';
        html += '</div></div>';

    } else if (division === 60) {
        // D60 해석: 전생 karma (소챕터 구조)
        const d60_1lord = SIGN_RULERS[dLagnaSign];
        const d60_planets_1 = dPositions.filter(p => p.dSign === dLagnaSign);

        const D60_DEITIES = [
            {name:'Ghora',ko:'Ghora',nature:'malefic',desc:'Destruction and fear. Dark karma from past life'},
            {name:'Rakshasa',ko:'Rakshasa',nature:'malefic',desc:'Demonic energy. Strong desire and attachment'},
            {name:'Deva',ko:'Deva',nature:'benefic',desc:'Divine being. Past life merit and blessings'},
            {name:'Kubera',ko:'Kubera',nature:'benefic',desc:'God of wealth. Wealth-building karma'},
            {name:'Yaksha',ko:'Yaksha',nature:'benefic',desc:'Nature guardian. Harmony with nature'},
            {name:'Kinnara',ko:'Kinnara',nature:'benefic',desc:'Celestial musician. Artistic talent'},
            {name:'Bhrashta',ko:'Bhrashta',nature:'malefic',desc:'The fallen. Karma of falling from high'},
            {name:'Kulaghna',ko:'Kulaghna',nature:'malefic',desc:'Family destroyer. Family-related karma'},
            {name:'Garala',ko:'Garala',nature:'malefic',desc:'Poison. Toxic actions karma'},
            {name:'Vahni',ko:'Vahni',nature:'malefic',desc:'Fire god. Anger and destruction karma'},
            {name:'Maya',ko:'Maya',nature:'malefic',desc:'Illusion. Deception karma'},
            {name:'Purishaka',ko:'Purishaka',nature:'malefic',desc:'Bondage. Restraining others karma'},
            {name:'Apampathi',ko:'Apampathi',nature:'benefic',desc:'Lord of waters. Purification and healing'},
            {name:'Marut',ko:'Marut',nature:'benefic',desc:'Wind god. Freedom and change'},
            {name:'Kala',ko:'Kala',nature:'malefic',desc:'God of time. Time and death karma'},
            {name:'Sarpa',ko:'Sarpa',nature:'malefic',desc:'Serpent. Bondage and attachment — unable to let go'},
            {name:'Amrita',ko:'Amrita',nature:'benefic',desc:'Nectar of immortality. Pursuit of eternal life'},
            {name:'Indu',ko:'Indu',nature:'benefic',desc:'Moon. Sensitivity and intuition'},
            {name:'Mridu',ko:'Mridu',nature:'benefic',desc:'The gentle. Gentleness and compassion'},
            {name:'Komala',ko:'Komala',nature:'benefic',desc:'The delicate. Art and beauty'},
            {name:'Heramba',ko:'Heramba',nature:'benefic',desc:'Ganesha avatar. Overcoming obstacles'},
            {name:'Brahma',ko:'Brahma',nature:'benefic',desc:'Creator god. Creation and knowledge'},
            {name:'Vishnu',ko:'Vishnu',nature:'benefic',desc:'Preserver god. Protection and order'},
            {name:'Maheshwara',ko:'Maheshwara',nature:'benefic',desc:'Great Lord Shiva. Transformation and liberation'},
            {name:'Deva2',ko:'Deva2',nature:'benefic',desc:'Saint. Spiritual practice'},
            {name:'Bala',ko:'Bala',nature:'benefic',desc:'Strength. Fortitude and courage'},
            {name:'Vishwakarma',ko:'Vishwakarma',nature:'benefic',desc:'Cosmic architect. Building and creation'},
            {name:'Tamasa',ko:'Tamasa',nature:'malefic',desc:'Darkness. Ignorance karma'},
            {name:'Kanchana',ko:'Kanchana',nature:'benefic',desc:'Gold. Purity and value'},
            {name:'Varaha',ko:'Varaha',nature:'benefic',desc:'Vishnu boar avatar. Salvation'},
            {name:'Ramasala',ko:'Ramasala',nature:'benefic',desc:'Abode of Rama. Morality and duty'},
            {name:'Ghrisha',ko:'Ghrisha',nature:'benefic',desc:'The radiant. Wisdom and enlightenment'},
            {name:'Indra',ko:'Indra',nature:'benefic',desc:'King of gods. Leadership'},
            {name:'Jala',ko:'Jala',nature:'benefic',desc:'Water. Flow and adaptation'},
            {name:'Vishwa',ko:'Vishwa',nature:'benefic',desc:'Universe. Universal love'},
            {name:'Amara',ko:'Amara',nature:'benefic',desc:'Immortal. Pursuit of eternity'},
            {name:'Bala2',ko:'Bala2',nature:'malefic',desc:'Young strength. Immature power use'},
            {name:'Pitri',ko:'Pitri',nature:'malefic',desc:'Ancestors. Ancestral karma'},
            {name:'Rudra',ko:'Rudra',nature:'malefic',desc:'Storm god. Destructive transformation'},
            {name:'Varuna',ko:'Varuna',nature:'benefic',desc:'Ocean god. Cosmic order'},
            {name:'Aryama',ko:'Aryama',nature:'benefic',desc:'Sun deity. Friendship and contracts'},
            {name:'Mitra',ko:'Mitra',nature:'benefic',desc:'God of friendship. Trust and companionship'},
            {name:'Agni',ko:'Agni',nature:'malefic',desc:'Fire god. Purifying fire'},
            {name:'Varuna2',ko:'Varuna2',nature:'benefic',desc:'Ocean god. Deep wisdom'},
            {name:'Gauri',ko:'Gauri',nature:'benefic',desc:'Parvati. Devotion and love'},
            {name:'Mahakala',ko:'Mahakala',nature:'malefic',desc:'Great Time. Trying to master time'},
            {name:'Pitamaha',ko:'Pitamaha',nature:'benefic',desc:'Great Father Brahma. Creator'},
            {name:'Kartikeya',ko:'Kartikeya',nature:'benefic',desc:'War god. Righteous battle'},
            {name:'Yama',ko:'Yama',nature:'malefic',desc:'God of death. Judgment and justice'},
            {name:'Kala2',ko:'Kala2',nature:'malefic',desc:'Time. Chased by time'},
            {name:'Varuna3',ko:'Varuna3',nature:'benefic',desc:'Ocean god. Law and truth'},
            {name:'Kubera2',ko:'Kubera2',nature:'benefic',desc:'God of wealth. Generosity'},
            {name:'Aditya',ko:'Aditya',nature:'benefic',desc:'Sun god. Light and truth'},
            {name:'Rishi',ko:'Rishi',nature:'benefic',desc:'Sage. Wisdom and practice'},
            {name:'Vasu',ko:'Vasu',nature:'benefic',desc:'Celestial being. Governing nature'},
            {name:'Ashwini',ko:'Ashwini',nature:'benefic',desc:'Twin healers. Healing'},
            {name:'Naga',ko:'Naga',nature:'malefic',desc:'Serpent deity. Mystery and secrets'},
            {name:'Gandharva',ko:'Gandharva',nature:'benefic',desc:'Celestial musician. Art and music'},
            {name:'Prajapati',ko:'Prajapati',nature:'benefic',desc:'Creator. Creating life'},
            {name:'Charachara',ko:'Charachara',nature:'benefic',desc:'All things. Oneness with everything'}
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
            'Warrior, Leader — Wielded power, natural leadership and decisiveness imprinted on the soul.',
            'Artist, Farmer — Worked with nature, deep instinct for stability and material beauty.',
            'Scholar, Merchant — Lived by knowledge, versatility and curiosity remain. Natural talent for language.',
            'Protector, Nurturer — Cared for others, deep sensitivity and maternal instinct. Strong home karma.',
            'Royalty, Priest — Held high status, natural authority and dignity. Standing on stage is soul instinct.',
            'Healer, Server — Practiced medicine or service, excellent analytical skills. Helping others is soul duty.',
            'Diplomat, Artist — Pursued harmony and beauty, skilled in relationships. Partnership is core theme.',
            'Practitioner, Alchemist — Underwent deep transformation, strong attraction to secrets and mystery.',
            'Sage, Explorer — Sought truth, spiritual wisdom and adventurousness remain. Higher learning karma.',
            'Official, Architect — Built order, strong patience and responsibility. Discipline imprinted on soul.',
            'Official, Guardian — Built social order, organizational spirit. Saturn-ruled, duty imprinted on soul.',
            'Medium, Artist — Communed with spiritual world, extremely strong intuition. Closest to liberation.'
        ];

        // 행성별 D60 사인 해석 (전통)
        const d60PlanetInSign = {
            Sun: ['Lived as a warrior or king in past lives. Strong ego and leadership remain. Soul purpose to establish authority.','Lived as an artist or wealthy person. Soul pursues material abundance. Drawn to sensory beauty.','Lived as a scholar or merchant. Knowledge and communication are core soul themes.','Lived as a protector or nurturer. Caring for others is a deep soul instinct.','Held high status as royalty or clergy. Natural authority carries over to this life.','Lived as a healer or server. Analysis and service are the soul purpose.','Lived as a diplomat or artist pursuing harmony. Relationships and balance are the soul task.','Lived as a practitioner or alchemist through deep transformation. Secrets and transformation imprinted on soul.','Lived as a sage or explorer seeking truth. Wisdom and adventure are the soul direction.','Lived as an official or architect building order. System and responsibility engraved in soul.','Lived as a revolutionary or inventor ahead of the times. Originality is the soul trait.','Lived as a medium or artist communing with the spiritual world. Deep intuition remains in soul.'],
            Moon: ['Past life emotional memories are fiercely intense. Anger and passion imprinted in the unconscious. Mastering emotions is the task.','Past life emotional memories are warm and stable. Memories of abundance remain in the unconscious, seeking beauty.','Past life emotional memories are intellectual and varied. Curiosity is strong from many past experiences.','Past life emotional memories are very deep. Strong memories of home and nurturing create rich emotions.','Past life emotional memories are full of pride and dignity. Memories of being recognized and respected remain.','Past life emotional memories relate to service and analysis. Memories of helping others create a caring heart.','Past life emotional memories relate to harmony and relationships. Memories of beautiful connections drive seeking a partner.','Past life emotional memories are deep and intense. Memories of extreme changes create ocean-deep emotions.','Past life emotional memories relate to freedom and exploration. Memories of travel and learning drive expansion.','Past life emotional memories relate to responsibility and patience. Memories of heavy burdens create mature emotions.','Past life emotional memories are unique and extraordinary. Memories of being different create independent sensibility.','Past life emotional memories are spiritual and transcendent. Dreams and visions are vivid with deep spiritual connection.']
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
            return ' — deity: <strong>' + d.deity.name + '</strong>(' + d.deity.ko + ') <span style="color:' + c + ';font-weight:700;">' + (d.deity.nature === 'benefic' ? 'Benefic' : 'Malefic') + '</span>';
        }

        const houseThemes = ['','Self/Existence','Wealth/Value','Communication/Learning','Home/Rest','Creation/Love','Service/Trial','Relationship/Partner','Transformation/Secret','Wisdom/Religion','Society/Career','Wish/Gain','Liberation/Transcendence'];

        // Parasara 인용
        if (!isEasy) {
            html += '<div class="interp-card" style="border-left:3px solid #8b7ec8;"><div class="interp-text" style="font-size:13px;color:#888;">';
            html += '📜 <strong>Parasara says:</strong> "Shashtiamsha (D60) is the most important of all divisional charts. Benefic planets in benefic divisions give good results, malefic planets in malefic divisions give bad results."<br>';
            html += '<span style="color:#666;">— Brihat Parasara Hora Shastra (BPHS)</span></div></div>';
        }

        // ─── 소챕터 1: soul의 정체성 ───
        const lagnaD = getDeity(lagnaSidereal);
        let ch1 = isEasy
            ? '<strong>Past life identity</strong>' + deityTag(lagnaD) + '<br><br>'
            : '<strong>D60 Lagna: ' + SIGNS[dLagnaSign] + ' ' + SIGN_SYMBOLS[dLagnaSign] + '</strong> (ruler: ' + (RULER_NAMES[d60_1lord]||d60_1lord) + ')' + deityTag(lagnaD) + '<br><br>';
        ch1 += pastLifeThemes[dLagnaSign] + '<br>';
        if (lagnaD.deity) {
            ch1 += '<br>' + (isEasy ?
                (lagnaD.deity.nature === 'benefic' ?
                    'You did many good things in past lives, so good opportunities come naturally. Your existence is protected.' :
                    'Unresolved lessons from past lives affect your personality, but overcoming them leads to greater growth.') :
                (lagnaD.deity.nature === 'benefic' ?
                    '<strong>' + lagnaD.deity.ko + '</strong> guards the Lagna. ' + lagnaD.deity.desc + ' — Past life merit protects — good opportunities come naturally.' :
                    '<strong>' + lagnaD.deity.ko + '</strong> influences the Lagna. ' + lagnaD.deity.desc + ' — Karmic challenge imprinted, but overcoming leads to growth.'));
        }
        if (d60_planets_1.length > 0) ch1 += '<br><br>' + d60_planets_1.map(p => p.name).join(', ') + (isEasy ? ' — core past-life karma concentrated in these planets.' : ' positioned in D60 Lagna — Core past-life karma concentrated in these planets.');
        html += subChapter('🪐', 'Soul Identity — Who Were You in Past Lives', ch1);

        // ─── 소챕터 2: soul의 목적 ───
        const sunD60 = dPositions.find(p => p.id === 'Sun');
        if (sunD60) {
            const sunD = getDeity(sunD60.sidereal);
            let ch2 = (isEasy ? '<strong>Sun Past Life Memory</strong>' : '<strong>D60 Sun: ' + SIGNS[sunD60.dSign] + ' ' + SIGN_SYMBOLS[sunD60.dSign] + '</strong>') + deityTag(sunD) + '<br><br>';
            ch2 += (d60PlanetInSign.Sun[sunD60.dSign] || '') + '<br>';
            if (sunD.deity) {
                ch2 += '<br>' + (isEasy ?
                    (sunD.deity.nature === 'benefic' ?
                        'You pursued your true purpose well in past lives, so self-realization comes naturally. Be confident!' :
                        'There was confusion about who you are in past lives. Finding your true self is an important journey that makes you grow.') :
                    (sunD.deity.nature === 'benefic' ?
                        'Sun deity <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. Soul purpose correctly pursued — self-realization comes naturally.' :
                        'Sun deity <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. Past life challenge with self/authority — finding true self is the soul task.'));
            }
            html += subChapter('☉', 'Soul Purpose — Why Were You Born', ch2);
        }

        // ─── 소챕터 3: 감정의 기억 ───
        const moonD60 = dPositions.find(p => p.id === 'Moon');
        if (moonD60) {
            const moonD = getDeity(moonD60.sidereal);
            let ch3 = (isEasy ? '<strong>Moon Past Life Memory</strong>' : '<strong>D60 Moon: ' + SIGNS[moonD60.dSign] + ' ' + SIGN_SYMBOLS[moonD60.dSign] + '</strong>') + deityTag(moonD) + '<br><br>';
            ch3 += (d60PlanetInSign.Moon[moonD60.dSign] || '') + '<br>';
            if (moonD.deity) {
                ch3 += '<br>' + (isEasy ?
                    (moonD.deity.nature === 'benefic' ?
                        'Your mind was peaceful in past lives, so you are emotionally stable with strong intuition. Trust your gut.' :
                        'Traces of emotional hardship from past lives remain deep in your heart. Meditation and being near water greatly helps healing.') :
                    (moonD.deity.nature === 'benefic' ?
                        'Moon deity <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. Mind was peaceful — emotionally stable with strong intuition.' :
                        'Moon deity <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. Emotional wounds remain unconscious. Recognizing and healing is this life emotional task. Meditation and rest near water helps.'));
            }
            html += subChapter('☽', 'Emotional Memory — Unconscious Patterns', ch3);
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
            'Past life warrior/leader connection. Intense, independent spouse karma. Souls who fought or competed together.',
            'Past life artist/wealthy connection. Materially abundant marriage karma. Souls who pursued beauty together.',
            'Past life scholar/merchant connection. Intellectual marriage karma. Souls who studied or traded together.',
            'Past life family/protector connection. Deep emotional bond marriage karma. Souls who cared for each other.',
            'Past life royalty/nobility connection. Splendid, respected marriage karma. Souls who ruled together.',
            'Past life healer/servant connection. Service and devotion marriage karma. Souls who helped others together.',
            'Past life diplomat/artist connection. Harmonious, beautiful marriage karma. Souls who sought balance together.',
            'Past life practitioner/mystic connection. Intense, transformative marriage karma. Souls who shared life and death.',
            'Past life sage/explorer connection. Free, expansive marriage karma. Foreign spouse possible.',
            'Past life official/architect connection. Responsible, stable marriage karma. Late marriage possible.',
            'Past life official/soldier/systematic professional connection. Saturn-ruled sign with responsible, disciplined spouse karma. Souls who practiced social duty together. Marriage may be somewhat late or with age gap.',
            'Past life medium/artist connection. Mystical, spiritual marriage karma. May meet first in dreams.'
        ];

        let ch4 = (isEasy
            ? '<strong>Past Life Spouse Connection</strong><br><br>'
            : '<strong>D60 7 house (spouse): ' + SIGNS[d60H7sign] + ' ' + SIGN_SYMBOLS[d60H7sign] + '</strong> (7 lord: ' + (RULER_NAMES[d60H7lord]||d60H7lord) + ')<br><br>');
        ch4 += spouseKarmaBySign[d60H7sign] + '<br>';

        if (d60H7planets.length > 0) {
            ch4 += '<br><strong>' + (isEasy ? 'Planets in spouse position:' : 'D60 Planets in 7th:') + '</strong><br>';
            d60H7planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (isEasy) {
                    ch4 += (p.natural === 'benefic'
                        ? 'Good past-life connection with spouse — blessings in this life.'
                        : 'Unresolved past-life issues with spouse. Challenges but growth opportunities.') + '<br>';
                } else {
                    ch4 += p.symbol + ' <strong>' + p.name + '</strong>' + deityTag(pD) + '<br>';
                    ch4 += (p.natural === 'benefic'
                        ? 'Benefic in 7th house — Built good karma with spouse in past lives. Blessings from spouse in this life too.'
                        : 'Malefic in 7th house — Unresolved karma with spouse from past lives. Settling it in this life. Challenging but opportunity for growth.') + '<br>';
                }
            });
        }

        // Venus (사랑의 karma)
        if (venusD60) {
            const venD = getDeity(venusD60.sidereal);
            const venH = ((venusD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (isEasy) {
                ch4 += '<br>' + (venD.deity && venD.deity.nature === 'benefic' ?
                    'You loved sincerely in past lives, so beautiful love awaits.' :
                    'Unresolved love lessons from past lives. Learning true love is important and makes you deeper.');
            } else {
                ch4 += '<br><strong>♀ Venus (Planet of Love)</strong> → D60 ' + venH + ' house (' + houseThemes[venH] + ')' + deityTag(venD) + '<br>';
                ch4 += venD.deity && venD.deity.nature === 'benefic' ?
                    'Venus under benefic <strong>' + venD.deity.ko + '</strong> protection. Love practiced well — beautiful love awaits. ' + venD.deity.desc :
                    'Venus under malefic <strong>' + (venD.deity?venD.deity.ko:'') + '</strong> influence. Past love challenges — learning true love is the task. ' + (venD.deity?venD.deity.desc:'');
            }
        }

        // Rahu-Ketu 축 (1-7궁이면 전생 인연)
        if (rahuD60 && ketuD60) {
            const rahuH = ((rahuD60.dSign - dLagnaSign + 12) % 12) + 1;
            const ketuH = ((ketuD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (rahuH === 7 || ketuH === 7 || rahuH === 1 || ketuH === 1) {
                ch4 += isEasy
                    ? '<br><br>🔥 <strong>Very strong past-life connection!</strong> Deep connection with spouse in past lives — destined to meet in this life.'
                    : '<br><br>🔥 <strong>Rahu-Ketu axis on D60 1-7 line!</strong> This indicates a <strong>very strong past-life connection</strong> with your spouse. Destined to meet in this life.';
            }
        }

        // 7 lord의 D60 position
        const h7lordPlanet = dPositions.find(p => p.id === d60H7lord);
        if (h7lordPlanet) {
            const h7lH = ((h7lordPlanet.dSign - dLagnaSign + 12) % 12) + 1;
            const h7lD = getDeity(h7lordPlanet.sidereal);
            if (isEasy) {
                const h7lDesc = h7lH === 1 ? 'Spouse directly connected to your growth.' : h7lH === 4 ? 'Meet spouse through home and sanctuary.' : h7lH === 9 ? 'Spouse connection through foreign/education.' : h7lH === 10 ? 'Spouse connection through career/social.' : h7lH === 12 ? 'Meet spouse in foreign/spiritual settings.' : '';
                if (h7lDesc) ch4 += '<br><br>' + h7lDesc;
            } else {
                ch4 += '<br><br><strong>7 lord ' + (RULER_NAMES[d60H7lord]||d60H7lord) + '</strong> → D60 ' + h7lH + ' house (' + houseThemes[h7lH] + ')' + deityTag(h7lD) + '<br>';
                ch4 += 'Karmic connection with spouse <strong>' + houseThemes[h7lH] + '</strong> manifests through this area. ';
                ch4 += h7lH === 1 ? 'Spouse directly connected to your growth.' : h7lH === 4 ? 'Meet spouse through home and sanctuary.' : h7lH === 9 ? 'Spouse connection through foreign/education.' : h7lH === 10 ? 'Spouse connection through career/social.' : h7lH === 12 ? 'Karma to meet spouse in foreign/spiritual settings.' : '';
            }
        }
        html += subChapter('💍', 'Spouse Karma — Past Life Connection', ch4);

        // ─── 소챕터 5: career karma ───
        const d60H10sign = (dLagnaSign + 9) % 12;
        const d60H10lord = SIGN_RULERS[d60H10sign];
        const d60H10planets = dPositions.filter(p => p.dSign === d60H10sign);
        const satD60 = dPositions.find(p => p.id === 'Saturn');
        const careerKarma = ['military/leadership/sports','finance/art/agriculture','education/media/commerce','nursing/real estate/hospitality','politics/entertainment/management','medical/analysis/service','law/diplomacy/design','research/investigation/medicine','education/religion/foreign','administration/construction/civil servant','technology/science/innovation','art/spirituality/hospital'][d60H10sign];

        let ch5 = (isEasy
            ? '<strong>Past life career karma</strong><br><br>'
            : '<strong>D60 10 house (career): ' + SIGNS[d60H10sign] + ' ' + SIGN_SYMBOLS[d60H10sign] + '</strong> (10 lord: ' + (RULER_NAMES[d60H10lord]||d60H10lord) + ')<br><br>');
        ch5 += 'Past life career karma in <strong>' + careerKarma + '</strong> direction. Natural attraction to this field.<br>';
        if (satD60) {
            const satD = getDeity(satD60.sidereal);
            const satH = ((satD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) ch5 += '<br><strong>♄ Saturn (Lord of Karma)</strong> → D60 ' + satH + ' house (' + houseThemes[satH] + ')' + deityTag(satD) + '<br>';
            ch5 += isEasy ?
                ('<br>' + (satD.deity && satD.deity.nature === 'benefic' ?
                    'This is a <strong>very rare blessing</strong>! Past life patience reduces career challenges in this life.' :
                    'Heavy career lesson from past lives. Steady effort and helping others is the key.')) :
                (satD.deity && satD.deity.nature === 'benefic' ?
                    'Saturn under benefic deity is a <strong>very rare blessing</strong>! Past life patience reduces career trials.' :
                    'Saturn under malefic deity — <strong>heavy past-life karma</strong> in career area. ' + (satD.deity?satD.deity.desc:'') + '. Patience, service, mantra(Om Shanaishcharaya Namaha) to dissolve this karma.');
        }
        if (d60H10planets.length > 0) {
            ch5 += '<br><br><strong>' + (isEasy ? 'Career planets:' : 'D60 Planets in 10th:') + '</strong> ' + d60H10planets.map(p => p.name).join(', ') + ' — Career karma concentrated in these planets.';
        }
        html += subChapter('💼', 'Career Karma — Past Life Calling', ch5);

        // ─── 소챕터 6: wealth karma ───
        const d60H2sign = (dLagnaSign + 1) % 12;
        const d60H2planets = dPositions.filter(p => p.dSign === d60H2sign);
        let ch6 = (isEasy
            ? '<strong>Past life wealth karma</strong><br><br>'
            : '<strong>D60 2 house (wealth): ' + SIGNS[d60H2sign] + ' ' + SIGN_SYMBOLS[d60H2sign] + '</strong><br><br>');
        const wealthKarma = ['Self-made wealth instinct.','Abundant environment past life.','Intellectual wealth building.','Family/property wealth.','Wealth through authority.','Wealth through service. Frugal.','Partnership wealth.','Others wealth (inheritance).','Fortune brings wealth. Foreign.','Slow but sure. Rich after midlife.','Innovation wealth. Unconventional.','Spiritual activity and wealth. Giving.'][d60H2sign];
        ch6 += wealthKarma + '<br>';
        if (d60H2planets.length > 0) {
            ch6 += isEasy ? '<br>' : '<br><strong>D60 2 house planet:</strong><br>';
            d60H2planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                ch6 += (isEasy ? '' : p.symbol + ' ' + p.name + deityTag(pD) + ' — ') + (p.natural === 'benefic' ? 'Good wealth connections from past lives — abundance in this life too.' : 'Wealth lessons from past lives. Steady effort can overcome them.') + '<br>';
            });
        }
        html += subChapter('💰', 'Wealth Karma — Past Life Fortune', ch6);

        // ─── 소챕터 7: 행성별 신 목록 (전문가 모드만) ───
        if (!isEasy) {
            let ch7 = '';
            const lagnaD2 = getDeity(lagnaSidereal);
            if (lagnaD2.deity) {
                const lc = lagnaD2.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                ch7 += '<div style="padding:4px 0;">⬆ Lagna → <strong>' + lagnaD2.deity.name + '</strong>(' + lagnaD2.deity.ko + ') <span style="color:' + lc + ';">' + (lagnaD2.deity.nature === 'benefic' ? 'Benefic' : 'Malefic') + '</span></div>';
            }
            positions.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (pD.deity) {
                    const c = pD.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                    ch7 += '<div style="padding:4px 0;">' + p.symbol + ' ' + p.name + ' → <strong>' + pD.deity.name + '</strong>(' + pD.deity.ko + ') <span style="color:' + c + ';">' + (pD.deity.nature === 'benefic' ? 'Benefic' : 'Malefic') + '</span></div>';
                }
            });
            html += subChapter('🕉️', 'Planetary Deity List', ch7);
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
            '<strong style="color:#5cb85c">' + beneficCount + ' good energy</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' caution energy</strong> out of 9 planets<br><br>' :
            '<strong style="color:#5cb85c">' + beneficCount + ' benefic</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + ' malefic</strong> placement<br><br>';
        if (beneficCount >= 7) {
            ch8 += isEasy ?
                '🌟 <strong>You did so many good things in past lives!</strong> Almost all planets under good energy — naturally getting good results. Strong innate fortune.' :
                '🌟 <strong>Very strong past-life merit.</strong> Parasara called such charts "a soul blessed by the gods". Most planets under benefics — good results naturally.';
        } else if (beneficCount >= 5) {
            ch8 += isEasy ?
                '✨ <strong>Abundant good energy from past lives.</strong> Protected in many areas of life.' :
                '✨ <strong>Abundant past life merit.</strong> Benefics dominate — protected in many areas.';
            if (maleficPlanets.length > 0) ch8 += isEasy ?
                ' However, some areas need more effort.' :
                ' However, karmic challenges exist in <strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong> areas. Practice mantra and charity for these planets.';
        } else if (beneficCount >= 3) {
            ch8 += isEasy ?
                '⚖️ <strong>Good energy and challenging energy are half and half.</strong> Good things and hard things alternate in life.' :
                '⚖️ <strong>Karma in balance.</strong> Mixed fortune — good and challenges alternate.';
            if (maleficPlanets.length > 0) ch8 += '<br>' + (isEasy ? 'Planets to watch: ' : 'Planets to watch: ') + '<strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>';
        } else {
            ch8 += isEasy ?
                '🔥 <strong>This life is about resolving past life lessons.</strong> Many challenges, but those with the heaviest lessons grow the most. Steady effort and helping others is especially important.' :
                '🔥 <strong>A life of karma settlement.</strong> Many challenges from past lives, but Parasara said "the soul with heaviest karma grows the most". Mantra practice and charity are especially important.';
        }
        html += subChapter('📊', 'Overall Karma Assessment', ch8);

        // (이전 코드 제거됨 - 신 목록과 해석은 위 소챕터에 통합)

    } else if (division === 2) {
        // D2 Hora — wealth·부의 축적
        const d2LagnaInterp = ['Self-made wealth. Independent and aggressive investing.','Sensory investment and stable wealth. Real estate, food, art income.','Earning through intellectual activity. Writing, education, business acumen.','Real estate and family income. Property from mother. Watch emotional spending.','Wealth through leadership and authority. Government, gold. Showy spending.','Income through analysis and skills. Medical, accounting, service. Frugal manager.','Wealth through partnership. Law, diplomacy, fashion, art income.','Building wealth through others money (inheritance, insurance, investments). Hidden sources.','Income through education, foreign, religion. Fortune brings wealth.','Systematic effort builds wealth. Slow but sure. Rich after middle age.','Income through technology, innovation, networks. Unconventional sources.','Income through spiritual/artistic activities. Foreign-related wealth. Giving nature.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💰 Wealth Detailed Analysis' : '💰 D2 Hora — Wealth Analysis') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D2 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d2LagnaInterp + '<br><br>';

        const sunD2 = dPositions.find(p => p.id === 'Sun');
        const moonD2 = dPositions.find(p => p.id === 'Moon');
        const jupD2 = dPositions.find(p => p.id === 'Jupiter');
        const venD2 = dPositions.find(p => p.id === 'Venus');

        if (sunD2) {
            const sunInOwn = sunD2.dSign === 4; // Leo
            html += (isEasy ? '' : '<strong>☉ Sun → ' + SIGNS[sunD2.dSign] + ':</strong> ') + (sunInOwn ? (isEasy ? '🌟 <strong>Self-made!</strong> Builds wealth through authority and leadership.' : '🌟 <strong>Sun in own Hora (Leo)!</strong> Self-made type. Builds wealth through authority and leadership.') : (isEasy ? 'Income through others or government/public sector.' : 'Sun in Moon Hora. Income through others help or government/public sector.')) + '<br>';
        }
        if (moonD2) {
            const moonInOwn = moonD2.dSign === 3; // Cancer
            html += (isEasy ? '' : '<strong>☽ Moon → ' + SIGNS[moonD2.dSign] + ':</strong> ') + (moonInOwn ? (isEasy ? '🌟 <strong>Abundant life through public relations!</strong>' : '🌟 <strong>Moon in own Hora (Cancer)!</strong> Abundant life through public and relationships.') : (isEasy ? 'Income through own effort and independent activity.' : 'Moon in Sun Hora. Income through own effort and independent activity.')) + '<br>';
        }
        if (jupD2) html += (isEasy ? '' : '<strong>♃ Jupiter → ' + SIGNS[jupD2.dSign] + ':</strong> ') + (isEasy ? (jupD2.dSign === 4 ? 'Can build great wealth through own ability.' : 'Abundance through relationships with others.') : 'Jupiter in ' + (jupD2.dSign === 4 ? 'Sun Hora — great wealth through own ability.' : 'Moon Hora — abundance through relationships with others.')) + '<br>';
        if (venD2) html += (isEasy ? '' : '<strong>♀ Venus → ' + SIGNS[venD2.dSign] + ':</strong> ') + (isEasy ? (venD2.dSign === 4 ? 'Self-made through art/luxury goods.' : 'Wealth through spouse or partner.') : 'Venus in ' + (venD2.dSign === 4 ? 'Sun Hora — self-made through art/luxury goods.' : 'Moon Hora — wealth through spouse or partner.')) + '<br>';

        // D2 2궁(축적된 부) 분석
        const d2H2sign = (dLagnaSign + 1) % 12;
        const d2H2planets = dPositions.filter(p => p.dSign === d2H2sign);
        html += '<br><strong>' + (isEasy ? 'Accumulated wealth:' : 'D2 2nd house (accumulated wealth) — ' + SIGNS[d2H2sign] + ':') + '</strong><br>';
        if (d2H2planets.length > 0) {
            d2H2planets.forEach(p => {
                const wealth = {Sun:'Wealth through authority and status',Moon:'Fluid wealth through public activities',Mars:'Wealth in real estate, technology, competitive fields',Mercury:'Wealth in business, intellectual, communication fields',Jupiter:'Abundant wealth in education, religion, law fields',Venus:'Wealth related to art, fashion, luxury goods',Saturn:'Slow but steady wealth. Stable after middle age',Rahu:'Wealth through unconventional methods or foreign sources',Ketu:'Detached from material. Pursues spiritual values'};
                html += isEasy ? (wealth[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (wealth[p.id]||'') + '<br>';
            });
        } else {
            html += isEasy ? 'Steadily accumulates wealth.<br>' : '2nd house empty — 2nd house lord position is key to wealth accumulation.<br>';
        }
        html += '</div></div>';

    } else if (division === 3) {
        // D3 Drekkana — sibling·용기·소통
        const d3LagnaInterp = ['Independent, leadership among siblings. Brave communication style.','Stable, materially comfortable sibling relationships. Artistic siblings possible.','Intellectual, communicative siblings. Many siblings or lots of conversation.','Emotionally deep sibling bond. Motherly sibling. Protective siblings.','Charismatic, proud siblings. Famous or successful sibling.','Analytical, practical siblings. Medical/education field. Can be critical.','Diplomatic, charming siblings. Social connections through siblings.','Intense, secretive sibling relationships. Deep bonds after conflicts.','Free, philosophical siblings. Siblings abroad. Religion/education related.','Responsible, ambitious siblings. Sense of duty. Siblings few or serious relationship.','Unique, independent siblings. Unconventional sibling relationships.','Spiritual, artistic siblings. Siblings abroad. Emotional connection.'][dLagnaSign];

        const d3_3sign = (dLagnaSign + 2) % 12;
        const d3_11sign = (dLagnaSign + 10) % 12;
        const d3_3planets = dPositions.filter(p => p.dSign === d3_3sign);
        const d3_11planets = dPositions.filter(p => p.dSign === d3_11sign);
        const marsD3 = dPositions.find(p => p.id === 'Mars');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👫 Siblings & Courage Analysis' : '👫 D3 Drekkana — Siblings & Courage') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D3 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d3LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Younger siblings:' : 'D3 3 house (younger) — ' + SIGNS[d3_3sign] + ':') + '</strong><br>';
        if (d3_3planets.length > 0) {
            const bro = {Sun:'Younger sibling has leadership and authority',Moon:'Emotionally close with younger sibling',Mars:'Active and brave younger sibling. Arguments possible',Mercury:'Younger sibling is intellectual with good communication',Jupiter:'Younger sibling is wise and brings fortune',Venus:'Younger sibling is charming and artistic',Saturn:'Difficulty with younger sibling. Age gap possible',Rahu:'Younger sibling is unique or foreign-related',Ketu:'Distance with younger sibling. Spiritual connection'};
            d3_3planets.forEach(p => { html += isEasy ? (bro[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (bro[p.id]||'') + '<br>'; });
        } else html += isEasy ? '' : '3rd house empty — check 3rd lord position.<br>';

        html += '<br><strong>' + (isEasy ? 'Older siblings:' : 'D3 11th house (older siblings) — ' + SIGNS[d3_11sign] + ':') + '</strong><br>';
        if (d3_11planets.length > 0) {
            d3_11planets.forEach(p => { html += isEasy ? 'Influences older sibling relationship.<br>' : '• ' + p.name + ' in 11th house — influences relationship with older siblings.<br>'; });
        } else html += isEasy ? '' : '11 house no planets.<br>';

        if (marsD3) {
            const marsH = ((marsD3.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♂ Mars (sibling karaka):</strong> ';
            html += marsH <= 4 ? 'Close sibling relationship. Courageous siblings.' : marsH <= 8 ? 'Sibling conflicts or transformation through siblings.' : 'Siblings abroad or spiritual tendency.';
        }
        html += '</div></div>';

    } else if (division === 4) {
        // D4 Chaturthamsha — 재산·부동산·행운
        const d4LagnaInterp = ['Actively acquires property. Likes building or buying new homes.','Stable, abundant real estate. Land and farms. Luxurious dwelling.','Multiple homes or frequent moves. Prefers intellectual environment.','Home and property are emotionally important. Near water. Property from mother.','Grand, spacious home. Luxurious interior. Prestigious area.','Clean, practical dwelling. Health-focused environment. Multiple small properties.','Beautiful, harmonious home. Interest in interior design. Property with partner.','Property undergoes transformation. Inherited property. Secret places.','Large land and foreign property. Near religious/educational facilities.','Systematic property investment. Old buildings. Slow but sure asset growth.','Unique dwelling style. Modern apartment. Tech-related facilities.','Beautiful home near water. Foreign property. Spiritual space.'][dLagnaSign];

        const d4_4sign = (dLagnaSign + 3) % 12;
        const d4_4planets = dPositions.filter(p => p.dSign === d4_4sign);
        const d4_10sign = (dLagnaSign + 9) % 12;
        const d4_10planets = dPositions.filter(p => p.dSign === d4_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🏠 Property & Fortune Analysis' : '🏠 D4 Chaturthamsha — Property & Fortune Analysis') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D4 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d4LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Property/Home:' : 'D4 4 house (real estate/home) — ' + SIGNS[d4_4sign] + ':') + '</strong><br>';
        if (d4_4planets.length > 0) {
            const prop = {Sun:'Government-owned building or prestigious residence',Moon:'Beautiful home. Near water. Mother\'s influence',Mars:'New home construction. Real estate disputes possible',Mercury:'Commercial real estate. Multiple properties',Jupiter:'Spacious, abundant home! Best real estate fortune',Venus:'Luxurious home. Beautiful interior',Saturn:'Old property. Repairs needed. Stable after middle age',Rahu:'Foreign real estate. Unconventional dwelling',Ketu:'Indifferent to real estate. Prefers spiritual spaces'};
            d4_4planets.forEach(p => { html += isEasy ? (prop[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (prop[p.id]||'') + '<br>'; });
        } else html += isEasy ? 'Stable real estate fortune.<br>' : '4th house empty — 4th lord position is key to real estate fortune.<br>';

        html += '<br><strong>' + (isEasy ? 'Overall fortune:' : 'D4 10th house (overall fortune) — ' + SIGNS[d4_10sign] + ':') + '</strong><br>';
        if (d4_10planets.length > 0) {
            d4_10planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Overall fortune is good!<br>' : 'Effort needed but growth opportunity.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Benefic in 10th house — overall fortune is good!' : 'Malefic in 10th house — effort needed for fortune but opportunity for growth.') + '<br>';
            });
        } else html += isEasy ? '' : '10 house no planets.<br>';
        html += '</div></div>';

    } else if (division === 16) {
        // D16 Shodashamsha — 차량·comfort·행복
        const d16LagnaInterp = ['Sports cars, motorcycles — dynamic vehicles. Enjoys driving.','Premium vehicles and comfortable transport. Luxurious material comfort.','Multiple vehicles or various transport. Likes tech gadgets.','Comfortable family vehicle. Traveling with family. Material stability is happiness.','Top luxury vehicles. Flashy spending. Prefers premium brands.','Practical and fuel-efficient vehicles. Health-related devices.','Refined, well-designed vehicle. Aesthetically pleasing items.','Used or inherited vehicle. Insurance important. Transformative material experience.','SUV or foreign brands. Travel vehicle. Adventurous transport.','Simple but sturdy vehicle. Practicality first. Better car after middle age.','Electric or latest tech vehicle. Unique transport.','Water-related transport (boat). Emotionally favorite items.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🚗 Vehicles & Comfort' : '🚗 D16 Shodashamsha — Vehicles & Comfort') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D16 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d16LagnaInterp + '<br><br>';

        const d16_4sign = (dLagnaSign + 3) % 12;
        const d16_4planets = dPositions.filter(p => p.dSign === d16_4sign);
        html += '<strong>' + (isEasy ? 'Comfort/Happiness:' : 'D16 4th house (comfort/happiness) — ' + SIGNS[d16_4sign] + ':') + '</strong><br>';
        if (d16_4planets.length > 0) {
            d16_4planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Abundant material comfort and happiness!<br>' : 'Effort needed for material comfort.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Material comfort and happiness abundant!' : 'Effort needed for material comfort.') + '<br>';
            });
        } else html += isEasy ? 'Average material comfort.<br>' : '4th house empty — 4th lord position is key to happiness.<br>';

        const venD16 = dPositions.find(p => p.id === 'Venus');
        if (venD16) {
            const vH = ((venD16.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♀ Venus (comfort karaka):</strong> ';
            html += [,'Creates own comfort','Comfort through wealth','Happiness through communication','Great happiness at home!','Happiness through children/romance','Comfort through health management','Happiness through spouse!','Happiness through transformation','Happiness through travel/learning','Comfort through social status','Happiness through friends/network','Happiness through spiritual peace'][vH] || '';
        }
        html += '</div></div>';

    } else if (division === 20) {
        // D20 Vimshamsha — 영적 practice·종교
        const d20LagnaInterp = ['Active spirituality. Karma yoga. Practice through active service.','Spirituality through nature and senses. Mantra practice. Temple meditation.','Intellectual spirituality. Scripture research. Awakening through knowledge rather than meditation.','Emotional spirituality. Bhakti yoga (devotion). Drawn to maternal divinity.','Royal spirituality. Spiritual practice as leader. Sun worship.','Spirituality of service. Practice through seva (service). Health and healing related spirituality.','Harmony spirituality. Divine experience through art and beauty. Tantra.','Deep transformative spirituality. Tantra, Kundalini. Death and rebirth practice.','Seeker spirituality. Pilgrimage. Searching for a teacher. Philosophical practice.','Traditional spirituality. Systematic practice. Karma yoga. Practice of patience.','Innovative spirituality. Unconventional methods. Service for humanity.','Transcendent spirituality. Meditation, dreams, intuition. Mystical experiences. Liberation.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🙏 Spirituality' : '🙏 D20 Vimshamsha — Spirituality') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D20 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d20LagnaInterp + '<br><br>';

        const jupD20 = dPositions.find(p => p.id === 'Jupiter');
        const sunD20 = dPositions.find(p => p.id === 'Sun');
        const ketuD20 = dPositions.find(p => p.id === 'Ketu');
        const d20_9sign = (dLagnaSign + 8) % 12;
        const d20_12sign = (dLagnaSign + 11) % 12;
        const d20_9planets = dPositions.filter(p => p.dSign === d20_9sign);

        if (jupD20) {
            const jH = ((jupD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♃ Jupiter (Spiritual Teacher) → ' + jH + 'th:</strong> ') + ([,'Strong spiritual self','Spiritual knowledge becomes wealth','Spiritual communication ability','Deep inner peace','Past life spiritual merit','Spirituality through service','Meeting a teacher','Secret spiritual knowledge','Best placement! Great spiritual fortune','Spiritual authority','Spiritual community','Liberation and awakening'][jH] || '') + '<br>';
        }
        if (ketuD20) {
            const kH = ((ketuD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☋ Ketu (Liberation) → ' + kH + 'th:</strong> ') + ([,'Innate spiritual ability','Spiritual values','Spiritual communication','Deep inner liberation','Result of past life practice','Serving soul','Spiritual growth through spouse','Deep transformative spirituality','Spiritual pilgrim','Spiritual career','Leader of spiritual community','Soul near liberation'][kH] || '') + '<br>';
        }
        html += '<br><strong>' + (isEasy ? 'Guru/Teacher:' : 'D20 9th house (guru/teacher) — ' + SIGNS[d20_9sign] + ':') + '</strong><br>';
        if (d20_9planets.length > 0) {
            d20_9planets.forEach(p => { html += isEasy ? 'Strong spiritual teacher connection.<br>' : '• ' + p.name + ': Strong connection with spiritual teacher.<br>'; });
        } else html += isEasy ? 'Good to actively seek a spiritual teacher.<br>' : '9th house empty — actively seek a spiritual teacher.<br>';
        html += '</div></div>';

    } else if (division === 24) {
        // D24 차투르Vimshamsha — 교육·학문
        const d24LagnaInterp = ['Physical education, military, leadership training.','Music, art, culinary, finance education.','Language, literature, communication, media education.','History, psychology, home science education.','Political science, theater, business education.','Medicine, science, statistics education. Precise learning.','Law, diplomacy, design education. Balanced learning.','Psychology, research, investigation, occult education.','Philosophy, theology, international studies. Study abroad likely.','Business, administration, architecture. Systematic learning.','IT, engineering, aviation, social science. Innovative learning.','Art, music, spirituality, film studies. Intuitive learning.'][dLagnaSign];

        const d24_4sign = (dLagnaSign + 3) % 12;
        const d24_5sign = (dLagnaSign + 4) % 12;
        const d24_4planets = dPositions.filter(p => p.dSign === d24_4sign);
        const d24_5planets = dPositions.filter(p => p.dSign === d24_5sign);
        const jupD24 = dPositions.find(p => p.id === 'Jupiter');
        const merD24 = dPositions.find(p => p.id === 'Mercury');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '📚 Education Analysis' : '📚 D24 Chaturvimshamsha — Education Analysis') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D24 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d24LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Basic Education:' : 'D24 4th house (basic education) — ' + SIGNS[d24_4sign] + ':') + '</strong><br>';
        if (d24_4planets.length > 0) {
            d24_4planets.forEach(p => {
                const edu4 = {Sun:'Prestigious school. Authoritative education',Moon:'Comfortable learning environment. Strong home education influence',Mars:'Competitive learning. Physical/technical education strong',Mercury:'Best placement! Outstanding academic ability',Jupiter:'Rich educational environment. Good teachers',Venus:'Art education. Beautiful school',Saturn:'Difficult education environment but deep knowledge if overcome',Rahu:'Unconventional education. Foreign school',Ketu:'Less interest in education. Intuitive learning'};
                html += isEasy ? (edu4[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (edu4[p.id]||'') + '<br>';
            });
        } else html += isEasy ? 'Grows steadily in stable educational environment.<br>' : '4 house no planets.<br>';

        html += '<br><strong>' + (isEasy ? 'Higher Education:' : 'D24 5th house (higher education/intellect) — ' + SIGNS[d24_5sign] + ':') + '</strong><br>';
        if (d24_5planets.length > 0) {
            d24_5planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? 'Outstanding achievement in higher education!<br>' : 'Academic challenges lead to growth.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? 'Outstanding higher education achievement!' : 'Academic challenges lead to growth.') + '<br>';
            });
        } else html += isEasy ? 'Steady effort brings good results.<br>' : '5 house no planets.<br>';

        if (jupD24) {
            const jH = ((jupD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '<br>' : '<br><strong>♃ Jupiter (Wisdom) → ' + jH + 'th:</strong> ') + ([1,4,5,9].includes(jH) ? '🎓 <strong>High academic achievement expected!</strong> Graduate/doctoral/study abroad possible.' : (isEasy ? 'Growth through academics expected.' : 'Growth through academics. Jupiter\'s blessing manifests in ' + jH + 'th house area.')) + '<br>';
        }
        if (merD24) {
            const mH = ((merD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☿ Mercury (Learning) → ' + mH + 'th:</strong> ') + ([1,4,5,9].includes(mH) ? '📖 <strong>Outstanding intellect!</strong> Talent in math, language, analysis.' : (isEasy ? 'Intellectual ability well expressed.' : 'Intellectual ability in ' + mH + 'th house area.')) + '<br>';
        }
        html += '</div></div>';

    } else if (division === 27) {
        // D27 삽타Vimshamsha — 체력·강점·약점
        const d27LagnaInterp = ['Strong stamina and energy. Excellent athletic ability. Head/face is strength.','Endurance and patience are strengths. Neck/vocal cords strong. Good muscle power.','Agility and reflexes strong. Nervous system care needed.','Emotional resilience is strength. Watch chest/stomach. Talent for swimming.','Heart and spine are strong. Charismatic physique. Watch for overwork.','Digestive and analytical power are strengths. Watch intestines/skin. Yoga suitable.','Balanced, harmonious physique. Watch kidneys/back. Dancing suits you.','Recovery and resistance are strengths. Watch reproductive health. Extreme sports possible.','Thighs and liver are strong. Outdoor exercise suitable. Watch for overweight.','Bones and joints are strong. Best patience. Healthier with age.','Watch circulatory system and ankles. Prefers unique exercise. Innovative health methods.','Immunity and intuition are strengths. Watch feet/lymph. Aquatic exercise suitable.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💪 Physical Strength Analysis' : '💪 D27 Saptavimshamsha — Physical Strength Analysis') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D27 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d27LagnaInterp + '<br><br>';

        const marsD27 = dPositions.find(p => p.id === 'Mars');
        const sunD27 = dPositions.find(p => p.id === 'Sun');
        const satD27 = dPositions.find(p => p.id === 'Saturn');
        if (marsD27) {
            const mH = ((marsD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♂ Mars (Energy) → ' + mH + 'th:</strong> ') + ([,'Strong physique and will!','Can earn through physical strength','Courage and adventurous spirit strong','Home exercise type','Sports talent!','Immunity to overcome disease','Exercise with spouse','Survival strength in crisis','Strong in adventure/exploration','Physical strength for career','Goal achievement energy','Physical activity abroad'][mH] || '') + '<br>';
        }
        if (sunD27) {
            const sH = ((sunD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☉ Sun (Vitality) → ' + sH + 'th:</strong> ') + (isEasy ? 'Source of vitality: ' : 'Source of vitality in ' + sH + 'th house area. ') + ([,'Energy from self','Vitality from wealth activities','Energy from communication','Stability from home','Vitality from creation','Energy from service','Vitality from relationships','Energy from transformation','Vitality from travel','Energy from career','Vitality from society','Energy from spiritual practice'][sH] || '') + '<br>';
        }

        // D27 6 house (약점/질병) 분석
        const d27_6sign = (dLagnaSign + 5) % 12;
        const d27_6planets = dPositions.filter(p => p.dSign === d27_6sign);
        html += '<br><strong>' + (isEasy ? 'Weakness:' : 'D27 6th house (weakness/vulnerability) — ' + SIGNS[d27_6sign] + ':') + '</strong><br>';
        const bodyParts = ['Head/Brain','Neck/Thyroid','Lungs/Arms','Stomach/Chest','Heart/Back','Digestive/Intestines','Kidneys/Lower back','Reproductive','Liver/Thighs','Bones/Joints','Ankles/Circulatory','Feet/Immune'];
        html += 'Vulnerable area: <strong>' + bodyParts[d27_6sign] + '</strong> — watch this area carefully.<br>';
        if (d27_6planets.length > 0) {
            d27_6planets.forEach(p => { html += isEasy ? 'Special attention needed for this area.<br>' : '• ' + p.name + ' in 6th house — special attention needed for this area.<br>'; });
        }
        html += '</div></div>';

    } else if (division === 30) {
        // D30 Trimshamsha — 불행·질병·장애
        const d30LagnaInterp = ['Accidents, burns, headaches. Problems from hasty decisions. Manage anger.','Financial loss, dietary issues, thyroid. Watch overeating and attachment.','Nervous anxiety, insomnia, breathing problems. Avoid excessive worry.','Emotional instability, stomach issues, water-related problems. Control emotions.','Heart problems, pride damage, overwork. Need humility and rest.','Digestive disorders, allergies, perfectionism stress. Need relaxation.','Kidney problems, relationship conflicts, indecisiveness. Need decisiveness.','Secrets, accidents, surgery, sexual issues. Regular checkups important.','Liver problems, overweight, gambling/overspending. Need moderation.','Joint, bone, depression, loneliness. Need calcium and social interaction.','Blood pressure, circulation, unexpected accidents. Regular health checks.','Immune deficiency, addiction, mental health. Need meditation and sleep.'][dLagnaSign];

        const d30_6sign = (dLagnaSign + 5) % 12;
        const d30_8sign = (dLagnaSign + 7) % 12;
        const d30_12sign = (dLagnaSign + 11) % 12;
        const d30_6planets = dPositions.filter(p => p.dSign === d30_6sign);
        const d30_8planets = dPositions.filter(p => p.dSign === d30_8sign);
        const d30_12planets = dPositions.filter(p => p.dSign === d30_12sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '⚠️ Health Caution Details' : '⚠️ D30 Trimshamsha — Disease') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D30 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d30LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? 'Disease caution:' : 'D30 6th house (disease/enemy) — ' + SIGNS[d30_6sign] + ':') + '</strong><br>';
        const diseaseBySign = ['Headache, fever, inflammation','Neck, thyroid, diabetes','Lungs, nerves, anxiety','Stomach, water retention','Heart, back, blood pressure','Digestive, intestines, skin','Kidneys, lower back, urinary','Reproductive, chronic conditions','Liver, thighs, overweight','Bones, joints, rheumatism','Circulatory, blood pressure, ankles','Immune, feet, mental health'];
        html += 'Watch for: <strong>' + diseaseBySign[d30_6sign] + '</strong><br>';
        if (d30_6planets.length > 0) {
            const dis = {Sun:'Watch for eye and heart related disease',Moon:'Mental health and water retention issues',Mars:'Watch for accidents, surgery, burns',Mercury:'Nervous system and skin problems',Jupiter:'Watch for liver and overweight',Venus:'Watch for kidney, diabetes, STD',Saturn:'Chronic disease, joint problems',Rahu:'Unknown cause disease, addiction',Ketu:'Lowered immunity, allergy'};
            d30_6planets.forEach(p => { html += isEasy ? (dis[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (dis[p.id]||'') + '<br>'; });
        }

        html += '<br><strong>' + (isEasy ? 'Danger/Surgery:' : 'D30 8 house (danger/surgery) — ' + SIGNS[d30_8sign] + ':') + '</strong><br>';
        if (d30_8planets.length > 0) {
            d30_8planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Danger/accident caution. Insurance important.' : 'Protected in crisis.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Danger/accident caution. Insurance important.' : 'Protected in crisis.') + '<br>'; });
        } else html += isEasy ? 'Few big dangers.<br>' : '8th house empty — few major dangers.<br>';

        html += '<br><strong>' + (isEasy ? 'Hospitalization:' : 'D30 12th house (hospitalization/loss) — ' + SIGNS[d30_12sign] + ':') + '</strong><br>';
        if (d30_12planets.length > 0) {
            d30_12planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? 'Hospitalization possible.' : 'Spiritual healing and recovery.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? 'Hospitalization possible. Foreign medical.' : 'Spiritual healing and recovery.') + '<br>'; });
        } else html += isEasy ? 'Low hospitalization risk.<br>' : '12th house empty — hospitalization risk is low.<br>';
        html += '</div></div>';

    } else if (division === 40) {
        // D40 Khavedamsha — 모계 유산
        const d40LagnaInterp = ['Independent, strong-willed mother. Leadership inherited from maternal line.','Mother manages wealth well. Material abundance from maternal line.','Intellectual mother with good communication. Language/education talent inherited.','Very deep bond with mother. Sensitivity and intuition inherited.','Mother has authority and dignity. Leadership and honor inherited.','Mother excels at health management. Analytical/service spirit inherited.','Attractive, diplomatic mother. Artistic sense inherited.','Strong mother who went through transformation. Resilience inherited.','Educational, religious mother. Wisdom/philosophy inherited.','Responsible, strict mother. Patience and discipline inherited.','Unique, progressive mother. Innovative thinking inherited.','Spiritual, intuitive mother. Art/spirituality inherited.'][dLagnaSign];

        const d40_4sign = (dLagnaSign + 3) % 12;
        const d40_4planets = dPositions.filter(p => p.dSign === d40_4sign);
        const moonD40 = dPositions.find(p => p.id === 'Moon');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👩 Maternal Heritage' : '👩 D40 Khavedamsha — Maternal Heritage') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D40 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d40LagnaInterp + '<br><br>';

        if (moonD40) {
            const mH = ((moonD40.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☽ Moon (Mother karaka):</strong> ';
            html += [,'Mother has strong influence','Wealth from mother','Good communication with mother','Deep bond with mother! Best placement','Mother is creative','Mother is service-oriented','Mother influences relationships','Inheritance from mother','Mother is religious/educational','Mother has social status','Mother is independent','Mother is spiritual'][mH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Maternal family:' : 'D40 4th house (maternal home) — ' + SIGNS[d40_4sign] + ':') + '</strong><br>';
        if (d40_4planets.length > 0) {
            d40_4planets.forEach(p => { html += isEasy ? 'Strongly inherited energy from maternal side.<br>' : '• ' + p.name + ': This planet\'s energy is strongly inherited from maternal line.<br>'; });
        } else html += isEasy ? 'Stable heritage from maternal side.<br>' : '4th house empty — 4th lord position is key to maternal heritage.<br>';
        html += '</div></div>';

    } else if (division === 45) {
        // D45 Akshavedamsha — 부계 유산
        const d45LagnaInterp = ['Active, action-oriented father. Courage and leadership inherited.','Financially stable father. Material values inherited.','Intellectual, versatile father. Communication/business ability inherited.','Emotional, family-oriented father. Caring instinct inherited.','Authoritative, respected father. Leadership inherited.','Practical, diligent father. Analytical/technical skills inherited.','Diplomatic, refined father. Social ability inherited.','Strong, mysterious father. Resilience/insight inherited.','Scholarly, religious father. Philosophy/morality inherited.','Strict, ambitious father. Patience/discipline inherited.','Creative, innovative father. Tech/scientific thinking inherited.','Spiritual, artistic father. Intuition/creativity inherited.'][dLagnaSign];

        const d45_9sign = (dLagnaSign + 8) % 12;
        const d45_9planets = dPositions.filter(p => p.dSign === d45_9sign);
        const sunD45 = dPositions.find(p => p.id === 'Sun');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨 Paternal Heritage' : '👨 D45 Akshavedamsha — Paternal Heritage') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D45 Lagna: ' + SIGNS[dLagnaSign] + '</strong><br>') + d45LagnaInterp + '<br><br>';

        if (sunD45) {
            const sH = ((sunD45.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☉ Sun (Father karaka):</strong> ';
            html += [,'Father has strong influence','Wealth from father','Good communication with father','Father is family-oriented','Father is creative','Father is service-oriented','Father influences relationships','Inheritance from father','Father is religious/educational','Father succeeds in society! Best placement','Father is independent','Father is spiritual'][sH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? 'Paternal family:' : 'D45 9th house (paternal home/father) — ' + SIGNS[d45_9sign] + ':') + '</strong><br>';
        if (d45_9planets.length > 0) {
            d45_9planets.forEach(p => { html += isEasy ? 'Strongly inherited energy from paternal side.<br>' : '• ' + p.name + ': This planet\'s energy is strongly inherited from paternal line.<br>'; });
        } else html += isEasy ? 'Stable heritage from paternal side.<br>' : '9th house empty — 9th lord position is key to paternal heritage.<br>';
        html += '</div></div>';
    }

    interpEl.innerHTML = html;
}

