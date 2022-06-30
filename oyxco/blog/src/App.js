import './App.css';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function App() {
  const props = {
    name: 'file',
    action: 'http://localhost:3000/upload/pic',
    headers: {
      
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  return (
    <div className="App">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>,
    </div>
  );
}

export default App;
