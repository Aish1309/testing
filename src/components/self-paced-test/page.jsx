'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useCourse } from "@context/CourseContext";

export default function CourseListPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();
    const { updateCourseNavigation, firstLessonId, firstChapterId } = useCourse();

    useEffect(() => {
        // Fetch course data from the provided URL
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://mocki.io/v1/0d74fc89-2ff4-42ef-b66e-57d1a76d1a17');

                // Check if the response is ok
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                // Log the response text before trying to parse it
                const responseText = await response.text();
                // console.log('Raw response text:', responseText);

                // Attempt to parse the response as JSON
                const data = JSON.parse(responseText);
                // console.log('Parsed data:', data); // Log parsed data
                setCourses(data); // Update state with fetched data

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error); // Log errors
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        const selectedCourse = courses.find(c => c.id === courseId);

        if (selectedCourse && selectedCourse.lesson.length > 0) {
            const lessonId = selectedCourse.lesson[0].id;
            const chapterId = selectedCourse.lesson[0].chapter[0]?.id;

            if (chapterId) {
                // Update the context with the new navigation state
                updateCourseNavigation(lessonId, chapterId);

                // Navigate to the new URL using the updated state
                router.push(`/courses/self-paced-test/${courseId}`);
            } else {
                console.error("No chapters found for the first lesson.");
            }
        } else {
            console.error("No lessons found for the selected course.");
        }
    };

    useEffect(() => {
        // Ensure that courseId is available and not undefined
        const courseId = new URLSearchParams(window.location.search).get('courseId');
        if (courseId && firstLessonId && firstChapterId) {
            // Automatically redirect to the first lesson and chapter on page load if courseId is present
            router.push(`/courses/self-paced-test/${courseId}`);
        }
    }, [firstLessonId, firstChapterId, router]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: "120px" }}>
            <h2>Select a Course</h2>
            <ul>
                {courses.map((item, index) => (
                    <li
                        key={index}
                        style={{ cursor: "pointer", padding: "10px", borderBottom: "1px solid #ccc" }}
                        onClick={() => handleCourseClick(item.id)}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
