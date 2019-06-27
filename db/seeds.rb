# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User
[
  ['テストユーザ', 'user@test.com', 'test'],
  ['ディオ・ブランドー', 'dio1@test.com', 'dio'],
  ['カーズ', 'kars@test.com', 'kars'],
  ['DIO', 'dio3@test.com', 'dio'],
  ['吉良吉影', 'kira@test.com', 'kira'],
  ['ディアボロ', 'diavolo@test.com', 'diavolo'],
  ['エンリコ・プッチ', 'pucci@test.com', 'pucci'],
  ['ファニー・ヴァレンタイン', 'funny@test.com', 'funny']
].each do |name, email, password|
  User.create!(
    {name: name, email: email, password: password}
  )
end

# Like
[
  ['1', '1']
].each do |usr_id, frg_id|
  Like.create!(
    {user_id: usr_id, fragment_id: frg_id}
  )
end


# Showcase
[
  ['教訓になるアニメ作品', 1],
  ['人生に向き会う読書', 2],
  ['心に根付く音楽', 3]
].each do |name, usr_id|
  Showcase.create!(
    {name: name, user_id: usr_id}
  )
end

# Crystal
[
  ['ジョジョの奇妙な冒険', 1, 1],
  ['宝石の国', 1, 1],
  ['開発裏話', 1, nil],
  ['タタール人の砂漠', 2, 2],
  ['サウンドトラック', 3, 3]
].each do |name, usr_id, shw_id|
  Crystal.create!(
    {name: name, user_id: usr_id, showcase_id: shw_id}
  )
end

# Fragment
[
  ['第5部「黄金の風」イントロダクション', {'blocks': [
    {
      'key': 'c9f8n',
      'text': 'ONAIR',
      'type': 'header-one',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': '63u1o',
      'text': '2018年10月5日より放送開始',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': 'biqqi',
      'text': 'TOKYO MX：金曜 25:05 〜',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': 'd3hcp',
      'text': 'BS11　　　：金曜 25:30 〜',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': 'ap650',
      'text': 'CHARACTER',
      'type': 'header-one',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': 'fnsog',
      'text': 'ジョルノ・ジョバァーナ：小野賢章',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': '5kcam',
      'text': 'ブローノ・ブチャラティ：中村悠一',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': '27og7',
      'text': 'レオーネ・アバッキオ　：諏訪部順一',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': '908a3',
      'text': 'グイード・ミスタ　　　：鳥海浩輔',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': 'fogjp',
      'text': 'ナランチャ・ギルガ　　：山下大輝',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': '4qs2l',
      'text': 'パンナコッタ・フーゴ　：榎木淳弥',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': 'a20lm',
      'text': 'トリッシュ・ウナ　　　：千本木彩花',
      'type': 'unordered-list-item',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': '9t49f',
      'text': 'STORY',
      'type': 'header-one',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': 'd27o8',
      'text': 'イタリア裏社会を牛耳るギャング組織「パッショーネ」。 \n組織に属するジョルノ・ジョバァーナには、街に麻薬を流す「ボス」を倒し、頂点に立つという夢があった。 \nブローノ・ブチャラティ率いるジョルノたちは、ポルポの遺産100億リラを組織に納めることに成功。 \n幹部となったブチャラティに下されたのは、『ボスの娘トリッシュ・ウナを護衛する』という、ボスじきじきの命令だった。 \n組織の裏切り者たちが、秘密に隠されたボスの正体を掴むため、トリッシュを狙いジョルノたちを襲う。 \n指令を果たし、ボスに近づき、自らの夢をかなえるため、ジョルノはブチャラティ、そして仲間のレオーネ・アバッキオ、',
      'type': 'unstyled',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    },
    {
      'key': '39d87',
      'text': 'グイード・ミスタ、ナランチャ・ギルガ、パンナコッタ・フーゴと共に、迫りくる脅威に立ち向かっていく……。',
      'type': 'unstyled',
      'depth': 0,
      'inlineStyleRanges': [],
      'entityRanges': [],
      'data': {}
    }
  ],
  'entityMap': {}}, 1, 1],
  ['「強くてもろくて美しい」宝石の国 イントロダクション', {"blocks": [{"key": "ami67", "data": {}, "text": "今から遠い未来，僕らは「宝石」になった ──", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "erl9c", "data": {}, "text": "講談社「アフタヌーン」で連載中、市川春子原作、累計発行部数140万部突破の人気コミック「宝石の国」。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "5abkg", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "49bmd", "data": {}, "text": "今から遠い未来，かつて存在した生物が不死の身体をもつ「宝石」になった世界で，", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "dq3d7", "data": {}, "text": "月から飛来する謎の敵“月人”と宝石たちとの激し
  い戦いを描く，強くてもろくて美しいアクションファンタジーコミック。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "6agsp", "data": {}, "text": "連載当初より，その独創的な世界観と個性的で美しい宝石たちの魅力，そして謎に包まれた物語が人気を博して注目を集めている。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "a0ugh", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "f3d1", "data": {}, "text": "これは，成長の物語 ──", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "56t0m", "data": {}, "text": "宝石たちの中で最年少のフォスフォフィライトは，硬度三半とひときわ脆く，靭性も弱くて戦闘に向かない。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "58vad", "data": {}, "text": "また，他の仕事の適性もない。そのくせ口だけは一丁前というまさ
  に正真正銘の落ちこぼれだった。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "fak3j", "data": {}, "text": "そんなフォ
  スに，三百歳を目前にしてやっと初めての仕事が与えられる。それは博物誌編纂という仕事。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "9h4ie", "data": {}, "text": "地味な仕事に不満なフォスだったが，彼はその目で世界を見て様々なことを経験する中で，", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "14gqi", "data": {}, "text": "しだいに大きなうねりに飲み込まれてゆく。そしてついに，彼は望まぬかたちで，欲しかった“強さ”を手にするのだが──。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "5itn6", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "9cg7h", "data": {}, "text": "これは，友情の物語 ──", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "9m6nk", "data": {}, "text": "フォス以上の特異体質をもつのが，シンシャ。ただそこにいるだけで体から毒液を撒き散らしてしまうシンシャは，", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "4rmkk", "data": {}, "text": "周
  りに迷惑を掛けまいと，独り夜に引きこもり心を閉ざしていた。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "dl4sb", "data": {}, "text": "ある日，月人に攫われそうになったところをシンシャに助けられたフォスは，「次は自分が君を救ってみせる」と約束する。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "e4gue", "data": {}, "text": "博物誌の編纂に奔走しながら，シンシャが明るい世界に出てこられるよう，彼向けの仕事を探そうとするフォス。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "164h4", "data": {}, "text": "果たしてフ
  ォスの想いはシンシャに届くのか？そして，二人の約束が果たされる日は来るのか──？", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "2aerl", "data": {}, "text": "", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "21ke6", "data": {}, "text": "これは，戦いの物語 ──", "type": "header-one", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "5tq6m", "data": {}, "text": "月から飛来する謎の敵“
  月人”。彼らは宝石たちを装飾品にしようと特に美しい宝石を好み，一人また一人と宝石を攫っていくが，", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "2sdb4", "data": {}, "text": "その正体は不明。しかも攫われた宝石は加工されて武器となり，宝石たちを苦しめる。", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "ap1c7", "data": {}, "text": "さらに月人はどんどん改良され，強力になってゆく。次々と現れる月人に二
  十八体の宝石たちは勝利することができるのか？", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}, {"key": "cd7pg", "data": {}, "text": "彼らの真の目的とは何なのか？この終わりのない戦いに終止符は打たれるのか？", "type": "unstyled", "depth": 0, "entityRanges": [], "inlineStyleRanges": []}], "entityMap": {}}, 1, 2]
].each do |name, cont, usr_id, crs_id|
  Fragment.create!(
    {name: name, content: cont, user_id: usr_id, crystal_id: crs_id}
  )
end
