
export function flatten(arr) {
  return arr.reduce((flattened, toFlatten) => {
    return flattened.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

export function sort(arr, key, ascending) {
  const list = arr.slice();
  const multiplier = ascending ? 1 : -1;

  list.sort((prev, curr) => {
    const v1 = prev[key];
    const v2 = curr[key];

    if (typeof v1 === 'number') {
      return v1 < v2 ? 1 : -1;
    } else {
      return v1.localeCompare(v2) * multiplier;
    }
  });

  return list;
}
