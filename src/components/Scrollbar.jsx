import PropTypes from "prop-types";
import SimpleBarReact from "simplebar-react";
// material
// import { alpha, styled } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { alpha, styled } from "@mui/system";

// ----------------------------------------------------------------------

const RootStyle = styled("div")({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: theme.palette.grey
        ? alpha(theme.palette.grey[600], 0.48)
        : "inherit",
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}

