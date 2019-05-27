const repo = require('./repository')

exports.createPersona = async event => {
  const data = JSON.parse(event.body)
  try {
    const id = await repo.createPersona(data)
    console.debug({ id })
    const resp = await repo.findPersona(id)
    return {
      statusCode: 201,
      body: JSON.stringify(resp),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  }
}

exports.findPersona = async event => {
  const { id } = event.pathParameters

  try {
    const resp = await repo.findPersona(id)
    return {
      statusCode: 201,
      body: JSON.stringify(resp),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    }
  }
}
