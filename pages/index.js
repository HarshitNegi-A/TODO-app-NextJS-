import HomePage from "../components/HomePage";
import { useRouter } from "next/router"

import { MongoClient } from "mongodb"

function Home(props){
    const router=useRouter();
    async function addTODO(task){
        if (task.trim() !== '') {
            const res = await fetch('/api/tasks/add', {
                method: 'POST',
                body: JSON.stringify({task:task}),
                headers: {
                    'Content-type': 'application/json',
                },
                
            });
            const data = await res.json();
            router.push('/')
            
        }
    }
    async function completeTODO(taskId) {
        const res = await fetch("/api/tasks/complete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId }),
          });
          const data = await res.json();
    }

    async function deleteTODO(taskId) {
        const res = await fetch("/api/tasks/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId }),
          });
          const data = await res.json();
    }
    return <HomePage initialTasks={props.initialTasks} onAdd={addTODO} onComplete={completeTODO} onDelete={deleteTODO}/>
}
export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://harshit:Harshit123@cluster0.k6gpe.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0')

        const db = client.db()

    // Fetch tasks from the 'tasks' collection in MongoDB
    const tasks = await db.collection('tasks').find().toArray();

    // Transform MongoDB ObjectId to string for serialization
    const serializedTasks = tasks.map(task => ({
        ...task,
        _id: task._id.toString(),
    }));
    client.close();
    return {
        props: {
            initialTasks: serializedTasks || [],
        },
        revalidate:10
    };
};

export default Home;