import React from "react";
import { MyButton } from "../MyButton/MyButton";
import style from "./Card.module.css";

type CardPropsType = {
	id: string;
	addrId: string;
	tokensId: string;
	onAddrChanged: (addrId: string, valueAddr: string) => void;
	onTokenChanged: (tokenId: string, valueToken: string) => void;
	removeCard: (id: string) => void;
	address: string;
	tokens: string;
};

export const Card = (props: CardPropsType) => {
	// Function to change Address input
	const onChangeAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onAddrChanged(props.id, e.currentTarget.value);
	};

	// Function to change Tokens input
	const onChangeTokensHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onTokenChanged(props.id, e.currentTarget.value);
	};

	// Button function for remove card.
	const onRemoveCardHandler = () => {
		props.removeCard(props.id);
	};

	return (
		<div className={style.wrapper}>
			<div className={style.titleAddress}>
				<p className={style.title}>Address:</p>
			</div>
			<div className={style.titleTokens}>
				<p className={style.title}>Tokens:</p>
			</div>
			<input
				className={style.inputAddress}
				type="text"
				placeholder="Type address. . ."
				onChange={onChangeAddressHandler}
				value={props.address}
			/>
			<input
				className={style.inputAmount}
				type="text"
				placeholder="Tokens amount. . ."
				onChange={onChangeTokensHandler}
				value={props.tokens}
			/>
			<div className={style.button}>
				<MyButton title={"Delete"} onClick={onRemoveCardHandler} />
			</div>
		</div>
	);
};
