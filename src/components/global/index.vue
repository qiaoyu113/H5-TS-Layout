<script>
const gio = window.gio
const agentId = '1000016'
// const url = window.location.host
const version = 'v2.0.1'
// if (url !== 'firmiana-wechat.yunniao.cn') {
//   if (url === 'firmiana-open-api-m2.yunniao.cn') {
//     agentId = '1000021'
//   } else if (url !== 'firmiana-wechat.m1.yunniao.cn') {
//     // url = 'http://firmiana-wechat.m1.yunniao.cn/'
//     agentId = '1000015'
//   } else {
//     agentId = '1000013'
//     // url = 'http://firmiana-open-api-d2.yunniao.cn/'
//   }
// }
function buryPointFunction(eventNameVal, eventNameValCH, propertiesVal) {
  if (window.location.host === 'firmiana-wechat.yunniao.cn') {
    for (const i in propertiesVal) {
      if (propertiesVal[i] === '') {
        delete propertiesVal[i]
      }
    }
    gio('track', eventNameVal, propertiesVal)
    window.zhuge.track(eventNameValCH, propertiesVal)
  }
}
export default
{
  buryPointFunction,
  agentId,
  version
}
</script>
