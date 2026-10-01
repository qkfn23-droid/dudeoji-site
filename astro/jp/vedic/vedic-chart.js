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
    renderDivisionalChart(d.positions, d.lagnaSidereal, 10, 'd10Chart', 'd10InterpWrap', 'D10', 'ダシャムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 7, 'd7Chart', 'd7InterpWrap', 'D7', 'サプタムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 12, 'd12Chart', 'd12InterpWrap', 'D12', 'ドワダシャムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 60, 'd60Chart', 'd60InterpWrap', 'D60', 'シャシュティアムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 2, 'd2Chart', 'd2InterpWrap', 'D2', 'ホーラ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 3, 'd3Chart', 'd3InterpWrap', 'D3', 'ドレッカナ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 4, 'd4Chart', 'd4InterpWrap', 'D4', 'チャトゥルタムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 16, 'd16Chart', 'd16InterpWrap', 'D16', 'ショーダシャムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 20, 'd20Chart', 'd20InterpWrap', 'D20', 'ヴィムシャムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 24, 'd24Chart', 'd24InterpWrap', 'D24', 'チャトゥルヴィムシャムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 27, 'd27Chart', 'd27InterpWrap', 'D27', 'サプタヴィムシャムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 30, 'd30Chart', 'd30InterpWrap', 'D30', 'トリムシャムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 40, 'd40Chart', 'd40InterpWrap', 'D40', 'カヴェダムシャ');
    renderDivisionalChart(d.positions, d.lagnaSidereal, 45, 'd45Chart', 'd45InterpWrap', 'D45', 'アクシャヴェダムシャ');
}
function updateCatHeaders() {
    var e = window.vedicMode === 'easy';
    var ids = {
        catGuide: e ? '用語説明' : 'ヴェーダ占星術ガイド',
        catBasic: e ? '私の惑星位置' : '基本チャート — 惑星位置 & 出生チャート',
        catDasha: e ? '私の運勢時期' : 'ダシャー — 人生の時期別運勢',
        catInterp: e ? '私の解釈 — 性格・財運・職業・健康' : '総合解釈 — 性格・財運・職業・健康・ヨーガ',
        catMarriage: e ? '私の配偶者詳細' : '結婚 & 配偶者 — D9 ナヴァムシャ',
        catCareer: e ? '私の職業・財運詳細' : '職業 & 財運 — D10・D2・D4',
        catFamily: e ? '私の家族' : '家族 — D7・D3・D12・D40・D45',
        catSpirit: e ? '霊性・教育・健康' : '霊性・教育・健康 — D20・D24・D27・D16',
        catWarn: e ? '健康注意事項' : '注意事項 — D30 疾病・海外運',
        catKarma: e ? '前世カルマ' : 'カルマ — D60 前世・カルマ'
    };
    for (var id in ids) { var el = document.getElementById(id); if (el) el.textContent = ids[id]; }

    // セクションタイトルも更新
    var secs = {
        secPlanetHouse: e ? '🪐 各惑星があなたに与える影響' : '🪐 惑星別詳細解釈',
        secDignity: e ? '⚖️ あなたの強みと弱み' : '⚖️ 惑星の品位（高揚・減衰・本宮）',
        secLucky: e ? '🍀 幸運の情報' : '🍀 幸運の情報',
        secRemedy: e ? '💎 運を高める方法' : '💎 治癒 & 強化方法',
        secD10: e ? '💼 職業詳細' : '💼 D10 ダシャムシャ（職業）',
        secD2: e ? '💰 財運詳細' : '💰 D2 ホーラ（財運）',
        secD4: e ? '🏠 不動産' : '🏠 D4 チャトゥルタムシャ（不動産）',
        secD7: e ? '👶 子供' : '👶 D7 サプタムシャ（子供）',
        secD3: e ? '👫 兄弟姉妹' : '👫 D3 ドレッカナ（兄弟姉妹）',
        secD12: e ? '👨‍👩‍👧 両親' : '👨‍👩‍👧 D12 ドワダシャムシャ（両親）',
        secD40: e ? '👩 母系の遺産' : '👩 D40 カヴェダムシャ（母系遺産）',
        secD45: e ? '👨 父系の遺産' : '👨 D45 アクシャヴェダムシャ（父系遺産）',
        secD24: e ? '📚 教育' : '📚 D24 チャトゥルヴィムシャムシャ（教育）',
        secD20: e ? '🙏 霊的修行' : '🙏 D20 ヴィムシャムシャ（霊的修行）',
        secD27: e ? '💪 体力' : '💪 D27 サプタヴィムシャムシャ（体力）',
        secD16: e ? '🚗 車両・快適さ' : '🚗 D16 ショーダシャムシャ（車両）',
        secD30: e ? '⚠️ 健康注意事項詳細' : '⚠️ D30 トリムシャムシャ（疾病）',
        secForeign: e ? '✈️ 海外運 & 移住' : '✈️ 海外運 & 移住（9宮・12宮）'
    };
    for (var sid in secs) { var sel = document.getElementById(sid); if (sel) sel.textContent = secs[sid]; }
}
function renderEasyMode(positions, lagnaSign, moonPos) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    var html = '';
    // 性格
    var personality = ['行動派！決断力があり、リーダーの資質があります。新しい挑戦が大好きです。','安定が大好き。快適で美しいもの、美味しいものが好き。一度決めたら最後まで貫くタイプ。','好奇心旺盛！話し上手で多才。いろいろなことを同時にやるのが好きです。','感性的で温かい人。家族を大切にし、人の気持ちをよく読みます。','生まれながらのリーダー！存在感が大きく、創作活動に才能があります。','細かくて分析的。完璧を目指し、健康に関心が多いです。','調和を求めます。洗練されて魅力的、芸術的センスが抜群です。','深みがあります。直感が強く、本質を見抜きます。','自由な魂！旅行と学びを愛し、ポジティブです。','野心的。忍耐力が強く、年を重ねるほど魅力が増します。','ユニーク。みんなと違う考え方をし、革新的です。','感受性が豊か。直感が強く、芸術やスピリチュアルなものに惹かれます。'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">👤 私の性格</div><div class="interp-text">' + personality + '</div></div>';

    // 感情
    if (moonPos) {
        var emotion = ['内面に燃えるような情熱があります。感情が素早く上がって素早く冷めます。怒りは瞬時に湧き上がりますがすぐ収まるタイプ。ストレスを感じるとじっとしていられず体を動かしたくなります。運動やアウトドアが感情解消に最適です。','感情的にとても安定した人です。急な変化を嫌い、慣れ親しんだものに安心感を覚えます。美味しい食べ物、良い音楽、美しい自然の中で心が癒されます。一度心を開くと簡単には変わらない一途なタイプです。','感情を理性的に処理するタイプです。気分が悪い時は誰かと話すと心が整理されます。好奇心旺盛でいろいろなことに同時に興味を持ち、退屈が苦手です。軽いユーモアで雰囲気を変える才能があります。','感受性が極めて豊かな人です。他人の感情をスポンジのように吸収し、共感能力が天性のものです。家庭で安心感を感じ、母親との絆が強いです。料理やインテリアで精神的安定を見つけます。','感情表現が華やかで情熱的です。愛され認められたい欲求が強く、無視されると深く傷つきます。でもその分、愛を与える時も惜しみなく注ぐ寛大な心の持ち主です。創作活動が感情的な治癒薬になります。','感情を分析して整理する傾向があります。心配性で完璧主義ですが、問題を実用的に解決する能力に優れています。日常のルーティンで感情的な安定を見つけます。','関係の中で感情のバランスを見つける人です。一人だと寂しさを感じ、パートナーや親しい友人と一緒にいる時が最も安定します。美しいものと芸術で心の平和を見つけます。','感情は海のように深く激しいです。愛も憎しみも深い方で、裏切りは絶対に忘れません。直感が非常に強く、相手の言葉より目つきや行動から本心を読みます。深い関係を求め、表面的な関係は意味がないと考えます。','感情的に明るく楽観的な人です。自由を愛し束縛を嫌い、新しい経験と冒険を通じて心が癒されます。旅行が最高の感情解消法で、哲学的思考で感情を昇華させます。','感情をあまり表に出さないタイプです。責任感が強く、感情より義務を優先します。年を重ねるほど感情的に成熟し、楽に自分を表現できるようになります。','ユニークで予測不能な感情パターンを持っています。独立的で自由な感情生活を望み、社会活動で感情的な満足を見つけます。','極度に直感的で霊的な人です。夢が鮮明で時に未来を予感することもあります。芸術、瞑想、水辺で心の安定を見つけます。内面の世界が外の世界より豊かな人です。'][moonPos.sign];
        html += '<div class="interp-card"><div class="interp-title">🌙 私の感情スタイル</div><div class="interp-text">' + emotion + '</div></div>';
    }

    // 財運
    var wealth = ['自力でお金を稼ぐ自立型です。積極的な財テクスタイルで、自営業やフリーランスが向いています。早い段階で稼げますが、性急な投資には注意。','安定的にゆっくり財を貯めるタイプです。不動産、芸術、飲食分野で収入が有力。急いで稼ぐより着実に積む方式が合います。良いものを楽しむ性向なので消費も多くなりがちですが、バランスが大切です。','知的能力でお金を稼ぐタイプです。執筆、教育、IT、マーケティング分野で財が入ります。複数の収入源を同時に運営するのが向いており、ビジネスセンスに優れています。','財は家庭と家族を通じて入る傾向があります。母から財産を受け継いだり、不動産/飲食分野で収入が生まれます。感情的に消費する傾向があるので、衝動買いに注意。安定した貯蓄計画が重要です。','リーダーシップと権威を通じてお金を稼ぎます。高い地位に就くほど財が伴い、政府、公共機関、金関連事業と縁があります。品位が財を引き寄せます。','分析力と専門技術でお金を稼ぎます。医療、会計、サービス業、健康関連分野で安定した収入が生まれます。倹約で計画的な管理者スタイルです。','パートナーシップを通じてお金を稼ぎます。一人より一緒の時に財運が良く、法律、外交、ファッション、芸術分野で収入が有力です。配偶者を通じて財が入ることもあります。','他人の資源 — 遺産、保険、投資 — を通じて富を築くタイプです。共同投資や配偶者の財産と縁があり、危機的状況でも財を守る能力があります。','財の幸運が伴うタイプです。教育、海外、宗教/哲学関連分野で収入が入り、思いがけない幸運で財が生まれることもあります。広い視野とポジティブなマインドが財を引き寄せる秘訣です。','ゆっくりだが確実に財を貯めるタイプです。初期は財政的困難を経験するかもしれませんが、着実な努力で中年以降に安定した富を築きます。忍耐が最高の財テク戦略です。','技術、革新、社会的ネットワークを通じてお金を稼ぎます。従来とは異なる方法で収入を作り、IT、科学、社会活動分野と縁があります。独創的なアイデアが財の鍵です。','芸術や霊的活動を通じて収入が生まれるタイプです。海外と関連した財の縁があり、慈善や寄付に関心が多いです。物質より精神的な豊かさを追求し、それが逆説的に財を引き寄せることもあります。'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">💰 私の財運</div><div class="interp-text">' + wealth + '</div></div>';

    // 配偶者
    var spouse = ['配偶者はエネルギッシュで独立的な人です。活動的で直接的な性格で、自分の仕事に情熱的。一緒に挑戦するパートナーです。やや急な性格で衝突もありますが、その分情熱的な関係になります。','配偶者は美しく感覚的な人です。良いものを楽しみ、安定的で忠実なタイプ。料理や芸術に才能があり、一緒にいると安心感を与えてくれます。物質的に安定した人の可能性が高いです。','配偶者は話し上手で機知に富んだ人です。会話がよく通じるのが最大の魅力で、ユーモアセンスに優れています。知的で多才な人で、様々な関心事を共有できるパートナーです。','配偶者は温かく家庭的な人です。ケア能力に優れ、一緒にいると家のような安心感を与えてくれます。感情的に深い絆を求め、家族を何より大切にする人です。','配偶者はカリスマ的で堂々とした人です。社会的に注目される立場にいる可能性があり、プライドが高いですがその分寛大です。一緒にいると特別な人になった気分を味わえます。','配偶者は几帳面で実用的な人です。健康とウェルビーイングに関心が多く、きめ細かく気を配ってくれるタイプ。完璧主義的かもしれませんが、その分誠実で信頼できるパートナーです。','配偶者は魅力的で洗練された人です。外交的でバランス感覚が良く、芸術的センスに優れています。一緒にいると世界が美しくなる感覚を与えてくれる人です。','配偶者は強烈で神秘的な人です。感情が深く、一度ハマると最後まで行くタイプ。秘密が多いかもしれませんが、その分深い関係を求めます。運命的で強烈な引き合いを感じる出会いになるでしょう。','配偶者は自由で楽観的な人です。異文化圏の人や海外と関連のある人かもしれません。哲学的で冒険好きで、一緒に世界を探検したいパートナーです。結婚後も自由な雰囲気を求めます。','配偶者は真面目で野心のある人です。責任感が強く、社会的に成功した人の可能性が高いです。年齢差があるかもしれず、結婚がやや遅れることもありますが、一度すると長続きする安定的な関係です。','配偶者はユニークで独立的な人です。非伝統的な方法で出会う可能性があり、知的で革新的な思考を持つ人です。自由な結婚形態を望むかもしれず、友人のような関係が理想的です。','配偶者は霊的で直感的な人です。芸術家や霊的分野に従事する人と縁があります。夢見るようなロマンチックな雰囲気を持ち、現実より理想を追求する面があり、現実的な期待値の調整が必要かもしれません。'][(lagnaSign+6)%12];
    // 7宮 惑星追加情報
    var h7p = positions.filter(function(p){return houseOf(p.sign)===7;});
    var spouseExtra = '';
    h7p.forEach(function(p) {
        var desc = {Sun:'社会的地位の高い配偶者。',Moon:'感性的で世話好きな配偶者。',Mars:'情熱的だが争い可能。強い配偶者。',Mercury:'会話がよく通じる知的な配偶者。',Jupiter:'賢明で道徳的な配偶者！最高の結婚運。',Venus:'とても魅力的で愛にあふれた配偶者。',Saturn:'結婚は遅いが長続きする関係。年齢差の可能性。',Rahu:'非伝統的な結婚。外国人配偶者の可能性。',Ketu:'前世の縁。霊的な繋がりが強い配偶者。'};
        if (desc[p.id]) spouseExtra += '<br>✦ ' + desc[p.id];
    });
    html += '<div class="interp-card"><div class="interp-title">💍 私の配偶者</div><div class="interp-text">' + spouse + spouseExtra + '</div></div>';

    // 職業
    var career = ['リーダーシップが必要な職業で輝きます。軍隊、警察、スポーツ、外科、事業経営など競争的で行動力が必要な分野に適しています。自営業も向いています。','金融、飲食業、不動産、ファッション、芸術分野に適しています。感覚的で安定した環境で実力を発揮し、お金を扱う能力に優れています。','コミュニケーションと知的活動が中心の職業に適しています。メディア、執筆、教育、IT、マーケティング分野で才能を発揮します。','人を世話する職業に適しています。医療、看護、ホテル業、料理、心理カウンセリング分野で輝きます。感情的な交感が必要な仕事で最高の成果を出します。','舞台の上で輝く職業に適しています。政治、芸能、経営、政府機関、高位職でリーダーシップを発揮し、創造的で権威あるポジションが天職です。','分析と精密さが必要な職業に適しています。医療、会計、分析、コンサルティング、品質管理分野で優れた成果を出し、細やかな観察力が強みです。','調和と美が必要な職業に適しています。法律、外交、ファッション、インテリア、カウンセリング、イベント企画分野で輝き、人と人を繋ぐ仕事に才能があります。','深く掘り下げる職業に適しています。研究、調査、保険、医学、心理学、税務分野で優れた能力を発揮し、秘密を扱う仕事にも才能があります。','学びと探検のある職業に適しています。教育、法律、宗教、出版、旅行、国際貿易分野で活躍し、海外と縁の深い職業が合っています。','体系と組織が必要な職業に適しています。経営、公務員、建築、土木、大企業関連分野でゆっくりだが確実な成功を収め、社会的地位の高いポジションに就きます。','革新と技術が必要な職業に適しています。IT、科学、航空、宇宙、社会事業、革新分野で輝き、他の人が考えつかない方法で世界を変える人です。','芸術と霊性が結合した職業に適しています。芸術、映画、音楽、医療、海外関連分野、NGOで活躍し、世の中の痛みを癒す仕事にやりがいを感じます。'][(lagnaSign+9)%12];
    html += '<div class="interp-card"><div class="interp-title">💼 私の職業</div><div class="interp-text">' + career + '</div></div>';

    // 健康
    var health = ['頭と顔の部位が弱点です。 頭痛や発熱が頻繁に起こりやすく、怒ると頭に熱が上がるタイプです。規則的な運動でエネルギーを発散し、十分な水分を摂りましょう。事故や怪我に注意し、性急な行動を控えると健康が良くなります。','首と甲状腺が弱点です。 過食の傾向があるので体重管理と糖尿に注意。声帯と首の健康も重要です。良い食べ物を適度に楽しみ、首のストレッチを頻繁に行いましょう。自然の中での散歩が健康に最適です。','肺と腕、肩、神経系が弱点です。 不安や睡眠問題があるかもしれず、心配が多くストレスが溜まりやすいです。呼吸瞑想が大いに助けになり、規則的な睡眠パターンを維持しましょう。','胃腸と胸の部位が弱点です。 感情的ストレスがすぐ消化器の健康に影響するタイプです。ストレス管理が健康管理です。温かい食べ物とお茶を楽しみましょう。水辺で過ごすと心と体が同時に癒されます。','心臓と背中、脊椎が弱点です。 過労に注意 — 頑張り屋のタイプなので無理しやすいです。心血管の健康のため有酸素運動を規則的に行い、十分な休息を取りましょう。','消化器系と腸、皮膚が弱点です。 消化不良やアレルギーがあるかもしれず、完璧主義的性格のためストレス性疾患が来る可能性があります。食事療法が非常に重要です。ヨガや瞑想でリラックスしましょう。','腎臓と腰、皮膚が弱点です。 十分な水分を摂り、バランスの取れた生活を維持しましょう。糖分摂取を減らし腎臓に良い食べ物を取りましょう。ストレスが肌にすぐ現れるタイプなので、心の平和が肌の健康です。','生殖器と排泄器系が弱点です。 慢性疾患が来る可能性があるので定期的な健康診断が重要です。感情的ストレスが健康に直接影響し、極端なダイエットや無理な運動は避けましょう。深い呼吸と瞑想が助けになります。','肝臓と太もも、お尻が弱点です。 良い食べ物を楽しむ性向なので過体重に注意。アウトドア活動、登山、自転車が健康に最適で、座っている時間を減らすことが重要です。海外旅行が心身の癒し効果をもたらします。','骨と関節、膝、皮膚が弱点です。 リウマチや関節炎に注意し、カルシウムとビタミンDを十分に摂りましょう。若い時に健康管理をしっかりすれば年を取ると逆に健康になる特異な体質です。ストレッチと関節運動を習慣化しましょう。','足首とふくらはぎ、循環系が弱点です。 血圧管理が重要で、循環を助けるため規則的に歩く習慣を持ちましょう。独特な健康問題が突然来る可能性があるので、異常な症状を感じたらすぐ検診を受けましょう。','足とリンパ系、免疫システムが弱点です。 原因不明の疲労感や免疫低下に注意してください。 十分な睡眠があなたにとって最も強力な健康の秘訣です。水辺で過ごしたり、瞑想やヨガをすると免疫力が大きく上がります。アルコールや薬物に敏感な体質なので節制が重要です。'][lagnaSign];
    html += '<div class="interp-card"><div class="interp-title">🏥 私の健康</div><div class="interp-text">' + health + '</div></div>';

    // 現在の大運簡単要約
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
                    var dashaDesc = {Ketu:'霊的成長と分離の時期。物質より内面に集中しましょう。',Venus:'愛と豊かさの時期！恋愛、結婚、芸術活動が活発です。',Sun:'自我発見とリーダーシップの時期。自信が強まります。',Moon:'感情と家庭の時期。家族関係が重要になります。',Mars:'行動とエネルギーの時期。新しいことを始めるのに最適です。',Rahu:'変化と革新の時期。予想外のチャンスが訪れます。',Jupiter:'幸運と成長の時期！教育、結婚、昇進など良いことが多いです。',Saturn:'忍耐と試練の時期。遅いが確実な成長をします。',Mercury:'知的活動の時期。勉強、ビジネス、コミュニケーションに有利です。'};
                    html += '<div class="interp-card"><div class="interp-title">⏳ 今の運勢時期</div><div class="interp-text">現在 <strong style="color:#c9a84c;">' + DASHA_KO[planet] + '</strong>の時期です。<br><br>' + (dashaDesc[planet]||'') + '</div></div>';
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
const SIGNS = ['牡羊座','牡牛座','双子座','蟹座','獅子座','乙女座',
               '天秤座','蠍座','射手座','山羊座','水瓶座','魚座'];
const SIGNS_EN = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                  'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGN_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

// Planets
const PLANETS = [
    { id: 'Sun', name: '太陽', symbol: '☉', natural: 'malefic' },
    { id: 'Moon', name: '月', symbol: '☽', natural: 'benefic' },
    { id: 'Mars', name: '火星', symbol: '♂', natural: 'malefic' },
    { id: 'Mercury', name: '水星', symbol: '☿', natural: 'neutral' },
    { id: 'Jupiter', name: '木星', symbol: '♃', natural: 'benefic' },
    { id: 'Venus', name: '金星', symbol: '♀', natural: 'benefic' },
    { id: 'Saturn', name: '土星', symbol: '♄', natural: 'malefic' },
];

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', ko: 'アシュヴィニー', ruler: 'Ketu', meaning: '馬の双子', deity: 'Ashwini Kumaras', desc: '癒しと新しい始まりのエネルギー。素早い行動力と治癒能力を持つ人。' },
    { name: 'Bharani', ko: 'バラニー', ruler: 'Venus', meaning: '耐える者', deity: 'Yama', desc: '生と死の循環。強い忍耐力と変化を導く力。' },
    { name: 'Krittika', ko: 'クリッティカー', ruler: 'Sun', meaning: '切断する者', deity: 'Agni', desc: '火の力と浄化。鋭い知性と決断力。' },
    { name: 'Rohini', ko: 'ローヒニー', ruler: 'Moon', meaning: '赤い星', deity: 'Brahma', desc: '豊穣と美の星。創造的で魅力的な性格。' },
    { name: 'Mrigashira', ko: 'ムリガシラー', ruler: 'Mars', meaning: '鹿の頭', deity: 'Soma', desc: '探求と好奇心の星。絶えず真理を追求する旅人。' },
    { name: 'Ardra', ko: 'アールドラー', ruler: 'Rahu', meaning: '涙のしずく', deity: 'Rudra', desc: '嵐と破壊の中の再生。激しい感情と変革の力。' },
    { name: 'Punarvasu', ko: 'プナルヴァス', ruler: 'Jupiter', meaning: '光の帰還', deity: 'Aditi', desc: '回復と帰還の星。楽観的で知恵深い性格。' },
    { name: 'Pushya', ko: 'プシュヤ', ruler: 'Saturn', meaning: '養育する者', deity: 'Brihaspati', desc: '最も吉兆なナクシャトラ。養育、保護、繁栄のエネルギー。' },
    { name: 'Ashlesha', ko: 'アーシュレーシャー', ruler: 'Mercury', meaning: '巻きつく者', deity: 'Nagas', desc: '蛇の知恵と神秘。洞察力と深い直観。' },
    { name: 'Magha', ko: 'マガー', ruler: 'Ketu', meaning: '偉大な', deity: 'Pitris', desc: '王族の星。権威、尊敬、祖先の祝福。' },
    { name: 'Purva Phalguni', ko: 'プールヴァ・パルグニー', ruler: 'Venus', meaning: '前の果実', deity: 'Bhaga', desc: '喜びと愛の星。芸術的感覚とロマンス。' },
    { name: 'Uttara Phalguni', ko: 'ウッタラ・パルグニー', ruler: 'Sun', meaning: '後の果実', deity: 'Aryaman', desc: '友情と契約の星。信頼と献身。' },
    { name: 'Hasta', ko: 'ハスタ', ruler: 'Moon', meaning: '手', deity: 'Savitar', desc: '手先の器用さと技術の星。癒す手、芸術家。' },
    { name: 'Chitra', ko: 'チトラー', ruler: 'Mars', meaning: '輝く宝石', deity: 'Vishwakarma', desc: '美と創造の星。優れた美的感覚。' },
    { name: 'Swati', ko: 'スヴァーティー', ruler: 'Rahu', meaning: '独立した', deity: 'Vayu', desc: '風の自由さ。独立的で柔軟な性格。' },
    { name: 'Vishakha', ko: 'ヴィシャーカー', ruler: 'Jupiter', meaning: '二又の', deity: 'Indra-Agni', desc: '目標と決断の星。強い集中力と意志。' },
    { name: 'Anuradha', ko: 'アヌラーダー', ruler: 'Saturn', meaning: 'ラーダに従う', deity: 'Mitra', desc: '友情と献身の星。組織力とリーダーシップ。' },
    { name: 'Jyeshtha', ko: 'ジェーシュター', ruler: 'Mercury', meaning: '最年長', deity: 'Indra', desc: '保護と権威の星。強い責任感。' },
    { name: 'Mula', ko: 'ムーラ', ruler: 'Ketu', meaning: '根', deity: 'Nirriti', desc: '破壊と再建の星。真実の根源を探す者。' },
    { name: 'Purva Ashadha', ko: 'プールヴァ・アーシャーダー', ruler: 'Venus', meaning: '前の無敵', deity: 'Apas', desc: '水の力と浄化。潜在する勝利のエネルギー。' },
    { name: 'Uttara Ashadha', ko: 'ウッタラ・アーシャーダー', ruler: 'Sun', meaning: '後の無敵', deity: 'Vishvedevas', desc: '最終的な勝利の星。忍耐とリーダーシップ。' },
    { name: 'Shravana', ko: 'シュラヴァナ', ruler: 'Moon', meaning: '聞く者', deity: 'Vishnu', desc: '知識と傾聴の星。学習とコミュニケーションの達人。' },
    { name: 'Dhanishta', ko: 'ダニシュター', ruler: 'Mars', meaning: '最も裕福な', deity: 'Vasus', desc: '豊穣と音楽の星。才能と繁栄。' },
    { name: 'Shatabhisha', ko: 'シャタビシャー', ruler: 'Rahu', meaning: '百人の治療師', deity: 'Varuna', desc: '秘密と癒しの星。神秘的な治癒能力。' },
    { name: 'Purva Bhadrapada', ko: 'プールヴァ・バードラパダー', ruler: 'Jupiter', meaning: '前の幸運の足', deity: 'Aja Ekapada', desc: '火と変革の星。霊的覚醒。' },
    { name: 'Uttara Bhadrapada', ko: 'ウッタラ・バードラパダー', ruler: 'Saturn', meaning: '後の幸運の足', deity: 'Ahir Budhnya', desc: '深い海の知恵。瞑想と霊的深み。' },
    { name: 'Revati', ko: 'レーヴァティー', ruler: 'Mercury', meaning: '裕福な', deity: 'Pushan', desc: '旅と保護の星。すべての完成。' },
];

// Dasha periods (years)
const DASHA_YEARS = {
    'Ketu': 7, 'Venus': 20, 'Sun': 6, 'Moon': 10, 'Mars': 7,
    'Rahu': 18, 'Jupiter': 16, 'Saturn': 19, 'Mercury': 17
};
const DASHA_ORDER = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const DASHA_KO = {
    'Ketu': 'ケートゥ', 'Venus': '金星', 'Sun': '太陽', 'Moon': '月', 'Mars': '火星',
    'Rahu': 'ラーフ', 'Jupiter': '木星', 'Saturn': '土星', 'Mercury': '水星'
};

// South Indian chart house layout (fixed signs)
// Grid positions: [row][col] → sign index
const SI_LAYOUT = [
    [11, 0, 1, 2],
    [10, -1, -1, 3],
    [9, -1, -1, 4],
    [8, 7, 6, 5]
];

// ── フォーム初期化 ──
function initForm() {
    const yearSel = document.getElementById('birthYear');
    const monthSel = document.getElementById('birthMonth');
    const daySel = document.getElementById('birthDay');
    const hourSel = document.getElementById('birthHour');
    const minSel = document.getElementById('birthMinute');

    // 年度: 1940~2025
    for (let y = 2025; y >= 1940; y--) {
        const opt = document.createElement('option');
        opt.value = y; opt.textContent = y + '年';
        if (y === 1995) opt.selected = true;
        yearSel.appendChild(opt);
    }
    // 月: 1~12
    for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        opt.value = m; opt.textContent = m + '月';
        if (m === 3) opt.selected = true;
        monthSel.appendChild(opt);
    }
    // 日: 1~31
    for (let d = 1; d <= 31; d++) {
        const opt = document.createElement('option');
        opt.value = d; opt.textContent = d + '日';
        if (d === 15) opt.selected = true;
        daySel.appendChild(opt);
    }
    // 時: 12, 1~11
    [12,1,2,3,4,5,6,7,8,9,10,11].forEach(h => {
        const opt = document.createElement('option');
        opt.value = h; opt.textContent = h + '時';
        if (h === 10) opt.selected = true;
        hourSel.appendChild(opt);
    });
    // 分: 00, 01, 02, ... 59
    for (let m = 0; m < 60; m += 1) {
        const opt = document.createElement('option');
        opt.value = m; opt.textContent = String(m).padStart(2,'0') + '分';
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
        hour = 12; minute = 0; // 正午デフォルト
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

// ページロード時フォーム初期化
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
            id: 'Rahu', name: 'ラーフ', symbol: '☊', natural: 'malefic',
            sidereal: rahuSidereal, sign: Math.floor(rahuSidereal / 30),
            degree: rahuSidereal % 30, nakshatra: Math.floor(rahuSidereal / (360/27)),
            nakshatraPada: Math.floor((rahuSidereal % (360/27)) / (360/108)) + 1
        });
        positions.push({
            id: 'Ketu', name: 'ケートゥ', symbol: '☋', natural: 'malefic',
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

    // 全てレンダリング
    renderPlanetTable(positions, lagnaSign, lagnaSidereal);
    renderD1Chart(positions, lagnaSign);
    renderD9Chart(positions, lagnaSign, lagnaSidereal);
    renderDivisionalChart(positions, lagnaSidereal, 10, 'd10Chart', 'd10InterpWrap', 'D10', 'ダシャムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 7, 'd7Chart', 'd7InterpWrap', 'D7', 'サプタムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 12, 'd12Chart', 'd12InterpWrap', 'D12', 'ドワダシャムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 60, 'd60Chart', 'd60InterpWrap', 'D60', 'シャシュティアムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 2, 'd2Chart', 'd2InterpWrap', 'D2', 'ホーラ');
    renderDivisionalChart(positions, lagnaSidereal, 3, 'd3Chart', 'd3InterpWrap', 'D3', 'ドレッカナ');
    renderDivisionalChart(positions, lagnaSidereal, 4, 'd4Chart', 'd4InterpWrap', 'D4', 'チャトゥルタムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 16, 'd16Chart', 'd16InterpWrap', 'D16', 'ショーダシャムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 20, 'd20Chart', 'd20InterpWrap', 'D20', 'ヴィムシャムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 24, 'd24Chart', 'd24InterpWrap', 'D24', 'チャトゥルヴィムシャムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 27, 'd27Chart', 'd27InterpWrap', 'D27', 'サプタヴィムシャムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 30, 'd30Chart', 'd30InterpWrap', 'D30', 'トリムシャムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 40, 'd40Chart', 'd40InterpWrap', 'D40', 'カヴェダムシャ');
    renderDivisionalChart(positions, lagnaSidereal, 45, 'd45Chart', 'd45InterpWrap', 'D45', 'アクシャヴェダムシャ');
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
    html += '<th>惑星</th><th>星座</th><th>度数</th><th>ナクシャトラ</th><th>ハウス</th>';
    html += '</tr></thead><tbody>';

    // Add Lagna first with exact degree
    const lagnaDeg = lagnaSidereal % 30;
    const lagnaNakIdx = Math.floor(lagnaSidereal / (360/27));
    const lagnaNak = NAKSHATRAS[lagnaNakIdx] || {ko:'-'};
    html += `<tr><td>⬆ ラグナ（上昇宮）</td><td>${SIGN_SYMBOLS[lagnaSign]} ${SIGNS[lagnaSign]}</td><td>${lagnaDeg.toFixed(1)}°</td><td>${lagnaNak.ko}</td><td>1</td></tr>`;

    positions.forEach(p => {
        const house = ((p.sign - lagnaSign + 12) % 12) + 1;
        const nak = NAKSHATRAS[p.nakshatra] || { ko: '-', name: '-' };
        const roleMap = { Sun:'自我・権威', Moon:'感情・心', Mars:'エネルギー・勇気', Mercury:'知性・コミュニケーション', Jupiter:'幸運・知恵', Venus:'愛・魅力', Saturn:'忍耐・責任', Rahu:'欲望・革新', Ketu:'霊性・解脱' };
        const houseArea = ['','自分','お金・家族','コミュニケーション','家庭','子供・恋愛','健康','配偶者','変革','幸運・海外','職業','収入','海外・霊性'];
        html += `<tr>
            <td>${p.symbol} ${p.name}<br><span style="color:#666;font-size:10px;">${roleMap[p.id]||''}</span></td>
            <td>${SIGN_SYMBOLS[p.sign]} ${SIGNS[p.sign]}</td>
            <td>${p.degree.toFixed(1)}°</td>
            <td>${nak.ko}</td>
            <td>${house}宮<br><span style="color:#666;font-size:10px;">${houseArea[house]||''}</span></td>
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
                cell.innerHTML = row === 1 && col === 1 ? '<div style="color:#c9a84c;font-size:10px;">D1<br>ラシ</div>' : '';
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
    // ナヴァムシャ: 各サイン(30度)を9等分
    // 火のサイン: 牡羊座から開始
    // 地のサイン: 山羊座から開始
    // 風のサイン: 天秤座から開始
    // 水のサイン: 蟹座から開始
    const sign = Math.floor(siderealLon / 30);
    const degInSign = siderealLon % 30;
    const pada = Math.floor(degInSign / (30/9)); // 0~8
    const element = sign % 4; // 0=火, 1=地, 2=風, 3=水
    const startSign = [0, 9, 6, 3][element]; // 牡羊,山羊,天秤,蟹
    return (startSign + pada) % 12;
}

function renderD9Chart(positions, lagnaSign, lagnaSidereal) {
    // D9 ラグナ計算
    const d9LagnaSign = getNavamsaSign(lagnaSidereal);

    // D9 惑星位置
    const d9Positions = positions.map(p => ({
        ...p,
        d9Sign: getNavamsaSign(p.sidereal)
    }));

    // チャート描画（D1と同じ南インド式）
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
                cell.innerHTML = '<div style="font-size:11px;color:#444;text-align:center;">D9<br>ナヴァムシャ</div>';
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

    // D9 解釈
    renderD9Interpretation(d9Positions, d9LagnaSign, lagnaSign);
}

function renderD9Interpretation(d9Positions, d9LagnaSign, d1LagnaSign) {
    const SIGN_RULERS = ['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
    const RULER_NAMES = {Sun:'太陽',Moon:'月',Mars:'火星',Mercury:'水星',Jupiter:'木星',Venus:'金星',Saturn:'土星',Rahu:'ラーフ',Ketu:'ケートゥ'};
    const isEasy = window.vedicMode === 'easy';

    function d9HouseOf(signIdx) { return ((signIdx - d9LagnaSign + 12) % 12) + 1; }
    function d9PlanetsInHouse(h) { return d9Positions.filter(p => d9HouseOf(p.d9Sign) === h); }

    // D9 7宮（配偶者）
    const d9H7Sign = (d9LagnaSign + 6) % 12;
    const d9H7Ruler = SIGN_RULERS[d9H7Sign];
    const d9H7Planets = d9PlanetsInHouse(7);

    // D9 10宮（使命/dharma 職業）
    const d9H10Sign = (d9LagnaSign + 9) % 12;
    const d9H10Ruler = SIGN_RULERS[d9H10Sign];
    const d9H10Planets = d9PlanetsInHouse(10);

    // 配偶者の10宮
    const spouseH10 = 4; // 7宮から10番目
    const d9H4Sign = (d9LagnaSign + 3) % 12;
    const d9H4Ruler = SIGN_RULERS[d9H4Sign];
    const d9H4Planets = d9PlanetsInHouse(4);

    // D9 1宮
    const d9H1Planets = d9PlanetsInHouse(1);

    // サイン別職業傾向
    const careerBySgn = [
        'リーダーシップ、軍事、スポーツ、起業（火の開拓者）',
        '金融、農業、芸術、不動産、食品（安定と物質）',
        '通信、メディア、執筆、教育、マーケティング（知的）',
        '看護、介護、料理、接客、カウンセリング（感情的ケア）',
        '政治、エンターテインメント、リーダーシップ、創造性（輝くステージ）',
        '医療、会計、分析、編集、健康・ウェルネス（精密なサービス）',
        '法律、外交、デザイン、ファッション、調停（バランスと美）',
        '研究、調査、医療、オカルト、心理学（深さと変容）',
        '教育、旅行、哲学、宗教、出版（拡張と探求）',
        '政府、建設、経営、CEO、組織のリーダー（システムと権威）',
        'テクノロジー、IT、発明、社会活動、科学（革新）',
        '芸術、スピリチュアリティ、ヒーリング、音楽、慈善活動（超越と奉仕）'
    ];

    // 惑星別配偶者職業傾向
    const planetCareer = {
        Sun: '政府官僚、政治家、医師、CEO — 権威ある職業',
        Moon: '看護師、カウンセラー、シェフ、接客業 — 介護・感情的な役割',
        Mars: '軍隊、警察、外科医、エンジニア、アスリート',
        Mercury: '作家、教師、プログラマー、会計士、商人',
        Jupiter: '教授、判事、宗教的指導者、コンサルタント、上級専門家',
        Venus: 'デザイナー、俳優、音楽家、ファッション、美容業界',
        Saturn: '建設、鉱業、農業、経営、職人',
        Rahu: 'IT、海外関連、非従来型のキャリア、研究',
        Ketu: 'スピリチュアリティ、代替医療、研究、修行者'
    };

    let html = '';

    // 1. D9 ラグナ分析
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🕉️ 結婚後のあなた' : '🕉️ D9 ラグナ — 結婚後のあなた: ' + SIGNS[d9LagnaSign] + ' ' + SIGN_SYMBOLS[d9LagnaSign]}</div>
        <div class="interp-text">
            ${isEasy ? '結婚後、そして人生後半（30代以降）に現れるあなたの本当の姿です。' : 'ナヴァムシャ・ラグナは<strong>' + SIGNS[d9LagnaSign] + '</strong>。これは結婚後、30代以降に現れるあなたの本当の姿です。'}
            ${d9LagnaSign === d1LagnaSign ? (isEasy ? '<br><br><strong>特別な印！</strong> あなたの本質は結婚後も変わらず、内面と外面が一致しています。' : '<br><br><strong>D1とD9ラグナが同じサイン！</strong> これを<strong>ヴァルゴッタマ(Vargottama)</strong>と言い、非常に強力です。あなたの本質は結婚後も変わりません。') : ''}
            ${d9H1Planets.length > 0 ? '<br><br>' + (isEasy ? '結婚後あなたの性格に強く影響するエネルギーがあります。' : '<strong>D9 1宮の惑星:</strong> ' + d9H1Planets.map(p => p.symbol + ' ' + p.name).join(', ') + ' — これらの惑星が結婚後あなたの性格に強く影響します。') : ''}
        </div>
    </div>`;

    // 2. D9 7宮（配偶者）
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 配偶者の性格' : '💍 D9 7宮 — 配偶者の性格: ' + SIGNS[d9H7Sign] + ' ' + SIGN_SYMBOLS[d9H7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || '独特な魅力') + 'の性質を持つパートナーです。' : 'ナヴァムシャ7宮は<strong>' + SIGNS[d9H7Sign] + '</strong>、支配星は<strong>' + RULER_NAMES[d9H7Ruler] + '</strong>。<br><br>これは配偶者の核心的な性格を表します。' + SIGNS[d9H7Sign] + 'のエネルギーを持つパートナー — ' + ((careerBySgn[d9H7Sign]||'').split(/[（(]/)[1]?.replace(/[）)]/,'') || '独特な魅力') + 'の性質を持つ人です。'}
            ${d9H7Planets.length > 0 ? '<br><br>' + (isEasy ? d9H7Planets.map(p => p.natural === 'benefic' ? '良いエネルギー！配偶者から祝福を受けます。' : '挑戦のエネルギー — 結婚生活での成長の機会でもあります。').join('<br>') : '<strong>D9 7宮の惑星:</strong><br>' + d9H7Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${p.natural === 'benefic' ? '良いエネルギー！配偶者からこの惑星の祝福を受けます。' : '挑戦のエネルギー — 結婚生活での成長の機会でもあります。'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 3. D9 10宮（使命）
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 人生の使命' : '💼 D9 10宮 — 人生の使命(ダルマ): ' + SIGNS[d9H10Sign] + ' ' + SIGN_SYMBOLS[d9H10Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '結婚後、成熟した後に追求する真の天職です。' : 'ナヴァムシャ10宮は<strong>' + SIGNS[d9H10Sign] + '</strong>、支配星は<strong>' + RULER_NAMES[d9H10Ruler] + '</strong>。<br><br>D1の10宮が「職業」を示すなら、D9の10宮は<strong>人生のより大きな使命(ダルマ)</strong> — 成熟した後に追求する真の天職。'}<br><br>
            <strong>使命の方向:</strong> ${careerBySgn[d9H10Sign]}
            ${d9H10Planets.length > 0 ? '<br><br>' + (isEasy ? d9H10Planets.map(p => planetCareer[p.id] || '独特な職業エネルギー').join('<br>') : '<strong>D9 10宮の惑星:</strong><br>' + d9H10Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: ${planetCareer[p.id] || '独特な職業エネルギー'}`).join('<br>')) : ''}
        </div>
    </div>`;

    // 4. 配偶者の職業
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👔 配偶者の職業' : '👔 配偶者の職業 — 派生10宮(D9 4宮): ' + SIGNS[d9H4Sign] + ' ' + SIGN_SYMBOLS[d9H4Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '<strong>派生ハウスの原理:</strong> 7宮(配偶者)から10番目のハウス = D9の4宮が配偶者の職業/社会活動を表します。<br><br>D9 4宮は<strong>' + SIGNS[d9H4Sign] + '</strong>、支配星は<strong>' + RULER_NAMES[d9H4Ruler] + '</strong>。<br><br>'}
            <strong>配偶者の職業傾向:</strong> ${careerBySgn[d9H4Sign]}
            ${d9H4Planets.length > 0 ? '<br><br>' + (isEasy ? d9H4Planets.map(p => `配偶者が${planetCareer[p.id] || '専門分野'}で活動する可能性`).join('<br>') : '<strong>D9 4宮(配偶者10宮)の惑星:</strong><br>' + d9H4Planets.map(p => `${p.symbol} <strong>${p.name}</strong>: 配偶者が${planetCareer[p.id] || '専門分野'}で活動する可能性`).join('<br>')) : ''}
        </div>
    </div>`;

    // 5. ヴァルゴッタマチェック
    const vargottamaPlanets = d9Positions.filter(p => p.sign === p.d9Sign);
    if (vargottamaPlanets.length > 0) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '⭐ 特別に強い惑星' : '⭐ ヴァルゴッタマ(Vargottama) 惑星 — 特別に強い'}</div>
            <div class="interp-text">
                ${isEasy ? '以下の惑星は特別に強力で、人生全般にわたり一貫して作用します。' : 'D1とD9で同じサインにある惑星を<strong>ヴァルゴッタマ</strong>と言います。この惑星は非常に強力で、そのエネルギーが人生全般にわたり一貫して作用します。'}<br><br>
                ${isEasy ? '特別に強いエネルギーが人生全般にわたり一貫して作用します！' : vargottamaPlanets.map(p => `<strong>${p.symbol} ${p.name}</strong>: D1とD9の両方で${SIGNS[p.sign]}に位置 — この惑星のエネルギーが特別に強い！`).join('<br>')}
            </div>
        </div>`;
    }

    // 6. 配偶者方向分析
    const DIRECTIONS = {
        0:'東', 1:'南', 2:'西', 3:'北',
        4:'東', 5:'南', 6:'西', 7:'北',
        8:'東', 9:'南', 10:'西', 11:'北'
    };
    const DIR_DETAIL = {
        0:'東（牡羊座 — 火）',1:'南（牡牛座 — 土）',2:'西（双子座 — 風）',3:'北（蟹座 — 水）',
        4:'東（獅子座 — 火）',5:'南（乙女座 — 土）',6:'西（天秤座 — 風）',7:'北（蠍座 — 水）',
        8:'東（射手座 — 火）',9:'南（山羊座 — 土）',10:'西（水瓶座 — 風）',11:'北（魚座 — 水）'
    };

    // Arudha Pada 計算関数
    function calcArudha(houseNum, lagnaS, pos) {
        const houseSign = (lagnaS + houseNum - 1) % 12;
        const ruler = SIGN_RULERS[houseSign];
        const rulerPlanet = pos.find(p => p.id === ruler);
        if (!rulerPlanet) return houseSign;
        const rulerSign = rulerPlanet.sign;
        const dist = ((rulerSign - houseSign) + 12) % 12;
        let arudhaSign = (rulerSign + dist) % 12;
        // 例外処理
        if (arudhaSign === houseSign || arudhaSign === (houseSign + 6) % 12) {
            arudhaSign = (houseSign + 9) % 12;
        }
        return arudhaSign;
    }

    // D1の元のpositions使用 ()
    const d1Positions = d9Positions; 

    // UL = 12宮のアルダ
    const ulSign = calcArudha(12, d1LagnaSign, d1Positions);

    // A7 = 7宮のアルダ
    const a7Sign = calcArudha(7, d1LagnaSign, d1Positions);

    // D1 7宮サイン
    const d1H7Sign = (d1LagnaSign + 6) % 12;

    // D9 7宮主のD9位置
    const d9H7RulerPlanet = d9Positions.find(p => p.id === d9H7Ruler);
    const d9H7RulerSign = d9H7RulerPlanet ? d9H7RulerPlanet.d9Sign : d9H7Sign;

    // D9 金星位置
    const venusD9 = d9Positions.find(p => p.id === 'Venus');
    const venusD9Sign = venusD9 ? venusD9.d9Sign : 0;

    // 方向集計 — 6指標
    const dirSources = [
        {name:'D1 7宮', sign: d1H7Sign, desc:'出生図の配偶者ハウス'},
        {name:'D9 7宮', sign: d9H7Sign, desc:'ナヴァムシャの配偶者ハウス'},
        {name:'D9 7宮主', sign: d9H7RulerSign, desc:'ナヴァムシャ7宮主の位置'},
        {name:'D9 金星(♀)', sign: venusD9Sign, desc:'ナヴァムシャの配偶者カラカ'},
        {name:'ウパパダ(UL)', sign: ulSign, desc:'12宮アルダ — 配偶者の背景'},
        {name:'ダラパダ(A7)', sign: a7Sign, desc:'7宮アルダ — 配偶者の社会的イメージ'}
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
        <div class="interp-title">${isEasy ? '🧭 配偶者が来る方向' : '🧭 配偶者の方向 — 6指標総合分析'}</div>
        <div class="interp-text">
            ${isEasy ? '配偶者がどの方向から来るかを複数の指標で分析します。' : 'ヴェーダ占星術では配偶者がどの方向から来るかを複数の指標を総合して分析します。'}<br><br>
            ${isEasy ? '' : '<strong>6指標分析:</strong><br>' + dirSources.map(s => `• <strong>${s.name}</strong>: ${SIGNS[s.sign]} ${SIGN_SYMBOLS[s.sign]} → <strong>${DIRECTIONS[s.sign]}</strong> <span style="color:#666;font-size:12px;">(${s.desc})</span>`).join('<br>') + '<br><br><strong>🧿 ウパパダ・ラグナ(UL):</strong> 12宮のアルダパダ。配偶者の家庭/背景と結婚の環境を表します。 → <strong>' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign] + '</strong><br><strong>🎯 ダラパダ(A7):</strong> 7宮のアルダパダ。配偶者の社会的イメージと外的印象を表します。 → <strong>' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign] + '</strong><br><strong>💍 D9 7宮主(' + RULER_NAMES[d9H7Ruler] + '):</strong> ナヴァムシャ7宮の主が行くサインが配偶者の実質的 方向を表します。 → <strong>' + SIGNS[d9H7RulerSign] + ' ' + SIGN_SYMBOLS[d9H7RulerSign] + '</strong><br><strong>♀ D9 金星:</strong> 配偶者のカラカ（象徴惑星）。金星のナヴァムシャ位置が配偶者エネルギーの源です。 → <strong>' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign] + '</strong><br><br>'}
            <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px;margin-top:10px;">
                <strong style="font-size:16px;">🧭 総合結論: ${agreement >= 4 ? '圧倒的に強い' : agreement >= 3 ? '非常に強い' : agreement >= 2 ? '強い' : ''} ${primaryDir} 方向</strong><br><br>
                6つの指標中 <strong>${agreement}つ</strong>が <strong>${primaryDir}</strong>を示しています。
                ${agreement >= 4 ? '<br>4つ以上の指標が一致！ <strong>非常に高い確率</strong>で' + primaryDir + ' 方向から配偶者と出会う可能性があります。この方向の都市、職場、旅行先に注目してください。' : ''}
                ${agreement === 3 ? '<br>3つの指標一致 — <strong>高い確率</strong>で' + primaryDir + ' 方向です。' : ''}
                ${agreement === 2 ? '<br>2つの指標一致 — ' + primaryDir + ' 方向が有力ですが、他の可能性もあります。' : ''}
                ${agreement <= 1 ? '<br>指標が分散しているため、様々な経路で出会いがある可能性があります。' : ''}
                ${sortedDirs.length > 1 && sortedDirs[1][1] === sortedDirs[0][1] ? '<br><br>💡 二つの方向が同等: <strong>' + sortedDirs[0][0] + '</strong>と<strong>' + sortedDirs[1][0] + '</strong> 両方可能性があります。' : ''}
            </div>
        </div>
    </div>`;

    document.getElementById('d9InterpWrap').innerHTML = html;

    // 配偶者 プロフィールは別関数
    renderSpouseProfile(d1LagnaSign, ulSign, a7Sign, venusD9Sign);
}

function renderSpouseProfile(d1LagnaSign, ulSign, a7Sign, venusD9Sign) {
    const isEasy = window.vedicMode === 'easy';
    let html = '';
    const meetingBySgn = [
        "活動的な場所、スポーツ、競争環境、リーダーシップの集まり。激しく突然の出会い。",
        "職場、金融機関、レストラン、自然の中。ゆっくり信頼を築く出会い。",
        "SNS、学校、セミナー、旅行中、合コン。会話から始まる関係。",
        "家族の紹介、近所の集まり、幼馴染。居心地の良い環境からのスタート。",
        "パーティー、コンサート、クリエイティブな集まり、華やかな場所。劇的な出会い。",
        "職場、病院、健康関連、ボランティア活動。実際的なニーズからの出会い。",
        "合コン、マッチング、法律・外交イベント、美術展。上品で洗練された出会い。",
        "危機的状況、深い会話、秘密の場所、研究室。運命的で強烈な引き合い。",
        "海外、大学、宗教・哲学的な集まり、旅行中。遠い地からの縁。異文化の可能性。",
        "職場、ビジネスイベント、公式な場。社会的地位に関連した出会い。",
        "オンライン、趣味のクラブ、社会運動、友人の友人。ユニークで型破りな出会い。",
        "スピリチュアルな集まり、海外、芸術・音楽、病院、夢のヒント。神秘的で運命的な出会い。"
    ];

    const backgroundBySgn = [
        "独立心旺盛な自力で立った家族。強いリーダーシップの遺産。",
        "財政的に安定した家族。伝統的な価値観。裕福な背景の可能性。",
        "知的でコミュニケーション豊かな家族。教育を重視。",
        "温かく家族思いの家庭。強い母親像。",
        "名声があり誇り高い家族。社会的地位と評判。",
        "実践的で勤勉な家族。健康・医療・教育の背景。",
        "バランスが取れた品位ある家族。芸術・法律・外交の背景。",
        "秘密や変容のある家族。深い家族の歴史。",
        "学術的、宗教・哲学的な家族。海外の背景の可能性。",
        "厳格で伝統的な家族。社会的に尊敬されている。責任感を重視。",
        "自由奔放でユニークな家族構成。進歩的な考え方。",
        "スピリチュアルまたは芸術的な家族。海外の背景の可能性。豊かな感受性。"
    ];

    const imageBySgn = [
        "エネルギッシュで自信ある第一印象。スポーティーまたは力強いイメージ。",
        "穏やかで信頼できる第一印象。洗練されて品位あるイメージ。",
        "明るく話し好きな第一印象。知的で機知に富んだイメージ。",
        "温かく包容力のある第一印象。柔らかく思いやりのあるイメージ。",
        "華やかでカリスマ的な第一印象。自信あるイメージ。",
        "こぎれいで整然とした第一印象。几帳面でプロフェッショナルなイメージ。",
        "上品で魅力的な第一印象。バランスが取れて洗練されたイメージ。",
        "神秘的で強烈な第一印象。深みとカリスマのあるイメージ。",
        "自由奔放で活気ある第一印象。ポジティブで冒険好きなイメージ。",
        "真剣で成熟した第一印象。責任感があり信頼できるイメージ。",
        "ユニークで個性的な第一印象。トレンディーでオリジナルなイメージ。",
        "夢見がちで神秘的な第一印象。芸術的で感情豊かなイメージ。"
    ];

    const attractBySgn = [
        "強いエネルギーと自信。積極的で守護する性質が魅力的。",
        "安定感と感覚的な魅力。美食、香り、質感を楽しむ。",
        "機知と会話力。知的刺激が魅力のポイント。",
        "献身的なケアと感情。一緒にいると家にいるような安心感が魅力。",
        "輝く存在感と寛大さ。一緒にいると特別な気分になれる魅力。",
        "繊細な気配りと完璧主義。細部への注意が魅力的。",
        "上品さと調和的な人柄。一緒にいると世界が美しくなる。",
        "強烈な眼差しと深み。魂を貫くような集中力が魅力。",
        "自由な精神とユーモア。一緒にいると冒険が始まる。",
        "確固たる信頼性と成熟さ。揺るぎない安定感が魅力的。",
        "独自の個性と進歩的な思考。今まで見たことのない新鮮さ。",
        "神秘的な感受性とスピリチュアルな深み。夢のようなロマンスが魅力。"
    ];

    // D1 7宮サインで出会い環境
    const d1H7ForMeeting = (d1LagnaSign + 6) % 12;

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🤝 配偶者との出会いの場' : '🤝 配偶者との出会いの場 — D1 7宮: ' + SIGNS[d1H7ForMeeting] + ' ' + SIGN_SYMBOLS[d1H7ForMeeting]}</div>
        <div class="interp-text">
            ${isEasy ? '' : '7宮のサインが配偶者との出会いの環境と方法を表します。<br><br>'}
            <strong>${meetingBySgn[d1H7ForMeeting]}</strong>
            ${d1H7ForMeeting === 8 || d1H7ForMeeting === 11 ? '<br><br>💡 <strong>海外の縁の可能性！</strong> 配偶者が外国人か海外で出会う可能性があります。' : ''}
        </div>
    </div>`;

    // UL 사인으로 배우자 가문/배경
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏛️ 配偶者の家庭/背景' : '🏛️ 配偶者の家庭/背景 — UL: ' + SIGNS[ulSign] + ' ' + SIGN_SYMBOLS[ulSign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'ウパパダ・ラグナ(UL)は配偶者の家庭環境と育ちを表します。<br><br>'}
            <strong>${backgroundBySgn[ulSign]}</strong>
        </div>
    </div>`;

    // A7 사인으로 배우자 외적 이미지
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '👤 配偶者の第一印象' : '👤 配偶者の第一印象 — A7: ' + SIGNS[a7Sign] + ' ' + SIGN_SYMBOLS[a7Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'ダラパダ(A7)は配偶者が世界に見せる外的イメージと第一印象を表します。<br><br>'}
            <strong>${imageBySgn[a7Sign]}</strong>
        </div>
    </div>`;

    // D9 金星 사인으로 배우자 매력 포인트
    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💎 配偶者の魅力ポイント' : '💎 配偶者の魅力ポイント — D9 金星: ' + SIGNS[venusD9Sign] + ' ' + SIGN_SYMBOLS[venusD9Sign]}</div>
        <div class="interp-text">
            ${isEasy ? '' : 'ナヴァムシャの金星位置は配偶者の核心的な魅力と愛のスタイルを表します。<br><br>'}
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
            <div class="nakshatra-name">あなたの星: ${nak.ko}</div>
            <div class="nakshatra-meaning">"${nak.meaning}"</div>
            <div class="nakshatra-detail">${nak.desc}</div>
        </div>
    ` : `
        <div class="nakshatra-card">
            <div class="nakshatra-name">${nak.ko} (${nak.name})</div>
            <div class="nakshatra-meaning">"${nak.meaning}" — 支配星: ${DASHA_KO[nak.ruler] || nak.ruler}</div>
            <div class="nakshatra-detail">
                守護神: ${nak.deity}<br><br>
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
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 人生は時期ごとに異なるエネルギーが流れています。今どんな時期にいるのか、次にどんな時期が来るのか確認しましょう。<br><br>' :
        '<div class="interp-card" style="margin-bottom:12px;border-left:3px solid #c9a84c;"><div class="interp-text" style="font-size:12px;color:#888;">💡 <strong>ヴィムショータリ・ダシャー(Vimshottari Dasha)</strong> — 人生は9つの惑星が順番に支配する時期に分かれます. <strong>大運(Mahadasha)</strong>は大きな時期、 <strong>小運(Antardasha/Bhukti)</strong>はその中の細かい時期です。 月のナクシャトラ位置から計算されます。<br><br>';
    html += isEasy ?
        '</div></div>' :
        '🌙 出生時の月: <strong>' + nak.ko + ' (' + nak.name + ')</strong> — 最初のダシャー: <strong>' + DASHA_KO[startRuler] + '</strong> (残余: ' + remainingYears.toFixed(2) + '年)</div></div>';

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
        const dashaEasyDesc = {Ketu:'内面の省察と霊的成長の時期',Venus:'愛・美・豊かさの時期',Sun:'自信とリーダーシップが輝く時期',Moon:'感情と家庭が中心の時期',Mars:'挑戦と行動力の時期',Rahu:'大きな変化と新しいチャンスの時期',Jupiter:'幸運と成長が訪れる時期',Saturn:'忍耐すれば大きな成果が得られる時期',Mercury:'勉強・コミュニケーション・ビジネスが順調な時期'};
        html += '<span class="dasha-planet">' + (isEasy ? dashaEasyDesc[p.planet] : DASHA_KO[p.planet]) + '</span>';
        html += '<span class="dasha-period">' + fmtDate(p.startD) + ' ~ ' + fmtDate(p.endD) + '</span>';
        html += '<span class="dasha-years">' + (p.actualDays / 365.25).toFixed(1) + '年</span>';
        if (isCurrent) html += '<span class="dasha-badge">現在</span>';
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
    // 1. 성격 & 외모 (1宮 ラグナ)
    // ═══════════════════════════════════
    const lagnaEasy = [
        '行動派！決断力があり、リーダーの資質があります。新しい挑戦が大好き。少し短気かもしれませんが、その分推進力がすごいです。',
        '安定が大好き。快適で美しいもの、美味しいものが好き。一度決めたら最後まで貫くタイプ。頑固だけど信頼できる人です。',
        '好奇心旺盛！話し上手で多才。新しい情報をすぐ吸収し、ウィットのある会話で人を引きつけます。散漫に見えることもありますが、それが魅力です。',
        '感性的で温かい人。家族を大切にし、人の気持ちをよく読みます。誰かの世話をするのが天職。一緒にいると安心する存在です。',
        '生まれながらのリーダー！存在感が大きく、注目を集めます。認められたい気持ちが強いですが、その分愛情も惜しみなく注ぐ人です。',
        '細かくて分析的。完璧を目指し、健康に関心があります。他人が見逃すものを見つける鋭い観察力の持ち主です。',
        '調和を求めます。洗練されて魅力的、芸術的センスが抜群。美しいものに囲まれている時が一番幸せな人です。',
        '深みがあります。直感が強く、本質を見抜きます。表面は穏やかでも内面には激しい感情が流れています。',
        '自由な魂！旅行と学びを愛し、ポジティブ。異文化に興味があり、ユーモアのセンスで周りを明るくします。',
        '野心的。忍耐力が強く、年を重ねるほど魅力が増します。大器晩成型で、最終的に望むものを手に入れます。',
        'ユニーク。みんなと違う考え方をし、革新的。型にはまるのが嫌いで、テクノロジーや科学に才能があります。',
        '感受性が豊か。直感が強く、芸術やスピリチュアルなものに惹かれます。内面の世界が外の世界より豊かな人です。'
    ];
    const lagnaInterp = [
        '火星が支配する牡羊座ラグナ。強い意志とリーダーシップ、独立的な性格。行動が速く開拓者精神が強い。体格は鋭い目鼻立ちに活動的な印象。せっかちだが勇敢で、競争で頭角を現します。',
        '金星が支配する牡牛座ラグナ。安定と豊かさを追求し、感覚的な美しさを愛します。柔らかい外見に魅力的な声。物質的な安定を重視し、芸術的感覚に優れています。頑固だが信頼できる人。',
        '水星が支配する双子座ラグナ。知的好奇心が旺盛でコミュニケーション能力が卓越。若く見える外見にすばしっこい体型。多才だが散漫になりやすく、文章や言語に才能があります。',
        '月が支配する蟹座ラグナ。感受性が豊かで直観的。丸い顔に柔らかい印象。家庭と家族に献身的で保護本能が強い。感情の起伏はあるが深い共感能力の持ち主。',
        '太陽が支配する獅子座ラグナ。カリスマと創造的エネルギーにあふれています。堂々とした体格に存在感のある外見。リーダーシップが天賦であり、注目されることを楽しみます。自尊心が高いが寛大な心。',
        '水星が支配する乙女座ラグナ。分析的で完璧を追求します。端正な外見に知的な印象。細かい観察力と実用的な能力に優れ、健康と衛生に関心が高い。',
        '金星が支配する天秤座ラグナ。バランスと調和を追求し外交的。均整の取れた外見に洗練された印象。対人関係とパートナーシップに優れ、芸術と美への感覚が卓越。',
        '火星が支配する蠍座ラグナ。強烈な直観と変革の力。鋭い眼差しに神秘的な印象。深い洞察力で本質を見抜き、秘密を守ります。劇的な人生の変化を何度も経験します。',
        '木星が支配する射手座ラグナ。自由と真理を追求する哲学者。大きな体格に明るい印象。楽観的で道徳的価値を重視します。旅行と高等教育に縁が深い。',
        '土星が支配する山羊座ラグナ。野心と忍耐力が強い。痩せた体型に真面目な印象。体系的に目標に向かって進み、年齢を重ねるほど若返るタイプ。社会的地位と達成を重視します。',
        '土星が支配する水瓶座ラグナ。革新的で独創的。独特な外見に知的な印象。人道主義的な価値を重視し、型にはまらない思考方式。テクノロジーと科学に才能があります。',
        '木星が支配する魚座ラグナ。霊的で直観的。柔らかい外見に夢見るような印象。芸術的感受性が極めて優れ、超越的な世界に関心が高い。自己犠牲的な傾向。'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">👤 ${isEasy ? 'あなたの性格' : '性格 & 外見 — ラグナ: ' + SIGNS[lagnaSign] + ' ' + SIGN_SYMBOLS[lagnaSign]}</div>
        <div class="interp-text">${isEasy ? lagnaEasy[lagnaSign] : lagnaInterp[lagnaSign]}</div>
    </div>`;

    // ═══════════════════════════════════
    // 2. 내면 & 감정 (月 별자리)
    // ═══════════════════════════════════
    if (moonPos) {
        const moonEasy = [
        '心の奥に炎のような情熱があります。感情が素早く上がって素早く冷めます。ストレスを感じたら体を動かすのが一番。運動やアウトドアが効果的です。',
        '感情的にとても安定しています。急な変化を嫌い、慣れ親しんだものに安心感を覚えます。美味しい食べ物、音楽、美しい自然で心が癒されます。',
        '感情を理性的に処理します。気分が悪い時は誰かと話すと心が整理されます。好奇心旺盛で退屈が苦手。軽いユーモアで雰囲気を変える才能があります。',
        '極度に感受性が豊かです。他人の感情をスポンジのように吸収します。家庭で安心感を感じ、母親との絆が強いです。料理やインテリアで心が安定します。',
        '感情表現が華やかで情熱的。愛され認められたい気持ちが強いですが、その分愛情も惜しみなく注ぎます。創作活動が感情的な治癒薬になります。',
        '感情を分析して整理する傾向があります。心配性ですが問題解決能力が優れています。日常のルーティンで感情的な安定を見つけます。',
        '関係の中で感情のバランスを見つけます。一人だと寂しさを感じ、パートナーや親しい友人と一緒にいると安定します。美しいものと芸術で心の平和を見つけます。',
        '感情は海のように深く激しいです。深く愛し、裏切りは絶対に忘れません。直感が非常に強く、言葉より目や行動から真実を読み取ります。',
        '感情的に明るく楽観的。自由を愛し束縛を嫌います。旅行が最高の癒し。哲学的な思考で感情を昇華させます。',
        '感情をあまり表に出しません。責任感が強く義務を優先します。年を重ねるほど感情的に成熟し、自分を楽に表現できるようになります。',
        'ユニークで予測不能な感情パターン。独立的で自由な感情生活を望みます。社会活動で感情的な満足を見つけます。',
        '極度に直感的でスピリチュアル。夢が鮮明で時に未来を予感します。芸術、瞑想、水辺で心の安定を見つけます。内面の世界が外の世界より豊かです。'
    ];
        const moonInterp = [
            '内面に炎のような情熱があります。感情が即興的で素早く変わります。怒りやすいがすぐ収まり、独立した感情生活を望みます。ストレスは運動で解消すると良いでしょう。',
            '感情的に非常に安定しており、快適さを追求します。変化を嫌い、馴染みのあるものに安心感を得ます。美味しい食事、音楽、自然で癒されます。一度心を開くと簡単には変わりません。',
            '感情を理性的に処理し、会話を通じて心を整理します。好奇心が多く複数の関心事を同時に追求します。感情的な深さより多様性を追求し、退屈に耐えられません。',
            '月の本宮（本来の居場所）。感受性が極めて豊かで他人の感情をスポンジのように吸収します。母性本能が強く家庭で安心を感じます。月の周期に応じて感情が変わることがあります。',
            '感情表現がドラマチックで情熱的。認められ愛されたい欲求が強く、無視されると深く傷つきます。創造的な活動が感情的な癒しになります。ロマンチックで寛大な心。',
            '感情を分析し整理する傾向があります。心配性で完璧主義的ですが実用的に解決します。健康への心配があり、日常のルーティンに安心感を見出します。',
            '関係の中で感情のバランスを見つけます。一人でいると不安で、パートナーと一緒にいると安定します。対立と不和を極度に嫌い、芸術と美しさに心の平和を見出します。',
            '感情が海のように深く激しい。愛も憎しみも深く、裏切りは絶対に許しません。直観が非常に強く、相手の本心を本能的に把握します。変革と再生の感情エネルギー。',
            '感情的に楽観的で自由を愛します。束縛を嫌い新しい経験を追求します。哲学的思考を通じて感情を昇華させ、旅行が最高の癒しです。',
            '感情をよくコントロールし表に出しません。責任感が強く感情より義務を優先します。幼少期に感情的困難があったかもしれませんが、年齢を重ねるほど感情的に成熟します。',
            '独特で予測不可能な感情パターン。独立的で一般的でない方法で愛します。社会的大義と人類への普遍的な愛を追求し、個人的感情より大きな絵を見ます。',
            '極めて直観的で霊的。夢が鮮明で予知的かもしれません。他人の苦しみに深く共感し、自己と他者の境界が曖昧。芸術、瞑想、霊的修行で安定を見出します。'
        ];
        html += `<div class="interp-card">
            <div class="interp-title">🌙 ${isEasy ? 'あなたの感情スタイル' : '内面 & 感情 — 月: ' + SIGNS[moonPos.sign] + ' ' + SIGN_SYMBOLS[moonPos.sign]}</div>
            <div class="interp-text">${isEasy ? moonEasy[moonPos.sign] : moonInterp[moonPos.sign]}</div>
        </div>`;
    }

    // ═══════════════════════════════════
    // 3. 💰 재물운 (2궁, 11宮 분석)
    // ═══════════════════════════════════
    const h2planets = planetsInHouse(2);
    const h11planets = planetsInHouse(11);
    const h2sign = (lagnaSign + 1) % 12;
    const h11sign = (lagnaSign + 10) % 12;

    let wealthText = isEasy ? '' : `<strong>2宮（蓄積された財産）:</strong> ${SIGNS[h2sign]}に位置。`;
    if (h2planets.length === 0) {
        wealthText += isEasy ? '財の蓄積は着実で安定的です。大きな変動なく着実に貯まるタイプです。' : '2宮に惑星がなく、財の蓄積は着実ですが特別な変動なく安定的です。';
    } else {
        h2planets.forEach(p => {
            const pWealth = {
                'Sun': '権威と地位を通じた収入。政府や公共部門で財を得る可能性があります。',
                'Moon': '流動的な財政状況。大衆に関連する事業や飲食分野で収入の可能性。',
                'Mars': '積極的な資産運用の傾向。不動産、技術、軍事関連分野で収入。',
                'Mercury': '知的能力でお金を稼ぎます。文筆、教育、通信、IT分野で財を成す。',
                'Jupiter': '最も吉兆な配置！豊かな財運。教育、法律、宗教分野で大きな収入。',
                'Venus': '贅沢品、芸術、エンターテインメント、ファッションで財を築きます。豊かな食生活。',
                'Saturn': 'ゆっくりと着実に財を築きます。初期に困難がありますが中年以降安定。',
                'Rahu': '非伝統的な方法でお金を稼ぎます。外国、技術、革新分野で突然の財。',
                'Ketu': '財に対する無関心。霊的な価値を物質より重視し、突然の損失に注意。'
            };
            wealthText += isEasy ? `${pWealth[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pWealth[p.id] || ''} `;
        });
    }

    wealthText += isEasy ? '<br><br>' : `<br><br><strong>11宮（収入と利益）:</strong> ${SIGNS[h11sign]}に位置。`;
    if (h11planets.length === 0) {
        wealthText += isEasy ? '収入は安定的ですが大きな変動はありません。' : '11宮に惑星がなく、収入は安定的ですが大きな変動はありません。';
    } else {
        h11planets.forEach(p => {
            const pIncome = {
                'Jupiter': '大きな収入と豊かな利益！社会的ネットワークが財をもたらします。',
                'Venus': '芸術、社交、ファッションを通じた収入。女性の友人が助けになります。',
                'Saturn': '着実で安定した収入ですが成長は遅い。老後の保障が良い。',
                'Mars': '競争を通じた収入。技術、不動産、スポーツ関連の利益。',
                'Mercury': '知的ネットワークを通じた収入。事業家の気質。',
                'Sun': '権威を通じた収入。政治的な繋がりが財をもたらします。',
                'Moon': '大衆的な人気を通じた収入。変動はあるが着実な流れ。'
            };
            wealthText += isEasy ? `${pIncome[p.id] || ''} ` : `${p.symbol} ${p.name}: ${pIncome[p.id] || ''} `;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">💰 ${isEasy ? '私の財運' : '財運'}</div>
        <div class="interp-text">${wealthText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 4. 💕 배우자 & 결혼운 (7宮 분석)
    // ═══════════════════════════════════
    const h7sign = (lagnaSign + 6) % 12;
    const h7planets = planetsInHouse(7);
    const venus = positions.find(p => p.id === 'Venus');

    const spouseSign = [
        '配偶者が独立的でエネルギーにあふれた性格。強い意志とリーダーシップを持つ人との縁。活動的で直接的なパートナー。',
        '美しく芸術的な配偶者。物質的に安定した人との縁。感覚的で忠実なパートナー。',
        '知的でコミュニケーション能力の高い配偶者。会話が弾む人との縁。ユーモアセンスがあり多才なパートナー。',
        '感性的で家庭的な配偶者。面倒見の良い性格の人との縁。母親のような温かさを持つパートナー。',
        'カリスマがあり堂々とした配偶者。社会的に注目される人との縁。自尊心は高いが寛大なパートナー。',
        '几帳面で実用的な配偶者。健康とウェルネスに関心の多い人との縁。分析的で奉仕的なパートナー。',
        '魅力的で洗練された配偶者。外交的でバランス感覚の良い人との縁。芸術的感覚に優れたパートナー。',
        '強烈で神秘的な配偶者。深い感情を持つ人との縁。変革的で情熱的なパートナー。秘密が多いかもしれません。',
        '自由で楽観的な配偶者。外国人や異文化圏の人との縁の可能性。哲学的で冒険好きなパートナー。',
        '真面目で野心のある配偶者。年齢差があるかもしれません。責任感が強く社会的に成功したパートナー。結婚が遅れることも。',
        '独特で独立的な配偶者。非伝統的な出会いや関係。知的で革新的なパートナー。自由な結婚形態。',
        '霊的で直観的な配偶者。芸術家や霊的従事者との縁。夢見るようなロマンチックなパートナー。理想化の傾向に注意。'
    ];

    const spouseAppearance = [
        '鋭い目鼻立ち、強い印象。アスリートのような引き締まった体型。エネルギッシュな外見。赤系の服が似合い、活動的でダイナミックな雰囲気。',
        '柔らかく魅力的な外見。ふくよかな体型に感覚的な唇。肌が良く自然な美しさ。声が良く全体的に温かく安心する印象。',
        '若く見える外見に明るい印象。スリムで背が高い方。話し上手で表情豊かで目が輝く。トレンドに敏感でスタイリッシュなファッションセンス。',
        '丸い顔に柔らかい印象。少しぽっちゃりか曲線美のある体型。色白で目が大きい。母性的な雰囲気。楽な服装を好み家でより魅力的。',
        '堂々とした体格にカリスマ溢れる外見。豊かな髪が特徴。目立つ存在感があり着こなし上手。華やかなアクセサリーが好きでどこでも視線を集めるタイプ。',
        '端正で清潔感のある外見。痩せ型で比率が良い。知的な印象に眼鏡が似合う。ミニマルなファッションを好み清潔感が魅力ポイント。',
        'バランスの取れた外見に洗練された印象。対称的な顔立ち。笑顔が魅力的で社交的な雰囲気。ファッションセンスに優れ常にきちんとした装い。',
        '鋭く神秘的な外見。深い目つきが強い印象を残す。痩せ型で鋭い目鼻立ち。全体的にダークトーンの服を好む。',
        '背が高く体格が良い。明るく開放的な印象。異国的な魅力。カジュアルで自由な服装。笑顔が魅力的でスポーティーなスタイル。',
        '真面目で成熟した外見。痩せ型で骨格がしっかり。年齢より大人に見え時間と共に魅力が増す。スーツが似合いクラシックなスタイル。',
        '独特で非凡な外見。個性的なファッションスタイル。背が高いか目立つ特徴がある。平凡でない魅力。未来的で実験的なスタイルを好む。',
        '柔らかく幻想的な外見。大きな目に夢見るような表情。少しぽっちゃりで肌が透明感がある。パステルトーンが似合い芸術家の雰囲気。神秘的な魅力。'
    ];

    let spouseText = (isEasy ? '' : '<strong>📐 配偶者の外見 & 第一印象:</strong><br>') + spouseAppearance[h7sign] + (isEasy ? '<br><br>' : isEasy ? '<br><br>' : '<br><br><strong>📋 配偶者の性格:</strong><br>') + spouseSign[h7sign];

    if (h7planets.length > 0) {
        spouseText += isEasy ? '<br><br>' : '<br><br><strong>7宮の惑星:</strong> ';
        h7planets.forEach(p => {
            const pH7 = {
                'Sun': '配偶者が社会的に認められている人。やや支配的かもしれないが尊敬できるパートナー。',
                'Moon': '感性的で面倒見の良い配偶者。感情的な交流が深い結婚生活。',
                'Mars': '情熱的だが争いが多いかもしれません。強い性格の配偶者。エネルギーあふれる関係。（クジャ・ドーシャに注意）',
                'Mercury': '知的で会話が弾む配偶者。ビジネスパートナーとしても良い関係。',
                'Jupiter': '最も祝福された配置！賢明で道徳的な配偶者。幸せな結婚生活。配偶者を通じた幸運。',
                'Venus': '非常に魅力的で愛にあふれた配偶者。ロマンチックな結婚生活。贅沢を好むかもしれません。',
                'Saturn': '結婚が遅れるか年齢差の大きい配偶者。初期の困難の後、安定して長続きする結婚。',
                'Rahu': '非伝統的な結婚。外国人や異なる背景の配偶者。突然の出会い。幻想に注意。',
                'Ketu': '配偶者への超然さ。前世の縁。霊的な繋がりは強いが世俗的な関係では距離感。'
            };
            spouseText += isEasy ? `<br>${pH7[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pH7[p.id] || ''}`;
        });
    }

    if (venus) {
        const venusHouse = houseOf(venus.sign);
        spouseText += isEasy ? '<br><br>' : `<br><br><strong>金星の位置（${venusHouse}宮）:</strong> `;
        const venusHouseInterp = {
            1: '魅力的な外見。恋愛を楽しみ、すぐに恋に落ちます。',
            2: '配偶者を通じて財が入ります。美しい声と食通。',
            3: '芸術的なコミュニケーション能力。兄弟姉妹との楽しい関係。',
            4: '家庭での幸福と美しい住居。母親の影響が大きい。',
            5: 'ロマンスが豊かな人生。子供との良い関係。創作活動に喜び。',
            6: '恋愛で奉仕的な態度。職場でのロマンスの可能性。',
            7: '配偶者が非常に魅力的。幸せな結婚生活の強力な指標。',
            8: '深く変革的な愛。秘密の恋愛。配偶者の財産。',
            9: '海外でのロマンス。師匠やメンターとの縁。哲学的な愛。',
            10: '社会的に認められた結婚。職業を通じた出会い。',
            11: '友人から恋人へ。社交活動で縁を見つける。',
            12: '秘密の恋愛。海外での縁。霊的な愛。'
        };
        spouseText += venusHouseInterp[venusHouse] || '';
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💍 私の配偶者' : '💕 配偶者 & 結婚運 — 7宮: ' + SIGNS[h7sign] + ' ' + SIGN_SYMBOLS[h7sign]}</div>
        <div class="interp-text">${spouseText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 5. 💼 직업 & 사회적 성취 (10宮 분석)
    // ═══════════════════════════════════
    const h10sign = (lagnaSign + 9) % 12;
    const h10planets = planetsInHouse(10);

    const careerSign = [
        '軍隊、警察、スポーツ、外科、企業経営、リーダーシップ職に適しています。',
        '金融、飲食業、農業、ファッション、不動産、芸術、銀行関連職。',
        'メディア、文筆、教育、通信、IT、マーケティング、翻訳関連職。',
        '医療、看護、ホテル業、海洋、不動産、飲食関連職。',
        '政治、芸能、経営、政府機関、リーダーシップポジション、金関連職。',
        '医療、会計、分析、コンサルティング、健康管理、品質管理職。',
        '法律、外交、ファッション、インテリア、カウンセリング、イベント企画職。',
        '研究、調査、保険、医学、心理学、税務、鉱業関連職。',
        '教育、法律、宗教、出版、旅行、国際貿易関連職。',
        '経営、公務員、建築、土木、政治、大企業関連職。',
        '技術、科学、IT、航空、宇宙、社会福祉、イノベーション分野。',
        '芸術、映画、音楽、医療、海外、霊的分野、NGO関連職。'
    ];

    let careerText = isEasy ? careerSign[h10sign] : `10宮は${SIGNS[h10sign]}に位置。${careerSign[h10sign]}`;

    if (h10planets.length > 0) {
        careerText += isEasy ? '<br><br>' : '<br><br><strong>10宮の惑星:</strong>';
        h10planets.forEach(p => {
            const pCareer = {
                'Sun': ' 政府、リーダーシップ、権威ある職位。社会的に注目されるキャリア。',
                'Moon': ' 大衆に関連する職業。ケアリング、ホテル、飲食、感情関連職。',
                'Mars': ' 技術、エンジニアリング、軍事、外科、スポーツ。競争的な分野で成功。',
                'Mercury': ' ビジネス、コミュニケーション、IT、教育。知的能力で成功。',
                'Jupiter': ' 教育、法律、宗教、コンサルティング。尊敬される職業。最も良い配置の一つ。',
                'Venus': ' 芸術、エンターテインメント、ファッション、ビューティー、外交。創造的な分野で成功。',
                'Saturn': ' 遅いが確実な成功。体系的組織、建築、公務員。中年以降輝く。'
            };
            careerText += isEasy ? `<br>${pCareer[p.id] || ''}` : `<br>${p.symbol} ${p.name}: ${pCareer[p.id] || ''}`;
        });
    }

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '💼 私の職業' : '💼 職業 & 社会的達成 — 10宮: ' + SIGNS[h10sign] + ' ' + SIGN_SYMBOLS[h10sign]}</div>
        <div class="interp-text">${careerText}</div>
    </div>`;

    // ═══════════════════════════════════
    // 6. 🏥 건강 (6宮 + ラグナ 분석)
    // ═══════════════════════════════════
    const h6sign = (lagnaSign + 5) % 12;
    const h6planets = planetsInHouse(6);

    const healthByLagna = [
        '頭、脳、顔に関連する疾患に注意。頭痛、発熱、炎症の傾向。規則的な運動が必須。',
        '首、甲状腺、顎に関連する注意。過食と糖尿の傾向。声帯と首の健康管理。',
        '肺、腕、肩、神経系に注意。不安と睡眠の問題の可能性。呼吸瞑想が有効。',
        '胃腸、胸、乳房に関連する注意。消化障害と水分貯留。感情的ストレスが健康に直結。',
        '心臓、背中、脊椎に関連する注意。心血管の健康管理が必須。過労に注意。',
        '消化器系、腸、皮膚に関連する注意。消化不良とアレルギー。食事療法が重要。',
        '腎臓、腰、皮膚に関連する注意。水分摂取とバランスの取れた生活が必須。',
        '生殖器、排泄器系に関連する注意。慢性疾患の可能性。定期検診が重要。',
        '肝臓、太もも、臀部に関連する注意。過体重の傾向。アウトドア活動が健康に良い。',
        '骨、関節、膝、皮膚に関連する注意。リウマチ、関節炎。カルシウム摂取が重要。',
        '足首、ふくらはぎ、循環器系に関連する注意。血圧管理。独特な健康問題の可能性。',
        '足、リンパ系、免疫に関連する注意。原因不明の疾患の可能性。十分な睡眠が鍵。'
    ];

    html += `<div class="interp-card">
        <div class="interp-title">${isEasy ? '🏥 私の健康' : '🏥 健康 — 弱い部位'}</div>
        <div class="interp-text">${healthByLagna[lagnaSign]}${h6planets.length > 0 ? isEasy ? '<br><br>健康管理に特別な注意が必要です。' : '<br><br>6宮に' + h6planets.map(p => p.name).join(', ') + 'が位置しており、健康管理に特別な注意が必要です。' : ''}</div>
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
                    'Sun': '自我発見と権威の時期。リーダーシップを発揮し社会的な認知を受ける時期です。政府や権威者との関係が重要になります。父親との関係に変化が生じる可能性があります。健康では心臓と目に注意してください。この時期に自尊心とアイデンティティが強化されます。',
                    'Moon': '感情と内面の時期。家庭と母親との関係が重要になります。不動産関連のことが生じる可能性があり、大衆との関係が活発になります。感情的な変動は大きいですが直観が強まる時期。旅行と引越しの可能性。',
                    'Mars': '行動とエネルギーの時期。勇敢に新しいことを始めるのに良い時です。不動産の売買、手術、技術関連の活動が活発になります。兄弟との関係の変化。ただし紛争、事故、火傷に注意してください。運動と競争で良い結果。',
                    'Rahu': '急変と革新の時期。予想外の機会と挑戦が訪れます。外国関連の仕事が活発になり、技術と革新の分野で発展の可能性。物質的な欲望が強くなりますが幻想に陥らないよう注意。独特な経験をすることになります。18年の長い周期。',
                    'Jupiter': '幸運と成長の時期！教育、結婚、出産、昇進など人生の良いことが起きやすい時。霊的な成長と知恵が深まります。師匠やメンターに出会います。法律、教育、宗教関連の活動が有利です。',
                    'Saturn': '忍耐と試練の時期。遅いが確実な成長をします。責任が重くなり制限と構造化を経験します。健康、特に骨と関節に注意。19年の長い周期で、真の実力が試される時期。終われば強くなった自分を発見します。',
                    'Mercury': '知的活動とビジネスの時期。学習、コミュニケーション、文筆、事業に有利です。新しい技術を学ぶのに良い時。兄弟、友人との関係が活発になります。神経系の健康に注意。複数のことを同時に手がけることになります。',
                    'Ketu': '霊的覚醒と分離の時期。物質世界から超然とし霊的な関心が深まります。突然の変化と喪失を経験するかもしれませんが、それが霊的成長につながります。直観が非常に強まり、瞑想と修行に良い時期。',
                    'Venus': '愛と豊穣の時期！恋愛、結婚、芸術活動が活発になります。物質的な豊かさを享受し贅沢を楽しみます。新車、新居、宝石などを得るかもしれません。美的感覚が発達し社交活動が活発になります。20年の最も長い周期。'
                };
                html += `<div class="interp-card">
                    <div class="interp-title">${isEasy ? '⏳ 今の運勢時期: ' + DASHA_KO[currentDasha] : '⏳ 現在の大運: ' + DASHA_KO[currentDasha] + ' ダシャー'}</div>
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
            yogaText += isEasy ? '<strong>🐘 知恵と名声の祝福</strong>' : '<strong>🐘 ガジャケーサリー・ヨーガ (Gajakesari)</strong> — 月と木星がケンドラ関係！知恵、名声、豊穣の組み合わせ。社会的に尊敬され知的能力に優れます。<br><br>';
        }
    }

    // Budha-Aditya Yoga
    const sun = positions.find(p => p.id === 'Sun');
    const mercury = positions.find(p => p.id === 'Mercury');
    if (sun && mercury && sun.sign === mercury.sign) {
        yogaText += isEasy ? '<strong>📚 優れた知性の祝福</strong>' : '<strong>📚 ブダ・アーディティヤ・ヨーガ</strong> — 太陽と水星が同じ星座！優れた知性とコミュニケーション能力。教育、執筆、ビジネスで成功。<br><br>';
    }

    // Chandra-Mangala Yoga
    if (moonPos && mars && moonPos.sign === mars.sign) {
        yogaText += isEasy ? '<strong>🔥 強い意志と財運の祝福</strong>' : '<strong>🔥 チャンドラ・マンガラ・ヨーガ</strong> — 月と火星が同じ星座！強い意志と財の蓄積能力。ビジネスで成功。<br><br>';
    }

    // Kuja Dosha (Manglik)
    if (mars) {
        const marsH = houseOf(mars.sign);
        if ([1,2,4,7,8,12].includes(marsH)) {
            yogaText += isEasy ? `<strong>⚠️ 結婚の注意事項</strong>` : `<strong>⚠️ クジャ・ドーシャ（マンガリク）</strong> — 火星が${marsH}宮に位置しており、結婚生活に挑戦がある可能性があります。配偶者選択時に相手のチャートも確認することをお勧めします。28歳以降の結婚が有利かもしれません。<br><br>`;
        }
    }

    if (yogaText) {
        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? '🔮 あなたの特別な才能' : '🔮 特別ヨーガ（惑星の組み合わせ）'}</div>
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
        '1宮: 強い自我とリーダーシップ。健康で活力にあふれる。自尊心が高く独立的。政府/権威との縁。',
        '2宮: 家門の名誉を重視。権威を通じた収入。父親からの財産。目の健康に注意。',
        '3宮: 勇敢で決断力がある。兄弟の中のリーダー。文筆/コミュニケーションで権威。短い旅行が多い。',
        '4宮: 親との関係に緊張。不動産/車の所有。内面の不安感。故郷を離れることも。',
        '5宮: 創造的才能が優れている。子供との良い関係。投資/投機の能力。ロマンチックな恋。',
        '6宮: 敵に勝つ力。健康管理能力。法的紛争で勝利。奉仕/医療分野に適している。',
        '7宮: 配偶者の社会的地位が高い。パートナーシップで主導権。結婚後の社会的成長。',
        '8宮: 寿命に注意。遺産/保険関連の利益。秘密の権力。霊的変革の経験。',
        '9宮: 父親が尊敬される人物。法律/宗教/高等教育で成功。海外旅行が多い。幸運。',
        '10宮: 最高の配置！社会的成功と名声。政府/公共分野のリーダー。父親のように成功。',
        '11宮: 大きな収入と社会的ネットワーク。上流層の友人。目標達成能力に優れる。',
        '12宮: 海外での成功。霊的追求。父親との距離。孤独を楽しむ傾向。目の健康に注意。'
    ],
    Moon: [
        '1宮: 魅力的な外見。感情的で変化の多い性格。大衆に人気。健康が月の周期に影響。',
        '2宮: 豊かな家庭環境。良い食生活。甘い話し方。家族との絆が強い。',
        '3宮: 創造的なコミュニケーション能力。旅行が好き。兄弟姉妹との感情的な絆。芸術的な趣味。',
        '4宮: 最高の配置！幸せな家庭。母親との強い絆。不動産運が良い。感情的安定。',
        '5宮: 子供への愛が深い。ロマンチックな性格。直感的な投資能力。創作活動に喜び。',
        '6宮: 感情的ストレスによる健康問題。敵に勝利。奉仕精神。消化障害に注意。',
        '7宮: 魅力的な配偶者。感情的に深い結婚。パートナーに依存的な傾向。大衆との関係。',
        '8宮: 感情的な混乱と変革。直観が非常に強い。遺産/相続の可能性。寿命は長いが感情的な危機。',
        '9宮: 霊的で哲学的。母親が宗教的。海外旅行/居住。幸運な旅行。',
        '10宮: 大衆的な人気と社会的成功。ホテル/飲食/ケアリング分野。母親の影響で成功。',
        '11宮: 友人が多く社交的。着実な収入。願望達成能力。女性の友人の助け。',
        '12宮: 海外居住の可能性。睡眠の問題。霊的傾向。母親との距離。孤独を楽しむ。'
    ],
    Mars: [
        '1宮: 強い体力と意志。傷/傷跡の可能性。せっかちだが勇敢。リーダーシップと競争心。',
        '2宮: 荒い言葉遣い。食習慣の問題。家族との争い。しかし財の蓄積能力。',
        '3宮: 最高の配置！勇気と冒険心。兄弟との強い絆。運動/スポーツの才能。',
        '4宮: 家庭内の対立。不動産関連の紛争。母親との緊張。しかし不動産投資の利益。',
        '5宮: 情熱的な恋愛。子供が活動的。投機的な投資。スポーツ/競争分野の才能。',
        '6宮: 敵を撃破する力！病気に勝つ体力。軍隊/警察/医療に適している。強い免疫力。',
        '7宮: クジャ・ドーシャ — 結婚生活に情熱と対立が共存。強い配偶者。28歳以降の結婚推奨。',
        '8宮: 事故/手術に注意。しかし危機を生き抜く力。保険/遺産の利益。タントラへの関心。',
        '9宮: 父親との対立。宗教への強い意見。法的紛争。海外での活動。',
        '10宮: 優れた職業成果！軍隊/エンジニアリング/外科/警察。社会で勇敢なリーダー。',
        '11宮: 大きな収入！目標達成能力が強い。兄弟からの助け。不動産の利益。',
        '12宮: 海外での支出が多い。睡眠の問題。性的エネルギーが強い。秘密の活動。'
    ],
    Jupiter: [
        '1宮: 祝福された配置！知恵深く寛大な性格。体格が大きく健康。尊敬される人物。',
        '2宮: 豊かな財産！大きな家門。教育を通じた収入。雄弁家。良い食生活。',
        '3宮: 兄弟姉妹が成功的。宗教/教育関連の文筆。短い巡礼旅行。',
        '4宮: 最高の配置の一つ！広い家。学問的成果。母親が知恵深い。内面の平和。',
        '5宮: 優れた知性と創造力！良い子供運。賢明な投資。霊的修行。前世の功徳。',
        '6宮: 敵に簡単に勝つ。法的勝利。奉仕精神。健康だが体重管理に注意。',
        '7宮: 賢明で道徳的な配偶者！幸せな結婚。ビジネスパートナーシップの成功。',
        '8宮: 長寿！遺産相続。霊的知識の深さ。占星術/神秘学への関心。配偶者の財産。',
        '9宮: 最も強力な配置！偉大な幸運。師匠の祝福。海外旅行。法律/宗教/哲学の成功。',
        '10宮: 社会的名声と尊敬！教育/法律/宗教分野のリーダー。道徳的権威。最高の職業運。',
        '11宮: 大きな収入と利益！願望成就。影響力のある人脈。社会的成功。',
        '12宮: 海外での幸運。霊的解放。天国の快楽。寄付と慈善。瞑想修行。'
    ],
    Venus: [
        '1宮: 非常に魅力的な外見！芸術的才能。贅沢を楽しむ。社交的で人気者。',
        '2宮: 豊かな財産！美味しい食事と贅沢品。甘い声。家族の調和。',
        '3宮: 芸術的なコミュニケーション。美しい文章。妹/女性の兄弟との良い関係。',
        '4宮: 美しい家と車！ラグジュアリーな生活。母親が美しく芸術的。',
        '5宮: ロマンチックな恋！芸術/エンターテインメントの才能。美しい子供。創作の喜び。',
        '6宮: 恋愛での困難。健康関連の美容。敵に魅力で勝利。',
        '7宮: 最高の配置！非常に魅力的な配偶者。幸せな結婚。ビジネスパートナーシップの成功。',
        '8宮: 深く変革的な愛。配偶者の財産。秘密のロマンス。長寿。',
        '9宮: 海外でのロマンス。芸術的な旅行。師匠との美しい関係。',
        '10宮: 芸術/ファッション/エンターテインメント分野の成功！社会的に魅力的。女性の助け。',
        '11宮: 社交的ネットワークを通じた収入！女性の友人の助け。願望成就。',
        '12宮: 海外での愛。秘密の恋愛。寝室の楽しみ。芸術的インスピレーション。'
    ],
    Saturn: [
        '1宮: 痩せた体型。真面目で責任感が強い。幼少期の困難。年齢を重ねるほど輝く。長寿。',
        '2宮: 財の蓄積が遅い。質素な生活。言葉が重い。家族との距離。中年以降安定。',
        '3宮: 優れた配置！強い意志と忍耐。兄弟への責任。体系的なコミュニケーション。',
        '4宮: 母親との困難。家庭環境が厳格。古い家/建物。内面の孤独。',
        '5宮: 子供が遅いか少ない。慎重な投資。学業での困難と克服。霊的修行。',
        '6宮: 敵を忍耐で制す！慢性疾患だが管理可能。奉仕分野での成功。良い配置。',
        '7宮: 結婚が遅い。年上の配偶者。初期の困難の後、安定した結婚。ビジネスパートナーに注意。',
        '8宮: 長寿！慢性疾患に注意。遺産関連の遅延。秘密の研究。タントラ/ヨーガへの関心。',
        '9宮: 父親との困難な関係。宗教への真剣なアプローチ。遅い海外旅行。',
        '10宮: 偉大な配置！遅いが確実な社会的成功。大企業/政府のリーダー。最高の職業運。',
        '11宮: 着実な収入成長！年上の友人。目標を忍耐で達成。組織での利益。',
        '12宮: 海外での困難と成長。睡眠の問題。霊的修行。孤独な作業を好む。'
    ]
};

function renderPlanetHouse(positions, lagnaSign) {
    function houseOf(signIdx) { return ((signIdx - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = ['','自分','お金・家族','コミュニケーション','家庭','子供・恋愛','健康','配偶者','変革','幸運・海外','職業','収入','海外・霊性'];
    let html = '';

    positions.forEach(p => {
        if (!PLANET_IN_HOUSE[p.id]) return;
        const house = houseOf(p.sign);
        const desc = PLANET_IN_HOUSE[p.id][house - 1];
        if (!desc) return;

        html += `<div class="interp-card">
            <div class="interp-title">${isEasy ? (houseArea[house]||'') : p.symbol + ' ' + p.name + ' → ' + house + '宮（' + SIGNS[p.sign] + ')'}</div>
            <div class="interp-text">${isEasy ? desc.replace(/^\d+宮[：:]?\s*/, '') : desc}</div>
        </div>`;
    });

    document.getElementById('planetHouseWrap').innerHTML = html;
}

// ═══════════════════════════════════════════════════
// 教育 & 知識
// ═══════════════════════════════════════════════════
function renderEducation(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    function planetsInHouse(h) { return positions.filter(p => houseOf(p.sign) === h); }

    const h4 = planetsInHouse(4);
    const h5 = planetsInHouse(5);
    const h4sign = (lagnaSign + 3) % 12;
    const h5sign = (lagnaSign + 4) % 12;

    const isEasy = window.vedicMode === 'easy';
    let text = isEasy ? '<strong>基礎教育:</strong> ' : `<strong>4宮（基礎教育・学位）:</strong> ${SIGNS[h4sign]}。`;
    const eduSign4 = ['活動的な学習、体育/軍事教育', '美術/音楽/料理教育', '言語/文学/コミュニケーション', '家庭教育重視、歴史学', '演劇/リーダーシップ/政治学', '科学/医学/分析学', '法学/外交/デザイン', '心理学/研究/調査', '哲学/神学/国際学', '経営/行政/建築', 'IT/科学技術/航空', '芸術/映画/音楽/霊性'];
    text += eduSign4[h4sign] + 'に適しています。';
    if (h4.length > 0 && !isEasy) text += '4宮の' + h4.map(p => p.name).join(', ') + 'が教育に影響。';

    const jupiter = positions.find(p => p.id === 'Jupiter');
    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if ([1,4,5,9].includes(jH)) text += isEasy ? '<br><br>🎓 <strong>高い学業成就が期待されます！</strong> 大学院/博士課程/海外留学の可能性。' : '<br><br>🎓 <strong>木星が' + jH + '宮に位置しており、高い学業成就が期待されます！</strong> 大学院/博士課程/海外留学の可能性。';
    }

    text += isEasy ? '<br><br><strong>高等教育:</strong> ' : `<br><br><strong>5宮（高等教育・知性・創造力）:</strong> ${SIGNS[h5sign]}。`;
    if (h5.length > 0) {
        h5.forEach(p => {
            const h5p = { Sun: 'リーダーシップ/政治学に優れる', Moon: '芸術/心理学の才能', Mars: '工学/技術/体育の才能', Mercury: '数学/言語/ビジネスの天才', Jupiter: '最高の配置！学者/教授/研究者', Venus: '芸術/デザイン/音楽の才能', Saturn: '遅い学業だが深い研究' };
            text += isEasy ? `${h5p[p.id] || '学業に影響'}. ` : `${p.name}: ${h5p[p.id] || '学業に影響'}. `;
        });
    } else {
        text += isEasy ? '特に強い学業エネルギーはありませんが、着実な努力で良い結果が得られます。' : '5宮に惑星がなく、5宮主の位置が学業の鍵です。';
    }

    document.getElementById('educationWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 子供運
// ═══════════════════════════════════════════════════
function renderChildren(positions, lagnaSign) {
    const isEasy = window.vedicMode === 'easy';
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    function planetsInHouse(h) { return positions.filter(p => houseOf(p.sign) === h); }

    const h5 = planetsInHouse(5);
    const h5sign = (lagnaSign + 4) % 12;
    const jupiter = positions.find(p => p.id === 'Jupiter');

    let text = isEasy ? "" : `<strong>5宮（子供・創造力）:</strong> ${SIGNS[h5sign]}に位置。<br><br>`;

    const childSign = [
        '活発で独立的な子供。スポーツ/リーダーシップに才能。早く独立。',
        '穏やかで芸術的な子供。音楽/美術に才能。物質的に豊かな子供。',
        '賢くて話が早い子供。学業優秀。双子の可能性。',
        '感性的で優しい子供。母親と特別な絆。家庭的な子供。',
        'カリスマがあり創造的な子供。リーダーの気質。芸能/芸術の才能。',
        '几帳面で分析的な子供。医学/科学の才能。健康管理が重要。',
        '魅力的で社交的な子供。芸術/外交の才能。バランス感覚に優れる。',
        '強烈で直観的な子供。研究/探究精神。秘密が多いかもしれません。',
        '自由で冒険的な子供。海外留学/旅行の可能性。哲学的な傾向。',
        '真面目で野心のある子供。早く成熟する。社会的達成志向。',
        '独特で革新的な子供。技術/科学に才能。独立的な性格。',
        '芸術的で霊的な子供。想像力豊か。音楽/絵の才能。'
    ];
    text += childSign[h5sign];

    if (h5.length > 0) {
        text += isEasy ? '<br><br>' : '<br><br><strong>5宮の惑星:</strong><br>';
        h5.forEach(p => {
            const ch = { Sun: '息子との縁。子供にリーダー気質。', Moon: '娘との縁。子供と感情的絆が強い。', Mars: '活動的な子供。やや扱いにくいかも。', Mercury: 'とても賢い子供！学業優秀。', Jupiter: '福の多い子供！親孝行。子供を通じた幸運。', Venus: '美しく芸術的な子供。娘との縁。', Saturn: '子供が遅いか少ないかも。でも責任感のある子供。' };
            text += `${ch[p.id] || ''}<br>`;
        });
    }

    if (jupiter) {
        const jH = houseOf(jupiter.sign);
        if (jH === 5) text += isEasy ? '<br>🌟 <strong>最高の子供運！子供が大きな幸運をもたらします。</strong>' : '<br>🌟 <strong>木星が5宮！最高の子供運。子供が大きな幸運をもたらします。</strong>';
    }

    document.getElementById('childrenWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 海外運 & 移住
// ═══════════════════════════════════════════════════
function renderForeign(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    function planetsInHouse(h) { return positions.filter(p => houseOf(p.sign) === h); }

    const h9 = planetsInHouse(9);
    const h12 = planetsInHouse(12);
    const rahu = positions.find(p => p.id === 'Rahu');

    const isEasy = window.vedicMode === 'easy';
    let text = isEasy ? '<strong>海外旅行・幸運:</strong><br>' : '<strong>9宮（海外旅行・幸運・高等教育）:</strong><br>';
    if (h9.length === 0) {
        text += '海外旅行はありますが特に強い縁ではありません。';
    } else {
        h9.forEach(p => {
            const f9 = { Sun: '父親が海外関連。政府/公務の海外出張。', Moon: '海外旅行を感情的に楽しむ。海外での大衆人気。', Mars: '海外での冒険/挑戦。軍事/技術関連の海外活動。', Mercury: '海外留学/ビジネスの成功！多言語能力。', Jupiter: '海外で大きな幸運！留学/移民の成功。海外で師匠に出会う。', Venus: '海外でのロマンス。芸術/ファッション関連の海外活動。', Saturn: '海外での苦労の後に成功。長期海外滞在。', Rahu: '海外移住の強力な指標！外国文化に深くはまる。', Ketu: '前世からの海外の縁。霊的巡礼。' };
            text += isEasy ? `${f9[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f9[p.id] || ''}<br>`;
        });
    }

    text += isEasy ? '<br><strong>海外定住・移民:</strong><br>' : '<br><strong>12宮（海外定住・移民・支出）:</strong><br>';
    if (h12.length === 0) {
        text += '海外定住より国内居住が自然です。';
    } else {
        h12.forEach(p => {
            const f12 = { Sun: '海外でのアイデンティティ探し。政府関連の海外派遣。', Moon: '海外居住の可能性が高い！海外で感情的安定。', Mars: '海外でのエネルギー消耗。海外投資/不動産。', Mercury: '海外ビジネス/IT関連活動。海外教育。', Jupiter: '海外での霊的成長。慈善活動。海外の大学。', Venus: '海外での贅沢と快楽。海外の芸術活動。', Saturn: '海外での厳しい労働。しかし長期的な定住。', Rahu: '海外移民の確定的指標！西洋文化への適応。', Ketu: '海外での霊的修行。孤独な海外生活。' };
            text += isEasy ? `${f12[p.id] || ''}<br>` : `${p.symbol} ${p.name}: ${f12[p.id] || ''}<br>`;
        });
    }

    if (rahu) {
        const rH = houseOf(rahu.sign);
        if ([9, 12, 7].includes(rH)) text += isEasy ? '<br>✈️ <strong>海外移住/長期滞在の可能性が非常に高いです！</strong>' : '<br>✈️ <strong>ラーフが' + rH + '宮に位置しており、海外移住/長期滞在の可能性が非常に高いです！</strong>';
    }

    document.getElementById('foreignWrap').innerHTML = `<div class="interp-card"><div class="interp-text">${text}</div></div>`;
}

// ═══════════════════════════════════════════════════
// 惑星の品位
// ═══════════════════════════════════════════════════
function renderDignity(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const isEasy = window.vedicMode === 'easy';
    const houseArea = {1:'自分',2:'お金・家族',3:'コミュニケーション・兄弟',4:'家庭・母親',5:'子供・恋愛',6:'健康・敵',7:'配偶者',8:'変革・遺産',9:'幸運・海外',10:'職業・名声',11:'収入・願望',12:'海外・霊性'};
    const EXALT = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6 };
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };
    const OWN = { Sun: [4], Moon: [3], Mars: [0,7], Mercury: [2,5], Jupiter: [8,11], Venus: [1,6], Saturn: [9,10] };

    // わかりやすい説明
    const planetRole = {
        Sun: '自我・自信・父親・権威',
        Moon: '感情・心・母親・日常',
        Mars: 'エネルギー・勇気・行動力・競争',
        Mercury: '知性・コミュニケーション・学習・ビジネス',
        Jupiter: '幸運・知恵・財産・結婚',
        Venus: '愛・魅力・芸術・快楽',
        Saturn: '忍耐・試練・責任・努力'
    };

    let html = `<div class="interp-card" style="margin-bottom:16px;">
        <div class="interp-text">
            ${isEasy ?
            '<strong>💡 わかりやすく:</strong> 各惑星があなたの人生でどれだけ力を発揮するか見てみましょう。<br><br>🟢 <strong>非常に強い</strong> = 最高のコンディション！大きな幸運と成果。<br>🟡 <strong>強い</strong> = 安定的に良い結果。<br>⚪ <strong>普通</strong> = 特に強くも弱くもない。<br>🔴 <strong>弱い状態</strong> = 困難がありますが努力で克服可能。' :
            '<strong>💡 わかりやすく:</strong> 惑星の「品位」とはその惑星がどれだけ力を発揮できるかを意味します。<br><br>🟢 <strong>高揚</strong> = 最高のコンディション！<br>🟡 <strong>本宮</strong> = 自分の家のように快適。安定的に良い結果。<br>⚪ <strong>中立</strong> = 普通。<br>🔴 <strong>減衰</strong> = 力が弱い状態。困難がありますが努力で克服可能。'}
        </div>
    </div>`;

    positions.forEach(p => {
        if (!EXALT.hasOwnProperty(p.id)) return;
        let dignity, emoji, meaning, color, simpleDesc;
        const role = planetRole[p.id];

        const house = houseOf(p.sign);
        const area = houseArea[house] || '';

        if (p.sign === EXALT[p.id]) {
            dignity = '高揚 (Exalted)';
            emoji = '🟢';
            color = '#5cb85c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> 領域で最高の祝福を受けています！この分野で生まれ持った才能が輝き、自然に良い結果を得ます。`
                : `<strong>${p.name}が最強！</strong> 「${role}」エネルギーが最大化された状態で<strong>${house}宮(${area})</strong>領域で大きな祝福。生まれ持った才能が輝きます。`;
        } else if (p.sign === DEBI[p.id]) {
            dignity = '減衰 (Debilitated)';
            emoji = '🔴';
            color = '#d9534f';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> 領域で困難を感じるかもしれません。でも意識的に努力すれば大きな成長のチャンスになります。下の改善方法を参考に。`
                : `<strong>${p.name}が弱い状態。</strong> 「${role}」エネルギーが弱まった状態で<strong>${house}宮(${area})</strong>領域にあります。困難を感じるかもしれませんが、意識的な努力で克服すれば大きな成長の機会になります。`;
        } else if (OWN[p.id] && OWN[p.id].includes(p.sign)) {
            dignity = '本宮 (Own Sign)';
            emoji = '🟡';
            color = '#c9a84c';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> 領域で安定的に力を発揮します。自然に良い結果が生まれます。`
                : `<strong>${p.name}が自分の家に！</strong> 「${role}」エネルギーが安定的に<strong>${house}宮(${area})</strong>領域で力を発揮します。`;
        } else {
            dignity = '中立';
            emoji = '⚪';
            color = '#999';
            simpleDesc = isEasy
                ? `<strong>${area}</strong> 領域で普通の影響力です。特に強くも弱くもありません。`
                : `${p.name}の「${role}」エネルギーが<strong>${house}宮(${area})</strong>領域で普通の影響力を発揮します。他の惑星との関係によって結果が異なります。`;
        }

        html += `<div class="interp-card">
            <div class="interp-title">${emoji} ${isEasy ? area + ' — ' : p.symbol + ' ' + p.name + ' — ' + SIGNS[p.sign] + ' ' + SIGN_SYMBOLS[p.sign] + ' → ' + house + '宮(' + area + ') — '}<span style="color:${color}">${isEasy ? (dignity.includes('高揚') ? '非常に強い！' : dignity.includes('減衰') ? '弱い状態' : dignity.includes('本宮') ? '強い' : '普通') : dignity}</span></div>
            <div class="interp-text">
                ${isEasy ? '' : '<span style="color:#666;font-size:12px;">担当: ' + role + ' │ 位置: ' + house + '宮 = ' + area + '</span><br><br>'}
                ${simpleDesc}
            </div>
        </div>`;
    });

    document.getElementById('dignityWrap').innerHTML = html;
}

// ═══════════════════════════════════════════════════
// 幸運の情報
// ═══════════════════════════════════════════════════
function renderLucky(lagnaSign, moonPos) {
    const luckyData = [
        { color: '赤、オレンジ', number: '1, 9', day: '火曜日', gem: 'サンゴ (Red Coral)', dir: '東' },
        { color: '白、ピンク', number: '2, 6', day: '金曜日', gem: 'ダイヤモンド', dir: '南東' },
        { color: '緑', number: '3, 5', day: '水曜日', gem: 'エメラルド', dir: '北' },
        { color: '白、銀', number: '2, 7', day: '月曜日', gem: '真珠', dir: '北西' },
        { color: '金、オレンジ', number: '1, 4', day: '日曜日', gem: 'ルビー', dir: '東' },
        { color: '緑、黄緑', number: '5, 3', day: '水曜日', gem: 'エメラルド', dir: '南' },
        { color: '白、パステル', number: '6, 2', day: '金曜日', gem: 'ダイヤモンド', dir: '西' },
        { color: '赤、深紅', number: '9, 1', day: '火曜日', gem: 'サンゴ', dir: '南' },
        { color: '黄色、金色', number: '3, 9', day: '木曜日', gem: 'イエローサファイア', dir: '北東' },
        { color: '紺、黒', number: '8, 4', day: '土曜日', gem: 'ブルーサファイア', dir: '西' },
        { color: '紺、紫', number: '4, 8', day: '土曜日', gem: 'ブルーサファイア', dir: '西' },
        { color: '黄色、金色', number: '3, 7', day: '木曜日', gem: 'イエローサファイア', dir: '北東' }
    ];

    const d = luckyData[lagnaSign];
    const html = `<div class="interp-card">
        <div class="interp-text">
            <strong>🎨 ラッキーカラー:</strong> ${d.color}<br>
            <strong>🔢 ラッキーナンバー:</strong> ${d.number}<br>
            <strong>📅 ラッキー曜日:</strong> ${d.day}<br>
            <strong>💎 ラッキージェム:</strong> ${d.gem}<br>
            <strong>🧭 ラッキー 方向:</strong> ${d.dir}<br>
            <strong>🪐 ラグナ支配惑星:</strong> ${['火星','金星','水星','月','太陽','水星','金星','火星','木星','土星','土星','木星'][lagnaSign]}
        </div>
    </div>`;
    document.getElementById('luckyWrap').innerHTML = html;
}

// ═══════════════════════════════════════════════════
// 治癒 & 強化方法
// ═══════════════════════════════════════════════════
function renderRemedy(positions, lagnaSign) {
    function houseOf(s) { return ((s - lagnaSign + 12) % 12) + 1; }
    const DEBI = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };

    const remedies = {
        Sun: { gem: 'ルビー (Ruby)', mantra: 'Om Suryaya Namaha', color: 'オレンジ/赤を日曜日に着用', food: '小麦、サフラン、ひまわりの種', charity: '日曜日に小麦/銅を寄付' },
        Moon: { gem: '真珠 (Pearl)', mantra: 'Om Chandraya Namaha', color: '白/銀を月曜日に着用', food: '牛乳、米、ココナッツ', charity: '月曜日に米/牛乳を寄付' },
        Mars: { gem: 'サンゴ (Red Coral)', mantra: 'Om Mangalaya Namaha', color: '赤を火曜日に着用', food: 'レンズ豆、赤い果物', charity: '火曜日に赤レンズ豆を寄付' },
        Mercury: { gem: 'エメラルド (Emerald)', mantra: 'Om Budhaya Namaha', color: '緑を水曜日に着用', food: '緑豆、緑の野菜', charity: '水曜日に緑の野菜を寄付' },
        Jupiter: { gem: 'イエローサファイア (Yellow Sapphire)', mantra: 'Om Gurave Namaha', color: '黄色を木曜日に着用', food: 'ひよこ豆、バナナ、ウコン', charity: '木曜日に黄色い食べ物/本を寄付' },
        Venus: { gem: 'ダイヤモンド (Diamond)', mantra: 'Om Shukraya Namaha', color: '白/パステルを金曜日に着用', food: '牛乳、クリーム、果物', charity: '金曜日に白い服/米を寄付' },
        Saturn: { gem: 'ブルーサファイア (Blue Sapphire)', mantra: 'Om Shanaishcharaya Namaha', color: '紺/黒を土曜日に着用', food: '黒豆、ゴマ', charity: '土曜日に黒豆/油を寄付' }
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
                <div class="interp-title">${p.symbol} ${p.name} 強化方法 ${isDebi ? '（減衰状態 — 特に重要！）' : '（弱い位置）'}</div>
                <div class="interp-text">
                    <strong>💎 宝石:</strong> ${r.gem} (薬指に着用推奨)<br>
                    <strong>🙏 マントラ:</strong> "${r.mantra}" (108回毎日唱える)<br>
                    <strong>🎨 色:</strong> ${r.color}<br>
                    <strong>🍽️ 食べ物:</strong> ${r.food}<br>
                    <strong>🤝 慈善:</strong> ${r.charity}
                </div>
            </div>`;
        }
    });

    if (!html) {
        html = '<div class="interp-card"><div class="interp-text">すべての惑星が良好な位置にあります！特別な治癒は必要ありません。ラッキージェムはラグナ支配惑星の宝石を着用すると良いです。</div></div>';
    }

    document.getElementById('remedyWrap').innerHTML = html;
}

// Enter key support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') _loadAstro(calculateChart);
});


// 分割チャート計算
// ═══════════════════════════════════════

function getDivisionalSign(siderealLon, division) {
    const sign = Math.floor(siderealLon / 30);
    const degInSign = siderealLon % 30;
    const partSize = 30 / division;
    const part = Math.floor(degInSign / partSize);

    if (division === 7) {
        // D7: 홀수 사인은 같은 사인부터, 짝수 사인은 7번째 사인부터
        const startSign = (sign % 2 === 0) ? sign : (sign + 6) % 12;
        return (startSign + part) % 12;
    } else if (division === 10) {
        // D10: 홀수 사인은 같은 사인부터, 짝수 사인은 9번째 사인부터
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
        // D2 (ホーラ): 홀수 사인=太陽(獅子座=4), 짝수 사인=月(게=3)
        return (part === 0) ? ((sign % 2 === 0) ? 3 : 4) : ((sign % 2 === 0) ? 4 : 3);
    } else if (division === 3) {
        // D3 (드레카나): 같은 사인, 5번째, 9번째
        const d3starts = [0, 4, 8];
        return (sign + d3starts[part]) % 12;
    } else if (division === 4) {
        // D4 (차투르탐샤): 같은 사인부터 시작
        return (sign + part * 3) % 12;
    } else if (division === 16) {
        // D16 (쇼다샴샤): 牡羊座부터 순서대로
        return (sign + part) % 12;
    } else if (division === 20) {
        // D20 (빔샴샤): 牡羊座부터 (불), 射手座부터 (흙), 獅子座부터 (바람), 게부터 (물)
        const d20start = [0, 8, 4, 3][sign % 4];
        return (d20start + part) % 12;
    } else if (division === 24) {
        // D24 (차투르빔샴샤): 홀수 사인=獅子座, 짝수 사인=게
        const d24start = (sign % 2 === 0) ? 4 : 3;
        return (d24start + part) % 12;
    } else if (division === 27) {
        // D27 (삽타빔샴샤/나크샤트람샤): 불→양, 흙→게, 바람→天秤座, 물→山羊座
        const d27start = [0, 3, 6, 9][sign % 4];
        return (d27start + part) % 12;
    } else if (division === 30) {
        // D30: 特殊規則
        const d30odd = [0, 10, 8, 2, 6]; // 火星、土星、木星、水星、金星
        const d30even = [1, 5, 11, 3, 7]; // 金星、水星、木星、土星、火星
        const d30parts = [5, 5, 8, 7, 5]; // 各部分の度数
        let cumDeg = 0;
        let d30part = 0;
        for (let i = 0; i < 5; i++) {
            cumDeg += d30parts[i];
            if (degInSign < cumDeg) { d30part = i; break; }
        }
        return (sign % 2 === 0) ? d30odd[d30part] : d30even[d30part];
    } else if (division === 40) {
        // D40 (카베담샤): 홀수 사인=牡羊座, 짝수 사인=天秤座
        const d40start = (sign % 2 === 0) ? 0 : 6;
        return (d40start + part) % 12;
    } else if (division === 45) {
        // D45 (악샤베담샤): 불→양, 흙→獅子座, 바람→射手座, 물→같은 패턴 반복
        const d45start = [0, 4, 8, 0][sign % 4];
        return (d45start + part) % 12;
    }
    return (sign + part) % 12; // fallback
}

function renderDivisionalChart(positions, lagnaSidereal, division, chartId, interpId, label, koName) {
    const chartEl = document.getElementById(chartId);
    const interpEl = document.getElementById(interpId);
    if (!chartEl) return;

    // 분할 ラグナ
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
    const RULER_NAMES = {Sun:'太陽',Moon:'月',Mars:'火星',Mercury:'水星',Jupiter:'木星',Venus:'金星',Saturn:'土星',Rahu:'ラーフ',Ketu:'ケートゥ'};

    const isEasy = window.vedicMode === 'easy';
    let html = '';

    if (division === 10) {
        // D10 해석: 직업/커리어
        const d10_1lord = SIGN_RULERS[dLagnaSign];
        const d10_10sign = (dLagnaSign + 9) % 12;
        const d10_10lord = SIGN_RULERS[d10_10sign];
        const d10_10planets = dPositions.filter(p => p.dSign === d10_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💼 職業詳細分析' : '💼 D10 職業分析') + '</div><div class="interp-text">';
        if (isEasy) {
            html += '<strong>あなたの職業性向:</strong><br>';
        } else {
            html += '<strong>D10 ラグナ:</strong> ' + SIGNS[dLagnaSign] + ' (支配星: ' + (RULER_NAMES[d10_1lord]||d10_1lord) + ')<br>';
            html += '<strong>D10 10宮 (職業）:</strong> ' + SIGNS[d10_10sign] + ' (支配星: ' + (RULER_NAMES[d10_10lord]||d10_10lord) + ')<br>';
        }
        if (d10_10planets.length > 0) {
            if (!isEasy) html += '<strong>10宮の惑星:</strong> ' + d10_10planets.map(p => p.name).join(', ') + '<br>';
        }

        // 職業 성향 by D10 ラグナ
        const careerBySign = [
            'リーダーシップ、軍事、スポーツ、起業家',  // 牡羊座
            '金融、芸術、不動産、飲食業',     // 牡牛座
            'コミュニケーション、メディア、教育、IT',  // 双子座
            '看護、不動産、ホテル、カウンセリング',    // 蟹座
            '政治、エンターテインメント、管理、行政',        // 獅子座
            '医療、会計、分析、研究',          // 乙女座
            '法律、外交、デザイン、コンサルティング',      // 天秤座
            '調査、研究、医学、保険',          // 蠍座
            '教育、宗教、貿易、出版',      // 射手座
            '行政、建設、鉱業、公務員',        // 山羊座
            'IT、革新、NGO、航空',           // 水瓶座
            '芸術、病院、海外、霊性'           // 魚座
        ];
        html += '<strong>適性分野:</strong> ' + careerBySign[dLagnaSign];
        html += '</div></div>';

    } else if (division === 7) {
        // D7 해석: 자녀
        const d7_5sign = (dLagnaSign + 4) % 12;
        const d7_5lord = SIGN_RULERS[d7_5sign];
        const d7_5planets = dPositions.filter(p => p.dSign === d7_5sign);
        const benefics = d7_5planets.filter(p => p.natural === 'benefic');
        const malefics = d7_5planets.filter(p => p.natural === 'malefic');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👶 子供分析' : '👶 D7 子供分析') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D7 ラグナ:</strong> ' + SIGNS[dLagnaSign] + '<br>';
            html += '<strong>D7 5宮 (子供）:</strong> ' + SIGNS[d7_5sign] + ' (支配星: ' + (RULER_NAMES[d7_5lord]||d7_5lord) + ')<br>';
        }
        if (d7_5planets.length > 0) {
            if (!isEasy) html += '<strong>5宮の惑星:</strong> ' + d7_5planets.map(p => p.name).join(', ') + '<br>';
        }
        if (benefics.length > 0) html += (isEasy ? '良い惑星が子供の位置にあり 子供の福があります。' : '吉星が 5宮にあり、子供の福があります.') + '<br>';
        if (malefics.length > 0) html += (isEasy ? '挑戦の惑星が子供の位置にあり 子供関連 困難がある可能性があります。' : '凶星が 5宮にあり、子供関連の困難がある可能性があります.') + '<br>';
        if (d7_5planets.length === 0) html += isEasy ? '子供の位置に 惑星がなく 他の要素を総合的に見る必要があります。' : '5宮に惑星がなく、5宮主（支配星）の位置を見る必要があります。';
        html += '</div></div>';

    } else if (division === 12) {
        // D12 해석: 부모
        const d12_4sign = (dLagnaSign + 3) % 12; // 4宮 = 母
        const d12_9sign = (dLagnaSign + 8) % 12; // 9宮 = 父
        const d12_4planets = dPositions.filter(p => p.dSign === d12_4sign);
        const d12_9planets = dPositions.filter(p => p.dSign === d12_9sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨‍👩‍👧 両親分析' : '👨‍👩‍👧 D12 両親分析') + '</div><div class="interp-text">';
        if (!isEasy) {
            if (!isEasy) html += '<strong>D12 ラグナ:</strong> ' + SIGNS[dLagnaSign] + '<br>';
        }
        html += '<strong>' + (isEasy ? '母親' : 'D12 4宮 (母）: ' + SIGNS[d12_4sign]) + '</strong>';
        if (d12_4planets.length > 0 && !isEasy) html += ' — ' + d12_4planets.map(p => p.name).join(', ');
        html += '<br>';
        html += '<strong>' + (isEasy ? '父親' : 'D12 9宮 (父）: ' + SIGNS[d12_9sign]) + '</strong>';
        if (d12_9planets.length > 0 && !isEasy) html += ' — ' + d12_9planets.map(p => p.name).join(', ');
        html += '<br>';

        const moon4 = d12_4planets.find(p => p.id === 'Moon');
        const sun9 = d12_9planets.find(p => p.id === 'Sun');
        if (moon4) html += (isEasy ? '月が 母の位置にあり、母との縁が深いです。' : '月が 4宮にあり、母との縁が深いです.') + '<br>';
        if (sun9) html += (isEasy ? '太陽が 父の位置にあり、父との縁が深いです。' : '太陽が 9宮にあり、父との縁が深いです.') + '<br>';
        html += '</div></div>';

    } else if (division === 60) {
        // D60 解釈: 前世カルマ
        const d60_1lord = SIGN_RULERS[dLagnaSign];
        const d60_planets_1 = dPositions.filter(p => p.dSign === dLagnaSign);

        const D60_DEITIES = [
            {name:'Ghora',ko:'Ghora',nature:'malefic',desc:'破壊と恐怖。前世の暗いカルマ'},
            {name:'Rakshasa',ko:'Rakshasa',nature:'malefic',desc:'悪魔のエネルギー。強い欲望と執着'},
            {name:'Deva',ko:'Deva',nature:'benefic',desc:'神聖な存在。前世の功徳と祝福'},
            {name:'Kubera',ko:'Kubera',nature:'benefic',desc:'富の神。富を築くカルマ'},
            {name:'Yaksha',ko:'Yaksha',nature:'benefic',desc:'自然の守護者。自然との調和'},
            {name:'Kinnara',ko:'Kinnara',nature:'benefic',desc:'天上の音楽家。芸術的才能'},
            {name:'Bhrashta',ko:'Bhrashta',nature:'malefic',desc:'堕落した者。高所からの転落のカルマ'},
            {name:'Kulaghna',ko:'Kulaghna',nature:'malefic',desc:'家門の破壊者。家族関連のカルマ'},
            {name:'Garala',ko:'Garala',nature:'malefic',desc:'毒。毒となる行為のカルマ'},
            {name:'Vahni',ko:'Vahni',nature:'malefic',desc:'火の神。怒りと破壊のカルマ'},
            {name:'Maya',ko:'Maya',nature:'malefic',desc:'幻想。欺瞞のカルマ'},
            {name:'Purishaka',ko:'Purishaka',nature:'malefic',desc:'束縛。他者を拘束したカルマ'},
            {name:'Apampathi',ko:'Apampathi',nature:'benefic',desc:'水の主。浄化と治癒'},
            {name:'Marut',ko:'Marut',nature:'benefic',desc:'風の神。自由と変化'},
            {name:'Kala',ko:'Kala',nature:'malefic',desc:'時間の神。時間と死のカルマ'},
            {name:'Sarpa',ko:'Sarpa',nature:'malefic',desc:'蛇。束縛と執着 — 手放せないカルマ'},
            {name:'Amrita',ko:'Amrita',nature:'benefic',desc:'不死の甘露。永遠の命の追求'},
            {name:'Indu',ko:'Indu',nature:'benefic',desc:'月。感性と直感'},
            {name:'Mridu',ko:'Mridu',nature:'benefic',desc:'柔らかい者。温和さと慈悲'},
            {name:'Komala',ko:'Komala',nature:'benefic',desc:'繊細な者。芸術と美'},
            {name:'Heramba',ko:'Heramba',nature:'benefic',desc:'ガネーシャの化身。障害を克服'},
            {name:'Brahma',ko:'Brahma',nature:'benefic',desc:'創造の神。創造と知識'},
            {name:'Vishnu',ko:'Vishnu',nature:'benefic',desc:'維持の神。保護と秩序'},
            {name:'Maheshwara',ko:'Maheshwara',nature:'benefic',desc:'偉大なるシヴァ。変革と解脱'},
            {name:'Deva2',ko:'Deva2',nature:'benefic',desc:'聖人。霊的修行'},
            {name:'Bala',ko:'Bala',nature:'benefic',desc:'力。強靭さと勇気'},
            {name:'Vishwakarma',ko:'Vishwakarma',nature:'benefic',desc:'宇宙の建築家。建設と創造'},
            {name:'Tamasa',ko:'Tamasa',nature:'malefic',desc:'闇。無知のカルマ'},
            {name:'Kanchana',ko:'Kanchana',nature:'benefic',desc:'黄金。純粋さと価値'},
            {name:'Varaha',ko:'Varaha',nature:'benefic',desc:'ヴィシュヌの猪の化身。救済'},
            {name:'Ramasala',ko:'Ramasala',nature:'benefic',desc:'ラーマの住処。道徳と義務'},
            {name:'Ghrisha',ko:'Ghrisha',nature:'benefic',desc:'輝く者。知恵と悟り'},
            {name:'Indra',ko:'Indra',nature:'benefic',desc:'神々の王。指導力'},
            {name:'Jala',ko:'Jala',nature:'benefic',desc:'水。流れと適応'},
            {name:'Vishwa',ko:'Vishwa',nature:'benefic',desc:'宇宙。普遍的な愛'},
            {name:'Amara',ko:'Amara',nature:'benefic',desc:'不滅。永遠の追求'},
            {name:'Bala2',ko:'Bala2',nature:'malefic',desc:'若い力。未熟な力の使用'},
            {name:'Pitri',ko:'Pitri',nature:'malefic',desc:'祖先。祖先のカルマ'},
            {name:'Rudra',ko:'Rudra',nature:'malefic',desc:'嵐の神。破壊的変革'},
            {name:'Varuna',ko:'Varuna',nature:'benefic',desc:'海の神。宇宙の秩序'},
            {name:'Aryama',ko:'Aryama',nature:'benefic',desc:'太陽の守護神. Friendship and contracts'},
            {name:'Mitra',ko:'Mitra',nature:'benefic',desc:'友情の神。信頼と仲間'},
            {name:'Agni',ko:'Agni',nature:'malefic',desc:'火の神。浄化の炎'},
            {name:'Varuna2',ko:'Varuna2',nature:'benefic',desc:'海の神。深い知恵'},
            {name:'Gauri',ko:'Gauri',nature:'benefic',desc:'パールヴァティー。献身と愛'},
            {name:'Mahakala',ko:'Mahakala',nature:'malefic',desc:'偉大な時間。時間を支配しようとしたカルマ'},
            {name:'Pitamaha',ko:'Pitamaha',nature:'benefic',desc:'偉大な父ブラフマー。創造者'},
            {name:'Kartikeya',ko:'Kartikeya',nature:'benefic',desc:'戦争の神。正義の戦い'},
            {name:'Yama',ko:'Yama',nature:'malefic',desc:'死の神。審判と正義'},
            {name:'Kala2',ko:'Kala2',nature:'malefic',desc:'時間。時間に追われるカルマ'},
            {name:'Varuna3',ko:'Varuna3',nature:'benefic',desc:'海の神。法と真実'},
            {name:'Kubera2',ko:'Kubera2',nature:'benefic',desc:'富の神。寛大さ'},
            {name:'Aditya',ko:'Aditya',nature:'benefic',desc:'太陽神。光と真理'},
            {name:'Rishi',ko:'Rishi',nature:'benefic',desc:'聖者。知恵と修行'},
            {name:'Vasu',ko:'Vasu',nature:'benefic',desc:'天上の存在。自然を治める'},
            {name:'Ashwini',ko:'Ashwini',nature:'benefic',desc:'双子の治癒者。治癒'},
            {name:'Naga',ko:'Naga',nature:'malefic',desc:'蛇の神。神秘と秘密'},
            {name:'Gandharva',ko:'Gandharva',nature:'benefic',desc:'天上の音楽家。芸術と音楽'},
            {name:'Prajapati',ko:'Prajapati',nature:'benefic',desc:'創造主。生命の創造'},
            {name:'Charachara',ko:'Charachara',nature:'benefic',desc:'万物。全てと一つであったカルマ'}
        ];

        // サブチャプターヘルパー
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
            '戦士、指導者 — 権力を行使した前世。リーダーシップと決断力が魂に刻まれています。',
            '芸術家、農夫 — 自然と共に生きた前世。安定と物質的美への深い本能。',
            '学者、商人 — 知識で生きた前世。多才さと好奇心が残る。言語の才能。',
            '保護者、養育者 — 他者を世話した前世。深い感受性と母性本能。家庭のカルマ。',
            '王族、聖職者 — 高い地位にいた前世。自然な権威と尊厳。舞台に立つのが魂の本能。',
            '治癒者、奉仕者 — 医術や奉仕に従事した前世。優れた分析力。他者を助けるのが魂の本分。',
            '外交官、芸術家 — 調和と美を追求した前世。関係に長ける。パートナーシップが核心テーマ。',
            '修行者、錬金術師 — 深い変革を経た前世。秘密と神秘への強い引力。',
            '賢者、探検家 — 真理を追求した前世。霊的知恵と冒険心が残る。高等教育のカルマ。',
            '官僚、建築家 — 秩序を築いた前世。強い忍耐と責任感。規律が魂に刻まれる。',
            '官僚、秩序の守護者 — 社会秩序を築いた前世。組織力と奉仕精神。土星の支配。',
            '霊媒、芸術家 — 霊的世界と交流した前世。極めて強い直感。解脱に最も近い魂。'
        ];

        // 惑星別D60サイン解釈
        const d60PlanetInSign = {
            Sun: ['前世で戦士や王として生き、強い自我と指導力が今世にも残っています。権威を打ち立てようとする魂の目的があります。','前世で芸術家や裕福な人として生き、物質的豊かさを追求する魂です。感覚的な美に惹かれます。','前世で学者や商人として生き、知識とコミュニケーションが魂の核心テーマです。','前世で保護者や養育者として生き、他者を世話することが魂の深い本能です。','前世で王族や聖職者として高い地位にあり、今世でも自然な権威を持ちます。','前世で治癒者や奉仕者として生き、分析と奉仕が魂の目的です。','前世で外交官や芸術家として調和を追求し、関係とバランスが魂の課題です。','前世で修行者や錬金術師として深い変革を経験し、秘密と変革が魂に刻まれています。','前世で賢者や探検家として真理を追求し、知恵と冒険が魂の 方向です。','前世で官僚や建築家として秩序を立て、体系と責任が魂に刻まれています。','前世で革命家や発明家として時代を先取りし、独創的思考が魂の特性です。','前世で霊媒や芸術家として霊的世界と交流し、深い直感が魂に残っています。'],
            Moon: ['前世の感情的記憶が炎のように強烈です。怒りと情熱が無意識に刻まれており、今世で感情を治めることが課題です。','前世の感情的記憶が温かく安定的です。豊かさと安定の中で生きた記憶が無意識に残り、美しいものを探します。','前世の感情的記憶が知的で多彩です。様々な経験の記憶が残り、好奇心が強いです。','前世の感情的記憶が非常に深いです。家庭と世話の記憶が強く残り、感受性が豊かです。','前世の感情的記憶が自負心と尊厳で満ちています。認められ尊敬された記憶が残っています。','前世の感情的記憶が奉仕と分析に関連します。誰かを助けた記憶が残り、繊細な心を持ちます。','前世の感情的記憶が調和と関係に関連します。美しい関係の記憶が残り、パートナーを探します。','前世の感情的記憶が深く強烈です。劇的な変化を経験した記憶が残り、感情の深さが海のようです。','前世の感情的記憶が自由と探求に関連します。旅行し学んだ記憶が残り、拡張を追求します。','前世の感情的記憶が責任と忍耐に関連します。重い荷を背負った記憶が残り、成熟した感情を持ちます。','前世の感情的記憶が独特で非凡です。他の人と違った記憶が残り、独立的な感性を持ちます。','前世の感情的記憶が霊的で超越的です。夢とビジョンが鮮明で、霊的世界との繋がりが深いです。']
        };

        // 神計算ヘルパー
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
            return ' — 守護神: <strong>' + d.deity.name + '</strong>(' + d.deity.ko + ') <span style="color:' + c + ';font-weight:700;">' + (d.deity.nature === 'benefic' ? '吉(吉)' : '凶(凶)') + '</span>';
        }

        const houseThemes = ['','自我/存在','財/価値','コミュニケーション/学習','家庭/安息','創造/愛','奉仕/試練','関係/パートナー','変革/秘密','知恵/宗教','社会/職業','願望/利益','解放/超越'];

        // パラーシャラ引用
        if (!isEasy) {
            html += '<div class="interp-card" style="border-left:3px solid #8b7ec8;"><div class="interp-text" style="font-size:13px;color:#888;">';
            html += '📜 <strong>パラーシャラ 曰:</strong> "シャシュティアムシャ(D60)は全ての分割チャートの中で最も重要である。吉神(吉神) 分割の惑星は良い結果を、凶神(凶神) 分割の惑星は悪い結果を与える。"<br>';
            html += '<span style="color:#666;">— ブリハット・パラーシャラ・ホーラ・シャーストラ(BPHS)</span></div></div>';
        }

        // ─── Ch1: 魂の正体 ───
        const lagnaD = getDeity(lagnaSidereal);
        let ch1 = isEasy
            ? '<strong>前世の正体</strong>' + deityTag(lagnaD) + '<br><br>'
            : '<strong>D60 ラグナ: ' + SIGNS[dLagnaSign] + ' ' + SIGN_SYMBOLS[dLagnaSign] + '</strong> (支配星: ' + (RULER_NAMES[d60_1lord]||d60_1lord) + ')' + deityTag(lagnaD) + '<br><br>';
        ch1 += pastLifeThemes[dLagnaSign] + '<br>';
        if (lagnaD.deity) {
            ch1 += '<br>' + (isEasy ?
                (lagnaD.deity.nature === 'benefic' ?
                    '前世で多くの善行を積んだため、今世でも自然と良い機会が訪れます。あなたの存在そのものが守られています。' :
                    '前世から解決していない課題が残っています。性格と運命に影響しますが、乗り越えれば更に大きな成長が待っています。') :
                (lagnaD.deity.nature === 'benefic' ?
                    '<strong>' + lagnaD.deity.ko + '</strong>がラグナを守護します。 ' + lagnaD.deity.desc + ' — 前世の功徳が今世全体を守り、人生で自然と良い機会が訪れます。' :
                    '<strong>' + lagnaD.deity.ko + '</strong>がラグナに影響を与えます。 ' + lagnaD.deity.desc + ' — このカルマ的挑戦が今世の性格と運命に刻まれていますが、 克服すればより大きな成長が待っています.'));
        }
        if (d60_planets_1.length > 0) ch1 += '<br><br>' + d60_planets_1.map(p => p.name).join(', ') + (isEasy ? 'が前世の核心位置にあります — 前世のカルマがこの惑星に集中しています。' : 'がD60ラグナに位置 — 前世の核心カルマがこの惑星に集中しています。');
        html += subChapter('🪐', '魂の正体 — 前世での姿', ch1);

        // ─── Ch2: 魂の目的 ───
        const sunD60 = dPositions.find(p => p.id === 'Sun');
        if (sunD60) {
            const sunD = getDeity(sunD60.sidereal);
            let ch2 = (isEasy ? '<strong>太陽の前世の記憶</strong>' : '<strong>D60 太陽: ' + SIGNS[sunD60.dSign] + ' ' + SIGN_SYMBOLS[sunD60.dSign] + '</strong>') + deityTag(sunD) + '<br><br>';
            ch2 += (d60PlanetInSign.Sun[sunD60.dSign] || '') + '<br>';
            if (sunD.deity) {
                ch2 += '<br>' + (isEasy ?
                    (sunD.deity.nature === 'benefic' ?
                        '前世で「自分は誰か」を正しく追求したため、今世でもやりたいことを見つけて実現するのが自然にできます。自信を持って大丈夫！' :
                        '前世で「自分は誰か」について混乱がありました。本当の自分を見つけていく過程が重要な課題です。でもその過程自体があなたを成長させます。') :
                    (sunD.deity.nature === 'benefic' ?
                        '太陽の 守護神 <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. 前世で魂の目的を正しく追求し、今世でも自己実現が自然に行われます。' :
                        '太陽の 守護神 <strong>' + sunD.deity.ko + '</strong>: ' + sunD.deity.desc + '. 前世で自我と権威に対する挑戦があり、今世で真の自我を見つけることが魂の 課題です。'));
            }
            html += subChapter('☉', '魂の目的 — なぜ生まれたのか', ch2);
        }

        // ─── Ch3: 感情の記憶 ───
        const moonD60 = dPositions.find(p => p.id === 'Moon');
        if (moonD60) {
            const moonD = getDeity(moonD60.sidereal);
            let ch3 = (isEasy ? '<strong>月の前世の記憶</strong>' : '<strong>D60 月: ' + SIGNS[moonD60.dSign] + ' ' + SIGN_SYMBOLS[moonD60.dSign] + '</strong>') + deityTag(moonD) + '<br><br>';
            ch3 += (d60PlanetInSign.Moon[moonD60.dSign] || '') + '<br>';
            if (moonD.deity) {
                ch3 += '<br>' + (isEasy ?
                    (moonD.deity.nature === 'benefic' ?
                        '前世で心が穏やかだったため、今世でも感情的に安定していて直感が強いです。感覚を信じて大丈夫 — ほとんど当たります。' :
                        '前世の感情的な辛い経験の痕跡が心の奥に残っています。理由のない不安や、特定の状況で感情が急に高まるのはこのためかもしれません。瞑想や水辺での休息が心の癒しに大いに役立ちます。') :
                    (moonD.deity.nature === 'benefic' ?
                        '月の 守護神 <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. 前世で心が平和であり、今世でも感情的安定感と強い直感を持って生まれました。' :
                        '月の 守護神 <strong>' + moonD.deity.ko + '</strong>: ' + moonD.deity.desc + '. 前世の感情的傷が無意識に残っています。このパターンを認識し治癒することが今世の 感情的課題です。瞑想と水辺での休息が助けになります。'));
            }
            html += subChapter('☽', '感情の記憶 — 無意識のパターン', ch3);
        }

        // ─── Ch4: 配偶者カルマ ───
        const d60H7sign = (dLagnaSign + 6) % 12;
        const d60H7lord = SIGN_RULERS[d60H7sign];
        const d60H7planets = dPositions.filter(p => p.dSign === d60H7sign);
        const venusD60 = dPositions.find(p => p.id === 'Venus');
        const jupD60 = dPositions.find(p => p.id === 'Jupiter');
        const rahuD60 = dPositions.find(p => p.id === 'Rahu');
        const ketuD60 = dPositions.find(p => p.id === 'Ketu');

        const spouseKarmaBySign = [
            '前世で戦士/リーダーとの縁。強烈で独立的な配偶者カルマ。前世で共に戦った魂。',
            '前世で芸術家/裕福な人との縁。物質的に豊かな結婚カルマ。前世で共に美を追求した魂。',
            '前世で学者/商人との縁。コミュニケーションと知的交感の結婚カルマ。前世で共に学んだ魂。',
            '前世で家族/保護者との縁。深い感情的絆の結婚カルマ。前世で互いに世話をした魂。',
            '前世で王族/貴族との縁。華やかで尊敬される結婚カルマ。前世で共に治めた魂。',
            '前世で治癒者/奉仕者との縁。奉仕と献身の結婚カルマ。前世で共に他者を助けた魂。',
            '前世で外交官/芸術家との縁。調和的で美しい結婚カルマ。前世で共にバランスを追求した魂。',
            '前世で修行者/神秘主義者との縁。強烈で変革的な結婚カルマ。前世で生死を共にした魂。',
            '前世で賢者/探検家との縁。自由で拡張的な結婚カルマ。前世で共に真理を探求した魂。外国人配偶者の可能性。',
            '前世で官僚/建築家との縁。責任感のある安定的な結婚カルマ。前世で共に秩序を立てた魂。遅い結婚の可能性。',
            '前世で官僚/軍人との縁。責任感と規律の配偶者カルマ。前世で共に社会的義務を果たした魂。結婚がやや遅い可能性。',
            '前世で霊媒/芸術家との縁。神秘的で霊的な結婚カルマ。前世で共に霊的修行をした魂。夢で先に出会う可能性。'
        ];

        let ch4 = (isEasy
            ? '<strong>配偶者との前世の縁</strong><br><br>'
            : '<strong>D60 7宮 (配偶者）: ' + SIGNS[d60H7sign] + ' ' + SIGN_SYMBOLS[d60H7sign] + '</strong> (7宮主: ' + (RULER_NAMES[d60H7lord]||d60H7lord) + ')<br><br>');
        ch4 += spouseKarmaBySign[d60H7sign] + '<br>';

        if (d60H7planets.length > 0) {
            ch4 += '<br><strong>' + (isEasy ? '配偶者の位置の惑星:' : 'D60 7宮の惑星:') + '</strong><br>';
            d60H7planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (isEasy) {
                    ch4 += (p.natural === 'benefic'
                        ? '前世で配偶者と良い縁を結び、今世でも配偶者から祝福を受けます。'
                        : '前世で配偶者と解決できなかった課題があり、今世でこれを解いていきます。挑戦ですが成長の機会です。') + '<br>';
                } else {
                    ch4 += p.symbol + ' <strong>' + p.name + '</strong>' + deityTag(pD) + '<br>';
                    ch4 += (p.natural === 'benefic'
                        ? '吉星が7宮に位置 — 前世で配偶者と良いカルマを積み、今世でも配偶者から祝福を受けます。'
                        : '凶星が7宮に位置 — 前世で配偶者と解決できなかったカルマがあり、今世でこれを精算します。挑戦ですが成長の機会です。') + '<br>';
                }
            });
        }

        // 金星（愛のカルマ）
        if (venusD60) {
            const venD = getDeity(venusD60.sidereal);
            const venH = ((venusD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (isEasy) {
                ch4 += '<br>' + (venD.deity && venD.deity.nature === 'benefic' ?
                    '前世で真心を込めて愛したため、今世でも美しい愛が待っています。' :
                    '前世で愛に関して解決できなかった課題があります。今世で本当の愛とは何かを学んでいく過程が重要です。その過程があなたをより深い人にします。');
            } else {
                ch4 += '<br><strong>♀ 金星（愛の惑星）</strong> → D60 ' + venH + '宮（' + houseThemes[venH] + ')' + deityTag(venD) + '<br>';
                ch4 += venD.deity && venD.deity.nature === 'benefic' ?
                    '金星が吉神 <strong>' + venD.deity.ko + '</strong>の保護の下にあります。 前世で愛を正しく実践し、今世でも美しい愛が待っています. ' + venD.deity.desc :
                    '金星が凶神 <strong>' + (venD.deity?venD.deity.ko:'') + '</strong>の影響の下にあります。 前世で愛に対する挑戦があり、今世で真の愛の意味を学ぶことが課題です. ' + (venD.deity?venD.deity.desc:'');
            }
        }

        // ラーフ-ケートゥ軸
        if (rahuD60 && ketuD60) {
            const rahuH = ((rahuD60.dSign - dLagnaSign + 12) % 12) + 1;
            const ketuH = ((ketuD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (rahuH === 7 || ketuH === 7 || rahuH === 1 || ketuH === 1) {
                ch4 += isEasy
                    ? '<br><br>🔥 <strong>非常に強い前世の縁!</strong> 配偶者と前世で深い繋がりがあり、今世でも運命的に出会います。'
                    : '<br><br>🔥 <strong>ラーフ-ケートゥ軸が D60 1-7宮ライン!</strong> これは配偶者との <strong>非常に強い前世の縁</strong>を表します。 前世で深いカルマ的繋がりがあり、今世でも運命的に出会います。';
            }
        }

        // 7宮主のD60位置
        const h7lordPlanet = dPositions.find(p => p.id === d60H7lord);
        if (h7lordPlanet) {
            const h7lH = ((h7lordPlanet.dSign - dLagnaSign + 12) % 12) + 1;
            const h7lD = getDeity(h7lordPlanet.sidereal);
            if (isEasy) {
                const h7lDesc = h7lH === 1 ? '配偶者があなた自身の成長に直結します。' : h7lH === 4 ? '家庭と安息処を通じて配偶者と出会います。' : h7lH === 9 ? '海外や教育を通じて配偶者と縁が続きます。' : h7lH === 10 ? '職業や社会活動を通じて配偶者の縁が続きます。' : h7lH === 12 ? '海外や霊的な環境で配偶者と出会います。' : '';
                if (h7lDesc) ch4 += '<br><br>' + h7lDesc;
            } else {
                ch4 += '<br><br><strong>7宮主 ' + (RULER_NAMES[d60H7lord]||d60H7lord) + '</strong> → D60 ' + h7lH + '宮（' + houseThemes[h7lH] + ')' + deityTag(h7lD) + '<br>';
                ch4 += '配偶者とのカルマ的繋がりが<strong>' + houseThemes[h7lH] + '</strong>領域を通じて発現されます。';
                ch4 += h7lH === 1 ? '配偶者があなた自身の成長に直結します。' : h7lH === 4 ? '家庭と安息処を通じて配偶者と出会います。' : h7lH === 9 ? '海外や宗教/教育を通じて配偶者と縁が続きます。' : h7lH === 10 ? '職業/社会活動を通じて配偶者の縁が続きます。' : h7lH === 12 ? '海外や霊的環境で配偶者と出会うカルマです。' : '';
            }
        }
        html += subChapter('💍', '配偶者カルマ — 前世の縁', ch4);

        // ─── Ch5: 職業カルマ ───
        const d60H10sign = (dLagnaSign + 9) % 12;
        const d60H10lord = SIGN_RULERS[d60H10sign];
        const d60H10planets = dPositions.filter(p => p.dSign === d60H10sign);
        const satD60 = dPositions.find(p => p.id === 'Saturn');
        const careerKarma = ['軍事/リーダーシップ/スポーツ','金融/芸術/農業','教育/メディア/商業','看護/不動産/ホテル','政治/芸能/管理','医療/分析/奉仕','法律/外交/デザイン','研究/捜査/医学','教育/宗教/海外','行政/建設/公務員','技術/科学/革新','芸術/霊性/病院'][d60H10sign];

        let ch5 = (isEasy
            ? '<strong>前世の職業カルマ</strong><br><br>'
            : '<strong>D60 10宮 (職業）: ' + SIGNS[d60H10sign] + ' ' + SIGN_SYMBOLS[d60H10sign] + '</strong> (10宮主: ' + (RULER_NAMES[d60H10lord]||d60H10lord) + ')<br><br>');
        ch5 += '前世の職業的カルマが<strong>' + careerKarma + '</strong>方向に刻まれています。今世でもこの分野に自然な引きつけがあります。<br>';
        if (satD60) {
            const satD = getDeity(satD60.sidereal);
            const satH = ((satD60.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) ch5 += '<br><strong>♄ 土星（カルマの主）</strong> → D60 ' + satH + '宮（' + houseThemes[satH] + ')' + deityTag(satD) + '<br>';
            ch5 += isEasy ?
                ('<br>' + (satD.deity && satD.deity.nature === 'benefic' ?
                    'これは<strong>非常にまれな祝福</strong>です！前世で辛いことを耐え忍んだおかげで、今世では仕事上の大きな試練が軽減されます。' :
                    '仕事に関して前世からの<strong>重い課題</strong>があります。仕事で困難を経験するかもしれませんが、地道な努力と他人を助けることがこの課題を解く鍵です。')) :
                (satD.deity && satD.deity.nature === 'benefic' ?
                    '土星が吉神 の下にあることは <strong>非常にまれな祝福</strong>です! 前世で苦痛を忍耐で昇華させた功徳が今世の職業的 試練を軽減します.' :
                    '土星が凶神の下にあり、職業的領域で<strong>前世の重いカルマ</strong>があります。' + (satD.deity?satD.deity.desc:'') + '。忍耐と奉仕、マントラ(Om Shanaishcharaya Namaha)でこのカルマを溶かしてください。');
        }
        if (d60H10planets.length > 0) {
            ch5 += '<br><br><strong>' + (isEasy ? '職業の位置の惑星:' : 'D60 10宮の惑星:') + '</strong> ' + d60H10planets.map(p => p.name).join(', ') + ' — 職業的カルマがこの惑星に集中しています。';
        }
        html += subChapter('💼', '職業カルマ — 前世の使命', ch5);

        // ─── Ch6: 財カルマ ───
        const d60H2sign = (dLagnaSign + 1) % 12;
        const d60H2planets = dPositions.filter(p => p.dSign === d60H2sign);
        let ch6 = (isEasy
            ? '<strong>前世の財カルマ</strong><br><br>'
            : '<strong>D60 2宮 (財）: ' + SIGNS[d60H2sign] + ' ' + SIGN_SYMBOLS[d60H2sign] + '</strong><br><br>');
        const wealthKarma = ['自力型の財運本能。','豊かな環境の前世。','知的な富の構築。','家族/不動産の財。','権威を通じた財。','奉仕を通じた財。倹約。','パートナーシップの財。','他者の財（遺産）。','幸運がもたらす財。海外。','遅いが確実。中年以降裕福。','革新の財。非伝統的。','霊的活動と財。寄付の傾向。'][d60H2sign];
        ch6 += wealthKarma + '<br>';
        if (d60H2planets.length > 0) {
            ch6 += isEasy ? '<br>' : '<br><strong>D60 2宮の惑星:</strong><br>';
            d60H2planets.forEach(p => {
                const pD = getDeity(p.sidereal);
                ch6 += (isEasy ? '' : p.symbol + ' ' + p.name + deityTag(pD) + ' — ') + (p.natural === 'benefic' ? '前世で財に対する良い縁があり、今世でも豊かです。' : '前世で財に関する課題があります。地道な努力で克服できます。') + '<br>';
            });
        }
        html += subChapter('💰', '財カルマ — 前世の富', ch6);

        // ─── Ch7: 惑星別神リスト ───
        if (!isEasy) {
            let ch7 = '';
            const lagnaD2 = getDeity(lagnaSidereal);
            if (lagnaD2.deity) {
                const lc = lagnaD2.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                ch7 += '<div style="padding:4px 0;">⬆ ラグナ → <strong>' + lagnaD2.deity.name + '</strong>(' + lagnaD2.deity.ko + ') <span style="color:' + lc + ';">' + (lagnaD2.deity.nature === 'benefic' ? '吉' : '凶') + '</span></div>';
            }
            positions.forEach(p => {
                const pD = getDeity(p.sidereal);
                if (pD.deity) {
                    const c = pD.deity.nature === 'benefic' ? '#5cb85c' : '#d9534f';
                    ch7 += '<div style="padding:4px 0;">' + p.symbol + ' ' + p.name + ' → <strong>' + pD.deity.name + '</strong>(' + pD.deity.ko + ') <span style="color:' + c + ';">' + (pD.deity.nature === 'benefic' ? '吉' : '凶') + '</span></div>';
                }
            });
            html += subChapter('🕉️', '惑星別守護神リスト', ch7);
        }

        // ─── Ch8: 総合カルマ判断 ───
        const beneficCount = positions.filter(p => {
            const pD = getDeity(p.sidereal);
            return pD.deity && pD.deity.nature === 'benefic';
        }).length;
        const maleficPlanets = positions.filter(p => {
            const pD = getDeity(p.sidereal);
            return pD.deity && pD.deity.nature === 'malefic';
        });

        let ch8 = isEasy ?
            '9つの惑星中<strong style="color:#5cb85c">' + beneficCount + 'つ良いエネルギー</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + 'つ注意エネルギー</strong><br><br>' :
            '9つの惑星中<strong style="color:#5cb85c">' + beneficCount + 'つ吉神</strong>, <strong style="color:#d9534f">' + (positions.length - beneficCount) + 'つ凶神</strong> 配置<br><br>';
        if (beneficCount >= 7) {
            ch8 += isEasy ?
                '🌟 <strong>前世で本当にたくさんの善行を積みました!</strong> ほぼすべての惑星が良いエネルギーの下にあり, 今世で自然と良い結果を得ます。生まれ持った幸運が強い方です.' :
                '🌟 <strong>非常に強い前世の功徳。</strong> パラーシャラはこのようなチャートを "神々の祝福を受けた魂"と言いました. ほとんどの惑星が吉神の下にあり、今世で自然と良い結果を得ます。';
        } else if (beneficCount >= 5) {
            ch8 += isEasy ?
                '✨ <strong>前世から蓄えた良いエネルギーが豊富です.</strong> 人生の多くの領域で守られています.' :
                '✨ <strong>前世の功徳が豊富です.</strong> 吉神が優勢で人生の多くの領域で守られています.';
            if (maleficPlanets.length > 0) ch8 += isEasy ?
                ' ただし一部の領域ではもう少し努力が必要です。' :
                ' ただし <strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>の領域でカルマ的挑戦があるため、該当惑星のマントラと慈善を実践してください。';
        } else if (beneficCount >= 3) {
            ch8 += isEasy ?
                '⚖️ <strong>良いエネルギーと挑戦のエネルギーが半々です.</strong> 人生で良いことと困難が交互に訪れます.' :
                '⚖️ <strong>前世カルマの均衡状態.</strong> 吉凶が混ざり良いことと挑戦が交差します.';
            if (maleficPlanets.length > 0) ch8 += '<br>' + (isEasy ? '特に注意すべき惑星: ' : '注意すべき惑星: ') + '<strong>' + maleficPlanets.map(p => p.name).join(', ') + '</strong>';
        } else {
            ch8 += isEasy ?
                '🔥 <strong>今世は前世の課題を解くために来ました。</strong> 挑戦が多いですが、 最も重い課題を受けた人が最も大きく成長します. 地道な努力と他人を助けることが特に重要です。' :
                '🔥 <strong>カルマ精算の生.</strong> 前世から多くの挑戦を持ってきましたが、パラーシャラは "最も重いカルマを持つ魂が最も大きく成長する"と言いました。マントラ修行と慈善が特に重要です.';
        }
        html += subChapter('📊', '総合カルマ判断', ch8);

        // (이전 코드 제거됨 - 신 목록과 해석은 위 소챕터에 통합)

    } else if (division === 2) {
        // D2 ホーラ — 재물·부の 축적
        const d2LagnaInterp = ['自力で財を築く。独立的で積極的な投資。','感覚的投資と安定した財運。不動産、飲食、芸術収入。','知的活動で稼ぐ。執筆、教育、ビジネスセンス。','不動産と家族収入。母からの財産。感情的支出に注意。','リーダーシップと権威で財を築く。政府、金関連。見栄の支出。','分析力と技術で収入。医療、会計、サービス業。倹約家。','パートナーシップで財を築く。法律、外交、ファッション。','他人のお金（遺産、保険、投資）で富を築く。隠れた財源。','教育、海外、宗教を通じた収入。幸運が財をもたらす。','体系的な努力で財を築く。遅いが確実。中年以降裕福。','技術、革新、ネットワークで収入。非伝統的な財源。','霊的・芸術的活動で収入。海外関連の財。寄付の傾向。'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💰 財と富の詳細分析' : '💰 D2 ホーラ — 財と富の分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D2 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d2LagnaInterp + '<br><br>';

        const sunD2 = dPositions.find(p => p.id === 'Sun');
        const moonD2 = dPositions.find(p => p.id === 'Moon');
        const jupD2 = dPositions.find(p => p.id === 'Jupiter');
        const venD2 = dPositions.find(p => p.id === 'Venus');

        if (sunD2) {
            const sunInOwn = sunD2.dSign === 4; // Leo
            html += (isEasy ? '' : '<strong>☉ 太陽 → ' + SIGNS[sunD2.dSign] + ':</strong> ') + (sunInOwn ? (isEasy ? '🌟 <strong>自立型！</strong> 権威とリーダーシップで自ら富を築く。' : '🌟 <strong>太陽が自分のホーラ（獅子座）！</strong> 自立型。権威とリーダーシップで自ら富を築く。') : (isEasy ? '他者の助けや政府/公共部門を通じた収入。' : '太陽が月のホーラ。他者の助けや政府/公共部門を通じた収入。')) + '<br>';
        }
        if (moonD2) {
            const moonInOwn = moonD2.dSign === 3; // Cancer
            html += (isEasy ? '' : '<strong>☽ 月 → ' + SIGNS[moonD2.dSign] + ':</strong> ') + (moonInOwn ? (isEasy ? '🌟 <strong>大衆と関係を通じて豊かな生活！</strong>' : '🌟 <strong>月が自分のホーラ（蟹座）！</strong> 大衆と関係を通じて豊かな生活。') : (isEasy ? '自分の努力と独立的活動で生計。' : '月が太陽のホーラ。自分の努力と独立的活動で生計。')) + '<br>';
        }
        if (jupD2) html += (isEasy ? '' : '<strong>♃ 木星 → ' + SIGNS[jupD2.dSign] + ':</strong> ') + (isEasy ? (jupD2.dSign === 4 ? '自分の能力で大きな富を築けます。' : '他者と関係を通じた豊かさ。') : '木星が' + (jupD2.dSign === 4 ? '太陽ホーラ — 自分の能力で大きな富。' : '月ホーラ — 他者と関係を通じた豊かさ。')) + '<br>';
        if (venD2) html += (isEasy ? '' : '<strong>♀ 金星 → ' + SIGNS[venD2.dSign] + ':</strong> ') + (isEasy ? (venD2.dSign === 4 ? '芸術/贅沢品で自立。' : '配偶者やパートナーを通じた財。') : '金星が' + (venD2.dSign === 4 ? '太陽ホーラ — 芸術/贅沢品で自立。' : '月ホーラ — 配偶者やパートナーを通じた財。')) + '<br>';

        // D2 2궁(축적된 부) 분석
        const d2H2sign = (dLagnaSign + 1) % 12;
        const d2H2planets = dPositions.filter(p => p.dSign === d2H2sign);
        html += '<br><strong>' + (isEasy ? '蓄積された富:' : 'D2 2宮（蓄積された富）— ' + SIGNS[d2H2sign] + ':') + '</strong><br>';
        if (d2H2planets.length > 0) {
            d2H2planets.forEach(p => {
                const wealth = {Sun:'権威と地位を通じた財産',Moon:'大衆的活動を通じた財産',Mars:'不動産、技術、競争分野',Mercury:'ビジネス、知的活動、通信',Jupiter:'教育、法律、宗教 — 豊かな財産',Venus:'芸術、ファッション、高級品',Saturn:'ゆっくりだが着実な蓄積。中年以降安定',Rahu:'非伝統的方法、海外関連',Ketu:'物質から離れる。霊的価値を追求'};
                html += isEasy ? (wealth[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (wealth[p.id]||'') + '<br>';
            });
        } else {
            html += isEasy ? '着実に財が貯まるタイプです。<br>' : '2宮に惑星なし — 2宮主の位置が財の蓄積の鍵.<br>';
        }
        html += '</div></div>';

    } else if (division === 3) {
        // D3 드레카나 — 兄弟·용기·소통
        const d3LagnaInterp = ['独立的、兄弟姉妹の中でリーダー。勇敢なコミュニケーション。','安定的で物質的に豊かな兄弟関係。芸術的な兄弟の可能性。','知的でコミュニケーション豊かな兄弟。多くの兄弟か会話が多い。','感情的に深い兄弟の絆。母性的な兄弟。保護的。','カリスマ的で誇り高い兄弟。有名か成功した兄弟。','分析的で実用的な兄弟。医療・教育分野。批判的な面も。','外交的で魅力的な兄弟。兄弟を通じた社交的つながり。','強烈で秘密の多い兄弟関係。対立後の深い絆。','自由で哲学的な兄弟。海外の兄弟。宗教・教育関連。','責任感と野心のある兄弟。義務感。兄弟が少ないか真剣な関係。','ユニークで独立的な兄弟。非伝統的な兄弟関係。','霊的で芸術的な兄弟。海外の兄弟。感情的なつながり。'][dLagnaSign];

        const d3_3sign = (dLagnaSign + 2) % 12;
        const d3_11sign = (dLagnaSign + 10) % 12;
        const d3_3planets = dPositions.filter(p => p.dSign === d3_3sign);
        const d3_11planets = dPositions.filter(p => p.dSign === d3_11sign);
        const marsD3 = dPositions.find(p => p.id === 'Mars');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👫 兄弟姉妹・勇気分析' : '👫 D3 ドレッカナ — 兄弟姉妹・勇気分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D3 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d3LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? '弟妹:' : 'D3 3宮（弟妹）— ' + SIGNS[d3_3sign] + ':') + '</strong><br>';
        if (d3_3planets.length > 0) {
            const bro = {Sun:'弟妹がリーダーシップと権威を持つ',Moon:'弟妹と感情的に近い',Mars:'活動的で勇敢な弟妹。対立の可能性',Mercury:'知的でコミュニケーション上手な弟妹',Jupiter:'知恵深く幸運をもたらす弟妹',Venus:'魅力的で芸術的な弟妹',Saturn:'弟妹との困難。年齢差がある可能性',Rahu:'ユニークな弟妹か海外との縁',Ketu:'弟妹との距離感。霊的なつながり'};
            d3_3planets.forEach(p => { html += isEasy ? (bro[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (bro[p.id]||'') + '<br>'; });
        } else html += isEasy ? '' : '3宮に惑星なし — 3宮主の位置を確認してください.<br>';

        html += '<br><strong>' + (isEasy ? '兄/姉:' : 'D3 11宮（兄/姉）— ' + SIGNS[d3_11sign] + ':') + '</strong><br>';
        if (d3_11planets.length > 0) {
            d3_11planets.forEach(p => { html += isEasy ? '兄/姉との関係に影響があります。<br>' : '• ' + p.name + 'が11宮に位置しており、兄/姉との関係に影響。<br>'; });
        } else html += isEasy ? '' : '11宮に惑星なし.<br>';

        if (marsD3) {
            const marsH = ((marsD3.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♂ 火星（兄弟の カラカ):</strong> ';
            html += marsH <= 4 ? '兄弟と密接な関係。勇気と行動力の強い兄弟。' : marsH <= 8 ? '兄弟との葛藤または兄弟を通じた変革。' : '兄弟が海外にいるか霊的傾向。';
        }
        html += '</div></div>';

    } else if (division === 4) {
        // D4 차투르탐샤 — 재산·부동산·행운
        const d4LagnaInterp = ['積極的に不動産を取得。新居の建設や購入を好む。','安定した豊富な不動産。土地と農場。贅沢な住居。','複数の家か頻繁な引っ越し。知的な環境を好む。','家と不動産が感情的に重要。水辺。母からの不動産。','壮大で広い家。豪華なインテリア。一等地。','清潔で実用的な住居。健康重視の環境。小さな物件を複数所有。','美しく調和のとれた家。インテリアに興味。パートナーとの不動産。','不動産が変革を経る。相続不動産。秘密の場所。','広い土地と海外不動産。宗教・教育施設の近く。','体系的な不動産投資。古い建物。遅いが確実な資産成長。','ユニークな住居スタイル。モダンなアパート。テクノロジー関連。','水辺の美しい家。海外不動産。霊的な空間。'][dLagnaSign];

        const d4_4sign = (dLagnaSign + 3) % 12;
        const d4_4planets = dPositions.filter(p => p.dSign === d4_4sign);
        const d4_10sign = (dLagnaSign + 9) % 12;
        const d4_10planets = dPositions.filter(p => p.dSign === d4_10sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🏠 不動産・幸運分析' : '🏠 D4 チャトゥルタムシャ — 不動産・幸運分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D4 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d4LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? '不動産/家庭:' : 'D4 4宮（不動産/家庭）— ' + SIGNS[d4_4sign] + ':') + '</strong><br>';
        if (d4_4planets.length > 0) {
            const prop = {Sun:'政府所有の建物か威厳ある住居',Moon:'美しい家。水辺。母の影響',Mars:'新築。不動産紛争の可能性',Mercury:'商業不動産。複数所有',Jupiter:'広くて豊かな家！最高の不動産運',Venus:'豪華な家。美しいインテリア',Saturn:'古い家。修繕必要。中年以降安定',Rahu:'海外不動産。非伝統的な住居',Ketu:'不動産に無関心。霊的空間を好む'};
            d4_4planets.forEach(p => { html += isEasy ? (prop[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (prop[p.id]||'') + '<br>'; });
        } else html += isEasy ? '安定した不動産運です。<br>' : '4宮に惑星なし — 4宮主の位置が不動産の鍵.<br>';

        html += '<br><strong>' + (isEasy ? '全般的な幸運:' : 'D4 10宮（全般的幸運）— ' + SIGNS[d4_10sign] + ':') + '</strong><br>';
        if (d4_10planets.length > 0) {
            d4_10planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '全般的に幸運が良い!<br>' : '幸運のために努力が必要ですが成長の機会。<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? '吉星が 10宮に位置しており、全般的に幸運が良い!' : '凶星が 10宮 — 幸運のために努力が必要ですが成長の機会。') + '<br>';
            });
        } else html += isEasy ? '' : '10宮に惑星なし.<br>';
        html += '</div></div>';

    } else if (division === 16) {
        // D16 쇼다샴샤 — 차량·편の·행복
        const d16LagnaInterp = ['スポーツカー、バイクなど躍動的な車両。運転を楽しむ。','高級車と快適な移動手段。ラグジュアリーな物質的快適さ。','複数の車両または多様な移動手段。技術的機器が好き。','快適な家庭用車両。家族との旅行。物質的安定が幸福。','最高級車両。見せびらかし消費。高級ブランド好み。','実用的で燃費の良い車両。健康関連機器。','洗練されたデザインの良い車両。美的センスのある物。','中古車や相続した車両。保険が重要。変革的物質体験。','SUVや海外ブランド。旅行用車両。冒険的移動手段。','質素だが丈夫な車両。実用性優先。中年以降良い車。','電気自動車や最新技術車両。独特な移動手段。','水関連の移動（ボート）。感性的に好きな物。'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🚗 車両・快適さ分析' : '🚗 D16 ショーダシャムシャ — 車両・快適さ分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D16 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d16LagnaInterp + '<br><br>';

        const d16_4sign = (dLagnaSign + 3) % 12;
        const d16_4planets = dPositions.filter(p => p.dSign === d16_4sign);
        html += '<strong>' + (isEasy ? '快適さ/幸福:' : 'D16 4宮（快適さ/幸福）— ' + SIGNS[d16_4sign] + ':') + '</strong><br>';
        if (d16_4planets.length > 0) {
            d16_4planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '物質的快適さと幸福が豊富!<br>' : '物質的快適さのために努力が必要。<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? '物質的快適さと幸福が豊富！' : '物質的快適さのために努力が必要。') + '<br>';
            });
        } else html += isEasy ? '物質的快適さは普通です。<br>' : '4宮に惑星なし — 4宮主の位置が幸福の鍵.<br>';

        const venD16 = dPositions.find(p => p.id === 'Venus');
        if (venD16) {
            const vH = ((venD16.dSign - dLagnaSign + 12) % 12) + 1;
            html += isEasy ? '<br>' : '<br><strong>♀ 金星（快適さの カラカ):</strong> ';
            html += [,'自分が快適さを創造','財で快適さ','コミュニケーションで幸福','家庭で大きな幸福！','子供/恋愛で幸福','健康管理で快適さ','配偶者で幸福！','変革を通じた幸福','旅行/学問で幸福','社会的地位で快適さ','友人/ネットワークで幸福','霊的平和で幸福'][vH] || '';
        }
        html += '</div></div>';

    } else if (division === 20) {
        // D20 빔샴샤 — 영적 수행·종교
        const d20LagnaInterp = ['行動的な霊性。カルマ・ヨーガ。活動的な奉仕を通じた修行。','自然と感覚を通じた霊性。マントラ修行。寺院での瞑想。','知的な霊性。経典研究。瞑想より知識を通じた悟り。','感情的な霊性。バクティ・ヨーガ（献身）。母性的な神性に惹かれる。','王道の霊性。リーダーとしての霊的実践。太陽崇拝。','奉仕の霊性。セーヴァ（奉仕）を通じた修行。健康と治癒関連の霊性。','調和の霊性。芸術と美を通じた神性体験。タントラ。','深い変革の霊性。タントラ、クンダリニー。死と再生の修行。','求道者の霊性。巡礼の旅。師匠を探す旅。哲学的修行。','伝統的な霊性。体系的修行。カルマ・ヨーガ。忍耐の修行。','革新的な霊性。非伝統的修行法。人類のための奉仕。','超越的な霊性。瞑想、夢、直感。神秘体験。解脱追求。'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '🙏 霊的修行・宗教分析' : '🙏 D20 ヴィムシャムシャ — 霊的修行・宗教分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D20 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d20LagnaInterp + '<br><br>';

        const jupD20 = dPositions.find(p => p.id === 'Jupiter');
        const sunD20 = dPositions.find(p => p.id === 'Sun');
        const ketuD20 = dPositions.find(p => p.id === 'Ketu');
        const d20_9sign = (dLagnaSign + 8) % 12;
        const d20_12sign = (dLagnaSign + 11) % 12;
        const d20_9planets = dPositions.filter(p => p.dSign === d20_9sign);

        if (jupD20) {
            const jH = ((jupD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♃ 木星（霊的師匠） → ' + jH + '宮:</strong> ') + ([,'強い霊的自我','霊的知識が財になる','霊的コミュニケーション能力','深い内面の平和','前世の霊的功徳','奉仕を通じた霊性','師匠との出会い','秘密の霊的知識','最高の配置！偉大な霊的幸運','霊的権威者','霊的コミュニティ','解脱と悟り'][jH] || '') + '<br>';
        }
        if (ketuD20) {
            const kH = ((ketuD20.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☋ ケートゥ（解脱） → ' + kH + '宮:</strong> ') + ([,'生まれながらの霊的能力','霊的価値観','霊的コミュニケーション','内面深くの解脱','前世修行の結果','奉仕する魂','配偶者を通じた霊的成長','深い変革的霊性','霊的巡礼者','霊的職業','霊的コミュニティのリーダー','解脱直前の魂'][kH] || '') + '<br>';
        }
        html += '<br><strong>' + (isEasy ? 'グル/師匠:' : 'D20 9宮（グル/師匠）— ' + SIGNS[d20_9sign] + ':') + '</strong><br>';
        if (d20_9planets.length > 0) {
            d20_9planets.forEach(p => { html += isEasy ? '霊的な師との縁が強い。<br>' : '• ' + p.name + ': 霊的な師との縁が強い。<br>'; });
        } else html += isEasy ? '霊的な師を積極的に探してみましょう。<br>' : '9宮に惑星なし — 師を積極的に探す必要がある。<br>';
        html += '</div></div>';

    } else if (division === 24) {
        // D24 차투르빔샴샤 — 교육·학문
        const d24LagnaInterp = ['体育、軍事、リーダーシップ教育。','音楽、芸術、料理、金融教育。','言語、文学、コミュニケーション、メディア教育。','歴史、心理学、家政学教育。','政治学、演劇、経営学教育。','医学、科学、統計学教育。精密な学習。','法学、外交、デザイン教育。','心理学、研究、調査、オカルト教育。','哲学、神学、国際学。留学の可能性。','経営、行政、建築。体系的学習。','IT、工学、航空、社会科学。革新的学習。','芸術、音楽、霊性、映画学。直感的学習。'][dLagnaSign];

        const d24_4sign = (dLagnaSign + 3) % 12;
        const d24_5sign = (dLagnaSign + 4) % 12;
        const d24_4planets = dPositions.filter(p => p.dSign === d24_4sign);
        const d24_5planets = dPositions.filter(p => p.dSign === d24_5sign);
        const jupD24 = dPositions.find(p => p.id === 'Jupiter');
        const merD24 = dPositions.find(p => p.id === 'Mercury');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '📚 教育・学問分析' : '📚 D24 チャトゥルヴィムシャムシャ — 教育・学問分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D24 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d24LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? '基礎教育:' : 'D24 4宮（基礎教育）— ' + SIGNS[d24_4sign] + ':') + '</strong><br>';
        if (d24_4planets.length > 0) {
            d24_4planets.forEach(p => {
                const edu4 = {Sun:'名門校。権威ある教育',Moon:'快適な学習環境。家庭教育の影響大',Mars:'競争的学習。体育/技術に強い',Mercury:'最高の配置！優れた学業能力',Jupiter:'豊かな教育環境。良い教師',Venus:'芸術教育。美しい学校',Saturn:'困難な教育だが克服すれば深い学識',Rahu:'非伝統的教育。外国の学校',Ketu:'正規教育への関心薄い。直感的学習'};
                html += isEasy ? (edu4[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (edu4[p.id]||'') + '<br>';
            });
        } else html += isEasy ? '安定した教育環境で着実に成長するタイプです。<br>' : '4宮に惑星なし.<br>';

        html += '<br><strong>' + (isEasy ? '高等教育:' : 'D24 5宮（高等教育/知性）— ' + SIGNS[d24_5sign] + ':') + '</strong><br>';
        if (d24_5planets.length > 0) {
            d24_5planets.forEach(p => {
                html += isEasy ? (p.natural === 'benefic' ? '高等教育で優れた成就!<br>' : '学業での挑戦が成長に繋がる。<br>') : '• ' + p.name + ': ' + (p.natural === 'benefic' ? '高等教育で優れた成就！' : '学業での挑戦が成長に繋がる。') + '<br>';
            });
        } else html += isEasy ? '着実な努力で良い結果が得られます。<br>' : '5宮に惑星なし.<br>';

        if (jupD24) {
            const jH = ((jupD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '<br>' : '<br><strong>♃ 木星（知恵） → ' + jH + '宮:</strong> ') + ([1,4,5,9].includes(jH) ? '🎓 <strong>高い学業成就期待!</strong> 大学院/博士/海外留学可能。' : (isEasy ? '学業を通じた成長が期待されます。' : '学業を通じた成長。木星の祝福が' + jH + '宮領域で現れる。')) + '<br>';
        }
        if (merD24) {
            const mH = ((merD24.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☿ 水星（学習） → ' + mH + '宮:</strong> ') + ([1,4,5,9].includes(mH) ? '📖 <strong>優れた知的能力!</strong> 数学、言語、分析に才能。' : (isEasy ? '知的能力がよく発揮されます。' : '知的能力が' + mH + '宮領域で発揮される。')) + '<br>';
        }
        html += '</div></div>';

    } else if (division === 27) {
        // D27 삽타빔샴샤 — 체력·강점·약점
        const d27LagnaInterp = ['強い体力とエネルギー。運動能力抜群。頭/顔が強み。','持久力と忍耐力が強み。首/声帯が強い。筋力良好。','敏捷性と反射神経が強み。手/腕が器用。神経系の管理が必要。','感情的回復力が強み。胸/胃腸の管理が必要。水泳に才能。','心臓と脊椎が強い。カリスマ的な体格。過労注意。','消化力と分析力が強み。腸/皮膚の管理が必要。ヨガが適している。','バランス感覚と調和のとれた体型。腎臓/腰の管理が必要。ダンスに適している。','回復力と抵抗力が強み。生殖器の健康管理。極限スポーツ可能。','太ももと肝臓が強い。アウトドア運動に適している。過体重注意。','骨と関節が強い。忍耐力最高。年を重ねるほど健康になる。','循環系と足首が注意点。独特な運動法を好む。革新的な健康法。','免疫力と直感が強み。足/リンパの管理が必要。水中運動に適している。'][dLagnaSign];

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '💪 体力・強み・弱み分析' : '💪 D27 サプタヴィムシャムシャ — 体力分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D27 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d27LagnaInterp + '<br><br>';

        const marsD27 = dPositions.find(p => p.id === 'Mars');
        const sunD27 = dPositions.find(p => p.id === 'Sun');
        const satD27 = dPositions.find(p => p.id === 'Saturn');
        if (marsD27) {
            const mH = ((marsD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>♂ 火星（エネルギー） → ' + mH + '宮:</strong> ') + ([,'強い体力と意志！','体力でお金を稼げる','勇気と冒険心が強い','家庭で運動するタイプ','スポーツの才能！','病気に勝つ免疫力','配偶者と一緒に運動','危機で生き残る力','冒険/探検分野に強い','職業的体力活用','目標達成エネルギー','海外で体力活動'][mH] || '') + '<br>';
        }
        if (sunD27) {
            const sH = ((sunD27.dSign - dLagnaSign + 12) % 12) + 1;
            html += (isEasy ? '' : '<strong>☉ 太陽（活力） → ' + sH + '宮:</strong> ') + (isEasy ? '活力の源: ' : '活力の源が' + sH + '宮領域。') + ([,'自我からエネルギー','財活動で活力','コミュニケーションでエネルギー','家庭で安定','創作で活力','奉仕でエネルギー','関係で活力','変革でエネルギー','旅行で活力','職業でエネルギー','社会で活力','霊的修行でエネルギー'][sH] || '') + '<br>';
        }

        // D27 6宮 (약점/질병) 분석
        const d27_6sign = (dLagnaSign + 5) % 12;
        const d27_6planets = dPositions.filter(p => p.dSign === d27_6sign);
        html += '<br><strong>' + (isEasy ? '弱点/脆弱性:' : 'D27 6宮（弱点/脆弱性）— ' + SIGNS[d27_6sign] + ':') + '</strong><br>';
        const bodyParts = ['頭/脳','首/甲状腺','肺/腕','胃腸/胸','心臓/背中','消化器/腸','腎臓/腰','生殖器','肝臓/太もも','骨/関節','足首/循環系','足/免疫系'];
        html += '弱い部位: <strong>' + bodyParts[d27_6sign] + '</strong> — この部位の健康管理に注意してください。<br>';
        if (d27_6planets.length > 0) {
            d27_6planets.forEach(p => { html += isEasy ? 'この部位に特別な注意が必要です。<br>' : '• ' + p.name + 'が6宮に位置しており、この部位に特別な注意が必要です.<br>'; });
        }
        html += '</div></div>';

    } else if (division === 30) {
        // D30 트림샴샤 — 불행·질병·장애
        const d30LagnaInterp = ['事故、火傷、頭痛。性急な決定からの問題。怒りの管理。','経済的損失、食事問題、甲状腺。過食と執着に注意。','神経不安、不眠、呼吸問題。過度の心配を避ける。','感情的不安定、胃の問題、水関連の問題。感情制御。','心臓問題、自尊心の損傷、過労。謙虚さと休息が必要。','消化障害、アレルギー、完璧主義のストレス。リラックスが必要。','腎臓問題、関係の葛藤、優柔不断。決断力が必要。','秘密、事故、手術、性的問題。定期検診が重要。','肝臓問題、過体重、ギャンブル/浪費。節制が必要。','関節、骨、うつ、孤独。カルシウムと社交が必要。','血圧、循環、予期しない事故。定期健康診断。','免疫低下、依存症、メンタルヘルス。瞑想と睡眠が必要。'][dLagnaSign];

        const d30_6sign = (dLagnaSign + 5) % 12;
        const d30_8sign = (dLagnaSign + 7) % 12;
        const d30_12sign = (dLagnaSign + 11) % 12;
        const d30_6planets = dPositions.filter(p => p.dSign === d30_6sign);
        const d30_8planets = dPositions.filter(p => p.dSign === d30_8sign);
        const d30_12planets = dPositions.filter(p => p.dSign === d30_12sign);

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '⚠️ 健康注意事項詳細' : '⚠️ D30 トリムシャムシャ — 疾病分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D30 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d30LagnaInterp + '<br><br>';

        html += '<strong>' + (isEasy ? '注意すべき疾病:' : 'D30 6宮（疾病）— ' + SIGNS[d30_6sign] + ':') + '</strong><br>';
        const diseaseBySign = ['頭痛、発熱、炎症','首、甲状腺、糖尿','肺、神経、不安','胃腸、水分貯留','心臓、背中、血圧','消化器、腸、皮膚','腎臓、腰、尿路','生殖器、慢性疾患','肝臓、太もも、過体重','骨、関節、リウマチ','循環系、血圧、足首','免疫、足、精神健康'];
        html += '注意すべき疾患: <strong>' + diseaseBySign[d30_6sign] + '</strong><br>';
        if (d30_6planets.length > 0) {
            const dis = {Sun:'目、心臓関連の疾患',Moon:'メンタルヘルス、水関連の問題',Mars:'事故、手術、火傷',Mercury:'神経系、皮膚問題',Jupiter:'肝臓、過体重',Venus:'腎臓、糖尿病、性病',Saturn:'慢性疾患、関節問題',Rahu:'原因不明の疾患、依存症',Ketu:'免疫低下、アレルギー'};
            d30_6planets.forEach(p => { html += isEasy ? (dis[p.id]||'') + '<br>' : '• ' + p.name + ': ' + (dis[p.id]||'') + '<br>'; });
        }

        html += '<br><strong>' + (isEasy ? '危険/手術:' : 'D30 8宮（危険/手術）— ' + SIGNS[d30_8sign] + ':') + '</strong><br>';
        if (d30_8planets.length > 0) {
            d30_8planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? '危険/事故注意。保険と定期検診が重要。' : '危機で守られる。') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? '危険/事故注意。保険と定期検診が重要。' : '危機で守られる。') + '<br>'; });
        } else html += isEasy ? '大きな危険は少ないです。<br>' : '8宮に惑星なし — 大きな危険は少ない。<br>';

        html += '<br><strong>' + (isEasy ? '入院/損失:' : 'D30 12宮（入院/損失）— ' + SIGNS[d30_12sign] + ':') + '</strong><br>';
        if (d30_12planets.length > 0) {
            d30_12planets.forEach(p => { html += isEasy ? (p.natural === 'malefic' ? '入院や孤立の可能性。' : '霊的治癒と回復。') + '<br>' : '• ' + p.name + ': ' + (p.natural === 'malefic' ? '入院や孤立の可能性。海外医療関連。' : '霊的治癒と回復。') + '<br>'; });
        } else html += isEasy ? '入院リスクは低いです。<br>' : '12宮に惑星なし — 入院リスク低い。<br>';
        html += '</div></div>';

    } else if (division === 40) {
        // D40 카베담샤 — 모계 유산
        const d40LagnaInterp = ['独立的で意志の強い母。母系からリーダーシップを受け継ぐ。','母が財を上手に管理。母系から物質的豊かさ。','知的でコミュニケーション上手な母。言語/教育の才能を受け継ぐ。','母との非常に深い絆。感受性と直感を受け継ぐ。','権威と尊厳のある母。リーダーシップと名誉を受け継ぐ。','母が健康管理に優れる。分析力/奉仕精神を受け継ぐ。','魅力的で外交的な母。芸術的感覚を受け継ぐ。','変革を経た強い母。回復力を受け継ぐ。','教育的で宗教的な母。知恵/哲学を受け継ぐ。','責任感のある厳格な母。忍耐と規律を受け継ぐ。','ユニークで進歩的な母。革新的思考を受け継ぐ。','霊的で直感的な母。芸術/霊性を受け継ぐ。'][dLagnaSign];

        const d40_4sign = (dLagnaSign + 3) % 12;
        const d40_4planets = dPositions.filter(p => p.dSign === d40_4sign);
        const moonD40 = dPositions.find(p => p.id === 'Moon');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👩 母系遺産分析' : '👩 D40 カヴェダムシャ — 母系遺産分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D40 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d40LagnaInterp + '<br><br>';

        if (moonD40) {
            const mH = ((moonD40.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☽ 月（母 カラカ):</strong> ';
            html += [,'母が本人に強い影響','母からの財産','母とのコミュニケーション良好','母との深い絆！最高の配置','母が創造的','母が奉仕的','母が関係に影響','母からの遺産','母が宗教/教育的','母が社会的地位あり','母が独立的','母が霊的'][mH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? '母方の家庭:' : 'D40 4宮（母系家庭）— ' + SIGNS[d40_4sign] + ':') + '</strong><br>';
        if (d40_4planets.length > 0) {
            d40_4planets.forEach(p => { html += isEasy ? '母方の家庭から強く受け継いだエネルギーがあります。<br>' : '• ' + p.name + ': 母系家庭でこの惑星のエネルギーが強く遺伝。<br>'; });
        } else html += isEasy ? '母方から安定した遺産があります。<br>' : '4宮に惑星なし — 4宮主の位置が母系遺産の鍵.<br>';
        html += '</div></div>';

    } else if (division === 45) {
        // D45 악샤베담샤 — 부계 유산
        const d45LagnaInterp = ['活動的で行動指向の父。勇気とリーダーシップを受け継ぐ。','経済的に安定した父。物質的価値観を受け継ぐ。','知的で多才な父。コミュニケーション/ビジネス能力を受け継ぐ。','感情的で家庭的な父。世話の本能を受け継ぐ。','権威があり尊敬される父。リーダーシップを受け継ぐ。','実用的で勤勉な父。分析力/技術力を受け継ぐ。','外交的で洗練された父。社交能力を受け継ぐ。','強くて神秘的な父。回復力/洞察力を受け継ぐ。','学問的で宗教的な父。哲学/道徳を受け継ぐ。','厳格で野心のある父。忍耐/規律を受け継ぐ。','創造的で革新的な父。技術/科学的思考を受け継ぐ。','霊的で芸術的な父。直感/創造性を受け継ぐ。'][dLagnaSign];

        const d45_9sign = (dLagnaSign + 8) % 12;
        const d45_9planets = dPositions.filter(p => p.dSign === d45_9sign);
        const sunD45 = dPositions.find(p => p.id === 'Sun');

        html += '<div class="interp-card"><div class="interp-title">' + (isEasy ? '👨 父系遺産分析' : '👨 D45 アクシャヴェダムシャ — 父系遺産分析') + '</div><div class="interp-text">';
        html += (isEasy ? '' : '<strong>D45 ラグナ: ' + SIGNS[dLagnaSign] + '</strong><br>') + d45LagnaInterp + '<br><br>';

        if (sunD45) {
            const sH = ((sunD45.dSign - dLagnaSign + 12) % 12) + 1;
            if (!isEasy) html += '<strong>☉ 太陽（父 カラカ):</strong> ';
            html += [,'父が本人に強い影響','父からの財産','父とのコミュニケーション良好','父が家庭的','父が創造的','父が奉仕的','父が関係に影響','父からの遺産','父が宗教/教育的','父が社会的に成功！最高の配置','父が独立的','父が霊的'][sH] || '';
            html += '<br>';
        }

        html += '<br><strong>' + (isEasy ? '父方の家庭:' : 'D45 9宮（父系家庭/父）— ' + SIGNS[d45_9sign] + ':') + '</strong><br>';
        if (d45_9planets.length > 0) {
            d45_9planets.forEach(p => { html += isEasy ? '父方の家庭から強く受け継いだエネルギーがあります。<br>' : '• ' + p.name + ': 父系でこの惑星のエネルギーが強く遺伝。<br>'; });
        } else html += isEasy ? '父方から安定した遺産があります。<br>' : '9宮に惑星なし — 9宮主の位置が父系遺産の鍵.<br>';
        html += '</div></div>';
    }

    interpEl.innerHTML = html;
}

