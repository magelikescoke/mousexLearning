import React, {useState} from "react";
import { Tabs } from "dw-mx";
import FormExercise from "./FormExercise";
export default function TabsTest() {
    const {TabPane} = Tabs
    const [activeKey, setActiveKey] = useState("1");
    const onChange = (e)=>{
        setActiveKey(e)
    }
    const tabs = () => {
        if(activeKey == '1')
            return <FormExercise/>
        else return <div>tab2</div>
    }
    return (
        <div>
            <Tabs defaultActiveKey='1' activeKey={activeKey} type='card' onChange={onChange}>
                <TabPane tab='form' key="1">
                </TabPane>
                <TabPane tab='table' key="2">
                </TabPane>
            </Tabs>
            {tabs()}
        </div>
    )
}