export interface ITestState {
    count: number
}

export enum TestEnumAction {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT'
}

export interface IncrementAction {
    type: TestEnumAction.INCREMENT
}

export interface DecrementAction {
    type: TestEnumAction.DECREMENT
}

export type TestActions = IncrementAction | DecrementAction