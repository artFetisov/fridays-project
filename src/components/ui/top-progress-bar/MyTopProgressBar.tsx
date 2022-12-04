import TopBarProgress from "react-topbar-progress-indicator";
import React, {FC} from "react";

TopBarProgress.config({
    barColors: {
        "0": "#366EFF",
        "1.0": "#366EFF"
    },
    shadowBlur: 5
});

export const MyTopProgressBar: FC = () => {
    return <TopBarProgress/>
}