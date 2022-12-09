
export class CourseModel {
    constructor(
        public id: string,
        public lastName: string,
        public firstName: string,
        public email: string,
        public courses: CourseModel[],
        public picture: string,
        public status: boolean
    ) {}
}