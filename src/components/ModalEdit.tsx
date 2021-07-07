import { useEffect, useState } from 'react'
import { Modal, Button, Form, Checkbox } from 'antd';
import { IFormData } from '../types';
import styled from 'styled-components';
import { FieldInput } from '.';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useForm } from 'antd/lib/form/Form';

interface IModalEditProps {
    data: IFormData;
    edit: (uid: string, values: IFormData) => void;
}

const ModalEdit = ({data, edit}: IModalEditProps) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [check, setCheck] = useState<boolean>(false);
    const [form] = useForm<IFormData>();

    const initialValues: Partial<IFormData> = {
        name: data.name,
        surname: data.surname,
        city: data.city,
    }
    
    const Box = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        @media (max-width: 768px) {
            flex-direction: column;
        }
    `;

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFinish = (values: IFormData) => {
        if(check){
            if(data.id) edit(data.id, values);
            handleCancel();
        }
    }

    const handleCheck = (e: CheckboxChangeEvent) => {
        setCheck(e.target.checked);
    }

    useEffect(() => {
        form.setFieldsValue({
            name: data.name,
            surname: data.surname,
            city: data.city,
        })
    }, [data, form]);

    return (
        <>
            <Button className="button_edit" type="text" onClick={showModal}>
                Edit
            </Button>
            <Modal className="modalx" title={`${data.name} ${data.surname}`} visible={isModalVisible} footer={false} onCancel={handleCancel}>
                <Form form={form} onFinish={handleFinish}>
                    <Box>
                        <FieldInput required={false} fieldname="name" />
                        <FieldInput required={false} fieldname="surname" />
                        <FieldInput required={false} fieldname="city" />
                    </Box>
                    <Box>
                        <Checkbox checked={check} onChange={handleCheck}>Totally agree</Checkbox>
                        <Button htmlType="submit" type="primary">SAVE</Button>
                    </Box>
                </Form>
            </Modal>
        </>
    )
};

export default ModalEdit;
