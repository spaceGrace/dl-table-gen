import { Layout, RowForm, TablesBlock } from './components';
import { IFormData, ITableData } from './types';
import { Form } from 'antd';
import 'antd/dist/antd.css';
import './main.scss';
import { rowAdd, addUser, rowDelete } from './store';
import { useDispatch } from 'react-redux';
import nextId from "react-id-generator";

const App = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const addOneRow = (data: IFormData[]) => {
    const id = nextId();
    const table: ITableData = {
      id,
      data
    };
    dispatch(rowAdd(table));
  };

  const removeRow = (id: string) => {
    dispatch(rowDelete(id));
  }

  const handleFinish = (values: IFormData) => {
    const uid = nextId('user');
    const user = {id: uid, ...values};
    dispatch(addUser(user));
  };

  return (
    <Layout>
      <Form onFinish={handleFinish} form={form}>
        <RowForm formfactor="column" />
        <RowForm formfactor="row" />
      </Form>
      <TablesBlock copy={addOneRow} remove={removeRow} />
    </Layout>
  );
}

export default App;
