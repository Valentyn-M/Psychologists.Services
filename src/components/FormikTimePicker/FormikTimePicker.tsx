import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import dayjs from 'dayjs';
import { SxProps } from '@mui/material/styles';

export interface FormikTimePickerProps {
  name: string;
  sx?: SxProps;
  className?: string;
}

const FormikTimePicker = ({ name, sx, className }: FormikTimePickerProps) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className={className}>
      <TimePicker
        ampm={false}
        value={field.value ? dayjs(field.value, 'HH:mm') : null}
        onChange={(val) => {
          const time = val ? val.format('HH:mm') : '';
          setFieldValue(name, time);
        }}
        enableAccessibleFieldDOMStructure={false}
        slots={{
          textField: (params) => (
            <TextField
              {...params}
              label="00:00" // Вбудований label
              fullWidth
              error={Boolean(meta.touched && meta.error)}
              sx={{
                maxWidth: '14.5rem',
                ...sx,

                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'var(--main-light)',
                  borderRadius: '0.875rem',
                  fontFamily: 'Inter',
                  fontSize: '1rem',
                  color: 'var(--main)',
                  paddingRight: '1.375rem',

                  '& fieldset': {
                    borderColor: meta.touched && meta.error ? 'var(--error-color) !important' : 'rgba(25, 26, 21, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--brand-color)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--brand-color)',
                  },
                },

                '& .MuiInputBase-input': {
                  padding: '0.90625rem 0 0.90625rem 1.375rem', // Правий не потрібен
                  color: 'var(--main)',
                  fontFamily: 'Inter',
                  fontSize: '1rem',
                  lineHeight: '1.25',
                },

                '& .MuiSvgIcon-root': {
                  color: meta.touched && meta.error ? 'var(--error-color) !important' : 'var(--main)',
                },

                '& label': {
                  fontFamily: 'Inter',
                  fontSize: '1rem',
                  color: 'var(--main)',
                },
                '& label.Mui-focused': {
                  color: 'var(--brand-color)',
                },
                '& label.Mui-error': {
                  color: 'var(--error-color)',
                },
              }}
            />
          ),
        }}
        // dropdown
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 8], // вертикальний відступ
                },
              },
            ],
            sx: {
              '& .MuiPaper-root': {
                borderRadius: '0.75rem',
                padding: '1rem 1rem 0',
                boxShadow: '0 20px 69px 0 rgba(0, 0, 0, 0.07)',
                backgroundColor: '#fff',

                // Активний пункт (виділене число)
                '& .Mui-selected': {
                  backgroundColor: 'var(--brand-color) !important',
                  color: 'white !important',
                },

                // При ховері
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: 'rgba(0, 128, 0, 0.1)', // зелений прозорий
                },

                // Кнопки OK / Cancel
                '& .MuiDialogActions-root button': {
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textTransform: 'none',
                  color: 'var(--brand-color)',
                },
                '& .MuiDialogActions-root button:hover': {
                  backgroundColor: 'rgba(0, 128, 0, 0.04)',
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default FormikTimePicker;
