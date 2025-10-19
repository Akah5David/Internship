import validator from "validator";
// import bcrypt from "bcrypt";
export default {
  async register(ctx) {
    try {
      const { username, email, password } = ctx.request.body;

      // Collect validation errors
      const errors = [];
      if (!email) errors.push("Email is required");
      if (!password) errors.push("Password is required");
      if (email && !validator.isEmail(email)) errors.push("Invalid email");
      if (password && password.length < 8)
        errors.push("Password must be at least 8 characters");

      if (errors.length > 0) {
        return ctx.badRequest("Validation errors", { errors });
      }

      const safeEmail = validator.normalizeEmail(email);

      // ✅ Check if user already exists
      const existingUser = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { email: safeEmail },
        });

      if (existingUser) {
        return ctx.badRequest("User already exists");
      }

      // ✅ Create user (Strapi handles hashing internally)
      const newUser = await strapi
        .plugin("users-permissions")
        .service("user")
        .add({
          username: username || safeEmail,
          email: safeEmail,
          password, // Strapi hashes this automatically
          confirmed: false,
          provider: "local",
        });

      // ✅ Remove password before sending
      const { password: _password, ...safeUser } = newUser;

      return ctx.created({
        message: "User registered successfully",
        user: safeUser,
      });
    } catch (error) {
      console.error("User registration error:", error);
      return ctx.internalServerError("User registration failed");
    }
  },
};
