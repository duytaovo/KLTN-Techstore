import {
  Box,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  CardActionArea,
  FormControlLabel,
} from "@material-ui/core";
// hooks
import useSettings from "../../hooks/useSettings";

// ----------------------------------------------------------------------

export default function SettingHeader() {
  const { themeHeader, onChangeHeader } = useSettings();
  return (
    <RadioGroup
      name="themeHeader"
      value={themeHeader}
      onChange={onChangeHeader}
    >
      <Grid container spacing={2.5} dir="old">
        {["old", "new"].map((direction, index) => (
          <Grid item xs={6} key={direction}>
            <Paper
              key={direction}
              variant={themeHeader === direction ? "elevation" : "outlined"}
              sx={{
                width: 1,
                zIndex: 0,
                overflow: "hidden",
                position: "relative",
                ...(themeHeader === direction && {
                  boxShadow: (theme) => theme.customShadows.z12,
                }),
              }}
            >
              <CardActionArea sx={{ color: "primary.main" }}>
                <Box
                  sx={{
                    p: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    ...(index === 1 && { alignItems: "flex-end" }),
                  }}
                >
                  {[56, 36, 24].map((size, index) => (
                    <Box
                      key={size}
                      sx={{
                        my: 0.5,
                        width: size,
                        height: size / 4.5,
                        borderRadius: 0.75,
                        bgcolor:
                          themeHeader === direction
                            ? "primary.main"
                            : "grey.500",
                        ...(index === 0 && { opacity: 0.64 }),
                        ...(index === 1 && {
                          opacity: 0.32,
                          borderRadius: "4px",
                        }),
                        ...(index === 2 && {
                          opacity: 0.16,
                          borderRadius: "3px",
                        }),
                      }}
                    />
                  ))}
                </Box>
                <FormControlLabel
                  label=""
                  value={direction}
                  control={<Radio sx={{ display: "none" }} />}
                  sx={{
                    top: 0,
                    margin: 0,
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
              </CardActionArea>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
}

