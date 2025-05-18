import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import s from './FiltersFavorites.module.scss';
import SvgArrowIcon from '@/components/SvgArrowIcon/SvgArrowIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectValueFavorites } from '@/store/filters/selectors';
import { changeFilterFavorites, FilterOption } from '@/store/filters/slice';

export interface FiltersFavoritesProps {}

const FiltersFavorites = ({}: FiltersFavoritesProps) => {
  const filterValue = useAppSelector(selectValueFavorites);

  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent): void => {
    dispatch(changeFilterFavorites(event.target.value as FilterOption));
  };

  return (
    <div className={s.filters}>
      <h5 className={s.title}>Filters</h5>
      <FormControl
        fullWidth
        sx={{
          // main
          maxWidth: '14.125rem', // 226px
          borderRadius: '0.875rem', // 14px
          backgroundColor: 'var(--brand-color)',

          // outlined input
          '& .MuiOutlinedInput-root': {
            color: 'var(--main-light)',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '1rem', // 16px
            lineHeight: 1.25,

            // fieldset
            '& fieldset': {
              border: 'none',
            },
          },

          // select
          '& .MuiSelect-select': {
            padding: '0.875rem 2.25rem 0.875rem 1.125rem !important', // 14px 36px 14px 18px
            minHeight: 'unset !important',
          },

          // icon
          '& .MuiSelect-icon': {
            right: '18px',
            top: 'calc(50% - 0.625rem)', // 10px
            fill: 'var(--main-light)',
          },
        }}
      >
        <Select
          value={filterValue}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Filter' }}
          IconComponent={SvgArrowIcon}
          // list wrapper
          MenuProps={{
            PaperProps: {
              sx: {
                marginTop: '0.5rem', // 8px
                borderRadius: '0.875rem', // 12px
                boxShadow: '0 1.25rem 4.3125rem 0 rgba(0, 0, 0, 0.07);', // 0 20px 69px 0 rgba(0, 0, 0, 0.07);
                backgroundColor: 'var(--main-light)',
                padding: '0.875rem 1.125rem', // 14px 18px

                // scrollbar
                '&::-webkit-scrollbar': {},
                '&::-webkit-scrollbar-track': {},
                '&::-webkit-scrollbar-thumb': {},

                // Ripple effect color
                '& .MuiTouchRipple-root .MuiTouchRipple-ripple .MuiTouchRipple-child': {
                  backgroundColor: 'var(--brand-color)',
                  opacity: 0.5,
                },

                // list
                '& ul': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  padding: 0,
                },

                // list utem
                '& li': {
                  padding: '0.25rem 0', // 4px 0
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  fontSize: '1rem',
                  lineHeight: '1.25',
                  color: 'rgba(25, 26, 21, 0.3)',
                  minHeight: 'unset !important',
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    color: 'var(--main)',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'var(--main)',
                    },
                    '&:focus': {
                      backgroundColor: 'transparent',
                      color: 'var(--main)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'var(--main)',
                  },
                  '&:focus': {
                    backgroundColor: 'transparent',
                    color: 'var(--main)',
                  },
                },
              },
            },
          }}
        >
          <MenuItem value={FilterOption.AtoZ}>A to Z</MenuItem>
          <MenuItem value={FilterOption.ZtoA}>Z to A</MenuItem>
          <MenuItem value={FilterOption.Expensive}>Expensive</MenuItem>
          <MenuItem value={FilterOption.NotExpensive}>Not expensive</MenuItem>
          <MenuItem value={FilterOption.Popular}>Popular</MenuItem>
          <MenuItem value={FilterOption.NotPopular}>Not popular</MenuItem>
          <MenuItem value={FilterOption.ShowAll}>Show all</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FiltersFavorites;
