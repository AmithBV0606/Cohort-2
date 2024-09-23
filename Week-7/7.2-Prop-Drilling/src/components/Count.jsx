import React from 'react'
import Button from './Button';

function Count({ count, setCount }) {
  return (
    <div>
        Count is {count}
        <Button count={count} setCount={setCount}/>
    </div>
  )
}

export default Count;