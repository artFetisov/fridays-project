export const getCorrectDate = (date: string) => {
    const arrStrings = date.split('-')
    const year = arrStrings[0]
    const month = arrStrings[1]
    const day = arrStrings[2].slice(0, 2)

    return `${day}.${month}.${year}`
}