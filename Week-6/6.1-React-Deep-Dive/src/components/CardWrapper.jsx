import React from 'react'

function CardWrapper({ innerComponent }) {
  return (
    <div style={{
        border:"2px solid black", 
        height:"50px",
        padding:"10px",
        }}
    >
        {innerComponent}
    </div>
  )
}

export default CardWrapper