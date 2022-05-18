import React from "react";
import style from "./MyButton.module.css";

type MyButtonType = {
	title: string;
	onClick: () => void;
};

export const MyButton: React.FC<MyButtonType> = (props) => {
	return (
		<div className={style.wrapper}>
			<button className={style.button} onClick={props.onClick}>
				{props.title}
			</button>
		</div>
	);
};
