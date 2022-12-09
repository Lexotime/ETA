
export class CourseModel {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public cover: string,
        public teacher: string,
        public language: string,
        public level: string,
        public link: string,
        public day: string,
        public hours: string,
    ) {}
}