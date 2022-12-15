import { CourseModel } from 'src/app/core/models/course.model';

export class TeacherModel {
    constructor(
        public id: string,
        public uid: string,
        public firstname: string,
        public lastname: string,
        public courses: CourseModel['id'][],
        public status: string,
    ) {}
}