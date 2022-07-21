import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invaild input" });
      return;
    }
    const newMessage = {
      name,
      email,
      message,
    };
    let client;
    const connectingString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mmhxu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    console.log(process.env.mongodb_username);
    try {
      client = await MongoClient.connect(connectingString);
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Could not connect to database" });
      return;
    }
    const db = client.db();
    let result;
    try {
      result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Could not insert message to database" });
      return;
    }
    client.close();
    res.status(201).json(newMessage);
  }
}

export default handler;
