export function cap(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function capWords(str: string) {
    return str
        .split("-")
        .map((word: string) => cap(word))
        .join("-");
}
