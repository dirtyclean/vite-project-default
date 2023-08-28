/**
 * Component list, register here to setting it in the form
 */
import {
  Input,
  Select,
  Radio,
  Checkbox,
  Cascader,
  DatePicker,
  InputNumber,
  Switch,
  TreeSelect,
  Tree,
  Slider,
  Rate,
  Divider,
  Upload,
} from 'ant-design-vue';

const componentMap = {
  Input,
  InputGroup: Input.Group,
  InputPassword: Input.Password,
  InputSearch: Input.Search,
  InputTextArea: Input.TextArea,
  InputNumber,
  Select,
  TreeSelect,
  Tree,
  Switch,
  RadioGroup: Radio.Group,
  Checkbox,
  CheckboxGroup: Checkbox.Group,
  Cascader,
  Slider,
  Rate,
  DatePicker,
  MonthPicker: DatePicker.MonthPicker,
  RangePicker: DatePicker.RangePicker,
  WeekPicker: DatePicker.WeekPicker,
  Upload,
  Divider,
};

export type ComponentMapType = keyof typeof componentMap;

export { componentMap };
