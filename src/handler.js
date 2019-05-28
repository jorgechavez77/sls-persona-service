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

module.exports.findPersona = async event => {
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

exports.updatePersona = async event => {
  const { id } = event.pathParameters
  const data = JSON.parse(event.body)

  try {
    const resp = await repo.updatePersona(id, data)
    const result = JSON.parse(resp)
    console.log(result)
    const response = {}
    if(result.nModified === 1) {
      response.message = "Resource updated successfully"
    } else {
      response.message = "Resource not updated"
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: response.message 
      })
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
