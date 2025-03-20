
function getDurationList(courseDuration: string): string[] {
    let durationList: string[] = [];
    if (courseDuration === "FiveYears") {
        durationList = ["One", "Two", "Three", "Four", "Five"];
    } else if (courseDuration === "FourYears") {
        durationList = ["One", "Two", "Three", "Four"];

    } else if (courseDuration === "ThreeYears") {
        durationList = ["One", "Two", "Three"];

    }
    else if (courseDuration === "TwoYears") {
        durationList = ["One", "Two"];
    }
    return durationList;
}

export { getDurationList };