import React, { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef(({ toHideText, toViewText, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => { setVisible((prevValue) => !prevValue) }

  useImperativeHandle(ref, () => { return { toggleVisibility } })

  return (
    <div>
      {
        visible ?
          <>
            {children}
            <button onClick={toggleVisibility}> {toHideText} </button>
          </>
          :
          <button onClick={toggleVisibility}> {toViewText} </button>
      }
    </div>
  )
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  toViewText: PropTypes.string.isRequired,
  toHideText: PropTypes.string.isRequired
}


export default Toggable
