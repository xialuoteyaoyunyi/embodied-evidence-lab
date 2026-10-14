# 候选人提交清单

产品名称：机器人精细操作产业链研究台。

研究范围：机器人精细操作所需执行与感知产业链。

- Web产品URL：https://embodied-evidence-lab-20261014.elven-mug-1563.chatgpt.site
- 公开源码仓库：https://github.com/xialuoteyaoyunyi/embodied-evidence-lab
- README：仓库根目录README.md。
- 正式演示视频：由候选人在产品验收后亲自录制，尚未提交。录制顺序见docs/DEMO_SCRIPT.md。
- AI使用记录：docs/AI_USAGE.md、真实验证JSON与初轮失败记录。
- 测试说明：docs/TESTING.md、测试执行摘要及浏览器结果。
- 数据核验：docs/baseline-validation.json；基础来源台账位于lib/research-data.ts。

数据边界：扶摇已实现三家样本的授权行情、估值和集团利润表查询，公开材料补充业务证据；iFinD已实现公告、行业指标、主营业务、宏观、商品和海外财务授权检索；专门产业链图谱与研报接口未开放。数据面板使用研究访问码，密钥和原始商业接口验证记录不上传仓库。

AI访问码单独提供评审，不写入公开仓库。普通研究浏览无需访问码。

公开网站已由托管平台确认部署成功，健康接口返回HTTP200；生产AI调用需私有评审访问码。源码仅使用候选人指定的新账号，不使用已排除的旧账号。实际源码发布结果以outputs/github-publication.json中的远程SHA验证为准。

## v2最终交付验收

新增官方半年报真实闭环、D1追加审计记录、签名防篡改、当前版本问答、四组同口径比较矩阵、两类下游应用依据和逐项验收页面。基础自动测试64项。正式视频仍待候选人亲自录制，不能宣称第4项视频已经提交。企业SSO/RBAC、多租户、长期SLA与灾备尚未实现或验证。
