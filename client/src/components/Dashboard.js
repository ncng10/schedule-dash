import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard';
import './StudentDashboard.scss'
import StudentNavbar from './StudentNavbar';
import StudentTopBar from './StudentTopBar';
import StudentEnroll from './StudentEnroll';
import { Link } from 'react-router-dom'

function Dashboard({ setAuth }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [courses, setCourses] = useState([]);
    const [navBarActive, setNavBarActive] = useState(true);

    async function getCourses() {
        try {
            const response = await fetch("/dashboard/enrolled-courses",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseResCourse = await response.json();
            setCourses(parseResCourse);
            console.log(parseResCourse);
        } catch (err) {
            console.log(err.message)
        }
    }

    async function getName() {
        try {
            const response = await fetch("/dashboard",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });
            const parseRes = await response.json();
            setName(parseRes.user_name)
            setRole(parseRes.user_role);
            console.log(parseRes.user_name)
        } catch (err) {
            console.log(err.message)
        }
    }
    function removeToken() {
        localStorage.removeItem('token')
    }

    useEffect(() => {
        getName()
    }, []);

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <div className="dashboardBody">
            <div className="topMenu">
                <center><div>
                    <StudentTopBar setAuth={setAuth} removeToken={removeToken} name={name} role={role} /></div></center>
            </div >

            <div className="sideBarMenuStudent">
                {navBarActive ?
                    <div> <StudentNavbar /></div> : null}
            </div>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: 'center'
            }} className="courseCardsContainer">
                {courses.map((course) => (
                    <Link style={{ textDecoration: 'none', color: "black" }} to={`/course/${course.course_id}`}>
                        <CourseCard course_id={course.course_id} courseName={course.course_name} courseInstructor={course.course_instructor} /></Link>
                ))}
            </div>
        </div>
    )
}
export default Dashboard
