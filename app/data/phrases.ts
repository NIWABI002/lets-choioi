export interface ExclamationPhrase {
  viet: string;
  ruby: string;
  jp: string;
  category: string;
  emoji: string;
}

export interface EnglishPhrase {
  en: string;
  jp: string;
  category: string;
}

export interface ConversationStep {
  text: string;
  lang: 'en' | 'viet' | 'mixed' | 'note';
  viet?: string;
  en?: string;
}

export interface MixConversation {
  category: string;
  steps: ConversationStep[];
}

export const exclamationCategories = ['すべて', '驚き', '喜び', '感謝', '苦笑', '拒否', 'スラング'] as const;

export const exclamationPhrases: ExclamationPhrase[] = [
  // 驚き
  { viet: 'Chời ơi!', ruby: 'チョイオイ', jp: 'うわ〜！マジか！', category: '驚き', emoji: '😲' },
  { viet: 'Trời ơi!', ruby: 'トイ オイ', jp: 'ああもう！信じられない！', category: '驚き', emoji: '😱' },
  { viet: 'Ôi giời!', ruby: 'オイ ゾイ', jp: 'なんてこった！', category: '驚き', emoji: '🤯' },
  { viet: 'Ủa?', ruby: 'ウア？', jp: 'え？なんで？（南部の軽い困惑）', category: '驚き', emoji: '🤔' },
  { viet: 'Hết hồn!', ruby: 'ヘッ ホン', jp: '魂が抜けた！びっくりしすぎ！', category: '驚き', emoji: '👻' },
  { viet: 'Rẻ quá!', ruby: 'ゼ クァー', jp: '安すぎる！', category: '驚き', emoji: '💸' },
  { viet: 'Trời ơi là trời!', ruby: 'ゾイ オイ ラー ゾイ', jp: 'もう本当に！（驚き＋呆れ）', category: '驚き', emoji: '🙆' },
  // 喜び
  { viet: 'Vui quá!', ruby: 'ヴイ クァー', jp: 'めっちゃ楽しい！', category: '喜び', emoji: '🎉' },
  { viet: 'Tuyệt vời!', ruby: 'トゥイェット ヴォイ', jp: '最高！素晴らしい！', category: '喜び', emoji: '✨' },
  { viet: 'Hạnh phúc quá!', ruby: 'ハイン フック クァー', jp: '幸せすぎる！', category: '喜び', emoji: '💖' },
  { viet: 'Ngon quá!', ruby: 'ゴン クァー', jp: 'めちゃうまい！', category: '喜び', emoji: '😋' },
  { viet: 'Ngon tuyệt!', ruby: 'ゴン トゥイェッ', jp: '絶品！最高においしい！', category: '喜び', emoji: '🤤' },
  { viet: 'Thơm quá!', ruby: 'トム クァー', jp: 'いい香り！（屋台のスープに）', category: '喜び', emoji: '🌸' },
  { viet: 'Được rồi!', ruby: 'ドゥック ゾイ', jp: 'オーケー、いいよ！', category: '喜び', emoji: '✅' },
  // 感謝
  { viet: 'Cảm ơn nhiều!', ruby: 'カム オン ニュー', jp: 'どうもありがとう！', category: '感謝', emoji: '🙏' },
  { viet: 'Bạn tốt quá!', ruby: 'バン トッ クァー', jp: '君って優しいね！', category: '感謝', emoji: '🥹' },
  { viet: 'Không có gì.', ruby: 'ホン コー ジー', jp: 'どういたしまして', category: '感謝', emoji: '😊' },
  // 苦笑
  { viet: 'Chán quá!', ruby: 'チャン クァー', jp: 'だる〜い！もう嫌だ！', category: '苦笑', emoji: '😮‍💨' },
  { viet: 'Thôi được rồi!', ruby: 'トイ ドゥック ゾイ', jp: 'まあ、しょうがないね', category: '苦笑', emoji: '🤷' },
  { viet: 'Mệt quá!', ruby: 'メッ クァー', jp: 'つかれたー！', category: '苦笑', emoji: '😴' },
  { viet: 'Sợ quá!', ruby: 'ソー クァー', jp: 'こわ〜！', category: '苦笑', emoji: '😨' },
  { viet: 'Đắt quá!', ruby: 'ダッ クァー', jp: '高すぎる！', category: '苦笑', emoji: '😅' },
  { viet: 'Kệ đi.', ruby: 'ケー ディ', jp: 'もういいや、ほっとこう', category: '苦笑', emoji: '😌' },
  // 拒否
  { viet: 'Không được!', ruby: 'ホン ドゥック', jp: 'ダメ！できない！', category: '拒否', emoji: '🙅' },
  { viet: 'Thôi, thôi.', ruby: 'トイ、トイ', jp: 'やめてやめて（やんわり断り）', category: '拒否', emoji: '✋' },
  { viet: 'Khỏi cần.', ruby: 'ホイ カン', jp: 'いらないよ、大丈夫', category: '拒否', emoji: '🙅' },
  // スラング
  { viet: 'Đỉnh quá!', ruby: 'ディン クァー', jp: 'やばい・最高すぎ！（Zスラング）', category: 'スラング', emoji: '🏔️' },
  { viet: 'Xịn quá!', ruby: 'シン クァー', jp: 'すごくかっこいい！クールすぎ！', category: 'スラング', emoji: '🔥' },
  { viet: 'Chất quá!', ruby: 'チャッ クァー', jp: 'センスある！本物感ある！', category: 'スラング', emoji: '😎' },
  { viet: 'Chill thôi.', ruby: 'チル トイ', jp: 'まったりしようよ（英語借用語）', category: 'スラング', emoji: '🧊' },
  { viet: 'Quá trời!', ruby: 'クァー ゾイ', jp: '超〜！（程度が過ぎる・南部）', category: 'スラング', emoji: '🌪️' },
  { viet: 'Kinh vãi!', ruby: 'キン ヴァイ', jp: 'やっばい！すごすぎ！（北部若者語）', category: 'スラング', emoji: '💥' },
];

export const englishCategories = ['屋台・注文', '値切り', '移動', '緊急', '自己紹介', 'ベトナムについて'] as const;

export const englishPhrases: EnglishPhrase[] = [
  // 屋台・注文
  { en: 'One of this, please.', jp: 'これをひとつください', category: '屋台・注文' },
  { en: 'Two of these, please.', jp: 'これをふたつください', category: '屋台・注文' },
  { en: 'How much is this?', jp: 'いくらですか？', category: '屋台・注文' },
  { en: 'No cilantro, please.', jp: 'パクチーなしでお願いします', category: '屋台・注文' },
  { en: 'Less spicy, please.', jp: '辛さ控えめにしてください', category: '屋台・注文' },
  { en: 'Is this pork?', jp: 'これは豚肉ですか？', category: '屋台・注文' },
  { en: "What's inside this?", jp: 'これの中身は何ですか？', category: '屋台・注文' },
  { en: 'To go, please.', jp: '持ち帰りでお願いします', category: '屋台・注文' },
  { en: 'No ice, please.', jp: '氷なしでお願いします', category: '屋台・注文' },
  { en: 'Same as that one.', jp: 'あれと同じものください', category: '屋台・注文' },
  { en: "It's too spicy for me.", jp: '私には辛すぎます', category: '屋台・注文' },
  { en: 'Is this vegetarian?', jp: 'ベジタリアン料理ですか？', category: '屋台・注文' },
  // 値切り
  { en: 'Can you go cheaper?', jp: 'もっと安くなる？', category: '値切り' },
  { en: "That's last price?", jp: 'それが最安値ですか？', category: '値切り' },
  { en: 'Too expensive for me.', jp: '私には高すぎます', category: '値切り' },
  { en: 'Can you do better?', jp: 'もう少し安くなりますか？', category: '値切り' },
  { en: "I'm buying two.", jp: 'ふたつ買います', category: '値切り' },
  { en: "I'll think about it.", jp: 'ちょっと考えます', category: '値切り' },
  { en: 'OK, deal.', jp: 'OK、それで！', category: '値切り' },
  { en: "No, that's too much.", jp: 'いいえ、高すぎます', category: '値切り' },
  { en: 'I only have this much.', jp: 'これしか持っていないんです', category: '値切り' },
  // 移動
  { en: 'Stop here, please.', jp: 'ここで止めてください', category: '移動' },
  { en: 'Take me to this address.', jp: 'この住所に連れて行って', category: '移動' },
  { en: 'How long to get there?', jp: 'どのくらいかかりますか？', category: '移動' },
  { en: 'Can you drive slower?', jp: 'もう少しゆっくり走れますか？', category: '移動' },
  { en: 'Is this the right way?', jp: 'この道で合っていますか？', category: '移動' },
  { en: 'Wait here, please.', jp: 'ここで待っていてください', category: '移動' },
  { en: "I'm using Grab.", jp: 'Grabを使っています', category: '移動' },
  { en: 'Turn left here.', jp: 'ここを左に曲がってください', category: '移動' },
  { en: 'Turn right here.', jp: 'ここを右に曲がってください', category: '移動' },
  { en: "I'm lost.", jp: '道に迷いました', category: '移動' },
  // 緊急
  { en: 'I need a doctor!', jp: '医者が必要です！', category: '緊急' },
  { en: 'Call the police!', jp: '警察を呼んでください！', category: '緊急' },
  { en: 'My wallet was stolen.', jp: '財布を盗まれました', category: '緊急' },
  { en: 'I need an ambulance.', jp: '救急車が必要です', category: '緊急' },
  { en: 'I feel very sick.', jp: 'とても気分が悪いです', category: '緊急' },
  { en: 'Can you help me?', jp: '助けてもらえますか？', category: '緊急' },
  { en: "Where's the hospital?", jp: '病院はどこですか？', category: '緊急' },
  { en: 'I lost my passport.', jp: 'パスポートをなくしました', category: '緊急' },
  { en: 'Please call this number.', jp: 'この番号に電話してください', category: '緊急' },
  // 自己紹介
  { en: "I'm from Japan.", jp: '日本から来ました', category: '自己紹介' },
  { en: 'Nice to meet you!', jp: 'はじめまして！', category: '自己紹介' },
  { en: "I'm interning here.", jp: 'ここでインターンをしています', category: '自己紹介' },
  { en: 'My Vietnamese is bad!', jp: 'ベトナム語が下手なんです！', category: '自己紹介' },
  { en: 'Can you teach me?', jp: '教えてもらえますか？', category: '自己紹介' },
  { en: "What's your name?", jp: 'お名前は何ですか？', category: '自己紹介' },
  { en: "Let's take a photo!", jp: '写真を撮りましょう！', category: '自己紹介' },
  { en: 'Add me on Zalo?', jp: 'Zaloで繋がりましょう！', category: '自己紹介' },
  { en: 'I want to learn more.', jp: 'もっと学びたいです', category: '自己紹介' },
  // ベトナムについて
  { en: 'This is my first time here.', jp: 'ここは初めてです', category: 'ベトナムについて' },
  { en: 'The food here is amazing.', jp: 'ここの食べ物は最高！', category: 'ベトナムについて' },
  { en: 'I love the coffee here.', jp: 'ここのコーヒーが大好きです', category: 'ベトナムについて' },
  { en: 'The people are so kind.', jp: '人々がとても親切ですね', category: 'ベトナムについて' },
  { en: "It's hotter than Japan!", jp: '日本より暑いですね！', category: 'ベトナムについて' },
  { en: 'The motorbikes are crazy!', jp: 'バイクがすごいですね！', category: 'ベトナムについて' },
  { en: 'Vietnam surprised me.', jp: 'ベトナムに驚かされました', category: 'ベトナムについて' },
  { en: 'I want to come back.', jp: 'また来たいです', category: 'ベトナムについて' },
  { en: 'Saigon never sleeps!', jp: 'サイゴンは眠らない街ですね！', category: 'ベトナムについて' },
];

export const mixConversations: MixConversation[] = [
  {
    category: '屋台で注文',
    steps: [
      { text: '→ 屋台のおばちゃんに話しかける', lang: 'note' },
      { text: 'Hi! One bowl of pho, please.', lang: 'en' },
      { text: '→ スープが運ばれてきた瞬間', lang: 'note' },
      { text: 'Ngon quá!', lang: 'viet' },
      { text: 'Can I have more herbs? And... chili?', lang: 'en' },
      { text: '→ おばちゃんが山盛りにしてくれた', lang: 'note' },
      { text: 'Chời ơi!', lang: 'viet' },
      { text: 'Thank you! How much is it?', lang: 'en' },
      { text: "Cảm ơn! That's so cheap!", lang: 'mixed', viet: 'Cảm ơn! ', en: "That's so cheap!" },
    ],
  },
  {
    category: '屋台（夜・バインミー）',
    steps: [
      { text: '→ 夜の屋台でバインミーを発見', lang: 'note' },
      { text: 'Excuse me, one banh mi please. No cilantro!', lang: 'en' },
      { text: '→ 一口かじった', lang: 'note' },
      { text: 'Chất!', lang: 'viet' },
      { text: 'Ngon quá! This is the best sandwich ever.', lang: 'mixed', viet: 'Ngon quá! ', en: 'This is the best sandwich ever.' },
      { text: "I'll come back tomorrow. Same order!", lang: 'en' },
    ],
  },
  {
    category: '市場で値切り',
    steps: [
      { text: '→ お土産の値段を聞く', lang: 'note' },
      { text: 'Hi! How much is this?', lang: 'en' },
      { text: '→「200,000ドンです」と言われた', lang: 'note' },
      { text: 'Đắt quá!', lang: 'viet' },
      { text: "That's a little expensive... Can you go lower?", lang: 'en' },
      { text: "Hmm... 100,000? I'm buying three.", lang: 'en' },
      { text: '→ 120,000で折れてくれた', lang: 'note' },
      { text: 'Thôi kệ! OK, deal.', lang: 'mixed', viet: 'Thôi kệ! ', en: 'OK, deal.' },
    ],
  },
  {
    category: '市場（布・服）',
    steps: [
      { text: '→ アオザイの生地を手にとって', lang: 'note' },
      { text: 'This fabric is beautiful! Is it real silk?', lang: 'en' },
      { text: '→「シルクだよ、350,000ドン」と言われた', lang: 'note' },
      { text: 'Chời ơi!', lang: 'viet' },
      { text: "I'm a student... Can you do 200,000?", lang: 'en' },
      { text: '→ 250,000で妥結', lang: 'note' },
      { text: 'Tuyệt vời! Thank you, you made my day.', lang: 'mixed', viet: 'Tuyệt vời! ', en: 'Thank you, you made my day.' },
    ],
  },
  {
    category: 'タクシー乗車',
    steps: [
      { text: '→ Grabをつかまえた', lang: 'note' },
      { text: 'Hi! Can you go to Ben Thanh Market, please?', lang: 'en' },
      { text: '→ ものすごいスピードで走り出した', lang: 'note' },
      { text: 'Ôi giời!', lang: 'viet' },
      { text: 'Um... could you slow down a little? Thank you.', lang: 'en' },
      { text: '→ 目的地に着いた', lang: 'note' },
      { text: 'Cảm ơn! Have a great day!', lang: 'mixed', viet: 'Cảm ơn! ', en: 'Have a great day!' },
    ],
  },
  {
    category: 'はじめまして',
    steps: [
      { text: '→ インターン先で同期の子に話しかけられた', lang: 'note' },
      { text: "Hi! I'm from Japan. Nice to meet you!", lang: 'en' },
      { text: 'Can you teach me how to say your name?', lang: 'en' },
      { text: '→ 発音を教えてもらって、うまくできた！', lang: 'note' },
      { text: 'Vui quá!', lang: 'viet' },
      { text: "Tuyệt vời! I think we'll be great friends.", lang: 'mixed', viet: 'Tuyệt vời! ', en: "I think we'll be great friends." },
    ],
  },
  {
    category: '観光スポット',
    steps: [
      { text: '→ ホイアンの橋の前に来た', lang: 'note' },
      { text: 'Excuse me, could you take a photo of me?', lang: 'en' },
      { text: '→ 夕暮れにランタンが灯る景色を見て', lang: 'note' },
      { text: 'Tuyệt vời!', lang: 'viet' },
      { text: "This is the most beautiful place I've ever seen.", lang: 'en' },
      { text: 'Cảm ơn! I learned so much from you today.', lang: 'mixed', viet: 'Cảm ơn! ', en: 'I learned so much from you today.' },
    ],
  },
  {
    category: 'ビーチ・プール',
    steps: [
      { text: '→ ダナンのビーチ、海に入った瞬間', lang: 'note' },
      { text: 'Chời ơi!', lang: 'viet' },
      { text: 'The water is so clear! I can see my feet!', lang: 'en' },
      { text: '→ 地元の子どもたちが話しかけてきた', lang: 'note' },
      { text: 'Hi! Do you want to play?', lang: 'en' },
      { text: 'Vui quá!', lang: 'viet' },
      { text: "Tuyệt vời! This is the best day of my internship.", lang: 'mixed', viet: 'Tuyệt vời! ', en: "This is the best day of my internship." },
    ],
  },
  {
    category: 'インターン先での会話',
    steps: [
      { text: '→ 先生がプロジェクトの締め切りを説明してくれた', lang: 'note' },
      { text: 'Could you explain the deadline again?', lang: 'en' },
      { text: '→「来週月曜、朝8時」と言われた', lang: 'note' },
      { text: 'Ôi giời!', lang: 'viet' },
      { text: "Okay, I'll do my best. Can I ask questions by email?", lang: 'en' },
      { text: '→ 同僚がランチに誘ってくれて、絶品コムタム屋へ', lang: 'note' },
      { text: 'Ngon quá! Bring me here every week!', lang: 'mixed', viet: 'Ngon quá! ', en: 'Bring me here every week!' },
    ],
  },
  {
    category: '雨・天気',
    steps: [
      { text: '→ スコールが突然降り出した', lang: 'note' },
      { text: 'Trời ơi!', lang: 'viet' },
      { text: 'Excuse me, can I wait here until the rain stops?', lang: 'en' },
      { text: '→ 軒先に入れてもらえてお茶を出してくれた', lang: 'note' },
      { text: "Cảm ơn! You're so kind. I wasn't prepared at all.", lang: 'mixed', viet: 'Cảm ơn! ', en: "You're so kind. I wasn't prepared at all." },
      { text: 'Does it rain like this every day?', lang: 'en' },
      { text: '→「30分で止むよ」と教えてもらった', lang: 'note' },
      { text: "Good to know! I'll buy an umbrella tomorrow.", lang: 'en' },
    ],
  },
  {
    category: '迷子になった',
    steps: [
      { text: '→ スマホの地図がズレて全然わからなくなった', lang: 'note' },
      { text: 'Chời ơi!', lang: 'viet' },
      { text: "Excuse me, I'm a little lost. Do you speak English?", lang: 'en' },
      { text: "I'm looking for Bui Vien Street. Is it far?", lang: 'en' },
      { text: '→「歩いて5分、一緒に行くよ」と言われた', lang: 'note' },
      { text: 'Really?! Thank you so much!', lang: 'en' },
      { text: 'Tuyệt vời! Cảm ơn! You literally saved my evening.', lang: 'mixed', viet: 'Tuyệt vời! Cảm ơn! ', en: 'You literally saved my evening.' },
    ],
  },
  {
    category: 'ローカルフード挑戦',
    steps: [
      { text: '→ 同僚にバロット（孵化前のアヒルの卵）を勧められた', lang: 'note' },
      { text: "Wait... what's inside this egg exactly?", lang: 'en' },
      { text: '→「赤ちゃんアヒルだよ」と教えられた', lang: 'note' },
      { text: 'Ôi giời!', lang: 'viet' },
      { text: "Okay... I'll try it. Just a small bite.", lang: 'en' },
      { text: '→ 意外と食べられた！', lang: 'note' },
      { text: 'Chất!', lang: 'viet' },
      { text: "Ngon quá! I can't believe I almost said no.", lang: 'mixed', viet: 'Ngon quá! ', en: "I can't believe I almost said no." },
      { text: 'Vui quá!', lang: 'viet' },
    ],
  },
];
