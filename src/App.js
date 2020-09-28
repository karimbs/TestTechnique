import React from "react";
import Home from "./containers/Home";
import VerticalLayout from "./Layout/VerticalLayout";
function App() {
	return (
		<React.Fragment>
			<VerticalLayout>
				<Home />
			</VerticalLayout>
		</React.Fragment>
	);
}

export default App;
