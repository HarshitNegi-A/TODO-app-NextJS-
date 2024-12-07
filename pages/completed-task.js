import CompletedTask from "../components/CompletedTask";

import { MongoClient } from "mongodb"

function Task(props){
    return <CompletedTask props={props.initialCompletedTasks}/>
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://harshit:Harshit123@cluster0.k6gpe.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')

        const db = client.db()

    // Fetch completed tasks from the 'completedTasks' collection in MongoDB
    const completedTasks = await db.collection('completedTasks').find({ completed: true }).toArray();

    // Transform MongoDB ObjectId to string for serialization
    const serializedCompletedTasks = completedTasks.map(task => ({
        ...task,
        _id: task._id.toString(),
    }));
    client.close();

    return {
        props: {
            initialCompletedTasks: serializedCompletedTasks || [],
        },
        revalidate:10
    };
};
export default Task;