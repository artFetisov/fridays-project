import {DecrementAction, IncrementAction, TestEnumAction} from "./types";

export const TestActionCreators = {
    increment: (): IncrementAction => ({type: TestEnumAction.INCREMENT}),
    decrement: (): DecrementAction => ({type: TestEnumAction.DECREMENT})
}