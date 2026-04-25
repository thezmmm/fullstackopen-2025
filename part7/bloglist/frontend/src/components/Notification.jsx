import './notification.css'
import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  if (!notification) return null
  return (
    <div className={notification.type === 'error' ? 'error' : 'success'}>
      {notification.message}
    </div>
  )
}

export default Notification
