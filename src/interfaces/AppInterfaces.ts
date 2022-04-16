export default interface IDefaultStore{ 
	backgroundTime: boolean,
	backgroundConstruct: boolean,
	currentBoard: number,
	currentItem: IBlockItems,
	num1: string,
	num2: string,
	znak: false,
	valueZnak: string,
	result: string;	
	overItem: IBlockItems,
	card:ICard[]
}

export interface ICardItem { 
	item: IBlockItems,
	board: number
} 

export  interface ICard {
	id: number
	items: IBlockItems[]
}

export interface IBlockItems {
	id?: number,
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





