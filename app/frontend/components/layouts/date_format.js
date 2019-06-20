export const dateFormat = (dateStr) => {
  const date = new Date(dateStr)
  const y = date.getFullYear()
  const mon = `0${date.getMonth() + 1}`.slice(-2)
  const d = `0${date.getDate()}`.slice(-2)
  const h = `0${date.getHours()}`.slice(-2)
  const min = `0${date.getMinutes()}`.slice(-2)
  return `${y}/${mon}/${d} ${h}:${min}`
}
