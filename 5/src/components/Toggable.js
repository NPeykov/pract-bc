import React, {forwardRef, useState, useImperativeHandle} from 'react'

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

export default Toggable