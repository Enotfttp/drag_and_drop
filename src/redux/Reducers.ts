
import { COMMA, EQUALLY, MINUS, MULTIPLY, PLUS, SHARE } from '../constants/constants'
import IDefaultStore, { IBlockItems,  ICard,  ICardItem } from '../interfaces/AppInterfaces'
import { BACKGROUNDCONSTRUCT, BACKGROUNDTIME, CARD, CURRENTBOARD, CURRENTITEM, NUM1, NUM2, OVERITEM, RESULT, VALUEZNAK, ZNAK } from './ReduxConstants'

export const defaultStore:IDefaultStore = {
	backgroundTime: false,
	backgroundConstruct: true,
	currentBoard: 0,
	currentItem: {},
	num1: '',
	num2: '',
	znak: false,
	valueZnak: '',
	result: '',
	overItem: {},
	card: [
		{
			id: 0,
			items: [
				{
					id: 1,
					cardInput: {
						id: 1, text: '0'
					}
				},
				{
					id: 2,
					cardSymbol: [
						{ id: 1, text: SHARE },
						{ id: 2, text: MULTIPLY },
						{ id: 3, text: MINUS},
						{ id: 4, text: PLUS }
					]
				},
				{
					id: 3,
					cardNumber: [
						{ id: 11, text: '9' },
						{ id: 10, text: '8' },
						{ id: 9, text: '7' },
						{ id: 8, text: '6' },
						{ id: 7, text: '5' },
						{ id: 6, text: '4' },
						{ id: 5, text: '3' },
						{ id: 4, text: '2' },
						{ id: 3, text: '1' },
						{ id: 2, text: COMMA },
						{ id: 1, text: '0', className: 'block-zero' },
					]
				},
				{
					id: 4,
					cardBtn:
					{
						id: 1, text: EQUALLY
					},
				}
			],
		},
		{
			id: 2,
			items: []
		}
	]
}

export const reducer = (state = defaultStore, action: any) => {
	switch (action.type) {
		case BACKGROUNDTIME:
			return { ...state, backgroundTime: action.payload };
		case BACKGROUNDCONSTRUCT:
			return { ...state, backgroundConstruct: action.payload };
		case CURRENTBOARD:
			return { ...state, currentBoard: action.payload };
		case CURRENTITEM:
			return { ...state, currentItem: action.payload };
		case NUM1:
			return { ...state, num1: action.payload === ''  ? state.num1 = '' : state.num1 += action.payload };
		case NUM2:
			return { ...state, num2: action.payload === ''? state.num2 = '' : state.num2 += action.payload };
		case ZNAK:
			return { ...state, znak: action.payload };
		case VALUEZNAK:
			return { ...state, valueZnak: action.payload };
		case RESULT:
			return { ...state, result: action.payload };
		case OVERITEM:
			return { ...state, overItem: action.payload };
		case CARD:
			return {
				...state, card: state.card.map((el: ICard) => {
					if (el.id !== state.currentBoard && el.items.indexOf(action.payload.item) === -1 && state.currentBoard !== action.payload.board) {
						el.items.splice(el.items.indexOf(state.overItem) + 1, 0, action.payload.item)
					}
					return el;
				})
			}
		default:
			return state;
	}

}
export const timeReducer = (payload: boolean) => ({ type: BACKGROUNDTIME, payload });
export const constructReducer = (payload: boolean) => ({ type: BACKGROUNDCONSTRUCT, payload });
export const currentBoardReducer = (payload: number) => ({ type: CURRENTBOARD, payload });
export const currentItemReducer = (payload: IBlockItems) => ({ type: CURRENTITEM, payload });
export const num1Reducer = (payload: string) => ({ type: NUM1, payload });
export const num2Reducer = (payload: string) => ({ type: NUM2, payload });
export const znakReducer = (payload: boolean) => ({ type: ZNAK, payload });
export const valueZnakReducer = (payload: string) => ({ type: VALUEZNAK, payload });
export const resultReducer = (payload: string) => ({ type: RESULT, payload });
export const overItemReducer = (payload:  IBlockItems) => ({type:OVERITEM, payload})
export const cardReducer = (payload: ICardItem) => ({ type: CARD, payload });



