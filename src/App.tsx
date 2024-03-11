import { FieldErrors, useForm } from "react-hook-form";
import {
	atom,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";

const countryState = atom<ICountry[]>({
	key: "country",
	default: [],
});

interface ICountry {
	country_name: string;
	id: number;
	category: "WISHLIST" | "VISITED" | "FAVORITE";
}
interface IFormInput {
	name: string;
}

export default function App() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IFormInput>();
	const [countries, setContries] = useRecoilState(countryState);

	const onValid = (data: IFormInput) => {
		setContries((oldCountry) => [
			{ country_name: name, id: Date.now(), category: "WISHLIST" },
			...oldCountry,
		]);
		setValue("name", "");
	};
	const onInvalid = (errors: FieldErrors) => {
		console.log(errors);
	};
	return (
		<main>
			<h2>내가 가고싶은 나라들</h2>
			<form onSubmit={handleSubmit(onValid, onInvalid)}>
				<input
					{...register("name", {
						required: "Required!",
					})}
					type="text"
					placeholder="이름"
				/>
				{errors.name && (
					<span style={{ color: "tomato" }}>
						{errors.name.message}
						<br />
					</span>
				)}
				<button>가자!</button>
			</form>
			<h2>내가 가본 나라들</h2>
			<div></div>
			<h2>내가 좋아하는 나라들</h2>
			<div></div>
		</main>
	);
}
