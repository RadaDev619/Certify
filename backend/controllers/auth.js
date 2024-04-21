import User from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const showMessage = (req, res) => {
  res.status(200).send(req.params.message);
};

export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, photo, password } = req.body;
  if (!name) return res.status(400).send("Name is required");

  //password length validation for debugging
  if (!password || password.length < 6)
    return res.status(400).send("Password should be a minimum of 6 characters");
    try {
      // // Check if the user with the same email already exists
      const userExist = await User.findOne({ email } );
      // console.log("Email gotten", email)
      // console.log("User Exist", userExist);
      if (userExist) return res.status(400).json({ error: "Email is taken" });
  
      // Hash the password before saving the user
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new user instance
      const newUser = await User.create({ name, email, photo, password });
  
      // Save the user to the database
      // await newUser.save(); // Not needed, as User.create() already saves the instance
      console.log("USER CREATED", newUser);
      return res.json({ ok: true });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email }).select('+password');

    //console.log("User Exist", user)
    // If the user doesn't exist, respond with an error
    if (!user) {
      return res.status(400).send("User not found");
    }
  
    // Compare the input password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log(isPasswordMatch)
    
    if (!isPasswordMatch) {
      console.log("Wrong password");
      return res.status(400).send("Wrong password");
    }
    // Generate a token and send it as a response to the client
    //console.log('JWT_SECRET:', process.env.JWT_SECRET);
    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });  
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          
        });
      } catch (err) {
        console.error("Login error", err);
        res.status(500).send("Internal server error");
      }
    };

    export const getUser = async (req, res) => {
      try {
        const user = await User.findOne({ where: { id: req.params.id } });
        return res.json(user);
      } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }
    };
