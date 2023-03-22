import { Chip } from '@mui/material';

export default function CustomChip(props) {
  return (
    <Chip
      style={{
        background:
          props.variant == 'gradient'
            ? 'linear-gradient(0.25turn, #4BD2F1, #1097F3)'
            : '',
      }}
      {...props}
    />
  );
}
