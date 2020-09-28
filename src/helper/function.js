import moment from "moment";
const renderEventFromArray = (events = []) => {
	return events?.map((event, index) => {
		return {
			event: event,
			title: `${event?.meta_activity.name}`,
			start: new Date(moment(event?.date_start)),
			end: new Date(moment(event?.date_start).add("minute", event?.duration_minute)),
		};
	});
};
export { renderEventFromArray };
