export declare const TestTheme: import("@mui/material").Theme;
declare module '@mui/material/styles' {
    interface Palette {
        custom: Palette['primary'];
    }
    interface PaletteOptions {
        custom: PaletteOptions['primary'];
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        custom: true;
    }
}
