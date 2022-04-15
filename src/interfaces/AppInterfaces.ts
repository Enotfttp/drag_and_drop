export default interface ICard {
	id: number
	items: IBlockItems[]
}
export interface IBlockItems {
	id: number,
	cardInput?: {
		id: number,
		text: string,
	},
	cardSymbol?: IItems[],
	cardNumber?: IItems[],
	cardBtn?: {
		id: number,
		text: string,
	}
}
export interface IItems {
	id: number,
	text: string,
	className?: string
}





