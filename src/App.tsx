import './App.css';
import image from './assets/add_image.svg'
import selector from './assets/selector.svg'
import active_eye from './assets/active_eye.svg'
import active_selector from './assets/active_selector.svg'
import eye from './assets/eye.svg'
import  IDefaultStore, { ICard,IBlockItems, IItems } from './interfaces/AppInterfaces';
import { useDispatch, useSelector } from 'react-redux';
import { cardReducer, constructReducer, currentBoardReducer, currentItemReducer, num1Reducer, num2Reducer, overItemReducer, resultReducer, timeReducer, valueZnakReducer, znakReducer } from './redux/Reducers';


function App() {
	const dispatch = useDispatch();
	const store = useSelector((state: IDefaultStore) => state);

	const changeBackground = (btn: string): void => {
		if (btn === 'btn-1' && store.backgroundTime === false) {
			dispatch(timeReducer(true));
			dispatch(constructReducer(false));
			dispatch(num1Reducer(''));
			dispatch(num2Reducer(''));
			dispatch(valueZnakReducer(''));
			dispatch(znakReducer(false))
		} else if (btn === 'btn-2' && store.backgroundConstruct === false) {
			dispatch(timeReducer(false));
			dispatch(constructReducer(true));
		}
	}

	const dragStartHandler = (item: IBlockItems, event: any, idBoard: number): void => {
		if (event.target.className === 'block-white') {
			event.target.style.opacity = '30%';
		}
		dispatch(currentBoardReducer(idBoard));
		dispatch(currentItemReducer(item));
	}

	const dragLeaveHandler = (event: any): void => {
		if (event.target.className === 'drag-drop') {
			event.target.style.background = '#fff';
		} 
	}

	const dragOverHandler = (event: any, item?: IBlockItems): void => {
		if (item) {
			dispatch(overItemReducer(item))
		}
		event.preventDefault();
		if (event.target.className === 'drag-drop') {
			event.target.style.background = '#F0F9FF';
		} else{
			event.target.style.cursor = 'move';
		}
	}

	const dragDropHandler = (event: any, item: IBlockItems, board: number) => {
		event.preventDefault();
		const data = {
			item: item,
			board: board
		}
		dispatch(cardReducer(data));
	}

	const dragEndHandler = (event: any): void => {
		store.card.forEach((element: ICard) => {
			if (element.items.indexOf(store.currentItem) === -1) {
				event.target.style.opacity = '100%';
			}
		});
	}

	const calcSet = (type: string, text: string): void => {
		if (store.backgroundTime)
			if (text === ',') {
				text = '.';
			}
		if (type === 'calcNum') {
			if (store.znak) {
				dispatch(num2Reducer(text));
			} else {
				dispatch(num1Reducer(text));
			}
		} else if (type === 'calcSymbol' && store.num1) {
			dispatch(znakReducer(true));
			dispatch(valueZnakReducer(text));
		}
	}

	const cleatState = (result: number): void => {
		dispatch(num1Reducer(''));
		dispatch(num2Reducer(''));
		dispatch(resultReducer(String(result)));
		dispatch(num1Reducer(String(result)));
		dispatch(valueZnakReducer(''));
	}

	const clickHandlerResult = (): void => {
		if (store.backgroundTime)
			if (store.num1 && store.num2) {
				let result;
				switch (store.valueZnak) {
					case '+':
						result = +store.num1 + +store.num2;
						cleatState(result);
						break;
					case '-':
						result = +store.num1 - +store.num2;
						cleatState(result);
						break;
					case '/':
						result = +store.num1 / +store.num2;
						if (result === Infinity) {
							dispatch(resultReducer('Не определено'));
						} else {
							cleatState(result);
						}
						break;
					case 'x':
						result = +store.num1 * +store.num2;
						cleatState(result);
						break;
				}
			}
	}
	return (
		<div className='app'>
			<div className='block-change-func'>
				<div className={store.backgroundTime ? 'active' : 'block-runtime'} onClick={() => changeBackground('btn-1')}>
					<img src={store.backgroundTime ? active_eye : eye} alt='#' className='eye' />
					<span>Runtime</span>
				</div>
				<div className={store.backgroundConstruct ? 'active' : 'block-constructor'} onClick={() => changeBackground('btn-2')}>
					<img src={store.backgroundConstruct ? active_selector : selector} alt='#' className='selector' />
					<span>Constructor</span>
				</div>
			</div>
			<div className='main-block'>
				{store.card.map((items: ICard, index: number) => {
					return (
						<div key={index} >
							<div className={index === 1 ? 'calculator' : store.backgroundTime ? 'second-calculator' : 'calculator'} >
								{
									items.items.map((el: IBlockItems) => {
										if (el.cardInput) {
											return (
												<div className={index === 1 ? 'block-white-second' : 'block-white'} key={el.id}
													draggable={true}
													onDragStart={(event: any) => { dragStartHandler(el, event, items.id) }}
													onDragLeave={(event: any) => { dragLeaveHandler(event) }}
													onDragOver={(event: any) => { dragOverHandler(event, el) }}
													onDragEnd={(event: any) => { dragEndHandler(event) }}
													onDrop={(event: any) => { dragDropHandler(event, store.currentItem, items.id) }}
												>
													<input type='text' className={store.result !== '' ? 'block-input-result' : 'block-input'} value={store.result ? store.result : el.cardInput.text} disabled={true}
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
													onDragOver={(event: any) => { dragOverHandler(event, el) }}
													onDragEnd={(event: any) => { dragEndHandler(event) }}
													onDrop={(event: any) => { dragDropHandler(event, store.currentItem, items.id) }}
												>
													<div className={store.backgroundTime ? 'block-symbol-active' : 'block-symbol'}
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
													onDragOver={(event: any) => { dragOverHandler(event, el) }}
													onDragEnd={(event: any) => { dragEndHandler(event) }}
													onDrop={(event: any) => { dragDropHandler(event, store.currentItem, items.id) }}
												>
													<div className={store.backgroundTime ? 'block-number-active' : 'block-number'}
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
													onDragOver={(event: any) => { dragOverHandler(event, el) }}
													onDragEnd={(event: any) => { dragEndHandler(event) }}
													onDrop={(event: any) => { dragDropHandler(event, store.currentItem, items.id) }}
												>
													<li className='btn'>{el.cardBtn.text}</li>
												</div>
											)
										}
									})
								}
							</div>
							{
								items.id === 2 && items.items.length === 0 && store.backgroundConstruct && (
									<div className='drag-drop'
										onDragOver={(event: any) => { dragOverHandler(event) }}
										onDragLeave={(event: any) => { dragLeaveHandler(event) }}
										onDrop={(event: any) => { dragDropHandler(event, store.currentItem, items.id) }}
									>
										<img src={image} alt='#' className='block-image' />
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
