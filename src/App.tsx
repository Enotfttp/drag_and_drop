import React, { useEffect, useState } from 'react';
import './App.css';
import image from "./assets/image.png"
import arrow from "./assets/arrow.png"
import eye from "./assets/eye.png"


function App() {
	const [cardSymbol, setCardSymbol] = useState([
		{ id: 1, text: '/' },
		{ id: 2, text: 'x' },
		{ id: 3, text: '-' },
		{ id: 4, text: '+' }
	])
	const [cardNumber, setCardNumber] = useState([
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
	])
	const [backgroundTime, setBackgroundTime] = useState(true)
	const [backgroundConstruct, setBackgroundConstruct] = useState(false)
	const [secondBoard, setSecondBoard] = useState<any[]>([]);
	const [currentItem, setCurrentItem] = useState<any[]>([]);
	const [num1, setNum1] = useState('');
	const [num2, setNum2] = useState('');
	const [znak, setZnak] = useState(false)
	const [result, setResult] = useState('')
	const [valueZnak, setValueZnak] = useState('')

	useEffect(() => {
		setResult(`${num1}${valueZnak}${num2}`)
	}, [num1, num2, valueZnak, currentItem])

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
	const dragStartHandler = (id: number, item: any) => {
		setCurrentItem(item)
	}

	const dragLeaveHandler = (e: any) => {
		console.log('leave');
	}

	const dragOverHandler = (e: any) => {
		e.preventDefault();
	}

	const dragDropHandler = (e: any, item: any[]) => {
		e.preventDefault();
		console.log(item);

		setSecondBoard(secondBoard.concat(item))

	}
	const dragEndHandler = (e: any) => {
		console.log('end');
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
	const inputList =
		<input type="text" className='block-input' value={num1 ? result : '0'} disabled={true}
			draggable={true}
			onDragStart={() => { dragStartHandler(1, inputList) }}
			onDragLeave={(e: any) => { dragLeaveHandler(e) }}
			onDragOver={(e: any) => { dragOverHandler(e) }}
			onDragEnd={(e: any) => { dragEndHandler(e) }}
		/>
	const symbolList =
		<div className='block-symbol'
			draggable={true}
			onDragStart={() => { dragStartHandler(2, symbolList) }}
			onDragLeave={(e: any) => { dragLeaveHandler(e) }}
			onDragOver={(e: any) => { dragOverHandler(e) }}
			onDragEnd={(e: any) => { dragEndHandler(e) }}
		>{
				cardSymbol.map((el: any) => {
					return (
						<li key={el.id} onClick={() => calcSet('calcSymbol', el.text)} >
							{el.text}
						</li>
					)
				})
			}
		</div>

	const numberList =
		<div className='block-number'
			draggable={true}
			onDragStart={() => { dragStartHandler(3, numberList) }}
			onDragLeave={(e: any) => { dragLeaveHandler(e) }}
			onDragOver={(e: any) => { dragOverHandler(e) }}
			onDragEnd={(e: any) => { dragEndHandler(e) }}
		>
			{cardNumber.map((el: any) => {
				return (
					<li key={el.id} className={el.className ? el.className : ''} onClick={(e: any) => calcSet('calcNum', el.text)}>
						{el.text}
					</li>
				)
			})}
		</div>
	const btnList = <div className='block-btn' onClick={() => clickHandlerResult()}>
		<li className='btn'
			draggable={true}
			onDragStart={() => { dragStartHandler(4, btnList) }}
			onDragLeave={(e: any) => { dragLeaveHandler(e) }}
			onDragOver={(e: any) => { dragOverHandler(e) }}
			onDragEnd={(e: any) => { dragEndHandler(e) }}
		>=</li>
	</div>

	return (
		<>
			<div className="app">
				<div className='block-change-func'>
					<div className={backgroundTime ? 'active' : 'block-runtime'} onClick={() => changeBackground('btn-1')}>
						<img src={eye} alt="#" className='eye' />
						<span>Runtime</span>
					</div>
					<div className={backgroundConstruct ? 'active' : 'block-constructor'} onClick={() => changeBackground('btn-2')}>
						<img src={arrow} alt="#" className='arrow-left' />
						<img src={arrow} alt="#" className='arrow-right' />
						<span>Constructor</span>
					</div>
				</div>
				<div className='main-block'>
					<div className="calculatro">
						{inputList}
						{symbolList}
						{numberList}
						{btnList}
					</div>
					<div className="drag-drop"
						draggable={true}
						onDragOver={(e: any) => { dragOverHandler(e) }}
						onDrop={(e: any) => { dragDropHandler(e, currentItem) }}
						onDragEnd={(e: any) => { dragEndHandler(e) }}
					>
						{secondBoard.length === 0 && (<>
							<img src={image} alt="#" className='block-image' />
							<span className='block-move-text'>Перетащите сюда</span>
							<p className='block-under-text'>любой элемент <br /> из левой панели</p>
						</>
						)}
						{secondBoard}
					</div>
				</div>
			</div>
		</>
	)
}

export default App;
