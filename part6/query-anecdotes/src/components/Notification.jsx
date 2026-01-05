import {useNotification} from "../context/NotificationContext.jsx";

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const {notification,showNotification} = useNotification()
  
  if (notification==null||notification==='') return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
