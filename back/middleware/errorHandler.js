const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val) => val.message)
    return res.status(400).json({
      error: "Validation Error",
      message: errors.join(", "),
    })
  }

  // PostgreSQL errors
  if (err.code) {
    switch (err.code) {
      case "23505": // Unique violation
        return res.status(409).json({
          error: "Conflict",
          message: "Resource already exists",
        })
      case "23503": // Foreign key violation
        return res.status(400).json({
          error: "Bad Request",
          message: "Referenced resource does not exist",
        })
      case "23502": // Not null violation
        return res.status(400).json({
          error: "Bad Request",
          message: "Required field is missing",
        })
    }
  }

  // Default error
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message,
  })
}

module.exports = errorHandler
