import { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { MyButton } from "./components/MyButton/MyButton";
import { Card } from "./components/Card/Card";
import { submitTransaction } from "./ethereum/ethereumConnection";

type CardType = {
	id: string;
	addrId: string;
	address: string;
	tokensId: string;
	tokens: string;
};

const App = () => {
	const [cards, setCards] = useState([
		{
			id: v1(),
			addrId: v1(),
			address: "",
			tokensId: v1(),
			tokens: "",
		},
	]);

	const greetingMessage =
		"You can transfer tokens to any addresses, whatever you want!";

	const [infoMessage, setInfoMessage] = useState(greetingMessage);

	// Function to add new Token.
	const onClickAddNewToken = () => {
		const newId = v1();
		const newAddressesId = v1();
		const newTokenId = v1();
		setCards([
			...cards,
			{
				id: newId,
				addrId: newAddressesId,
				address: "",
				tokensId: newTokenId,
				tokens: "",
			},
		]);
	};

	// Function for a change Address data.
	const onAddressChanged = (newId: string, valueAddr: string) => {
		setCards([
			...cards.map((card) =>
				card.id === newId ? { ...card, address: valueAddr } : card
			),
		]);
	};

	// Function for a change Tokens data.
	const onTokenChanged = (tokensId: string, valueTokens: string) => {
		setCards([
			...cards.map((card) =>
				card.id === tokensId ? { ...card, tokens: valueTokens } : card
			),
		]);
	};

	// Function to submit transaction, on a button click.
	const onClickSubmitTransaction = () => {
		const addressesArray: any = cards.map((el) => el.address);
		const tokensArray: any = cards.map((el) => el.tokens);

		// validation of input data.
		cards.map((el) => {
			if (el.address.length > 0 || el.tokens.length > 0) {
				if (el.address.length > 0) {
					if (el.tokens.length > 0) {
						const tokensToNumber = +el.tokens;
						if (!isNaN(tokensToNumber)) {
							submitTransaction(addressesArray, tokensArray);
						} else {
							setInfoMessage("Tokens must be a number!");
						}
					} else {
						setInfoMessage("You need to enter a number of tokens to transfer!");
					}
				} else {
					setInfoMessage("You need to enter an address to transfer!");
				}
			} else {
				setInfoMessage("Please, fill all fields!");
			}
		});
	};

	// Function to remove a card.
	const removeCard = (id: string) => {
		setCards(cards.filter((card) => card.id !== id));
	};

	return (
		<div className="App">
			<div className="header">
				<h1>Decentralized Application</h1>
				<p>
					<i className={infoMessage !== greetingMessage ? "error" : ""}>
						{infoMessage}
					</i>
				</p>
			</div>
			<div className="wrapper">
				<MyButton title="+ Add Card" onClick={onClickAddNewToken} />
				<div>
					{cards.map((el: CardType, index) => {
						return (
							<Card
								key={index}
								id={el.id}
								addrId={el.addrId}
								tokensId={el.tokensId}
								address={el.address}
								tokens={el.tokens}
								onAddrChanged={onAddressChanged}
								onTokenChanged={onTokenChanged}
								removeCard={removeCard}
							/>
						);
					})}
				</div>
				<MyButton
					title="Submit Transaction"
					onClick={onClickSubmitTransaction}
				/>
			</div>
		</div>
	);
};

export default App;
