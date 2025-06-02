export function cleanInput(input: string): string[] {
    const noPadding: string = input.trim();
    const noLongSpaces: string = noPadding.replace(/\s+/g, " ");
    const lowered: string = noLongSpaces.toLowerCase();

    if (lowered.length === 0) return [];
    
    const words: string[] = lowered.split(" ");

    return words;
}