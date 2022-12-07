
export class CourseModel {
    constructor(
       public lastName: string,
       public firstName: string,
       public email: string,
       public courses: CourseModel[],
       public picture: string,
       public allow: boolean
    ) {}
}