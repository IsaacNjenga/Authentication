const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const test = (req, res) => {
  res.json("test is working");
};

//register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Check if name is entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    //check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    //create user in db
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log("error", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No user found" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Incorrect password!" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Set token expiration
    );

    res
      .cookie("token", token, { httpOnly: true })
      .json({ success: "Login successful" }); // Ensure the token is stored as a cookie
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/*//Login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!User) {
      return res.json({ error: "No user found" });
    }

    //check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
      res.json("password match");
    } else if (!match) {
      return res.json({ error: "Password is incorrect!" });
    }
  } catch (error) {
    console.log(error);
  }
};*/

//getting the user profile
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token found" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(500).json({ error: "Failed to verify JWT token" });
    }
    res.json(user);
  });
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};

/*
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        console.error("JWT verification error:", err); // Debugging
        res.json(null); // Or appropriate error response
      } else {
        res.json(user); // Return user details
      }
    });
  } else {
    res.json(null); // No token found
  }
};
*/
