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
        console.log('\t{')
        console.log(`\t\t"score": ${line.score},`);
        console.log(`\t\t"id": "${line.id}"`);
        console.log('\t}')
    }
    console.log(']')
}

main()