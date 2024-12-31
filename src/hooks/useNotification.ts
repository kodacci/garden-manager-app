import { App } from 'antd'
import { NotificationInstance } from 'antd/es/notification/interface'

export const useNotification = (): NotificationInstance => {
  return App.useApp().notification
}
