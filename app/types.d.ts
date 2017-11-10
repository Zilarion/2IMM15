type AuthorType = {
	id: number,
	name: string,
	score?: number,
	animTime: number,
	influence: number
	coAuthors?: Array<AuthorType>
	papers?: Array<PaperType>
	topics?: Array<Topic>
}

type Topic = Array<{
	id: string
	name: string
}>

type TopicType = {
	number: number,
	topic: Array<{
		id: string
		name: string
	}>
}


type PaperType = {
	id: number,
	title: string,
	authors: Array<AuthorType>,
	link: string,
	score?: number,
	animTime: number,
	year: string
	topic?: Topic
	influence: number
	related?: Array<PaperType>
}


declare module 'styled-components'
declare module 'react-loading'
declare module 'react-konva'