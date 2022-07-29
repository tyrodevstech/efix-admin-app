import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../global';
import { AuthContext } from './AuthContext';
import { handleError } from '../utils';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
	const { authToken } = useContext(AuthContext);
	const [due, setDue] = useState(null);

	const header = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${authToken}`,
		},
	};

	const getTotalDue = async () => {
		await axios
			.get(`${BASE_URL}/api/transaction?total=pd`, header)
			.then((response) => {
				setDue(response.data);
			})
			.catch((error) => handleError(error));
	};

	return (
		<TransactionContext.Provider
			value={{
				due,
				getTotalDue,
			}}>
			{children}
		</TransactionContext.Provider>
	);
};
