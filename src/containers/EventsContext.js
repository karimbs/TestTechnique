import React from "react";
import axios from "../config/axios";
const EventContext = React.createContext();
const ApiEndpoint = {
	coach: "/api/v1/associated_coach",
	activity: "api/v1/meta-activity",
};
const EventProvider = (props) => {
	const [events, setEvents] = React.useState([]);
	const [filter, setFilter] = React.useState({
		min_date: "2019-07-20",
		max_date: "2019-07-30",
	});
	const getCoach = async (event) => {
		return await axios
			.get(`${ApiEndpoint.coach}/?company=6&id__in=${event?.coach}`)
			.then((res) => res.data[0]);
	};
	const getActivity = async (event) => {
		return await axios
			.get(`${ApiEndpoint.activity}/${event?.meta_activity}`)
			.then((res) => res.data);
	};
	const getEvents =()=>{
		function renderQuery() {
			if (filter?.min_date && filter?.max_date)
				return `/api/v1/offer/?company=6&min_date=${filter?.min_date}&max_date=${filter?.max_date}&page_size=10`;
			return "/api/v1/offer/?company=6&page_size=10";
		}
		return new Promise((resolve,reject)=>{
			axios.get(renderQuery()).then(async (response) => {
				let tab =[];
				let res= response.data.results;
				for (let index = 0; index < res.length; index++) {
					const event = res[index];
					Promise.all([
						getCoach(event),
						getActivity(event),
					]).then(([coach,activity]) => {
						event.coach =coach;
						event.meta_activity =activity;
						tab.push(event);
					});
					
				}
				setTimeout(()=>{
					resolve(tab)
				},1000)
				
			});
		})
	}
	React.useEffect(() => {
		getEvents().then(results=>{
			setEvents(results);
		})

	}, [filter]);

	function handleChangeFilter({ target: { name, value } }) {
		setFilter({ ...filter, [name]: value });
	}
	return (
		<EventContext.Provider
			value={{ events, filter, function: { handleChangeFilter } }}
		>
			{props.children}
		</EventContext.Provider>
	);
};
const useEventContext = () => React.useContext(EventContext);
export { EventProvider, useEventContext };
