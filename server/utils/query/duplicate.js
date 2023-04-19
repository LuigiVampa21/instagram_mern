export const eliminateDuplicate = arr => {
    const uniqueArr = [];
    const seenIds = new Set();

    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];

        if (!seenIds.has(obj._id)) {
            seenIds.add(obj._id);
            uniqueArr.push(obj);
        }
    }

    return uniqueArr;
}