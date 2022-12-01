import React, {FC} from "react";
import ReduxToastrLib from 'react-redux-toastr'

export const ReduxToastr: FC = () => {
    return <ReduxToastrLib
        newestOnTop={false}
        preventDuplicates
        progressBar
        closeOnToastrClick
        timeOut={4000}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
    />
}