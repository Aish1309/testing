// 'use client';

// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { UserAuth } from "@context/AuthContext";
// import { course } from "@api/course/test/course";
// import { useCourse } from "@context/CourseContext";

// export default function TestSelf(params) {
//     const router = useRouter();
//     const { courseId, lessonId} = useParams(); // Extract courseId and lessonId from route parameters
//     const { user, loading } = UserAuth();
//     const { firstLessonId, firstChapterId, updateCourseNavigation } = useCourse();
//     const [fLessonId, setFlessonId] = useState(lessonId || null);
//     const [fChapterId, setFchapterId] = useState(null);
//     const [accOpen, setAccOpen] = useState(true);

//     useEffect(() => {
//         if (!loading && !user) {
//             router.push('/login'); // Redirect to login if not authenticated
//         }
//     }, [user, loading, router]);

//     useEffect(() => {
//         // Set initial sub-accordion to the first chapter of the initially selected accordion
//         const courseData = course.find(c => c.id === courseId);
//         const lessonData = courseData?.lesson.find(l => l.id === lessonId);
//         const initialChapterId = lessonData?.chapter[0]?.id || null;
//         setFchapterId(initialChapterId);
//     }, [courseId, lessonId]);

//     const handleAccordionClick = (id) => {
//         if (fLessonId === id) {
//             setAccOpen(!accOpen); // Toggle the accordion if it's already open
//         } else {
//             const courseData = course.find(c => c.id === courseId);
    
//             if (!courseData || !courseData.lesson) {
//                 console.error("No lessons found for the selected course.");
//                 return;
//             }
    
//             const selectedLesson = courseData.lesson.find(item => item.id === id);
    
//             if (!selectedLesson || !selectedLesson.chapter || selectedLesson.chapter.length === 0) {
//                 console.error("No chapters found for the selected lesson.");
//                 return;
//             }
    
//             const newChapterId = selectedLesson.chapter[0].id || null;
//             setFlessonId(id);
//             setFchapterId(newChapterId); // Set sub-accordion to the first chapter of the new accordion
//             setAccOpen(true); // Open the new accordion
//             updateCourseNavigation(id, newChapterId);
    
//             // Navigate to the new URL
//             if (newChapterId) {
//                 router.push(`/courses/self-paced-test/${courseId}/${id}/${newChapterId}`);
//             }
//         }
//     };
    
//     const handleSubAccordionClick = (id, event) => {
//         event.stopPropagation(); // Prevent the main accordion click event from firing
//         setFchapterId(id);
//         updateCourseNavigation(fLessonId, id);

//         // Navigate to the new sub-accordion chapter
//         router.push(`/courses/self-paced-test/${courseId}/${fLessonId}/${id}`);
//     };

//     const handleNextChapterClick = () => {
//         const courseData = course.find(c => c.id === courseId);
//         const currentAccordionIndex = courseData?.lesson.findIndex(item => item.id === fLessonId);
//         const currentAccordion = courseData?.lesson[currentAccordionIndex];
//         const currentChapterIndex = currentAccordion?.chapter.findIndex(subItem => subItem.id === fChapterId);
//         const nextChapterIndex = currentChapterIndex + 1;

//         if (nextChapterIndex < currentAccordion.chapter.length) {
//             const nextChapterId = currentAccordion.chapter[nextChapterIndex].id;
//             setFchapterId(nextChapterId);
//             updateCourseNavigation(fLessonId, nextChapterId);

//             // Navigate to the new chapter within the same accordion
//             router.push(`/courses/self-paced-test/${courseId}/${fLessonId}/${nextChapterId}`);
//         } else {
//             const nextAccordionIndex = currentAccordionIndex + 1;
//             if (nextAccordionIndex < courseData.lesson.length) {
//                 const nextfLessonId = courseData.lesson[nextAccordionIndex].id;
//                 const nextChapterId = courseData.lesson[nextAccordionIndex]?.chapter[0]?.id || null;
//                 setFlessonId(nextfLessonId);
//                 setFchapterId(nextChapterId);
//                 setAccOpen(true);
//                 updateCourseNavigation(nextfLessonId, nextChapterId);

//                 // Navigate to the next accordion's first chapter
//                 if (nextChapterId) {
//                     router.push(`/courses/self-paced-test/${courseId}/${nextfLessonId}/${nextChapterId}`);
//                 }
//             }
//         }
//     };

//     // Find the currently selected content for the main accordion
//     const courseData = course.find(c => c.id === courseId);
//     const selectedAccordionContent = courseData?.lesson.find(item => item.id === fLessonId);
//     // Find the currently selected content for the sub-accordion
//     const selectedChapter = selectedAccordionContent?.chapter.find(subItem => subItem.id === fChapterId);

//     // Determine if there is a next chapter
//     const currentAccordionIndex = courseData?.lesson.findIndex(item => item.id === fLessonId);
//     const currentAccordion = courseData?.lesson[currentAccordionIndex];
//     const currentChapterIndex = currentAccordion?.chapter.findIndex(subItem => subItem.id === fChapterId);
//     const hasNextChapter = (currentChapterIndex + 1 < currentAccordion?.chapter.length) ||
//         (currentAccordionIndex + 1 < courseData?.lesson.length);

//     return (
//         <div style={{ padding: "60px" }}>
//             <h1>{courseData?.title}</h1>
//             <div style={{ display: "flex", gap: "4rem" }}>
//                 <div className="main-content" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//                     {selectedAccordionContent ? (
//                         <>
//                             <h4>{selectedAccordionContent.title}</h4>
//                             <p>{selectedAccordionContent.subTitle}</p>
//                             {/* Display sub-accordion content if available */}
//                             {selectedChapter && (
//                                 <>
//                                     <h5>{selectedChapter.title}</h5>
//                                     <p>{selectedChapter.subTitle}</p>
//                                 </>
//                             )}
//                         </>
//                     ) : (
//                         <p>No content available</p>
//                     )}
//                     {hasNextChapter && (
//                         <button onClick={handleNextChapterClick}>Next Chapter</button>
//                     )}
//                 </div>

//                 <div className="accordion-container" style={{ width: "40%", display: "flex", flexDirection: "column" }}>
//                     {courseData?.lesson.map((item, index) => (
//                         <div
//                             key={index}
//                             className="accordion-box"
//                             style={{ padding: "16px", border: "1px solid", cursor: "pointer" }}
//                             onClick={() => handleAccordionClick(item.id)}
//                         >
//                             <p>{item.title}</p>
//                             {fLessonId === item.id && accOpen && item.chapter && (
//                                 item.chapter.map((subItem, subIndex) => (
//                                     <div
//                                         key={subIndex}
//                                         style={{
//                                             padding: "8px",
//                                             cursor: "pointer",
//                                             border: "1px solid #ddd",
//                                             backgroundColor: subItem.id === fChapterId ? '#f0f0f0' : 'white'
//                                         }}
//                                         onClick={(e) => handleSubAccordionClick(subItem.id, e)}
//                                     >
//                                         <p>{subItem.title}</p>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }




// 'use client';

// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { UserAuth } from "@context/AuthContext";
// import { course } from "@api/course/test/course";
// import { useCourse } from "@context/CourseContext";

// export default function TestSelf(params) {
//     const router = useRouter();
//     const { courseId, lessonId, chapterId } = useParams(); // Extract courseId, lessonId, and chapterId from route parameters
//     const { user, loading } = UserAuth();
//     const { firstLessonId, firstChapterId, updateCourseNavigation } = useCourse();
//     const [fLessonId, setFlessonId] = useState(null);
//     const [fChapterId, setFchapterId] = useState(null);
//     const [accOpen, setAccOpen] = useState(true);

//     useEffect(() => {
//         if (!loading && !user) {
//             router.push('/login'); // Redirect to login if not authenticated
//         }
//     }, [user, loading, router]);

//     useEffect(() => {
//         // Synchronize the state with the URL parameters
//         if (lessonId) {
//             setFlessonId(lessonId);
//         }
//         if (chapterId) {
//             setFchapterId(chapterId);
//         }
//     }, [lessonId, chapterId]);

//     useEffect(() => {
//         if (!chapterId) {
//             // Set the first chapter as default if no chapterId is provided
//             const courseData = course.find(c => c.id === courseId);
//             const lessonData = courseData?.lesson.find(l => l.id === lessonId);
//             const initialChapterId = lessonData?.chapter[0]?.id || null;
//             setFchapterId(initialChapterId);
//         }
//     }, [courseId, lessonId]);

//     const handleAccordionClick = (id) => {
//         const courseData = course.find(c => c.id === courseId);
//         const selectedLesson = courseData?.lesson.find(item => item.id === id);

//         if (!selectedLesson || !selectedLesson.chapter || selectedLesson.chapter.length === 0) {
//             console.error("No chapters found for the selected lesson.");
//             return;
//         }

//         const newChapterId = selectedLesson.chapter[0].id || null;
//         setFlessonId(id);
//         setFchapterId(newChapterId);
//         setAccOpen(true);
//         updateCourseNavigation(id, newChapterId);

//         // Navigate to the new URL
//         if (newChapterId) {
//             router.push(`/courses/self-paced-test/${courseId}/${id}/${newChapterId}`);
//         }
//     };

//     const handleSubAccordionClick = (id, event) => {
//         event.stopPropagation();
//         setFchapterId(id);
//         updateCourseNavigation(fLessonId, id);

//         // Navigate to the new sub-accordion chapter
//         router.push(`/courses/self-paced-test/${courseId}/${fLessonId}/${id}`);
//     };

//     const handleNextChapterClick = () => {
//         const courseData = course.find(c => c.id === courseId);
//         const currentAccordionIndex = courseData?.lesson.findIndex(item => item.id === fLessonId);
//         const currentAccordion = courseData?.lesson[currentAccordionIndex];
//         const currentChapterIndex = currentAccordion?.chapter.findIndex(subItem => subItem.id === fChapterId);
//         const nextChapterIndex = currentChapterIndex + 1;

//         if (nextChapterIndex < currentAccordion.chapter.length) {
//             const nextChapterId = currentAccordion.chapter[nextChapterIndex].id;
//             setFchapterId(nextChapterId);
//             updateCourseNavigation(fLessonId, nextChapterId);

//             // Navigate to the new chapter within the same accordion
//             router.push(`/courses/self-paced-test/${courseId}/${fLessonId}/${nextChapterId}`);
//         } else {
//             const nextAccordionIndex = currentAccordionIndex + 1;
//             if (nextAccordionIndex < courseData.lesson.length) {
//                 const nextfLessonId = courseData.lesson[nextAccordionIndex].id;
//                 const nextChapterId = courseData.lesson[nextAccordionIndex]?.chapter[0]?.id || null;
//                 setFlessonId(nextfLessonId);
//                 setFchapterId(nextChapterId);
//                 setAccOpen(true);
//                 updateCourseNavigation(nextfLessonId, nextChapterId);

//                 // Navigate to the next accordion's first chapter
//                 if (nextChapterId) {
//                     router.push(`/courses/self-paced-test/${courseId}/${nextfLessonId}/${nextChapterId}`);
//                 }
//             }
//         }
//     };

//     // Debugging: Log the current state
//     console.log("fLessonId:", fLessonId);
//     console.log("fChapterId:", fChapterId);

//     // Find the currently selected content for the main accordion
//     const courseData = course.find(c => c.id === courseId);
//     const selectedAccordionContent = courseData?.lesson.find(item => item.id === fLessonId);
//     // Find the currently selected content for the sub-accordion
//     const selectedChapter = selectedAccordionContent?.chapter.find(subItem => subItem.id === fChapterId);

//     console.log("selectedAccordionContent:", selectedAccordionContent);
//     console.log("selectedChapter:", selectedChapter);

//     // Determine if there is a next chapter
//     const currentAccordionIndex = courseData?.lesson.findIndex(item => item.id === fLessonId);
//     const currentAccordion = courseData?.lesson[currentAccordionIndex];
//     const currentChapterIndex = currentAccordion?.chapter.findIndex(subItem => subItem.id === fChapterId);
//     const hasNextChapter = (currentChapterIndex + 1 < currentAccordion?.chapter.length) ||
//         (currentAccordionIndex + 1 < courseData?.lesson.length);

//     return (
//         <div style={{ padding: "60px" }}>
//             <h1>{courseData?.title}</h1>
//             <div style={{ display: "flex", gap: "4rem" }}>
//                 <div className="main-content" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//                     {selectedAccordionContent ? (
//                         <>
//                             <h4>{selectedAccordionContent.title}</h4>
//                             <p>{selectedAccordionContent.subTitle}</p>
//                             {/* Display sub-accordion content if available */}
//                             {selectedChapter && (
//                                 <>
//                                     <h5>{selectedChapter.title}</h5>
//                                     <p>{selectedChapter.subTitle}</p>
//                                 </>
//                             )}
//                         </>
//                     ) : (
//                         <p>No content available</p>
//                     )}
//                     {hasNextChapter && (
//                         <button onClick={handleNextChapterClick}>Next Chapter</button>
//                     )}
//                 </div>

//                 <div className="accordion-container" style={{ width: "40%", display: "flex", flexDirection: "column" }}>
//                     {courseData?.lesson.map((item, index) => (
//                         <div
//                             key={index}
//                             className="accordion-box"
//                             style={{ padding: "16px", border: "1px solid", cursor: "pointer" }}
//                             onClick={() => handleAccordionClick(item.id)}
//                         >
//                             <p>{item.title}</p>
//                             {fLessonId === item.id && accOpen && item.chapter && (
//                                 item.chapter.map((subItem, subIndex) => (
//                                     <div
//                                         key={subIndex}
//                                         style={{
//                                             padding: "8px",
//                                             cursor: "pointer",
//                                             border: "1px solid #ddd",
//                                             backgroundColor: subItem.id === fChapterId ? '#f0f0f0' : 'white'
//                                         }}
//                                         onClick={(e) => handleSubAccordionClick(subItem.id, e)}
//                                     >
//                                         <p>{subItem.title}</p>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


// 'use client';

// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { UserAuth } from "@context/AuthContext";
// import { course } from "@api/course/test/course";
// import { useCourse } from "@context/CourseContext";

// export default function TestSelf(params) {
//     const router = useRouter();
//     const { courseId, lessonId, chapterId } = useParams();
//     const { user, loading } = UserAuth();
//     const { firstLessonId, firstChapterId, updateCourseNavigation } = useCourse();
//     const [fLessonId, setFlessonId] = useState(null);
//     const [fChapterId, setFchapterId] = useState(null);
//     const [accOpen, setAccOpen] = useState(true);

//     useEffect(() => {
//         if (!loading && !user) {
//             router.push('/login');
//         }
//     }, [user, loading, router]);

//     useEffect(() => {
//         // Debugging logs for parameters
//         console.log("URL Params - courseId:", courseId);
//         console.log("URL Params - lessonId:", lessonId);
//         console.log("URL Params - chapterId:", chapterId);

//         // Synchronize the state with the URL parameters
//         if (lessonId) {
//             setFlessonId(lessonId);
//         }
//         if (chapterId) {
//             setFchapterId(chapterId);
//         }
//     }, [lessonId, chapterId]);

//     useEffect(() => {
//         if (!chapterId) {
//             // Set the first chapter as default if no chapterId is provided
//             const courseData = course.find(c => c.id === courseId);
//             const lessonData = courseData?.lesson.find(l => l.id === lessonId);
//             const initialChapterId = lessonData?.chapter[0]?.id || null;
//             setFchapterId(initialChapterId);
//         }
//     }, [courseId, lessonId]);

//     useEffect(() => {
//         const courseData = course.find(c => c.id === courseId);
//         const selectedLesson = courseData?.lesson.find(item => item.id === fLessonId);
//         const selectedChapter = selectedLesson?.chapter.find(subItem => subItem.id === fChapterId);

//         // Debugging logs for content
//         console.log("selectedAccordionContent:", selectedLesson);
//         console.log("selectedChapter:", selectedChapter);

//         if (selectedLesson) {
//             console.log("Available Chapter IDs in selectedLesson:", selectedLesson.chapter.map(chap => chap.id));
//         }
//     }, [fLessonId, fChapterId, courseId]);

//     const handleAccordionClick = (id) => {
//         const courseData = course.find(c => c.id === courseId);
//         const selectedLesson = courseData?.lesson.find(item => item.id === id);

//         if (!selectedLesson || !selectedLesson.chapter || selectedLesson.chapter.length === 0) {
//             console.error("No chapters found for the selected lesson.");
//             return;
//         }

//         const newChapterId = selectedLesson.chapter[0].id || null;
//         setFlessonId(id);
//         setFchapterId(newChapterId);
//         setAccOpen(true);
//         updateCourseNavigation(id, newChapterId);

//         // Navigate to the new URL
//         if (newChapterId) {
//             router.push(`/courses/self-paced-test/${courseId}/${id}/${newChapterId}`);
//         }
//     };

//     const handleSubAccordionClick = (id, event) => {
//         event.stopPropagation();
//         setFchapterId(id);
//         updateCourseNavigation(fLessonId, id);

//         // Navigate to the new sub-accordion chapter
//         router.push(`/courses/self-paced-test/${courseId}/${fLessonId}/${id}`);
//     };

//     const handleNextChapterClick = () => {
//         const courseData = course.find(c => c.id === courseId);
//         const currentAccordionIndex = courseData?.lesson.findIndex(item => item.id === fLessonId);
//         const currentAccordion = courseData?.lesson[currentAccordionIndex];
//         const currentChapterIndex = currentAccordion?.chapter.findIndex(subItem => subItem.id === fChapterId);
//         const nextChapterIndex = currentChapterIndex + 1;

//         if (nextChapterIndex < currentAccordion.chapter.length) {
//             const nextChapterId = currentAccordion.chapter[nextChapterIndex].id;
//             setFchapterId(nextChapterId);
//             updateCourseNavigation(fLessonId, nextChapterId);

//             // Navigate to the new chapter within the same accordion
//             router.push(`/courses/self-paced-test/${courseId}/${fLessonId}/${nextChapterId}`);
//         } else {
//             const nextAccordionIndex = currentAccordionIndex + 1;
//             if (nextAccordionIndex < courseData.lesson.length) {
//                 const nextfLessonId = courseData.lesson[nextAccordionIndex].id;
//                 const nextChapterId = courseData.lesson[nextAccordionIndex]?.chapter[0]?.id || null;
//                 setFlessonId(nextfLessonId);
//                 setFchapterId(nextChapterId);
//                 setAccOpen(true);
//                 updateCourseNavigation(nextfLessonId, nextChapterId);

//                 // Navigate to the next accordion's first chapter
//                 if (nextChapterId) {
//                     router.push(`/courses/self-paced-test/${courseId}/${nextfLessonId}/${nextChapterId}`);
//                 }
//             }
//         }
//     };

//     // Debugging: Log the current state
//     console.log("fLessonId:", fLessonId);
//     console.log("fChapterId:", fChapterId);

//     // Find the currently selected content for the main accordion
//     const courseData = course.find(c => c.id === courseId);
//     const selectedAccordionContent = courseData?.lesson.find(item => item.id === fLessonId);
//     // Find the currently selected content for the sub-accordion
//     const selectedChapter = selectedAccordionContent?.chapter.find(subItem => subItem.id === fChapterId);

//     console.log("selectedAccordionContent:", selectedAccordionContent);
//     console.log("selectedChapter:", selectedChapter);

//     // Determine if there is a next chapter
//     const currentAccordionIndex = courseData?.lesson.findIndex(item => item.id === fLessonId);
//     const currentAccordion = courseData?.lesson[currentAccordionIndex];
//     const currentChapterIndex = currentAccordion?.chapter.findIndex(subItem => subItem.id === fChapterId);
//     const hasNextChapter = (currentChapterIndex + 1 < currentAccordion?.chapter.length) ||
//         (currentAccordionIndex + 1 < courseData.lesson.length);

//     return (
//         <div style={{ padding: "60px" }}>
//             <h1>{courseData?.title}</h1>
//             <div style={{ display: "flex", gap: "4rem" }}>
//                 <div className="main-content" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//                     {selectedAccordionContent ? (
//                         <>
//                             <h4>{selectedAccordionContent.title}</h4>
//                             <p>{selectedAccordionContent.subTitle}</p>
//                             {/* Display sub-accordion content if available */}
//                             {selectedChapter && (
//                                 <>
//                                     <h5>{selectedChapter.title}</h5>
//                                     <p>{selectedChapter.subTitle}</p>
//                                 </>
//                             )}
//                         </>
//                     ) : (
//                         <p>No content available</p>
//                     )}
//                     {hasNextChapter && (
//                         <button onClick={handleNextChapterClick}>Next Chapter</button>
//                     )}
//                 </div>

//                 <div className="accordion-container" style={{ width: "40%", display: "flex", flexDirection: "column" }}>
//                     {courseData?.lesson.map((item, index) => (
//                         <div
//                             key={index}
//                             className="accordion-box"
//                             style={{ padding: "16px", border: "1px solid", cursor: "pointer" }}
//                             onClick={() => handleAccordionClick(item.id)}
//                         >
//                             <p>{item.title}</p>
//                             {fLessonId === item.id && accOpen && item.chapter && (
//                                 item.chapter.map((subItem, subIndex) => (
//                                     <div
//                                         key={subIndex}
//                                         style={{
//                                             padding: "8px",
//                                             cursor: "pointer",
//                                             border: "1px solid #ddd",
//                                             backgroundColor: subItem.id === fChapterId ? '#f0f0f0' : 'white'
//                                         }}
//                                         onClick={(e) => handleSubAccordionClick(subItem.id, e)}
//                                     >
//                                         <p>{subItem.title}</p>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { UserAuth } from "@context/AuthContext";
import { course } from "@api/course/test/course";
import { useCourse } from "@context/CourseContext";

export default function TestSelf() {
    const router = useRouter();
    const { courseId, lessonId, chapterId } = useParams();
    const { user, loading } = UserAuth();
    const { updateCourseNavigation } = useCourse();
    const [fLessonId, setFlessonId] = useState(null);
    const [fChapterId, setFchapterId] = useState(null);
    const [accOpen, setAccOpen] = useState({}); // Use an object to keep track of open states for each lesson

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        // Debugging logs for parameters
        console.log("URL Params - courseId:", courseId);
        console.log("URL Params - lessonId:", lessonId);
        console.log("URL Params - chapterId:", chapterId);

        // Synchronize the state with the URL parameters
        if (lessonId) {
            setFlessonId(lessonId);
            setAccOpen(prev => ({ ...prev, [lessonId]: true }));
        }
        if (chapterId) {
            setFchapterId(chapterId);
        }
    }, [lessonId, chapterId]);

    useEffect(() => {
        if (!chapterId && lessonId) {
            const courseData = course.find(c => c.id === courseId);
            const lessonData = courseData?.lesson.find(l => l.id === lessonId);
            const initialChapterId = lessonData?.chapter[0]?.id || null;
            setFchapterId(initialChapterId);
        }
    }, [courseId, lessonId]);

    useEffect(() => {
        const courseData = course.find(c => c.id === courseId);
        const selectedLesson = courseData?.lesson.find(item => item.id === fLessonId);
        const selectedChapter = selectedLesson?.chapter.find(subItem => subItem.id === fChapterId);

        // Debugging logs for content
        console.log("selectedAccordionContent:", selectedLesson);
        console.log("selectedChapter:", selectedChapter);

        if (selectedLesson) {
            console.log("Available Chapter IDs in selectedLesson:", selectedLesson.chapter.map(chap => chap.id));
        }
    }, [fLessonId, fChapterId, courseId]);

    const handleAccordionClick = (id) => {
        const courseData = course.find(c => c.id === courseId);
        const selectedLesson = courseData?.lesson.find(item => item.id === id);

        if (!selectedLesson || !selectedLesson.chapter || selectedLesson.chapter.length === 0) {
            console.error("No chapters found for the selected lesson.");
            return;
        }

        const newChapterId = selectedLesson.chapter[0].id || null;
        setFlessonId(id);
        setFchapterId(newChapterId);
        setAccOpen(prev => ({ ...prev, [id]: true }));
        updateCourseNavigation(id, newChapterId);

        // Navigate to the new URL
        if (newChapterId) {
            router.push(`/courses/self-paced-test/${courseId}/${id}/${newChapterId}`);
        }
    };

    const handleSubAccordionClick = (id, event) => {
        event.stopPropagation();
        setFchapterId(id);
        updateCourseNavigation(fLessonId, id);

        // Navigate to the new sub-accordion chapter
        router.push(`/courses/self-paced-test/${courseId}/${fLessonId}/${id}`);
    };

    const handleNextChapterClick = () => {
        const courseData = course.find(c => c.id === courseId);
        const currentAccordionIndex = courseData?.lesson.findIndex(item => item.id === fLessonId);
        const currentAccordion = courseData?.lesson[currentAccordionIndex];
        const currentChapterIndex = currentAccordion?.chapter.findIndex(subItem => subItem.id === fChapterId);
        const nextChapterIndex = currentChapterIndex + 1;

        if (nextChapterIndex < currentAccordion.chapter.length) {
            const nextChapterId = currentAccordion.chapter[nextChapterIndex].id;
            setFchapterId(nextChapterId);
            updateCourseNavigation(fLessonId, nextChapterId);

            // Navigate to the new chapter within the same accordion
            router.push(`/courses/self-paced-test/${courseId}/${fLessonId}/${nextChapterId}`);
        } else {
            const nextAccordionIndex = currentAccordionIndex + 1;
            if (nextAccordionIndex < courseData.lesson.length) {
                const nextfLessonId = courseData.lesson[nextAccordionIndex].id;
                const nextChapterId = courseData.lesson[nextAccordionIndex]?.chapter[0]?.id || null;
                setFlessonId(nextfLessonId);
                setFchapterId(nextChapterId);
                setAccOpen(prev => ({ ...prev, [nextfLessonId]: true }));
                updateCourseNavigation(nextfLessonId, nextChapterId);

                // Navigate to the next accordion's first chapter
                if (nextChapterId) {
                    router.push(`/courses/self-paced-test/${courseId}/${nextfLessonId}/${nextChapterId}`);
                }
            }
        }
    };

    // Debugging: Log the current state
    console.log("fLessonId:", fLessonId);
    console.log("fChapterId:", fChapterId);

    // Find the currently selected content for the main accordion
    const courseData = course.find(c => c.id === courseId);
    const selectedAccordionContent = courseData?.lesson.find(item => item.id === fLessonId);
    // Find the currently selected content for the sub-accordion
    const selectedChapter = selectedAccordionContent?.chapter.find(subItem => subItem.id === fChapterId);

    console.log("selectedAccordionContent:", selectedAccordionContent);
    console.log("selectedChapter:", selectedChapter);

    // Determine if there is a next chapter
    const currentAccordionIndex = courseData?.lesson.findIndex(item => item.id === fLessonId);
    const currentAccordion = courseData?.lesson[currentAccordionIndex];
    const currentChapterIndex = currentAccordion?.chapter.findIndex(subItem => subItem.id === fChapterId);
    const hasNextChapter = (currentChapterIndex + 1 < currentAccordion?.chapter.length) ||
        (currentAccordionIndex + 1 < courseData.lesson.length);

    return (
        <div style={{ padding: "60px" }}>
            <h1>{courseData?.title}</h1>
            <div style={{ display: "flex", gap: "4rem" }}>
                <div className="main-content" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {selectedAccordionContent ? (
                        <>
                            <h4>{selectedAccordionContent.title}</h4>
                            <p>{selectedAccordionContent.subTitle}</p>
                            {/* Display sub-accordion content if available */}
                            {selectedChapter && (
                                <>
                                    <h5>{selectedChapter.title}</h5>
                                    <p>{selectedChapter.subTitle}</p>
                                </>
                            )}
                        </>
                    ) : (
                        <p>No content available</p>
                    )}
                    {hasNextChapter && (
                        <button onClick={handleNextChapterClick}>Next Chapter</button>
                    )}
                </div>

                <div className="accordion-container" style={{ width: "40%", display: "flex", flexDirection: "column" }}>
                    {courseData?.lesson.map((item, index) => (
                        <div
                            key={index}
                            className="accordion-box"
                            style={{ padding: "16px", border: "1px solid", cursor: "pointer" }}
                            onClick={() => handleAccordionClick(item.id)}
                        >
                            <p>{item.title}</p>
                            {accOpen[item.id] && item.chapter && (
                                item.chapter.map((subItem, subIndex) => (
                                    <div
                                        key={subIndex}
                                        style={{
                                            padding: "8px",
                                            cursor: "pointer",
                                            border: "1px solid #ddd",
                                            backgroundColor: subItem.id === fChapterId ? '#f0f0f0' : 'white'
                                        }}
                                        onClick={(e) => handleSubAccordionClick(subItem.id, e)}
                                    >
                                        <p>{subItem.title}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
