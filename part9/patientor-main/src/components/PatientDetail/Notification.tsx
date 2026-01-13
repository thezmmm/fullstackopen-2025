const Notification = ({ message }: { message: string }) => {
  if (!message||message==="") return null;

  return (
    <div style={{ color: 'red', marginBottom: '1em' }}>
      {message}
    </div>
  );
}

export default Notification;