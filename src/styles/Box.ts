import { colors } from "src/theme/colors";
import { fontSizes } from "src/theme/fontSizes";
import styled from "styled-components";

export const StyledBox = styled.div`
  box-shadow: 0 0.5rem 1rem 0 rgb(0 0 0 / 10%);
  background-color: ${colors.whiteColor};
  border: 0.5px solid ${colors.border};
  border-radius: 10px;
`;

