export const mergeDicts = (dictToAdd, originDict) => {
    if (!(typeof dictToAdd === 'object' && dictToAdd !== null)) {
        dictToAdd = {};
    }
    const dictToAddFinal = Object.entries(originDict).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {...dictToAdd});
    return dictToAddFinal;
}
