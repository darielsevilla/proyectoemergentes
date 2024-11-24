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

//variables relacionadas a flashcards
interface flashCardQuestions{
    definition: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    rightAnswer: number;
}


interface flashCard{
    id: string;
    word: string;
    definition: string;
}
/*export const flashcards={
    questions: [] as flashCardQuestions[],
    flashcards: [] as flashCard[]
}*/

export const flashcards={
    questions: [{
        definition:"definicion",
        option1: "op1",
        option2: "op2",
        option3: "op3",
        option4: "op4",
        rightAnswer: 1
    },{
        definition:"definicion2",
        option1: "op1-2",
        option2: "op2-2",
        option3: "op3-2",
        option4: "op4-2",
        rightAnswer: 1
    },{
        definition:"definicion3",
        option1: "op1-3",
        option2: "op2-3",
        option3: "op3-3",
        option4: "op4-3",
        rightAnswer: 1
    },{
        definition:"definicion4",
        option1: "op1-4",
        option2: "op2-4",
        option3: "op3-4",
        option4: "op4-4",
        rightAnswer: 1
    }],
    flashcards: [] as flashCard[]
}


//variables relacionadas a flashcards recursos
interface summary{
    unitNum : number,
    summary : string
}

export const summaries={
    summaries: [] as summary[]
}

export const questions = [
    {
      question: "Pregunta1",
      option1: "op1",
      option2: "op2",
      option3: "op3",
      option4: "op4",
      rightAnswer: 1
    },
    {
      question: "Pregunta2",
      option1: "op1-2",
      option2: "op2-2",
      option3: "op3-2",
      option4: "op4-2",
      rightAnswer: 1
    },
    {
      question: "Pregunta3",
      option1: "op1-3",
      option2: "op2-3",
      option3: "op3-3",
      option4: "op4-3",
      rightAnswer: 1
    }
  ];