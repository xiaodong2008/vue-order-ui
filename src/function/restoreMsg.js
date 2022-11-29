import {Button, notification} from "ant-design-vue";
import {h} from "vue";

export default function restoreMsg() {
  const key = `open${Date.now()}`;
  notification.open({
    message: "恢復購買記錄",
    description: "我們已經幫您恢復了您上次尚未完成的訂單，您可以繼續完成訂單或者重新開始一個新的訂單。",
    // two btn
    btn: () => h(
      Button,
      {
        type: 'primary',
        size: 'small',
        onClick: () => notification.close(key),
      },
      {
        default: () => "確認",
      }
    ),
    key,
    duration: 5,
    placement: "bottomLeft",
  })
}