import React, { FC, ReactNode } from 'react'

import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className, arrow: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: `0px 2px 15px rgba(0, 0, 0, 0.06)`,
    fontSize: 11,
    maxWidth: '200px',
  },
  [`& .${tooltipClasses.arrow}::before`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))

interface IMyTooltipProps {
  children: React.ReactElement<any, any>
  element: ReactNode
  disabled?: boolean
}

export const MyTooltip: FC<IMyTooltipProps> = ({ children, element, disabled }) => {
  return (
    <LightTooltip arrow placement="bottom-end" title={element} disableHoverListener={disabled}>
      {children}
    </LightTooltip>
  )
}
