import { useSelector } from 'react-redux';
import { IFormData, IRootState } from '../types';
import { XTable } from '../components';
import { selectAllCopies } from '../store';
import styled from 'styled-components';

interface ITablesBlockProps {
    copy: (data: IFormData[]) => void;
    remove: (id: string) => void;
}

const TablesBlock = ({copy, remove}: ITablesBlockProps) => {
    const Block = styled.section`
        width: 100%;
        margin-top: 15px;
    `;
    
    const Copies = styled.section`
        width: 100%;
    `;

    const initTable = useSelector((state: IRootState) => state.init);
    const rowTables = useSelector(selectAllCopies);
    
    return (
        <Block>
            <XTable tabId={initTable.id} copy={copy} data={initTable.data} />
            <Copies>
                {rowTables && rowTables.map((tab) => <XTable copy={copy} remove={() => remove(tab.id)} data={tab.data} key={tab.id} tabId={tab.id}/>)}
            </Copies>
        </Block>
    )
};

export default TablesBlock;
