import validator from "validator";
import bcrypt from "bcrypt";

export default {
  async login(ctx) {
    try {
      const { identifier, password } = ctx.request.body;
      const errors = [];

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

      // Try email or username lookup
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

      console.log("user: ", user);
      // Compare passwords
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return ctx.unauthorized("Invalid password");
      }

      // Check if user is confirmed or blocked (optional)
      if (user.blocked) {
        return ctx.unauthorized("Account is blocked");
      }

      // ✅ Create JWT using Strapi v5 way
      const jwtService = strapi.plugin("users-permissions").service("jwt");
      const jwtToken = jwtService.issue({ id: user.id });

      // Remove sensitive fields
      const { password: _password, ...safeUser } = user;

      return ctx.send({
        message: "Logged in successfully",
        jwt: jwtToken,
        user: safeUser,
      });
    } catch (err) {
      console.error("Login error:", err);
      return ctx.internalServerError("Failed to login");
    }
  },
};
