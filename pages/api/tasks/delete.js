import { MongoClient, ObjectId } from "mongodb";

export default async (req, res) => {
    if (req.method === 'DELETE') {
        const { taskId } = req.body;

        const client = await MongoClient.connect('mongodb+srv://harshit:Harshit123@cluster0.k6gpe.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')

        const db = client.db()

        // Delete the task by its ID
        const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) });

        if (result.deletedCount === 1) {
            return res.status(200).json({ success: true });
        }
        client.close();
        return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
};
