import { Alert } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../global';
import { LoadingContext } from './LoadingContext';
import { AuthContext } from './AuthContext';

export const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
	const [areas, setAreas] = useState([]);
	const [services, setService] = useState([]);
	const [invoices, setInvoices] = useState([]);
	const { setIsLoading, setCrudLoading } = useContext(LoadingContext);
	const { authToken } = useContext(AuthContext);
	const header = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${authToken}`,
		},
	};

	// Requested Service
	const getService = async () => {
		setIsLoading(true);
		await axios
			.get(`${BASE_URL}/api/service_request/`, header)
			.then((response) => {
				setService(response.data);
			})
			.catch((error) => console.log(error));
		setIsLoading(false);
	};
	const updateService = async (data,id) => {
		setIsLoading(true);
		await axios
			.patch(`${BASE_URL}/api/service_request/${id}`,data, header)
			.then((response) => Alert.alert('Success', 'Service updated successfully'))
			.catch((error) => console.log(error));
		setIsLoading(false);
	};

	// Invoice
	const getInvoices = async () => {
		setIsLoading(true);
		await axios
			.get(`${BASE_URL}/api/invoice/`, header)
			.then((response) => {
				setInvoices(response.data);
			})
			.catch((error) => console.log(error.response?._response));
		setIsLoading(false);
	};
	const handlePaymentStatus = (id, status) => {
		Alert.alert(
			'Confirm?',
			`Are you sure you want to update payment status to ${
				status === 'Paid' ? 'Unpaid' : 'Paid'
			}?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'OK',
					onPress: async () => {
						setCrudLoading(true);
						await axios
							.patch(
								`${BASE_URL}/api/invoice/${id}/`,
								{ status: status === 'Paid' ? 'Unpaid' : 'Paid' },
								header,
							)
							.then((res) => {
								Alert.alert(
									'Success',
									`Payment Status Updated to ${
										status === 'Paid' ? 'Unpaid' : 'Paid'
									} successfully`,
								);
								getInvoices();
							})
							.catch((error) => {
								for (const [key, value] of Object.entries(
									error.response.data,
								)) {
									Alert.alert('Error', String(value));
								}
							});
						setCrudLoading(false);
					},
				},
			],
		);
	};
	const updateInvoice = async (data, id) => {
		setCrudLoading(true);
		const formData = {
			details: data.details,
			tech_charge: parseFloat(data.tech_charge),
			equip_charge: parseFloat(data.equip_charge),
			status: data.status,
		};
		await axios
			.patch(`${BASE_URL}/api/invoice/${id}/`, formData, header)
			.then((res) => Alert.alert('Success', 'Invoice updated successfully'))
			.catch((error) => {
				for (const [key, value] of Object.entries(error.response.data)) {
					Alert.alert('Error', String(value));
				}
			});
		setCrudLoading(false);
	};
	// Working Area
	const getAreas = async () => {
		setIsLoading(true);
		await axios
			.get(`${BASE_URL}/api/area/`, header)
			.then((response) => {
				setAreas(response.data);
			})
			.catch((error) => console.log(error));
		setIsLoading(false);
	};
	const createArea = async (area, setArea, setShowModal) => {
		if (area === '') {
			Alert.alert('Error', 'Area cannot be empty !!!');
		} else {
			setCrudLoading(true);
			const data = { area_name: area };

			await axios
				.post(`${BASE_URL}/api/area/`, data, header)
				.then((response) => {
					Alert.alert('Success', 'Area added successfully');
					setShowModal(false);
					setArea('');
					getAreas();
				})
				.catch((error) => console.log(error));
			setCrudLoading(false);
		}
	};
	const updateArea = async (id, area, setArea, setShowModal) => {
		if (area === '') {
			Alert.alert('Error', 'Area cannot be empty !!!');
		} else {
			setCrudLoading(true);
			const data = { area_name: area };
			await axios
				.patch(`${BASE_URL}/api/area/${id}/`, data, header)
				.then((response) => {
					Alert.alert('Success', 'Area updated successfully');
					setShowModal(false);
					setArea('');
					getAreas();
				})
				.catch((error) => console.log(error));
			setCrudLoading(false);
		}
	};

	const deleteArea = (id) => {
		Alert.alert('Delete?', 'Are you sure you want to delete?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: async () => {
					setCrudLoading(true);
					await axios
						.delete(`${BASE_URL}/api/area/${id}/`,header)
						.then((response) => {
							Alert.alert('Success', 'Area deleted successfully');
							getAreas();
						})
						.catch((error) => console.log(error));
					setCrudLoading(false);
				},
			},
		]);
	};

	return (
		<ActionContext.Provider
			value={{
				services,
				invoices,
				areas,
				getService,
				updateService,
				getInvoices,
				updateInvoice,
				handlePaymentStatus,
				setAreas,
				getAreas,
				createArea,
				updateArea,
				deleteArea,
			}}>
			{children}
		</ActionContext.Provider>
	);
};
