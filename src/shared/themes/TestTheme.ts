import {createTheme} from "@mui/material";

export const TestTheme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: 'Sans-Serif'
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
                    minHeight: '3rem'
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
        custom: {
            main: '#ff77ff',
            light: '#ffAAff',
            dark: '#ff55ff'
        }
    },
    typography: {
        fontFamily: 'Sans-Serif',
        fontWeightMedium: 600,
        body1: {
            fontFamily: 'Sans-Serif'
        },
        caption: {
            // FormHelperText
            fontFamily: 'Sans-Serif',
            fontSize: '0.625rem',
            fontWeight: 'bold'
        },
    }
})

declare module '@mui/material/styles' {

    interface Palette {
        custom: Palette['primary']
    }

    interface PaletteOptions {
        custom: PaletteOptions['primary']
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        custom: true;
    }
}