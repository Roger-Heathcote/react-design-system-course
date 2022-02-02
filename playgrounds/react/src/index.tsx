import React from 'react'
import ReactDOM from 'react-dom'

import { Button, Color, Image } from '@r0g/react-course-react'
import '@r0g/react-course-scss/lib/Button.css'
import '@r0g/react-course-scss/lib/Utilities.css'

ReactDOM.render(
    <>
        <Button label="Example Button" />
        <Color hexCode="#000" width="xxl" />
        <Image url="https://v1.nexty.pictures/get/814dffeccb43a3c01a9c3425c929184dd34d9339e963b6ec0492de13db464afe.webp" />
    </>,
    document.querySelector("#root")
)