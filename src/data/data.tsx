import {useState} from 'react'
interface course{
    id: number;
    img : string;
    creator : string;
    name : string;
    timeCreated : string;
    units : number;
    people : number;
    completionRequirement: number;
}

interface user{
    name: string,
    username: string,
    password: string
}

export const [courses, setCourses] = useState<course[]>([])

export const [userInfo, setUserInfo] = useState(null)