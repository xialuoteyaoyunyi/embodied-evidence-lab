# 候选人提交清单

产品名称：具身证据台。

研究范围：机器人精细操作所需执行与感知产业链。

- Web产品URL：https://embodied-evidence-lab-20261014.elven-mug-1563.chatgpt.site
- 公开源码仓库：https://github.com/xialuoteyaoyunyi/embodied-evidence-lab
- README：仓库根目录README.md。
- 正式演示视频：由候选人在产品验收后亲自录制，尚未提交。录制顺序见docs/DEMO_SCRIPT.md。
- AI使用记录：docs/AI_USAGE.md、真实验证JSON与初轮失败记录。
- 测试说明：docs/TESTING.md、测试执行摘要及浏览器结果。
- 数据核验：docs/baseline-validation.json；基础来源台账位于lib/research-data.ts。

数据边界：扶摇和iFinD未接入，首版采用题目允许补充的公司与权威公开材料。这一边界应在提交说明中明确披露，不能声称完成商业数据平台接入。

AI访问码单独提供评审，不写入公开仓库。普通研究浏览无需访问码。

公开网站已由托管平台确认部署成功，健康接口返回HTTP200；生产AI调用需私有评审访问码。源码仅使用候选人指定的新账号，不使用已排除的旧账号。实际源码发布结果以outputs/github-publication.json中的远程SHA验证为准。
