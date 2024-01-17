import { render } from 'preact';
import './assets/style.scss'
import * as bootstrap from 'bootstrap'
import './style.css';
import { useEffect, useState } from 'preact/hooks';
import { FaSearchLocation } from "react-icons/fa";
import { Container, Form, InputGroup } from 'react-bootstrap';
import axiosInstance from './core/axios';
import { useLonLatStore } from './core/state';

function CurrentPosition() {
	const [lon, lat, radius, setLonLat, setRadius] = useLonLatStore((state) => (
		[state.lon, state.lat, state.radius, state.setLonLat, state.setRadius])
	);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLonLat(position.coords.longitude, position.coords.latitude);
				setRadius(position.coords.accuracy)
			},
			(err) => {
				console.log(err);
			},
			{
				enableHighAccuracy: false,
				timeout: 10000,
				maximumAge: 60000,
			}
		);
	},[]);

	return (
		<div>
			<h1>Current Position</h1>
			<h2>{lon}, {lat}</h2>
			<h2>Accurate to {radius} metres</h2>
		</div>
	);
}


function LocationSearch() {

	const [lon, lat, rad] = useLonLatStore((state) => (
		[state.lon, state.lat, state.radius]
	));

	function handleSearch(query: string) {
		console.log('search: ', query);
		axiosInstance.get(`LocalSearch/?q=${query}&ucmv=${lat},${lon},5000`).then((response) => {
			console.log(response.data);
		}).catch((error) => {
			console.log(error);
		});
	}
	return (
		<InputGroup className="mb-3">
			<InputGroup.Text id="basic-addon1">
				<FaSearchLocation />
			</InputGroup.Text>
			<Form.Control onKeyUp={
				(e) => {
					if (e.key === 'Enter') {
						handleSearch(e.currentTarget.value)
					}
				}
			}
				type="text"
				placeholder="Search for a location"
				aria-label="Search for a location"
			/>
		</InputGroup>
	)
}

export function App() {
	return (
		<Container>
			<LocationSearch />
			<CurrentPosition />
		</Container>
	);
}

render(<App />, document.getElementById('app'));
