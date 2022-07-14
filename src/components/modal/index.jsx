import { Button, Icon, Input, Modal } from 'native-base';
import { useContext, useState } from 'react';
import { ActionContext } from '../../context/ActionContext';
import { Ionicons } from '@expo/vector-icons';

export const CustomModal = () => {
	const { createArea, showModal, setShowModal } = useContext(ActionContext);
	const [area, setArea] = useState('');
	return (
		<>
			<Button onPress={() => setShowModal(true)}>Add Area</Button>
			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				animationPreset='slide'>
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header borderBottomWidth={0}>Add Area</Modal.Header>
					<Modal.Body m='0' p='0' px='5'>
						<Input
							placeholder='Area Name'
							onChangeText={(val) => setArea(val)}
							value={area}
							type='text'
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
					</Modal.Body>
					<Modal.Footer borderTopWidth={0}>
						<Button.Group space={2}>
							<Button
								variant='ghost'
								colorScheme='blueGray'
								onPress={() => {
									setShowModal(false);
								}}>
								Cancel
							</Button>
							<Button onPress={() => createArea(area)}>Save</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</>
	);
};
