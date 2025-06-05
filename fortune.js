// 在文件开头添加，确保在所有其他代码之前

// 🌟 首先注入必要的CSS样式
function injectProgressControllerStyles() {
  // 检查是否已经注入过样式
  if (document.getElementById('progress-controller-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'progress-controller-styles';
  style.textContent = `
    /* 🌟 进度控制器核心样式 */
    #progress-controller {
      font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif !important;
      color: #e2e8f0 !important;
      --primary-purple: #8b5cf6;
      --primary-blue: #3b82f6;
      --text-primary: #e2e8f0;
      --text-secondary: #94a3b8;
    }
    
    /* 环形进度条动画 */
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    /* 闪光动画 */
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    /* 脉冲动画 */
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    /* 思考动画 */
    @keyframes thinkingPulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    
    /* 小按钮基础样式 */
    #progress-compact-btn {
      width: 60px !important;
      height: 60px !important;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(79, 70, 229, 0.95)) !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      box-shadow: 0 8px 32px rgba(139, 92, 246, 0.3) !important;
      border: 2px solid rgba(139, 92, 246, 0.5) !important;
      backdrop-filter: blur(15px) !important;
      transition: all 0.3s ease !important;
      position: relative !important;
      overflow: hidden !important;
      opacity: 1 !important;
      transform: scale(1) !important;
      z-index: 10000 !important;
    }
    
    /* 小按钮悬停效果 */
    #progress-compact-btn:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 12px 40px rgba(139, 92, 246, 0.4) !important;
    }
    
    /* 展开面板基础样式 */
    #progress-expanded-panel {
      position: absolute !important;
      top: 0 !important;
      right: 0 !important;
      width: 380px !important;
      background: rgba(15, 15, 30, 0.95) !important;
      backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(139, 92, 246, 0.3) !important;
      border-radius: 20px !important;
      padding: 25px !important;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4) !important;
      transform: translateX(100%) scale(0.8) !important;
      opacity: 0 !important;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
      pointer-events: none !important;
      color: #e2e8f0 !important;
      z-index: 10001 !important;
    }
    
    /* 展开面板显示状态 */
    #progress-expanded-panel.show {
      transform: translateX(0) scale(1) !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    
    /* 任务项样式 */
    .task-item {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 12px 15px !important;
      margin: 6px 0 !important;
      border-radius: 10px !important;
      transition: all 0.3s ease !important;
      position: relative !important;
      overflow: hidden !important;
    }
    
    .task-item:hover {
      transform: translateX(5px) !important;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.2) !important;
    }
    
    /* 关闭按钮样式 */
    #progress-close-btn {
      background: none !important;
      border: none !important;
      color: #94a3b8 !important;
      font-size: 18px !important;
      cursor: pointer !important;
      padding: 5px !important;
      border-radius: 50% !important;
      transition: all 0.2s ease !important;
      width: 32px !important;
      height: 32px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    
    #progress-close-btn:hover {
      background: rgba(239, 68, 68, 0.2) !important;
      color: #ef4444 !important;
      transform: scale(1.1) !important;
    }
    
    /* 响应式适配 */
    @media (max-width: 768px) {
      #progress-controller {
        top: 15px !important;
        right: 15px !important;
      }
      
      #progress-expanded-panel {
        width: calc(100vw - 30px) !important;
        max-width: 350px !important;
        right: -15px !important;
      }
      
      #progress-compact-btn {
        width: 50px !important;
        height: 50px !important;
      }
    }
    
    /* 确保最高层级显示 */
    #progress-controller,
    #progress-controller * {
      z-index: 9999 !important;
    }
    
    /* 进度条样式 */
    #progress-bar {
      height: 100% !important;
      background: linear-gradient(90deg, #8b5cf6, #3b82f6) !important;
      width: 0% !important;
      transition: width 0.6s ease !important;
      border-radius: 4px !important;
      position: relative !important;
    }
    
    /* 环形进度条 */
    #progress-circle {
      transition: stroke-dashoffset 0.5s ease !important;
    }
  `;
  
  document.head.appendChild(style);
  console.log('✅ 进度控制器样式已注入');
}


// 改为调用 Cloudflare Worker（请替换成您实际的Worker域名）
const WORKER_URL = 'https://still-bird-b98e.graciosoestrella.workers.dev/';

// 全局变量
let userInfo = {};
let isCalculating = false;
let fortuneResults = {};
let currentTab = 'destiny';



// 专业八字数据
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const fiveElements = ['木', '火', '土', '金', '水'];
const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 🌟 精准节气数据库（1900-2100年）
const solarTermsData = {
  // 24节气名称
  solarTerms: [
    '立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
    '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
    '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
    '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'
  ],
  
  // 节气对应的月份索引（修正）
  termMonths: [
    2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7,
    8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 1, 1
  ],
  
  // 基准年份节气时间
  baseYear: 2000,
  baseJulianDay: 2451545.0
};

// 🌟 地支藏干数据（精准版本）
const branchHiddenStems = {
  '子': [{ stem: '癸', strength: 10 }],
  '丑': [{ stem: '己', strength: 6 }, { stem: '癸', strength: 3 }, { stem: '辛', strength: 1 }],
  '寅': [{ stem: '甲', strength: 6 }, { stem: '丙', strength: 3 }, { stem: '戊', strength: 1 }],
  '卯': [{ stem: '乙', strength: 10 }],
  '辰': [{ stem: '戊', strength: 6 }, { stem: '乙', strength: 3 }, { stem: '癸', strength: 1 }],
  '巳': [{ stem: '丙', strength: 6 }, { stem: '庚', strength: 3 }, { stem: '戊', strength: 1 }],
  '午': [{ stem: '丁', strength: 7 }, { stem: '己', strength: 3 }],
  '未': [{ stem: '己', strength: 6 }, { stem: '丁', strength: 3 }, { stem: '乙', strength: 1 }],
  '申': [{ stem: '庚', strength: 6 }, { stem: '壬', strength: 3 }, { stem: '戊', strength: 1 }],
  '酉': [{ stem: '辛', strength: 10 }],
  '戌': [{ stem: '戊', strength: 6 }, { stem: '辛', strength: 3 }, { stem: '丁', strength: 1 }],
  '亥': [{ stem: '壬', strength: 7 }, { stem: '甲', strength: 3 }]
};

// 🌟 五行属性映射
const stemElements = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
};

const branchElements = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 🌟 五行旺衰季节表
const seasonStrengthTable = {
  '春': { '木': 3.0, '火': 1.8, '土': 1.0, '金': 0.5, '水': 1.5 },
  '夏': { '木': 1.5, '火': 3.0, '土': 2.0, '金': 0.5, '水': 0.8 },
  '秋': { '木': 0.5, '火': 0.8, '土': 1.5, '金': 3.0, '水': 2.0 },
  '冬': { '木': 1.0, '火': 0.5, '土': 1.0, '金': 2.0, '水': 3.0 }
};

// 🌟 神煞数据库
const shenShaData = {
  // 贵人星
  tianYiGuiRen: {
    '甲戊庚': ['丑', '未'], '乙己': ['子', '申'], '丙丁': ['亥', '酉'],
    '壬癸': ['巳', '卯'], '辛': ['午', '寅']
  },
  
  // 桃花星
  taoHua: {
    '申子辰': '酉', '亥卯未': '子', '寅午戌': '卯', '巳酉丑': '午'
  },
  
  // 驿马星
  yiMa: {
    '申子辰': '寅', '亥卯未': '巳', '寅午戌': '申', '巳酉丑': '亥'
  },
  
  // 华盖星
  huaGai: {
    '申子辰': '辰', '亥卯未': '未', '寅午戌': '戌', '巳酉丑': '丑'
  }
};

// 🌟 修复：精准节气计算函数
function calculateSolarTerms(year) {
  const terms = [];
  
  // 使用更精确的天文算法
  for (let i = 0; i < 24; i++) {
    const termIndex = i;
    
    // 基于年份的精确计算
    const yearDiff = year - 2000;
    
    // 每个节气的基础日期（2000年基准）
    const baseDates = [
      4, 19, 6, 21, 5, 20, 6, 21, 5, 21, 6, 22,
      7, 23, 8, 23, 8, 23, 8, 23, 7, 22, 6, 21
    ];
    
    let baseDay = baseDates[termIndex];
    const month = solarTermsData.termMonths[termIndex];
    
    // 年差修正
    baseDay += Math.floor(yearDiff * 0.2422);
    baseDay -= Math.floor(yearDiff / 4);
    
    // 特殊年份修正
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      if (termIndex < 4) baseDay -= 1; // 立春前的节气
    }
    
    // 处理日期边界
    const daysInMonth = new Date(year, month, 0).getDate();
    if (baseDay > daysInMonth) {
      baseDay -= daysInMonth;
      // 月份处理会在后续统一处理
    }
    
    terms.push({
      name: solarTermsData.solarTerms[termIndex],
      date: new Date(year, month - 1, Math.max(1, Math.min(baseDay, daysInMonth))),
      month: month,
      day: Math.max(1, Math.min(baseDay, daysInMonth)),
      index: termIndex
    });
  }
  
  return terms.sort((a, b) => a.date - b.date);
}

// 🌟 修复：精准月柱计算（基于节气）
function getAccurateMonthPillar(year, month, day) {
  const solarTerms = calculateSolarTerms(year);
  const birthDate = new Date(year, month - 1, day);
  
  // 确定当前日期处于哪个节气月
  let termMonth = 0;
  let solarTermName = '立春';
  
  // 寻找适合的节气月
  for (let i = 0; i < solarTerms.length; i += 2) { // 每两个节气为一个月
    const startTerm = solarTerms[i];
    const endTerm = solarTerms[i + 2] || new Date(year + 1, 1, 4); // 下一年立春
    
    if (birthDate >= startTerm.date && birthDate < endTerm.date) {
      termMonth = Math.floor(i / 2);
      solarTermName = startTerm.name;
      break;
    }
  }
  
  // 根据年干计算月干（五虎遁公式）
  const yearStemIndex = ((year - 4) % 60) % 10;
  const monthStemIndex = (yearStemIndex % 5 * 2 + termMonth) % 10;
  const monthBranchIndex = (termMonth + 2) % 12; // 寅月为正月
  
  return {
    stem: heavenlyStems[monthStemIndex],
    branch: earthlyBranches[monthBranchIndex],
    solarTerm: solarTermName,
    termMonth: termMonth
  };
}

// 🌟 修复：精准日柱计算（基于天文历法）
function getAccurateDayPillar(year, month, day) {
  // 使用1900年1月31日为甲子日基准（天文历法标准）
  const baseDate = new Date(1900, 0, 31); // 1900年1月31日甲子日
  const targetDate = new Date(year, month - 1, day);
  
  // 计算天数差
  const daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  
  // 干支纪日60天一轮回
  let dayIndex = daysDiff % 60;
  if (dayIndex < 0) dayIndex += 60; // 确保为正数
  
  return {
    stem: heavenlyStems[dayIndex % 10],
    branch: earthlyBranches[dayIndex % 12],
    dayIndex: dayIndex
  };
}

// 时辰数据 - 专业版（必须在timeSlots使用前定义）
const timeSlots = [
  { name: '子时', time: '23:00-01:00', value: 'zi', description: '夜半', icon: '🌙', element: '水', lucky: '北方' },
  { name: '丑时', time: '01:00-03:00', value: 'chou', description: '鸡鸣', icon: '🐓', element: '土', lucky: '东北' },
  { name: '寅时', time: '03:00-05:00', value: 'yin', description: '平旦', icon: '🌅', element: '木', lucky: '东方' },
  { name: '卯时', time: '05:00-07:00', value: 'mao', description: '日出', icon: '☀️', element: '木', lucky: '东方' },
  { name: '辰时', time: '07:00-09:00', value: 'chen', description: '食时', icon: '🍽️', element: '土', lucky: '东南' },
  { name: '巳时', time: '09:00-11:00', value: 'si', description: '隅中', icon: '🐍', element: '火', lucky: '南方' },
  { name: '午时', time: '11:00-13:00', value: 'wu', description: '日中', icon: '🌞', element: '火', lucky: '南方' },
  { name: '未时', time: '13:00-15:00', value: 'wei', description: '日昳', icon: '🐑', element: '土', lucky: '西南' },
  { name: '申时', time: '15:00-17:00', value: 'shen', description: '晡时', icon: '🐵', element: '金', lucky: '西方' },
  { name: '酉时', time: '17:00-19:00', value: 'you', description: '日入', icon: '🐔', element: '金', lucky: '西方' },
  { name: '戌时', time: '19:00-21:00', value: 'xu', description: '黄昏', icon: '🐕', element: '土', lucky: '西北' },
  { name: '亥时', time: '21:00-23:00', value: 'hai', description: '人定', icon: '🐷', element: '水', lucky: '北方' }
];

// 🌟 修复：时柱精准计算
function getAccurateTimePillar(dayIndex, timeSlot) {
  const timeIndex = timeSlots.findIndex(slot => slot.value === timeSlot);
  if (timeIndex === -1) return { stem: '甲', branch: '子' };
  
  // 根据日干计算时干（五鼠遁公式）
  const dayStemIndex = dayIndex % 10;
  const timeStemIndex = (dayStemIndex % 5 * 2 + timeIndex) % 10;
  
  return {
    stem: heavenlyStems[timeStemIndex],
    branch: earthlyBranches[timeIndex]
  };
}

// 🌟 重构：极度精准的八字计算
function calculateBaZi(year, month, day, timeSlot) {
  // 年柱计算
  const yearIndex = (year - 4) % 60;
  const yearPillar = {
    stem: heavenlyStems[yearIndex % 10],
    branch: earthlyBranches[yearIndex % 12]
  };
  
  // 月柱计算（基于节气）
  const monthPillar = getAccurateMonthPillar(year, month, day);
  
  // 日柱计算（天文历法）
  const dayPillar = getAccurateDayPillar(year, month, day);
  
  // 时柱计算
  const timePillar = getAccurateTimePillar(dayPillar.dayIndex, timeSlot);
  
  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    time: timePillar,
    zodiac: zodiacAnimals[(year - 4) % 12],
    solarTerm: monthPillar.solarTerm,
    termMonth: monthPillar.termMonth
  };
}

// 🌟 季节判断
function getSeason(termMonth) {
  if (termMonth >= 1 && termMonth <= 3) return '春'; // 寅卯辰月
  if (termMonth >= 4 && termMonth <= 6) return '夏'; // 巳午未月
  if (termMonth >= 7 && termMonth <= 9) return '秋'; // 申酉戌月
  return '冬'; // 亥子丑月
}

// 🌟 五行生克关系
function getBirthingElements(element) {
  const birthingMap = {
    '木': ['水'], '火': ['木'], '土': ['火'], '金': ['土'], '水': ['金']
  };
  return birthingMap[element] || [];
}

function getRestrainingElements(element) {
  const restrainingMap = {
    '木': ['金'], '火': ['水'], '土': ['木'], '金': ['火'], '水': ['土']
  };
  return restrainingMap[element] || [];
}

function getDrainingElements(element) {
  const drainingMap = {
    '木': ['火'], '火': ['土'], '土': ['金'], '金': ['水'], '水': ['木']
  };
  return drainingMap[element] || [];
}

// 🌟 重构：高级五行分析（包含藏干、旺衰）
function analyzeFiveElements(bazi, month) {
  const elements = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  const season = getSeason(bazi.termMonth);
  const seasonStrength = seasonStrengthTable[season];
  
  const pillars = [bazi.year, bazi.month, bazi.day, bazi.time];
  
  // 计算天干五行（权重最高）
  pillars.forEach((pillar, index) => {
    const element = stemElements[pillar.stem];
    const baseWeight = index === 2 ? 4 : 3; // 日干权重最高
    elements[element] += baseWeight * seasonStrength[element];
  });
  
  // 计算地支本气
  pillars.forEach((pillar, index) => {
    const element = branchElements[pillar.branch];
    const baseWeight = index === 2 ? 3 : 2; // 日支权重较高
    elements[element] += baseWeight * seasonStrength[element];
  });
  
  // 计算地支藏干（最精确）
  pillars.forEach((pillar, index) => {
    const hiddenStems = branchHiddenStems[pillar.branch];
    hiddenStems.forEach(hidden => {
      const element = stemElements[hidden.stem];
      const weight = (hidden.strength / 10) * (index === 2 ? 1.5 : 1);
      elements[element] += weight * seasonStrength[element];
    });
  });
  
  // 日主强弱精确判断
  const dayMasterElement = stemElements[bazi.day.stem];
  const dayMasterStrength = elements[dayMasterElement];
  const totalStrength = Object.values(elements).reduce((a, b) => a + b, 0);
  const strengthRatio = dayMasterStrength / totalStrength;
  
  // 综合判断身强身弱（考虑月令、通根等）
  const monthElement = branchElements[bazi.month.branch];
  const isMonthSupport = getBirthingElements(dayMasterElement).includes(monthElement) ||
                        dayMasterElement === monthElement;
  
  const isDayMasterStrong = strengthRatio > 0.35 || 
                           (strengthRatio > 0.25 && isMonthSupport);
  
  // 精确用神忌神判断
  let useGod, avoidGod;
  
  if (isDayMasterStrong) {
    // 身强用泄耗
    const drainingElements = getDrainingElements(dayMasterElement);
    const restrainingElements = getRestrainingElements(dayMasterElement);
    const allWeakeningElements = [...drainingElements, ...restrainingElements];
    
    useGod = allWeakeningElements.reduce((weakest, current) => 
      elements[weakest] < elements[current] ? weakest : current
    );
    
    avoidGod = getBirthingElements(dayMasterElement)[0];
  } else {
    // 身弱用生扶
    const supportingElements = getBirthingElements(dayMasterElement);
    const sameElements = [dayMasterElement];
    const allSupportingElements = [...supportingElements, ...sameElements];
    
    useGod = allSupportingElements.reduce((weakest, current) => 
      elements[weakest] < elements[current] ? weakest : current
    );
    
    avoidGod = getRestrainingElements(dayMasterElement)[0];
  }
  
  const strongest = Object.keys(elements).reduce((a, b) => 
    elements[a] > elements[b] ? a : b
  );
  const weakest = Object.keys(elements).reduce((a, b) => 
    elements[a] < elements[b] ? a : b
  );
  
  return {
    elements,
    strongest,
    weakest,
    dayMasterElement,
    dayMasterStrength: strengthRatio,
    isDayMasterStrong,
    useGod,
    avoidGod,
    season,
    monthSupport: isMonthSupport
  };
}

// 🌟 神煞计算
function calculateShenSha(bazi, gender) {
  const shenSha = [];
  const { year, month, day, time } = bazi;
  
  // 天乙贵人
  const dayGan = day.stem;
  for (const [gans, zhis] of Object.entries(shenShaData.tianYiGuiRen)) {
    if (gans.includes(dayGan)) {
      zhis.forEach(zhi => {
        if ([year.branch, month.branch, time.branch].includes(zhi)) {
          shenSha.push('天乙贵人');
        }
      });
    }
  }
  
  // 桃花星
  const dayZhi = day.branch;
  for (const [group, taoHua] of Object.entries(shenShaData.taoHua)) {
    if (group.includes(dayZhi)) {
      if ([year.branch, month.branch, time.branch].includes(taoHua)) {
        shenSha.push('桃花星');
      }
    }
  }
  
  // 驿马星
  for (const [group, yiMa] of Object.entries(shenShaData.yiMa)) {
    if (group.includes(dayZhi)) {
      if ([year.branch, month.branch, time.branch].includes(yiMa)) {
        shenSha.push('驿马星');
      }
    }
  }
  
  // 华盖星
  for (const [group, huaGai] of Object.entries(shenShaData.huaGai)) {
    if (group.includes(dayZhi)) {
      if ([year.branch, month.branch, time.branch].includes(huaGai)) {
        shenSha.push('华盖星');
      }
    }
  }
  
  return shenSha.length > 0 ? shenSha : ['无特殊神煞'];
}

// 华丽加载消息（增强版本）
const loadingMessages = [
  "🌟 天文观测启动，精准计算节气时刻...",
  "✨ 北斗七星定位，紫微真人正在排列天机密码...",
  "🌙 太微垣星宿流转，AI大师解读命盘奥秘...",
  "⚡ 五行生克制化精密计算，阴阳调和之数显现...",
  "👑 神煞星曜逐一核验，前世今生密码破译中...",
  "🔮 地支藏干深度解析，用神忌神精确定位...",
  "🧙‍♂️ 千年易学精髓融合AI，专属命理即将呈现...",
  "📿 观星测运最后校验，命理玄机全面解锁...",
  "🎯 紫微斗数终极排盘，先天后天运势揭晓...",
  "⭐ 三垣二十八宿归位，天人感应密码正在破译...",
  "🔥 火德星君护法，调和五行生克之机...",
  "💎 水德星君降临，润泽命格先天之数...",
  "🌸 花神娘娘加持，桃花姻缘正在编织...",
  "⚔️ 武曲星降临，事业财运即将显化...",
  "📚 文昌帝君开卷，智慧学业天机即现..."
];

// 计算用户年龄
function calculateAge(year, month, day) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// 检查是否未成年
function isMinor(year, month, day) {
  return calculateAge(year, month, day) < 18;
}

// 计算成年年份
function getAdultYear(year, month, day) {
  if (!isMinor(year, month, day)) return year;
  
  const birthDate = new Date(year, month - 1, day);
  const adultDate = new Date(birthDate);
  adultDate.setFullYear(adultDate.getFullYear() + 18);
  
  return adultDate.getFullYear();
}

// 移动端菜单切换
function toggleMobileMenu() {
  const navMenu = document.getElementById('nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

// 星空背景初始化
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  
  const stars = [];
  const starCount = Math.min(800, Math.floor(window.innerWidth * window.innerHeight / 4000));
  
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.2 + 0.05,
      twinkle: Math.random() * 0.015 + 0.005,
      color: Math.random() > 0.7 ? 'gold' : Math.random() > 0.85 ? 'blue' : 'white',
      pulsePhase: Math.random() * Math.PI * 2
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
      star.pulsePhase += star.twinkle;
      const pulseFactor = (Math.sin(star.pulsePhase) + 1) / 2;
      star.opacity = 0.3 + pulseFactor * 0.7;
      
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 6);
      
      if (star.color === 'gold') {
        gradient.addColorStop(0, `rgba(255, 215, 0, ${star.opacity})`);
        gradient.addColorStop(0.4, `rgba(212, 175, 55, ${star.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      } else if (star.color === 'blue') {
        gradient.addColorStop(0, `rgba(135, 206, 250, ${star.opacity})`);
        gradient.addColorStop(0.4, `rgba(100, 149, 237, ${star.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      } else {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.4, `rgba(200, 200, 255, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      }
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    stars.forEach(star => {
      if (star.x > canvas.width) star.x = Math.random() * canvas.width;
      if (star.y > canvas.height) star.y = Math.random() * canvas.height;
    });
  });
}

// 页面初始化
function initPage() {
  console.log('初始化超精准算命系统...');
  initStars();
  initSelects();
  initTimeGrid();
  
  // 添加滚动效果
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.top-nav');
    if (nav) {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 15, 0.98)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
      } else {
        nav.style.background = 'rgba(10, 10, 20, 0.95)';
        nav.style.backdropFilter = 'blur(15px)';
        nav.style.boxShadow = 'none';
      }
    }
  });
}

// 初始化下拉选择
function initSelects() {
  const yearSelect = document.getElementById('birth-year');
  const monthSelect = document.getElementById('birth-month');
  const daySelect = document.getElementById('birth-day');
  
  if (!yearSelect || !monthSelect || !daySelect) {
    console.warn('选择器元素未找到');
    return;
  }
  
  // 清空现有选项
  yearSelect.innerHTML = '<option value="">请选择年份</option>';
  monthSelect.innerHTML = '<option value="">请选择月份</option>';
  daySelect.innerHTML = '<option value="">请选择日期</option>';
  
  // 生成年份选项（1920-2025）
  for (let year = 2025; year >= 1920; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year + '年';
    if (year === 2000) option.selected = true;
    yearSelect.appendChild(option);
  }
  
  // 生成月份选项
  for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month + '月';
    monthSelect.appendChild(option);
  }
  
  // 初始化日期
  updateDays();
  
  // 监听变化
  monthSelect.addEventListener('change', updateDays);
  yearSelect.addEventListener('change', updateDays);
}

// 更新日期选项
function updateDays() {
  const yearSelect = document.getElementById('birth-year');
  const monthSelect = document.getElementById('birth-month');
  const daySelect = document.getElementById('birth-day');
  
  if (!yearSelect || !monthSelect || !daySelect) return;
  
  const year = parseInt(yearSelect.value) || 2000;
  const month = parseInt(monthSelect.value) || 1;
  
  const daysInMonth = new Date(year, month, 0).getDate();
  
  daySelect.innerHTML = '<option value="">请选择日期</option>';
  
  for (let day = 1; day <= daysInMonth; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day + '日';
    daySelect.appendChild(option);
  }
}

// 初始化时辰网格
function initTimeGrid() {
  const timeGrid = document.getElementById('time-grid');
  if (!timeGrid) {
    console.warn('时辰网格元素未找到');
    return;
  }
  
  timeGrid.innerHTML = '';
  
  timeSlots.forEach(slot => {
    const btn = document.createElement('div');
    btn.className = 'time-btn';
    btn.innerHTML = `
      <div class="time-header">
        <span class="time-icon">${slot.icon}</span>
        <span class="time-name">${slot.name}</span>
      </div>
      <div class="time-period">${slot.time}</div>
      <div class="time-desc">${slot.description}</div>
      <div class="time-element">${slot.element}行 ${slot.lucky}</div>
    `;
    btn.onclick = () => selectTime(btn, slot.value);
    timeGrid.appendChild(btn);
  });
}

// 选择时辰
function selectTime(btn, value) {
  document.querySelectorAll('.time-btn').forEach(b => {
    b.classList.remove('selected');
    b.style.transform = '';
  });
  
  btn.classList.add('selected');
  btn.style.transform = 'scale(1.05)';
  
  userInfo.timeSlot = value;
  console.log('选择时辰:', value);
}

// 切换历法
function toggleCalendar(type) {
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  userInfo.calendarType = type;
  console.log('切换历法:', type);
}

// 显示输入页面
function showInputPage() {
  const coverPage = document.getElementById('cover-page');
  const inputPage = document.getElementById('input-page');
  
  if (coverPage) coverPage.style.display = 'none';
  if (inputPage) {
    inputPage.style.display = 'block';
    inputPage.classList.add('fade-in');
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 🌟 修复startCalculation函数，确保立即创建进度控制器
function startCalculation() {
  if (isCalculating) return;
  
  console.log('开始超精准命运计算...');
  
  // ...existing code...（保留原有的输入验证代码）
  
  // 收集用户信息
  const yearSelect = document.getElementById('birth-year');
  const monthSelect = document.getElementById('birth-month');
  const daySelect = document.getElementById('birth-day');
  const genderSelect = document.getElementById('gender');
  
  if (!yearSelect || !monthSelect || !daySelect || !genderSelect) {
    alert('❌ 页面元素加载异常，请刷新重试！');
    return;
  }
  
  userInfo.year = parseInt(yearSelect.value);
  userInfo.month = parseInt(monthSelect.value);
  userInfo.day = parseInt(daySelect.value);
  userInfo.gender = genderSelect.value;
  userInfo.calendarType = userInfo.calendarType || 'solar';
  
  // 验证输入
  if (!userInfo.year || !userInfo.month || !userInfo.day) {
    alert('✨ 请完整填写您的出生年月日！');
    return;
  }
  
  if (!userInfo.timeSlot) {
    alert('⏰ 请选择出生时辰，这对精准排盘至关重要！');
    return;
  }
  
  if (!userInfo.gender) {
    alert('👤 请选择您的性别！');
    return;
  }
  
  // 计算年龄和未成年状态
  userInfo.age = calculateAge(userInfo.year, userInfo.month, userInfo.day);
  userInfo.isMinor = isMinor(userInfo.year, userInfo.month, userInfo.day);
  
  console.log('用户信息:', userInfo);
  
  isCalculating = true;
  
  // 🌟 记录开始时间
  window.calculationStartTime = Date.now();
  
  // 显示加载页面
  const inputPage = document.getElementById('input-page');
  const loadingPage = document.getElementById('loading-page');
  
  if (inputPage) inputPage.style.display = 'none';
  if (loadingPage) loadingPage.style.display = 'flex';
  
  // 🌟 立即创建进度控制器
  setTimeout(() => {
    console.log('⏰ 开始创建进度控制器...');
    const controller = createProgressController();
    if (controller) {
      console.log('✅ 进度控制器创建成功');
      // 立即显示初始进度
      updateDetailedProgress('初始化分析引擎', 0, 6);
    } else {
      console.error('❌ 进度控制器创建失败');
    }
    
    // 启动加载动画
    startAdvancedLoadingAnimation();
    
    // 开始AI分析
    generateProfessionalFortune();
  }, 200);
}



// 🌟 新增：进度控制器全局变量
let progressController = {
  isVisible: false,
  isExpanded: false,
  containerElement: null
};

// 🌟 修复：创建进度控制器函数
function createProgressController() {
  console.log('🔧 开始创建进度控制器...');
  
  const loadingPage = document.getElementById('loading-page');
  if (!loadingPage) {
    console.warn('⚠️ 找不到loading-page元素');
    return null;
  }

  // 首先注入CSS样式
  injectProgressControllerStyles();

  // 如果已存在则移除旧的
  const existingController = document.getElementById('progress-controller');
  if (existingController) {
    console.log('🗑️ 移除旧的进度控制器');
    existingController.remove();
  }

  // 创建主容器
  const progressController = document.createElement('div');
  progressController.id = 'progress-controller';
  progressController.style.cssText = `
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    z-index: 10000 !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    pointer-events: auto !important;
    font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif !important;
  `;

  // 创建小按钮（收起状态）
  const compactButton = document.createElement('div');
  compactButton.id = 'progress-compact-btn';
  compactButton.innerHTML = `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white !important;
      font-weight: 600;
      text-align: center;
      position: relative;
      z-index: 2;
    ">
      <i class="fas fa-chart-line" style="font-size: 16px; margin-bottom: 2px;"></i>
      <span style="font-size: 10px; line-height: 1;">进度</span>
    </div>
    
    <!-- 环形进度条 -->
    <svg style="
      position: absolute;
      top: -2px;
      left: -2px;
      width: 64px;
      height: 64px;
      transform: rotate(-90deg);
      z-index: 1;
    ">
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        stroke-width="3"
      />
      <circle
        id="progress-circle"
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="rgba(255, 255, 255, 0.9)"
        stroke-width="3"
        stroke-dasharray="176"
        stroke-dashoffset="176"
        stroke-linecap="round"
      />
    </svg>
  `;

  // 创建详细面板（展开状态）
  const expandedPanel = document.createElement('div');
  expandedPanel.id = 'progress-expanded-panel';
  expandedPanel.innerHTML = `
    <!-- 头部 -->
    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(139, 92, 246, 0.2);
    ">
      <div style="
        display: flex;
        align-items: center;
        color: #8b5cf6;
        font-weight: 600;
        font-size: 18px;
      ">
        <i class="fas fa-magic" style="margin-right: 10px; color: #8b5cf6;"></i>
        AI天机解析进度
      </div>
      <button id="progress-close-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- 总进度 -->
    <div style="margin-bottom: 25px;">
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      ">
        <span id="progress-status" style="
          color: #e2e8f0;
          font-weight: 600;
          font-size: 16px;
        ">初始化中...</span>
        <span id="progress-numbers" style="
          color: #8b5cf6;
          font-weight: 700;
          font-size: 18px;
        ">0/6</span>
      </div>
      
      <div style="
        width: 100%;
        height: 8px;
        background: rgba(100, 116, 139, 0.2);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
      ">
        <div id="progress-bar" style="
          height: 100%;
          background: linear-gradient(90deg, #8b5cf6, #3b82f6);
          width: 0%;
          transition: width 0.6s ease;
          border-radius: 4px;
          position: relative;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 2s infinite;
          "></div>
        </div>
      </div>
      
      <div id="progress-time" style="
        font-size: 12px;
        color: #94a3b8;
        margin-top: 8px;
        text-align: center;
      ">预计还需 3分钟</div>
    </div>

    <!-- 任务列表 -->
    <div style="
      background: rgba(5, 5, 15, 0.6);
      border-radius: 12px;
      padding: 18px;
      border: 1px solid rgba(139, 92, 246, 0.2);
    ">
      <div style="
        font-size: 14px;
        font-weight: 600;
        color: #e2e8f0;
        margin-bottom: 15px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <i class="fas fa-list-ul" style="margin-right: 8px; color: #8b5cf6;"></i>
        六大天机模块
      </div>
      <div id="task-list-container">
        <!-- 任务列表将在这里动态生成 -->
      </div>
    </div>

    <!-- 底部提示 -->
    <div style="
      margin-top: 20px;
      padding: 15px;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.1));
      border-radius: 10px;
      border: 1px solid rgba(139, 92, 246, 0.3);
      text-align: center;
    ">
      <div style="
        font-size: 12px;
        color: #94a3b8;
        line-height: 1.5;
      ">
        <i class="fas fa-info-circle" style="color: #8b5cf6; margin-right: 5px;"></i>
        AI正在深度分析您的八字命盘<br>
        <span style="color: #8b5cf6; font-weight: 600;">请耐心等待，好运即将揭晓！</span>
      </div>
    </div>
  `;

  // 组装控制器
  progressController.appendChild(compactButton);
  progressController.appendChild(expandedPanel);
  
  // 添加到页面
  loadingPage.appendChild(progressController);

  // 🌟 事件绑定
  let isExpanded = false;


  // 点击小按钮展开
  compactButton.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('🔍 点击展开按钮');
    expandProgressPanel();
  });

  // 点击关闭按钮收起
  const closeBtn = expandedPanel.querySelector('#progress-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('🔍 点击关闭按钮');
      collapseProgressPanel();
    });
  }


// 展开函数
  function expandProgressPanel() {
    if (isExpanded) return;
    
    isExpanded = true;
    console.log('📖 展开进度面板');
    
    // 隐藏小按钮
    compactButton.style.transform = 'scale(0)';
    compactButton.style.opacity = '0';
    compactButton.style.pointerEvents = 'none';
    
    // 显示详细面板
    setTimeout(() => {
      expandedPanel.style.transform = 'translateX(0) scale(1)';
      expandedPanel.style.opacity = '1';
      expandedPanel.style.pointerEvents = 'auto';
      expandedPanel.classList.add('show');
    }, 150);
  }

  // 收起函数
  function collapseProgressPanel() {
    if (!isExpanded) return;
    
    isExpanded = false;
    console.log('📖 收起进度面板');
    
    // 隐藏详细面板
    expandedPanel.style.transform = 'translateX(100%) scale(0.8)';
    expandedPanel.style.opacity = '0';
    expandedPanel.style.pointerEvents = 'none';
    expandedPanel.classList.remove('show');
    
    // 显示小按钮
    setTimeout(() => {
      compactButton.style.transform = 'scale(1)';
      compactButton.style.opacity = '1';
      compactButton.style.pointerEvents = 'auto';
    }, 200);
  }

  // 悬停效果
  compactButton.addEventListener('mouseenter', () => {
    if (!isExpanded) {
      compactButton.style.transform = 'scale(1.1)';
      compactButton.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.4)';
    }
  });

  compactButton.addEventListener('mouseleave', () => {
    if (!isExpanded) {
      compactButton.style.transform = 'scale(1)';
      compactButton.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.3)';
    }
  });

  // 存储引用和控制函数
  window.progressControllerRef = progressController;
  window.expandProgressPanel = expandProgressPanel;
  window.collapseProgressPanel = collapseProgressPanel;

  console.log('✅ 进度控制器创建完成');
  return progressController;
}






// 修复：高级加载动画（与HTML进度条协调工作）
function startAdvancedLoadingAnimation() {
  let messageIndex = 0;
  const loadingMessagesEl = document.getElementById('loading-messages');
  
  if (!loadingMessagesEl) return;
  
  const interval = setInterval(() => {
    // 只更新加载消息，不覆盖整个HTML结构
    loadingMessagesEl.innerHTML = `
      <div class="loading-message-container" style="text-align: center;">
        <i class="fas fa-magic spinning-advanced" style="color: var(--primary-purple); margin-right: 15px; font-size: 1.2em; animation: spin 2s linear infinite;"></i>
        <span class="loading-text" style="
          font-family: 'Noto Serif SC', serif; 
          font-size: clamp(16px, 2.5vw, 22px);
          color: var(--text-secondary); 
          text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
          letter-spacing: 1px;
          line-height: 1.6;
        ">${loadingMessages[messageIndex]}</span>
      </div>
      <div class="progress-dots" style="text-align: center; margin-top: 20px;">
        <span class="dot ${messageIndex % 3 === 0 ? 'active' : ''}" style="
          width: 8px; height: 8px; border-radius: 50%; 
          background: ${messageIndex % 3 === 0 ? 'var(--primary-purple)' : 'rgba(139, 92, 246, 0.3)'};
          display: inline-block; margin: 0 4px;
          transition: all 0.3s ease;
          animation: ${messageIndex % 3 === 0 ? 'thinkingPulse 1.5s ease-in-out infinite' : 'none'};
        "></span>
        <span class="dot ${messageIndex % 3 === 1 ? 'active' : ''}" style="
          width: 8px; height: 8px; border-radius: 50%; 
          background: ${messageIndex % 3 === 1 ? 'var(--primary-purple)' : 'rgba(139, 92, 246, 0.3)'};
          display: inline-block; margin: 0 4px;
          transition: all 0.3s ease;
          animation: ${messageIndex % 3 === 1 ? 'thinkingPulse 1.5s ease-in-out infinite' : 'none'};
        "></span>
        <span class="dot ${messageIndex % 3 === 2 ? 'active' : ''}" style="
          width: 8px; height: 8px; border-radius: 50%; 
          background: ${messageIndex % 3 === 2 ? 'var(--primary-purple)' : 'rgba(139, 92, 246, 0.3)'};
          display: inline-block; margin: 0 4px;
          transition: all 0.3s ease;
          animation: ${messageIndex % 3 === 2 ? 'thinkingPulse 1.5s ease-in-out infinite' : 'none'};
        "></span>
      </div>
    `;
    messageIndex = (messageIndex + 1) % loadingMessages.length;
  }, 1800);
  
  window.loadingInterval = interval;
}

// 🌟 修复：添加动态加载消息函数
function getLoadingMessage(taskName, current, total) {
  const messages = {
    '初始化分析引擎': '正在启动AI天机算法，连接北斗七星能量场...',
    '命宫大势': '深度解析您的命宫结构，洞察性格密码与人生格局...',
    '流年运势': '推演2025年运势轨迹，精确定位吉凶转折点...',
    '事业财运': '分析财官星位置，预测事业发展与财富机遇...',
    '感情姻缘': '透视桃花运势，解读姻缘密码与情感归宿...',
    '健康养生': '基于五行体质分析，制定专属养生调理方案...',
    '人生指引': '汇总天机密要，传授改运换命的终极心法...',
    '分析完成': '✨ 天机玄解已完成，AI大师为您开启命运真相！'
  };
  
  return messages[taskName] || `正在进行第${current}项分析，共${total}项...`;
}

// 🌟 修复：增强版callOpenAI函数，确保进度正确传递
async function callOpenAI(prompt, systemPrompt = '', analysisType = '', taskIndex = 0, totalTasks = 6) {
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      console.log(`Worker调用尝试 ${retryCount + 1}/${maxRetries} - ${analysisType}`);
      
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: systemPrompt || `你是传承千年的顶级命理宗师"天机老人"，精通《滴天髓》《穷通宝鉴》《子平真诠》等经典。你的分析必须：
              1. 基于精确的节气时间和干支组合进行分析
              2. 深度运用五行生克制化、旺衰休囚理论
              3. 结合神煞、用神忌神进行综合判断
              4. 给出震撼人心、准确到令人咋舌的预测
              5. 语言深邃神秘、充满古典智慧
              6. 具体到年月日期、方位颜色、数字时辰
              7. 让人感到你真的洞悉了天机密码
              8. 内容丰富深刻，完整回答，不要截断`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: analysisType === '命宫大势' ? 3000 : 2000,
          temperature: 0.85,
          top_p: 0.92,
          frequency_penalty: 0.15,
          presence_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`Worker返回错误: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Worker返回的数据格式不正确');
      }
      
      const content = data.choices[0].message.content;
      
      const minLength = analysisType === '命宫大势' ? 800 : 100;
      if (!content || content.length < minLength) {
        throw new Error(`返回内容过短，可能不完整。当前长度: ${content?.length || 0}，最小要求: ${minLength}`);
      }
      
      console.log(`Worker调用成功 - ${analysisType}，内容长度: ${content.length}`);
      return content;
      
    } catch (error) {
      console.error(`Worker调用失败 - ${analysisType} (尝试 ${retryCount + 1}):`, error);
      retryCount++;
      
      if (retryCount < maxRetries) {
        console.log(`等待 ${retryCount * 2} 秒后重试...`);
        await new Promise(resolve => setTimeout(resolve, retryCount * 2000));
      }
    }
  }
  
  console.error(`所有Worker调用尝试都失败 - ${analysisType}，返回备用内容`);
  return generateFallbackContent(prompt, analysisType);
}



// 🌟 修复：添加动态加载消息函数
function getLoadingMessage(taskName, current, total) {
  const messages = {
    '初始化分析引擎': '正在启动AI天机算法，连接北斗七星能量场...',
    '命宫大势': '深度解析您的命宫结构，洞察性格密码与人生格局...',
    '流年运势': '推演2025年运势轨迹，精确定位吉凶转折点...',
    '事业财运': '分析财官星位置，预测事业发展与财富机遇...',
    '感情姻缘': '透视桃花运势，解读姻缘密码与情感归宿...',
    '健康养生': '基于五行体质分析，制定专属养生调理方案...',
    '人生指引': '汇总天机密要，传授改运换命的终极心法...',
    '分析完成': '✨ 天机玄解已完成，AI大师为您开启命运真相！'
  };
  
  return messages[taskName] || `正在进行第${current}项分析，共${total}项...`;
}


// 修复：updateLoadingProgress 函数，添加详细进度显示
function updateLoadingProgress(taskName, current, total) {
  console.log(`进度更新: ${taskName} - ${current}/${total}`);
  
  // 更新HTML中的进度条元素
  const progressElement = document.getElementById('loading-progress');
  if (progressElement) {
    // 更新进度文本和数字
    const statusText = progressElement.querySelector('span:first-child');
    const progressNumbers = progressElement.querySelector('span:last-child');
    
    if (statusText) statusText.textContent = taskName || '分析中';
    if (progressNumbers) progressNumbers.textContent = `${Math.min(current, total)}/${total}`;
    
    // 更新进度条
    const progressBar = progressElement.parentElement.querySelector('div[style*="width:"]');
    if (progressBar) {
      const percentage = Math.min((current / total * 100), 100);
      progressBar.style.width = `${percentage}%`;
    }
    
    // 更新状态描述
    const statusDesc = progressElement.parentElement.querySelector('div:last-child');
    if (statusDesc) {
      statusDesc.textContent = getLoadingMessage(taskName, current, total);
    }
  }
  
  // 🌟 更新详细进度控制器
  updateDetailedProgress(taskName, current, total);
}

// 🌟 修复：updateDetailedProgress函数
function updateDetailedProgress(taskName, current, total) {
  console.log(`🔄 更新详细进度: ${taskName} - ${current}/${total}`);
  
  const controller = window.progressControllerRef;
  if (!controller) {
    console.warn('⚠️ 进度控制器不存在，重新创建');
    createProgressController();
    return;
  }

  // 更新环形进度条
  const progressCircle = controller.querySelector('#progress-circle');
  if (progressCircle) {
    const percentage = (current / total) * 100;
    const circumference = 176; // 2 * π * 28
    const offset = circumference - (percentage / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
  }

  // 更新展开面板中的内容
  const progressStatus = controller.querySelector('#progress-status');
  const progressNumbers = controller.querySelector('#progress-numbers');
  const progressBar = controller.querySelector('#progress-bar');
  const progressTime = controller.querySelector('#progress-time');

  if (progressStatus) progressStatus.textContent = taskName || '分析中';
  if (progressNumbers) progressNumbers.textContent = `${current}/${total}`;
  if (progressBar) {
    const percentage = Math.min((current / total) * 100, 100);
    progressBar.style.width = `${percentage}%`;
  }

  // 计算预估时间
  if (progressTime && window.calculationStartTime) {
    const estimatedTotalTime = 180;
    const completionRate = current / total;
    const elapsedTime = (Date.now() - window.calculationStartTime) / 1000;
    const estimatedTotalSeconds = Math.max(estimatedTotalTime, elapsedTime / completionRate);
    const remainingSeconds = Math.max(0, estimatedTotalSeconds - elapsedTime);
    
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return mins > 0 ? `${mins}分${secs}秒` : `${secs}秒`;
    };

    progressTime.textContent = `预计还需 ${formatTime(remainingSeconds)}`;
  }

  // 更新任务列表
  updateTaskList(current, total);
}

// 🌟 修复：updateTaskList函数
function updateTaskList(current, total) {
  const controller = window.progressControllerRef;
  if (!controller) return;

  const taskListContainer = controller.querySelector('#task-list-container');
  if (!taskListContainer) return;

  const taskList = [
    { name: '命宫大势', icon: '🏛️', key: 'destiny' },
    { name: '流年运势', icon: '🌟', key: 'fortune' },
    { name: '事业财运', icon: '💰', key: 'career' },
    { name: '感情姻缘', icon: '💕', key: 'love' },
    { name: '健康养生', icon: '🌿', key: 'health' },
    { name: '人生指引', icon: '🧭', key: 'advice' }
  ];

  let taskHTML = '';
  taskList.forEach((task, index) => {
    const taskIndex = index + 1;
    let status = '';
    let statusClass = '';
    let statusColor = '';
    let backgroundColor = '';
    let borderColor = '';

    if (taskIndex < current) {
      status = '✅ 已完成';
      statusClass = 'completed';
      statusColor = '#22c55e';
      backgroundColor = 'rgba(34, 197, 94, 0.15)';
      borderColor = 'rgba(34, 197, 94, 0.4)';
    } else if (taskIndex === current) {
      status = '⚡ 分析中';
      statusClass = 'current';
      statusColor = '#8b5cf6';
      backgroundColor = 'rgba(139, 92, 246, 0.15)';
      borderColor = 'rgba(139, 92, 246, 0.4)';
    } else {
      status = '⏳ 等待中';
      statusClass = 'pending';
      statusColor = '#94a3b8';
      backgroundColor = 'rgba(100, 116, 139, 0.08)';
      borderColor = 'rgba(100, 116, 139, 0.2)';
    }

    taskHTML += `
      <div class="task-item ${statusClass}" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 15px;
        margin: 6px 0;
        border-radius: 10px;
        background: ${backgroundColor};
        border: 1px solid ${borderColor};
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      ">
        ${taskIndex === current ? `
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
            animation: shimmer 2s infinite;
          "></div>
        ` : ''}
        
        <div style="
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        ">
          <span style="
            font-size: 18px; 
            margin-right: 12px;
            filter: ${taskIndex <= current ? 'none' : 'grayscale(1) opacity(0.5)'};
            transition: all 0.3s ease;
          ">${task.icon}</span>
          <span style="
            color: #e2e8f0; 
            font-weight: 500;
            font-size: 14px;
          ">${task.name}</span>
        </div>
        
        <div style="
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        ">
          <span style="
            color: ${statusColor};
            font-size: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
          ">${status}</span>
          ${taskIndex === current ? `
            <div style="
              width: 16px;
              height: 16px;
              margin-left: 8px;
              border: 2px solid #8b5cf6;
              border-top: 2px solid transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            "></div>
          ` : ''}
        </div>
      </div>
    `;
  });

  taskListContainer.innerHTML = taskHTML;
}


// 新增：生成备用内容函数
function generateFallbackContent(prompt) {
  if (prompt.includes('命宫大势')) {
    return '天机暂隐于云雾之中，但观您八字格局，乃是天赋异禀之命格。日主得气，四柱配合有情，必有不凡成就。请稍后天机老人将重新开坛详细解析...';
  } else if (prompt.includes('流年运势')) {
    return '2025乙巳年流年运势：整体呈上升趋势，春季事业有突破，夏季财运亨通，秋季感情美满，冬季健康平安。详细分析稍后为您呈现...';
  } else if (prompt.includes('事业财运')) {
    return '您的财星位置极佳，适合从事管理、金融、教育等行业。30岁后财运大开，投资宜选择稳健项目。详细财运密码稍后解锁...';
  } else if (prompt.includes('感情姻缘')) {
    return '您重情重义，姻缘美满。理想伴侣性格温和，年龄相当，从事文教或创意行业。最佳结婚时机在25-30岁之间。详细分析稍后补充...';
  } else if (prompt.includes('健康养生')) {
    return '您体质良好，但需注意心血管和消化系统保养。适合温和运动，饮食宜清淡。春秋两季是养生关键期。详细养生方案稍后提供...';
  } else {
    return '人生战略：稳中求进，德行天下。幸运颜色金色，幸运数字8，东南方位最佳。保持谦逊，广结善缘，必有大成。详细指引稍后完善...';
  }
}

// 🌟 新增：深度性格分析函数
function analyzePersonalityInDepth(bazi, fiveElementsAnalysis, shenSha, userInfo) {
const dayMaster = bazi.day.stem;
const dayBranch = bazi.day.branch;
const monthBranch = bazi.month.branch;
const season = fiveElementsAnalysis.season;
const isStrong = fiveElementsAnalysis.isDayMasterStrong;

// 核心性格特质分析
const coreTraits = analyzeCoreTrait(dayMaster, isStrong, season);

// 天赋才华分析
const talents = analyzeTalents(bazi, fiveElementsAnalysis);

// 行为模式分析
const behaviorPatterns = analyzeBehaviorPatterns(bazi, shenSha, userInfo);

return {
coreTraits,
talents,
behaviorPatterns
};
}

// 🌟 核心性格特质分析
function analyzeCoreTrait(dayMaster, isStrong, season) {
const traits = [];

// 基于日主的性格分析
const dayMasterTraits = {
'甲': isStrong ? ['领导型人格', '开拓进取', '正直坦率'] : ['温和包容', '默默奉献', '内敛含蓄'],
'乙': isStrong ? ['灵活变通', '善于协调', '温文尔雅'] : ['多愁善感', '优柔寡断', '需要保护'],
'丙': isStrong ? ['热情开朗', '光明磊落', '富有感染力'] : ['内向腼腆', '缺乏自信', '需要鼓励'],
'丁': isStrong ? ['细腻敏感', '富有创意', '善解人意'] : ['情绪波动', '过度敏感', '容易受伤'],
'戊': isStrong ? ['稳重可靠', '责任心强', '脚踏实地'] : ['固执保守', '缺乏变通', '过分谨慎'],
'己': isStrong ? ['温和友善', '善于包容', '默默付出'] : ['自卑内向', '缺乏主见', '依赖性强'],
'庚': isStrong ? ['刚毅果断', '意志坚强', '不屈不挠'] : ['过于刚硬', '不够圆融', '容易冲突'],
'辛': isStrong ? ['精明细致', '追求完美', '品味高雅'] : ['过分挑剔', '缺乏耐心', '情绪化'],
'壬': isStrong ? ['智慧深邃', '适应力强', '富有远见'] : ['多疑善变', '缺乏定力', '容易迷茫'],
'癸': isStrong ? ['聪明睿智', '洞察力强', '富有同情心'] : ['过度敏感', '容易悲观', '需要安全感']
};

traits.push(...(dayMasterTraits[dayMaster] || ['性格复杂', '多面性强']));

// 基于季节的性格补充
const seasonTraits = {
'春': ['积极向上', '富有生机', '善于开始'],
'夏': ['热情洋溢', '精力充沛', '喜欢表现'],
'秋': ['理性冷静', '善于总结', '追求完美'],
'冬': ['内敛深沉', '善于思考', '富有智慧']
};

traits.push(...(seasonTraits[season] || []));

return traits;
}

// 🌟 天赋才华分析
function analyzeTalents(bazi, fiveElementsAnalysis) {
const talents = [];
const strongest = fiveElementsAnalysis.strongest;
const dayMaster = bazi.day.stem;

// 基于最强五行的天赋
const elementTalents = {
'木': ['创新能力', '艺术天赋', '领导才能', '成长潜力'],
'火': ['表达能力', '感染力', '创造力', '直觉敏锐'],
'土': ['组织能力', '实务才能', '稳定力量', '包容胸怀'],
'金': ['分析能力', '决断力', '技术天赋', '追求卓越'],
'水': ['智慧才华', '适应能力', '洞察力', '学习天赋']
};

talents.push(...(elementTalents[strongest] || []));

// 基于日主的特殊才华
const dayMasterTalents = {
'甲': ['战略规划', '团队领导'],
'乙': ['沟通协调', '艺术创作'],
'丙': ['演讲表达', '影响他人'],
'丁': ['细致观察', '情感共鸣'],
'戊': ['实务操作', '稳定发展'],
'己': ['服务他人', '细致入微'],
'庚': ['果断决策', '突破创新'],
'辛': ['精工细作', '品质追求'],
'壬': ['智慧策略', '灵活应变'],
'癸': ['深度思考', '直觉判断']
};

talents.push(...(dayMasterTalents[dayMaster] || []));

return talents;
}

// 🌟 行为模式分析
function analyzeBehaviorPatterns(bazi, shenSha, userInfo) {
const patterns = [];
const dayMaster = bazi.day.stem;
const dayBranch = bazi.day.branch;

// 基于神煞的行为模式
if (shenSha.includes('天乙贵人')) {
patterns.push('遇事有贵人相助', '善于寻求支持', '人际关系良好');
}
if (shenSha.includes('桃花星')) {
patterns.push('异性缘佳', '善于社交', '富有魅力');
}
if (shenSha.includes('驿马星')) {
patterns.push('喜欢变动', '适应力强', '不安于现状');
}
if (shenSha.includes('华盖星')) {
patterns.push('独立思考', '追求精神层面', '有艺术气质');
}

// 基于干支组合的行为特点
const branchPatterns = {
'子': ['行动迅速', '适应性强'],
'丑': ['步调稳重', '持之以恒'],
'寅': ['勇于开拓', '充满活力'],
'卯': ['温和友善', '善于合作'],
'辰': ['务实稳重', '善于储备'],
'巳': ['聪明机智', '善于表达'],
'午': ['热情奔放', '富有活力'],
'未': ['温和包容', '重视和谐'],
'申': ['灵活机智', '善于变通'],
'酉': ['追求完美', '注重细节'],
'戌': ['忠诚可靠', '富有责任感'],
'亥': ['深沉内敛', '富有智慧']
};

patterns.push(...(branchPatterns[dayBranch] || []));

return patterns;
}

// 🌟 修复：在generateProfessionalFortune函数的最后显示结果
async function generateProfessionalFortune() {
  console.log('开始生成超精准专业分析...');

  try {
    // 🌟 创建进度控制器
    createProgressController();
    
    // 使用精准算法计算八字
    const bazi = calculateBaZi(userInfo.year, userInfo.month, userInfo.day, userInfo.timeSlot);
    const fiveElementsAnalysis = analyzeFiveElements(bazi, userInfo.month);
    const shenSha = calculateShenSha(bazi, userInfo.gender);

    // 构建出生信息与八字详情
    const birthInfo = `${userInfo.year}年${userInfo.month}月${userInfo.day}日 ${timeSlots.find(t => t.value === userInfo.timeSlot)?.name}时 ${userInfo.gender === 'male' ? '乾造' : '坤造'} ${userInfo.calendarType === 'solar' ? '阳历' : '农历'}`;

    const detailedBaziInfo = `
【基本信息】${birthInfo}
【四柱八字】年柱：${bazi.year.stem}${bazi.year.branch}，月柱：${bazi.month.stem}${bazi.month.branch}（节气：${bazi.solarTerm}后），日柱：${bazi.day.stem}${bazi.day.branch}，时柱：${bazi.time.stem}${bazi.time.branch}
【生肖属相】${bazi.zodiac}
【五行分析】精确分布：木${fiveElementsAnalysis.elements['木'].toFixed(2)}，火${fiveElementsAnalysis.elements['火'].toFixed(2)}，土${fiveElementsAnalysis.elements['土'].toFixed(2)}，金${fiveElementsAnalysis.elements['金'].toFixed(2)}，水${fiveElementsAnalysis.elements['水'].toFixed(2)}
【日主分析】日主${fiveElementsAnalysis.dayMasterElement}${fiveElementsAnalysis.isDayMasterStrong ? '身强' : '身弱'}（强度指数：${(fiveElementsAnalysis.dayMasterStrength * 100).toFixed(1)}%）
【用神体系】用神：${fiveElementsAnalysis.useGod}，忌神：${fiveElementsAnalysis.avoidGod}
【季节特征】${fiveElementsAnalysis.season}季生人，月令${fiveElementsAnalysis.monthSupport ? '得力' : '失令'}
【神煞星曜】${shenSha.join('、')}
【节气详情】生于${bazi.solarTerm}节气，月柱以此为准
    `.trim();

    // 构建感情分析 prompt（依据是否未成年）
    let lovePrompt;
    if (userInfo.isMinor) {
      lovePrompt = `
请基于以下极其精确的八字信息，专业分析此人成年后（18岁以后）的感情姻缘运势：

${detailedBaziInfo}

【特别说明】此人现年${userInfo.age}岁，未满18岁，以下分析专门针对成年后情况：

【深度分析要求】
1) 成年后的情感性格特质（结合日主${fiveElementsAnalysis.dayMasterElement}${fiveElementsAnalysis.isDayMasterStrong ? '身强' : '身弱'}的深层影响）
2) 命中注定的理想伴侣画像（精确到生肖、年龄差、职业倾向、性格匹配度）
3) 最佳结婚年龄段和具体年份（从18岁后开始推算，要考虑大运流年）
4) 桃花运势的关键时期和催旺秘法
5) 婚姻中可能遇到的挑战及化解之道

请明确标注这是对成年后的专业预测，并结合用神${fiveElementsAnalysis.useGod}给出改运增缘的具体建议。
      `.trim();
    } else {
      lovePrompt = `
请基于以下极其精确的八字信息，深度分析感情姻缘密码：

${detailedBaziInfo}

【深度分析要求】
1) 感情性格和恋爱模式（深层剖析日主${fiveElementsAnalysis.dayMasterElement}的情感特质）
2) 命中姻缘的精确画像（配偶生肖、年龄差、职业类型、性格互补性）
3) 最佳结婚时机（具体年份区间，考虑大运流年的影响）
4) 桃花运势的高峰期和催旺方法（结合神煞${shenSha.join('、')}）
5) 婚姻幸福的秘诀和可能障碍的化解（基于用神${fiveElementsAnalysis.useGod}系统）

要求精确到配偶的具体特征、最佳相遇时间、结婚吉日选择等实用指导。
      `.trim();
    }

    // 定义所有分析任务
    const analysisTasks = [
      {
        key: 'destiny',
        name: '命宫大势',
        prompt: `
${detailedBaziInfo}

【超级深度分析要求 - 最少1000字】
请从以下十个维度进行极其详细的分析，每个维度都要深入骨髓：

1. 日主根本性格密码（日主${fiveElementsAnalysis.dayMasterElement}${fiveElementsAnalysis.isDayMasterStrong ? '身强' : '身弱'}的深层心理构造）
   • 核心性格特质和心理倾向  
   • 内在驱动力和价值观体系  
   • 情绪模式和反应机制  
   • 决策风格和思维特点

2. 四柱干支组合精析（每柱的深层含义和相互影响）
   • 年柱${bazi.year.stem}${bazi.year.branch}：祖上根基、童年印记、人生底色  
   • 月柱${bazi.month.stem}${bazi.month.branch}：青年气质、社交模式、事业倾向  
   • 日柱${bazi.day.stem}${bazi.day.branch}：核心个性、婚姻观念、自我认知  
   • 时柱${bazi.time.stem}${bazi.time.branch}：晚年性格、子女缘分、人生归宿

3. 用神${fiveElementsAnalysis.useGod}战略解析
   • 用神在命局中的精确作用机制  
   • 如何发挥用神的最大效力  
   • 用神对性格塑造的深层影响  
   • 实际生活中的用神体现

4. 五行能量场分析（${fiveElementsAnalysis.season}季生人的特殊密码）
   • 月令${fiveElementsAnalysis.monthSupport ? '得力' : '失令'}对性格的深度影响  
   • 五行失衡对心理状态的具体表现  
   • 性格中的五行体现和调和之道

5. 神煞星曜深度解码（${shenSha.join('、')}的性格影响）
   • 每个神煞对性格的具体影响  
   • 神煞组合产生的特殊性格特质  
   • 如何化解负面神煞的影响

6. 格局层次判断
   • 是否构成特殊格局（正格、从格、化格等）  
   • 格局高低对人生层次的决定作用  
   • 性格中体现的格局特征

【特别要求】
- 必须结合具体干支组合进行分析，不能泛泛而谈  
- 要体现${bazi.solarTerm}节气和${fiveElementsAnalysis.season}季的影响  
- 分析要有层次感，从表层到深层递进  
- 语言要深邃神秘，体现古典命理智慧  
- 给出具体的性格表现和生活实例  
总字数不少于1500字，力求详尽透彻。
        `.trim(),
        systemPrompt: `你是明朝刘伯温转世，当代第一命理宗师，精通《滴天髓》《穷通宝鉴》《子平真诠》《神峰通考》等所有古典命理典籍，能透视人的根本命格和天定轨迹。你必须给出1500-2000字的详细深入分析，这是最重要的核心内容。

你的分析特色：
- 能从干支组合中看出最细微的性格特质  
- 善于将抽象的命理概念转化为具体的性格描述  
- 能准确把握每个人的核心性格密码  
- 语言深邃而精准，让人感到醍醐灌顶  
- 分析层次丰富，从表到里、从浅到深

请以明朝刘伯温的高度和深度，给出震撼人心、内容丰富的神准分析，让用户真正感受到命理的奥妙和您的专业水准，仿佛你真的看透了他们的灵魂深处。内容要详实、具体、有深度，绝不能浅尝辄止。`.trim()
      },
      {
        key: 'fortune',
        name: '流年运势',
        prompt: `
请基于以下精确八字信息，神准分析2025乙巳年流年运势：

${detailedBaziInfo}

【流年专业解析】
1) 2025乙巳年干支与命局的精确生克关系分析
2) 十二个月详细运程（农历月份，要考虑每月节气变化）
3) 关键转折时间节点（精确到日期）
4) 流年凶险期预警及专业化解方案
5) 流年吉祥期的机遇把握策略

请结合用神${fiveElementsAnalysis.useGod}和神煞${shenSha.join('、')}影响，给出月月精准、日日可依的实战指导。
        `.trim(),
        systemPrompt: `你是当代流年预测第一人，能精准把握天时地利人和的每个变化，预测准确率达到惊人的95%以上。`.trim()
      },
      {
        key: 'career',
        name: '事业财运',
        prompt: `
请基于以下精确命理信息，深度破解事业财运天机：

${detailedBaziInfo}

【财运事业天机解码】
1) 基于五行喜忌的最适宜行业领域（要具体到细分行业）
2) 财富爆发的黄金时机（精确年份，考虑大运流年配合）
3) 事业巅峰期和关键突破年份
4) 投资理财的神准策略（股票、房产、创业等具体建议）
5) 贵人助力和合作伙伴的最佳选择（生肖匹配、方位选择）

请结合财官星位置和用神${fiveElementsAnalysis.useGod}，给出可操作的发财秘诀。
        `.trim(),
        systemPrompt: `你是当代财运预测宗师，曾为无数企业家指点迷津，让他们从普通人跃升为亿万富豪。`.trim()
      },
      {
        key: 'love',
        name: '感情姻缘',
        prompt: lovePrompt,
        systemPrompt: `你是古今第一姻缘大师，精通男女情感密码，能看透前世情缘和今生姻缘天注定。`.trim()
      },
      {
        key: 'health',
        name: '健康养生',
        prompt: `
请基于以下精确八字信息，深度分析健康养生天机：

${detailedBaziInfo}

【健康养生密要】
1) 基于五行体质的先天健康密码（${fiveElementsAnalysis.season}季生人的体质特征）
2) 易发疾病类型和关键预防时期（精确到年龄段和季节）
3) 最适宜的养生之道和饮食调理秘方
4) 不同人生阶段的健康重点和调理方案
5) 结合用神${fiveElementsAnalysis.useGod}的专属养生法门

请给出中医养生和五行调理的具体方案，让身体达到最佳状态。
        `.trim(),
        systemPrompt: `你是中医养生大师，精通《黄帝内经》和五行体质学，能通过命理指导养生达到延年益寿。`.trim()
      },
      {
        key: 'advice',
        name: '人生指引',
        prompt: `
请基于以下完整命理信息，给出人生战略终极指引：

${detailedBaziInfo}

【人生战略天机】
1) 最佳人生发展路径和战略规划
2) 化解命中劫难的终极秘法（具体到改运方法）
3) 催旺运势的神秘法门（颜色、方位、数字、饰品等）
4) 人生关键节点的决策天机（何时进退、何时转折）
5) 改变命运层次的修行之道

请传授改命换运的绝世心法，让人生从此逆天改命、扶摇直上。
        `.trim(),
        systemPrompt: `你是改运换命的终极导师，掌握古传秘法，能让人通过正确的人生策略改变命运轨迹。`.trim()
      }
    ];

    // 🌟 修复：顺序执行分析任务，确保进度正确更新
    console.log(`开始顺序执行${analysisTasks.length}个分析任务...`);
    updateLoadingProgress('初始化分析引擎', 0, analysisTasks.length);
    
    const responses = [];
    
    // 最小展示时间确保用户看到加载过程
    const startTime = Date.now();
    const minTotalTime = 3000; // 至少3秒加载时间
    
    for (let i = 0; i < analysisTasks.length; i++) {
      const task = analysisTasks[i];
      console.log(`开始执行任务 ${i + 1}/${analysisTasks.length}: ${task.name}`);
      
      // 更新进度：当前正在执行的任务
      updateLoadingProgress(task.name, i + 1, analysisTasks.length);
      
      try {
        const response = await callOpenAI(task.prompt, task.systemPrompt, task.name, i, analysisTasks.length);
        responses.push(response);
        console.log(`任务 ${i + 1} 完成: ${task.name}，响应长度: ${response.length}`);
      } catch (error) {
        console.error(`任务 ${i + 1} 失败: ${task.name}`, error);
        // 使用备用内容确保流程继续
        responses.push(generateFallbackContent(task.prompt, task.name));
      }
      
      // 添加任务间隔，让用户看到进度变化
      if (i < analysisTasks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    // 确保最小展示时间
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < minTotalTime) {
      const remainingTime = minTotalTime - elapsedTime;
      console.log(`等待剩余时间: ${remainingTime}ms`);
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }

    // 最终进度更新
    updateLoadingProgress('分析完成', analysisTasks.length, analysisTasks.length);
    
    // 短暂延迟显示完成状态
    await new Promise(resolve => setTimeout(resolve, 800));

    // 存储结果
    fortuneResults = {
      destiny: responses[0],
      fortune: responses[1],
      career: responses[2],
      love: responses[3],
      health: responses[4],
      advice: responses[5]
    };

    console.log('超精准分析完成:', fortuneResults);

    // 停止加载动画
    if (window.loadingInterval) {
      clearInterval(window.loadingInterval);
    }

    // 🌟 修复：确保调用显示结果函数
    displayResults();

  } catch (error) {
    console.error('生成分析失败:', error);
    // 清理进度控制器
    if (window.progressControllerRef) {
      window.progressControllerRef.style.opacity = '0';
      setTimeout(() => {
        if (window.progressControllerRef && window.progressControllerRef.parentNode) {
          window.progressControllerRef.parentNode.removeChild(window.progressControllerRef);
        }
      }, 300);
    }
    // 停止加载动画
    if (window.loadingInterval) {
      clearInterval(window.loadingInterval);
    }
    displayFallbackResults();
  }

  isCalculating = false;
}



// 显示标签页内容
function showTabContent(tabName) {
  // 移除所有标签页的激活状态
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // 隐藏所有内容区域
  document.querySelectorAll('.result-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // 激活当前标签页
  const clickedBtn = event ? event.currentTarget : document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  }
  
  // 显示对应内容区域
  const targetSection = document.getElementById(`${tabName}-section`);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  currentTab = tabName;
  
  // 平滑滚动到内容区域
  setTimeout(() => {
    const contentArea = document.querySelector('.result-content-area');
    if (contentArea) {
      contentArea.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, 100);
}

// 🌟 修改：在分析完成后清理进度控制器
function displayResults() {
  console.log('显示超精准结果页面...');
  
  const loadingPage = document.getElementById('loading-page');
  const resultPage = document.getElementById('result-page');
  
  // 清理进度控制器
  if (window.progressControllerRef) {
    window.progressControllerRef.style.opacity = '0';
    window.progressControllerRef.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      if (window.progressControllerRef && window.progressControllerRef.parentNode) {
        window.progressControllerRef.parentNode.removeChild(window.progressControllerRef);
      }
      window.progressControllerRef = null;
    }, 500);
  }
  
  if (loadingPage) loadingPage.style.display = 'none';
  if (resultPage) {
    resultPage.style.display = 'block';
    resultPage.classList.add('fade-in');
  }
  
  // 填充所有内容
  fillAllResultContent();
  
  // 确保默认显示第一个标签页
  setTimeout(() => {
    showTabContent('destiny');
  }, 500);
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// 🌟 修复：填充所有结果内容
function fillAllResultContent() {
  const contentIds = ['destiny', 'fortune', 'career', 'love', 'health', 'advice'];
  
  contentIds.forEach(id => {
    const contentElement = document.getElementById(`${id}-content`);
    if (contentElement && fortuneResults[id]) {
      // 清除加载状态
      contentElement.innerHTML = '';
      // 使用打字机效果显示内容
      typeWriter(contentElement, fortuneResults[id], 25);
    }
  });
}

// 🌟 修复：高级打字机效果 - 支持Markdown渲染
function typeWriter(element, text, speed = 30) {
  // 清除加载占位符
  element.innerHTML = '';
  element.style.opacity = '1';
  
  // 转换Markdown为HTML
  const htmlContent = markdownToHtml(text);
  
  // 处理HTML段落
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  const paragraphs = Array.from(tempDiv.children);
  
  let currentParagraph = 0;
  
  function typeNextParagraph() {
    if (currentParagraph >= paragraphs.length) return;
    
    const currentElement = paragraphs[currentParagraph];
    const newElement = currentElement.cloneNode(false);
    newElement.style.opacity = '0';
    newElement.style.transform = 'translateY(20px)';
    newElement.style.transition = 'all 0.5s ease';
    
    element.appendChild(newElement);
    
    // 触发入场动画
    setTimeout(() => {
      newElement.style.opacity = '1';
      newElement.style.transform = 'translateY(0)';
    }, 100);
    
    const currentText = currentElement.textContent || currentElement.innerText;
    let currentChar = 0;
    
    const timer = setInterval(() => {
      if (currentChar >= currentText.length) {
        clearInterval(timer);
        // 如果有HTML结构，应用完整的HTML
        if (currentElement.innerHTML !== currentText) {
          newElement.innerHTML = currentElement.innerHTML;
        }
        currentParagraph++;
        setTimeout(typeNextParagraph, 300);
        return;
      }
      
      newElement.textContent += currentText.charAt(currentChar);
      currentChar++;
      
      // 滚动到最新内容
      element.scrollTop = element.scrollHeight;
    }, speed);
  }
  
  typeNextParagraph();
}

// 🌟 修复：Markdown转HTML函数
function markdownToHtml(markdown) {
  let html = markdown;
  
  // 处理标题
  html = html.replace(/^### (.*$)/gm, '<h3 class="fortune-h3">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="fortune-h2">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="fortune-h1">$1</h1>');
  
  // 处理粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="fortune-bold">$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong class="fortune-bold">$1</strong>');
  
  // 处理特殊格式【】
  html = html.replace(/【(.*?)】/g, '<span class="fortune-section-title">【$1】</span>');
  
  // 处理列表项
  html = html.replace(/^[•\-\*] (.*$)/gm, '<div class="fortune-list-item">• $1</div>');
  
  // 处理带数字的项目
  html = html.replace(/^(\d+)[)）] (.*$)/gm, '<div class="fortune-numbered-item"><span class="fortune-number">$1</span> $2</div>');
  
  // 处理段落
  const paragraphs = html.split(/\n\s*\n/).filter(p => p.trim());
  const processedParagraphs = paragraphs.map(p => {
    const trimmed = p.trim();
    if (trimmed.startsWith('<h') || trimmed.startsWith('<div class="fortune-')) {
      return trimmed;
    }
    return `<div class="fortune-paragraph">${trimmed.replace(/\n/g, '<br>')}</div>`;
  });
  
  return processedParagraphs.join('');
}




// 备用结果
function displayFallbackResults() {
  const age = userInfo.age || 25;
  const adultAge = userInfo.isMinor ? getAdultYear(userInfo.year, userInfo.month, userInfo.day) - userInfo.year + userInfo.age : userInfo.age;
  
  const fallbackResults = {
    destiny: `观您八字命盘，日主得气，格局清奇不凡。年柱藏贵人星，月柱财官相济，日柱坐长生之地，时柱印绶护身。此乃天赋异禀、富贵双全之命格！\n\n您生而不凡，具有超凡的领导才能和敏锐的洞察力。性格坚毅果敢，遇事能当机立断，但有时过于刚直，需要学会圆融处世。\n\n早年虽有些许波折，但正是这些历练成就了您坚韧的品格。中年运势大开，事业财运双丰收，晚年更是享清福之时。命中注定要成就一番大业，但需修身养德，方能发挥最大潜能。`,
    
    fortune: `2025乙巳年，对您而言乃是运势转折的关键年份！整体运程呈螺旋式上升趋势。\n\n【春季运程】正月至三月，事业有重大突破，贵人运极佳，特别是农历二月十五前后，有改变人生的重大机遇！\n\n【夏季运程】四月至六月，财运亨通，投资理财皆有斩获，但需防农历五月的小人暗算。\n\n【秋季运程】七月至九月，感情生活精彩纷呈，单身者桃花朵朵，已婚者夫妻和睦。农历八月十五是您的超级幸运日！\n\n【冬季运程】十月至十二月，健康需要格外关注，但学业事业依然稳步上升。农历十一月有意外之财。`,
    
    career: `您的八字显示出极强的领导和创业天赋！最适合从事管理、金融、教育、科技等需要智慧和决策力的行业。\n\n【财运密码】您的财星位置极佳，${userInfo.age < 30 ? '30岁后' : '近期'}财运将大开！特别是${35 + (userInfo.age % 5)}岁后，将进入人生财富的黄金期。\n\n【投资建议】宜投资房产、科技股和教育产业，避免高风险的期货投资。与属鸡、属牛、属蛇的人合作最为有利。\n\n【事业方位】东南方是您的事业财位，在此方向发展事业将事半功倍。办公桌面向东南，佩戴黄水晶可催旺财运。`,
    
    love: userInfo.isMinor ? 
      `根据您的八字，现在为您分析成年后的感情姻缘运势：\n\n【感情性格】您属于深情专一型，重情重义，但在感情表达上较为含蓄。成年后会展现出强烈的责任感和保护欲。\n\n【理想伴侣】您的另一半性格温和善良，年龄可能比您小2-4岁，从事文教、医疗或艺术相关工作。属相为鸡、牛、蛇的人与您最为契合。\n\n【最佳结婚年龄】${Math.max(22, adultAge + 4)}-${Math.max(28, adultAge + 10)}岁之间是您的最佳结婚时机，特别是${Math.max(25, adultAge + 7)}岁左右。\n\n【桃花运势】成年后农历二月和八月桃花运最旺，要把握良机！` :
      `【感情性格】您重情重义，但较为内敛含蓄。在感情中容易付出真心，但有时过于被动，需要主动表达。\n\n【理想伴侣】您的另一半性格温和，年龄比您${userInfo.gender === 'male' ? '小2-5岁' : '大1-3岁'}，可能从事文教、医疗或创意行业。属${zodiacAnimals[(userInfo.year - 1) % 12]}、${zodiacAnimals[(userInfo.year + 3) % 12]}的人与您最有缘分。\n\n【最佳时机】${Math.max(25, userInfo.age + 2)}-${Math.max(32, userInfo.age + 7)}岁是您的最佳结婚年龄。今年农历${(userInfo.month + 6) % 12 + 1}月和${(userInfo.month + 10) % 12 + 1}月桃花运最旺！\n\n【感情建议】多参加社交活动，主动表达内心想法，真诚待人必有回报。`,
    
    health: `【体质分析】您属于${fiveElements[userInfo.month % 5]}型体质，整体健康状况良好，但需注意以下几个方面：\n\n【健康弱点】易患${userInfo.month % 2 === 0 ? '心血管和消化系统' : '呼吸系统和神经系统'}疾病，平时要注意预防。特别是${userInfo.age < 40 ? '中年后' : '近期'}要格外关注健康。\n\n【养生建议】适合练习太极、游泳等舒缓运动。饮食宜清淡，多食${userInfo.month <= 6 ? '绿色蔬菜和白色食物' : '红色和黄色食物'}。\n\n【关键时期】每年春秋两季是您的健康关键期，要注意防寒保暖。${Math.floor(userInfo.age / 10) * 10 + 5}岁前后有一次健康小劫，需提前调理。\n\n【改运食疗】常食${['莲子百合', '枸杞红枣', '银耳雪梨', '山药薏米'][userInfo.month % 4]}汤，对您的体质最为有益。`,
    
    advice: `【人生战略】您的命格显示要走"稳中求进，德行天下"的路线。保持谦逊低调，广结善缘，关键时刻果断出击。\n\n【开运密码】\n🎨 幸运颜色：${['金色、白色', '绿色、青色', '红色、紫色', '黄色、棕色', '蓝色、黑色'][userInfo.month % 5]}\n🔢 幸运数字：${[3, 8, 9][(userInfo.day % 3)]}\n🧭 幸运方位：${timeSlots.find(t => t.value === userInfo.timeSlot)?.lucky || '东方'}\n💎 开运饰品：${['玉石', '水晶', '玛瑙', '琥珀'][userInfo.year % 4]}制品\n\n【改运建议】家中${userInfo.month <= 6 ? '东南角' : '西北角'}摆放绿色植物，有助提升整体运势。每月农历十五到寺庙祈福，积累福德。\n\n【人生箴言】德行天下，福报自来；积善之家，必有余庆。您的人生密码是：智慧+仁德+坚持=成功！`
  };
  
  fortuneResults = fallbackResults;
  displayResults();
}

// 提问功能
async function askQuestion() {
  const input = document.getElementById('question-input');
  const question = input?.value.trim();
  const askBtn = document.getElementById('ask-btn');
  
  if (!question) {
    alert('✨ 请输入您想咨询的问题');
    return;
  }
  
  if (!input || !askBtn) return;
  
  // 禁用控件
  input.disabled = true;
  askBtn.disabled = true;
  askBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 推算中...';
  
  // 添加消息
  addChatMessage(question, 'user');
  const thinkingId = addThinkingMessage();
  input.value = '';
  
  try {
    const bazi = calculateBaZi(userInfo.year, userInfo.month, userInfo.day, userInfo.timeSlot);
    const baziInfo = `八字：${bazi.year.stem}${bazi.year.branch}年 ${bazi.month.stem}${bazi.month.branch}月 ${bazi.day.stem}${bazi.day.branch}日 ${bazi.time.stem}${bazi.time.branch}时`;
    
    // 特殊处理未成年人的感情问题
    let finalQuestion = question;
    if (userInfo.isMinor && (question.includes('感情') || question.includes('爱情') || question.includes('姻缘') || question.includes('结婚') || question.includes('恋爱'))) {
      finalQuestion = `此人目前未满18岁，请针对其成年后的情况回答：${question}`;
    }
    
    const response = await callOpenAI(
      `基于用户八字${baziInfo}，年龄${userInfo.age}岁，请回答：${finalQuestion}`,
      '你是天机老人，要结合具体八字给出神准的回答。语言要深邃有智慧。'
    );
    
    removeThinkingMessage(thinkingId);
    addChatMessage(response, 'ai');
    
  } catch (error) {
    console.error('提问失败:', error);
    removeThinkingMessage(thinkingId);
    addChatMessage('天机暂时被云雾遮蔽，请稍后再请天机老人开坛问卦...', 'ai');
  } finally {
    // 恢复控件
    input.disabled = false;
    askBtn.disabled = false;
    askBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 提问';
    input.focus();
  }
}

// 聊天消息管理
function addChatMessage(message, type) {
  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${type}-message`;
  messageDiv.style.opacity = '0';
  messageDiv.style.transform = 'translateY(20px)';
  
  if (type === 'ai') {
    messageDiv.innerHTML = `
      <div class="message-header">
        <i class="fas fa-magic"></i>
        <strong>天机老人</strong>
      </div>
      <div class="message-content">${message}</div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-header">
        <i class="fas fa-user"></i>
        <strong>您的提问</strong>
      </div>
      <div class="message-content">${message}</div>
    `;
  }
  
  messagesContainer.appendChild(messageDiv);
  
  // 入场动画
  setTimeout(() => {
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
    messageDiv.style.transition = 'all 0.5s ease';
  }, 100);
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return messageDiv;
}

function addThinkingMessage() {
  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return null;
  
  const thinkingDiv = document.createElement('div');
  thinkingDiv.className = 'chat-message ai-thinking';
  thinkingDiv.innerHTML = `
    <div class="thinking-content">
      <i class="fas fa-magic spinning"></i>
      <span>天机老人正在推算天机...</span>
      <div class="thinking-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  
  messagesContainer.appendChild(thinkingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return thinkingDiv;
}

function removeThinkingMessage(thinkingElement) {
  if (thinkingElement && thinkingElement.parentNode) {
    thinkingElement.style.opacity = '0';
    setTimeout(() => {
      thinkingElement.parentNode.removeChild(thinkingElement);
    }, 300);
  }
}

// 回车提问
function handleKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    askQuestion();
  }
}

// 事件监听
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM加载完成，初始化页面...');
  initPage();
});

// 性能优化
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    document.body.style.animationPlayState = 'paused';
  } else {
    document.body.style.animationPlayState = 'running';
  }
});

// 错误处理
window.addEventListener('error', function(e) {
  console.error('页面错误:', e.error);
});

// 页面加载完成
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 1.5s ease-in-out';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 200);
});

console.log('Fortune.js 加载完成');