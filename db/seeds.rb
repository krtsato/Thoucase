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
  'entityMap': {}}, 1, 1]
].each do |name, cont, usr_id, crs_id|
  Fragment.create!(
    {name: name, content: cont, user_id: usr_id, crystal_id: crs_id}
  )
end
