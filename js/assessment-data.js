// Career Language Studio — assessment question banks and level metadata.
// All questions are original and written for this assessment. They are informed by
// standard JLPT / TOPIK curriculum scope (curriculum_reference) but are not copied
// from any textbook or exam. This assessment is independent and unofficial.

const ASSESSMENT_LEVELS = {
  Japanese: ["N5", "N4", "N3", "N2", "N1"],
  Korean: ["TOPIK 1", "TOPIK 2", "TOPIK 3", "TOPIK 4", "TOPIK 5", "TOPIK 6"]
};

const ASSESSMENT_PASS_THRESHOLD = 0.6;

const ASSESSMENT_QUESTION_BANK = {
  Japanese: [
    { level:"N5", category:"Reading", difficulty:"beginner", curriculum_reference:"JLPT N5 scope / everyday notices",
      q:"掲示板に「本日休業」と書いてあります。この意味は何ですか。",
      options:["Open only today","Closed today","Open 24 hours","New shop opening soon"], answer:1 },
    { level:"N5", category:"Grammar", difficulty:"beginner", curriculum_reference:"Minna no Nihongo I / JLPT N5 scope",
      q:"きのう、友だち＿会いました。",
      options:["を","に","で","は"], answer:1 },
    { level:"N5", category:"Vocabulary", difficulty:"beginner", curriculum_reference:"JLPT N5 vocabulary scope",
      q:"「会議室」の意味は何ですか。",
      options:["Meeting room","Break room","Reception desk","Parking lot"], answer:0 },
    { level:"N5", category:"Workplace Language", difficulty:"beginner", curriculum_reference:"JLPT N5 scope / polite workplace phrases",
      q:"同僚が「少々お待ちください。」と言いました。何を頼まれていますか。",
      options:["Wait a moment","Come here immediately","Leave the room","Call back later"], answer:0 },

    { level:"N4", category:"Reading", difficulty:"elementary", curriculum_reference:"Minna no Nihongo II / JLPT N4 scope",
      q:"メール：「明日の会議は10時から11時までです。場所は3階の会議室Aに変更になりました。」何が変わりましたか。",
      options:["The meeting time","The meeting room","The meeting was cancelled","The attendee list"], answer:1 },
    { level:"N4", category:"Grammar", difficulty:"elementary", curriculum_reference:"Minna no Nihongo II / JLPT N4 scope",
      q:"この書類は今日中に＿なければなりません。",
      options:["提出し","提出する","提出して","提出した"], answer:0 },
    { level:"N4", category:"Vocabulary", difficulty:"elementary", curriculum_reference:"JLPT N4 vocabulary scope",
      q:"「締め切り」の意味は何ですか。",
      options:["Deadline","Discount","Reservation","Signature"], answer:0 },
    { level:"N4", category:"Workplace Language", difficulty:"elementary", curriculum_reference:"JLPT N4 scope / workplace requests",
      q:"上司が「この件について確認していただけますか。」と言いました。何を頼まれていますか。",
      options:["A confirmation check on this matter","A refund request","A meeting cancellation","A day off"], answer:0 },

    { level:"N3", category:"Reading", difficulty:"intermediate", curriculum_reference:"JLPT N3 scope / workplace announcements",
      q:"「先週から新しいシステムを導入したため、一部の作業に時間がかかっています。ご不便をおかけしますが、ご理解のほどよろしくお願いいたします。」何を伝えていますか。",
      options:["A new system caused delays and apologizes for the inconvenience","The company is closing","A new employee has joined","A discount is being offered"], answer:0 },
    { level:"N3", category:"Grammar", difficulty:"intermediate", curriculum_reference:"JLPT N3 grammar scope",
      q:"資料を確認し＿、すぐにご連絡いたします。",
      options:["次第","ながら","ばかり","ついでに"], answer:0 },
    { level:"N3", category:"Vocabulary", difficulty:"intermediate", curriculum_reference:"JLPT N3 vocabulary scope / business Japanese",
      q:"ビジネスの場面で「対応」に最も近い意味はどれですか。",
      options:["Handling / response to a matter","Vacation","Salary","Uniform"], answer:0 },
    { level:"N3", category:"Workplace Language", difficulty:"intermediate", curriculum_reference:"JLPT N3 scope / client correspondence",
      q:"取引先からのメール：「恐れ入りますが、来週まで対応が難しい状況です。」何を伝えていますか。",
      options:["They can't accommodate the request until next week","They need the meeting today","They are cancelling the contract","They want a refund"], answer:0 },

    { level:"N2", category:"Reading", difficulty:"upper-intermediate", curriculum_reference:"JLPT N2 scope / workplace trend articles",
      q:"「近年、リモートワークの普及に伴い、社員同士のコミュニケーション不足が課題として挙げられている。そのため、多くの企業がオンライン上での交流機会を増やす取り組みを始めている。」この文章の要点は何ですか。",
      options:["Companies are increasing online interaction to address communication gaps from remote work","Remote work is being banned","Employees are quitting because of remote work","Communication tools are too expensive"], answer:0 },
    { level:"N2", category:"Grammar", difficulty:"upper-intermediate", curriculum_reference:"JLPT N2 grammar scope",
      q:"彼の説明を聞け＿聞くほど、分からなくなった。",
      options:["ば","と","のに","ながら"], answer:0 },
    { level:"N2", category:"Vocabulary", difficulty:"upper-intermediate", curriculum_reference:"JLPT N2 vocabulary scope / business reports",
      q:"報告書の中の「見込み」に最も近い意味はどれですか。",
      options:["Prospect / expected outcome","Apology","Invoice","Attendance"], answer:0 },
    { level:"N2", category:"Workplace Language", difficulty:"upper-intermediate", curriculum_reference:"JLPT N2 scope / formal email conventions",
      q:"正式なビジネスメールで、名前の前に書く結びの言葉として最も適切なのはどれですか。",
      options:["よろしくお願いいたします。","じゃあね。","早く返事してね。","バイバイ。"], answer:0 },

    { level:"N1", category:"Reading", difficulty:"advanced", curriculum_reference:"JLPT N1 scope / formal business correspondence",
      q:"「本件に関しましては、社内での検討を重ねた結果、貴社のご提案を前向きに検討させていただく運びとなりました。」何を伝えていますか。",
      options:["They are positively considering the proposal after internal review","They are rejecting the proposal","They need more time before responding at all","They are cancelling the contract"], answer:0 },
    { level:"N1", category:"Grammar", difficulty:"advanced", curriculum_reference:"JLPT N1 grammar scope",
      q:"彼が努力した＿、プロジェクトは成功した。",
      options:["からこそ","にすぎない","ないまでも","ながらも"], answer:0 },
    { level:"N1", category:"Vocabulary", difficulty:"advanced", curriculum_reference:"JLPT N1 vocabulary scope / formal business Japanese",
      q:"正式なビジネス文書で「ご査収」は主にどのような意味で使われますか。",
      options:["Please review and accept (the enclosed documents)","Please discard","Please forward","Please translate"], answer:0 },
    { level:"N1", category:"Workplace Language", difficulty:"advanced", curriculum_reference:"JLPT N1 scope / formal apology conventions",
      q:"正式な謝罪メールに「多大なご迷惑をおかけし、深くお詫び申し上げます。」とあります。この文の目的・トーンは何ですか。",
      options:["A sincere formal apology for significant inconvenience caused","A casual thank-you note","A promotional offer","A meeting invitation"], answer:0 }
  ],

  Korean: [
    { level:"TOPIK 1", category:"Reading", difficulty:"beginner", curriculum_reference:"TOPIK I scope / everyday notices",
      q:"표지판에 '오늘 휴무'라고 쓰여 있습니다. 이것은 무슨 뜻입니까?",
      options:["Open today","Closed today","New store","Sale today"], answer:1 },
    { level:"TOPIK 1", category:"Grammar", difficulty:"beginner", curriculum_reference:"TOPIK I grammar scope",
      q:"저는 학교___ 갑니다.",
      options:["이","을","에","은"], answer:2 },
    { level:"TOPIK 1", category:"Vocabulary", difficulty:"beginner", curriculum_reference:"TOPIK I vocabulary scope",
      q:"'회의실'의 뜻은 무엇입니까?",
      options:["Meeting room","Restroom","Cafeteria","Parking lot"], answer:0 },
    { level:"TOPIK 1", category:"Workplace Language", difficulty:"beginner", curriculum_reference:"TOPIK I scope / polite workplace phrases",
      q:"동료가 '잠시만 기다려 주세요.'라고 말했습니다. 무엇을 부탁하고 있습니까?",
      options:["Please wait a moment","Please leave now","Please call later","Please hurry"], answer:0 },

    { level:"TOPIK 2", category:"Reading", difficulty:"elementary", curriculum_reference:"TOPIK I scope / workplace email",
      q:"이메일: '내일 회의는 오전 10시에서 오후 1시로 변경되었습니다.' 무엇이 바뀌었습니까?",
      options:["The meeting time","The meeting room","The meeting was cancelled","The attendee list"], answer:0 },
    { level:"TOPIK 2", category:"Grammar", difficulty:"elementary", curriculum_reference:"TOPIK I grammar scope",
      q:"이 서류를 오늘 안에 제출___ 합니다.",
      options:["해야","하고","해서","했지만"], answer:0 },
    { level:"TOPIK 2", category:"Vocabulary", difficulty:"elementary", curriculum_reference:"TOPIK I vocabulary scope",
      q:"'마감일'의 뜻은 무엇입니까?",
      options:["Deadline","Discount","Reservation","Signature"], answer:0 },
    { level:"TOPIK 2", category:"Workplace Language", difficulty:"elementary", curriculum_reference:"TOPIK I scope / workplace requests",
      q:"상사가 '이 부분을 확인해 주시겠어요?'라고 말했습니다. 무엇을 부탁하고 있습니까?",
      options:["A confirmation check on this part","A refund request","A meeting cancellation","A day off request"], answer:0 },

    { level:"TOPIK 3", category:"Reading", difficulty:"intermediate", curriculum_reference:"TOPIK II scope / workplace announcements",
      q:"'지난주부터 새로운 시스템을 도입하면서 일부 업무가 지연되고 있습니다. 불편을 드려 죄송합니다.' 이 글의 주된 내용은 무엇입니까?",
      options:["A new system has caused delays and apologizes for the inconvenience","The company is closing","A new employee joined","A discount is being offered"], answer:0 },
    { level:"TOPIK 3", category:"Grammar", difficulty:"intermediate", curriculum_reference:"TOPIK II grammar scope",
      q:"자료를 확인하___ 바로 연락드리겠습니다.",
      options:["는 대로","지만","면서","거나"], answer:0 },
    { level:"TOPIK 3", category:"Vocabulary", difficulty:"intermediate", curriculum_reference:"TOPIK II vocabulary scope / business Korean",
      q:"업무 상황에서 '대응'에 가장 가까운 의미는 무엇입니까?",
      options:["Response / handling of a matter","Vacation","Salary","Uniform"], answer:0 },
    { level:"TOPIK 3", category:"Workplace Language", difficulty:"intermediate", curriculum_reference:"TOPIK II scope / client correspondence",
      q:"거래처 메시지: '죄송하지만 다음 주까지는 대응이 어려울 것 같습니다.' 무엇을 전달하고 있습니까?",
      options:["They can't accommodate the request until next week","They need the meeting today","They are cancelling the contract","They want a refund"], answer:0 },

    { level:"TOPIK 4", category:"Reading", difficulty:"upper-intermediate", curriculum_reference:"TOPIK II scope / workplace trend articles",
      q:"'최근 재택근무가 확산되면서 직원 간 소통 부족이 문제로 지적되고 있다. 이에 따라 많은 기업들이 온라인 교류 기회를 늘리는 방안을 추진하고 있다.' 이 글의 요점은 무엇입니까?",
      options:["Companies are increasing online interaction to address communication gaps from remote work","Remote work is being banned","Employees are quitting because of remote work","Online tools are too expensive"], answer:0 },
    { level:"TOPIK 4", category:"Grammar", difficulty:"upper-intermediate", curriculum_reference:"TOPIK II grammar scope",
      q:"설명을 들으___ 들을수록 더 헷갈렸다.",
      options:["면","자마자","는데도","길래"], answer:0 },
    { level:"TOPIK 4", category:"Vocabulary", difficulty:"upper-intermediate", curriculum_reference:"TOPIK II vocabulary scope / business reports",
      q:"보고서에서 '전망'에 가장 가까운 의미는 무엇입니까?",
      options:["Prospect / outlook","Apology","Invoice","Attendance"], answer:0 },
    { level:"TOPIK 4", category:"Workplace Language", difficulty:"upper-intermediate", curriculum_reference:"TOPIK II scope / formal email conventions",
      q:"정식 비즈니스 이메일에서 이름 앞에 쓰는 맺음말로 가장 적절한 것은 무엇입니까?",
      options:["감사합니다.","안녕~","빨리 답장해.","잘가."], answer:0 },

    { level:"TOPIK 5", category:"Reading", difficulty:"advanced", curriculum_reference:"TOPIK II scope / formal business correspondence",
      q:"'본 건에 관하여 사내 검토를 거친 결과, 귀사의 제안을 긍정적으로 검토하게 되었음을 알려드립니다.' 무엇을 전달하고 있습니까?",
      options:["They are positively considering the proposal after internal review","They are rejecting the proposal","They need much more time before any response","They are cancelling the contract"], answer:0 },
    { level:"TOPIK 5", category:"Grammar", difficulty:"advanced", curriculum_reference:"TOPIK II grammar scope",
      q:"그가 노력했___, 프로젝트는 성공하지 못했을 것이다.",
      options:["기에","을지라도","다시피","는커녕"], answer:0 },
    { level:"TOPIK 5", category:"Vocabulary", difficulty:"advanced", curriculum_reference:"TOPIK II vocabulary scope / formal correspondence",
      q:"정식 문서에서 '검토 부탁드립니다'는 주로 어떤 의미로 쓰입니까?",
      options:["Please review (the enclosed matter)","Please discard it","Please forward it","Please translate it"], answer:0 },
    { level:"TOPIK 5", category:"Workplace Language", difficulty:"advanced", curriculum_reference:"TOPIK II scope / formal apology conventions",
      q:"정식 사과 이메일에 '큰 불편을 드려 진심으로 사과드립니다.'라고 쓰여 있습니다. 이 문장의 목적·어조는 무엇입니까?",
      options:["A sincere formal apology for significant inconvenience caused","A casual thank-you note","A promotional offer","A meeting invitation"], answer:0 },

    { level:"TOPIK 6", category:"Reading", difficulty:"advanced", curriculum_reference:"TOPIK II scope / formal partnership correspondence",
      q:"'귀사와의 협력 관계가 장기적으로 상호 발전에 기여할 것이라 판단되어, 이번 제안을 적극 추진하고자 합니다.' 무엇을 전달하고 있습니까?",
      options:["They intend to actively pursue the proposal, judging it mutually beneficial long-term","They are ending the partnership","They need to cancel the proposal","They are requesting a discount"], answer:0 },
    { level:"TOPIK 6", category:"Grammar", difficulty:"advanced", curriculum_reference:"TOPIK II grammar scope",
      q:"'경기 침체에도 불구하고 매출은 오히려 증가했다.'에서 '에도 불구하고'의 기능은 무엇입니까?",
      options:["despite / notwithstanding","because of","in order to","as soon as"], answer:0 },
    { level:"TOPIK 6", category:"Vocabulary", difficulty:"advanced", curriculum_reference:"TOPIK II vocabulary scope / business proposals",
      q:"사업 제안서에서 '타당성'에 가장 가까운 의미는 무엇입니까?",
      options:["Feasibility / validity","Discount rate","Attendance","Salary"], answer:0 },
    { level:"TOPIK 6", category:"Workplace Language", difficulty:"advanced", curriculum_reference:"TOPIK II scope / indirect formal refusal",
      q:"한국 비즈니스 서신에서 정중하고 완곡한 거절 표현으로 가장 적절한 것은 무엇입니까?",
      options:["이번 제안은 검토 결과 진행이 어려울 것으로 판단됩니다.","싫어요.","안 돼요.","못해요."], answer:0 }
  ]
};

// Recommended-resource lookup used on the results screen. IDs must match anchor
// ids on resources.html so results can deep-link to the right card.
const ASSESSMENT_RESOURCE_MAP = {
  Japanese: {
    "N5": [{ id:"irodori", title:"Irodori Starter (Japan Foundation, free)" }, { id:"minna-1", title:"Minna no Nihongo I" }],
    "N4": [{ id:"marugoto", title:"Marugoto Elementary (Japan Foundation, free)" }, { id:"minna-2", title:"Minna no Nihongo II" }],
    "N3": [{ id:"nhk-easy-news", title:"NHK News Web Easy (free)" }, { id:"jlpt-review", title:"JLPT N3 review book" }],
    "N2": [{ id:"nhk-easy-news", title:"NHK News Web Easy (free)" }, { id:"jlpt-review", title:"JLPT N2 review book" }],
    "N1": [{ id:"jlpt-review", title:"JLPT N1 review book" }, { id:"nhk-easy-news", title:"NHK News Web Easy (free)" }],
    "Below N5": [{ id:"irodori", title:"Irodori Starter (Japan Foundation, free)" }, { id:"minna-1", title:"Minna no Nihongo I" }]
  },
  Korean: {
    "TOPIK 1": [{ id:"king-sejong", title:"King Sejong Institute — beginner course (free)" }, { id:"sogang-korean", title:"Sogang Korean 1A" }],
    "TOPIK 2": [{ id:"ttmik", title:"Talk To Me In Korean — free lessons" }, { id:"sogang-korean", title:"Sogang Korean 1B / 2A" }],
    "TOPIK 3": [{ id:"topik-guide", title:"TOPIK Guide — free practice materials" }, { id:"korean-grammar-in-use", title:"Korean Grammar in Use — Intermediate" }],
    "TOPIK 4": [{ id:"topik-guide", title:"TOPIK Guide — free practice materials" }, { id:"topik-review", title:"TOPIK review book" }],
    "TOPIK 5": [{ id:"topik-review", title:"TOPIK review book" }, { id:"korean-grammar-in-use", title:"Korean Grammar in Use — Advanced" }],
    "TOPIK 6": [{ id:"topik-review", title:"TOPIK review book" }, { id:"korean-grammar-in-use", title:"Korean Grammar in Use — Advanced" }],
    "Below TOPIK 1": [{ id:"king-sejong", title:"King Sejong Institute — beginner course (free)" }, { id:"sogang-korean", title:"Sogang Korean 1A" }]
  }
};
