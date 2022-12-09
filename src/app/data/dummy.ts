import { CourseModel } from 'src/app/core/models/course.model';
import { TeacherModel } from './../core/models/teacher.model';

export const ADMIN: any = [
    {login: 'admin', password: 'admin123'}
]

export const TEACHER: TeacherModel[] = [
    {status: true ,id: '1', firstname: 'Amadou', lastname: 'Sall', email: 'amadou@gmail.com', password : 'Passer@123', courses: ['1', '2'],},
    {status: true ,id: '2', firstname: 'Moustapha', lastname: 'Mbaye', email: 'moustapha@gmail.com', password : 'Passer@123', courses: ['3','4'],},
    {status: true ,id: '3', firstname: 'Papa Bouna', lastname: 'Bar', email: 'bouna@gmail.com', password : 'Passer@123', courses: ['5','6'],},
    {status: true ,id: '4', firstname: 'Ousmane', lastname: 'Ngom', email: 'ousmane@gmail.com', password : 'Passer@123', courses: ['7'],},
    {status: true ,id: '5', firstname: 'Doudou', lastname: 'Fall', email: 'doudou@gmail.com', password : 'Passer@123', courses: ['8'],}
]


export const VIDEOS: any = [
    {name: 'Proba partie 1', date: '10-12-2022', link: 'lien vers video', id: '1', course: '1'},
    {name: 'Proba partie 2', date: '14-12-2022', link: 'lien vers video', id: '2', course: '1'},
    {name: 'Proba partie 3', date: '21-12-2022', link: 'lien vers video', id: '3', course: '1'},
]


export const COURSES: CourseModel[] = [
    {day: 'Lundi', hours: '8h-10h', cover: '',id: '1', name: 'Math', description: 'Description programme de Math en CI', teacher: '1', link: '', language: 'Francais', level: 'CI'},
    {day: 'Mardi', hours: '10h-12h', cover: '',id: '2', name: 'Math', description: 'Description programme de Math en CP', teacher: '1', link: '', language: 'Francais', level: 'CP'},
    {day: 'Jeudi', hours: '8h-10h', cover: '',id: '3', name: 'Histoire', description: 'Description programme de Histoire en 6e', teacher: '2', link: '', language: 'Francais', level: '6e'},
    {day: 'Samedi', hours: '17h-19h', cover: '',id: '4', name: 'Histoire', description: 'Description programme de Histoire en 3e', teacher: '2', link: '', language: 'Francais', level: '3e'},
    {day: 'Mercredi', hours: '17h-19h', cover: '',id: '5', name: 'Math', description: 'Description programme de Math en 4e', teacher: '3', link: '', language: 'Francais', level: '4e'},
    {day: 'Mercredi', hours: '15h-17h', cover: '',id: '6', name: 'PC', description: 'Description programme de PC en 4e', teacher: '3', link: '', language: 'Francais', level: '4e'},
    {day: 'Mardi', hours: '8h-10h', cover: '',id: '7', name: 'Math', description: 'Description programme de Math en CM2', teacher: '4', link: '', language: 'Francais', level: 'CM2'},
    {day: 'Samedi', hours: '15h-17h', cover: '',id: '8', name: 'Francais', description: 'francais pour les anglais ', teacher: '5', link: '', language: 'Francais', level: '6e'},
]


export const STUDENTS: any = [
    {level: '4e',firstname: 'Papa', lastname: 'Bar', email: 'bounabamba@gmail.com', status: true, courses: ['5','6'], picture: '', id: '1'},
    {level: '4e',firstname: 'Amdy', lastname: 'Diop', email: 'amdy@gmail.com', status: true, courses: ['5','6'], picture: '', id: '2'},
    {level: '4e',firstname: 'Sidy', lastname: 'Ndiaye', email: 'sylla@gmail.com', status: true, courses: ['5','6'], picture: '', id: '3'},
]