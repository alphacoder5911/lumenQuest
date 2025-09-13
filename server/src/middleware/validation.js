const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const validateRegistration = (req, res, next) => {
  const { name, email, password, phone, role } = req.body;
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  // Email validation
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    errors.push("Valid email address is required");
  }

  // Password validation
  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  // Phone validation (optional)
  if (phone && !phoneRegex.test(phone)) {
    errors.push("Phone number format is invalid");
  }

  // Role validation
  if (role && !['USER', 'ADMIN'].includes(role)) {
    errors.push("Role must be either USER or ADMIN");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  // Sanitize data
  req.body.name = name.trim();
  req.body.email = email.toLowerCase().trim();
  if (phone) req.body.phone = phone.trim();

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Email validation
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    errors.push("Valid email address is required");
  }

  // Password validation
  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  // Sanitize email
  req.body.email = email.toLowerCase().trim();

  next();
};

export const validatePasswordReset = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    errors.push("Valid email address is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  req.body.email = email.toLowerCase().trim();
  next();
};