type AuthorType = {
	id: number,
	name: string,
}

type PaperType = {
	id: number,
	title: string,
	authors: Array<AuthorType>,
	link?: string
}
