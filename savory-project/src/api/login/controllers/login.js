"use strict";

const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = {
  async login(ctx) {
    try {
      const { identifier, password } = ctx.request.body;
      const errors = [];

      // Basic validation
      if (!identifier) errors.push("Email or username is required");
      if (!password) errors.push("Password is required");
      if (password && password.length < 8)
        errors.push("Password must be at least 8 characters");

      if (errors.length > 0) {
        return ctx.badRequest("Validation errors", { errors });
      }

      // Normalize identifier
      const normalizedIdentifier = validator.isEmail(identifier)
        ? validator.normalizeEmail(identifier)
        : identifier;

      // Find user by email OR username
      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            $or: [
              { email: normalizedIdentifier },
              { username: normalizedIdentifier },
            ],
          },
        });

      if (!user) {
        return ctx.unauthorized("Invalid identifier or password");
      }

      // Compare passwords
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return ctx.unauthorized("Invalid password");
      }

      // // Check if user is blocked
      // if (user.blocked) {
      //   return ctx.unauthorized("Your account has been blocked");
      // }

      // // Check if user is confirmed (optional)
      // if (!user.confirmed) {
      //   return ctx.unauthorized("Please confirm your email before logging in");
      // }

      // ✅ Generate JWT (Strapi v4)
      const jwtService = strapi.plugins["users-permissions"].services.jwt;
      const jwtToken = jwtService.issue({ id: user.id });

      // Remove sensitive data
      const { password: _password, resetPasswordToken, ...safeUser } = user;

      return ctx.send({
        message: "Logged in successfully",
        jwt: jwtToken,
        user: safeUser,
      });
    } catch (err) {
      strapi.log.error("Login error:", err);
      return ctx.internalServerError("Failed to login");
    }
  },
};
