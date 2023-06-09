import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    // breakpoints: {
    //     sm: "30em",
    //     md: "48em",
    //     lg: "62em",
    //     xl: "96em",
    // },
    // breakpoints: {
    //     sm: "480px",
    //     md: "768px",
    //     lg: "992px",
    //     xl: "1536px",
    // },
    colors: {
        // customBackground: "#2B3648",
        customBackground: "#0B2A41",
        // customForeground: "#222936",
        customForeground: "#011727",
        customHighlight: "#FDC1B1",
        customBrightText: "",
        customDarkText: "",
        settingsText: "#96A7AF",
    },
    styles: {
        global: {
            "html": {
                background: "customBackground",
            }
        }
    },
});

export default customTheme;

// original bg #2B3648
// night owl #011727
// no fg #0B2A41