import User from "../Models/User.js";
import argon2 from "argon2";

export default class UserController {
  static async CreateUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required." });
    }
    try {
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async GetAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async GetUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async UpdateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async DeleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async LoginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      const isMatch = await argon2.verify(user.password, password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password." });
      }

      const tokenPayload = { id: user._id, email: user.email };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        // Impede que o cookie seja acessado diretamente pelo JavaScript do navegador.
        // Requisições HTTP e HTTPS ainda podem enviar o cookie, mas ele não estará acessível via document.cookie.
        httpOnly: true,
        
        // Quando true, o navegador só envia este cookie através de HTTPS.
        // Em desenvolvimento local geralmente usamos false porque usamos http://localhost.
        secure: false, // Set to true in production
 
        // Controla quando o navegador pode enviar o cookie em requisições
        // iniciadas a partir de outros sites.
        // "lax" bloqueia vários envios cross-site, mas permite alguns casos
        // considerados navegação normal. Ajuda a reduzir ataques CSRF.
        sameSite: "lax",
        
        // Define por quanto tempo o cookie permanece válido no navegador.
        maxAge: 3600000, // 1 hour
      });

      return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
