/*
 * MOGU Pal 채팅/편지 필터 시스템
 * 모든 페이지에서 공통으로 사용
 */

var MOGU_FILTER = (function(){

    // === 금칙어 목록 ===

    // 한국어
    var KO = ['시발','씨발','시바','씨바','ㅅㅂ','ㅆㅂ','시팔','씨팔','개새끼','새끼','병신','ㅂㅅ','지랄','ㅈㄹ','좆','닥쳐','꺼져','미친놈','미친년','느금마','니엄마','엠창','패드립','걸레','창녀','보지','자지','섹스','야동','떡치','성관계','강간','변태'];

    // 영어
    var EN = ['fuck','shit','bitch','asshole','dick','pussy','cock','cunt','nigger','nigga','whore','slut','bastard','retard','fag','faggot','motherfucker','bullshit','damn','piss','porn','sex','nude','naked'];

    // 일본어
    var JP = ['くそ','クソ','死ね','しね','馬鹿','バカ','ばか','アホ','きもい','キモい','うざい','ウザい','ファック','セックス','エロ','変態','へんたい','殺す','ころす','ちんこ','まんこ','おっぱい','ビッチ'];

    // 스페인어
    var ES = ['puta','mierda','joder','coño','cabrón','cabron','pendejo','hijo de puta','maricón','maricon','culo','verga','chingar','perra','zorra','idiota','estúpido','estupido','gilipollas','hostia','carajo'];

    // 독일어
    var DE = ['scheiße','scheisse','fick','ficken','arschloch','hurensohn','wichser','fotze','schlampe','miststück','miststuck','drecksau','vollidiot','hure','schwuchtel','missgeburt'];

    // 프랑스어
    var FR = ['merde','putain','connard','connasse','salaud','salope','enculé','encule','bordel','nique','baiser','foutre','pédé','pede','con','bite','chier','enfoiré','enfoire'];

    // 포르투갈어
    var PT = ['porra','merda','caralho','foda','fodase','puta','cuzão','cuzao','viado','arrombado','desgraçado','desgraçado','buceta','piranha','vai se fuder','filho da puta','otário','otario','idiota','babaca'];

    // 전체 금칙어 합치기
    var ALL_BAD = [].concat(KO,EN,JP,ES,DE,FR,PT);

    // === SNS / 연락처 패턴 ===
    var SNS_WORDS = ['카톡','카카오','kakao','kakaotalk','라인','line','위챗','wechat','텔레그램','telegram','왓츠앱','whatsapp','인스타','instagram','insta','페이스북','facebook','트위터','twitter','스냅챗','snapchat','틱톡','tiktok','디스코드','discord','스카이프','skype','위쳇'];

    // === 정규식 패턴 ===

    // 전화번호 (한국, 국제)
    var PHONE_REGEX = /(\+?\d{1,4}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;

    // URL
    var URL_REGEX = /(https?:\/\/|www\.)[^\s]+/i;

    // 이메일
    var EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

    // === 우회 방지: 특수문자/공백 제거 후 체크 ===
    function normalize(text){
        return text
            .replace(/[\s_.·\-!@#$%^&*()=+|~`{}\[\]:;"'<>,./?\\\u200b]/g,'')
            .toLowerCase();
    }

    // === 메인 필터 함수 ===
    function check(text){
        if(!text || !text.trim()) return {ok:true};

        var lower = text.toLowerCase();
        var cleaned = normalize(text);

        // 1. 금칙어 체크
        for(var i=0; i<ALL_BAD.length; i++){
            var word = ALL_BAD[i].toLowerCase();
            if(lower.indexOf(word) !== -1 || cleaned.indexOf(normalize(word)) !== -1){
                return {ok:false, reason:'Linguagem inadequada detectada.', type:'badword'};
            }
        }

        // 2. SNS/연락처 단어 체크
        for(var j=0; j<SNS_WORDS.length; j++){
            var sns = SNS_WORDS[j].toLowerCase();
            if(lower.indexOf(sns) !== -1){
                return {ok:false, reason:'Compartilhar contatos externos/redes sociais não é permitido.', type:'sns'};
            }
        }

        // 3. 전화번호 체크
        if(PHONE_REGEX.test(text)){
            return {ok:false, reason:'Números de telefone não podem ser compartilhados.', type:'phone'};
        }

        // 4. URL 체크
        if(URL_REGEX.test(text)){
            return {ok:false, reason:'Links externos não são permitidos.', type:'url'};
        }

        // 5. 이메일 체크
        if(EMAIL_REGEX.test(text)){
            return {ok:false, reason:'Endereços de e-mail não podem ser compartilhados.', type:'email'};
        }

        return {ok:true};
    }

    // === 도배 방지 ===
    var msgHistory = [];
    var SPAM_LIMIT = 5;       // 10초 내 최대 메시지 수
    var SPAM_WINDOW = 10000;  // 10초
    var lastMsg = '';
    var lastMsgCount = 0;

    function spamCheck(text){
        var now = Date.now();

        // 오래된 기록 제거
        msgHistory = msgHistory.filter(function(t){ return now - t < SPAM_WINDOW; });

        // 같은 메시지 반복 체크
        if(text === lastMsg){
            lastMsgCount++;
            if(lastMsgCount >= 3){
                return {ok:false, reason:'Não é possível repetir a mesma mensagem.', type:'repeat'};
            }
        } else {
            lastMsg = text;
            lastMsgCount = 1;
        }

        // 도배 체크
        if(msgHistory.length >= SPAM_LIMIT){
            return {ok:false, reason:'메시지를 너무 빠르게 보내고 있습니다. 잠시 후 다시 시도해주세요.', type:'flood'};
        }

        msgHistory.push(now);
        return {ok:true};
    }

    // === 통합 필터 ===
    function filter(text){
        // 1. 내용 필터
        var contentResult = check(text);
        if(!contentResult.ok) return contentResult;

        // 2. 도배 필터
        var spamResult = spamCheck(text);
        if(!spamResult.ok) return spamResult;

        return {ok:true};
    }

    // 외부에서 사용할 함수들
    return {
        check: check,
        spamCheck: spamCheck,
        filter: filter
    };

})();
