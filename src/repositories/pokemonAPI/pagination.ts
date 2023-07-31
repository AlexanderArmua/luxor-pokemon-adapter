const getPaginatedResults = <T>(skip: number = 0, results: T[] = []): T[] => {
    if (results.length > 0) {        
        if (results.length <= skip) {
            return [];
        }

        const positionsToSkipInResult = results.length - skip;

        return results.slice(-positionsToSkipInResult);
    }

    return [];
}

export { getPaginatedResults };
