import { Alert } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../global';
import { LoadingContext } from './LoadingContext';
import { AuthContext } from './AuthContext';
import { handleError } from '../utils';

export const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
	const [areas, setAreas] = useState([]);
	const [services, setService] = useState([]);
	const [invoices, setInvoices] = useState([]);
	const { setCrudLoading } = useContext(LoadingContext);
	const { authToken } = useContext(AuthContext);
	const [showAreaModal, setShowAreaModal] = useState(false);
	const [areaMode, setAreaMode] = useState('Create');

	const header = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${authToken}`,
		},
	};

	// Requested Service
	const getService = async ({ search, setPageLoading }) => {
		await axios
			.get(
				`${BASE_URL}/api/service_request?search=${search ? search : ''}`,
				header,
			)
			.then((response) => {
				setService(response.data);
			})
			.catch((error) => handleError(error));
		if (setPageLoading) setPageLoading(false);
	};
	const updateService = async (data, id) => {
		setCrudLoading(true);
		await axios
			.patch(`${BASE_URL}/api/service_request/${id}/`, data, header)
			.then((response) =>
				Alert.alert('Success', 'Service updated successfully'),
			)
			.catch((error) => handleError(error));
		setCrudLoading(false);
	};

	// Invoice
	const getInvoices = async ({ search, setPageLoading }) => {
		await axios
			.get(`${BASE_URL}/api/invoice?search=${search ? search : ''}`, header)
			.then((response) => {
				setInvoices(response.data);
			})
			.catch((error) => handleError(error));
		if (setPageLoading) setPageLoading(false);
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
							.catch((error) => handleError(error));
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
			.catch((error) => handleError(error));
		setCrudLoading(false);
	};
	// Working Area
	const getAreas = async ({ search, setPageLoading }) => {
		await axios
			.get(`${BASE_URL}/api/area?search=${search ? search : ''}`, header)
			.then((response) => {
				setAreas(response.data);
			})
			.catch((error) => handleError(error));
		if (setPageLoading) setPageLoading(false);
	};
	const createArea = async (area, setArea, setShowAreaModal) => {
		if (area === '') {
			Alert.alert('Error', 'Area cannot be empty !!!');
		} else {
			setCrudLoading(true);
			const data = { area_name: area };

			await axios
				.post(`${BASE_URL}/api/area/`, data, header)
				.then((response) => {
					Alert.alert('Success', 'Area added successfully');
					setShowAreaModal(false);
					setArea('');
					getAreas();
				})
				.catch((error) => handleError(error));
			setCrudLoading(false);
		}
	};
	const updateArea = async (id, area, setArea, setShowAreaModal) => {
		if (area === '') {
			Alert.alert('Error', 'Area cannot be empty !!!');
		} else {
			setCrudLoading(true);
			const data = { area_name: area };
			await axios
				.patch(`${BASE_URL}/api/area/${id}/`, data, header)
				.then((response) => {
					Alert.alert('Success', 'Area updated successfully');
					setShowAreaModal(false);
					setArea('');
					getAreas();
				})
				.catch((error) => handleError(error));
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
						.delete(`${BASE_URL}/api/area/${id}/`, header)
						.then((response) => {
							Alert.alert('Success', 'Area deleted successfully');
							getAreas();
						})
						.catch((error) => handleError(error));
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
				showAreaModal,
				areaMode,
				areas,
				setService,
				getService,
				updateService,
				setInvoices,
				getInvoices,
				updateInvoice,
				handlePaymentStatus,
				setShowAreaModal,
				setAreaMode,
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
