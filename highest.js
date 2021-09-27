const FileHelper = require('./helpers/fileHelper');
const SortHelper = require('./helpers/sortHelper');

const main = async () => {
    const [filepath, limit] = process.argv.slice(2);

    try {
        const dirtyLines = await FileHelper.readFile(filepath);

        const lines = dirtyLines.map(line => ({
            id: line.id,
            score: line.score
        }))

        const sortedLines = SortHelper.sortByScoreAndPosition(lines);

        sortedLines.length = limit;

        printOutput(sortedLines)

    } catch (err) {
        console.log(`Runtime error: ${err}`);
        process.exit(1);
    }
}

const printOutput = (array) => {
    console.log('[')
    for (const line of array) {
        console.log('    {')
        console.log(`         "score": ${line.score},`);
        console.log(`         "id": "${line.id}"`);
        console.log('    }')
    }
    console.log(']')
}

main()