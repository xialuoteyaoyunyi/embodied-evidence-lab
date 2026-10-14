export type Stage = 'E4'|'E3'|'E2'|'E1'|'E0';
export type Branch = 'drive'|'hand'|'force'|'vision';
export type Source = {id:string;title:string;url:string;publisher:string;date:string;kind:string;sha256?:string};
export type Evidence = {id:string;company:string;branch:Branch;concept:string;stage:Stage;claim:string;quote:string;sourceId:string;locator:string;period:string;limit:string;verified:string;date:string};
export const taxonomy = [
 {id:'drive' as Branch,title:'微型驱动与传动',en:'MICRO ACTUATION',level:'L1 · 上游执行部件',desc:'将电能转为受控运动：微电机、齿轮箱、丝杠、编码器。',boundary:'按交付产品分类；通用电机业务不自动等于灵巧手收入。',metrics:['单手执行器数量','单价与良率','订单转化率','研发费用']},
 {id:'force' as Branch,title:'力觉 / 触觉',en:'FORCE & TOUCH',level:'L1 · 上游感知部件',desc:'力/力矩反馈与接触状态感知，服务抓取、装配和柔顺控制。',boundary:'六维力、关节力矩与指尖触觉分开标注；投资关系不等于自产。',metrics:['传感器销量','标定成本','客户验证周期','产品毛利率']},
 {id:'vision' as Branch,title:'3D 视觉',en:'SPATIAL PERCEPTION',level:'L1 · 上游感知模组',desc:'深度相机、光学与深度计算，为定位、避障和操作提供空间信息。',boundary:'双目、结构光、ToF 是技术路线；不把整个 AIoT 分部算成机器人。',metrics:['相机出货量','机器人客户收入','平均售价','库存周转']},
 {id:'hand' as Branch,title:'灵巧手',en:'DEXTEROUS HANDS',level:'L2 · 中游末端集成',desc:'集成驱动、结构、传感与控制，执行多指抓取和精细操作。',boundary:'夹爪与多指灵巧手不混同；自由度与寿命须按具体型号比较。',metrics:['订单与交付量','返修率','制造成本','回款与现金流']},
];
export const stages: Record<Stage,{label:string;desc:string}> = {
 E4:{label:'已披露对应收入',desc:'与该具体业务对应的收入口径和金额可定位。不是集团总收入。'},
 E3:{label:'销售 / 订单证据',desc:'已出现销售、交付或订单证据，但对应收入金额未单独披露。'},
 E2:{label:'产品 / 研发 / 送样',desc:'产品或技术开发、样品验证证据；不能直接推断量产收入。'},
 E1:{label:'仅表态 / 战略布局',desc:'规划、意向或战略投资关系；不等于产品或收入已形成。'},
 E0:{label:'当前证据不足',desc:'本研究材料未找到支持该具体关系的证据；不等于业务不存在。'},
};
export const sources:Source[] = [
 {id:'S-KL-H1',title:'柯力传感2026年半年度报告',url:'https://static.cninfo.com.cn/finalpage/2026-08-28/1225518537.PDF',publisher:'柯力传感 / 巨潮资讯',date:'2026-08-28',kind:'法定披露',sha256:'4fd422ccf22ae9f80f6488c8889b73bf1d64cd254ce25a28f45713c6bc6e640c'},
 {id:'S-UR',title:'Screwdriving Functionality',url:'https://www.universal-robots.com/manuals/EN/HTML/SW5_26/Content/guide-hightorque/screwdrivingfunc.htm',publisher:'Universal Robots 官方手册',date:'2026-10-14',kind:'官方应用手册 · 访问日期'},
 {id:'S-SH-APP',title:'Shadow Hand & Glove',url:'https://shadowrobot.com/shadow-hand-glove/',publisher:'Shadow Robot 官网',date:'2026-10-14',kind:'官方应用产品 · 访问日期'},
 {id:'S-ZW',title:'兆威机电 2025 年年度报告',url:'https://static.cninfo.com.cn/finalpage/2026-03-31/1225057987.PDF',publisher:'兆威机电 / 巨潮资讯',date:'2026-03-31',kind:'法定披露',sha256:'911aa22c0a788b1872362f3d61da2f6435bbac3b819b8b80ed9d9827bba4263d'},
 {id:'S-KL',title:'柯力传感 2025 年年度报告',url:'https://static.cninfo.com.cn/finalpage/2026-04-28/1225199660.PDF',publisher:'柯力传感 / 巨潮资讯',date:'2026-04-28',kind:'法定披露',sha256:'3c6d8c14cf13813eb6c8fc2d29d3712357d5c2e2b24794ba8638a5bf9de4c56b'},
 {id:'S-OB',title:'奥比中光 2025 年年度报告',url:'https://static.cninfo.com.cn/finalpage/2026-04-20/1225123796.PDF',publisher:'奥比中光 / 巨潮资讯',date:'2026-04-20',kind:'法定披露',sha256:'1fc239518451bfb2857a8fad29e8a1ce038f126f6e5ae014ce45fe4ff14f6a0e'},
 {id:'S-FA',title:'How drive technology brings robotic hands to life',url:'https://www.faulhaber.com/en/motion/robotic-hands/',publisher:'FAULHABER 官网',date:'2026-10-14',kind:'公司产品材料 · 访问日期'},
 {id:'S-SH',title:'Shadow Dexterous Hand Series',url:'https://shadowrobot.com/dexterous-hand-series/',publisher:'Shadow Robot 官网',date:'2026-10-14',kind:'公司产品材料 · 访问日期'},
 {id:'S-ATI',title:'Multi-Axis Force / Torque Sensors',url:'https://www.ati-ia.com/products/ft/sensors.aspx',publisher:'ATI 官网',date:'2026-10-14',kind:'公司产品材料 · 访问日期'},
 {id:'S-NOV',title:'Novanta Announces Agreement to Acquire ATI',url:'https://investors.novanta.com/news/news-details/2021/Novanta-Announces-Agreement-to-Acquire-ATI/default.aspx',publisher:'Novanta 投资者关系',date:'2021-07-19',kind:'公司公告 · 历史背景'},
 {id:'S-ATI-NOW',title:'ATI Industrial Automation — a Novanta company',url:'https://ati.novanta.com/',publisher:'ATI / Novanta 官网',date:'2026-10-14',kind:'公司身份材料 · 访问日期'},
 {id:'S-RS',title:'RealSense D430 Series',url:'https://www.realsenseai.com/products/430-series/',publisher:'RealSense 官网',date:'2026-10-14',kind:'公司产品材料 · 访问日期'},
 {id:'S-GEM',title:'Orbbec Gemini 335',url:'https://www.orbbec.com/products/stereo-vision-camera/gemini-335/',publisher:'奥比中光官网',date:'2026-10-14',kind:'公司产品材料 · 访问日期'},
 {id:'S-POL',title:'人形机器人创新发展指导意见',url:'https://www.miit.gov.cn/jgsj/kjs/wjfb/art/2023/art_50316f76a9b1454b898c7bb2a5846b79.html',publisher:'工业和信息化部',date:'2023-11-02',kind:'政府政策 · 历史事件'},
];
export const applications = [
 {id:'ur-assembly',level:'L3 · 工业装配',name:'Universal Robots · 拧紧装配',task:'机器人在装配任务中使用力/力矩反馈控制接触与拧紧。',dependencies:['机器人本体','力/力矩反馈','装配工具'],quote:'torque reaction coming from the screwdriver is detected using the Force and Torque Sensor in the robot',url:'https://www.universal-robots.com/manuals/EN/HTML/SW5_26/Content/guide-hightorque/screwdrivingfunc.htm',boundary:'官方应用手册支持功能依赖；未证明采用柯力或ATI产品，也不等于多指灵巧手场景。'},
 {id:'shadow-teleop',level:'L3 · 研究与遥操作',name:'Shadow · 手臂与灵巧手遥操作',task:'通过手套、手臂与灵巧手系统执行危险或洁净环境中的远程操作和研究任务。',dependencies:['多指灵巧手','控制与遥操作','触觉反馈'],quote:'designed for use in hazardous environments, clean rooms and remote collaborative research projects',url:'https://shadowrobot.com/shadow-hand-glove/',boundary:'官方产品应用陈述，不能当成已量化订单、客户采购金额或国产企业供货关系。'}
];
export const companies = [
 {id:'zhaowei',name:'兆威机电',ticker:'003021.SZ',market:'中国 · A股',branches:['drive','hand'],description:'微型传动与驱动系统，拓展机器人灵巧手。',revenue:1715534329.63,period:'2025自然年',financeSource:'S-ZW',financeLocator:'PDF 第7页：主要会计数据',financeLimit:'集团总收入，不能作为灵巧手收入。'},
 {id:'keli',name:'柯力传感',ticker:'603662.SH',market:'中国 · A股',branches:['force'],description:'力学传感与物联网业务，布局机器人力学感知。',revenue:1558438867.20,period:'2025自然年',financeSource:'S-KL',financeLocator:'PDF 第8页：主要会计数据',financeLimit:'集团总收入；含传统工业传感及并购业务。'},
 {id:'orbbec',name:'奥比中光',ticker:'688322.SH',market:'中国 · A股',branches:['vision'],description:'3D 视觉传感器及应用设备，覆盖机器人等场景。',revenue:940743637.65,period:'2025自然年',financeSource:'S-OB',financeLocator:'PDF 第9页：主要会计数据',financeLimit:'集团总收入；含支付、扫描等多种业务。'},
 {id:'faulhaber',name:'FAULHABER',ticker:'非上市',market:'德国 · 产品同行',branches:['drive'],description:'微电机、精密减速器与编码器，服务机器人和假肢。',revenue:null,period:'未提供',financeSource:'S-FA',financeLocator:'官网 Robotic Hands',financeLimit:'仅产品与应用可比，未使用非公开财务。'},
 {id:'shadow',name:'Shadow Robot',ticker:'非上市',market:'英国 · 产品同行',branches:['hand'],description:'研究与开发用多指灵巧手、遥操作系统。',revenue:null,period:'未提供',financeSource:'S-SH',financeLocator:'官网 Dexterous Hand Series',financeLimit:'技术产品同行，不是上市公司估值可比样本。'},
 {id:'ati',name:'ATI / Novanta',ticker:'NOVT · 母公司',market:'美国 · 子业务同行',branches:['force'],description:'ATI 六轴力/力矩产品；Novanta 旗下业务。',revenue:null,period:'未提供',financeSource:'S-ATI-NOW',financeLocator:'ATI 官方首页公司身份',financeLimit:'ATI 产品业务与 Novanta 集团不是同一财务口径。'},
 {id:'realsense',name:'RealSense',ticker:'产品业务同行',market:'海外 · 产品同行',branches:['vision'],description:'双目深度相机与模组，覆盖机器人视觉。',revenue:null,period:'未提供',financeSource:'S-RS',financeLocator:'D430 Series 产品页',financeLimit:'不把 RealSense 产品收入对应到 Intel 集团财务。'},
];
export const evidence:Evidence[] = [
 {id:'E-ZW-D',company:'zhaowei',branch:'drive',concept:'微型传动与驱动',stage:'E2',claim:'年报说明微型驱动的设计、制造与集成能力，可归属上游执行部件；机器人分项收入尚未据此量化。',quote:'传动系统+微电机系统+电控系统',sourceId:'S-ZW',locator:'PDF 第21页：核心竞争力',period:'2025年度',limit:'通用驱动能力不能推导人形机器人收入或客户份额。',verified:'原文已核对',date:'2026-03-31'},
 {id:'E-ZW-H',company:'zhaowei',branch:'hand',concept:'机器人灵巧手',stage:'E2',claim:'已披露仿生灵巧手产品与批量生产推进，属于产品和制造进展证据；所选材料没有单列灵巧手收入。',quote:'批量化生产工作持续推进',sourceId:'S-ZW',locator:'PDF 第21页：机器人业务进展；第15页：产品简介',period:'2025年度报告，含2026年1月后续进展',limit:'推进批量生产不等于已实现大额销售；型号参数须按B20等具体产品区分。',verified:'原文已核对',date:'2026-03-31'},
 {id:'E-KL-F',company:'keli',branch:'force',concept:'机器人力学传感器',stage:'E3',claim:'年报披露机器人力学传感器销售超过1500只、送样客户超过70家，已有销售证据，尚不能量化对应收入占比。',quote:'报告期内，机器人力学传感器销售量超过\n1500 只，送样客户数超过 70 家，已进入小批量生产向批量化供应过渡的发展阶段。',sourceId:'S-KL',locator:'PDF 第12页：（三）机器人相关业务',period:'2025年度',limit:'销量不是收入；传统力学传感器及仪表系列收入不等于机器人六维力收入。',verified:'原文已核对',date:'2026-04-28'},
 {id:'E-KL-T',company:'keli',branch:'force',concept:'触觉传感战略布局',stage:'E1',claim:'年报披露对触觉相关企业的战略投资，属于股权布局；未据此认定集团自产触觉产品已有量产收入。',quote:'战略投资',sourceId:'S-KL',locator:'PDF 第12页：（二）战略投资',period:'2025年度',limit:'被投企业产品和母公司主营业务分别记录；投资关系不等于供应关系。',verified:'原文已核对',date:'2026-04-28'},
 {id:'E-OB-V',company:'orbbec',branch:'vision',concept:'3D视觉传感器',stage:'E4',claim:'年报单列3D视觉传感器产品收入290,934,711.69元，支持该产品层面的收入关系。',quote:'3D 视觉传\n感器 290,934,711.69 132,591,177.44 54.43 36.79 11.72 10.23',sourceId:'S-OB',locator:'PDF 第49页：主营业务分产品表',period:'2025年度',limit:'产品收入包含多种应用场景，不能全部归属于机器人或灵巧手。',verified:'原文已核对',date:'2026-04-20'},
 {id:'E-OB-R',company:'orbbec',branch:'vision',concept:'机器人视觉业务',stage:'E3',claim:'年报将机器人业务收入增长列为收入增长原因，支持已存在机器人业务收入，但未在所选分部表中单列金额。',quote:'机器人业务收入增长',sourceId:'S-OB',locator:'PDF 第48页：营业收入变动原因',period:'2025年度',limit:'未量化的机器人收入，不能用AIoT分部或集团总收入替代。',verified:'原文已核对',date:'2026-04-20'},
 {id:'E-FA-D',company:'faulhaber',branch:'drive',concept:'机器人手微型驱动',stage:'E2',claim:'官网介绍微电机、减速器及编码器在机器人手中的应用，支持技术产品归属。',quote:'Micromotors',sourceId:'S-FA',locator:'How drive technology brings robotic hands to life：应用与驱动系统段落',period:'2026-10-14访问，页面未标明发布日期',limit:'公司产品介绍不能证实特定中国客户供货或机器人收入金额。',verified:'官网已核对',date:'2026-10-14'},
 {id:'E-SH-H',company:'shadow',branch:'hand',concept:'研究用灵巧手',stage:'E2',claim:'官网提供五指灵巧手、腱绳传动及研究用途信息，支持末端集成归属。',quote:'Tendon Driven',sourceId:'S-SH',locator:'Dexterous Hand Series：产品介绍',period:'2026-10-14访问，页面未标明发布日期',limit:'研究用途和腱绳方案与国产直驱量产方案不同，不能只按自由度排名。',verified:'官网已核对',date:'2026-10-14'},
 {id:'E-ATI-F',company:'ati',branch:'force',concept:'六轴力/力矩传感',stage:'E2',claim:'ATI官网介绍同时测量三轴力与三轴力矩的传感系统，支持六维力产品功能可比。',quote:'all six components',sourceId:'S-ATI',locator:'Multi-Axis Force / Torque Sensors：产品描述',period:'2026-10-14访问，页面未标明发布日期',limit:'工业及医疗应用成熟度不自动等于人形机器人供货；ATI收入不等于NOVT收入。',verified:'官网已核对',date:'2026-10-14'},
 {id:'E-RS-V',company:'realsense',branch:'vision',concept:'机器人双目深度相机',stage:'E2',claim:'D430系列提供双目深度计算与机器人应用，支持与Gemini系列在视觉功能上比较。',quote:'stereo depth',sourceId:'S-RS',locator:'D430 Series：平台描述与D435i介绍',period:'2026-10-14访问，页面未标明发布日期',limit:'产品规格测试条件不同；没有使用其未公开收入或估值。',verified:'官网已核对',date:'2026-10-14'},
 {id:'E-OB-N',company:'orbbec',branch:'force',concept:'机器人六维力传感器',stage:'E0',claim:'在本研究选取的奥比中光年报与Gemini产品材料中，未建立六维力传感器自产关系。',quote:'',sourceId:'S-OB',locator:'检索范围：2025年报、Gemini 335产品页',period:'截至本研究快照',limit:'证据不足只是本次检索结果，不构成“该公司没有该业务”的结论。',verified:'检索边界已标注',date:'2026-10-14'},
];
export const comparisons = [
 {id:'drive',left:'zhaowei',right:'faulhaber',label:'微型执行部件',scope:'产品与技术可比',why:'都覆盖紧凑驱动、传动与集成，可比较尺寸、扭矩密度、寿命、回差和控制接口。',unlike:'兆威也做灵巧手集成；FAULHABER是微型驱动产品同行。机器人应用、客户、量产阶段与业务组合不同。',financial:'不比较集团PE或收入规模；FAULHABER未提供公开可核验的分项财务。',sources:['S-ZW','S-FA']},
 {id:'hand',left:'zhaowei',right:'shadow',label:'多指灵巧手',scope:'应用与结构可比',why:'都交付可执行多指操作的机器人手，可比较主动自由度、重量、力控、耐久和维护。',unlike:'内置驱动集成与腱绳传动不同；研究平台与规模制造目标不同。相同自由度不能代表同等性能。',financial:'Shadow是非上市产品同行，不能构成直接估值可比。兆威集团财务不等于灵巧手财务。',sources:['S-ZW','S-SH']},
 {id:'force',left:'keli',right:'ati',label:'六维力感知',scope:'功能可比 · 子业务',why:'围绕三轴力、三轴力矩的测量与机器人柔顺操作，可比较量程、精度、串扰、采样、标定与可靠性。',unlike:'柯力现有业务含称重及物联网；ATI是Novanta子业务，工业/医疗应用组合与国产人形导入阶段不同。',financial:'NOVT集团含多个业务，不把其整体收入、利润率或PE直接套用到柯力机器人业务。',sources:['S-KL','S-ATI','S-ATI-NOW']},
 {id:'vision',left:'orbbec',right:'realsense',label:'双目3D视觉',scope:'产品功能可比',why:'Gemini 335和D430系列均提供双目深度相机，服务机器人空间感知，可比较成像、同步、接口和SDK。',unlike:'相机型号、测量距离、ROI、帧率和测试环境不同；不能直接把两家精度数值排成优劣。',financial:'只比较可公开产品信息；不把奥比AIoT全部归为机器人，不使用Intel整体估值替代RealSense。',sources:['S-GEM','S-RS','S-OB']},
];
export const events = [
 {id:'keli-demand',title:'客户验证向批量订单转化',type:'供需观察 · 真实公司披露',date:'2026-08-28',source:'S-KL-H1',fact:'半年报第9页披露：2026年1–6月机器人力学传感器销售超2000只，自4月份以来月订单量持续突破千只。集团同期收入增长22.27%、归母净利润下降24.38%，机器人业务收入金额未单列。',chain:['下游客户验证与订单释放（公司披露）','六维力/力矩、关节力矩部件需求','柯力机器人力学传感器供货','订单 → 批量交付 → 收入确认','机器人收入待分拆；集团财务仅作交叉核验'],branches:['force'],companies:['keli'],direction:'业务放量，财务贡献尚待量化',assumptions:'订单必须转为交付并满足收入确认条件；售价、良率、费用和回款影响最终财务。集团增长中并购及传统业务贡献须分开。',counter:'客户验证延期、订单取消、降价或返修会打断传导；集团净利润受到非经常性损益影响，不能用销量推算集团利润。',monitor:['第9页销量与月订单量','机器人收入单列情况','产品毛利与研发费用','第5页收入、归母及扣非净利、现金流']},
 {id:'policy',title:'政策支持机器人关键部件',type:'政策 · 已发生历史事件',date:'2023-11-02',source:'S-POL',fact:'工信部发布人形机器人创新发展指导意见。政策目标不代表目标已实现。',chain:['政策与研发支持','关键部件研发 / 国产方案验证','驱动、感知及灵巧手客户导入','验证通过 → 订单 → 交付','收入确认 / 研发费用 / 经营现金流'],branches:['drive','force','vision','hand'],companies:['zhaowei','keli','orbbec'],direction:'条件性正向',assumptions:'实际支持落地，产品满足性能及安全要求，客户验证通过；不把政策发布日直接等同收入增长。',counter:'验证周期延长、项目取消或资金偏向本体而非本公司的部件，可能打断传导。',monitor:['新客户样品验证','公告中的订单与交付','机器人收入单列','研发与经营现金流']},
 {id:'volume',title:'下游机器人交付增加',type:'供需 · 假设情景',date:'用户设定',source:'',fact:'情景分析：假设下游交付增加。不是已发生订单或行业销量预测。',chain:['机器人交付需求变化','单机部件配置与采用率','认证供应商份额与产能','部件销量 × 平均售价','收入 / 毛利 / 应收款 / 库存'],branches:['drive','force','vision','hand'],companies:['zhaowei','keli','orbbec'],direction:'取决于渗透率与单价',assumptions:'单机配置、供应份额、价格、交付和收入确认需分别验证。量增不保证利润增。',counter:'降价、替代路线、良率不足、滞销库存和回款拉长可能抵消销量增长。',monitor:['交付而非意向订单','BOM变化','产品售价','存货与应收账款']},
 {id:'overseas',title:'海外精细操作技术进展',type:'海外 · 产品材料观察',date:'2026-10-14访问',source:'S-SH',fact:'Shadow官网展示研究用灵巧手与腱绳方案；技术展示不能证明国产公司的客户订单。',chain:['海外产品与研究方案','精度 / 耐久 / 触觉需求变化','国内产品验证与研发投入','量产方案和供应链选择','研发费用 / 资本开支 / 长期毛利'],branches:['drive','force','hand'],companies:['zhaowei','keli'],direction:'技术机会与替代风险并存',assumptions:'新方案满足应用与成本要求，且需求真实转化到国内供应链。',counter:'开发路线不同、客户自制或海外方案难以规模化，可能不产生国内收入。',monitor:['型号与测评条件','定点与采购公告','量产良率','售后与返修成本']},
];
