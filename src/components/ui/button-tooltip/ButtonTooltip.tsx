import React, {FC, useState} from "react";
import styles from './ButtonTooltip.module.scss';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Tooltip, {tooltipClasses, TooltipProps} from "@mui/material/Tooltip";
import {EditTooltip} from "./EditTooltip";
import {styled} from "@mui/material/styles";

const LightTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className, arrow: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: `0px 2px 15px rgba(0, 0, 0, 0.06)`,
        fontSize: 11,
        maxWidth: '200px',
        border: '1px solid #CFCFCF',
    },
    [`& .${tooltipClasses.arrow}::before`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.white,
        boxShadow: theme.shadows[1],
        fontSize: 11,
        border: '1px solid #CFCFCF',
    },
}));


export const ButtonTooltip: FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleTooltipIsOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleTooltipClose = () => setIsOpen(false)

    return <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
            <LightTooltip
                arrow
                placement="bottom-end"
                PopperProps={{
                    disablePortal: true,
                }}
                open={isOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={<EditTooltip/>}
            >
                <div className={styles.customButton} onClick={handleTooltipIsOpen}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </LightTooltip>
        </div>
    </ClickAwayListener>
}