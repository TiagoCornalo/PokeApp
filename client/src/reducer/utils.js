export const sortPokemon = (sortCriteria, array) => {
  switch (sortCriteria) {
    case 'AscendingName':
      return array.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    case 'DescendingName':
      return array.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    case 'AscendingAttack':
      return array.sort((a, b) => {
        return a.attack - b.attack
      })
    case 'DescendingAttack':
      return array.sort((a, b) => {
        return b.attack - a.attack
      })
    default:
      return array
  }
}

export const filterPokemon = (filterCriteria, array) => {
  switch (filterCriteria) {
    case 'Existing':
      return array.filter((poke) => typeof poke.id === 'number')
    case 'Created':
      return array.filter((poke) => typeof poke.id === 'string')
    default:
      return array
  }
}

export const filterByType = (type, array) => {
  return array.filter((poke) => poke.types.includes(type))
}
