import { useState } from 'react';
import { Form, Input } from 'antd';

interface IFieldInputProp {
    fieldname: string;
    required: boolean;
}

const FieldInput = ({fieldname, required}: IFieldInputProp) => {
    const { Item } = Form;

    const capitalize = (txt: string) => `${txt[0].toUpperCase()}${txt.slice(1)}`;

    const [placeholder, setPlaceholder] = useState(capitalize(fieldname));

    const handleFocus = () => setPlaceholder('');
    const handleBlur = () => setPlaceholder(capitalize(fieldname));

    return (
        <Item rules={[{ required: required, message: `${capitalize(fieldname)} is required` }]} name={fieldname}>
            <Input onFocus={handleFocus} onBlur={handleBlur} placeholder={placeholder} />
        </Item>
    )
}

export default FieldInput;