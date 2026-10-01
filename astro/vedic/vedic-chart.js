// ============================================================
// VEDIC ASTROLOGY ENGINE
// ============================================================
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
    renderDivisionalChart(d.positions, d.lagnaSidereal, 10, 'd10Chart', 'd10InterpWrap', 'D10', '다샴샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 7, 'd7Chart', 'd7InterpWrap', 'D7', '삽탐샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 12, 'd12Chart', 'd12InterpWrap', 'D12', '드와다샴샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 60, 'd60Chart', 'd60InterpWrap', 'D60', '샤슈티암샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 2, 'd2Chart', 'd2InterpWrap', 'D2', '호라');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 3, 'd3Chart', 'd3InterpWrap', 'D3', '드레카나');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 4, 'd4Chart', 'd4InterpWrap', 'D4', '차투르탐샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 16, 'd16Chart', 'd16InterpWrap', 'D16', '쇼다샴샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 20, 'd20Chart', 'd20InterpWrap', 'D20', '빔샴샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 24, 'd24Chart', 'd24InterpWrap', 'D24', '차투르빔샴샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 27, 'd27Chart', 'd27InterpWrap', 'D27', '삽타빔샴샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 30, 'd30Chart', 'd30InterpWrap', 'D30', '트림샴샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 40, 'd40Chart', 'd40InterpWrap', 'D40', '카베담샤');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 45, 'd45Chart', 'd45InterpWrap', 'D45', '악샤베담샤');
}
function updateCatHeaders() {
    var e = window.vedicMode === 'easy';
    var ids = {
        catGuide: '📚 가이드',
        catBasic: '🪐 차트',
        catDasha: e ? '⏳ 대운' : '⏳ 대운',
        catInterp: e ? '📖 종합' : '📖 종합',
        catMarriage: e ? '💍 결혼' : '💍 결혼',
        catCareer: e ? '💼 직업' : '💼 직업',
        catFamily: e ? '👨‍👩‍👧 가족' : '👨‍👩‍👧 가족',
        catSpirit: e ? '🙏 영성' : '🙏 영성',
        catWarn: e ? '⚠️ 주의' : '⚠️ 주의',
        catKarma: e ? '🔮 카르마' : '🔮 카르마'
    };
    for (var id in ids) { var el = document.getElementById(id); if (el) el.textContent = ids[id]; }

    // 섹션 제목도 업데이트
    var secs = {
        secPlanetHouse: e ? '🪐 각 행성이 당신에게 미치는 영향' : '🪐 행성별 상세 해석',
        secDignity: e ? '⚖️ 당신의 강점과 약점' : '⚖️ 행성 품위 (고양·감쇄·본궁)',
        secLucky: e ? '🍀 행운의 정보' : '🍀 행운의 정보',
        secRemedy: e ? '💎 운을 높이는 방법' : '💎 치유 & 강화 방법',
        secD10: e ? '💼 직업·커리어 상세' : '💼 D10 다샴샤 (직업·커리어)',
        secD2: e ? '💰 재물·부 상세' : '💰 D2 호라 (재물·부)',
        secD4: e ? '🏠 재산·부동산' : '🏠 D4 차투르탐샤 (재산·부동산)',
        secD7: e ? '👶 자녀·후손' : '👶 D7 삽탐샤 (자녀·후손)',
        secD3: e ? '👫 형제·용기' : '👫 D3 드레카나 (형제·용기)',
        secD12: e ? '👨‍👩‍👧 부모·가계' : '👨‍👩‍👧 D12 드와다샴샤 (부모·가계)',
        secD40: e ? '👩 어머니 쪽 유산' : '👩 D40 카베담샤 (모계 유산)',
        secD45: e ? '👨 아버지 쪽 유산' : '👨 D45 악샤베담샤 (부계 유산)',
        secD24: e ? '📚 교육·학문' : '📚 D24 차투르빔샴샤 (교육·학문)',
        secD20: e ? '🙏 영적 수행·종교' : '🙏 D20 빔샴샤 (영적 수행·종교)',
        secD27: e ? '💪 체력·강점' : '💪 D27 삽타빔샴샤 (체력·강점)',
        secD16: e ? '🚗 차량·편의·행복' : '🚗 D16 쇼다샴샤 (차량·편의·행복)',
        secD30: e ? '⚠️ 건강 주의사항 상세' : '⚠️ D30 트림샴샤 (불행·질병·장애)',
        secForeign: e ? '✈️ 해외운 & 이주' : '✈️ 해외운 & 이주 (9궁·12궁)'
    };
    for (var sid in secs) { var sel = document.getElementById(sid); if (sel) sel.textContent = secs[sid]; }
}
function renderEasyMode(positions, lagnaSign, moonPos) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    var html = '';
    // 성격
    var personality = ['행동파! 결단력이 빠르고 리더 기질이 있어요. 새로운 도전을 좋아합니다.','안정을 사랑해요. 편안하고 아름다운 것을 좋아하며, 한번 마음먹으면 끝까지 가는 타입.','호기심 대왕! 말을 잘하고 다재다능해요. 여러 가지를 동시에 하는 걸 좋아합니다.','감성적이고 따뜻해요. 가족을 소중히 여기고, 사람들의 마음을 잘 읽어요.','타고난 리더! 존재감이 크고 창작 활동에 재능이 있어요.','꼼꼼하고 분석적이에요. 완벽을 추구하며 건강에 관심이 많습니다.','조화를 추구해요. 세련되고 매력적이며, 예술적 감각이 뛰어납니다.','깊이가 있어요. 직관이 강하고 본질을 꿰뚫어 봐요.','자유로운 영혼! 여행과 배움을 사랑하며, 긍정적이에요.','야망이 있어요. 인내심이 강하고 나이 들수록 매력이 늘어납니다.','독특해요. 남들과 다른 생각을 하며 혁신적이에요.','감수성이 풍부해요. 직관이 강하고 예술이나 영적인 것에 끌려요.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">👤 내 성격</div><div class="interp-text">' + personality + '</div></div>';

    // 감정
    if (moonPos) {
        var emotion = ['당신의 내면에는 불같은 열정이 있습니다. 감정이 빠르게 올라오고 빠르게 식어요. 화가 나면 확 올라오지만 금세 풀리는 타입. 스트레스를 받으면 가만히 있지 못하고 몸을 움직이고 싶어져요. 운동이나 야외 활동이 감정 해소에 가장 좋은 방법입니다. 감정 표현이 직접적이라 속마음을 숨기지 못하는 편이에요.','당신은 감정적으로 매우 안정적인 사람입니다. 급격한 변화를 싫어하고, 익숙한 것에서 안정감을 느껴요. 좋은 음식, 좋은 음악, 아름다운 자연 속에서 마음이 치유됩니다. 한번 마음을 주면 쉽게 변하지 않는 일편단심이지만, 그만큼 집착할 수 있어요. 물질적 안정이 감정적 안정과 직결되는 타입입니다.','당신은 감정을 이성적으로 처리하는 편입니다. 기분이 안 좋을 때 누군가와 대화하면 마음이 정리돼요. 호기심이 많아서 여러 가지에 동시에 관심을 가지며, 지루함을 참지 못합니다. 감정의 깊이보다 다양한 경험을 추구하며, 가벼운 유머로 분위기를 바꾸는 재주가 있어요.','당신은 감수성이 극도로 풍부한 사람입니다. 다른 사람의 감정을 스펀지처럼 흡수하며, 공감 능력이 타고났어요. 가정에서 편안함을 느끼고, 어머니와의 유대가 강합니다. 기분이 주기적으로 변할 수 있지만, 그만큼 사람들의 마음을 잘 이해합니다. 요리하거나 집을 꾸미는 활동에서 정서적 안정을 찾아요.','당신은 감정 표현이 화려하고 열정적입니다. 사랑받고 인정받고 싶은 욕구가 강하며, 무시당하면 깊이 상처받아요. 하지만 그만큼 사랑을 줄 때도 아낌없이 주는 관대한 마음의 소유자입니다. 창작 활동 — 그림, 글, 연기, 음악 — 이 감정적 치유제가 됩니다. 당신이 사랑할 때 세상이 빛나요.','당신은 감정을 분석하고 정리하는 경향이 있어요. 걱정이 많고 완벽주의적이지만, 문제를 실용적으로 해결하는 능력이 뛰어납니다. 일상의 루틴 — 아침 운동, 건강한 식사, 정리 정돈 — 에서 감정적 안정을 찾아요. 다른 사람을 도울 때 마음이 편안해지는 봉사 정신도 있습니다.','당신은 관계 속에서 감정의 균형을 찾는 사람입니다. 혼자 있으면 외로움을 느끼며, 파트너나 친한 친구와 함께 있을 때 가장 안정돼요. 갈등과 불화를 극도로 싫어하며, 예술과 아름다운 환경에서 마음의 평화를 찾습니다. 공정함을 중시하고, 불공평한 상황에서 스트레스를 많이 받아요.','당신의 감정은 바다처럼 깊고 강렬합니다. 사랑도 미움도 깊은 편이며, 배신을 절대 잊지 않아요. 직관이 매우 강해서 상대의 말보다 눈빛, 행동에서 진심을 읽습니다. 겉으로는 차분해 보이지만 내면에는 강렬한 감정의 파도가 있어요. 깊은 관계를 원하며, 피상적인 관계는 의미가 없다고 생각합니다.','당신은 감정적으로 밝고 낙관적인 사람입니다. 자유를 사랑하고 구속을 싫어하며, 새로운 경험과 모험을 통해 마음이 치유돼요. 여행이 최고의 감정 해소법이며, 철학적 사고를 통해 감정을 승화시킵니다. 유머 감각이 뛰어나서 주변 분위기를 밝게 만드는 사람이에요.','당신은 감정을 겉으로 잘 드러내지 않는 편입니다. 책임감이 강하고 감정보다 의무를 우선시하며, 어린 시절 어른스러웠을 수 있어요. 하지만 나이가 들수록 감정적으로 성숙해지고, 점점 편안하게 자신을 표현하게 됩니다. 인내와 시간이 당신의 감정적 치유제입니다.','당신은 독특하고 예측 불가능한 감정 패턴을 가지고 있어요. 일반적이지 않은 방식으로 사랑하며, 개인적 감정보다 큰 대의를 추구합니다. 독립적이고 자유로운 감정 생활을 원하며, 사회적 활동이나 인류를 위한 일에서 감정적 만족을 느낍니다.','당신은 극도로 직관적이고 영적인 사람입니다. 꿈이 선명하고 때로는 미래를 예감하기도 해요. 타인의 고통에 깊이 공감하며, 자신과 타인의 경계가 모호한 편입니다. 예술, 명상, 물 근처에서 마음의 안정을 찾으며, 현실 세계보다 내면 세계가 더 풍요로운 사람입니다.'][moonPos.sign];
        html += '<div class="interp-card"><div class="interp-title">🌙 내 감정 스타일</div><div class="interp-text">' + emotion + '</div></div>';
    }

    // 재물
    var wealth = ['당신은 자기 힘으로 돈을 버는 자수성가 타입입니다. 적극적이고 공격적인 재테크 스타일이며, 남이 시키는 일보다 직접 사업하거나 프리랜서로 활동하는 것이 더 잘 맞아요. 초반에 빠르게 벌 수 있지만, 성급한 투자는 주의하세요.','당신은 안정적으로 천천히 재물을 모으는 타입입니다. 부동산, 예술, 식음료 분야에서 수입이 유력하며, 급하게 벌기보다 꾸준히 쌓는 방식이 맞아요. 좋은 것을 즐기는 성향이라 소비도 많을 수 있으니 균형이 중요합니다. 저축 습관이 당신의 최대 무기예요.','당신은 지적 능력으로 돈을 버는 타입입니다. 글쓰기, 교육, IT, 마케팅, 통신 분야에서 재물이 들어와요. 하나의 수입원보다 여러 가지를 동시에 운영하는 것이 잘 맞으며, 사업 수완이 뛰어납니다. 정보와 네트워크가 당신의 재물 열쇠예요.','당신의 재물은 가정과 가족을 통해 들어오는 경향이 있어요. 어머니에게서 재산을 물려받거나, 부동산/식음료 분야에서 수입이 생깁니다. 감정적으로 소비하는 경향이 있으니, 기분이 안 좋을 때 충동 구매를 주의하세요. 안정적인 저축 계획이 중요합니다.','당신은 리더십과 권위를 통해 돈을 벌어요. 높은 자리에 오를수록 재물이 따라오며, 정부, 공공기관, 금 관련 사업과 인연이 있습니다. 과시적 소비 경향이 있을 수 있으니, 벌만큼 쓰지 않도록 주의하세요. 당신의 품위가 재물을 끌어당깁니다.','당신은 분석력과 전문 기술로 돈을 벌어요. 의료, 회계, 서비스업, 건강 관련 분야에서 안정적인 수입이 생깁니다. 검소하고 계획적인 관리자 스타일이라 돈을 잘 관리하는 편이에요. 큰 돈보다 꾸준한 수입이 당신의 스타일입니다.','당신은 파트너십을 통해 돈을 벌어요. 혼자보다 함께할 때 재물운이 좋으며, 법률, 외교, 패션, 예술 분야에서 수입이 유력합니다. 배우자를 통해 재물이 들어올 수도 있어요. 사교적 활동이 당신의 재물 네트워크를 넓혀줍니다.','당신은 타인의 자원 — 유산, 보험, 투자 — 을 통해 부를 축적하는 타입이에요. 공동 투자나 배우자의 재산과 인연이 있으며, 위기 상황에서도 재물을 지키는 능력이 있습니다. 비밀스러운 재원이 있을 수 있어요. 금융 전문가의 조언이 도움됩니다.','당신에게는 재물의 행운이 따르는 편이에요. 교육, 해외, 종교/철학 관련 분야에서 수입이 들어오며, 뜻밖의 행운으로 재물이 생기기도 합니다. 넓은 시야와 긍정적 마인드가 재물을 끌어당기는 비결이에요. 해외 관련 투자에 인연이 있습니다.','당신은 느리지만 확실하게 재물을 모으는 타입입니다. 초기에는 재정적 어려움을 경험할 수 있지만, 꾸준한 노력으로 중년 이후에 안정적인 부를 이루게 됩니다. 체계적인 투자와 장기 계획이 당신의 강점이에요. 인내심이 최고의 재테크 전략입니다.','당신은 기술, 혁신, 사회적 네트워크를 통해 돈을 벌어요. 전통적이지 않은 방법으로 수입을 만들며, IT, 과학, 사회운동 분야와 인연이 있습니다. 친구나 커뮤니티를 통해 재물 기회가 오기도 해요. 독창적 아이디어가 당신의 재물 열쇠입니다.','당신은 예술이나 영적 활동을 통해 수입이 생기는 타입이에요. 해외와 관련된 재물 인연이 있으며, 자선이나 기부에 관심이 많아 돈을 쓰는 것에도 의미를 부여합니다. 물질보다 정신적 풍요를 추구하며, 그것이 역설적으로 재물을 끌어당기기도 해요.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">💰 내 재물운</div><div class="interp-text">' + wealth + '</div></div>';

    // 배우자
    var spouse = ['당신의 배우자는 에너지가 넘치고 독립적인 사람입니다. 활동적이고 직접적인 성격으로, 자기 일에 열정적이에요. 조용히 따라오는 타입이 아니라 함께 도전하는 파트너입니다. 다소 급한 성격이라 갈등이 있을 수 있지만, 그만큼 열정적인 관계가 될 거예요.','당신의 배우자는 아름답고 감각적인 사람입니다. 좋은 것을 즐기며, 안정적이고 충성스러운 타입이에요. 요리나 예술에 재능이 있을 수 있고, 함께 있으면 편안한 느낌을 줍니다. 물질적으로 안정된 사람일 가능성이 높아요.','당신의 배우자는 말을 잘하고 재치 있는 사람입니다. 대화가 잘 통하는 게 가장 큰 매력이며, 유머 감각이 뛰어나요. 지적이고 다재다능한 사람으로, 여러 관심사를 공유할 수 있는 파트너입니다.','당신의 배우자는 따뜻하고 가정적인 사람입니다. 돌봄의 능력이 뛰어나고, 함께 있으면 집처럼 편안한 느낌을 줘요. 감정적으로 깊은 유대를 원하며, 가족을 무엇보다 소중히 여기는 사람입니다.','당신의 배우자는 카리스마 있고 당당한 사람입니다. 사회적으로 주목받는 위치에 있을 수 있으며, 자존심이 높지만 그만큼 관대해요. 함께 있으면 특별한 사람이 된 느낌을 받으며, 화려한 연애를 즐기는 타입입니다.','당신의 배우자는 꼼꼼하고 실용적인 사람입니다. 건강과 웰빙에 관심이 많고, 세심하게 챙겨주는 타입이에요. 완벽주의적일 수 있지만, 그만큼 성실하고 믿을 수 있는 파트너입니다.','당신의 배우자는 매력적이고 세련된 사람입니다. 외교적이며 균형 감각이 좋고, 예술적 감각이 뛰어나요. 함께 있으면 세상이 아름다워지는 느낌을 주는 사람이며, 우아한 데이트를 즐기는 타입입니다.','당신의 배우자는 강렬하고 신비로운 사람입니다. 감정이 깊고 한번 빠지면 끝까지 가는 타입이에요. 비밀이 많을 수 있지만, 그만큼 깊은 관계를 원합니다. 운명적이고 강렬한 끌림을 느끼는 만남이 될 거예요.','당신의 배우자는 자유롭고 낙관적인 사람입니다. 다른 문화권이거나 해외와 관련된 사람일 수 있어요. 철학적이고 모험을 좋아하며, 함께 세계를 탐험하고 싶어하는 파트너입니다. 결혼 후에도 자유로운 분위기를 원해요.','당신의 배우자는 진지하고 야망 있는 사람입니다. 책임감이 강하고 사회적으로 성공한 사람일 가능성이 높아요. 나이 차이가 있을 수 있으며, 결혼이 다소 늦을 수 있지만 한번 하면 오래가는 안정적인 관계입니다.','당신의 배우자는 독특하고 독립적인 사람입니다. 비전통적인 방식으로 만날 수 있으며, 지적이고 혁신적인 사고를 가진 사람이에요. 자유로운 결혼 형태를 원할 수 있고, 친구 같은 관계가 이상적입니다.','당신의 배우자는 영적이고 직관적인 사람입니다. 예술가이거나 영적 분야에 종사하는 사람과 인연이 있어요. 꿈꾸는 듯한 로맨틱한 느낌을 주며, 현실보다 이상을 추구하는 면이 있어 현실적 기대치 조절이 필요할 수 있어요.'][(lagnaSign+6)%12];
    // 7궁 행성 추가 정보
    var h7p = positions.filter(function(p){return houseOf(p.sign)===7;});
    var spouseExtra = '';
    h7p.forEach(function(p) {
        var desc = {Sun:'사회적 지위 높은 배우자.',Moon:'감성적이고 돌봐주는 배우자.',Mars:'열정적이지만 다툼 가능. 강한 배우자.',Mercury:'대화가 잘 통하는 지적인 배우자.',Jupiter:'현명하고 도덕적인 배우자! 최고의 결혼운.',Venus:'매우 매력적이고 사랑이 넘치는 배우자.',Saturn:'결혼이 늦지만 오래가는 관계. 나이 차이 가능.',Rahu:'비전통적 결혼. 외국인 배우자 가능.',Ketu:'전생의 인연. 영적 연결이 강한 배우자.'};
        if (desc[p.id]) spouseExtra += '<br>✦ ' + desc[p.id];
    });
    html += '<div class="interp-card"><div class="interp-title">💍 내 배우자</div><div class="interp-text">' + spouse + spouseExtra + '</div></div>';

    // 직업
    var career = ['당신은 리더십이 필요한 직업에서 빛납니다. 군대, 경찰, 스포츠, 외과, 사업 경영 등 경쟁적이고 행동력이 필요한 분야에 적합해요. 자기 사업을 하는 것도 잘 맞습니다.','당신은 금융, 요식업, 부동산, 패션, 예술 분야에 적합합니다. 감각적이고 안정적인 환경에서 실력을 발휘하며, 돈을 다루는 능력이 뛰어나요. 아름다운 것을 만드는 직업이 천직입니다.','당신은 소통과 지적 활동이 중심인 직업에 적합합니다. 미디어, 글쓰기, 교육, IT, 마케팅, 번역 분야에서 재능을 발휘하며, 말과 글로 세상을 바꾸는 사람이에요.','당신은 사람을 돌보는 직업에 적합합니다. 의료, 간호, 호텔업, 요리, 심리상담, 부동산 분야에서 빛나며, 감정적 교감이 필요한 일에서 최고의 성과를 냅니다.','당신은 무대 위에서 빛나는 직업에 적합합니다. 정치, 연예, 경영, 정부기관, 고위직에서 리더십을 발휘하며, 창조적이고 권위 있는 포지션이 천직이에요.','당신은 분석과 정밀함이 필요한 직업에 적합합니다. 의료, 회계, 분석, 컨설팅, 건강관리, 품질관리 분야에서 뛰어난 성과를 내며, 세밀한 관찰력이 강점이에요.','당신은 조화와 아름다움이 필요한 직업에 적합합니다. 법률, 외교, 패션, 인테리어, 상담, 이벤트 기획 분야에서 빛나며, 사람과 사람을 연결하는 일에 재능이 있어요.','당신은 깊이 파고드는 직업에 적합합니다. 연구, 조사, 보험, 의학, 심리학, 세무 분야에서 뛰어난 능력을 발휘하며, 비밀을 다루는 일에도 재능이 있어요.','당신은 배움과 탐험이 있는 직업에 적합합니다. 교육, 법률, 종교, 출판, 여행, 국제무역 분야에서 활약하며, 해외와 인연이 깊은 직업이 잘 맞아요.','당신은 체계와 조직이 필요한 직업에 적합합니다. 경영, 공무원, 건축, 토목, 대기업 관련 분야에서 느리지만 확실한 성공을 이루며, 사회적 지위가 높은 자리에 오르게 돼요.','당신은 혁신과 기술이 필요한 직업에 적합합니다. IT, 과학, 항공, 우주, 사회사업, 혁신 분야에서 빛나며, 남들이 생각하지 못한 방법으로 세상을 바꾸는 사람이에요.','당신은 예술과 영성이 결합된 직업에 적합합니다. 예술, 영화, 음악, 의료, 해외 관련 분야, NGO에서 활약하며, 세상의 아픔을 치유하는 일에 보람을 느껴요.'][(lagnaSign+9)%12];
    html += '<div class="interp-card"><div class="interp-title">💼 내 직업</div><div class="interp-text">' + career + '</div></div>';

    // 건강
    var health = ['머리와 얼굴 부위가 약점이에요. 두통이나 열이 자주 올 수 있고, 화가 나면 머리에 열이 오르는 타입입니다. 규칙적인 운동으로 에너지를 발산하고, 충분한 수분을 섭취하세요. 사고나 부상에 주의하고, 성급한 행동을 자제하면 건강이 좋아져요.','목과 갑상선이 약점이에요. 과식하는 경향이 있어서 체중 관리와 당뇨에 주의하세요. 성대와 목 건강도 중요합니다. 좋은 음식을 즐기되 적당히, 그리고 목 스트레칭을 자주 해주세요. 자연 속에서 산책하는 것이 건강에 가장 좋아요.','폐와 팔, 어깨, 신경계가 약점이에요. 불안이나 수면 문제가 있을 수 있고, 걱정이 많아 스트레스가 쌓이기 쉬워요. 호흡 명상이 큰 도움이 되며, 규칙적인 수면 패턴을 유지하세요. 손과 팔을 많이 쓰는 일을 할 때 스트레칭을 잊지 마세요.','위장과 가슴 부위가 약점이에요. 감정 스트레스가 바로 소화기 건강에 영향을 주는 타입이라, 스트레스 관리가 곧 건강 관리예요. 감정적으로 힘들 때 과식하지 않도록 주의하고, 따뜻한 음식과 차를 즐기세요. 물 근처에서 시간을 보내면 마음과 몸이 동시에 치유돼요.','심장과 등, 척추가 약점이에요. 과로를 주의하세요 — 당신은 열심히 일하는 타입이라 무리하기 쉬워요. 심혈관 건강을 위해 유산소 운동을 규칙적으로 하고, 충분한 휴식을 취하세요. 자존심이 상하면 스트레스가 심해지니, 마음 관리도 중요해요.','소화기계와 장, 피부가 약점이에요. 소화불량이나 알레르기가 있을 수 있고, 완벽주의적 성격 때문에 스트레스성 질환이 올 수 있어요. 식이요법이 매우 중요하며, 건강한 음식을 선택하는 습관이 약이 됩니다. 요가나 명상으로 마음을 이완시키세요.','신장과 허리, 피부가 약점이에요. 수분 섭취를 충분히 하고, 균형 잡힌 생활을 유지하세요. 당분 섭취를 줄이고 신장 건강에 좋은 음식을 챙기세요. 스트레스를 받으면 피부에 바로 나타나는 타입이니, 마음의 평화가 곧 피부 건강이에요.','생식기와 배설기계가 약점이에요. 만성 질환이 올 수 있으니 정기적인 건강 검진이 중요합니다. 감정적 스트레스가 건강에 직접적 영향을 주며, 극단적인 다이어트나 무리한 운동은 피하세요. 깊은 호흡과 명상이 도움됩니다.','간과 허벅지, 엉덩이가 약점이에요. 좋은 음식을 즐기는 성향이라 과체중에 주의하세요. 야외 활동과 등산, 자전거 등이 건강에 가장 좋으며, 앉아 있는 시간을 줄이는 게 중요합니다. 해외 여행이 몸과 마음 모두에 치유 효과를 줘요.','뼈와 관절, 무릎, 피부가 약점이에요. 류마티스나 관절염에 주의하고, 칼슘과 비타민D를 충분히 섭취하세요. 젊을 때 건강 관리를 잘하면 나이 들어서 오히려 건강해지는 특이한 체질이에요. 스트레칭과 관절 운동을 습관화하세요.','발목과 종아리, 순환계가 약점이에요. 혈압 관리가 중요하고, 순환을 돕기 위해 규칙적으로 걷는 습관을 가지세요. 독특한 건강 문제가 갑자기 올 수 있으니, 이상한 증상이 느껴지면 바로 검진받으세요. 전자기기 사용을 줄이는 것도 도움돼요.','발과 림프계, 면역 체계가 약점이에요. 원인 불명의 피로감이나 면역 저하에 주의하세요. 충분한 수면이 당신에게는 가장 강력한 건강 비결이에요. 물 근처에서 시간을 보내거나, 명상과 요가를 하면 면역력이 크게 올라갑니다. 알코올과 약물에 민감한 체질이니 절제가 중요해요.'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">🏥 내 건강</div><div class="interp-text">' + health + '</div></div>';

    // 현재 대운 간단 요약
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
                    var dashaDesc = {Ketu:'영적 성장과 분리의 시기. 물질보다 내면에 집중하세요.',Venus:'사랑과 풍요의 시기! 연애, 결혼, 예술 활동이 활발해요.',Sun:'자아 발견과 리더십의 시기. 자신감이 강해져요.',Moon:'감정과 가정의 시기. 가족관계가 중요해져요.',Mars:'행동과 에너지의 시기. 새로운 일을 시작하기 좋아요.',Rahu:'변화와 혁신의 시기. 예상치 못한 기회가 와요.',Jupiter:'행운과 성장의 시기! 교육, 결혼, 승진 등 좋은 일이 많아요.',Saturn:'인내와 시련의 시기. 느리지만 확실한 성장을 해요.',Mercury:'지적 활동의 시기. 공부, 사업, 소통에 유리해요.'};
                    html += '<div class="interp-card"><div class="interp-title">⏳ 지금 내 운세 시기</div><div class="interp-text">현재 <strong style="color:#c9a84c;">' + DASHA_KO[planet] + '</strong>의 시기입니다.<br><br>' + (dashaDesc[planet]||'') + '</div></div>';
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
const SIGNS = ['양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리',
               '천칭자리','전갈자리','사수자리','염소자리','물병자리','물고기자리'];
const SIGNS_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

// Planets
const PLANETS = [
    { id: 'Sun', name: '태양', symbol: '☉', natural: 'malefic' },
    { id: 'Moon', name: '달', symbol: '☽', natural: 'benefic' },
    { id: 'Mars', name: '화성', symbol: '♂', natural: 'malefic' },
    { id: 'Mercury', name: '수성', symbol: '☿', natural: 'neutral' },
    { id: 'Jupiter', name: '목성', symbol: '♃', natural: 'benefic' },
    { id: 'Venus', name: '금성', symbol: '♀', natural: 'benefic' },
    { id: 'Saturn', name: '토성', symbol: '♄', natural: 'malefic' },
];

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', ko: '아쉬위니', ruler: 'Ketu', meaning: '말의 쌍둥이', deity: 'Ashwini Kumaras', desc: '치유와 새로운 시작의 에너지. 빠른 행동력과 치유 능력을 가진 사람.' },
    { name: 'Bharani', ko: '바라니', ruler: 'Venus', meaning: '참는 자', deity: 'Yama', desc: '삶과 죽음의 순환. 강한 인내심과 변화를 이끄는 힘.' },
    { name: 'Krittika', ko: '크리티카', ruler: 'Sun', meaning: '절단하는 자', deity: 'Agni', desc: '불의 힘과 정화. 날카로운 지성과 결단력.' },
    { name: 'Rohini', ko: '로히니', ruler: 'Moon', meaning: '붉은 별', deity: 'Brahma', desc: '풍요와 아름다움의 별. 창조적이고 매력적인 성격.' },
    { name: 'Mrigashira', ko: '므리가시라', ruler: 'Mars', meaning: '사슴의 머리', deity: 'Soma', desc: '탐구와 호기심의 별. 끊임없이 진리를 추구하는 여행자.' },
    { name: 'Ardra', ko: '아르드라', ruler: 'Rahu', meaning: '눈물방울', deity: 'Rudra', desc: '폭풍과 파괴 속의 재생. 강렬한 감정과 변혁의 힘.' },
    { name: 'Punarvasu', ko: '푸나르바수', ruler: 'Jupiter', meaning: '빛의 귀환', deity: 'Aditi', desc: '회복과 귀환의 별. 낙관적이고 지혜로운 성격.' },
    { name: 'Pushya', ko: '푸쉬야', ruler: 'Saturn', meaning: '양육하는 자', deity: 'Brihaspati', desc: '가장 길한 나크샤트라. 양육, 보호, 번영의 에너지.' },
    { name: 'Ashlesha', ko: '아쉴레샤', ruler: 'Mercury', meaning: '감싸는 자', deity: 'Nagas', desc: '뱀의 지혜와 신비. 통찰력과 깊은 직관.' },
    { name: 'Magha', ko: '마가', ruler: 'Ketu', meaning: '위대한', deity: 'Pitris', desc: '왕족의 별. 권위, 존경, 조상의 축복.' },
    { name: 'Purva Phalguni', ko: '푸르바 팔구니', ruler: 'Venus', meaning: '앞의 열매', deity: 'Bhaga', desc: '기쁨과 사랑의 별. 예술적 감각과 로맨스.' },
    { name: 'Uttara Phalguni', ko: '우타라 팔구니', ruler: 'Sun', meaning: '뒤의 열매', deity: 'Aryaman', desc: '우정과 계약의 별. 신뢰와 헌신.' },
    { name: 'Hasta', ko: '하스타', ruler: 'Moon', meaning: '손', deity: 'Savitar', desc: '손재주와 기술의 별. 치유하는 손, 예술가.' },
    { name: 'Chitra', ko: '치트라', ruler: 'Mars', meaning: '빛나는 보석', deity: 'Vishwakarma', desc: '아름다움과 창조의 별. 뛰어난 미적 감각.' },
    { name: 'Swati', ko: '스와티', ruler: 'Rahu', meaning: '독립적인', deity: 'Vayu', desc: '바람의 자유로움. 독립적이고 유연한 성격.' },
    { name: 'Vishakha', ko: '비샤카', ruler: 'Jupiter', meaning: '두 갈래', deity: 'Indra-Agni', desc: '목표와 결단의 별. 강한 집중력과 의지.' },
    { name: 'Anuradha', ko: '아누라다', ruler: 'Saturn', meaning: '라다를 따르는', deity: 'Mitra', desc: '우정과 헌신의 별. 조직력과 리더십.' },
    { name: 'Jyeshtha', ko: '제쉬타', ruler: 'Mercury', meaning: '최고 연장자', deity: 'Indra', desc: '보호와 권위의 별. 강한 책임감.' },
    { name: 'Mula', ko: '물라', ruler: 'Ketu', meaning: '뿌리', deity: 'Nirriti', desc: '파괴와 재건의 별. 진실의 근원을 찾는 자.' },
    { name: 'Purva Ashadha', ko: '푸르바 아샤다', ruler: 'Venus', meaning: '앞의 무적', deity: 'Apas', desc: '물의 힘과 정화. 잠재된 승리의 에너지.' },
    { name: 'Uttara Ashadha', ko: '우타라 아샤다', ruler: 'Sun', meaning: '뒤의 무적', deity: 'Vishvedevas', desc: '최종 승리의 별. 인내와 리더십.' },
    { name: 'Shravana', ko: '쉬라바나', ruler: 'Moon', meaning: '듣는 자', deity: 'Vishnu', desc: '지식과 경청의 별. 학습과 소통의 달인.' },
    { name: 'Dhanishta', ko: '다니쉬타', ruler: 'Mars', meaning: '가장 부유한', deity: 'Vasus', desc: '풍요와 음악의 별. 재능과 번영.' },
    { name: 'Shatabhisha', ko: '샤타비샤', ruler: 'Rahu', meaning: '백 명의 치유사', deity: 'Varuna', desc: '비밀과 치유의 별. 신비로운 치유 능력.' },
    { name: 'Purva Bhadrapada', ko: '푸르바 바드라파다', ruler: 'Jupiter', meaning: '앞의 행운의 발', deity: 'Aja Ekapada', desc: '불과 변혁의 별. 영적 각성.' },
    { name: 'Uttara Bhadrapada', ko: '우타라 바드라파다', ruler: 'Saturn', meaning: '뒤의 행운의 발', deity: 'Ahir Budhnya', desc: '깊은 바다의 지혜. 명상과 영적 깊이.' },
    { name: 'Revati', ko: '레바티', ruler: 'Mercury', meaning: '부유한', deity: 'Pushan', desc: '여행과 보호의 별. 모든 것의 완성.' },
];

// Dasha periods (years)
const DASHA_YEARS = {
    'Ketu': 7, 'Venus': 20, 'Sun': 6, 'Moon': 10, 'Mars': 7,
    'Rahu': 18, 'Jupiter': 16, 'Saturn': 19, 'Mercury': 17
};
const DASHA_ORDER = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const DASHA_KO = {
    'Ketu': '케투', 'Venus': '금성', 'Sun': '태양', 'Moon': '달', 'Mars': '화성',
    'Rahu': '라후', 'Jupiter': '목성', 'Saturn': '토성', 'Mercury': '수성'
};

// South Indian chart house layout (fixed signs)
// Grid positions: [row][col] → sign index
const SI_LAYOUT = [
    [11, 0, 1, 2],
    [10, -1, -1, 3],
    [9, -1, -1, 4],
    [8, 7, 6, 5]
];

// ── 폼 초기화 ──
function initForm() {
    const yearSel = document.getElementById('birthYear');
    const monthSel = document.getElementById('birthMonth');
    const daySel = document.getElementById('birthDay');
    const hourSel = document.getElementById('birthHour');
    const minSel = document.getElementById('birthMinute');

    // 년도: 1940~2025
    for (let y = 2025; y >= 1940; y--) {
        const opt = document.createElement('option');
        opt.value = y; opt.textContent = y + '년';
        if (y === 1995) opt.selected = true;
        yearSel.appendChild(opt);
    }
    // 월: 1~12
    for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        opt.value = m; opt.textContent = m + '월';
        if (m === 3) opt.selected = true;
        monthSel.appendChild(opt);
    }
    // 일: 1~31
    for (let d = 1; d <= 31; d++) {
        const opt = document.createElement('option');
        opt.value = d; opt.textContent = d + '일';
        if (d === 15) opt.selected = true;
        daySel.appendChild(opt);
    }
    // 시: 12, 1~11
    [12,1,2,3,4,5,6,7,8,9,10,11].forEach(h => {
        const opt = document.createElement('option');
        opt.value = h; opt.textContent = h + '시';
        if (h === 10) opt.selected = true;
        hourSel.appendChild(opt);
    });
    // 분: 00, 01, 02, ... 59 (1분 단위 — D60 정밀도)
    for (let m = 0; m < 60; m += 1) {
        const opt = document.createElement('option');
        opt.value = m; opt.textContent = String(m).padStart(2,'0') + '분';
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
        hour = 12; minute = 0; // 정오 기본
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

// 페이지 로드 시 폼 초기화
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
            id: 'Rahu', name: '라후', symbol: '☊', natural: 'malefic',
            sidereal: rahuSidereal, sign: Math.floor(rahuSidereal / 30),
            degree: rahuSidereal % 30, nakshatra: Math.floor(rahuSidereal / (360/27)),
            nakshatraPada: Math.floor((rahuSidereal % (360/27)) / (360/108)) + 1
        });
        positions.push({
            id: 'Ketu', name: '케투', symbol: '☋', natural: 'malefic',
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
    renderDivisionalChart(positions, lagnaSidereal, 10, 'd10Chart', 'd10InterpWrap', 'D10', '다샴샤');
    renderDivisionalChart(positions, lagnaSidereal, 7, 'd7Chart', 'd7InterpWrap', 'D7', '삽탐샤');
    renderDivisionalChart(positions, lagnaSidereal, 12, 'd12Chart', 'd12InterpWrap', 'D12', '드와다샴샤');
    renderDivisionalChart(positions, lagnaSidereal, 60, 'd60Chart', 'd60InterpWrap', 'D60', '샤슈티암샤');
    renderDivisionalChart(positions, lagnaSidereal, 2, 'd2Chart', 'd2InterpWrap', 'D2', '호라');
    renderDivisionalChart(positions, lagnaSidereal, 3, 'd3Chart', 'd3InterpWrap', 'D3', '드레카나');
    renderDivisionalChart(positions, lagnaSidereal, 4, 'd4Chart', 'd4InterpWrap', 'D4', '차투르탐샤');
    renderDivisionalChart(positions, lagnaSidereal, 16, 'd16Chart', 'd16InterpWrap', 'D16', '쇼다샴샤');
    renderDivisionalChart(positions, lagnaSidereal, 20, 'd20Chart', 'd20InterpWrap', 'D20', '빔샴샤');
    renderDivisionalChart(positions, lagnaSidereal, 24, 'd24Chart', 'd24InterpWrap', 'D24', '차투르빔샴샤');
    renderDivisionalChart(positions, lagnaSidereal, 27, 'd27Chart', 'd27InterpWrap', 'D27', '삽타빔샴샤');
    renderDivisionalChart(positions, lagnaSidereal, 30, 'd30Chart', 'd30InterpWrap', 'D30', '트림샴샤');
    renderDivisionalChart(positions, lagnaSidereal, 40, 'd40Chart', 'd40InterpWrap', 'D40', '카베담샤');
    renderDivisionalChart(positions, lagnaSidereal, 45, 'd45Chart', 'd45InterpWrap', 'D45', '악샤베담샤');
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
    html += '<th>행성</th><th>별자리</th><th>도수</th><th>나크샤트라</th><th>하우스</th>';
    html += '</tr></thead><tbody>';

    // Add Lagna first with exact degree
    const lagnaDeg = lagnaSidereal % 30;
    const lagnaNakIdx = Math.floor(lagnaSidereal / (360/27));
    const lagnaNak = NAKSHATRAS[lagnaNakIdx] || {ko:'-'};
    html += `<tr><td>⬆ 라그나 (상승궁)</td><td>${SIGN_SYMBOLS[lagnaSign]} ${SIGNS[lagnaSign]}</td><td>${lagnaDeg.toFixed(1)}°</td><td>${lagnaNak.ko}</td><td>1</td></tr>`;

    positions.forEach(p => {
        const house = ((p.sign - lagnaSign + 12) % 12) + 1;
        const nak = NAKSHATRAS[p.nakshatra] || { ko: '-', name: '-' };
        const roleMap = { Sun:'자아·권위', Moon:'감정·마음', Mars:'에너지·용기', Mercury:'지능·소통', Jupiter:'행운·지혜', Venus:'사랑·매력', Saturn:'인내·책임', Rahu:'욕망·혁신', Ketu:'영성·해탈' };
        const houseArea = ['','나 자신','돈·가족','소통','가정','자녀·연애','건강','배우자','변혁','행운·해외','직업','수입','해외·영성'];
        html += `<tr>
            <td>${p.symbol} ${p.name}<br><span style="color:#666;font-size:10px;">${roleMap[p.id]||''}</span></td>
            <td>${SIGN_SYMBOLS[p.sign]} ${SIGNS[p.sign]}</td>
            <td>${p.degree.toFixed(1)}°</td>
            <td>${nak.ko}</td>
            <td>${house}궁<br><span style="color:#666;font-size:10px;">${houseArea[house]||''}</span></td>
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
                cell.innerHTML = row === 1 && col === 1 ? '<div style="color:#c9a84c;font-size:10px;">D1<br>라시</div>' : '';
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
    // 나바암샤: 각 사인(30도)을 9등분(3.333...도), 파다에 따라 사인 배정
    // 불의 사인(0,4,8=양자리,사자,사수): 양자리부터 시작
    // 흙의 사인(1,5,9=황소,처녀,염소): 염소자리부터 시작
    // 바람의 사인(2,6,10=쌍둥이,천칭,물병): 천칭자리부터 시작
    // 물의 사인(3,7,11=게,전갈,물고기): 게자리부터 시작
    const sign = Math.floor(siderealLon / 30);
    const degInSign = siderealLon % 30;
    const pada = Math.floor(degInSign / (30/9)); // 0~8
    const element = sign % 4; // 0=불, 1=흙, 2=바람, 3=물
    const startSign = [0, 9, 6, 3][element]; // 양,염,천,게
    return (startSign + pada) % 12;
}

function renderD9Chart(positions, lagnaSign, lagnaSidereal) {
    // D9 라그나 계산
    const d9LagnaSign = getNavamsaSign(lagnaSidereal);

    // D9 행성 위치
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
                cell.innerHTML = '<div style="font-size:11px;color:#444;text-align:center;">D9<br>나바암샤</div>';
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
    const RULER_NAMES = {Sun:'태양',Moon:'달',Mars:'화성',Mercury:'수성',Jupiter:'목성',Venus:'금성',Saturn:'토성',Rahu:'라후',Ketu:'케투'};
    const isEasy = window.vedicMode === 'easy';

    function d9HouseOf(signIdx) { return ((signIdx - d9LagnaSign + 12) % 12) + 1; }
    function d9PlanetsInHouse(h) { return d9Positions.filter(p => d9HouseOf(p.d9Sign) === h); }

    // D9 7궁 (배우자)
    const d9H7Sign = (d9LagnaSign + 6) % 12;
    const d9H7Ruler = SIGN_RULERS[d9H7Sign];
    const d9H7Planets = d9PlanetsInHouse(7);

    // D9 10궁 (사명/dharma 직업)
    const d9H10Sign = (d9LagnaSign + 9) % 12;
    const d9H10Ruler = SIGN_RULERS[d9H10Sign];
    const d9H10Planets = d9PlanetsInHouse(10);

    // 배우자의 10궁 (파생하우스: 7궁에서 10번째 = D9 4궁)
    const spouseH10 = 4; // 7궁에서 10번째
    const d9H4Sign = (d9LagnaSign + 3) % 12;
    const d9H4Ruler = SIGN_RULERS[d9H4Sign];
    const d9H4Planets = d9PlanetsInHouse(4);

    // D9 1궁 (결혼 후 본인)
    const d9H1Planets = d9PlanetsInHouse(1);

    // 사인별 직업 경향
    const careerBySgn = [
        '리더십, 군대, 스포츠, 기업가 (불의 선구자)',
        '금융, 농업, 예술, 부동산, 음식 (안정과 물질)',
        '소통, 미디어, 작가, 교사, 마케팅 (지적 활동)',
        '간호, 돌봄, 요리, 호텔, 심리상담 (감정 케어)',
        '정치, 연예, 리더, 고위직, 크리에이터 (빛나는 무대)',
        '의학, 회계, 분석, 편집, 건강/웰빙 (정밀한 서비스)',
        '법률, 외교, 디자인, 패션, 중재 (균형과 미)',
        '연구, 수사, 의학, 오컬트, 심리학 (깊이와 변혁)',
        '교육, 여행, 철학, 종교, 출판 (확장과 탐구)',
        '정부, 건설, 관리, CEO, 조직 리더 (체계와 권위)',
        '기술, IT, 발명, 사회운동, 과학 (혁신)',
        '예술, 영성, 치유, 음악, 자선 (초월과 봉사)'
    ];

    // 행성별 배우자 직업 경향
    const planetCareer = {
        Sun: '공무원, 정치인, 의사, CEO 등 권위 있는 직업',
        Moon: '간호사, 상담사, 요리사, 호텔업 등 돌봄/감정 관련',
        Mars: '군인, 경찰, 외과의사, 엔지니어, 운동선수',
        Mercury: '작가, 교사, 프로그래머, 회계사, 상인',
        Jupiter: '교수, 판사, 종교인, 컨설턴트, 고위 전문직',
        Venus: '디자이너, 배우, 뮤지션, 패션, 뷰티 관련',
        Saturn: '건설, 광업, 농업, 관리직, 장인',
        Rahu: 'IT, 해외 관련, 비전통적 직업, 연구',
        Ketu: '영성, 대체의학, 연구, 수행자'
    };

    let html = '';

    // 1. D9 라그나 분석 (결혼 후 본인)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🕉️ 결혼 후의 당신' : '🕉️ D9 라그나 — 결혼 후의 당신: ' + SIGNS[d9LagnaSign] + ' ' + SIGN_SYMBOLS[d9LagnaSign]}</div>
        <div class="interp-text">
            ${isEasy ? '결혼 후, 그리고 인생 후반(30대 이후)에 드러나는 당신의 진짜 모습입니다.' : '나바암샤 라그나가 <strong>' + SIGNS[d9LagnaSign] + '</strong>에 있습니다. 이것은 결혼 후, 그리고 인생 후반(30대 이후)에 드러나는 당신의 진짜 모습입니다.'}
            ${d9LagnaSign === d1LagnaSign ? (isEasy ? '<br><br><strong>특별한 표시!</strong> 당신의 본질이 결혼 후에도 변하지 않으며, 내면과 외면이 일치하는 사람입니다.' : '<br><br><strong>D1과 D9 라그나가 같은 사인!</strong> 이것을 <strong>바르고타마(Vargottama)</strong>라 하며, 매우 강력합니다. 당신의 본질이 결혼 후에도 변하지 않으며, 내면과 외면이 일치하는 사람입니다.') : ''}
            ${d9H1Planets.length > 0 ? '<br><br>' + (isEasy ? '결혼 후 당신의 성격에 강하게 영향을 주는 에너지가 있습니다.' : '<strong>D9 1궁의 행성:</strong> ' + d9H1Planets.map(p => p.symbol + ' ' + p.name).join(', ') + ' — 이 행성들이 결혼 후 당신의 성격에 강하게 영향을 줍니다.') : ''}
        </div>
    </div>`;

    // 2. D9 7궁 (배우자)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 배우자의 성격' : '💍 D9 7궁 — 배우자의 성격: ' + SIGNS[d9H7Sign] + ' ' + SIGN_SYMBOLS[d9H7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? (careerBySgn[d9H7Sign].split('(')[1]?.replace(')','') || '독특한 매력') + '의 성질을 가진 파트너입니다.' : '나바암샤 7궁이 <strong>' + SIGNS[d9H7Sign] + '</strong>에 있으며, 주인 행성은 <strong>' + RULER_NAMES[d9H7Ruler] + '</strong>입니다.<br><br>이것은 배우자의 핵심 성격을 나타냅니다. ' + SIGNS[d9H7Sign] + '의 에너지를 가진 파트너 — ' + (careerBySgn[d9H7Sign].split('(')[1]?.replace(')','') || '독특한 매력') + '의 성질을 가진 사람입니다.'}
            ${d9H7Planets.length > 0 ? '<br><br>' + (isEasy ? d9H7Planets.map(p => p.natural === 'benefic' ? '좋은 에너지! 배우자에게서 축복을 받습니다.' : '도전의 에너지 — 결혼 생활에서 성장의 기회이기도 합니다.').join('<br>') : '<strong>D9 7궁의 행성:</strong><br>' + d9H7Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${p.natural === 'benefic' ? '좋은 에너지! 배우자에게서 이 행성의 축복을 받습니다.' : '도전의 에너지 — 결혼 생활에서 성장의 기회이기도 합니다.'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 3. D9 10궁 (본인의 Dharma/사명)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 인생의 사명' : '💼 D9 10궁 — 인생의 사명(Dharma): ' + SIGNS[d9H10Sign] + ' ' + SIGN_SYMBOLS[d9H10Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '결혼 후, 성숙해진 이후에 추구하게 되는 진정한 소명입니다.' : '나바암샤 10궁이 <strong>' + SIGNS[d9H10Sign] + '</strong>에 있으며, 주인 행성은 <strong>' + RULER_NAMES[d9H10Ruler] + '</strong>입니다.<br><br>D1의 10궁이 \'직업\'을 보여준다면, D9의 10궁은 <strong>인생의 더 큰 사명(Dharma)</strong>을 보여줍니다. 결혼 후, 그리고 성숙해진 이후에 추구하게 되는 진정한 소명입니다.'}<br><br>
            <strong>사명의 방향:</strong> ${careerBySgn[d9H10Sign]}
            ${d9H10Planets.length > 0 ? '<br><br>' + (isEasy ? d9H10Planets.map(p => planetCareer[p.id] || '독특한 직업 에너지').join('<br>') : '<strong>D9 10궁의 행성:</strong><br>' + d9H10Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${planetCareer[p.id] || '독특한 직업 에너지'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 4. 배우자의 직업 (파생하우스: D9 4궁 = 7궁에서 10번째)
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👔 배우자의 직업' : '👔 배우자의 직업 — 파생 10궁(D9 4궁): ' + SIGNS[d9H4Sign] + ' ' + SIGN_SYMBOLS[d9H4Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '<strong>파생하우스 원리:</strong> 7궁(배우자)에서 10번째 하우스 = D9의 4궁이 배우자의 직업/사회적 활동을 나타냅니다.<br><br>D9 4궁이 <strong>' + SIGNS[d9H4Sign] + '</strong>에 있으며, 주인 행성은 <strong>' + RULER_NAMES[d9H4Ruler] + '</strong>입니다.<br><br>'}
            <strong>배우자의 직업 경향:</strong> ${careerBySgn[d9H4Sign]}
            ${d9H4Planets.length > 0 ? '<br><br>' + (isEasy ? d9H4Planets.map(p => `배우자가 ${planetCareer[p.id] || '특수한 직업'} 분야에서 활동할 가능성`).join('<br>') : '<strong>D9 4궁(배우자 10궁)의 행성:</strong><br>' + d9H4Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: 배우자가 ${planetCareer[p.id] || '특수한 직업'} 분야에서 활동할 가능성`).join('<br>')) : ''}
        </div>
    </div>`;

    // 5. 바르고타마 행성 체크
    const vargottamaPlanets = d9Positions.filter(p => p.sign === p.d9Sign);
    if (vargottamaPlanets.length > 0) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '⭐ 특별히 강한 행성' : '⭐ 바르고타마(Vargottama) 행성 — 특별히 강한 행성'}</div>
            <div class="interp-text">
                ${isEasy ? '아래 행성들은 특별히 강력하며, 인생 전반에 걸쳐 일관되게 작용합니다.' : 'D1과 D9에서 같은 사인에 있는 행성을 <strong>바르고타마</strong>라 합니다. 이 행성은 매우 강력하며, 그 행성의 에너지가 인생 전반에 걸쳐 일관되게 작용합니다.'}<br><br>
                ${isEasy ? '특별히 강한 에너지가 인생 전반에 걸쳐 일관되게 작용합니다!' : vargottamaPlanets.map(p => `<strong>${p.symbol} ${p.name}</strong>: D1과 D9 모두 ${SIGNS[p.sign]}에 위치 — 이 행성의 에너지가 특별히 강합니다!`).join('<br>')}
            </div>
        </div>`;
    }

    // 6. 배우자 방향 분석 (UL + A7 + D1 7궁 + D9 7궁 종합)
    const DIRECTIONS = {
        0:'동쪽', 1:'남쪽', 2:'서쪽', 3:'북쪽',
        4:'동쪽', 5:'남쪽', 6:'서쪽', 7:'북쪽',
        8:'동쪽', 9:'남쪽', 10:'서쪽', 11:'북쪽'
    };
    const DIR_DETAIL = {
        0:'동쪽 (양자리 — 불의 개척자)',
        1:'남쪽 (황소자리 — 흙의 안정)',
        2:'서쪽 (쌍둥이자리 — 바람의 소통)',
        3:'북쪽 (게자리 — 물의 감성)',
        4:'동쪽 (사자자리 — 불의 왕)',
        5:'남쪽 (처녀자리 — 흙의 분석)',
        6:'서쪽 (천칭자리 — 바람의 균형)',
        7:'북쪽 (전갈자리 — 물의 깊이)',
        8:'동쪽 (사수자리 — 불의 탐구)',
        9:'남쪽 (염소자리 — 흙의 성취)',
        10:'서쪽 (물병자리 — 바람의 혁신)',
        11:'북쪽 (물고기자리 — 물의 영성)'
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
    const d1Positions = d9Positions; // d9Positions는 {...p, d9Sign} 이므로 p.sign = D1 sign

    // UL (Upapada Lagna) = 12궁의 아루다
    const ulSign = calcArudha(12, d1LagnaSign, d1Positions);

    // A7 (Darapada) = 7궁의 아루다
    const a7Sign = calcArudha(7, d1LagnaSign, d1Positions);

    // D1 7궁 사인
    const d1H7Sign = (d1LagnaSign + 6) % 12;

    // D9 7궁 주인의 D9 위치
    const d9H7RulerPlanet = d9Positions.find(p => p.id === d9H7Ruler);
    const d9H7RulerSign = d9H7RulerPlanet ? d9H7RulerPlanet.d9Sign : d9H7Sign;

    // D9 금성(Venus) 위치 — 배우자의 카라카(상징 행성)
    const venusD9 = d9Positions.find(p => p.id === 'Venus');
    const venusD9Sign = venusD9 ? venusD9.d9Sign : 0;

    // 방향 집계 — 6가지 지표
    const dirSources = [
        {name:'D1 7궁', sign: d1H7Sign, desc:'출생 차트의 배우자 하우스'},
        {name:'D9 7궁', sign: d9H7Sign, desc:'나바암샤의 배우자 하우스'},
        {name:'D9 7궁주 위치', sign: d9H7RulerSign, desc:'나바암샤 7궁 주인이 가는 사인'},
        {name:'D9 금성(♀)', sign: venusD9Sign, desc:'배우자 카라카의 나바암샤 위치'},
        {name:'우파파다(UL)', sign: ulSign, desc:'12궁 아루다 — 배우자 가문/배경'},
        {name:'다라파다(A7)', sign: a7Sign, desc:'7궁 아루다 — 배우자 사회적 이미지'}
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
        <div class="interp-title">${isEasy ? '🧭 배우자가 올 방향' : '🧭 배우자의 방향 — 6가지 지표 종합 분석'}</div>
        <div class="interp-text">
            ${isEasy ? '배우자가 어느 방향에서 올지를 여러 지표로 분석합니다.' : '베딕 점성술에서는 배우자가 어느 방향에서 올지를 여러 지표를 종합하여 분석합니다.'}<br><br>
            ${isEasy ? '' : '<strong>6가지 지표 분석:</strong><br>' + dirSources.map(s => `• <strong>${s.name}</strong>: ${SIGNS[s.sign]} ${SIGN_SYMBOLS[s.sign]} → <strong>${DIRECTIONS[s.sign]}</strong> <span style="color:#666;font-size:12px;">(${s.desc})</span>`).join('<br>') + '<br><br><strong>🧿 우파파다 라그나(UL):</strong> 12궁의 아루다 파다. 배우자의 가문/배경과 결혼의 환경을 나타냅니다. → <strong>' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign] + '</strong><br><strong>🎯 다라파다(A7):</strong> 7궁의 아루다 파다. 배우자의 사회적 이미지와 외적 인상을 나타냅니다. → <strong>' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign] + '</strong><br><strong>💍 D9 7궁주(' + RULER_NAMES[d9H7Ruler] + '):</strong> 나바암샤 7궁의 주인이 가는 사인이 배우자의 실질적 방향을 나타냅니다. → <strong>' + SIGNS[d9H7RulerSign] + ' ' + SIGN_SYMBOLS[d9H7RulerSign] + '</strong><br><strong>♀ D9 금성:</strong> 배우자의 카라카(상징 행성). 금성의 나바암샤 위치가 배우자 에너지의 근원지입니다. → <strong>' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign] + '</strong><br><br>'}
            <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;margin-top:10px;">
                <strong style="font-size:16px;">🧭 종합 결론: ${agreement >= 4 ? '압도적으로 강한' : agreement >= 3 ? '매우 강한' : agreement >= 2 ? '강한' : ''} ${primaryDir} 방향</strong><br><br>
                6가지 지표 중 <strong>${agreement}개</strong>가 <strong>${primaryDir}</strong>을 가리키고 있습니다.
                ${agreement >= 4 ? '<br>4개 이상의 지표가 일치! <strong>매우 높은 확률</strong>로 ' + primaryDir + ' 방향에서 배우자를 만날 가능성이 있습니다. 이 방향의 도시, 직장, 여행지에 주목하세요.' : ''}
                ${agreement === 3 ? '<br>3개 지표 일치 — <strong>높은 확률</strong>로 ' + primaryDir + ' 방향입니다.' : ''}
                ${agreement === 2 ? '<br>2개 지표 일치 — ' + primaryDir + ' 방향이 우세하지만, 다른 가능성도 있습니다.' : ''}
                ${agreement <= 1 ? '<br>지표가 분산되어 있어 특정 방향보다는 다양한 경로에서 만남이 올 수 있습니다. 열린 마음으로 인연을 기다리세요.' : ''}
                ${sortedDirs.length > 1 && sortedDirs[1][1] === sortedDirs[0][1] ? '<br><br>💡 두 방향이 동등: <strong>' + sortedDirs[0][0] + '</strong>과 <strong>' + sortedDirs[1][0] + '</strong> 모두 가능성이 있습니다.' : ''}
            </div>
        </div>
    </div>`;

    document.getElementById('d9InterpWrap').innerHTML = html;

    // 배우자 프로필은 별도 함수로
    renderSpouseProfile(d1LagnaSign, ulSign, a7Sign, venusD9Sign);
}

function renderSpouseProfile(d1LagnaSign, ulSign, a7Sign, venusD9Sign) {
    const isEasy = window.vedicMode === 'easy';
    let html = '';
    const meetingBySgn = [
        '활동적인 장소, 스포츠, 경쟁적 환경, 리더들의 모임에서 만남. 첫 만남이 강렬하고 전격적.',
        '직장, 금융기관, 레스토랑, 자연 속에서 만남. 천천히 신뢰를 쌓으며 가까워지는 타입.',
        'SNS, 학교, 세미나, 여행 중, 소개팅으로 만남. 대화로 시작되는 관계.',
        '가족 소개, 집안 모임, 같은 동네, 고향 친구를 통해 만남. 편안한 분위기에서 시작.',
        '파티, 공연장, 창작 모임, 화려한 장소에서 만남. 드라마틱한 첫 만남.',
        '직장, 병원, 건강 관련, 봉사 활동에서 만남. 실용적 필요에 의해 만남이 시작.',
        '소개팅, 미팅, 법률/외교 관련, 예술 행사에서 만남. 우아하고 세련된 만남.',
        '위기 상황, 깊은 대화, 비밀스러운 장소, 연구실에서 만남. 운명적이고 강렬한 끌림.',
        '해외, 대학, 종교/철학 모임, 여행 중 만남. 먼 곳에서 인연이 옴. 문화가 다를 수 있음.',
        '직장, 비즈니스, 공식 행사, 상사/동료로 만남. 사회적 지위와 관련된 만남.',
        '온라인, 동호회, 사회운동, 친구의 친구로 만남. 색다르고 비전통적인 만남.',
        '영적 모임, 해외, 예술/음악, 병원, 꿈에서 힌트. 신비롭고 운명적인 만남.'
    ];

    const backgroundBySgn = [
        '독립적이고 자수성가한 집안. 리더십이 강한 가문.',
        '재정적으로 안정된 집안. 전통을 중시하는 가문. 부유한 배경 가능.',
        '지적이고 소통이 활발한 집안. 형제자매가 있거나 교육을 중시.',
        '가정적이고 따뜻한 집안. 어머니의 영향이 큰 가문.',
        '명망 있고 자존심 강한 집안. 사회적 지위가 있는 가문.',
        '실용적이고 근면한 집안. 건강/의료/교육 관련 배경.',
        '균형 잡히고 품위 있는 집안. 예술/법률/외교 관련 배경.',
        '비밀이 있거나 변혁을 겪은 집안. 강한 유산이나 깊은 가족사.',
        '학식 있고 종교/철학적인 집안. 해외 배경이거나 다문화 가정.',
        '엄격하고 전통적인 집안. 사회적으로 존경받는 가문. 책임감 강조.',
        '자유롭고 독특한 집안. 비전통적 가족 구조. 진보적 사고.',
        '영적이거나 예술적인 집안. 해외 배경 가능. 감수성이 풍부한 가문.'
    ];

    const imageBySgn = [
        '에너지 넘치고 당당한 첫인상. 스포티하거나 강인한 이미지.',
        '차분하고 믿음직한 첫인상. 세련되고 품위 있는 이미지.',
        '밝고 수다스러운 첫인상. 지적이고 재치 있는 이미지.',
        '따뜻하고 모성적인 첫인상. 부드럽고 돌봄의 이미지.',
        '화려하고 카리스마 있는 첫인상. 자신감 넘치는 이미지.',
        '깔끔하고 단정한 첫인상. 꼼꼼하고 프로페셔널한 이미지.',
        '우아하고 매력적인 첫인상. 균형 잡히고 세련된 이미지.',
        '신비롭고 강렬한 첫인상. 깊이 있고 카리스마 있는 이미지.',
        '자유롭고 활기찬 첫인상. 긍정적이고 모험적인 이미지.',
        '진지하고 성숙한 첫인상. 책임감 있고 믿음직한 이미지.',
        '독특하고 개성 있는 첫인상. 트렌디하고 독창적인 이미지.',
        '몽환적이고 신비로운 첫인상. 예술적이고 감성적인 이미지.'
    ];

    const attractBySgn = [
        '강인한 에너지와 자신감. 주도적이고 보호해주는 느낌이 매력.',
        '안정감과 감각적 매력. 좋은 음식, 향기, 촉감을 즐기는 타입.',
        '위트와 대화 능력. 지적 자극을 주고받는 것이 매력.',
        '헌신적 돌봄과 감성. 함께 있으면 집처럼 편안한 것이 매력.',
        '빛나는 존재감과 관대함. 함께 있으면 특별해지는 느낌이 매력.',
        '섬세한 배려와 완벽주의. 디테일까지 챙기는 정성이 매력.',
        '우아함과 조화로운 성격. 함께 있으면 아름다운 세상이 되는 느낌.',
        '강렬한 눈빛과 깊이. 영혼까지 꿰뚫는 듯한 집중력이 매력.',
        '자유로운 영혼과 유머. 함께 있으면 모험이 시작되는 느낌.',
        '묵직한 신뢰감과 성숙함. 인생의 반석 같은 안정감이 매력.',
        '독특한 개성과 진보적 사고. 세상에 없던 새로움이 매력.',
        '신비로운 감성과 영적 깊이. 꿈같은 로맨스가 매력.'
    ];

    // D1 7궁 사인으로 만남 환경
    const d1H7ForMeeting = (d1LagnaSign + 6) % 12;

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🤝 배우자를 만나는 환경' : '🤝 배우자를 만나는 환경 — D1 7궁: ' + SIGNS[d1H7ForMeeting] + ' ' + SIGN_SYMBOLS[d1H7ForMeeting]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '7궁 사인이 배우자와의 만남의 환경과 방식을 나타냅니다.<br><br>'}
            <strong>${meetingBySgn[d1H7ForMeeting]}</strong>
            ${d1H7ForMeeting === 8 || d1H7ForMeeting === 11 ? '<br><br>💡 <strong>해외 인연 가능성!</strong> 배우자가 외국인이거나 해외에서 만날 가능성이 있습니다.' : ''}
        </div>
    </div>`;

    // UL 사인으로 배우자 가문/배경
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏛️ 배우자의 가문/배경' : '🏛️ 배우자의 가문/배경 — UL: ' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '우파파다 라그나(UL)는 배우자의 가정환경과 성장 배경을 나타냅니다.<br><br>'}
            <strong>${backgroundBySgn[ulSign]}</strong>
        </div>
    </div>`;

    // A7 사인으로 배우자 외적 이미지
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👤 배우자의 첫인상' : '👤 배우자의 첫인상/외적 이미지 — A7: ' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '다라파다(A7)는 배우자가 세상에 보여주는 외적 이미지, 첫인상을 나타냅니다.<br><br>'}
            <strong>${imageBySgn[a7Sign]}</strong>
        </div>
    </div>`;

    // D9 금성 사인으로 배우자 매력 포인트
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💎 배우자의 매력 포인트' : '💎 배우자의 매력 포인트 — D9 금성: ' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '나바암샤의 금성 위치는 배우자의 핵심 매력과 사랑의 스타일을 나타냅니다.<br><br>'}
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
            <div class="nakshatra-name">당신의 별: ${nak.ko}</div>
            <div class="nakshatra-meaning">"${nak.meaning}"</div>
            <div class="nakshatra-detail">${nak.desc}</div>
        </div>
    ` : `
        <div class="nakshatra-card">
            <div class="nakshatra-name">${nak.ko} (${nak.name})</div>
            <div class="nakshatra-meaning">"${nak.meaning}" — 지배행성: ${DASHA_KO[nak.ruler] || nak.ruler}</div>
            <div class="nakshatra-detail">
                신성: ${nak.deity}<br><br>
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
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 인생은 시기별로 다른 에너지가 흐릅니다. 아래에서 지금 당신이 어떤 시기에 있는지, 앞으로 어떤 시기가 오는지 확인하세요.<br><br>' :
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 <strong>빔쇼타리 대운(Vimshottari Dasha)</strong> — 인생은 9개 행성이 차례로 지배하는 시기로 나뉩니다. <strong>대운(Mahadasha)</strong>은 큰 시기, <strong>소대운(Antardasha/Bhukti)</strong>은 대운 안의 세부 시기입니다. 달의 나크샤트라 위치로 계산됩니다.<br><br>';
    html += isEasy ?
        '</div></div>' :
        '🌙 출생 시 달: <strong>' + nak.ko + ' (' + nak.name + ')</strong> — 첫 대운: <strong>' + DASHA_KO[startRuler] + '</strong> (잔여: ' + remainingYears.toFixed(2) + '년)</div></div>';

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

    const dashaEasyDesc = {Ketu:'내면 성찰과 영적 성장의 시기',Venus:'사랑·아름다움·풍요의 시기',Sun:'자신감과 리더십이 빛나는 시기',Moon:'감정과 가정이 중심이 되는 시기',Mars:'도전과 행동력이 넘치는 시기',Rahu:'큰 변화와 새로운 기회의 시기',Jupiter:'행운과 성장이 찾아오는 시기',Saturn:'인내하면 큰 성과를 얻는 시기',Mercury:'공부·소통·사업이 잘 되는 시기'};

    // Horizontal timeline cards
    html += '<div style="font-size:14px;font-weight:700;color:#c9a84c;margin-bottom:8px;">⏳ 대운 타임라인</div>';
    html += '<div class="dasha-row">';
    periods.forEach((p) => {
        const isCurrent = now >= p.startD && now < p.endD;
        html += '<div class="dasha-card ' + (isCurrent ? 'current' : '') + '">';
        html += '<div class="dp">' + DASHA_KO[p.planet] + '</div>';
        html += '<div class="dd">' + p.startD.getFullYear() + ' ~ ' + p.endD.getFullYear() + '</div>';
        if (isCurrent) html += '<div class="db">현재</div>';
        html += '</div>';
    });
    html += '</div>';

    // Current dasha detail
    var currentP = periods.find(function(p){ return now >= p.startD && now < p.endD; });
    if (currentP) {
        html += '<div class="interp-card" style="border-left:3px solid #c9a84c;margin-top:12px;">';
        html += '<div class="interp-title">현재: ' + DASHA_KO[currentP.planet] + ' 대운 (' + fmtDate(currentP.startD) + ' ~ ' + fmtDate(currentP.endD) + ')</div>';
        html += '<div class="interp-text">' + (isEasy ? dashaEasyDesc[currentP.planet] : DASHA_KO[currentP.planet] + ' 대운 기간입니다.') + '</div>';
        html += '</div>';
    }

    // Detailed list (expandable)
    html += '<div class="dasha-timeline" style="margin-top:12px;">';

    periods.forEach((p, pi) => {
        const isCurrent = now >= p.startD && now < p.endD;
        const age = getAge(p.startD);

        html += '<div class="dasha-item ' + (isCurrent ? 'current' : '') + '" style="cursor:pointer;" onclick="this.querySelector(\'.bhukti-list\') && (this.querySelector(\'.bhukti-list\').style.display = this.querySelector(\'.bhukti-list\').style.display===\'none\'?\'\':\'none\')">';
        html += '<span class="dasha-planet">' + DASHA_KO[p.planet] + '</span>';
        html += '<span class="dasha-period">' + fmtDate(p.startD) + ' ~ ' + fmtDate(p.endD) + '</span>';
        html += '<span class="dasha-years">' + (p.actualDays / 365.25).toFixed(1) + '년</span>';
        if (isCurrent) html += '<span class="dasha-badge">현재</span>';
        html += '<span style="font-size:10px;color:#666;margin-left:4px;">(' + age + '세) ▼</span>';

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
            html += '<span>(' + bAge + '세)</span>';
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
    // 1. 성격 & 외모 (1궁 라그나)
    // ═══════════════════════════════════
    const lagnaEasy = [
        '행동파! 결단력이 빠르고 리더 기질이 있어요. 새로운 도전을 좋아합니다. 앞장서서 이끄는 성격이라 주변에서 먼저 나서달라는 부탁을 많이 받아요. 참을성이 좀 부족할 수 있지만, 그만큼 추진력이 강합니다.',
        '안정을 사랑해요. 편안하고 아름다운 것을 좋아하며, 한번 마음먹으면 끝까지 가는 타입. 좋은 음식, 좋은 음악, 아름다운 공간에서 행복을 느낍니다. 고집이 세지만 그만큼 신뢰할 수 있는 사람이에요.',
        '호기심 대왕! 말을 잘하고 다재다능해요. 여러 가지를 동시에 하는 걸 좋아합니다. 새로운 정보를 빠르게 습득하고, 재치 있는 대화로 사람들을 끌어당겨요. 가끔 산만할 수 있지만 그게 매력이에요.',
        '감성적이고 따뜻해요. 가족을 소중히 여기고, 사람들의 마음을 잘 읽어요. 누군가를 돌보는 일에 타고난 재능이 있고, 함께 있으면 편안한 느낌을 주는 사람입니다. 감정 기복이 있을 수 있지만 깊은 공감 능력의 소유자예요.',
        '타고난 리더! 존재감이 크고 창작 활동에 재능이 있어요. 사람들의 시선을 자연스럽게 끌어당기며, 자신감 넘치는 모습이 매력적입니다. 인정받고 싶은 마음이 강하지만, 그만큼 관대하게 사랑을 나눠주는 사람이에요.',
        '꼼꼼하고 분석적이에요. 완벽을 추구하며 건강에 관심이 많습니다. 세밀한 관찰력으로 남들이 놓치는 것을 발견하고, 실용적인 해결책을 잘 찾아요. 걱정이 좀 많지만, 그만큼 준비를 철저히 하는 사람입니다.',
        '조화를 추구해요. 세련되고 매력적이며, 예술적 감각이 뛰어납니다. 사람들 사이에서 균형을 잡는 능력이 있고, 불화를 싫어해요. 아름다운 것에 둘러싸여 있을 때 가장 행복한 사람입니다.',
        '깊이가 있어요. 직관이 강하고 본질을 꿰뚫어 봐요. 겉으로는 차분해 보이지만 내면에는 강렬한 감정이 흐릅니다. 인생에서 큰 변화를 여러 번 겪으며, 그때마다 더 강해지는 사람이에요.',
        '자유로운 영혼! 여행과 배움을 사랑하며, 긍정적이에요. 새로운 문화와 철학에 관심이 많고, 넓은 시야로 세상을 바라봅니다. 유머 감각이 뛰어나서 주변을 밝게 만드는 사람이에요.',
        '야망이 있어요. 인내심이 강하고 나이 들수록 매력이 늘어납니다. 체계적으로 목표를 향해 나아가며, 사회적 성취를 중시해요. 젊을 때 고생하더라도 결국 원하는 것을 이루는 대기만성형입니다.',
        '독특해요. 남들과 다른 생각을 하며 혁신적이에요. 틀에 박히는 걸 싫어하고, 자유로운 방식으로 세상을 바꾸고 싶어합니다. 기술이나 과학에 재능이 있고, 인류를 위한 큰 그림을 그리는 사람이에요.',
        '감수성이 풍부해요. 직관이 강하고 예술이나 영적인 것에 끌려요. 꿈이 선명하고 상상력이 풍부하며, 타인의 고통에 깊이 공감합니다. 현실 세계보다 내면 세계가 더 풍요로운 사람이에요.'
    ];
    const lagnaInterp = [
        '화성이 지배하는 양자리 라그나. 강한 의지와 리더십, 독립적 성격. 행동이 빠르고 개척자 정신이 강합니다. 체격은 날카로운 이목구비에 활동적인 인상. 성급하지만 용감하며, 경쟁에서 두각을 나타냅니다.',
        '금성이 지배하는 황소자리 라그나. 안정과 풍요를 추구하며 감각적인 아름다움을 사랑합니다. 부드러운 외모에 매력적인 목소리. 물질적 안정을 중시하며 예술적 감각이 뛰어납니다. 고집이 세지만 신뢰할 수 있는 사람.',
        '수성이 지배하는 쌍둥이자리 라그나. 지적 호기심이 왕성하고 소통 능력이 탁월합니다. 젊어 보이는 외모에 민첩한 체형. 다재다능하지만 산만할 수 있으며, 글쓰기와 언어에 재능이 있습니다.',
        '달이 지배하는 게자리 라그나. 감수성이 풍부하고 직관적입니다. 둥근 얼굴에 부드러운 인상. 가정과 가족에 헌신적이며 보호 본능이 강합니다. 감정 기복이 있지만 깊은 공감 능력의 소유자.',
        '태양이 지배하는 사자자리 라그나. 카리스마와 창조적 에너지가 넘칩니다. 당당한 체격에 존재감 있는 외모. 리더십이 천부적이며 주목받는 것을 즐깁니다. 자존심이 높지만 관대한 마음.',
        '수성이 지배하는 처녀자리 라그나. 분석적이고 완벽을 추구합니다. 단정한 외모에 지적인 인상. 세밀한 관찰력과 실용적 능력이 뛰어나며 건강과 위생에 관심이 많습니다.',
        '금성이 지배하는 천칭자리 라그나. 균형과 조화를 추구하며 외교적입니다. 균형 잡힌 외모에 세련된 인상. 대인관계와 파트너십에서 뛰어나며 예술과 미에 대한 감각이 탁월합니다.',
        '화성이 지배하는 전갈자리 라그나. 강렬한 직관과 변혁의 힘. 날카로운 눈빛에 신비로운 인상. 깊은 통찰력으로 본질을 꿰뚫으며, 비밀을 잘 지킵니다. 극적인 인생 변화를 여러 번 경험합니다.',
        '목성이 지배하는 사수자리 라그나. 자유와 진리를 추구하는 철학자. 큰 체격에 밝은 인상. 낙관적이며 도덕적 가치를 중시합니다. 여행과 고등 교육에 인연이 깊습니다.',
        '토성이 지배하는 염소자리 라그나. 야망과 인내심이 강합니다. 마른 체형에 진지한 인상. 체계적으로 목표를 향해 나아가며 나이가 들수록 젊어지는 타입. 사회적 지위와 성취를 중시합니다.',
        '토성이 지배하는 물병자리 라그나. 혁신적이고 독창적입니다. 독특한 외모에 지적인 인상. 인도주의적 가치를 중시하며 틀에 박히지 않는 사고방식. 기술과 과학에 재능이 있습니다.',
        '목성이 지배하는 물고기자리 라그나. 영적이고 직관적입니다. 부드러운 외모에 꿈꾸는 듯한 인상. 예술적 감수성이 극도로 뛰어나며 초월적 세계에 관심이 많습니다. 자기희생적 성향.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">👤 ${isEasy ? '당신의 성격' : '성격 & 외모 — 라그나: ' + SIGNS[lagnaSign] + ' ' + SIGN_SYMBOLS[lagnaSign]}</div>
        <div class="interp-text">${isEasy ? lagnaEasy[lagnaSign] : lagnaInterp[lagnaSign]}</div>
    </div>`;

    // ═══════════════════════════════════
    // 2. 내면 & 감정 (달 별자리)
    // ═══════════════════════════════════
    if (moonPos) {
        const moonEasy = [
            '당신의 내면에는 불같은 열정이 있습니다. 감정이 빠르게 올라오고 빠르게 식어요. 화가 나면 확 올라오지만 금세 풀리는 타입. 스트레스를 받으면 가만히 있지 못하고 몸을 움직이고 싶어져요. 운동이나 야외 활동이 감정 해소에 가장 좋은 방법입니다.',
            '당신은 감정적으로 매우 안정적인 사람입니다. 급격한 변화를 싫어하고, 익숙한 것에서 안정감을 느껴요. 좋은 음식, 좋은 음악, 아름다운 자연 속에서 마음이 치유됩니다. 한번 마음을 주면 쉽게 변하지 않는 일편단심이지만, 그만큼 집착할 수 있어요.',
            '당신은 감정을 이성적으로 처리하는 편입니다. 기분이 안 좋을 때 누군가와 대화하면 마음이 정리돼요. 호기심이 많아서 여러 가지에 동시에 관심을 가지며, 지루함을 참지 못합니다. 가벼운 유머로 분위기를 바꾸는 재주가 있어요.',
            '당신은 감수성이 극도로 풍부한 사람입니다. 다른 사람의 감정을 스펀지처럼 흡수하며, 공감 능력이 타고났어요. 가정에서 편안함을 느끼고, 어머니와의 유대가 강합니다. 요리하거나 집을 꾸미는 활동에서 정서적 안정을 찾아요.',
            '당신은 감정 표현이 화려하고 열정적입니다. 사랑받고 인정받고 싶은 욕구가 강하며, 무시당하면 깊이 상처받아요. 하지만 그만큼 사랑을 줄 때도 아낌없이 주는 관대한 마음의 소유자입니다. 창작 활동이 감정적 치유제가 됩니다.',
            '당신은 감정을 분석하고 정리하는 경향이 있어요. 걱정이 많고 완벽주의적이지만, 문제를 실용적으로 해결하는 능력이 뛰어납니다. 일상의 루틴 — 아침 운동, 건강한 식사, 정리 정돈 — 에서 감정적 안정을 찾아요.',
            '당신은 관계 속에서 감정의 균형을 찾는 사람입니다. 혼자 있으면 외로움을 느끼며, 파트너나 친한 친구와 함께 있을 때 가장 안정돼요. 갈등과 불화를 극도로 싫어하며, 예술과 아름다운 환경에서 마음의 평화를 찾습니다.',
            '당신의 감정은 바다처럼 깊고 강렬합니다. 사랑도 미움도 깊은 편이며, 배신을 절대 잊지 않아요. 직관이 매우 강해서 상대의 말보다 눈빛, 행동에서 진심을 읽습니다. 깊은 관계를 원하며, 피상적인 관계는 의미가 없다고 생각합니다.',
            '당신은 감정적으로 밝고 낙관적인 사람입니다. 자유를 사랑하고 구속을 싫어하며, 새로운 경험과 모험을 통해 마음이 치유돼요. 여행이 최고의 감정 해소법이며, 철학적 사고를 통해 감정을 승화시킵니다.',
            '당신은 감정을 겉으로 잘 드러내지 않는 편입니다. 책임감이 강하고 감정보다 의무를 우선시하며, 어린 시절 어른스러웠을 수 있어요. 하지만 나이가 들수록 감정적으로 성숙해지고, 점점 편안하게 자신을 표현하게 됩니다.',
            '당신은 독특하고 예측 불가능한 감정 패턴을 가지고 있어요. 일반적이지 않은 방식으로 사랑하며, 개인적 감정보다 큰 대의를 추구합니다. 독립적이고 자유로운 감정 생활을 원하며, 사회적 활동에서 감정적 만족을 느낍니다.',
            '당신은 극도로 직관적이고 영적인 사람입니다. 꿈이 선명하고 때로는 미래를 예감하기도 해요. 타인의 고통에 깊이 공감하며, 예술, 명상, 물 근처에서 마음의 안정을 찾습니다. 현실 세계보다 내면 세계가 더 풍요로운 사람입니다.'
        ];
        const moonInterp = [
            '내면에 불같은 열정이 있습니다. 감정이 즉흥적이고 빠르게 변합니다. 화가 빨리 나지만 금세 풀리며, 독립적인 감정 생활을 원합니다. 스트레스를 운동으로 해소하면 좋습니다.',
            '감정적으로 매우 안정적이며 편안함을 추구합니다. 변화를 싫어하고 익숙한 것에서 안정감을 느낍니다. 좋은 음식, 음악, 자연에서 치유됩니다. 한번 마음을 주면 쉽게 변하지 않습니다.',
            '감정을 이성적으로 처리하며 대화를 통해 마음을 정리합니다. 호기심이 많고 여러 관심사를 동시에 추구합니다. 감정적 깊이보다 다양성을 추구하며, 지루함을 참지 못합니다.',
            '달의 본궁(본래 자리). 감수성이 극도로 풍부하며 타인의 감정을 스펀지처럼 흡수합니다. 모성 본능이 강하고 가정에서 안정을 느낍니다. 달의 주기에 따라 감정이 변할 수 있습니다.',
            '감정 표현이 드라마틱하고 열정적입니다. 인정받고 사랑받고 싶은 욕구가 강하며, 무시당하면 깊이 상처받습니다. 창조적 활동이 감정적 치유가 됩니다. 로맨틱하고 관대한 마음.',
            '감정을 분석하고 정리하는 경향이 있습니다. 걱정이 많고 완벽주의적이지만 실용적으로 해결합니다. 건강에 대한 걱정이 있을 수 있으며, 일상의 루틴에서 안정감을 찾습니다.',
            '관계 속에서 감정의 균형을 찾습니다. 혼자 있으면 불안하며 파트너와 함께일 때 안정됩니다. 갈등과 불화를 극도로 싫어하며, 예술과 아름다움에서 마음의 평화를 찾습니다.',
            '감정이 바다처럼 깊고 강렬합니다. 사랑도 미움도 깊으며, 배신을 절대 용서하지 않습니다. 직관이 매우 강해 상대의 진심을 본능적으로 파악합니다. 변혁과 재생의 감정 에너지.',
            '감정적으로 낙관적이며 자유를 사랑합니다. 구속을 싫어하고 새로운 경험을 추구합니다. 철학적 사고를 통해 감정을 승화시키며, 여행이 최고의 치유제입니다.',
            '감정을 잘 통제하며 겉으로 드러내지 않습니다. 책임감이 강하고 감정보다 의무를 우선시합니다. 어린 시절 감정적 어려움이 있었을 수 있으나 나이 들수록 감정적으로 성숙해집니다.',
            '독특하고 예측 불가능한 감정 패턴. 독립적이며 일반적이지 않은 방식으로 사랑합니다. 사회적 대의와 인류에 대한 보편적 사랑을 추구하며, 개인적 감정보다 큰 그림을 봅니다.',
            '극도로 직관적이고 영적입니다. 꿈이 선명하고 예지적일 수 있습니다. 타인의 고통에 깊이 공감하며 자기와 타인의 경계가 모호합니다. 예술, 명상, 영적 수행에서 안정을 찾습니다.'
        ];
        html += `<div class="interp-card">
            <div class="interp-title">🌙 ${isEasy ? '당신의 감정 스타일' : '내면 & 감정 — 달: ' + SIGNS[moonPos.sign] + ' ' + SIGN_SYMBOLS[moonPos.sign]}</div>
            <div class="interp-text">${isEasy ? moonEasy[moonPos.sign] : moonInterp[moonPos.sign]}</div>
        </div>`;
    }

    // ═══════════════════════════════════
    // 3. 💰 재물운 (2궁, 11궁 분석)
    // ═══════════════════════════════════
    const h2planets = planetsInHouse(2);
    const h11planets = planetsInHouse(11);
    const h2sign = (lagnaSign + 1) % 12;
    const h11sign = (lagnaSign + 10) % 12;

    let wealthText = isEasy ? '' : `<strong>2궁 (축적된 재산):</strong> ${SIGNS[h2sign]}에 위치. `;
    if (h2planets.length === 0) {
        wealthText += isEasy ? '재물 축적은 꾸준하고 안정적입니다. 큰 변동 없이 차곡차곡 모이는 타입이에요. ' : '2궁에 행성이 없어 재물 축적은 꾸준하지만 특별한 변동 없이 안정적입니다. ';
    } else {
        h2planets.forEach(p => {
            const pWealth = {
                'Sun': '권위와 지위를 통한 수입. 정부나 공공 부문에서 재물을 얻을 수 있습니다.',
                'Moon': '유동적인 재정 상황. 대중과 관련된 사업이나 식음료 분야에서 수입 가능.',
                'Mars': '공격적인 재테크 성향. 부동산, 기술, 군사 관련 분야에서 수입.',
                'Mercury': '지적 능력으로 돈을 법니다. 글쓰기, 교육, 통신, IT 분야에서 재물.',
                'Jupiter': '가장 길한 배치! 풍족한 재물운. 교육, 법률, 종교 분야에서 큰 수입.',
                'Venus': '사치품, 예술, 엔터테인먼트, 패션으로 재물을 모읍니다. 풍요로운 식생활.',
                'Saturn': '천천히 꾸준히 재물을 모읍니다. 초기에 어려움이 있지만 중년 이후 안정.',
                'Rahu': '비전통적 방법으로 돈을 법니다. 외국, 기술, 혁신 분야에서 갑작스런 재물.',
                'Ketu': '재물에 대한 무관심. 영적 가치를 물질보다 중시하며, 갑작스런 손실 주의.'
            };
            wealthText += isEasy ? `${pWealth[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pWealth[p.id] || ''} `;
        });
    }

    wealthText += isEasy ? '<br><br>' : `<br><br><strong>11궁 (수입과 이익):</strong> ${SIGNS[h11sign]}에 위치. `;
    if (h11planets.length === 0) {
        wealthText += isEasy ? '수입은 안정적이지만 큰 변동은 없어요.' : '11궁에 행성이 없어 수입은 안정적이지만 크게 변동하지 않습니다.';
    } else {
        h11planets.forEach(p => {
            const pIncome = {
                'Jupiter': '큰 수입과 풍족한 이익! 사회적 네트워크가 재물을 가져옵니다.',
                'Venus': '예술, 사교, 패션을 통한 수입. 여성 친구들이 도움이 됩니다.',
                'Saturn': '꾸준하고 안정적인 수입이지만 느린 성장. 노후 보장이 좋습니다.',
                'Mars': '경쟁을 통한 수입. 기술, 부동산, 스포츠 관련 이익.',
                'Mercury': '지적 네트워크를 통한 수입. 사업가 기질.',
                'Sun': '권위를 통한 수입. 정치적 연결이 재물을 가져옵니다.',
                'Moon': '대중적 인기를 통한 수입. 변동이 있지만 꾸준한 흐름.'
            };
            wealthText += isEasy ? `${pIncome[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pIncome[p.id] || ''} `;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">💰 ${isEasy ? '내 재물운' : '재물운'}</div>
        <div class="interp-text">${wealthText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 4. 💕 배우자 & 결혼운 (7궁 분석)
    // ═══════════════════════════════════
    const h7sign = (lagnaSign + 6) % 12;
    const h7planets = planetsInHouse(7);
    const venus = positions.find(p => p.id === 'Venus');

    const spouseSign = [
        '배우자가 독립적이고 에너지 넘치는 성격. 강한 의지와 리더십을 가진 사람과 인연. 활동적이고 직접적인 파트너.',
        '아름답고 예술적인 배우자. 물질적으로 안정적인 사람과 인연. 감각적이며 충성스러운 파트너.',
        '지적이고 소통 능력이 좋은 배우자. 대화가 잘 통하는 사람과 인연. 유머감각이 있고 다재다능한 파트너.',
        '감성적이고 가정적인 배우자. 돌봐주는 성격의 사람과 인연. 어머니 같은 따뜻함을 가진 파트너.',
        '카리스마 있고 당당한 배우자. 사회적으로 주목받는 사람과 인연. 자존심이 높지만 관대한 파트너.',
        '꼼꼼하고 실용적인 배우자. 건강과 웰빙에 관심 많은 사람과 인연. 분석적이고 봉사적인 파트너.',
        '매력적이고 세련된 배우자. 외교적이며 균형감각이 좋은 사람과 인연. 예술적 감각이 뛰어난 파트너.',
        '강렬하고 신비로운 배우자. 깊은 감정을 가진 사람과 인연. 변혁적이고 열정적인 파트너. 비밀이 많을 수 있음.',
        '자유롭고 낙관적인 배우자. 외국인이나 다른 문화권 사람과 인연 가능. 철학적이고 모험을 좋아하는 파트너.',
        '진지하고 야망 있는 배우자. 나이 차이가 있을 수 있음. 책임감 강하고 사회적으로 성공한 파트너. 결혼이 늦을 수 있음.',
        '독특하고 독립적인 배우자. 비전통적인 만남이나 관계. 지적이고 혁신적인 파트너. 자유로운 결혼 형태.',
        '영적이고 직관적인 배우자. 예술가나 영적 종사자와 인연. 꿈꾸는 듯한 로맨틱한 파트너. 이상화 경향 주의.'
    ];

    const spouseAppearance = [
        '날카로운 이목구비, 강한 인상. 운동선수 같은 탄탄한 체형이나 근육질. 눈빛이 강렬하고 에너지가 넘치는 외모. 붉은 계열 옷이 잘 어울리며, 활동적이고 역동적인 분위기.',
        '부드럽고 매력적인 외모. 풍만한 체형에 감각적인 입술. 피부가 좋고 자연스러운 아름다움. 목소리가 좋으며 전체적으로 따뜻하고 편안한 인상. 브랜드 옷을 즐김.',
        '젊어 보이는 외모에 밝은 인상. 날씬하고 키가 큰 편. 말을 잘하며 표정이 풍부하고 눈이 반짝임. 유행에 민감하고 스타일리시한 패션 감각.',
        '둥근 얼굴에 부드러운 인상. 살짝 통통하거나 곡선미가 있는 체형. 피부가 희고 눈이 큼. 모성적 분위기. 편안한 옷차림을 선호하며 집에서 더 매력적.',
        '당당한 체격에 카리스마 넘치는 외모. 풍성한 머리카락이 특징. 눈에 띄는 존재감이 있으며 옷을 잘 입음. 화려한 액세서리를 좋아하며 어디서든 시선을 끄는 타입.',
        '단정하고 깔끔한 외모. 마른 편이며 비율이 좋음. 지적인 인상에 안경이 잘 어울림. 미니멀한 패션을 선호하며 청결함이 매력 포인트. 디테일에 신경 쓰는 스타일.',
        '균형 잡힌 외모에 세련된 인상. 대칭적인 얼굴형. 미소가 매력적이고 사교적인 분위기. 패션 감각이 뛰어나고 항상 잘 차려입음. 보조개가 있을 수 있음.',
        '날카롭고 신비로운 외모. 깊은 눈빛이 강한 인상을 남김. 마른 편이며 날카로운 이목구비. 전체적으로 어두운 톤의 옷을 선호. 카리스마 있는 분위기에 숨겨진 섹시함.',
        '키가 크고 체격이 좋음. 밝고 개방적인 인상. 이국적인 매력이 있거나 외국인 같은 분위기. 캐주얼하고 자유로운 옷차림. 웃는 얼굴이 매력적이며 스포티한 스타일.',
        '진지하고 성숙한 외모. 마른 편이며 뼈대가 뚜렷함. 나이보다 어른스러워 보이며 시간이 갈수록 매력이 늘어남. 정장이 잘 어울리며 클래식한 스타일. 턱선이 뚜렷.',
        '독특하고 비범한 외모. 개성 있는 패션 스타일. 키가 크거나 눈에 띄는 특징이 있음. 평범하지 않은 매력. 미래적이고 실험적인 스타일을 좋아함.',
        '부드럽고 몽환적인 외모. 큰 눈에 꿈꾸는 듯한 표정. 살짝 통통한 편이며 피부가 투명함. 파스텔 톤이 잘 어울리며 예술가 분위기. 신비로운 매력.'
    ];

    let spouseText = (isEasy ? '' : '<strong>📐 배우자 외모 & 첫인상:</strong><br>') + spouseAppearance[h7sign] + (isEasy ? '<br><br>' : isEasy ? '<br><br>' : '<br><br><strong>📋 배우자 성격:</strong><br>') + spouseSign[h7sign];

    if (h7planets.length > 0) {
        spouseText += isEasy ? '<br><br>' : '<br><br><strong>7궁의 행성:</strong> ';
        h7planets.forEach(p => {
            const pH7 = {
                'Sun': '배우자가 사회적으로 인정받는 사람. 다소 지배적일 수 있으나 존경스러운 파트너.',
                'Moon': '감성적이고 돌봐주는 배우자. 감정적 교감이 깊은 결혼 생활.',
                'Mars': '열정적이지만 다툼이 잦을 수 있음. 강한 성격의 배우자. 에너지 넘치는 관계. (쿠자 도샤 주의)',
                'Mercury': '지적이고 대화가 잘 통하는 배우자. 사업 파트너로도 좋은 관계.',
                'Jupiter': '가장 축복받은 배치! 현명하고 도덕적인 배우자. 행복한 결혼 생활. 배우자를 통한 행운.',
                'Venus': '매우 매력적이고 사랑이 넘치는 배우자. 로맨틱한 결혼 생활. 사치를 좋아할 수 있음.',
                'Saturn': '결혼이 늦어지거나 나이 차이가 큰 배우자. 초기 어려움 후 안정적이고 오래가는 결혼.',
                'Rahu': '비전통적인 결혼. 외국인이나 다른 배경의 배우자. 갑작스러운 만남. 환상에 주의.',
                'Ketu': '배우자에 대한 초연함. 전생의 인연. 영적 연결이 강하지만 세속적 관계에서는 거리감.'
            };
            spouseText += isEasy ? `<br>${pH7[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pH7[p.id] || ''}`;
        });
    }

    if (venus) {
        const venusHouse = houseOf(venus.sign);
        spouseText += isEasy ? '<br><br>' : `<br><br><strong>금성 위치 (${venusHouse}궁):</strong> `;
        const venusHouseInterp = {
            1: '매력적인 외모. 연애를 즐기며 쉽게 사랑에 빠집니다.',
            2: '배우자를 통해 재물이 들어옵니다. 아름다운 목소리와 식도락.',
            3: '예술적 소통 능력. 형제자매와의 즐거운 관계.',
            4: '가정에서의 행복과 아름다운 주거. 어머니의 영향이 큽니다.',
            5: '로맨스가 풍부한 인생. 자녀와의 좋은 관계. 창작 활동에서 기쁨.',
            6: '연애에서 봉사적 태도. 직장에서의 로맨스 가능성.',
            7: '배우자가 매우 매력적. 행복한 결혼 생활의 강력한 지표.',
            8: '깊고 변혁적인 사랑. 비밀스러운 연애. 배우자의 재산.',
            9: '외국에서의 로맨스. 스승이나 멘토와의 인연. 철학적 사랑.',
            10: '사회적으로 인정받는 결혼. 직업을 통한 만남.',
            11: '친구에서 연인으로. 사교적 활동에서 인연을 만남.',
            12: '비밀스러운 연애. 외국에서의 인연. 영적 사랑.'
        };
        spouseText += venusHouseInterp[venusHouse] || '';
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 내 배우자' : '💕 배우자 & 결혼운 — 7궁: ' + SIGNS[h7sign] + ' ' + SIGN_SYMBOLS[h7sign]}</div>
        <div class="interp-text">${spouseText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 5. 💼 직업 & 사회적 성취 (10궁 분석)
    // ═══════════════════════════════════
    const h10sign = (lagnaSign + 9) % 12;
    const h10planets = planetsInHouse(10);

    const careerSign = [
        '군대, 경찰, 스포츠, 외과, 기업 경영, 리더십 직종에 적합.',
        '금융, 요식업, 농업, 패션, 부동산, 예술, 은행 관련 직종.',
        '미디어, 글쓰기, 교육, 통신, IT, 마케팅, 번역 관련 직종.',
        '의료, 간호, 호텔업, 해양, 부동산, 식음료 관련 직종.',
        '정치, 연예, 경영, 정부 기관, 리더십 포지션, 금 관련 직종.',
        '의료, 회계, 분석, 컨설팅, 건강관리, 품질관리 직종.',
        '법률, 외교, 패션, 인테리어, 상담, 이벤트 기획 직종.',
        '연구, 조사, 보험, 의학, 심리학, 세무, 광업 관련 직종.',
        '교육, 법률, 종교, 출판, 여행, 국제 무역 관련 직종.',
        '경영, 공무원, 건축, 토목, 정치, 대기업 관련 직종.',
        '기술, 과학, IT, 항공, 우주, 사회사업, 혁신 분야.',
        '예술, 영화, 음악, 의료, 해외, 영적 분야, NGO 관련 직종.'
    ];

    let careerText = isEasy ? careerSign[h10sign] : `10궁은 ${SIGNS[h10sign]}에 위치. ${careerSign[h10sign]}`;

    if (h10planets.length > 0) {
        careerText += isEasy ? '<br><br>' : '<br><br><strong>10궁의 행성:</strong>';
        h10planets.forEach(p => {
            const pCareer = {
                'Sun': ' 정부, 리더십, 권위 있는 직위. 사회적으로 주목받는 커리어.',
                'Moon': ' 대중과 관련된 직업. 케어링, 호텔, 식음료, 감정 관련 직종.',
                'Mars': ' 기술, 엔지니어링, 군사, 외과, 스포츠. 경쟁적 분야에서 성공.',
                'Mercury': ' 비즈니스, 커뮤니케이션, IT, 교육. 지적 능력으로 성공.',
                'Jupiter': ' 교육, 법률, 종교, 컨설팅. 존경받는 직업. 가장 좋은 배치 중 하나.',
                'Venus': ' 예술, 엔터테인먼트, 패션, 뷰티, 외교. 창의적 분야에서 성공.',
                'Saturn': ' 느리지만 확실한 성공. 체계적 조직, 건축, 공무원. 중년 이후 빛남.'
            };
            careerText += isEasy ? `<br>${pCareer[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pCareer[p.id] || ''}`;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 내 직업' : '💼 직업 & 사회적 성취 — 10궁: ' + SIGNS[h10sign] + ' ' + SIGN_SYMBOLS[h10sign]}</div>
        <div class="interp-text">${careerText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 6. 🏥 건강 (6궁 + 라그나 분석)
    // ═══════════════════════════════════
    const h6sign = (lagnaSign + 5) % 12;
    const h6planets = planetsInHouse(6);

    const healthByLagna = [
        '머리, 뇌, 얼굴 관련 질환에 주의. 두통, 열병, 염증 경향. 규칙적 운동이 필수.',
        '목, 갑상선, 턱 관련 주의. 과식과 당뇨 경향. 성대와 목 건강 관리.',
        '폐, 팔, 어깨, 신경계 주의. 불안과 수면 문제 가능. 호흡 명상이 도움.',
        '위장, 가슴, 유방 관련 주의. 소화 장애와 수분 저류. 감정 스트레스가 건강에 직결.',
        '심장, 등, 척추 관련 주의. 심혈관 건강 관리 필수. 과로 주의.',
        '소화기계, 장, 피부 관련 주의. 소화불량과 알레르기. 식이요법이 중요.',
        '신장, 허리, 피부 관련 주의. 수분 섭취와 균형 잡힌 생활 필수.',
        '생식기, 배설기계 관련 주의. 만성 질환 가능성. 정기 검진 중요.',
        '간, 허벅지, 엉덩이 관련 주의. 과체중 경향. 야외 활동이 건강에 좋음.',
        '뼈, 관절, 무릎, 피부 관련 주의. 류마티스, 관절염. 칼슘 섭취 중요.',
        '발목, 종아리, 순환계 관련 주의. 혈압 관리. 독특한 건강 문제 가능.',
        '발, 림프계, 면역 관련 주의. 원인 불명 질환 가능. 충분한 수면이 핵심.'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏥 내 건강' : '🏥 건강 — 취약 부위'}</div>
        <div class="interp-text">${healthByLagna[lagnaSign]}${h6planets.length > 0 ? isEasy ? '<br><br>건강 관리에 특별한 주의가 필요합니다.' : '<br><br>6궁에 ' + h6planets.map(p => p.name).join(', ') + '이(가) 위치하여 건강 관리에 특별한 주의가 필요합니다.' : ''}</div>
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
                    'Sun': '자아 발견과 권위의 시기. 리더십을 발휘하고 사회적 인정을 받는 시기입니다. 정부나 권위자와의 관계가 중요해집니다. 아버지와의 관계에 변화가 생길 수 있습니다. 건강에서는 심장과 눈에 주의하세요. 이 시기에 자존감과 정체성이 강화됩니다.',
                    'Moon': '감정과 내면의 시기. 가정과 어머니와의 관계가 중요해집니다. 부동산 관련 일이 생길 수 있으며, 대중과의 관계가 활발해집니다. 감정적 변동이 크지만 직관이 강해지는 시기. 여행과 이사의 가능성.',
                    'Mars': '행동과 에너지의 시기. 용감하게 새로운 일을 시작하기 좋은 때입니다. 부동산 매매, 수술, 기술 관련 활동이 활발해집니다. 형제와의 관계 변화. 다만 분쟁, 사고, 화상에 주의하세요. 운동과 경쟁에서 좋은 결과.',
                    'Rahu': '급변과 혁신의 시기. 예상치 못한 기회와 도전이 옵니다. 외국 관련 일이 활발해지며, 기술과 혁신 분야에서 발전 가능. 물질적 욕망이 강해지나 환상에 빠지지 않도록 주의. 독특한 경험을 하게 됩니다. 18년의 긴 주기.',
                    'Jupiter': '행운과 성장의 시기! 교육, 결혼, 출산, 승진 등 인생의 좋은 일들이 일어나기 쉬운 때. 영적 성장과 지혜가 깊어집니다. 스승이나 멘토를 만나게 됩니다. 법률, 교육, 종교 관련 활동이 유리합니다.',
                    'Saturn': '인내와 시련의 시기. 느리지만 확실한 성장을 합니다. 책임이 무거워지고 제한과 구조화를 경험합니다. 건강, 특히 뼈와 관절에 주의. 19년의 긴 주기로, 진정한 실력이 시험받는 시기. 끝나면 단단해진 자신을 발견합니다.',
                    'Mercury': '지적 활동과 비즈니스의 시기. 학습, 커뮤니케이션, 글쓰기, 사업에 유리합니다. 새로운 기술을 배우기 좋은 때. 형제, 친구와의 관계가 활발해집니다. 신경계 건강에 주의. 여러 가지 일을 동시에 하게 됩니다.',
                    'Ketu': '영적 각성과 분리의 시기. 물질세계에서 초연해지며 영적 관심이 깊어집니다. 갑작스런 변화와 상실을 경험할 수 있으나 그것이 영적 성장으로 이어집니다. 직관이 매우 강해지며, 명상과 수행에 좋은 시기.',
                    'Venus': '사랑과 풍요의 시기! 연애, 결혼, 예술 활동이 활발해집니다. 물질적 풍요를 누리며 사치를 즐기게 됩니다. 새 차, 새 집, 보석 등을 얻을 수 있습니다. 미적 감각이 발달하고 사교 활동이 활발해집니다. 20년의 가장 긴 주기.'
                };
                html += `<div class="interp-card">
                    <div class="interp-title">${isEasy ? '⏳ 지금 내 운세 시기: ' + DASHA_KO[currentDasha] : '⏳ 현재 대운: ' + DASHA_KO[currentDasha] + ' 다샤'}</div>
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
            yogaText += isEasy ? '<strong>🐘 지혜와 명성의 축복</strong>' : '<strong>🐘 가자케사리 요가 (Gajakesari)</strong> — 달과 목성이 켄드라 관계! 지혜, 명성, 풍요의 조합. 사회적으로 존경받고 지적 능력이 뛰어납니다. 좋은 교육과 자녀 운.<br><br>';
        }
    }

    // Budha-Aditya Yoga
    const sun = positions.find(p => p.id === 'Sun');
    const mercury = positions.find(p => p.id === 'Mercury');
    if (sun && mercury && sun.sign === mercury.sign) {
        yogaText += isEasy ? '<strong>📚 뛰어난 지성의 축복</strong>' : '<strong>📚 부다-아디티야 요가</strong> — 태양과 수성이 같은 별자리! 뛰어난 지성과 소통 능력. 교육, 글쓰기, 비즈니스에서 성공. 권위 있는 지적 리더.<br><br>';
    }

    // Chandra-Mangala Yoga
    if (moonPos && mars && moonPos.sign === mars.sign) {
        yogaText += isEasy ? '<strong>🔥 강한 의지와 재물의 축복</strong>' : '<strong>🔥 찬드라-망갈라 요가</strong> — 달과 화성이 같은 별자리! 강한 의지와 재물 축적 능력. 사업에서 성공하며 대담한 결정을 내립니다.<br><br>';
    }

    // Kuja Dosha (Manglik)
    if (mars) {
        const marsH = houseOf(mars.sign);
        if ([1,2,4,7,8,12].includes(marsH)) {
            yogaText += isEasy ? `<strong>⚠️ 결혼 시 주의사항</strong>` : `<strong>⚠️ 쿠자 도샤 (망갈리크)</strong> — 화성이 ${marsH}궁에 위치하여 결혼 생활에 도전이 있을 수 있습니다. 배우자 선택 시 상대의 차트도 확인하는 것이 좋습니다. 28세 이후 결혼이 유리할 수 있습니다.<br><br>`;
        }
    }

    if (yogaText) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '🔮 당신의 특별한 재능' : '🔮 특별 요가 (행성 조합)'}</div>
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
        '1궁: 강한 자아와 리더십. 건강하고 활력 넘침. 자존심이 높고 독립적. 정부/권위와 인연.',
        '2궁: 가문의 명예를 중시. 권위를 통한 수입. 아버지로부터 재산. 눈 건강 주의.',
        '3궁: 용감하고 결단력 있음. 형제 중 리더. 글쓰기/소통에서 권위. 짧은 여행 많음.',
        '4궁: 부모와의 관계에 긴장. 부동산/차량 소유. 내면의 불안감. 고향을 떠날 수 있음.',
        '5궁: 창조적 재능 뛰어남. 자녀와의 관계 좋음. 투자/투기 능력. 로맨틱한 사랑.',
        '6궁: 적을 이기는 힘. 건강 관리 능력. 법적 분쟁에서 승리. 봉사/의료 분야 적합.',
        '7궁: 배우자가 사회적 지위가 높음. 파트너십에서 주도권. 결혼 후 사회적 성장.',
        '8궁: 수명에 주의. 유산/보험 관련 이익. 비밀스러운 권력. 영적 변혁의 경험.',
        '9궁: 아버지가 존경받는 인물. 법률/종교/고등교육에서 성공. 해외 여행 많음. 행운.',
        '10궁: 최고의 배치! 사회적 성공과 명성. 정부/공공 분야 리더. 아버지처럼 성공.',
        '11궁: 큰 수입과 사회적 네트워크. 고위층 친구들. 목표 달성 능력 뛰어남.',
        '12궁: 해외에서의 성공. 영적 추구. 아버지와 거리. 고독을 즐기는 경향. 눈 건강 주의.'
    ],
    Moon: [
        '1궁: 매력적인 외모. 감정적이고 변화가 많은 성격. 대중에게 인기. 건강이 달의 주기에 영향.',
        '2궁: 풍족한 가정 환경. 좋은 식생활. 달콤한 말씨. 가족과의 유대 강함.',
        '3궁: 창의적 소통 능력. 여행을 좋아함. 형제자매와의 감정적 유대. 예술적 취미.',
        '4궁: 최고의 배치! 행복한 가정. 어머니와의 강한 유대. 부동산 운 좋음. 감정적 안정.',
        '5궁: 자녀 사랑이 깊음. 로맨틱한 성격. 직관적 투자 능력. 창작 활동에서 기쁨.',
        '6궁: 감정적 스트레스로 건강 문제. 적에게 승리. 봉사 정신. 소화 장애 주의.',
        '7궁: 매력적인 배우자. 감정적으로 깊은 결혼. 파트너에게 의존적 경향. 대중과의 관계.',
        '8궁: 감정적 혼란과 변혁. 직관이 매우 강함. 유산/상속 가능. 수명은 길지만 감정적 위기.',
        '9궁: 영적이고 철학적. 어머니가 종교적. 해외 여행/거주. 행운의 여행.',
        '10궁: 대중적 인기와 사회적 성공. 호텔/식음료/케어링 분야. 어머니의 영향으로 성공.',
        '11궁: 친구가 많고 사교적. 꾸준한 수입. 소망 달성 능력. 여성 친구들의 도움.',
        '12궁: 해외 거주 가능성. 수면 문제. 영적 성향. 어머니와의 거리. 고독을 즐김.'
    ],
    Mars: [
        '1궁: 강한 체력과 의지. 상처/흉터 가능. 성급하지만 용감함. 리더십과 경쟁심.',
        '2궁: 거친 말투. 식습관 문제. 가족과 다툼. 하지만 재물 축적 능력.',
        '3궁: 최고의 배치! 용기와 모험심. 형제와의 강한 유대. 운동/스포츠 재능.',
        '4궁: 가정 내 갈등. 부동산 관련 분쟁. 어머니와의 긴장. 하지만 부동산 투자 이익.',
        '5궁: 열정적 연애. 자녀가 활동적. 투기적 투자. 스포츠/경쟁 분야 재능.',
        '6궁: 적을 격파하는 힘! 질병을 이기는 체력. 군대/경찰/의료 적합. 강한 면역력.',
        '7궁: 쿠자 도샤 — 결혼 생활에 열정과 갈등 공존. 강한 배우자. 28세 이후 결혼 권장.',
        '8궁: 사고/수술 주의. 하지만 위기에서 살아남는 힘. 보험/유산 이익. 탄트라 관심.',
        '9궁: 아버지와 갈등. 종교에 대한 강한 의견. 법적 분쟁. 해외에서의 활동.',
        '10궁: 뛰어난 직업 성과! 군대/엔지니어링/외과/경찰. 사회에서 용감한 리더.',
        '11궁: 큰 수입! 목표 달성 능력 강함. 형제로부터 도움. 부동산 이익.',
        '12궁: 해외 지출 많음. 수면 문제. 성적 에너지가 강함. 비밀스러운 활동.'
    ],
    Jupiter: [
        '1궁: 축복받은 배치! 지혜롭고 관대한 성격. 체격이 크고 건강함. 존경받는 인물.',
        '2궁: 풍족한 재물! 큰 가문. 교육을 통한 수입. 달변가. 좋은 식생활.',
        '3궁: 형제자매가 성공적. 종교/교육 관련 글쓰기. 짧은 순례 여행.',
        '4궁: 최고의 배치 중 하나! 넓은 집. 학문적 성취. 어머니가 지혜로움. 내면의 평화.',
        '5궁: 뛰어난 지성과 창조력! 좋은 자녀운. 현명한 투자. 영적 수행. 전생의 공덕.',
        '6궁: 적을 쉽게 이김. 법적 승리. 봉사 정신. 건강하지만 체중 관리 주의.',
        '7궁: 현명하고 도덕적인 배우자! 행복한 결혼. 사업 파트너십 성공.',
        '8궁: 장수! 유산 상속. 영적 지식의 깊이. 점성술/신비학 관심. 배우자의 재산.',
        '9궁: 가장 강력한 배치! 위대한 행운. 스승의 축복. 해외 여행. 법률/종교/철학 성공.',
        '10궁: 사회적 명성과 존경! 교육/법률/종교 분야 리더. 도덕적 권위. 최고의 직업운.',
        '11궁: 큰 수입과 이익! 소망 성취. 영향력 있는 인맥. 사회적 성공.',
        '12궁: 해외에서의 행운. 영적 해방. 천국의 쾌락. 기부와 자선. 명상 수행.'
    ],
    Venus: [
        '1궁: 매우 매력적인 외모! 예술적 재능. 사치를 즐김. 사교적이며 인기 많음.',
        '2궁: 풍족한 재물! 좋은 음식과 사치품. 달콤한 목소리. 가족 화목.',
        '3궁: 예술적 소통. 아름다운 글쓰기. 여동생/여성 형제와 좋은 관계.',
        '4궁: 아름다운 집과 차량! 럭셔리한 생활. 어머니가 아름답고 예술적.',
        '5궁: 로맨틱한 사랑! 예술/엔터테인먼트 재능. 아름다운 자녀. 창작의 기쁨.',
        '6궁: 연애에서의 어려움. 건강 관련 미용. 적에게 매력으로 승리.',
        '7궁: 최고의 배치! 매우 매력적인 배우자. 행복한 결혼. 사업 파트너십 성공.',
        '8궁: 깊고 변혁적인 사랑. 배우자의 재산. 비밀 로맨스. 장수.',
        '9궁: 해외에서의 로맨스. 예술적 여행. 스승과의 아름다운 관계.',
        '10궁: 예술/패션/엔터테인먼트 분야 성공! 사회적으로 매력적. 여성의 도움.',
        '11궁: 사교적 네트워크를 통한 수입! 여성 친구들의 도움. 소망 성취.',
        '12궁: 해외에서의 사랑. 비밀 연애. 침실의 즐거움. 예술적 영감.'
    ],
    Saturn: [
        '1궁: 마른 체형. 진지하고 책임감 강함. 어린 시절 어려움. 나이 들수록 빛남. 장수.',
        '2궁: 재물 축적이 느림. 검소한 생활. 말이 무거움. 가족과의 거리. 중년 이후 안정.',
        '3궁: 뛰어난 배치! 강한 의지와 인내. 형제에 대한 책임. 체계적 소통.',
        '4궁: 어머니와의 어려움. 가정 환경이 엄격함. 오래된 집/건물. 내면의 고독.',
        '5궁: 자녀가 늦거나 적음. 신중한 투자. 학업에서의 어려움과 극복. 영적 수행.',
        '6궁: 적을 인내로 이김! 만성 질환이지만 관리 가능. 봉사 분야 성공. 좋은 배치.',
        '7궁: 결혼이 늦음. 나이 많은 배우자. 초기 어려움 후 안정적 결혼. 사업 파트너에 주의.',
        '8궁: 장수! 만성 질환 주의. 유산 관련 지연. 비밀스러운 연구. 탄트라/요가 관심.',
        '9궁: 아버지와의 어려운 관계. 종교에 대한 진지한 접근. 늦은 해외 여행.',
        '10궁: 위대한 배치! 느리지만 확실한 사회적 성공. 대기업/정부 리더. 최고의 직업운.',
        '11궁: 꾸준한 수입 성장! 나이 든 친구. 목표를 인내로 달성. 조직에서의 이익.',
        '12궁: 해외에서의 어려움과 성장. 수면 문제. 영적 수행. 고독한 작업 선호.'
    ]
};

function renderPlanetHouse(positions, lagnaSign) {
    function houseOf(signIdx) { return ((signIdx - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = ['','나 자신','돈·가족','소통','가정','자녀·연애','건강','배우자','변혁','행운·해외','직업','수입','해외·영성'];
    let html = '';

    positions.forEach(p => {
        if (!PLANET_IN_HOUSE[p.id]) return;
        const house = houseOf(p.sign);
        const desc = PLANET_IN_HOUSE[p.id][house - 1];
        if (!desc) return;

        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? (houseArea[house]||'') : p.symbol + ' ' + p.name + ' → ' + house + '궁 (' + SIGNS[p.sign] + ')'}</div>
            <div class="interp-text">${isEasy ? desc.replace(/^\d+궁:\s*/, '') : desc}</div>
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
    let text = isEasy ? '<strong>기초 교육:</strong> ' : `<strong>4궁 (기초 교육·학위):</strong> ${SIGNS[h4sign]}. `;
    const eduSign4 = ['활동적 학습, 체육/군사 교육', '미술/음악/요리 교육', '언어/문학/커뮤니케이션', '가정교육 중시, 역사학', '연극/리더십/정치학', '과학/의학/분석학', '법학/외교/디자인', '심리학/연구/조사', '철학/신학/국제학', '경영/행정/건축', 'IT/과학기술/항공', '예술/영화/음악/영성'];
    text += eduSign4[h4sign] + '에 적합. ';
    if (h4.length > 0 && !isEasy) text += '4궁의 ' + h4.map(p => p.name).join(', ') + '이(가) 교육에 영향. ';

    const jupiter = positions.find(p => p.id === 'Jupiter');
    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if ([1,4,5,9].includes(jH)) text += isEasy ? '<br><br>🎓 <strong>높은 학업 성취가 기대됩니다!</strong> 대학원/박사과정/해외 유학 가능성.' : '<br><br>🎓 <strong>목성이 ' + jH + '궁에 위치하여 높은 학업 성취가 기대됩니다!</strong> 대학원/박사과정/해외 유학 가능성.';
    }

    text += isEasy ? '<br><br><strong>고등교육:</strong> ' : `<br><br><strong>5궁 (고등교육·지성·창의력):</strong> ${SIGNS[h5sign]}. `;
    if (h5.length > 0) {
        h5.forEach(p => {
            const h5p = { Sun: '리더십/정치학 분야 뛰어남', Moon: '예술/심리학 재능', Mars: '공학/기술/체육 재능', Mercury: '수학/언어/비즈니스 천재', Jupiter: '최고의 배치! 학자/교수/연구자', Venus: '예술/디자인/음악 재능', Saturn: '늦은 학업이지만 깊이 있는 연구' };
            text += isEasy ? `${h5p[p.id] || '학업에 영향'}. ` : `${p.name}: ${h5p[p.id] || '학업에 영향'}. `;
        });
    } else {
        text += isEasy ? '특별히 강한 학업 에너지는 없지만, 꾸준한 노력으로 좋은 결과를 얻을 수 있어요.' : '5궁에 행성이 없어 5궁주의 위치가 학업의 열쇠입니다.';
    }

    document.getElementById('educationWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 자녀운
// ═══════════════════════════════════════════════════
function renderChildren(positions, lagnaSign) {
    const isEasy = window.vedicMode === 'easy';
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    function planetsInHouse(h) { return positions.filter(p => houseOf(p.sign) === h); }

    const h5 = planetsInHouse(5);
    const h5sign = (lagnaSign + 4) % 12;
    const jupiter = positions.find(p => p.id === 'Jupiter');

    let text = isEasy ? "" : `<strong>5궁 (자녀·창조력):</strong> ${SIGNS[h5sign]}에 위치.<br><br>`;

    const childSign = [
        '활발하고 독립적인 자녀. 스포츠/리더십에 재능. 일찍 독립.',
        '차분하고 예술적인 자녀. 음악/미술에 재능. 물질적으로 풍족한 자녀.',
        '똑똑하고 말이 빠른 자녀. 학업 우수. 쌍둥이 가능성.',
        '감성적이고 상냥한 자녀. 어머니와 특별한 유대. 가정적인 자녀.',
        '카리스마 있고 창조적인 자녀. 리더 기질. 연예/예술 재능.',
        '꼼꼼하고 분석적인 자녀. 의학/과학 재능. 건강 관리 중요.',
        '매력적이고 사교적인 자녀. 예술/외교 재능. 균형감각 뛰어남.',
        '강렬하고 직관적인 자녀. 연구/탐구 정신. 비밀이 많을 수 있음.',
        '자유롭고 모험적인 자녀. 해외 유학/여행 가능. 철학적 성향.',
        '진지하고 야망 있는 자녀. 일찍 성숙함. 사회적 성취 지향.',
        '독특하고 혁신적인 자녀. 기술/과학에 재능. 독립적 성격.',
        '예술적이고 영적인 자녀. 상상력 풍부. 음악/그림 재능.'
    ];
    text += childSign[h5sign];

    if (h5.length > 0) {
        text += isEasy ? '<br><br>' : '<br><br><strong>5궁의 행성:</strong><br>';
        h5.forEach(p => {
            const ch = { Sun: '아들과의 인연. 자녀가 리더 기질.', Moon: '딸과의 인연. 자녀와 감정적 유대 강함.', Mars: '활동적인 자녀. 다소 다루기 어려울 수 있음.', Mercury: '매우 똑똑한 자녀! 학업 우수.', Jupiter: '복 많은 자녀! 효자/효녀. 자녀를 통한 행운.', Venus: '아름답고 예술적인 자녀. 딸과의 인연.', Saturn: '자녀가 늦거나 적을 수 있음. 하지만 책임감 있는 자녀.' };
            text += `${ch[p.id] || ''}<br>`;
        });
    }

    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if (jH === 5) text += isEasy ? '<br>🌟 <strong>최고의 자녀운! 자녀가 큰 행운을 가져옵니다.</strong>' : '<br>🌟 <strong>목성이 5궁! 최고의 자녀운. 자녀가 큰 행운을 가져옵니다.</strong>';
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
    let text = isEasy ? '<strong>해외 여행·행운:</strong><br>' : '<strong>9궁 (해외 여행·행운·고등교육):</strong><br>';
    if (h9.length === 0) {
        text += '해외 여행은 있지만 특별히 강한 인연은 아닙니다.';
    } else {
        h9.forEach(p => {
            const f9 = { Sun: '아버지가 해외 관련. 정부/공무 해외 출장.', Moon: '해외 여행을 감정적으로 즐김. 해외 대중 인기.', Mars: '해외에서의 모험/도전. 군사/기술 관련 해외 활동.', Mercury: '해외 유학/비즈니스 성공! 다국어 능력.', Jupiter: '해외에서 큰 행운! 유학/이민 성공. 해외 스승 만남.', Venus: '해외에서의 로맨스. 예술/패션 관련 해외 활동.', Saturn: '해외에서의 고생 후 성공. 장기 해외 체류.', Rahu: '해외 이주 강력한 지표! 외국 문화에 깊이 빠짐.', Ketu: '전생에서의 해외 인연. 영적 순례.' };
            text += isEasy ? `${f9[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f9[p.id] || ''}<br>`;
        });
    }

    text += isEasy ? '<br><strong>해외 정착·이민:</strong><br>' : '<br><strong>12궁 (해외 정착·이민·지출):</strong><br>';
    if (h12.length === 0) {
        text += '해외 정착보다는 국내 거주가 자연스럽습니다.';
    } else {
        h12.forEach(p => {
            const f12 = { Sun: '해외에서 정체성 찾기. 정부 관련 해외 파견.', Moon: '해외 거주 가능성 높음! 해외에서 감정적 안정.', Mars: '해외에서의 에너지 소모. 해외 투자/부동산.', Mercury: '해외 비즈니스/IT 관련 활동. 해외 교육.', Jupiter: '해외에서의 영적 성장. 자선 활동. 해외 대학.', Venus: '해외에서의 사치와 쾌락. 해외 예술 활동.', Saturn: '해외에서의 고된 노동. 하지만 장기적 정착.', Rahu: '해외 이민 확정적 지표! 서양 문화 적응.', Ketu: '해외에서의 영적 수행. 고독한 해외 생활.' };
            text += isEasy ? `${f12[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f12[p.id] || ''}<br>`;
        });
    }

    if (rahu) {
        const rH = houseOf(rahu.sign);
        if ([9, 12, 7].includes(rH)) text += isEasy ? '<br>✈️ <strong>해외 이주/장기 체류 가능성이 매우 높습니다!</strong>' : '<br>✈️ <strong>라후가 ' + rH + '궁에 위치하여 해외 이주/장기 체류 가능성이 매우 높습니다!</strong>';
    }

    document.getElementById('foreignWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 행성 품위
// ═══════════════════════════════════════════════════
function renderDignity(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = {1:'나 자신',2:'돈·가족',3:'소통·형제',4:'가정·어머니',5:'자녀·연애',6:'건강·적',7:'배우자',8:'변혁·유산',9:'행운·해외',10:'직업·명성',11:'수입·소망',12:'해외·영성'};
    const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };
    const OWN = { Sun: [4], Moon: [3], Mars: [0,7], Mercury: [2,5], Jupiter: [8,11], Venus: [1,6], Saturn: [9,10] };

    // 쉬운 설명
    const planetRole = {
        Sun: '자아·자신감·아버지·권위',
        Moon: '감정·마음·어머니·일상',
        Mars: '에너지·용기·행동력·경쟁',
        Mercury: '지능·소통·학습·비즈니스',
        Jupiter: '행운·지혜·재물·결혼',
        Venus: '사랑·매력·예술·쾌락',
        Saturn: '인내·시련·책임·노력'
    };

    let html = `<div class="interp-card" style="margin-bottom:16px;">
        <div class="interp-text">
            ${isEasy ?
            '<strong>💡 쉽게 이해하기:</strong> 각 행성이 당신의 인생에서 얼마나 힘을 잘 발휘하는지 보여드릴게요.<br><br>🟢 <strong>매우 강함</strong> = 최고의 컨디션! 큰 행운과 성과.<br>🟡 <strong>강함</strong> = 안정적으로 좋은 결과.<br>⚪ <strong>보통</strong> = 특별히 강하지도 약하지도 않음.<br>🔴 <strong>약한 상태</strong> = 어려움이 있지만 노력으로 극복 가능.' :
            '<strong>💡 쉽게 이해하기:</strong> 행성의 "품위"란 그 행성이 얼마나 힘을 잘 발휘하는지를 뜻합니다.<br><br>🟢 <strong>고양</strong> = 최고의 컨디션! 이 행성이 담당하는 인생 영역에서 큰 행운과 성과.<br>🟡 <strong>본궁</strong> = 자기 집에 있는 것처럼 편안. 안정적으로 좋은 결과.<br>⚪ <strong>중립</strong> = 보통. 특별히 강하지도 약하지도 않음.<br>🔴 <strong>감쇄</strong> = 힘이 약한 상태. 이 영역에서 어려움이 있지만 노력으로 극복 가능.'}
        </div>
    </div>`;

    positions.forEach(p => {
        if (!EXALT.hasOwnProperty(p.id)) return;
        let dignity, emoji, meaning, color, simpleDesc;
        const role = planetRole[p.id];

        const house = houseOf(p.sign);
        const area = houseArea[house] || '';

        if (p.sign === EXALT[p.id]) {
            dignity = '고양 (Exalted)';
            emoji = '🟢';
            color = '#5cb85c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> 영역에서 최고의 축복을 받았어요! 이 분야에서 타고난 재능이 빛나며 자연스럽게 좋은 결과를 얻습니다.`
                : `<strong>${p.name}이(가) 최강!</strong> "${role}" 에너지가 극대화된 상태로 <strong>${house}궁(${area})</strong> 영역에서 큰 축복을 받았습니다. 타고난 재능이 빛나며 자연스럽게 좋은 결과를 얻습니다.`;
        } else if (p.sign === DEBI[p.id]) {
            dignity = '감쇄 (Debilitated)';
            emoji = '🔴';
            color = '#d9534f';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> 영역에서 어려움을 느낄 수 있어요. 하지만 의식적으로 노력하면 오히려 큰 성장의 기회가 됩니다. 아래 치유법을 참고하세요.`
                : `<strong>${p.name}이(가) 약한 상태.</strong> "${role}" 에너지가 약해진 채로 <strong>${house}궁(${area})</strong> 영역에 있습니다. 이 분야에서 어려움을 느낄 수 있지만, 의식적 노력으로 극복하면 오히려 큰 성장의 기회가 됩니다. 아래 치유법을 참고하세요.`;
        } else if (OWN[p.id] && OWN[p.id].includes(p.sign)) {
            dignity = '본궁 (Own Sign)';
            emoji = '🟡';
            color = '#c9a84c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> 영역에서 안정적으로 힘을 발휘해요. 자연스럽게 좋은 결과를 만들어냅니다.`
                : `<strong>${p.name}이(가) 자기 집에!</strong> "${role}" 에너지가 안정적으로 <strong>${house}궁(${area})</strong> 영역에서 힘을 발휘합니다. 자연스럽게 좋은 결과를 만들어냅니다.`;
        } else {
            dignity = '중립';
            emoji = '⚪';
            color = '#999';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> 영역에서 보통의 영향력이에요. 특별히 강하지도 약하지도 않습니다.`
                : `${p.name}의 "${role}" 에너지가 <strong>${house}궁(${area})</strong> 영역에서 보통의 영향력을 발휘합니다. 다른 행성과의 관계에 따라 결과가 달라집니다.`;
        }

        html += `<div class="interp-card">
            <div class="interp-title">${emoji} ${isEasy ? area + ' — ' : p.symbol + ' ' + p.name + ' — ' + SIGNS[p.sign] + ' ' + SIGN_SYMBOLS[p.sign] + ' → ' + house + '궁(' + area + ') — '}<span style="color:${color}">${isEasy ? (dignity.includes('고양') ? '매우 강함!' : dignity.includes('감쇄') ? '약한 상태' : dignity.includes('본궁') ? '강함' : '보통') : dignity}</span></div>
            <div class="interp-text">
                ${isEasy ? '' : '<span style="color:#666;font-size:12px;">담당: ' + role + ' │ 위치: ' + house + '궁 = ' + area + '</span><br><br>'}
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
        { color: '빨간색, 주황색', number: '1, 9', day: '화요일', gem: '산호 (Red Coral)', dir: '동쪽' },
        { color: '흰색, 분홍색', number: '2, 6', day: '금요일', gem: '다이아몬드', dir: '남동쪽' },
        { color: '초록색', number: '3, 5', day: '수요일', gem: '에메랄드', dir: '북쪽' },
        { color: '흰색, 은색', number: '2, 7', day: '월요일', gem: '진주', dir: '북서쪽' },
        { color: '금색, 주황색', number: '1, 4', day: '일요일', gem: '루비', dir: '동쪽' },
        { color: '초록색, 연두색', number: '5, 3', day: '수요일', gem: '에메랄드', dir: '남쪽' },
        { color: '흰색, 파스텔', number: '6, 2', day: '금요일', gem: '다이아몬드', dir: '서쪽' },
        { color: '빨간색, 진홍색', number: '9, 1', day: '화요일', gem: '산호', dir: '남쪽' },
        { color: '노란색, 금색', number: '3, 9', day: '목요일', gem: '노란 사파이어', dir: '북동쪽' },
        { color: '남색, 검정', number: '8, 4', day: '토요일', gem: '블루 사파이어', dir: '서쪽' },
        { color: '남색, 보라', number: '4, 8', day: '토요일', gem: '블루 사파이어', dir: '서쪽' },
        { color: '노란색, 금색', number: '3, 7', day: '목요일', gem: '노란 사파이어', dir: '북동쪽' }
    ];

    const d = luckyData[lagnaSign];
    const html = `<div class="interp-card">
        <div class="interp-text">
            <strong>🎨 행운의 색상:</strong> ${d.color}<br>
            <strong>🔢 행운의 숫자:</strong> ${d.number}<br>
            <strong>📅 행운의 요일:</strong> ${d.day}<br>
            <strong>💎 행운의 보석:</strong> ${d.gem}<br>
            <strong>🧭 행운의 방향:</strong> ${d.dir}<br>
            <strong>🪐 라그나 지배 행성:</strong> ${['화성','금성','수성','달','태양','수성','금성','화성','목성','토성','토성','목성'][lagnaSign]}
        </div>
    </div>`;
    document.getElementById('luckyWrap').innerHTML = html;
}

// ═══════════════════════════════════════════════════
// 치유 & 강화 방법
// ═══════════════════════════════════════════════════
function renderRemedy(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };

    const remedies = {
        Sun: { gem: '루비 (Ruby)', mantra: 'Om Suryaya Namaha', color: '주황/빨강을 일요일에 착용', food: '밀, 사프란, 해바라기씨', charity: '일요일에 밀/구리를 기부' },
        Moon: { gem: '진주 (Pearl)', mantra: 'Om Chandraya Namaha', color: '흰색/은색을 월요일에 착용', food: '우유, 쌀, 코코넛', charity: '월요일에 쌀/우유를 기부' },
        Mars: { gem: '산호 (Red Coral)', mantra: 'Om Mangalaya Namaha', color: '빨간색을 화요일에 착용', food: '렌틸콩, 붉은 과일', charity: '화요일에 붉은 렌틸콩 기부' },
        Mercury: { gem: '에메랄드 (Emerald)', mantra: 'Om Budhaya Namaha', color: '초록색을 수요일에 착용', food: '녹두, 녹색 채소', charity: '수요일에 녹색 채소 기부' },
        Jupiter: { gem: '노란 사파이어 (Yellow Sapphire)', mantra: 'Om Gurave Namaha', color: '노란색을 목요일에 착용', food: '병아리콩, 바나나, 강황', charity: '목요일에 노란 음식/책 기부' },
        Venus: { gem: '다이아몬드 (Diamond)', mantra: 'Om Shukraya Namaha', color: '흰색/파스텔을 금요일에 착용', food: '우유, 크림, 과일', charity: '금요일에 흰 옷/쌀 기부' },
        Saturn: { gem: '블루 사파이어 (Blue Sapphire)', mantra: 'Om Shanaishcharaya Namaha', color: '남색/검정을 토요일에 착용', food: '검은콩, 참깨', charity: '토요일에 검은콩/기름 기부' }
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
                <div class="interp-title">${p.symbol} ${p.name} 강화 방법 ${isDebi ? '(감쇄 상태 — 특히 중요!)' : '(약한 위치)'}</div>
                <div class="interp-text">
                    <strong>💎 보석:</strong> ${r.gem} (약지에 착용 권장)<br>
                    <strong>🙏 만트라:</strong> "${r.mantra}" (108회 매일 암송)<br>
                    <strong>🎨 색상:</strong> ${r.color}<br>
                    <strong>🍽️ 음식:</strong> ${r.food}<br>
                    <strong>🤝 자선:</strong> ${r.charity}
                </div>
            </div>`;
        }
    });

    if (!html) {
        html = '<div class="interp-card"><div class="interp-text">모든 행성이 양호한 위치에 있습니다! 특별한 치유가 필요하지 않습니다. 행운의 보석은 라그나 지배 행성의 보석을 착용하면 좋습니다.</div></div>';
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
        // D2 (호라): 홀수 사인=태양(사자=4), 짝수 사인=달(게=3)
        return (part === 0) ? ((sign % 2 === 0) ? 3 : 4) : ((sign % 2 === 0) ? 4 : 3);
    } else if (division === 3) {
        // D3 (드레카나): 같은 사인, 5번째, 9번째
        const d3starts = [0, 4, 8];
        return (sign + d3starts[part]) % 12;
    } else if (division === 4) {
        // D4 (차투르탐샤): 같은 사인부터 시작
        return (sign + part * 3) % 12;
    } else if (division === 16) {
        // D16 (쇼다샴샤): 양자리부터 순서대로
        return (sign + part) % 12;
    } else if (division === 20) {
        // D20 (빔샴샤): 양자리부터 (불), 사수부터 (흙), 사자부터 (바람), 게부터 (물)
        const d20start = [0, 8, 4, 3][sign % 4];
        return (d20start + part) % 12;
    } else if (division === 24) {
        // D24 (차투르빔샴샤): 홀수 사인=사자, 짝수 사인=게
        const d24start = (sign % 2 === 0) ? 4 : 3;
        return (d24start + part) % 12;
    } else if (division === 27) {
        // D27 (삽타빔샴샤/나크샤트람샤): 불→양, 흙→게, 바람→천칭, 물→염소
        const d27start = [0, 3, 6, 9][sign % 4];
        return (d27start + part) % 12;
    } else if (division === 30) {
        // D30 (트림샴샤): 특수 규칙 (홀수/짝수 사인에 따라 다른 지배성)
        const d30odd = [0, 10, 8, 2, 6]; // 화성, 토성, 목성, 수성, 금성
        const d30even = [1, 5, 11, 3, 7]; // 금성, 수성, 목성, 토성, 화성
        const d30parts = [5, 5, 8, 7, 5]; // 각 부분의 도수
        let cumDeg = 0;
        let d30part = 0;
        for (let i = 0; i < 5; i++) {
            cumDeg += d30parts[i];
            if (degInSign < cumDeg) { d30part = i; break; }
        }
        return (sign % 2 === 0) ? d30odd[d30part] : d30even[d30part];
    } else if (division === 40) {
        // D40 (카베담샤): 홀수 사인=양자리, 짝수 사인=천칭
        const d40start = (sign % 2 === 0) ? 0 : 6;
        return (d40start + part) % 12;
    } else if (division === 45) {
        // D45 (악샤베담샤): 불→양, 흙→사자, 바람→사수, 물→같은 패턴 반복
        const d45start = [0, 4, 8, 0][sign % 4];
        return (d45start + part) % 12;
    }
    return (sign + part) % 12; // fallback
}

function renderDivisionalChart(positions, lagnaSidereal, division, chartId, interpId, label, koName) {
    const chartEl = document.getElementById(chartId);
    const interpEl = document.getElementById(interpId);
    if (!chartEl) return;

    // 분할 라그나
    const dLagnaSign = getDivisionalSign(lagnaSidereal, division);

    // 분할 행성 위치
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
    const RULER_NAMES = {Sun:'태양',Moon:'달',Mars:'화성',Mercury:'수성',Jupiter:'목성',Venus:'금성',Saturn:'토성',Rahu:'라후',Ketu:'케투'};

    const isEasy = window.vedicMode === 'easy';
    let html = '';

    if (division === 10) {
        // D10 해석: 직업/커리어
        const d10_1lord = SIGN_RULERS[dLagnaSign];
        const d10_10sign = (dLagnaSign + 9) % 12;
        const d10_10lord = SIGN_RULERS[d10_10sign];
        const d10_10planets = dPositions.filter(p => p.dSign === d10_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💼 직업 상세 분석' : '💼 D10 직업 분석') + '</div><div class="interp-text">';
        if (isEasy) {
            html += '<strong>당신의 직업 성향:</strong><br>';
        } else {
            html += '<strong>D10 라그나:</strong> ' + SIGNS[dLagnaSign] + ' (지배성: ' + (RULER_NAMES[d10_1lord]||d10_1lord) + ')<br>';
            html += '<strong>D10 10궁 (직업):</strong> ' + SIGNS[d10_10sign] + ' (지배성: ' + (RULER_NAMES[d10_10lord]||d10_10lord) + ')<br>';
        }
        if (d10_10planets.length > 0) {
            if (!isEasy) html += '<strong>10궁의 행성:</strong> ' + d10_10planets.map(p => p.name).join(', ') + '<br>';
        }

        // 직업 성향 by D10 라그나
        const careerBySign = [
            '리더십, 군사, 스포츠, 기업가',  // 양자리
            '금융, 예술, 부동산, 요식업',     // 황소
            '커뮤니케이션, 미디어, 교육, IT',  // 쌍둥이
            '간호, 부동산, 호텔, 심리상담',    // 게
            '정치, 연예, 관리직, 행정',        // 사자
            '의료, 회계, 분석, 연구',          // 처녀
            '법률, 외교, 디자인, 컨설팅',      // 천칭
            '수사, 연구, 의학, 보험',          // 전갈
            '교육, 종교, 해외무역, 출판',      // 사수
            '행정, 건설, 광업, 공무원',        // 염소
            'IT, 혁신, NGO, 항공',           // 물병
            '예술, 병원, 해외, 영성'           // 물고기
        ];
        html += '<strong>적합 분야:</strong> ' + careerBySign[dLagnaSign];
        html += '</div></div>';

    } else if (division === 7) {
        // D7 해석: 자녀
        const d7_5sign = (dLagnaSign + 4) % 12;
        const d7_5lord = SIGN_RULERS[d7_5sign];
        const d7_5planets = dPositions.filter(p => p.dSign === d7_5sign);
        const benefics = d7_5planets.filter(p => p.natural === 'benefic');
        const malefics = d7_5planets.filter(p => p.natural === 'malefic');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👶 자녀 분석' : '👶 D7 자녀 분석') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D7 라그나:</strong> ' + SIGNS[dLagnaSign] + '<br>';
            html += '<strong>D7 5궁 (자녀):</strong> ' + SIGNS[d7_5sign] + ' (지배성: ' + (RULER_NAMES[d7_5lord]||d7_5lord) + ')<br>';
        }
        if (d7_5planets.length > 0) {
            if (!isEasy) html += '<strong>5궁의 행성:</strong> ' + d7_5planets.map(p => p.name).join(', ') + '<br>';
        }
        if (benefics.length > 0) html += (isEasy ? '좋은 행성이 자녀 자리에 있어 자녀복이 있습니다.' : '길성이 5궁에 있어 자녀복이 있습니다.') + '<br>';
        if (malefics.length > 0) html += (isEasy ? '도전의 행성이 자녀 자리에 있어 자녀 관련 어려움이 있을 수 있습니다.' : '흉성이 5궁에 있어 자녀 관련 어려움이 있을 수 있습니다.') + '<br>';
        if (d7_5planets.length === 0) html += isEasy ? '자녀 자리에 행성이 없어 다른 요소를 종합적으로 봐야 합니다.' : '5궁에 행성이 없어 5궁주(지배성)의 위치를 봐야 합니다.';
        html += '</div></div>';

    } else if (division === 12) {
        // D12 해석: 부모
        const d12_4sign = (dLagnaSign + 3) % 12; // 4궁 = 어머니
        const d12_9sign = (dLagnaSign + 8) % 12; // 9궁 = 아버지
        const d12_4planets = dPositions.filter(p => p.dSign === d12_4sign);
        const d12_9planets = dPositions.filter(p => p.dSign === d12_9sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨‍👩‍👧 부모 분석' : '👨‍👩‍👧 D12 부모 분석') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D12 라그나:</strong> ' + SIGNS[dLagnaSign] + '<br>';
        }
        html += '<strong>' + (isEasy ? '어머니' : 'D12 4궁 (어머니): ' + SIGNS[d12_4sign]) + '</strong>';
        if (d12_4planets.length > 0 && !isEasy) html += ' — ' + d12_4planets.map(p => p.name).join(', ');
        html += '<br>';
        html += '<strong>' + (isEasy ? '아버지' : 'D12 9궁 (아버지): ' + SIGNS[d12_9sign]) + '</strong>';
        if (d12_9planets.length > 0 && !isEasy) html += ' — ' + d12_9planets.map(p => p.name).join(', ');
        html += '<br>';

        const moon4 = d12_4planets.find(p => p.id === 'Moon');
        const sun9 = d12_9planets.find(p => p.id === 'Sun');
        if (moon4) html += (isEasy ? '달이 어머니 자리에 있어 어머니와의 인연이 깊습니다.' : '달이 4궁에 있어 어머니와의 인연이 깊습니다.') + '<br>';
        if (sun9) html += (isEasy ? '태양이 아버지 자리에 있어 아버지와의 인연이 깊습니다.' : '태양이 9궁에 있어 아버지와의 인연이 깊습니다.') + '<br>';
        html += '</div></div>';

    } else if (division === 60) {
        // D60 해석: 전생 카르마 (소챕터 구조)
        const d60_1lord = SIGN_RULERS[dLagnaSign];
        const d60_planets_1 = dPositions.filter(p => p.dSign === dLagnaSign);

        const D60_DEITIES = [
            {name:'Ghora',ko:'고라',nature:'malefic',desc:'파괴와 두려움의 신. 전생의 어두운 카르마'},
            {name:'Rakshasa',ko:'락샤사',nature:'malefic',desc:'악마의 에너지. 강한 욕망과 집착의 카르마'},
            {name:'Deva',ko:'데바',nature:'benefic',desc:'신성한 존재. 전생의 공덕과 축복'},
            {name:'Kubera',ko:'쿠베라',nature:'benefic',desc:'재물의 신. 전생에서 부를 쌓은 카르마'},
            {name:'Yaksha',ko:'야크샤',nature:'benefic',desc:'자연의 수호자. 자연과 조화의 카르마'},
            {name:'Kinnara',ko:'키나라',nature:'benefic',desc:'천상의 음악가. 예술적 재능의 카르마'},
            {name:'Bhrashta',ko:'브라슈타',nature:'malefic',desc:'타락한 자. 높은 곳에서 떨어진 카르마'},
            {name:'Kulaghna',ko:'쿨라그나',nature:'malefic',desc:'가문의 파괴자. 가족 관련 카르마'},
            {name:'Garala',ko:'가랄라',nature:'malefic',desc:'독. 독이 되는 행위의 카르마'},
            {name:'Vahni',ko:'바니',nature:'malefic',desc:'불의 신. 분노와 파괴의 카르마'},
            {name:'Maya',ko:'마야',nature:'malefic',desc:'환상. 환상과 기만의 카르마'},
            {name:'Purishaka',ko:'푸리샤카',nature:'malefic',desc:'속박. 타인을 구속한 카르마'},
            {name:'Apampathi',ko:'아팜파티',nature:'benefic',desc:'물의 주인. 정화와 치유의 카르마'},
            {name:'Marut',ko:'마루트',nature:'benefic',desc:'바람의 신. 자유와 변화의 카르마'},
            {name:'Kala',ko:'칼라',nature:'malefic',desc:'시간의 신. 시간과 죽음의 카르마'},
            {name:'Sarpa',ko:'사르파',nature:'malefic',desc:'뱀. 속박과 집착의 카르마 — 놓아야 할 것을 놓지 못하는 결박'},
            {name:'Amrita',ko:'암리타',nature:'benefic',desc:'불사의 감로수. 영생 추구의 카르마'},
            {name:'Indu',ko:'인두',nature:'benefic',desc:'달. 감성과 직관의 카르마'},
            {name:'Mridu',ko:'므리두',nature:'benefic',desc:'부드러운 자. 온유함과 자비의 카르마'},
            {name:'Komala',ko:'코말',nature:'benefic',desc:'섬세한 자. 예술과 아름다움의 카르마'},
            {name:'Heramba',ko:'헤람바',nature:'benefic',desc:'가네샤의 화신. 장애 극복의 카르마'},
            {name:'Brahma',ko:'브라흐마',nature:'benefic',desc:'창조의 신. 창조와 지식의 카르마'},
            {name:'Vishnu',ko:'비슈누',nature:'benefic',desc:'유지의 신. 보호와 질서의 카르마'},
            {name:'Maheshwara',ko:'마헤시',nature:'benefic',desc:'위대한 신 시바. 변혁과 해탈의 카르마'},
            {name:'Deva2',ko:'데발라',nature:'benefic',desc:'성인. 영적 수행의 카르마'},
            {name:'Bala',ko:'발라',nature:'benefic',desc:'힘. 강인함과 용기의 카르마'},
            {name:'Vishwakarma',ko:'비슈와카르마',nature:'benefic',desc:'우주의 건축가. 건설과 창조의 카르마'},
            {name:'Tamasa',ko:'타마사',nature:'malefic',desc:'어둠. 무지와 어둠의 카르마'},
            {name:'Kanchana',ko:'칸차나',nature:'benefic',desc:'황금. 순수함과 가치의 카르마'},
            {name:'Varaha',ko:'바라하',nature:'benefic',desc:'비슈누의 멧돼지 화신. 구원의 카르마'},
            {name:'Ramasala',ko:'라마살라',nature:'benefic',desc:'라마의 거처. 도덕과 의무의 카르마'},
            {name:'Ghrisha',ko:'그리샤',nature:'benefic',desc:'빛나는 자. 지혜와 깨달음의 카르마'},
            {name:'Indra',ko:'인드라',nature:'benefic',desc:'신들의 왕. 지도자와 왕의 카르마'},
            {name:'Jala',ko:'잘라',nature:'benefic',desc:'물. 흐름과 적응의 카르마'},
            {name:'Vishwa',ko:'비슈와',nature:'benefic',desc:'우주. 보편적 사랑의 카르마'},
            {name:'Amara',ko:'아마라',nature:'benefic',desc:'불멸. 영원 추구의 카르마'},
            {name:'Bala2',ko:'발라2',nature:'malefic',desc:'어린 힘. 미숙한 힘의 사용'},
            {name:'Pitri',ko:'피트리',nature:'malefic',desc:'조상. 조상 관련 카르마'},
            {name:'Rudra',ko:'루드라',nature:'malefic',desc:'폭풍의 신. 파괴적 변혁의 카르마'},
            {name:'Varuna',ko:'바루나',nature:'benefic',desc:'바다의 신. 우주 질서의 카르마'},
            {name:'Aryama',ko:'아랴마',nature:'benefic',desc:'태양신. 우정과 계약의 카르마'},
            {name:'Mitra',ko:'미트라',nature:'benefic',desc:'우정의 신. 신뢰와 동반자의 카르마'},
            {name:'Agni',ko:'아그니',nature:'malefic',desc:'불의 신. 정화의 불의 카르마'},
            {name:'Varuna2',ko:'바루나2',nature:'benefic',desc:'바다의 신. 깊은 지혜의 카르마'},
            {name:'Gauri',ko:'가우리',nature:'benefic',desc:'파르바티. 헌신과 사랑의 카르마'},
            {name:'Mahakala',ko:'마하칼라',nature:'malefic',desc:'위대한 시간. 시간의 주인이 되려 한 카르마'},
            {name:'Pitamaha',ko:'피타마하',nature:'benefic',desc:'위대한 아버지 브라흐마. 창조자의 카르마'},
            {name:'Kartikeya',ko:'카르티케야',nature:'benefic',desc:'전쟁의 신. 정의로운 전투의 카르마'},
            {name:'Yama',ko:'야마',nature:'malefic',desc:'죽음의 신. 심판과 정의의 카르마'},
            {name:'Kala2',ko:'칼라2',nature:'malefic',desc:'시간. 시간에 쫓긴 카르마'},
            {name:'Varuna3',ko:'바루나3',nature:'benefic',desc:'바다의 신. 법과 진실의 카르마'},
            {name:'Kubera2',ko:'쿠베라2',nature:'benefic',desc:'재물의 신. 관대함의 카르마'},
            {name:'Aditya',ko:'아디티야',nature:'benefic',desc:'태양신. 빛과 진리의 카르마'},
            {name:'Rishi',ko:'리시',nature:'benefic',desc:'성자. 지혜와 수행의 카르마'},
            {name:'Vasu',ko:'바수',nature:'benefic',desc:'천상의 존재. 자연을 다스린 카르마'},
            {name:'Ashwini',ko:'아슈위니',nature:'benefic',desc:'쌍둥이 치유사. 치유의 카르마'},
            {name:'Naga',ko:'나가',nature:'malefic',desc:'뱀의 신. 신비와 비밀의 카르마'},
            {name:'Gandharva',ko:'간다르바',nature:'benefic',desc:'천상의 음악가. 예술과 음악의 카르마'},
            {name:'Prajapati',ko:'프라자파티',nature:'benefic',desc:'창조주. 생명 창조의 카르마'},
            {name:'Charachara',ko:'차라차라',nature:'benefic',desc:'만물. 전생에서 만물과 하나였던 카르마'}
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
            '전사, 지도자 — 전생에 권력을 행사했으며, 이번 생에서도 리더십이 타고남. 결단력과 독립심이 영혼에 각인되어 있습니다.',
            '예술가, 농부 — 전생에 대지와 자연을 다루었으며, 물질적 풍요와 감각적 아름다움을 추구합니다. 안정과 소유에 대한 깊은 본능이 있습니다.',
            '학자, 상인 — 전생에 지식과 소통으로 살았으며, 다재다능함과 호기심이 남아있습니다. 언어와 교역에 타고난 재능이 있습니다.',
            '보호자, 양육자 — 전생에 타인을 돌보았으며, 깊은 감수성과 모성적 본능이 있습니다. 가정과 안식처에 대한 강한 카르마가 있습니다.',
            '왕족, 성직자 — 전생에 높은 지위에 있었으며, 자연스러운 권위와 존엄이 있습니다. 무대 위에 서는 것이 영혼의 본능입니다.',
            '치유자, 봉사자 — 전생에 의술이나 봉사에 종사했으며, 분석력과 세심함이 뛰어납니다. 타인을 돕는 것이 영혼의 본분입니다.',
            '외교관, 예술가 — 전생에 조화와 아름다움을 추구했으며, 관계와 균형에 능합니다. 파트너십이 영혼의 핵심 주제입니다.',
            '수행자, 연금술사 — 전생에 깊은 변혁을 겪었으며, 비밀과 신비에 대한 강한 끌림이 있습니다. 죽음과 재생의 카르마가 있습니다.',
            '현자, 탐험가 — 전생에 진리를 탐구했으며, 영적 지혜와 모험심이 남아있습니다. 먼 땅과 높은 학문에 대한 카르마가 있습니다.',
            '관료, 건축가 — 전생에 질서를 세웠으며, 인내와 책임감이 강합니다. 사회적 체계와 규율이 영혼에 각인되어 있습니다.',
            '관료, 체계의 수호자 — 전생에 사회적 질서와 규율을 세웠으며, 조직력과 봉사 정신이 있습니다. 토성이 지배하는 사인으로 인내와 의무가 영혼에 각인되어 있습니다.',
            '영매, 예술가 — 전생에 영적 세계와 교류했으며, 극도로 강한 직관과 꿈의 능력이 있습니다. 초월과 해탈에 가장 가까운 영혼입니다.'
        ];

        // 행성별 D60 사인 해석 (전통)
        const d60PlanetInSign = {
            Sun: ['전생에서 전사나 왕으로 살았으며, 강한 자아와 지도력이 이번 생에도 남아있습니다. 권위를 세우려는 영혼의 목적이 있습니다.','전생에서 예술가나 부유한 자로 살았으며, 물질적 풍요를 추구하는 영혼입니다. 감각적 아름다움에 끌립니다.','전생에서 학자나 상인으로 살았으며, 지식과 소통이 영혼의 핵심 주제입니다.','전생에서 보호자나 양육자로 살았으며, 타인을 돌보는 것이 영혼의 깊은 본능입니다.','전생에서 왕족이나 성직자로 높은 지위에 있었으며, 이번 생에서도 자연스러운 권위를 지닙니다.','전생에서 치유자나 봉사자로 살았으며, 분석과 봉사가 영혼의 목적입니다.','전생에서 외교관이나 예술가로 조화를 추구했으며, 관계와 균형이 영혼의 과제입니다.','전생에서 수행자나 연금술사로 깊은 변혁을 겪었으며, 비밀과 변혁이 영혼에 각인되어 있습니다.','전생에서 현자나 탐험가로 진리를 추구했으며, 지혜와 모험이 영혼의 방향입니다.','전생에서 관료나 건축가로 질서를 세웠으며, 체계와 책임이 영혼에 새겨져 있습니다.','전생에서 혁명가나 발명가로 시대를 앞서갔으며, 독창적 사고가 영혼의 특성입니다.','전생에서 영매나 예술가로 영적 세계와 교류했으며, 깊은 직관이 영혼에 남아있습니다.'],
            Moon: ['전생의 감정적 기억이 불같이 강렬합니다. 분노와 열정이 무의식에 각인되어 있으며, 이번 생에서 감정을 다스리는 것이 과제입니다.','전생의 감정적 기억이 따뜻하고 안정적입니다. 풍요와 안정 속에서 살았던 기억이 무의식에 남아, 아름다운 것을 찾습니다.','전생의 감정적 기억이 지적이고 다채롭습니다. 여러 경험을 했던 기억이 남아 호기심이 강합니다.','전생의 감정적 기억이 매우 깊습니다. 가정과 돌봄의 기억이 강하게 남아 감수성이 풍부합니다.','전생의 감정적 기억이 자부심과 존엄으로 가득합니다. 인정받고 존경받았던 기억이 남아있습니다.','전생의 감정적 기억이 봉사와 분석에 관련됩니다. 누군가를 도왔던 기억이 남아 세심한 마음을 가집니다.','전생의 감정적 기억이 조화와 관계에 관련됩니다. 아름다운 관계의 기억이 남아 파트너를 찾습니다.','전생의 감정적 기억이 깊고 강렬합니다. 극적인 변화를 겪었던 기억이 남아 감정의 깊이가 바다와 같습니다.','전생의 감정적 기억이 자유와 탐구에 관련됩니다. 여행하고 배웠던 기억이 남아 확장을 추구합니다.','전생의 감정적 기억이 책임과 인내에 관련됩니다. 무거운 짐을 졌던 기억이 남아 성숙한 감정을 가집니다.','전생의 감정적 기억이 독특하고 비범합니다. 다른 사람들과 달랐던 기억이 남아 독립적 감성을 가집니다.','전생의 감정적 기억이 영적이고 초월적입니다. 꿈과 비전이 선명하며, 영적 세계와의 연결이 깊습니다.']
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
            return ' — 수호신: <strong>' + d.deity.name + '</strong>(' + d.deity.ko + ') <span style="color:' + c + ';font-weight:700;">' + (d.deity.nature === 'benefic' ? '길(吉)' : '흉(凶)') + '</span>';
        }

        const houseThemes = ['','자아/존재','재물/가치','소통/학습','가정/안식','창조/사랑','봉사/시련','관계/파트너','변혁/비밀','지혜/종교','사회/직업','소망/이익','해방/초월'];

        // 파라샤라 인용
        if (!isEasy) {
            html += '<div class="interp-card" style="border-left:3px solid #8b7ec8;"><div class="interp-text" style="font-size:13px;color:#888;">';
            html += '📜 <strong>파라샤라 曰:</strong> "샤슈티암샤(D60)는 모든 분할 차트 중 가장 중요하다. 길신(吉神) 분할의 행성은 좋은 결과를, 흉신(凶神) 분할의 행성은 나쁜 결과를 준다."<br>';
            html += '<span style="color:#666;">— 브리핫 파라샤라 호라 샤스트라(BPHS)</span></div></div>';
        }

        // ─── 소챕터 1: 영혼의 정체성 ───
        const lagnaD = getDeity(lagnaSidereal);
        let ch1 = isEasy
            ? '<strong>전생의 정체성</strong>' + deityTag(lagnaD) + '<br><br>'
            : '<strong>D60 라그나: ' + SIGNS[dLagnaSign] + ' ' + SIGN_SYMBOLS[dLagnaSign] + '</strong> (지배성: ' + (RULER_NAMES[d60_1lord]||d60_1lord) + ')' + deityTag(lagnaD) + '<br><br>';
        ch1 += pastLifeThemes[dLagnaSign] + '<br>';
        if (lagnaD.deity) {
            ch1 += '<br>' + (isEasy ?
                (lagnaD.deity.nature === 'benefic' ?
                    '전생에서 좋은 일을 많이 했기 때문에, 이번 생에서도 자연스럽게 좋은 기회가 찾아옵니다. 당신의 존재 자체가 보호받고 있어요.' :
                    '전생에서 풀지 못한 숙제가 남아있어요. 이번 생의 성격과 운명에 영향을 주지만, 이걸 극복하면 오히려 더 큰 성장이 기다립니다.') :
                (lagnaD.deity.nature === 'benefic' ?
                    '<strong>' + lagnaD.deity.ko + '</strong>이(가) 라그나를 수호합니다. ' + lagnaD.deity.desc + ' — 전생의 공덕이 이번 생 전체를 보호하며, 삶에서 자연스럽게 좋은 기회가 찾아옵니다.' :
                    '<strong>' + lagnaD.deity.ko + '</strong>이(가) 라그나에 영향을 줍니다. ' + lagnaD.deity.desc + ' — 이 카르마적 도전이 이번 생의 성격과 운명에 각인되어 있지만, 극복하면 더 큰 성장이 기다립니다.'));
        }
        if (d60_planets_1.length > 0) ch1 += '<br><br>' + d60_planets_1.map(p => p.name).join(', ') + (isEasy ? '이(가) 전생의 핵심 위치에 있습니다 — 전생의 카르마가 이 행성에 집중되어 있습니다.' : '이(가) D60 라그나에 위치 — 전생의 핵심 카르마가 이 행성에 집중되어 있습니다.');
        html += subChapter('🪐', '영혼의 정체성 — 전생에서 누구였는가', ch1);

        // ─── 소챕터 2: 영혼의 목적 ───
        const sunD60 = dPositions.find(p => p.id === 'Sun');
        if (sunD60) {
            const sunD = getDeity(sunD60.sidereal);
            let ch2 = (isEasy ? '<strong>태양의 전생 기억</strong>' : '<strong>D60 태양: ' + SIGNS[sunD60.dSign] + ' ' + SIGN_SYMBOLS[sunD60.dSign] + '</strong>') + deityTag(sunD) + '<br><br>';
            ch2 += (d60PlanetInSign.Sun[sunD60.dSign] || '') + '<br>';
            if (sunD.deity) {
                ch2 += '<br>' + (isEasy ?
                    (sunD.deity.nature === 'benefic' ?
                        '전생에서 "나는 누구인가"를 올바르게 추구했기 때문에, 이번 생에서도 하고 싶은 일을 찾고 이루는 게 자연스럽게 됩니다. 자신감을 가져도 좋아요!' :
                        '전생에서 "나는 누구인가"에 대한 혼란이 있었어요. 이번 생에서 진짜 내가 원하는 것, 진짜 나를 찾아가는 과정이 중요한 과제입니다. 하지만 그 과정 자체가 당신을 성장시켜요.') :
                    (sunD.deity.nature === 'benefic' ?
                        '태양의 수호신 <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. 전생에서 영혼의 목적을 올바르게 추구했으며, 이번 생에서도 자아 실현이 자연스럽게 이루어집니다.' :
                        '태양의 수호신 <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. 전생에서 자아와 권위에 대한 도전이 있었으며, 이번 생에서 진정한 자아를 찾는 것이 영혼의 과제입니다.'));
            }
            html += subChapter('☉', '영혼의 목적 — 왜 태어났는가', ch2);
        }

        // ─── 소챕터 3: 감정의 기억 ───
        const moonD60 = dPositions.find(p => p.id === 'Moon');
        if (moonD60) {
            const moonD = getDeity(moonD60.sidereal);
            let ch3 = (isEasy ? '<strong>달의 전생 기억</strong>' : '<strong>D60 달: ' + SIGNS[moonD60.dSign] + ' ' + SIGN_SYMBOLS[moonD60.dSign] + '</strong>') + deityTag(moonD) + '<br><br>';
            ch3 += (d60PlanetInSign.Moon[moonD60.dSign] || '') + '<br>';
            if (moonD.deity) {
                ch3 += '<br>' + (isEasy ?
                    (moonD.deity.nature === 'benefic' ?
                        '전생에서 마음이 평온했기 때문에, 이번 생에서도 감정적으로 안정적이고 직관이 강합니다. 느낌이 오면 대부분 맞아요 — 그 감을 믿어도 됩니다.' :
                        '전생에서 감정적으로 힘든 일을 겪었던 흔적이 마음 깊은 곳에 남아있어요. 이유 없이 불안하거나, 특정 상황에서 감정이 확 올라오는 건 이것 때문일 수 있어요. 명상이나 물가에서 쉬는 게 마음을 치유하는 데 큰 도움이 됩니다.') :
                    (moonD.deity.nature === 'benefic' ?
                        '달의 수호신 <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. 전생에서 마음이 평화로웠으며, 이번 생에서도 감정적 안정감과 강한 직관을 타고났습니다.' :
                        '달의 수호신 <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. 전생의 감정적 상처가 무의식에 남아있습니다. 이 패턴을 인식하고 치유하는 것이 이번 생의 감정적 과제입니다. 명상과 물 근처의 휴식이 도움됩니다.'));
            }
            html += subChapter('☽', '감정의 기억 — 전생의 무의식 패턴', ch3);
        }

        // ─── 소챕터 4: 배우자 카르마 ───
        const d60H7sign = (dLagnaSign + 6) % 12;
        const d60H7lord = SIGN_RULERS[d60H7sign];
        const d60H7planets = dPositions.filter(p => p.dSign === d60H7sign);
        const venusD60 = dPositions.find(p => p.id === 'Venus');
        const jupD60 = dPositions.find(p => p.id === 'Jupiter');
        const rahuD60 = dPositions.find(p => p.id === 'Rahu');
        const ketuD60 = dPositions.find(p => p.id === 'Ketu');

        const spouseKarmaBySign = [
            '전생에서 전사/리더와의 인연. 강렬하고 독립적인 배우자 카르마. 전생에서 함께 싸웠거나 경쟁했던 영혼.',
            '전생에서 예술가/부유한 자와의 인연. 물질적으로 풍요로운 결혼 카르마. 전생에서 아름다움을 함께 추구한 영혼.',
            '전생에서 학자/상인과의 인연. 소통과 지적 교감의 결혼 카르마. 전생에서 함께 공부하거나 교역한 영혼.',
            '전생에서 가족/보호자와의 인연. 깊은 감정적 유대의 결혼 카르마. 전생에서 서로를 돌보았던 영혼.',
            '전생에서 왕족/귀족과의 인연. 화려하고 존경받는 결혼 카르마. 전생에서 함께 지배했던 영혼.',
            '전생에서 치유자/봉사자와의 인연. 봉사와 헌신의 결혼 카르마. 전생에서 함께 타인을 도왔던 영혼.',
            '전생에서 외교관/예술가와의 인연. 조화롭고 아름다운 결혼 카르마. 전생에서 함께 균형을 추구한 영혼.',
            '전생에서 수행자/신비주의자와의 인연. 강렬하고 변혁적인 결혼 카르마. 전생에서 생사를 함께한 영혼.',
            '전생에서 현자/탐험가와의 인연. 자유롭고 확장적인 결혼 카르마. 전생에서 함께 진리를 탐구한 영혼. 외국인 배우자 가능.',
            '전생에서 관료/건축가와의 인연. 책임감 있고 안정적인 결혼 카르마. 전생에서 함께 질서를 세운 영혼. 늦은 결혼 가능.',
            '전생에서 관료/군인/체계적 직업인과의 인연. 토성이 지배하는 사인으로, 책임감 있고 규율적인 배우자 카르마. 전생에서 함께 사회적 의무를 수행한 영혼. 결혼이 다소 늦거나 나이 차이가 있을 수 있음.',
            '전생에서 영매/예술가와의 인연. 신비롭고 영적인 결혼 카르마. 전생에서 함께 영적 수행을 한 영혼. 꿈에서 먼저 만날 수 있음.'
        ];

        let ch4 = (isEasy
            ? '<strong>배우자와의 전생 인연</strong><br><br>'
            : '<strong>D60 7궁 (배우자): ' + SIGNS[d60H7sign] + ' ' + SIGN_SYMBOLS[d60H7sign] + '</strong> (7궁주: ' + (RULER_NAMES[d60H7lord]||d60H7lord) + ')<br><br>');
        ch4 += spouseKarmaBySign[d60H7sign] + '<br>';

        if (d60H7planets.length > 0) {
            ch4 += '<br><strong>' + (isEasy ? '배우자 자리의 행성:' : 'D60 7궁의 행성:') + '</strong><br>';
            d60H7planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (isEasy) {
                    ch4 += (p.natural === 'benefic'
                        ? '전생에서 배우자와 좋은 인연을 맺었으며, 이번 생에서도 배우자에게서 축복을 받습니다.'
                        : '전생에서 배우자와 해결하지 못한 과제가 있으며, 이번 생에서 이를 풀어갑니다. 도전이지만 성장의 기회입니다.') + '<br>';
                } else {
                    ch4 += p.symbol + ' <strong>' + p.name + '</strong>' + deityTag(pD) + '<br>';
                    ch4 += (p.natural === 'benefic'
                        ? '길성이 7궁에 위치 — 전생에서 배우자와 좋은 카르마를 쌓았으며, 이번 생에서도 배우자에게서 축복을 받습니다.'
                        : '흉성이 7궁에 위치 — 전생에서 배우자와 해결하지 못한 카르마가 있으며, 이번 생에서 이를 정산합니다. 도전이지만 성장의 기회입니다.') + '<br>';
                }
            });
        }

        // 금성 (사랑의 카르마)
        if (venusD60) {
            const venD = getDeity(venusD60.sidereal);
            const venH = ((venusD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (isEasy) {
                ch4 += '<br>' + (venD.deity && venD.deity.nature === 'benefic' ?
                    '전생에서 사랑을 진심으로 했기 때문에, 이번 생에서도 아름다운 사랑이 기다려요.' :
                    '전생에서 사랑과 관련해 풀지 못한 과제가 있어요. 이번 생에서 진짜 사랑이 뭔지 배워가는 과정이 중요합니다. 그 과정이 당신을 더 깊은 사람으로 만들어요.');
            } else {
                ch4 += '<br><strong>♀ 금성 (사랑의 행성)</strong> → D60 ' + venH + '궁 (' + houseThemes[venH] + ')' + deityTag(venD) + '<br>';
                ch4 += venD.deity && venD.deity.nature === 'benefic' ?
                    '금성이 길신 <strong>' + venD.deity.ko + '</strong>의 보호 아래 있습니다. 전생에서 사랑을 올바르게 실천했으며, 이번 생에서도 아름다운 사랑이 기다립니다. ' + venD.deity.desc :
                    '금성이 흉신 <strong>' + (venD.deity?venD.deity.ko:'') + '</strong>의 영향 아래 있습니다. 전생에서 사랑에 대한 도전이 있었으며, 이번 생에서 진정한 사랑의 의미를 배우는 것이 과제입니다. ' + (venD.deity?venD.deity.desc:'');
            }
        }

        // 라후-케투 축 (1-7궁이면 전생 인연)
        if (rahuD60 && ketuD60) {
            const rahuH = ((rahuD60.dSign - dLagnaSign + 12) % 12) + 1;
            const ketuH = ((ketuD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (rahuH === 7 || ketuH === 7 || rahuH === 1 || ketuH === 1) {
                ch4 += isEasy
                    ? '<br><br>🔥 <strong>매우 강한 전생 인연!</strong> 배우자와 전생에서 깊은 연결이 있었으며, 이번 생에서도 운명적으로 만나게 됩니다.'
                    : '<br><br>🔥 <strong>라후-케투 축이 D60 1-7궁 라인!</strong> 이것은 배우자와의 <strong>매우 강한 전생 인연</strong>을 나타냅니다. 전생에서 깊은 카르마적 연결이 있었으며, 이번 생에서도 운명적으로 만나게 됩니다.';
            }
        }

        // 7궁주의 D60 위치
        const h7lordPlanet = dPositions.find(p => p.id === d60H7lord);
        if (h7lordPlanet) {
            const h7lH = ((h7lordPlanet.dSign - dLagnaSign + 12) % 12) + 1;
            const h7lD = getDeity(h7lordPlanet.sidereal);
            if (isEasy) {
                const h7lDesc = h7lH === 1 ? '배우자가 당신 자신의 성장에 직결됩니다.' : h7lH === 4 ? '가정과 안식처를 통해 배우자를 만나게 됩니다.' : h7lH === 9 ? '해외나 교육을 통해 배우자와 인연이 이어집니다.' : h7lH === 10 ? '직업이나 사회적 활동을 통해 배우자 인연이 이어집니다.' : h7lH === 12 ? '해외나 영적인 환경에서 배우자와 만나게 됩니다.' : '';
                if (h7lDesc) ch4 += '<br><br>' + h7lDesc;
            } else {
                ch4 += '<br><br><strong>7궁주 ' + (RULER_NAMES[d60H7lord]||d60H7lord) + '</strong> → D60 ' + h7lH + '궁 (' + houseThemes[h7lH] + ')' + deityTag(h7lD) + '<br>';
                ch4 += '배우자와의 카르마적 연결이 <strong>' + houseThemes[h7lH] + '</strong> 영역을 통해 발현됩니다. ';
                ch4 += h7lH === 1 ? '배우자가 당신 자신의 성장에 직결됩니다.' : h7lH === 4 ? '가정과 안식처를 통해 배우자를 만납니다.' : h7lH === 9 ? '해외나 종교/교육을 통해 배우자와 인연이 이어집니다.' : h7lH === 10 ? '직업/사회적 활동을 통해 배우자 인연이 이어집니다.' : h7lH === 12 ? '해외나 영적 환경에서 배우자와 만나는 카르마입니다.' : '';
            }
        }
        html += subChapter('💍', '배우자 카르마 — 전생의 인연', ch4);

        // ─── 소챕터 5: 직업 카르마 ───
        const d60H10sign = (dLagnaSign + 9) % 12;
        const d60H10lord = SIGN_RULERS[d60H10sign];
        const d60H10planets = dPositions.filter(p => p.dSign === d60H10sign);
        const satD60 = dPositions.find(p => p.id === 'Saturn');
        const careerKarma = ['군사/리더십/스포츠','금융/예술/농업','교육/미디어/상업','간호/부동산/호텔','정치/연예/관리','의료/분석/봉사','법률/외교/디자인','연구/수사/의학','교육/종교/해외','행정/건설/공무원','기술/과학/혁신','예술/영성/병원'][d60H10sign];

        let ch5 = (isEasy
            ? '<strong>전생의 직업 카르마</strong><br><br>'
            : '<strong>D60 10궁 (직업): ' + SIGNS[d60H10sign] + ' ' + SIGN_SYMBOLS[d60H10sign] + '</strong> (10궁주: ' + (RULER_NAMES[d60H10lord]||d60H10lord) + ')<br><br>');
        ch5 += '전생에서의 직업적 카르마가 <strong>' + careerKarma + '</strong> 방향으로 각인되어 있습니다. 이번 생에서도 이 분야에 자연스러운 끌림이 있습니다.<br>';
        if (satD60) {
            const satD = getDeity(satD60.sidereal);
            const satH = ((satD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) ch5 += '<br><strong>♄ 토성 (카르마의 주인)</strong> → D60 ' + satH + '궁 (' + houseThemes[satH] + ')' + deityTag(satD) + '<br>';
            ch5 += isEasy ?
                ('<br>' + (satD.deity && satD.deity.nature === 'benefic' ?
                    '이건 <strong>매우 드문 축복</strong>이에요! 전생에서 힘든 일을 참고 견뎌낸 덕분에, 이번 생에서는 직업적으로 큰 시련이 줄어듭니다. 일하면서 겪는 어려움이 남들보다 가벼울 거예요.' :
                    '직업과 관련해서 전생에서 가져온 <strong>무거운 숙제</strong>가 있어요. 일에서 어려움을 겪을 수 있지만, 꾸준히 노력하고 다른 사람을 돕는 것이 이 숙제를 푸는 열쇠입니다.')) :
                (satD.deity && satD.deity.nature === 'benefic' ?
                    '토성이 길신 아래에 있는 것은 <strong>매우 희귀한 축복</strong>입니다! 전생에서 고통을 인내로 승화시킨 공덕이 이번 생의 직업적 시련을 줄여줍니다.' :
                    '토성이 흉신 아래에 있어 직업적 영역에서 <strong>전생의 무거운 카르마</strong>가 있습니다. ' + (satD.deity?satD.deity.desc:'') + '. 인내와 봉사, 만트라(Om Shanaishcharaya Namaha)로 이 업보를 녹이세요.');
        }
        if (d60H10planets.length > 0) {
            ch5 += '<br><br><strong>' + (isEasy ? '직업 자리의 행성:' : 'D60 10궁의 행성:') + '</strong> ' + d60H10planets.map(p => p.name).join(', ') + ' — 직업적 카르마가 이 행성에 집중되어 있습니다.';
        }
        html += subChapter('💼', '직업 카르마 — 전생의 소명', ch5);

        // ─── 소챕터 6: 재물 카르마 ───
        const d60H2sign = (dLagnaSign + 1) % 12;
        const d60H2planets = dPositions.filter(p => p.dSign === d60H2sign);
        let ch6 = (isEasy
            ? '<strong>전생의 재물 카르마</strong><br><br>'
            : '<strong>D60 2궁 (재물): ' + SIGNS[d60H2sign] + ' ' + SIGN_SYMBOLS[d60H2sign] + '</strong><br><br>');
        const wealthKarma = ['자기 힘으로 재물을 모은 전생. 독립적 재테크 본능.','풍요로운 환경에서 살았던 전생. 물질적 안정 추구.','지적 활동으로 부를 쌓은 전생. 사업 수완.','가정에서 재물이 온 전생. 부동산/가족 재산.','권위로 재물을 얻은 전생. 과시적 소비 경향.','봉사로 재물을 모은 전생. 검소한 관리.','파트너십으로 재물을 모은 전생. 동업/결혼 재산.','타인의 재물(유산/보험)과 인연이 깊은 전생.','행운으로 재물이 온 전생. 해외/교육 관련 부.','느리지만 확실하게 모은 전생. 중년 이후 풍요.','혁신으로 재물을 모은 전생. 비전통적 수입.','영적 활동과 재물이 연결된 전생. 기부 성향.'][d60H2sign];
        ch6 += wealthKarma + '<br>';
        if (d60H2planets.length > 0) {
            ch6 += isEasy ? '<br>' : '<br><strong>D60 2궁의 행성:</strong><br>';
            d60H2planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                ch6 += (isEasy ? '' : p.symbol + ' ' + p.name + deityTag(pD) + ' — ') + (p.natural === 'benefic' ? '전생에서 재물에 대한 좋은 인연이 있어서 이번 생에서도 풍요로워요.' : '전생에서 재물과 관련해 풀어야 할 과제가 있어요. 꾸준한 노력으로 극복할 수 있습니다.') + '<br>';
            });
        }
        html += subChapter('💰', '재물 카르마 — 전생의 부', ch6);

        // ─── 소챕터 7: 행성별 신 목록 (전문가 모드만) ───
        if (!isEasy) {
            let ch7 = '';
            const lagnaD2 = getDeity(lagnaSidereal);
            if (lagnaD2.deity) {
                const lc = lagnaD2.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                ch7 += '<div style="padding:4px 0;">⬆ 라그나 → <strong>' + lagnaD2.deity.name + '</strong>(' + lagnaD2.deity.ko + ') <span style="color:' + lc + ';">' + (lagnaD2.deity.nature === 'benefic' ? '길' : '흉') + '</span></div>';
            }
            positions.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (pD.deity) {
                    const c = pD.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                    ch7 += '<div style="padding:4px 0;">' + p.symbol + ' ' + p.name + ' → <strong>' + pD.deity.name + '</strong>(' + pD.deity.ko + ') <span style="color:' + c + ';">' + (pD.deity.nature === 'benefic' ? '길' : '흉') + '</span></div>';
                }
            });
            html += subChapter('🕉️', '행성별 수호신 목록', ch7);
        }

        // ─── 소챕터 8: 종합 카르마 판단 ───
        const beneficCount = positions.filter(p => {
            const pD = getDeity(p.sidereal);
            return pD.deity && pD.deity.nature === 'benefic';
        }).length;
        const maleficPlanets = positions.filter(p => {
            const pD = getDeity(p.sidereal);
            return pD.deity && pD.deity.nature === 'malefic';
        });

        let ch8 = isEasy ?
            '9개 행성 중 <strong style="color:#5cb85c">' + beneficCount + '개가 좋은 기운</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + '개가 주의 기운</strong><br><br>' :
            '9개 행성 중 <strong style="color:#5cb85c">' + beneficCount + '개 길신</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + '개 흉신</strong> 배치<br><br>';
        if (beneficCount >= 7) {
            ch8 += isEasy ?
                '🌟 <strong>전생에서 정말 좋은 일을 많이 했어요!</strong> 거의 모든 행성이 좋은 기운 아래 있어서, 이번 생에서 자연스럽게 좋은 결과를 얻습니다. 타고난 행운이 강한 편이에요.' :
                '🌟 <strong>매우 강한 전생 공덕.</strong> 파라샤라는 이런 차트를 "신들의 축복을 받은 영혼"이라 했습니다. 대부분의 행성이 길신 아래 있어 이번 생에서 자연스럽게 좋은 결과를 얻습니다.';
        } else if (beneficCount >= 5) {
            ch8 += isEasy ?
                '✨ <strong>전생에서 쌓은 좋은 기운이 풍부해요.</strong> 삶의 많은 영역에서 보호받고 있습니다.' :
                '✨ <strong>전생의 공덕이 풍부합니다.</strong> 길신이 우세하여 삶의 많은 영역에서 보호받습니다.';
            if (maleficPlanets.length > 0) ch8 += isEasy ?
                ' 다만 일부 영역에서는 조금 더 노력이 필요해요.' :
                ' 다만 <strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>의 영역에서 카르마적 도전이 있으니 해당 행성의 만트라와 자선을 실천하세요.';
        } else if (beneficCount >= 3) {
            ch8 += isEasy ?
                '⚖️ <strong>좋은 기운과 도전의 기운이 반반이에요.</strong> 인생에서 좋은 일과 힘든 일이 번갈아 찾아옵니다.' :
                '⚖️ <strong>전생 카르마의 균형 상태.</strong> 길흉이 섞여 있어 좋은 일과 도전이 교차합니다.';
            if (maleficPlanets.length > 0) ch8 += '<br>' + (isEasy ? '특히 주의할 행성: ' : '주의할 행성: ') + '<strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>';
        } else {
            ch8 += isEasy ?
                '🔥 <strong>이번 생은 전생의 숙제를 풀러 온 거예요.</strong> 도전이 많지만, 가장 무거운 숙제를 받은 사람이 가장 크게 성장합니다. 꾸준한 노력과 다른 사람을 돕는 것이 특히 중요해요.' :
                '🔥 <strong>카르마 정산의 생.</strong> 전생에서 많은 도전을 가져왔지만, 파라샤라는 "가장 무거운 카르마를 가진 영혼이 가장 큰 성장을 한다"고 했습니다. 만트라 수행과 자선이 특히 중요합니다.';
        }
        html += subChapter('📊', '종합 카르마 판단', ch8);

        // (이전 코드 제거됨 - 신 목록과 해석은 위 소챕터에 통합)

    } else if (division === 2) {
        // D2 호라 — 재물·부의 축적
        const d2LagnaInterp = ['자기 힘으로 재물을 모으는 타입. 독립적이고 공격적인 재테크.','감각적 투자와 안정적 재물 축적. 부동산, 식음료, 예술 관련 수입.','지적 활동으로 돈을 법. 글쓰기, 교육, 통신, 사업 수완.','부동산과 가정 관련 수입. 어머니에게서 재산. 감정적 소비 주의.','리더십과 권위로 재물을 모음. 정부, 금 관련 사업. 과시적 소비.','분석력과 기술로 수입. 의료, 회계, 서비스업. 검소한 관리자.','파트너십으로 재물. 법률, 외교, 패션, 예술 관련 수입.','타인의 돈(유산, 보험, 투자)으로 부를 축적. 비밀스러운 재원.','교육, 해외, 종교를 통한 수입. 행운으로 재물이 들어옴.','조직과 체계적 노력으로 재물. 느리지만 확실한 축적. 중년 이후 부유.','기술, 혁신, 사회적 네트워크로 수입. 비전통적 재원.','영적/예술적 활동으로 수입. 해외와 관련된 재물. 기부 성향.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💰 재물과 부의 상세 분석' : '💰 D2 호라 — 재물과 부의 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D2 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d2LagnaInterp + '<br><br>';

        const sunD2 = dPositions.find(p => p.id === 'Sun');
        const moonD2 = dPositions.find(p => p.id === 'Moon');
        const jupD2 = dPositions.find(p => p.id === 'Jupiter');
        const venD2 = dPositions.find(p => p.id === 'Venus');

        if (sunD2) {
            const sunInOwn = sunD2.dSign === 4; // Leo
            html += (isEasy ? '' : '<strong>☉ 태양 → ' + SIGNS[sunD2.dSign] + ':</strong> ') + (sunInOwn ? (isEasy ? '🌟 <strong>자수성가형!</strong> 권위와 리더십으로 스스로 부를 만듦.' : '🌟 <strong>태양이 자기 호라(사자)!</strong> 자수성가형. 권위와 리더십으로 스스로 부를 만듦.') : (isEasy ? '타인의 도움이나 정부/공공 부문을 통한 수입.' : '태양이 달의 호라. 타인의 도움이나 정부/공공 부문을 통한 수입.')) + '<br>';
        }
        if (moonD2) {
            const moonInOwn = moonD2.dSign === 3; // Cancer
            html += (isEasy ? '' : '<strong>☽ 달 → ' + SIGNS[moonD2.dSign] + ':</strong> ') + (moonInOwn ? (isEasy ? '🌟 <strong>대중과 관계를 통해 풍족한 삶!</strong>' : '🌟 <strong>달이 자기 호라(게)!</strong> 대중과 관계를 통해 풍족한 삶.') : (isEasy ? '자기 노력과 독립적 활동으로 생계.' : '달이 태양의 호라. 자기 노력과 독립적 활동으로 생계.')) + '<br>';
        }
        if (jupD2) html += (isEasy ? '' : '<strong>♃ 목성 → ' + SIGNS[jupD2.dSign] + ':</strong> ') + (isEasy ? (jupD2.dSign === 4 ? '자기 능력으로 큰 부를 쌓을 수 있어요.' : '타인과 관계를 통한 풍요.') : '목성이 ' + (jupD2.dSign === 4 ? '태양 호라 — 자기 능력으로 큰 부.' : '달 호라 — 타인과 관계를 통한 풍요.')) + '<br>';
        if (venD2) html += (isEasy ? '' : '<strong>♀ 금성 → ' + SIGNS[venD2.dSign] + ':</strong> ') + (isEasy ? (venD2.dSign === 4 ? '예술/사치품으로 자수성가.' : '배우자나 파트너를 통한 재물.') : '금성이 ' + (venD2.dSign === 4 ? '태양 호라 — 예술/사치품으로 자수성가.' : '달 호라 — 배우자나 파트너를 통한 재물.')) + '<br>';

        // D2 2궁(축적된 부) 분석
        const d2H2sign = (dLagnaSign + 1) % 12;
        const d2H2planets = dPositions.filter(p => p.dSign === d2H2sign);
        html += '<br><strong>' + (isEasy ? '축적된 부:' : 'D2 2궁 (축적된 부) — ' + SIGNS[d2H2sign] + ':') + '</strong><br>';
        if (d2H2planets.length > 0) {
            d2H2planets.forEach(p => {
                const wealth = {Sun:'권위와 지위를 통한 재산 축적',Moon:'대중적 활동을 통한 유동적 재산',Mars:'부동산·기술·경쟁 분야의 재산',Mercury:'사업·지적 활동·통신 분야의 재산',Jupiter:'교육·종교·법률 분야의 풍족한 재산',Venus:'예술·패션·사치품 관련 재산',Saturn:'느리지만 꾸준한 재산 축적. 중년 이후 안정',Rahu:'비전통적 방법·외국 관련 재산',Ketu:'물질에 초연. 영적 가치 추구'};
                html += isEasy ? (wealth[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (wealth[p.id]||'') + '<br>';
            });
        } else {
            html += isEasy ? '꾸준히 재물이 쌓이는 타입이에요.<br>' : '2궁에 행성 없음 — 2궁 주인의 위치가 재물 축적의 열쇠.<br>';
        }
        html += '</div></div>';

    } else if (division === 3) {
        // D3 드레카나 — 형제·용기·소통
        const d3LagnaInterp = ['독립적이고 리더십 있는 형제. 형제 중 선두 역할. 용감한 소통 방식.','안정적이고 물질적으로 풍족한 형제 관계. 예술적 형제가 있을 수 있음.','지적이고 소통이 활발한 형제. 여러 형제가 있거나 형제와 대화가 많음.','감정적으로 깊은 형제 유대. 어머니 같은 형제. 형제가 보호해줌.','카리스마 있고 자존심 강한 형제. 형제 중 유명하거나 성공한 사람.','분석적이고 실용적인 형제. 의료/교육 분야 형제. 비판적일 수 있음.','외교적이고 매력적인 형제. 형제를 통한 사교적 연결.','강렬하고 비밀이 많은 형제 관계. 갈등 후 깊은 유대. 변혁적 관계.','자유롭고 철학적인 형제. 해외에 사는 형제. 종교/교육 관련.','책임감 있고 야망 있는 형제. 형제에 대한 의무감. 형제가 적거나 관계가 진지.','독특하고 독립적인 형제. 비전통적 형제 관계. 기술/과학 분야.','영적이고 예술적인 형제. 해외 거주 형제. 형제와 정서적 교감.'][dLagnaSign];

        const d3_3sign = (dLagnaSign + 2) % 12;
        const d3_11sign = (dLagnaSign + 10) % 12;
        const d3_3planets = dPositions.filter(p => p.dSign === d3_3sign);
        const d3_11planets = dPositions.filter(p => p.dSign === d3_11sign);
        const marsD3 = dPositions.find(p => p.id === 'Mars');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👫 형제·용기·소통 분석' : '👫 D3 드레카나 — 형제·용기·소통 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D3 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d3LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? '동생:' : 'D3 3궁 (동생) — ' + SIGNS[d3_3sign] + ':') + '</strong><br>';
        if (d3_3planets.length > 0) {
            const bro = {Sun:'동생이 리더십 있고 권위적',Moon:'동생과 감정적으로 가까움',Mars:'동생이 활동적이고 용감. 다툼 가능',Mercury:'동생이 지적이고 소통 능력 좋음',Jupiter:'동생이 현명하고 행운 가져옴',Venus:'동생이 매력적이고 예술적',Saturn:'동생과 관계에 어려움. 나이 차이 클 수 있음',Rahu:'동생이 독특하거나 외국 관련',Ketu:'동생과 거리감. 영적 연결'};
            d3_3planets.forEach(p => { html += isEasy ? (bro[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (bro[p.id]||'') + '<br>'; });
        } else html += isEasy ? '' : '3궁에 행성 없음 — 3궁주의 위치를 확인하세요.<br>';

        html += '<br><strong>' + (isEasy ? '형/언니:' : 'D3 11궁 (형/언니) — ' + SIGNS[d3_11sign] + ':') + '</strong><br>';
        if (d3_11planets.length > 0) {
            d3_11planets.forEach(p => { html += isEasy ? '형/언니와의 관계에 영향이 있습니다.<br>' : '• ' + p.name + '이(가) 11궁에 위치하여 형/언니와의 관계에 영향.<br>'; });
        } else html += isEasy ? '' : '11궁에 행성 없음.<br>';

        if (marsD3) {
            const marsH = ((marsD3.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♂ 화성 (형제의 카라카):</strong> ';
            html += marsH <= 4 ? '형제와 밀접한 관계. 용기와 행동력이 강한 형제.' : marsH <= 8 ? '형제와의 갈등 또는 형제를 통한 변혁.' : '형제가 해외에 있거나 영적 성향.';
        }
        html += '</div></div>';

    } else if (division === 4) {
        // D4 차투르탐샤 — 재산·부동산·행운
        const d4LagnaInterp = ['적극적으로 부동산을 취득. 새 집을 짓거나 사는 것을 좋아함.','안정적이고 풍족한 부동산. 땅과 농장. 사치스러운 주거.','여러 채의 집 또는 자주 이사. 지적 환경의 주거를 선호.','가정과 부동산이 감정적으로 매우 중요. 물 근처 주거. 어머니에게서 부동산.','화려하고 넓은 집. 럭셔리한 인테리어. 명망 있는 지역.','깔끔하고 실용적인 주거. 건강한 환경 중시. 작은 집 여러 채 가능.','아름답고 조화로운 주거. 인테리어에 관심. 파트너와 함께 부동산.','변혁을 겪는 부동산. 유산으로 받는 재산. 비밀스러운 장소.','넓은 땅과 해외 부동산. 종교/교육 시설 근처. 행운의 부동산.','체계적 부동산 투자. 오래된 건물. 느리지만 확실한 재산 축적.','독특한 주거 형태. 현대적 아파트. 기술 관련 시설.','물 근처의 아름다운 집. 해외 부동산. 영적 공간.'][dLagnaSign];

        const d4_4sign = (dLagnaSign + 3) % 12;
        const d4_4planets = dPositions.filter(p => p.dSign === d4_4sign);
        const d4_10sign = (dLagnaSign + 9) % 12;
        const d4_10planets = dPositions.filter(p => p.dSign === d4_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🏠 재산·부동산·행운 분석' : '🏠 D4 차투르탐샤 — 재산·부동산·행운 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D4 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d4LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? '부동산/가정:' : 'D4 4궁 (부동산/가정) — ' + SIGNS[d4_4sign] + ':') + '</strong><br>';
        if (d4_4planets.length > 0) {
            const prop = {Sun:'정부 소유 건물이나 권위 있는 주거',Moon:'아름다운 집. 물 근처. 어머니의 영향',Mars:'새 집 건축. 부동산 분쟁 가능',Mercury:'사업용 부동산. 여러 채 소유',Jupiter:'넓고 풍족한 집! 최고의 부동산 운',Venus:'럭셔리한 집. 아름다운 인테리어',Saturn:'오래된 집. 수리 필요. 중년 이후 안정',Rahu:'해외 부동산. 비전통적 주거',Ketu:'부동산에 무관심. 영적 공간 선호'};
            d4_4planets.forEach(p => { html += isEasy ? (prop[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (prop[p.id]||'') + '<br>'; });
        } else html += isEasy ? '안정적인 부동산 운이에요.<br>' : '4궁에 행성 없음 — 4궁주의 위치가 부동산의 열쇠.<br>';

        html += '<br><strong>' + (isEasy ? '전반적 행운:' : 'D4 10궁 (전반적 행운) — ' + SIGNS[d4_10sign] + ':') + '</strong><br>';
        if (d4_10planets.length > 0) {
            d4_10planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '전반적 행운이 좋음!<br>' : '행운을 위해 노력이 필요하지만 성장의 기회.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? '길성이 10궁에 위치하여 전반적 행운이 좋음!' : '흉성이 10궁 — 행운을 위해 노력이 필요하지만 성장의 기회.') + '<br>';
            });
        } else html += isEasy ? '' : '10궁에 행성 없음.<br>';
        html += '</div></div>';

    } else if (division === 16) {
        // D16 쇼다샴샤 — 차량·편의·행복
        const d16LagnaInterp = ['스포츠카, 오토바이 등 역동적인 차량. 운전을 즐김.','고급 차량과 편안한 이동 수단. 럭셔리한 물질적 편의.','여러 대의 차량 또는 다양한 이동 수단. 기술적 기기 좋아함.','편안한 가정용 차량. 가족과의 여행. 물질적 안정이 행복.','최고급 차량. 과시적 소비. 고급 브랜드 선호.','실용적이고 연비 좋은 차량. 건강 관련 기기.','세련되고 디자인 좋은 차량. 미적 감각 있는 물건들.','중고차나 상속받은 차량. 보험이 중요. 변혁적 물질 경험.','SUV나 해외 브랜드. 여행용 차량. 모험적 이동 수단.','검소하지만 튼튼한 차량. 실용성 우선. 중년 이후 좋은 차.','전기차나 최신 기술 차량. 독특한 이동 수단.','물 관련 이동(보트). 감성적으로 좋아하는 물건들.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🚗 차량·편의·행복 분석' : '🚗 D16 쇼다샴샤 — 차량·편의·행복 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D16 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d16LagnaInterp + '<br><br>';

        const d16_4sign = (dLagnaSign + 3) % 12;
        const d16_4planets = dPositions.filter(p => p.dSign === d16_4sign);
        html += '<strong>' + (isEasy ? '편의/행복:' : 'D16 4궁 (편의/행복) — ' + SIGNS[d16_4sign] + ':') + '</strong><br>';
        if (d16_4planets.length > 0) {
            d16_4planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '물질적 편의와 행복이 풍부!<br>' : '물질적 편의를 위해 노력 필요.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? '물질적 편의와 행복이 풍부!' : '물질적 편의를 위해 노력 필요.') + '<br>';
            });
        } else html += isEasy ? '물질적 편의는 보통이에요.<br>' : '4궁에 행성 없음 — 4궁주의 위치가 행복의 열쇠.<br>';

        const venD16 = dPositions.find(p => p.id === 'Venus');
        if (venD16) {
            const vH = ((venD16.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♀ 금성 (편의의 카라카):</strong> ';
            html += [,'자신이 편의를 창조','재물로 편의','소통으로 행복','가정에서 큰 행복!','자녀/연애로 행복','건강 관리로 편의','배우자로 행복!','변혁을 통한 행복','여행/학문으로 행복','사회적 지위로 편의','친구/네트워크로 행복','영적 평화로 행복'][vH] || '';
        }
        html += '</div></div>';

    } else if (division === 20) {
        // D20 빔샴샤 — 영적 수행·종교
        const d20LagnaInterp = ['행동적 영성. 카르마 요가. 활동적 봉사를 통한 수행.','자연과 감각을 통한 영성. 만트라 수행. 사원/절에서의 명상.','지적 영성. 경전 연구. 명상보다 지식을 통한 깨달음.','감정적 영성. 바크티 요가(헌신). 어머니 같은 신성에 끌림.','왕도의 영성. 리더로서의 영적 실천. 태양 숭배.','봉사의 영성. 세바(봉사)를 통한 수행. 건강과 치유 관련 영성.','조화의 영성. 예술과 미를 통한 신성 체험. 탄트라.','깊은 변혁의 영성. 탄트라, 쿤달리니. 죽음과 재생의 수행.','구도자의 영성. 순례 여행. 스승을 찾아 떠남. 철학적 수행.','전통적 영성. 체계적 수행. 카르마 요가. 인내의 수행.','혁신적 영성. 비전통적 수행법. 인류를 위한 봉사.','초월적 영성. 명상, 꿈, 직관. 신비 체험. 해탈 추구.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🙏 영적 수행·종교 분석' : '🙏 D20 빔샴샤 — 영적 수행·종교 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D20 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d20LagnaInterp + '<br><br>';

        const jupD20 = dPositions.find(p => p.id === 'Jupiter');
        const sunD20 = dPositions.find(p => p.id === 'Sun');
        const ketuD20 = dPositions.find(p => p.id === 'Ketu');
        const d20_9sign = (dLagnaSign + 8) % 12;
        const d20_12sign = (dLagnaSign + 11) % 12;
        const d20_9planets = dPositions.filter(p => p.dSign === d20_9sign);

        if (jupD20) {
            const jH = ((jupD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♃ 목성 (영적 스승) → ' + jH + '궁:</strong> ') + ([,'강한 영적 자아','영적 지식이 재물이 됨','영적 소통 능력','깊은 내면의 평화','전생의 영적 공덕','봉사를 통한 영성','스승과의 만남','비밀스러운 영적 지식','최고의 배치! 위대한 영적 행운','영적 권위자','영적 커뮤니티','해탈과 깨달음'][jH] || '') + '<br>';
        }
        if (ketuD20) {
            const kH = ((ketuD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☋ 케투 (해탈) → ' + kH + '궁:</strong> ') + ([,'타고난 영적 능력','영적 가치관','영적 소통','내면 깊은 곳의 해탈','전생 수행의 결과','봉사하는 영혼','배우자를 통한 영적 성장','깊은 변혁적 영성','영적 순례자','영적 직업','영적 커뮤니티의 리더','해탈 직전의 영혼'][kH] || '') + '<br>';
        }
        html += '<br><strong>' + (isEasy ? '구루/스승:' : 'D20 9궁 (구루/스승) — ' + SIGNS[d20_9sign] + ':') + '</strong><br>';
        if (d20_9planets.length > 0) {
            d20_9planets.forEach(p => { html += isEasy ? '영적 스승과의 인연이 강함.<br>' : '• ' + p.name + ': 영적 스승과의 인연이 강함.<br>'; });
        } else html += isEasy ? '영적 스승을 적극적으로 찾아보면 좋아요.<br>' : '9궁에 행성 없음 — 스승을 적극적으로 찾아야 함.<br>';
        html += '</div></div>';

    } else if (division === 24) {
        // D24 차투르빔샴샤 — 교육·학문
        const d24LagnaInterp = ['체육, 군사학, 리더십 교육에 재능. 행동으로 배움.','음악, 미술, 요리, 금융 교육. 감각적 학습 선호.','언어, 문학, 커뮤니케이션, 미디어 교육. 다재다능한 학습자.','역사, 심리학, 가정학 교육. 감정적으로 깊이 배움.','정치학, 연극, 경영학 교육. 리더로서 배우고 가르침.','의학, 과학, 분석학, 통계학 교육. 정밀한 학습 능력.','법학, 외교학, 디자인 교육. 균형 잡힌 학습 방식.','심리학, 연구, 수사학, 오컬트 교육. 깊이 파고드는 학습.','철학, 신학, 국제학 교육. 해외 유학 가능. 고등 교육 적합.','경영학, 행정학, 건축학 교육. 체계적 학습. 학위 중시.','IT, 공학, 항공학, 사회과학 교육. 혁신적 학습 방식.','예술, 음악, 영성, 영화학 교육. 직관적 학습. 창작 분야.'][dLagnaSign];

        const d24_4sign = (dLagnaSign + 3) % 12;
        const d24_5sign = (dLagnaSign + 4) % 12;
        const d24_4planets = dPositions.filter(p => p.dSign === d24_4sign);
        const d24_5planets = dPositions.filter(p => p.dSign === d24_5sign);
        const jupD24 = dPositions.find(p => p.id === 'Jupiter');
        const merD24 = dPositions.find(p => p.id === 'Mercury');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '📚 교육·학문 분석' : '📚 D24 차투르빔샴샤 — 교육·학문 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D24 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d24LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? '기초 교육:' : 'D24 4궁 (기초 교육) — ' + SIGNS[d24_4sign] + ':') + '</strong><br>';
        if (d24_4planets.length > 0) {
            d24_4planets.forEach(p => {
                const edu4 = {Sun:'명문 학교. 권위 있는 교육',Moon:'편안한 학습 환경. 가정 교육 영향 큼',Mars:'경쟁적 학습. 체육/기술 교육 강함',Mercury:'최고의 배치! 뛰어난 학업 능력',Jupiter:'풍부한 교육 환경. 좋은 스승',Venus:'예술 교육. 아름다운 학교',Saturn:'어려운 교육 환경이지만 극복하면 깊은 학식',Rahu:'비전통적 교육. 외국 학교',Ketu:'교육에 관심 적음. 직관적 학습'};
                html += isEasy ? (edu4[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (edu4[p.id]||'') + '<br>';
            });
        } else html += isEasy ? '안정적인 교육 환경에서 꾸준히 성장하는 타입이에요.<br>' : '4궁에 행성 없음.<br>';

        html += '<br><strong>' + (isEasy ? '고등교육:' : 'D24 5궁 (고등 교육/지성) — ' + SIGNS[d24_5sign] + ':') + '</strong><br>';
        if (d24_5planets.length > 0) {
            d24_5planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '고등 교육에서 뛰어난 성취!<br>' : '학업에서의 도전이 성장으로 이어짐.<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? '고등 교육에서 뛰어난 성취!' : '학업에서의 도전이 성장으로 이어짐.') + '<br>';
            });
        } else html += isEasy ? '꾸준한 노력으로 좋은 결과를 얻을 수 있어요.<br>' : '5궁에 행성 없음.<br>';

        if (jupD24) {
            const jH = ((jupD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '<br>' : '<br><strong>♃ 목성 (지혜) → ' + jH + '궁:</strong> ') + ([1,4,5,9].includes(jH) ? '🎓 <strong>높은 학업 성취 기대!</strong> 대학원/박사/해외 유학 가능.' : (isEasy ? '학업을 통한 성장이 기대됩니다.' : '학업을 통한 성장. 목성의 축복이 ' + jH + '궁 영역에서 나타남.')) + '<br>';
        }
        if (merD24) {
            const mH = ((merD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☿ 수성 (학습) → ' + mH + '궁:</strong> ') + ([1,4,5,9].includes(mH) ? '📖 <strong>뛰어난 지적 능력!</strong> 수학, 언어, 분석에 재능.' : (isEasy ? '지적 능력이 잘 발휘됩니다.' : '지적 능력이 ' + mH + '궁 영역에서 발휘됨.')) + '<br>';
        }
        html += '</div></div>';

    } else if (division === 27) {
        // D27 삽타빔샴샤 — 체력·강점·약점
        const d27LagnaInterp = ['강한 체력과 에너지. 운동 능력 탁월. 머리/얼굴이 강점.','지구력과 인내력이 강점. 목/성대가 강함. 근력 좋음.','민첩성과 반사 신경이 강점. 손/팔이 능숙. 신경계 관리 필요.','감정적 회복력이 강점. 가슴/위장 관리 필요. 수영에 재능.','심장과 척추가 강함. 카리스마 있는 체격. 과로 주의.','소화력과 분석력이 강점. 장/피부 관리 필요. 요가 적합.','균형감과 조화로운 체형. 신장/허리 관리 필요. 댄스 적합.','회복력과 저항력이 강점. 생식기 건강 관리. 극한 스포츠 가능.','허벅지와 간이 강함. 야외 운동 적합. 과체중 주의.','뼈와 관절이 강함. 인내력 최고. 나이 들수록 건강해짐.','순환계와 발목이 주의점. 독특한 운동법 선호. 혁신적 건강법.','면역력과 직관이 강점. 발/림프 관리 필요. 수중 운동 적합.'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💪 체력·강점·약점 분석' : '💪 D27 삽타빔샴샤 — 체력·강점·약점 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D27 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d27LagnaInterp + '<br><br>';

        const marsD27 = dPositions.find(p => p.id === 'Mars');
        const sunD27 = dPositions.find(p => p.id === 'Sun');
        const satD27 = dPositions.find(p => p.id === 'Saturn');
        if (marsD27) {
            const mH = ((marsD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♂ 화성 (에너지) → ' + mH + '궁:</strong> ') + ([,'강한 체력과 의지!','체력으로 돈을 벌 수 있음','용기와 모험심 강함','가정에서 운동하는 타입','스포츠 재능!','질병을 이기는 면역력','배우자와 함께 운동','위기에서 살아남는 힘','모험/탐험 분야 강함','직업적 체력 활용','목표 달성 에너지','해외에서 체력 활동'][mH] || '') + '<br>';
        }
        if (sunD27) {
            const sH = ((sunD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☉ 태양 (활력) → ' + sH + '궁:</strong> ') + (isEasy ? '활력의 원천: ' : '활력의 원천이 ' + sH + '궁 영역. ') + ([,'자아에서 에너지','재물 활동에서 활력','소통에서 에너지','가정에서 안정','창작에서 활력','봉사에서 에너지','관계에서 활력','변혁에서 에너지','여행에서 활력','직업에서 에너지','사회에서 활력','영적 수행에서 에너지'][sH] || '') + '<br>';
        }

        // D27 6궁 (약점/질병) 분석
        const d27_6sign = (dLagnaSign + 5) % 12;
        const d27_6planets = dPositions.filter(p => p.dSign === d27_6sign);
        html += '<br><strong>' + (isEasy ? '약점/취약점:' : 'D27 6궁 (약점/취약점) — ' + SIGNS[d27_6sign] + ':') + '</strong><br>';
        const bodyParts = ['머리/뇌','목/갑상선','폐/팔','위장/가슴','심장/등','소화기/장','신장/허리','생식기','간/허벅지','뼈/관절','발목/순환계','발/면역계'];
        html += '취약 부위: <strong>' + bodyParts[d27_6sign] + '</strong> — 이 부위의 건강 관리에 주의하세요.<br>';
        if (d27_6planets.length > 0) {
            d27_6planets.forEach(p => { html += isEasy ? '이 부위에 특별한 주의가 필요합니다.<br>' : '• ' + p.name + '이(가) 6궁에 위치하여 이 부위에 특별한 주의가 필요합니다.<br>'; });
        }
        html += '</div></div>';

    } else if (division === 30) {
        // D30 트림샴샤 — 불행·질병·장애
        const d30LagnaInterp = ['사고, 화상, 두통. 성급한 결정으로 인한 문제. 분노 관리 필요.','재정적 손실, 식이 문제, 갑상선. 과식과 집착 주의.','신경 불안, 불면증, 호흡 문제. 과도한 걱정 주의.','감정적 불안, 위장 질환, 수분 관련 문제. 감정 조절 필요.','심장 문제, 자존심 손상, 과로. 겸손과 휴식 필요.','소화 장애, 알레르기, 완벽주의로 인한 스트레스. 이완 필요.','신장 문제, 관계 갈등, 우유부단함. 결단력 필요.','비밀, 사고, 수술, 성 관련 문제. 정기 검진 중요.','간 문제, 과체중, 도박/과소비. 절제 필요.','관절, 뼈, 우울, 고독. 칼슘과 사회적 교류 필요.','혈압, 순환계, 예측 불가 사고. 정기적 건강 체크.','면역 저하, 중독, 정신 건강. 명상과 수면 관리.'][dLagnaSign];

        const d30_6sign = (dLagnaSign + 5) % 12;
        const d30_8sign = (dLagnaSign + 7) % 12;
        const d30_12sign = (dLagnaSign + 11) % 12;
        const d30_6planets = dPositions.filter(p => p.dSign === d30_6sign);
        const d30_8planets = dPositions.filter(p => p.dSign === d30_8sign);
        const d30_12planets = dPositions.filter(p => p.dSign === d30_12sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '⚠️ 건강 주의사항 상세' : '⚠️ D30 트림샴샤 — 불행·질병·장애 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D30 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d30LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? '주의 질병:' : 'D30 6궁 (질병/적) — ' + SIGNS[d30_6sign] + ':') + '</strong><br>';
        const diseaseBySign = ['두통, 열병, 염증','목, 갑상선, 당뇨','폐, 신경, 불안','위장, 수분 저류','심장, 등, 혈압','소화기, 장, 피부','신장, 허리, 요로','생식기, 만성 질환','간, 허벅지, 과체중','뼈, 관절, 류마티스','순환계, 혈압, 발목','면역, 발, 정신건강'];
        html += '주의 질환: <strong>' + diseaseBySign[d30_6sign] + '</strong><br>';
        if (d30_6planets.length > 0) {
            const dis = {Sun:'눈, 심장 관련 질환 주의',Moon:'정신 건강, 수분 관련 문제',Mars:'사고, 수술, 화상 주의',Mercury:'신경계, 피부 문제',Jupiter:'간, 과체중 주의',Venus:'신장, 당뇨, 성병 주의',Saturn:'만성 질환, 관절 문제',Rahu:'원인불명 질환, 중독',Ketu:'면역 저하, 알레르기'};
            d30_6planets.forEach(p => { html += isEasy ? (dis[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (dis[p.id]||'') + '<br>'; });
        }

        html += '<br><strong>' + (isEasy ? '위험/수술:' : 'D30 8궁 (위험/수술) — ' + SIGNS[d30_8sign] + ':') + '</strong><br>';
        if (d30_8planets.length > 0) {
            d30_8planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? '위험/사고 주의. 보험과 정기 검진 중요.' : '위기에서 보호받음.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? '위험/사고 주의. 보험과 정기 검진 중요.' : '위기에서 보호받음.') + '<br>'; });
        } else html += isEasy ? '큰 위험은 적어요.<br>' : '8궁에 행성 없음 — 큰 위험은 적음.<br>';

        html += '<br><strong>' + (isEasy ? '입원/손실:' : 'D30 12궁 (입원/손실) — ' + SIGNS[d30_12sign] + ':') + '</strong><br>';
        if (d30_12planets.length > 0) {
            d30_12planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? '입원이나 고립 가능.' : '영적 치유와 회복.') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? '입원이나 고립 가능. 해외 의료 관련.' : '영적 치유와 회복.') + '<br>'; });
        } else html += isEasy ? '입원 위험은 낮아요.<br>' : '12궁에 행성 없음 — 입원 위험 낮음.<br>';
        html += '</div></div>';

    } else if (division === 40) {
        // D40 카베담샤 — 모계 유산
        const d40LagnaInterp = ['어머니가 독립적이고 강인한 성격. 모계에서 리더십 유전.','어머니가 재물을 잘 관리. 모계에서 물질적 풍요 유전.','어머니가 지적이고 소통 능력 좋음. 모계에서 언어/교육 재능 유전.','어머니와 매우 깊은 유대. 모계에서 감성과 직관 유전.','어머니가 권위 있고 당당함. 모계에서 리더십과 존엄 유전.','어머니가 건강 관리에 뛰어남. 모계에서 분석력/봉사 정신 유전.','어머니가 매력적이고 외교적. 모계에서 예술적 감각 유전.','어머니가 강인하고 변혁을 겪음. 모계에서 회복력 유전.','어머니가 교육적이고 종교적. 모계에서 지혜/철학 유전.','어머니가 책임감 있고 엄격함. 모계에서 인내와 규율 유전.','어머니가 독특하고 진보적. 모계에서 혁신적 사고 유전.','어머니가 영적이고 직관적. 모계에서 예술/영성 유전.'][dLagnaSign];

        const d40_4sign = (dLagnaSign + 3) % 12;
        const d40_4planets = dPositions.filter(p => p.dSign === d40_4sign);
        const moonD40 = dPositions.find(p => p.id === 'Moon');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👩 어머니 쪽 유산 분석' : '👩 D40 카베담샤 — 모계 유산 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D40 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d40LagnaInterp + '<br><br>';

        if (moonD40) {
            const mH = ((moonD40.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☽ 달 (어머니 카라카):</strong> ';
            html += [,'어머니가 본인에게 강한 영향','어머니에게서 재산','어머니와 소통 좋음','어머니와 깊은 유대! 최고의 배치','어머니가 창조적','어머니가 봉사적','어머니가 관계에 영향','어머니에게서 유산','어머니가 종교/교육적','어머니가 사회적 지위 있음','어머니가 독립적','어머니가 영적'][mH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? '어머니 쪽 가정:' : 'D40 4궁 (모계 가정) — ' + SIGNS[d40_4sign] + ':') + '</strong><br>';
        if (d40_4planets.length > 0) {
            d40_4planets.forEach(p => { html += isEasy ? '어머니 쪽 가정에서 강하게 유전된 에너지가 있습니다.<br>' : '• ' + p.name + ': 모계 가정에서 이 행성의 에너지가 강하게 유전됨.<br>'; });
        } else html += isEasy ? '어머니 쪽에서 안정적인 유산이 있어요.<br>' : '4궁에 행성 없음 — 4궁주의 위치가 모계 유산의 열쇠.<br>';
        html += '</div></div>';

    } else if (division === 45) {
        // D45 악샤베담샤 — 부계 유산
        const d45LagnaInterp = ['아버지가 독립적이고 행동적. 부계에서 용기와 리더십 유전.','아버지가 재정적으로 안정. 부계에서 물질적 가치관 유전.','아버지가 지적이고 다재다능. 부계에서 소통/사업 능력 유전.','아버지가 가정적이고 감성적. 부계에서 돌봄 본능 유전.','아버지가 권위 있고 존경받음. 부계에서 지도력 유전.','아버지가 실용적이고 근면. 부계에서 분석력/기술력 유전.','아버지가 외교적이고 세련됨. 부계에서 사교적 능력 유전.','아버지가 강인하고 신비로움. 부계에서 회복력/통찰력 유전.','아버지가 학식 있고 종교적. 부계에서 철학/도덕 유전.','아버지가 엄격하고 야망 있음. 부계에서 인내/규율 유전.','아버지가 독창적이고 혁신적. 부계에서 기술/과학적 사고 유전.','아버지가 영적이고 예술적. 부계에서 직관/창작 능력 유전.'][dLagnaSign];

        const d45_9sign = (dLagnaSign + 8) % 12;
        const d45_9planets = dPositions.filter(p => p.dSign === d45_9sign);
        const sunD45 = dPositions.find(p => p.id === 'Sun');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨 아버지 쪽 유산 분석' : '👨 D45 악샤베담샤 — 부계 유산 분석') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D45 라그나: ' + SIGNS[dLagnaSign] + '</strong><br>') + d45LagnaInterp + '<br><br>';

        if (sunD45) {
            const sH = ((sunD45.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☉ 태양 (아버지 카라카):</strong> ';
            html += [,'아버지가 본인에게 강한 영향','아버지에게서 재산','아버지와 소통 좋음','아버지가 가정적','아버지가 창조적','아버지가 봉사적','아버지가 관계에 영향','아버지에게서 유산','아버지가 종교/교육적','아버지가 사회적으로 성공! 최고의 배치','아버지가 독립적','아버지가 영적'][sH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? '아버지 쪽 가정:' : 'D45 9궁 (부계 가정/아버지) — ' + SIGNS[d45_9sign] + ':') + '</strong><br>';
        if (d45_9planets.length > 0) {
            d45_9planets.forEach(p => { html += isEasy ? '아버지 쪽 가정에서 강하게 유전된 에너지가 있습니다.<br>' : '• ' + p.name + ': 부계에서 이 행성의 에너지가 강하게 유전됨.<br>'; });
        } else html += isEasy ? '아버지 쪽에서 안정적인 유산이 있어요.<br>' : '9궁에 행성 없음 — 9궁주의 위치가 부계 유산의 열쇠.<br>';
        html += '</div></div>';
    }

    interpEl.innerHTML = html;
}

