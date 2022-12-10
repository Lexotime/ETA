import { CourseModel } from 'src/app/core/models/course.model';

export class TeacherModel {
    constructor(
        public id: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public courses: CourseModel['id'][],
        public status: string,
    ) {}
}