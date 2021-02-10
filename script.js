//variables
const kart = document.getElementById('kart');
const courses = document.getElementById('list-courses');
const listCourses = document.querySelector('#list-kart tbody');
const emptyKartBtn = document.getElementById('empty-kart');

//listeners
loadEventListeners();
function loadEventListeners(){
    //when "add kart" is pressed
    courses.addEventListener('click', buyCourse);
    //when a course is removed from the kart
    kart.addEventListener('click', deleteCourse);
    //when "empty kart button pressed"
    emptyKartBtn.addEventListener('click', emptyKart);
    //when loading the document show local storage data
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

//functions


//fuction that add the course to the kart
function buyCourse(e){
    e.preventDefault();

    if(e.target.classList.contains('add-kart')){
        const course = e.target.parentElement.parentElement;

        readDataCourse(course);
    }

}
function readDataCourse(course){
    const infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.discounted').textContent,
        id:    course.querySelector('a').getAttribute('data-id')
    }
    insertInKart(infoCourse);
}
function insertInKart(course){
    const row = document.createElement('tr');
    row.innerHTML=`
    <td>
    <img src="${course.image} " width=100>
    </td>
    <td class="title">
    ${course.title}
    </td>
    <td class="rate">
    ${course.price}
    </td>
    <td class="cross">
    <a href='#' class="delete-course" data-id="${course.id}">x</a>
    </td>
    `;
    listCourses.appendChild(row);
    saveCourseLocalStorage(course);
}
function  deleteCourse(e){
    e.preventDefault();

    let course,
    courseId;

    if(e.target.classList.contains('delete-course')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
        deleteCourseLocalStorage(courseId);
}
function emptyKart(){
    while(listCourses.firstChild){
        listCourses.removeChild(listCourses.firstChild);

    }
    emptyLocalStorage();
    
}
function  emptyLocalStorage(){
    localStorage.clear();
}
function saveCourseLocalStorage(course){
    let courses;
    courses = getCoursesLocalStorage();
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses))
}
function getCoursesLocalStorage(){
    let coursesLS;
    if(localStorage.getItem('courses')===null){
        coursesLS = [];
    }
    else{
        coursesLS = JSON.parse(localStorage.getItem('courses'));
    }
    return coursesLS;
}
function  readLocalStorage(){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function (course){
     const row = document.createElement('tr');
        row.innerHTML=`
        <td>
        <img src="${course.image} " width=100>
        </td>
        <td class="title">
        ${course.title}
        </td>
        <td class="rate">
        ${course.price}
        </td>
        <td class="cross">
        <a href='#' class="delete-course" data-id="${course.id}">x</a>
        </td>
        `;
        listCourses.appendChild(row);
    });
}

function deleteCourseLocalStorage(course){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function(coursesLS,index){
        if(coursesLS.id===course){
            coursesLS.splice(index,1)
        }
    });
    localStorage.setItem('courses',JSON.stringify(coursesLS));
}




