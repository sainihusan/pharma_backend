const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Agent IDE â€” Authentication API",
      version: "1.0.0",
      description:
        "Secure authentication API for the Agent IDE application.  " +
        "Supports signup with email verification, login/logout with JWT, " +
        "and password reset via OTP.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000",
        description: "Current Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Operation completed" },
            data: { type: "object", nullable: true },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Something went wrong" },
            data: { type: "object", nullable: true },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
