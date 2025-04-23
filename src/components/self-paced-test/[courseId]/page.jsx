'use client'
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCourse } from "@context/CourseContext";
import { course } from "@api/course/test/course";

export default function CourseHeadPage(){

    const router = useRouter();
    const { updateCourseNavigation, firstLessonId, firstChapterId } = useCourse();
    const { courseId} = useParams();

    const handleCourseClick = () => {
        const selectedCourse = course.find(c => c.id === courseId);

        if (selectedCourse && selectedCourse.lesson.length > 0) {
            const lessonId = selectedCourse.lesson[0].id;
            const chapterId = selectedCourse.lesson[0].chapter[0]?.id;

            if (chapterId) {
                // Update the context with the new navigation state
                updateCourseNavigation(lessonId, chapterId);

                // Navigate to the new URL using the updated state
                router.push(`/courses/self-paced-test/${courseId}/${lessonId}/${chapterId}`);
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
            router.push(`/courses/self-paced-test/${courseId}/${firstLessonId}/${firstChapterId}`);
        }
    }, [firstLessonId, firstChapterId, router]);

    return(
        <div style={{padding:"120px"}}>
            <button onClick={handleCourseClick}>start</button>
        </div>
    )
}