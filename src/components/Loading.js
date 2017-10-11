import React from 'react'
import styled from 'styled-components'

const Loading = styled.div`
  font-size: 100px;

`
export default ({isLoading}) => <Loading>{isLoading ? "Loading":""}</Loading>