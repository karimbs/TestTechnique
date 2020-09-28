import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.compact.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const CustomEvent = (props) => {
	if (props.title && props.title.length > 0) {
		const [title, service] = props.title.split("\n");
		return (
			<div>
				<div>
					<span className="event-name">{title ? title : ""}</span>
				</div>
				<div className="event-title">{service ? service : ""}</div>
			</div>
		);
	}
	return (
		<div>
			<div>
				<span className="event-name-client" />
			</div>
			<div className="event-title" />
		</div>
	);
};
class EventCalendar extends React.Component {
	state = {
		today: moment("2019-07-22"),
	};
	eventStyleGetter = (event, start, end, isSelected) => {
		let backgroundColor = "#fff";
		let border = "4px solid #2eba44";

		var style = {
			backgroundColor: backgroundColor,
			borderRadius: "0px",
			color: "#000",

			borderTop: "1px solid #ddd",
			borderBottom: "1px solid #ddd",
			borderRight: "1px solid #ddd",
			borderLeft: border,
			boxShadow:
				"0 0.46875rem 2.1875rem rgba(8, 10, 37, 0.03), 0 0.9375rem 1.40625rem rgba(8, 10, 37, 0.03), 0 0.25rem 0.53125rem rgba(8, 10, 37, 0.05), 0 0.125rem 0.1875rem rgba(8, 10, 37, 0.03);",
		};
		return {
			style: style,
		};
	};
	render() {
		return (
			<DragAndDropCalendar
				localizer={localizer}
				events={this.props.events}
				defaultView={BigCalendar.Views.WEEK}
				components={{
					event: CustomEvent,
					//toolbar:CustomToolbar
				}}
				step={30}
				timeslots={4}
				date={new Date(this.state.today)}
				eventPropGetter={this.eventStyleGetter}
				startAccessor="start"
				endAccessor="end"
                onSelectEvent={this.props.onSelect}
				onNavigate={(day, view) => {
					console.log(moment(day).format("YYYY-MM-DD"));
					this.setState({
						today: moment(day).format("YYYY-MM-DD"),
						calandarView: view,
					});
				}}
			/>
		);
	}
}
export default EventCalendar;
