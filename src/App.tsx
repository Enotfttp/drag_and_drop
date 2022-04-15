import { useState } from 'react';
import './App.css';
import image from "./assets/add_image.svg"
import selector from "./assets/selector.svg"
import active_eye from "./assets/active_eye.svg"
import active_selector from "./assets/active_selector.svg"
import eye from "./assets/eye.svg"
import ICard, { IBlockItems, IItems } from './interfaces/AppInterfaces';
import { COMMA, EQUALLY } from './constants/constants';


function App() {
	const [backgroundTime, setBackgroundTime] = useState<boolean>(false)
	const [backgroundConstruct, setBackgroundConstruct] = useState<boolean>(true)
	const [currentBoard, setCurrentBoard] = useState<number>(0);
	const [currentItem, setCurrentItem] = useState<IBlockItems | any>();
	const [num1, setNum1] = useState<string>('');
	const [num2, setNum2] = useState<string>('');
	const [znak, setZnak] = useState<boolean>(false)
	const [result, setResult] = useState<string>('')
	const [valueZnak, setValueZnak] = useState<string>('')
	const [card, setCard] = useState<ICard[]>([
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
						{ id: 1, text: '/' },
						{ id: 2, text: 'x' },
						{ id: 3, text: '-' },
						{ id: 4, text: '+' }
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
	])

	const changeBackground = (btn: string): void => {
		if (btn === 'btn-1' && backgroundTime === false) {
			setBackgroundTime((backgroundTime) => backgroundTime = !backgroundTime)
			setBackgroundConstruct(((backgroundConstruct) => backgroundConstruct = !backgroundConstruct))
		} else if (btn === 'btn-2' && backgroundConstruct === false) {
			setBackgroundTime((backgroundTime) => backgroundTime = !backgroundTime)
			setBackgroundConstruct(((backgroundConstruct) => backgroundConstruct = !backgroundConstruct))
			setResult('')
			setNum1('')
			setNum2('')
			setValueZnak('')
			setZnak(false)
		}
	}

	const dragStartHandler = (item: IBlockItems, event: any, id: number): void => {
		if (event.target.className === 'block-white') {
			event.target.style.opacity = "30%"
		}
		setCurrentBoard(id)
		setCurrentItem(item)
	}

	const dragLeaveHandler = (event: any): void => {
		if (event.target.className === 'drag-drop') {
			event.target.style.background = '#fff'
		}
	}

	const dragOverHandler = (event: any): void => {
		event.preventDefault();
		if (event.target.className === 'drag-drop') {
			event.target.style.background = '#F0F9FF'
		} else {
			event.target.style.cursor = 'move'
		}
	}

	const dragDropHandler = (event: any, item: IBlockItems, board: number): void => {
		event.preventDefault();
		setCard(card.map((el: any) => {
			if (el.id !== currentBoard && el.items.indexOf(item) === -1 && currentBoard !== board) {
				el.items.push(item)
			}
			return el
		}
		))
	}

	const dragEndHandler = (event: any): void => {
		card.forEach((element: any) => {
			if (element.items.indexOf(currentItem) === -1) {
				event.target.style.opacity = '100%';
			}
		});
	}

	const calcSet = (type: string, text: string): void => {
		if (backgroundTime)
			if (text === ',') {
				text = '.'
			}
		if (type === "calcNum") {
			if (znak) {
				setNum2((prev) => prev += text)
			} else {
				setNum1((prev) => prev += text)
			}
		} else if (type === 'calcSymbol' && num1) {
			setZnak(true)
			setValueZnak(text)
		}
	}

	const clickHandlerResult = (): void => {
		if (backgroundTime)
			if (num1 && num2) {
				let result;
				switch (valueZnak) {
					case '+':
						result = +num1 + +num2;
						setResult(String(result))
						setNum1(String(result))
						setNum2('')
						setValueZnak('')
						break;
					case '-':
						result = +num1 - +num2;
						setResult(String(result))
						setNum1(String(result))
						setNum2('')
						setValueZnak('')
						break;
					case '/':
						result = +num1 / +num2;
						if (result === Infinity) {
							setResult('Не определено')
						} else {
							setResult(String(result))
							setNum1(String(result))
							setNum2('')
							setValueZnak('')
						}
						break;
					case 'x':
						result = +num1 * +num2;
						setResult(String(result))
						setNum1(String(result))
						setNum2('')
						setValueZnak('')
						break;
				}
			}
	}
	return (
		<div className="app">
			<div className='block-change-func'>
				<div className={backgroundTime ? 'active' : 'block-runtime'} onClick={() => changeBackground('btn-1')}>
					<img src={backgroundTime ? active_eye : eye} alt="#" className='eye' />
					<span>Runtime</span>
				</div>
				<div className={backgroundConstruct ? 'active' : 'block-constructor'} onClick={() => changeBackground('btn-2')}>
					<img src={backgroundConstruct ? active_selector : selector} alt="#" className='selector' />
					<span>Constructor</span>
				</div>
			</div>
			<div className='main-block'>
				{card.map((items: ICard, index: number) => {
					return (
						<div key={index} >
							<div className={index === 1 ? 'calculator' : backgroundTime ? 'second-calculator' : 'calculator'} >
								{
									items.items.map((el: IBlockItems) => {
										if (el.cardInput) {
											return (
												<div className={index === 1 ? 'block-white-second' : 'block-white'} key={el.id}
													draggable={true}
													onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
													onDragLeave={(event: any) => { dragLeaveHandler(event) }}
													onDragOver={(event: any) => { dragOverHandler(event) }}
													onDragEnd={(event: any) => { dragEndHandler(event) }}
													onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
												>
													<input type="text" className={result !== "" ? 'block-input-result' : 'block-input'} value={result ? result : el.cardInput.text} disabled={true}
													/>
												</div>
											)
										}
										else if (el.cardSymbol) {
											return (
												<div className={index === 1 ? 'block-white-second' : 'block-white'} key={el.id}
													draggable={true}
													onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
													onDragLeave={(event: any) => { dragLeaveHandler(event) }}
													onDragOver={(event: any) => { dragOverHandler(event) }}
													onDragEnd={(event: any) => { dragEndHandler(event) }}
													onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
												>
													<div className={backgroundTime ? 'block-symbol-active' : 'block-symbol'}
													>
														{el.cardSymbol.map((item: IItems) => {
															return (
																<li key={item.id} onClick={() => calcSet('calcSymbol', item.text)} >
																	{item.text}
																</li>
															)
														})}
													</div>
												</div>
											)
										} else if (el.cardNumber) {
											return (
												<div className={index === 1 ? 'block-white-second' : 'block-white'} key={el.id}
													draggable={true}
													onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
													onDragLeave={(event: any) => { dragLeaveHandler(event) }}
													onDragOver={(event: any) => { dragOverHandler(event) }}
													onDragEnd={(event: any) => { dragEndHandler(event) }}
													onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
												>
													<div className={backgroundTime ? 'block-number-active' : 'block-number'}
													>{
															el.cardNumber.map((item: IItems) => {
																return (
																	<li key={item.id} className={item.className ? item.className : ''} onClick={() => calcSet('calcNum', item.text)}>
																		{item.text}
																	</li>
																)
															})}
													</div>
												</div>
											)
										} else if (el.cardBtn) {
											return (
												<div className={index === 1 ? 'block-white-second' : 'block-white'} onClick={() => clickHandlerResult()} key={el.id}
													draggable={true}
													onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
													onDragLeave={(event: any) => { dragLeaveHandler(event) }}
													onDragOver={(event: any) => { dragOverHandler(event) }}
													onDragEnd={(event: any) => { dragEndHandler(event) }}
													onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
												>
													<li className='btn'>{el.cardBtn.text}</li>
												</div>
											)
										}
									})
								}
							</div>
							{
								items.id === 2 && items.items.length === 0 && backgroundConstruct && (
									<div className="drag-drop"
										onDragOver={(event: any) => { dragOverHandler(event) }}
										onDragLeave={(event: any) => { dragLeaveHandler(event) }}
										onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
									>
										<img src={image} alt="#" className='block-image' />
										<span className='block-move-text'>Перетащите сюда</span>
										<p className='block-under-text'>любой элемент <br /> из левой панели</p>
									</div >
								)
							}
						</div>
					)
				})}
			</div >
		</div >
	)
}

export default App;
