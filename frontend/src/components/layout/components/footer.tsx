import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../assets/style'

const Footer = styled.div`
  margin: auto;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  color: gray;
  text-align: center;
  border-top: 1px solid ${ colors.gray };
  background-color: black;
`

const FooterBar = () => <Footer>Binance @ 2021</Footer>

export default React.memo(FooterBar)