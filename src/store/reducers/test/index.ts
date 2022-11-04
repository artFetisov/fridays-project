import {ITestState, TestActions, TestEnumAction} from "./types";

const initialState: ITestState = {
    count: 0
}

export default function testReducer(state = initialState, action: TestActions): ITestState {
    switch (action.type) {
        case TestEnumAction.INCREMENT:
            return {
                ...state, count: state.count + 1
            }

        case TestEnumAction.DECREMENT:
            return {
                ...state, count: state.count - 1
            }

        default:
            return state
    }
}