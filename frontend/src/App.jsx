
import { useEffect, useState } from "react";

function App() {

    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");

    const getStudents = async () => {
        const response = await fetch("http://localhost:5500/students");
        const data = await response.json();
        setStudents(data);
    };

    const addStudent = async () => {
        await fetch("http://localhost:5500/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, course })
        });

        setName("");
        setCourse("");
        getStudents();
    };

    const deleteStudent = async (id) => {
        await fetch(`http://localhost:5500/students/${id}`, {
            method: "DELETE"
        });

        getStudents();
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div>
            <h1>Student Details Application</h1>

            <input
                placeholder="Student Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                placeholder="Course"
                value={course}
                onChange={e => setCourse(e.target.value)}
            />

            <button onClick={addStudent}>Add Student</button>

            <h2>Student List</h2>

            {students.map(student => (
                <p key={student.id}>
                    {student.name} - {student.course}

                    <button onClick={() => deleteStudent(student.id)}>
                        Delete
                    </button>
                </p>
            ))}
        </div>
    );
}

export default App;
