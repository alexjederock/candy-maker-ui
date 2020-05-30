import React from 'react'

export default ({ id, name, country }) => (
  <div className="manufacturer" key={id}>{`${name} (${country})`}</div>
)
