import React, {FC} from "react";
import Rating from '@mui/material/Rating';

interface IRatingProps {
    grade: number
}

export const MyRating: FC<IRatingProps> = ({grade}) => {

    return <Rating
        precision={0.5}
        readOnly
        name="rating"
        value={grade}
        size={'small'}
    />
}