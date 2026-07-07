import questionSceneLife01 from "../assets/question-scene-life-01.webp";
import questionSceneLife02 from "../assets/question-scene-life-02.webp";
import questionSceneLife03 from "../assets/question-scene-life-03.webp";
import questionSceneLife04 from "../assets/question-scene-life-04.webp";
import questionSceneLife05 from "../assets/question-scene-life-05.webp";
import questionSceneLife06 from "../assets/question-scene-life-06.webp";
import questionSceneLife07 from "../assets/question-scene-life-07.webp";
import questionSceneLife08 from "../assets/question-scene-life-08.webp";

function option(key, text, score, tag, dims) {
  return { key, text, score, tag, dims };
}

export const DIMENSIONS = {
  sync: {
    label: "万物皆可拉通",
    identity: "信息拉通民间传人",
    symptom: "你已经能把吃饭拆成目标、抓手、时间窗、责任人和验收标准。",
    prescription: "今天别开群会，直接说“我想吃这个”。",
  },
  closure: {
    label: "闭环不成眠",
    identity: "闭环强迫症候群",
    symptom: "一句“回头再说”，会在你脑内自动进入待跟进池，还想补一行周报。",
    prescription: "今天允许一件小事不沉淀、不复盘、不写进周报。",
  },
  polite: {
    label: "收到学满级",
    identity: "收到辛苦条件反射体",
    symptom: "嘴上“收到辛苦”，灵魂已经进入低功耗模式。",
    prescription: "普通消息只回“好”，别给每个标点赋能。",
  },
  tolerance: {
    label: "背锅兜底体质",
    identity: "锅来我先兜底型人格",
    symptom: "问题刚冒头，你已经在脑内拆风险、排资源、想兜底，还顺手准备背锅。",
    prescription: "今天拒绝一次“顺手看下”，让锅先回到它的责任链路。",
  },
  afterwork: {
    label: "下班仍在线",
    identity: "飞书残影黑化中",
    symptom: "你点咖啡都要确认豆子、冰量和杯型，生活被工作链路打通，黑化值稳定上涨。",
    prescription: "下班后给红点降级处理，30 分钟内不做任何响应。",
  },
};

export const QUESTIONS = [
  {
    type: "突发需求检测",
    title: "周五晚上 20:58，老板口头说“这个需求很简单，今天能看一下吗？”",
    sceneImage: questionSceneLife01,
    options: [
      option("A", "今晚不方便，下周看", 2, "下班边界守门员", { afterwork: 1 }),
      option("B", "我先看优先级和影响面", 10, "优先级护盾", { closure: 2, tolerance: 1 }),
      option("C", "收到，我先过一版风险点", 16, "风险预判肌肉", { polite: 3, tolerance: 2 }),
      option("D", "我拉通相关方，今晚给初判和推进路径", 20, "拉通推进一条龙", {
        sync: 3,
        tolerance: 3,
        afterwork: 2,
      }),
    ],
  },
  {
    type: "周末生活检测",
    title: "朋友问你周末去哪玩，你第一反应是？",
    sceneImage: questionSceneLife02,
    options: [
      option("A", "去徒步，晒晒太阳", 1, "户外回血派", { afterwork: 0 }),
      option("B", "打会游戏吧，好久没打了", 2, "游戏复健派", { afterwork: 0 }),
      option("C", "带娃，周末已经排满", 8, "周末带娃值班", { afterwork: 1, tolerance: 1 }),
      option("D", "睡觉，谁也别找我", 12, "睡眠回血派", {
        afterwork: 3,
        closure: 1,
      }),
    ],
  },
  {
    type: "会议残留检测",
    title: "开会时听到“简单过一下”，你会？",
    sceneImage: questionSceneLife03,
    options: [
      option("A", "ok啊，应该很快", 2, "会议轻松派", { closure: 0 }),
      option("B", "看一下会议，然后安排", 8, "会议排期观察员", { afterwork: 1, closure: 1 }),
      option("C", "打开文档，准备沉淀待办和结论", 15, "待办沉淀员", { closure: 3, polite: 1 }),
      option("D", "退掉刚点的拼好饭", 18, "拼好饭撤退选手", {
        tolerance: 2,
        afterwork: 3,
      }),
    ],
  },
  {
    type: "消息红点检测",
    title: "对方发来“在吗”，你脑内响起的是？",
    sceneImage: questionSceneLife04,
    options: [
      option("A", "在啊，怎么了", 3, "仍相信世界", { polite: 1 }),
      option("B", "先不回，等他把需求说明白", 7, "已读观察员", { closure: 1 }),
      option("C", "开始预判是不是新需求入口", 14, "需求雷达响了", { tolerance: 3 }),
      option("D", "已经准备好“我这边排期比较满”", 18, "边界防火墙启动", {
        closure: 2,
        polite: 2,
        tolerance: 2,
      }),
    ],
  },
  {
    type: "客气肌肉检测",
    title: "群里突然有人说“辛苦了”，你第一反应是？",
    sceneImage: questionSceneLife05,
    options: [
      option("A", "谢谢", 2, "善意直收", { polite: 1 }),
      option("B", "还好还好", 7, "客气肌肉记忆", { polite: 2 }),
      option("C", "不辛苦，都是应该支持的", 13, "工牌长在嘴上", { polite: 3 }),
      option("D", "判断后面是不是还有背锅和兜底", 19, "辛苦了警报器", {
        closure: 2,
        tolerance: 3,
      }),
    ],
  },
  {
    type: "下班切换检测",
    title: "下班后你最像哪种状态？",
    sceneImage: questionSceneLife06,
    options: [
      option("A", "立刻切换生活模式", 1, "下班即复活", { afterwork: 0 }),
      option("B", "需要缓一会儿，把工位残影散掉", 6, "工位余震", { afterwork: 1 }),
      option("C", "红点一亮，黑化值自动加一", 14, "红点过敏体质", { afterwork: 3, closure: 1 }),
      option("D", "梦里还在复盘绩效为什么不如预期", 20, "梦里也在复盘", {
        afterwork: 4,
        closure: 2,
      }),
    ],
  },
  {
    type: "职场话术检测",
    title: "同事问“这个事情你怎么看？”，你会？",
    sceneImage: questionSceneLife07,
    options: [
      option("A", "我觉得不太行", 3, "人话幸存者", { polite: 0 }),
      option("B", "这个可能需要再拉一下口径", 9, "委婉加载中", { polite: 2 }),
      option("C", "方向可以，但要看资源水位和节奏", 16, "标准接口已上线", {
        polite: 3,
        sync: 1,
      }),
      option("D", "先拆目标，再对齐边界、抓手和验收口径", 20, "会议纪要转世", {
        sync: 3,
        closure: 3,
      }),
    ],
  },
  {
    type: "咖啡话术检测",
    title: "你点咖啡时最可能说？",
    sceneImage: questionSceneLife08,
    options: [
      option("A", "冰美式就行", 1, "正常续命人", { afterwork: 0 }),
      option("B", "看一下今天状态", 5, "今日电量不足", { afterwork: 1 }),
      option("C", "口味上想清爽一点，别太酸", 12, "咖啡需求方", { polite: 2, sync: 1 }),
      option("D", "先确认豆子、冰量和杯型口径", 18, "咖啡颗粒度负责人", {
        sync: 3,
        afterwork: 2,
      }),
    ],
  },
];

export const LEVELS = [
  {
    min: 0,
    max: 20,
    name: "人类样本",
    title: "工牌还没腌进灵魂",
    summary: "你还能用人话说人事，暂未被“颗粒度”污染，建议继续保护。",
    stamp: "合格",
  },
  {
    min: 21,
    max: 40,
    name: "周报轻症",
    title: "班味刚挂边",
    summary: "你偶尔会说“我看一下”，但还没把买菜说成供应链协同。",
    stamp: "微腌",
  },
  {
    min: 41,
    max: 60,
    name: "会议半黑化",
    title: "已进入同步半径",
    summary: "你开始用开会语言处理生活问题，约饭前会先同步信息差。",
    stamp: "半熟",
  },
  {
    min: 61,
    max: 80,
    name: "飞书包浆体",
    title: "嘴上收到，心里离职",
    summary: "你稳定、体面、疲惫，已经能把拒绝包装成风险前置和资源约束。",
    stamp: "包浆",
  },
  {
    min: 81,
    max: 100,
    name: "绩效季黑化体",
    title: "人在下班，魂在飞书",
    summary: "你不是在上班，就是在给生活做闭环；今晚请强制断开工作链路，防止继续黑化。",
    stamp: "爆表",
  },
];

export const SCAN_MESSAGES = [
  "正在读取工牌残留波形",
  "正在校准黑话颗粒度",
  "正在扫描打工人黑化值",
  "正在生成班味沉淀报告",
];
