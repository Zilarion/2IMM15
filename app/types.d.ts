type AuthorType = {
	id: number,
	name: string,
}

type PaperType = {
	id: number,
	title: string,
	authors: Array<AuthorType>,
	link?: string,
	score?: number,
	animTime: number,
}


declare module 'styled-components'