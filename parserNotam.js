function parseTextToJSON(text) {

    const text2 = removeBeforeMarker(text)
    const text3= removeAfterWord(text2)
    const entries = {};
    const parts = text3.split(/>>>(.+?)<<<\s+/).filter(Boolean);
    for (let i = 0; i < parts.length; i += 2) {
        const key = parts[i].trim().substring(0, 4);
        let entryContent = parts[i + 1].trim();
        let subEntries = entryContent.split(/(?<=[a-zA-Z]{2}\/.*\/[0-9]{2})/).map(entry => entry.trim().replace(/\n+/g, ' '));
        subEntries = subEntries.map(e => {
            return e.replace(/\s\s+/g, ' ');
        }) 
        entries[key] = subEntries;
    }
    return entries;
}
function removeBeforeMarker(str) {
    const marker = /[^>][>]{3}[^>]/
    const match = str.match(marker);
    // Use regex to find the position of the first occurrence of the marker
    if (match) {
        // Find the index of the first occurrence of the marker
        const index = match.index;
        // Return the substring starting from the marker
        return str.slice(index + match[0].length - 4);
    } else {
        // If the marker is not found, return the original string
        return str;
    }
}
function removeAfterWord(str, word = "EN-ROUTE") {
    // Find the index of the first occurrence of the word
    const index = str.indexOf(word);
    if (index !== -1) {
        // Return the substring up to and including the word
        return str.slice(0, index);
    } else {
        // If the word is not found, return the original string
        return str;
    }
}

// Example usage
// const inputString = "Some text before>>>> And some more text>>> This is the text we want to keep.";
// const result = removeBeforeMarker(inputString);
// console.log(result);


// const jsonResult = parseTextToJSON(text);
// console.log(JSON.stringify(jsonResult, null, 2));

module.exports = {parseTextToJSON}
