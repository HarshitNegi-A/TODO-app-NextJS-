import { MongoClient, ObjectId } from "mongodb";

export default async (req, res) => {
    if (req.method === 'POST') {
        const { taskId } = req.body;

        const client = await MongoClient.connect('mongodb+srv://harshit:Harshit123@cluster0.k6gpe.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')

        const db = client.db()

        // Find the task in the 'tasks' collection
        const task = await db.collection('tasks').findOne({ _id: new ObjectId(taskId) });

        if (task) {
            // Move the task to the 'completedTasks' collection
            await db.collection('completedTasks').insertOne(task);

            // Delete the task from the 'tasks' collection
            await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) });

            return res.status(200).json({ success: true });
        }
        client.close();
        return res.status(404).json({ error: 'Task not found' });

    }

    return res.status(405).json({ error: 'Method Not Allowed' });
};
