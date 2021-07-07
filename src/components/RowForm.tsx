import { Button } from 'antd';
import styled from 'styled-components';
import { FieldInput } from './';

interface IRowFormProps {
    formfactor: string;
}

const RowForm = (props: IRowFormProps) => {
    const { formfactor } = props;

    const TheForm = styled.div`
        width: ${formfactor === 'column' ? '280px' : '540px'};
        padding: 20px;
        background-color: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: ${formfactor};
        justify-content: space-around;
        margin: 15px;
        .ant-row {
            width: ${formfactor === 'row' ? '49%' : '100%'};
        }
        @media (max-width: 768px) {
           width: 100%;
        }
    `;
 
    return (
        <TheForm>
            <FieldInput required fieldname="name" />
            <FieldInput required fieldname="surname" />
            <FieldInput required fieldname="age" />
            <FieldInput required fieldname="city" />
            <Button htmlType="submit" type="primary">ADD</Button>
        </TheForm>
    )
};

export default RowForm;
