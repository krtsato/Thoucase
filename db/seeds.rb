# encoding: utf-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Showcase
Showcase.create!(
  name: "アニメ作品",
  user_id: 1
)

# Crystal
Crystal.create!(
  name: "ジョジョの奇妙な冒険",
  user_id: 1,
  showcase_id: 1
)

# Fragment
Fragment.create!(
  name: "第5部「黄金の風」イントロダクション",
  content: {
    "blocks": [
      {
        "key": "c9f8n",
        "text": "ONAIR",
        "type": "header-one",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "63u1o",
        "text": "2018年10月5日より放送開始",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "biqqi",
        "text": "TOKYO MX：金曜 25:05 〜",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "d3hcp",
        "text": "BS11　　　：金曜 25:30 〜",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "ap650",
        "text": "CHARACTER",
        "type": "header-one",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "fnsog",
        "text": "ジョルノ・ジョバァーナ：小野賢章",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "5kcam",
        "text": "ブローノ・ブチャラティ：中村悠一",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "27og7",
        "text": "レオーネ・アバッキオ　：諏訪部順一",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "908a3",
        "text": "グイード・ミスタ　　　：鳥海浩輔",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "fogjp",
        "text": "ナランチャ・ギルガ　　：山下大輝",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "4qs2l",
        "text": "パンナコッタ・フーゴ　：榎木淳弥",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "a20lm",
        "text": "トリッシュ・ウナ　　　：千本木彩花",
        "type": "unordered-list-item",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "9t49f",
        "text": "STORY",
        "type": "header-one",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "d27o8",
        "text": "イタリア裏社会を牛耳るギャング組織「パッショーネ」。 \n組織に属するジョルノ・ジョバァーナには、街に麻薬を流す「ボス」を倒し、頂点に立つという夢があった。 \nブローノ・ブチャラティ率いるジョルノたちは、ポルポの遺産100億リラを組織に納めることに成功。 \n幹部となったブチャラティに下されたのは、『ボスの娘トリッシュ・ウナを護衛する』という、ボスじきじきの命令だった。 \n組織の裏切り者たちが、秘密に隠されたボスの正体を掴むため、トリッシュを狙いジョルノたちを襲う。 \n指令を果たし、ボスに近づき、自らの夢をかなえるため、ジョルノはブチャラティ、そして仲間のレオーネ・アバッキオ、",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "39d87",
        "text": "グイード・ミスタ、ナランチャ・ギルガ、パンナコッタ・フーゴと共に、迫りくる脅威に立ち向かっていく……。",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      }
    ],
    "entityMap": {}
  },
  user_id: 1,
  crystal_id: 1
)