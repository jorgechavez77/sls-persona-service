const repo = require('./repository')

exports.createPersona = async event => {
  const data = event.body
  try {
    const id = await repo.createPersona(data)
    const resp = await repo.findPersona(id)
    return {
      statusCode: 201,
      body: resp,
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: {
        message: error,
      },
    }
  }
}

exports.findPersona = async event => {
  const { id } = event.pathParameters

  try {
    const resp = await repo.findPersona(id)
    return {
      statusCode: 201,
      body: resp,
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: {
        message: error,
      },
    }
  }
}

exports.updatePersona = async event => {
  const { id } = event.pathParameters
  const data = event.body

  try {
    const result = await repo.updatePersona(id, data)
    const response = {}
    if (result.nModified === 1) {
      response.message = "Resource updated successfully"
    } else {
      response.message = "Resource not updated"
    }
    return {
      statusCode: 200,
      body: {
        message: response.message
      }
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: {
        message: error.message,
      },
    }
  }
}
