import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotating = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`
const dashed = keyframes`
  0% {
    stroke-dashoffset: 62px;
  }
  50% {
    stroke-dashoffset: ${62 / 4}px;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 62px;
    transform: rotate(450deg);
  }
`

const Component = styled.div`
  position: absolute;
  z-index: ${props => props.zIndex};
  left: 50%;
  border-radius: 20px;
  width: 40px;
  height: 40px;
`

const RotatingSvg = styled.svg`
  transform-origin: center;
  animation: ${rotating} 1.4s linear infinite;
`

const DashedCircle = styled.circle`
  stroke-dasharray: 62px;
  transform-origin: center;
  animation: ${dashed} 1.4s ease-in-out infinite;
`

export default (props, state) => {
  const { max, yRefreshing, y, phase } = state
  const { zIndex, color, bgColor, bgImage, topVal } = props
  const p = Math.atan(y / max)
  const pMax = Math.atan(yRefreshing / max)
  const r = Math.PI * 10 * 2
  const Svg = phase === 'refreshing' ? RotatingSvg : 'svg'
  const Circle = phase === 'refreshing' ? DashedCircle : 'circle'
  const refreshed = phase === 'refreshed'
  return (
    <Component
      key='pull'
      zIndex={zIndex}
      style={{
        top: Math.max(refreshed ? Math.atan(1) : p, 0) * max - 10 + (typeof(topVal) == 'undefined' ? 0 : topVal),
        transform: `translate(-50%, -100%) scale(${refreshed ? p : 1},${refreshed ? p : 1})`,
        //display: (phase === 'willRefresh' || phase === 'refreshing' || phase === 'refreshed'? 'block' : 'none')
        display: (phase === '' ? 'none' : 'block' )
        //backgroundColor: bgColor
      }}
    >
      <div
        style={{
          position:'absolute',
          width:'4.5667rem',
          height:'4.5667rem',
          backgroundImage:'url('+bgImage+')',
          backgroundSize:'100%'
        }}
      >
      </div>
    </Component>
  )
}


