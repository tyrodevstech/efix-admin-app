import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../global';
import { AuthContext } from './AuthContext';
import { handleError } from '../utils';

export const MiscellaneousContext = createContext();

export const MiscellaneousProvider = ({ children }) => {
	const { authToken } = useContext(AuthContext);
	const [totalAccount, setTotalAccount] = useState(null);

	const header = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${authToken}`,
		},
	};

	const getTotalAccount = async () => {
		await axios
			.get(`${BASE_URL}/api/miscellaneous?total=account`, header)
			.then((response) => {
				setTotalAccount(response.data);
			})
			.catch((error) => handleError(error));
	};

	return (
		<MiscellaneousContext.Provider
			value={{
				totalAccount,
				getTotalAccount,
			}}>
			{children}
		</MiscellaneousContext.Provider>
	);
};
