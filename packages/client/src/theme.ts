import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

export const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = {
  config,
  styles: {
    global: {
      body: {
        margin: 0,
        // "font-family": `'Red Hat Display', sans-serif`,
      },
      // code: {
      //   "font-family": `'Red Hat Display', sans-serif`,
      // },
    },
  },
};

export default extendTheme(theme);
