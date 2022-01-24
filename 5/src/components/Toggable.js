import React, {forwardRef, useState, useImperativeHandle} from 'react'

const Toggable = forwardRef(({ text, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => { setVisible((prevValue) => !prevValue) }

  useImperativeHandle(ref, () => { return { toggleVisibility } })

  return (
    <div>
      {
      visible ?
        <>
          {children}
          <button onClick={toggleVisibility}> Cancel </button>
        </>
        :
        <button onClick={toggleVisibility}> {text} </button>
      }
    </div>
  )
})

export default Toggable