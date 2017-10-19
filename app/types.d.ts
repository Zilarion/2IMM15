type AuthorType = {
	id: number,
	name: string,
	score?: number,
	animTime: number,
	influence: number
	coAuthors?: Array<AuthorType>
	papers?: Array<PaperType>
}


type TopicType = {
	number: number,
	label: string
}


type PaperType = {
	id: number,
	title: string,
	authors: Array<AuthorType>,
	link: string,
	score?: number,
	animTime: number,
	year: string
	topic: string
	influence: number
	related?: Array<PaperType>
}


declare module 'styled-components'
declare module 'react-loading'
declare module 'react-konva'