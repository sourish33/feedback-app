import React from 'react'
import PropTypes from 'prop-types'

function Card({children, reverse}) {

    const classToUse = reverse? "card reverse": "card"
  return (
    <div className={classToUse}>
      {children}
    </div>
  )
}
 Card.defaultProps = {
    reverse: false
 }

 Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool
 }

export default Card
