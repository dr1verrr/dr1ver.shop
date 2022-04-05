export const shuffle = arrOrString => {
  return arrOrString.slice().sort(() => Math.random() - 0.5)
}
