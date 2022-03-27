const filterFields = ({ product: p, ...other }) => {
  return {
    product: {
      ...p,
      image: {
        url: p.image.url,
        width: p.image.width,
        height: p.image.height,
        formats: p.image.formats,
      },
    },
    ...other,
  }
}

export default filterFields
