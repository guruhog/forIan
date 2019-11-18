// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderPhases = (phases, source, destination) => {
  const current = [...phases[source.droppableId]];
  const next = [...phases[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    return {
      ...phases,
      [source.droppableId]: reordered
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);

  if (destination.droppableId === 'availablePhases') {
    target['active'] = false;
  }

  // insert into next
  next.splice(destination.index, 0, target);

  return {
    ...phases,
    [source.droppableId]: current,
    [destination.droppableId]: next
  };
};
