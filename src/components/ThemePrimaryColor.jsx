import PropTypes from "prop-types";
import { useMemo } from "react";
import { CssBaseline } from "@material-ui/core";

// material
import {
  alpha,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@material-ui/core/styles";
// hooks
import useSettings from "../hooks/useSettings";
//
import componentsOverride from "../theme/overrides";
import GlobalStyles from "src/theme/globalStyles";

// ----------------------------------------------------------------------

ThemePrimaryColor.propTypes = {
  children: PropTypes.node,
};
function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}
export default function ThemePrimaryColor({ children }) {
  const outerTheme = useTheme();
  const { setColor } = useSettings();
  const themeOptions = useMemo(
    () => ({
      ...outerTheme,
      palette: {
        ...outerTheme.palette,
        primary: setColor,
        gradients: { primary: createGradient("#5BE584", setColor.main) },
      },
      customShadows: {
        ...outerTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`,
      },
    }),
    [setColor, outerTheme],
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

