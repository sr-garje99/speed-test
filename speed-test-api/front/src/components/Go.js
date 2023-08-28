import { useNavigate } from 'react-router-dom';
import Details from '../pages/Details';
import '../App.css';

import TitleBar from './TitleBar';
const Go = () => {
	let navigate = useNavigate();
	const onClickHandler = () => {
		if(navigator.onLine){
		navigate(`/details`);
	}else{
		alert("Please connect to Internet !")
	}
	};
	return (
		<div className="App">
			<TitleBar />
			<header className="App-header">
				{/* <Go /> */}
				
				<button class="testButton" onClick={onClickHandler}>
					Go
				</button>
			</header>
		</div>
	);
};
export default Go;
