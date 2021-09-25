const FileHelper = require('./helpers/fileHelper');

const main = async () => {
    const args = process.argv.slice(2);

    try {
        await highest(args[0], args[1]);
    } catch (err) {
        console.log(`Runtime error: ${err}`);
        process.exit(1);
    }
}


const highest = async (filepath, limit) => {
    const lines = await FileHelper.readFile(filepath, limit);

    const sortedLines = lines.sort((a, b) => {
        const diff = b.score - a.score;

        if (diff === 0) {
            return b.index - a.index;
        }

        return diff;
    });

    console.log(sortedLines);
}

main()