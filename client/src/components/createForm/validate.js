export const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Name required.'
  }
  if (!values.hp) {
    errors.hp = 'Hp required.'
  }
  if (!values.attack) {
    errors.attack = 'Attack required.'
  }
  if (!values.defense) {
    errors.defense = 'Defense required.'
  }
  if (!values.speed) {
    errors.speed = 'Speed required.'
  }
  if (!values.height) {
    errors.height = 'Height required.'
  }
  if (!values.weight) {
    errors.weight = 'Weight required.'
  }
  if (values.types.length === 0) {
    errors.types = 'At least one type is required'
  }
  return errors
}
