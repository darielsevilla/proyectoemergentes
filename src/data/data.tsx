import {useState} from 'react'
interface course{
    id: number;
    img : string;
    creator : string;
    description: string;
    name : string;
    timeCreated : string;
    units : number;
    people : number;
    completionRequirement: number;
    institutionID: string;
}

interface user{
    id: string,
    name: string,
    userName: string,
    lastName: string
    role: string,
    institutionID: string,
}

interface institution{
    institutionID: number,
    institutionName: string,
    institutionPhone: string,
    institutionAdress: string,
    institutionCity: string,
    institutionCountry: string
}


//variables globales
export const variables = {
    courses: [] as course[],
    userInfo: undefined as user | undefined,
    institutionInfo: undefined as institution | undefined,
}
