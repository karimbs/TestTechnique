import React from "react";
import {
	Card,
	Col,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	Row,
} from "reactstrap";
import EventCalendar from "../../components/Calendar";
import { renderEventFromArray } from "../../helper/function";
import { EventProvider, useEventContext } from "../EventsContext";

const HomeContainer = () => {
	const [selectedEvent, setSelectedEvent] = React.useState(null);
	const [visible, setVisible] = React.useState(false);
	const {
		events,
		filter,
		function: { handleChangeFilter },
	} = useEventContext();
	function handleSelect(event = null) {
		console.log({ event });
		if (event) setSelectedEvent(event?.event);
		handleModal();
	}
	function handleModal() {
		setVisible(!visible);
	}
	return (
		<div className="d-flex">
			<Modal isOpen={visible} toggle={handleModal}>
				<ModalBody>
					<div className="d-flex">
						<img src={selectedEvent?.meta_activity?.cover_main} alt="activity" className="activity-img" />
						<div className="d-flex flex-column">
							<span className="text-base">{selectedEvent?.meta_activity?.name}</span>
							<span className="text-sm text-gray">{selectedEvent?.meta_activity?.description}</span>
						</div>
					</div>
					<div className="d-flex align-items-center">
						<img src={selectedEvent?.coach?.photo} alt="coach" className="coach-img" />
						<div className="d-flex flex-column">
							<span className="text-base">{selectedEvent?.coach?.name}</span>
							<span className="text-sm">{selectedEvent?.coach?.email}</span>
							<span className="text-sm">{selectedEvent?.coach?.birthday}</span>
							</div>
					
					</div>
				</ModalBody>
			</Modal>
			<Col md="2" sm="12" lg="2">
				<Card className="p-2 side-bar">
					<div className="bg-grey">
						<span className="h5">Filter</span>
					</div>
					<Row className="mt-2">
						<Col>
							<FormGroup>
								<span>Date min</span>
								<Input
									type="date"
									name="min_date"
									onChange={handleChangeFilter}
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<span>Date min</span>
								<Input
									type="date"
									name="max_date"
									onChange={handleChangeFilter}
								/>
							</FormGroup>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col md="10" sm="12" lg="10" className="ml-1">
				<EventCalendar
					onSelect={handleSelect}
					events={renderEventFromArray(events)}
				/>
			</Col>
		</div>
	);
};

export default function Home() {
	return (
		<EventProvider>
			<HomeContainer />
		</EventProvider>
	);
}
