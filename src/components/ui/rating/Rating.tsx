import React, {FC} from "react";
import Rating from '@mui/material/Rating';

interface IRatingProps {
    grade: number
}

export const MyRating: FC<IRatingProps> = ({grade}) => {

    return <Rating
        name="rating"
        value={grade}
        size={'small'}
    />
}