class SortHelper {
    static sortByScoreAndPosition(lines) {
        return lines.sort((a, b) => {
            const diff = b.score - a.score;

            if (diff === 0) {
                return b.index - a.index;
            }

            return diff;
        });
    }
}

module.exports = SortHelper;