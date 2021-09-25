const fs = require('fs');
const readline = require('readline');

class FileHelper {
    static parseLine(line, index) {
        const centerIndex = line.indexOf(': ');
        const scoreString = line.substring(0, centerIndex);
        const jsonString = line.substring(centerIndex + 1);

        const score = parseInt(scoreString);

        try {
            const data = JSON.parse(jsonString);

            return {score, id: data.id, index};
        } catch (err) {
            console.log(`invalid json format No JSON object could be decoded: ${err}`);
            process.exit(1);
        }
    }

    static async readFile(filepath, limit) {
        return new Promise((resolve) => {
            let index = 0;
            const lines = [];

            const readInterface = readline.createInterface({
                input: fs.createReadStream(filepath),
            });

            readInterface.on("line", (line) => {
                const data = FileHelper.parseLine(line, index);

                lines.push(data);
                index++;

                if (index >= limit) {
                    readInterface.close();
                    readInterface.removeAllListeners();
                }
            });

            readInterface.on("close", () => resolve(lines));
        });
    }
}

module.exports = FileHelper;