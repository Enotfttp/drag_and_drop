import React, { useEffect, useState } from 'react';
import './App.css';
import image from "./assets/add_image.svg"
import selector from "./assets/selector.svg"
import active_eye from "./assets/active_eye.svg"
import active_selector from "./assets/active_selector.svg"
import eye from "./assets/eye.svg"


function App() {
	const [backgroundTime, setBackgroundTime] = useState(false)
	const [backgroundConstruct, setBackgroundConstruct] = useState(true)
	const [currentBoard, setCurrentBoard] = useState(0);
	const [currentItem, setCurrentItem] = useState<any[]>([]);
	const [num1, setNum1] = useState('');
	const [num2, setNum2] = useState('');
	const [znak, setZnak] = useState(false)
	const [result, setResult] = useState('')
	const [valueZnak, setValueZnak] = useState('')
	const [card, setCard] = useState<any>([
		{
			id: 1,
			items: [
				{
					id: 1,
					cardInput: {
						id: 1, text: result
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
						{ id: 2, text: '.' },
						{ id: 1, text: '0', className: 'block-zero' },
					]
				},
				{
					id: 4,
					cardBtn:
					{
						id: 1, text: '='
					},

				}
			]
		},
		{
			id: 2,
			items: []
		}

	])

	useEffect(() => {
		setResult(`${num1}${valueZnak}${num2}`)
	}, [num1, num2, valueZnak, currentItem, card])

	const changeBackground = (btn: string) => {
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

	const dragStartHandler = (item: any, e: any, id: number) => {
		setCurrentBoard(id)
		setCurrentItem(item)
	}

	const dragLeaveHandler = (e: any) => {
		if (e.target.className === 'drag-drop') {
			e.target.style.background = '#fff'
		}
	}

	const dragOverHandler = (e: any, id: number) => {
		e.preventDefault();
		if (e.target.className === 'drag-drop') {
			e.target.style.background = '#F0F9FF'
		} else {
			e.target.style.cursor = 'move'
		}
	}

	const dragDropHandler = (e: any, item: any, board: number) => {
		e.preventDefault();
		e.target.style.cursor = 'pointer'
		if (e.target.className === 'drag-drop') {
			e.target.style.border = 'none'
			e.target.style.background = '#fff'
		}
		setCard(card.map((el: any) => {
			if (el.id !== currentBoard && el.items.indexOf(item) === -1 && currentBoard !== board) {
				el.items.push(item)
			}
			return el
		}
		))
	}

	const dragEndHandler = (e: any, idItem: number) => {
		card.forEach((element: any) => {
			if (element.id === 2 && element.items.indexOf(currentItem) === idItem) {
				console.log('test');
			}
		});

	}

	const calcSet = (type: string, text: string) => {
		if (backgroundTime)
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

	const clickHandlerResult = () => {
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
						setResult(String(result))
						setNum1(String(result))
						setNum2('')
						setValueZnak('')
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
				{card.map((items: any, index: number) => {
					return (
						<div key={index} >
							<div className='calculator' >
								{
									items.items.map((el: any) => {
										if (el.cardInput) {
											return (
												<div className='block-white' key={el.id}>
													<input type="text" className='block-input' value={num1 ? el.cardInput.text : '0'} disabled={true}
														draggable={true}
														onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
														onDragLeave={(event: any) => { dragLeaveHandler(event) }}
														onDragOver={(event: any) => { dragOverHandler(event, items.id) }}
														onDragEnd={(event: any) => { dragEndHandler(event, items.id) }}
														onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
													/>
												</div>
											)
										}
										else if (el.cardSymbol) {
											return (
												<div className='block-white' key={el.id}>
													<div className='block-symbol'
														draggable={true}
														onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
														onDragLeave={(e: any) => { dragLeaveHandler(e) }}
														onDragOver={(e: any) => { dragOverHandler(e, items.id) }}
														onDragEnd={(e: any) => { dragEndHandler(e, items.id) }}
														onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
													>
														{el.cardSymbol.map((item: any) => {
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
												<div className='block-white' key={el.id}>
													<div className='block-number'
														draggable={true}
														onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
														onDragLeave={(event: any) => { dragLeaveHandler(event) }}
														onDragOver={(event: any) => { dragOverHandler(event, items.id) }}
														onDragEnd={(event: any) => { dragEndHandler(event, items.id) }}
														onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
													>{
															el.cardNumber.map((item: any) => {
																return (
																	<li key={item.id} className={item.className ? item.className : ''} onClick={(e: any) => calcSet('calcNum', item.text)}>
																		{item.text}
																	</li>
																)
															})}
													</div>
												</div>
											)
										} else if (el.cardBtn) {
											return (
												<div className='block-white' onClick={() => clickHandlerResult()} key={el.id}>
													<li className='btn'
														draggable={true}
														onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
														onDragLeave={(event: any) => { dragLeaveHandler(event) }}
														onDragOver={(event: any) => { dragOverHandler(event, items.id) }}
														onDragEnd={(event: any) => { dragEndHandler(event, items.id) }}
														onDrop={(event: any) => { dragDropHandler(event, currentItem, items.id) }}
													>{el.cardBtn.text}</li>
												</div>
											)
										}
									})
								}
							</div>
							{
								items.id === 2 && items.items.length === 0 && (
									<div className={"drag-drop"}
										onDragOver={(event: any) => { dragOverHandler(event, items.id) }}
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
