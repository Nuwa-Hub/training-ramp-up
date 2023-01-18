import { Person } from './interface'
import { sampleData } from './sample-products'
import { durationInYears } from '@progress/kendo-date-math'

let personData: Person[]= [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
personData = [...sampleData]

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const generateId = (data: any[]) =>
  parseInt(
    data.reduce((acc: number, current: { PersonID: number }) => Math.max(acc, current.PersonID), 0),
  ) + 1


function regValidate(url: string, urlRegex: RegExp):boolean {
  return urlRegex.test(url);
}


export const checkErr = (item: Person): string[] => {
  const tempErr: string[] = []

  if (
    item.PersonAddress === undefined ||
    item.PersonAddress === '' ||
    item.PersonMobileNo === undefined ||
    item.PersonMobileNo === '' ||
    item.PersonName === undefined ||
    item.PersonName === ''
  ) {
    tempErr.push('every field required!')
  } else {
    if (item.DateOfBirth != null && durationInYears(item.DateOfBirth, new Date()) < 1) {
      tempErr.push('student needs to be 18 years or older!')
    }
    if (
      item.PersonMobileNo != null &&
      // eslint-disable-next-line no-useless-escape
      !regValidate(item.PersonMobileNo,/^[+]*[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.\/0-9]{7}$/g)
    )
      tempErr.push('phone number should be in valid format')
 if (
      item.PersonName != null &&
      // eslint-disable-next-line no-useless-escape 
      !regValidate(item.PersonName,/(^[a-zA-Z][a-zA-Z\s]{5,10}$)/)
    )
      tempErr.push('person name should bein valid format')
if (
      item.PersonAddress != null &&
      // eslint-disable-next-line no-useless-escape 
      !regValidate(item.PersonAddress,/^[#.0-9a-zA-Z\s,/]+$/i)
    )
      tempErr.push('person address should bein valid format')

  }

  return tempErr
}

export const insertItem = (item: Person): any => {

  item.PersonID = generateId(personData)
  item.inEdit = false
  personData.unshift(item)
  
  return personData
}

export const getItems = (): Person[] => {
  return personData
}

export const updateItem = (item: Person): Person[] => {
  item.inEdit = false
  const index = personData.findIndex((record) => record.PersonID === item.PersonID)
  personData[index] = item
  return personData
}

export const deleteItem = (item: Person): Person[] => {
  const index = personData.findIndex((record) => record.PersonID === item.PersonID)
  personData.splice(index, 1)
  return personData
}
