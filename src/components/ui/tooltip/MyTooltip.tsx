import React, {FC, ReactNode} from "react";
import Tooltip, {TooltipProps, tooltipClasses} from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import {LoginForm} from "../../screens/LoginForm/LoginForm";

const LightTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className, arrow: className}}/>
))(({theme}) => ({
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
}));

interface IMyTooltipProps {
    children: React.ReactElement<any, any>
    element: ReactNode
}

export const MyTooltip: FC<IMyTooltipProps> = ({children, element}) => {
    return <LightTooltip arrow placement="bottom-end" title={element}>
        {children}
    </LightTooltip>
}