import { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(props.ref, () => ({ toggleVisibility }))

  return (
    <div>
      {!visible && (
        <Button variant="primary" size="sm" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      )}
      {visible && (
        <div>
          {props.children}
          <Button variant="secondary" size="sm" className="mt-2" onClick={toggleVisibility}>
            cancel
          </Button>
        </div>
      )}
    </div>
  )
}

export default Togglable
