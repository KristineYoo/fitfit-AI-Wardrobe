
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, {
    FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

interface StyledFormControlLabelProps extends FormControlLabelProps {
    checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
    <FormControlLabel {...props} />
))(({ theme }) => ({
    variants: [
        {
            props: { checked: true },
            style: {
                '.MuiFormControlLabel-label': {
                    color: theme.palette.primary.main,
                },
            },
        },
    ],
}));

function DisplayButton(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function UseRadioGroup() {
    return (
        <RadioGroup name="use-radio-group" defaultValue="first">
            <DisplayButton value="first" label="Yes" control={<Radio />} />
            <DisplayButton value="second" label="No" control={<Radio />} />
        </RadioGroup>
    );
}