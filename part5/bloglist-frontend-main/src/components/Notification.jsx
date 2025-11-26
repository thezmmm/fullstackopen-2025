import './notification.css'

const Notification = ({ message}) => {
    if (!message) {
        return null;
    }

    return <div className={message.type==='error'?'error':'success'}>{message.message}</div>;
}
export default Notification