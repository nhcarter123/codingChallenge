const FileHelper = require('./helpers/fileHelper');
const SortHelper = require('./helpers/sortHelper');

const main = async () => {
    const [filepath, limit] = process.argv.slice(2);

    try {
        const lines = await FileHelper.readFile(filepath, limit);

        const sortedLines = SortHelper.sortByScoreAndPosition(lines);

        console.log(sortedLines);

    } catch (err) {
        console.log(`Runtime error: ${err}`);
        process.exit(1);
    }
}

main()