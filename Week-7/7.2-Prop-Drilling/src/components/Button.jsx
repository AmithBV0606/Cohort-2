import React from 'react'

function Button({ count, setCount }) {
  return (
    <div>
      <button
        onClick={() => {
          setCount(prevCount => prevCount - 1);
        }}
      >
        Decrease
      </button>

      <button
        onClick={() => {
          setCount(prevCount => prevCount + 1);
        }}
      >
        Increase
      </button>
    </div>
  )
}

export default Button;