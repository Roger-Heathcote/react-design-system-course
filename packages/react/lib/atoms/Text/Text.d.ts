import React from 'react';
import { FontSize } from '@r0g/react-course-foundation';
interface TextProps {
    size?: keyof typeof FontSize;
}
declare const Text: React.FC<TextProps>;
export default Text;
