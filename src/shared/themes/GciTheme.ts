import {createTheme} from "@mui/material";

export const GciTheme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: 'Gotham-Bold'
                }
            },
            defaultProps: {
                shrink: true
            }
        },
        MuiOutlinedInput: {
            defaultProps: {
                sx: {
                    '&:hover': {
                        bgcolor: 'primary.light',
                    },
                    "&:focus-within": {
                        bgcolor: 'primary.light',
                    },
                    height: '3rem'
                },
            },
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    backgroundColor: ownerState.error ? theme.palette.error.light : undefined
                })
            }
        },
        MuiInput: {
            defaultProps: {
                sx: {
                    // Works for PhoneST
                    height: '3rem'
                }
            },
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
            }
        }
    },
    palette: {
        primary: {
            main: '#00A9E0',
            light: '#F3FCFF',
            dark: '#0084B0'
        },
        error: {
            main: '#E50000',
            light: '#FFF3F3',
            dark: '#B40000'
        },
        success: {
            main: '#188623',
            light: '#F2FDF3',
            dark: '#13691B'
        },
    },
    typography: {
        fontFamily: 'Gotham-Book',
        fontWeightMedium: 600,
        body1: {
            fontFamily: 'Gotham-Book'
        },
        caption: {
            // FormHelperText
            fontFamily: 'Gotham-Bold',
            fontSize: '0.625rem',
        },
    }
})
