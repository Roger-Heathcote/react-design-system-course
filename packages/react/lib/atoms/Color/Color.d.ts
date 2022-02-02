import React from 'react';
import { Spacing } from '@r0g/react-course-foundation';
interface ColorProps {
    hexCode: string;
    width: keyof typeof Spacing;
    height?: keyof typeof Spacing;
}
declare const Color: React.FC<ColorProps>;
export default Color;
