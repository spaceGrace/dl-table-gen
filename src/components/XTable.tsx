import styled from 'styled-components';
import { Button, Table } from 'antd';
import { IFormData } from '../types';
import { ReactComponent as CloseImg } from '../img/close.svg';
import { useDispatch } from 'react-redux';
import { rowEdit, updateInit } from '../store';
import { ModalEdit } from '.';

interface IXTableProps {
    data: IFormData[];
    tabId: string;
    copy: (data: IFormData[]) => void;
    remove?: () => void;
}

const XTable = ({ tabId, data, copy, remove }: IXTableProps) => {

    const TheTable = styled.div`
        width: 100%;
        .ant-table-tbody {
            background-color: #fff;
            font-size: 12px;
        }
        .ant-table-thead > tr > th {
            background-color: #0a508c;
            color: #9baec7;
            font-size: 12px;
        }
        .ant-table-tbody > tr > td {
            border-left: 1px solid #f0f0f0;
        }
        .button_edit span {
            text-decoration: underline;
            color: #067ce1;
        }
        .button_delete span {
            text-decoration: underline;
            color: #bb4052;
        }
    `;
    const TheTableBody = styled.div`
        @media (max-width: 768px) {
            overflow-x: scroll;
        }
    `;

    const TheTableHeader = styled.div`
        position: relative;
        height: 60px;
        padding-top: 10px;
        padding-bottom: 10px;
    `;

    const TheTableControl = styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        right: 0;
    `;

    const dispatch = useDispatch();

    const handleRemove = (d: IFormData) => {
        const arrr = data.filter((i) => i.id !== d.id);
        if(tabId === 'init'){
            dispatch(updateInit(arrr));
        }else {
            dispatch(rowEdit({id: tabId, changes: {
                data: arrr
            }}))
        }
    }

    const handleEditUser = (uid: string, values: IFormData) => {
        const arrr = data.map((item) => {
            if(item.id === uid){
                const obj = {
                    id: item.id,
                    name: values.name || item.name,
                    surname: values.surname || item.surname,
                    city: values.city || item.city,
                    age: item.age,
                }
                return obj;
            }
            return item;
        });
        if(tabId === 'init'){
            dispatch(updateInit(arrr));
        }else {
            dispatch(rowEdit({id: tabId, changes: {
                data: arrr
            }}))
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'name',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'name',
        },
        {
            title: '',
            dataIndex: '',
            render: (item: IFormData) => {
                return (
                    <div>
                        <ModalEdit data={item} edit={handleEditUser} />
                        <Button className="button_delete" onClick={() => handleRemove(item)} type="text">Delete</Button>
                    </div>
                )
            },
        }
    ];


    return (
        <TheTable>
            <TheTableHeader>
                <TheTableControl>
                    <Button onClick={() => copy(data)} type="primary">copy table</Button>
                    {remove && <Button onClick={remove} type="text"><CloseImg /></Button>}
                </TheTableControl>
            </TheTableHeader>
            <TheTableBody>
                <Table pagination={false} dataSource={data} columns={columns} />
            </TheTableBody>
        </TheTable>
    )
}

export default XTable;