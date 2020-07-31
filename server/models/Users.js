const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

let Schema = mongoose.Schema;

let validRoles = {
  values: ["ADMIN", "USER"],
  message: "{VALUE} no es un rol válido",
};

let usersSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    last_name: {
      type: String,
      required: [true, "El apellido es requerido"],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "EMAIL_IS_NOT_VALID",
      },
      lowercase: true,
      unique: true,
      required: [true, "El correo es necesario!"],
    },
    img: String,
    role: {
      type: String,
      default: "USER",
      enum: validRoles,
    },
    verification: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    blockExpires: {
      type: Date,
      default: Date.now,
      select: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, (error, newHash) => {
    if (error) {
      return next(error);
    }
    user.password = newHash;
    return next();
  });
};

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    return hash(user, salt, next);
  });
};

usersSchema.pre("save", function (next) {
  const that = this;
  const SALT_FACTOR = 5;
  if (!that.isModified("password")) {
    return next();
  }
  return genSalt(that, SALT_FACTOR, next);
});

usersSchema.methods.comparePassword = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  );
};

module.exports = mongoose.model("Users", usersSchema);
