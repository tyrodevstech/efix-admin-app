import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const [crudLoading, setCrudLoading] = useState(false);

	return (
		<LoadingContext.Provider
			value={{
				crudLoading,
				setCrudLoading,
			}}>
			{children}
		</LoadingContext.Provider>
	);
};
