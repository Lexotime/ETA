import { CourseModel } from "./course.model";


export class LevelCoursesModel {
    constructor(
        public name: string,
        public courses: CourseModel[]
    ) {}
}