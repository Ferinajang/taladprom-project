import React, { useState } from 'react'
import { Checkbox, Collapse ,Row,Col} from 'antd';

const { Panel } = Collapse

function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    
    const handleToggle = (value)=>{

        const currentIndex = Checked.indexOf(value);
        const newChecked =[...Checked];
        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)

        }
        // setChecked(value :React.SetStateAction<any[]>):void
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }
    
    const renderCheckboxList = () =>
      props.list &&
      props.list.map((value, index) => (
        <React.Fragment key={index}>
          <Row>
            <Col >
              <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
              ></Checkbox>
              <span>{" "}{value.name}</span>
              {"  "}
            </Col>
          </Row>
        </React.Fragment>
      ));
  return (
    <div>
    <Collapse defaultActiveKey={['0']}>
        <Panel header="ชนิดของสินค้า" key="1">
           {renderCheckboxList()}
        </Panel>
    </Collapse>
    </div>
  )
}

export default CheckBox