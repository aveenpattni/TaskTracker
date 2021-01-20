import React from 'react';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import units from "design-units";

const LinkWrapper = styled(Link)`
  display:flex;
  border: 1px solid black;
  border-radius: 4px
  ${units({
    backgroundColor: "button",
    color: "black"
  })}
`;

export const CustomLink = ({id, children}) => (
  <LinkWrapper to={id}>
    {children ? children : null}
  </LinkWrapper>
);