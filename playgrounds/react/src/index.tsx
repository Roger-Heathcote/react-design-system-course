import React from 'react'
import ReactDOM from 'react-dom'

// import { Text, Margin, Select } from '@r0g/react-course-react'
import { Select } from '@r0g/react-course-react'
import '@r0g/react-course-scss/lib/Utilities.css'
import '@r0g/react-course-scss/lib/Text.css'
import '@r0g/react-course-scss/lib/Margin.css'
import '@r0g/react-course-scss/lib/Select.css'
import '@r0g/react-course-scss/lib/global.css'

const options = [
    {
        label: 'Strict Black',
        value: 'strict-black'
    },{
        label: 'Heavenly Green',
        value: 'heavenly-green'
    },{
        label: 'Sweet Pink',
        value: 'pink'
    }
]


ReactDOM.render(
    <div>
        <Select options={options}/>
        <p>This is some text</p>
    </div>,
    document.querySelector("#root")
)

// ReactDOM.render(
//     <div>
//         <Margin space="none">
//             <Text size='xs'>This is some text</Text>
//         </Margin>
//     </div>,
//     document.querySelector("#root")
// )

// ReactDOM.render(
//     <>
//         <Button label="Example Button" />
//         <Color hexCode="#000" width="xxl" />
//         <Image url="https://v1.nexty.pictures/get/814dffeccb43a3c01a9c3425c929184dd34d9339e963b6ec0492de13db464afe.webp" />
//     </>,
//     document.querySelector("#root")
// )
