import { MongoClient } from "mongodb";

export default async (req, res) => {
    if (req.method === 'POST') {
        const { task } = req.body;

        const client = await MongoClient.connect('mongodb+srv://harshit:Harshit123@cluster0.k6gpe.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')
        const db = client.db()

        // Insert new task into the 'tasks' collection
        const result = await db.collection('tasks').insertOne({
            task,
            completed: false,
        });
        client.close();

        return res.status(201).json({ success: true, task: result.ops[0] });
    }
    return res.status(405).json({ error: 'Method Not Allowed' });
};
