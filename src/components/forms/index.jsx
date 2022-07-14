import React from 'react';
import { Controller } from 'react-hook-form';
import {
	Input,
	FormControl,
	Icon,
	Select,
	CheckIcon,
	TextArea,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
export const CustomInput = ({
	type,
	name,
	label,
	control,
	placeholder,
	rules = {},
	errors,
	isDisabled = false,
	isRequired = true,
	isReadOnly = false,
	InputRightElement = null,
}) => {
	return (
		<FormControl isRequired={isRequired} isInvalid={name in errors} mb='1'>
			<FormControl.Label>{label}</FormControl.Label>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<Input
							onBlur={onBlur}
							placeholder={placeholder}
							onChangeText={(val) => onChange(val)}
							value={value}
							type={type}
							isDisabled={isDisabled}
							isReadOnly={isReadOnly}
							InputRightElement={InputRightElement}
							InputLeftElement={
								<Icon
									m='2'
									ml='3'
									size='6'
									color='gray.400'
									as={<Ionicons name='create-outline' />}
								/>
							}
						/>
						<FormControl.ErrorMessage>
							{errors[name]?.message}
						</FormControl.ErrorMessage>
					</>
				)}
				name={name}
				rules={rules}
				defaultValue=''
			/>
		</FormControl>
	);
};

export const CustomSelect = ({
	name,
	label,
	control,
	placeholder,
	selectItems = [],
	rules = {},
	errors,
	isDisabled = false,
	isRequired = true,
}) => {
	return (
		<FormControl isRequired={isRequired} isInvalid={name in errors} mb='1'>
			<FormControl.Label>{label}</FormControl.Label>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<Select
							minWidth='200'
							onBlur={onBlur}
							placeholder={placeholder}
							accessibilityLabel='Choose Service'
							selectedValue={value}
							_selectedItem={{
								bg: 'muted.200',
								color: 'white',
								endIcon: <CheckIcon ml='auto' size={5} />,
							}}
							onValueChange={(val) => onChange(val)}
							isDisabled={isDisabled}>
							{selectItems.map((item, index) => (
								<Select.Item
									key={index}
									label={item.label}
									value={item.value}
								/>
							))}
						</Select>

						<FormControl.ErrorMessage>
							{errors[name]?.message}
						</FormControl.ErrorMessage>
					</>
				)}
				name={name}
				rules={rules}
				defaultValue=''
			/>
		</FormControl>
	);
};

export const CustomTextArea = ({
	name,
	label,
	control,
	placeholder,
	rules = {},
	errors,
	isDisabled = false,
	isRequired = true,
	isReadOnly = false,
}) => {
	return (
		<FormControl isRequired={isRequired} isInvalid={name in errors} mb='1'>
			<FormControl.Label>{label}</FormControl.Label>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<TextArea
							onBlur={onBlur}
							placeholder={placeholder}
							onChangeText={(val) => onChange(val)}
							value={value}
							isDisabled={isDisabled}
							isReadOnly={isReadOnly}
							// InputLeftElement={
							// 	<Icon
							// 		m='2'
							// 		ml='3'
							// 		size='6'
							// 		color='gray.400'
							// 		as={<Ionicons name='create-outline' />}
							// 	/>
							// }
						/>
						<FormControl.ErrorMessage>
							{errors[name]?.message}
						</FormControl.ErrorMessage>
					</>
				)}
				name={name}
				rules={rules}
				defaultValue=''
			/>
		</FormControl>
	);
};
