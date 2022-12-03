import React, {FC, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {setCardsPageCount, setOpenedPackId} from "../../../store/reducers/card/card.slice";
import {getCardsTC, sendGradeCardTC} from "../../../store/reducers/card/card.actions";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {setPageCount} from "../../../store/reducers/pack/pack.slice";
import {PATH} from "../../../routes/router.data";
import styles from './LearnPackPage.module.scss';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {ICard} from "../../../types/cards";
import {Button} from "../../ui/button/Button";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControl from "@mui/material/FormControl";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

const getCard = (cards: ICard[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

export const LearnPackPage: FC = () => {
    const dispatch = useAppDispatch()

    const cards = useAppSelector(state => state.card.cards)
    const packName = useAppSelector(state => state.card.packName)

    const {packId} = useParams()

    const [isShowGrades, setIsShowGrades] = useState(false)
    const [gradeValue, setGradeValue] = useState(1)
    const [currentCard, setCurrentCard] = useState<ICard>({
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: '',
    })

    useEffect(() => {
        if (packId) {
            dispatch(setCardsPageCount(1000))
            dispatch(setOpenedPackId(packId))
            dispatch(getCardsTC())
        }

        return () => {
            dispatch(setCardsPageCount(10))
        }
    }, [dispatch, packId])

    useEffect(() => {
        if (cards.length > 0 && !isShowGrades) {
            setCurrentCard(getCard(cards))
        }
    }, [isShowGrades])

    const handleShowGrades = () => {
        setIsShowGrades(!isShowGrades)
    }

    const handleChangeGrade = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGradeValue((Number(event.currentTarget.value)))
    };

    const onNext = () => {
        dispatch(sendGradeCardTC({card_id: currentCard._id, grade: gradeValue}))

        handleShowGrades()
    }

    return <div className={styles.container}>
        <Link to={PATH.PACKS}>
            <div className={styles.backArrowWrapper}>
                <KeyboardBackspaceIcon/>
                <span>Back to Packs List</span>
            </div>
        </Link>
        <div className={styles.title}>Learn "{packName}"</div>
        <div className={styles.questionAndAnswersBox}>
            <div className={styles.questionAndAnswerInfo}>
                <span>Question: </span>
                <span>{currentCard.question}</span>
            </div>
            <div className={styles.attempts}>Number of attempts to answer the question: <span>{currentCard.shots}</span>
            </div>
            {!isShowGrades && <>
                <Button big onClick={handleShowGrades}>Show answer</Button>
            </>}
            {isShowGrades && <>
                <div className={styles.questionAndAnswerInfo}>
                    <span>Answer: </span>
                    <span>{currentCard.answer}</span>
                </div>
                <div className={styles.gradesTitle}>Rate yourself:</div>
                <div style={{marginBottom: '32px'}}>
                    <FormControl>
                        <RadioGroup
                            defaultValue={grades[0]}
                            name="radio-buttons-group"
                            value={gradeValue}
                            onChange={handleChangeGrade}
                        >
                            {grades.map((grade, index) => <FormControlLabel
                                value={index + 1}
                                control={<Radio/>}
                                label={grade}/>)}
                        </RadioGroup>
                    </FormControl>
                </div>
                <Button big onClick={onNext}>Next</Button>
            </>}
        </div>
    </div>
}