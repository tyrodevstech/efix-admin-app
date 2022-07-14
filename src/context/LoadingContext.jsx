import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [crudLoading, setCrudLoading] = useState(false);

	return (
		<LoadingContext.Provider
			value={{
				isLoading,
				crudLoading,
				setIsLoading,
				setCrudLoading,
			}}>
			{children}
		</LoadingContext.Provider>
	);
};
