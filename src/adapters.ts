export const wsNodeRedRSVArapter = (json: string) => {
    let obj = JSON.parse(json)
    const time = obj.time

    return { time, lines: obj }
}
